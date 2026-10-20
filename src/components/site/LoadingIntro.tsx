import { useEffect, useState } from "react";
import { media } from "@/config/media";

const INTRO_STORAGE_KEY = "kayora_intro_seen";

export function LoadingIntro() {
  const [isActive, setIsActive] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Only run on browser client
    if (typeof window === "undefined") return;

    // Show only on initial page entry (not on return visits within the same session)
    try {
      if (sessionStorage.getItem(INTRO_STORAGE_KEY) === "true") {
        return;
      }
    } catch {
      // Storage access might be restricted; continue with normal render
    }

    // Skip intro if user prefers reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      try {
        sessionStorage.setItem(INTRO_STORAGE_KEY, "true");
      } catch {
        // ignore
      }
      return;
    }

    // Activate the intro overlay
    setIsActive(true);

    // Sequence timing:
    // 0 - 0.4s: Golden sunrise glow emerges on deep teal
    // 0.4 - 1.2s: Logo fades in & scales from 94% to 100%, turquoise ripples pulse
    // 1.2 - 1.8s: "YOUR ADVENTURE BEGINS HERE" fades in
    // 1.8 - 2.3s: Intro overlay fades away to reveal hero video
    const fadeOutTimer = window.setTimeout(() => {
      setIsFadingOut(true);
    }, 1800);

    const endTimer = window.setTimeout(() => {
      setIsActive(false);
      try {
        sessionStorage.setItem(INTRO_STORAGE_KEY, "true");
      } catch {
        // ignore
      }
    }, 2300);

    return () => {
      window.clearTimeout(fadeOutTimer);
      window.clearTimeout(endTimer);
    };
  }, []);

  if (!isActive) return null;

  return (
    <aside
      aria-label="Loading intro"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#123D40] transition-opacity duration-500 ease-in-out ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="relative flex flex-col items-center justify-center px-6">
        {/* Warm Golden Sunrise Glow behind the emblem */}
        <div
          className="pointer-events-none absolute -translate-y-4 rounded-full blur-2xl"
          style={{
            width: "min(360px, 80vw)",
            height: "min(360px, 80vw)",
            background:
              "radial-gradient(circle, rgba(251, 191, 36, 0.48) 0%, rgba(245, 158, 11, 0.22) 42%, rgba(18, 61, 64, 0) 72%)",
            animation: "sunrise-glow 2.3s ease-out forwards",
          }}
          aria-hidden="true"
        />

        {/* Soft Turquoise Water Ripples outward beneath the logo */}
        <div
          className="pointer-events-none absolute top-[68%] left-1/2 -translate-x-1/2 -translate-y-1/2"
          aria-hidden="true"
        >
          <div
            className="rounded-full border border-mint/45"
            style={{
              width: "min(320px, 76vw)",
              height: "min(72px, 17vw)",
              animation: "water-ripple 1.6s cubic-bezier(0.2, 0.6, 0.35, 1) 0.45s forwards",
            }}
          />
          <div
            className="absolute inset-0 rounded-full border border-mint/30"
            style={{
              width: "min(320px, 76vw)",
              height: "min(72px, 17vw)",
              animation: "water-ripple 1.6s cubic-bezier(0.2, 0.6, 0.35, 1) 0.8s forwards",
            }}
          />
        </div>

        {/* Kayora Exact Supplied Emblem Logo */}
        <div className="relative z-10 flex flex-col items-center">
          <img
            src={media.emblemLogo}
            alt="Kayora Kayaking Kochi Emblem"
            className="h-auto w-44 max-h-[46vh] max-w-[72vw] object-contain drop-shadow-[0_12px_28px_rgba(0,0,0,0.4)] sm:w-56 md:w-64 lg:w-72"
            style={{
              animation: "logo-intro 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.38s both",
            }}
          />

          {/* Letter-spaced Subtitle */}
          <p
            className="mt-6 text-center text-[10px] font-semibold tracking-[0.28em] text-mint uppercase sm:text-xs md:text-sm"
            style={{
              animation: "text-intro 0.65s ease-out 1.2s both",
            }}
          >
            Your Adventure Begins Here
          </p>
        </div>
      </div>
    </aside>
  );
}
