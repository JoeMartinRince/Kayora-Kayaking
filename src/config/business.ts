// Single source of truth for every business detail and link on the site.
// Values marked VERIFIED come from https://www.kayorakayakingkochi.com/.
// Values marked PLACEHOLDER must be replaced before going live.

export const business = {
  name: "Kayora Kayaking",
  fullName: "Kayora Kayaking Kochi",
  tagline: "Kerala's Premier Kayaking Experience", // VERIFIED
  phoneDisplay: "+91 77366 29393", // VERIFIED
  phone: "+917736629393", // VERIFIED
  // PLACEHOLDER: assumed to be the same number as the phone line — confirm WhatsApp is active on it.
  whatsapp: "917736629393",
  // PLACEHOLDER: official Instagram handle could not be verified. Replace with the real profile URL.
  instagramUrl: "https://www.instagram.com/kayorakayakingkochi/",
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

export type Experience = {
  id: string;
  name: string;
  tagline?: string;
  description: string;
  time: string; // VERIFIED
  duration: string; // VERIFIED (approximate, as stated on the current site)
  badge?: string;
  featured?: boolean;
  // PLACEHOLDER: prices are not published on the current site — fill in to display them.
  price?: string;
  image: string;
};
