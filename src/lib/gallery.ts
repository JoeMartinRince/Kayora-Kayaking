/**
 * Gallery Image Discovery & Categorization Module
 *
 * Automatically discovers images from src/Gallery/ (and public/assets/gallery/)
 * using Vite's import.meta.glob().
 * Categorizes photos by filename (Sunrise, Sunset, Mangrove, General).
 * Sorts naturally (Sunrise 1, Sunrise 2, Sunrise 10).
 * Provides concise 1-3 word captions.
 */

export type GalleryCategory = "all" | "sunrise" | "sunset" | "mangrove" | "general";

export interface GalleryPhoto {
  id: string;
  filename: string;
  src: string;
  category: "sunrise" | "sunset" | "mangrove" | "general";
  caption: string;
  alt: string;
}

/**
 * Customizable caption mapping (1-3 words)
 * Maps normalized base filename (lowercase, trimmed) to short visitor-facing caption.
 */
export const captionMap: Record<string, string> = {
  // Sunrise
  "sunrise 1": "Golden Sunrise",
  "sunrise (1)": "Golden Sunrise",
  "sunrise 2": "Morning Paddle",
  "sunrise (2)": "Morning Paddle",
  "sunrise 3": "Sunrise Ride",
  "sunrise (3)": "Sunrise Ride",

  // Sunset
  "sunset 1": "Sunset Glow",
  "sunset (1)": "Sunset Glow",
  "sunset 2": "Evening Paddle",
  "sunset (2)": "Evening Paddle",
  "sunset 3": "Twilight Drift",
  "sunset (3)": "Twilight Drift",

  // Mangrove
  "mangrove 1": "Mangrove Trail",
  "mangrove (1)": "Mangrove Trail",
  "mangrove 2": "Forest Escape",
  "mangrove (2)": "Forest Escape",
  "mangrove 3": "Green Canopy",
  "mangrove (3)": "Green Canopy",
  "mangrove 4": "Secret Passage",
  "mangrove (4)": "Secret Passage",
  "mangrove 5": "Quiet Channel",
  "mangrove (5)": "Quiet Channel",
  "mangrove 6": "Emerald Waters",
  "mangrove (6)": "Emerald Waters",

  // General / Other / Photo
  "photo 1": "Kayora Moments",
  "photo (1)": "Kayora Moments",
  "photo 2": "Water Memories",
  "photo (2)": "Water Memories",
  "other 1": "Kayora Moments",
  "other (1)": "Kayora Moments",
  "other 2": "Water Memories",
  "other (2)": "Water Memories",
  "other 3": "Backwater Echoes",
  "other (3)": "Backwater Echoes",
  "other 4": "Island Passage",
  "other (4)": "Island Passage",
};

/**
 * Extracts base filename without path or extension
 */
export function getBaseName(filepath: string): string {
  const filename = filepath.split("/").pop()?.split("\\").pop() ?? filepath;
  return filename.replace(/\.[^/.]+$/, "").trim();
}

/**
 * Extracts full filename with extension from a path
 */
export function getFilename(filepath: string): string {
  return filepath.split("/").pop()?.split("\\").pop() ?? filepath;
}

/**
 * Determine category from filename, ignoring capitalization.
 * - Starts with "sunrise" -> "sunrise"
 * - Starts with "sunset"  -> "sunset"
 * - Starts with "mangrove"-> "mangrove"
 * - Otherwise (including "photo", "other") -> "general"
 */
export function getCategoryFromFilename(
  filename: string
): "sunrise" | "sunset" | "mangrove" | "general" {
  const base = getBaseName(filename).toLowerCase();
  if (base.startsWith("sunrise")) return "sunrise";
  if (base.startsWith("sunset")) return "sunset";
  if (base.startsWith("mangrove")) return "mangrove";
  return "general";
}

/**
 * Generate a short 1-3 word caption
 */
