import type { PortfolioProject } from "@/data/portfolio";

export const portfolioProjectsDe: PortfolioProject[] = [
  {
    slug: "kah-prod",
    name: "KAH Prod",
    type: "Musiklabel / Produktion",
    tagline: "Eine KAH-Digital Realisierung fuer ein unabhaengiges Label, aufgebaut rund um Bild, Artists und Releases.",
    shortDescription:
      "Premium-Label-Website mit echten Bereichen fuer Label, Artists, Releases, Clips, Events, Netzwerke und Kontakt.",
    description:
      "KAH Prod gehoert zu den Projekten, die von KAH-Digital entwickelt wurden. Die Live-Website dient als klare Basis, um die Identitaet des Labels, die Artists, Releases und Clips, Events sowie die Business-Kontakte mit einer schaerferen visuellen Richtung zu praesentieren.",
    challenge:
      "Dem Label eine staerkere visuelle Praesenz und eine klarere Struktur geben, damit Identitaet, Artists und Releases ohne Informationschaos und mit hochwertiger Wahrnehmung praesentiert werden.",
    solution:
      "Klare Startseite, direkte Navigation nach Inhalt, besser lesbare Bereiche fuer Releases und Clips, sichtbare Events, Netzwerke sowie getrennte Kontakte fuer Management, Booking, Presse und Kommunikation.",
    stack: ["Next.js", "Tailwind CSS", "Vercel", "Forms"],
    result: "Live-Label-Website mit klarerer Struktur und staerkerer Darstellung des KAH-Prod-Universums",
    timeline: "2 Wochen",
    deliverables: ["Art Direction", "Premium-Startseite", "Artists- und Release-Bereiche", "Business-Kontakte"],
    metrics: [
      { label: "Sichtbare Bereiche", value: "7" },
      { label: "Business-Kontakte", value: "4" },
      { label: "Basis", value: "Vercel" },
    ],
    highlights: ["Label / Artists / Releases / Clips", "Events + Netzwerke", "Management / Booking / Presse / Kommunikation"],
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
