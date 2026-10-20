import { describe, expect, it } from "vitest";
import {
  business,
  whatsappLink,
  experienceMessage,
  mangroveRideMessage,
  telLink,
} from "@/config/business";
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

    const mangroveUrl = whatsappLink(mangroveRideMessage);
    expect(mangroveUrl).toContain("https://wa.me/917736629393?text=");
    expect(mangroveUrl).toContain(encodeURIComponent(mangroveRideMessage));
    expect(mangroveRideMessage).toBe(
      "Hi Kayora Kayaking! I'm interested in the Mangrove Forest Ride. Could you share the price, duration, launch location, and available slots?"
    );
  });

  it("contains all 4 experiences with local assets including the signature ride", () => {
    expect(experiences).toHaveLength(4);
    const ids = experiences.map((e) => e.id);
    expect(ids).toContain("mangrove-forest");
    expect(ids).toContain("sunrise");
    expect(ids).toContain("explorer");
    expect(ids).toContain("sunset");

    const mangrove = experiences.find((e) => e.id === "mangrove-forest");
    expect(mangrove).toBeDefined();
    expect(mangrove?.name).toBe("Mangrove Forest Ride");
    expect(mangrove?.badge).toBe("KAYORA SIGNATURE RIDE");
    expect(mangrove?.featured).toBe(true);

    for (const exp of experiences) {
      expect(exp.image).toMatch(/^\/assets\//);
      expect(exp.duration).toBe("~2 hrs");
    }
  });
});
