import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeaturedRideSection } from "@/components/site/FeaturedRideSection";
import { mangroveRideMessage, whatsappLink } from "@/config/business";

describe("FeaturedRideSection Component", () => {
  it("renders the signature Mangrove Forest Ride details", () => {
    render(<FeaturedRideSection />);

    // Check badge
    expect(screen.getByText("KAYORA SIGNATURE RIDE")).toBeInTheDocument();

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
