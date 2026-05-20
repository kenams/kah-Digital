import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { FiArrowRight, FiCheck } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Website-Kosten 2025: Was kostet eine professionelle Website in der Schweiz und Deutschland? — KAH Digital",
  description: "Transparente Übersicht der echten Kosten für eine professionelle Website 2025 — Landing Page, Business-Site, Web-App. Mit Preisvergleich und worauf man achten sollte.",
  keywords: ["Website Kosten 2025", "was kostet eine Website Schweiz", "Webseite erstellen Kosten Deutschland", "professionelle Website Preis"],
  alternates: { canonical: "https://kah-digital.ch/de/blog/website-kosten-2025" },
  openGraph: {
    title: "Website-Kosten 2025: Was kostet eine professionelle Website in der Schweiz und Deutschland?",
    description: "Transparente Übersicht der echten Kosten für eine professionelle Website 2025 — Landing Page, Business-Site, Web-App. Mit Preisvergleich und worauf man achten sollte.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Website-Kosten 2025: Was kostet eine professionelle Website in der Schweiz und Deutschland?",
  "datePublished": "2026-05-20",
  "dateModified": "2026-05-20",
  "author": { "@type": "Organization", "name": "KAH Digital" },
  "publisher": { "@type": "Organization", "name": "KAH Digital", "url": "https://kah-digital.ch" },
  "mainEntityOfPage": "https://kah-digital.ch/de/blog/website-kosten-2025",
  "inLanguage": "de",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Was kostet eine professionelle Website in der Schweiz 2025?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Eine Landing Page kostet CHF 149–500. Ein professionelles Business-Site mit 5–10 Seiten kostet CHF 420–2.500. Eine vollständige Website mit CMS, Mehrsprachigkeit und SEO-Optimierung liegt bei CHF 950–5.000+. Die Preise variieren je nach Komplexität, Design-Aufwand und Funktionsumfang."
      }
    },
    {
      "@type": "Question",
      "name": "Was kostet eine Website in Deutschland 2025?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In Deutschland liegt eine einfache Landing Page bei €149–400. Ein professionelles Unternehmenswebsite kostet €500–3.000. Mit KI-Funktionen, Web-App oder komplexen Integrationen: €1.500–8.000+. Festpreisangebote sind für KMU meistens vorteilhafter als Stundensatz-basierte Projekte."
      }
    },
    {
      "@type": "Question",
      "name": "Was sind die versteckten Kosten einer Website?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Versteckte Kosten entstehen durch Hosting (CHF/€ 50–600/Jahr), Domain-Verlängerungen, SSL-Zertifikate, Plugin-Abonnements bei WordPress (CHF/€ 300–1.200/Jahr), SEO-Maintenance, Inhaltsaktualisierungen und Sicherheitsupdates. Ein professionell entwickeltes Next.js-Site hat deutlich geringere Folgekosten."
      }
    },
  ],
};

const websiteTypes = [
  {
    type: "Landing Page / Portfolio",
    forWho: "Freelancer, Coaches, Produktlaunches, Kampagnenseiten",
    priceRange: "CHF/€ 149–500",
    timeline: "3–7 Tage",
    includes: ["1 optimierte Seite", "Responsive Design", "Kontaktformular", "SEO-Grundstruktur", "Deployment + Hosting"],
    notFor: "Unternehmen, die mehrere Services oder Produkte zeigen müssen",
  },
  {
    type: "Business-Website",
    forWho: "KMU, Dienstleister, Handwerker, Gastronomie",
    priceRange: "CHF/€ 420–2.500",
    timeline: "1–3 Wochen",
    includes: ["5–10 Seiten", "On-Page SEO", "Google Maps Integration", "Professionelles Kontaktformular", "Analytics", "Mobile-first Design"],
    notFor: "E-Commerce oder dynamische Web-Apps",
  },
  {
    type: "Premium-Website / KI-Integration",
    forWho: "Wachstumsunternehmen, mehrsprachige KMU, Lead-Maschinen",
    priceRange: "CHF/€ 950–5.000",
    timeline: "3–5 Wochen",
    includes: ["10–20 Seiten", "CMS-Integration", "Mehrsprachigkeit", "KI-Chatbot", "A/B-Testing-Basis", "Conversion-Architektur", "Technisches SEO-Audit"],
    notFor: "",
  },
  {
    type: "Web-App / SaaS",
    forWho: "Startups, interne Tools, Kundenportale, SaaS-Produkte",
    priceRange: "CHF/€ 2.000–15.000+",
    timeline: "4–10 Wochen",
    includes: ["User Authentication", "Datenbankanbindung", "REST API / Webhooks", "Dashboard & Reporting", "Zahlungsabwicklung", "Automatisierungen"],
    notFor: "",
  },
];

