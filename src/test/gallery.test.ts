import { describe, expect, it } from "vitest";
import {
  getCategoryFromFilename,
  getCaptionFromFilename,
  getGalleryPhotos,
  galleryCategories,
  categoryDescriptions,
  isExcludedGalleryImage,
  isBirdFilename,
} from "@/lib/gallery";

describe("Gallery Logic & Categorization", () => {
  it("has exactly seven filters in the specified order with All first and Winged Visitors before Golden Hour", () => {
    expect(galleryCategories.map((c) => c.key)).toEqual([
      "all",
      "sunrise",
      "sunset",
      "mangrove",
      "winged-visitors",
      "golden-hour",
      "happy-guests",
    ]);

    expect(galleryCategories.map((c) => c.label)).toEqual([
      "All",
      "Sunrise",
      "Sunset",
      "Mangrove",
      "Winged Visitors",
      "Golden Hour",
      "Happy Guests",
    ]);

    expect(categoryDescriptions["winged-visitors"]).toBe(
      "Paddle through the mangroves and discover the fascinating birds that visit these tranquil backwaters.",
    );
  });

  it("restores and preserves all original curated gallery images without data loss", () => {
    const photos = getGalleryPhotos();

    // Verify all 9 original curated images exist in the active gallery
    const expectedOriginalFiles = [
      "sunrise.jpg",
      "mangrove-channel.jpg",
      "sunset.jpg",
      "group-mangrove.jpg",
      "chinese-nets-dusk.jpg",
      "night-glow.jpg",
      "paddle-morning.jpg",
      "explore.jpg",
      "sunrise-group.jpg",
    ];

    for (const filename of expectedOriginalFiles) {
      const match = photos.find((p) => p.filename.toLowerCase() === filename);
      expect(match, `Expected ${filename} to be present in gallery`).toBeDefined();
    }

    // Verify original titles and captions are preserved
    const sunrise = photos.find((p) => p.filename === "sunrise.jpg");
    expect(sunrise?.caption).toBe("Golden Sunrise");
    expect(sunrise?.subtitle).toBe("Early morning calm over Kadamakkudy waters");
    expect(sunrise?.category).toBe("sunrise");

    const mangrove = photos.find((p) => p.filename === "mangrove-channel.jpg");
    expect(mangrove?.caption).toBe("Mangrove Tunnels");
    expect(mangrove?.category).toBe("mangrove");

    const sunset = photos.find((p) => p.filename === "sunset.jpg");
    expect(sunset?.caption).toBe("Sunset Drift");
    expect(sunset?.category).toBe("sunset");

    // Group / customer photos are migrated to happy-guests
    const group = photos.find((p) => p.filename === "group-mangrove.jpg");
    expect(group?.caption).toBe("Shared Journeys");
    expect(group?.category).toBe("happy-guests");

    const nightGlow = photos.find((p) => p.filename === "night-glow.jpg");
    expect(nightGlow?.caption).toBe("Evening Reflections");
    expect(nightGlow?.category).toBe("golden-hour");
  });

  it("determines categories correctly including birds / Winged Visitors", () => {
    // isBirdFilename detection
    expect(isBirdFilename("birds1.jpg")).toBe(true);
    expect(isBirdFilename("birds2.jpeg")).toBe(true);
    expect(isBirdFilename("birds10.webp")).toBe(true);
    expect(isBirdFilename("birds_12.png")).toBe(true);
    expect(isBirdFilename("birds-3.avif")).toBe(true);
    expect(isBirdFilename("birds (1).JPG")).toBe(true);
    expect(isBirdFilename("birds11 (1).PNG")).toBe(true);
    expect(isBirdFilename("birds11 (5).PNG")).toBe(true);
    expect(isBirdFilename("Sunrise 1.jpg")).toBe(false);
    expect(isBirdFilename("Mangrove 3.jpg")).toBe(false);

    // Winged Visitors (birds)
    expect(getCategoryFromFilename("birds1.jpg")).toBe("winged-visitors");
    expect(getCategoryFromFilename("birds2.jpg")).toBe("winged-visitors");
    expect(getCategoryFromFilename("birds3.jpeg")).toBe("winged-visitors");
    expect(getCategoryFromFilename("birds (1).JPG")).toBe("winged-visitors");
    expect(getCategoryFromFilename("birds (2).JPG")).toBe("winged-visitors");
    expect(getCategoryFromFilename("birds_4.png")).toBe("winged-visitors");
    expect(getCategoryFromFilename("birds-5.webp")).toBe("winged-visitors");
    expect(getCategoryFromFilename("bird 12.avif")).toBe("winged-visitors");
    expect(getCategoryFromFilename("BIRDS (3).JPG")).toBe("winged-visitors");
    expect(getCategoryFromFilename("birds11 (1).PNG")).toBe("winged-visitors");
    expect(getCategoryFromFilename("birds11 (5).PNG")).toBe("winged-visitors");
    expect(getCategoryFromFilename("Winged Visitors 1.jpg")).toBe("winged-visitors");

    // Sunrise
    expect(getCategoryFromFilename("Sunrise 1.jpg")).toBe("sunrise");
    expect(getCategoryFromFilename("sunrise 2.webp")).toBe("sunrise");
    expect(getCategoryFromFilename("SUNRISE (1).JPG")).toBe("sunrise");
    expect(getCategoryFromFilename("Sunrise 12.jpg")).toBe("sunrise");
    expect(getCategoryFromFilename("sunrise11 (1).png")).toBe("sunrise");
    expect(getCategoryFromFilename("paddle-morning.jpg")).toBe("sunrise");

    // Sunset
    expect(getCategoryFromFilename("Sunset 1.jpg")).toBe("sunset");
    expect(getCategoryFromFilename("SUNSET 2.jpg")).toBe("sunset");
    expect(getCategoryFromFilename("sunset (3).webp")).toBe("sunset");
    expect(getCategoryFromFilename("Sunset 7.jpg")).toBe("sunset");
    expect(getCategoryFromFilename("sunset11 (1).PNG")).toBe("sunset");
    expect(getCategoryFromFilename("chinese-nets-dusk.jpg")).toBe("sunset");

    // Mangrove
    expect(getCategoryFromFilename("Mangrove 1.jpeg")).toBe("mangrove");
    expect(getCategoryFromFilename("mangrove 3.webp")).toBe("mangrove");
    expect(getCategoryFromFilename("MANGROVE (4).png")).toBe("mangrove");
    expect(getCategoryFromFilename("Mangrove 11.jpg")).toBe("mangrove");
    expect(getCategoryFromFilename("MANGROVE 11.jpg")).toBe("mangrove");
    expect(getCategoryFromFilename("mangrove-channel.jpg")).toBe("mangrove");
    expect(getCategoryFromFilename("explore.jpg")).toBe("mangrove");

    // Golden Hour
    expect(getCategoryFromFilename("Golden Hour 1.jpg")).toBe("golden-hour");
    expect(getCategoryFromFilename("Golden Hour 5.jpg")).toBe("golden-hour");
    expect(getCategoryFromFilename("golden-hour-5.jpg")).toBe("golden-hour");
    expect(getCategoryFromFilename("golden_hour_2.jpg")).toBe("golden-hour");
    expect(getCategoryFromFilename("goldenhour (1).JPG")).toBe("golden-hour");
    expect(getCategoryFromFilename("goldenhour 3.png")).toBe("golden-hour");
    expect(getCategoryFromFilename("night-glow.jpg")).toBe("golden-hour");

    // Happy Guests (customer photos)
    expect(getCategoryFromFilename("Happy Guests 1.jpg")).toBe("happy-guests");
    expect(getCategoryFromFilename("Happy_Guests_4.jpg")).toBe("happy-guests");
    expect(getCategoryFromFilename("Happy Guests Group.jpg")).toBe("happy-guests");
    expect(getCategoryFromFilename("happy-guest-2.jpg")).toBe("happy-guests");
    expect(getCategoryFromFilename("Photo 1.jpg")).toBe("happy-guests");
    expect(getCategoryFromFilename("other (1).JPG")).toBe("happy-guests");
    expect(getCategoryFromFilename("other 3.jpg")).toBe("happy-guests");
    expect(getCategoryFromFilename("group-mangrove.jpg")).toBe("happy-guests");
    expect(getCategoryFromFilename("sunrise-group.jpg")).toBe("happy-guests");

    // Unmatched/ambiguous files fall back to general
    expect(getCategoryFromFilename("unmatched-name.jpg")).toBe("general");
    expect(getCategoryFromFilename("random_backwater.jpg")).toBe("general");
  });

  it("generates concise 1-3 word captions including birds", () => {
    const b1 = getCaptionFromFilename("birds (1).JPG", "winged-visitors");
    expect(b1).toBe("Coastal Egret");
    expect(b1.split(" ").length).toBeLessThanOrEqual(3);

    const b2 = getCaptionFromFilename("birds2.jpg", "winged-visitors");
    expect(b2).toBe("Mangrove Kingfisher");

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

    const hg1 = getCaptionFromFilename("Photo 1.jpg", "happy-guests");
    expect(hg1).toBe("Happy Paddlers");

    // Fallbacks for unmapped images are strictly 1-3 words
    const fallbackBird = getCaptionFromFilename("birds 99.jpg", "winged-visitors");
    expect(fallbackBird).toBe("Winged Visitors");
    expect(fallbackBird.split(" ").length).toBeLessThanOrEqual(3);
  });

  it("discovers photos from src/Gallery and public/assets/gallery with natural numeric sorting", () => {
    const photos = getGalleryPhotos();
    expect(photos.length).toBeGreaterThan(0);

    // Verify natural sort order among discovered mangrove photos
    const mangrovePhotos = photos.filter((p) => !p.isCurated && p.category === "mangrove");
    expect(mangrovePhotos.length).toBeGreaterThan(0);

    for (let i = 0; i < mangrovePhotos.length - 1; i++) {
      const current = mangrovePhotos[i]?.filename ?? "";
      const next = mangrovePhotos[i + 1]?.filename ?? "";
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
    const wingedVisitors = all.filter((p) => p.category === "winged-visitors");
    const goldenHour = all.filter((p) => p.category === "golden-hour");
    const happyGuests = all.filter((p) => p.category === "happy-guests");

    // All must contain every photo
    expect(all.length).toBe(
      sunrise.length +
        sunset.length +
        mangrove.length +
        wingedVisitors.length +
        goldenHour.length +
        happyGuests.length,
    );

    // Ensure all 6 specific categories have photos
    expect(sunrise.length).toBeGreaterThanOrEqual(2);
    expect(sunset.length).toBeGreaterThanOrEqual(2);
    expect(mangrove.length).toBeGreaterThanOrEqual(2);
    expect(wingedVisitors.length).toBeGreaterThanOrEqual(4);
    expect(wingedVisitors.length).toBe(9);
    expect(goldenHour.length).toBeGreaterThanOrEqual(1);
    expect(happyGuests.length).toBeGreaterThanOrEqual(2);

    // Ensure all photo IDs are unique
    const idSet = new Set(all.map((p) => p.id));
    expect(idSet.size).toBe(all.length);
  });

  it("strictly excludes Mangrove 6 while preserving Mangrove 1-5 and not excluding Mangrove 16 or 60", () => {
    expect(isExcludedGalleryImage("Mangrove 6.jpg")).toBe(true);
    expect(isExcludedGalleryImage("mangrove (6).jpg")).toBe(true);
    expect(isExcludedGalleryImage("mangrove-6.png")).toBe(true);
    expect(isExcludedGalleryImage("mangrove_6.webp")).toBe(true);

    expect(isExcludedGalleryImage("Mangrove 16.jpg")).toBe(false);
    expect(isExcludedGalleryImage("Mangrove 60.jpg")).toBe(false);
    expect(isExcludedGalleryImage("Mangrove 61.jpg")).toBe(false);
    expect(isExcludedGalleryImage("mangrove (1).png")).toBe(false);

    const photos = getGalleryPhotos();
    const mangrove6 = photos.find((p) => isExcludedGalleryImage(p.filename));
    expect(mangrove6).toBeUndefined();

    const mangroveNames = photos
      .filter((p) => p.category === "mangrove")
      .map((p) => p.filename.toLowerCase());

    expect(mangroveNames.some((n) => n.includes("mangrove (1)") || n.includes("mangrove 1"))).toBe(
      true,
    );
    expect(mangroveNames.some((n) => n.includes("mangrove (2)") || n.includes("mangrove 2"))).toBe(
      true,
    );
    expect(mangroveNames.some((n) => n.includes("mangrove (3)") || n.includes("mangrove 3"))).toBe(
      true,
    );
    expect(mangroveNames.some((n) => n.includes("mangrove (4)") || n.includes("mangrove 4"))).toBe(
      true,
    );
    expect(mangroveNames.some((n) => n.includes("mangrove (5)") || n.includes("mangrove 5"))).toBe(
      true,
    );
  });
});
