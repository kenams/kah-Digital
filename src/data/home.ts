const services = [
  {
    title: "Site vitrine premium",
    description:
      "Positionnement, storytelling, preuves sociales et CTA clairs pour que ta marque soit comprise en quelques secondes.",
    tech: "Next.js + Tailwind = site rapide, SEO friendly et flexible.",
    animations: true,
  },
  {
    title: "E-commerce & abonnements",
    description:
      "Parcours d’achat fluide, paiement Stripe/Commerce Layer sécurisé, logistique et CRM reliés pour gérer produits, box ou services.",
    tech: "Stripe, Commerce Layer, Shopify headless, automatisations marketing.",
  },
  {
    title: "Plateforme / web app",
    description:
      "Portails clients, configurateurs, dashboards internes ou SaaS marketing : on pilote UX, front et intégrations API.",
    tech: "Next.js App Router, API routes, auth, stockage et webhooks.",
  },
  {
    title: "Landing & optimisation continue",
    description:
      "Pages de campagne, expérimentations growth et forfaits mensuels (SEO, Core Web Vitals, contenus, sécurité).",
    tech: "Framer Motion, analytics embarqués, monitoring Vercel + audits réguliers.",
  },
];

const mvpPills = ["Sprint 4-6 semaines", "React Native + Expo", "Supabase / Postgres", "TestFlight & Android Beta"];

const mvpStats = [
  { label: "Livraison", value: "4-6 semaines", detail: "Prototype + itérations" },
  { label: "Stack", value: "Expo + Supabase", detail: "Auth, stockage, monitoring" },
  { label: "Livrables", value: "App + landing", detail: "Kit pitch inclu" },
  { label: "Support", value: "Coaching produit", detail: "Slack + Notion partagé" },
];

const mvpServices = [
  {
    title: "Sprint MVP",
    description: "Cadrage express puis prototype cliquable pour valider ton idée.",
    bullets: ["Atelier scope", "Design mobile", "Tests utilisateurs"],
  },
  {
    title: "Run & commerce",
    description: "Features catalogue, paiement et fidélité pour lancer vite un business mobile.",
    bullets: ["Parcours achat", "Stripe/Lemon Squeezy", "Automations CRM"],
  },
  {
    title: "Kit pitch complet",
    description: "Landing, deck investisseur et plan de roadmap pour embarquer ton board.",
    bullets: ["Storytelling", "Slides + deck", "Roadmap priorisée"],
  },
];

const contrastThemes = [
  {
    title: "Palette lumière",
    detail: "Fond crème, typographies noires, touches corail pour rompre avec le mode nuit.",
  },
  {
    title: "Landing chaude",
    detail: "Gradient pêche/rose parfait pour des offres coaching, beauty ou lifestyle.",
  },
  {
    title: "Support print",
    detail: "Déclinaison couleur claire pour les slides pitch ou brochures PDF.",
  },
];

const processSteps = [
  {
    title: "Brief",
    detail:
      "On clarifie ton objectif, tes cibles et les pages nécessaires. Tu peux répondre à un questionnaire simple.",
  },
  { title: "Design", detail: "Moodboard, UI premium et prototypes interactifs validés ensemble." },
  {
    title: "Développement",
    detail: "Next.js + Tailwind pour un site rapide, responsive et facile à maintenir.",
  },
  {
    title: "Livraison",
    detail: "Recette complète, formation, doc Notion et 30 jours de support inclus.",
  },
];

const faqs = [
  {
    question: "Combien de temps pour livrer un projet (site ou app MVP) ?",
    answer:
      "Pour un site vitrine ou une landing, compte 3 à 4 semaines. Un e-commerce ou une plateforme nécessite 4 à 6 semaines. Un MVP mobile (React Native + Expo) sort en 4 semaines avec un premier build TestFlight/Android Beta.",
  },
  {
    question: "Fournissez-vous les textes et visuels ?",
    answer:
      "Oui. Nous pouvons t’aider pour la rédaction, les photos ou la vidéo. Objectif : un message clair même si tu n’as rien sous la main.",
  },
  {
    question: "Comment se passe le suivi ?",
    answer:
      "On ouvre un espace Notion + Slack (ou WhatsApp) avec les étapes, retours et validations. Tu vois l’avancement en temps réel pour la partie site ET pour l’app MVP.",
  },
  {
    question: "Pouvez-vous gérer hébergement, stores et analytics ?",
    answer:
      "Côté web : Vercel + monitoring, SEO, backups. Côté mobile : configuration Apple/Google, push, analytics embarqués (PostHog, Sentry) et support publication.",
  },
  {
    question: "Que se passe-t-il après la mise en ligne ?",
    answer:
      "On reste disponible 30 jours pour ajuster site ou app. Ensuite tu peux garder un forfait maintenance ou piloter en interne avec la doc fournie.",
  },
];

const stats = [
  { label: "Projets livres", value: "65+" },
  { label: "NPS moyen", value: "9.6/10" },
  { label: "Delai moyen", value: "4 semaines" },
];

const fastDeals = [
  {
    title: "Landing / fonds d’investissement",
    budget: "18 000 €",
    timeline: "3 semaines (incl. QA)",
    stack: "Next.js, Resend, Notion CMS",
    deliverable: "Storytelling + chiffres clés + CTA calendrier",
  },
  {
    title: "Portail luxe / membres privés",
    budget: "28 000 €",
    timeline: "5 semaines",
    stack: "Next.js, Supabase, Stripe Billing",
    deliverable: "Accès sécurisé, vitrines catalogue, paiement récurrent",
  },
  {
    title: "Configurator + deck MVP",
    budget: "36 000 €",
    timeline: "6 semaines",
    stack: "React Native + Expo, Next.js marketing",
    deliverable: "App TestFlight + deck investisseur prêt à envoyer",
  },
];

const closingHighlights = [
  { label: "Budget indicatif", value: "12K€ – 30K€" },
  { label: "Sprint moyen", value: "4 à 6 semaines" },
  { label: "Réponse", value: "-24h" },
];

const resultsShowcase = [
  {
    title: "Portail immobilier privé",
    before: "3 leads/semaine",
    after: "14 leads + 2 deals/mois",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "MVP réservation santé",
    before: "MVP Figma",
    after: "Lancement TestFlight + 400 beta-users",
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
  { id: "fast-track", label: "Fast deals" },
  { id: "assets", label: "Assets" },
  { id: "services", label: "Sites web" },
  { id: "apps", label: "Apps & MVP" },
  { id: "studio-lumiere", label: "Palette" },
  { id: "portfolio", label: "Portfolio" },
  { id: "process", label: "Process" },
  { id: "results", label: "Résultats" },
  { id: "testimonials", label: "Clients" },
  { id: "closing", label: "Pack closing" },
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
    homeSections
} as const;

export type HomePageData = typeof homeData;
