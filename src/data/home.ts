const services = [
  {
    title: "Site vitrine (site de présentation)",
    description: "Un site clair pour présenter votre activité, vos offres et récupérer des demandes.",
    tech: "Pages, formulaire, SEO, mise en ligne.",
  },
  {
    title: "Boutique en ligne (e-commerce)",
    description: "Catalogue, panier et paiement pour vendre en ligne simplement.",
    tech: "Shopify ou Stripe, emails, suivi des ventes.",
  },
  {
    title: "Espace client / application web",
    description: "Zone privée pour vos clients : comptes, contenu, factures ou suivi.",
    tech: "Connexion, rôles, base de données.",
  },
  {
    title: "Page de vente / landing",
    description: "Une seule page pour expliquer une offre et récupérer des leads.",
    tech: "Texte clair, formulaire, analytics.",
  },
];

const mvpPills = [
  "App iOS + Android",
  "Prototype testable",
  "Connexion + base de données",
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
    description: "On clarifie l'idée et les écrans indispensables.",
    bullets: ["Atelier 60 min", "Liste des écrans", "Plan de sprint"],
  },
  {
    title: "Design mobile",
    description: "Maquettes claires pour iOS et Android.",
    bullets: ["Design UI", "Prototype cliquable", "Validation rapide"],
  },
  {
    title: "Dossier de présentation",
    description: "Un PDF simple pour présenter le projet.",
    bullets: ["Pitch clair", "Slides utiles", "Roadmap simple"],
  },
];

const contrastThemes = [
  {
    title: "Palette champagne",
    detail: "Fond crème, noirs profonds, touches or pour des marques luxe.",
  },
  {
    title: "Landing lumineuse",
    detail: "Gradient doux pour campagnes premium et collections capsules.",
  },
  {
    title: "Support print",
    detail: "Déclinaison claire pour dossiers PDF et brochures haut de gamme.",
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
    detail: "Développement + tests sur mobile et desktop.",
  },
  {
    title: "Lancement",
    detail: "Mise en ligne, explications et support inclus.",
  },
];

const faqs = [
  {
    question: "Comment se passe un projet concrètement ?",
    answer: "Un premier échange de 15 min permet de clarifier votre besoin, vos priorités et votre contexte. Je vous envoie ensuite une proposition adaptée sous 24h — périmètre clair, délai réaliste, zéro engagement. On valide ensemble, puis on démarre.",
  },
  {
    question: "Quel niveau de qualité puis-je attendre ?",
    answer: "Un rendu premium : design soigné, micro-interactions fluides, code propre, et un site qui score vert sur les Core Web Vitals. Chaque livrable passe par une QA rigoureuse avant mise en ligne.",
  },
  {
    question: "Vous travaillez à distance ?",
    answer: "Oui, intégralement. Clients en Suisse, France et Belgique — avec des points réguliers, une communication réactive (réponse sous 24h en semaine) et un accès permanent à l'avancement du projet.",
  },
  {
    question: "Gérez-vous textes, visuels, SEO et hébergement ?",
    answer: "Oui. Rédaction, sélection d'images, icônes, SEO de base, mise en ligne et analytics — tout est pris en charge si besoin. Rien à gérer de votre côté si vous ne le souhaitez pas.",
  },
  {
    question: "Que se passe-t-il si quelque chose ne me convient pas ?",
    answer: "30 jours de corrections inclus après livraison. Le process inclut des validations régulières pour éviter les surprises — vous voyez l'avancement à chaque étape, pas seulement le résultat final.",
  },
  {
    question: "Pourquoi travailler avec KAH-Digital plutôt qu'une agence classique ?",
    answer: "L'expertise d'un studio senior, la réactivité d'un partenaire dédié. Pas de chef de projet intermédiaire, pas de délais gonflés. Vous avez un interlocuteur unique, disponible, qui connaît votre projet de bout en bout.",
  },
];

const stats = [
  { label: "Projets livrés", value: "70+" },
  { label: "Satisfaction client", value: "9.6/10" },
  { label: "Délai maîtrisé", value: "4–6 semaines" },
];

