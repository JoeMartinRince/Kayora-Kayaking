import { Phone, ArrowUpRight } from "lucide-react";
import { media } from "@/config/media";
import { business, telLink, whatsappLink } from "@/config/business";
import { WhatsAppIcon, InstagramIcon } from "./icons";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

export function FinalCtaSection() {
  return (
    <section className="relative py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-deep px-6 py-20 text-center text-on-dark shadow-2xl sm:px-12 lg:py-28">
          {/* Background Image */}
          <img
            src={media.chineseNetsDusk}
            alt="Scenic backwaters of Kochi at dusk"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
            loading="lazy"
          />
          {/* Dark Overlay Gradient */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-deep via-deep/85 to-deep/75" />

          <div className="mx-auto max-w-2xl">
            <span className="inline-block rounded-full bg-whatsapp/20 px-4 py-1.5 text-xs font-bold tracking-widest text-whatsapp uppercase">
              Start Your Adventure
            </span>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Ready to Hit the Water?
            </h2>

            <p className="mt-5 text-base leading-relaxed text-on-dark/85 sm:text-lg">
              Disconnect from the routine and immerse yourself in Kochi's backwaters. Slots fill
              quickly around sunrise and sunset—reach out to reserve your kayak today.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href={whatsappLink("Hi Kayora! I'd like to book a kayaking tour in Kochi.")}
                {...ext}
                className="inline-flex items-center gap-2.5 rounded-full bg-whatsapp px-8 py-4 text-base font-bold text-deep shadow-glow transition hover:scale-105 active:scale-95"
              >
                <WhatsAppIcon className="h-5 w-5" />
                <span>Book on WhatsApp</span>
              </a>

              <a
                href={telLink}
                className="inline-flex items-center gap-2 rounded-full border border-on-dark/30 bg-on-dark/10 px-7 py-4 text-base font-bold text-on-dark backdrop-blur-sm transition hover:bg-on-dark/20 active:scale-95"
              >
                <Phone className="h-4 w-4 text-mint" />
                <span>Call {business.phoneDisplay}</span>
              </a>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-on-dark/70 sm:text-sm">
              <span>Follow our daily paddling stories on</span>
              <a
                href={business.instagramUrl}
                {...ext}
                className="inline-flex items-center gap-1 font-bold text-mint hover:underline"
              >
                <InstagramIcon className="h-3.5 w-3.5" />
                <span>Instagram</span>
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
