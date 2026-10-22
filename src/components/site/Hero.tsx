import { useEffect, useRef, useState } from "react";
import { ArrowRight, Mail, MapPin, Menu, Phone, X } from "lucide-react";
import { media } from "@/config/media";
import { business, emailLink, telLink, whatsappLink } from "@/config/business";
import { navLinks } from "@/config/navigation";
import { InstagramIcon, WhatsAppIcon } from "./icons";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

// Shared glassmorphism styling for hero CTA buttons
const heroCtaClass =
  "inline-flex items-center justify-center gap-2 rounded-full border border-on-dark/35 bg-deep/40 px-4 py-2.5 text-xs font-semibold text-on-dark backdrop-blur-sm transition hover:bg-on-dark/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint active:scale-95 sm:px-5 sm:py-3 sm:text-sm sm:font-bold";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-deep/90 py-2.5 shadow-soft backdrop-blur-md" : "py-3 sm:py-4"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a
          href="#home"
          className="flex min-w-0 items-center gap-2.5 text-on-dark transition-opacity hover:opacity-90"
        >
          <img
            src={media.logo}
            alt="Kayora Kayaking Kochi"
            className="h-9 w-9 shrink-0 rounded-full object-cover object-top ring-2 ring-on-dark/30 sm:h-10 sm:w-10"
          />
          <span className="truncate text-base font-extrabold tracking-tight sm:text-lg">
            Kayora<span className="font-medium text-sage"> Kayaking</span>
          </span>
        </a>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-on-dark/85 transition-colors hover:text-on-dark"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2.5 lg:flex">
          <a
            href={emailLink()}
            aria-label={`Email ${business.email}`}
            className="grid h-10 w-10 place-items-center rounded-full border border-on-dark/25 text-on-dark transition hover:bg-on-dark/15 active:scale-95"
          >
            <Mail className="h-4 w-4" />
          </a>
          <a
            href={telLink}
            aria-label={`Call ${business.phoneDisplay}`}
            className="grid h-10 w-10 place-items-center rounded-full border border-on-dark/25 text-on-dark transition hover:bg-on-dark/15 active:scale-95"
          >
            <Phone className="h-4 w-4" />
          </a>
          <a
            href={business.instagramUrl}
            {...ext}
            aria-label="Instagram profile"
            className="grid h-10 w-10 place-items-center rounded-full border border-on-dark/25 text-on-dark transition hover:bg-on-dark/15 active:scale-95"
          >
            <InstagramIcon className="h-4 w-4" />
          </a>
          <a
            href={whatsappLink()}
            {...ext}
            className="ml-1 inline-flex items-center gap-2 rounded-full bg-whatsapp px-5 py-2.5 text-sm font-bold text-deep shadow-glow transition hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
          >
            <WhatsAppIcon className="h-4 w-4" /> Book on WhatsApp
          </a>
        </div>

        <div className="flex items-center gap-2.5 lg:hidden">
          <a
            href={business.headerLocationMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Kayora Kayaking location in Google Maps"
            className="flex items-center gap-1 rounded-full bg-on-dark/10 px-2.5 py-1 text-[11px] font-medium text-on-dark/90 backdrop-blur-sm transition-colors hover:bg-on-dark/20 hover:text-on-dark active:scale-95"
          >
            <MapPin className="h-3 w-3 text-sage" /> Kochi
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid h-9 w-9 place-items-center rounded-full bg-on-dark/15 text-on-dark backdrop-blur-sm transition active:scale-95"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="mx-4 mt-2.5 rounded-3xl border border-on-dark/15 bg-deep/95 p-3 shadow-soft backdrop-blur-md lg:hidden"
          aria-label="Mobile navigation"
        >
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-2xl px-4 py-2.5 text-sm font-semibold text-on-dark transition hover:bg-on-dark/10"
            >
              {l.label}
            </a>
          ))}
          <div className="mt-2 flex flex-col gap-2 border-t border-on-dark/15 pt-2">
            <a
              href={whatsappLink()}
              {...ext}
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 rounded-2xl bg-whatsapp px-4 py-2.5 text-sm font-bold text-deep shadow-glow"
            >
              <WhatsAppIcon className="h-4 w-4" /> Book on WhatsApp
            </a>
            <div className="grid grid-cols-3 gap-2">
              <a
                href={telLink}
                className="flex items-center justify-center gap-1.5 rounded-2xl border border-on-dark/20 bg-on-dark/10 px-2 py-2 text-xs font-semibold text-on-dark"
              >
                <Phone className="h-3.5 w-3.5 text-mint" /> Call Us
              </a>
              <a
                href={emailLink()}
                className="flex items-center justify-center gap-1.5 rounded-2xl border border-on-dark/20 bg-on-dark/10 px-2 py-2 text-xs font-semibold text-on-dark"
              >
                <Mail className="h-3.5 w-3.5 text-mint" /> Email
              </a>
              <a
                href={business.instagramUrl}
                {...ext}
                className="flex items-center justify-center gap-1.5 rounded-2xl border border-on-dark/20 bg-on-dark/10 px-2 py-2 text-xs font-semibold text-on-dark"
              >
                <InstagramIcon className="h-3.5 w-3.5 text-mint" /> Instagram
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}

