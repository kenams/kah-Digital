import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { FiArrowRight, FiCheck } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Website für Restaurants: was Sie 2026 wirklich brauchen",
  description: "Online-Speisekarte, Reservation, Google Maps, Bewertungen — was ein Restaurant auf seiner Website braucht. Offerte und Praxisleitfaden.",
  keywords: ["site web restaurant", "site internet restaurant", "Restaurant-Website erstellen", "site web bar", "site web pizzeria", "Online-Reservation Restaurant"],
  alternates: { canonical: "https://kah-digital.ch/de/blog/website-restaurant" },
  openGraph: {
    title: "Website für Restaurants: was Sie 2026 wirklich brauchen",
    description: "Was Ihr Restaurant im Web braucht, um mehr Gäste anzuziehen.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Website für Restaurants: was Sie 2026 wirklich brauchen",
  "datePublished": "2026-05-04",
  "dateModified": "2026-05-04",
  "author": { "@type": "Organization", "name": "KAH Digital Studio" },
  "publisher": { "@type": "Organization", "name": "KAH Digital Studio", "url": "https://kah-digital.ch" },
  "mainEntityOfPage": "https://kah-digital.ch/de/blog/website-restaurant",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Wie wird eine Website für ein Restaurant kalkuliert?", "acceptedAnswer": { "@type": "Answer", "text": "Eine vollständige Restaurant-Website (Speisekarte, Reservation, Fotos, Google Maps) wird nach der Planung kalkuliert, je nach Funktionen." } },
    { "@type": "Question", "name": "Ist eine Website oder ein Google-Business-Eintrag besser?", "acceptedAnswer": { "@type": "Answer", "text": "Beides ergänzt sich. Der Google-Eintrag fängt unmittelbare lokale Suchen ab, die Website konvertiert Besucher und gehört wirklich Ihnen." } },
    { "@type": "Question", "name": "Soll ich eine Online-Reservation einbauen?", "acceptedAnswer": { "@type": "Answer", "text": "Ja, wenn Ihr Restaurant Reservationen entgegennimmt. Ein einfaches System (TheFork, Formitable oder ein Formular) kann Ihre Online-Reservationen verdoppeln." } },
    { "@type": "Question", "name": "Muss meine Website Mobile-first sein?", "acceptedAnswer": { "@type": "Answer", "text": "Unbedingt. Über 70 % der Restaurantsuchen erfolgen mobil, oft genau dann, wenn jemand jetzt etwas zu essen sucht." } },
  ],
};

const MUST_HAVES = [
  { emoji: "🍽️", title: "Aktuelle Speisekarte", detail: "Die Speisekarte ist der Besuchsgrund Nummer 1. Sie muss lesbar und aktuell sein und darf kein auf dem Handy nicht zoombares PDF sein." },
  { emoji: "📍", title: "Adresse + eingebettetes Google Maps", detail: "Nutzer müssen direkt antippen können, um die Route zu erhalten. Auf dem Handy unverzichtbar." },
  { emoji: "📅", title: "Online-Reservation", detail: "Ein einfaches Formular, ein TheFork- oder Formitable-Link. Reduzieren Sie Hürden — jeder verlorene Klick ist ein leerer Tisch." },
  { emoji: "📸", title: "Hochwertige Fotos", detail: "Fotos der Gerichte überzeugen, noch bevor der Gast ankommt. Ein Profifotograf ist nicht nötig — ein gutes Handy bei Tageslicht genügt." },
  { emoji: "⭐", title: "Avis Google visibles", detail: "Binden Sie ein Widget oder einen direkten Link zu Ihren Bewertungen ein. 90 % der Menschen lesen Bewertungen, bevor sie ein Restaurant wählen." },
  { emoji: "📞", title: "Antippbare Telefonnummer", detail: "Ihre Nummer muss auf dem Handy antippbar sein. Eine Selbstverständlichkeit, die zu viele Websites noch verpassen." },
];

export default function DeSiteWebRestaurantPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Script id="ld-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Script id="ld-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="relative overflow-hidden pt-24 pb-12">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="relative mx-auto max-w-3xl px-4">
          <Link href="/de/blog" className="mb-6 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-300">? Blog</Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400">Restaurants</span>
            <span className="text-xs text-gray-600">4. Mai 2026 · 5 Min. Lesezeit</span>
          </div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Website für Restaurants: was Sie 2026 wirklich brauchen
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            Speisekarte nicht auffindbar, Website nicht mobil, keine Online-Reservation — das sind die Fehler, die Gäste vertreiben, noch bevor sie Ihr Restaurant betreten.
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 pb-24">
        <div className="mb-10 rounded-2xl border border-red-500/20 bg-red-500/5 p-5">
          <p className="text-sm leading-relaxed text-red-200">
            <strong>TL;DR :</strong> Lesbare mobile Speisekarte + ansprechende Fotos + Online-Reservation + sichtbare Google-Bewertungen. Diese 4 Elemente machen den Unterschied zwischen einer Website, die Gäste bringt, und einer nutzlosen Visitenkarte.
          </p>
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">Wie sich Gäste 2026 wirklich verhalten</h2>
        <p className="mb-6 text-gray-400 leading-relaxed">
          So läuft es in 80 % der Fälle: Die Person sucht um 12.30 Uhr bei Google nach „Italienisches Restaurant Zürich“. Sie schaut sich 2–3 Ergebnisse an, klickt auf das erste mit schönen Fotos, versucht die Speisekarte zu sehen — und ist diese ein auf dem Handy unlesbares PDF oder nicht zu finden, geht sie zurück und wählt die Konkurrenz.
        </p>
        <p className="mb-10 text-gray-400 leading-relaxed">
          Sie haben nicht 10 Sekunden. Sie haben 3. Ihre Website muss sofort „passt das zu mir und wie reserviere ich?“ beantworten.
        </p>

        <h2 className="mb-8 text-2xl font-bold text-white">Die 6 unverzichtbaren Elemente</h2>
        <div className="mb-12 grid gap-4 sm:grid-cols-2">
          {MUST_HAVES.map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/8 bg-gray-900 p-5">
              <p className="mb-2 text-2xl">{item.emoji}</p>
              <p className="font-semibold text-white">{item.title}</p>
              <p className="mt-1 text-sm text-gray-400">{item.detail}</p>
            </div>
          ))}
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">Website vs. Google-Business-Eintrag — beides</h2>
        <p className="mb-6 text-gray-400 leading-relaxed">
          Viele Gastronomen denken, ihr Google-Eintrag genüge. Das stimmt nicht. Der Google-Eintrag fängt die unmittelbare Absicht ab („Restaurant in der Nähe“), aber Ihre Website ist Ihr Konversionswerkzeug: vollständige Speisekarte, Ambiente, Geschichte, direkte Reservation ohne Kommission.
        </p>
        <p className="mb-10 text-gray-400 leading-relaxed">
          TheFork nimmt auf jedes Gedeck eine Kommission. Ein Reservationsformular auf Ihrer eigenen Website kostet Sie null Kommission.
        </p>

        <h2 className="mb-6 text-2xl font-bold text-white">Wie wird es kalkuliert?</h2>
        <div className="mb-10 grid gap-4 sm:grid-cols-2">
          {[
            { label: "Einfache Präsentationswebsite (4–5 Seiten)", price: "je nach Umfang", delay: "1–2 Wochen" },
            { label: "Mit Online-Reservation", price: "je nach Umfang", delay: "2–3 Wochen" },
            { label: "Mit Online-Bestellung", price: "je nach Umfang", delay: "3–4 Wochen" },
            { label: "Wartung + Aktualisierung der Speisekarte", price: "je nach Umfang", delay: "Support inklusive" },
          ].map((t) => (
            <div key={t.label} className="rounded-2xl border border-white/8 bg-gray-900 p-5">
              <p className="text-sm text-gray-500">{t.label}</p>
              <p className="mt-1 text-xl font-black text-white">{t.price}</p>
              <p className="text-xs text-gray-600">{t.delay}</p>
            </div>
          ))}
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">Häufige Fragen</h2>
        <div className="mb-12 space-y-4">
          {faqJsonLd.mainEntity.map((f) => (
            <div key={f.name} className="rounded-xl border border-white/8 bg-gray-900/50 p-5">
              <h3 className="mb-2 font-semibold text-white">{f.name}</h3>
              <p className="text-sm text-gray-400">{f.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-500/10 to-orange-600/10 p-8 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Eine Website, die Gäste in Ihr Restaurant bringt</h2>
          <p className="mb-6 text-gray-400">Antwort in 24h · Individuelle Offerte · Unverbindlich</p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/de/devis" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-500 to-orange-500 px-8 py-3.5 font-bold text-white shadow-lg transition hover:shadow-red-500/30">
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



