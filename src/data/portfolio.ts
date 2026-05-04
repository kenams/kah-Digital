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
    slug: "ashanti-beauty",
    name: "Ashanti Beauty",
    type: "Site vitrine premium / Institut de beauté",
    tagline:
      "Site vitrine premium conçu pour un institut de beauté haut de gamme à Balma — vidéo plein écran, 5 pôles de prestations et expérience fluide.",
    shortDescription:
      "Site Next.js premium avec hero vidéo HD, section histoire, 5 pôles de prestations avec boutons Planity, partenaires, galerie, avis clients et Google Maps.",
    description:
      "Ashanti Beauty est un institut de beauté premium situé à Balma (31). KAH-Digital a conçu et développé leur site vitrine avec un rendu haut de gamme : vidéo hero plein écran optimisée mobile et desktop, présentation de l'univers de l'institut, 5 pôles de prestations (Nails Bar, Brows Bar, Lashes Bar, Esthétique, Massage), section partenaires, galerie Instagram, avis clients et carte Google Maps.",
    challenge:
      "Créer un site qui reflète le positionnement premium de l'institut : rendu fluide, vidéo HD bien intégrée sur mobile et desktop, structure claire des prestations, et incitation à la réservation via Planity.",
    solution:
      "Site Next.js 16 avec Tailwind CSS, composant hero vidéo responsive (source JS selon viewport), animations cinématiques maîtrisées, sections reveal au scroll, boutons Planity sur chaque pôle, Google Maps intégré et footer épuré.",
    stack: ["Next.js 16", "Tailwind CSS", "TypeScript", "Vercel"],
    result:
      "Site premium en ligne avec vidéo HD fonctionnelle sur mobile et desktop, structure claire des offres et tunnel de réservation Planity.",
    timeline: "1 semaine",
    deliverables: [
      "Hero vidéo plein écran HD",
      "5 sections prestations avec CTA Planity",
      "Section partenaires (9 marques)",
      "Galerie + avis + Google Maps",
    ],
    metrics: [
      { label: "Sections", value: "7" },
      { label: "Pôles prestations", value: "5" },
      { label: "Partenaires", value: "9" },
    ],
    highlights: [
      "Vidéo hero responsive mobile/desktop",
      "Nails · Brows · Lashes · Esthétique · Massage",
      "Réservation Planity intégrée",
    ],
    palette: {
      primary: "#151113",
      secondary: "#34242d",
      accent: "#f7d9e8",
    },
    website: "https://ashanti-beauty.vercel.app/",
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
];
