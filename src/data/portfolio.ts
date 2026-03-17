export type PortfolioProject = {
  slug: string;
  name: string;
  type: string;
  tagline: string;
  shortDescription: string;
  description: string;
  challenge: string;
  solution: string;
  stack: string[];
  result: string;
  timeline: string;
  deliverables: string[];
  metrics: { label: string; value: string }[];
  highlights: string[];
  palette: {
    primary: string;
    secondary: string;
    accent: string;
  };
  website?: string;
  mockups?: {
    primary?: string;
    gallery?: string[];
  };
};

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "kah-prod",
    name: "KAH Prod",
    type: "Label / production musicale",
    tagline: "L'un des projets produits par KAH-Digital pour porter un univers musique, image et production.",
    shortDescription:
      "Site vitrine premium pour KAH Prod, pense comme une base claire, rapide et evolutive pour presenter le label et ses activites.",
    description:
      "KAH Prod fait partie des projets portes par KAH-Digital. Cette realisation sert de base web propre et premium pour presenter l'identite du label, clarifier son univers et structurer les prises de contact autour d'une image plus nette.",
    challenge:
      "Poser un site plus fort visuellement, plus lisible commercialement, et plus propre techniquement pour faire exister le label avec une vraie base serieuse.",
    solution:
      "Refonte de la home, clarification des sections, CTA mieux places, structure plus simple et base Next.js / Vercel maintenable pour faire evoluer le projet sans repartir de zero.",
    stack: ["Next.js", "Tailwind CSS", "Vercel", "Forms"],
    result: "Base web premium, propre et exploitable pour le developpement du label",
    timeline: "2 semaines",
    deliverables: ["Direction artistique", "Home premium", "Pages vitrines", "Formulaires et CTA"],
    metrics: [
      { label: "Pages clefs", value: "6+" },
      { label: "Delai", value: "2 semaines" },
      { label: "Objectif", value: "Image + leads" },
    ],
    highlights: ["Projet KAH-Digital", "Base evolutive", "Production Vercel"],
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
