import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Web, mobile and SMB offers",
  description: "KAH-Digital offers calibrated for the Swiss market: websites, web apps, mobile MVPs, and SMB support solutions.",
  alternates: {
    canonical: "/en/offres",
    languages: {
      fr: "/offres",
    },
  },
  openGraph: {
    type: "website",
    title: "Web, mobile and SMB offers",
    description: "KAH-Digital offers calibrated for the Swiss market: websites, web apps, mobile MVPs, and SMB support solutions.",
    url: "/en/offres",
    images: [
      {
        url: "/og-kah-digital.png",
        width: 1200,
        height: 630,
        alt: "KAH-Digital offers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web, mobile and SMB offers",
    description: "KAH-Digital offers calibrated for the Swiss market: websites, web apps, mobile MVPs, and SMB support solutions.",
    images: ["/og-kah-digital.png"],
  },
};

const offers = [
  {
    id: "swiss-showcase-site",
    title: "Showcase website for SMBs",
    price: "From 3,500 CHF",
    timeline: "3 to 5 weeks",
    summary: "A clear website to present the business, build trust, and capture qualified requests.",
    why: "Calibrated for the Swiss market: message scoping, visual direction, service pages, basic local SEO, and a clean launch.",
    includes: [
      "Message structure and sitemap",
      "Responsive design and service pages",
      "Contact or quote form",
      "Basic SEO and launch",
    ],
    ideal: ["Swiss SMBs", "Consultancies", "Craft businesses", "B2B services"],
    ctaHref: "/en/devis",
  },
  {
    id: "business-web-app",
    title: "Business web application",
    price: "From 9,000 CHF",
    timeline: "6 to 10 weeks",
    summary: "A client portal, dashboard, or internal tool to structure a real operational workflow.",
    why: "The budget covers authentication, permissions, data modelling, business screens, and core backend logic.",
    includes: [
      "Functional scoping",
      "Auth, roles, and permissions",
      "Dashboard or client portal",
      "Database and automations",
    ],
    ideal: ["Growing SMBs", "Internal operations", "Client portals", "Team tools"],
    ctaHref: "/en/devis",
  },
  {
    id: "mobile-mvp",
    title: "Mobile MVP",
    price: "From 14,000 CHF",
    timeline: "6 to 10 weeks",
    summary: "An iOS / Android application to test a service, a product, or a mobile-first experience with a controlled scope.",
    why: "The budget covers mobile design, React Native build, backend logic, and beta / store preparation.",
    includes: [
      "MVP scoping and key screens",
      "React Native / Expo build",
      "API and database",
      "TestFlight / Android beta",
    ],
    ideal: ["Mobile products", "Investor MVPs", "Client apps", "Field operations"],
    ctaHref: "/en/devis/mvp",
  },
  {
    id: "it-support-glpi",
    title: "IT support, AI and GLPI",
    price: "From 4,500 CHF",
    timeline: "3 to 6 weeks",
    summary: "First-line AI support, knowledge base, and GLPI ticket escalation when the assistant cannot solve the issue.",
    why: "The budget covers support scoping, response knowledge, GLPI integration, and workflow safeguards.",
    includes: [
      "Support audit",
      "Knowledge base / procedures",
      "First-line AI assistant",
      "GLPI ticket creation and follow-up",
    ],
    ideal: ["SMBs with internal IT", "Agency IT teams", "User support", "Helpdesk teams"],
    ctaHref: "/en/devis",
  },
];

export default function OffersPageEn() {
  return (
    <div className="section-shell space-y-10">
      <div className="flex flex-wrap gap-3 text-sm text-white/70">
        <Link href="/en" className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white">
          Back to home
        </Link>
        <Link href="/en/devis" className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white">
          Request a quote
        </Link>
      </div>

      <header className="premium-card rounded-[36px] border border-white/10 bg-white/5 p-6 text-white shadow-[0_20px_70px_rgba(0,0,0,0.35)] sm:p-10">
        <p className="text-sm uppercase tracking-[0.3em] text-white/60">KAH-Digital offers</p>
        <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Pricing ranges aligned with the Swiss market.</h1>
        <p className="mt-3 max-w-3xl text-white/70">
          These ranges are designed for Switzerland-first projects and international projects scoped from Switzerland. Final pricing depends on scope, integrations, and finish level.
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
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">Why this pricing</p>
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
              <Link href={offer.ctaHref} className="rounded-full bg-white px-5 py-2 font-semibold text-black transition hover:bg-neutral-200">
                {offer.ctaHref === "/en/devis/mvp" ? "Request a mobile quote" : "Request a quote"}
              </Link>
              <Link
                href="/en/configurateur"
                className="rounded-full border border-white/30 px-5 py-2 text-white/80 transition hover:border-white hover:text-white"
              >
                Open configurator
              </Link>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