const fastDeals = [
  {
    title: "Landing conversion",
    budget: "Périmètre simple",
    timeline: "3 semaines (incl. QA)",
    stack: "Next.js, SEO, Email",
    deliverable: "Page unique + formulaire + calendrier",
    href: "/offres#landing-conversion",
  },
  {
    title: "Portail membres privé",
    budget: "Projet évolutif",
    timeline: "5 semaines",
    stack: "Supabase Auth, Stripe, Dashboard",
    deliverable: "Espace login + contenus + paiements récurrents",
    href: "/offres#portail-membres",
  },
  {
    title: "Devis interactif + dossier PDF",
    budget: "Sur mesure",
    timeline: "6 semaines",
    stack: "Next.js, PDF, CRM",
    deliverable: "Simulateur de devis + dossier PDF",
    href: "/offres#configurateur-deck",
  },
];

const closingHighlights = [
  { label: "Devis", value: "Personnalisé" },
  { label: "Sprint moyen", value: "4 a 6 semaines" },
  { label: "Réponse sous 24h", value: "-24h" },
];

const resultsShowcase = [
  {
    title: "Ashanti Beauty — Site vitrine",
    before: "0 réservation en ligne",
    after: "12 réservations/sem dès J+7",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "TechCash Academy — Plateforme",
    before: "0 vente digitale",
    after: "Premiers revenus J+7 après live",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Ruby Gallery — E-commerce art",
    before: "Réseau social uniquement",
    after: "3 ventes Stripe en 2 semaines",
    image: "https://images.unsplash.com/photo-1541367777708-7905fe3296c0?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "TontineApp — MVP mobile",
    before: "Excel + groupes WhatsApp",
    after: "150 beta-testeurs, 0 bug critique",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "FEATNESS — App + Kiosque",
    before: "Idée + brief Notion",
    after: "200 utilisateurs actifs en 6 sem.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=80",
  },
];

export const aiBusinessGuide = [
  {
    title: "Automatisation relation client",
    description: "Réponses, devis et relances automatiques sans perdre le ton de la marque.",
    pricing: "Estimation adaptée après cadrage",
    timeline: "Mise en place: 2-4 semaines",
    tools: ["ChatGPT", "Make/Zapier", "CRM"],
    image:
      "https://kripesh.b-cdn.net/wp-content/uploads/2023/08/Benefits-of-AI-Tools-for-small-business.jpg",
  },
  {
    title: "Chatbot métier & support",
    description: "Assistant entraîné sur vos contenus pour répondre 24/7 et filtrer les demandes.",
    pricing: "Estimation adaptée après cadrage",
    timeline: "Mise en place: 3-5 semaines",
    tools: ["Base de connaissance", "Widget web", "Analytics"],
    image:
      "https://sendbird.imgix.net/cms/Chatbot-UI_Ecommerce-and-customer-service-chatbots.png",
  },
  {
    title: "Qualification & lead scoring",
    description: "Formulaires intelligents, scoring et routage des leads vers l'équipe.",
    pricing: "Estimation adaptée après cadrage",
    timeline: "Mise en place: 2-3 semaines",
    tools: ["Emailing", "CRM", "Scoring IA"],
    image:
      "https://assets.crm.io/static/images/website/blog/ai-powered-linkedin-automation.jpg",
  },
  {
    title: "Contenu & assets IA",
    description: "Templates, contenus et scripts alignés à votre marque pour gagner du temps.",
    pricing: "Estimation adaptée après cadrage",
    timeline: "Mise en place: 1-2 semaines",
    tools: ["Notion", "Templates", "Brand kit"],
    image:
      "https://files.selar.co/product-images/2024/products/digital-spider1/ai-ebook-creator-2-selar.co-659aea700bb13.jpg",
  },
  {
    title: "Micro-outil IA sur-mesure",
    description: "Outil interne : résumé, extraction, tri ou aide à la décision.",
    pricing: "Estimation adaptée après cadrage",
    timeline: "MVP: 4-6 semaines",
    tools: ["Next.js", "API IA", "Sécurité"],
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
  { id: "results", label: "Résultats" },
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
