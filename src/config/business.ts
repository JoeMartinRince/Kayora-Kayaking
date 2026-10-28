// Single source of truth for every business detail and link on the site.
// Values marked VERIFIED come from https://www.kayorakayakingkochi.com/.
// Values marked PLACEHOLDER must be replaced before going live.

export const business = {
  name: "Kayora Kayaking",
  fullName: "Kayora Kayaking Kochi",
  tagline: "Kerala's Premier Kayaking Experience", // VERIFIED
  phoneDisplay: "+91 77366 29393", // VERIFIED
  phone: "+917736629393", // VERIFIED
  email: "kayorakayaking@gmail.com",
  defaultEmailSubject: "Kayaking Enquiry – Kayora Kochi",
  defaultEmailBody:
    "Hi Kayora Kayaking, I'd like to know more about your kayaking experiences, packages, and available slots.",
  // PLACEHOLDER: assumed to be the same number as the phone line — confirm WhatsApp is active on it.
  whatsapp: "917736629393",
  // VERIFIED: official Instagram profile
  instagramHandle: "@kayora_kayaking_kochi",
  instagramUrl: "https://www.instagram.com/kayora_kayaking_kochi?srtk=MTN5MDIzOWZ1NGx4cQ==",
  websiteUrl: "https://www.kayorakayakingkochi.com/", // VERIFIED
  location: "Kadamakkudy, Kochi, Kerala", // VERIFIED (Kadamakkudy, Kerala)
  launchPointMapUrl: "https://maps.app.goo.gl/646dxqUMnUaj7wJ99?g_st=iw", // VERIFIED
  headerLocationMapUrl: "https://maps.app.goo.gl/kC74aMDuAMgspUwS8?g_st=ic",
  officeMapUrl: "https://maps.app.goo.gl/PLmSk8uYVRPBrNkXA?g_st=iw", // VERIFIED
  defaultMessage:
    "Hi Kayora Kayaking! I'd like to know more about your kayaking packages and available slots.",
} as const;

export const telLink = `tel:${business.phone}`;

export function whatsappLink(message: string = business.defaultMessage) {
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function experienceMessage(name: string) {
  return `Hi Kayora Kayaking! I'm interested in booking ${name}. Please share the available slots and details.`;
}

// Prefilled enquiry message for the featured signature Mangrove Forest Ride
export const mangroveRideMessage =
  "Hi Kayora Kayaking! I'm interested in the Mangrove Forest Ride. Could you share the price, duration, launch location, and available slots?";

/**
 * Builds a standardized mailto: URL with prefilled recipient, subject, and body.
 */
export function emailLink(options?: { subject?: string; body?: string }) {
  const subject = options?.subject ?? business.defaultEmailSubject;
  const body = options?.body ?? business.defaultEmailBody;
  const queryParts: string[] = [];
  if (subject) queryParts.push(`subject=${encodeURIComponent(subject)}`);
  if (body) queryParts.push(`body=${encodeURIComponent(body)}`);
  const queryString = queryParts.length > 0 ? `?${queryParts.join("&")}` : "";
  return `mailto:${business.email}${queryString}`;
}

/**
 * Builds a mailto: URL prefilled for a specific kayaking experience / ride.
 */
export function experienceEmailLink(experienceName: string) {
  return emailLink({
    subject: `${experienceName} Enquiry – Kayora Kochi`,
    body: `Hi Kayora Kayaking, I'd like to know more about the ${experienceName} experience, available timings, and slots.`,
  });
}

export const tourPricing = {
  amount: 650,
  currency: "INR",
  display: "₹650 per person",
  rate: "₹650",
  unit: "per person",
} as const;

export type Experience = {
  id: string;
  name: string;
  tagline?: string;
  description: string;
  time: string; // VERIFIED
  duration: string; // VERIFIED (approximate, as stated on the current site)
  badge?: string;
  featured?: boolean;
  price?: string;
  image: string;
  objectPosition?: string;
};
