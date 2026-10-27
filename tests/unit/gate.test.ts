import test from "node:test";
import assert from "node:assert/strict";
import { checkContent, checkSendable } from "../../src/lib/prospect-send-gate";
import { evaluateBounces, startOfParisDayIso, dailyCap, DEFAULT_DAILY_CAP } from "../../src/lib/prospection-safety";

const ID = "3db78a00-a892-43a3-815e-2871e53e8958";
const okHtml = `<p>${"Bonjour, un message tout à fait normal. ".repeat(5)}</p><a href="https://kah-digital.ch/api/unsubscribe?id=${ID}">Se désinscrire</a>`;

test("contenu sain accepté", () => {
  assert.deepEqual(checkContent({ businessName: "Plomberie Dupont", subject: "Mal présenté dans Google — Plomberie Dupont", html: okHtml }), []);
});

test("fuite du slug interne bloquée (régression 27/10)", () => {
  const html = okHtml.replace("Bonjour", "Je suis tombé sur X en cherchant des service-local dans le coin. Bonjour");
  assert.ok(checkContent({ businessName: "X Y", subject: "Sujet valable ici", html }).some((r) => r.includes("service-local")));
});

test("gabarits non remplis bloqués", () => {
  for (const bad of ["{{name}} — offre", "undefined — offre", "Offre null pour vous", "[object Object] test"]) {
    assert.ok(checkContent({ businessName: "Nom Valide", subject: bad, html: okHtml }).length > 0, bad);
  }
});

test("désinscription obligatoire, nom d'entreprise obligatoire", () => {
  assert.ok(checkContent({ businessName: "Nom Valide", subject: "Sujet valable ici", html: okHtml.replace(/<a[^>]+>.*?<\/a>/, "") }).includes("lien de désinscription absent"));
  assert.ok(checkContent({ businessName: "", subject: "Sujet valable ici", html: okHtml }).length > 0);
  assert.ok(checkContent({ businessName: "x", subject: "Sujet valable ici", html: okHtml }).length > 0);
});

test("sujet multi-ligne ou trop long bloqué", () => {
  assert.ok(checkContent({ businessName: "Nom Valide", subject: "a\nb sujet", html: okHtml }).length > 0);
  assert.ok(checkContent({ businessName: "Nom Valide", subject: "x".repeat(120), html: okHtml }).length > 0);
});

test("contrôle final bloque une cible réseau même avec un contenu parfait", async () => {
  const r = await checkSendable({ to: "info@agence.axa.fr", website: "https://agence.axa.fr", businessName: "AXA", subject: "Sujet valable ici", html: okHtml }, { skipDns: true });
  assert.equal(r.ok, false);
});

test("contrôle final accepte une cible saine (DNS ignoré hors ligne)", async () => {
  const r = await checkSendable({ to: "contact@a2n-assurances.fr", website: "https://www.a2n-assurances.fr", businessName: "A2N Assurances", subject: "Non référencé localement — A2N", html: okHtml }, { skipDns: true });
  assert.equal(r.ok, true, r.reasons.join(","));
});

test("coupe-circuit : déclenché seulement avec au moins 2 rebonds ET plus de 8 %", () => {
  assert.equal(evaluateBounces(100, 1).tripped, false);
  assert.equal(evaluateBounces(100, 2).tripped, false); // 2 % : normal
  assert.equal(evaluateBounces(20, 2).tripped, true); // 10 %
  assert.equal(evaluateBounces(0, 0).tripped, false);
});

test("début de journée Paris cohérent (heure d'hiver, UTC+1)", () => {
  assert.equal(startOfParisDayIso(new Date("2026-10-27T08:00:00Z")), "2026-10-26T23:00:00.000Z");
});

test("début de journée Paris cohérent (heure d'été, UTC+2)", () => {
  assert.equal(startOfParisDayIso(new Date("2026-07-15T08:00:00Z")), "2026-07-14T22:00:00.000Z");
});

test("plafond journalier par défaut et surcharge", () => {
  delete process.env.PROSPECTION_DAILY_CAP;
  assert.equal(dailyCap(), DEFAULT_DAILY_CAP);
  process.env.PROSPECTION_DAILY_CAP = "3";
  assert.equal(dailyCap(), 3);
  delete process.env.PROSPECTION_DAILY_CAP;
});
