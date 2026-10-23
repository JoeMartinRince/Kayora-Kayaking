/**
 * Gallery Image Discovery, Categorization & Registry Module
 *
 * Combines curated existing images with auto-discovered images from
 * src/Gallery/ and public/assets/gallery/ using Vite's import.meta.glob().
 *
 * Features:
 * - Preserves all original curated gallery images (Sunrise, Sunset, Mangrove, Customer photos).
 * - Categorizes photos by category name (Sunrise, Sunset, Mangrove, Winged Visitors, Golden Hour, Happy Guests).
 * - Supports non-sequential numbering (Sunrise 12, Mangrove 11, birds 1).
 * - Deduplicates by resolved asset key so no image appears twice.
 * - Strictly excludes Mangrove 6 without dropping Mangrove 16 or 60.
 */

export type GalleryCategory =
  "all" | "sunrise" | "sunset" | "mangrove" | "winged-visitors" | "golden-hour" | "happy-guests";

export interface GalleryPhoto {
  id: string;
  filename: string;
  src: string;
  category:
    | "sunrise"
    | "sunset"
    | "mangrove"
    | "winged-visitors"
    | "golden-hour"
    | "happy-guests"
    | "general";
  caption: string;
  subtitle?: string;
  alt: string;
  isCurated?: boolean;
}

export interface CuratedGalleryItem {
  id: string;
  src: string;
  filename: string;
  title: string;
  caption: string;
  subtitle: string;
  category: "sunrise" | "sunset" | "mangrove" | "winged-visitors" | "golden-hour" | "happy-guests";
  alt: string;
}

/**
 * Original curated gallery photographs preserved from initial site design.
 * These are high-quality authentic shots served from public/assets/.
 */
export const curatedGalleryItems: CuratedGalleryItem[] = [
  {
    id: "curated-g1-sunrise",
    src: "/assets/sunrise.jpg",
    filename: "sunrise.jpg",
    title: "Golden Sunrise",
    caption: "Golden Sunrise",
    subtitle: "Early morning calm over Kadamakkudy waters",
    category: "sunrise",
    alt: "Paddler greeting the sunrise in Kochi - Golden Sunrise",
  },
  {
    id: "curated-g2-mangrove-channel",
    src: "/assets/mangrove-channel.jpg",
    filename: "mangrove-channel.jpg",
    title: "Mangrove Tunnels",
    caption: "Mangrove Tunnels",
    subtitle: "Sheltered natural passages surrounded by wildlife",
    category: "mangrove",
    alt: "Mangrove canal lined with tropical trees - Mangrove Tunnels",
  },
  {
    id: "curated-g3-sunset",
    src: "/assets/sunset.jpg",
    filename: "sunset.jpg",
    title: "Sunset Drift",
    caption: "Sunset Drift",
    subtitle: "Peaceful twilight hues ending a magical paddle",
    category: "sunset",
    alt: "Sunset over backwater lagoons - Sunset Drift",
  },
  {
    id: "curated-g4-group-mangrove",
    src: "/assets/group-mangrove.jpg",
    filename: "group-mangrove.jpg",
    title: "Shared Journeys",
    caption: "Shared Journeys",
    subtitle: "Friends and paddlers exploring together",
    category: "happy-guests",
    alt: "Kayakers paddling together through backwaters - Shared Journeys",
  },
  {
    id: "curated-g5-chinese-nets-dusk",
    src: "/assets/chinese-nets-dusk.jpg",
    filename: "chinese-nets-dusk.jpg",
    title: "Heritage Coastline",
    caption: "Heritage Coastline",
    subtitle: "Iconic fishing net structures along the waterways",
    category: "sunset",
    alt: "Chinese fishing nets silhouetted at dusk in Kochi - Heritage Coastline",
  },
  {
    id: "curated-g6-night-glow",
    src: "/assets/night-glow.jpg",
    filename: "night-glow.jpg",
    title: "Evening Reflections",
    caption: "Evening Reflections",
    subtitle: "Quiet water mirrors the soft evening sky",
    category: "golden-hour",
    alt: "Night glow on backwater reflections - Evening Reflections",
  },
  {
    id: "curated-g7-paddle-morning",
    src: "/assets/paddle-morning.jpg",
    filename: "paddle-morning.jpg",
    title: "Dawn Stillness",
    caption: "Dawn Stillness",
    subtitle: "Glass-like waters before the world wakes",
    category: "sunrise",
    alt: "Solo kayak on morning mirror water - Dawn Stillness",
  },
  {
    id: "curated-g8-explore",
    src: "/assets/explore.jpg",
    filename: "explore.jpg",
    title: "Backwater Passage",
    caption: "Backwater Passage",
    subtitle: "Deep into Kerala’s pristine aquatic ecosystem",
    category: "mangrove",
    alt: "Explorer kayak advancing through green lagoon - Backwater Passage",
  },
  {
    id: "curated-g9-sunrise-group",
    src: "/assets/sunrise-group.jpg",
    filename: "sunrise-group.jpg",
    title: "Morning Paddlers",
    caption: "Morning Paddlers",
    subtitle: "Group greeting the dawn on Kochi backwaters",
    category: "happy-guests",
    alt: "Group kayaking session at sunrise in Kochi - Morning Paddlers",
  },
];

