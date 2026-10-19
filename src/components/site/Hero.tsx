import { useEffect, useRef, useState } from "react";
import { ArrowRight, MapPin, Menu, Phone, X } from "lucide-react";
import heroVideo from "@/assets/videos/kayora-hero.mp4.asset.json";
import heroPoster from "@/assets/paddle-morning.jpg.asset.json";
import logo from "@/assets/logo.jpg.asset.json";
import { business, telLink, whatsappLink } from "@/config/business";
import { InstagramIcon, WhatsAppIcon } from "./icons";

export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#experiences", label: "Experiences" },
  { href: "#about", label: "About" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

function Header() {
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
        scrolled ? "bg-deep/90 py-2 shadow-soft backdrop-blur-md" : "py-4"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 lg:px-8">
        <a href="#home" className="flex min-w-0 items-center gap-2.5 text-on-dark">
          <img src={logo.url} alt="" className="h-10 w-10 shrink-0 rounded-full object-cover object-top ring-2 ring-on-dark/30" />
          <span className="truncate text-lg font-extrabold tracking-tight">
            Kayora<span className="font-medium text-sage"> Kayaking</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-on-dark/85 transition-colors hover:text-on-dark">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a href={telLink} aria-label={`Call ${business.phoneDisplay}`} className="grid h-10 w-10 place-items-center rounded-full border border-on-dark/25 text-on-dark transition hover:bg-on-dark/10">
            <Phone className="h-4 w-4" />
          </a>
          <a href={business.instagramUrl} {...ext} aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full border border-on-dark/25 text-on-dark transition hover:bg-on-dark/10">
            <InstagramIcon className="h-4 w-4" />
          </a>
          <a href={whatsappLink()} {...ext} className="ml-1 inline-flex items-center gap-2 rounded-full bg-whatsapp px-5 py-2.5 text-sm font-bold text-deep shadow-glow transition hover:-translate-y-0.5">
            <WhatsAppIcon className="h-4 w-4" /> Book on WhatsApp
          </a>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <span className="flex items-center gap-1 text-xs font-medium text-on-dark/90">
            <MapPin className="h-3.5 w-3.5" /> Kochi, Kerala
          </span>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-full bg-on-dark/15 text-on-dark backdrop-blur-sm"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="mx-4 mt-3 rounded-3xl bg-deep/95 p-3 shadow-soft backdrop-blur-md lg:hidden" aria-label="Mobile">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 font-semibold text-on-dark hover:bg-on-dark/10">
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

export function Hero() {
  const ref = useRef<HTMLVideoElement>(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setShowVideo(true);
  }, []);

  useEffect(() => {
    if (!showVideo || !ref.current) return;
    ref.current.play().catch(() => setShowVideo(false));
  }, [showVideo]);

  return (
    <section id="home" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-deep">
      <img src={heroPoster.url} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" fetchPriority="high" />
      {showVideo && (
        <video
          ref={ref}
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          src={heroVideo.url}
          poster={heroPoster.url}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          onError={() => setShowVideo(false)}
        />
      )}
      <div className="absolute inset-0 -z-10 bg-hero-overlay" />

      <Header />

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-5 pb-28 pt-28 lg:justify-center lg:px-8 lg:pb-16">
        <div className="max-w-2xl animate-fade-up text-on-dark">
          <p className="text-[11px] font-bold tracking-[0.28em] text-sage">YOUR NEXT ESCAPE STARTS HERE</p>
          <h1 className="text-hero-shadow mt-4 text-[2.6rem] font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            Find Your Flow.
            <br />
            <span className="text-mint">Follow the Water.</span>
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-on-dark/85 sm:text-lg">
            Escape into the serene backwaters of Kochi. Paddle through hidden mangroves, explore beautiful waterways, and discover Kerala from a different perspective.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#experiences" className="group inline-flex items-center gap-2 rounded-full bg-on-dark px-6 py-3.5 text-sm font-bold text-deep transition hover:bg-mint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint">
              Explore Kayaking <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
            <a href={whatsappLink()} {...ext} className="inline-flex items-center rounded-full border border-on-dark/40 px-6 py-3.5 text-sm font-bold text-on-dark backdrop-blur-sm transition hover:bg-on-dark/10">
              Book Your Adventure
            </a>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2 sm:flex sm:gap-3">
            <a href={whatsappLink()} {...ext} className="flex flex-col items-center gap-1.5 rounded-2xl bg-whatsapp px-2 py-3 text-center text-[11px] font-bold text-deep shadow-glow transition hover:-translate-y-0.5 active:scale-95 sm:flex-row sm:rounded-full sm:px-5 sm:text-sm">
              <WhatsAppIcon className="h-5 w-5" /> Book on WhatsApp
            </a>
            <a href={telLink} className="flex flex-col items-center gap-1.5 rounded-2xl border border-on-dark/25 bg-on-dark/10 px-2 py-3 text-center text-[11px] font-bold text-on-dark backdrop-blur-sm transition hover:bg-on-dark/20 active:scale-95 sm:flex-row sm:rounded-full sm:px-5 sm:text-sm">
              <Phone className="h-5 w-5 text-mint" /> Call Us
            </a>
            <a href={business.instagramUrl} {...ext} className="flex flex-col items-center gap-1.5 rounded-2xl border border-on-dark/25 bg-on-dark/10 px-2 py-3 text-center text-[11px] font-bold text-on-dark backdrop-blur-sm transition hover:bg-on-dark/20 active:scale-95 sm:flex-row sm:rounded-full sm:px-5 sm:text-sm">
              <span className="grid h-5 w-5 place-items-center rounded-md bg-instagram"><InstagramIcon className="h-3.5 w-3.5" /></span>
              Follow Our Adventures
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
