import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowRight, FiCheck, FiMapPin, FiMessageCircle } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Webagentur Schweiz — KAH Digital Studio | Zürich · Bern · Basel · Lausanne",
  description: "Digitalstudio mit Sitz in Toulouse, 100 % auf Distanz. Websites, Apps und KI-Lösungen für KMU, Startups und Selbstständige in der West-, Deutsch- und Südschweiz. Offerte innert 24h.",
  keywords: ["Webagentur Schweiz", "Website erstellen Schweiz", "Webentwickler Schweiz", "Digitalstudio Schweiz", "Website KMU Schweiz", "Webanwendung Schweiz"],
  alternates: { canonical: "https://kah-digital.ch/de/webagentur-schweiz" },
  openGraph: {
    images: [{ url: "/og-kah-digital.png", width: 1200, height: 630 }],
    title: "Webagentur Schweiz — KAH Digital Studio",
    description: "Digitalstudio 100 % auf Distanz. Websites, Apps und KI für die ganze Schweiz. Offerten in CHF möglich, Datenschutzgesetz (DSG) berücksichtigt.",
  },
};

const SWISS_CITIES = [
  { city: "Lausanne", region: "Waadt", href: "/de/devis?ref=suisse-lausanne", flag: "🇨🇭", highlight: true },
  { city: "Genf", region: "Genf", href: "/de/devis?ref=suisse-genf", flag: "🇨🇭", highlight: true },
  { city: "Zürich", region: "Zürich", href: "/de/webentwicklung-zuerich", flag: "🇨🇭", highlight: false },
  { city: "Bern", region: "Bern", href: "/de/webentwicklung-bern", flag: "🇨🇭", highlight: false },
  { city: "Basel", region: "Basel-Stadt", href: "/de/webentwicklung-basel", flag: "🇨🇭", highlight: false },
  { city: "Lugano", region: "Tessin", href: "/de/devis?ref=suisse-lugano", flag: "🇨🇭", highlight: false },
  { city: "Freiburg", region: "Freiburg", href: "/de/webentwicklung-freiburg", flag: "🇨🇭", highlight: false },
];

const WA_URL = "https://wa.me/33759558414?text=Hallo%20KAH%20Digital%2C%20ich%20suche%20ein%20Digitalstudio%20in%20der%20Schweiz%20f%C3%BCr%20mein%20Projekt.";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "KAH Digital Studio — Webagentur Schweiz",
  "description": "Digitalstudio mit Sitz in Toulouse, 100 % auf Distanz. Websites, Anwendungen und KI-Lösungen für Schweizer Unternehmen.",
  "url": "https://kah-digital.ch/de/webagentur-schweiz",
  "telephone": "+33759558414",
  "email": "kahdigital42@gmail.com",
  "address": { "@type": "PostalAddress", "addressLocality": "Toulouse", "addressRegion": "Occitanie", "addressCountry": "FR" },
  "areaServed": { "@type": "Country", "name": "Schweiz" },
  "openingHours": "Mo-Fr 09:00-18:00",
  "priceRange": "CHF 290 - CHF 2500",
};

