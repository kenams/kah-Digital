// Deutschsprachige Stadtseiten für die Deutschschweiz. Bewusst vorsichtig formuliert: Wir beschreiben,
// was wir leisten, nie eine lokale Präsenz oder Erfahrung, die wir nicht haben.
import type { DeCity } from "./local-seo-de-page-content";

const PREISE = "Starter ab CHF 290 — Business ab CHF 790 — KI-System ab CHF 2'490.";
const ZAHLUNG_Q = "Akzeptieren Sie Zahlung in CHF und TWINT?";
const ZAHLUNG_A = "Ja — Banküberweisung in CHF, TWINT und Kartenzahlung werden akzeptiert. Rechnungsstellung in CHF ist möglich.";

export const DE_AGENCY_CITIES: Record<string, DeCity> = {
  "webentwicklung-bern": {
    city: "Bern", country: "Schweiz", region: "Bern", slug: "webentwicklung-bern",
    headline: "Webentwicklung Bern",
    subline: "Zweisprachiges Digitalstudio DE/FR — Next.js 15, Lighthouse 95+, Festpreis. Ab CHF 290, geliefert in 5 Tagen. Unverbindlich.",
    intro: `KAH Digital Studio begleitet Unternehmen und Selbstständige in der Region Bern beim Aufbau ihrer Online-Präsenz. Zweisprachig Deutsch-Französisch passt unser Studio zum Berner Markt: Bund, Institutionen oder lokale KMU. ${PREISE} Kostenlose Offerte in 24h.`,
    sectors: ["Institutionen & Bundesverwaltung", "Praxen & Berater", "Zweisprachige KMU DE/FR", "Handwerker & Selbstständige", "Vereine & NGOs", "Berner Startups"],
    proofLine: "Studio auf Distanz · Zweisprachig DE/FR · Festpreis ab CHF 290 — Antwort in 24h",
    faq: [
      { q: "Was kostet eine professionelle Website in Bern?", a: "Starter (zweisprachige Landingpage DE/FR) ab CHF 290, geliefert in 5 Tagen. Business (6 Seiten, SEO) ab CHF 790. Komplettes KI-System ab CHF 2'490. Festpreis, Offerte vor Projektstart bestätigt." },
      { q: "Erstellen Sie Websites für Berner Institutionen?", a: "Ja: institutionelle Websites, Serviceportale und Intranets, nach Ihrem Pflichtenheft umgesetzt." },
      { q: "Arbeiten Sie auf Deutsch mit Berner Kunden?", a: "Ja, KAH Digital Studio erstellt Websites auf Deutsch, Französisch und Englisch — ideal für den zweisprachigen Berner Markt." },
      { q: ZAHLUNG_Q, a: ZAHLUNG_A },
    ],
  },
  "webentwicklung-basel": {
    city: "Basel", country: "Schweiz", region: "Basel-Stadt", slug: "webentwicklung-basel",
    headline: "Webentwicklung Basel",
    subline: "Dreisprachiges Digitalstudio DE/FR/EN — Next.js 15, Lighthouse 95+. Ab CHF 290, 5 Tage. Festpreis garantiert.",
    intro: `KAH Digital Studio erstellt Websites für Basler Unternehmen. Basel ist ein einzigartiger internationaler Knotenpunkt: Pharma, Messen, Kultur und Banken. Unser Studio baut mehrsprachige Websites für Firmen, die in der Schweiz, in Deutschland und Frankreich tätig sind. ${PREISE}`,
    sectors: ["Pharma & Life Sciences", "Industrie & Produktion", "Kultur & Kunst (Art Basel)", "Grenzüberschreitende KMU CH/DE/FR", "Praxen & Berater", "Restaurants & Hotels"],
    proofLine: "Studio auf Distanz · Dreisprachig DE/FR/EN · Festpreis ab CHF 290 — Antwort in 24h",
    faq: [
      { q: "Was kostet eine professionelle Website in Basel?", a: "Starter (dreisprachige Landingpage) ab CHF 290, geliefert in 5 Tagen. Business (6 Seiten, SEO in 3 Sprachen) ab CHF 790. Komplettes KI-System ab CHF 2'490. Festpreis, keine Überraschungen." },
      { q: "Erstellen Sie dreisprachige Websites für Basler Unternehmen?", a: "Ja: native Websites in DE, FR und EN mit SEO in jeder Sprache und korrektem hreflang. Ideal für den Raum am Rheinknie und internationale Messen." },
      { q: "Können Sie Websites für die Pharmabranche erstellen?", a: "Ja: institutionelle Websites, Partnerportale und Intranets — unter Berücksichtigung des Schweizer Datenschutzgesetzes (DSG) und branchenüblicher Compliance-Anforderungen." },
      { q: ZAHLUNG_Q, a: ZAHLUNG_A },
    ],
  },
  "webentwicklung-freiburg": {
    city: "Freiburg (CH)", country: "Schweiz", region: "Freiburg", slug: "webentwicklung-freiburg",
    headline: "Webentwicklung Freiburg (Schweiz)",
    subline: "Zweisprachiges Digitalstudio DE/FR — Next.js 15, technisches SEO, Festpreis. Ab CHF 290, geliefert in 5 Tagen. Unverbindlich.",
    intro: `KAH Digital Studio erstellt professionelle Websites für Unternehmen, Handwerker und Selbstständige im Kanton Freiburg. Zweisprachig Deutsch-Französisch können wir die besonderen Anforderungen des Freiburger Marktes bedienen. Leistungsstarke Websites, lokales SEO, Premium-Design. ${PREISE} Kostenlose Offerte in 24h.`,
    sectors: ["Freiburger Handwerker & KMU", "Restaurants & Cafés", "Coaches & Trainer", "Landwirtschaft & Regionalprodukte", "Vereine & Institutionen", "Freie Berufe"],
    proofLine: "Zweisprachig DE/FR · Festpreis ab CHF 290 — Antwort in 24h · Unverbindlich",
    faq: [
      { q: "Was kostet eine professionelle Website in Freiburg?", a: "Starter (zweisprachige Landingpage DE/FR) ab CHF 290, geliefert in 5 Tagen. Business (6 Seiten, SEO) ab CHF 790. Komplettes KI-System ab CHF 2'490. Festpreis, keine Überraschungen." },
      { q: "Erstellen Sie zweisprachige Websites Deutsch-Französisch für den Freiburger Markt?", a: "Ja — vollständig zweisprachige DE/FR-Websites mit korrektem hreflang, sauberen URLs pro Sprache und SEO in beiden Sprachen. Ideal für den Freiburger Markt." },
      { q: "Können wir uns in Freiburg treffen?", a: "Wir arbeiten auf Distanz mit Unternehmen in Freiburg. Der gesamte Austausch findet per Videokonferenz statt." },
    ],
  },
};
