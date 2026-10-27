import test from "node:test";
import assert from "node:assert/strict";
import { composeProspectingEmail } from "../../src/lib/agents/email-composer";
import { checkContent } from "../../src/lib/prospect-send-gate";

delete process.env.OPENAI_API_KEY;
delete process.env.ANTHROPIC_API_KEY;

const ID = "3db78a00-a892-43a3-815e-2871e53e8958";
const audit = (language: string) =>
  ({
    language,
    businessName: "Plomberie Dupont",
    sector: "service-local",
    score: 40,
    problems: [{ title: "Mal présenté dans Google", detail: "x", severity: "critical", category: "seo" }],
    recommendations: [],
    estimatedPrice: 790,
    priceRange: "Dès 790 €",
    mockupDescription: "x",
    screenshotUrl: null,
  }) as never;

for (const lang of ["fr", "en", "de"]) {
  test(`mail ${lang} : aucune fuite, désinscription présente, nom cité`, async () => {
    const lead = {
      businessName: "Plomberie Dupont",
      website: "https://plomberie-dupont.fr",
      country: "FR",
      language: lang,
      sector: "service-local",
      email: "contact@plomberie-dupont.fr",
      placeId: "p",
      address: "FR",
    } as never;
    const mail = await composeProspectingEmail(lead, audit(lang), "https://kah-digital.ch", ID);
    assert.deepEqual(checkContent({ businessName: "Plomberie Dupont", subject: mail.subject, html: mail.html }), []);
    assert.ok(mail.html.includes("Plomberie Dupont"));
    assert.ok(!/service-local/i.test(mail.html));
  });
}
