import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { FiArrowRight, FiCheck, FiX } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Landing page vs site vitrine : lequel choisir ? — KAH Digital Studio",
  description: "Landing page or showcase site: what is the difference, what does each cost, and for which goal? A guide to choosing the right option for your situation.",
  keywords: ["landing page vs site vitrine", "landing page vs showcase site difference", "quand choisir landing page", "landing page or website"],
  alternates: { canonical: "https://kah-digital.ch/en/blog/landing-page-vs-site-vitrine" },
  openGraph: {
    title: "Landing page vs site vitrine : lequel choisir ?",
    description: "The real differences, the use cases, and how to decide based on your goal.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Landing page vs site vitrine : lequel choisir ?",
  "datePublished": "2026-05-04",
  "dateModified": "2026-05-04",
  "author": { "@type": "Organization", "name": "KAH Digital Studio" },
  "publisher": { "@type": "Organization", "name": "KAH Digital Studio", "url": "https://kah-digital.ch" },
  "mainEntityOfPage": "https://kah-digital.ch/en/blog/landing-page-vs-site-vitrine",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "What is a landing page?", "acceptedAnswer": { "@type": "Answer", "text": "A landing page is a single page designed for one specific goal: capturing leads, selling a product, promoting an event. It has no navigation menu, to keep the visitor focused on the action." } },
    { "@type": "Question", "name": "When should you choose a showcase site over a landing page?", "acceptedAnswer": { "@type": "Answer", "text": "Choose a showcase site when you have several services, want to be found on Google for several keywords, or need to present your business as a whole." } },
    { "@type": "Question", "name": "How does a landing page compare with a showcase site on cost?", "acceptedAnswer": { "@type": "Answer", "text": "A landing page is priced after scoping and can be delivered in 5 days. A showcase site is priced after scoping for 5–8 pages, delivered in 5 business days after we receive your content." } },
    { "@type": "Question", "name": "Can you have both?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, and it is even recommended. The showcase site provides your general presence and SEO, while dedicated landing pages maximise conversions for specific campaigns." } },
  ],
};

type CompareItem = { topic: string; landing: string; vitrine: string; landingOk?: boolean; vitrineOk?: boolean };

const COMPARE: CompareItem[] = [
  { topic: "Objectif", landing: "A single action (e.g. fill in a form, buy)", vitrine: "Present the business as a whole", landingOk: false, vitrineOk: false },
  { topic: "Number of pages", landing: "1 page", vitrine: "5 to 15 pages", landingOk: false, vitrineOk: false },
  { topic: "SEO long-terme", landing: "Limited (one page only)", vitrine: "Strong — several pages, several keywords", landingOk: false, vitrineOk: true },
  { topic: "Conversion (pub payante)", landing: "Excellent — no distractions", vitrine: "Average — too many options kill the click rate", landingOk: true, vitrineOk: false },
  { topic: "Time to go live", landing: "3-7 jours", vitrine: "2-3 semaines", landingOk: true, vitrineOk: false },
  { topic: "Cost", landing: "depending on scope", vitrine: "depending on scope", landingOk: true, vitrineOk: false },
  { topic: "Credibility / trust", landing: "Faible si seul", vitrine: "Strong — “About”, testimonials, blog", landingOk: false, vitrineOk: true },
];

const LANDING_CASES = [
  "You are launching a specific product or service and want to test market interest",
  "You run paid advertising (Google Ads, Meta) and want to maximise conversions",
  "You are organising an event, a webinar, a training",
  "You are a freelancer and want a quick presence before building a real site",
];

const VITRINE_CASES = [
  "You have several services to present",
  "You want to be found on Google by local customers or through organic search",
  "Your sector requires credibility (tradesperson, consultant, practice, agency)",
  "You want a lasting, self-sufficient presence in the long run",
];

export default function EnLandingPageVsSiteVitrinePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Script id="ld-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Script id="ld-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="relative overflow-hidden pt-24 pb-12">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="relative mx-auto max-w-3xl px-4">
          <Link href="/en/blog" className="mb-6 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-300">? Blog</Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">Web strategy</span>
            <span className="text-xs text-gray-600">4 May 2026 · 5 min read</span>
          </div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Landing page vs site vitrine : lequel choisir ?
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            They are not the same tools and they do not serve the same goals. Here is how to decide quickly depending on your situation.
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 pb-24">
        <div className="mb-10 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
          <p className="text-sm leading-relaxed text-emerald-200">
            <strong>TL;DR :</strong> Landing page = one precise action, tight budget, fast launch. Showcase site = full presence, lasting SEO, credibility. Ideally: both.
          </p>
        </div>

        <h2 className="mb-8 text-2xl font-bold text-white">Comparatif rapide</h2>
        <div className="mb-12 overflow-hidden rounded-2xl border border-white/8">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8 bg-white/5">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-gray-500">Criterion</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-blue-400">Landing page</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-emerald-400">Site vitrine</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE.map((row, i) => (
                <tr key={row.topic} className={`border-b border-white/5 ${i % 2 === 0 ? "bg-transparent" : "bg-white/2"}`}>
                  <td className="px-4 py-3 font-medium text-gray-300">{row.topic}</td>
                  <td className="px-4 py-3 text-gray-400">{row.landing}</td>
                  <td className="px-4 py-3 text-gray-400">{row.vitrine}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">Choose a landing page if…</h2>
        <div className="mb-10 space-y-3">
          {LANDING_CASES.map((item) => (
            <div key={item} className="flex items-start gap-3 rounded-xl border border-blue-500/15 bg-blue-500/5 p-4">
              <FiCheck size={16} className="mt-0.5 shrink-0 text-blue-400" />
              <span className="text-sm text-gray-300">{item}</span>
            </div>
          ))}
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">Choose a showcase site if…</h2>
        <div className="mb-10 space-y-3">
          {VITRINE_CASES.map((item) => (
            <div key={item} className="flex items-start gap-3 rounded-xl border border-emerald-500/15 bg-emerald-500/5 p-4">
              <FiCheck size={16} className="mt-0.5 shrink-0 text-emerald-400" />
              <span className="text-sm text-gray-300">{item}</span>
            </div>
          ))}
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">The best strategy: both</h2>
        <p className="mb-10 text-gray-400 leading-relaxed">
          The showcase site builds your presence and your organic ranking. Landing pages maximise your conversions on marketing campaigns. They are not alternatives — they are complementary tools. Start with the showcase site to establish your credibility, then add landing pages when you run campaigns.
        </p>

        <h2 className="mb-6 text-2xl font-bold text-white">Frequently asked questions</h2>
        <div className="mb-12 space-y-4">
          {faqJsonLd.mainEntity.map((f) => (
            <div key={f.name} className="rounded-xl border border-white/8 bg-gray-900/50 p-5">
              <h3 className="mb-2 font-semibold text-white">{f.name}</h3>
              <p className="text-sm text-gray-400">{f.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-blue-600/10 p-8 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Landing page or showcase site — we advise you for free</h2>
          <p className="mb-6 text-gray-400">Reply within 24h · Custom quote · No commitment</p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/en/devis" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-blue-600 px-8 py-3.5 font-bold text-white shadow-lg transition hover:shadow-emerald-500/30">
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


