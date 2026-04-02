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
      "Site label premium avec navigation Le Label, Artistes, Sorties, Clips, Événements, Réseaux et Contact.",
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
    highlights: ["Le Label / Artistes / Sorties / Clips", "Événements + réseaux", "Management / Booking / Presse / Communication"],
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
    type: "SaaS / veille miniere",
    tagline:
      "Une application KAH-Digital de veille sur les minerais, les prix, les actualites et les alertes utilisateur.",
    shortDescription:
      "Dashboard metiers, auth Supabase, watchlist, alertes, scraping live, et deploiement Vercel pour un produit exploitable en beta privee.",
    description:
      "MineAlert fait partie des projets portes par KAH-Digital. Le produit a ete pense comme un cockpit de veille miniere capable de centraliser les prix, les signaux news, la watchlist et les alertes dans une interface plus claire et plus actionnable.",
    challenge:
      "Structurer un outil de veille qui reste lisible, rapide a parcourir et suffisamment solide pour brancher des sources de donnees, de l'authentification et une logique de monitoring sans tomber dans une interface brouillonne.",
    solution:
      "Mise en place d'une base Next.js moderne, d'une auth Supabase email et Google, d'un pipeline de scraping pour les prix et les actualites, d'un dashboard oriente usage, puis d'un mode de rafraichissement gratuit adapte a une beta hebergee.",
    stack: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "Playwright",
      "Vercel",
    ],
    result:
      "Un SaaS de veille miniere en ligne, automatise, lisible et deja exploitable comme reference produit KAH-Digital.",
    timeline: "3 semaines",
    deliverables: [
      "Direction produit et UX dashboard",
      "Auth Supabase + OAuth Google",
      "Pipeline scraping prix et actualites",
      "Monitoring et base de tests E2E",
    ],
    metrics: [
      { label: "Sources live", value: "2+" },
      { label: "Parcours auth", value: "Email + Google" },
      { label: "Base", value: "Supabase + Vercel" },
    ],
    highlights: [
      "Dashboard prix / news / alertes",
      "Watchlist et alertes utilisateur",
      "Sync live gratuit + monitoring",
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
