const services = [
  {
    title: "Site vitrine (site de presentation)",
    description:
      "Un site clair pour presenter votre activite, vos offres et recuperer des demandes.",
    tech: "Pages, formulaire, SEO, mise en ligne.",
  },
  {
    title: "Boutique en ligne (e-commerce)",
    description: "Catalogue, panier et paiement pour vendre en ligne simplement.",
    tech: "Shopify ou Stripe, emails, suivi des ventes.",
  },
  {
    title: "Espace client / application web",
    description: "Zone privee pour vos clients: comptes, contenu, factures ou suivi.",
    tech: "Connexion, roles, base de donnees.",
  },
  {
    title: "Page de vente / landing",
    description: "Une seule page pour expliquer une offre et recuperer des leads.",
    tech: "Texte clair, formulaire, analytics.",
  },
];

const mvpPills = [
  "App iOS + Android",
  "Prototype testable",
  "Connexion + base de donnees",
  "TestFlight & Android beta",
];

const mvpStats = [
  { label: "Livraison", value: "4-6 semaines", detail: "Prototype testable" },
  { label: "Stack", value: "iOS + Android", detail: "React Native + Expo" },
  { label: "Livrables", value: "App + page de vente", detail: "Dossier pitch inclus" },
  { label: "Support", value: "Accompagnement", detail: "Slack + points hebdo" },
];

const mvpServices = [
  {
    title: "Cadrage simple",
    description: "On clarifie l'idee et les ecrans indispensables.",
    bullets: ["Atelier 60 min", "Liste des ecrans", "Plan de sprint"],
  },
  {
    title: "Design mobile",
    description: "Maquettes claires pour iOS et Android.",
    bullets: ["Design UI", "Prototype cliquable", "Validation rapide"],
  },
  {
    title: "Dossier de presentation",
    description: "Un PDF simple pour presenter le projet.",
    bullets: ["Pitch clair", "Slides utiles", "Roadmap simple"],
  },
];

const contrastThemes = [
  {
    title: "Palette champagne",
    detail: "Fond creme, noirs profonds, touches or pour des marques luxe.",
  },
  {
    title: "Landing lumineuse",
    detail: "Gradient doux pour campagnes premium et collections capsules.",
  },
  {
    title: "Support print",
    detail: "Declinaison claire pour dossiers PDF et brochures haut de gamme.",
  },
];

const processSteps = [
  {
    title: "Brief",
    detail: "On comprend le besoin et on liste les pages ou fonctions.",
  },
  { title: "Direction artistique", detail: "Style, couleurs, typographies et exemples." },
  {
    title: "Build",
    detail: "Developpement + tests sur mobile et desktop.",
  },
  {
    title: "Lancement",
    detail: "Mise en ligne, explications et support inclus.",
  },
];

const faqs = [
  {
    question: "Quel niveau de finition puis-je attendre ?",
    answer:
      "Un rendu propre: design clair, micro-interactions, et un site rapide (Core Web Vitals).",
  },
  {
    question: "Pouvez-vous livrer vite sans perdre la qualite ?",
    answer:
      "Oui. Le process en sprints garde une qualite constante tout en accelerant les validations.",
  },
  {
    question: "Quelle est la difference entre un site et une app ?",
    answer:
      "Un site s'ouvre dans le navigateur. Une app s'installe sur iOS/Android et peut envoyer des notifications.",
  },
  {
    question: "Fournissez-vous textes et visuels ?",
    answer:
      "Oui. Nous pouvons gerer la redaction, la selection d'images et les icones.",
  },
  {
    question: "Gerez-vous SEO, hebergement et suivi ?",
    answer:
      "Oui. Mise en ligne, SEO de base, analytics et optimisations si besoin.",
  },
  {
    question: "Que se passe-t-il apres la mise en ligne ?",
    answer:
      "30 jours de support inclus, puis un forfait maintenance si tu veux garder le rythme.",
  },
];

const stats = [
  { label: "Projets premium", value: "70+" },
  { label: "Satisfaction", value: "9.6/10" },
  { label: "Delai moyen", value: "4-6 semaines" },
];

const fastDeals = [
  {
    title: "Landing conversion",
    budget: "1 900 EUR",
    timeline: "3 semaines (incl. QA)",
    stack: "Next.js, SEO, Email",
    deliverable: "Page unique + formulaire + calendrier",
    href: "/offres#landing-conversion",
  },
  {
    title: "Portail membres priv\u00e9",
    budget: "5 900 EUR",
    timeline: "5 semaines",
    stack: "Supabase Auth, Stripe, Dashboard",
    deliverable: "Espace login + contenus + paiements recurrents",
    href: "/offres#portail-membres",
  },
  {
    title: "Devis interactif + dossier PDF",
    budget: "7 900 EUR",
    timeline: "6 semaines",
    stack: "Next.js, PDF, CRM",
    deliverable: "Simulateur de devis + dossier PDF",
    href: "/offres#configurateur-deck",
  },
];