export function Hero() {
  const ref = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState<string>(media.heroVideo);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mql.matches) {
      setReducedMotion(true);
      return;
    }

    const onMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener("change", onMotionChange);
    return () => mql.removeEventListener("change", onMotionChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const video = ref.current;
    if (!video) return;

    // Force DOM properties to satisfy browser autoplay requirements
    video.defaultMuted = true;
    video.muted = true;

    const attemptPlay = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If browser policy delayed autoplay, resume on the first user interaction
          const resumeOnInteraction = () => {
            if (ref.current) {
              ref.current.defaultMuted = true;
              ref.current.muted = true;
              ref.current.play().catch(() => {});
            }
          };
          window.addEventListener("touchstart", resumeOnInteraction, { once: true, passive: true });
          window.addEventListener("scroll", resumeOnInteraction, { once: true, passive: true });
          window.addEventListener("click", resumeOnInteraction, { once: true });
        });
      }
    };

    attemptPlay();
  }, [videoSrc, reducedMotion]);

  const handleVideoError = () => {
    // If the hosted video fails, fall back to the bundled local video asset
    if (media.localHeroVideo && videoSrc !== media.localHeroVideo) {
      setVideoSrc(media.localHeroVideo);
    }
  };

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-deep"
    >
      <img
        src={media.heroPoster}
        alt="Kayaking in Kochi backwaters at dawn"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        fetchPriority="high"
      />
      {!reducedMotion && (
        <video
          key={videoSrc}
          ref={ref}
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
          src={videoSrc}
          poster={media.heroPoster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          onLoadedData={(e) => {
            const v = e.currentTarget;
            v.defaultMuted = true;
            v.muted = true;
            v.play().catch(() => {});
          }}
          onError={handleVideoError}
        />
      )}
      <div className="absolute inset-0 -z-10 bg-hero-overlay" />

      <Header />

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-4 pb-20 pt-20 sm:px-6 sm:pb-24 lg:justify-center lg:px-8 lg:pb-16 lg:pt-28">
        <div className="max-w-2xl animate-fade-up text-left text-on-dark">
          {/* Subtle text link to featured Mangrove Forest Ride */}
          <div>
            <a
              href="#featured-ride"
              className="group inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-sage transition-colors hover:text-mint active:scale-95 sm:text-sm"
            >
              <span>DISCOVER THE MANGROVES</span>
              <ArrowRight className="h-3.5 w-3.5 text-sage transition-transform group-hover:translate-x-1 group-hover:text-mint" />
            </a>
          </div>

          {/* Clean, bold, responsive headline with line height 1.08 and no text overlaps */}
          <h1 className="mt-2 text-[1.85rem] font-bold leading-[1.08] tracking-tight sm:mt-3 sm:text-5xl lg:text-7xl">
            Find Your Flow.
            <br />
            <span className="text-mint">Follow the Water.</span>
          </h1>

          {/* Compact 2-3 line hero description */}
          <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-on-dark/85 sm:mt-4 sm:text-base lg:text-lg">
            Escape into Kochi&apos;s serene backwaters. Paddle through lush mangroves and discover Kerala from a new perspective.
          </p>

          {/* Refined CTA buttons sharing identical glassmorphism styling */}
          <div className="mt-4 flex flex-wrap items-center gap-2.5 sm:mt-6 sm:gap-3">
            <a
              href="#experiences"
              className={`group ${heroCtaClass}`}
            >
              <span>Explore Kayaking</span>
              <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
            </a>
            <a
              href={whatsappLink()}
              {...ext}
              className={heroCtaClass}
            >
              Book Your Adventure
            </a>
          </div>

          {/* Responsive hero contact actions: 2-column grid on mobile, sleek pill row on tablet/desktop */}
          <div className="mt-3.5 grid grid-cols-2 gap-2 sm:mt-5 sm:flex sm:flex-wrap sm:gap-2.5">
            <a
              href={whatsappLink()}
              {...ext}
              className="flex items-center justify-center gap-1.5 rounded-xl bg-[#25D366] px-3 py-2 text-center text-xs font-bold text-deep shadow-sm transition hover:brightness-105 active:scale-95 sm:rounded-full sm:px-4 sm:py-2.5"
            >
              <WhatsAppIcon className="h-4 w-4 shrink-0" />
              <span className="truncate">WhatsApp Us</span>
            </a>
            <a
              href={telLink}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-on-dark/20 bg-deep/60 px-3 py-2 text-center text-xs font-semibold text-on-dark backdrop-blur-sm transition hover:bg-on-dark/15 active:scale-95 sm:rounded-full sm:px-4 sm:py-2.5"
            >
              <Phone className="h-4 w-4 shrink-0 text-mint" />
              <span className="truncate">Call Direct</span>
            </a>
            <a
              href={emailLink()}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-on-dark/20 bg-deep/60 px-3 py-2 text-center text-xs font-semibold text-on-dark backdrop-blur-sm transition hover:bg-on-dark/15 active:scale-95 sm:rounded-full sm:px-4 sm:py-2.5"
            >
              <Mail className="h-4 w-4 shrink-0 text-mint" />
              <span className="truncate">Email Enquiry</span>
            </a>
            <a
              href={business.instagramUrl}
              {...ext}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-on-dark/20 bg-deep/60 px-3 py-2 text-center text-xs font-semibold text-on-dark backdrop-blur-sm transition hover:bg-on-dark/15 active:scale-95 sm:rounded-full sm:px-4 sm:py-2.5"
            >
              <span className="grid h-4 w-4 shrink-0 place-items-center rounded bg-instagram">
                <InstagramIcon className="h-3 w-3" />
              </span>
              <span className="truncate">Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
