import { describe, expect, it } from "vitest";
import {
  business,
  whatsappLink,
  experienceMessage,
  mangroveRideMessage,
  telLink,
  emailLink,
  experienceEmailLink,
} from "@/config/business";
import { experiences, stats } from "@/config/experiences";

describe("Business Configuration & Helpers", () => {
  it("has valid business phone, email, and contact details", () => {
    expect(business.phone).toBe("+917736629393");
    expect(business.whatsapp).toBe("917736629393");
    expect(business.email).toBe("kayorakayaking@gmail.com");
    expect(telLink).toBe("tel:+917736629393");
    expect(business.instagramUrl).toBe(
      "https://www.instagram.com/kayora_kayaking_kochi?srtk=MTN5MDIzOWZ1NGx4cQ==",
    );
    expect(business.launchPointMapUrl).toContain("maps.app.goo.gl");
    expect(business.headerLocationMapUrl).toBe("https://maps.app.goo.gl/kC74aMDuAMgspUwS8?g_st=ic");
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
      "Hi Kayora Kayaking! I'm interested in the Mangrove Forest Ride. Could you share the price, duration, launch location, and available slots?",
    );
  });

  it("generates properly formatted mailto URLs with encoded subject and body", () => {
    const defaultMailto = emailLink();
    expect(defaultMailto).toContain("mailto:kayorakayaking@gmail.com");
    expect(defaultMailto).toContain(
      "subject=" + encodeURIComponent("Kayaking Enquiry – Kayora Kochi"),
    );
    expect(defaultMailto).toContain("body=");

    const customMailto = emailLink({
      subject: "Custom Subject",
      body: "Custom Body Message",
    });
    expect(customMailto).toBe(
      `mailto:kayorakayaking@gmail.com?subject=Custom%20Subject&body=Custom%20Body%20Message`,
    );

    const expMailto = experienceEmailLink("Sunrise Session");
    expect(expMailto).toContain("mailto:kayorakayaking@gmail.com");
    expect(expMailto).toContain(
      "subject=" + encodeURIComponent("Sunrise Session Enquiry – Kayora Kochi"),
    );
    expect(expMailto).toContain(encodeURIComponent("Sunrise Session"));
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
    expect(mangrove?.badge).toBe("FEATURED MANGROVE RIDE");
    expect(mangrove?.featured).toBe(true);

    for (const exp of experiences) {
      expect(exp.image).toMatch(/^\/assets\//);
      expect(exp.duration).toBe("~2 hrs");
    }

    const sunrise = experiences.find((e) => e.id === "sunrise");
    expect(sunrise?.image).toBe("/assets/rides/Sunrise.jpg");

    const explorer = experiences.find((e) => e.id === "explorer");
    expect(explorer?.image).toBe("/assets/rides/Explorer.jpg");

    const sunset = experiences.find((e) => e.id === "sunset");
    expect(sunset?.image).toBe("/assets/rides/Sunset.jpg");

    const happyPaddlers = stats.find((s) => s.label.toLowerCase().includes("paddler"));
    expect(happyPaddlers?.value).toBe("2000+");
  });
});
