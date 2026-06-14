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
  downloadLinks?: {
    android?: string;
    ios?: string;
  };
  mockups?: {
    primary?: string;
    gallery?: string[];
  };
};

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "clutch",
    name: "CLUTCH",
    type: "Application / défis financiers entre amis",
    tagline:
      "Une application KAH-Digital pour mettre de l'argent réel sur ses pronostics sportifs — CDM 2026, groupes d'amis, classement live.",
    shortDescription:
      "Défis financiers entre amis : caution réelle, pronostics match par match, classement en temps réel, Stripe intégré, APK Android et PWA.",
    description:
      "CLUTCH fait partie des produits conçus par KAH-Digital. L'idée : donner de l'enjeu réel aux pronostics sportifs entre amis. Chaque participant mise une caution, pronostique chaque match, accumule des points (3 pts pour un score exact, 1 pt pour le bon vainqueur). À la fin du tournoi, le meilleur pronostiqueur rafle la mise. Sans bookmaker, sans intermédiaire — 100% entre vous.",
    challenge:
      "Créer une expérience compétitive qui rende chaque match de la Coupe du Monde 2026 plus intense — avec de l'argent réel en jeu, sans les contraintes légales d'un opérateur de jeux.",
    solution:
      "Application Next.js full-stack avec auth custom, Stripe pour les cautions, base Neon PostgreSQL + Prisma, classement live, 9 types de défis, APK Android, PWA mobile et page CDM 2026 dédiée.",
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Stripe", "Vercel"],
    result:
      "App live avec groupes actifs dès la phase de groupes CDM 2026 — pronostics en temps réel, classement dynamique, enjeux financiers réels entre amis.",
    timeline: "3 semaines",
    deliverables: [
      "Auth custom + profils utilisateurs",
      "Système de défis et cautions Stripe",
      "Pronostics CDM 2026 match par match",
      "Classement live et APK Android",
    ],
    metrics: [
      { label: "Types de défis", value: "9" },
      { label: "Matchs CDM", value: "104" },
      { label: "Plateformes", value: "Web + Android + PWA" },
    ],
    highlights: [
      "Score exact = 3 pts · Bon vainqueur = 1 pt",
      "Caution réelle via Stripe — pas de bookmaker",
      "Classement live + APK Android",
    ],
    palette: {
      primary: "#09090b",
      secondary: "#1a1a1f",
      accent: "#eab308",
    },
    website: "https://stackr-app-three.vercel.app/",
    mockups: {
      primary: "/mockups/clutch.png",
      gallery: ["/mockups/clutch.png"],
    },
  },
  {
    slug: "kah-prod",
    name: "KAH Prod",
    type: "Label / production musicale",
    tagline:
      "Une realisation KAH-Digital pour un label independant construit autour de l'image, des artistes et des sorties.",
    shortDescription:
      "Site label premium avec navigation Le Label, Artistes, Sorties, Clips, Evenements, Reseaux et Contact.",
    description:
      "KAH Prod fait partie des projets portes par KAH-Digital. Le site en ligne sert de base claire pour presenter le label, mettre en avant les artistes, montrer les sorties et clips, exposer les evenements, et centraliser les points de contact metier autour d'une image plus propre.",
    challenge:
      "Donner au label un site plus fort visuellement et plus lisible, capable de presenter son identite, ses artistes et ses sorties sans melanger l'information ni perdre l'image premium.",
    solution:
      "Mise en place d'une home plus nette, d'une navigation directe par univers, d'un bloc sorties/clips plus lisible, d'une section evenements, d'un bloc reseaux et de contacts separes pour management, booking, presse et communication.",
    stack: ["Next.js", "Tailwind CSS", "Vercel", "Forms"],
    result:
      "Site label en ligne, plus clair a parcourir et plus propre pour presenter l'univers KAH Prod",
    timeline: "2 semaines",
    deliverables: [
      "Direction artistique",
      "Home premium",
      "Sections artistes et sorties",
      "Contacts metier",
    ],
    metrics: [
      { label: "Sections visibles", value: "7" },
      { label: "Contacts metier", value: "4" },
      { label: "Base", value: "Vercel" },
    ],
    highlights: [
      "Le Label / Artistes / Sorties / Clips",
      "Evenements + reseaux",
      "Management / Booking / Presse / Communication",
    ],
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
    stack: ["Next.js", "TypeScript", "Supabase", "Playwright", "Vercel"],
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
  {
    slug: "techcash-academy",
    name: "TechCash Academy",
    type: "Plateforme de formation / checkout Stripe",
    tagline:
      "Une plateforme KAH-Digital pour vendre des formations digitales avec catalogue, espace membre et acces par produit.",
    shortDescription:
      "Catalogue multi-produits, auth Supabase, checkout Stripe, dashboard membre et contenus texte, PDF, ressources, video ou a venir.",
    description:
      "TechCash Academy fait partie des produits concus par KAH-Digital. Le site a ete pense comme une base propre pour vendre plusieurs formations digitales, structurer le catalogue, rassurer avant l'achat, puis ouvrir l'acces membre formation par formation.",
    challenge:
      "Construire une academy claire et credible, capable de vendre plusieurs offres sans tunnel brouillon, tout en gardant un espace membre lisible, un checkout fiable et une logique d'acces simple a faire evoluer.",
    solution:
      "Mise en place d'un catalogue multi-produits, d'un checkout Stripe relie au bon produit, d'une base Supabase pour l'authentification et les achats, d'un dashboard membre par formation, puis d'une interface admin pour piloter le catalogue et les modules.",
    stack: ["Next.js", "TypeScript", "Supabase", "Stripe", "Vercel"],
    result:
      "Une plateforme de formation en ligne plus serieuse, structuree pour vendre proprement et delivrer un acces membre produit par produit.",
    timeline: "1 semaine",
    deliverables: [
      "Direction produit et tunnel academy",
      "Catalogue multi-formations",
      "Checkout Stripe + webhook",
      "Dashboard membre + admin contenu",
    ],
    metrics: [
      { label: "Formations live", value: "5" },
      { label: "Acces", value: "Par produit" },
      { label: "Base", value: "Supabase + Stripe" },
    ],
    highlights: [
      "Catalogue multi-produits",
      "Checkout Stripe + acces membre",
      "Texte / PDF / ressources / video / a venir",
    ],
    palette: {
      primary: "#08111f",
      secondary: "#1b365d",
      accent: "#d7a93b",
    },
    website: "https://techcash-academy.vercel.app/",
  },
];
