import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { FiArrowRight, FiCheck } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Website für Handwerker: der komplette Leitfaden 2026",
  description: "Wie erstellt man eine wirksame Website für Handwerker? Offerte, Zeitplan, was unbedingt dazugehört. Praxisleitfaden für Sanitär, Elektro, Schreiner und Maurer.",
  keywords: ["site web artisan", "Website für Handwerker erstellen", "site internet artisan", "site web plombier", "site web electricien", "site web menuisier"],
  alternates: { canonical: "https://kah-digital.ch/de/blog/website-handwerker" },
  openGraph: {
    title: "Website für Handwerker: der komplette Leitfaden 2026",
    description: "Offerte, Zeitplan, wesentliche Inhalte. Alles, was Handwerker vor dem Erstellen ihrer Website wissen sollten.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Website für Handwerker: der komplette Leitfaden 2026",
  "datePublished": "2026-05-04",
  "dateModified": "2026-05-04",
  "author": { "@type": "Organization", "name": "KAH Digital Studio" },
  "publisher": { "@type": "Organization", "name": "KAH Digital Studio", "url": "https://kah-digital.ch" },
  "mainEntityOfPage": "https://kah-digital.ch/de/blog/website-handwerker",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Wie wird eine Website für Handwerker kalkuliert?", "acceptedAnswer": { "@type": "Answer", "text": "Eine professionelle Visitenkarten-Website für Handwerker wird nach der Planung kalkuliert, je nach Seiten, Fotos und Funktionen (Formular, Google Maps, Bewertungen)." } },
    { "@type": "Question", "name": "Braucht ein Handwerker wirklich eine Website?", "acceptedAnswer": { "@type": "Answer", "text": "Ja. 80 % der Kunden suchen bei Google, bevor sie einen Handwerker wählen. Ohne Website existieren Sie für sie nicht. Eine einfache, gut auffindbare Website kann mehrere qualifizierte Kontakte pro Woche bringen." } },
    { "@type": "Question", "name": "Welche Inhalte gehören auf die Website eines Handwerkers?", "acceptedAnswer": { "@type": "Answer", "text": "Das Wesentliche: Ihre Leistungen und Ihr Einsatzgebiet, Fotos Ihrer Arbeiten, sichtbare Kontaktdaten, ein Formular oder WhatsApp-Button und wenn möglich Kundenbewertungen." } },
    { "@type": "Question", "name": "Wie schnell kann die Website eines Handwerkers online sein?", "acceptedAnswer": { "@type": "Answer", "text": "Mit einem klaren Briefing und bereitliegenden Fotos kann eine Visitenkarten-Website für Handwerker in 5 Werktagen online sein." } },
  ],
};

const CHECKLIST = [
  { title: "Page d'accueil claire", detail: "Ihr Handwerk, Ihr Gebiet, Ihre Kontaktdaten — in 5 Sekunden versteht der Besucher, was Sie tun." },
  { title: "Liste Ihrer Leistungen", detail: "Beschreiben Sie jede Leistung. Das liest Google, um Sie für die richtigen Suchanfragen zu platzieren." },
  { title: "Fotos Ihrer Arbeiten", detail: "Vorher/Nachher, abgeschlossene Baustellen — Kunden kaufen mit den Augen. Auch gut eingestellte Handyfotos genügen." },
  { title: "Zone d'intervention", detail: "Nennen Sie ausdrücklich die Städte und Kantone, die Sie abdecken. Wesentlich für lokales SEO." },
  { title: "Kontaktformular oder WhatsApp", detail: "Reduzieren Sie Hürden. Ein Button „Jetzt anrufen“ oder ein kurzes Formular genügt." },
  { title: "Avis clients (Google)", detail: "Binden Sie Ihre Google-Bewertungen ein oder bitten Sie Kunden um eine Bewertung. Das vervielfacht das Vertrauen." },
];

