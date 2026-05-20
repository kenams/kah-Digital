import Link from "next/link";
import Script from "next/script";
import { FiArrowRight, FiCheck, FiClock, FiMapPin, FiMessageCircle, FiZap } from "react-icons/fi";

const WA_URL = "https://wa.me/33759558414?text=Hi%20KAH%20Digital%2C%20I%27d%20like%20to%20discuss%20a%20project.";

export type EnCity = {
  city: string;
  country: string;
  region: string;
  slug: string;
  headline: string;
  subline: string;
  intro: string;
  sectors: string[];
  proofLine: string;
  faq: Array<{ q: string; a: string }>;
};

export const EN_CITY_PAGES: Record<string, EnCity> = {
  "ai-agency-london": {
    city: "London",
    country: "United Kingdom",
    region: "England",
    slug: "ai-agency-london",
    headline: "AI Agency London",
    subline: "GPT-4 agents, AI automation & chatbots for London businesses. Measurable ROI from month one. Deployed in 10 days.",
    intro: "KAH Digital is an AI agency serving London businesses: GPT-4 agents for lead qualification, 24/7 customer support automation, CRM integrations, and custom workflows. We build AI that works in production — not demos. Based in Lausanne, remote for all of Europe and the UK. Free AI audit within 24 hours.",
    sectors: ["FinTech & InsurTech", "Consulting & Professional Services", "E-Commerce & D2C", "Real Estate & PropTech", "SaaS & Tech Startups", "Legal & Compliance"],
    proofLine: "Free AI audit · Reply within 24h · No commitment",
    faq: [
      { q: "Do you work with London businesses remotely?", a: "Yes, fully remote. We're based in Lausanne, Switzerland. The entire process — briefing, build, deploy — runs online. No London agency overhead." },
      { q: "How fast can you deploy AI automation for a London company?", a: "10 days from kickoff to live deployment. First measurable results at D+30. No 6-month workshop, no unnecessary complexity." },
      { q: "What AI use cases work best for UK businesses?", a: "Lead qualification (only hot leads reach your sales team), 24/7 customer support with clean human handoff, email automation, and CRM enrichment. We identify your top 3 highest-ROI automations in the free audit." },
      { q: "What does it cost to build an AI agent?", a: "AI chatbot add-on from £349. Full AI system (Premium AI plan) from £890 — includes website, chatbot, lead automation, and 3 months priority support." },
    ],
  },
  "web-development-london": {
    city: "London",
    country: "United Kingdom",
    region: "England",
    slug: "web-development-london",
    headline: "Web Development London",
    subline: "Premium web development for London — Next.js 15, SaaS-level design, Lighthouse 95+. Delivered in 14 days.",
    intro: "KAH Digital builds high-performance websites and web applications for London startups, agencies, and businesses. FinTech, consulting, e-commerce, SaaS — we deliver Stripe-level design with Next.js 15 at a fraction of London agency prices. Remote from Switzerland, no lock-in, 100% yours on delivery.",
    sectors: ["FinTech & Banking", "Consulting & Agencies", "SaaS & Tech Startups", "E-Commerce & Retail", "Real Estate", "Legal & Professional Services"],
    proofLine: "Reply within 24h · Fixed price · No lock-in",
    faq: [
      { q: "Why use a Swiss studio instead of a London agency?", a: "Swiss precision at a fraction of London agency rates. You talk directly to the founder — no account manager relay. Fixed price, 14-day delivery, 100% code ownership. No monthly retainers." },
      { q: "How much does a business website cost in London?", a: "Starter from £142 (landing page, 5 days). Business from £390 (up to 6 pages, SEO, 14 days). Premium AI from £890 (full system with AI chatbot). Fixed price, no surprises." },
      { q: "What's included in the Business plan?", a: "Up to 6 pages, full technical SEO, SaaS-level premium design, animations, contact form, Core Web Vitals 95+, 3 revisions, 2 months support, delivered in 14 days." },
      { q: "Do you deliver the source code?", a: "Yes, 100%. Code, domain, hosting — everything is yours on delivery. No vendor lock-in, no monthly fees, no dependency of any kind." },
    ],
  },
  "ai-agency-new-york": {
    city: "New York",
    country: "United States",
    region: "New York",
    slug: "ai-agency-new-york",
    headline: "AI Agency New York",
    subline: "GPT-4 agents, AI automation & chatbots for NYC businesses. 10-day deployment. Measurable ROI from month one.",
    intro: "KAH Digital serves New York businesses with applied AI: custom GPT-4 agents, lead qualification systems, 24/7 support automation, CRM workflows. We build AI that generates measurable results — not slide decks. Based in Lausanne, operating internationally. Free AI audit delivered within 24 hours.",
    sectors: ["FinTech & WealthTech", "Consulting & Professional Services", "E-Commerce & D2C Brands", "Real Estate & PropTech", "SaaS & B2B Tech", "Media & Content"],
    proofLine: "Free AI audit · 24h reply · No commitment",
    faq: [
      { q: "How does working with a European AI agency benefit NYC businesses?", a: "Access to Swiss-precision execution at rates well below Manhattan agency pricing. Direct founder access, no middleman, fixed price, 10-day deployment. We operate across US, Europe, and Africa." },
      { q: "What AI automations work for New York companies?", a: "Lead scoring and qualification, 24/7 customer support with clean escalation, email drip automation, CRM enrichment, document processing, appointment scheduling. We audit your workflows and identify the 3 highest-ROI automations free." },
      { q: "What does a custom GPT-4 agent cost?", a: "AI chatbot add-on from $349. Full AI system (Premium AI) from $890 — includes website, chatbot, lead automation, acquisition strategy, and 3 months priority support." },
      { q: "Can you integrate with our existing CRM and tools?", a: "Yes — Salesforce, HubSpot, Pipedrive, Notion, Slack, and virtually any tool via direct API, Zapier, Make, or n8n. Full integration is scoped before any commitment." },
    ],
  },
  "web-development-new-york": {
    city: "New York",
    country: "United States",
    region: "New York",
    slug: "web-development-new-york",
    headline: "Web Development New York",
    subline: "Premium web development for NYC — Next.js 15, startup-grade design, 14-day delivery. No agency markup.",
    intro: "KAH Digital builds high-performance websites for New York startups, businesses, and agencies. From sleek landing pages to full SaaS platforms — we deliver Stripe, Linear, and Framer-level design on Next.js 15. Remote from Switzerland, 100% code ownership, fixed price. No Manhattan overhead.",
    sectors: ["SaaS & Tech Startups", "FinTech & WealthTech", "E-Commerce & D2C", "Agencies & Consultants", "Media & Publishing", "Real Estate & PropTech"],
    proofLine: "Reply within 24h · Fixed price · 100% ownership",
    faq: [
      { q: "What does a business website cost in New York?", a: "Starter from $142 (landing page, 5 days). Business from $390 (6 pages, SEO, 14 days). Premium AI from $890 (full system, AI chatbot, 28 days). Fixed price, zero surprises." },
      { q: "Why work with a Swiss studio instead of a NYC agency?", a: "Swiss execution quality, without NYC agency pricing. You work directly with the founder. Fixed price, fast turnaround, 100% yours. No retainers, no lock-in." },
      { q: "Can you build a SaaS MVP for a New York startup?", a: "Yes. Functional V1 in 4 weeks on Next.js 15 + Supabase + TypeScript. The same stack as well-funded startups. Scalable from day one, no rewrite in 6 months." },
      { q: "Do you handle SEO for the US market?", a: "Yes, full technical SEO, structured data, Core Web Vitals 95+, clean URLs. Included from the Business plan. Optimised for Google US." },
    ],
  },
  "web-development-dubai": {
    city: "Dubai",
    country: "UAE",
    region: "Dubai",
    slug: "web-development-dubai",
    headline: "Web Development Dubai",
    subline: "Premium web development for Dubai & UAE — Next.js 15, multilingual, SaaS-level design. Delivered in 14 days.",
    intro: "KAH Digital builds high-performance websites for Dubai and UAE businesses: real estate portals, hospitality, e-commerce, consulting, and SaaS. We deliver multilingual sites (Arabic, English, French) on Next.js 15 — fast, scalable, and 100% yours. Remote from Switzerland, no local overhead.",
    sectors: ["Real Estate & PropTech", "Hospitality & Tourism", "E-Commerce & Luxury Retail", "Consulting & Advisory", "FinTech & Payments", "Healthcare & Wellness"],
    proofLine: "Reply within 24h · Fixed price · No lock-in",
    faq: [
      { q: "Do you build Arabic-English bilingual websites?", a: "Yes, we build fully bilingual and RTL-ready websites in Arabic and English (and French). Proper hreflang, clean URL structure, SEO in both languages." },
      { q: "How much does a business website cost in Dubai?", a: "Starter from $142 (landing page, 5 days). Business from $390 (up to 6 pages, full SEO, 14 days). Premium AI from $890 (complete system with AI chatbot). Fixed price, no surprises." },
      { q: "How fast can you deliver a website for a UAE business?", a: "Starter in 5 business days. Business website in 14 days. All timelines are confirmed in writing before kickoff. No delays." },
      { q: "Do you handle SEO for the UAE and GCC market?", a: "Yes — technical SEO, structured data, Core Web Vitals 95+, clean Arabic and English URLs. Included from the Business plan. Optimised for Google UAE." },
    ],
  },
  "ai-agency-dubai": {
    city: "Dubai",
    country: "UAE",
    region: "Dubai",
    slug: "ai-agency-dubai",
    headline: "AI Agency Dubai",
    subline: "GPT-4 agents, AI automation & chatbots for Dubai businesses. Arabic, English & French. 10-day deployment.",
    intro: "KAH Digital builds AI automation systems for Dubai and UAE businesses: lead qualification agents, 24/7 Arabic-English customer support, CRM integrations, and smart workflows. We operate in English, French, and German and deploy AI that generates real ROI — not marketing promises. Free audit within 24 hours.",
    sectors: ["Real Estate & PropTech", "E-Commerce & Retail", "Hospitality & Tourism", "FinTech & Payments", "Consulting & Advisory", "Healthcare & Wellness"],
    proofLine: "Free AI audit · Reply within 24h · Remote & fast",
    faq: [
      { q: "Do you build AI chatbots in Arabic for Dubai businesses?", a: "Yes, our GPT-4 agents can be trained in Arabic, English, and French. Ideal for Dubai's multilingual customer base." },
      { q: "How quickly can KAH Digital deploy AI for a UAE company?", a: "10 days from kickoff to production. We work fully remote — brief online, deploy globally. No local office required, no setup friction." },
      { q: "What AI use cases work for Dubai real estate and hospitality?", a: "Lead qualification for property inquiries, 24/7 multilingual guest support, automated booking follow-ups, CRM enrichment. High ROI sectors we've already worked in." },
      { q: "What does it cost?", a: "AI chatbot add-on from $349. Full AI system from $890 — website, chatbot, lead automation, 3 months support. Fixed price, no surprises." },
    ],
  },
};

