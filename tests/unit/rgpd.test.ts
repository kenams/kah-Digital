import test from "node:test";
import assert from "node:assert/strict";
import { detectRgpd, rgpdAudit } from "../../src/lib/agents/rgpd-audit";
import { composeProspectingEmail } from "../../src/lib/agents/email-composer";
import { checkContent } from "../../src/lib/prospect-send-gate";
import { isPlaceholderEmail, looksLikeArtifactEmail } from "../../src/lib/prospect-email-guard";

delete process.env.OPENAI_API_KEY;
delete process.env.ANTHROPIC_API_KEY;

const lead = { businessName: "Cabinet Test", website: "https://cabinet-test.fr", country: "FR", language: "fr", sector: "service-local", placeId: "x", address: "FR" } as never;
const pad = "<p>" + "Texte de contenu du site pour dépasser le seuil minimal. ".repeat(20) + "</p>";
const page = (html: string) => ({ ok: true, html, text: html.replace(/<[^>]+>/g, " "), https: true });
const GA = `<script async src="https://www.googletagmanager.com/gtag/js?id=G-ABC123"></script><script>gtag('config','G-ABC123')</script>`;
const ID = "3db78a00-a892-43a3-815e-2871e53e8958";

test("Google Analytics sans outil de consentement : constat RGPD", () => {
  const a = rgpdAudit(lead, page(`<html><body>${pad}${GA}<a href="/mentions-legales">Mentions légales</a></body></html>`));
  assert.ok(a);
  assert.equal(a.problems[0]?.category, "privacy");
  assert.match(a.problems[0]!.title, /Google Analytics/);
  assert.match(a.problems[0]!.detail, /ni politique de confidentialité/);
});

test("outil de consentement présent : rien à signaler", () => {
  assert.equal(rgpdAudit(lead, page(`<html><body>${pad}${GA}<div id="tarteaucitronRoot"></div></body></html>`)), null);
  assert.equal(rgpdAudit(lead, page(`<html><body>${pad}${GA}<script src="https://cdn.cookiebot.com/uc.js"></script></body></html>`)), null);
});

test("Google Tag Manager seul : ignoré (le consentement peut être géré dans GTM)", () => {
  const gtm = `<script src="https://www.googletagmanager.com/gtm.js?id=GTM-ABCDE12"></script>`;
  assert.equal(rgpdAudit(lead, page(`<html><body>${pad}${gtm}</body></html>`)), null);
});

test("site sans traceur : rien à signaler ; page injoignable : null", () => {
  assert.equal(rgpdAudit(lead, page(`<html><body>${pad}</body></html>`)), null);
  assert.equal(rgpdAudit(lead, { ok: false, html: "", text: "", https: true }), null);
});

test("piste française uniquement", () => {
  const en = { ...(lead as object), language: "en" } as never;
  assert.equal(rgpdAudit(en, page(`<html><body>${pad}${GA}</body></html>`)), null);
});

test("detectRgpd liste les traceurs directs", () => {
  const f = detectRgpd(`${GA}<script>fbq('init','123')</script><script src="https://static.hotjar.com/c/hotjar-1.js"></script>`);
  assert.deepEqual(f.trackers, ["Google Analytics", "le pixel Facebook", "Hotjar"]);
});

test("le mail RGPD passe le contrôle d'envoi, cite le constat réel et aucune fuite de gabarit", async () => {
  const a = rgpdAudit(lead, page(`<html><body>${pad}${GA}<form></form></body></html>`))!;
  const mail = await composeProspectingEmail(lead, a, "https://kah-digital.ch", ID);
  assert.match(mail.subject, /cookies et consentement/);
  assert.match(mail.textFallback, /Google Analytics est chargé/);
  assert.match(mail.textFallback, /490 € HT/);
  assert.match(mail.textFallback, /Vincent L’helgoual’ch/);
  assert.doesNotMatch(mail.textFallback, /undefined|null|\{\{|service-local/);
  assert.deepEqual(checkContent({ businessName: "Cabinet Test", subject: mail.subject, html: mail.html }), []);
});

test("filtre d'adresses : artefacts de pages rejetés, vraies adresses conservées", () => {
  for (const bad of [
    "34gbb9s6ov0g@1280x854.jpeg", "3oqimap79oig@1280x853.jpeg", "logo@2x.png",
    "0eda3376219ee5b810ba20c84840808d@o4508336401285120.ingest", "jean.dupont@gmail.com", "test@test.fr",
    "amelie.moreau@gmail.com", "marie.dupont@gmail.com", "noreply@exemple.fr",
  ]) assert.equal(isPlaceholderEmail(bad), true, bad);
  for (const good of ["contact@actwin-financements.com", "naturellebio31@gmail.com", "cabinet@colomiers-orthodontie.fr", "simon.meli@msi-consulting.fr"]) {
    assert.equal(isPlaceholderEmail(good), false, good);
  }
  assert.equal(looksLikeArtifactEmail("naturellebio31@gmail.com"), false);
});
