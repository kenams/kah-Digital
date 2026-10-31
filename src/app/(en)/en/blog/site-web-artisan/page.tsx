import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { FiArrowRight, FiCheck } from "react-icons/fi";

export const metadata: Metadata = {
  title: "A website for tradespeople: the complete 2026 guide",
  description: "How to create an effective website for a tradesperson? Quote, timeline, what you absolutely need. A practical guide for plumbers, electricians, carpenters and masons.",
  keywords: ["site web artisan", "tradesperson website", "site internet artisan", "site web plombier", "site web electricien", "site web menuisier"],
  alternates: { canonical: "https://kah-digital.ch/en/blog/site-web-artisan" },
  openGraph: {
    images: [{ url: "/og-kah-studio.png", width: 1200, height: 630 }],
    title: "A website for tradespeople: the complete 2026 guide",
    description: "quote, timeline, essential content. Everything a tradesperson should know before creating a site.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "A website for tradespeople: the complete 2026 guide",
  "datePublished": "2026-05-04",
  "dateModified": "2026-05-04",
  "author": { "@type": "Organization", "name": "KAH Digital Studio" },
  "publisher": { "@type": "Organization", "name": "KAH Digital Studio", "url": "https://kah-digital.ch" },
  "mainEntityOfPage": "https://kah-digital.ch/en/blog/site-web-artisan",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How is a website for a tradesperson priced?", "acceptedAnswer": { "@type": "Answer", "text": "A professional showcase site for a tradesperson is priced after scoping, depending on pages, photos and features (form, Google Maps, reviews)." } },
    { "@type": "Question", "name": "Does a tradesperson really need a website?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. 80% of customers search on Google before choosing a tradesperson. Without a site, you do not exist for them. A simple, well-referenced site can generate several qualified contacts per week." } },
    { "@type": "Question", "name": "What content should a tradesperson's site have?", "acceptedAnswer": { "@type": "Answer", "text": "The essentials: your services and service area, photos of your work, visible contact details, a form or WhatsApp button, and if possible customer reviews." } },
    { "@type": "Question", "name": "How quickly can a tradesperson's site go live?", "acceptedAnswer": { "@type": "Answer", "text": "With a clear brief and your photos ready, a tradesperson's showcase site can be live in 5 business days." } },
  ],
};

const CHECKLIST = [
  { title: "Clear home page", detail: "Your trade, your area, your contact details — in 5 seconds the visitor understands what you do." },
  { title: "List of your services", detail: "Detail each service. This is what Google reads to rank you for the right queries." },
  { title: "Photos of your work", detail: "Before/after, finished jobs — customers buy with their eyes. Even well-framed phone photos are enough." },
  { title: "Zone d'intervention", detail: "Explicitly mention the cities and departments you cover. Essential for local SEO." },
  { title: "Contact form or WhatsApp", detail: "Reduce friction. A ‘Call now’ button or a short form is enough." },
  { title: "Customer reviews (Google)", detail: "Embed your Google reviews or ask your customers to leave one. It multiplies trust." },
];

export default function EnSiteWebArtisanPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Script id="ld-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Script id="ld-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="relative overflow-hidden pt-24 pb-12">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="relative mx-auto max-w-3xl px-4">
          <Link href="/en/blog" className="mb-6 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-300">? Blog</Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-400">Artisans</span>
            <span className="text-xs text-gray-600">4 May 2026 · 5 min read</span>
          </div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            A website for tradespeople: the complete 2026 guide
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            Plumber, electrician, carpenter, mason — a simple, well-made website can bring you customers every week without paying for ads. Here is exactly what to do and how it is priced.
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 pb-24">
        <div className="mb-10 rounded-2xl border border-orange-500/20 bg-orange-500/5 p-5">
          <p className="text-sm leading-relaxed text-orange-200">
            <strong>TL;DR :</strong> Tradesperson showcase site priced by scope · Live in 5 business days · Essential: photos of your work + service area + contact form.
          </p>
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">Why a website is essential for a tradesperson</h2>
        <p className="mb-6 text-gray-400 leading-relaxed">
          Word of mouth is good. But it is no longer enough. When someone searches “plumber Lyon” or “emergency electrician Bordeaux” on Google, they choose among the first 3 results. If you are not there, that customer goes to your competitor.
        </p>
        <p className="mb-10 text-gray-400 leading-relaxed">
          A professional website is your shop window open 24/7. Even when you are on a job site, potential customers visit your site, look at your work and contact you.
        </p>

        <h2 className="mb-8 text-2xl font-bold text-white">What your site must contain (checklist)</h2>
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

        <h2 className="mb-6 text-2xl font-bold text-white">How is it priced?</h2>
        <p className="mb-6 text-gray-400 leading-relaxed">
          A professional showcase site for a tradesperson is priced after scoping the need, the pages, the photos and the useful features. Be wary of an offer that is too low: the result may be a generic template that does not represent you and does not rank well.
        </p>
        <div className="mb-10 grid gap-4 sm:grid-cols-2">
          {[
            { label: "Basic site (3-4 pages)", price: "depending on scope", delay: "1 week" },
            { label: "Full site (6-8 pages)", price: "depending on scope", delay: "2 weeks" },
            { label: "With a gallery of your work", price: "depending on scope", delay: "+2-3 days" },
            { label: "Annual maintenance", price: "depending on scope", delay: "Support included" },
          ].map((t) => (
            <div key={t.label} className="rounded-2xl border border-white/8 bg-gray-900 p-5">
              <p className="text-sm text-gray-500">{t.label}</p>
              <p className="mt-1 text-xl font-black text-white">{t.price}</p>
              <p className="text-xs text-gray-600">{t.delay}</p>
            </div>
          ))}
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">Mistakes to avoid</h2>
        <ul className="mb-10 space-y-3 text-sm text-gray-400 leading-relaxed">
          {[
            "Building your own site on Wix with no SEO — you will be invisible on Google.",
            "Not showing photos of your work — it is your best selling point.",
            "Forgetting to state your service area — a customer 50 km away will not call you if you do not say so.",
            "Having a phone number that cannot be tapped on mobile — a direct loss of contacts.",
            "Not asking satisfied customers for a Google review — it is free and very effective.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
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

        <div className="rounded-2xl border border-orange-500/20 bg-gradient-to-br from-orange-500/10 to-amber-600/10 p-8 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">A professional website for your business</h2>
          <p className="mb-6 text-gray-400">Reply within 24h · Custom quote · No commitment</p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/en/devis" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-3.5 font-bold text-white shadow-lg transition hover:shadow-orange-500/30">
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