export function getCaptionFromFilename(
  filename: string,
  category: "sunrise" | "sunset" | "mangrove" | "general"
): string {
  const baseKey = getBaseName(filename).toLowerCase().replace(/\s+/g, " ");

  if (captionMap[baseKey]) {
    return captionMap[baseKey];
  }

  // Fallbacks by category (strictly 1-3 words)
  switch (category) {
    case "sunrise":
      return "Sunrise Paddle";
    case "sunset":
      return "Sunset Glow";
    case "mangrove":
      return "Mangrove Trail";
    case "general":
    default:
      return "Kayora Moments";
  }
}

/**
 * Generates natural descriptive alt text
 */
export function getAltText(caption: string, category: string): string {
  const categoryLabel = category === "general" ? "Backwater" : category;
  return `Kayora ${categoryLabel} kayaking tour in Kochi - ${caption}`;
}

// Vite discovery for src/Gallery/
const srcGalleryModules = import.meta.glob<string>(
  [
    "/src/Gallery/*.{jpg,jpeg,png,webp,avif}",
    "/src/Gallery/*.{JPG,JPEG,PNG,WEBP,AVIF}",
  ],
  { eager: true, query: "?url", import: "default" }
);

// Fallback discovery for public/assets/gallery/
const publicGalleryModules = import.meta.glob<string>(
  [
    "/public/assets/gallery/*.{jpg,jpeg,png,webp,avif}",
    "/public/assets/gallery/*.{JPG,JPEG,PNG,WEBP,AVIF}",
  ],
  { eager: true, query: "?url", import: "default" }
);

/**
 * Excluded gallery images (normalized to lowercase, whitespace trimmed).
 * To restore an image in the future (e.g. Mangrove 6), remove it from this set.
 */
export const excludedGalleryImages = new Set<string>([
  "mangrove 6",
  "mangrove (6)",
]);

export function isExcludedGalleryImage(filename: string): boolean {
  const baseKey = getBaseName(filename).toLowerCase().replace(/\s+/g, " ").trim();
  if (excludedGalleryImages.has(baseKey)) return true;
  const stripped = baseKey.replace(/[()]/g, "").replace(/\s+/g, " ").trim();
  return excludedGalleryImages.has(stripped);
}

/**
 * Build the complete, naturally sorted gallery photo collection.
 */
export function getGalleryPhotos(): GalleryPhoto[] {
  // Map of normalized base name -> GalleryPhoto to prevent duplicates
  const photoMap = new Map<string, GalleryPhoto>();

  // Process src/Gallery modules first (highest priority)
  for (const [path, url] of Object.entries(srcGalleryModules)) {
    const filename = getFilename(path);
    if (isExcludedGalleryImage(filename)) continue;

    const baseKey = getBaseName(filename).toLowerCase();
    const category = getCategoryFromFilename(filename);
    const caption = getCaptionFromFilename(filename, category);

    photoMap.set(baseKey, {
      id: `gallery-src-${baseKey}`,
      filename,
      src: url,
      category,
      caption,
      alt: getAltText(caption, category),
    });
  }

  // Process public/assets/gallery modules if not already added
  for (const [path, rawUrl] of Object.entries(publicGalleryModules)) {
    const filename = getFilename(path);
    if (isExcludedGalleryImage(filename)) continue;

    const baseKey = getBaseName(filename).toLowerCase();

    if (!photoMap.has(baseKey)) {
      const category = getCategoryFromFilename(filename);
      const caption = getCaptionFromFilename(filename, category);
      // Clean public path so it works in both dev and production
      const cleanUrl = rawUrl.startsWith("/public/assets/")
        ? rawUrl.replace(/^\/public/, "")
        : rawUrl;

      photoMap.set(baseKey, {
        id: `gallery-pub-${baseKey}`,
        filename,
        src: cleanUrl,
        category,
        caption,
        alt: getAltText(caption, category),
      });
    }
  }

  // Natural numeric sort by filename
  const photos = Array.from(photoMap.values());
  photos.sort((a, b) =>
    a.filename.localeCompare(b.filename, undefined, {
      numeric: true,
      sensitivity: "base",
    })
  );

  return photos;
}

export const galleryCategories: { key: "all" | "sunrise" | "sunset" | "mangrove"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "sunrise", label: "Sunrise" },
  { key: "sunset", label: "Sunset" },
  { key: "mangrove", label: "Mangrove" },
];