/**
 * Category descriptions displayed when a category is selected.
 */
export const categoryDescriptions: Record<GalleryCategory, string> = {
  all: "Real scenes, golden morning light, and lush green channels straight from our daily excursions in Kochi.",
  sunrise: "Early morning calm, mirror waters, and the first light breaking over Kochi backwaters.",
  sunset: "Peaceful twilight drifts, golden skies, and evening calm along the waterways.",
  mangrove: "Sheltered natural trails, emerald green canopies, and quiet mangrove passages.",
  "winged-visitors":
    "Paddle through the mangroves and discover the fascinating birds that visit these tranquil backwaters.",
  "golden-hour": "Warm golden light, glowing skies, and atmospheric water reflections.",
  "happy-guests": "Smiles, memories, and shared adventures from our daily kayaking guests.",
};

/**
 * Customizable caption mapping (1-3 words)
 * Maps normalized base filename (lowercase, trimmed) to short visitor-facing caption.
 */
export const captionMap: Record<string, string> = {
  // Legacy curated assets
  sunrise: "Golden Sunrise",
  "mangrove channel": "Mangrove Tunnels",
  sunset: "Sunset Drift",
  "group mangrove": "Shared Journeys",
  "chinese nets dusk": "Heritage Coastline",
  "night glow": "Evening Reflections",
  "paddle morning": "Dawn Stillness",
  explore: "Backwater Passage",
  "sunrise group": "Morning Paddlers",

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

  // Winged Visitors (birds)
  "birds 1": "Coastal Egret",
  "birds (1)": "Coastal Egret",
  birds1: "Coastal Egret",
  "birds 2": "Mangrove Kingfisher",
  "birds (2)": "Mangrove Kingfisher",
  birds2: "Mangrove Kingfisher",
  "birds 3": "Backwater Heron",
  "birds (3)": "Backwater Heron",
  birds3: "Backwater Heron",
  "birds 4": "River Tern",
  "birds (4)": "River Tern",
  birds4: "River Tern",
  "birds 5": "Brahminy Kite",
  "birds (5)": "Brahminy Kite",
  birds5: "Brahminy Kite",
  "birds 6": "Soaring Cormorant",
  "birds (6)": "Soaring Cormorant",
  birds6: "Soaring Cormorant",
  "birds 7": "Little Cormorant",
  "birds (7)": "Little Cormorant",
  birds7: "Little Cormorant",
  "birds 8": "Pond Heron",
  "birds (8)": "Pond Heron",
  birds8: "Pond Heron",
  "birds 9": "White-throated Kingfisher",
  "birds (9)": "White-throated Kingfisher",
  birds9: "White-throated Kingfisher",
  "birds 10": "Darter",
  "birds (10)": "Darter",
  birds10: "Darter",
  "birds 11": "Coastal Egret",
  "birds (11)": "Coastal Egret",
  birds11: "Coastal Egret",
  "birds 12": "Backwater Heron",
  "birds (12)": "Backwater Heron",
  birds12: "Backwater Heron",
  "birds11 (1)": "Coastal Egret",
  "birds11 1": "Coastal Egret",
  "birds11 (2)": "Mangrove Kingfisher",
  "birds11 2": "Mangrove Kingfisher",
  "birds11 (3)": "Backwater Heron",
  "birds11 3": "Backwater Heron",
  "birds11 (4)": "River Tern",
  "birds11 4": "River Tern",
  "birds11 (5)": "Brahminy Kite",
  "birds11 5": "Brahminy Kite",
  "winged visitors 1": "Coastal Egret",
  "winged visitors 2": "Mangrove Kingfisher",
  "winged visitors 3": "Backwater Heron",
  "winged visitors 4": "River Tern",

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
 * Normalizes an asset path or filename into a canonical key for deduplication.
 */
export function getAssetKey(filepathOrUrl: string): string {
  const withoutQuery = filepathOrUrl.split("?")[0] ?? filepathOrUrl;
  const clean = withoutQuery.split("#")[0] ?? filepathOrUrl;
  const segments = clean.split(/[/\\]/);
  const filename = segments[segments.length - 1] ?? clean;
  return filename
    .replace(/\.[^/.]+$/, "")
    .toLowerCase()
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Detects whether a filename represents a bird / Winged Visitors photograph.
 * Matches filenames starting with "birds" or "winged visitors" followed by a serial number
 * case-insensitively, supporting spaces, underscores, and hyphens (e.g. birds1, birds_12, birds (3)).
 */
export function isBirdFilename(filename: string): boolean {
  const base = getBaseName(filename);
  return (
    /^(birds?|winged[\s_-]*visitors?)[\s_-]*\(?\d+/i.test(base) ||
    /^birds?$/i.test(base) ||
    base.toLowerCase().startsWith("bird") ||
    base.toLowerCase().startsWith("winged visitor")
  );
}

/**
 * Determine category from filename, ignoring capitalization, hyphens, and underscores.
 * Supports non-sequential numbering (e.g. Sunrise 12, Mangrove 11, birds 1).
 * Backward-compatible with older curated assets.
 */
export function getCategoryFromFilename(
  filename: string,
):
  | "sunrise"
  | "sunset"
  | "mangrove"
  | "winged-visitors"
  | "golden-hour"
  | "happy-guests"
  | "general" {
  const base = getBaseName(filename)
    .toLowerCase()
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  // Backward-compatible older asset matching
  if (base === "paddle morning") return "sunrise";
  if (base === "chinese nets dusk") return "sunset";
  if (base === "night glow") return "golden-hour";
  if (base === "group mangrove" || base === "sunrise group") return "happy-guests";
  if (base === "mangrove channel" || base === "explore") return "mangrove";

  // Winged Visitors (birds)
  if (
    isBirdFilename(filename) ||
    base.startsWith("bird") ||
    base.startsWith("birds") ||
    base.startsWith("winged visitor") ||
    base.startsWith("winged visitors")
  ) {
    return "winged-visitors";
  }

  // Golden Hour
  if (base.startsWith("golden hour") || base.startsWith("goldenhour")) {
    return "golden-hour";
  }

  // Happy Guests
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
  category:
    | "sunrise"
    | "sunset"
    | "mangrove"
    | "winged-visitors"
    | "golden-hour"
    | "happy-guests"
    | "general",
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
    case "winged-visitors":
      return "Winged Visitors";
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
    case "winged-visitors":
      return "Winged Visitors";
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
    case "winged-visitors":
      return "Winged Visitors";
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
    category === "winged-visitors"
      ? "Winged Visitors"
      : category === "golden-hour"
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
  ["/src/Gallery/*.{jpg,jpeg,png,webp,avif}", "/src/Gallery/*.{JPG,JPEG,PNG,WEBP,AVIF}"],
  { eager: true, query: "?url", import: "default" },
);

// Fallback discovery for public/assets/gallery/
const publicGalleryModules = import.meta.glob<string>(
  [
    "/public/assets/gallery/*.{jpg,jpeg,png,webp,avif}",
    "/public/assets/gallery/*.{JPG,JPEG,PNG,WEBP,AVIF}",
  ],
  { eager: true, query: "?url", import: "default" },
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
 * Unified Gallery Registry
 *
 * Merges curated legacy gallery images with auto-discovered assets.
 * Deduplicates by resolved asset key so no image appears twice.
 */
export function getGalleryPhotos(): GalleryPhoto[] {
  const registry = new Map<string, GalleryPhoto>();

  // 1. Register original curated gallery images first
  for (const item of curatedGalleryItems) {
    if (isExcludedGalleryImage(item.filename)) continue;

    const key = getAssetKey(item.filename);
    registry.set(key, {
      id: item.id,
      filename: item.filename,
      src: item.src,
      category: item.category,
      caption: item.caption,
      subtitle: item.subtitle,
      alt: item.alt,
      isCurated: true,
    });
  }

  // 2. Discover images from src/Gallery/
  for (const [path, url] of Object.entries(srcGalleryModules)) {
    const filename = getFilename(path);
    if (isExcludedGalleryImage(filename)) continue;

    const key = getAssetKey(filename);
    if (!registry.has(key)) {
      const category = getCategoryFromFilename(filename);
      const caption = getCaptionFromFilename(filename, category);

      registry.set(key, {
        id: `gallery-src-${key.replace(/[^a-z0-9]/g, "-")}`,
        filename,
        src: url,
        category,
        caption,
        alt: getAltText(caption, category),
      });
    }
  }

  // 3. Discover images from public/assets/gallery/
  for (const [path, rawUrl] of Object.entries(publicGalleryModules)) {
    const filename = getFilename(path);
    if (isExcludedGalleryImage(filename)) continue;

    const key = getAssetKey(filename);
    if (!registry.has(key)) {
      const category = getCategoryFromFilename(filename);
      const caption = getCaptionFromFilename(filename, category);
      const cleanUrl = rawUrl.startsWith("/public/assets/")
        ? rawUrl.replace(/^\/public/, "")
        : rawUrl;

      registry.set(key, {
        id: `gallery-pub-${key.replace(/[^a-z0-9]/g, "-")}`,
        filename,
        src: cleanUrl,
        category,
        caption,
        alt: getAltText(caption, category),
      });
    }
  }

  // Return list with curated photos preserved first, followed by naturally sorted discovered photos
  const allPhotos = Array.from(registry.values());
  const curated = allPhotos.filter((p) => p.isCurated);
  const discovered = allPhotos.filter((p) => !p.isCurated);

  discovered.sort((a, b) =>
    a.filename.localeCompare(b.filename, undefined, {
      numeric: true,
      sensitivity: "base",
    }),
  );

  return [...curated, ...discovered];
}

/**
 * The seven gallery filters in exact required order:
 * All · Sunrise · Sunset · Mangrove · Winged Visitors · Golden Hour · Happy Guests
 */
export const galleryCategories: { key: GalleryCategory; label: string }[] = [
  { key: "all", label: "All" },
  { key: "sunrise", label: "Sunrise" },
  { key: "sunset", label: "Sunset" },
  { key: "mangrove", label: "Mangrove" },
  { key: "winged-visitors", label: "Winged Visitors" },
  { key: "golden-hour", label: "Golden Hour" },
  { key: "happy-guests", label: "Happy Guests" },
];
