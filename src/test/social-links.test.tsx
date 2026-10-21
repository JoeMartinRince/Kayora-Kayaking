import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "@/components/site/Hero";
import { BottomNav } from "@/components/site/BottomNav";
import { GallerySection } from "@/components/site/GallerySection";
import { Footer } from "@/components/site/Footer";
import { FinalCtaSection } from "@/components/site/FinalCtaSection";
import { ReviewsSection } from "@/components/site/ReviewsSection";
import { business } from "@/config/business";

describe("Instagram Links Verification", () => {
  const expectedUrl =
    "https://www.instagram.com/kayora_kayaking_kochi?srtk=MTN5MDIzOWZ1NGx4cQ==";

  it("has the verified official URL in centralized business config", () => {
    expect(business.instagramUrl).toBe(expectedUrl);
  });

  it("renders correct Instagram links in Hero with target=_blank and rel=noopener noreferrer", () => {
    render(<Hero />);
    const links = screen
      .getAllByRole("link")
      .filter((link) => link.getAttribute("href") === expectedUrl);
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  it("renders Instagram link in BottomNav with target=_blank and rel=noopener noreferrer", () => {
    render(<BottomNav />);
    const link = screen.getByRole("link", { name: /visit kayora on instagram/i });
    expect(link).toHaveAttribute("href", expectedUrl);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders Explore on Instagram button in GallerySection", () => {
    render(<GallerySection />);
    const link = screen.getByRole("link", {
      name: /explore more photos on kayora kayaking instagram/i,
    });
    expect(link).toHaveAttribute("href", expectedUrl);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders Instagram link in Footer", () => {
    render(<Footer />);
    const link = screen.getByRole("link", { name: "Instagram" });
    expect(link).toHaveAttribute("href", expectedUrl);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders Instagram link in FinalCtaSection", () => {
    render(<FinalCtaSection />);
    const link = screen.getByRole("link", { name: /instagram/i });
    expect(link).toHaveAttribute("href", expectedUrl);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders Instagram link in ReviewsSection", () => {
    render(<ReviewsSection />);
    const link = screen.getByRole("link", { name: /tag @kayora_kayaking_kochi/i });
    expect(link).toHaveAttribute("href", expectedUrl);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
