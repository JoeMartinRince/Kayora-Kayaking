import { describe, expect, it } from "vitest";
import { business, whatsappLink, experienceMessage, telLink } from "@/config/business";
import { experiences } from "@/config/experiences";

describe("Business Configuration & Helpers", () => {
  it("has valid business phone and contact details", () => {
    expect(business.phone).toBe("+917736629393");
    expect(business.whatsapp).toBe("917736629393");
    expect(telLink).toBe("tel:+917736629393");
    expect(business.instagramUrl).toContain("instagram.com");
    expect(business.launchPointMapUrl).toContain("maps.app.goo.gl");
  });

  it("generates correctly formatted wa.me URLs with encoded messages", () => {
    const defaultUrl = whatsappLink();
    expect(defaultUrl).toContain("https://wa.me/917736629393?text=");
    expect(defaultUrl).toContain(encodeURIComponent(business.defaultMessage));

    const expMsg = experienceMessage("Sunrise Session");
    const expUrl = whatsappLink(expMsg);
    expect(expUrl).toContain("https://wa.me/917736629393?text=");
    expect(expUrl).toContain(encodeURIComponent("Sunrise Session"));
  });

  it("contains all 3 verified experiences with local assets", () => {
    expect(experiences).toHaveLength(3);
    const ids = experiences.map((e) => e.id);
    expect(ids).toContain("sunrise");
    expect(ids).toContain("explorer");
    expect(ids).toContain("sunset");

    for (const exp of experiences) {
      expect(exp.image).toMatch(/^\/assets\//);
      expect(exp.duration).toBe("~2 hrs");
    }
  });
});
