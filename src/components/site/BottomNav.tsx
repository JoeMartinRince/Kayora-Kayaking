import { Compass, Home, Phone } from "lucide-react";
import { business, telLink, whatsappLink } from "@/config/business";
import { InstagramIcon, WhatsAppIcon } from "./icons";

const item = "flex flex-1 flex-col items-center gap-1 py-2 text-[10px] font-semibold text-mint/85 transition active:scale-90 hover:text-on-dark";

export function BottomNav() {
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-50 lg:hidden">
      <div className="relative mx-auto rounded-t-[1.75rem] border-t border-on-dark/10 bg-deep/95 px-2 pb-safe shadow-soft backdrop-blur-md">
        <div className="flex items-end">
          <a href="#home" className={item}><Home className="h-5 w-5" />Home</a>
          <a href="#experiences" className={item}><Compass className="h-5 w-5" />Tours</a>
          <div className="flex flex-1 justify-center">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Book on WhatsApp"
              className="-mt-8 mb-2 grid h-16 w-16 place-items-center rounded-full bg-whatsapp text-on-dark ring-4 ring-cream animate-breathe active:scale-95"
            >
              <WhatsAppIcon className="h-8 w-8" />
            </a>
          </div>
          <a href={business.instagramUrl} target="_blank" rel="noopener noreferrer" className={item}><InstagramIcon className="h-5 w-5" />Instagram</a>
          <a href={telLink} className={item}><Phone className="h-5 w-5" />Call</a>
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
      aria-label="Chat on WhatsApp"
      className="fixed bottom-8 right-8 z-50 hidden h-14 w-14 place-items-center rounded-full bg-whatsapp text-on-dark animate-breathe transition hover:scale-105 lg:grid"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
