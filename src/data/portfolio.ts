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
    tagline: "Une realisation KAH-Digital pour un label independant construit autour de l'image, des artistes et des sorties.",
    shortDescription:
      "Site label premium avec navigation Le Label, Artistes, Sorties, Clips, Evenements, Reseaux et Contact.",
    description:
      "KAH Prod fait partie des projets portes par KAH-Digital. Le site en ligne sert de base claire pour presenter le label, mettre en avant les artistes, montrer les sorties et clips, exposer les evenements, et centraliser les points de contact metier autour d'une image plus propre.",
    challenge:
      "Donner au label un site plus fort visuellement et plus lisible, capable de presenter son identite, ses artistes et ses sorties sans melanger l'information ni perdre l'image premium.",
    solution:
      "Mise en place d'une home plus nette, d'une navigation directe par univers, d'un bloc sorties/clips plus lisible, d'une section evenements, d'un bloc reseaux et de contacts separes pour management, booking, presse et communication.",
    stack: ["Next.js", "Tailwind CSS", "Vercel", "Forms"],
    result: "Site label en ligne, plus clair a parcourir et plus propre pour presenter l'univers KAH Prod",
    timeline: "2 semaines",
    deliverables: ["Direction artistique", "Home premium", "Sections artistes et sorties", "Contacts metier"],
    metrics: [
      { label: "Sections visibles", value: "7" },
      { label: "Contacts metier", value: "4" },
      { label: "Base", value: "Vercel" },
    ],
    highlights: ["Le Label / Artistes / Sorties / Clips", "Evenements + reseaux", "Management / Booking / Presse / Communication"],
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
