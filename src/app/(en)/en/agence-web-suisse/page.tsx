import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowRight, FiCheck, FiMapPin, FiMessageCircle } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Web Agency Switzerland — KAH Digital Studio | Lausanne · Geneva · Zurich · Bern",
  description: "Digital studio based in Toulouse, 100% remote. Websites, apps and AI solutions for SMEs, startups and independents across French-, German- and Italian-speaking Switzerland. Quote within 24h.",
  keywords: ["web agency Switzerland", "website development Switzerland", "web developer Switzerland", "digital studio Switzerland", "SME website Switzerland", "web application Switzerland"],
  alternates: { canonical: "https://kah-digital.ch/en/agence-web-suisse" },
  openGraph: {
    title: "Web Agency Switzerland — KAH Digital Studio",
    description: "100% remote digital studio. Websites, apps and AI for all of Switzerland. Quotes in CHF possible, Swiss data protection act (FADP) taken into account.",
  },
};

const SWISS_CITIES = [
  { city: "Lausanne", region: "Vaud", href: "/en/site-web-lausanne", flag: "🇨🇭", highlight: true },
  { city: "Geneva", region: "Geneva", href: "/en/site-web-geneve", flag: "🇨🇭", highlight: true },
  { city: "Zurich", region: "Zurich", href: "/en/agence-web-zurich", flag: "🇨🇭", highlight: false },
  { city: "Bern", region: "Bern", href: "/en/agence-web-berne", flag: "🇨🇭", highlight: false },
  { city: "Basel", region: "Basel-City", href: "/en/agence-web-basel", flag: "🇨🇭", highlight: false },
  { city: "Lugano", region: "Ticino", href: "/en/agence-web-lugano", flag: "🇨🇭", highlight: false },
  { city: "Fribourg", region: "Fribourg", href: "/en/site-web-fribourg", flag: "🇨🇭", highlight: false },
];

const WA_URL = "https://wa.me/33759558414?text=Hello%20KAH%20Digital%2C%20I%27m%20looking%20for%20a%20digital%20studio%20in%20Switzerland%20for%20my%20project.";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "KAH Digital Studio — Web Agency Switzerland",
  "description": "Digital studio based in Toulouse, 100% remote. Websites, applications and AI solutions for Swiss businesses.",
  "url": "https://kah-digital.ch/en/agence-web-suisse",
  "telephone": "+33759558414",
  "email": "kahdigital42@gmail.com",
  "address": { "@type": "PostalAddress", "addressLocality": "Toulouse", "addressRegion": "Occitanie", "addressCountry": "FR" },
  "areaServed": { "@type": "Country", "name": "Switzerland" },
  "openingHours": "Mo-Fr 09:00-18:00",
  "priceRange": "CHF 290 - CHF 2500",
};

