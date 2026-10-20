import { ShieldCheck, Users, Trees, Award, Anchor, Compass } from "lucide-react";
import { stats } from "@/config/experiences";

const features = [
  {
    icon: ShieldCheck,
    title: "100% Safety Track Record",
    description:
      "All paddlers are equipped with certified buoyancy aids (life vests) and safety briefings before setting off on the water.",
  },
  {
    icon: Trees,
    title: "Pristine Kadamakkudy Channels",
    description:
      "Paddle secluded waterways, quiet mangrove paths, and open backwater lagoons away from crowded motorboat traffic.",
  },
  {
    icon: Compass,
    title: "Guided by Local Experts",
    description:
      "Our passionate guides navigate the tides and channels effortlessly, pointing out local birdlife and hidden channels.",
  },
  {
    icon: Users,
    title: "Beginner & Solo Friendly",
    description:
      "First-time paddlers, families, and solo travellers are welcome. We provide stable touring kayaks that are easy to control.",
  },
  {
    icon: Anchor,
    title: "Top-Tier Kayaks & Paddles",
    description:
      "Well-maintained single and tandem sit-on-top kayaks designed for stability, effortless glide, and comfort.",
  },
  {
    icon: Award,
    title: "Eco-Conscious Exploration",
    description:
      "Zero noise, zero emissions. Kayaking leaves no trace while preserving the delicate backwater ecosystem.",
  },
];

export function WhyChooseSection() {
  return (
    <section id="why-us" className="relative scroll-mt-20 bg-mint/30 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Section Title */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-deep/10 px-4 py-1 text-xs font-bold tracking-widest text-deep uppercase">
            The Kayora Difference
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-deep sm:text-4xl lg:text-5xl">
            Why Choose Kayora
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            We focus on genuine connection with nature, safe water navigation, and deeply memorable
            moments on Kochi's most peaceful waterways.
          </p>
        </div>

        {/* Stats Strip */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:gap-6">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center justify-center rounded-3xl border border-border/80 bg-card p-6 text-center shadow-xs transition hover:shadow-soft"
            >
              <span className="text-3xl font-extrabold tracking-tight text-deep sm:text-4xl">
                {s.value}
              </span>
              <span className="mt-1 text-xs font-semibold text-muted-foreground sm:text-sm">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group relative rounded-3xl border border-border bg-card p-7 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-forest/30 hover:shadow-soft"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-deep text-mint shadow-xs transition-colors group-hover:bg-forest">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold tracking-tight text-deep">{item.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