const hiddenCosts = [
  { item: "Hosting (Shared/VPS)", wpCost: "CHF/€ 120–600/Jahr", nextCost: "CHF/€ 0–20/Monat (Vercel)" },
  { item: "Domain-Erneuerung", wpCost: "CHF/€ 15–50/Jahr", nextCost: "CHF/€ 15–50/Jahr" },
  { item: "SSL-Zertifikat", wpCost: "CHF/€ 0–120/Jahr", nextCost: "CHF/€ 0 (automatisch)" },
  { item: "Plugin-Abonnements", wpCost: "CHF/€ 300–1.200/Jahr", nextCost: "CHF/€ 0" },
  { item: "Sicherheitsupdates / Wartung", wpCost: "CHF/€ 500–2.000/Jahr", nextCost: "CHF/€ 0–100/Jahr" },
  { item: "Performance-Optimierung", wpCost: "CHF/€ 300–800 (wiederkehrend)", nextCost: "CHF/€ 0 (integriert)" },
];

const kahdPricing = [
  {
    label: "Starter",
    price: "CHF 149",
    priceDE: "€ 139",
    desc: "Landing Page oder Portfolio",
    features: ["1 Seite, vollständig optimiert", "Mobil-First Design", "Kontaktformular", "SEO-Basis", "Deployment inklusive"],
    timeline: "3–5 Tage",
    cta: "Für Freelancer & Solo-Unternehmer",
    color: "emerald",
  },
  {
    label: "Business",
    price: "CHF 420",
    priceDE: "€ 390",
    desc: "Professionelle Business-Website",
    features: ["5–10 Seiten", "On-Page SEO", "Google Maps", "Analytics", "Kontaktformular pro", "1 Monat Support"],
    timeline: "1–2 Wochen",
    cta: "Für KMU & Dienstleister",
    color: "blue",
    featured: true,
  },
  {
    label: "Premium AI",
    price: "CHF 950",
    priceDE: "€ 890",
    desc: "Website + KI-Integration",
    features: ["10–20 Seiten", "KI-Chatbot inklusive", "Mehrsprachigkeit", "CMS-Integration", "Conversion-Architektur", "3 Monate Support"],
    timeline: "3–4 Wochen",
    cta: "Für wachstumsorientierte KMU",
    color: "violet",
  },
];

