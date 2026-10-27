import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { FiArrowRight, FiCheck, FiExternalLink, FiMessageCircle } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Referenzen — Gelieferte Projekte, online | KAH Digital Studio",
  description:
    "Echte, von KAH Digital Studio gelieferte Projekte: Website mit Online-Buchung, Stripe-Onlineshop, Relaunch mit automatisierter Terminbuchung. Alles ist online — öffnen und selbst urteilen.",
  keywords: [
    "Referenzen Webagentur",
    "KAH Digital Studio Website-Projekte",
    "Webdesign Portfolio",
    "Referenzen Webagentur Schweiz",
    "Beispiele gelieferter Websites",
  ],
  alternates: { canonical: "https://kah-digital.ch/de/referenzen" },
  openGraph: {
    title: "Referenzen — Gelieferte Projekte, online | KAH Digital Studio",
    description:
      "Echte Projekte: Website + Buchung, Stripe-E-Commerce, Relaunch + automatisierte Termine. Online und überprüfbar.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Von KAH Digital Studio gelieferte Projekte",
  description:
    "Von KAH Digital Studio gelieferte Websites und Anwendungen, online und öffentlich zugänglich.",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "BCS Nettoyage — Website + Online-Buchung",
      url: "https://bcs-nettoyage.fr",
      description:
        "Next.js-Website für ein Reinigungsunternehmen in Toulouse: Leistungen, Preise, Vorher-nachher-Galerie und Online-Terminbuchung. Live auf der eigenen Domain.",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Vellio Shop — Onlineshop",
      url: "https://vellio.kah-digital.ch",
      description:
        "Next.js-Shop mit Stripe-Zahlung im Live-Betrieb, 21 Produkten, automatischen Bestätigungs-E-Mails und Premium-Design.",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "DSE Yana — Relaunch + automatisierte Terminbuchung",
      url: "https://dse-yana-premium-client.vercel.app",
      description:
        "Relaunch der Website eines Ingenieurbüros für Fluidtechnik in Französisch-Guayana: Selbstbuchung eines Erstgesprächs (Zeitfenster, Bestätigung, Erinnerung), Admin-Bereich.",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Kotizy — Digitale Tontine-Anwendung",
      url: "https://tontineapp-web.vercel.app",
      description:
        "Anwendung zur Verwaltung von Tontinen: automatisierte Zyklen, Benachrichtigungen, Community-Dashboard.",
    },
  ],
};

type Ref = {
  sector: string;
  location: string;
  type: string;
  name: string;
  challenge: string;
  solution: string;
  facts: { value: string; label: string }[];
  url: string;
  urlLabel: string;
  color: string;
  accentColor: string;
  borderColor: string;
};

