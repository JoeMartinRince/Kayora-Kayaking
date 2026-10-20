import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { ExperiencesSection } from "@/components/site/ExperiencesSection";
import { WhyChooseSection } from "@/components/site/WhyChooseSection";
import { AboutSection } from "@/components/site/AboutSection";
import { GallerySection } from "@/components/site/GallerySection";
import { ReviewsSection } from "@/components/site/ReviewsSection";
import { BookingProcessSection } from "@/components/site/BookingProcessSection";
import { FaqSection } from "@/components/site/FaqSection";
import { LocationSection } from "@/components/site/LocationSection";
import { FinalCtaSection } from "@/components/site/FinalCtaSection";
import { Footer } from "@/components/site/Footer";
import { BottomNav, DesktopWhatsApp } from "@/components/site/BottomNav";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen bg-background text-foreground antialiased selection:bg-mint selection:text-deep">
      {/* 1. Hero section with full video/poster background, header, and primary CTAs */}
      <Hero />

      {/* Main Content Sections */}
      <main id="main-content">
        {/* 2. Kayaking experiences ("Choose Your Adventure") */}
        <ExperiencesSection />

        {/* 3. Why choose Kayora */}
        <WhyChooseSection />

        {/* 4. About the kayaking experience */}
        <AboutSection />

        {/* 5. Photo gallery with category filter and lightbox */}
        <GallerySection />

        {/* 6. Customer reviews / verified community feedback */}
        <ReviewsSection />

        {/* 7. Booking process */}
        <BookingProcessSection />

        {/* 8. Frequently asked questions */}
        <FaqSection />

        {/* 9. Location and directions */}
        <LocationSection />

        {/* 10. Final booking CTA */}
        <FinalCtaSection />
      </main>

      {/* 11. Footer with business info, quick links, and contact */}
      <Footer />

      {/* 12. Fixed mobile bottom navigation with elevated WhatsApp button */}
      <BottomNav />

      {/* Desktop floating WhatsApp quick action */}
      <DesktopWhatsApp />
    </div>
  );
}
