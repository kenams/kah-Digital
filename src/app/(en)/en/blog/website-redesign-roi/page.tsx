import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { FiArrowRight, FiCheck } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Website Redesign ROI: What to Realistically Expect (With Real Numbers) — KAH Digital",
  description: "A website redesign costs money. Here's what it should return — conversion rate benchmarks, load time impact, and how to measure ROI in 90 days.",
  keywords: ["website redesign ROI", "website redesign results", "how much does a website redesign cost", "website conversion rate improvement"],
  alternates: { canonical: "https://kah-digital.ch/en/blog/website-redesign-roi" },
  openGraph: {
    title: "Website Redesign ROI: What to Realistically Expect (With Real Numbers)",
    description: "A website redesign costs money. Here's what it should return — conversion rate benchmarks, load time impact, and how to measure ROI in 90 days.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Website Redesign ROI: What to Realistically Expect (With Real Numbers)",
  "datePublished": "2026-05-20",
  "dateModified": "2026-05-20",
  "author": { "@type": "Organization", "name": "KAH Digital" },
  "publisher": { "@type": "Organization", "name": "KAH Digital", "url": "https://kah-digital.ch" },
  "mainEntityOfPage": "https://kah-digital.ch/en/blog/website-redesign-roi",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How long does it take to see ROI from a website redesign?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Speed and UX improvements are immediate. Conversion rate gains appear within the first month. SEO improvements typically take 3–6 months to materialize in organic traffic. Full ROI payback for a €1,000–€3,000 redesign is typically reached within 6–12 months."
      }
    },
    {
      "@type": "Question",
      "name": "What conversion rate improvement can I expect from a redesign?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Industry benchmarks show a 20–50% improvement in conversion rate after a professional redesign focused on UX, speed, and CTA architecture. The exact gain depends on your starting point — sites with severe UX issues see the largest gains."
      }
    },
    {
      "@type": "Question",
      "name": "How do I calculate my website redesign ROI?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Formula: ROI = [(additional monthly leads × average deal value × 12) − redesign cost] / redesign cost × 100. Example: 5 extra leads/month × €500 deal value × 12 months = €30,000 additional revenue on a €1,500 redesign = 1,900% ROI."
      }
    },
  ],
};

const benchmarks = [
  { metric: "Bounce rate", before: "65–80%", after: "30–45%", change: "−35%" },
  { metric: "Conversion rate", before: "0.8–1.2%", after: "2–3%", change: "+40–150%" },
  { metric: "Page load time", before: "4–7s", after: "1–2s", change: "3× faster" },
  { metric: "Mobile sessions", before: "40%", after: "60%+", change: "+50% usability" },
  { metric: "Organic traffic", before: "baseline", after: "+25–60%", change: "3–6 months" },
];

const whatToInclude = [
  { title: "Performance engineering", detail: "Core Web Vitals score 90+, lazy loading, next-gen image formats, CDN. Speed is the single highest-ROI improvement you can make — 1s faster = +7% conversion on average." },
  { title: "Conversion architecture", detail: "Every page should have one clear goal and one clear CTA. Remove friction: fewer form fields, clearer value proposition above the fold, trust signals (reviews, logos, certifications) near CTAs." },
  { title: "Mobile-first UX", detail: "50–70% of your visitors are on mobile. If the mobile experience requires pinching, scrolling horizontally, or tapping tiny buttons — you're losing leads before they read your offer." },
  { title: "Technical SEO", detail: "Proper heading hierarchy, meta tags, schema markup, internal linking, and sitemap structure. A redesign is the best time to fix the foundations that Google ranks on." },
  { title: "Analytics baseline", detail: "Install tracking before launch so you have a real before/after. Google Analytics 4, heatmaps (Hotjar or Microsoft Clarity), and conversion event tracking are minimum requirements." },
];

const timeline = [
  { phase: "Day 1 — Launch", results: "Speed and mobile UX improvements are immediate. Users notice, bounce rates drop right away." },
  { phase: "Week 1–4", results: "Conversion rates improve as clearer CTAs and better UX funnel visitors more effectively. First contact form / call increase visible." },
  { phase: "Month 1–3", results: "Google begins re-crawling and reindexing. Core Web Vitals improvements start to influence rankings. Traffic edges up." },
  { phase: "Month 3–6", results: "Organic traffic gains compound. If content was improved, new keyword rankings appear. ROI calculation starts to look attractive." },
  { phase: "Month 6–12", results: "Full ROI realization. A properly designed site compounds — improving rankings, referrals, and direct traffic simultaneously." },
];

