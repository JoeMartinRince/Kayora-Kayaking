import { media } from "./media";
import type { Experience } from "./business";

// VERIFIED: names, descriptions, time of day and ~2 hr duration come from the current website.
export const experiences: Experience[] = [
  {
    id: "sunrise",
    name: "Sunrise Session",
    description:
      "Start your day on the water as golden light spills across the backwaters. Peaceful, meditative, unforgettable.",
    time: "Early Morning",
    duration: "~2 hrs",
    image: media.sunrise,
  },
  {
    id: "explorer",
    name: "Explorer Route",
    description:
      "Venture deeper through mangrove tunnels and hidden lagoons. Nature, peace, and genuine freedom — this is the full experience.",
    time: "Midday",
    duration: "~2 hrs",
    badge: "Most Popular",
    image: media.explore,
  },
  {
    id: "sunset",
    name: "Sunset Drift",
    description:
      "Glide into the evening as the sky blazes orange and pink. A romantic, soul-stirring close to any day.",
    time: "Evening",
    duration: "~2 hrs",
    image: media.sunset,
  },
];

// VERIFIED: figures shown on the current website.
export const stats = [
  { value: "800+", label: "Happy paddlers" },
  { value: "3", label: "Unique packages" },
  { value: "100%", label: "Safety record" },
];

// Reviews: none could be verified. Add real reviews here ({ text, name, source }) to show them.
export const reviews: { text: string; name?: string; source?: string }[] = [];
