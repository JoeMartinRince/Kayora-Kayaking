import { ArrowDown, Compass, MapPin, ShieldCheck } from "lucide-react";
import { media } from "@/config/media";
import { whatsappLink, mangroveRideMessage } from "@/config/business";
import { WhatsAppIcon } from "./icons";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

export function FeaturedRideSection() {
  const bookingUrl = whatsappLink(mangroveRideMessage);

  return (
    <section id="featured-ride" className="relative scroll-mt-20 py-10 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Premium Signature Card */}
        <div className="relative overflow-hidden rounded-[2rem] border border-forest/40 bg-gradient-to-br from-forest/90 via-deep to-deep text-on-dark shadow-soft transition-all duration-300 hover:shadow-2xl sm:rounded-[2.5rem]">
          {/* Subtle Ambient Glow */}
          <div
            className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-mint/10 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-sage/10 blur-3xl"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 items-stretch lg:grid-cols-12">
            {/* Large, Immersive Mangrove Kayaking Photograph */}
            <div className="relative min-h-[320px] aspect-4/5 w-full overflow-hidden sm:min-h-[380px] sm:aspect-4/3 lg:aspect-auto lg:col-span-7 lg:min-h-[480px]">
              <img
                src={media.mangroveForestRide}
                alt="Kayakers paddling through the mangrove waterways of Kochi at sunset"
                loading="lazy"
                style={{ objectPosition: "50% 52%" }}
                className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep/40 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-deep/20 lg:to-deep" />

              {/* Floating location badge on image */}
              <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full border border-on-dark/20 bg-deep/70 px-3 py-1 text-xs font-semibold text-on-dark backdrop-blur-md">
                <MapPin className="h-3.5 w-3.5 text-sage" />
                <span>Kadamakkudy Mangroves</span>
              </div>
            </div>

            {/* Featured Content Area */}
            <div className="relative z-10 flex flex-col justify-center p-6 sm:p-8 lg:col-span-5 lg:p-10">
              {/* Subtle Sage Badge */}
              <div className="inline-flex items-center self-start rounded-full border border-sage/35 bg-sage/10 px-3 py-1 text-[10px] font-semibold tracking-wider text-sage uppercase backdrop-blur-sm sm:text-[11px]">
                <span>FEATURED MANGROVE RIDE</span>
              </div>

              {/* Heading */}
              <h2 className="mt-3.5 text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
                Mangrove Forest Ride
              </h2>

              {/* Tagline */}
              <p className="mt-1.5 text-sm font-semibold tracking-wide text-mint/95 sm:text-base">
                Into the green. Away from the ordinary.
              </p>

              {/* Short Description */}
              <p className="mt-3 text-sm leading-relaxed text-on-dark/85 sm:text-base">
                Discover Kochi&apos;s waterways surrounded by lush mangrove scenery.
              </p>

              {/* Meta Highlights */}
              <div className="mt-5 grid grid-cols-2 gap-2 text-xs font-medium text-on-dark/80 sm:gap-3">
                <div className="flex items-center gap-2 rounded-xl bg-on-dark/5 p-2.5 backdrop-blur-sm">
                  <Compass className="h-4 w-4 shrink-0 text-mint" />
                  <span>Guided Route</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-on-dark/5 p-2.5 backdrop-blur-sm">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-mint" />
                  <span>Safety Gear Included</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-wrap items-center gap-2.5 sm:gap-3">
                {/* Primary CTA */}
                <a
                  href={bookingUrl}
                  {...ext}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-center text-xs font-bold text-deep shadow-glow transition hover:brightness-105 active:scale-95 sm:text-sm"
                >
                  <WhatsAppIcon className="h-4 w-4 shrink-0" />
                  <span>Enquire on WhatsApp</span>
                </a>

                {/* Secondary CTA */}
                <a
                  href="#experiences"
                  className="inline-flex items-center justify-center gap-1.5 rounded-full border border-on-dark/30 bg-on-dark/10 px-4 py-3 text-center text-xs font-semibold text-on-dark backdrop-blur-sm transition hover:bg-on-dark/20 active:scale-95 sm:text-sm"
                >
                  <span>Explore All Rides</span>
                  <ArrowDown className="h-3.5 w-3.5 opacity-75" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
