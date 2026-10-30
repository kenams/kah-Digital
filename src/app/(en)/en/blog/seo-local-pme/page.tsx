import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { FiArrowRight, FiCheck, FiMessageCircle } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Local SEO for small businesses: reaching Google's first page in 2026",
  description:
    "A complete local SEO guide for small businesses: Google Business Profile, customer reviews, local pages, schema markup. The concrete actions that help local customers find you.",
  keywords: [
    "seo local pme",
    "local business SEO",
    "google my business optimisation",
    "seo local 2026",
    "how to appear on local Google results",
    "local SEO for tradespeople",
  ],
  alternates: { canonical: "https://kah-digital.ch/en/blog/seo-local-pme" },
  openGraph: {
    title: "Local SEO for small businesses: reaching Google's first page in 2026",
    description:
      "The concrete actions that help your local customers find you on Google — without an expensive SEO agency.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Local SEO for small businesses: reaching Google's first page in 2026",
  datePublished: "2026-05-04",
  dateModified: "2026-05-04",
  author: { "@type": "Organization", name: "KAH Digital Studio" },
  publisher: { "@type": "Organization", name: "KAH Digital Studio", url: "https://kah-digital.ch" },
  mainEntityOfPage: "https://kah-digital.ch/en/blog/seo-local-pme",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is local SEO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Local SEO covers all the techniques that let a business appear in Google results for location-based searches — for example ‘plumber Paris’ or ‘restaurant Lyon centre’.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to appear in local Google results?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "With a well-completed Google Business Profile and an optimised page, first results appear in 4 to 8 weeks. A stable position in the Local Pack takes 3 to 6 months depending on competition.",
      },
    },
    {
      "@type": "Question",
      name: "Is Google Business Profile enough for local SEO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Google Business Profile is essential but not enough on its own. Pair it with an optimised website (title/h1 tags with city + trade, LocalBusiness schema, city-specific pages) and regular customer reviews.",
      },
    },
    {
      "@type": "Question",
      name: "How is local SEO priced for a small business?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Setting up a solid local SEO base (optimised page, schema, Google Business Profile) is priced after scoping, depending on local competition, the cities targeted and the level of follow-up wanted. KAH Digital Studio builds local SEO directly into site creation.",
      },
    },
  ],
};

