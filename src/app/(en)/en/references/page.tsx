import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { FiArrowRight, FiCheck, FiExternalLink, FiMessageCircle } from "react-icons/fi";

export const metadata: Metadata = {
  title: "References — Delivered projects, live online | KAH Digital",
  description:
    "Real projects delivered by KAH Digital: showcase site with online booking, Stripe e-commerce shop, redesign with automated appointment booking. Everything is live — open it and judge for yourself.",
  keywords: [
    "web agency references",
    "KAH Digital website projects",
    "web design portfolio",
    "web agency case studies",
    "delivered website examples",
  ],
  alternates: { canonical: "https://kah-digital.ch/en/references" },
  openGraph: {
    title: "References — Delivered projects, live online | KAH Digital",
    description:
      "Real projects: showcase site + booking, Stripe e-commerce, redesign + automated appointments. Live and verifiable.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Projects delivered by KAH Digital",
  description:
    "Websites and applications delivered by KAH Digital, live and publicly accessible.",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "BCS Nettoyage — Showcase site + online booking",
      url: "https://bcs-nettoyage.fr",
      description:
        "Next.js showcase site for a cleaning company in Toulouse: services, pricing, before/after gallery and online slot booking. Live on its own domain.",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Vellio Shop — E-commerce store",
      url: "https://vellio.kah-digital.ch",
      description:
        "Next.js store with live Stripe payments, 21 products, automatic confirmation emails and premium design.",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "DSE Yana — Redesign + automated appointment booking",
      url: "https://dse-yana-premium-client.vercel.app",
      description:
        "Redesign of a fluid-engineering consultancy's site in French Guiana: self-service booking of a scoping call (slots, confirmation, reminder), admin area.",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Kotizy — Digital tontine application",
      url: "https://tontineapp-web.vercel.app",
      description:
        "Tontine management application: automated cycles, notifications, community dashboard.",
    },
  ],
};

type Ref = {
  sector: string;
  location: string;
  type: string;
  name: string;
  challenge: string;
  solution: string;
  facts: { value: string; label: string }[];
  url: string;
  urlLabel: string;
  color: string;
  accentColor: string;
  borderColor: string;
};

const CASES: Ref[] = [
  {
    sector: "Cleaning company",
    location: "Toulouse, France",
    type: "Showcase site + online booking",
    name: "BCS Nettoyage",
    challenge:
      "Customer acquisition entirely by phone and word of mouth. No website to reassure a new customer or take an appointment request outside call hours.",
    solution:
      "Custom showcase site centred on results (before/after gallery), transparent pricing per service, a booking form with date and slot, WhatsApp / call / email shortcuts. Next.js, deployed on Vercel with its own domain.",
    facts: [
      { value: "≈ 1 wk", label: "Delivery" },
      { value: "Live", label: "On its own domain" },
      { value: "Booking", label: "Online slots" },
    ],
    url: "https://bcs-nettoyage.fr",
    urlLabel: "bcs-nettoyage.fr",
    color: "from-emerald-500/15 to-teal-500/10",
    accentColor: "text-emerald-400",
    borderColor: "border-emerald-500/20",
  },
  {
    sector: "E-commerce · Home & design",
    location: "Online",
    type: "E-commerce store",
    name: "Vellio Shop",
    challenge:
      "Launch a contemporary curated brand with a real online store — premium design, reliable payment, controlled budget.",
    solution:
      "Next.js App Router, Stripe Checkout in live mode (real sales from day 1), a typed catalogue of 21 products in 8 categories, Resend transactional emails, continuous deployment on Vercel.",
    facts: [
      { value: "21", label: "Products online" },
      { value: "Stripe Live", label: "Real payments" },
      { value: "≈ 3 wks", label: "Delivery" },
    ],
    url: "https://vellio.kah-digital.ch",
    urlLabel: "vellio.kah-digital.ch",
    color: "from-amber-500/12 to-orange-500/8",
    accentColor: "text-amber-400",
    borderColor: "border-amber-500/20",
  },
  {
    sector: "Fluid engineering consultancy",
    location: "French Guiana",
    type: "Redesign + automated appointments",
    name: "DSE Yana",
    challenge:
      "A dated site that no longer reflected the firm's level, and no way for a client to book a first call without email ping-pong.",
    solution:
      "A complete redesign (identity, content, SEO) and, above all, self-service appointment booking: the client picks a slot, confirms it and receives a confirmation with a calendar file and a cancellation link. Automatic reminder the day before. Admin area for requests and appointments.",
    facts: [
      { value: "Redesign", label: "Complete site" },
      { value: "Booking", label: "Self-service" },
      { value: "Reminder", label: "Automatic, day before" },
    ],
    url: "https://dse-yana-premium-client.vercel.app",
    urlLabel: "dse-yana-premium-client.vercel.app",
    color: "from-violet-500/15 to-fuchsia-500/8",
    accentColor: "text-violet-400",
    borderColor: "border-violet-500/20",
  },
  {
    sector: "Application · Community finance",
    location: "Online",
    type: "Business application",
    name: "Kotizy",
    challenge:
      "Digitise the tontine — rotating savings among friends and family — with reliable cycles, reminders and a clear view for the whole group.",
    solution:
      "Web application: automated tontine cycles, notifications, community dashboard, payment management. Next.js, Supabase, Vercel deployment.",
    facts: [
      { value: "Cycles", label: "Automated" },
      { value: "Alerts", label: "Built-in reminders" },
      { value: "Live", label: "Running application" },
    ],
    url: "https://tontineapp-web.vercel.app",
    urlLabel: "tontineapp-web.vercel.app",
    color: "from-blue-500/15 to-cyan-500/8",
    accentColor: "text-blue-400",
    borderColor: "border-blue-500/20",
  },
];

