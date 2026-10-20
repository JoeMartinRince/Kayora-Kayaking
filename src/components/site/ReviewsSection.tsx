import { MessageSquareQuote, Star, ExternalLink, Heart } from "lucide-react";
import { reviews } from "@/config/experiences";
import { business } from "@/config/business";

export function ReviewsSection() {
  const hasReviews = reviews && reviews.length > 0;

  return (
    <section id="reviews" className="relative scroll-mt-20 bg-mint/20 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-forest/20 bg-mint/80 px-4 py-1.5 shadow-xs">
            <Heart className="h-3.5 w-3.5 text-deep" />
            <span className="text-xs font-bold tracking-widest text-deep uppercase">
              Guest Experiences
            </span>
          </div>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-deep sm:text-4xl lg:text-5xl">
            Paddler Impressions
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Authentic experiences shared by travellers, local explorers, and kayaking enthusiasts.
          </p>
        </div>

        {hasReviews ? (
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r, i) => (
              <div
                key={i}
                className="flex flex-col justify-between rounded-3xl border border-border bg-card p-7 shadow-xs"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-deep sm:text-base">"{r.text}"</p>
                </div>
                {(r.name || r.source) && (
                  <div className="mt-6 border-t border-border/60 pt-4">
                    {r.name && <p className="font-bold text-deep">{r.name}</p>}
                    {r.source && <p className="text-xs text-muted-foreground">{r.source}</p>}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          /* Honest, un-fabricated community feedback card */
          <div className="mx-auto mt-12 max-w-2xl rounded-3xl border border-border/80 bg-card p-8 text-center shadow-soft sm:p-10">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-deep text-mint">
              <MessageSquareQuote className="h-7 w-7" />
            </div>
            <h3 className="mt-5 text-xl font-bold tracking-tight text-deep sm:text-2xl">
              Over 800+ Paddlers Guided Safely
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              We strictly publish only verified guest reviews. Have you paddled with us in
              Kadamakkudy? Share your moments or tag our Instagram profile!
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href={business.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-deep px-5 py-2.5 text-xs font-bold text-on-dark transition hover:bg-forest active:scale-95 sm:text-sm"
              >
                <span>Tag @kayorakayakingkochi</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
