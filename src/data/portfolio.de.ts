import type { PortfolioProject } from "@/data/portfolio";

export const portfolioProjectsDe: PortfolioProject[] = [
  {
    slug: "kah-prod",
    name: "KAH Prod",
    type: "Musiklabel / Produktion",
    tagline: "Eine KAH-Digital Realisierung fuer ein unabhaengiges Label mit Fokus auf Bild, Artists und Releases.",
    shortDescription:
      "Premium-Website fuer ein Label mit klaren Bereichen fuer Label, Artists, Releases, Clips, Events, Netzwerke und Kontakt.",
    description:
      "KAH Prod gehoert zu den Projekten, die von KAH-Digital entwickelt wurden. Die Live-Website schafft eine klare Basis, um Identitaet, Artists, Releases, Clips, Events und Business-Kontakte in einem staerkeren visuellen Rahmen zu praesentieren.",
    challenge:
      "Dem Label eine staerkere visuelle Praesenz und eine klarere Struktur geben, damit Identitaet, Artists und Releases ohne Informationschaos und mit hochwertiger Wahrnehmung praesentiert werden.",
    solution:
      "Klare Startseite, direkte Navigation nach Inhalten, besser lesbare Bereiche fuer Releases und Clips, sichtbare Events und Netzwerke sowie getrennte Kontakte fuer Management, Booking, Presse und Kommunikation.",
    stack: ["Next.js", "Tailwind CSS", "Vercel", "Forms"],
    result: "Live-Label-Website mit klarerer Struktur und einer staerkeren Darstellung des KAH-Prod Universums",
    timeline: "2 Wochen",
    deliverables: ["Art Direction", "Premium-Startseite", "Artists- und Release-Bereiche", "Business-Kontakte"],
    metrics: [
      { label: "Sichtbare Bereiche", value: "7" },
      { label: "Business-Kontakte", value: "4" },
      { label: "Basis", value: "Vercel" },
    ],
    highlights: ["Label / Artists / Releases / Clips", "Events und Netzwerke", "Management / Booking / Presse / Kommunikation"],
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
