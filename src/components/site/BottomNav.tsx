import { Compass, Home, Phone } from "lucide-react";
import { business, telLink, whatsappLink } from "@/config/business";
import { InstagramIcon, WhatsAppIcon } from "./icons";

const itemClass =
  "flex flex-1 flex-col items-center justify-center gap-1 py-1.5 text-[10px] font-semibold text-mint/85 transition active:scale-90 hover:text-on-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-1 focus-visible:ring-offset-deep rounded-xl";

export function BottomNav() {
  return (
    <nav aria-label="Mobile navigation bar" className="fixed inset-x-0 bottom-0 z-50 lg:hidden">
      <div className="relative mx-auto max-w-lg rounded-t-[1.5rem] border-t border-on-dark/15 bg-deep/95 px-3 pb-safe shadow-soft backdrop-blur-xl">
        <div className="flex items-end justify-between">
          <a href="#home" className={itemClass} aria-label="Go to top">
            <Home className="h-4.5 w-4.5 shrink-0" />
            <span>Home</span>
          </a>

          <a href="#experiences" className={itemClass} aria-label="View kayaking tours">
            <Compass className="h-4.5 w-4.5 shrink-0" />
            <span>Tours</span>
          </a>

          <div className="flex flex-1 justify-center">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat and book on WhatsApp"
              className="-mt-5 mb-1.5 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-deep shadow-md ring-3 ring-cream/90 animate-breathe transition hover:scale-105 active:scale-95"
            >
              <WhatsAppIcon className="h-6 w-6 shrink-0" />
            </a>
          </div>

          <a
            href={business.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={itemClass}
            aria-label="Visit Kayora on Instagram"
          >
            <InstagramIcon className="h-4.5 w-4.5 shrink-0" />
            <span>Instagram</span>
          </a>

          <a href={telLink} className={itemClass} aria-label={`Call ${business.phoneDisplay}`}>
            <Phone className="h-4.5 w-4.5 shrink-0" />
            <span>Call</span>
          </a>
        </div>
      </div>
    </nav>
  );
}

export function DesktopWhatsApp() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Kayora Kayaking on WhatsApp"
      className="fixed bottom-8 right-8 z-50 hidden h-14 w-14 place-items-center rounded-full bg-whatsapp text-deep shadow-glow ring-4 ring-cream/80 animate-breathe transition hover:scale-110 active:scale-95 lg:grid"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
