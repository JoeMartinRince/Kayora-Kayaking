import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { LoadingIntro } from "@/components/site/LoadingIntro";
import { media } from "@/config/media";

describe("LoadingIntro Component — 6 Required Scenarios", () => {
  const originalImage = window.Image;

  beforeEach(() => {
    sessionStorage.clear();
    window.matchMedia = ((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    })) as unknown as typeof window.matchMedia;
  });

  afterEach(() => {
    window.Image = originalImage;
    vi.useRealTimers();
  });

  // Scenario 1: Fast connection with all assets cached
  it("Scenario 1: Fast connection with all assets cached — synchronizes photo, logo, and ripples in order", async () => {
    vi.useFakeTimers();

    render(<LoadingIntro />);

    // Stage 1: Solid deep-teal background is displayed immediately
    const aside = screen.getByRole("complementary", { name: /loading intro/i });
    expect(aside).toBeInTheDocument();
    expect(aside).toHaveClass("bg-[#123D40]");

    // Office photo and emblem logo are rendered in DOM
    const officeImg = screen.getByAltText(/kayora kayaking office in kadamakkudy/i);
    expect(officeImg).toBeInTheDocument();
    expect(officeImg).toHaveAttribute("src", media.officeWelcome);

    const logo = screen.getByAltText(/kayora kayaking kochi emblem/i);
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", media.emblemLogo);

    const tagline = screen.getByText(/your adventure begins here/i);
    expect(tagline).toBeInTheDocument();

    // In Stage 1 & 2 before 550ms: ripples are NOT yet mounted
    expect(screen.queryByTestId("water-ripple-container")).toBeNull();

    // Advance to Stage 4 (550ms) -> water ripple effect begins
    await act(async () => {
      await vi.advanceTimersByTimeAsync(550);
    });
    expect(screen.getByTestId("water-ripple-container")).toBeInTheDocument();

    // Advance to Stage 5 (1600ms total, +1050ms) -> smooth fade-out starts
    await act(async () => {
      await vi.advanceTimersByTimeAsync(1050);
    });
    expect(aside).toHaveClass("opacity-0");

    // Advance to Stage 6 (2000ms total, +400ms) -> complete and unmounted
    await act(async () => {
      await vi.advanceTimersByTimeAsync(400);
    });
    expect(screen.queryByRole("complementary", { name: /loading intro/i })).toBeNull();
    expect(sessionStorage.getItem("kayora_intro_seen")).toBe("true");
  });

  // Scenario 2: Slow connection with an empty cache
  it("Scenario 2: Slow connection with an empty cache — ripples never appear alone while waiting", async () => {
    vi.useFakeTimers();

    // Mock slow Image loading that does not resolve immediately
    let triggerLoadOffice: () => void = () => {};
    let triggerLoadLogo: () => void = () => {};

    class MockSlowImage {
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;
      complete = false;
      naturalWidth = 0;
      private _src = "";

      get src() {
        return this._src;
      }
      set src(val: string) {
        this._src = val;
        if (val.includes("office")) {
          triggerLoadOffice = () => {
            this.complete = true;
            this.naturalWidth = 1200;
            this.onload?.();
          };
        } else {
          triggerLoadLogo = () => {
            this.complete = true;
            this.naturalWidth = 240;
            this.onload?.();
          };
        }
      }
    }

    window.Image = MockSlowImage as unknown as typeof Image;

    render(<LoadingIntro />);

    // At t = 400ms on a slow connection:
    await act(async () => {
      await vi.advanceTimersByTimeAsync(400);
    });

    // Solid teal container is visible
    const aside = screen.getByRole("complementary", { name: /loading intro/i });
    expect(aside).toBeInTheDocument();

    // CRITICAL: Water ripples MUST NOT be present before assets are ready!
    expect(screen.queryByTestId("water-ripple-container")).toBeNull();

    // Now simulated slow network finishes downloading assets
    await act(async () => {
      triggerLoadOffice();
      triggerLoadLogo();
    });

    // Advance to Stage 4 (550ms after assets ready) -> ripples start only now
    await act(async () => {
      await vi.advanceTimersByTimeAsync(550);
    });
    expect(screen.getByTestId("water-ripple-container")).toBeInTheDocument();
  });

  it("Scenario 2b: Slow connection exceeding 2200ms timeout — skips broken animation and reveals homepage", async () => {
    vi.useFakeTimers();

    // Mock hanging network that stalls indefinitely
    class MockHangingImage {
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;
      complete = false;
      naturalWidth = 0;
      src = "";
    }

    window.Image = MockHangingImage as unknown as typeof Image;

    render(<LoadingIntro />);

    const aside = screen.getByRole("complementary", { name: /loading intro/i });
    expect(aside).toBeInTheDocument();

    // Before timeout: ripples are never shown in isolation
    await act(async () => {
      await vi.advanceTimersByTimeAsync(1500);
    });
    expect(screen.queryByTestId("water-ripple-container")).toBeNull();

    // Advance past max wait limit (2200ms)
    await act(async () => {
      await vi.advanceTimersByTimeAsync(750);
    });

    // Intro dissolves smoothly to homepage
    expect(aside).toHaveClass("opacity-0");

    // Finishes unmounting
    await act(async () => {
      await vi.advanceTimersByTimeAsync(400);
    });
    expect(screen.queryByRole("complementary", { name: /loading intro/i })).toBeNull();
    expect(sessionStorage.getItem("kayora_intro_seen")).toBe("true");
  });

  // Scenario 3: First visit in a new incognito session
  it("Scenario 3: First visit in a new incognito session — displays intro and records seen flag", async () => {
    vi.useFakeTimers();

    expect(sessionStorage.getItem("kayora_intro_seen")).toBeNull();

    render(<LoadingIntro />);

    expect(screen.getByRole("complementary", { name: /loading intro/i })).toBeInTheDocument();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(2100);
    });

    expect(sessionStorage.getItem("kayora_intro_seen")).toBe("true");
  });

  // Scenario 4: Reload after the assets are cached (already viewed in session)
  it("Scenario 4: Reload after the assets are cached — bypasses intro immediately", () => {
    sessionStorage.setItem("kayora_intro_seen", "true");

    render(<LoadingIntro />);

    expect(screen.queryByRole("complementary", { name: /loading intro/i })).toBeNull();
  });

  // Scenario 5: Image loading failure
  it("Scenario 5: Image loading failure — provides graceful fallback without crashing or isolated ripples", async () => {
    vi.useFakeTimers();

    // Mock image failure
    class MockFailedImage {
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;
      complete = false;
      naturalWidth = 0;
      private _src = "";

      get src() {
        return this._src;
      }
      set src(val: string) {
        this._src = val;
        queueMicrotask(() => {
          this.onerror?.();
        });
      }
    }

    window.Image = MockFailedImage as unknown as typeof Image;

    render(<LoadingIntro />);

    // Advance slightly to let onerror trigger and fadeout start
    await act(async () => {
      await vi.advanceTimersByTimeAsync(50);
    });

    // Ripples are never shown
    expect(screen.queryByTestId("water-ripple-container")).toBeNull();

    // Gracefully fades out to homepage
    const aside = screen.getByRole("complementary", { name: /loading intro/i });
    expect(aside).toHaveClass("opacity-0");

    // Completes transition
    await act(async () => {
      await vi.advanceTimersByTimeAsync(400);
    });
    expect(screen.queryByRole("complementary", { name: /loading intro/i })).toBeNull();
  });

  // Scenario 6: Reduced-motion preference enabled
  it("Scenario 6: Reduced-motion preference enabled — immediately bypasses animation and sets session flag", () => {
    window.matchMedia = ((query: string) => ({
      matches: query.includes("prefers-reduced-motion"),
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    })) as unknown as typeof window.matchMedia;

    render(<LoadingIntro />);

    expect(screen.queryByRole("complementary", { name: /loading intro/i })).toBeNull();
    expect(sessionStorage.getItem("kayora_intro_seen")).toBe("true");
  });
});