const ACTIONS = [
  {
    step: "01",
    title: "Google Business Profile — the mandatory foundation",
    content: `It is your shop window on Google Maps and in the Local Pack (the 3 results with a map at the top of the results). If you do not have one yet, it is the first action to take.

**What to do:**
- Create or claim your listing on business.google.com
- Fill in 100% of the information: opening hours, phone, website, primary and secondary categories
- Add 10+ recent photos (front, interior, team, your work)
- Reply to ALL reviews (positive and negative) — Google measures it
- Publish a Google Post every 2 weeks (news, offer, event)

**Why it is critical:** 46% of Google searches have local intent. Not being on Google Maps means being invisible to half of your potential customers.`,
  },
  {
    step: "02",
    title: "Your website — the optimised local page",
    content: `Google Business Profile alone is not enough. You need a website that reinforces your local credibility. The signals Google reads:

**Title tag:** \`[Trade] [City] — [Company name]\`
Example: "Plumber Lyon 3 — Dupont Plomberie"

**H1:** same logic as the title, with the main keyword

**Page content:**
- Mention your city and neighbourhood naturally in the text
- Include your full address (schema.org LocalBusiness)
- Embed Google Maps on your contact page
- Mention well-known places nearby ("2 minutes from Part-Dieu station")

**URL:** \`/plombier-lyon\` or \`/plombier-lyon-3\` if you target a district.`,
  },
  {
    step: "03",
    title: "Schema.org LocalBusiness — the code Google reads",
    content: `The LocalBusiness schema is JSON-LD markup that you add in the \`<head>\` of your pages. Google reads it directly and uses it for the Knowledge Panel and the Local Pack.

**Minimal example:**
\`\`\`json
{
  "@type": "LocalBusiness",
  "name": "Dupont Plomberie",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "12 rue de la Paix",
    "addressLocality": "Lyon",
    "postalCode": "69003",
    "addressCountry": "FR"
  },
  "telephone": "+33600000000",
  "openingHours": "Mo-Fr 08:00-18:00",
  "url": "https://dupont-plomberie.fr"
}
\`\`\`

Also add \`"geo"\` with latitude/longitude to strengthen the geographic signal.`,
  },
  {
    step: "04",
    title: "Customer reviews — the engine of the Local Pack",
    content: `Google ranks businesses in the Local Pack on 3 criteria: relevance, distance and prominence. Reviews are the main prominence signal.

**A simple strategy:**
- After every successful job, send an SMS/email with the direct link to your Google listing
- Goal: 1 new review per week
- Reply to every review within 24h (including negative ones, calmly)
- Never buy fake reviews — Google detects them and can remove your listing

**Typical impact:** going from 10 to 30 five-star reviews generally improves Local Pack visibility noticeably, depending on the sector.`,
  },
  {
    step: "05",
    title: "Local citations — NAP consistency everywhere",
    content: `NAP = Name, Address, Phone. Google checks that this information is identical everywhere on the web. An inconsistency penalises your local ranking.

**Where to check:**
- Pages Jaunes / 118000
- Yelp / TripAdvisor
- Kompass, Foursquare
- Sector directories (Doctolib, La Fourchette, Houzz...)
- Your LinkedIn, Facebook and Instagram profiles

**Action:** audit your citations with BrightLocal (paid) or by searching for your phone number on Google.`,
  },
  {
    step: "06",
    title: "Local content — articles and service pages per city",
    content: `If you cover several cities or districts, create a dedicated page per geographic area. No copy-paste — each page must have unique content.

**A winning structure per page:**
- H1: [Service] [City]
- Introduction mentioning the geographic area
- List of your jobs in that area
- A testimonial from a local customer (name, city)
- Local FAQ ("What is the response time in [City]?")
- LocalBusiness schema with the local address

**Local blog:** "Our last 3 jobs in Lyon 6" or "Why our Bordeaux customers recommend us" — fresh content, a fresh signal for Google.`,
  },
];