const closingHighlights = [
  { label: "Budget indicatif", value: "2K EUR - 10K EUR" },
  { label: "Sprint moyen", value: "4 a 6 semaines" },
  { label: "Reponse sous 24h", value: "-24h" },
];

const resultsShowcase = [
  {
    title: "Portail immobilier prive",
    before: "3 leads/semaine",
    after: "14 leads + 2 deals/mois",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "MVP sante premium",
    before: "MVP Figma",
    after: "TestFlight + 400 beta-users",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Boutique haute couture",
    before: "Conversion 0.6%",
    after: "2.1% en 45 jours",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
  },
];

export const aiBusinessGuide = [
  {
    title: "Automatisation relation client",
    description: "Reponses, devis et relances automatiques sans perdre le ton de la marque.",
    pricing: "Budget indicatif: 2 900 - 6 900 EUR",
    timeline: "Mise en place: 2-4 semaines",
    tools: ["ChatGPT", "Make/Zapier", "CRM"],
    image:
      "https://kripesh.b-cdn.net/wp-content/uploads/2023/08/Benefits-of-AI-Tools-for-small-business.jpg",
  },
  {
    title: "Chatbot metier & support",
    description: "Assistant entraine sur vos contenus pour repondre 24/7 et filtrer les demandes.",
    pricing: "Budget indicatif: 3 500 - 9 000 EUR",
    timeline: "Mise en place: 3-5 semaines",
    tools: ["Base de connaissance", "Widget web", "Analytics"],
    image:
      "https://sendbird.imgix.net/cms/Chatbot-UI_Ecommerce-and-customer-service-chatbots.png",
  },
  {
    title: "Qualification & lead scoring",
    description: "Formulaires intelligents, scoring et routage des leads vers l'equipe.",
    pricing: "Budget indicatif: 2 400 - 5 900 EUR",
    timeline: "Mise en place: 2-3 semaines",
    tools: ["Emailing", "CRM", "Scoring IA"],
    image:
      "https://assets.crm.io/static/images/website/blog/ai-powered-linkedin-automation.jpg",
  },
  {
    title: "Contenu & assets IA",
    description: "Templates, contenus et scripts alignes a votre marque pour gagner du temps.",
    pricing: "Budget indicatif: 1 800 - 4 500 EUR",
    timeline: "Mise en place: 1-2 semaines",
    tools: ["Notion", "Templates", "Brand kit"],
    image:
      "https://files.selar.co/product-images/2024/products/digital-spider1/ai-ebook-creator-2-selar.co-659aea700bb13.jpg",
  },
  {
    title: "Micro-outil IA sur-mesure",
    description: "Outil interne: resume, extraction, tri ou aide a la decision.",
    pricing: "Budget indicatif: 4 900 - 12 000 EUR",
    timeline: "MVP: 4-6 semaines",
    tools: ["Next.js", "API IA", "Securite"],
    image:
      "https://cdn.dribbble.com/userupload/18350565/file/original-9e4dbb6e38b8ac5eac4089ecf1e2f1c5.png",
  },
];

const homeSections = [
  { id: "hero", label: "Accueil" },
  { id: "fast-track", label: "Offres" },
  { id: "assets", label: "Assets" },
  { id: "services", label: "Services" },
  { id: "apps", label: "App mobile" },
  { id: "studio-lumiere", label: "Palette" },
  { id: "portfolio", label: "Portfolio" },
  { id: "process", label: "Process" },
  { id: "ai-guide", label: "Modules IA" },
  { id: "results", label: "Resultats" },
  { id: "testimonials", label: "Clients" },
  { id: "closing", label: "Pack" },
  { id: "cta", label: "Contact" },
  { id: "faq", label: "FAQ" },
];

export type HomePageData = {
  services: { title: string; description: string; tech: string }[];
  mvpPills: string[];
  mvpStats: { label: string; value: string; detail: string }[];
  mvpServices: { title: string; description: string; bullets: string[] }[];
  contrastThemes: { title: string; detail: string }[];
  processSteps: { title: string; detail: string }[];
  faqs: { question: string; answer: string }[];
  stats: { label: string; value: string }[];
  fastDeals: { title: string; budget: string; timeline: string; stack: string; deliverable: string; href: string }[];
  closingHighlights: { label: string; value: string }[];
  resultsShowcase: { title: string; before: string; after: string; image: string }[];
  aiBusinessGuide: {
    title: string;
    description: string;
    pricing: string;
    timeline: string;
    tools: string[];
    image: string;
  }[];
  homeSections: { id: string; label: string }[];
};

export const homeData: HomePageData = {
  services,
  mvpPills,
  mvpStats,
  mvpServices,
  contrastThemes,
  processSteps,
  faqs,
  stats,
  fastDeals,
  closingHighlights,
  resultsShowcase,
  aiBusinessGuide,
  homeSections,
};
