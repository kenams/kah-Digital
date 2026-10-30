import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { FiArrowRight, FiCheck } from "react-icons/fi";

export const metadata: Metadata = {
  title: "How to estimate the cost of a professional website in 2026",
  description: "A clear method to scope a professional website: real need, scope, features, timeline, support and a custom quote.",
  keywords: ["devis site web", "devis site web professionnel", "how to estimate a website cost", "website cost estimate 2026"],
  alternates: { canonical: "https://kah-digital.ch/en/blog/prix-site-web-professionnel" },
  openGraph: {
    title: "How to estimate the cost of a professional website in 2026",
    description: "The criteria that lead to a clear, well-fitted web quote.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How to estimate the cost of a professional website in 2026",
  "datePublished": "2026-04-24",
  "dateModified": "2026-04-24",
  "author": { "@type": "Organization", "name": "KAH Digital Studio" },
  "publisher": { "@type": "Organization", "name": "KAH Digital Studio", "url": "https://kah-digital.ch" },
  "mainEntityOfPage": "https://kah-digital.ch/en/blog/prix-site-web-professionnel",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How is a landing page priced?", "acceptedAnswer": { "@type": "Answer", "text": "A simple landing page is priced after scoping, depending on design complexity and the integrations required." } },
    { "@type": "Question", "name": "What does a showcase website quote look like?", "acceptedAnswer": { "@type": "Answer", "text": "A professional showcase website is priced after scoping and delivered in 5 business days after we receive your content." } },
    { "@type": "Question", "name": "How is a corporate website priced?", "acceptedAnswer": { "@type": "Answer", "text": "A complete corporate site (5–15 pages, CMS, multilingual) is priced after scoping." } },
    { "@type": "Question", "name": "What scope for a web application?", "acceptedAnswer": { "@type": "Answer", "text": "A custom web application is priced after scoping, depending on the complexity of its features." } },
  ],
};

const TIERS = [
  { label: "Landing / Portfolio", price: "custom quote", delay: "5 days", desc: "A clear, professional page. Ideal for freelancers, coaches, a product launch or testing an idea.", included: ["Custom design", "Responsive mobile", "Contact form", "Basic SEO", "Deployment included"] },
  { label: "Site vitrine", price: "custom quote", delay: "5 business days", desc: "A complete presence for a small business or an independent. Pages: home, services, about, contact.", included: ["5 to 8 pages", "Optimised SEO", "Google Maps", "Formulaire pro", "Analytics"] },
  { label: "Site corporate", price: "custom quote", delay: "3–5 weeks", desc: "A complete site for an established company: multilingual, CMS, multiple pages, premium design.", included: ["10–20 pages", "CMS admin", "Multilingue", "Built-in blog", "Optimised performance"] },
  { label: "Application web / IA", price: "custom quote", delay: "4–10 weeks", desc: "Dashboard, SaaS, business app, AI integration. Custom full-stack development.", included: ["Auth utilisateurs", "Database", "API REST / webhooks", "AI integration", "Tests & deployment"] },
];

export default function EnPrixSiteWebPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Script id="ld-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Script id="ld-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-12">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="relative mx-auto max-w-3xl px-4">
          <Link href="/en/blog" className="mb-6 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-300">? Blog</Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">Devis</span>
            <span className="text-xs text-gray-600">24 April 2026 · 6 min read</span>
          </div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            How to estimate the cost of a professional website in 2026
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            Every project is different. A good quote does not start from a public price, but from a clear scope: goal, pages, features, level of finish, timeline and support.
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 pb-24">

        {/* Intro */}
        <div className="mb-10 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
          <p className="text-sm leading-relaxed text-amber-200">
            <strong>TL;DR :</strong> Landing page, showcase site, corporate site or application: the quote depends on the useful scope, your business priorities and your available budget, not on a rigid formula.
          </p>
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">Why do quotes vary so much?</h2>
        <p className="mb-6 text-gray-400 leading-relaxed">
          Online you find very different promises for what looks like the same result. In practice, two sites with the same number of pages can take very different effort depending on content, integrations, design, SEO and approvals.
        </p>
        <p className="mb-10 text-gray-400 leading-relaxed">
          A Wix or Squarespace site can be enough to test an idea. But as soon as you need a differentiating design, decent performance or a custom CMS, you need custom development.
        </p>

        <h2 className="mb-8 text-2xl font-bold text-white">Formats by type of project</h2>
        <div className="mb-12 grid gap-6 sm:grid-cols-2">
          {TIERS.map((t) => (
            <div key={t.label} className="rounded-2xl border border-white/8 bg-gray-900 p-6">
              <div className="mb-1 text-sm text-gray-500">{t.label}</div>
              <div className="mb-1 text-2xl font-black text-white">{t.price}</div>
              <div className="mb-3 text-xs text-gray-600">{t.delay}</div>
              <p className="mb-4 text-sm text-gray-400 leading-relaxed">{t.desc}</p>
              <div className="space-y-1.5">
                {t.included.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs text-gray-400">
                    <FiCheck size={12} className="shrink-0 text-emerald-400" /> {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">What widens the scope</h2>
        <p className="mb-4 text-gray-400 leading-relaxed">
          Several elements may call for more scoping, design or development:
        </p>
        <ul className="mb-10 space-y-3 text-gray-400 text-sm leading-relaxed">
          {[
            { title: "E-commerce", detail: "A product catalogue, payment, order management and customer follow-up call for a more structured scope." },
            { title: "Multilingue", detail: "Translating and adapting the content (3 languages) adds 20 to 35% more work." },
            { title: "Third-party integrations", detail: "CRM, booking calendar, ERP or custom APIs must be analysed before estimating." },
            { title: "Animations and micro-interactions", detail: "A heavily animated design can double front-end development time." },
            { title: "Advanced technical SEO", detail: "Audit, structured data and Core Web Vitals take serious work from the architecture stage." },
          ].map((item) => (
            <li key={item.title} className="flex items-start gap-3">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
              <span><strong className="text-white">{item.title}</strong> — {item.detail}</span>
            </li>
          ))}
        </ul>

        <h2 className="mb-6 text-2xl font-bold text-white">What simplifies the estimate</h2>
        <ul className="mb-10 space-y-3 text-gray-400 text-sm leading-relaxed">
          {[
            "Have texts ready — writing accounts for 15 to 25% of total time.",
            "Provide photos and visuals — avoids stock-photo costs.",
            "A clear brief from the start — fewer back-and-forths and less scoping time.",
            "Simple scope — a sober showcase site is scoped faster than one with complex animations.",
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

        {/* CTA */}
        <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-blue-600/10 p-8 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Get a quote for your project</h2>
          <p className="mb-6 text-gray-400">Reply within 24h · Custom quote · No commitment</p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/en/devis" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-8 py-3.5 font-bold text-white shadow-lg transition hover:shadow-blue-500/30">
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



