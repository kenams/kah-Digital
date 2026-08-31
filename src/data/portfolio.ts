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
  hideLiveLink?: boolean;
  demoRequest?: boolean;
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
    slug: "dse-yana",
    name: "DSE Yana",
    type: "Site premium + prise de rendez-vous / Bureau d'études fluides, Guyane",
    tagline:
      "Le site d'un bureau d'études techniques en Guyane — plans d'exécution fluides, prise de rendez-vous en autonomie et espace d'administration. Client réel, en production sur son domaine.",
    shortDescription:
      "Site sur-mesure Next.js pour un bureau d'études fluides guyanais : présentation des 4 lots (électricité, plomberie, eau chaude solaire, climatisation-ventilation), prise de rendez-vous en ligne au fuseau de Guyane et back-office.",
    description:
      "DSE — Dessin & Suivi Économique est un bureau d'études techniques basé à Matoury, en Guyane. L'ancien site ne rendait pas justice au métier. Nouvelle identité dérivée du logo, contenu réécrit pour être compris autant par un particulier que par une entreprise, sections dédiées aux 4 lots fluides, à un livrable réel (plan d'exécution anonymisé) et au suivi économique de chantier. Le visiteur peut réserver un rendez-vous seul, sans échange d'emails, avec confirmation, fichier agenda et rappel automatique la veille.",
    challenge:
      "Faire monter en gamme l'image d'un bureau d'études sans équipe marketing, rendre un métier technique accessible au grand public, et transformer les demandes entrantes en rendez-vous qualifiés sans multiplier les allers-retours par email.",
    solution:
      "Next.js App Router, identité et palette dérivées du logo, contenu vulgarisé, module de prise de rendez-vous maison (créneaux au fuseau America/Cayenne, confirmation + fichier agenda, annulation en un clic, rappel automatique la veille via tâche planifiée), espace d'administration (demandes, rendez-vous) et formulaire d'étude connecté à la base. Base Supabase, emails Resend, déploiement Vercel.",
    stack: ["Next.js", "TypeScript", "Prisma", "Supabase", "Resend", "Vercel"],
    result:
      "Site en ligne sur son propre domaine, prise de rendez-vous en autonomie opérationnelle et espace d'administration livré.",
    timeline: "≈ 2 semaines",
    deliverables: [
      "Site premium sur-mesure (identité, 8 sections, contenu réécrit)",
      "Module de prise de rendez-vous en autonomie (fuseau Guyane, fichier agenda, rappel la veille)",
      "Espace d'administration (demandes de contact, rendez-vous)",
      "Formulaire d'étude connecté à la base de données",
      "SEO complet, mise en production sur domaine propre",
    ],
    metrics: [
      { label: "Lots fluides", value: "4" },
      { label: "Prise de RDV", value: "En autonomie" },
      { label: "Mise en ligne", value: "Domaine propre" },
    ],
    highlights: [
      "Client réel — bureau d'études en Guyane, site en production sur son domaine",
      "Prise de rendez-vous complète (créneaux, confirmation, annulation, rappel), pas un simple formulaire",
      "Contenu technique rendu accessible aux particuliers comme aux entreprises",
    ],
    palette: {
      primary: "#6d28d9",
      secondary: "#4c1d95",
      accent: "#10b981",
    },
    website: "https://www.dse-yana.com",
    mockups: {
      primary: "/mockups/dse-yana-screenshot.png",
      gallery: ["/mockups/dse-yana-screenshot.png"],
    },
  },
  {
    slug: "bcs-nettoyage",
    name: "BCS Nettoyage",
    type: "Site vitrine + réservation en ligne / Entreprise de nettoyage, Toulouse",
    tagline:
      "Le site d'une entreprise de nettoyage à domicile, avec prise de rendez-vous en ligne — livré prêt à recevoir des demandes.",
    shortDescription:
      "Site vitrine Next.js pour une entreprise de nettoyage à Toulouse : services, tarifs, galerie avant/après et réservation de créneau en ligne.",
    description:
      "BCS Nettoyage intervient à domicile sur Toulouse — voitures, appartements, textiles. L'objectif : un site clair qui inspire confiance et transforme un visiteur en rendez-vous, sans passer par un appel. Design sur mesure centré sur les résultats (galerie avant/après), tarifs transparents par prestation, et un formulaire de réservation avec date et créneau. Le site est en ligne sur son propre domaine.",
    challenge:
      "Donner à une petite entreprise de nettoyage un site qui rassure autant qu'un bouche-à-oreille, et qui capte les demandes de rendez-vous directement — sans dépendre uniquement du téléphone.",
    solution:
      "Next.js App Router, design mobile-first centré sur les visuels de résultats, page tarifs par prestation, formulaire de réservation (date + créneau) et raccourcis WhatsApp / appel / email. Déploiement continu sur Vercel.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    result:
      "Site en ligne sur bcs-nettoyage.fr, avec réservation de créneau opérationnelle et un parcours de contact multi-canal.",
    timeline: "≈ 1 semaine",
    deliverables: [
      "Site vitrine complet (services, tarifs, avant/après, FAQ, contact)",
      "Réservation de créneau en ligne (date + horaire)",
      "Raccourcis WhatsApp, appel et email",
      "Design mobile-first sur mesure",
      "Déploiement Vercel + domaine propre",
    ],
    metrics: [
      { label: "Mise en ligne", value: "Domaine propre" },
      { label: "Réservation", value: "En ligne" },
      { label: "Contact", value: "Multi-canal" },
    ],
    highlights: [
      "Client réel — entreprise de nettoyage à Toulouse, site en production sur son domaine",
      "Prise de rendez-vous en ligne intégrée, pas juste un formulaire de contact",
      "Design orienté conversion autour des résultats avant/après",
    ],
    palette: {
      primary: "#0b1f3a",
      secondary: "#12335c",
      accent: "#2eb872",
    },
    website: "https://bcs-nettoyage.fr",
    mockups: {
      primary: "/mockups/bcs-nettoyage-screenshot.png",
      gallery: ["/mockups/bcs-nettoyage-screenshot.png"],
    },
  },
  {
    slug: "kah-workforce",
    name: "KAH Workforce",
    type: "Agent IA vertical / Chef de cabinet pour artistes indépendants",
    tagline:
      "Le produit phare de KAH Digital — un agent IA branché sur le business d'un artiste indépendant, de bout en bout.",
    shortDescription:
      "Chef de cabinet IA autonome pour artistes indépendants : contrats, tournées, réseaux, royalties et décisions courantes gérés sans intervention manuelle.",
    description:
      "KAH Workforce n'est pas un chatbot posé sur un site — c'est un agent IA vertical qui connaît le métier d'artiste indépendant de bout en bout. Contrats, dates de tournée, réseaux sociaux, royalties, relances : l'agent agit à la place de l'artiste sur les décisions courantes, avec mémoire persistante et intégration à ses outils réels. C'est la preuve en production du positionnement KAH Digital : des agents IA verticaux, pas des sites de plus.",
    challenge:
      "Donner à un artiste indépendant, sans équipe de management, l'équivalent d'un chef de cabinet disponible 24h/24 — capable de suivre son business réel, pas juste de répondre à des questions génériques.",
    solution:
      "Un agent IA vertical pensé pour un métier précis, avec une mémoire persistante et un pilotage quotidien sans friction — l'architecture technique détaillée reste réservée aux échanges commerciaux.",
    stack: ["Next.js", "TypeScript", "Claude", "Supabase", "Stripe", "Vercel"],
    result:
      "Agent IA vertical en production, chef de cabinet autonome pour artistes indépendants — le produit qui illustre le positionnement KAH Digital.",
    timeline: "En développement continu",
    deliverables: [
      "Agent IA vertical intégré aux outils réels de l'artiste",
      "Suivi contrats, tournées et royalties",
      "Décisions courantes déléguées",
      "Mémoire persistante et pilotage 24h/24",
    ],
    metrics: [
      { label: "Disponibilité", value: "24h/24" },
      { label: "Métier couvert", value: "1 seul, à fond" },
      { label: "Statut", value: "En prod" },
    ],
    highlights: [
      "Produit phare de KAH Digital — preuve concrète du positionnement agents IA verticaux",
      "Agent vertical, pas un chatbot générique",
      "Modèle repris pour les agents IA verticaux sur mesure vendus par KAH Digital",
    ],
    palette: {
      primary: "#0a0612",
      secondary: "#1a0f2e",
      accent: "#8b5cf6",
    },
    website: "https://kah-workforce.vercel.app",
    hideLiveLink: true,
  },
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
    website: "https://clutch.kah-digital.ch/",
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
      primary: "/mockups/kah-prod-screenshot.png",
      gallery: ["/mockups/kah-prod-screenshot.png"],
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
      primary: "/mockups/minealert-screenshot.png",
      gallery: ["/mockups/minealert-screenshot.png"],
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
    mockups: {
      primary: "/mockups/techcash-academy-screenshot.png",
      gallery: ["/mockups/techcash-academy-screenshot.png"],
    },
  },
  {
    slug: "castly",
    name: "Castly",
    type: "SaaS / Plateforme de casting",
    tagline:
      "Une plateforme KAH-Digital qui connecte recruteurs et artistes en quelques clics — sans agence, sans attente.",
    shortDescription:
      "Matching artistes / recruteurs avec système de crédits, Stripe live, auth Supabase et profils vérifiés.",
    description:
      "Castly est une plateforme conçue par KAH-Digital pour moderniser le casting indépendant. Les recruteurs publient leurs offres, les artistes postulent avec leur profil, et le contact se débloque via un système de crédits. Pas d'abonnement, pas d'agence — juste le bon profil au bon moment.",
    challenge:
      "Créer un marché biface (artistes / recruteurs) avec une monétisation simple par crédits, une expérience premium côté design, et un backend fiable pour gérer l'auth, les paiements et le matching.",
    solution:
      "Next.js full-stack, Supabase pour l'auth et la DB, Stripe live pour les packs de crédits (5 / 20 / 50 crédits), vidéo hero full-bleed, nav transparente scrollée, témoignages et FAQ intégrés.",
    stack: ["Next.js", "TypeScript", "Supabase", "Stripe", "Vercel"],
    result:
      "Plateforme live avec paiements réels, profils artistes et recruteurs, et système de crédits opérationnel.",
    timeline: "4 semaines",
    deliverables: [
      "Auth Supabase + profils artistes / recruteurs",
      "Système de crédits + checkout Stripe live",
      "Matching et révélation de contact",
      "Design premium vidéo hero + FAQ",
    ],
    metrics: [
      { label: "Packs crédits", value: "3" },
      { label: "Paiements", value: "Stripe live" },
      { label: "Base", value: "Supabase + Vercel" },
    ],
    highlights: [
      "Marché biface artistes / recruteurs",
      "Crédits sans abonnement — 9,90€ / 29,90€ / 59,90€",
      "Auth Supabase + Stripe live opérationnel",
    ],
    palette: {
      primary: "#07070f",
      secondary: "#12121e",
      accent: "#e8b86d",
    },
    website: "https://castly-chi.vercel.app/",
    mockups: {
      primary: "/mockups/castly-screenshot.png",
      gallery: ["/mockups/castly-screenshot.png"],
    },
  },
  {
    slug: "kotizy",
    name: "Kotizy",
    type: "Application / Tontines digitales",
    tagline:
      "La tontine de la diaspora — épargne collective en ligne, sécurisée et automatisée.",
    shortDescription:
      "PWA Next.js + application mobile Expo pour organiser des tontines entre proches. Cotisations automatiques, tirage au sort, historique complet et paiements Stripe.",
    description:
      "Kotizy réinvente la tontine, cette pratique d'épargne collective venue d'Afrique et des Caraïbes, pour la diaspora connectée. Plus de collecte d'argent en cash, plus de confiance aveugle : chaque cycle est automatisé, chaque paiement tracé, chaque tirage au sort auditable. Disponible en PWA sur navigateur et en application mobile via Expo.",
    challenge:
      "Digitaliser une pratique communautaire profondément humaine sans en trahir l'esprit — garder la confiance, supprimer les frictions et sécuriser les fonds sans barrière technologique.",
    solution:
      "Stack Next.js PWA + Expo React Native, Supabase pour la base de données temps réel, Stripe pour les paiements automatiques, système de tirage au sort vérifiable et notifications push multiplateforme.",
    stack: ["Next.js", "Expo", "TypeScript", "Supabase", "Stripe", "PostgreSQL"],
    result:
      "Application live, 19 bugs corrigés en QA exhaustive, 56/56 tests passés. Prête pour onboarding des premiers cercles de tontine.",
    timeline: "6 semaines",
    deliverables: [
      "PWA accessible sur tous les navigateurs",
      "Application mobile Android & iOS (Expo)",
      "Gestion des cycles, cotisations et tirages au sort",
      "Paiements Stripe automatisés",
      "Notifications push temps réel",
    ],
    metrics: [
      { label: "Tests QA passés", value: "56/56" },
      { label: "Plateformes", value: "Web + Android + iOS" },
      { label: "Bugs corrigés", value: "19" },
    ],
    highlights: [
      "Tirage au sort auditable et transparent",
      "Cotisations automatiques via Stripe",
      "PWA + mobile natif — zéro friction d'adoption",
    ],
    palette: {
      primary: "#0f172a",
      secondary: "#1e293b",
      accent: "#f59e0b",
    },
    website: "https://kotizy.kah-digital.ch/",
    mockups: {
      primary: "/mockups/kotizy-screenshot.png",
      gallery: ["/mockups/kotizy-screenshot.png"],
    },
  },
  {
    slug: "vellio",
    name: "Vellio Shop",
    type: "E-commerce / Maison & Design",
    tagline:
      "Une boutique en ligne haut de gamme pour une marque de sélection contemporaine.",
    shortDescription:
      "E-commerce Next.js avec Stripe live, 21 produits répartis en 8 catégories, prospection automatisée et design premium.",
    description:
      "Vellio est une maison de sélection contemporaine — décoration, mobilier et objets de style. La boutique a été construite pour offrir une expérience d'achat premium : navigation fluide, fiches produits soignées, paiement Stripe sécurisé et gestion des commandes intégrée. Le tout deployé sur Vercel avec des performances Lighthouse au top.",
    challenge:
      "Créer l'environnement digital d'une marque premium avec un budget maîtrisé — sans sacrifier le design, la performance ni la conversion.",
    solution:
      "Next.js App Router, Stripe Checkout en mode live, catalogue géré via fichiers statiques typés, emails transactionnels Resend, déploiement continu Vercel.",
    stack: ["Next.js", "TypeScript", "Stripe", "Resend", "Vercel", "Tailwind CSS"],
    result:
      "Boutique live avec 21 produits, paiements Stripe en production, emails de confirmation automatiques et design premium prêt à convertir.",
    timeline: "3 semaines",
    deliverables: [
      "Boutique e-commerce complète 21 produits / 8 catégories",
      "Paiement Stripe live sécurisé",
      "Emails de confirmation Resend",
      "Design premium responsive",
      "Déploiement Vercel continu",
    ],
    metrics: [
      { label: "Produits", value: "21" },
      { label: "Catégories", value: "8" },
      { label: "Paiements", value: "Stripe Live" },
    ],
    highlights: [
      "Design premium niveau agence — typographie, espacements, palette neutre",
      "Stripe live — pas de mode test, ventes réelles dès le jour 1",
      "Performance Vercel Edge — temps de chargement < 1s",
    ],
    palette: {
      primary: "#111111",
      secondary: "#1c1c1c",
      accent: "#c9a96e",
    },
    website: "https://vellio.kah-digital.ch/",
    mockups: {
      primary: "/mockups/vellio-screenshot.png",
      gallery: ["/mockups/vellio-screenshot.png"],
    },
  },
  {
    slug: "assistant-pme",
    name: "Assistant PME IA",
    type: "Application SaaS / Support IT & IA",
    tagline:
      "Un assistant IA spécialisé support informatique pour les PME — disponible 24h/24, sans technicien.",
    shortDescription:
      "Application SaaS live avec OpenAI, abonnement Stripe, base PostgreSQL et interface admin complète. Support IT automatisé pour les petites entreprises.",
    description:
      "L'Assistant PME IA est né d'un constat terrain : les PME n'ont pas les moyens d'un service IT dédié mais subissent autant de pannes et de questions techniques. Cette application propose un assistant conversationnel formé sur les problèmes IT les plus courants — réseau, imprimantes, accès, logiciels — accessible depuis n'importe quel appareil, à n'importe quelle heure.",
    challenge:
      "Rendre l'expertise IT accessible aux PME sans technicien à plein temps — fiable, abordable et suffisamment intelligent pour traiter 80% des demandes de niveau 1.",
    solution:
      "Next.js + PostgreSQL (Render), OpenAI GPT-4 via API, abonnements Stripe avec différents niveaux d'accès, panel admin pour gérer les entreprises clientes, emails Resend.",
    stack: ["Next.js", "PostgreSQL", "OpenAI", "Stripe", "Render", "Resend"],
    result:
      "Application live en production sur Render, abonnements Stripe actifs, interface admin opérationnelle. Prêt pour acquisition clients PME.",
    timeline: "4 semaines",
    deliverables: [
      "Assistant IA conversationnel spécialisé IT",
      "Système d'abonnement Stripe multi-plans",
      "Panel admin de gestion clients",
      "Base de connaissances IT intégrée",
      "Emails automatiques Resend",
    ],
    metrics: [
      { label: "Modèle IA", value: "GPT-4" },
      { label: "Disponibilité", value: "24h/24 7j/7" },
      { label: "Paiements", value: "Stripe Live" },
    ],
    highlights: [
      "Répond aux demandes IT niveau 1 sans intervention humaine",
      "Stripe live — abonnements mensuels actifs",
      "Déployé sur Render avec PostgreSQL en production",
    ],
    palette: {
      primary: "#0a0a14",
      secondary: "#13131f",
      accent: "#6366f1",
    },
    website: "https://pme.kah-digital.ch/",
    mockups: {
      primary: "/mockups/assistant-pme-screenshot.png",
      gallery: ["/mockups/assistant-pme-screenshot.png"],
    },
  },
  {
    slug: "w11-control-center",
    name: "W11 Control Center",
    type: "Application SaaS / Dashboard IT",
    tagline:
      "Un tableau de bord interne pour piloter une migration Windows 11 à grande échelle sur un parc informatique multi-sites.",
    shortDescription:
      "Dashboard Next.js avec authentification par rôles, suivi de migration par site, import CSV, IA intégrée et cron Vercel pour les snapshots automatiques.",
    description:
      "W11 Control Center est un outil de pilotage interne développé pour un groupe industriel multi-sites afin de gérer une migration de parc informatique vers Windows 11 à grande échelle. Plusieurs centaines de postes, plusieurs sites géographiques, différents profils d'utilisateurs (admin, DSI, pilote, viewer) — tout est centralisé dans un seul dashboard sécurisé, avec un assistant IA pour répondre aux questions techniques en temps réel.",
    challenge:
      "Piloter une migration Windows 11 à grande échelle dans un groupe industriel multi-sites, avec des équipes IT dispersées et des données machines hétérogènes.",
    solution:
      "Dashboard sécurisé avec authentification par rôles, import de données par lot, assistant IA contextuel et snapshots automatiques — l'architecture technique détaillée reste réservée aux échanges commerciaux.",
    stack: ["Next.js 16", "Supabase", "TypeScript", "Groq AI", "Vercel", "Playwright"],
    result:
      "Plusieurs centaines de machines trackées, migration en cours. Dashboard live avec stats temps réel, import batch et IA contextuelle pour l'équipe IT.",
    timeline: "2 semaines",
    deliverables: [
      "Dashboard de pilotage multi-sites",
      "Auth multi-rôles (admin / DSI / pilote / viewer)",
      "Import CSV batch de machines",
      "Assistant IA contextuel",
      "Cron snapshots + export XLSX",
    ],
    metrics: [
      { label: "Machines trackées", value: "350+" },
      { label: "Migration", value: "En cours" },
      { label: "Rôles utilisateurs", value: "4" },
    ],
    highlights: [
      "IA Groq Llama 3.3 70b — gratuite, rapide, contextuelle",
      "RLS Supabase — chaque rôle voit uniquement ses données",
      "Stats temps réel via fonction SQL optimisée (1 requête au lieu de 8)",
    ],
    palette: {
      primary: "#0d1117",
      secondary: "#161b22",
      accent: "#3b82f6",
    },
    website: "https://w11.kah-digital.ch/",
    hideLiveLink: true,
    mockups: {
      primary: "/mockups/w11-screenshot.png",
      gallery: ["/mockups/w11-screenshot.png"],
    },
  },
];
