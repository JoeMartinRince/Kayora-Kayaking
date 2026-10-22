import { MapPin, Navigation, Car, Clock, Phone, Mail } from "lucide-react";
import { business, emailLink, telLink } from "@/config/business";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

export function LocationSection() {
  return (
    <section id="location" className="relative scroll-mt-20 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-forest/20 bg-mint/80 px-4 py-1.5 shadow-xs">
            <MapPin className="h-3.5 w-3.5 text-deep" />
            <span className="text-xs font-bold tracking-widest text-deep uppercase">
              Launch Location
            </span>
          </div>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-deep sm:text-4xl lg:text-5xl">
            Where Your Journey Begins
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Our paddle tours launch from Kadamakkudy, a picturesque archipelago of backwater islands
            located just outside Kochi city.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          {/* Main Info Card (7 cols) */}
          <div className="rounded-[2.25rem] border border-border bg-card p-8 shadow-soft sm:p-10 lg:col-span-7">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-deep text-mint">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-deep sm:text-2xl">{business.location}</h3>
                <p className="text-xs font-semibold tracking-wider text-forest uppercase">
                  Official Launch Site
                </p>
              </div>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Kadamakkudy is renowned for its calm canals, fish farms, and quiet island hamlets.
              Launching here allows paddlers to instantly enter calm channels without having to
              cross congested boat highways or rough open water.
            </p>

            {/* Travel & Arrival Tips */}
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-2xl bg-mint/40 p-4">
                <Car className="h-5 w-5 shrink-0 text-forest mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <p className="font-bold text-deep">Easy Road Access</p>
                  <p className="text-muted-foreground">
                    Accessible by taxi, auto, and personal vehicles with parking nearby.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl bg-mint/40 p-4">
                <Clock className="h-5 w-5 shrink-0 text-forest mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <p className="font-bold text-deep">Arrive 15 Min Early</p>
                  <p className="text-muted-foreground">
                    Allows time for life vest fitting and orientation before departure.
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-border/70 pt-6">
              <a
                href={business.launchPointMapUrl}
                {...ext}
                className="inline-flex items-center gap-2 rounded-full bg-deep px-6 py-3.5 text-sm font-bold text-on-dark shadow-sm transition hover:bg-forest active:scale-95"
              >
                <Navigation className="h-4 w-4 text-whatsapp" />
                <span>Open Launch Point in Google Maps</span>
              </a>

              <a
                href={business.officeMapUrl}
                {...ext}
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold text-deep transition hover:bg-mint/40"
              >
                <span>Office Location</span>
              </a>
            </div>
          </div>

          {/* Quick Contact & Assistance Card (5 cols) */}
          <div className="flex flex-col justify-between rounded-[2.25rem] border border-forest/20 bg-deep p-8 text-on-dark shadow-soft sm:p-10 lg:col-span-5">
            <div>
              <span className="inline-block rounded-full bg-mint/20 px-3.5 py-1 text-xs font-bold text-mint uppercase tracking-wider">
                Need Help Finding Us?
              </span>
              <h3 className="mt-4 text-2xl font-bold tracking-tight">
                Direct Assistance on Arrival
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-on-dark/80">
                If you are traveling by cab or driving down and need live route assistance, call or
                message us directly. Our team will guide your driver right to the jetty.
              </p>
            </div>

            <div className="mt-8 space-y-3">
              <div className="rounded-2xl bg-on-dark/10 p-4 sm:p-5 backdrop-blur-xs">
                <p className="text-xs font-semibold text-sage">Call Direct Line</p>
                <a
                  href={telLink}
                  className="mt-1 flex items-center gap-2 text-lg sm:text-xl font-extrabold text-on-dark hover:text-mint"
                >
                  <Phone className="h-5 w-5 text-whatsapp shrink-0" />
                  <span>{business.phoneDisplay}</span>
                </a>
              </div>

              <div className="rounded-2xl bg-on-dark/10 p-4 sm:p-5 backdrop-blur-xs">
                <p className="text-xs font-semibold text-sage">Email Enquiries</p>
                <a
                  href={emailLink()}
                  className="mt-1 flex items-center gap-2 text-base sm:text-lg font-bold text-on-dark hover:text-mint break-all"
                >
                  <Mail className="h-5 w-5 text-mint shrink-0" />
                  <span>{business.email}</span>
                </a>
              </div>
            </div>

            <div className="mt-6 text-xs text-on-dark/60">
              Launch point coordinates and parking details are also shared via WhatsApp or email upon
              enquiry.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
