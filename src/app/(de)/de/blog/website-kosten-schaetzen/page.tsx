import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { FiArrowRight, FiCheck } from "react-icons/fi";

export const metadata: Metadata = {
  title: "So schätzen Sie die Kosten einer professionellen Website 2026",
  description: "Eine klare Methode, eine professionelle Website zu planen: tatsächlicher Bedarf, Umfang, Funktionen, Zeitplan, Begleitung und individuelle Offerte.",
  keywords: ["devis site web", "devis site web professionnel", "Website-Kosten schätzen", "Kostenschätzung Website 2026"],
  alternates: { canonical: "https://kah-digital.ch/de/blog/website-kosten-schaetzen" },
  openGraph: {
    images: [{ url: "/og-kah-digital.png", width: 1200, height: 630 }],
    title: "So schätzen Sie die Kosten einer professionellen Website 2026",
    description: "Die Kriterien, die zu einer klaren, passenden Offerte führen.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "So schätzen Sie die Kosten einer professionellen Website 2026",
  "datePublished": "2026-04-24",
  "dateModified": "2026-04-24",
  "author": { "@type": "Organization", "name": "KAH Digital Studio" },
  "publisher": { "@type": "Organization", "name": "KAH Digital Studio", "url": "https://kah-digital.ch" },
  "mainEntityOfPage": "https://kah-digital.ch/de/blog/website-kosten-schaetzen",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Wie wird eine Landingpage kalkuliert?", "acceptedAnswer": { "@type": "Answer", "text": "Eine einfache Landingpage wird nach der Planung kalkuliert, je nach Designkomplexität und nötigen Integrationen." } },
    { "@type": "Question", "name": "Wie sieht eine Offerte für eine Visitenkarten-Website aus?", "acceptedAnswer": { "@type": "Answer", "text": "Eine professionelle Visitenkarten-Website wird nach der Planung kalkuliert und 5 Werktage nach Erhalt Ihrer Inhalte geliefert." } },
    { "@type": "Question", "name": "Wie wird eine Corporate-Website kalkuliert?", "acceptedAnswer": { "@type": "Answer", "text": "Eine vollständige Corporate-Website (5–15 Seiten, CMS, mehrsprachig) wird nach der Planung kalkuliert." } },
    { "@type": "Question", "name": "Welcher Umfang für eine Webanwendung?", "acceptedAnswer": { "@type": "Answer", "text": "Eine individuelle Webanwendung wird nach der Planung kalkuliert, je nach Komplexität der Funktionen." } },
  ],
};

const TIERS = [
  { label: "Landing / Portfolio", price: "individuelle Offerte", delay: "5 Tage", desc: "Eine klare, professionelle Seite. Ideal für Freelancer, Coaches, Produktlancierungen oder um eine Idee zu testen.", included: ["Individuelles Design", "Responsive mobile", "Kontaktformular", "Basis-SEO", "Bereitstellung inklusive"] },
  { label: "Präsentationswebsite", price: "individuelle Offerte", delay: "5 Werktage", desc: "Eine vollständige Präsenz für ein KMU oder Selbstständige. Seiten: Startseite, Leistungen, Über uns, Kontakt.", included: ["5 bis 8 Seiten", "Optimiertes SEO", "Google Maps", "Formulaire pro", "Analytics"] },
  { label: "Unternehmenswebsite", price: "individuelle Offerte", delay: "3–5 Wochen", desc: "Eine vollständige Website für etablierte Unternehmen: mehrsprachig, CMS, mehrere Seiten, Premium-Design.", included: ["10–20 pages", "CMS admin", "Mehrsprachigkeit", "Integrierter Blog", "Optimierte Performance"] },
  { label: "Web-App / KI", price: "individuelle Offerte", delay: "4–10 Wochen", desc: "Dashboard, SaaS, Fachanwendung, KI-Integration. Individuelle Full-Stack-Entwicklung.", included: ["Auth utilisateurs", "Datenbank", "API REST / webhooks", "KI-Integration", "Tests & Bereitstellung"] },
];

