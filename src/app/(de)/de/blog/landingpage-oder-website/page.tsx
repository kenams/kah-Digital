import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { FiArrowRight, FiCheck, FiX } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Landing page vs site vitrine : lequel choisir ? — KAH Digital Studio",
  description: "Landingpage oder Visitenkarten-Website: was ist der Unterschied, was kostet was und für welches Ziel? Ein Leitfaden zur Wahl der passenden Option für Ihre Situation.",
  keywords: ["landing page vs site vitrine", "Unterschied Landingpage Visitenkarten-Website", "quand choisir landing page", "Landingpage oder Website"],
  alternates: { canonical: "https://kah-digital.ch/de/blog/landingpage-oder-website" },
  openGraph: {
    title: "Landing page vs site vitrine : lequel choisir ?",
    description: "Die wirklichen Unterschiede, die Einsatzfälle und wie Sie je nach Ziel entscheiden.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Landing page vs site vitrine : lequel choisir ?",
  "datePublished": "2026-05-04",
  "dateModified": "2026-05-04",
  "author": { "@type": "Organization", "name": "KAH Digital Studio" },
  "publisher": { "@type": "Organization", "name": "KAH Digital Studio", "url": "https://kah-digital.ch" },
  "mainEntityOfPage": "https://kah-digital.ch/de/blog/landingpage-oder-website",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Was ist eine Landingpage?", "acceptedAnswer": { "@type": "Answer", "text": "Eine Landingpage ist eine einzelne Seite für ein bestimmtes Ziel: Leads gewinnen, ein Produkt verkaufen, eine Veranstaltung bewerben. Sie hat kein Navigationsmenü, damit der Besucher auf die Handlung fokussiert bleibt." } },
    { "@type": "Question", "name": "Wann wählen Sie eine Visitenkarten-Website statt einer Landingpage?", "acceptedAnswer": { "@type": "Answer", "text": "Wählen Sie eine Visitenkarten-Website, wenn Sie mehrere Leistungen haben, bei Google für mehrere Suchbegriffe gefunden werden möchten oder Ihr Unternehmen als Ganzes vorstellen müssen." } },
    { "@type": "Question", "name": "Wie verhalten sich die Kosten von Landingpage und Visitenkarten-Website?", "acceptedAnswer": { "@type": "Answer", "text": "Eine Landingpage wird nach der Planung kalkuliert und kann in 5 Tagen geliefert werden. Eine Visitenkarten-Website wird nach der Planung für 5–8 Seiten kalkuliert und 5 Werktage nach Erhalt Ihrer Inhalte geliefert." } },
    { "@type": "Question", "name": "Kann man beides haben?", "acceptedAnswer": { "@type": "Answer", "text": "Ja, das wird sogar empfohlen. Die Visitenkarten-Website sichert Ihre allgemeine Präsenz und Ihr SEO, während spezielle Landingpages die Konversionen für bestimmte Kampagnen maximieren." } },
  ],
};

type CompareItem = { topic: string; landing: string; vitrine: string; landingOk?: boolean; vitrineOk?: boolean };

const COMPARE: CompareItem[] = [
  { topic: "Objectif", landing: "Eine einzige Handlung (z. B. Formular ausfüllen, kaufen)", vitrine: "Das Unternehmen als Ganzes vorstellen", landingOk: false, vitrineOk: false },
  { topic: "Anzahl Seiten", landing: "1 page", vitrine: "5 bis 15 Seiten", landingOk: false, vitrineOk: false },
  { topic: "SEO long-terme", landing: "Begrenzt (nur eine Seite)", vitrine: "Stark — mehrere Seiten, mehrere Suchbegriffe", landingOk: false, vitrineOk: true },
  { topic: "Conversion (pub payante)", landing: "Ausgezeichnet — keine Ablenkung", vitrine: "Mittel — zu viele Optionen senken die Klickrate", landingOk: true, vitrineOk: false },
  { topic: "Zeit bis zum Online-Gang", landing: "3-7 jours", vitrine: "2-3 semaines", landingOk: true, vitrineOk: false },
  { topic: "Kosten", landing: "je nach Umfang", vitrine: "je nach Umfang", landingOk: true, vitrineOk: false },
  { topic: "Glaubwürdigkeit / Vertrauen", landing: "Faible si seul", vitrine: "Stark — „Über uns“, Referenzen, Blog", landingOk: false, vitrineOk: true },
];

const LANDING_CASES = [
  "Sie lancieren ein bestimmtes Produkt oder eine Leistung und wollen das Marktinteresse testen",
  "Sie schalten bezahlte Werbung (Google Ads, Meta) und wollen die Konversionen maximieren",
  "Sie organisieren eine Veranstaltung, ein Webinar, eine Weiterbildung",
  "Sie sind Freelancer und wollen schnell Präsenz zeigen, bevor Sie eine richtige Website bauen",
];

