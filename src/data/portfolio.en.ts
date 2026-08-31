import type { PortfolioProject } from "@/data/portfolio";

export const portfolioProjectsEn: PortfolioProject[] = [
  {
    slug: "dse-yana",
    name: "DSE Yana",
    type: "Premium site + appointment booking / MEP engineering firm, French Guiana",
    tagline:
      "The website of a technical engineering firm in French Guiana — MEP execution drawings, self-service appointment booking and an admin back-office. Real client, in production on its own domain.",
    shortDescription:
      "Custom Next.js site for a French Guiana MEP engineering firm: the 4 trades (electrical, plumbing, solar hot water, HVAC), online booking on Guiana time and a back-office.",
    description:
      "DSE — Dessin & Suivi Économique is a technical engineering firm based in Matoury, French Guiana. The old site did not do the work justice. New identity derived from the logo, content rewritten to be understood by a homeowner as much as a company, sections for the 4 MEP trades, a real deliverable (an anonymised execution drawing) and construction cost tracking. Visitors can book an appointment on their own, with no email back-and-forth, with confirmation, a calendar file and an automatic reminder the day before.",
    challenge:
      "Lift the image of an engineering firm with no marketing team, make a technical trade accessible to the general public, and turn inbound requests into qualified appointments without endless email back-and-forth.",
    solution:
      "Next.js App Router, identity and palette derived from the logo, plain-language content, an in-house booking module (slots on America/Cayenne time, confirmation + calendar file, one-click cancellation, automatic day-before reminder via scheduled task), an admin area (requests, appointments) and a study form wired to the database. Supabase database, Resend emails, Vercel deployment.",
    stack: ["Next.js", "TypeScript", "Prisma", "Supabase", "Resend", "Vercel"],
    result:
      "Live on its own domain, self-service appointment booking operational and an admin back-office delivered.",
    timeline: "≈ 2 weeks",
    deliverables: [
      "Custom premium site (identity, 8 sections, rewritten content)",
      "Self-service booking module (Guiana time, calendar file, day-before reminder)",
      "Admin area (contact requests, appointments)",
      "Study form wired to the database",
      "Full SEO, go-live on own domain",
    ],
    metrics: [
      { label: "MEP trades", value: "4" },
      { label: "Booking", value: "Self-service" },
      { label: "Go-live", value: "Own domain" },
    ],
    highlights: [
      "Real client — engineering firm in French Guiana, site in production on its own domain",
      "Full appointment booking (slots, confirmation, cancellation, reminder), not just a contact form",
      "Technical content made accessible to homeowners and companies alike",
    ],
    palette: {
      primary: "#6d28d9",
      secondary: "#4c1d95",
      accent: "#10b981",
    },
    website: "https://www.dse-yana.com",
    mockups: {
      primary: "/mockups/dse-yana-screenshot.png",
      gallery: ["/mockups/dse-yana-screenshot.png"],
    },
  },
  {
    slug: "bcs-nettoyage",
    name: "BCS Nettoyage",
    type: "Brochure site + online booking / Cleaning company, Toulouse",
    tagline:
      "The website of a home cleaning company, with online appointment booking — delivered ready to take requests.",
    shortDescription:
      "Next.js brochure site for a cleaning company in Toulouse: services, pricing, before/after gallery and online slot booking.",
    description:
      "BCS Nettoyage works at customers' homes in Toulouse — cars, apartments, textiles. The goal: a clear site that builds trust and turns a visitor into a booking, without a phone call. Custom design centred on results (before/after gallery), transparent per-service pricing, and a booking form with date and time slot. The site is live on its own domain.",
    challenge:
      "Give a small cleaning company a site that reassures as much as word of mouth, and captures appointment requests directly — without relying only on the phone.",
    solution:
      "Next.js App Router, mobile-first design centred on result visuals, per-service pricing page, booking form (date + slot) and WhatsApp / call / email shortcuts. Continuous deployment on Vercel.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    result:
      "Live on bcs-nettoyage.fr, with working slot booking and a multi-channel contact flow.",
    timeline: "≈ 1 week",
    deliverables: [
      "Full brochure site (services, pricing, before/after, FAQ, contact)",
      "Online slot booking (date + time)",
      "WhatsApp, call and email shortcuts",
      "Custom mobile-first design",
      "Vercel deployment + own domain",
    ],
    metrics: [
      { label: "Go-live", value: "Own domain" },
      { label: "Booking", value: "Online" },
      { label: "Contact", value: "Multi-channel" },
    ],
    highlights: [
      "Real client — cleaning company in Toulouse, site in production on its own domain",
      "Online appointment booking built in, not just a contact form",
      "Conversion-focused design around before/after results",
    ],
    palette: {
      primary: "#0b1f3a",
      secondary: "#12335c",
      accent: "#2eb872",
    },
    website: "https://bcs-nettoyage.fr",
    mockups: {
      primary: "/mockups/bcs-nettoyage-screenshot.png",
      gallery: ["/mockups/bcs-nettoyage-screenshot.png"],
    },
  },
  {
    slug: "kah-workforce",
    name: "KAH Workforce",
    type: "Vertical AI agent / Chief-of-staff for independent artists",
    tagline:
      "KAH Digital's flagship product — an AI agent wired into an independent artist's business, end to end.",
    shortDescription:
      "Autonomous AI chief-of-staff for independent artists: contracts, tour dates, socials, royalties, and everyday decisions handled without manual work.",
    description:
      "KAH Workforce isn't a chatbot bolted onto a website — it's a vertical AI agent that knows the independent artist's job end to end. Contracts, tour dates, social media, royalties, follow-ups: the agent acts in the artist's place on everyday decisions, with persistent memory and integration into their real tools. This is the live proof of KAH Digital's positioning: vertical AI agents, not another website.",
    challenge:
      "Give an independent artist, without a management team, the equivalent of a chief-of-staff available 24/7 — able to track their real business, not just answer generic questions.",
    solution:
      "A vertical AI agent built for one job, with persistent memory and frictionless daily piloting — the detailed technical architecture stays reserved for sales conversations.",
    stack: ["Next.js", "TypeScript", "Claude", "Supabase", "Stripe", "Vercel"],
    result:
      "A vertical AI agent live in production, an autonomous chief-of-staff for independent artists — the product that embodies KAH Digital's positioning.",
    timeline: "Ongoing development",
    deliverables: [
      "Vertical AI agent integrated with the artist's real tools",
      "Contract, tour and royalty tracking",
      "Everyday decisions delegated",
      "Persistent memory and 24/7 piloting",
    ],
    metrics: [
      { label: "Availability", value: "24/7" },
      { label: "Job covered", value: "One, fully" },
      { label: "Status", value: "Live" },
    ],
    highlights: [
      "KAH Digital's flagship product — live proof of the vertical AI agent positioning",
      "A vertical agent, not a generic chatbot",
      "The model behind KAH Digital's custom vertical AI agents",
    ],
    palette: {
      primary: "#0a0612",
      secondary: "#1a0f2e",
      accent: "#8b5cf6",
    },
    website: "https://kah-workforce.vercel.app",
    hideLiveLink: true,
  },
  {
    slug: "clutch",
    name: "CLUTCH",
    type: "App / financial challenges between friends",
    tagline:
      "A KAH-Digital app to put real money on your sports predictions — World Cup 2026, friend groups, live leaderboard.",
    shortDescription:
      "Financial challenges between friends: real stake, match-by-match predictions, live ranking, Stripe integrated, Android APK and PWA.",
    description:
      "CLUTCH is a product built by KAH-Digital. The idea: bring real stakes to sports predictions between friends. Each participant puts in a deposit, predicts each match, earns points (3 for exact score, 1 for correct winner). At the end of the tournament, the best predictor takes the pot. No bookmaker, no middleman — 100% between friends.",
    challenge:
      "Build a competitive experience that makes every World Cup 2026 match more intense — with real money on the line, without the legal constraints of a licensed gambling operator.",
    solution:
      "Full-stack Next.js app with custom auth, Stripe for deposits, Neon PostgreSQL + Prisma, live leaderboard, 9 challenge types, Android APK, PWA, and a dedicated World Cup 2026 landing page.",
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Stripe", "Vercel"],
    result:
      "Live app with active groups from the WC 2026 group stage — real-time predictions, dynamic rankings, real financial stakes between friends.",
    timeline: "3 weeks",
    deliverables: [
      "Custom auth + user profiles",
      "Challenge system and Stripe deposits",
      "WC 2026 match-by-match predictions",
      "Live leaderboard and Android APK",
    ],
    metrics: [
      { label: "Challenge types", value: "9" },
      { label: "WC matches", value: "104" },
      { label: "Platforms", value: "Web + Android + PWA" },
    ],
    highlights: [
      "Exact score = 3 pts · Correct winner = 1 pt",
      "Real deposit via Stripe — no bookmaker",
      "Live leaderboard + Android APK",
    ],
    palette: {
      primary: "#09090b",
      secondary: "#1a1a1f",
      accent: "#eab308",
    },
    website: "https://clutch.kah-digital.ch/",
    mockups: {
      primary: "/mockups/clutch.png",
      gallery: ["/mockups/clutch.png"],
    },
  },
  {
    slug: "kah-prod",
    name: "KAH Prod",
    type: "Music label / production",
    tagline: "A KAH-Digital build for an independent label shaped around artists, releases, and image.",
    shortDescription:
      "Premium label website with real sections for Label, Artists, Releases, Clips, Events, Networks, and Contact.",
    description:
      "KAH Prod is one of the projects produced by KAH-Digital. The live site works as a clearer base to present the label identity, showcase artists, expose releases and clips, highlight events, and centralize business contacts with a sharper visual direction.",
    challenge:
      "Give the label a stronger visual presence and a clearer structure, able to present identity, artists, and releases without losing readability or premium perception.",
    solution:
      "Structured homepage, direct navigation by content type, clearer releases and clips sections, events visibility, network links, and separate business contacts for management, booking, press, and communication.",
    stack: ["Next.js", "Tailwind CSS", "Vercel", "Forms"],
    result: "Live label website with a cleaner structure and a stronger way to present the KAH Prod universe",
    timeline: "2 weeks",
    deliverables: ["Art direction", "Premium homepage", "Artists and releases sections", "Business contacts"],
    metrics: [
      { label: "Visible sections", value: "7" },
      { label: "Business contacts", value: "4" },
      { label: "Base", value: "Vercel" },
    ],
    highlights: ["Label / Artists / Releases / Clips", "Events + networks", "Management / Booking / Press / Communication"],
    palette: {
      primary: "#07111f",
      secondary: "#12304e",
      accent: "#47b8ff",
    },
    website: "https://kah-prod.vercel.app/",
    mockups: {
      primary: "/mockups/global-dashboard.png",
      gallery: ["/mockups/global-dashboard.svg", "/mockups/global-dashboard.png"],
    },
  },
  {
    slug: "minealert",
    name: "MineAlert",
    type: "SaaS / mining intelligence",
    tagline:
      "A KAH-Digital build focused on minerals, price tracking, market news, and user alerts.",
    shortDescription:
      "Business dashboard, Supabase auth, watchlist, alerts, live scraping, and Vercel deployment for a private beta-ready product.",
    description:
      "MineAlert is one of the products built by KAH-Digital. The goal was to create a mining intelligence cockpit able to centralize prices, news signals, watchlists, and alerts inside a cleaner and more actionable interface.",
    challenge:
      "Design an intelligence tool that stays clear, fast to scan, and strong enough to support real data sources, authentication, and monitoring logic without turning into a noisy interface.",
    solution:
      "The product was built on a modern Next.js base with Supabase email and Google auth, a scraping pipeline for prices and news, a usage-driven dashboard, and a free refresh model adapted to hosted beta conditions.",
    stack: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "Playwright",
      "Vercel",
    ],
    result:
      "A live mining intelligence SaaS, automated, easier to read, and already usable as a KAH-Digital product reference.",
    timeline: "3 weeks",
    deliverables: [
      "Product direction and dashboard UX",
      "Supabase auth + Google OAuth",
      "Price and news scraping pipeline",
      "Monitoring and E2E testing base",
    ],
    metrics: [
      { label: "Live sources", value: "2+" },
      { label: "Auth flows", value: "Email + Google" },
      { label: "Base", value: "Supabase + Vercel" },
    ],
    highlights: [
      "Price / news / alerts dashboard",
      "User watchlist and alerts",
      "Free live sync + monitoring",
    ],
    palette: {
      primary: "#07110f",
      secondary: "#15382d",
      accent: "#d4af37",
    },
    website: "https://mine-alert-kenams.vercel.app/",
    mockups: {
      primary: "/mockups/minealert.svg",
      gallery: ["/mockups/minealert.svg"],
    },
  },
  {
    slug: "techcash-academy",
    name: "TechCash Academy",
    type: "Training platform / Stripe checkout",
    tagline:
      "A KAH-Digital platform built to sell digital training products with a catalog, member area, and product-based access.",
    shortDescription:
      "Multi-product catalog, Supabase auth, Stripe checkout, member dashboard, and text, PDF, resource, video, or coming-soon content.",
    description:
      "TechCash Academy is one of the products designed by KAH-Digital. The platform was built as a cleaner base to sell multiple digital training offers, structure the catalog, reassure before checkout, and unlock member access one product at a time.",
    challenge:
      "Build a clearer academy platform able to sell multiple offers without a messy funnel, while keeping the member area readable, checkout reliable, and access logic simple enough to evolve.",
    solution:
      "The product was structured with a multi-offer catalog, Stripe checkout tied to the correct product, a Supabase base for auth and purchases, a training-specific member dashboard, and an admin layer to manage catalog items and modules.",
    stack: ["Next.js", "TypeScript", "Supabase", "Stripe", "Vercel"],
    result:
      "A more credible online training platform, structured to sell cleanly and deliver product-by-product member access.",
    timeline: "1 week",
    deliverables: [
      "Product direction and academy funnel",
      "Multi-training catalog",
      "Stripe checkout + webhook",
      "Member dashboard + content admin",
    ],
    metrics: [
      { label: "Live trainings", value: "5" },
      { label: "Access model", value: "Per product" },
      { label: "Base", value: "Supabase + Stripe" },
    ],
    highlights: [
      "Multi-product catalog",
      "Stripe checkout + member access",
      "Text / PDF / resources / video / coming soon",
    ],
    palette: {
      primary: "#08111f",
      secondary: "#1b365d",
      accent: "#d7a93b",
    },
    website: "https://techcash-academy.vercel.app/",
    mockups: {
      primary: "/mockups/techcash-academy-screenshot.png",
      gallery: ["/mockups/techcash-academy-screenshot.png"],
    },
  },
  {
    slug: "castly",
    name: "Castly",
    type: "SaaS / Casting platform",
    tagline: "A KAH-Digital platform connecting recruiters and artists in a few clicks — no agency, no waiting.",
    shortDescription: "Artist / recruiter matching with a credit system, live Stripe, Supabase auth and verified profiles.",
    description: "Castly is a platform designed by KAH-Digital to modernise independent casting. Recruiters post their offers, artists apply with their profile, and contact is unlocked via a credit system. No subscription, no agency — just the right profile at the right time.",
    challenge: "Build a two-sided marketplace (artists / recruiters) with simple credit-based monetisation, a premium design experience, and a reliable backend for auth, payments and matching.",
    solution: "Full-stack Next.js, Supabase for auth and DB, live Stripe for credit packs (5 / 20 / 50 credits), full-bleed hero video, scrolled transparent nav, testimonials and integrated FAQ.",
    stack: ["Next.js", "TypeScript", "Supabase", "Stripe", "Vercel"],
    result: "Live platform with real payments, artist and recruiter profiles, and an operational credit system.",
    timeline: "4 weeks",
    deliverables: ["Supabase auth + artist / recruiter profiles", "Credit system + live Stripe checkout", "Matching and contact reveal", "Premium video hero design + FAQ"],
    metrics: [
      { label: "Credit packs", value: "3" },
      { label: "Payments", value: "Stripe live" },
      { label: "Base", value: "Supabase + Vercel" },
    ],
    highlights: ["Two-sided marketplace artists / recruiters", "Credits without subscription — €9.90 / €29.90 / €59.90", "Supabase auth + live Stripe operational"],
    palette: { primary: "#07070f", secondary: "#12121e", accent: "#e8b86d" },
    website: "https://castly-chi.vercel.app/",
    mockups: { primary: "/mockups/castly-screenshot.png", gallery: ["/mockups/castly-screenshot.png"] },
  },
];
