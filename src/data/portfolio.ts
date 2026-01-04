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
    gallery?: string[];
  };
};

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "atelier-nomade",
    name: "Atelier Nomade",
    type: "Maison d'architecture",
    tagline: "Manifeste digital simple et immersif.",
    shortDescription: "Site vitrine avec portfolio photo et formulaire de brief qui rassemble les infos importantes.",
    description:
      "Nous avons guide l'equipe sur la refonte complete du site : mise en scene des projets, manifesto video et timeline des chantiers.",
    challenge: "Beaucoup de demandes vagues et pas de support premium.",
    solution: "Next.js + Sanity pour editer chaque bloc facilement, export PDF du brief et formulaire contextualise.",
    stack: ["Next.js", "Sanity", "Tailwind CSS", "Vercel"],
    result: "+40 % de demandes qualifiees",
    timeline: "5 semaines",
    deliverables: ["Direction artistique", "Design system", "Developpement front", "CMS Sanity"],
    metrics: [
      { label: "Pages", value: "7" },
      { label: "Score perf", value: "98" },
      { label: "Modules CMS", value: "18" },
    ],
    highlights: ["Hero video", "Portfolio filtrable", "Formulaire de brief"],
    palette: {
      primary: "#0f0f14",
      secondary: "#1f2336",
      accent: "#a855f7",
    },
    mockups: {
      primary: "/mockups/portfolio-atelier-nomade.png",
      gallery: ["/mockups/portfolio-atelier-nomade.png"],
    },
  },
  {
    slug: "lumea-skin",
    name: "Lumea Skin",
    type: "Startup beauty",
    tagline: "E-commerce qui conseille avant de vendre.",
    shortDescription: "Quiz pour choisir un produit, panier clair, paiement Stripe et emails Klaviyo.",
    description:
      "Refonte du tunnel d'achat pour montrer la routine beaute pas a pas : diagnostic, rituels, preuves clients.",
    challenge: "Trop d'abandons avant le panier faute d'accompagnement.",
    solution: "Parcours en 3 blocs, quiz React Hook Form, bundles dynamiques, Stripe + Klaviyo.",
    stack: ["Next.js", "Commerce Layer", "Stripe", "Klaviyo"],
    result: "Panier moyen +22 %",
    timeline: "6 semaines",
    deliverables: ["UX express", "Design UI", "Front-end", "Integration paiement"],
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
    mockups: {
      primary: "/mockups/portfolio-lumea-skin.png",
      gallery: ["/mockups/portfolio-lumea-skin.png"],
    },
  },
  {
    slug: "novapay",
    name: "NovaPay",
    type: "Fintech SaaS",
    tagline: "Landing page qui explique et rassure.",
    shortDescription: "Manifesto video, chiffres cles animes, pricing limpide et prise de rendez-vous.",
    description: "Nous avons construit une page en 5 sections avec storytelling, preuves clients et CTA fixes.",
    challenge: "Trop d'infos techniques sur l'ancienne page.",
    solution: "Next.js + Framer Motion pour les animations, HubSpot Meetings pour la prise de rendez-vous.",
    stack: ["Next.js", "Framer Motion", "HubSpot"],
    result: "Conversion demo x2",
    timeline: "3 semaines",
    deliverables: ["Copywriting", "Design UI", "Developpement front"],
    metrics: [
      { label: "Sections", value: "8" },
      { label: "Score perf", value: "96" },
      { label: "Assets", value: "10" },
    ],
    highlights: ["Pricing clair", "Temoignages animes", "HubSpot"],
    palette: {
      primary: "#071a2e",
      secondary: "#0b3355",
      accent: "#5ad8ff",
    },
    mockups: {
      primary: "/mockups/portfolio-novapay.png",
      gallery: ["/mockups/portfolio-novapay.png"],
    },
  },
  {
    slug: "valoris-conseil",
    name: "Valoris Conseil",
    type: "Cabinet RH",
    tagline: "Site editorial bilingue avec PDF instantanes.",
    shortDescription: "Modules CMS faciles, filtres multicriteres et fiches missions exportees en un clic.",
    description:
      "Nous avons concu un systeme de cartes modifiables pour presenter chaque mission et generer un PDF personnalise.",
    challenge: "Chaque document etait produit manuellement.",
    solution: "Next.js + Contentful, generation PDF serverless et workflow Notion.",
    stack: ["Next.js", "Contentful", "Vercel"],
    result: "Temps de mise a jour divise par 3",
    timeline: "6 semaines",
    deliverables: ["Architecture contenu", "Design UI", "Dev front", "Automatisation PDF"],
    metrics: [
      { label: "Langues", value: "FR/EN" },
      { label: "Pages dynamiques", value: "24" },
      { label: "Templates PDF", value: "4" },
    ],
    highlights: ["Modules editoriaux", "Recherche sectorielle", "Export PDF"],
    palette: {
      primary: "#0e1a20",
      secondary: "#17323a",
      accent: "#7ee5c5",
    },
    mockups: {
      primary: "/mockups/portfolio-valoris-conseil.png",
      gallery: ["/mockups/portfolio-valoris-conseil.png"],
    },
  },
  {
    slug: "pulse-studio",
    name: "Pulse Studio",
    type: "Agence evenementielle",
    tagline: "Portfolio plein ecran avec brief connecte.",
    shortDescription: "Navigation horizontale immersive et formulaire multi-etapes relie a Airtable + Slack.",
    description:
      "Nous avons mis en scene leurs evenements avec GSAP et relie le tunnel de brief aux outils de l'equipe commerciale.",
    challenge: "Difficile de retranscrire l'energie et de suivre les prospects.",
    solution: "Next.js, GSAP pour les animations, Airtable + Slack pour suivre les demandes.",
    stack: ["Next.js", "Airtable", "GSAP", "Slack API"],
    result: "Pipeline x1.8",
    timeline: "4 semaines",
    deliverables: ["Direction artistique", "UI/UX", "Front-end", "Automation Airtable"],
    metrics: [
      { label: "Projets", value: "12" },
      { label: "Integrations", value: "Airtable + Slack" },
      { label: "Animations", value: "15" },
    ],
    highlights: ["Carrousel fullscreen", "Form multi-etapes", "Notion automation"],
    palette: {
      primary: "#1a0f20",
      secondary: "#341447",
      accent: "#ffb347",
    },
    mockups: {
      primary: "/mockups/portfolio-pulse-studio.png",
      gallery: ["/mockups/portfolio-pulse-studio.png"],
    },
  },
  {
    slug: "oko-energy",
    name: "OKO Energy",
    type: "Scale-up cleantech",
    tagline: "Microsite narratif pour lever vite.",
    shortDescription: "Timeline claire, carte Mapbox et data viz pour convaincre les investisseurs.",
    description:
      "Nous avons construit un site en 4 chapitres pour presenter l'impact, les chiffres cles et l'equipe.",
    challenge: "Besoin d'un support premium et comprehensible par des investisseurs internationaux.",
    solution: "Next.js + Tailwind pour la base, Mapbox pour localiser les sites et GSAP pour animer les data viz.",
    stack: ["Next.js", "Tailwind CSS", "Mapbox", "GSAP"],
    result: "Dossier pret en 10 jours",
    timeline: "3 semaines",
    deliverables: ["Concept narratif", "Design UI", "Developpement front"],
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
    mockups: {
      primary: "/mockups/portfolio-oko-energy.png",
      gallery: ["/mockups/portfolio-oko-energy.png"],
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
      "Nous avons cadre un MVP hyper cible : cote promoteur, un brief guide et un tableau de bord des chantiers ouverts ; cote artisan, un profil certifie avec documents verifies et un scoring automatique base sur l'historique.",
    challenge:
      "Valider le modele avant d'investir dans un ERP complet et rassurer les investisseurs sur la traction.",
    solution:
      "Next.js App Router + Prisma + Supabase pour la data, webhooks Make pour envoyer les notifications et procedure KYC integree.",
    stack: ["Next.js", "Tailwind CSS", "Supabase", "Make"],
    result: "12 deals pilotes signes",
    timeline: "5 semaines",
    deliverables: ["Atelier product framing", "Design systeme", "MVP full-stack", "Onboarding guide"],
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
      primary: "/mockups/portfolio-fairbuild-mvp.png",
      gallery: ["/mockups/portfolio-fairbuild-mvp.png"],
    },
  },
  {
    slug: "pulselearn",
    name: "PulseLearn",
    type: "Edtech",
    tagline: "Mini plateforme de cohortes audio + mobile.",
    shortDescription:
      "Lecteur audio progressif, quiz legers et paiement Stripe integre pour passer de Zoom a une experience brande.",
    description:
      "L'equipe PulseLearn voulait tester un format audio-first. Nous avons livre un MVP web responsive + PWA avec playlists, fiches cours, quiz et notifications mail pour relancer les participants.",
    challenge: "Reduire la friction technologique et mesurer l'engagement des apprenants avec des moyens limites.",
    solution:
      "Next.js + Supabase pour les contenus et les stats, Stripe Checkout pour les cohortes payantes, API Resend pour les nudges automatises.",
    stack: ["Next.js", "Supabase", "Stripe", "Resend"],
    result: "Taux de completion +35 %",
    timeline: "4 semaines",
    deliverables: ["Branding light", "UI responsive", "PWA audio", "Emails automatises"],
    metrics: [
      { label: "Cours audio", value: "24" },
      { label: "Quiz integres", value: "12" },
      { label: "Notifications", value: "5 flows" },
    ],
    highlights: ["Lecteur progressif", "Quiz rapides", "PWA offline"],
    palette: {
      primary: "#0a0f1f",
      secondary: "#162042",
      accent: "#7bd7ff",
    },
    mockups: {
      primary: "/mockups/portfolio-pulselearn.png",
      gallery: ["/mockups/portfolio-pulselearn.png"],
    },
  },
];