const VITRINE_CASES = [
  "Sie haben mehrere Leistungen vorzustellen",
  "Sie wollen bei Google von lokalen Kunden oder über die organische Suche gefunden werden",
  "Ihre Branche verlangt Glaubwürdigkeit (Handwerker, Berater, Praxis, Agentur)",
  "Sie wollen eine dauerhafte, eigenständige Präsenz auf lange Sicht",
];

export default function DeLandingPageVsSiteVitrinePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Script id="ld-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Script id="ld-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="relative overflow-hidden pt-24 pb-12">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="relative mx-auto max-w-3xl px-4">
          <Link href="/de/blog" className="mb-6 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-300">? Blog</Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">Web-Strategie</span>
            <span className="text-xs text-gray-600">4. Mai 2026 · 5 Min. Lesezeit</span>
          </div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Landing page vs site vitrine : lequel choisir ?
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            Es sind nicht dieselben Werkzeuge und sie dienen nicht denselben Zielen. So entscheiden Sie je nach Situation schnell.
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 pb-24">
        <div className="mb-10 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
          <p className="text-sm leading-relaxed text-emerald-200">
            <strong>TL;DR :</strong> Landingpage = eine genaue Handlung, enges Budget, schneller Start. Visitenkarten-Website = vollständige Präsenz, dauerhaftes SEO, Glaubwürdigkeit. Idealerweise: beides.
          </p>
        </div>

        <h2 className="mb-8 text-2xl font-bold text-white">Comparatif rapide</h2>
        <div className="mb-12 overflow-hidden rounded-2xl border border-white/8">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8 bg-white/5">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-gray-500">Kriterium</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-blue-400">Landing page</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-emerald-400">Site vitrine</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE.map((row, i) => (
                <tr key={row.topic} className={`border-b border-white/5 ${i % 2 === 0 ? "bg-transparent" : "bg-white/2"}`}>
                  <td className="px-4 py-3 font-medium text-gray-300">{row.topic}</td>
                  <td className="px-4 py-3 text-gray-400">{row.landing}</td>
                  <td className="px-4 py-3 text-gray-400">{row.vitrine}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">Wählen Sie eine Landingpage, wenn …</h2>
        <div className="mb-10 space-y-3">
          {LANDING_CASES.map((item) => (
            <div key={item} className="flex items-start gap-3 rounded-xl border border-blue-500/15 bg-blue-500/5 p-4">
              <FiCheck size={16} className="mt-0.5 shrink-0 text-blue-400" />
              <span className="text-sm text-gray-300">{item}</span>
            </div>
          ))}
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">Wählen Sie eine Visitenkarten-Website, wenn …</h2>
        <div className="mb-10 space-y-3">
          {VITRINE_CASES.map((item) => (
            <div key={item} className="flex items-start gap-3 rounded-xl border border-emerald-500/15 bg-emerald-500/5 p-4">
              <FiCheck size={16} className="mt-0.5 shrink-0 text-emerald-400" />
              <span className="text-sm text-gray-300">{item}</span>
            </div>
          ))}
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">Die beste Strategie: beides</h2>
        <p className="mb-10 text-gray-400 leading-relaxed">
          Die Visitenkarten-Website baut Ihre Präsenz und Ihr organisches Ranking auf. Landingpages maximieren Ihre Konversionen bei Marketingkampagnen. Es sind keine Alternativen, sondern ergänzende Werkzeuge. Beginnen Sie mit der Visitenkarten-Website, um Ihre Glaubwürdigkeit zu festigen, und ergänzen Sie Landingpages, wenn Sie Kampagnen fahren.
        </p>

        <h2 className="mb-6 text-2xl font-bold text-white">Häufige Fragen</h2>
        <div className="mb-12 space-y-4">
          {faqJsonLd.mainEntity.map((f) => (
            <div key={f.name} className="rounded-xl border border-white/8 bg-gray-900/50 p-5">
              <h3 className="mb-2 font-semibold text-white">{f.name}</h3>
              <p className="text-sm text-gray-400">{f.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-blue-600/10 p-8 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Landingpage oder Visitenkarten-Website — wir beraten Sie kostenlos</h2>
          <p className="mb-6 text-gray-400">Antwort in 24h · Individuelle Offerte · Unverbindlich</p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/devis" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-blue-600 px-8 py-3.5 font-bold text-white shadow-lg transition hover:shadow-emerald-500/30">
              Offerte anfordern <FiArrowRight size={15} />
            </Link>
            <Link href="/audit-gratuit" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 font-semibold text-white transition hover:border-white/40">
              Kostenloses Audit meiner Website
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}


