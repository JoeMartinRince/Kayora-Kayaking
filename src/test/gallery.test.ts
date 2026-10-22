import { describe, expect, it } from "vitest";
import {
  getCategoryFromFilename,
  getCaptionFromFilename,
  getGalleryPhotos,
  galleryCategories,
  isExcludedGalleryImage,
} from "@/lib/gallery";

describe("Gallery Logic & Categorization", () => {
  it("has exactly six filters in the specified order with All first", () => {
    expect(galleryCategories.map((c) => c.key)).toEqual([
      "all",
      "sunrise",
      "sunset",
      "mangrove",
      "golden-hour",
      "happy-guests",
    ]);

    expect(galleryCategories.map((c) => c.label)).toEqual([
      "All",
      "Sunrise",
      "Sunset",
      "Mangrove",
      "Golden Hour",
      "Happy Guests",
    ]);
  });

  it("determines categories correctly with non-sequential numbering, hyphens, and underscores", () => {
    // Sunrise
    expect(getCategoryFromFilename("Sunrise 1.jpg")).toBe("sunrise");
    expect(getCategoryFromFilename("sunrise 2.webp")).toBe("sunrise");
    expect(getCategoryFromFilename("SUNRISE (1).JPG")).toBe("sunrise");
    expect(getCategoryFromFilename("Sunrise 12.jpg")).toBe("sunrise");
    expect(getCategoryFromFilename("sunrise11 (1).png")).toBe("sunrise");

    // Sunset
    expect(getCategoryFromFilename("Sunset 1.jpg")).toBe("sunset");
    expect(getCategoryFromFilename("SUNSET 2.jpg")).toBe("sunset");
    expect(getCategoryFromFilename("sunset (3).webp")).toBe("sunset");
    expect(getCategoryFromFilename("Sunset 7.jpg")).toBe("sunset");
    expect(getCategoryFromFilename("sunset11 (1).PNG")).toBe("sunset");

    // Mangrove
    expect(getCategoryFromFilename("Mangrove 1.jpeg")).toBe("mangrove");
    expect(getCategoryFromFilename("mangrove 3.webp")).toBe("mangrove");
    expect(getCategoryFromFilename("MANGROVE (4).png")).toBe("mangrove");
    expect(getCategoryFromFilename("Mangrove 11.jpg")).toBe("mangrove");
    expect(getCategoryFromFilename("MANGROVE 11.jpg")).toBe("mangrove");

    // Golden Hour
    expect(getCategoryFromFilename("Golden Hour 1.jpg")).toBe("golden-hour");
    expect(getCategoryFromFilename("Golden Hour 5.jpg")).toBe("golden-hour");
    expect(getCategoryFromFilename("golden-hour-5.jpg")).toBe("golden-hour");
    expect(getCategoryFromFilename("golden_hour_2.jpg")).toBe("golden-hour");
    expect(getCategoryFromFilename("goldenhour (1).JPG")).toBe("golden-hour");
    expect(getCategoryFromFilename("goldenhour 3.png")).toBe("golden-hour");

    // Happy Guests (customer photos)
    expect(getCategoryFromFilename("Happy Guests 1.jpg")).toBe("happy-guests");
    expect(getCategoryFromFilename("Happy_Guests_4.jpg")).toBe("happy-guests");
    expect(getCategoryFromFilename("Happy Guests Group.jpg")).toBe("happy-guests");
    expect(getCategoryFromFilename("happy-guest-2.jpg")).toBe("happy-guests");
    expect(getCategoryFromFilename("Photo 1.jpg")).toBe("happy-guests");
    expect(getCategoryFromFilename("other (1).JPG")).toBe("happy-guests");
    expect(getCategoryFromFilename("other 3.jpg")).toBe("happy-guests");

    // Unmatched/ambiguous files fall back to general
    expect(getCategoryFromFilename("unmatched-name.jpg")).toBe("general");
    expect(getCategoryFromFilename("random_backwater.jpg")).toBe("general");
  });

  it("generates concise 1-3 word captions", () => {
    const s1 = getCaptionFromFilename("Sunrise 1.jpg", "sunrise");
    expect(s1).toBe("Golden Sunrise");
    expect(s1.split(" ").length).toBeLessThanOrEqual(3);

    const s2 = getCaptionFromFilename("Sunrise 2.jpg", "sunrise");
    expect(s2).toBe("Morning Paddle");

    const sun1 = getCaptionFromFilename("Sunset 1.jpg", "sunset");
    expect(sun1).toBe("Sunset Glow");

    const m1 = getCaptionFromFilename("Mangrove 1.jpg", "mangrove");
    expect(m1).toBe("Mangrove Trail");

    const gh1 = getCaptionFromFilename("Golden Hour 1.jpg", "golden-hour");
    expect(gh1).toBe("Golden Reflections");
    expect(gh1.split(" ").length).toBeLessThanOrEqual(3);

    const gh2 = getCaptionFromFilename("goldenhour (2).JPG", "golden-hour");
    expect(gh2).toBe("Warm Light");

    const hg1 = getCaptionFromFilename("Photo 1.jpg", "happy-guests");
    expect(hg1).toBe("Happy Paddlers");
    expect(hg1.split(" ").length).toBeLessThanOrEqual(3);

    const hg2 = getCaptionFromFilename("other 4.jpg", "happy-guests");
    expect(hg2).toBe("Group Adventure");

    // Fallbacks for unmapped images are strictly 1-3 words
    const fallbackSunrise = getCaptionFromFilename("Sunrise 99.jpg", "sunrise");
    expect(fallbackSunrise).toBe("Sunrise Paddle");
    expect(fallbackSunrise.split(" ").length).toBeLessThanOrEqual(3);

    const fallbackGh = getCaptionFromFilename("golden-hour-99.jpg", "golden-hour");
    expect(fallbackGh).toBe("Golden Reflections");
    expect(fallbackGh.split(" ").length).toBeLessThanOrEqual(3);

    const fallbackHg = getCaptionFromFilename("happy-guests-99.jpg", "happy-guests");
    expect(fallbackHg).toBe("Happy Paddlers");
    expect(fallbackHg.split(" ").length).toBeLessThanOrEqual(3);
  });

  it("discovers photos from src/Gallery and public/assets/gallery with natural numeric sorting", () => {
    const photos = getGalleryPhotos();
    expect(photos.length).toBeGreaterThan(0);

    // Verify natural sort order (e.g. mangrove (1) before mangrove (2))
    const mangrovePhotos = photos.filter((p) => p.category === "mangrove");
    expect(mangrovePhotos.length).toBeGreaterThan(0);

    for (let i = 0; i < mangrovePhotos.length - 1; i++) {
      const current = mangrovePhotos[i].filename;
      const next = mangrovePhotos[i + 1].filename;
      const comp = current.localeCompare(next, undefined, {
        numeric: true,
        sensitivity: "base",
      });
      expect(comp).toBeLessThanOrEqual(0);
    }
  });

  it("categorizes photos and ensures All contains all categories without duplicate IDs", () => {
    const all = getGalleryPhotos();
    const sunrise = all.filter((p) => p.category === "sunrise");
    const sunset = all.filter((p) => p.category === "sunset");
    const mangrove = all.filter((p) => p.category === "mangrove");
    const goldenHour = all.filter((p) => p.category === "golden-hour");
    const happyGuests = all.filter((p) => p.category === "happy-guests");

    // All must contain every photo
    expect(all.length).toBeGreaterThanOrEqual(
      sunrise.length + sunset.length + mangrove.length + goldenHour.length + happyGuests.length
    );

    // Ensure Golden Hour and Happy Guests photos exist
    expect(goldenHour.length).toBeGreaterThan(0);
    expect(happyGuests.length).toBeGreaterThan(0);

    // Ensure all photo IDs are unique
    const idSet = new Set(all.map((p) => p.id));
    expect(idSet.size).toBe(all.length);
  });

  it("strictly excludes Mangrove 6 while preserving Mangrove 1-5 and not excluding Mangrove 16 or 60", () => {
    // Direct function exclusion check
    expect(isExcludedGalleryImage("Mangrove 6.jpg")).toBe(true);
    expect(isExcludedGalleryImage("mangrove (6).jpg")).toBe(true);
    expect(isExcludedGalleryImage("mangrove-6.png")).toBe(true);
    expect(isExcludedGalleryImage("mangrove_6.webp")).toBe(true);

    // Must NOT exclude Mangrove 16, 60, 61, etc.
    expect(isExcludedGalleryImage("Mangrove 16.jpg")).toBe(false);
    expect(isExcludedGalleryImage("Mangrove 60.jpg")).toBe(false);
    expect(isExcludedGalleryImage("Mangrove 61.jpg")).toBe(false);
    expect(isExcludedGalleryImage("mangrove (1).png")).toBe(false);

    // Verify in actual loaded gallery photos
    const photos = getGalleryPhotos();
    const mangrove6 = photos.find((p) => isExcludedGalleryImage(p.filename));
    expect(mangrove6).toBeUndefined();

    // Verify Mangrove 1 through 5 are present
    const mangroveNames = photos
      .filter((p) => p.category === "mangrove")
      .map((p) => p.filename.toLowerCase());

    expect(mangroveNames.some((n) => n.includes("mangrove (1)") || n.includes("mangrove 1"))).toBe(true);
    expect(mangroveNames.some((n) => n.includes("mangrove (2)") || n.includes("mangrove 2"))).toBe(true);
    expect(mangroveNames.some((n) => n.includes("mangrove (3)") || n.includes("mangrove 3"))).toBe(true);
    expect(mangroveNames.some((n) => n.includes("mangrove (4)") || n.includes("mangrove 4"))).toBe(true);
    expect(mangroveNames.some((n) => n.includes("mangrove (5)") || n.includes("mangrove 5"))).toBe(true);
  });
});
