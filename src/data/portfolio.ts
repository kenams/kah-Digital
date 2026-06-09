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
  demoRequest?: boolean;
  downloadLinks?: {
    android?: string;
    ios?: string;
  };
  mockups?: {
    primary?: string;
    gallery?: string[];
  };
  launchDate?: string;
};

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "kotizy",
    name: "Kotizy",
    type: "Application mobile & Web App / Fintech diaspora",
    tagline:
      "La première plateforme de tontine digitale pour la diaspora africaine. Cotisations automatiques, wallet multi-devise, paiements Mobile Money — disponible sur Android et iOS.",
    shortDescription:
      "App Next.js PWA + Expo React Native. Wallet intégré, Stripe, CinetPay (Orange Money, MTN, Wave), score de confiance, notifications push. Livré en production.",
    description:
      "Kotizy digitalise la tontine africaine — ce système d'épargne collective ancestral — en une expérience moderne, sécurisée et automatisée. KAH Digital a conçu et développé l'intégralité de la plateforme : web app Next.js déployée sur Vercel, application native Android via Expo, backend API avec Prisma/Supabase, système de paiement multi-devise (Stripe, CinetPay), et un cron quotidien qui gère les cotisations, les rappels et les versements de manière 100% automatique.",
    challenge:
      "Créer une plateforme financière robuste pour la diaspora africaine : multi-devise (EUR, XOF, GBP), paiements Mobile Money (Orange Money, MTN, Wave), score de confiance, gestion des défauts de paiement et versements automatiques — le tout sans intervention manuelle.",
    solution:
      "Stack Next.js App Router + Expo React Native. Wallet intégré avec Stripe live, CinetPay pour le Mobile Money africain, cron Vercel quotidien pour l'auto-pay et les payouts, score de confiance algorithmique, notifications push, PWA installable sur iOS.",
    stack: ["Next.js", "Expo React Native", "Supabase", "Prisma", "Stripe", "CinetPay", "Vercel", "TypeScript"],
    result:
      "Application en production. Disponible sur Android (APK direct) et iOS (PWA). Paiements Stripe live actifs. CinetPay Mobile Money en cours de validation KYC.",
    timeline: "6 semaines",
    deliverables: [
      "Web App Next.js (PWA installable iOS)",
      "Application Android native (APK)",
      "Wallet multi-devise + paiements Stripe & CinetPay",
      "Cron quotidien : auto-pay, rappels, payouts automatiques",
      "Score de confiance + système de badges",
      "Chat de groupe + notifications push",
    ],
    metrics: [
      { label: "Plateformes", value: "Web + Android" },
      { label: "Fournisseurs paiement", value: "Stripe + CinetPay" },
      { label: "Délai de livraison", value: "6 semaines" },
    ],
    highlights: [
      "100% automatisé — cotisations, rappels, versements",
      "Mobile Money : Orange Money · MTN · Wave · Moov",
      "Score de confiance & badges diaspora",
    ],
    palette: {
      primary: "#080b07",
      secondary: "#0f1a0e",
      accent: "#22c55e",
    },
    website: "https://tontineapp-web.vercel.app",
    downloadLinks: {
      android: "https://github.com/kenams/tontine/releases/download/v2.2.0/kotizy-v2.2.0.apk",
      ios: "https://tontineapp-web.vercel.app/install-ios",
    },
    mockups: {
      primary: "/portfolio/kotizy.png",
      gallery: [
        "/portfolio/kotizy-dashboard.png",
        "/portfolio/kotizy.png",
      ],
    },
  },
  {
    slug: "ashanti-beauty",
    name: "Ashanti Beauty",
    type: "Site vitrine premium / Institut de beauté",
    tagline:
      "Site vitrine premium pour un institut de beauté haut de gamme à Balma — vidéo plein écran, 5 pôles de prestations, 12 réservations/semaine en ligne dès le lancement.",
    shortDescription:
      "Site Next.js premium avec hero vidéo HD, 5 pôles de prestations avec boutons Planity, partenaires, galerie, avis clients et Google Maps.",
    description:
      "Ashanti Beauty est un institut de beauté premium situé à Balma (31). KAH Digital a conçu et développé leur site vitrine avec un rendu haut de gamme : vidéo hero plein écran optimisée mobile et desktop, présentation de l'univers de l'institut, 5 pôles de prestations (Nails Bar, Brows Bar, Lashes Bar, Esthétique, Massage), section partenaires, galerie Instagram, avis clients et carte Google Maps.",
    challenge:
      "Créer un site qui reflète le positionnement premium de l'institut, intégrer une vidéo HD fonctionnelle sur mobile sans dégrader les performances, et convertir les visiteuses en réservations via Planity.",
    solution:
      "Site Next.js 16 avec Tailwind CSS, composant hero vidéo responsive, animations cinématiques maîtrisées, sections reveal au scroll, boutons Planity sur chaque pôle, Google Maps intégré et footer épuré.",
    stack: ["Next.js 16", "Tailwind CSS", "TypeScript", "Vercel"],
    result:
      "Site premium en ligne. 12 réservations en ligne par semaine dès la première semaine — contre 0 avant le site.",
    timeline: "1 semaine",
    deliverables: [
      "Hero vidéo plein écran HD",
      "5 sections prestations avec CTA Planity",
      "Section partenaires (9 marques)",
      "Galerie + avis + Google Maps",
    ],
    metrics: [
      { label: "Réservations/sem", value: "12" },
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
    mockups: {
      primary: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80",
      ],
    },
  },
  {
    slug: "techcash-academy",
    name: "TechCash Academy",
    type: "Plateforme de formation / checkout Stripe",
    tagline:
      "Plateforme e-learning complète avec catalogue multi-formations, espace membre et checkout Stripe — premiers revenus J+7 après mise en ligne.",
    shortDescription:
      "Catalogue multi-produits, auth Supabase, checkout Stripe, dashboard membre et contenus texte, PDF, ressources, vidéo.",
    description:
      "TechCash Academy est une plateforme de vente de formations digitales conçue par KAH Digital. Le site propose un catalogue clair, un checkout Stripe par formation, un espace membre produit par produit et une interface admin pour piloter le catalogue et les modules.",
    challenge:
      "Construire une academy crédible et performante, capable de vendre plusieurs offres sans tunnel brouillon, avec un espace membre lisible et un checkout fiable.",
    solution:
      "Next.js avec Supabase pour l'authentification et les achats, checkout Stripe relié au bon produit, dashboard membre par formation, interface admin pour le contenu.",
    stack: ["Next.js", "TypeScript", "Supabase", "Stripe", "Vercel"],
    result:
      "Plateforme live. Premiers achats enregistrés 7 jours après la mise en ligne. Espace membre opérationnel dès le lancement.",
    timeline: "1 semaine",
    deliverables: [
      "Catalogue multi-formations",
      "Checkout Stripe + webhook",
      "Dashboard membre + admin contenu",
      "Direction produit et tunnel academy",
    ],
    metrics: [
      { label: "Formations live", value: "5" },
      { label: "1ers revenus", value: "J+7" },
      { label: "Stack", value: "Supabase + Stripe" },
    ],
    highlights: [
      "Catalogue multi-produits",
      "Checkout Stripe + accès membre",
      "Admin contenu clé en main",
    ],
    palette: {
      primary: "#08111f",
      secondary: "#1b365d",
      accent: "#d7a93b",
    },
    website: "https://techcash-academy.vercel.app/",
    mockups: {
      primary: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&w=900&q=80",
      ],
    },
  },
  {
    slug: "ruby-gallery",
    name: "Ruby Gallery",
    type: "Site vitrine + E-commerce / Galerie d'art",
    tagline:
      "Site premium pour une artiste peintre contemporaine — galerie filtrée, admin clé en main et checkout Stripe opérationnel. 3 ventes les 2 premières semaines.",
    shortDescription:
      "Site Next.js 15 avec galerie d'œuvres filtrée, espace admin pour gérer le catalogue, checkout Stripe et pages légales.",
    description:
      "Ruby Gallery est un site vitrine premium livré à Ruby, artiste peintre contemporaine. Il présente son univers, son catalogue d'œuvres avec filtres, une page about, un formulaire de contact et un tunnel d'achat Stripe. L'espace admin permet à Ruby de gérer ses œuvres, disponibilités et informations de vente sans intervention technique.",
    challenge:
      "Mettre en valeur les œuvres sans les écraser visuellement, avec un admin simple pour une artiste non-technique et un checkout fiable en production.",
    solution:
      "Next.js 15 App Router, Prisma avec Neon Postgres, galerie filtrée par type/disponibilité, admin protégé par session, checkout Stripe avec pages succès/annulation.",
    website: "https://ruby-gallery.vercel.app/",
    stack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Prisma", "Stripe", "Neon Postgres", "Vercel"],
    result:
      "Site galerie premium en ligne, admin fonctionnel. 3 ventes Stripe réalisées dans les 2 premières semaines.",
    timeline: "2 semaines",
    deliverables: [
      "Galerie filtrée par catégorie",
      "Admin œuvres / disponibilité / vente",
      "Checkout Stripe + webhook",
      "Sitemap auto + SEO de base",
    ],
    metrics: [
      { label: "Ventes S1-S2", value: "3" },
      { label: "Livraison", value: "2 semaines" },
      { label: "Paiement", value: "Stripe intégré" },
    ],
    highlights: [
      "Galerie premium avec filtres",
      "Admin artiste sans code",
      "Checkout Stripe + Neon Postgres",
    ],
    palette: {
      primary: "#13100e",
      secondary: "#2a1f18",
      accent: "#c9956c",
    },
    mockups: {
      primary: "https://images.unsplash.com/photo-1541367777708-7905fe3296c0?auto=format&fit=crop&w=900&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1541367777708-7905fe3296c0?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=900&q=80",
      ],
    },
  },
  {
    slug: "tontine-app",
    name: "TontineApp",
    type: "Application mobile / Épargne collective",
    tagline:
      "MVP mobile de tontine numérique — épargne collective digitalisée, cycles automatisés et push notifications. 150+ beta-testeurs onboardés sans bug critique.",
    shortDescription:
      "App React Native avec tontines, cycles de paiement automatisés, push notifications, historique des transactions et tableau de bord communautaire.",
    description:
      "TontineApp digitalise la tontine traditionnelle dans une app mobile moderne. Chaque groupe définit sa mise, sa fréquence et ses membres. L'app gère les cycles automatiquement, notifie chaque participant à son tour de recevoir la cagnotte, et trace l'historique complet des transactions.",
    challenge:
      "Modéliser la logique de tontine (cycles, tours, validation des paiements) dans une app mobile simple pour des communautés peu tech-savvy.",
    solution:
      "React Native + Expo, Supabase pour la base de données et l'auth, cycles automatisés via Edge Functions Supabase, notifications push Expo, dashboard communautaire clair.",
    stack: ["Expo React Native", "TypeScript", "Supabase", "Push Notifications", "Node.js"],
    result:
      "MVP mobile fonctionnel livré en 5 semaines. 150+ beta-testeurs onboardés sans bug critique lors du lancement.",
    timeline: "5 semaines",
    deliverables: [
      "Création et gestion de groupes de tontine",
      "Cycles de paiement automatisés",
      "Push notifications par tour",
      "Historique et tableau de bord",
    ],
    metrics: [
      { label: "Beta-testeurs", value: "150+" },
      { label: "Livraison", value: "5 semaines" },
      { label: "Bugs critiques", value: "0" },
    ],
    highlights: [
      "Cycles de tontine automatisés",
      "Push notifications par tour",
      "Dashboard communautaire simple",
    ],
    website: "https://tontineapp-web.vercel.app",
    palette: {
      primary: "#0a0f1a",
      secondary: "#1a2640",
      accent: "#4f9cf9",
    },
    mockups: {
      primary: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=900&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=900&q=80",
      ],
    },
  },
  {
    slug: "dropigo",
    name: "DroPiPêche",
    type: "Application mobile / Marketplace pêche",
    tagline:
      "Application iOS & Android mettant en relation pêcheurs et acheteurs — double parcours, géolocalisation, chat temps réel et suivi commande. Livré en 8 semaines.",
    shortDescription:
      "Marketplace mobile avec deux rôles (pêcheur / acheteur), auth Supabase, géolocalisation, panier, réservation, suivi commande, chat, push et QR code de livraison.",
    description:
      "DroPiPêche est une application mobile de mise en relation entre pêcheurs et acheteurs de poisson frais. Le pêcheur crée ses annonces avec photos, géolocalisation et disponibilité. L'acheteur réserve, paie et suit sa commande jusqu'à la livraison via QR code.",
    challenge:
      "Concevoir deux parcours utilisateurs étanches (pêcheur / acheteur) dans une même app, gérer la géolocalisation, intégrer un chat temps réel et un système de réservation avec créneaux.",
    solution:
      "Expo React Native avec navigation typée, Supabase pour l'auth et les réservations, expo-location pour la géolocalisation, expo-notifications pour les alertes et QR code de livraison.",
    stack: ["Expo React Native", "TypeScript", "Supabase", "Géolocalisation", "Push Notifications"],
    result:
      "Application iOS & Android complète avec double parcours, réservation, chat et suivi commande — prête pour soumission stores en 8 semaines.",
    timeline: "8 semaines",
    deliverables: [
      "Double parcours pêcheur / acheteur",
      "Géolocalisation & point de rendez-vous",
      "Panier, réservation, suivi commande",
      "Chat temps réel + QR code livraison",
    ],
    metrics: [
      { label: "Écrans", value: "20+" },
      { label: "Rôles", value: "2 + admin" },
      { label: "Livraison", value: "8 semaines" },
    ],
    highlights: [
      "Double rôle pêcheur / acheteur",
      "Chat & notifications push",
      "QR code livraison + suivi commande",
    ],
    demoRequest: true,
    palette: {
      primary: "#071420",
      secondary: "#0f2d4a",
      accent: "#3b9ef6",
    },
    mockups: {
      primary: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=900&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1562184552-997c461aebb6?auto=format&fit=crop&w=900&q=80",
      ],
    },
  },
  {
    slug: "immortal-arena",
    name: "Immortal Arena",
    type: "Application mobile / Sport & Gaming",
    tagline:
      "App de défis sportifs gamifiée — live battles filmés, classements territoriaux et système de réputation communautaire. 300+ challenges créés en beta.",
    shortDescription:
      "App mobile gamifiée avec challenges sportifs, live battles, leaderboard, système de territoire, shop, wallet, modération et espace coach.",
    description:
      "Immortal Arena transforme les défis sportifs en expérience communautaire gamifiée. Les utilisateurs lancent des challenges, participent à des live battles filmés, accumulent des points de réputation et conquièrent des territoires. Un espace coach permet de suivre les athlètes.",
    challenge:
      "Construire une app avec des flux temps réel (live battles, votes en direct), un système de gamification complet (classements, territoires, shop, wallet) et une modération sans friction.",
    solution:
      "Expo React Native avec Supabase pour les données temps réel, expo-camera et expo-video pour les lives, notifications push pour les challenges entrants, scripts cron pour la finalisation des votes.",
    stack: ["Expo React Native", "TypeScript", "Supabase", "expo-video", "Push Notifications"],
    result:
      "Application mobile complète avec live battles, classements temps réel, shop intégré — 300+ challenges créés en 2 semaines de beta.",
    timeline: "6 semaines",
    deliverables: [
      "Challenges & live battles filmés",
      "Leaderboard & système de territoire",
      "Shop & wallet points",
      "Espace coach & modération",
    ],
    metrics: [
      { label: "Challenges beta", value: "300+" },
      { label: "Écrans", value: "30+" },
      { label: "Livraison", value: "6 semaines" },
    ],
    highlights: [
      "Live battles filmés avec votes en direct",
      "Classements, territoires & shop",
      "Espace coach + modération fair-play",
    ],
    demoRequest: true,
    palette: {
      primary: "#050507",
      secondary: "#1a0d1f",
      accent: "#e63946",
    },
    mockups: {
      primary: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=900&q=80",
      ],
    },
  },
  {
    slug: "featness",
    name: "FEATNESS",
    type: "Application mobile + Kiosque / Nutrition sportive",
    tagline:
      "App nutrition post-entraînement et borne de distribution — déployée dans 2 salles de sport partenaires à Toulouse avec 200+ utilisateurs actifs.",
    shortDescription:
      "App Expo + dashboard Next.js : recommandations repas post-entraînement, suivi nutritionnel et gestion des bornes de distribution.",
    description:
      "FEATNESS propose le repas parfait après l'effort. L'app mobile guide le sportif dans ses choix nutritionnels selon l'intensité de son entraînement. Le dashboard web gère les menus et les commandes des bornes. Déployé dans 2 salles partenaires à Toulouse.",
    challenge:
      "Créer un produit double (app mobile + dashboard web) cohérent avec une UX adaptée à chaque contexte — usage en salle de sport et administration des bornes.",
    solution:
      "Expo React Native pour le mobile, Next.js 14 pour le dashboard et le kiosque, base de données Supabase partagée, recommandations basées sur le profil sportif.",
    stack: ["Expo React Native", "Next.js 14", "TypeScript", "Supabase", "Vercel"],
    result:
      "MVP déployé dans 2 salles partenaires. 200+ utilisateurs actifs les 2 premiers mois après lancement terrain.",
    timeline: "6 semaines",
    deliverables: [
      "App mobile sportif",
      "Dashboard admin web",
      "Interface kiosque terrain",
      "Recommandations nutritionnelles",
    ],
    metrics: [
      { label: "Utilisateurs actifs", value: "200+" },
      { label: "Partenaires", value: "2 salles" },
      { label: "Livraison", value: "6 semaines" },
    ],
    highlights: [
      "App + dashboard + kiosque",
      "Recommandations personnalisées",
      "Déploiement terrain réel",
    ],
    demoRequest: true,
    palette: {
      primary: "#0a1509",
      secondary: "#162612",
      accent: "#22c55e",
    },
    mockups: {
      primary: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80",
      ],
    },
  },
  {
    slug: "spotfinder-toulouse",
    name: "SpotFinder Toulouse",
    type: "Application mobile / Géolocalisation communautaire",
    tagline:
      "App communautaire de signalement de parking à Toulouse — 500+ signalements la première semaine. Carte temps réel et score de réputation.",
    shortDescription:
      "App React Native géolocalisée avec signalements temps réel, carte interactive, profils et score de réputation communautaire.",
    description:
      "SpotFinder aide les conducteurs toulousains à trouver des places de parking via le signalement communautaire en temps réel. Les utilisateurs partagent les places libres, voient les signalements récents sur une carte interactive et gagnent des points de réputation.",
    challenge:
      "Gérer des données de géolocalisation en temps réel sur une carte mobile performante, avec un système de signalement fiable et une UX simple pour un usage en voiture.",
    solution:
      "React Native + expo-location + Mapbox, Supabase pour les données temps réel et les profils, score de réputation gamifié pour encourager la participation communautaire.",
    stack: ["Expo React Native", "TypeScript", "Mapbox", "Supabase", "Géolocalisation"],
    result:
      "App communautaire live avec 500+ signalements la première semaine de beta publique.",
    timeline: "4 semaines",
    deliverables: [
      "Carte interactive temps réel",
      "Signalements géolocalisés",
      "Profils + score de réputation",
      "Push notifications",
    ],
    metrics: [
      { label: "Signalements J+7", value: "500+" },
      { label: "Livraison", value: "4 semaines" },
      { label: "Zone", value: "Toulouse" },
    ],
    highlights: [
      "Carte temps réel",
      "Signalements communautaires",
      "Score de réputation gamifié",
    ],
    demoRequest: true,
    palette: {
      primary: "#100a1a",
      secondary: "#2a1640",
      accent: "#a855f7",
    },
    mockups: {
      primary: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=900&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=900&q=80",
      ],
    },
  },
  {
    slug: "minealert",
    name: "MineAlert",
    type: "SaaS / Veille minière",
    tagline:
      "Dashboard de veille sur les minerais et les cours en temps réel — scraping automatisé, watchlist et alertes personnalisées.",
    shortDescription:
      "Dashboard métier, auth Supabase, watchlist, alertes, scraping live et déploiement Vercel pour une beta privée exploitable.",
    description:
      "MineAlert est un cockpit de veille minière qui centralise les cours, les signaux news, la watchlist et les alertes dans une interface lisible et actionnable. Auth Supabase email et Google, pipeline de scraping automatisé, dashboard orienté usage.",
    challenge:
      "Structurer un outil de veille lisible et rapide à parcourir, capable de brancher des sources de données, de l'authentification et une logique de monitoring sans interface brouillonne.",
    solution:
      "Next.js avec auth Supabase email et Google, pipeline de scraping pour les cours et les actualités, dashboard orienté usage, mode de rafraîchissement adapté à une beta hébergée.",
    stack: ["Next.js", "TypeScript", "Supabase", "Playwright", "Vercel"],
    result:
      "SaaS de veille minière en ligne, automatisé, lisible — exploitable comme référence produit.",
    timeline: "3 semaines",
    deliverables: [
      "Dashboard cours / news / alertes",
      "Auth Supabase + OAuth Google",
      "Pipeline scraping automatisé",
      "Watchlist et alertes utilisateur",
    ],
    metrics: [
      { label: "Sources live", value: "2+" },
      { label: "Auth", value: "Email + Google" },
      { label: "Livraison", value: "3 semaines" },
    ],
    highlights: [
      "Dashboard cours / news / alertes",
      "Watchlist et alertes utilisateur",
      "Scraping automatisé",
    ],
    palette: {
      primary: "#07110f",
      secondary: "#15382d",
      accent: "#d4af37",
    },
    website: "https://mine-alert-kenams.vercel.app/",
    mockups: {
      primary: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=900&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
      ],
    },
  },
  {
    slug: "kah-prod",
    name: "KAH Prod",
    type: "Label / Production musicale",
    tagline:
      "Site label premium pour une production musicale indépendante — artistes, sorties, clips et contacts métier centralisés en une expérience cohérente.",
    shortDescription:
      "Site label premium avec navigation Le Label, Artistes, Sorties, Clips, Événements, Réseaux et Contact.",
    description:
      "KAH Prod est un label de production musicale indépendant. Le site a été pensé pour présenter le label, mettre en avant les artistes, montrer les sorties et clips, exposer les événements et centraliser les contacts métier autour d'une image forte.",
    challenge:
      "Donner au label un site visuellement fort et lisible, capable de présenter son identité, ses artistes et ses sorties sans mélanger l'information ni perdre l'image premium.",
    solution:
      "Next.js avec Tailwind CSS, navigation directe par univers, bloc sorties/clips clair, section événements, réseaux et contacts séparés pour management, booking, presse et communication.",
    stack: ["Next.js", "Tailwind CSS", "Vercel"],
    result:
      "Site label en ligne, clair et premium — image renforcée, contacts métier centralisés.",
    timeline: "2 semaines",
    deliverables: [
      "Direction artistique label",
      "Home premium + artistes + sorties",
      "Section événements + réseaux",
      "Contacts métier séparés",
    ],
    metrics: [
      { label: "Sections", value: "7" },
      { label: "Contacts métier", value: "4" },
      { label: "Livraison", value: "2 semaines" },
    ],
    highlights: [
      "Label / Artistes / Sorties / Clips",
      "Événements + réseaux",
      "Management / Booking / Presse / Communication",
    ],
    palette: {
      primary: "#07111f",
      secondary: "#12304e",
      accent: "#c9a84c",
    },
    website: "https://kah-prod.vercel.app/",
    mockups: {
      primary: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=900&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=900&q=80",
      ],
    },
  },
  {
    slug: "kah-support",
    name: "KAH Support",
    type: "SaaS IA / Assistant IT pour PME",
    tagline:
      "Assistant IA connecté à GLPI qui résout 70% des tickets N1 sans technicien — intégration en 5 minutes, disponible 24h/24.",
    shortDescription:
      "SaaS multi-tenant Node.js/PostgreSQL avec IA OpenAI, intégration GLPI native, Stripe live, admin complet et prospection automatisée.",
    description:
      "KAH Support est un assistant IA de support informatique pour PME. Il se connecte directement à GLPI et prend en charge les demandes de niveau 1 (VPN, mots de passe, imprimantes, accès logiciels) 24h/24 sans intervention humaine. L'IA répond à l'utilisateur, crée les tickets dans GLPI avec la bonne priorité et catégorie, et escalade uniquement si nécessaire.",
    challenge:
      "Construire un SaaS multi-tenant production-ready qui s'intègre nativement à GLPI, gère l'authentification, la facturation Stripe, l'IA conversationnelle et la création automatique de tickets — le tout sans plugin côté GLPI.",
    solution:
      "Backend Node.js/Express multi-tenant sur Render avec PostgreSQL, OpenAI GPT-4o pour le raisonnement, API GLPI REST pour la création de tickets, Stripe pour la facturation, Resend pour les emails et GitHub Actions pour le déploiement continu.",
    stack: ["Node.js", "Express", "PostgreSQL", "OpenAI", "GLPI API", "Stripe", "Resend", "Render", "GitHub Actions"],
    result:
      "SaaS live sur kah-support.ch — 70% de tickets N1 résolus sans technicien, 8 min économisées par ticket, ROI client en moins d'1 mois.",
    timeline: "3 semaines",
    deliverables: [
      "Backend multi-tenant Node.js/PostgreSQL",
      "Intégration GLPI REST native (aucun plugin)",
      "IA conversationnelle OpenAI GPT-4o",
      "Stripe live + emails Resend",
      "Admin dashboard complet",
      "Déploiement auto GitHub Actions → Render",
    ],
    metrics: [
      { label: "Tickets auto-résolus", value: "70%" },
      { label: "Temps économisé/ticket", value: "8 min" },
      { label: "ROI client", value: "<1 mois" },
    ],
    highlights: [
      "Multi-tenant — isolation complète par organisation",
      "Intégration GLPI 9.5.x et 10.x sans plugin",
      "Disponible 24h/24, 7j/7",
    ],
    palette: {
      primary: "#0f0f1a",
      secondary: "#1a1a35",
      accent: "#6366f1",
    },
    website: "https://kah-support.ch",
    mockups: {
      primary: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
      ],
    },
  },
  {
    slug: "ante",
    name: "ANTE",
    type: "SaaS Fintech / Défis financiers entre amis",
    tagline:
      "Ante up. Challenge tes amis avec de l'argent réel. Le dernier debout empoche tout — paiements Stripe live, check-in hebdomadaire, PWA installable.",
    shortDescription:
      "Next.js App Router + Prisma + Stripe live. Défis financiers en groupe, wallet intégré, check-in hebdomadaire, retrait IBAN, notifications email Resend, PWA mobile.",
    description:
      "ANTE transforme la discipline financière en un jeu compétitif entre amis. Chaque participant mise une somme réelle via Stripe. Check-in chaque semaine. Le dernier encore en jeu empoche l'intégralité du pot (moins 3% de frais). KAH Digital a conçu la plateforme complète : gestion des défis, wallet interne, paiements Stripe live, système de retraits IBAN, crons automatiques, notifications email et PWA installable sur mobile.",
    challenge:
      "Créer une plateforme financière de gamification avec paiements réels, logique de challenge complexe (types, statuts, check-ins, gagnant automatique), wallet interne et retraits bancaires — en maintenant la conformité légale.",
    solution:
      "Next.js App Router + Prisma + Neon PostgreSQL. Stripe Checkout pour les mises, wallet interne avec historique, cron Vercel pour la complétion automatique des défis, Resend pour les emails transactionnels (bienvenue, reset, confirmation mise, gagnant, retrait), PWA avec service worker.",
    stack: ["Next.js 15", "Prisma", "PostgreSQL", "Stripe", "Resend", "Vercel", "TypeScript", "PWA"],
    result:
      "Plateforme live. Paiements Stripe actifs. PWA installable iOS/Android. Crons automatiques opérationnels.",
    timeline: "4 semaines",
    deliverables: [
      "Défis financiers multi-types (épargne, zéro dépense, objectif commun)",
      "Wallet interne + retraits IBAN",
      "Paiements Stripe live + webhooks",
      "Check-in hebdomadaire + gagnant automatique",
      "Emails transactionnels complets (Resend)",
      "PWA installable mobile",
      "Admin dashboard + crons Vercel",
    ],
    metrics: [
      { label: "Stack", value: "Next.js + Stripe" },
      { label: "Emails auto", value: "7 types" },
      { label: "Livraison", value: "4 semaines" },
    ],
    highlights: [
      "Paiements réels entre amis — Stripe live",
      "Le gagnant rafle tout automatiquement",
      "PWA installable iOS et Android",
    ],
    palette: {
      primary: "#000000",
      secondary: "#111111",
      accent: "#f59e0b",
    },
    website: "https://stackr-app-three.vercel.app",
    launchDate: "Juin 2026 — Coupe du Monde",
    mockups: {
      primary: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=900&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=900&q=80",
      ],
    },
  },
  {
    slug: "vellio-shop",
    name: "Vellio Shop",
    type: "E-commerce premium / Maison de sélection",
    tagline:
      "Boutique e-commerce haut de gamme pour une maison de sélection contemporaine — 21 produits, Stripe live, emails automatisés, design éditorial.",
    shortDescription:
      "Next.js + Prisma + Stripe live. 21 produits, 8 catégories, tunnel d'achat optimisé, emails automatiques (bienvenue, confirmation, panier abandonné, upsell, relance J+7, avis J+14).",
    description:
      "Vellio est une boutique e-commerce positionnée comme une maison de sélection contemporaine. KAH Digital a conçu l'intégralité de l'expérience : tunnel d'achat Stripe, catalogue Prisma/PostgreSQL, emails Resend (confirmation commande, panier abandonné 30min, upsell post-achat, re-engagement J+7 avec code promo, demande d'avis J+14), popup newsletter avec code -10%, crons Vercel pour l'automatisation complète.",
    challenge:
      "Créer une boutique haut de gamme qui génère des ventes automatiquement — sans intervention manuelle — via des emails au bon moment et un tunnel d'achat irréprochable.",
    solution:
      "Next.js App Router + Prisma + Stripe. Pipeline email complet avec Resend : 6 types d'emails automatiques déclenchés par crons Vercel. Popup newsletter avec code BIENVENUE10. Design éditorial noir/or inspiré des maisons de luxe.",
    stack: ["Next.js", "Prisma", "PostgreSQL", "Stripe", "Resend", "Vercel", "TypeScript", "Cloudinary"],
    result:
      "Boutique live sur vellio-shop.vercel.app. 21 produits Stripe actifs. Pipeline email entièrement automatisé.",
    timeline: "3 semaines",
    deliverables: [
      "Boutique e-commerce complète (21 produits, 8 catégories)",
      "Tunnel d'achat Stripe live",
      "6 emails automatiques (bienvenue, commande, panier, upsell, relance, avis)",
      "Popup newsletter + code promo -10%",
      "Dashboard admin produits",
      "Crons Vercel automatisés",
    ],
    metrics: [
      { label: "Produits", value: "21" },
      { label: "Emails auto", value: "6 types" },
      { label: "Livraison", value: "3 semaines" },
    ],
    highlights: [
      "Pipeline email 100% automatisé",
      "Popup newsletter + code promo BIENVENUE10",
      "Re-engagement J+7 + demande avis J+14",
      "Design éditorial premium",
    ],
    palette: {
      primary: "#0b0b0c",
      secondary: "#111111",
      accent: "#c8a96e",
    },
    website: "https://vellio-shop.vercel.app",
    mockups: {
      primary: "/portfolio/vellio.png",
      gallery: [
        "/portfolio/vellio-produits.png",
        "/portfolio/vellio.png",
      ],
    },
  },
];
