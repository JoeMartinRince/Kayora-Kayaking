import { CalendarCheck, MessageSquare, Waves, LifeBuoy } from "lucide-react";
import { whatsappLink } from "@/config/business";
import { WhatsAppIcon } from "./icons";

const steps = [
  {
    step: "01",
    icon: CalendarCheck,
    title: "Select an Experience",
    description:
      "Choose from the Sunrise Session, Mangrove Explorer Route, or Sunset Drift based on your preferred time of day.",
  },
  {
    step: "02",
    icon: MessageSquare,
    title: "Send Quick Enquiry",
    description:
      "Click to open WhatsApp with your chosen experience. Let us know your preferred date, time, and group size.",
  },
  {
    step: "03",
    icon: LifeBuoy,
    title: "Tide & Slot Confirmation",
    description:
      "Our team checks water conditions, confirms your slot, and shares route details and meeting point coordinates.",
  },
  {
    step: "04",
    icon: Waves,
    title: "Gear Up & Enjoy the Water",
    description:
      "Arrive at the Kadamakkudy launch point, get fitted with safety life jackets, receive a briefing, and paddle out!",
  },
];

export function BookingProcessSection() {
  return (
    <section className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-forest/10 px-4 py-1 text-xs font-bold tracking-widest text-deep uppercase">
            Simple & Transparent
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-deep sm:text-4xl lg:text-5xl">
            How to Book Your Kayak
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            We confirm water condition and tide timings before locking in your slot to guarantee the
            safest, most enjoyable paddle.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="relative flex flex-col justify-between rounded-[2rem] border border-border bg-card p-7 shadow-xs transition hover:shadow-soft"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-extrabold tracking-tight text-forest/40">
                      {s.step}
                    </span>
                    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-mint text-deep">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="mt-6 text-lg font-bold tracking-tight text-deep">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {s.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Process Banner Callout */}
        <div className="mt-12 flex flex-col items-center justify-between gap-6 rounded-3xl border border-forest/20 bg-deep p-6 text-on-dark shadow-soft sm:flex-row sm:p-8">
          <div>
            <h3 className="text-lg font-bold sm:text-xl">
              Ready to check today's or this weekend's slots?
            </h3>
            <p className="mt-1 text-xs text-mint/80 sm:text-sm">
              WhatsApp enquiries are answered directly by our local team in Kochi.
            </p>
          </div>
          <a
            href={whatsappLink("Hi Kayora! I'd like to check available kayaking slots.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-sm font-bold text-deep shadow-glow transition hover:scale-105 active:scale-95"
          >
            <WhatsAppIcon className="h-4 w-4" /> Check Available Slots
          </a>
        </div>
      </div>
    </section>
  );
}
