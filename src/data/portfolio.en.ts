import type { PortfolioProject } from "@/data/portfolio";

export const portfolioProjectsEn: PortfolioProject[] = [
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
];
