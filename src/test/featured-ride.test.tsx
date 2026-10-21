import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeaturedRideSection } from "@/components/site/FeaturedRideSection";
import { Hero } from "@/components/site/Hero";
import { business, mangroveRideMessage, whatsappLink } from "@/config/business";

describe("FeaturedRideSection Component", () => {
  it("renders the signature Mangrove Forest Ride details", () => {
    render(<FeaturedRideSection />);

    // Check badge
    expect(screen.getByText("FEATURED MANGROVE RIDE")).toBeInTheDocument();

    // Check heading & tagline & description
    expect(
      screen.getByRole("heading", { name: /mangrove forest ride/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/into the green\. away from the ordinary\./i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/discover kochi's waterways surrounded by lush mangrove scenery\./i)
    ).toBeInTheDocument();

    // Check main photograph and meaningful alt text
    const image = screen.getByRole("img", {
      name: /kayakers paddling through the mangrove waterways of kochi at sunset/i,
    });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/assets/mangrove-forest-ride.jpeg");

    // Check primary CTA with correct prefilled WhatsApp link
    const primaryCta = screen.getByRole("link", { name: /enquire on whatsapp/i });
    expect(primaryCta).toBeInTheDocument();
    expect(primaryCta).toHaveAttribute("href", whatsappLink(mangroveRideMessage));

    // Check secondary CTA linking to #experiences
    const secondaryCta = screen.getByRole("link", { name: /explore all rides/i });
    expect(secondaryCta).toBeInTheDocument();
    expect(secondaryCta).toHaveAttribute("href", "#experiences");
  });
});

describe("Hero Component Updates", () => {
  it("renders subtle mangrove link and interactive header map link, without old badges", () => {
    render(<Hero />);

    // Check subtle mangrove link
    const mangroveLink = screen.getByRole("link", { name: /discover the mangroves/i });
    expect(mangroveLink).toBeInTheDocument();
    expect(mangroveLink).toHaveAttribute("href", "#featured-ride");

    // Check header location interactive link
    const kochiLink = screen.getByRole("link", {
      name: /view kayora kayaking location in google maps/i,
    });
    expect(kochiLink).toBeInTheDocument();
    expect(kochiLink).toHaveAttribute("href", business.headerLocationMapUrl);
    expect(kochiLink).toHaveAttribute("target", "_blank");
    expect(kochiLink).toHaveAttribute("rel", "noopener noreferrer");

    // Ensure removed badges are not present
    expect(screen.queryByText(/kadamakkudy, kochi • kerala/i)).toBeNull();
    expect(screen.queryByText(/explore our signature ride/i)).toBeNull();
  });
});
