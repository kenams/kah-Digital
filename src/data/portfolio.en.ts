import type { PortfolioProject } from "@/data/portfolio";

export const portfolioProjectsEn: PortfolioProject[] = [
  {
    slug: "kah-prod",
    name: "KAH Prod",
    type: "Music label / production",
    tagline: "One of the projects produced by KAH-Digital for a music, image, and production brand.",
    shortDescription:
      "Premium showcase website for KAH Prod, built as a clean, fast, and scalable base to present the label and its activity.",
    description:
      "KAH Prod is one of the projects produced by KAH-Digital. This build acts as a clean premium web base to present the label identity, clarify its universe, and structure inbound contact around a sharper image.",
    challenge:
      "Create a stronger visual presence, a clearer commercial structure, and a cleaner technical base to give the label a serious web foundation.",
    solution:
      "Homepage redesign, clearer sections, stronger CTAs, simpler structure, and a maintainable Next.js / Vercel base that can evolve without rebuilding everything from scratch.",
    stack: ["Next.js", "Tailwind CSS", "Vercel", "Forms"],
    result: "Premium web foundation, clean and ready to support the label's growth",
    timeline: "2 weeks",
    deliverables: ["Art direction", "Premium homepage", "Showcase pages", "Forms and CTAs"],
    metrics: [
      { label: "Key pages", value: "6+" },
      { label: "Timeline", value: "2 weeks" },
      { label: "Goal", value: "Image + leads" },
    ],
    highlights: ["KAH-Digital project", "Scalable base", "Vercel production"],
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