export default function WebagenturSchweizPage() {
  return (
    <div className="min-h-screen bg-[#050509] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-24">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-emerald-600/10 blur-[130px]" />

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/8 px-3 py-1 text-xs font-medium text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            🇨🇭 Studio auf Distanz · Frankreich & Schweiz
          </div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-sm text-gray-300">
            <FiMapPin size={13} className="text-emerald-400" />
            Toulouse, Frankreich · Kunden in der Schweiz
          </div>
          <h1 className="mb-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Webagentur Schweiz
          </h1>
          <p className="mb-3 max-w-2xl mx-auto text-xl font-semibold text-white/80">
            Websites · Anwendungen · KI-Lösungen
          </p>
          <p className="mb-8 max-w-2xl mx-auto text-lg text-gray-400">
            Digitalstudio mit Sitz in Toulouse, 100 % auf Distanz. Next.js 15, Lighthouse 95+, technisches SEO. Rechnungsstellung in CHF möglich, Datenschutzgesetz (DSG) berücksichtigt. Kostenlose Offerte in 24h.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/de/devis?ref=suisse-hub"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-3.5 font-bold text-white shadow-lg shadow-emerald-500/30 transition hover:gap-3"
            >
              Kostenlose Offerte in CHF <FiArrowRight size={15} />
            </Link>
            <Link href="/de/commander" className="inline-flex items-center gap-2 rounded-full border border-[#e0c48e]/50 bg-[#e0c48e]/10 px-8 py-3.5 font-bold text-[#f3d089] transition hover:bg-[#e0c48e]/20">
              Ab CHF 290 bestellen
            </Link>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-8 py-3.5 font-bold text-white shadow-lg shadow-green-500/20 transition hover:brightness-110"
            >
              <FiMessageCircle size={15} />
              WhatsApp — schnelle Antwort
            </a>
          </div>
          <p className="mt-5 text-sm text-gray-400">Studio auf Distanz · Rechnung in CHF möglich · DSG · Antwort in 24h</p>
        </div>
      </section>

      {/* Trust Swiss */}
      <section className="border-y border-emerald-500/10 bg-emerald-500/[0.03] py-6">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-emerald-400/80">
            {[
              { icon: "🇨🇭", label: "100 % Arbeit auf Distanz · Frankreich & Schweiz" },
              { icon: "💳", label: "Rechnung in CHF möglich" },
              { icon: "🔒", label: "DSG berücksichtigt (Schweizer Datenschutzgesetz)" },
              { icon: "🌐", label: "DE · FR · EN · IT — mehrsprachige Websites" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-1.5 rounded-full border border-emerald-500/15 bg-emerald-500/5 px-3 py-1.5">
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-white/[0.06] py-8">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { value: "7 Regionen", label: "auf Distanz betreut" },
              { value: "ab CHF 290", label: "Festpreis garantiert" },
              { value: "5 Tage", label: "Mindestlieferzeit" },
              { value: "24h", label: "Antwortzeit" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-xl font-black text-white sm:text-2xl">{s.value}</div>
                <div className="mt-1 text-xs text-gray-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cities grid */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="mb-3 text-center text-2xl font-extrabold tracking-tight text-white">
            Alle Schweizer Städte
          </h2>
          <p className="mb-10 text-center text-gray-500">Wir arbeiten auf Distanz mit Unternehmen in den wichtigsten Regionen. Gleiche Qualität, gleicher Preis, überall in der Schweiz.</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SWISS_CITIES.map((c) => (
              <Link
                key={c.city}
                href={c.href}
                className={`group flex items-center justify-between rounded-xl border p-5 transition hover:border-emerald-500/30 hover:bg-emerald-500/5 ${
                  c.highlight
                    ? "border-emerald-500/20 bg-emerald-500/[0.04]"
                    : "border-white/[0.07] bg-white/[0.025]"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{c.flag}</span>
                    <span className="font-bold text-white">{c.city}</span>
                  </div>
                  <div className="mt-1 text-xs text-gray-500">{c.region}</div>
                </div>
                <FiArrowRight size={15} className="text-gray-400 transition group-hover:text-emerald-400" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Swiss */}
      <section className="border-t border-white/[0.06] bg-white/[0.015] py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="mb-10 text-center text-2xl font-extrabold tracking-tight text-white">
            Warum KAH Digital Studio für Ihr Schweizer Projekt?
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Kunden in der Schweiz", body: "Studio mit Sitz in Toulouse, 100 % auf Distanz. Austausch per Videokonferenz, Rechnungsstellung in CHF möglich." },
              { title: "Zahlung in CHF möglich", body: "Kartenzahlung (Stripe) in Schweizer Franken oder SEPA-Überweisung in Euro — ganz nach Wunsch." },
              { title: "DSG berücksichtigt", body: "Ihre Daten und die Ihrer Kunden werden unter Berücksichtigung des Schweizer Datenschutzgesetzes (DSG) verarbeitet." },
              { title: "Nativ mehrsprachig", body: "Websites auf Deutsch, Französisch, Englisch und Italienisch. SEO in jeder Sprache optimiert, um die ganze Schweiz abzudecken." },
              { title: "Transparenter Festpreis", body: "Eine feste Offerte vor Projektstart. Keine Überraschungen, keine Kostenüberschreitung. Starter ab CHF 290, geliefert in 5 Tagen." },
              { title: "Antwort in 24h", body: "Direkter Zugang zum Gründer. Kein zwischengeschalteter Projektleiter, keine Weiterleitungsverzögerung. Ein Studio, keine Fabrik." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6">
                <FiCheck size={15} className="mb-3 text-emerald-400" />
                <h3 className="mb-2 font-bold text-white">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-400">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="border-t border-white/[0.06] py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-white">Preise in CHF</h2>
          <p className="mb-8 text-gray-500">Feste, transparente Preise, in Schweizer Franken verrechnet. Kein Lock-in.</p>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "Starter", price: "CHF 290", sub: "Landingpage · 5 Tage", highlight: false },
              { label: "Business", price: "CHF 790", sub: "Bis zu 6 Seiten · SEO · 5 Werktage", highlight: true },
              { label: "Vertikaler KI-Agent", price: "CHF 2'490", sub: "Komplettsystem + KI · 28 Tage", highlight: false },
            ].map((item) => (
              <div
                key={item.label}
                className={`rounded-xl p-5 text-left ${item.highlight
                  ? "border border-emerald-500/30 bg-[linear-gradient(135deg,rgba(16,185,129,0.08),rgba(20,184,166,0.06))] shadow-lg shadow-emerald-500/10"
                  : "border border-white/[0.07] bg-white/[0.025]"}`}
              >
                <div className="mb-1 text-[11px] font-bold uppercase tracking-widest text-gray-400">{item.label}</div>
                <div className="text-2xl font-black text-white">{item.price}</div>
                <div className="mt-1 text-xs text-gray-500">{item.sub}</div>
                {item.highlight && <div className="mt-3 text-[10px] font-semibold uppercase tracking-widest text-emerald-400">Am beliebtesten</div>}
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs text-emerald-500/60">
            💳 Zahlung: Karte (Stripe) in CHF · SEPA-Überweisung in €
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/[0.06] py-20 text-center">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-white">Ihr Projekt in der Schweiz — sprechen wir darüber?</h2>
          <p className="mb-8 text-gray-500">Kostenlose Offerte · Antwort in 24h · Unverbindlich</p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/de/devis?ref=suisse-hub"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 px-10 py-4 font-bold text-white shadow-lg shadow-emerald-500/25 transition hover:shadow-emerald-500/40"
            >
              Meine kostenlose Offerte anfordern <FiArrowRight size={15} />
            </Link>
            <Link href="/de/commander" className="inline-flex items-center gap-2 rounded-full border border-[#e0c48e]/50 bg-[#e0c48e]/10 px-8 py-3.5 font-bold text-[#f3d089] transition hover:bg-[#e0c48e]/20">
              Ab CHF 290 bestellen
            </Link>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#25D366]/10 px-8 py-4 font-semibold text-[#25D366] transition hover:bg-[#25D366] hover:text-white"
            >
              <FiMessageCircle size={15} />
              WhatsApp direkt
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
