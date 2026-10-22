import { ArrowUpRight, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { business, emailLink, telLink, whatsappLink } from "@/config/business";
import { navLinks } from "@/config/navigation";
import { media } from "@/config/media";
import { WhatsAppIcon, InstagramIcon } from "./icons";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

export function Footer() {
  return (
    <footer className="border-t border-border/80 bg-card pt-16 pb-28 lg:pb-16 text-deep">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5">
            <a href="#home" className="flex items-center gap-3">
              <img
                src={media.logo}
                alt="Kayora Kayaking Kochi"
                className="h-12 w-12 rounded-full object-cover ring-2 ring-deep/20"
              />
              <div>
                <span className="text-xl font-extrabold tracking-tight text-deep">
                  Kayora<span className="font-medium text-forest"> Kayaking</span>
                </span>
                <p className="text-xs text-muted-foreground">{business.tagline}</p>
              </div>
            </a>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Kerala's premier backwater kayaking company based in Kadamakkudy, Kochi. Curating
              peaceful, guided morning, explorer, and sunset paddle experiences.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href={business.instagramUrl}
                {...ext}
                aria-label="Instagram"
                className="grid h-10 w-10 place-items-center rounded-full border border-border bg-mint/40 text-deep transition hover:bg-deep hover:text-on-dark"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href={whatsappLink()}
                {...ext}
                aria-label="WhatsApp"
                className="grid h-10 w-10 place-items-center rounded-full border border-border bg-mint/40 text-deep transition hover:bg-deep hover:text-on-dark"
              >
                <WhatsAppIcon className="h-4 w-4" />
              </a>
              <a
                href={telLink}
                aria-label={`Call ${business.phoneDisplay}`}
                className="grid h-10 w-10 place-items-center rounded-full border border-border bg-mint/40 text-deep transition hover:bg-deep hover:text-on-dark"
              >
                <Phone className="h-4 w-4" />
              </a>
              <a
                href={emailLink()}
                aria-label={`Email ${business.email}`}
                className="grid h-10 w-10 place-items-center rounded-full border border-border bg-mint/40 text-deep transition hover:bg-deep hover:text-on-dark"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold tracking-wider text-deep uppercase">Navigation</h4>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-muted-foreground transition hover:text-deep"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Verified Contact Details (4 cols) */}
          <div className="lg:col-span-4">
            <h4 className="text-sm font-bold tracking-wider text-deep uppercase">
              Launch Location & Contact
            </h4>
            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              <p className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-forest mt-0.5" />
                <span>{business.location}</span>
              </p>

              <p className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-forest" />
                <a href={telLink} className="font-semibold text-deep hover:underline">
                  {business.phoneDisplay}
                </a>
              </p>

              <p className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-forest" />
                <a href={emailLink()} className="font-semibold text-deep hover:underline break-all">
                  {business.email}
                </a>
              </p>

              <div className="mt-4 flex flex-col gap-2 pt-2">
                <a
                  href={business.launchPointMapUrl}
                  {...ext}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-forest hover:underline"
                >
                  <Navigation className="h-3.5 w-3.5" />
                  <span>Google Maps: Launch Point</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>

                <a
                  href={business.officeMapUrl}
                  {...ext}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-forest hover:underline"
                >
                  <Navigation className="h-3.5 w-3.5" />
                  <span>Google Maps: Office Location</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Kayora Kayaking Kochi. All rights reserved.</p>
          <p className="text-center sm:text-right">
            Safety first • Certified life jackets provided • Respect backwater wildlife
          </p>
        </div>
      </div>
    </footer>
  );
}
