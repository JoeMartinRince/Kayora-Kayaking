import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "@/components/site/Hero";
import { FeaturedRideSection } from "@/components/site/FeaturedRideSection";
import { ExperiencesSection } from "@/components/site/ExperiencesSection";
import { FinalCtaSection } from "@/components/site/FinalCtaSection";
import { LocationSection } from "@/components/site/LocationSection";
import { Footer } from "@/components/site/Footer";
import { business, emailLink, experienceEmailLink } from "@/config/business";

describe("Email Enquiry Integration across Website", () => {
  it("renders Email Enquiry button in Hero with correct mailto link", () => {
    render(<Hero />);

    // Check for Email Enquiry button in hero
    const emailButtons = screen.getAllByRole("link", { name: /email/i });
    expect(emailButtons.length).toBeGreaterThan(0);

    const heroEmailButton = screen.getByRole("link", { name: /email enquiry/i });
    expect(heroEmailButton).toBeInTheDocument();
    expect(heroEmailButton).toHaveAttribute("href", emailLink());
    expect(heroEmailButton.getAttribute("href")).toContain("mailto:kayorakayaking@gmail.com");
    expect(heroEmailButton.getAttribute("href")).toContain("subject=Kayaking%20Enquiry%20%E2%80%93%20Kayora%20Kochi");
  });

  it("renders Email Enquiry option in FeaturedRideSection with prefilled subject", () => {
    render(<FeaturedRideSection />);

    const emailButton = screen.getByRole("link", { name: /email enquiry/i });
    expect(emailButton).toBeInTheDocument();
    expect(emailButton).toHaveAttribute("href", experienceEmailLink("Mangrove Forest Ride"));
    expect(emailButton.getAttribute("href")).toContain("mailto:kayorakayaking@gmail.com");
    expect(emailButton.getAttribute("href")).toContain("Mangrove%20Forest%20Ride");
  });

  it("renders Email Enquiry icon actions on ride cards in ExperiencesSection", () => {
    render(<ExperiencesSection />);

    const sunriseEmail = screen.getByRole("link", { name: /email enquiry for sunrise session/i });
    expect(sunriseEmail).toBeInTheDocument();
    expect(sunriseEmail).toHaveAttribute("href", experienceEmailLink("Sunrise Session"));

    const explorerEmail = screen.getByRole("link", { name: /email enquiry for explorer route/i });
    expect(explorerEmail).toBeInTheDocument();
    expect(explorerEmail).toHaveAttribute("href", experienceEmailLink("Explorer Route"));

    const sunsetEmail = screen.getByRole("link", { name: /email enquiry for sunset drift/i });
    expect(sunsetEmail).toBeInTheDocument();
    expect(sunsetEmail).toHaveAttribute("href", experienceEmailLink("Sunset Drift"));
  });

  it("renders Email Enquiry button in FinalCtaSection", () => {
    render(<FinalCtaSection />);

    const emailCta = screen.getByRole("link", { name: /email enquiry/i });
    expect(emailCta).toBeInTheDocument();
    expect(emailCta).toHaveAttribute("href", emailLink());
  });

  it("displays clickable email address in LocationSection", () => {
    render(<LocationSection />);

    const emailLinkElement = screen.getByRole("link", { name: new RegExp(business.email, "i") });
    expect(emailLinkElement).toBeInTheDocument();
    expect(emailLinkElement).toHaveAttribute("href", emailLink());
  });

  it("displays clickable email in Footer contact details and social bar", () => {
    render(<Footer />);

    // Both social icon button and contact details link contain the email
    const emailLinks = screen.getAllByRole("link", { name: new RegExp(business.email, "i") });
    expect(emailLinks).toHaveLength(2);
    for (const link of emailLinks) {
      expect(link).toHaveAttribute("href", emailLink());
    }

    // Specific social icon button by full aria-label
    const emailIconLink = screen.getByRole("link", { name: `Email ${business.email}` });
    expect(emailIconLink).toBeInTheDocument();

    // Specific contact text link by text content
    const emailTextLink = screen.getByRole("link", { name: business.email });
    expect(emailTextLink).toBeInTheDocument();
  });
});