const CASES: Ref[] = [
  {
    sector: "Reinigungsunternehmen",
    location: "Toulouse, Frankreich",
    type: "Website + Online-Buchung",
    name: "BCS Nettoyage",
    challenge:
      "Kundengewinnung ausschliesslich per Telefon und Mundpropaganda. Keine Website, die Neukunden Vertrauen gibt oder ausserhalb der Telefonzeiten Terminanfragen entgegennimmt.",
    solution:
      "Massgeschneiderte Website mit Fokus auf Ergebnisse (Vorher-nachher-Galerie), transparente Preise pro Leistung, Buchungsformular mit Datum und Zeitfenster, Schnellzugriff auf WhatsApp / Anruf / E-Mail. Next.js, bei Vercel mit eigener Domain bereitgestellt.",
    facts: [
      { value: "≈ 1 Wo.", label: "Lieferung" },
      { value: "Online", label: "Auf eigener Domain" },
      { value: "Buchung", label: "Zeitfenster online" },
    ],
    url: "https://bcs-nettoyage.fr",
    urlLabel: "bcs-nettoyage.fr",
    color: "from-emerald-500/15 to-teal-500/10",
    accentColor: "text-emerald-400",
    borderColor: "border-emerald-500/20",
  },
  {
    sector: "E-Commerce · Wohnen & Design",
    location: "Online",
    type: "Onlineshop",
    name: "Vellio Shop",
    challenge:
      "Eine zeitgemässe Kuratoren-Marke mit einem echten Onlineshop starten — Premium-Design, verlässliche Zahlung, kontrolliertes Budget.",
    solution:
      "Next.js App Router, Stripe Checkout im Live-Modus (echte Verkäufe ab Tag 1), typisierter Katalog mit 21 Produkten in 8 Kategorien, Resend-Transaktions-E-Mails, kontinuierliche Bereitstellung über Vercel.",
    facts: [
      { value: "21", label: "Produkte online" },
      { value: "Stripe Live", label: "Echte Zahlungen" },
      { value: "≈ 3 Wo.", label: "Lieferung" },
    ],
    url: "https://vellio.kah-digital.ch",
    urlLabel: "vellio.kah-digital.ch",
    color: "from-amber-500/12 to-orange-500/8",
    accentColor: "text-amber-400",
    borderColor: "border-amber-500/20",
  },
  {
    sector: "Ingenieurbüro Fluidtechnik",
    location: "Französisch-Guayana",
    type: "Relaunch + automatisierte Termine",
    name: "DSE Yana",
    challenge:
      "Eine veraltete Website, die das Niveau des Büros nicht mehr abbildete, und keine Möglichkeit für Kunden, ein Erstgespräch ohne E-Mail-Pingpong zu buchen.",
    solution:
      "Kompletter Relaunch (Identität, Inhalt, SEO) und vor allem eine Selbstbuchung von Terminen: Der Kunde wählt sein Zeitfenster, bestätigt es und erhält eine Bestätigung mit Kalenderdatei und Stornolink. Automatische Erinnerung am Vortag. Admin-Bereich für Anfragen und Termine.",
    facts: [
      { value: "Relaunch", label: "Komplette Website" },
      { value: "Termine", label: "Selbstbuchung" },
      { value: "Erinnerung", label: "Automatisch am Vortag" },
    ],
    url: "https://dse-yana-premium-client.vercel.app",
    urlLabel: "dse-yana-premium-client.vercel.app",
    color: "from-violet-500/15 to-fuchsia-500/8",
    accentColor: "text-violet-400",
    borderColor: "border-violet-500/20",
  },
  {
    sector: "Anwendung · Gemeinschaftsfinanzen",
    location: "Online",
    type: "Fachanwendung",
    name: "Kotizy",
    challenge:
      "Die Tontine — das rotierende Sparen im Familien- und Freundeskreis — digitalisieren, mit verlässlichen Zyklen, Erinnerungen und einer klaren Übersicht für die ganze Gruppe.",
    solution:
      "Web-Anwendung: automatisierte Tontine-Zyklen, Benachrichtigungen, Community-Dashboard, Zahlungsverwaltung. Next.js, Supabase, Vercel-Bereitstellung.",
    facts: [
      { value: "Zyklen", label: "Automatisiert" },
      { value: "Hinweise", label: "Integrierte Erinnerungen" },
      { value: "Live", label: "Laufende Anwendung" },
    ],
    url: "https://tontineapp-web.vercel.app",
    urlLabel: "tontineapp-web.vercel.app",
    color: "from-blue-500/15 to-cyan-500/8",
    accentColor: "text-blue-400",
    borderColor: "border-blue-500/20",
  },
];

const GUARANTEES = [
  "Kostenlose, verständliche Offerte in 24h",
  "Festpreis, vor Projektstart bestätigt",
  "30 % Anzahlung, Rest bei Lieferung",
  "Quellcode wird geliefert — die Website gehört Ihnen",
];

