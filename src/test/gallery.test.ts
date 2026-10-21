import { describe, expect, it } from "vitest";
import {
  getCategoryFromFilename,
  getCaptionFromFilename,
  getGalleryPhotos,
  galleryCategories,
} from "@/lib/gallery";

describe("Gallery Logic & Categorization", () => {
  it("determines categories correctly regardless of capitalization and file extension", () => {
    expect(getCategoryFromFilename("Sunrise 1.jpg")).toBe("sunrise");
    expect(getCategoryFromFilename("sunrise 2.webp")).toBe("sunrise");
    expect(getCategoryFromFilename("SUNRISE (1).JPG")).toBe("sunrise");

    expect(getCategoryFromFilename("Sunset 1.jpg")).toBe("sunset");
    expect(getCategoryFromFilename("SUNSET 2.jpg")).toBe("sunset");
    expect(getCategoryFromFilename("sunset (3).webp")).toBe("sunset");

    expect(getCategoryFromFilename("Mangrove 1.jpeg")).toBe("mangrove");
    expect(getCategoryFromFilename("mangrove 3.webp")).toBe("mangrove");
    expect(getCategoryFromFilename("MANGROVE (4).png")).toBe("mangrove");

    expect(getCategoryFromFilename("Photo 1.jpg")).toBe("general");
    expect(getCategoryFromFilename("other (1).JPG")).toBe("general");
    expect(getCategoryFromFilename("unmatched-name.jpg")).toBe("general");
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

    const m2 = getCaptionFromFilename("Mangrove 2.jpg", "mangrove");
    expect(m2).toBe("Forest Escape");

    const p1 = getCaptionFromFilename("Photo 1.jpg", "general");
    expect(p1).toBe("Kayora Moments");

    // Fallback for unmapped image is 1-3 words
    const fallback = getCaptionFromFilename("Sunrise 99.jpg", "sunrise");
    expect(fallback).toBe("Sunrise Paddle");
    expect(fallback.split(" ").length).toBeLessThanOrEqual(3);
  });

  it("discovers photos from src/Gallery with natural numeric sorting", () => {
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

  it("filters categories correctly", () => {
    const all = getGalleryPhotos();
    const sunrise = all.filter((p) => p.category === "sunrise");
    const sunset = all.filter((p) => p.category === "sunset");
    const mangrove = all.filter((p) => p.category === "mangrove");
    const general = all.filter((p) => p.category === "general");

    expect(all.length).toBe(sunrise.length + sunset.length + mangrove.length + general.length);
    expect(sunrise.length).toBeGreaterThan(0);
    expect(sunset.length).toBeGreaterThan(0);
    expect(mangrove.length).toBeGreaterThan(0);
    expect(general.length).toBeGreaterThan(0);

    // Verify general photos do not appear in specific categories
    for (const p of sunrise) {
      expect(p.category).toBe("sunrise");
    }
    for (const p of sunset) {
      expect(p.category).toBe("sunset");
    }
    for (const p of mangrove) {
      expect(p.category).toBe("mangrove");
    }
  });

  it("provides 4 standard filter categories", () => {
    expect(galleryCategories.map((c) => c.key)).toEqual([
      "all",
      "sunrise",
      "sunset",
      "mangrove",
    ]);
  });
});
