import { ArrowUpRight, Clock, Mail, Sun } from "lucide-react";
import { experiences } from "@/config/experiences";
import { experienceEmailLink, experienceMessage, whatsappLink } from "@/config/business";
import { WhatsAppIcon } from "./icons";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

export function ExperiencesSection() {
  // Exclude the featured signature ride so it isn't duplicated in the regular grid
  const regularExperiences = experiences.filter((exp) => !exp.featured);

  return (
    <section
      id="experiences"
      className="relative scroll-mt-20 pt-4 pb-20 sm:pt-8 lg:pt-10 lg:pb-28"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-deep sm:text-4xl lg:text-5xl">
            Choose Your Adventure
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Whether you want the stillness of early dawn, dense mangrove explorations, or a calm
            twilight drift, every guided tour is designed for unforgettable memories.
          </p>
        </div>

        {/* Experiences Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {regularExperiences.map((exp) => {
            const bookingUrl = whatsappLink(experienceMessage(exp.name));

            return (
              <article
                key={exp.id}
                className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
              >
                {/* Image Container */}
                <div className="relative aspect-4/3 w-full overflow-hidden bg-mint/50">
                  <img
                    src={exp.image}
                    alt={`${exp.name} - Kayora Kayaking Kochi`}
                    loading="lazy"
                    decoding="async"
                    width="600"
                    height="450"
                    style={{ objectPosition: exp.objectPosition || "center" }}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep/75 via-transparent to-transparent" />

                  {/* Badge */}
                  {exp.badge && (
                    <span className="absolute top-4 left-4 rounded-full bg-whatsapp px-3.5 py-1 text-xs font-bold text-deep shadow-md">
                      {exp.badge}
                    </span>
                  )}

                  {/* Quick Meta Pills inside Image */}
                  <div className="absolute right-4 bottom-4 left-4 flex items-center justify-between text-xs font-semibold text-on-dark">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-deep/60 px-3 py-1 backdrop-blur-md">
                      <Sun className="h-3.5 w-3.5 text-sage" />
                      {exp.time}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-deep/60 px-3 py-1 backdrop-blur-md">
                      <Clock className="h-3.5 w-3.5 text-sage" />
                      {exp.duration}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-deep sm:text-2xl">
                      {exp.name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {exp.description}
                    </p>
                  </div>

                  {/* Pricing note & WhatsApp Action */}
                  <div className="mt-6 border-t border-border/60 pt-5">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-xs font-medium text-muted-foreground">
                        Pricing & Slots
                      </span>
                      <span className="text-sm font-bold text-deep">
                        {exp.price ? exp.price : "Enquire on WhatsApp"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={bookingUrl}
                        {...ext}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-deep px-4 py-3 text-sm font-bold text-on-dark shadow-sm transition hover:bg-forest active:scale-95"
                      >
                        <WhatsAppIcon className="h-4 w-4 shrink-0 text-whatsapp" />
                        <span className="truncate">Book Experience</span>
                        <ArrowUpRight className="h-4 w-4 shrink-0 opacity-70 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                      <a
                        href={experienceEmailLink(exp.name)}
                        aria-label={`Email enquiry for ${exp.name}`}
                        title={`Email enquiry for ${exp.name}`}
                        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-background text-deep shadow-sm transition hover:border-forest/40 hover:bg-mint/40 hover:text-forest active:scale-95"
                      >
                        <Mail className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Small reassurance note */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 rounded-2xl bg-mint/50 px-6 py-4 text-center text-xs font-medium text-deep/80 sm:text-sm">
          <span>✓ Certified safety life-jackets provided</span>
          <span>✓ Experienced local guide on water</span>
          <span>✓ Beginner & family friendly</span>
        </div>
      </div>
    </section>
  );
}