export default function ReferenzenPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Script id="ld-references" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/6 pt-20 pb-16">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-300">
            <FiCheck size={13} /> Online und überprüfbar
          </div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Was wir geliefert haben.<br />Öffnen, urteilen.
          </h1>
          <p className="mb-8 text-lg text-gray-400 leading-relaxed">
            Keine erfundenen Mockups, keine falschen Bewertungen. Echte Projekte im Live-Betrieb, die Sie
            jetzt in einem neuen Tab öffnen können.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/de/devis"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3 font-bold text-white shadow-lg shadow-blue-500/25 transition hover:opacity-90"
            >
              Mein Projekt besprechen <FiArrowRight size={15} />
            </Link>
            <a
              href="https://wa.me/33759558414?text=Hallo%2C%20ich%20habe%20Ihre%20Referenzen%20gesehen%20und%20m%C3%B6chte%20mein%20Projekt%20besprechen."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              <FiMessageCircle size={15} /> WhatsApp direct
            </a>
          </div>
        </div>
      </section>

      {/* Stats strip — factuels uniquement */}
      <section className="border-b border-white/6 py-10">
        <div className="mx-auto max-w-4xl px-4">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { value: "5 Tage", label: "Website, nach Erhalt Ihrer Inhalte" },
              { value: "Festpreis", label: "Vor Projektstart bestätigt" },
              { value: "30 % Anzahlung", label: "Rest bei Lieferung" },
              { value: "Quellcode", label: "Geliefert, die Website gehört Ihnen" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-extrabold text-white sm:text-[1.7rem]">{stat.value}</p>
                <p className="mt-1 text-xs text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projets */}
      <section className="mx-auto max-w-5xl px-4 py-20 space-y-16">
        {CASES.map((c) => (
          <div key={c.name} className={`rounded-2xl border ${c.borderColor} bg-gradient-to-br ${c.color} p-8`}>
            <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="mb-2 flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-0.5 text-xs text-gray-400">{c.sector}</span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-0.5 text-xs text-gray-400">{c.location}</span>
                  <span className={`rounded-full border border-white/10 bg-white/5 px-3 py-0.5 text-xs font-semibold ${c.accentColor}`}>{c.type}</span>
                </div>
                <h2 className="text-xl font-bold text-white">{c.name}</h2>
              </div>
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Website öffnen <FiExternalLink size={13} />
              </a>
            </div>

            <div className="mb-6 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-gray-500">Der Bedarf</p>
                <p className="text-sm text-gray-300 leading-relaxed">{c.challenge}</p>
              </div>
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-gray-500">Was geliefert wurde</p>
                <p className="text-sm text-gray-300 leading-relaxed">{c.solution}</p>
              </div>
            </div>

            <div className="mb-6 grid grid-cols-3 gap-4 rounded-xl border border-white/8 bg-black/20 p-4">
              {c.facts.map((m) => (
                <div key={m.label} className="text-center">
                  <p className={`text-lg font-extrabold ${c.accentColor}`}>{m.value}</p>
                  <p className="mt-0.5 text-xs text-gray-500">{m.label}</p>
                </div>
              ))}
            </div>

            <a
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/8 bg-black/20 px-5 py-3 text-sm text-gray-300 transition hover:border-white/20 hover:text-white"
            >
              <span className="text-gray-500">Online:</span>
              <span className="font-mono">{c.urlLabel}</span>
              <FiExternalLink size={12} />
            </a>
          </div>
        ))}
      </section>

      {/* Avis clients — transparent */}
      <section className="border-t border-white/6 py-14">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <p className="text-sm text-gray-400 leading-relaxed">
            <strong className="text-white">Kundenbewertungen folgen.</strong> Wir zeigen lieber
            kein Zeugnis, als eines zu erfinden. Bis dahin ist jedes Projekt oben
            öffentlich — öffnen Sie sie, testen Sie die Buchung, prüfen Sie die Ladegeschwindigkeit.
          </p>
        </div>
      </section>

      {/* Ce qui est garanti */}
      <section className="border-t border-white/6 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-8 text-2xl font-bold text-white">Was bei jedem Projekt garantiert ist</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {GUARANTEES.map((g) => (
              <div key={g} className="flex items-center gap-3 rounded-xl border border-white/8 bg-gray-900/50 p-4 text-left">
                <FiCheck size={16} className="shrink-0 text-emerald-400" />
                <span className="text-sm text-gray-300">{g}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="border-t border-white/6 py-20">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-extrabold text-white">Ihr Projekt ist das nächste.</h2>
          <p className="mb-8 text-gray-400">
            Individuelle Offerte in 24h. Klarer Zeitplan. Angepasster Umfang. Keine Überraschungen.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/de/devis"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-8 py-4 font-bold text-white shadow-lg shadow-blue-500/25 transition hover:opacity-90"
            >
              Meine kostenlose Offerte erhalten <FiArrowRight size={16} />
            </Link>
            <a
              href="https://wa.me/33759558414?text=Hallo%2C%20ich%20habe%20Ihre%20Referenzen%20gesehen%20und%20m%C3%B6chte%20mein%20Projekt%20besprechen."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-8 py-4 font-bold text-white shadow-lg shadow-black/20 transition hover:brightness-110"
            >
              <FiMessageCircle size={16} /> WhatsApp
            </a>
          </div>
          <p className="mt-4 text-xs text-gray-600">Antwort in 24h · Unverbindlich · Frankreich &amp; Schweiz</p>
        </div>
      </section>
    </div>
  );
}
