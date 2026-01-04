import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Clear offers",
  description: "Simple offer details, budgets, and deliverables.",
  alternates: {
    canonical: "/en/offres",
    languages: {
      fr: "/offres",
    },
  },
  openGraph: {
    type: "website",
    title: "Clear offers",
    description: "Simple offer details, budgets, and deliverables.",
    url: "/en/offres",
    images: [
      {
        url: "/og-kah-digital.png",
        width: 1200,
        height: 630,
        alt: "Kah-Digital offers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clear offers",
    description: "Simple offer details, budgets, and deliverables.",
    images: ["/og-kah-digital.png"],
  },
};

const offers = [
  {
    id: "landing-conversion",
    title: "Conversion landing",
    price: "1,900 EUR",
    timeline: "3 weeks",
    summary: "A single, fast page focused on capturing qualified leads.",
    why: "The budget covers messaging strategy, custom design, form integration, and QA before launch.",
    includes: [
      "Quick workshop + message structure",
      "Premium design + light animations",
      "Form + basic tracking",
      "Launch + QA",
    ],
    ideal: ["Product campaign", "Brand launch", "Premium offer"],
  },
  {
    id: "portail-membres",
    title: "Private member portal",
    price: "5,900 EUR",
    timeline: "5 weeks",
    summary: "Secure space for content, subscriptions, and internal dashboards.",
    why: "The price includes authentication, roles, database setup, and recurring payments.",
    includes: [
      "Auth + roles + account management",
      "Member dashboards",
      "Recurring payments (Stripe)",
      "Simple back-office",
    ],
    ideal: ["Communities", "Training", "B2B SaaS"],
  },
  {
    id: "configurateur-deck",
    title: "Interactive quote + PDF pack",
    price: "7,900 EUR",
    timeline: "6 weeks",
    summary: "A simple path to estimate a project and generate a clear PDF.",
    why: "The budget covers the flow, the quote logic, and automatic PDF generation.",
    includes: [
      "Multi-step flow",
      "Quote summary + PDF export",
      "CRM / Notion connection",
      "PDF pack template",
    ],
    ideal: ["Agencies", "Studios", "Sales teams"],
  },
];

export default function OffresPageEn() {
  return (
    <div className="section-shell space-y-10">
      <div className="flex flex-wrap gap-3 text-sm text-white/70">
        <Link
          href="/en"
          className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white"
        >
          Back to home
        </Link>
        <Link
          href="/en/devis"
          className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white"
        >
          Request a quote
        </Link>
      </div>

      <header className="premium-card rounded-[36px] border border-white/10 bg-white/5 p-6 text-white shadow-[0_20px_70px_rgba(0,0,0,0.35)] sm:p-10">
        <p className="text-sm uppercase tracking-[0.3em] text-white/60">Clear offers</p>
        <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">What each offer includes, and why.</h1>
        <p className="mt-3 max-w-3xl text-white/70">
          Goal: make budgets transparent. Each offer lists what is included and the typical delivery time.
        </p>
      </header>

      <div className="space-y-6">
        {offers.map((offer) => (
          <section
            key={offer.id}
            id={offer.id}
            className="premium-card rounded-[32px] border border-white/10 bg-black/40 p-6 text-white shadow-[0_20px_70px_rgba(0,0,0,0.35)] sm:p-8"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">Offer</p>
                <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">{offer.title}</h2>
                <p className="mt-2 max-w-2xl text-white/70">{offer.summary}</p>
              </div>
              <div className="premium-card rounded-3xl border border-white/15 bg-white/5 p-4 text-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">Indicative budget</p>
                <p className="mt-1 text-2xl font-semibold">{offer.price}</p>
                <p className="mt-1 text-white/60">Average timeline: {offer.timeline}</p>
              </div>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-3">
              <div className="premium-card rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">Why this price</p>
                <p className="mt-3 text-white/70">{offer.why}</p>
              </div>
              <div className="premium-card rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">Included</p>
                <ul className="mt-3 space-y-2 text-sm text-white/70">
                  {offer.includes.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </div>
              <div className="premium-card rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">Ideal for</p>
                <ul className="mt-3 space-y-2 text-sm text-white/70">
                  {offer.ideal.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <Link
                href="/en/devis"
                className="rounded-full bg-white px-5 py-2 font-semibold text-black transition hover:bg-neutral-200"
              >
                Request a quote
              </Link>
              <Link
                href="/en/configurateur"
                className="rounded-full border border-white/30 px-5 py-2 text-white/80 transition hover:border-white hover:text-white"
              >
                Open quick quote
              </Link>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
