import { useState, useMemo, useEffect, useRef } from "react";
import { Camera, X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import {
  getGalleryPhotos,
  galleryCategories,
  categoryDescriptions,
  getCategoryBadgeLabel,
  getCategoryLightboxLabel,
  type GalleryCategory,
  type GalleryPhoto,
} from "@/lib/gallery";
import { business } from "@/config/business";
import { InstagramIcon } from "./icons";

export function GallerySection() {
  const allPhotos = useMemo(() => getGalleryPhotos(), []);
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("all");
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  // Focus restoration ref
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const touchStartRef = useRef<number | null>(null);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<GalleryCategory, number> = {
      all: allPhotos.length,
      sunrise: 0,
      sunset: 0,
      mangrove: 0,
      "winged-visitors": 0,
      "golden-hour": 0,
      "happy-guests": 0,
    };
    for (const p of allPhotos) {
      if (p.category in counts && p.category !== "all") {
        counts[p.category as Exclude<GalleryCategory, "all">]++;
      }
    }
    return counts;
  }, [allPhotos]);

  // Filter photos based on selected category (general photos appear under "all" only)
  const filteredPhotos = useMemo(() => {
    if (activeCategory === "all") return allPhotos;
    return allPhotos.filter((p) => p.category === activeCategory);
  }, [allPhotos, activeCategory]);

  const isOpen =
    activeLightboxIndex !== null &&
    activeLightboxIndex >= 0 &&
    activeLightboxIndex < filteredPhotos.length;

  const currentPhoto = isOpen ? filteredPhotos[activeLightboxIndex] : null;

  // Open lightbox
  const openLightbox = (index: number, e: React.MouseEvent<HTMLButtonElement>) => {
    triggerRef.current = e.currentTarget;
    setActiveLightboxIndex(index);
  };

  // Close lightbox
  const closeLightbox = () => {
    setActiveLightboxIndex(null);
    if (triggerRef.current) {
      triggerRef.current.focus();
    }
  };

  // Navigate lightbox
  const showPrev = () => {
    if (activeLightboxIndex === null || filteredPhotos.length === 0) return;
    setActiveLightboxIndex((prev) =>
      prev === null ? null : (prev - 1 + filteredPhotos.length) % filteredPhotos.length
    );
  };

  const showNext = () => {
    if (activeLightboxIndex === null || filteredPhotos.length === 0) return;
    setActiveLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % filteredPhotos.length
    );
  };

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartRef.current === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStartRef.current - touchEnd;
    if (diff > 50) {
      showNext();
    } else if (diff < -50) {
      showPrev();
    }
    touchStartRef.current = null;
  };

  // Prevent background scrolling when lightbox is open
  useEffect(() => {
    if (isOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isOpen]);

  // Keyboard navigation (Escape, ArrowLeft, ArrowRight)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowLeft") {
        showPrev();
      } else if (e.key === "ArrowRight") {
        showNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, activeLightboxIndex, filteredPhotos.length]);

  return (
    <section id="gallery" className="relative scroll-mt-20 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg min-h-[3.25rem] transition-opacity duration-300">
            {categoryDescriptions[activeCategory] || categoryDescriptions.all}
          </p>

          {/* Category Filter Buttons */}
          <div className="mt-8 -mx-4 px-4 sm:mx-0 sm:px-0">
            <div
              role="tablist"
              aria-label="Gallery category filters"
              className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar sm:flex-wrap sm:justify-center sm:gap-2.5"
            >
              {galleryCategories.map((c) => {
                const isActive = activeCategory === c.key;
                const count = categoryCounts[c.key] ?? 0;

                return (
                  <button
                    key={c.key}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="gallery-grid"
                    type="button"
                    onClick={() => {
                      setActiveCategory(c.key);
                      setActiveLightboxIndex(null);
                    }}
                    className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold whitespace-nowrap transition-all active:scale-95 sm:px-5 sm:py-2.5 sm:text-sm ${
                      isActive
                        ? "bg-deep text-on-dark shadow-sm ring-1 ring-forest/30"
                        : "border border-border/80 bg-card text-deep hover:bg-mint/40 hover:text-deep"
                    }`}
                  >
                    <span>{c.label}</span>
                    <span
                      className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold transition-colors ${
                        isActive ? "bg-on-dark/20 text-on-dark" : "bg-deep/10 text-deep"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Gallery Image Grid */}
        <div
          id="gallery-grid"
          role="tabpanel"
          className="mt-10 sm:mt-12 grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6"
        >
          {filteredPhotos.map((photo, index) => (
            <button
              key={photo.id}
              type="button"
              onClick={(e) => openLightbox(index, e)}
              aria-label={`View photo: ${photo.caption}`}
              className="group relative flex aspect-4/3 w-full cursor-zoom-in overflow-hidden rounded-2xl sm:aspect-square sm:rounded-3xl border border-border/80 bg-card shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep text-left"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep/85 via-deep/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />

              <div className="absolute right-3 bottom-3 left-3 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                <p className="text-xs sm:text-sm font-bold text-on-dark leading-tight line-clamp-1">
                  {photo.caption}
                </p>
                <p className="mt-0.5 text-[10px] sm:text-xs text-mint/90 capitalize">
                  {getCategoryBadgeLabel(photo.category)}
                </p>
              </div>

              <span className="absolute top-2.5 right-2.5 grid h-7 w-7 sm:h-8 sm:w-8 place-items-center rounded-full bg-deep/75 text-on-dark opacity-0 backdrop-blur-xs transition group-hover:opacity-100">
                <ZoomIn className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </span>
            </button>
          ))}
        </div>

        {filteredPhotos.length === 0 && (
          <div className="mt-12 rounded-2xl border border-border/60 bg-card/60 p-8 text-center text-muted-foreground">
            <p className="text-sm">No photos found in this category yet.</p>
          </div>
        )}

        {/* Explore on Instagram CTA */}
        <div className="mt-12 text-center">
          <a
            href={business.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Explore more photos on Kayora Kayaking Instagram"
            className="inline-flex items-center gap-2 rounded-full border border-forest/20 bg-mint/40 px-6 py-3 text-xs font-bold text-deep transition hover:bg-deep hover:text-on-dark active:scale-95 sm:text-sm"
          >
            <InstagramIcon className="h-4 w-4" />
            <span>Explore on Instagram</span>
          </a>
        </div>
      </div>

      {/* Full-Screen Lightbox Modal */}
      {isOpen && currentPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={currentPhoto.caption}
          className="fixed inset-0 z-50 flex items-center justify-center bg-deep/95 p-3 sm:p-6 backdrop-blur-md animate-fade-up"
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top Bar: Position Counter & Close Button */}
          <div className="absolute top-3 inset-x-3 sm:top-5 sm:inset-x-6 z-20 flex items-center justify-between pointer-events-none">
            <div className="pointer-events-auto rounded-full border border-on-dark/20 bg-deep/80 px-3.5 py-1 text-xs font-semibold text-on-dark/90 shadow-md backdrop-blur-sm">
              <span>
                {activeLightboxIndex + 1} / {filteredPhotos.length}
              </span>
            </div>

            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Close photo preview"
              className="pointer-events-auto grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-full border border-on-dark/20 bg-deep/80 text-on-dark shadow-md backdrop-blur-sm transition hover:bg-deep active:scale-95 focus-visible:outline-2 focus-visible:outline-mint"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Controls & Center Image Container */}
          <div
            className="relative flex max-h-[92vh] w-full max-w-5xl flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Previous Photo Button */}
            {filteredPhotos.length > 1 && (
              <button
                type="button"
                onClick={showPrev}
                aria-label="Previous photo"
                className="absolute left-1 sm:left-3 z-20 grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-full border border-on-dark/20 bg-deep/80 text-on-dark shadow-lg backdrop-blur-sm transition hover:bg-forest hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-mint"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}

            {/* Main Lightbox Image (respects natural proportions with contain) */}
            <div className="relative flex max-h-[76vh] sm:max-h-[80vh] w-full items-center justify-center overflow-hidden p-1">
              <img
                src={currentPhoto.src}
                alt={currentPhoto.alt}
                className="max-h-[74vh] sm:max-h-[78vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl transition-all"
              />
            </div>

            {/* Next Photo Button */}
            {filteredPhotos.length > 1 && (
              <button
                type="button"
                onClick={showNext}
                aria-label="Next photo"
                className="absolute right-1 sm:right-3 z-20 grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-full border border-on-dark/20 bg-deep/80 text-on-dark shadow-lg backdrop-blur-sm transition hover:bg-forest hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-mint"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            )}

            {/* Short Caption Area (1-3 words) */}
            <div className="mt-3 rounded-2xl border border-on-dark/15 bg-deep/80 px-5 py-2 text-center backdrop-blur-sm">
              <h3 className="text-base sm:text-lg font-bold tracking-wide text-on-dark">
                {currentPhoto.caption}
              </h3>
              <p className="mt-0.5 text-xs text-mint/90 capitalize">
                {currentPhoto.subtitle || getCategoryLightboxLabel(currentPhoto.category)}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
