/**
 * Gallery Image Discovery & Categorization Module
 *
 * Automatically discovers images from src/Gallery/ and public/assets/gallery/
 * using Vite's import.meta.glob().
 * Categorizes photos by filename (Sunrise, Sunset, Mangrove, Golden Hour, Happy Guests).
 * Sorts naturally (Sunrise 1, Sunrise 2, Sunrise 10).
 * Provides concise 1-3 word captions.
 */

export type GalleryCategory =
  | "all"
  | "sunrise"
  | "sunset"
  | "mangrove"
  | "golden-hour"
  | "happy-guests";

export interface GalleryPhoto {
  id: string;
  filename: string;
  src: string;
  category: "sunrise" | "sunset" | "mangrove" | "golden-hour" | "happy-guests" | "general";
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
  "sunrise 4": "Dawn Waterway",
  "sunrise (4)": "Dawn Waterway",
  "sunrise 11": "Morning Calm",
  "sunrise 12": "Sunrise Horizon",

  // Sunset
  "sunset 1": "Sunset Glow",
  "sunset (1)": "Sunset Glow",
  "sunset 2": "Evening Paddle",
  "sunset (2)": "Evening Paddle",
  "sunset 3": "Twilight Drift",
  "sunset (3)": "Twilight Drift",
  "sunset 4": "Crimson Waters",
  "sunset 7": "Twilight Horizon",
  "sunset 11": "Dusk Reflections",

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
  "mangrove 11": "Emerald Waters",

  // Golden Hour
  "golden hour 1": "Golden Reflections",
  "golden hour (1)": "Golden Reflections",
  "goldenhour 1": "Golden Reflections",
  "goldenhour (1)": "Golden Reflections",
  "golden hour 2": "Warm Light",
  "golden hour (2)": "Warm Light",
  "goldenhour 2": "Warm Light",
  "goldenhour (2)": "Warm Light",
  "golden hour 3": "Sunset Horizon",
  "golden hour (3)": "Sunset Horizon",
  "goldenhour 3": "Sunset Horizon",
  "goldenhour (3)": "Sunset Horizon",
  "golden hour 4": "Golden Waters",
  "golden hour (4)": "Golden Waters",
  "goldenhour 4": "Golden Waters",
  "goldenhour (4)": "Golden Waters",
  "golden hour 5": "Evening Glow",
  "golden hour (5)": "Evening Glow",
  "goldenhour 5": "Evening Glow",
  "goldenhour (5)": "Evening Glow",

