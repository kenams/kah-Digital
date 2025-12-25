
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
  mockups?: {
    primary?: string;
  };
};

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "atelier-nomade",
    name: "Atelier Nomade",
    type: "Maison d'architecture",
    tagline: "Manifeste digital simple et immersif.",
    shortDescription:
      "Site vitrine avec portfolio photo et formulaire de brief qui rassemble les infos importantes.",
    description:
      "Nous avons guidé l'équipe sur la refonte complète du site : mise en scène des projets, manifesto vidéo et timeline des chantiers.",
    challenge:
      "Beaucoup de demandes vagues et pas de support premium.",
    solution:
      "Next.js + Sanity pour éditer chaque bloc facilement, export PDF du brief et formulaire contextualisé.",
    stack: ["Next.js", "Sanity", "Tailwind CSS", "Vercel"],
    result: "+40 % de demandes qualifiées",
    timeline: "5 semaines",
    deliverables: ["Direction artistique", "Design system", "Développement front", "CMS Sanity"],
    metrics: [
      { label: "Pages", value: "7" },
      { label: "Score perf", value: "98" },
      { label: "Modules CMS", value: "18" },
    ],
    highlights: ["Hero vidéo", "Portfolio filtrable", "Formulaire de brief"],
    palette: {
      primary: "#0f0f14",
      secondary: "#1f2336",
      accent: "#a855f7",
    },
  },
  {
    slug: "lumea-skin",
    name: "Lumea Skin",
    type: "Startup beauty",
    tagline: "E-commerce qui conseille avant de vendre.",
    shortDescription:
      "Quiz pour choisir un produit, panier clair, paiement Stripe et emails Klaviyo.",
    description:
      "Refonte du tunnel d'achat pour montrer la routine beauté pas à pas : diagnostic, rituels, preuves clients.",
    challenge:
      "Trop d'abandons avant le panier faute d'accompagnement.",
    solution:
      "Parcours en 3 blocs, quiz React Hook Form, bundles dynamiques, Stripe + Klaviyo.",
    stack: ["Next.js", "Commerce Layer", "Stripe", "Klaviyo"],
    result: "Panier moyen +22 %",
    timeline: "6 semaines",
    deliverables: ["UX express", "Design UI", "Front-end", "Intégration paiement"],
    metrics: [
      { label: "Chargement", value: "1.2s" },
      { label: "Automations", value: "5 flows" },
      { label: "Templates", value: "14" },
    ],
    highlights: ["Quiz produit", "Bundles intelligents", "Tracking GA4"],
    palette: {
      primary: "#1d0f1b",
      secondary: "#441a42",
      accent: "#ff8fb4",
    },
  },
  {
    slug: "novapay",
    name: "NovaPay",
    type: "Fintech SaaS",
    tagline: "Landing page qui explique et rassure.",
    shortDescription:
      "Manifesto vidéo, chiffres clés animés, pricing limpide et prise de rendez-vous.",
    description:
      "Nous avons construit une page en 5 sections avec storytelling, preuves clients et CTA fixes.",
    challenge:
      "Trop d'infos techniques sur l'ancienne page.",
    solution:
      "Next.js + Framer Motion pour les animations, HubSpot Meetings pour la prise de rendez-vous.",
    stack: ["Next.js", "Framer Motion", "HubSpot"],
    result: "Conversion démo x2",
    timeline: "3 semaines",
    deliverables: ["Copywriting", "Design UI", "Développement front"],
    metrics: [
      { label: "Sections", value: "8" },
      { label: "Score perf", value: "96" },
      { label: "Assets", value: "10" },
    ],
    highlights: ["Pricing clair", "Témoignages animés", "HubSpot"],
    palette: {
      primary: "#071a2e",
      secondary: "#0b3355",
      accent: "#5ad8ff",
    },
  },
  {
    slug: "valoris-conseil",
    name: "Valoris Conseil",
    type: "Cabinet RH",
    tagline: "Site éditorial bilingue avec PDF instantanés.",
    shortDescription:
      "Modules CMS faciles, filtres multicritères et fiches missions exportées en un clic.",
    description:
      "Nous avons conçu un système de cartes modifiables pour présenter chaque mission et générer un PDF personnalisé.",
    challenge:
      "Chaque document était produit manuellement.",
    solution:
      "Next.js + Contentful, génération PDF serverless et workflow Notion.",
    stack: ["Next.js", "Contentful", "Vercel"],
    result: "Temps de mise à jour divisé par 3",
    timeline: "6 semaines",
    deliverables: ["Architecture contenu", "Design UI", "Dév front", "Automatisation PDF"],
    metrics: [
      { label: "Langues", value: "FR/EN" },
      { label: "Pages dynamiques", value: "24" },
      { label: "Templates PDF", value: "4" },
    ],
    highlights: ["Modules éditoriaux", "Recherche sectorielle", "Export PDF"],
    palette: {
      primary: "#0e1a20",
      secondary: "#17323a",
      accent: "#7ee5c5",
    },
  },
  {
    slug: "pulse-studio",
    name: "Pulse Studio",
    type: "Agence événementielle",
    tagline: "Portfolio plein écran avec brief connecté.",
    shortDescription:
      "Navigation horizontale immersive et formulaire multi-étapes relié à Airtable + Slack.",
    description:
      "Nous avons mis en scène leurs événements avec GSAP et relié le tunnel de brief aux outils de l'équipe commerciale.",
    challenge:
      "Difficile de retranscrire l'énergie et de suivre les prospects.",
    solution:
      "Next.js, GSAP pour les animations, Airtable + Slack pour suivre les demandes.",
    stack: ["Next.js", "Airtable", "GSAP", "Slack API"],
    result: "Pipeline x1.8",
    timeline: "4 semaines",
    deliverables: ["Direction artistique", "UI/UX", "Front-end", "Automation Airtable"],
    metrics: [
      { label: "Projets", value: "12" },
      { label: "Intégrations", value: "Airtable + Slack" },
      { label: "Animations", value: "15" },
    ],
    highlights: ["Carrousel fullscreen", "Form multi-étapes", "Notion auto"],
    palette: {
      primary: "#1a0f20",
      secondary: "#341447",
      accent: "#ffb347",
    },
  },
  {
    slug: "oko-energy",
    name: "OKO Energy",
    type: "Scale-up cleantech",
    tagline: "Microsite narratif pour lever vite.",
    shortDescription:
      "Timeline claire, carte Mapbox et data viz pour convaincre les investisseurs.",
    description:
      "Nous avons construit un site en 4 chapitres pour présenter l'impact, les chiffres clés et l'équipe.",
    challenge:
      "Besoin d'un support premium et compréhensible par des investisseurs internationaux.",
    solution:
      "Next.js + Tailwind pour la base, Mapbox pour localiser les sites et GSAP pour animer les data viz.",
    stack: ["Next.js", "Tailwind CSS", "Mapbox", "GSAP"],
    result: "Dossier prêt en 10 jours",
    timeline: "3 semaines",
    deliverables: ["Concept narratif", "Design UI", "Développement front"],
    metrics: [
      { label: "Data viz", value: "4" },
      { label: "Score perf", value: "94" },
      { label: "Temps de prod", value: "3 semaines" },
    ],
    highlights: ["Timeline interactive", "Carte des sites", "Lien data room"],
    palette: {
      primary: "#061b10",
      secondary: "#0b3b24",
      accent: "#75f0a3",
    },
  },
  {
    slug: "fairbuild-mvp",
    name: "FairBuild MVP",
    type: "Marketplace BTP",
    tagline: "MVP en 5 semaines pour matcher artisans et promoteurs.",
    shortDescription:
      "Parcours inscription double (promoteur/artisan), scoring auto et signature d'intentions directement dans le dashboard.",
    description:
      "Nous avons cadré un MVP hyper ciblé : côté promoteur, un brief guidé et un tableau de bord des chantiers ouverts ; côté artisan, un profil certifié avec documents vérifiés et un scoring automatique basé sur l'historique.",
    challenge:
      "Valider le modèle avant d'investir dans un ERP complet et rassurer les investisseurs sur la traction.",
    solution:
      "Next.js App Router + Prisma + Supabase pour la data, webhooks Make pour envoyer les notifications et procédure KYC intégrée.",
    stack: ["Next.js", "Tailwind CSS", "Supabase", "Make"],
    result: "12 deals pilotes signés",
    timeline: "5 semaines",
    deliverables: ["Atelier product framing", "Design système", "MVP full-stack", "Onboarding guidé"],
    metrics: [
      { label: "Utilisateurs pilotes", value: "45" },
      { label: "Temps onboarding", value: "6 min" },
      { label: "Automations", value: "8" },
    ],
    highlights: ["Double onboarding", "Dashboard scoring", "Webhooks Make"],
    palette: {
      primary: "#0e111b",
      secondary: "#1a2438",
      accent: "#9ef08a",
    },
    mockups: {
      primary: "/mockups/fairbuild-mvp.svg",
    },
  },
  {
    slug: "pulselearn",
    name: "PulseLearn",
    type: "Edtech",
    tagline: "Mini plateforme de cohortes audio + mobile.",
    shortDescription:
      "Lecteur audio progressif, quiz légers et paiement Stripe intégré pour passer de Zoom à une expérience brandée.",
    description:
      "L'équipe PulseLearn voulait tester un format audio-first. Nous avons livré un MVP web responsive + PWA avec playlists, fiches cours, quiz et notifications mail pour relancer les participants.",
    challenge:
      "Réduire la friction technologique et mesurer l'engagement des apprenants avec des moyens limités.",
    solution:
      "Next.js + Supabase pour les contenus et les stats, Stripe Checkout pour les cohortes payantes, API Resend pour les nudges automatisés.",
    stack: ["Next.js", "Supabase", "Stripe", "Resend"],
    result: "Taux de complétion +35 %",
    timeline: "4 semaines",
    deliverables: ["Branding light", "UI responsive", "PWA audio", "Emails automatisés"],
    metrics: [
      { label: "Cours audio", value: "24" },
      { label: "Quiz intégrés", value: "12" },
      { label: "Notifications", value: "5 flows" },
    ],
    highlights: ["Lecteur progressif", "Quiz rapides", "PWA offline"],
    palette: {
      primary: "#0a0f1f",
      secondary: "#162042",
      accent: "#7bd7ff",
    },
    mockups: {
      primary: "/mockups/pulselearn.svg",
    },
  },
];
