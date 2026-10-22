import { useEffect, useState } from "react";
import { media } from "@/config/media";

const INTRO_STORAGE_KEY = "kayora_intro_seen";

export function LoadingIntro() {
  const [isActive, setIsActive] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [imageError, setImageError] = useState(false);

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

    // Sequence timing (total approx. 2.0s):
    // 0 - 0.3s: Office photo appears with gentle cinematic zoom
    // 0.25 - 1.0s: Centered logo fades in with golden/sage ambient glow & water ripples
    // 0.8 - 1.4s: Tagline "YOUR ADVENTURE BEGINS HERE" fades in
    // 1.4 - 1.6s: Hold the completed cinematic scene briefly
    // 1.6 - 2.0s: Smooth fade-out dissolving seamlessly into the homepage
    const fadeOutTimer = window.setTimeout(() => {
      setIsFadingOut(true);
    }, 1600);

    const endTimer = window.setTimeout(() => {
      setIsActive(false);
      try {
        sessionStorage.setItem(INTRO_STORAGE_KEY, "true");
      } catch {
        // ignore
      }
    }, 2000);

    return () => {
      window.clearTimeout(fadeOutTimer);
      window.clearTimeout(endTimer);
    };
  }, []);

  if (!isActive) return null;

  return (
    <aside
      aria-label="Loading intro"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#123D40] transition-opacity duration-400 ease-out ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* 1. Full-screen office photograph with gentle zoom-in effect */}
      <div className="absolute inset-0 overflow-hidden">
        {!imageError && (
          <img
            src={media.officeWelcome}
            alt="Kayora Kayaking Office in Kadamakkudy with colorful kayaks"
            fetchPriority="high"
            className="h-full w-full object-cover will-change-transform"
            style={{
              objectPosition: "50% 35%",
              animation: "office-zoom 2.2s cubic-bezier(0.25, 1, 0.5, 1) forwards",
            }}
            onError={() => setImageError(true)}
          />
        )}
        {/* Subtle deep-teal translucent cinematic overlay preserving kayak colors & sign */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#0B2527]/55 via-[#123D40]/40 to-[#081B1C]/65 backdrop-blur-[0.5px]"
          aria-hidden="true"
        />
      </div>

      {/* 2 & 3. Centered logo reveal, golden/sage glow, water ripples, & tagline */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6">
        {/* Subtle golden/sage glow behind the logo */}
        <div
          className="pointer-events-none absolute -translate-y-4 rounded-full blur-2xl"
          style={{
            width: "min(360px, 80vw)",
            height: "min(360px, 80vw)",
            background:
              "radial-gradient(circle, rgba(251, 191, 36, 0.42) 0%, rgba(163, 203, 168, 0.28) 42%, rgba(18, 61, 64, 0) 72%)",
            animation: "sunrise-glow 2.0s ease-out forwards",
          }}
          aria-hidden="true"
        />

        {/* Smooth, restrained water ripple effect beneath the logo */}
        <div
          className="pointer-events-none absolute top-[68%] left-1/2 -translate-x-1/2 -translate-y-1/2"
          aria-hidden="true"
        >
          <div
            className="rounded-full border border-mint/40"
            style={{
              width: "min(300px, 72vw)",
              height: "min(64px, 16vw)",
              animation: "water-ripple 1.4s cubic-bezier(0.2, 0.6, 0.35, 1) 0.35s forwards",
            }}
          />
          <div
            className="absolute inset-0 rounded-full border border-mint/25"
            style={{
              width: "min(300px, 72vw)",
              height: "min(64px, 16vw)",
              animation: "water-ripple 1.4s cubic-bezier(0.2, 0.6, 0.35, 1) 0.7s forwards",
            }}
          />
        </div>

        {/* Centered original Kayora logo */}
        <div className="relative z-10 flex flex-col items-center">
          <img
            src={media.emblemLogo}
            alt="Kayora Kayaking Kochi Emblem"
            className="h-auto w-40 max-h-[38vh] max-w-[68vw] object-contain drop-shadow-[0_10px_28px_rgba(0,0,0,0.55)] sm:w-52 md:w-56 lg:w-60"
            style={{
              animation: "logo-intro 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both",
            }}
          />

          {/* Elegant Tagline */}
          <p
            className="mt-5 text-center text-[10px] font-semibold tracking-[0.28em] text-cream uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] sm:text-xs md:text-sm"
            style={{
              animation: "text-intro 0.5s ease-out 0.8s both",
            }}
          >
            Your Adventure Begins Here
          </p>
        </div>
      </div>
    </aside>
  );
}
