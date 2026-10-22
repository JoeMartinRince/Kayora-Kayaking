import { describe, expect, it } from "vitest";
import * as fs from "fs";
import * as path from "path";
import { Route, structuredData } from "@/routes/__root";
import { business } from "@/config/business";

describe("SEO & Production Audit", () => {
  it("exports valid structured data matching verified business details", () => {
    expect(structuredData["@context"]).toBe("https://schema.org");
    const graph = structuredData["@graph"];
    expect(Array.isArray(graph)).toBe(true);

    const businessSchema = graph.find((item: any) =>
      Array.isArray(item["@type"])
        ? item["@type"].includes("LocalBusiness")
        : item["@type"] === "LocalBusiness"
    );
    expect(businessSchema).toBeDefined();
    expect(businessSchema.name).toBe("Kayora Kayaking");
    expect(businessSchema.telephone).toBe("+917736629393");
    expect(businessSchema.email).toBe("kayorakayaking@gmail.com");
    expect(businessSchema.url).toBe("https://www.kayorakayakingkochi.com/");
    expect(businessSchema.address.addressLocality).toBe("Kochi");
    expect(businessSchema.address.addressRegion).toBe("Kerala");
    expect(businessSchema.address.postalCode).toBe("682027");
    expect(businessSchema.address.addressCountry).toBe("IN");
    expect(businessSchema.sameAs).toContain(business.instagramUrl);
    expect(businessSchema.sameAs).toContain(business.launchPointMapUrl);

    const websiteSchema = graph.find((item: any) => item["@type"] === "WebSite");
    expect(websiteSchema).toBeDefined();
    expect(websiteSchema.url).toBe("https://www.kayorakayakingkochi.com/");
    expect(websiteSchema.inLanguage).toBe("en");
  });

  it("configures head meta tags with canonical URL, OpenGraph, and Twitter cards", () => {
    const headConfig = Route.options.head?.({} as any);
    expect(headConfig).toBeDefined();

    const meta = headConfig?.meta || [];
    const links = headConfig?.links || [];

    // Title & description
    const title = meta.find((m: any) => m.title);
    expect(title?.title).toContain("Kayora Kayaking Kochi");
    expect(title?.title).toContain("Kadamakkudy");

    const desc = meta.find((m: any) => m.name === "description");
    expect(desc?.content).toContain("Kadamakkudy");
    expect(desc?.content).toContain("Kochi");

    // Canonical link
    const canonical = links.find((l: any) => l.rel === "canonical");
    expect(canonical?.href).toBe("https://www.kayorakayakingkochi.com/");

    // Robots directive
    const robots = meta.find((m: any) => m.name === "robots");
    expect(robots?.content).toContain("index, follow");

    // OpenGraph tags
    const ogUrl = meta.find((m: any) => m.property === "og:url");
    expect(ogUrl?.content).toBe("https://www.kayorakayakingkochi.com/");

    const ogImage = meta.find((m: any) => m.property === "og:image");
    expect(ogImage?.content).toMatch(/^https:\/\/www\.kayorakayakingkochi\.com\//);

    // Twitter card
    const twitterCard = meta.find((m: any) => m.name === "twitter:card");
    expect(twitterCard?.content).toBe("summary_large_image");
  });

  it("has valid robots.txt referencing canonical sitemap", () => {
    const robotsPath = path.resolve(process.cwd(), "public/robots.txt");
    expect(fs.existsSync(robotsPath)).toBe(true);

    const robotsContent = fs.readFileSync(robotsPath, "utf-8");
    expect(robotsContent).toContain("User-agent: *");
    expect(robotsContent).toContain("Allow: /");
    expect(robotsContent).toContain("Sitemap: https://www.kayorakayakingkochi.com/sitemap.xml");
  });

  it("has valid sitemap.xml with canonical route and image metadata", () => {
    const sitemapPath = path.resolve(process.cwd(), "public/sitemap.xml");
    expect(fs.existsSync(sitemapPath)).toBe(true);

    const sitemapContent = fs.readFileSync(sitemapPath, "utf-8");
    expect(sitemapContent).toContain("<loc>https://www.kayorakayakingkochi.com/</loc>");
    expect(sitemapContent).toContain("<image:loc>");
  });

  it("has valid site.webmanifest and _headers configuration", () => {
    const manifestPath = path.resolve(process.cwd(), "public/site.webmanifest");
    expect(fs.existsSync(manifestPath)).toBe(true);
    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
    expect(manifest.name).toBe("Kayora Kayaking Kochi");
    expect(manifest.icons.length).toBeGreaterThan(0);

    const headersPath = path.resolve(process.cwd(), "public/_headers");
    expect(fs.existsSync(headersPath)).toBe(true);
    const headersContent = fs.readFileSync(headersPath, "utf-8");
    expect(headersContent).toContain("X-Content-Type-Options: nosniff");
    expect(headersContent).toContain("X-Frame-Options: SAMEORIGIN");
  });
});
