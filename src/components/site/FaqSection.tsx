import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { emailLink, tourPricing, whatsappLink } from "@/config/business";

const faqs = [
  {
    question: "Do I need prior kayaking or swimming experience?",
    answer:
      "No prior kayaking experience is required! Beginners, solo paddlers, and families are welcome. You do not need to know how to swim because certified life jackets (buoyancy aids) are mandatory and provided for everyone. Our certified guides provide full paddling instructions before we launch.",
  },
  {
    question: "Where do we meet and launch?",
    answer:
      "Our launch point is in Kadamakkudy, Kochi, Kerala. It is easily accessible by road and taxi. Exact GPS pin, parking directions, and local transit tips will be sent to your WhatsApp once your slot is booked.",
  },
  {
    question: "How long is a typical kayaking tour?",
    answer:
      "All standard sessions (Sunrise Session, Explorer Route, and Sunset Drift) run for approximately 2 hours. This includes equipment fitting, basic technique coaching, and guided on-water paddling through mangroves and backwaters.",
  },
  {
    question: "What is the price for a kayaking tour?",
    answer: `All our guided kayaking tours are ${tourPricing.display} for an approximately 2-hour experience. This includes kayak rental, certified life jacket, paddle, and safety briefing with a local guide. Advance slot confirmation is recommended via WhatsApp or email.`,
  },
  {
    question: "What should I wear and bring along?",
    answer:
      "Wear comfortable quick-dry clothes (shorts and t-shirt) and footwear that can get wet (crocs, sandals, or water shoes). Bring a small bottle of water, sunglasses with a strap, sun protection, a waterproof phone pouch, and a dry change of clothes for after the session.",
  },
  {
    question: "Can kids or seniors join the tour?",
    answer:
      "Yes! Children can paddle comfortably in double (tandem) kayaks seated with an adult. We have child-sized life vests. Please mention the age of participants when reaching out so we can prepare suitable gear.",
  },
  {
    question: "What happens in case of rain or bad weather?",
    answer:
      "Paddling in light tropical rain is often very calm and peaceful. However, if there are heavy storms, lightning, or unsafe currents, we prioritize safety and will reschedule your paddle to an agreeable alternate slot.",
  },
  {
    question: "How do I secure my booking?",
    answer:
      "Click 'Book on WhatsApp', call us, or send an email enquiry. Share your preferred date, tour type, and group size. We verify tide timings and availability, then confirm your booking directly.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="relative scroll-mt-20 bg-mint/20 py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-5 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-forest/20 bg-mint/80 px-4 py-1.5 shadow-xs">
            <HelpCircle className="h-3.5 w-3.5 text-deep" />
            <span className="text-xs font-bold tracking-widest text-deep uppercase">
              Frequently Asked Questions
            </span>
          </div>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-deep sm:text-4xl lg:text-5xl">
            Everything You Need to Know
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Have questions before paddling into Kochi’s backwaters? Here are quick answers to the
            most common queries.
          </p>
        </div>

        {/* Accordion */}
        <div className="mt-12 rounded-[2rem] border border-border bg-card p-6 shadow-soft sm:p-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="border-border/70 py-1">
                <AccordionTrigger className="text-left text-base font-bold text-deep hover:text-forest hover:no-underline sm:text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Still Have Questions CTA */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <span>Have a question not listed here? </span>
          <a
            href={whatsappLink("Hi Kayora! I have a question about kayaking in Kochi.")}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-deep underline hover:text-forest"
          >
            Ask us on WhatsApp
          </a>
          <span> or </span>
          <a
            href={emailLink({
              subject: "Kayaking Question – Kayora Kochi",
              body: "Hi Kayora Kayaking, I have a question regarding your kayaking tours:",
            })}
            className="font-bold text-deep underline hover:text-forest"
          >
            email us directly
          </a>
          .
        </div>
      </div>
    </section>
  );
}
