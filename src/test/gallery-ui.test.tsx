import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { GallerySection } from "@/components/site/GallerySection";
import { business } from "@/config/business";

describe("GallerySection UI Component", () => {
  it("renders category filters and initial All tab with photo counts", () => {
    render(<GallerySection />);

    expect(screen.getByRole("tab", { name: /all/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /sunrise/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /sunset/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /mangrove/i })).toBeInTheDocument();

    // Verify all photos are rendered initially
    const buttons = screen.getAllByRole("button", { name: /^view photo:/i });
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("filters photos by category when tab clicked", () => {
    render(<GallerySection />);

    const sunriseTab = screen.getByRole("tab", { name: /sunrise/i });
    fireEvent.click(sunriseTab);

    const sunriseButtons = screen.getAllByRole("button", { name: /^view photo:/i });
    expect(sunriseButtons.length).toBeGreaterThan(0);

    const mangroveTab = screen.getByRole("tab", { name: /mangrove/i });
    fireEvent.click(mangroveTab);

    const mangroveButtons = screen.getAllByRole("button", { name: /^view photo:/i });
    expect(mangroveButtons.length).toBeGreaterThan(0);
  });

  it("opens lightbox on image click, shows position, captions, and closes on Escape", () => {
    render(<GallerySection />);

    const firstPhoto = screen.getAllByRole("button", { name: /^view photo:/i })[0];
    fireEvent.click(firstPhoto);

    // Lightbox should be open with dialog role
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();

    // Close button should be present
    const closeBtn = screen.getByRole("button", { name: /close photo preview/i });
    expect(closeBtn).toBeInTheDocument();

    // Next/Prev buttons should be present
    const nextBtn = screen.getByRole("button", { name: /next photo/i });
    const prevBtn = screen.getByRole("button", { name: /previous photo/i });
    expect(nextBtn).toBeInTheDocument();
    expect(prevBtn).toBeInTheDocument();

    // Position counter
    expect(screen.getByText(/1 \//)).toBeInTheDocument();

    // Clicking next should advance position
    fireEvent.click(nextBtn);
    expect(screen.getByText(/2 \//)).toBeInTheDocument();

    // Pressing Escape should close lightbox
    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("renders Explore on Instagram CTA pointing to the official profile", () => {
    render(<GallerySection />);

    const instagramBtn = screen.getByRole("link", {
      name: /explore more photos on kayora kayaking instagram/i,
    });
    expect(instagramBtn).toBeInTheDocument();
    expect(instagramBtn).toHaveAttribute("href", business.instagramUrl);
    expect(instagramBtn).toHaveAttribute("target", "_blank");
    expect(instagramBtn).toHaveAttribute("rel", "noopener noreferrer");
  });
});
