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
];
