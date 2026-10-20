import { describe, expect, it, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { LoadingIntro } from "@/components/site/LoadingIntro";

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

  it("renders on initial entry with logo and tagline", () => {
    render(<LoadingIntro />);

    const tagline = screen.getByText(/your adventure begins here/i);
    expect(tagline).toBeInTheDocument();

    const logo = screen.getByAltText(/kayora kayaking kochi emblem/i);
    expect(logo).toBeInTheDocument();
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
});
