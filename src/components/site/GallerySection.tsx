import { useState } from "react";
import { Camera, X, ZoomIn } from "lucide-react";
import { media } from "@/config/media";

interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: "all" | "sunrise" | "mangroves" | "sunset";
  caption: string;
}

const items: GalleryItem[] = [
  {
    id: "g1",
    src: media.sunrise,
    alt: "Paddler greeting the sunrise in Kochi",
    title: "Golden Sunrise",
    category: "sunrise",
    caption: "Early morning calm over Kadamakkudy waters",
  },
  {
    id: "g2",
    src: media.mangroveChannel,
    alt: "Mangrove canal lined with tropical trees",
    title: "Mangrove Tunnels",
    category: "mangroves",
    caption: "Sheltered natural passages surrounded by wildlife",
  },
  {
    id: "g3",
    src: media.sunset,
    alt: "Sunset over backwater lagoons",
    title: "Sunset Drift",
    category: "sunset",
    caption: "Peaceful twilight hues ending a magical paddle",
  },
  {
    id: "g4",
    src: media.groupMangrove,
    alt: "Kayakers paddling together through backwaters",
    title: "Shared Journeys",
    category: "mangroves",
    caption: "Friends and paddlers exploring together",
  },
  {
    id: "g5",
    src: media.chineseNetsDusk,
    alt: "Chinese fishing nets silhouetted at dusk in Kochi",
    title: "Heritage Coastline",
    category: "sunset",
    caption: "Iconic fishing net structures along the waterways",
  },
  {
    id: "g6",
    src: media.nightGlow,
    alt: "Night glow on backwater reflections",
    title: "Evening Reflections",
    category: "sunset",
    caption: "Quiet water mirrors the soft evening sky",
  },
  {
    id: "g7",
    src: media.paddleMorning,
    alt: "Solo kayak on morning mirror water",
    title: "Dawn Stillness",
    category: "sunrise",
    caption: "Glass-like waters before the world wakes",
  },
  {
    id: "g8",
    src: media.explore,
    alt: "Explorer kayak advancing through green lagoon",
    title: "Backwater Passage",
    category: "mangroves",
    caption: "Deep into Kerala’s pristine aquatic ecosystem",
  },
];

const categories = [
  { key: "all", label: "All Photos" },
  { key: "sunrise", label: "Sunrise" },
  { key: "mangroves", label: "Mangrove Trails" },
  { key: "sunset", label: "Sunset & Twilight" },
] as const;

export function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeLightbox, setActiveLightbox] = useState<GalleryItem | null>(null);

  const filtered =
    activeCategory === "all" ? items : items.filter((item) => item.category === activeCategory);

  return (
    <section id="gallery" className="relative scroll-mt-20 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-forest/20 bg-mint/80 px-4 py-1.5 shadow-xs">
            <Camera className="h-3.5 w-3.5 text-deep" />
            <span className="text-xs font-bold tracking-widest text-deep uppercase">
              Moments on Water
            </span>
          </div>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-deep sm:text-4xl lg:text-5xl">
            Captured from the Kayak
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Real scenes, golden morning light, and lush green channels straight from our daily
            excursions in Kochi.
          </p>

          {/* Filter Pills (inspired by yacht app reference) */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {categories.map((c) => {
              const isActive = activeCategory === c.key;
              return (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => setActiveCategory(c.key)}
                  className={`rounded-full px-5 py-2 text-xs font-bold transition-all active:scale-95 sm:text-sm ${
                    isActive
                      ? "bg-deep text-on-dark shadow-sm"
                      : "border border-border/80 bg-card text-deep hover:bg-mint/40"
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {filtered.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveLightbox(item)}
              aria-label={`View ${item.title}`}
              className="group relative flex aspect-4/3 sm:aspect-square w-full cursor-zoom-in overflow-hidden rounded-3xl border border-border bg-card shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep text-left"
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep/80 via-deep/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />

              <div className="absolute right-4 bottom-4 left-4 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                <p className="text-base font-bold text-on-dark">{item.title}</p>
                <p className="mt-0.5 text-xs text-mint/90">{item.caption}</p>
              </div>

              <span className="absolute top-3 right-3 grid h-8 w-8 place-items-center rounded-full bg-deep/70 text-on-dark opacity-0 backdrop-blur-xs transition group-hover:opacity-100">
                <ZoomIn className="h-4 w-4" />
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeLightbox.title}
          className="fixed inset-0 z-50 flex items-center justify-center bg-deep/90 p-4 backdrop-blur-md animate-fade-up"
          onClick={() => setActiveLightbox(null)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setActiveLightbox(null);
          }}
        >
          <div
            className="relative max-h-[90vh] max-w-4xl overflow-hidden rounded-[2rem] border border-on-dark/20 bg-deep p-2 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveLightbox(null)}
              aria-label="Close photo preview"
              className="absolute top-4 right-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-deep/80 text-on-dark shadow-md backdrop-blur-sm transition hover:bg-deep active:scale-95"
            >
              <X className="h-5 w-5" />
            </button>

            <img
              src={activeLightbox.src}
              alt={activeLightbox.alt}
              className="max-h-[75vh] w-auto rounded-2xl object-contain mx-auto"
            />

            <div className="p-4 text-center">
              <h3 className="text-lg font-bold text-on-dark">{activeLightbox.title}</h3>
              <p className="mt-1 text-sm text-sage">{activeLightbox.caption}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
