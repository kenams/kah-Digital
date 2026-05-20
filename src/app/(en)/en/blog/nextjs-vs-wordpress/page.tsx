import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { FiArrowRight, FiCheck } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Next.js vs WordPress in 2025: Which Is Actually Better for Your Business? — KAH Digital",
  description: "WordPress powers 40% of the web. Next.js powers the fastest-growing startups. Here's an honest comparison for business owners who need to make the right choice.",
  keywords: ["Next.js vs WordPress", "Next.js for business", "WordPress alternative 2025", "best website platform 2025"],
  alternates: { canonical: "https://kah-digital.ch/en/blog/nextjs-vs-wordpress" },
  openGraph: {
    title: "Next.js vs WordPress in 2025: Which Is Actually Better for Your Business?",
    description: "WordPress powers 40% of the web. Next.js powers the fastest-growing startups. Here's an honest comparison for business owners who need to make the right choice.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Next.js vs WordPress in 2025: Which Is Actually Better for Your Business?",
  "datePublished": "2026-05-20",
  "dateModified": "2026-05-20",
  "author": { "@type": "Organization", "name": "KAH Digital" },
  "publisher": { "@type": "Organization", "name": "KAH Digital", "url": "https://kah-digital.ch" },
  "mainEntityOfPage": "https://kah-digital.ch/en/blog/nextjs-vs-wordpress",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is Next.js better than WordPress for SEO?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Next.js typically scores higher on Core Web Vitals (Lighthouse 90–100 vs WordPress average 40–65), which directly impacts Google rankings since 2021. Static generation and server-side rendering give Next.js a structural SEO advantage for performance-sensitive rankings."
      }
    },
    {
      "@type": "Question",
      "name": "Is Next.js more expensive than WordPress?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Initial development costs more with Next.js. But total cost of ownership over 3 years is often lower: no plugin licenses (€500–2,000/year for WP), no security updates, no performance degradation from plugin bloat, and no developer dependency for basic content changes."
      }
    },
    {
      "@type": "Question",
      "name": "Can non-technical users manage a Next.js site?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, when combined with a headless CMS like Sanity, Contentful, or Notion. Non-technical users manage content in a friendly interface; the Next.js site renders it automatically. This is actually cleaner than WordPress because content and presentation are separated."
      }
    },
  ],
};

const comparisonData = [
  { criterion: "Lighthouse score", nextjs: "90–100", wordpress: "40–65", winner: "nextjs" },
  { criterion: "Security vulnerabilities", nextjs: "Very low (no plugins)", wordpress: "High (52% of CMS hacks)", winner: "nextjs" },
  { criterion: "3-year TCO (SMB)", nextjs: "€1,500–3,000 fixed", wordpress: "€3,000–8,000 cumulative", winner: "nextjs" },
  { criterion: "Content team UX", nextjs: "Good (with headless CMS)", wordpress: "Excellent (native)", winner: "wordpress" },
  { criterion: "Plugin ecosystem", nextjs: "npm (unlimited)", wordpress: "60,000+ WP plugins", winner: "wordpress" },
];

const wpCosts = [
  { item: "Premium theme", cost: "€60–200/year" },
  { item: "Essential plugins (SEO, cache, security, forms)", cost: "€300–800/year" },
  { item: "Managed WordPress hosting", cost: "€200–600/year" },
  { item: "Developer hourly (updates, fixes, hacks)", cost: "€500–2,000/year" },
  { item: "Security cleanup after breach", cost: "€500–5,000 (one-time)" },
];

const nextjsCosts = [
  { item: "Initial development (fixed price)", cost: "€1,500–4,000 one-time" },
  { item: "Vercel hosting", cost: "€0–20/month" },
  { item: "Domain", cost: "€15–30/year" },
  { item: "Content updates (self-serve or dev)", cost: "€0 (CMS) or €50–150/update" },
];