const GUARANTEES = [
  "Free, readable quote within 24h",
  "Fixed price confirmed before we start",
  "30% deposit, balance on delivery",
  "Source code delivered — the site belongs to you",
];

export default function ReferencesEnPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Script id="ld-references" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/6 pt-20 pb-16">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-300">
            <FiCheck size={13} /> Live and verifiable
          </div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            What we have delivered.<br />Open it, judge it.
          </h1>
          <p className="mb-8 text-lg text-gray-400 leading-relaxed">
            No invented mockups, no fake reviews. Real projects, in production, that you
            can open right now in a new tab.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/en/devis"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3 font-bold text-white shadow-lg shadow-blue-500/25 transition hover:opacity-90"
            >
              Discuss my project <FiArrowRight size={15} />
            </Link>
            <a
              href="https://wa.me/33759558414?text=Hello%2C%20I%20saw%20your%20references%20and%20I%27d%20like%20to%20discuss%20my%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              <FiMessageCircle size={15} /> WhatsApp direct
            </a>
          </div>
        </div>
      </section>

      {/* Stats strip — factuels uniquement */}
      <section className="border-b border-white/6 py-10">
        <div className="mx-auto max-w-4xl px-4">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { value: "5 days", label: "Showcase site, after we receive your content" },
              { value: "Fixed price", label: "Confirmed before we start" },
              { value: "30% deposit", label: "Balance on delivery" },
              { value: "Source code", label: "Delivered, the site is yours" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-extrabold text-white sm:text-[1.7rem]">{stat.value}</p>
                <p className="mt-1 text-xs text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projets */}
      <section className="mx-auto max-w-5xl px-4 py-20 space-y-16">
        {CASES.map((c) => (
          <div key={c.name} className={`rounded-2xl border ${c.borderColor} bg-gradient-to-br ${c.color} p-8`}>
            <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="mb-2 flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-0.5 text-xs text-gray-400">{c.sector}</span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-0.5 text-xs text-gray-400">{c.location}</span>
                  <span className={`rounded-full border border-white/10 bg-white/5 px-3 py-0.5 text-xs font-semibold ${c.accentColor}`}>{c.type}</span>
                </div>
                <h2 className="text-xl font-bold text-white">{c.name}</h2>
              </div>
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Open the site <FiExternalLink size={13} />
              </a>
            </div>

            <div className="mb-6 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-gray-500">The need</p>
                <p className="text-sm text-gray-300 leading-relaxed">{c.challenge}</p>
              </div>
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-gray-500">What was delivered</p>
                <p className="text-sm text-gray-300 leading-relaxed">{c.solution}</p>
              </div>
            </div>

            <div className="mb-6 grid grid-cols-3 gap-4 rounded-xl border border-white/8 bg-black/20 p-4">
              {c.facts.map((m) => (
                <div key={m.label} className="text-center">
                  <p className={`text-lg font-extrabold ${c.accentColor}`}>{m.value}</p>
                  <p className="mt-0.5 text-xs text-gray-500">{m.label}</p>
                </div>
              ))}
            </div>

            <a
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/8 bg-black/20 px-5 py-3 text-sm text-gray-300 transition hover:border-white/20 hover:text-white"
            >
              <span className="text-gray-500">Live:</span>
              <span className="font-mono">{c.urlLabel}</span>
              <FiExternalLink size={12} />
            </a>
          </div>
        ))}
      </section>

      {/* Avis clients — transparent */}
      <section className="border-t border-white/6 py-14">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <p className="text-sm text-gray-400 leading-relaxed">
            <strong className="text-white">Customer reviews are coming.</strong> We would rather show
            zero testimonials than invent some. In the meantime, every project above is
            public — open them, try the booking, check the loading speed.
          </p>
        </div>
      </section>

      {/* Ce qui est garanti */}
      <section className="border-t border-white/6 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-8 text-2xl font-bold text-white">What is guaranteed on every project</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {GUARANTEES.map((g) => (
              <div key={g} className="flex items-center gap-3 rounded-xl border border-white/8 bg-gray-900/50 p-4 text-left">
                <FiCheck size={16} className="shrink-0 text-emerald-400" />
                <span className="text-sm text-gray-300">{g}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="border-t border-white/6 py-20">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-extrabold text-white">Your project is next.</h2>
          <p className="mb-8 text-gray-400">
            Custom quote within 24h. Clear timeline. Tailored scope. No surprises.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/en/devis"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-8 py-4 font-bold text-white shadow-lg shadow-blue-500/25 transition hover:opacity-90"
            >
              Get my free quote <FiArrowRight size={16} />
            </Link>
            <a
              href="https://wa.me/33759558414?text=Hello%2C%20I%20saw%20your%20references%20and%20I%27d%20like%20to%20discuss%20my%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-8 py-4 font-bold text-white shadow-lg shadow-black/20 transition hover:brightness-110"
            >
              <FiMessageCircle size={16} /> WhatsApp
            </a>
          </div>
          <p className="mt-4 text-xs text-gray-600">Reply within 24h · No commitment · France &amp; Switzerland</p>
        </div>
      </section>
    </div>
  );
}
