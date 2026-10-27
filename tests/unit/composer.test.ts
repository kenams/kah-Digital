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

test("service local avec score moyen : pitch site + réservation, jamais agent IA (régression 27/10)", async () => {
  const lead = {
    businessName: "Ardoise et Zinc", website: "https://www.ardoise-zinc.fr", country: "FR", language: "fr",
    sector: "service-local", email: "ardoise-zinc@orange.fr", placeId: "a", address: "FR",
  } as never;
  const a = { ...(audit("fr") as object), businessName: "Ardoise et Zinc", score: 52 } as never;
  const mail = await composeProspectingEmail(lead, a, "https://kah-digital.ch", ID);
  assert.ok(/rendez-vous/i.test(mail.textFallback), mail.textFallback);
  assert.ok(!/agent/i.test(mail.textFallback), mail.textFallback);
});

test("test A/B : visibilité locale pour une moitié des entreprises locales FR/EN, jamais en DE", async () => {
  const seen = { visibilite: 0, site: 0 };
  for (const lang of ["fr", "en", "de"]) {
    for (const name of ["Alpha", "Beta", "Gamma", "Delta", "Epsilon", "Zeta"]) {
      const lead = { businessName: name, website: `https://${name.toLowerCase()}.fr`, country: "FR", language: lang, sector: "service-local", email: `a@${name.toLowerCase()}.fr`, placeId: "p", address: "FR" } as never;
      const a = { ...(audit(lang) as object), businessName: name } as never;
      const mail = await composeProspectingEmail(lead, a, "https://kah-digital.ch", ID);
      assert.deepEqual(checkContent({ businessName: name, subject: mail.subject, html: mail.html }), []);
      const isVis = /visibilit|visibility/i.test(mail.html);
      if (lang === "de") assert.ok(!isVis, "pas de variante visibilité en DE");
      else if (isVis) {
        seen.visibilite++;
        assert.ok(mail.html.includes(encodeURIComponent(lang === "en" ? "https://kah-digital.ch/en/visibilite-locale" : "https://kah-digital.ch/visibilite-locale")));
        assert.ok(/39/.test(mail.html) && /(attente|waitlist)/i.test(mail.html));
      } else seen.site++;
    }
  }
  assert.ok(seen.visibilite > 0 && seen.site > 0, JSON.stringify(seen));
});