export default function AgenceWebSuisseEnPage() {
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
            🇨🇭 Remote studio · France & Switzerland
          </div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-sm text-gray-300">
            <FiMapPin size={13} className="text-emerald-400" />
            Toulouse, France · Clients in Switzerland
          </div>
          <h1 className="mb-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Web Agency Switzerland
          </h1>
          <p className="mb-3 max-w-2xl mx-auto text-xl font-semibold text-white/80">
            Websites · Applications · AI solutions
          </p>
          <p className="mb-8 max-w-2xl mx-auto text-lg text-gray-400">
            Digital studio based in Toulouse, 100% remote. Next.js 15, Lighthouse 95+, technical SEO. Invoicing in CHF possible, Swiss data protection act (FADP) taken into account. Free quote within 24h.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/en/devis?ref=suisse-hub"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-3.5 font-bold text-white shadow-lg shadow-emerald-500/30 transition hover:gap-3"
            >
              Free quote in CHF <FiArrowRight size={15} />
            </Link>
            <Link href="/en/commander?devise=chf" className="inline-flex items-center gap-2 rounded-full border border-[#e0c48e]/50 bg-[#e0c48e]/10 px-8 py-3.5 font-bold text-[#f3d089] transition hover:bg-[#e0c48e]/20">
              Order from CHF 290
            </Link>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-8 py-3.5 font-bold text-white shadow-lg shadow-green-500/20 transition hover:brightness-110"
            >
              <FiMessageCircle size={15} />
              WhatsApp — quick reply
            </a>
          </div>
          <p className="mt-5 text-sm text-gray-600">Remote studio · CHF invoicing possible · FADP · Reply within 24h</p>
        </div>
      </section>

      {/* Trust Swiss */}
      <section className="border-y border-emerald-500/10 bg-emerald-500/[0.03] py-6">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-emerald-400/80">
            {[
              { icon: "🇨🇭", label: "100% remote work · France & Switzerland" },
              { icon: "💳", label: "CHF invoicing possible" },
              { icon: "🔒", label: "FADP taken into account (Swiss data protection act)" },
              { icon: "🌐", label: "FR · DE · EN · IT — multilingual sites" },
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
              { value: "7 regions", label: "served remotely" },
              { value: "from CHF 290", label: "Fixed price guaranteed" },
              { value: "5 days", label: "Minimum lead time" },
              { value: "24h", label: "Reply time" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-xl font-black text-white sm:text-2xl">{s.value}</div>
                <div className="mt-1 text-xs text-gray-600">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cities grid */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="mb-3 text-center text-2xl font-extrabold tracking-tight text-white">
            All Swiss cities
          </h2>
          <p className="mb-10 text-center text-gray-500">We work remotely with businesses in the main regions. Same quality, same price, everywhere in Switzerland.</p>
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
                <FiArrowRight size={15} className="text-gray-600 transition group-hover:text-emerald-400" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Swiss */}
      <section className="border-t border-white/[0.06] bg-white/[0.015] py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="mb-10 text-center text-2xl font-extrabold tracking-tight text-white">
            Why KAH Digital Studio for your Swiss project?
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Clients in Switzerland", body: "Studio based in Toulouse, 100% remote. Video-call meetings, invoicing in CHF possible." },
              { title: "Pay in CHF if you prefer", body: "Card payment (Stripe) in Swiss francs, or a SEPA bank transfer in euros — whichever suits you." },
              { title: "FADP taken into account", body: "Your data and your customers' data are handled with the Swiss data protection act (FADP) in mind." },
              { title: "Natively multilingual", body: "Sites in French, German, English and Italian. SEO optimised in each language to cover all of Switzerland." },
              { title: "Transparent fixed price", body: "A fixed quote before we start. No surprises, no overruns. Starter from CHF 290, delivered in 5 days." },
              { title: "Reply within 24h", body: "Direct access to the founder. No intermediary project manager, no routing delay. A studio, not a factory." },
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
          <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-white">Prices in CHF</h2>
          <p className="mb-8 text-gray-500">Fixed, transparent prices, invoiced in Swiss francs. No lock-in.</p>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "Starter", price: "CHF 290", sub: "Landing page · 5 days", highlight: false },
              { label: "Business", price: "CHF 790", sub: "Up to 6 pages · SEO · 5 business days", highlight: true },
              { label: "Premium IA", price: "CHF 2'490", sub: "Complete system + AI · 28 days", highlight: false },
            ].map((item) => (
              <div
                key={item.label}
                className={`rounded-xl p-5 text-left ${item.highlight
                  ? "border border-emerald-500/30 bg-[linear-gradient(135deg,rgba(16,185,129,0.08),rgba(20,184,166,0.06))] shadow-lg shadow-emerald-500/10"
                  : "border border-white/[0.07] bg-white/[0.025]"}`}
              >
                <div className="mb-1 text-[11px] font-bold uppercase tracking-widest text-gray-600">{item.label}</div>
                <div className="text-2xl font-black text-white">{item.price}</div>
                <div className="mt-1 text-xs text-gray-500">{item.sub}</div>
                {item.highlight && <div className="mt-3 text-[10px] font-semibold uppercase tracking-widest text-emerald-400">Most popular</div>}
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs text-emerald-500/60">
            💳 Payment: card (Stripe) in CHF · SEPA transfer in €
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/[0.06] py-20 text-center">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-white">Your project in Switzerland — shall we talk?</h2>
          <p className="mb-8 text-gray-500">Free quote · Reply within 24h · No commitment</p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/en/devis?ref=suisse-hub"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 px-10 py-4 font-bold text-white shadow-lg shadow-emerald-500/25 transition hover:shadow-emerald-500/40"
            >
              Request my free quote <FiArrowRight size={15} />
            </Link>
            <Link href="/en/commander?devise=chf" className="inline-flex items-center gap-2 rounded-full border border-[#e0c48e]/50 bg-[#e0c48e]/10 px-8 py-3.5 font-bold text-[#f3d089] transition hover:bg-[#e0c48e]/20">
              Order from CHF 290
            </Link>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#25D366]/10 px-8 py-4 font-semibold text-[#25D366] transition hover:bg-[#25D366] hover:text-white"
            >
              <FiMessageCircle size={15} />
              WhatsApp direct
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