export default function DeDevisSiteWebPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Script id="ld-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Script id="ld-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-12">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="relative mx-auto max-w-3xl px-4">
          <Link href="/de/blog" className="mb-6 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-300">? Blog</Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">Offerte</span>
            <span className="text-xs text-gray-600">24. April 2026 · 6 Min. Lesezeit</span>
          </div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            So schätzen Sie die Kosten einer professionellen Website 2026
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            Jedes Projekt ist anders. Eine gute Offerte beginnt nicht bei einem öffentlichen Betrag, sondern bei einem klaren Umfang: Ziel, Seiten, Funktionen, Ausbaustufe, Zeitplan und Begleitung.
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 pb-24">

        {/* Intro */}
        <div className="mb-10 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
          <p className="text-sm leading-relaxed text-amber-200">
            <strong>TL;DR :</strong> Landingpage, Visitenkarten-Website, Corporate-Website oder Anwendung: Die Offerte hängt vom sinnvollen Umfang, Ihren Geschäftsprioritäten und Ihrem verfügbaren Budget ab, nicht von einer starren Formel.
          </p>
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">Warum unterscheiden sich Offerten so stark?</h2>
        <p className="mb-6 text-gray-400 leading-relaxed">
          Im Internet finden sich sehr unterschiedliche Versprechen für ein scheinbar gleiches Ergebnis. In der Praxis können zwei Websites mit gleich vielen Seiten je nach Inhalt, Integrationen, Design, SEO und Freigaben sehr unterschiedlichen Aufwand erfordern.
        </p>
        <p className="mb-10 text-gray-400 leading-relaxed">
          Eine Wix- oder Squarespace-Seite kann genügen, um eine Idee zu testen. Sobald Sie aber ein eigenständiges Design, ordentliche Performance oder ein individuelles CMS brauchen, führt kein Weg an Individualentwicklung vorbei.
        </p>

        <h2 className="mb-8 text-2xl font-bold text-white">Formate nach Projektart</h2>
        <div className="mb-12 grid gap-6 sm:grid-cols-2">
          {TIERS.map((t) => (
            <div key={t.label} className="rounded-2xl border border-white/8 bg-gray-900 p-6">
              <div className="mb-1 text-sm text-gray-500">{t.label}</div>
              <div className="mb-1 text-2xl font-black text-white">{t.price}</div>
              <div className="mb-3 text-xs text-gray-600">{t.delay}</div>
              <p className="mb-4 text-sm text-gray-400 leading-relaxed">{t.desc}</p>
              <div className="space-y-1.5">
                {t.included.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs text-gray-400">
                    <FiCheck size={12} className="shrink-0 text-emerald-400" /> {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">Was den Umfang erweitert</h2>
        <p className="mb-4 text-gray-400 leading-relaxed">
          Mehrere Elemente können mehr Planung, Konzeption oder Entwicklung erfordern:
        </p>
        <ul className="mb-10 space-y-3 text-gray-400 text-sm leading-relaxed">
          {[
            { title: "E-commerce", detail: "Produktkatalog, Zahlung, Bestellverwaltung und Kundenbetreuung erfordern einen strukturierteren Umfang." },
            { title: "Mehrsprachigkeit", detail: "Das Übersetzen und Anpassen der Inhalte (3 Sprachen) bedeutet 20 bis 35 % Mehraufwand." },
            { title: "Drittanbieter-Integrationen", detail: "CRM, Buchungskalender, ERP oder individuelle APIs müssen vor der Schätzung analysiert werden." },
            { title: "Animationen und Mikrointeraktionen", detail: "Ein stark animiertes Design kann den Frontend-Aufwand verdoppeln." },
            { title: "Fortgeschrittenes technisches SEO", detail: "Audit, strukturierte Daten und Core Web Vitals erfordern von der Architektur an ernsthafte Arbeit." },
          ].map((item) => (
            <li key={item.title} className="flex items-start gap-3">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
              <span><strong className="text-white">{item.title}</strong> — {item.detail}</span>
            </li>
          ))}
        </ul>

        <h2 className="mb-6 text-2xl font-bold text-white">Was die Schätzung vereinfacht</h2>
        <ul className="mb-10 space-y-3 text-gray-400 text-sm leading-relaxed">
          {[
            "Fertige Texte bereithalten — das Schreiben macht 15 bis 25 % der Gesamtzeit aus.",
            "Fotos und Visuals liefern — vermeidet Bildagentur-Kosten.",
            "Ein klares Briefing von Anfang an — weniger Rückfragen und weniger Planungszeit.",
            "Einfacher Umfang — eine schlichte Visitenkarten-Website ist schneller geplant als eine mit komplexen Animationen.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <FiCheck size={14} className="mt-0.5 shrink-0 text-emerald-400" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <h2 className="mb-6 text-2xl font-bold text-white">Häufige Fragen</h2>
        <div className="mb-12 space-y-4">
          {faqJsonLd.mainEntity.map((f) => (
            <div key={f.name} className="rounded-xl border border-white/8 bg-gray-900/50 p-5">
              <h3 className="mb-2 font-semibold text-white">{f.name}</h3>
              <p className="text-sm text-gray-400">{f.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-blue-600/10 p-8 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Erhalten Sie eine Offerte für Ihr Projekt</h2>
          <p className="mb-6 text-gray-400">Antwort in 24h · Individuelle Offerte · Unverbindlich</p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/de/devis" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-8 py-3.5 font-bold text-white shadow-lg transition hover:shadow-blue-500/30">
              Offerte anfordern <FiArrowRight size={15} />
            </Link>
            <Link href="/de/audit-gratuit" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 font-semibold text-white transition hover:border-white/40">
              Kostenloses Audit meiner Website
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}



