import { CheckCircle2, ArrowRight } from "lucide-react";
import { media } from "@/config/media";
import { whatsappLink } from "@/config/business";

const highlights = [
  "Hidden mangrove tunnels inaccessible to motorised boats",
  "Calm, sheltered backwaters with gentle current",
  "Pristine birdwatching opportunities at dawn and dusk",
  "Beginner coaching included with every session",
];

export function AboutSection() {
  return (
    <section id="about" className="relative scroll-mt-20 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Visual Showcase (5 columns on desktop) */}
          <div className="relative order-2 lg:order-1 lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Primary Card */}
              <div className="overflow-hidden rounded-[2.25rem] border border-border shadow-soft">
                <img
                  src={media.groupMangrove}
                  alt="Kayakers paddling through lush mangrove tunnel in Kochi"
                  className="aspect-4/5 w-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Floating Pill / Overlay Card */}
              <div className="absolute -bottom-6 -right-4 max-w-xs rounded-2xl border border-border/80 bg-card p-4 shadow-xl sm:-bottom-8 sm:-right-6 sm:p-5">
                <p className="text-xs font-bold tracking-wider text-forest uppercase">
                  Kadamakkudy Islands
                </p>
                <p className="mt-1 text-sm font-semibold text-deep">
                  Kochi's hidden cluster of tranquil backwater islands and mangrove trails.
                </p>
              </div>
            </div>
          </div>

          {/* Text Content (7 columns on desktop) */}
          <div className="order-1 lg:order-2 lg:col-span-7">
            <div className="inline-block rounded-full bg-mint px-4 py-1.5 text-xs font-bold tracking-widest text-deep uppercase">
              About Kayora Kayaking
            </div>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-deep sm:text-4xl lg:text-5xl">
              Rediscover Kochi from the Water's Surface
            </h2>

            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Far removed from city bustle, Kadamakkudy’s peaceful backwaters offer one of the most
              mesmerizing outdoor experiences in Kerala. At Kayora, we provide calm, guided paddling
              sessions that let you glide right beside untouched mangroves, serene bird habitats,
              and tranquil village shores.
            </p>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Whether you are catching your first paddle stroke or you are a seasoned adventurer,
              our trips are paced gently so you can absorb the quiet beauty, breathe fresh coastal
              air, and connect with nature at your own pace.
            </p>

            {/* Highlights List */}
            <ul className="mt-6 space-y-3">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm font-medium text-deep">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-whatsapp" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={whatsappLink("Hi Kayora! I'd like to plan a kayaking session for my group.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-deep px-6 py-3.5 text-sm font-bold text-on-dark shadow-sm transition hover:bg-forest active:scale-95"
              >
                Plan Your Session <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#experiences"
                className="inline-flex items-center rounded-full border border-deep/20 px-6 py-3.5 text-sm font-semibold text-deep transition hover:bg-deep/5"
              >
                View Packages
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