export default function WebsiteRedesignROIPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Script id="ld-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Script id="ld-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-12">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="relative mx-auto max-w-3xl px-4">
          <Link href="/en/blog" className="mb-6 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-300">
            ← Blog
          </Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-400">Conversion</span>
            <span className="text-xs text-gray-600">May 20, 2026 · 7 min read</span>
          </div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Website Redesign ROI: What to Realistically Expect (With Real Numbers)
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            A website redesign is an investment. Like any investment, it should produce a measurable return. Here's how to calculate it, what improvements to expect, and when results appear — with real benchmarks.
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 pb-24">

        {/* TL;DR */}
        <div className="mb-10 rounded-2xl border border-violet-500/20 bg-violet-500/5 p-5">
          <p className="text-sm leading-relaxed text-violet-200">
            <strong>Bottom line:</strong> A professional redesign typically improves conversion rate by 20–50%, cuts bounce rate by 30%, and triples load speed. For most SMBs, full ROI is reached within 6–12 months.
          </p>
        </div>

        {/* Section 1 */}
        <section className="py-8">
          <h2 className="mb-4 text-2xl font-extrabold text-white">The real cost of not redesigning</h2>
          <p className="mb-4 text-gray-300 leading-relaxed">
            Most business owners evaluate redesign cost against the agency invoice. The more relevant comparison is redesign cost against the revenue currently being lost by the existing site.
          </p>
          <p className="mb-4 text-gray-300 leading-relaxed">
            A site with a 3% conversion rate and 1,000 monthly visitors generates 30 leads. The same site, redesigned to 5% conversion, generates 50 leads — 20 additional opportunities per month with zero increase in ad spend. If your average deal value is €500, that's €10,000 in additional pipeline monthly.
          </p>
          <p className="mb-4 text-gray-300 leading-relaxed">
            Beyond conversion, there are compounding costs to an outdated site:
          </p>
          <ul className="space-y-3 mb-4">
            {[
              "Google penalizes slow, mobile-unfriendly sites in rankings — meaning you pay more for the same organic position over time.",
              "Visitors form a quality judgment about your business in under 0.05 seconds. An outdated site signals an outdated company — especially in B2B.",
              "Security vulnerabilities in unpatched WordPress sites generate breach risk, downtime, and clean-up costs that far exceed maintenance budgets.",
              "A slow site increases paid traffic CPL — Google Ads Quality Score is partially based on landing page experience.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed">
                <span className="mt-0.5 shrink-0 h-1.5 w-1.5 rounded-full bg-red-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Section 2 — Benchmarks */}
        <section className="py-8">
          <h2 className="mb-4 text-2xl font-extrabold text-white">Benchmark: before and after a redesign</h2>
          <p className="mb-6 text-gray-300 leading-relaxed">
            These ranges are based on observed improvements across SMB and service business redesigns. Results vary by industry and starting quality, but the directional pattern is consistent.
          </p>
          <div className="rounded-2xl border border-white/8 bg-gray-900 overflow-hidden mb-4">
            {/* Header */}
            <div className="grid grid-cols-4 gap-4 px-5 py-3 bg-gray-800/50 text-xs font-semibold text-gray-400 uppercase tracking-wide">
              <span>Metric</span>
              <span>Before</span>
              <span>After</span>
              <span className="text-emerald-400">Change</span>
            </div>
            {benchmarks.map((row, i) => (
              <div key={row.metric} className={`grid grid-cols-4 gap-4 px-5 py-4 text-sm ${i % 2 === 0 ? "bg-gray-900" : "bg-gray-900/50"}`}>
                <span className="font-medium text-white">{row.metric}</span>
                <span className="text-gray-400">{row.before}</span>
                <span className="text-gray-400">{row.after}</span>
                <span className="font-bold text-emerald-400">{row.change}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500">Sources: Google/SOASTA research on speed and conversion, HubSpot conversion benchmarks, SEMrush Core Web Vitals study.</p>
        </section>

        {/* Section 3 — ROI formula */}
        <section className="py-8">
          <h2 className="mb-4 text-2xl font-extrabold text-white">How to calculate your website redesign ROI</h2>
          <p className="mb-4 text-gray-300 leading-relaxed">
            Use this formula before you commission a redesign, then again 90 days post-launch to validate the investment:
          </p>
          <div className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-6 mb-6">
            <p className="text-center text-sm text-violet-200 font-mono leading-relaxed">
              ROI = [(additional monthly leads × average deal value × 12) − redesign cost] ÷ redesign cost × 100
            </p>
          </div>
          <p className="mb-4 text-gray-300 leading-relaxed font-semibold">Example calculation:</p>
          <div className="rounded-xl border border-white/8 bg-gray-900/60 p-5 mb-4 space-y-2">
            {[
              ["Current monthly leads", "10"],
              ["Expected leads after redesign (+40%)", "14"],
              ["Additional leads per month", "4"],
              ["Average deal value", "€800"],
              ["Additional annual revenue", "€38,400"],
              ["Redesign cost", "€1,500"],
              ["ROI", "2,460%"],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-gray-400">{label}</span>
                <span className={label === "ROI" ? "font-black text-emerald-400 text-base" : "text-white font-medium"}>{value}</span>
              </div>
            ))}
          </div>
          <p className="text-gray-300 leading-relaxed text-sm">
            Even with conservative assumptions (only 40% conversion improvement, only 4 extra leads/month), the math makes a professional redesign one of the highest-ROI marketing investments available to SMBs.
          </p>
        </section>

        {/* Section 4 — What to include */}
        <section className="py-8">
          <h2 className="mb-4 text-2xl font-extrabold text-white">What a redesign must include to generate ROI</h2>
          <p className="mb-6 text-gray-300 leading-relaxed">
            Not every redesign generates ROI. A "cosmetic" redesign — new colors, new fonts, same structure — rarely moves metrics. ROI comes from redesigns that address the actual drivers of conversion and organic visibility.
          </p>
          <div className="space-y-4">
            {whatToInclude.map((item) => (
              <div key={item.title} className="flex gap-4 rounded-xl border border-white/8 bg-gray-900/60 p-5">
                <FiCheck size={16} className="mt-0.5 shrink-0 text-emerald-400" />
                <div>
                  <p className="font-bold text-white text-sm mb-1">{item.title}</p>
                  <p className="text-xs text-gray-400 leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5 — Timeline */}
        <section className="py-8">
          <h2 className="mb-4 text-2xl font-extrabold text-white">Timeline: when do results appear?</h2>
          <p className="mb-6 text-gray-300 leading-relaxed">
            Managing expectations is part of the ROI story. Speed and UX improvements are immediate. SEO gains take longer. Here's a realistic timeline:
          </p>
          <div className="space-y-3">
            {timeline.map((t, i) => (
              <div key={t.phase} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-violet-500 shrink-0 mt-1" />
                  {i < timeline.length - 1 && <div className="w-px flex-1 bg-white/10 mt-1" />}
                </div>
                <div className="pb-6">
                  <p className="font-bold text-white text-sm">{t.phase}</p>
                  <p className="text-xs text-gray-400 leading-relaxed mt-1">{t.results}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="py-8">
          <h2 className="mb-6 text-2xl font-extrabold text-white">Frequently asked questions</h2>
          <div className="space-y-4">
            {faqJsonLd.mainEntity.map((f) => (
              <div key={f.name} className="rounded-xl border border-white/8 bg-gray-900/50 p-5">
                <h3 className="mb-2 font-semibold text-white">{f.name}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{f.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-blue-600/10 p-8 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Get a free conversion audit</h2>
          <p className="mb-6 text-gray-400">We analyze your current site and identify the exact changes that would increase your conversion rate — with estimated impact. Free, in 48h.</p>
          <Link
            href="/en/devis"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-8 py-3.5 font-bold text-white shadow-lg transition hover:shadow-blue-500/30"
          >
            Get my free audit <FiArrowRight size={15} />
          </Link>
        </div>
      </article>
    </div>
  );
}
