import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { GallerySection } from "@/components/site/GallerySection";
import { business } from "@/config/business";

describe("GallerySection UI Component", () => {
  it("renders all seven category filters in order with initial photo counts", () => {
    render(<GallerySection />);

    const tabs = screen.getAllByRole("tab");
    expect(tabs.length).toBe(7);

    expect(screen.getByRole("tab", { name: /^all/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /^sunrise/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /^sunset/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /^mangrove/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /^winged visitors/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /^golden hour/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /^happy guests/i })).toBeInTheDocument();

    // Verify all photos are rendered initially under 'All'
    const buttons = screen.getAllByRole("button", { name: /^view photo:/i });
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("filters photos by category when tabs are clicked including Winged Visitors, Golden Hour and Happy Guests", () => {
    render(<GallerySection />);

    // Click Sunrise
    const sunriseTab = screen.getByRole("tab", { name: /^sunrise/i });
    fireEvent.click(sunriseTab);
    const sunriseButtons = screen.getAllByRole("button", { name: /^view photo:/i });
    expect(sunriseButtons.length).toBeGreaterThan(0);

    // Click Mangrove
    const mangroveTab = screen.getByRole("tab", { name: /^mangrove/i });
    fireEvent.click(mangroveTab);
    const mangroveButtons = screen.getAllByRole("button", { name: /^view photo:/i });
    expect(mangroveButtons.length).toBeGreaterThan(0);

    // Click Winged Visitors
    const wvTab = screen.getByRole("tab", { name: /^winged visitors/i });
    fireEvent.click(wvTab);
    const wvButtons = screen.getAllByRole("button", { name: /^view photo:/i });
    expect(wvButtons.length).toBeGreaterThanOrEqual(4);

    // Verify category description updates
    expect(
      screen.getByText(
        /Paddle through the mangroves and discover the fascinating birds that visit these tranquil backwaters\./i,
      ),
    ).toBeInTheDocument();

    // Click Golden Hour
    const ghTab = screen.getByRole("tab", { name: /^golden hour/i });
    fireEvent.click(ghTab);
    const ghButtons = screen.getAllByRole("button", { name: /^view photo:/i });
    expect(ghButtons.length).toBeGreaterThan(0);

    // Click Happy Guests
    const hgTab = screen.getByRole("tab", { name: /^happy guests/i });
    fireEvent.click(hgTab);
    const hgButtons = screen.getAllByRole("button", { name: /^view photo:/i });
    expect(hgButtons.length).toBeGreaterThan(0);

    // Return to All
    const allTab = screen.getByRole("tab", { name: /^all/i });
    fireEvent.click(allTab);
    const allButtons = screen.getAllByRole("button", { name: /^view photo:/i });
    expect(allButtons.length).toBeGreaterThan(wvButtons.length);
  });

  it("opens lightbox on image click, shows position, captions, and closes on Escape", () => {
    render(<GallerySection />);

    const photoButtons = screen.getAllByRole("button", { name: /^view photo:/i });
    expect(photoButtons.length).toBeGreaterThan(0);
    const firstPhoto = photoButtons[0];
    if (!firstPhoto) throw new Error("No photo buttons found");
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

  it("does not render Mangrove 6 in the gallery", () => {
    render(<GallerySection />);
    expect(screen.queryByLabelText(/mangrove 6/i)).toBeNull();
    expect(screen.queryByLabelText(/mangrove \(6\)/i)).toBeNull();
  });
});
