import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowRight, FiCheck, FiMapPin, FiMessageCircle } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Agence web Suisse — KAH Digital | Lausanne · Genève · Zurich · Berne",
  description: "Studio digital suisse basé à Lausanne. Création de sites web, apps et solutions IA pour PME, startups et indépendants en Suisse romande, alémanique et tessinoise. Devis CHF en 24h. TWINT accepté.",
  keywords: ["agence web suisse", "création site web suisse", "développeur web lausanne", "studio digital suisse", "site internet suisse pme", "application web suisse"],
  alternates: { canonical: "https://kah-digital.ch/agence-web-suisse" },
  openGraph: {
    title: "Agence web Suisse — KAH Digital",
    description: "Studio digital basé à Lausanne. Sites web, apps et IA pour toute la Suisse. Devis en CHF, TWINT accepté, conforme LPD.",
  },
};

const SWISS_CITIES = [
  { city: "Lausanne", region: "Vaud", href: "/site-web-lausanne", flag: "🇨🇭", highlight: true },
  { city: "Genève", region: "Genève", href: "/site-web-geneve", flag: "🇨🇭", highlight: true },
  { city: "Zurich", region: "Zurich", href: "/agence-web-zurich", flag: "🇨🇭", highlight: false },
  { city: "Berne", region: "Berne", href: "/agence-web-berne", flag: "🇨🇭", highlight: false },
  { city: "Bâle", region: "Bâle-Ville", href: "/agence-web-basel", flag: "🇨🇭", highlight: false },
  { city: "Lugano", region: "Tessin", href: "/agence-web-lugano", flag: "🇨🇭", highlight: false },
  { city: "Fribourg", region: "Fribourg", href: "/site-web-fribourg", flag: "🇨🇭", highlight: false },
];

const WA_URL = "https://wa.me/33759558414?text=Bonjour%20KAH%20Digital%2C%20je%20cherche%20un%20studio%20digital%20en%20Suisse%20pour%20mon%20projet.";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "KAH Digital — Agence web Suisse",
  "description": "Studio digital suisse basé à Lausanne. Création de sites web, applications et solutions IA pour entreprises suisses.",
  "url": "https://kah-digital.ch/agence-web-suisse",
  "telephone": "+33759558414",
  "email": "kahdigital42@gmail.com",
  "address": { "@type": "PostalAddress", "addressLocality": "Lausanne", "addressRegion": "Vaud", "addressCountry": "CH" },
  "areaServed": { "@type": "Country", "name": "Suisse" },
  "openingHours": "Mo-Fr 09:00-18:00",
  "priceRange": "CHF 149 - CHF 2500",
};

export default function AgenceWebSuissePage() {
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
            🇨🇭 Studio domicilié à Lausanne · Places disponibles
          </div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-sm text-gray-300">
            <FiMapPin size={13} className="text-emerald-400" />
            Lausanne, Suisse
          </div>
          <h1 className="mb-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Agence web Suisse
          </h1>
          <p className="mb-3 max-w-2xl mx-auto text-xl font-semibold text-white/80">
            Sites web · Applications · Solutions IA
          </p>
          <p className="mb-8 max-w-2xl mx-auto text-lg text-gray-400">
            Studio digital basé à Lausanne. Next.js 15, Lighthouse 95+, SEO technique. Facturation en CHF, TWINT accepté, conforme LPD. Devis gratuit en 24h.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/devis?ref=suisse-hub"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-3.5 font-bold text-white shadow-lg shadow-emerald-500/30 transition hover:gap-3"
            >
              Devis gratuit en CHF <FiArrowRight size={15} />
            </Link>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-8 py-3.5 font-bold text-white shadow-lg shadow-green-500/20 transition hover:brightness-110"
            >
              <FiMessageCircle size={15} />
              WhatsApp — réponse 2h
            </a>
          </div>
          <p className="mt-5 text-sm text-gray-600">Studio Suisse · Facturation CHF · TWINT · LPD · Réponse 24h</p>
        </div>
      </section>

      {/* Trust Swiss */}
      <section className="border-y border-emerald-500/10 bg-emerald-500/[0.03] py-6">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-emerald-400/80">
            {[
              { icon: "🇨🇭", label: "Société domiciliée à Lausanne" },
              { icon: "💳", label: "Facturation CHF · TWINT accepté" },
              { icon: "🔒", label: "Conforme LPD (loi suisse protection des données)" },
              { icon: "🌐", label: "FR · DE · EN · IT — sites multilingues" },
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
              { value: "7 cantons", label: "couverts en Suisse" },
              { value: "dès CHF 149", label: "Prix fixe garanti" },
              { value: "5 jours", label: "Délai minimum" },
              { value: "24h", label: "Réponse garantie" },
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
            Toutes les villes suisses
          </h2>
          <p className="mb-10 text-center text-gray-500">Présence locale dans les 7 principaux cantons. Même qualité, même prix, partout en Suisse.</p>
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
            Pourquoi KAH Digital pour votre projet suisse ?
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Basé en Suisse", body: "Studio domicilié à Lausanne. Interlocuteur suisse, disponible en personne si besoin, facturant en CHF." },
              { title: "Facturation CHF + TWINT", body: "Tous vos règlements en francs suisses. Virement bancaire CHF, TWINT ou carte bancaire — à votre convenance." },
              { title: "Conforme LPD", body: "Vos données et celles de vos clients traitées selon la loi suisse sur la protection des données (LPD). Standard par défaut." },
              { title: "Multilingue natif", body: "Sites en français, allemand, anglais et italien. SEO optimisé dans chaque langue pour couvrir toute la Suisse." },
              { title: "Prix fixe transparent", body: "Devis fixe avant de commencer. Zéro surprise, zéro dépassement. Starter dès CHF 149, livré en 5 jours." },
              { title: "Réponse en 24h", body: "Accès direct au fondateur. Pas de chef de projet intermédiaire, pas de délai de routing. Un studio, pas une usine." },
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
          <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-white">Tarifs en CHF</h2>
          <p className="mb-8 text-gray-500">Prix fixes, transparents, facturés en francs suisses. Zéro abonnement, zéro lock-in.</p>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "Starter", price: "CHF 149", sub: "Landing page · 5 jours", highlight: false },
              { label: "Business", price: "CHF 420", sub: "Jusqu'à 6 pages · SEO · 14 jours", highlight: true },
              { label: "Premium IA", price: "CHF 950", sub: "Système complet + IA · 28 jours", highlight: false },
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
                {item.highlight && <div className="mt-3 text-[10px] font-semibold uppercase tracking-widest text-emerald-400">Le plus populaire</div>}
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs text-emerald-500/60">
            💳 Paiement : virement bancaire CHF · TWINT · Carte bancaire (Stripe)
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/[0.06] py-20 text-center">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-white">Votre projet en Suisse — on en parle ?</h2>
          <p className="mb-8 text-gray-500">Devis gratuit en CHF · Réponse sous 24h · Sans engagement · TWINT accepté</p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/devis?ref=suisse-hub"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 px-10 py-4 font-bold text-white shadow-lg shadow-emerald-500/25 transition hover:shadow-emerald-500/40"
            >
              Demander mon devis gratuit <FiArrowRight size={15} />
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
