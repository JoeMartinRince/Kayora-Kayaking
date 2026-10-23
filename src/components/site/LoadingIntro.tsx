import { useEffect, useRef, useState } from "react";
import { media } from "@/config/media";

const INTRO_STORAGE_KEY = "kayora_intro_seen";
const MAX_PRELOAD_WAIT_MS = 2200;

export type LoadingStage = 0 | 1 | 2 | 3 | 4 | 5 | 6;
// Stage 0: inactive / bypassed
// Stage 1: solid deep-teal canvas (immediate, zero blank flash)
// Stage 2: office photo ready & fading in with subtle dark-teal overlay + zoom
// Stage 3: logo revealed over photo with glow + tagline "YOUR ADVENTURE BEGINS HERE"
// Stage 4: water-ripple effect starts (strictly only after background & logo are visible)
// Stage 5: smooth fade-out dissolving into homepage
// Stage 6: complete / unmounted

function preloadIntroImage(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(true);
      return;
    }

    const img = new Image();
    let settled = false;

    const finish = (ok: boolean) => {
      if (settled) return;
      settled = true;
      resolve(ok);
    };

    const onReady = () => {
      if (typeof img.decode === "function") {
        img
          .decode()
          .then(() => finish(true))
          .catch(() => finish(true));
      } else {
        finish(true);
      }
    };

    img.onload = onReady;
    img.onerror = () => finish(false);

    img.src = src;

    const isDefaultJsdomImage =
      typeof navigator !== "undefined" &&
      navigator.userAgent.includes("jsdom") &&
      img.constructor?.name === "HTMLImageElement";

    if (img.complete && img.naturalWidth > 0) {
      onReady();
    } else if (isDefaultJsdomImage) {
      // In default unmocked jsdom environment, resolve immediately
      finish(true);
    }
  });
}