export default function DeSiteWebArtisanPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Script id="ld-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Script id="ld-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="relative overflow-hidden pt-24 pb-12">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="relative mx-auto max-w-3xl px-4">
          <Link href="/de/blog" className="mb-6 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-300">? Blog</Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-400">Artisans</span>
            <span className="text-xs text-gray-600">4. Mai 2026 · 5 Min. Lesezeit</span>
          </div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Website für Handwerker: der komplette Leitfaden 2026
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            Sanitär, Elektro, Schreiner, Maurer — eine einfache, gut gemachte Website kann Ihnen jede Woche Kunden bringen, ohne Werbung zu bezahlen. Hier steht genau, was zu tun ist und wie es kalkuliert wird.
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 pb-24">
        <div className="mb-10 rounded-2xl border border-orange-500/20 bg-orange-500/5 p-5">
          <p className="text-sm leading-relaxed text-orange-200">
            <strong>TL;DR :</strong> Visitenkarten-Website für Handwerker nach Umfang · Online in 5 Werktagen · Wesentlich: Fotos Ihrer Arbeiten + Einsatzgebiet + Kontaktformular.
          </p>
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">Warum eine Website für Handwerker unverzichtbar ist</h2>
        <p className="mb-6 text-gray-400 leading-relaxed">
          Mundpropaganda ist gut. Sie genügt aber nicht mehr. Wenn jemand bei Google nach „Sanitär Bern“ oder „Elektriker Notfall Zürich“ sucht, wählt er unter den ersten 3 Ergebnissen. Sind Sie nicht dabei, geht dieser Kunde zur Konkurrenz.
        </p>
        <p className="mb-10 text-gray-400 leading-relaxed">
          Eine professionelle Website ist Ihr Schaufenster, rund um die Uhr geöffnet. Auch wenn Sie auf der Baustelle sind, besuchen potenzielle Kunden Ihre Website, sehen sich Ihre Arbeiten an und nehmen Kontakt auf.
        </p>

        <h2 className="mb-8 text-2xl font-bold text-white">Was Ihre Website enthalten muss (Checkliste)</h2>
        <div className="mb-12 space-y-4">
          {CHECKLIST.map((item) => (
            <div key={item.title} className="flex items-start gap-4 rounded-xl border border-white/8 bg-gray-900/50 p-4">
              <FiCheck size={16} className="mt-0.5 shrink-0 text-emerald-400" />
              <div>
                <p className="font-semibold text-white">{item.title}</p>
                <p className="mt-1 text-sm text-gray-400">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">Wie wird sie kalkuliert?</h2>
        <p className="mb-6 text-gray-400 leading-relaxed">
          Eine professionelle Visitenkarten-Website für Handwerker wird nach Klärung von Bedarf, Seiten, Fotos und sinnvollen Funktionen kalkuliert. Seien Sie bei einem zu tiefen Angebot vorsichtig: Das Ergebnis kann eine generische Vorlage sein, die Sie nicht repräsentiert und schlecht gefunden wird.
        </p>
        <div className="mb-10 grid gap-4 sm:grid-cols-2">
          {[
            { label: "Site basique (3-4 pages)", price: "je nach Umfang", delay: "1 semaine" },
            { label: "Site complet (6-8 pages)", price: "je nach Umfang", delay: "2 semaines" },
            { label: "Mit Galerie Ihrer Arbeiten", price: "je nach Umfang", delay: "+2-3 jours" },
            { label: "Maintenance annuelle", price: "je nach Umfang", delay: "Support inclus" },
          ].map((t) => (
            <div key={t.label} className="rounded-2xl border border-white/8 bg-gray-900 p-5">
              <p className="text-sm text-gray-500">{t.label}</p>
              <p className="mt-1 text-xl font-black text-white">{t.price}</p>
              <p className="text-xs text-gray-600">{t.delay}</p>
            </div>
          ))}
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">Fehler, die Sie vermeiden sollten</h2>
        <ul className="mb-10 space-y-3 text-sm text-gray-400 leading-relaxed">
          {[
            "Die Website selbst bei Wix ohne SEO bauen — Sie bleiben bei Google unsichtbar.",
            "Keine Fotos Ihrer Arbeiten zeigen — sie sind Ihr bestes Verkaufsargument.",
            "Das Einsatzgebiet nicht angeben — ein Kunde 50 km entfernt ruft nicht an, wenn Sie es nicht erwähnen.",
            "Eine Telefonnummer, die auf dem Handy nicht antippbar ist — direkter Verlust von Kontakten.",
            "Zufriedene Kunden nicht um eine Google-Bewertung bitten — das ist gratis und sehr wirksam.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
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

        <div className="rounded-2xl border border-orange-500/20 bg-gradient-to-br from-orange-500/10 to-amber-600/10 p-8 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Eine professionelle Website für Ihr Geschäft</h2>
          <p className="mb-6 text-gray-400">Antwort in 24h · Individuelle Offerte · Unverbindlich</p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/devis" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-3.5 font-bold text-white shadow-lg transition hover:shadow-orange-500/30">
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