export default function NextjsVsWordpressPage() {
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
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">Technology</span>
            <span className="text-xs text-gray-600">May 20, 2026 · 9 min read</span>
          </div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Next.js vs WordPress in 2025: Which Is Actually Better for Your Business?
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            WordPress powers 43% of the web. Next.js powers Vercel, TikTok, and thousands of high-growth startups. The choice between them isn't about which is technically superior — it's about which fits your business model, team, and growth trajectory.
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 pb-24">

        {/* TL;DR */}
        <div className="mb-10 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
          <p className="text-sm leading-relaxed text-emerald-200">
            <strong>Short answer:</strong> Next.js wins on performance, security, and long-term cost. WordPress wins on content team UX and ecosystem breadth. For performance-critical businesses and lead-generation sites, Next.js is the stronger choice in 2025.
          </p>
        </div>

        {/* Section 1 */}
        <section className="py-8">
          <h2 className="mb-4 text-2xl font-extrabold text-white">Why this comparison matters in 2025</h2>
          <p className="mb-4 text-gray-300 leading-relaxed">
            For most of the 2010s, WordPress was the default answer for business websites. It was accessible, affordable, and had an ecosystem for every need. That calculus has shifted.
          </p>
          <p className="mb-4 text-gray-300 leading-relaxed">
            Google's Core Web Vitals update (2021) made page performance a direct ranking factor. WordPress sites — weighed down by plugin overhead, shared hosting, and legacy theme architectures — began underperforming in organic search. Meanwhile, JAMstack frameworks like Next.js produced consistently high Lighthouse scores out of the box.
          </p>
          <p className="mb-4 text-gray-300 leading-relaxed">
            Security became a more acute concern. WordPress accounts for approximately 96% of CMS-related website hacks, largely due to outdated plugins and themes. A single unpatched plugin can expose your entire site and database.
          </p>
          <p className="text-gray-300 leading-relaxed">
            The cost picture also changed. Managed WordPress hosting, essential plugin subscriptions, and developer hours for ongoing maintenance have made WordPress materially more expensive over a 3-year horizon than it appears at launch. These are the real dynamics driving the Next.js migration trend.
          </p>
        </section>

        {/* Section 2 — Speed */}
        <section className="py-8">
          <h2 className="mb-4 text-2xl font-extrabold text-white">Speed: the numbers don't lie</h2>
          <p className="mb-4 text-gray-300 leading-relaxed">
            Next.js generates static HTML at build time (or serves server-rendered pages with edge caching). There's no PHP execution, no database query, no plugin loading chain on each request. The result is structurally faster delivery.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 mb-6">
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5">
              <p className="text-xs text-emerald-400 font-semibold mb-1 uppercase tracking-wide">Next.js</p>
              <p className="text-4xl font-black text-white mb-1">95+</p>
              <p className="text-xs text-gray-400">Average Lighthouse score (PageSpeed Insights)</p>
            </div>
            <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5">
              <p className="text-xs text-red-400 font-semibold mb-1 uppercase tracking-wide">WordPress average</p>
              <p className="text-4xl font-black text-white mb-1">40–65</p>
              <p className="text-xs text-gray-400">Typical score with standard theme + plugins</p>
            </div>
          </div>
          <p className="mb-4 text-gray-300 leading-relaxed">
            The gap widens further on mobile. WordPress sites on shared hosting regularly score below 40 on mobile Lighthouse, which directly translates to lower mobile rankings and higher bounce rates.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Google's own data: a 1-second improvement in page load increases mobile conversions by 27%. For businesses spending on paid traffic, a slow WordPress site is burning ad budget on visitors who leave before the page finishes loading.
          </p>
        </section>

        {/* Section 3 — SEO */}
        <section className="py-8">
          <h2 className="mb-4 text-2xl font-extrabold text-white">SEO: which platform ranks better?</h2>
          <p className="mb-4 text-gray-300 leading-relaxed">
            WordPress has dominated SEO discussions for years — partly because of the Yoast plugin ecosystem, and partly because most SEO guides were written before Core Web Vitals became a ranking factor.
          </p>
          <p className="mb-4 text-gray-300 leading-relaxed">
            The on-page SEO capabilities (meta tags, sitemaps, schema markup, open graph) are equivalent between the two platforms. The difference is in technical performance signals:
          </p>
          <ul className="space-y-3 mb-4">
            {[
              { title: "TTFB (Time to First Byte)", detail: "Next.js with Vercel edge network delivers TTFB under 200ms globally. WordPress on standard hosting averages 400–800ms, directly impacting crawl budget and rankings." },
              { title: "Core Web Vitals (LCP, CLS, FID)", detail: "Static Next.js pages consistently pass all three Core Web Vitals. Most WordPress sites with plugin-heavy setups fail on LCP and CLS." },
              { title: "Server-side rendering for dynamic content", detail: "Next.js allows per-page rendering strategy. SEO-critical pages can be fully pre-rendered; dynamic pages use SSR or ISR. WordPress has no equivalent fine-grained control." },
            ].map((item) => (
              <li key={item.title} className="flex gap-3 text-sm leading-relaxed">
                <FiCheck size={14} className="mt-0.5 shrink-0 text-emerald-400" />
                <span className="text-gray-300"><strong className="text-white">{item.title}:</strong> {item.detail}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Section 4 — TCO */}
        <section className="py-8">
          <h2 className="mb-4 text-2xl font-extrabold text-white">Total cost of ownership: 3-year comparison</h2>
          <p className="mb-6 text-gray-300 leading-relaxed">
            WordPress appears cheaper at first glance. The reality over 3 years tells a different story for most SMBs:
          </p>
          <div className="grid gap-6 sm:grid-cols-2 mb-4">
            <div>
              <p className="text-sm font-bold text-white mb-3 border-b border-white/10 pb-2">WordPress — 3-year costs</p>
              <div className="space-y-2">
                {wpCosts.map((item) => (
                  <div key={item.item} className="flex justify-between text-xs gap-2">
                    <span className="text-gray-400">{item.item}</span>
                    <span className="text-red-300 font-medium shrink-0">{item.cost}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-2 border-t border-white/10 flex justify-between text-sm">
                <span className="text-gray-300 font-semibold">3-year total</span>
                <span className="text-red-300 font-black">€5,000–15,000+</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-white mb-3 border-b border-white/10 pb-2">Next.js — 3-year costs</p>
              <div className="space-y-2">
                {nextjsCosts.map((item) => (
                  <div key={item.item} className="flex justify-between text-xs gap-2">
                    <span className="text-gray-400">{item.item}</span>
                    <span className="text-emerald-300 font-medium shrink-0">{item.cost}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-2 border-t border-white/10 flex justify-between text-sm">
                <span className="text-gray-300 font-semibold">3-year total</span>
                <span className="text-emerald-300 font-black">€2,000–5,000</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500">Note: costs vary significantly by project size and team. WordPress costs escalate with traffic, plugin count, and breach events.</p>
        </section>

        {/* Section 5 — Comparison grid */}
        <section className="py-8">
          <h2 className="mb-6 text-2xl font-extrabold text-white">Side-by-side comparison</h2>
          <div className="rounded-2xl border border-white/8 bg-gray-900 overflow-hidden">
            <div className="grid grid-cols-3 gap-4 px-5 py-3 bg-gray-800/50 text-xs font-semibold text-gray-400 uppercase tracking-wide">
              <span>Criterion</span>
              <span className="text-emerald-400">Next.js</span>
              <span className="text-orange-400">WordPress</span>
            </div>
            {comparisonData.map((row, i) => (
              <div key={row.criterion} className={`grid grid-cols-3 gap-4 px-5 py-4 text-sm ${i % 2 === 0 ? "bg-gray-900" : "bg-gray-900/50"}`}>
                <span className="font-medium text-white">{row.criterion}</span>
                <span className={`${row.winner === "nextjs" ? "text-emerald-400 font-semibold" : "text-gray-400"}`}>{row.nextjs}</span>
                <span className={`${row.winner === "wordpress" ? "text-emerald-400 font-semibold" : "text-gray-400"}`}>{row.wordpress}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6 — When WP makes sense */}
        <section className="py-8">
          <h2 className="mb-4 text-2xl font-extrabold text-white">When WordPress still makes sense</h2>
          <p className="mb-4 text-gray-300 leading-relaxed">
            WordPress isn't obsolete. For specific use cases, it remains the practical choice:
          </p>
          <ul className="space-y-3 mb-4">
            {[
              "Large content teams who need non-technical editors to publish daily — the WordPress editor is hard to beat for pure content management.",
              "Sites requiring a large WooCommerce-based e-commerce setup with established plugin workflows.",
              "Organizations with an existing WordPress development team and institutional knowledge.",
              "Niche industry verticals with WordPress-specific tools (real estate, events, directories) that don't exist elsewhere.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed">
                <span className="mt-0.5 shrink-0 h-1.5 w-1.5 rounded-full bg-orange-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Section 7 — When Next.js */}
        <section className="py-8">
          <h2 className="mb-4 text-2xl font-extrabold text-white">When to choose Next.js</h2>
          <p className="mb-4 text-gray-300 leading-relaxed">
            Next.js is the superior choice when performance, SEO, scalability, or custom functionality are business priorities:
          </p>
          <ul className="space-y-3">
            {[
              "Lead generation sites where conversion rate and organic traffic are primary business metrics.",
              "SaaS products, dashboards, or platforms with authenticated user flows.",
              "Businesses investing in paid traffic — slow landing pages destroy Google Ads Quality Scores.",
              "Startups that need to scale without re-platforming — Next.js handles from 100 to 10M visits with the same architecture.",
              "Companies that want to own their technology stack without plugin vendor dependency.",
              "Any project where AI features, APIs, or custom backend logic need to be integrated cleanly.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed">
                <FiCheck size={14} className="mt-0.5 shrink-0 text-emerald-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
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
        <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-blue-600/10 p-8 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Get a free quote for a Next.js site</h2>
          <p className="mb-6 text-gray-400">Fixed price · Delivered in 2–4 weeks · Full code ownership · Hosted on Vercel</p>
          <Link
            href="/en/devis"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-8 py-3.5 font-bold text-white shadow-lg transition hover:shadow-blue-500/30"
          >
            Get my quote <FiArrowRight size={15} />
          </Link>
        </div>
      </article>
    </div>
  );
}
