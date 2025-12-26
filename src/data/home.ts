const services = [
  {
    title: "Site vitrine haut de gamme",
    description:
      "Storytelling clair, brand system coherant et interactions subtiles pour un site rapide et luxueux.",
    tech: "Next.js App Router, Tailwind, Vercel Edge.",
  },
  {
    title: "E-commerce premium",
    description:
      "Experience d'achat fluide, merchandising raffine, checkout optimise et CRM connecte.",
    tech: "Shopify headless, Stripe, analytics, automations.",
  },
  {
    title: "Portail prive / web app",
    description:
      "Espaces membres, dashboards internes et services B2B avec securite et roles.",
    tech: "Auth, roles, CMS, API et webhooks.",
  },
  {
    title: "Landing & optimisation",
    description:
      "Pages de campagne, A/B tests et performance pour convertir sans sacrifier le style.",
    tech: "Core Web Vitals, SEO, tracking et monitoring.",
  },
];

const mvpPills = [
  "Sprint 4-6 semaines",
  "React Native + Expo",
  "Supabase / Postgres",
  "TestFlight & Android Beta",
];

const mvpStats = [
  { label: "Livraison", value: "4-6 semaines", detail: "Prototype + iterations" },
  { label: "Stack", value: "Expo + Supabase", detail: "Auth, storage, monitoring" },
  { label: "Livrables", value: "App + landing", detail: "Kit pitch inclus" },
  { label: "Support", value: "Conciergerie", detail: "Slack + Notion partages" },
];

const mvpServices = [
  {
    title: "Sprint MVP",
    description: "Cadrage express puis prototype cliquable pour valider l'idee.",
    bullets: ["Atelier scope", "Design mobile", "Tests utilisateurs"],
  },
  {
    title: "Run & commerce",
    description: "Features catalogue, paiement et fidelite pour lancer vite.",
    bullets: ["Parcours achat", "Stripe", "Automations CRM"],
  },
  {
    title: "Kit pitch complet",
    description: "Landing, deck investisseur et plan de roadmap clair.",
    bullets: ["Storytelling", "Slides + deck", "Roadmap priorisee"],
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
    detail: "Declinaison claire pour pitch decks et brochures haut de gamme.",
  },
];

const processSteps = [
  {
    title: "Brief",
    detail: "On clarifie l'objectif, le positionnement et les pages prioritaires.",
  },
  { title: "Direction artistique", detail: "Moodboard, UI premium et prototypes valides." },
  {
    title: "Build",
    detail: "Next.js + Tailwind pour un site rapide, responsive et maintenable.",
  },
  {
    title: "Lancement",
    detail: "Recette complete, formation et 30 jours de support inclus.",
  },
];

const faqs = [
  {
    question: "Quel niveau de finition puis-je attendre ?",
    answer:
      "Un rendu premium: design system propre, micro-interactions elegantes, et un site rapide (Core Web Vitals).",
  },
  {
    question: "Pouvez-vous livrer vite sans perdre la qualite ?",
    answer:
      "Oui. Notre process court en sprints garde une qualite constante tout en accelerant les validations.",
  },
  {
    question: "Fournissez-vous textes et visuels ?",
    answer:
      "Oui. Nous pouvons gerer la redaction, la selection d'images et l'iconographie.",
  },
  {
    question: "Gerez-vous SEO, hebergement et suivi ?",
    answer:
      "Oui. Vercel + monitoring, SEO, analytics et optimisations continues si besoin.",
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
    title: "Signature landing",
    budget: "18 000 EUR",
    timeline: "3 semaines (incl. QA)",
    stack: "Next.js, Resend, Notion CMS",
    deliverable: "Storytelling premium + CTA calendrier",
  },
  {
    title: "Portail membres prive",
    budget: "28 000 EUR",
    timeline: "5 semaines",
    stack: "Next.js, Supabase, Stripe Billing",
    deliverable: "Acces securise, dashboards, paiement recurrent",
  },
  {
    title: "Configurator + deck",
    budget: "36 000 EUR",
    timeline: "6 semaines",
    stack: "React Native + Expo, Next.js marketing",
    deliverable: "App TestFlight + deck investisseur",
  },
];

const closingHighlights = [
  { label: "Budget indicatif", value: "12K EUR - 30K EUR" },
  { label: "Sprint moyen", value: "4 a 6 semaines" },
  { label: "Reponse", value: "-24h" },
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

const homeSections = [
  { id: "hero", label: "Accueil" },
  { id: "fast-track", label: "Signature" },
  { id: "assets", label: "Assets" },
  { id: "services", label: "Services" },
  { id: "apps", label: "MVP" },
  { id: "studio-lumiere", label: "Palette" },
  { id: "portfolio", label: "Portfolio" },
  { id: "process", label: "Process" },
  { id: "results", label: "Resultats" },
  { id: "testimonials", label: "Clients" },
  { id: "closing", label: "Pack" },
  { id: "cta", label: "Contact" },
  { id: "faq", label: "FAQ" },
] as const;

export const homeData = {
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
  homeSections,
} as const;

export type HomePageData = typeof homeData;