export default function WebsiteKosten2025Page() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Script id="ld-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Script id="ld-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-12">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="relative mx-auto max-w-3xl px-4">
          <Link href="/de/blog" className="mb-6 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-300">
            ← Blog
          </Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400">Preise & Budget</span>
            <span className="text-xs text-gray-600">20. Mai 2026 · 7 Min. Lesezeit</span>
          </div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Website-Kosten 2025: Was kostet eine professionelle Website in der Schweiz und Deutschland?
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            Die Preisgestaltung für Websites ist oft intransparent. Von CHF 99 bis CHF 50.000 — was erklärt diese Spanne, und was sollte eine Website Ihres Typs wirklich kosten? Dieser Leitfaden gibt klare Antworten, ohne versteckte Kosten zu verschweigen.
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 pb-24">

        {/* TL;DR */}
        <div className="mb-10 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
          <p className="text-sm leading-relaxed text-amber-200">
            <strong>Kurzfassung:</strong> Landing Page ab CHF 149 · Business-Website ab CHF 420 · Premium mit KI ab CHF 950. Versteckte Kosten (Hosting, Plugins, Wartung) können bei WordPress-Sites CHF 3.000–8.000 über 3 Jahre zusätzlich ausmachen.
          </p>
        </div>

        {/* Section 1 */}
        <section className="py-8">
          <h2 className="mb-4 text-2xl font-extrabold text-white">Was eine professionelle Website wirklich kostet</h2>
          <p className="mb-4 text-gray-300 leading-relaxed">
            Im deutschsprachigen Markt gibt es zwei Extrempole: Baukästen wie Wix oder Squarespace ab CHF/€ 15/Monat, und Agenturen, die für ein Standard-Unternehmenswebsite CHF 10.000–30.000 berechnen. Die Wahrheit liegt — und das funktioniert — in der Mitte.
          </p>
          <p className="mb-4 text-gray-300 leading-relaxed">
            Was rechtfertigt welchen Preis? Der größte Kostentreiber ist nicht die Anzahl der Seiten, sondern der Aufwand für Design-Konzeption, Conversion-Architektur, technisches SEO und die Integration mit Ihren Systemen. Eine schlichte 5-seitige Website kann günstiger sein als eine Einzelseite mit komplexen Animationen und CRM-Integration.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Die Schweiz hat typischerweise 20–35% höhere Entwicklungspreise als Deutschland, bedingt durch Lebenshaltungskosten und Tarifsätze. Internationale Agenturen wie KAH Digital bieten Schweizer Qualitätsstandards zu mitteleuropäischen Preisen — mit Festpreisgarantie.
          </p>
        </section>

        {/* Section 2 — 3 Typen */}
        <section className="py-8">
          <h2 className="mb-6 text-2xl font-extrabold text-white">Landing Page, Business-Site oder Web-App: was brauchen Sie?</h2>
          <div className="space-y-4">
            {websiteTypes.map((site) => (
              <div key={site.type} className="rounded-2xl border border-white/8 bg-gray-900 p-6">
                <div className="flex flex-wrap justify-between items-start gap-3 mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-white">{site.type}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{site.forWho}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-black text-amber-400">{site.priceRange}</p>
                    <p className="text-xs text-gray-500">{site.timeline}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-1.5 mb-3">
                  {site.includes.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs text-gray-400">
                      <FiCheck size={11} className="shrink-0 text-emerald-400" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                {site.notFor && (
                  <p className="text-xs text-gray-600 border-t border-white/5 pt-3">
                    <span className="text-red-400">Nicht geeignet für:</span> {site.notFor}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Section 3 — Versteckte Kosten */}
        <section className="py-8">
          <h2 className="mb-4 text-2xl font-extrabold text-white">Versteckte Kosten, die viele vergessen</h2>
          <p className="mb-6 text-gray-300 leading-relaxed">
            Der Entwicklungspreis ist nur ein Teil der Gesamtkosten. Was Unternehmen häufig unterschätzen, sind die laufenden Betriebskosten — insbesondere bei WordPress-basierten Sites:
          </p>
          <div className="rounded-2xl border border-white/8 bg-gray-900 overflow-hidden mb-4">
            <div className="grid grid-cols-3 gap-4 px-5 py-3 bg-gray-800/50 text-xs font-semibold text-gray-400 uppercase tracking-wide">
              <span>Kostenpunkt</span>
              <span className="text-red-400">WordPress</span>
              <span className="text-emerald-400">Next.js</span>
            </div>
            {hiddenCosts.map((row, i) => (
              <div key={row.item} className={`grid grid-cols-3 gap-4 px-5 py-3.5 text-xs ${i % 2 === 0 ? "bg-gray-900" : "bg-gray-900/50"}`}>
                <span className="text-gray-300">{row.item}</span>
                <span className="text-red-300">{row.wpCost}</span>
                <span className="text-emerald-300">{row.nextCost}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500">* Angaben für typische KMU-Setups. Preise variieren nach Anbieter und Projektgröße.</p>
        </section>

        {/* Section 4 — Festpreis vs Stundensatz */}
        <section className="py-8">
          <h2 className="mb-4 text-2xl font-extrabold text-white">Festpreis vs. Stundensatz: was ist besser?</h2>
          <p className="mb-4 text-gray-300 leading-relaxed">
            Die meisten Agenturen berechnen nach Stundensatz (CHF/€ 80–180/h). Das scheint transparent, ist aber für KMU mit begrenzten Budgets riskant: Scope Creep, unvorhergesehene Komplexität und Kommunikations-Overhead können das Budget schnell verdoppeln.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 mb-6">
            <div className="rounded-xl border border-red-500/15 bg-red-500/5 p-5">
              <p className="font-bold text-white mb-3 text-sm">Stundensatz — Risiken für KMU</p>
              <ul className="space-y-2">
                {[
                  "Endpreis unbekannt bei Projektstart",
                  "Jede Änderung erhöht die Rechnung",
                  "Anreiz für Anbieter: mehr Stunden = mehr Umsatz",
                  "Budgetüberschreitung von 30–100% sind häufig",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-gray-400">
                    <span className="text-red-400 mt-0.5">✕</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-emerald-500/15 bg-emerald-500/5 p-5">
              <p className="font-bold text-white mb-3 text-sm">Festpreis — Vorteile</p>
              <ul className="space-y-2">
                {[
                  "Budget steht vor Projektstart fest",
                  "Kein Risiko für Scope Creep",
                  "Anreiz für Anbieter: schnell und gut liefern",
                  "Vergleichbar und verhandelbar",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-gray-400">
                    <FiCheck size={11} className="mt-0.5 shrink-0 text-emerald-400" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-gray-300 leading-relaxed text-sm">
            Festpreise sind nur möglich, wenn der Scope klar definiert ist. Ein seriöser Anbieter investiert Zeit ins Briefing, um einen präzisen Scope zu definieren — und kann dann einen garantierten Preis anbieten. Vage Briefings und Stundensatz-Modelle begünstigen sich gegenseitig.
          </p>
        </section>

        {/* Section 5 — KAH Digital Preise */}
        <section className="py-8">
          <h2 className="mb-6 text-2xl font-extrabold text-white">KAH Digital Preise 2025</h2>
          <p className="mb-6 text-gray-300 leading-relaxed">
            Festpreise, transparente Lieferzeiten, volles Code-Eigentum. Keine versteckten Folgekosten, kein Lock-in.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {kahdPricing.map((plan) => (
              <div
                key={plan.label}
                className={`rounded-2xl border p-6 flex flex-col ${
                  plan.featured
                    ? "border-blue-500/40 bg-blue-500/10"
                    : "border-white/8 bg-gray-900"
                }`}
              >
                {plan.featured && (
                  <span className="mb-3 self-start rounded-full bg-blue-500 px-2.5 py-0.5 text-xs font-bold text-white">Beliebt</span>
                )}
                <p className="text-sm text-gray-400 mb-1">{plan.label}</p>
                <p className="text-3xl font-black text-white mb-0.5">{plan.price}</p>
                <p className="text-xs text-gray-600 mb-1">{plan.priceDE} in Deutschland</p>
                <p className="text-xs text-gray-500 mb-4">{plan.desc} · {plan.timeline}</p>
                <div className="space-y-1.5 mb-4 flex-1">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-xs text-gray-400">
                      <FiCheck size={11} className="shrink-0 text-emerald-400" /> {f}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-600 mt-auto">{plan.cta}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="py-8">
          <h2 className="mb-6 text-2xl font-extrabold text-white">Häufig gestellte Fragen</h2>
          <div className="space-y-4">
            {faqJsonLd.mainEntity.map((f) => (
              <div key={f.name} className="rounded-xl border border-white/8 bg-gray-900/50 p-5">
                <h3 className="mb-2 font-semibold text-white">{f.name}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{f.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 to-blue-600/10 p-8 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Kostenlose Offerte in 24h</h2>
          <p className="mb-6 text-gray-400">Beschreiben Sie kurz Ihr Projekt — wir antworten mit einem konkreten Festpreisangebot innerhalb von 24 Stunden. Kein Anruf nötig, keine Verpflichtung.</p>
          <Link
            href="/de/devis"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-8 py-3.5 font-bold text-white shadow-lg transition hover:shadow-blue-500/30"
          >
            Offerte anfordern <FiArrowRight size={15} />
          </Link>
        </div>
      </article>
    </div>
  );
}
