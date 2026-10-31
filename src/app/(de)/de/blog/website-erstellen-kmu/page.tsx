import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { FiArrowRight, FiCheck, FiX } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Website für ein KMU erstellen: der komplette Leitfaden 2026",
  description: "Alles, was ein KMU vor der Bestellung einer Website wissen sollte: vom Briefing bis zum Launch, Fehler, die Sie vermeiden, und wie Sie den Anbieter wählen.",
  keywords: ["KMU-Website erstellen", "site web entreprise", "professionelle Website für KMU erstellen", "agence web PME", "site internet entreprise 2026"],
  alternates: { canonical: "https://kah-digital.ch/de/blog/website-erstellen-kmu" },
  openGraph: {
    images: [{ url: "/og-kah-digital.png", width: 1200, height: 630 }],
    title: "Website für ein KMU erstellen: der komplette Leitfaden 2026",
    description: "Vom Briefing bis zum Launch: alles, was ein KMU vor der Bestellung einer Website wissen sollte.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Website für ein KMU erstellen: der komplette Leitfaden 2026",
  "datePublished": "2026-04-24",
  "dateModified": "2026-04-24",
  "author": { "@type": "Organization", "name": "KAH Digital Studio" },
  "publisher": { "@type": "Organization", "name": "KAH Digital Studio", "url": "https://kah-digital.ch" },
};

export default function DeCreationSiteWebPMEPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Script id="ld-pme" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative overflow-hidden pt-24 pb-12">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="relative mx-auto max-w-3xl px-4">
          <Link href="/de/blog" className="mb-6 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-300">? Blog</Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">Leitfaden</span>
            <span className="text-xs text-gray-600">24. April 2026 · 7 Min. Lesezeit</span>
          </div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Website für ein KMU erstellen: der komplette Leitfaden 2026
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            Eine Website für Ihr KMU bestellen, ohne über den Tisch gezogen zu werden — hier der ehrliche Leitfaden, vom Briefing bis zum Launch.
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 pb-24">

        <h2 className="mb-6 text-2xl font-bold text-white">Schritt 1 — Definieren, was Sie wirklich brauchen</h2>
        <p className="mb-6 text-gray-400 leading-relaxed">
          Die meisten KMU bestellen eine zu grosse Website. Beginnen Sie mit diesen 3 Fragen:
        </p>
        <ul className="mb-10 space-y-3 text-gray-400 text-sm leading-relaxed">
          {[
            "Was ist das Hauptziel? (Kontakte generieren, online verkaufen, Ihre Tätigkeit vorstellen, rekrutieren ...)",
            "Wer sind Ihre Zielbesucher? (B2B-Fachleute, Privatpersonen, Lokale, Internationale ...)",
            "Was soll ein Besucher auf Ihrer Website tun? (Sie anrufen, ein Formular ausfüllen, kaufen, einen Termin buchen ...)",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <FiCheck size={14} className="mt-0.5 shrink-0 text-blue-400" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <h2 className="mb-6 text-2xl font-bold text-white">Schritt 2 — Den richtigen Website-Typ wählen</h2>
        <div className="mb-10 grid gap-4 sm:grid-cols-2">
          {[
            { type: "Landing page", ideal: "Ein Angebot testen, ein Produkt lancieren, Freelancer", price: "individuelle Offerte" },
            { type: "Präsentationswebsite", ideal: "Lokale KMU, freie Berufe, Handwerker", price: "individuelle Offerte" },
            { type: "Unternehmenswebsite", ideal: "Etablierte Unternehmen, mehrsprachig, CMS", price: "individuelle Offerte" },
            { type: "E-commerce", ideal: "Online-Verkauf, Shop, Abos", price: "individuelle Offerte" },
          ].map((item) => (
            <div key={item.type} className="rounded-xl border border-white/8 bg-gray-900 p-5">
              <div className="mb-1 font-bold text-white text-sm">{item.type}</div>
              <div className="text-xs text-gray-500 mb-2">{item.ideal}</div>
              <div className="text-lg font-black text-blue-400">{item.price}</div>
            </div>
          ))}
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">Schritt 3 — Ein wirksames Briefing schreiben</h2>
        <p className="mb-4 text-gray-400 leading-relaxed">
          Ein gutes Briefing spart Ihnen 30 % des Budgets. Es enthält mindestens:
        </p>
        <div className="mb-10 rounded-2xl border border-white/8 bg-gray-900 p-6">
          <div className="grid gap-2 sm:grid-cols-2 text-sm">
            {[
              "Name und Tätigkeit des Unternehmens",
              "Hauptziel der Website",
              "Zielpersonas (wer besucht?)",
              "Geschätzte Seitenzahl",
              "Besondere Funktionen",
              "Bestehende visuelle Identität",
              "Referenz-Websites (gewünschter Stil)",
              "Maximales Budget",
              "Gewünschtes Online-Datum",
              "Wer verwaltet danach den Inhalt?",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-gray-400">
                <FiCheck size={12} className="shrink-0 text-emerald-400" /> {item}
              </div>
            ))}
          </div>
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">Schritt 4 — Den Anbieter wählen</h2>
        <p className="mb-6 text-gray-400 leading-relaxed">
          Es gibt 4 Arten von Web-Anbietern. So sieht die Realität aus:
        </p>
        <div className="mb-10 space-y-4">
          {[
            { type: "Freelance junior (Malt, Fiverr)", pro: "Flexibilität und schneller Start", con: "Hohes Risiko bei Qualität und Terminen, keine Unterstützung nach der Lieferung" },
            { type: "Grosse Webagentur", pro: "Strukturierter Prozess, komplettes Team", con: "Teils überdimensionierte Angebote, wechselnde Ansprechperson" },
            { type: "Unabhängiges Digitalstudio", pro: "Gleichgewicht von Qualität und Planung, direkter Ansprechpartner, reaktiv", con: "Begrenzte Parallelkapazität (auf Termine achten)" },
            { type: "Constructeur DIY (Wix, Squarespace)", pro: "Sehr schnell startklar", con: "Generisches Design, mittelmässige Performance, wenig erweiterbar, begrenztes SEO" },
          ].map((item) => (
            <div key={item.type} className="rounded-xl border border-white/8 bg-gray-900/50 p-5">
              <div className="mb-3 font-semibold text-white">{item.type}</div>
              <div className="grid gap-2 sm:grid-cols-2 text-sm">
                <div className="flex items-start gap-2 text-gray-400"><FiCheck size={13} className="mt-0.5 shrink-0 text-emerald-400" />{item.pro}</div>
                <div className="flex items-start gap-2 text-gray-400"><FiX size={13} className="mt-0.5 shrink-0 text-red-400" />{item.con}</div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">Die 5 häufigsten Fehler</h2>
        <ul className="mb-12 space-y-4 text-sm text-gray-400 leading-relaxed">
          {[
            { err: "Ohne klares Briefing starten", detail: "Ohne Briefing baut der Anbieter nach eigenen Annahmen. Rückfragen häufen sich und der Umfang wird unscharf." },
            { err: "SEO auf später verschieben", detail: "SEO entsteht schon in der Architektur der Website. Es nachträglich hinzuzufügen erzwingt oft einen teilweisen Relaunch." },
            { err: "Wählen, ohne den Umfang zu prüfen", detail: "Ein zu vages Angebot kann eine einfache Vorlage mit Ihrem Logo verbergen. Prüfen Sie immer, was tatsächlich geliefert wird." },
            { err: "Mobile ignorieren", detail: "Über 60 % der Besuche kommen von Mobilgeräten. Eine nicht angepasste Website verliert mehr als die Hälfte ihres Publikums." },
            { err: "Wartung nicht einplanen", detail: "Eine Website braucht regelmässige Aktualisierungen: Sicherheit, Kompatibilität, Inhalte und Performance-Überwachung." },
          ].map((item) => (
            <li key={item.err} className="flex items-start gap-3">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
              <span><strong className="text-white">{item.err}</strong> — {item.detail}</span>
            </li>
          ))}
        </ul>

        <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-blue-600/10 p-8 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Bereit, Ihre Website zu lancieren?</h2>
          <p className="mb-6 text-gray-400">KAH Digital Studio begleitet KMU in der Schweiz und in Frankreich. Individuelle Offerte in 24h.</p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/de/devis" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-8 py-3.5 font-bold text-white shadow-lg transition">
              Offerte anfordern <FiArrowRight size={15} />
            </Link>
            <Link href="/de/offres" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 font-semibold text-white transition hover:border-white/40">
              Unsere Angebote ansehen
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}



