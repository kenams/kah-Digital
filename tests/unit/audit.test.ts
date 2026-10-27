import test from "node:test";
import assert from "node:assert/strict";
import { ruleBasedAudit, type FetchedPage } from "../../src/lib/agents/website-auditor";

const lead = { businessName: "Test", website: "https://x.fr", country: "FR", language: "fr", sector: "service-local", placeId: "x", address: "FR" } as never;
const pad = "<p>" + "Texte de contenu du site. ".repeat(40) + "</p>";
const page = (html: string, https = true): FetchedPage => ({ ok: true, html, text: html.replace(/<[^>]+>/g, " "), https });

const GOOD = `<html><head><meta name="viewport" content="width=device-width"><meta name="description" content="Plombier à Toulouse, dépannage 7j/7 et devis gratuit."><script type="application/ld+json">{}</script></head><body>${pad}</body></html>`;

test("site correct : rien à reprocher, pas de mail", () => {
  assert.equal(ruleBasedAudit(lead, page(GOOD)), null);
});

test("site injoignable ou vide : pas d'audit inventé", () => {
  assert.equal(ruleBasedAudit(lead, { ok: false, html: "", text: "", https: true }), null);
  assert.equal(ruleBasedAudit(lead, page("<html></html>")), null);
});

test("réservation en ligne déjà en place : hors cible", () => {
  const html = GOOD.replace("</body>", '<a href="https://www.planity.com/x">Réserver</a></body>').replace('<meta name="viewport" content="width=device-width">', "");
  assert.equal(ruleBasedAudit(lead, page(html)), null);
});

test("description avec apostrophe n'est PAS signalée comme absente (régression 27/10)", () => {
  const html = `<html><head><meta name="viewport" content="x"><meta name="description" content="L'assurance des professionnels et des particuliers sur Nantes."></head><body>${pad}</body></html>`;
  const a = ruleBasedAudit(lead, page(html));
  assert.ok(!a || !a.problems.some((p) => p.category === "seo" && /Google/.test(p.title)));
});

test("viewport avec content avant name n'est pas signalé (ordre des attributs)", () => {
  const html = `<html><head><meta content="width=device-width, initial-scale=1" name="viewport"></head><body>${pad}</body></html>`;
  const a = ruleBasedAudit(lead, page(html));
  assert.ok(!a || !a.problems.some((p) => p.category === "mobile"));
});

test("vrai défaut mobile + description absente : constat vérifié et score cohérent", () => {
  const html = `<html><head><title>x</title></head><body>${pad}</body></html>`;
  const a = ruleBasedAudit(lead, page(html));
  assert.ok(a);
  assert.ok(a!.problems.some((p) => p.category === "mobile"));
  assert.ok(a!.score >= 25 && a!.score <= 60);
});

test("un seul point faible mineur ne suffit pas", () => {
  const html = `<html><head><meta name="viewport" content="x"><meta name="description" content="Description suffisamment longue pour compter."></head><body>${pad}</body></html>`;
  assert.equal(ruleBasedAudit(lead, page(html)), null); // seul "pas de données structurées" (medium)
});

test("site accessible uniquement en http : défaut de sécurité signalé", () => {
  const html = GOOD.replace('<script type="application/ld+json">{}</script>', "");
  const a = ruleBasedAudit(lead, page(html, false));
  assert.ok(a?.problems.some((p) => p.category === "security"));
});