type Props = { data: EnCity };

export function LocalSeoEnPageContent({ data }: Props) {
  const devisUrl = `/en/devis?city=${encodeURIComponent(data.city)}&ref=local-seo-en`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "KAH Digital",
    description: `Premium web development & AI automation for ${data.city} — Next.js 15 websites, GPT-4 agents, measurable results.`,
    url: `https://kah-digital.ch/en/${data.slug}`,
    telephone: "+33759558414",
    email: "kahdigital42@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lausanne",
      addressCountry: "CH",
    },
    areaServed: { "@type": "City", name: data.city },
    openingHours: "Mo-Fr 09:00-18:00",
    sameAs: ["https://www.linkedin.com/company/kah-digital", "https://x.com/DigitalKah42"],
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Script id={`ld-en-${data.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#050509] pb-16 pt-24">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute -top-32 left-1/3 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-blue-600/12 blur-[120px]" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-300">
            <FiMapPin size={13} className="text-blue-400" />
            {data.city}, {data.country}
          </div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {data.headline}
          </h1>
          <p className="mb-8 text-lg text-gray-400">{data.subline}</p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={devisUrl}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-8 py-3.5 font-bold text-white shadow-lg shadow-blue-500/25 transition hover:gap-3 hover:shadow-blue-500/40"
            >
              Free quote in 24h <FiArrowRight size={15} />
            </Link>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-8 py-3.5 font-bold text-white shadow-lg shadow-green-500/20 transition hover:brightness-110"
            >
              <FiMessageCircle size={15} />
              WhatsApp — reply in 2h
            </a>
          </div>
          <p className="mt-5 text-sm text-gray-500">{data.proofLine}</p>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-gray-900/50 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-lg leading-relaxed text-gray-300">{data.intro}</p>
        </div>
      </section>

      {/* Sectors */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="mb-8 text-center text-2xl font-extrabold tracking-tight text-white">
            Industries served in {data.city}
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {data.sectors.map((s) => (
              <div key={s} className="flex items-center gap-2.5 rounded-xl border border-white/8 bg-gray-900 px-4 py-3">
                <FiCheck size={14} className="shrink-0 text-blue-400" />
                <span className="text-sm text-gray-300">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="bg-gray-900/50 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="mb-10 text-center text-2xl font-extrabold tracking-tight text-white">
            Why KAH Digital for {data.city}?
          </h2>
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              { icon: FiZap, title: "Delivered in 5–14 days", body: "Starter in 5 days. Business in 14 days. Short brief, clear decisions, zero unnecessary meetings. Not 2 months." },
              { icon: FiClock, title: "Reply within 24h", body: "First reply next business day. Direct founder access — no account manager, no relay, no delay." },
              { icon: FiMapPin, title: "Fixed price guaranteed", body: "Fixed quote before starting. No surprises, no hidden costs. 100% code ownership on delivery." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/8 bg-gray-900 p-6">
                <item.icon size={20} className="mb-3 text-blue-400" />
                <h3 className="mb-2 font-bold text-white">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-400">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="mb-4 text-2xl font-extrabold tracking-tight text-white">Pricing for {data.city}</h2>
          <p className="mb-8 text-gray-400">Transparent fixed prices. No hourly rates, no lock-in, 100% ownership.</p>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "Starter", price: "$142", sub: "Landing page · 5 days" },
              { label: "Business", price: "$390", sub: "Up to 6 pages · 14 days · SEO" },
              { label: "Premium AI", price: "$890", sub: "Full AI system · 28 days" },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-white/8 bg-gray-900 p-5 text-left">
                <div className="mb-1 text-xs font-bold uppercase tracking-widest text-gray-500">{item.label}</div>
                <div className="text-2xl font-black text-white">{item.price}</div>
                <div className="mt-1 text-xs text-gray-500">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-900/50 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="mb-8 text-center text-2xl font-extrabold tracking-tight text-white">Frequently asked questions</h2>
          <div className="space-y-4">
            {data.faq.map((item) => (
              <div key={item.q} className="rounded-xl border border-white/8 bg-gray-900 p-5">
                <h3 className="mb-2 font-semibold text-white">{item.q}</h3>
                <p className="text-sm leading-relaxed text-gray-400">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <div className="mx-auto max-w-2xl px-4">
          <div className="mx-auto mb-8 max-w-sm rounded-2xl border border-white/8 bg-gray-900/60 p-5">
            <div className="mb-2 flex justify-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} viewBox="0 0 24 24" fill="#fbbf24" className="h-3.5 w-3.5">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <p className="text-sm italic text-gray-300">
              &ldquo;Since the redesign I receive 3–4 qualified leads per week. ROI from the first month.&rdquo;
            </p>
            <p className="mt-2 text-xs text-gray-600">M.L. — Lawyer, Lausanne</p>
          </div>
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-white">
            Your project in {data.city} — let&apos;s talk?
          </h2>
          <p className="mb-8 text-gray-400">Free quote · Reply within 24h · No commitment</p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href={devisUrl}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-10 py-4 font-bold text-white shadow-lg shadow-blue-500/25 transition hover:shadow-blue-500/40"
            >
              Request my free quote <FiArrowRight size={15} />
            </Link>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-8 py-4 font-bold text-white shadow-lg shadow-green-500/20 transition hover:brightness-110"
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
