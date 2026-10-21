import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ExperiencesSection } from "@/components/site/ExperiencesSection";
import { WhyChooseSection } from "@/components/site/WhyChooseSection";
import { ReviewsSection } from "@/components/site/ReviewsSection";
import { FeaturedRideSection } from "@/components/site/FeaturedRideSection";
import { experiences, stats } from "@/config/experiences";
import { media } from "@/config/media";

describe("Ride Card Images & Happy Paddlers Statistics", () => {
  it("displays 2000+ Happy Paddlers in stats and reviews", () => {
    render(<WhyChooseSection />);
    expect(screen.getByText("2000+")).toBeInTheDocument();
    expect(screen.getByText(/happy paddlers/i)).toBeInTheDocument();

    render(<ReviewsSection />);
    expect(screen.getByText(/over 2000\+ paddlers guided safely/i)).toBeInTheDocument();
  });

  it("configures replacement images for Sunrise, Sunset, and Explorer", () => {
    const sunrise = experiences.find((e) => e.id === "sunrise");
    expect(sunrise?.image).toBe("/assets/rides/Sunrise.jpg");

    const explorer = experiences.find((e) => e.id === "explorer");
    expect(explorer?.image).toBe("/assets/rides/Explorer.jpg");

    const sunset = experiences.find((e) => e.id === "sunset");
    expect(sunset?.image).toBe("/assets/rides/Sunset.jpg");
  });

  it("renders the 3 ride cards with the new replacement images and alt text", () => {
    render(<ExperiencesSection />);

    const sunriseImg = screen.getByRole("img", { name: /sunrise session/i });
    expect(sunriseImg).toBeInTheDocument();
    expect(sunriseImg).toHaveAttribute("src", "/assets/rides/Sunrise.jpg");

    const explorerImg = screen.getByRole("img", { name: /explorer route/i });
    expect(explorerImg).toBeInTheDocument();
    expect(explorerImg).toHaveAttribute("src", "/assets/rides/Explorer.jpg");

    const sunsetImg = screen.getByRole("img", { name: /sunset drift/i });
    expect(sunsetImg).toBeInTheDocument();
    expect(sunsetImg).toHaveAttribute("src", "/assets/rides/Sunset.jpg");
  });

  it("keeps the featured Mangrove Forest Ride image unchanged", () => {
    render(<FeaturedRideSection />);
    const mangroveImg = screen.getByRole("img", {
      name: /kayakers paddling through the mangrove waterways of kochi at sunset/i,
    });
    expect(mangroveImg).toBeInTheDocument();
    expect(mangroveImg).toHaveAttribute("src", media.mangroveForestRide);
  });
});
