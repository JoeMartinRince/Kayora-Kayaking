import { describe, expect, it, beforeEach, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { LoadingIntro } from "@/components/site/LoadingIntro";
import { media } from "@/config/media";

describe("LoadingIntro Component", () => {
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

  it("renders on initial entry with office photograph, logo, and tagline", () => {
    render(<LoadingIntro />);

    // Office photograph
    const officeImg = screen.getByAltText(/kayora kayaking office in kadamakkudy/i);
    expect(officeImg).toBeInTheDocument();
    expect(officeImg).toHaveAttribute("src", media.officeWelcome);

    // Tagline
    const tagline = screen.getByText(/your adventure begins here/i);
    expect(tagline).toBeInTheDocument();

    // Emblem Logo
    const logo = screen.getByAltText(/kayora kayaking kochi emblem/i);
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", media.emblemLogo);
  });

  it("does not render if session already viewed the intro", () => {
    sessionStorage.setItem("kayora_intro_seen", "true");

    render(<LoadingIntro />);

    expect(screen.queryByText(/your adventure begins here/i)).toBeNull();
  });

  it("skips animation if user prefers reduced motion", () => {
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

    expect(screen.queryByText(/your adventure begins here/i)).toBeNull();
    expect(sessionStorage.getItem("kayora_intro_seen")).toBe("true");
  });

  it("transitions out after approximately 2 seconds and stores seen flag", () => {
    vi.useFakeTimers();

    render(<LoadingIntro />);

    expect(screen.getByText(/your adventure begins here/i)).toBeInTheDocument();

    // Advance to fade out timer (1600ms)
    act(() => {
      vi.advanceTimersByTime(1600);
    });

    const aside = screen.getByRole("complementary", { name: /loading intro/i });
    expect(aside).toHaveClass("opacity-0");

    // Advance to completion (2000ms)
    act(() => {
      vi.advanceTimersByTime(400);
    });

    expect(screen.queryByText(/your adventure begins here/i)).toBeNull();
    expect(sessionStorage.getItem("kayora_intro_seen")).toBe("true");

    vi.useRealTimers();
  });
});
