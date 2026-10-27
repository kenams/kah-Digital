import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { FiArrowRight, FiCheck } from "react-icons/fi";

export const metadata: Metadata = {
  title: "How to estimate the cost of a mobile app in 2026 — KAH Digital Studio",
  description: "scoping criteria for a mobile app in 2026: showcase app, MVP, native app or React Native. A guide to getting a custom quote.",
  keywords: ["estimation application mobile", "devis application mobile", "how to estimate an app cost", "custom mobile app development", "MVP application mobile"],
  alternates: { canonical: "https://kah-digital.ch/en/blog/application-mobile-cout" },
  openGraph: {
    title: "How to estimate the cost of a mobile app in 2026",
    description: "The criteria that structure the scope of a mobile app and let you stay in control.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How to estimate the cost of a mobile app in 2026",
  "datePublished": "2026-05-04",
  "dateModified": "2026-05-04",
  "author": { "@type": "Organization", "name": "KAH Digital Studio" },
  "publisher": { "@type": "Organization", "name": "KAH Digital Studio", "url": "https://kah-digital.ch" },
  "mainEntityOfPage": "https://kah-digital.ch/en/blog/application-mobile-cout",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How is a simple mobile app priced?", "acceptedAnswer": { "@type": "Answer", "text": "A simple mobile app (MVP, 3–5 screens, authentication, one main feature) is priced after scoping with React Native, which targets iOS and Android from a single codebase." } },
    { "@type": "Question", "name": "What is the difference between native and cross-platform?", "acceptedAnswer": { "@type": "Answer", "text": "A native app often means two separate codebases. React Native or Flutter let you target both platforms at once, which simplifies scoping an MVP." } },
    { "@type": "Question", "name": "Do I need App Store and Google Play accounts?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Developer accounts are your responsibility as the app's publisher and must be planned before publishing." } },
    { "@type": "Question", "name": "Can we start with a simpler version?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, in some cases: a Progressive Web App or a no-code prototype can be enough to validate a simple flow before full development." } },
  ],
};

const TIERS = [
  { label: "PWA / Web App mobile", price: "depending on scope", delay: "5 business days", desc: "A web application that installs like an app. Not in the stores, but it works offline and is used like a native app.", tech: "Next.js · React · Service Workers" },
  { label: "MVP React Native", price: "depending on scope", delay: "4–6 weeks", desc: "An iOS + Android app with a shared codebase. Ideal for validating an idea on a controlled budget.", tech: "React Native · Expo · Supabase" },
  { label: "Full application", price: "depending on scope", delay: "8–14 weeks", desc: "A complete product with auth, payment, admin dashboard, push notifications and a custom API.", tech: "React Native · Node.js · PostgreSQL" },
  { label: "Native iOS/Android application", price: "depending on scope", delay: "12–24 weeks", desc: "Two separate codebases, maximum performance, full access to system APIs. For established products.", tech: "Swift + Kotlin or SwiftUI + Compose" },
];

const COST_DRIVERS = [
  { title: "Authentication and accounts", detail: "Login, profiles, roles and access rights must be scoped from the start." },
  { title: "Paiement in-app", detail: "Stripe, Apple/Google in-app purchases and billing flows call for specific analysis." },
  { title: "Notifications push", detail: "Segmentation, sending rules and user preferences influence the scope." },
  { title: "Geolocation", detail: "Mapping, tracking, route calculation and mobile permissions must be validated functionally." },
  { title: "Mode hors-ligne", detail: "Local synchronisation and conflict handling increase product complexity." },
  { title: "Dashboard admin web", detail: "A dedicated management interface must be treated as a full module of its own." },
];

export default function EnApplicationMobileCoutPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Script id="ld-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Script id="ld-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="relative overflow-hidden pt-24 pb-12">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="relative mx-auto max-w-3xl px-4">
          <Link href="/en/blog" className="mb-6 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-300">? Blog</Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-400">Mobile</span>
            <span className="text-xs text-gray-600">4 May 2026 · 7 min read</span>
          </div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            How to estimate the cost of a mobile app in 2026
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            PWA, React Native, native app — the criteria that structure the scope, and how to stay in control of your investment.
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 pb-24">
        <div className="mb-10 rounded-2xl border border-violet-500/20 bg-violet-500/5 p-5">
          <p className="text-sm leading-relaxed text-violet-200">
            <strong>TL;DR :</strong> PWA by scope · React Native MVP by scope · Full application by scope · Native iOS+Android by scope. Always start with an MVP.
          </p>
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">Why is scoping essential?</h2>
        <p className="mb-6 text-gray-400 leading-relaxed">
          “Developing a mobile app” can mean a 3-screen to-do list or a delivery platform with 50 features. The quote depends on three things: the number of features, the technical complexity (payment, geolocation, real time) and the technology chosen.
        </p>
        <p className="mb-10 text-gray-400 leading-relaxed">
          The golden rule: start with an MVP (Minimum Viable Product) with a single main feature. Check that people really use it, then invest more.
        </p>

        <h2 className="mb-8 text-2xl font-bold text-white">Formats by type of app</h2>
        <div className="mb-12 space-y-4">
          {TIERS.map((t) => (
            <div key={t.label} className="rounded-2xl border border-white/8 bg-gray-900 p-6">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="text-sm text-gray-500">{t.label}</p>
                  <p className="text-2xl font-black text-white">{t.price}</p>
                  <p className="text-xs text-gray-600">{t.delay}</p>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-500">{t.tech}</span>
              </div>
              <p className="mt-3 text-sm text-gray-400 leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">What pushes the budget up</h2>
        <div className="mb-12 grid gap-4 sm:grid-cols-2">
          {COST_DRIVERS.map((item) => (
            <div key={item.title} className="rounded-xl border border-white/8 bg-gray-900/50 p-4">
              <p className="font-semibold text-white">{item.title}</p>
              <p className="mt-1 text-sm text-gray-500">{item.detail}</p>
            </div>
          ))}
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">How to reduce the budget without sacrificing quality</h2>
        <ul className="mb-10 space-y-3 text-sm text-gray-400 leading-relaxed">
          {[
            "Start with a single platform (iOS OR Android) to validate, then expand.",
            "Use React Native or Expo — one codebase, two platforms, often easier to maintain than double native development.",
            "Set a strict scope for the MVP. Every extra feature multiplies the budget.",
            "Choose Supabase or Firebase as the backend — weeks of development saved.",
            "Avoid complex animations and 3D effects in V1 — they can wait for V2.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <FiCheck size={14} className="mt-0.5 shrink-0 text-emerald-400" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <h2 className="mb-6 text-2xl font-bold text-white">Frequently asked questions</h2>
        <div className="mb-12 space-y-4">
          {faqJsonLd.mainEntity.map((f) => (
            <div key={f.name} className="rounded-xl border border-white/8 bg-gray-900/50 p-5">
              <h3 className="mb-2 font-semibold text-white">{f.name}</h3>
              <p className="text-sm text-gray-400">{f.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-blue-600/10 p-8 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Your mobile app, well budgeted</h2>
          <p className="mb-6 text-gray-400">Custom quote · Reply within 24h · MVP scoped to your needs</p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/en/devis" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-8 py-3.5 font-bold text-white shadow-lg transition hover:shadow-violet-500/30">
              Request a quote <FiArrowRight size={15} />
            </Link>
            <Link href="/en/offres" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 font-semibold text-white transition hover:border-white/40">
              Voir nos offres
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}