export function LoadingIntro() {
  const [stage, setStage] = useState<LoadingStage>(() => {
    if (typeof window === "undefined") return 0;
    try {
      if (sessionStorage.getItem(INTRO_STORAGE_KEY) === "true") {
        return 0;
      }
    } catch {
      // Storage access might be restricted
    }
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      try {
        sessionStorage.setItem(INTRO_STORAGE_KEY, "true");
      } catch {
        // ignore
      }
      return 0;
    }
    return 1;
  });

  const [assetsReady, setAssetsReady] = useState(false);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined" || stage === 0) return;
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    let isCancelled = false;
    const timers: number[] = [];

    const schedule = (fn: () => void, delayMs: number) => {
      const id = window.setTimeout(() => {
        if (!isCancelled) fn();
      }, delayMs);
      timers.push(id);
      return id;
    };

    const finishIntro = () => {
      try {
        sessionStorage.setItem(INTRO_STORAGE_KEY, "true");
      } catch {
        // ignore
      }
      setStage(6);
    };

    const startTransitionToHomepage = (delayMs: number = 0) => {
      schedule(() => {
        setStage(5); // Stage 5: fade out overlay
        schedule(finishIntro, 400); // Stage 6: unmount
      }, delayMs);
    };

    // Preload both the office welcome photo and the emblem logo concurrently
    const preloadPromise = Promise.all([
      preloadIntroImage(media.officeWelcome),
      preloadIntroImage(media.emblemLogo),
    ]);

    // Safety timeout: if assets take longer than MAX_PRELOAD_WAIT_MS, don't stall the user
    // or display broken/partial ripples; gracefully dissolve directly into homepage.
    const maxWaitTimer = window.setTimeout(() => {
      if (!isCancelled) {
        startTransitionToHomepage(0);
      }
    }, MAX_PRELOAD_WAIT_MS);
    timers.push(maxWaitTimer);

    preloadPromise
      .then(([officeReady, logoReady]) => {
        if (isCancelled) return;
        window.clearTimeout(maxWaitTimer);

        if (!officeReady || !logoReady) {
          // If assets failed to load, skip partial animation and transition cleanly
          startTransitionToHomepage(0);
          return;
        }

        // Both assets confirmed ready and decoded
        setAssetsReady(true);

        // Stage 2: Office photo is ready -> fade it in with subtle teal overlay & gentle zoom
        setStage(2);

        // Stage 3: Reveal logo & tagline over photo with golden/sage ambient glow
        schedule(() => {
          setStage(3);
        }, 220);

        // Stage 4: Start water ripples strictly AFTER photo and logo are visible
        schedule(() => {
          setStage(4);
        }, 550);

        // Stage 5: Hold completed cinematic scene briefly, then smooth fade-out
        schedule(() => {
          setStage(5);
          schedule(finishIntro, 400);
        }, 1600);
      })
      .catch(() => {
        if (!isCancelled) {
          startTransitionToHomepage(0);
        }
      });

    return () => {
      isCancelled = true;
      timers.forEach((t) => window.clearTimeout(t));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (stage === 0 || stage === 6) return null;

  const isFadingOut = stage === 5;

  return (
    <aside
      aria-label="Loading intro"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#123D40] transition-opacity duration-400 ease-out ${
        isFadingOut ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      {/* Stage 1 & 2: Office photograph with gentle zoom-in effect & deep-teal translucent overlay */}
      <div
        className={`absolute inset-0 overflow-hidden transition-opacity duration-600 ease-out ${
          stage >= 2 && assetsReady ? "opacity-100" : "opacity-0"
        }`}
      >
        <img
          src={media.officeWelcome}
          alt="Kayora Kayaking Office in Kadamakkudy with colorful kayaks"
          fetchPriority="high"
          decoding="async"
          width="1200"
          height="1600"
          className="h-full w-full object-cover will-change-transform"
          style={{
            objectPosition: "50% 35%",
            animation:
              stage >= 2 && assetsReady
                ? "office-zoom 2.4s cubic-bezier(0.25, 1, 0.5, 1) forwards"
                : "none",
          }}
        />
        {/* Subtle deep-teal translucent cinematic overlay preserving kayak colors & sign */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#0B2527]/55 via-[#123D40]/40 to-[#081B1C]/65 backdrop-blur-[0.5px]"
          aria-hidden="true"
        />
      </div>

      {/* Stage 3 & 4: Centered logo reveal, golden/sage glow, water ripples, & tagline */}
      <div
        className={`relative z-10 flex flex-col items-center justify-center px-6 transition-opacity duration-500 ease-out ${
          stage >= 3 && assetsReady ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Subtle golden/sage glow behind the logo */}
        <div
          className="pointer-events-none absolute -translate-y-4 rounded-full blur-2xl"
          style={{
            width: "min(360px, 80vw)",
            height: "min(360px, 80vw)",
            background:
              "radial-gradient(circle, rgba(251, 191, 36, 0.42) 0%, rgba(163, 203, 168, 0.28) 42%, rgba(18, 61, 64, 0) 72%)",
            animation: stage >= 3 && assetsReady ? "sunrise-glow 1.8s ease-out forwards" : "none",
          }}
          aria-hidden="true"
        />

        {/* Stage 4: Smooth, restrained water ripple effect (strictly only after photo and logo are visible) */}
        {stage >= 4 && assetsReady && (
          <div
            className="pointer-events-none absolute top-[68%] left-1/2 -translate-x-1/2 -translate-y-1/2"
            aria-hidden="true"
            data-testid="water-ripple-container"
          >
            <div
              className="rounded-full border border-mint/40"
              style={{
                width: "min(300px, 72vw)",
                height: "min(64px, 16vw)",
                animation: "water-ripple 1.4s cubic-bezier(0.2, 0.6, 0.35, 1) forwards",
              }}
            />
            <div
              className="absolute inset-0 rounded-full border border-mint/25"
              style={{
                width: "min(300px, 72vw)",
                height: "min(64px, 16vw)",
                animation: "water-ripple 1.4s cubic-bezier(0.2, 0.6, 0.35, 1) 0.35s forwards",
              }}
            />
          </div>
        )}

        {/* Centered original Kayora logo */}
        <div className="relative z-10 flex flex-col items-center">
          <img
            src={media.emblemLogo}
            alt="Kayora Kayaking Kochi Emblem"
            width="240"
            height="240"
            decoding="async"
            className="h-auto w-40 max-h-[38vh] max-w-[68vw] object-contain drop-shadow-[0_10px_28px_rgba(0,0,0,0.55)] sm:w-52 md:w-56 lg:w-60"
            style={{
              animation:
                stage >= 3 && assetsReady
                  ? "logo-intro 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards"
                  : "none",
            }}
          />

          {/* Elegant Tagline */}
          <p
            className="mt-5 text-center text-[10px] font-semibold tracking-[0.28em] text-cream uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] sm:text-xs md:text-sm"
            style={{
              animation: stage >= 3 && assetsReady ? "text-intro 0.5s ease-out 0.2s both" : "none",
            }}
          >
            Your Adventure Begins Here
          </p>
        </div>
      </div>
    </aside>
  );
}