export default function EnSeoLocalPmePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Script id="ld-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Script id="ld-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/6 pt-16 pb-12">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="relative mx-auto max-w-3xl px-4">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <Link href="/en/blog" className="text-xs text-gray-500 transition hover:text-gray-400">
              ? Blog
            </Link>
            <span className="text-xs text-gray-600">·</span>
            <span className="rounded-full bg-emerald-500/10 px-3 py-0.5 text-xs font-semibold text-emerald-400">SEO Local</span>
            <span className="text-xs text-gray-600">4 May 2026</span>
          </div>
          <h1 className="mb-4 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Local SEO for small businesses: reaching Google's first page in 2026
          </h1>
          <p className="mb-6 text-lg text-gray-400 leading-relaxed">
            46% of Google searches have local intent. If your business does not appear in the Local Pack (the 3 results with a map), you lose half of your potential customers. Here are the 6 concrete actions to fix that.
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <span>KAH Digital Studio</span>
            <span>·</span>
            <span>8 min read</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="mx-auto max-w-3xl px-4 py-16 space-y-14">
        {/* Intro */}
        <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6">
          <p className="text-sm font-semibold text-blue-400 mb-2">What you will learn in this article</p>
          <ul className="space-y-1.5">
            {[
              "How to optimise your Google Business Profile for the Local Pack",
              "The essential SEO tags on your website",
              "LocalBusiness schema — the markup Google reads first",
              "The review strategy that makes your visibility soar",
              "Local citations: the NAP consistency that makes the difference",
              "Local pages and content to dominate several areas",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-gray-300">
                <FiCheck size={14} className="mt-0.5 shrink-0 text-blue-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        {ACTIONS.map((action) => (
          <section key={action.step} className="scroll-mt-20">
            <div className="mb-4 flex items-center gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-violet-600 text-sm font-black text-white">
                {action.step}
              </span>
              <h2 className="text-xl font-bold text-white">{action.title}</h2>
            </div>
            <div className="prose prose-invert prose-sm max-w-none pl-14 text-gray-300 leading-relaxed [&_strong]:text-white [&_code]:rounded [&_code]:bg-gray-800 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-xs [&_code]:text-blue-300 [&_pre]:rounded-xl [&_pre]:bg-gray-900 [&_pre]:p-4 [&_pre]:text-xs [&_pre]:leading-loose">
              {action.content.split("\n").map((line, i) => {
                if (line.startsWith("**") && line.endsWith("**")) {
                  return <p key={i} className="font-semibold text-white mt-4 mb-1">{line.slice(2, -2)}</p>;
                }
                if (line.startsWith("- ")) {
                  return <li key={i} className="ml-4 list-disc text-gray-400">{line.slice(2)}</li>;
                }
                if (line.startsWith("```")) {
                  return null;
                }
                if (line.trim() === "") return <br key={i} />;
                return <p key={i}>{line}</p>;
              })}
            </div>
          </section>
        ))}

        {/* FAQ */}
        <section>
          <h2 className="mb-6 text-2xl font-bold text-white">Frequently asked questions</h2>
          <div className="space-y-4">
            {faqJsonLd.mainEntity.map((faq) => (
              <details key={faq.name} className="group rounded-xl border border-white/8 bg-gray-900/50 p-5">
                <summary className="cursor-pointer list-none font-semibold text-white group-open:text-blue-400">
                  {faq.name}
                </summary>
                <p className="mt-3 text-sm text-gray-400 leading-relaxed">{faq.acceptedAnswer.text}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA inline */}
        <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 to-violet-600/10 p-8 text-center">
          <h3 className="mb-3 text-xl font-bold text-white">
            Is your site well optimised for local SEO?
          </h3>
          <p className="mb-6 text-sm text-gray-400">
            We analyse your site for free: local SEO score, problems detected, priority actions.
            Results by email within 24h.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/en/audit-gratuit"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3 font-bold text-white shadow-lg shadow-blue-500/25 transition hover:opacity-90"
            >
              Get my free audit <FiArrowRight size={15} />
            </Link>
            <a
              href="https://wa.me/33759558414?text=Bonjour%2C%20j'ai%20lu%20l'article%20SEO%20local%20et%20j'aimerais%20analyser%20mon%20site."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              <FiMessageCircle size={15} /> Talk about it on WhatsApp
            </a>
          </div>
        </div>

        {/* Conclusion */}
        <section>
          <h2 className="mb-4 text-2xl font-bold text-white">Key takeaways</h2>
          <p className="mb-4 text-gray-400 leading-relaxed">
            Local SEO is not rocket science, but it takes consistency. Businesses that dominate the Local Pack in their sector all do the same things: a complete Google profile, regular reviews, a clean technical site and unique local content.
          </p>
          <p className="text-gray-400 leading-relaxed">
            The good news: most of your competitors do none of this. Start with Google Business Profile and one optimised web page — that is 80% of the result for 20% of the effort.
          </p>
        </section>

        {/* Related articles */}
        <section className="border-t border-white/6 pt-10">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-500">Related articles</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { href: "/blog/creation-site-web-pme", label: "Creating a website for a small business in 2026" },
              { href: "/blog/prix-site-web-professionnel", label: "How to estimate a website cost?" },
              { href: "/blog/refonte-site-web", label: "Website redesign: when and how?" },
              { href: "/blog/site-web-artisan", label: "A website for tradespeople: the 2026 guide" },
            ].map((article) => (
              <Link
                key={article.href}
                href={article.href}
                className="flex items-center gap-2 rounded-xl border border-white/8 bg-gray-900/50 px-4 py-3 text-sm font-semibold text-gray-300 transition hover:border-white/20 hover:text-white"
              >
                <FiArrowRight size={13} className="shrink-0 text-gray-500" />
                {article.label}
              </Link>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}