  // Happy Guests (customer photographs)
  "photo 1": "Happy Paddlers",
  "photo (1)": "Happy Paddlers",
  "photo 2": "Smiling Kayakers",
  "photo (2)": "Smiling Kayakers",
  "other 1": "Happy Paddlers",
  "other (1)": "Happy Paddlers",
  "other 2": "Smiling Kayakers",
  "other (2)": "Smiling Kayakers",
  "other 3": "Kayora Moments",
  "other (3)": "Kayora Moments",
  "other 4": "Group Adventure",
  "other (4)": "Group Adventure",
  "happy guests 1": "Happy Paddlers",
  "happy guests (1)": "Happy Paddlers",
  "happy guests 2": "Smiling Kayakers",
  "happy guests (2)": "Smiling Kayakers",
  "happy guests 3": "Kayora Moments",
  "happy guests (3)": "Kayora Moments",
  "happy guests 4": "Group Adventure",
  "happy guests (4)": "Group Adventure",
  "happy guests group": "Group Adventure",
  "happy guest 1": "Happy Paddlers",
  "happy guest 2": "Smiling Kayakers",
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
 * Determine category from filename, ignoring capitalization, hyphens, and underscores.
 * Matches category name prefix regardless of sequential or non-sequential numbering.
 *
 * - "golden-hour*", "golden hour*", "goldenhour*" -> "golden-hour"
 * - "happy guests*", "happy guest*", "guest*", "photo*", "other*" -> "happy-guests"
 * - "sunrise*" -> "sunrise"
 * - "sunset*"  -> "sunset"
 * - "mangrove*"-> "mangrove"
 * - Otherwise  -> "general" (displays under "all" only)
 */
export function getCategoryFromFilename(
  filename: string
): "sunrise" | "sunset" | "mangrove" | "golden-hour" | "happy-guests" | "general" {
  const base = getBaseName(filename)
    .toLowerCase()
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (base.startsWith("golden hour") || base.startsWith("goldenhour")) {
    return "golden-hour";
  }
  if (
    base.startsWith("happy guest") ||
    base.startsWith("happy guests") ||
    base.startsWith("guest") ||
    base.startsWith("photo") ||
    base.startsWith("other")
  ) {
    return "happy-guests";
  }
  if (base.startsWith("sunrise")) {
    return "sunrise";
  }
  if (base.startsWith("sunset")) {
    return "sunset";
  }
  if (base.startsWith("mangrove")) {
    return "mangrove";
  }

  return "general";
}

/**
 * Generate a short 1-3 word caption
 */
export function getCaptionFromFilename(
  filename: string,
  category: "sunrise" | "sunset" | "mangrove" | "golden-hour" | "happy-guests" | "general"
): string {
  const baseKey = getBaseName(filename)
    .toLowerCase()
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (captionMap[baseKey]) {
    return captionMap[baseKey];
  }

  const strippedKey = baseKey.replace(/[()]/g, "").replace(/\s+/g, " ").trim();
  if (captionMap[strippedKey]) {
    return captionMap[strippedKey];
  }

  // Fallbacks by category (strictly 1-3 words)
  switch (category) {
    case "sunrise":
      return "Sunrise Paddle";
    case "sunset":
      return "Sunset Glow";
    case "mangrove":
      return "Mangrove Trail";
    case "golden-hour":
      return "Golden Reflections";
    case "happy-guests":
      return "Happy Paddlers";
    case "general":
    default:
      return "Kayora Moments";
  }
}

/**
 * Returns clean category label for photo card badge
 */
export function getCategoryBadgeLabel(category: string): string {
  switch (category) {
    case "sunrise":
      return "Sunrise";
    case "sunset":
      return "Sunset";
    case "mangrove":
      return "Mangrove";
    case "golden-hour":
      return "Golden Hour";
    case "happy-guests":
      return "Happy Guests";
    default:
      return "Moments";
  }
}

/**
 * Returns category label for lightbox session title
 */
export function getCategoryLightboxLabel(category: string): string {
  switch (category) {
    case "sunrise":
      return "Sunrise Session";
    case "sunset":
      return "Sunset Session";
    case "mangrove":
      return "Mangrove Session";
    case "golden-hour":
      return "Golden Hour Session";
    case "happy-guests":
      return "Happy Guests";
    default:
      return "Kayora Experience";
  }
}

/**
 * Generates natural descriptive alt text
 */
export function getAltText(caption: string, category: string): string {
  const categoryLabel =
    category === "golden-hour"
      ? "Golden Hour"
      : category === "happy-guests"
      ? "Guests"
      : category === "general"
      ? "Backwater"
      : category;
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
 * Strictly excludes Mangrove 6 / Mangrove (6) from gallery data.
 * Does not match Mangrove 16, Mangrove 60, Mangrove 61, or other files.
 */
export function isExcludedGalleryImage(filename: string): boolean {
  const base = getBaseName(filename)
    .toLowerCase()
    .replace(/[()]/g, " ")
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return base === "mangrove 6";
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

    const baseKey = getBaseName(filename)
      .toLowerCase()
      .replace(/[-_]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    const category = getCategoryFromFilename(filename);
    const caption = getCaptionFromFilename(filename, category);

    photoMap.set(baseKey, {
      id: `gallery-src-${baseKey.replace(/[^a-z0-9]/g, "-")}`,
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

    const baseKey = getBaseName(filename)
      .toLowerCase()
      .replace(/[-_]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    if (!photoMap.has(baseKey)) {
      const category = getCategoryFromFilename(filename);
      const caption = getCaptionFromFilename(filename, category);
      // Clean public path so it works in both dev and production
      const cleanUrl = rawUrl.startsWith("/public/assets/")
        ? rawUrl.replace(/^\/public/, "")
        : rawUrl;

      photoMap.set(baseKey, {
        id: `gallery-pub-${baseKey.replace(/[^a-z0-9]/g, "-")}`,
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

/**
 * The six gallery filters in exact required order.
 */
export const galleryCategories: { key: GalleryCategory; label: string }[] = [
  { key: "all", label: "All" },
  { key: "sunrise", label: "Sunrise" },
  { key: "sunset", label: "Sunset" },
  { key: "mangrove", label: "Mangrove" },
  { key: "golden-hour", label: "Golden Hour" },
  { key: "happy-guests", label: "Happy Guests" },
];
