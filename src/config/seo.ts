import { business } from "@/config/business";

export const siteTitle = "Kayaking in Kochi, Kerala | Kayora Kayaking";

export const siteDescription =
  "Experience guided kayaking in Kadamakkudy, Kochi with Kayora. Explore lush mangrove forests, peaceful sunrise paddling, and sunset drifts. Enquire today to book your adventure.";

export const siteKeywords =
  "Kayaking in Kochi, Kayaking in Kadamakkudy, Mangrove kayaking in Kochi, Sunrise kayaking in Kochi, Sunset kayaking in Kochi, Kayaking experiences in Kochi, Mangrove forest kayaking, Birdwatching during mangrove kayaking, Kayora Kayaking";

export const canonicalUrl = business.websiteUrl;

export const previewImageUrl = `${business.websiteUrl}assets/mangrove-forest-ride.jpeg`;

export interface SchemaAddress {
  "@type": "PostalAddress";
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
}

export interface SchemaGeo {
  "@type": "GeoCoordinates";
  latitude: number;
  longitude: number;
}

export interface SchemaAreaServed {
  "@type": "City" | "AdministrativeArea";
  name: string;
}

export interface SchemaBusiness {
  "@type": string[];
  "@id": string;
  name: string;
  alternateName: string;
  url: string;
  logo: string;
  image: string[];
  description: string;
  telephone: string;
  email: string;
  address: SchemaAddress;
  geo: SchemaGeo;
  hasMap: string;
  sameAs: string[];
  currenciesAccepted: string;
  paymentAccepted: string;
  areaServed: SchemaAreaServed[];
  knowsAbout: string[];
}

export interface SchemaWebSite {
  "@type": "WebSite";
  "@id": string;
  url: string;
  name: string;
  description: string;
  publisher: {
    "@id": string;
  };
  inLanguage: string;
}

export interface SchemaBreadcrumbList {
  "@type": "BreadcrumbList";
  itemListElement: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    item: string;
  }>;
}

export interface SchemaGraph {
  "@context": "https://schema.org";
  "@graph": [SchemaBusiness, SchemaWebSite, SchemaBreadcrumbList];
}

export const structuredData: SchemaGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "SportsActivityLocation"],
      "@id": `${business.websiteUrl}#business`,
      name: "Kayora Kayaking",
      alternateName: business.fullName,
      url: business.websiteUrl,
      logo: `${business.websiteUrl}assets/kayora-emblem.png`,
      image: [
        `${business.websiteUrl}assets/mangrove-forest-ride.jpeg`,
        `${business.websiteUrl}assets/office-welcome.png`,
        `${business.websiteUrl}assets/paddle-morning.jpg`,
      ],
      description:
        "Kayora Kayaking offers guided backwater kayaking tours in Kadamakkudy, Kochi, Kerala. Offering sunrise paddling, sunset drifts, mangrove forest tours, and birdwatching kayaking experiences with certified safety equipment.",
      telephone: business.phone,
      email: business.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Kadamakkudy, Pizhala",
        addressLocality: "Kochi",
        addressRegion: "Kerala",
        postalCode: "682027",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 10.0658,
        longitude: 76.2572,
      },
      hasMap: business.launchPointMapUrl,
      sameAs: [business.instagramUrl, business.launchPointMapUrl],
      currenciesAccepted: "INR",
      paymentAccepted: "Cash, UPI",
      areaServed: [
        { "@type": "City", name: "Kochi" },
        { "@type": "AdministrativeArea", name: "Kadamakkudy" },
        { "@type": "AdministrativeArea", name: "Kerala" },
      ],
      knowsAbout: [
        "Kayaking in Kochi",
        "Kayaking in Kadamakkudy",
        "Mangrove kayaking in Kochi",
        "Sunrise kayaking in Kochi",
        "Sunset kayaking in Kochi",
        "Birdwatching during mangrove kayaking in Kochi",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${business.websiteUrl}#website`,
      url: business.websiteUrl,
      name: "Kayora Kayaking",
      description: business.tagline,
      publisher: {
        "@id": `${business.websiteUrl}#business`,
      },
      inLanguage: "en",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: business.websiteUrl,
        },
      ],
    },
  ],
};
