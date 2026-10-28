import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { FiArrowRight, FiCheck } from "react-icons/fi";

export const metadata: Metadata = {
  title: "A website for restaurants: what you really need in 2026 — KAH Digital Studio",
  description: "Online menu, booking, Google Maps, reviews — what a restaurant needs on its website. Quote and practical guide.",
  keywords: ["site web restaurant", "site internet restaurant", "restaurant website", "site web bar", "site web pizzeria", "online restaurant booking"],
  alternates: { canonical: "https://kah-digital.ch/en/blog/site-web-restaurant" },
  openGraph: {
    title: "A website for restaurants: what you really need in 2026",
    description: "What your restaurant needs on the web to attract more customers.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "A website for restaurants: what you really need in 2026",
  "datePublished": "2026-05-04",
  "dateModified": "2026-05-04",
  "author": { "@type": "Organization", "name": "KAH Digital Studio" },
  "publisher": { "@type": "Organization", "name": "KAH Digital Studio", "url": "https://kah-digital.ch" },
  "mainEntityOfPage": "https://kah-digital.ch/en/blog/site-web-restaurant",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How is a website for a restaurant priced?", "acceptedAnswer": { "@type": "Answer", "text": "A complete restaurant site (menu, booking, photos, Google Maps) is priced after scoping, depending on the features." } },
    { "@type": "Question", "name": "Is a website or a Google Business listing better?", "acceptedAnswer": { "@type": "Answer", "text": "The two are complementary. The Google listing captures immediate local searches; the website converts visitors and truly belongs to you." } },
    { "@type": "Question", "name": "Should I include online booking?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, if your restaurant takes reservations. A simple system (TheFork, Formitable, or a form) can double your online bookings." } },
    { "@type": "Question", "name": "Does my site need to be mobile-first?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. More than 70% of restaurant searches happen on mobile, often when the person is looking for somewhere to eat right now." } },
  ],
};

const MUST_HAVES = [
  { emoji: "🍽️", title: "Up-to-date menu", detail: "The menu is the number-one reason for visits. It must be readable, current and not a non-zoomable PDF on mobile." },
  { emoji: "📍", title: "Address + embedded Google Maps", detail: "Users must be able to tap directly to get directions. Essential on mobile." },
  { emoji: "📅", title: "Online booking", detail: "A simple form, a TheFork or Formitable link. Reduce friction — every lost click is an empty table." },
  { emoji: "📸", title: "Quality photos", detail: "Photos of dishes win people over before they even arrive. No need for a professional photographer — a good phone in natural light is enough." },
  { emoji: "⭐", title: "Avis Google visibles", detail: "Embed a widget or a direct link to your reviews. 90% of people read reviews before choosing a restaurant." },
  { emoji: "📞", title: "Tap-to-call phone number", detail: "Your number must be tappable on mobile. An obvious point that too many sites still miss." },
];

export default function EnSiteWebRestaurantPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Script id="ld-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Script id="ld-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="relative overflow-hidden pt-24 pb-12">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="relative mx-auto max-w-3xl px-4">
          <Link href="/en/blog" className="mb-6 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-300">? Blog</Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400">Restaurants</span>
            <span className="text-xs text-gray-600">4 May 2026 · 5 min read</span>
          </div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            A website for restaurants: what you really need in 2026
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            Menu hard to find, site not mobile-friendly, no online booking — these are the mistakes that drive customers away before they even walk into your restaurant.
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 pb-24">
        <div className="mb-10 rounded-2xl border border-red-500/20 bg-red-500/5 p-5">
          <p className="text-sm leading-relaxed text-red-200">
            <strong>TL;DR :</strong> Readable mobile menu + attractive photos + online booking + visible Google reviews. These 4 elements make the difference between a site that brings customers and a useless showcase.
          </p>
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">How customers really behave in 2026</h2>
        <p className="mb-6 text-gray-400 leading-relaxed">
          Here is how it goes in 80% of cases: the person searches “Italian restaurant Lyon” on Google at 12:30. They look at 2–3 results, click the first one with nice photos, try to see the menu — and if the menu is an unreadable PDF on mobile or cannot be found, they go back and choose your competitor.
        </p>
        <p className="mb-10 text-gray-400 leading-relaxed">
          You do not have 10 seconds. You have 3. Your site must immediately answer “is this right for me and how do I book?”.
        </p>

        <h2 className="mb-8 text-2xl font-bold text-white">The 6 essential elements</h2>
        <div className="mb-12 grid gap-4 sm:grid-cols-2">
          {MUST_HAVES.map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/8 bg-gray-900 p-5">
              <p className="mb-2 text-2xl">{item.emoji}</p>
              <p className="font-semibold text-white">{item.title}</p>
              <p className="mt-1 text-sm text-gray-400">{item.detail}</p>
            </div>
          ))}
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">Website vs. Google Business listing — you need both</h2>
        <p className="mb-6 text-gray-400 leading-relaxed">
          Many restaurateurs think their Google listing is enough. It is not. The Google listing captures immediate intent (“restaurant near me”), but your website is your conversion tool: full menu, atmosphere, story, direct booking with no commission.
        </p>
        <p className="mb-10 text-gray-400 leading-relaxed">
          TheFork takes a commission on every cover. A booking form on your own website costs you zero commission.
        </p>

        <h2 className="mb-6 text-2xl font-bold text-white">How is it priced?</h2>
        <div className="mb-10 grid gap-4 sm:grid-cols-2">
          {[
            { label: "Site vitrine simple (4-5 pages)", price: "depending on scope", delay: "1–2 semaines" },
            { label: "With online booking", price: "depending on scope", delay: "2–3 semaines" },
            { label: "With online ordering", price: "depending on scope", delay: "3–4 semaines" },
            { label: "Maintenance + menu updates", price: "depending on scope", delay: "Support inclus" },
          ].map((t) => (
            <div key={t.label} className="rounded-2xl border border-white/8 bg-gray-900 p-5">
              <p className="text-sm text-gray-500">{t.label}</p>
              <p className="mt-1 text-xl font-black text-white">{t.price}</p>
              <p className="text-xs text-gray-600">{t.delay}</p>
            </div>
          ))}
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">Frequently asked questions</h2>
        <div className="mb-12 space-y-4">
          {faqJsonLd.mainEntity.map((f) => (
            <div key={f.name} className="rounded-xl border border-white/8 bg-gray-900/50 p-5">
              <h3 className="mb-2 font-semibold text-white">{f.name}</h3>
              <p className="text-sm text-gray-400">{f.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-500/10 to-orange-600/10 p-8 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">A website that brings customers to your restaurant</h2>
          <p className="mb-6 text-gray-400">Reply within 24h · Custom quote · No commitment</p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/en/devis" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-500 to-orange-500 px-8 py-3.5 font-bold text-white shadow-lg transition hover:shadow-red-500/30">
              Request a quote <FiArrowRight size={15} />
            </Link>
            <Link href="/en/commander" className="inline-flex items-center gap-2 rounded-full border border-[#e0c48e]/50 bg-[#e0c48e]/10 px-8 py-3.5 font-bold text-[#f3d089] transition hover:bg-[#e0c48e]/20">
              Order my website from $290
            </Link>
            <Link href="/en/audit-gratuit" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 font-semibold text-white transition hover:border-white/40">
              Free audit of my site
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}



