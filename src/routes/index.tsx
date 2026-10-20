import { createFileRoute } from "@tanstack/react-router";
import { LoadingIntro } from "@/components/site/LoadingIntro";
import { Hero } from "@/components/site/Hero";
import { FeaturedRideSection } from "@/components/site/FeaturedRideSection";
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
      {/* Golden Sunrise loading intro (shown once per visitor session) */}
      <LoadingIntro />

      {/* 1. Hero section with full video/poster background, header, and primary CTAs */}
      <Hero />

      {/* Main Content Sections */}
      <main id="main-content">
        {/* 2. Featured Signature Ride ("Mangrove Forest Ride") */}
        <FeaturedRideSection />

        {/* 3. Regular Kayaking experiences ("Choose Your Adventure") */}
        <ExperiencesSection />

        {/* 4. Why choose Kayora */}
        <WhyChooseSection />

        {/* 5. About the kayaking experience */}
        <AboutSection />

        {/* 6. Photo gallery with category filter and lightbox */}
        <GallerySection />

        {/* 7. Customer reviews / verified community feedback */}
        <ReviewsSection />

        {/* 8. Booking process */}
        <BookingProcessSection />

        {/* 9. Frequently asked questions */}
        <FaqSection />

        {/* 10. Location and directions */}
        <LocationSection />

        {/* 11. Final booking CTA */}
        <FinalCtaSection />
      </main>

      {/* 12. Footer with business info, quick links, and contact */}
      <Footer />

      {/* 13. Fixed mobile bottom navigation with elevated WhatsApp button */}
      <BottomNav />

      {/* Desktop floating WhatsApp quick action */}
      <DesktopWhatsApp />
    </div>
  );
}
