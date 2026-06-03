import Link from "next/link";
import Script from "next/script";
import { FiArrowRight, FiCheck, FiClock, FiMapPin, FiMessageCircle, FiZap } from "react-icons/fi";

const WA_URL_FR = "https://wa.me/33759558414?text=Bonjour%20KAH%20Digital%2C%20je%20souhaite%20un%20devis%20pour%20mon%20projet%20web.";
const WA_URL_CH = "https://wa.me/33759558414?text=Bonjour%20KAH%20Digital%2C%20je%20cherche%20un%20studio%20digital%20en%20Suisse%20pour%20mon%20projet.";

export type CityPageData = {
  city: string;
  country: string;
  region: string;
  locale: "fr" | "en" | "de";
  slug: string;
  headline: string;
  subline: string;
  intro: string;
  sectors: string[];
  proofLine: string;
  faq: Array<{ q: string; a: string }>;
};

export const CITY_PAGES: Record<string, CityPageData> = {
  "site-web-lausanne": {
    city: "Lausanne", country: "Suisse", region: "Vaud", locale: "fr", slug: "site-web-lausanne",
    headline: "Création de site web à Lausanne",
    subline: "Studio basé à Lausanne · Next.js 15, Lighthouse 95+, SEO technique. Dès CHF 149, livré en 5 jours. Prix fixe garanti.",
    intro: "KAH Digital est basé à Lausanne. Nous créons des sites web haute-performance sur Next.js 15 pour les PME, indépendants et startups vaudoises. Design SaaS-level, Core Web Vitals 95+, SEO technique intégré. Starter dès CHF 149 · Business dès CHF 420 · Système IA complet dès CHF 950. Devis gratuit en 24h, sans engagement.",
    sectors: ["Avocats & fiduciaires", "Restaurants & hôtels", "Coachs & thérapeutes", "Startups & scale-ups EPFL", "PME vaudoises", "Médecins & professions libérales"],
    proofLine: "Studio à Lausanne · Réponse 24h · Prix fixe CHF 149 · Sans engagement",
    faq: [
      { q: "Combien coûte un site web professionnel à Lausanne ?", a: "Starter (landing page) dès CHF 149, livré en 5 jours. Business (jusqu'à 6 pages, SEO) dès CHF 420, livré en 14 jours. Système complet avec IA dès CHF 950. Prix fixe garanti avant de commencer, zéro surprise." },
      { q: "Vous êtes vraiment basés à Lausanne ?", a: "Oui, KAH Digital est basé à Lausanne. Vous pouvez nous rencontrer en personne ou travailler entièrement à distance — même qualité, même prix." },
      { q: "Quels délais pour un site à Lausanne ?", a: "Landing page : 5 jours ouvrables. Site vitrine complet : 14 jours. Application ou système IA : 28 jours. Délais confirmés par écrit avant démarrage — pas de mauvaise surprise." },
      { q: "Faites-vous du SEO local pour Lausanne et le Vaud ?", a: "Oui — SEO technique complet, données structurées, Core Web Vitals 95+, URLs propres, sitemap. Inclus dès le plan Business. Optimisé pour Google CH." },
    ],
  },
  "site-web-geneve": {
    city: "Genève", country: "Suisse", region: "Genève", locale: "fr", slug: "site-web-geneve",
    headline: "Création de site web à Genève",
    subline: "Studio romand proche de Genève · Next.js 15, multilingue FR/EN/DE, Lighthouse 95+. Dès CHF 149, 14 jours. Prix fixe.",
    intro: "KAH Digital accompagne les entreprises genevaises dans leur présence digitale : cabinets d'avocats, fiduciaires, ONG, hôtels, startups, médecins. Sites web haute-performance en français, anglais et allemand. Basé à Lausanne, à 45 min de Genève. Devis gratuit sous 24h, prix fixe, code 100% à vous.",
    sectors: ["Cabinets d'avocats & notaires", "Fiduciaires & consultants", "ONG & organisations internationales", "Hôtels & restauration de luxe", "Startups Geneva Lake", "Médecins & cliniques"],
    proofLine: "À 45 min de Genève · Multilingue FR/EN/DE · Prix fixe CHF 149 · Réponse 24h",
    faq: [
      { q: "Combien coûte un site web professionnel à Genève ?", a: "Starter (landing page) dès CHF 149, livré en 5 jours. Business (6 pages, SEO multilingue) dès CHF 420. Système IA complet dès CHF 950. Prix fixe confirmé avant tout démarrage." },
      { q: "Êtes-vous basés à Genève ?", a: "Notre studio est à Lausanne, à 45 min de Genève. Nous rencontrons nos clients genevois en personne si besoin ou travaillons entièrement à distance — même qualité, même prix." },
      { q: "Faites-vous des sites multilingues pour les entreprises genevoises ?", a: "Oui — français, anglais, allemand et plus. hreflang correct, URLs propres par langue, SEO par langue. Standard dès le plan Business." },
      { q: "Travaillez-vous avec des ONG et organisations internationales à Genève ?", a: "Oui. Nous avons l'expérience des secteurs sensibles aux conformités et pouvons adapter notre process à vos contraintes de procurement." },
    ],
  },
  "site-web-fribourg": {
    city: "Fribourg", country: "Suisse", region: "Fribourg", locale: "fr", slug: "site-web-fribourg",
    headline: "Création de site web à Fribourg",
    subline: "Studio romand bilingue FR/DE · Next.js 15, SEO technique, prix fixe. Dès CHF 149, livré en 5 jours. Sans engagement.",
    intro: "KAH Digital crée des sites web professionnels pour les entreprises, artisans et indépendants du canton de Fribourg. Bilingue français-allemand, nous comprenons les besoins spécifiques du marché fribourgeois. Sites haute-performance, SEO local, design premium. Starter dès CHF 149 · Business dès CHF 420 · Devis gratuit en 24h.",
    sectors: ["Artisans & PME fribourgeois", "Restaurants & cafés", "Coachs & formateurs", "Agriculture & terroir", "Associations & institutions", "Professions libérales"],
    proofLine: "Bilingue FR/DE · Prix fixe CHF 149 · Réponse 24h · Sans engagement",
    faq: [
      { q: "Combien coûte un site web professionnel à Fribourg ?", a: "Starter (landing page bilingue FR/DE) dès CHF 149, livré en 5 jours. Business (6 pages, SEO) dès CHF 420. Système IA complet dès CHF 950. Prix fixe, zéro surprise." },
      { q: "Faites-vous des sites bilingues français-allemand pour le marché fribourgeois ?", a: "Oui — sites FR/DE parfaitement bilingues avec hreflang correct, URLs propres par langue, SEO optimisé dans les deux langues. Idéal pour le marché fribourgeois." },
      { q: "Peut-on se rencontrer à Fribourg ?", a: "Nous pouvons nous déplacer à Fribourg pour les projets importants. La plupart des échanges se font en visioconférence depuis Lausanne." },
    ],
  },
  "agence-web-paris": {
    city: "Paris", country: "France", region: "Île-de-France", locale: "fr", slug: "agence-web-paris",
    headline: "Création de site web à Paris",
    subline: "Studio digital franco-suisse · sites web, apps et solutions digitales pour freelances, PME et startups parisiennes.",
    intro: "KAH-Digital accompagne les entreprises et indépendants parisiens dans leur présence digitale. Basé en Suisse, notre studio travaille à distance pour toute la France. Process clair, réponse rapide et devis personnalisés après échange.",
    sectors: ["Avocats & experts-comptables", "Agences & consultants", "E-commerce & boutiques", "Coachs & formateurs", "Startups & scale-ups", "Freelances & créatifs"],
    proofLine: "Réponse en 24h · Devis personnalisé · Sans engagement",
    faq: [
      { q: "Travaillez-vous avec des clients parisiens à distance ?", a: "Oui, tout le projet se gère en ligne. Visioconférence pour le cadrage, livraison et suivi par email. Aucun déplacement nécessaire." },
      { q: "Quels délais pour un site à Paris ?", a: "Landing page : 1 semaine. Site vitrine : 2-3 semaines. Site corporate : 4-5 semaines. Application : 6-12 semaines." },
      { q: "Pourquoi passer par un studio suisse pour un site parisien ?", a: "Nous offrons la rigueur suisse : process structuré, devis lisible, délais tenus. Propositions ajustées et une réactivité maximale." },
    ],
  },
  "agence-web-lyon": {
    city: "Lyon", country: "France", region: "Auvergne-Rhône-Alpes", locale: "fr", slug: "agence-web-lyon",
    headline: "Création de site web à Lyon",
    subline: "Studio digital · sites web professionnels, apps et solutions digitales pour entreprises et indépendants de Lyon et la région.",
    intro: "KAH-Digital crée des sites web et solutions digitales pour les entreprises lyonnaises. Proche géographiquement de la Suisse, nous travaillons régulièrement avec des clients de la région Auvergne-Rhône-Alpes. Process simple, devis clairs, livraison rapide.",
    sectors: ["Restaurants & bouchons lyonnais", "PME industrielles", "Cabinets & professions libérales", "E-commerce & boutiques", "Startups & incubateurs", "Artisans & indépendants"],
    proofLine: "Réponse en 24h · Devis personnalisé · Sans engagement",
    faq: [
      { q: "Intervenez-vous à Lyon pour des réunions ?", a: "Lyon est à 2h de notre studio suisse. Nous pouvons nous déplacer pour les projets importants. Le cadrage se fait généralement en visio." },
      { q: "Comment est défini le devis pour un projet local ?", a: "Chaque projet est cadré selon le besoin réel, les fonctionnalités, les délais et vos priorités. Le devis personnalisé est fourni après un court échange, sans engagement." },
      { q: "Avez-vous déjà travaillé avec des entreprises lyonnaises ?", a: "Oui, restaurants, cabinets de conseil, PME industrielles. La région est proche et nous en comprenons le tissu économique." },
    ],
  },
  "agence-web-marseille": {
    city: "Marseille", country: "France", region: "PACA", locale: "fr", slug: "agence-web-marseille",
    headline: "Création de site web à Marseille",
    subline: "Studio digital pour Marseille et la région PACA · sites, apps et solutions digitales pour PME, indépendants et commerces.",
    intro: "KAH-Digital accompagne les entreprises marseillaises dans leur présence digitale. Restaurants, cabinets, boutiques, artisans : un site web propre, rapide et qui convertit. Process clair et des devis personnalisés après échange.",
    sectors: ["Restaurants & commerces", "Artisans & indépendants", "Professions libérales", "Tourisme & hôtellerie", "E-commerce", "Startups PACA"],
    proofLine: "Réponse en 24h · Devis personnalisé · Sans engagement",
    faq: [
      { q: "Travaillez-vous avec des clients à Marseille à distance ?", a: "Oui, tout le projet se gère en ligne. Visioconférence pour le cadrage, livraison par email. Pas de déplacement nécessaire." },
      { q: "Quels délais pour un site à Marseille ?", a: "Landing page : 1 semaine. Site vitrine : 2-3 semaines. Application : 6-10 semaines selon le scope." },
      { q: "Comment est défini le budget d'un projet local ?", a: "L'objectif est d'adapter la prestation à votre contexte, à vos priorités business et au budget disponible, sans formule rigide ni option inutile." },
    ],
  },
  "agence-web-bordeaux": {
    city: "Bordeaux", country: "France", region: "Nouvelle-Aquitaine", locale: "fr", slug: "agence-web-bordeaux",
    headline: "Création de site web à Bordeaux",
    subline: "Studio digital · sites web et applications pour PME, indépendants et startups de Bordeaux et la région.",
    intro: "KAH-Digital crée des sites web professionnels pour les entreprises bordelaises. Vignobles, cabinets, startups, commerces, un site web clair, rapide et adapté à votre activité, livré dans les délais convenus.",
    sectors: ["Vignobles & domaines", "Cabinets & consultants", "Startups & scale-ups", "Restaurants & hôtels", "E-commerce", "Artisans & indépendants"],
    proofLine: "Réponse en 24h · Devis personnalisé · Sans engagement",
    faq: [
      { q: "Faites-vous des sites pour le secteur viticole à Bordeaux ?", a: "Oui, sites de domaines viticoles avec boutique en ligne, réservations de dégustations et galerie photo. Un secteur qu'on connaît bien." },
      { q: "Comment est défini le devis pour un projet local ?", a: "Chaque projet est cadré selon le besoin réel, les fonctionnalités, les délais et vos priorités. Le devis personnalisé est fourni après un court échange, sans engagement." },
      { q: "Travaillez-vous à distance pour Bordeaux ?", a: "Oui, tout le projet se gère en visioconférence et email. Efficace et sans perte de temps en déplacement." },
    ],
  },
  "agence-web-nantes": {
    city: "Nantes", country: "France", region: "Pays de la Loire", locale: "fr", slug: "agence-web-nantes",
    headline: "Création de site web à Nantes",
    subline: "Studio digital pour Nantes et la région · sites web, apps et automatisations IA pour entreprises et indépendants.",
    intro: "KAH-Digital accompagne les entreprises nantaises dans leur présence digitale. Nantes est l'un des écosystèmes startup les plus actifs de France. Notre studio comprend les besoins tech des scale-ups comme des TPE.",
    sectors: ["Startups & tech", "Cabinets & consultants", "E-commerce", "Associations & ONG", "Artisans & indépendants", "Restaurants & commerces"],
    proofLine: "Réponse en 24h · Devis personnalisé · Sans engagement",
    faq: [
      { q: "Travaillez-vous avec des startups nantaises ?", a: "Oui, MVP, portails, dashboards et intégrations IA. Nantes a un écosystème tech solide que nous suivons de près." },
      { q: "Comment est défini le devis pour un projet local ?", a: "Chaque projet est cadré selon le besoin réel, les fonctionnalités, les délais et vos priorités. Le devis personnalisé est fourni après un court échange, sans engagement." },
      { q: "Pouvez-vous faire une application mobile pour une startup nantaise ?", a: "Oui, application Expo React Native, cross-platform iOS et Android. Délai moyen : 6 à 12 semaines selon le scope." },
    ],
  },
  "agence-web-strasbourg": {
    city: "Strasbourg", country: "France", region: "Alsace", locale: "fr", slug: "agence-web-strasbourg",
    headline: "Création de site web à Strasbourg",
    subline: "Studio digital trilingue FR/DE/EN · sites web et applications pour entreprises alsaciennes, transfrontalières et internationales.",
    intro: "KAH-Digital est un studio idéal pour les entreprises strasbourgeoises : trilingue français-allemand-anglais, nous comprenons les enjeux des marchés transfrontaliers. Sites vitrines, applications métier ou solutions digitales. Process clair, livraison rapide.",
    sectors: ["Entreprises transfrontalières FR/DE", "Institutions & collectivités", "Cabinets d'avocats", "E-commerce", "Artisans & PME", "Tourisme & culture"],
    proofLine: "Trilingue FR/DE/EN · Devis personnalisé · Sans engagement",
    faq: [
      { q: "Faites-vous des sites bilingues français-allemand ?", a: "Oui, c'est l'une de nos spécialités. Nous créons des sites natifs multilingues, optimisés SEO dans chaque langue." },
      { q: "Travaillez-vous avec des entreprises du Bade-Wurtemberg proches de Strasbourg ?", a: "Oui, notre studio est trilingue. Nous accompagnons aussi les entreprises allemandes ou suisses proches de Strasbourg." },
      { q: "Comment est défini le budget d'un projet local ?", a: "L'objectif est d'adapter la prestation à votre contexte, à vos priorités business et au budget disponible, sans formule rigide ni option inutile." },
    ],
  },
  "agence-web-berne": {
    city: "Berne", country: "Suisse", region: "Berne", locale: "fr", slug: "agence-web-berne",
    headline: "Création de site web à Berne",
    subline: "Studio digital suisse bilingue FR/DE · Next.js 15, Lighthouse 95+, prix fixe. Dès CHF 149, livré en 5 jours. Sans engagement.",
    intro: "KAH Digital accompagne les entreprises et indépendants de la région bernoise dans leur présence digitale. Bilingue français-allemand, notre studio est parfaitement adapté aux besoins du marché bernois : fédéral, institutionnel, ou PME de proximité. Starter dès CHF 149 · Business dès CHF 420 · Système IA dès CHF 950. Devis gratuit en 24h.",
    sectors: ["Institutions & administrations fédérales", "Cabinets & consultants", "PME bilingues FR/DE", "Artisans & indépendants", "Associations & ONG", "Startups bernoises"],
    proofLine: "Studio Suisse · Bilingue FR/DE · Prix fixe CHF 149 · Réponse 24h",
    faq: [
      { q: "Combien coûte un site web professionnel à Berne ?", a: "Starter (landing page bilingue FR/DE) dès CHF 149, livré en 5 jours. Business (6 pages, SEO) dès CHF 420. Système IA complet dès CHF 950. Prix fixe, devis confirmé avant de commencer." },
      { q: "Faites-vous des sites pour des institutions bernoises ?", a: "Oui, sites institutionnels, portails de services et intranets. Expérience avec les structures fédérales et cantonales suisses." },
      { q: "Travaillez-vous en allemand pour les clients bernois ?", a: "Oui, KAH Digital produit des sites en allemand, français et anglais. Idéal pour le marché bilingue bernois." },
      { q: "Acceptez-vous le paiement en CHF et TWINT ?", a: "Oui — virement bancaire CHF, TWINT et carte bancaire acceptés. Facturation depuis notre siège à Lausanne." },
    ],
  },
  "agence-web-toulouse": {
    city: "Toulouse", country: "France", region: "Occitanie", locale: "fr", slug: "agence-web-toulouse",
    headline: "Création de site web à Toulouse",
    subline: "Studio digital pour Toulouse et l'Occitanie · sites web, apps et solutions digitales pour PME, startups et indépendants.",
    intro: "KAH-Digital accompagne les entreprises toulousaines dans leur présence digitale. Toulouse est la 4ème ville de France et un hub technologique majeur. Notre studio comprend autant les besoins des PME aéronautiques que des restaurants du Capitole. Process clair, devis personnalisés, livraison rapide.",
    sectors: ["Aéronautique & ingénierie", "Restaurants & commerces", "Cabinets & professions libérales", "Startups & tech", "Artisans & indépendants", "E-commerce"],
    proofLine: "Réponse en 24h · Devis personnalisé · Sans engagement",
    faq: [
      { q: "Travaillez-vous avec des PME du secteur aéronautique à Toulouse ?", a: "Oui, sites institutionnels, portails partenaires et intranets. Le tissu économique toulousain nous est familier." },
      { q: "Quels délais pour un site à Toulouse ?", a: "Landing page : 1 sem. Site vitrine : 2-3 sem. App sur mesure : 6-12 sem. selon scope." },
      { q: "Comment est défini le budget d'un projet local ?", a: "L'objectif est d'adapter la prestation à votre contexte, à vos priorités business et au budget disponible, sans formule rigide ni option inutile." },
    ],
  },
  "agence-web-nice": {
    city: "Nice", country: "France", region: "Côte d'Azur", locale: "fr", slug: "agence-web-nice",
    headline: "Création de site web à Nice",
    subline: "Studio digital pour Nice et la Côte d'Azur · sites web professionnels pour hôtels, restaurants, professions libérales et commerces.",
    intro: "KAH-Digital crée des sites web pour les entreprises niçoises. Tourisme, hôtellerie, restaurants gastronomiques, cabinets médicaux, boutiques, un site rapide, mobile et qui convertit. La Côte d'Azur mérite une présence digitale à la hauteur.",
    sectors: ["Hôtels & résidences", "Restaurants gastronomiques", "Boutiques & luxe", "Médecins & thérapeutes", "Agences immobilières", "Artisans & prestataires"],
    proofLine: "Réponse en 24h · Devis personnalisé · Sans engagement",
    faq: [
      { q: "Faites-vous des sites pour le secteur hôtelier niçois ?", a: "Oui, sites vitrines, réservation en ligne, galeries photo. Nous connaissons bien les besoins du tourisme haut de gamme." },
      { q: "Créez-vous des sites en plusieurs langues pour Nice ?", a: "Oui, sites FR/EN/IT/DE pour accueillir la clientèle internationale de la Côte d'Azur." },
      { q: "Comment est défini le devis pour un projet local ?", a: "Chaque projet est cadré selon le besoin réel, les fonctionnalités, les délais et vos priorités. Le devis personnalisé est fourni après un court échange, sans engagement." },
    ],
  },
  "agence-web-lille": {
    city: "Lille", country: "France", region: "Hauts-de-France", locale: "fr", slug: "agence-web-lille",
    headline: "Création de site web à Lille",
    subline: "Studio digital pour Lille et les Hauts-de-France · sites web, apps et solutions digitales pour PME, indépendants et commerces.",
    intro: "KAH-Digital accompagne les entreprises lilloises dans leur présence digitale. Carrefour entre Paris, Bruxelles et Londres, Lille est un marché dynamique. Notre studio crée des sites web efficaces pour artisans, cabinets, startups et commerces de la région.",
    sectors: ["Commerces & boutiques", "PME industrielles", "Cabinets & consultants", "Restaurants & cafés", "Startups & tech", "Artisans & indépendants"],
    proofLine: "Réponse en 24h · Devis personnalisé · Sans engagement",
    faq: [
      { q: "Faites-vous des sites bilingues FR/EN pour des entreprises lilloises ?", a: "Oui, Lille étant à la croisée des marchés européens, nous créons régulièrement des sites multilingues." },
      { q: "Quels délais pour un site à Lille ?", a: "Landing : 1 sem. Site vitrine : 2-3 sem. App : 6-12 sem. Devis personnalisé sous 24h." },
      { q: "Avez-vous de l'expérience avec des PME industrielles du Nord ?", a: "Oui, portails B2B, catalogues produits, intranets. On connaît les besoins des PME industrielles." },
    ],
  },
  "agence-web-montpellier": {
    city: "Montpellier", country: "France", region: "Occitanie", locale: "fr", slug: "agence-web-montpellier",
    headline: "Création de site web à Montpellier",
    subline: "Studio digital pour Montpellier · sites web, apps et solutions digitales pour startups, professions de santé et entreprises méditerranéennes.",
    intro: "KAH-Digital crée des sites web professionnels pour les entreprises montpelliéraines. Montpellier est une ville dynamique : startups, médecins, avocats, restaurants, e-commerce. Notre studio propose un process simple : brief en ligne, devis sous 24h, livraison en 2 à 6 semaines.",
    sectors: ["Professions de santé", "Startups & tech", "Cabinets juridiques", "Restaurants & commerces", "E-commerce", "Artisans & indépendants"],
    proofLine: "Réponse en 24h · Devis personnalisé · Sans engagement",
    faq: [
      { q: "Faites-vous des sites pour des médecins et thérapeutes à Montpellier ?", a: "Oui, sites médicaux clairs, conformes RGPD, avec prise de rendez-vous en ligne si besoin." },
      { q: "Comment est défini le budget d'un projet local ?", a: "L'objectif est d'adapter la prestation à votre contexte, à vos priorités business et au budget disponible, sans formule rigide ni option inutile." },
      { q: "Combien de temps pour un site à Montpellier ?", a: "Landing page : 1 sem. Site vitrine : 2-3 sem. Site corporate : 4-5 sem. App : 6-12 sem." },
    ],
  },
  "agence-web-rennes": {
    city: "Rennes", country: "France", region: "Bretagne", locale: "fr", slug: "agence-web-rennes",
    headline: "Création de site web à Rennes",
    subline: "Studio digital pour Rennes et la Bretagne · sites web, apps et solutions digitales pour startups, PME et indépendants.",
    intro: "KAH-Digital accompagne les entreprises rennaises dans leur présence digitale. Rennes est l'un des écosystèmes tech les plus actifs de l'ouest de la France. Notre studio crée des sites et applications pour startups, freelances, artisans et TPE de la région.",
    sectors: ["Startups & tech", "Artisans & indépendants", "Restaurants & commerces", "Cabinets & professions libérales", "E-commerce", "Associations & ONG"],
    proofLine: "Réponse en 24h · Devis personnalisé · Sans engagement",
    faq: [
      { q: "Créez-vous des applications pour des startups rennaises ?", a: "Oui, MVP, portails SaaS, dashboards et intégrations API. Rennes est une ville tech et on l'accompagne." },
      { q: "Comment est défini le devis pour un projet local ?", a: "Chaque projet est cadré selon le besoin réel, les fonctionnalités, les délais et vos priorités. Le devis personnalisé est fourni après un court échange, sans engagement." },
      { q: "Pouvez-vous créer un site e-commerce pour un artisan breton ?", a: "Oui, boutique en ligne, paiement sécurisé, gestion de commandes. On aime les projets d'artisans." },
    ],
  },
  "agence-web-zurich": {
    city: "Zurich", country: "Suisse", region: "Zurich", locale: "fr", slug: "agence-web-zurich",
    headline: "Création de site web à Zurich",
    subline: "Studio digital suisse multilingue DE/FR/EN · Next.js 15, Lighthouse 95+. Dès CHF 149, 5 jours. Prix fixe garanti.",
    intro: "KAH Digital accompagne les entreprises de Zurich dans leur présence digitale. Zurich est la capitale économique suisse : banques, cabinets d'avocats, startups fintech, PME industrielles — notre studio crée des sites professionnels multilingues (DE/FR/EN) adaptés au marché zurichois. Starter dès CHF 149 · Business dès CHF 420 · Système IA dès CHF 950. Devis gratuit en 24h.",
    sectors: ["Finance & banques", "Cabinets d'avocats & fiduciaires", "Startups fintech & crypto", "Hôtels & restauration", "PME Suisse alémanique", "Professions libérales"],
    proofLine: "Studio Suisse · Multilingue DE/FR/EN · Prix fixe CHF 149 · Réponse 24h",
    faq: [
      { q: "Combien coûte un site web professionnel à Zurich ?", a: "Starter (landing page) dès CHF 149, livré en 5 jours. Business (6 pages, SEO multilingue) dès CHF 420. Système IA complet dès CHF 950. Prix fixe confirmé avant tout démarrage." },
      { q: "Faites-vous des sites en allemand pour des entreprises zurichoises ?", a: "Oui, sites natifs en allemand, français et anglais. SEO optimisé dans chaque langue. Idéal pour les entreprises qui ciblent la Suisse alémanique et internationale." },
      { q: "Travaillez-vous avec des startups fintech zurichoises ?", a: "Oui, portails client, dashboards, landing pages et MVPs. On connaît les exigences du marché financier suisse et les standards LPD." },
      { q: "Acceptez-vous le paiement en CHF et TWINT ?", a: "Oui — virement bancaire CHF, TWINT et carte bancaire acceptés. Facturation depuis notre siège à Lausanne, en CHF." },
    ],
  },
  "agence-web-basel": {
    city: "Basel", country: "Suisse", region: "Bâle", locale: "fr", slug: "agence-web-basel",
    headline: "Création de site web à Bâle",
    subline: "Studio digital suisse trilingue FR/DE/EN · Next.js 15, Lighthouse 95+. Dès CHF 149, 5 jours. Prix fixe garanti.",
    intro: "KAH Digital crée des sites web pour les entreprises bâloises. Bâle est un carrefour international unique : industrie pharmaceutique, foires internationales, culture et banques. Notre studio propose des sites multilingues adaptés aux entreprises qui opèrent en France, Allemagne et Suisse. Starter dès CHF 149 · Business dès CHF 420 · Système IA dès CHF 950.",
    sectors: ["Pharma & life sciences", "Industrie & manufacturing", "Culture & art Basel", "PME transfrontalières CH/DE/FR", "Cabinets & consultants", "Restaurants & hôtels"],
    proofLine: "Studio Suisse · Trilingue FR/DE/EN · Prix fixe CHF 149 · Réponse 24h",
    faq: [
      { q: "Combien coûte un site web professionnel à Bâle ?", a: "Starter (landing page trilingue) dès CHF 149, livré en 5 jours. Business (6 pages, SEO dans 3 langues) dès CHF 420. Système IA complet dès CHF 950. Prix fixe, zéro surprise." },
      { q: "Faites-vous des sites trilingues pour les entreprises bâloises ?", a: "Oui, sites natifs en FR, DE, EN avec SEO dans chaque langue et hreflang correct. Idéal pour le marché rhénan et les foires internationales." },
      { q: "Avez-vous travaillé avec des entreprises du secteur pharma ?", a: "Oui, sites institutionnels, portails partenaires et intranets. Nous respectons les exigences LPD et les standards de conformité du secteur." },
      { q: "Acceptez-vous le paiement en CHF et TWINT ?", a: "Oui — virement bancaire CHF, TWINT et carte bancaire acceptés. Facturation en CHF depuis Lausanne." },
    ],
  },
  "agence-web-lugano": {
    city: "Lugano", country: "Suisse", region: "Tessin", locale: "fr", slug: "agence-web-lugano",
    headline: "Création de site web à Lugano",
    subline: "Studio digital suisse trilingue IT/FR/DE · Next.js 15, Lighthouse 95+. Dès CHF 149, 5 jours. Prix fixe garanti.",
    intro: "KAH Digital accompagne les entreprises de Lugano dans leur présence digitale. Le Tessin est unique en Suisse : italien de cœur, suisse d'esprit, tourné vers l'Italie et le monde. Notre studio crée des sites multilingues adaptés aux besoins des entreprises tessinoises : finance, tourisme, luxe, PME. Starter dès CHF 149 · Business dès CHF 420 · Devis gratuit en 24h.",
    sectors: ["Finance & wealth management", "Tourisme & hôtellerie luxe", "Luxe & mode", "PME tessinoises", "Restaurants & cafés", "Professions libérales"],
    proofLine: "Studio Suisse · Trilingue IT/FR/DE · Prix fixe CHF 149 · Réponse 24h",
    faq: [
      { q: "Combien coûte un site web professionnel à Lugano ?", a: "Starter (landing page) dès CHF 149, livré en 5 jours. Business (6 pages, SEO) dès CHF 420. Système IA complet dès CHF 950. Prix fixe, devis confirmé avant de commencer." },
      { q: "Faites-vous des sites en italien pour des entreprises de Lugano ?", a: "Oui, sites natifs en italien, français, allemand et anglais. Le Tessin est notre marché naturel pour l'italien." },
      { q: "Créez-vous des sites pour le secteur wealth management à Lugano ?", a: "Oui, sites institutionnels discrets, sécurisés, conformes LPD et RGPD. Rigueur et élégance — les standards suisses." },
      { q: "Acceptez-vous le paiement en CHF et TWINT ?", a: "Oui — virement bancaire CHF, TWINT et carte bancaire acceptés. Facturation en CHF depuis Lausanne." },
    ],
  },
  "agence-web-grenoble": {
    city: "Grenoble", country: "France", region: "Auvergne-Rhône-Alpes", locale: "fr", slug: "agence-web-grenoble",
    headline: "Création de site web à Grenoble",
    subline: "Studio digital pour Grenoble et l'Isère · sites web, apps et solutions digitales pour startups deeptech, PME et indépendants.",
    intro: "KAH-Digital accompagne les entreprises grenobloises dans leur présence digitale. Grenoble est l'une des villes les plus innovantes de France : nanotechnologies, ingénierie, startups deeptech. Notre studio crée des sites web et applications qui reflètent votre niveau d'expertise : clairs, rapides, bien référencés.",
    sectors: ["Startups deeptech & ingénierie", "PME industrielles & high-tech", "Professions de santé", "Cabinets & consultants", "Restaurants & commerces", "Artisans & indépendants"],
    proofLine: "Réponse en 24h · Devis personnalisé · Sans engagement",
    faq: [
      { q: "Créez-vous des sites pour des startups tech à Grenoble ?", a: "Oui, landing pages, portails SaaS, dashboards et MVPs. On connaît bien l'écosystème grenoblois entre Bpifrance et les incubateurs." },
      { q: "Quels délais pour un site à Grenoble ?", a: "Landing page : 1 sem. Site vitrine : 2-3 sem. App sur mesure : 6-12 sem. selon scope." },
      { q: "Comment est défini le budget d'un projet local ?", a: "L'objectif est d'adapter la prestation à votre contexte, à vos priorités business et au budget disponible, sans formule rigide ni option inutile." },
    ],
  },
  "agence-web-rouen": {
    city: "Rouen", country: "France", region: "Normandie", locale: "fr", slug: "agence-web-rouen",
    headline: "Création de site web à Rouen",
    subline: "Studio digital pour Rouen et la Normandie · sites web professionnels pour PME, artisans et commerces normands.",
    intro: "KAH-Digital crée des sites web professionnels pour les entreprises rouennaises. Rouen est une ville dynamique avec un tissu économique dense : PME, artisans, commerces, professions libérales. Notre studio propose un process simple : brief en ligne, devis sous 24h, livraison en 2 à 6 semaines.",
    sectors: ["PME normandes", "Commerces & boutiques", "Artisans & indépendants", "Cabinets & professions libérales", "Restaurants & hôtels", "E-commerce"],
    proofLine: "Réponse en 24h · Devis personnalisé · Sans engagement",
    faq: [
      { q: "Travaillez-vous avec des PME rouennaises à distance ?", a: "Oui, tout le projet se gère en ligne. Visioconférence pour le cadrage, livraison par email. Aucun déplacement nécessaire." },
      { q: "Comment est défini le devis pour un projet local ?", a: "Chaque projet est cadré selon le besoin réel, les fonctionnalités, les délais et vos priorités. Le devis personnalisé est fourni après un court échange, sans engagement." },
      { q: "Combien de temps pour un site vitrine à Rouen ?", a: "Un site vitrine standard : 2 à 3 semaines. Un site corporate : 4 à 5 semaines." },
    ],
  },
  "agence-web-aix-en-provence": {
    city: "Aix-en-Provence", country: "France", region: "PACA", locale: "fr", slug: "agence-web-aix-en-provence",
    headline: "Création de site web à Aix-en-Provence",
    subline: "Studio digital pour Aix-en-Provence et la région PACA · sites web élégants pour cabinets, vignobles, boutiques et professions libérales.",
    intro: "KAH-Digital accompagne les entreprises aixoises dans leur présence digitale. Aix-en-Provence est une ville à fort pouvoir d'achat et une clientèle exigeante : cabinets d'avocats, vignobles, boutiques premium, médecins. Notre studio crée des sites web à la hauteur de votre réputation.",
    sectors: ["Cabinets d'avocats & notaires", "Vignobles & domaines", "Boutiques & luxe", "Médecins & thérapeutes", "Startups & tech", "Restaurants gastronomiques"],
    proofLine: "Réponse en 24h · Devis personnalisé · Sans engagement",
    faq: [
      { q: "Faites-vous des sites pour des vignobles de la région d'Aix ?", a: "Oui, sites domaines viticoles avec boutique en ligne, réservation de dégustations et galerie photo. Un secteur qu'on connaît bien." },
      { q: "Comment est défini le devis pour un projet local ?", a: "Chaque projet est cadré selon le besoin réel, les fonctionnalités, les délais et vos priorités. Le devis personnalisé est fourni après un court échange, sans engagement." },
      { q: "Travaillez-vous en anglais pour des clients internationaux à Aix ?", a: "Oui, sites bilingues FR/EN ou trilingues pour accueillir la clientèle internationale." },
    ],
  },
  "agence-web-angers": {
    city: "Angers", country: "France", region: "Pays de la Loire", locale: "fr", slug: "agence-web-angers",
    headline: "Création de site web à Angers",
    subline: "Studio digital pour Angers et la Maine-et-Loire · sites web, apps et solutions digitales pour startups, PME et indépendants angevins.",
    intro: "KAH-Digital accompagne les entreprises angevines dans leur présence digitale. Angers est une ville étudiante et entrepreneuriale : startups, artisans, vignobles du Val de Loire, professions libérales. Notre studio crée des sites efficaces avec un process clair et des devis personnalisés.",
    sectors: ["Startups & tech", "Vignobles & domaines", "Artisans & indépendants", "Professions libérales", "Restaurants & commerces", "Associations & ONG"],
    proofLine: "Réponse en 24h · Devis personnalisé · Sans engagement",
    faq: [
      { q: "Faites-vous des sites pour des domaines viticoles du Val de Loire ?", a: "Oui, sites vitrines, boutiques en ligne, réservations de dégustations. Le vignoble angevin nous est familier." },
      { q: "Comment est défini le devis pour un projet local ?", a: "Chaque projet est cadré selon le besoin réel, les fonctionnalités, les délais et vos priorités. Le devis personnalisé est fourni après un court échange, sans engagement." },
      { q: "Travaillez-vous avec des startups angevines ?", a: "Oui, MVP, portails SaaS, dashboards. Angers a un écosystème entrepreneurial dynamique." },
    ],
  },
  "agence-web-dijon": {
    city: "Dijon", country: "France", region: "Bourgogne-Franche-Comté", locale: "fr", slug: "agence-web-dijon",
    headline: "Création de site web à Dijon",
    subline: "Studio digital pour Dijon et la Bourgogne · sites web professionnels pour vignobles, restaurants gastronomiques, PME et indépendants.",
    intro: "KAH-Digital crée des sites web pour les entreprises dijonnaises. Dijon est la capitale de la gastronomie et des vins de Bourgogne. Notre studio comprend les besoins des domaines viticoles, restaurants étoilés, cabinets d'avocats et PME locales. Sites élégants, rapides et bien référencés.",
    sectors: ["Vignobles & domaines", "Restaurants gastronomiques", "Cabinets & professions libérales", "PME & artisans", "Tourisme & culture", "E-commerce"],
    proofLine: "Réponse en 24h · Devis personnalisé · Sans engagement",
    faq: [
      { q: "Faites-vous des sites pour des domaines viticoles de Bourgogne ?", a: "Oui, sites vitrines, boutiques en ligne, réservation de dégustations. La Bourgogne viticole est un marché qu'on adore." },
      { q: "Comment est défini le devis pour un projet local ?", a: "Chaque projet est cadré selon le besoin réel, les fonctionnalités, les délais et vos priorités. Le devis personnalisé est fourni après un court échange, sans engagement." },
      { q: "Créez-vous des sites en anglais pour accueillir les touristes œnotouristiques ?", a: "Oui, sites bilingues FR/EN ou trilingues pour cibler les clients internationaux de la Route des Grands Crus." },
    ],
  },
  "agence-web-caen": {
    city: "Caen", country: "France", region: "Normandie", locale: "fr", slug: "agence-web-caen",
    headline: "Création de site web à Caen",
    subline: "Studio digital pour Caen et le Calvados · sites web professionnels pour PME, artisans et indépendants normands.",
    intro: "KAH-Digital crée des sites web pour les entreprises caennaises. Caen est une ville dynamique au cœur de la Normandie : artisans, PME, commerces, professions libérales. Notre studio propose un process simple : Devis personnalisé sous 24h, livraison en 2 à 5 semaines, sans jargon.",
    sectors: ["PME normandes", "Artisans & indépendants", "Restaurants & commerces", "Professions libérales", "E-commerce", "Associations & culture"],
    proofLine: "Réponse en 24h · Devis personnalisé · Sans engagement",
    faq: [
      { q: "Travaillez-vous avec des PME caennaises à distance ?", a: "Oui, tout le projet se gère en visioconférence et email. Efficace, sans déplacement." },
      { q: "Comment est défini le devis pour un projet local ?", a: "Chaque projet est cadré selon le besoin réel, les fonctionnalités, les délais et vos priorités. Le devis personnalisé est fourni après un court échange, sans engagement." },
      { q: "Combien de temps pour créer un site vitrine à Caen ?", a: "Un site vitrine : 2 à 3 semaines. Landing page : 5 à 10 jours. Application sur mesure : 6 à 12 semaines." },
    ],
  },
  "agence-web-clermont-ferrand": {
    city: "Clermont-Ferrand", country: "France", region: "Auvergne-Rhône-Alpes", locale: "fr", slug: "agence-web-clermont-ferrand",
    headline: "Création de site web à Clermont-Ferrand",
    subline: "Studio digital pour Clermont-Ferrand et l'Auvergne · sites web, apps et solutions digitales pour PME, startups et indépendants.",
    intro: "KAH-Digital accompagne les entreprises clermontoise dans leur présence digitale. Clermont-Ferrand est une ville industrielle et entrepreneuriale : Michelin, startups, PME agroalimentaires, professions libérales. Notre studio crée des sites web efficaces avec un process clair et des devis personnalisés après échange.",
    sectors: ["PME industrielles", "Startups & tech", "Agroalimentaire & terroir", "Artisans & indépendants", "Cabinets & professions libérales", "Restaurants & commerces"],
    proofLine: "Réponse en 24h · Devis personnalisé · Sans engagement",
    faq: [
      { q: "Faites-vous des sites pour des PME industrielles à Clermont-Ferrand ?", a: "Oui, sites institutionnels, catalogues produits, portails B2B. On connaît les besoins des entreprises industrielles." },
      { q: "Comment est défini le devis pour un projet local ?", a: "Chaque projet est cadré selon le besoin réel, les fonctionnalités, les délais et vos priorités. Le devis personnalisé est fourni après un court échange, sans engagement." },
      { q: "Travaillez-vous avec des startups auvergnates ?", a: "Oui, MVP, landing pages, applications métier. L'écosystème auvergnat est actif et en croissance." },
    ],
  },
  "agence-web-metz": {
    city: "Metz", country: "France", region: "Grand Est", locale: "fr", slug: "agence-web-metz",
    headline: "Création de site web à Metz",
    subline: "Studio digital pour Metz et le Grand Est · sites web, apps et solutions digitales pour PME, indépendants et entreprises transfrontalières.",
    intro: "KAH-Digital crée des sites web pour les entreprises messines. Metz est une ville stratégique à la croisée de la France, du Luxembourg et de l'Allemagne : PME industrielles, commerces, professions libérales, entreprises transfrontalières. Sites web professionnels, multilingues si besoin, livrés rapidement.",
    sectors: ["PME & industries", "Entreprises transfrontalières FR/LU/DE", "Commerces & boutiques", "Cabinets & professions libérales", "Restaurants & hôtels", "Artisans & indépendants"],
    proofLine: "Réponse en 24h · Devis personnalisé · Sans engagement",
    faq: [
      { q: "Faites-vous des sites bilingues pour des entreprises transfrontalières à Metz ?", a: "Oui, sites FR/DE, FR/EN ou trilingues. Metz est à la croisée des marchés européens et nous comprenons ces enjeux." },
      { q: "Comment est défini le devis pour un projet local ?", a: "Chaque projet est cadré selon le besoin réel, les fonctionnalités, les délais et vos priorités. Le devis personnalisé est fourni après un court échange, sans engagement." },
      { q: "Travaillez-vous avec des entreprises basées au Luxembourg proches de Metz ?", a: "Oui, notre studio travaille pour toute la Grande Région. Sites en français, allemand et anglais disponibles." },
    ],
  },
};

type Props = { data: CityPageData };

const SWISS_CITIES = ["Lausanne", "Genève", "Fribourg", "Zurich", "Bâle", "Berne", "Lugano"];
const SWISS_LINKS = [
  { label: "Site web Lausanne", href: "/site-web-lausanne" },
  { label: "Site web Genève", href: "/site-web-geneve" },
  { label: "Site web Fribourg", href: "/site-web-fribourg" },
  { label: "Agence web Zurich", href: "/agence-web-zurich" },
  { label: "Agence web Bâle", href: "/agence-web-basel" },
  { label: "Agence web Berne", href: "/agence-web-berne" },
  { label: "Agence web Lugano", href: "/agence-web-lugano" },
];

export function LocalSeoPageContent({ data }: Props) {
  const devisUrl = `/devis?city=${encodeURIComponent(data.city)}&ref=local-seo`;
  const isSwiss = SWISS_CITIES.includes(data.city);
  const WA_URL = isSwiss ? WA_URL_CH : WA_URL_FR;
  const currency = isSwiss ? "CHF" : "€";
  const priceStarter = isSwiss ? "CHF 149" : "149 €";
  const priceBusiness = isSwiss ? "CHF 420" : "390 €";
  const priceAI = isSwiss ? "CHF 950" : "890 €";

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "KAH Digital",
      "description": `Studio digital · création de sites web, applications et solutions IA à ${data.city}`,
      "url": `https://kah-digital.ch/${data.slug}`,
      "telephone": "+33759558414",
      "email": "kahdigital42@gmail.com",
      "address": { "@type": "PostalAddress", "addressLocality": "Lausanne", "addressCountry": "CH" },
      "areaServed": { "@type": "City", "name": data.city },
      "openingHours": "Mo-Fr 09:00-18:00",
      "sameAs": ["https://www.linkedin.com/company/kah-digital-95128b408", "https://x.com/DigitalKah42"],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": data.faq.map((f) => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a },
      })),
    },
  ];

  return (
    <div className="min-h-screen bg-[#050509] text-white">
      <Script id={`ld-${data.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-24">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[130px]" />
        <div className="absolute -top-20 right-0 h-[300px] w-[300px] rounded-full bg-violet-600/8 blur-[100px]" />

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          {isSwiss && (
            <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/8 px-3 py-1 text-xs font-medium text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Studio basé en Suisse · Places disponibles cette semaine
            </div>
          )}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-sm text-gray-300">
            <FiMapPin size={13} className="text-blue-400" />
            {data.city}, {data.country}
          </div>
          <h1 className="mb-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {data.headline}
          </h1>
          <p className="mb-8 max-w-2xl mx-auto text-lg text-gray-400">{data.subline}</p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={devisUrl}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-8 py-3.5 font-bold text-white shadow-lg shadow-blue-500/30 transition hover:gap-3 hover:shadow-blue-500/45"
            >
              Devis gratuit en 24h <FiArrowRight size={15} />
            </Link>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-8 py-3.5 font-bold text-white shadow-lg shadow-green-500/20 transition hover:brightness-110"
            >
              <FiMessageCircle size={15} />
              WhatsApp — réponse 2h
            </a>
          </div>
          <p className="mt-5 text-sm text-gray-600">{data.proofLine}</p>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-white/[0.06] bg-white/[0.015] py-8">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { value: "120+", label: "Sites livrés" },
              { value: `dès ${priceStarter}`, label: "Prix fixe garanti" },
              { value: "5 jours", label: "Délai minimum" },
              { value: "24h", label: "Réponse garantie" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-xl font-black text-white sm:text-2xl">{s.value}</div>
                <div className="mt-1 text-xs text-gray-600">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Swiss trust block */}
      {isSwiss && (
        <section className="border-b border-emerald-500/10 bg-emerald-500/[0.03] py-6">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-emerald-400/80">
              {[
                { icon: "🇨🇭", label: "Société domiciliée à Lausanne" },
                { icon: "💳", label: "Facturation CHF · TWINT accepté" },
                { icon: "🔒", label: "Conforme LPD (loi suisse protection des données)" },
                { icon: "📄", label: "Devis en CHF · RC Vaud" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-1.5 rounded-full border border-emerald-500/15 bg-emerald-500/5 px-3 py-1.5">
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Intro */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-lg leading-relaxed text-gray-300">{data.intro}</p>
        </div>
      </section>

      {/* Sectors */}
      <section className="border-t border-white/[0.06] py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="mb-8 text-center text-2xl font-extrabold tracking-tight text-white">
            Secteurs accompagnés à {data.city}
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {data.sectors.map((s) => (
              <div key={s} className="flex items-center gap-2.5 rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 transition hover:border-blue-500/25">
                <FiCheck size={13} className="shrink-0 text-blue-400" />
                <span className="text-sm text-gray-300">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="border-t border-white/[0.06] bg-white/[0.015] py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="mb-10 text-center text-2xl font-extrabold tracking-tight text-white">
            Pourquoi KAH Digital à {data.city} ?
          </h2>
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              {
                icon: FiZap,
                title: "Livré en 5 à 14 jours",
                body: "Starter en 5 jours. Business en 14 jours. Brief court, décisions rapides, zéro aller-retour inutile. Pas 6 semaines.",
              },
              {
                icon: FiClock,
                title: "Réponse en 24h garantie",
                body: "Première réponse le jour ouvrable suivant. Accès direct au fondateur — pas de chef de projet intermédiaire, pas de délai.",
              },
              {
                icon: FiMapPin,
                title: `Prix fixe dès ${priceStarter}`,
                body: `Devis fixe avant de commencer. Zéro surprise, zéro coût caché. ${currency === "CHF" ? "Studio basé à Lausanne, à portée de main." : "Studio suisse, tarifs compétitifs."}`,
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6 transition hover:border-blue-500/20">
                <item.icon size={18} className="mb-3 text-blue-400" />
                <h3 className="mb-2 font-bold text-white">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-400">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="border-t border-white/[0.06] py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-white">Tarifs pour {data.city}</h2>
          <p className="mb-8 text-gray-500">Prix fixes et transparents. Zéro abonnement, zéro lock-in, 100% à vous à la livraison.</p>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "Starter", price: priceStarter, sub: `Landing page · 5 jours`, highlight: false },
              { label: "Business", price: priceBusiness, sub: `Jusqu'à 6 pages · SEO · 14 jours`, highlight: true },
              { label: "Premium IA", price: priceAI, sub: `Système complet + IA · 28 jours`, highlight: false },
            ].map((item) => (
              <div
                key={item.label}
                className={`rounded-xl p-5 text-left transition ${item.highlight
                  ? "border border-blue-500/30 bg-[linear-gradient(135deg,rgba(59,130,246,0.08),rgba(124,58,237,0.06))] shadow-lg shadow-blue-500/10"
                  : "border border-white/[0.07] bg-white/[0.025]"}`}
              >
                <div className="mb-1 text-[11px] font-bold uppercase tracking-widest text-gray-600">{item.label}</div>
                <div className="text-2xl font-black text-white">{item.price}</div>
                <div className="mt-1 text-xs text-gray-500">{item.sub}</div>
                {item.highlight && (
                  <div className="mt-3 text-[10px] font-semibold uppercase tracking-widest text-blue-400">Le plus populaire</div>
                )}
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs text-gray-700">
            Options disponibles : page supplémentaire, SEO avancé, logo, chatbot IA, maintenance mensuelle.
          </p>
          {isSwiss && (
            <p className="mt-3 text-xs text-emerald-500/60">
              💳 Paiement accepté : virement bancaire CHF · TWINT · Carte bancaire (Stripe)
            </p>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-white/[0.06] bg-white/[0.015] py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="mb-8 text-center text-2xl font-extrabold tracking-tight text-white">Questions fréquentes</h2>
          <div className="space-y-3">
            {data.faq.map((item) => (
              <div key={item.q} className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-5">
                <h3 className="mb-2 font-semibold text-white">{item.q}</h3>
                <p className="text-sm leading-relaxed text-gray-400">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="border-t border-white/[0.06] py-20 text-center">
        <div className="mx-auto max-w-2xl px-4">
          <div className="mx-auto mb-8 max-w-sm rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
            <div className="mb-2 flex justify-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} viewBox="0 0 24 24" fill="#fbbf24" className="h-3.5 w-3.5">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <p className="text-sm italic text-gray-300">
              &ldquo;Depuis la refonte, je reçois 3 à 4 demandes qualifiées par semaine. ROI dès le premier mois.&rdquo;
            </p>
            <p className="mt-2 text-xs text-gray-600">M.L. — Avocate, Lausanne</p>
          </div>
          <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-white">
            Votre projet à {data.city} — on en parle ?
          </h2>
          <p className="mb-8 text-gray-500">Devis gratuit · Réponse sous 24h · Sans engagement</p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href={devisUrl}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-10 py-4 font-bold text-white shadow-lg shadow-blue-500/25 transition hover:shadow-blue-500/40"
            >
              Demander mon devis gratuit <FiArrowRight size={15} />
            </Link>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#25D366]/10 px-8 py-4 font-semibold text-[#25D366] transition hover:bg-[#25D366] hover:text-white"
            >
              <FiMessageCircle size={15} />
              WhatsApp direct
            </a>
          </div>
        </div>
      </section>

      {/* Internal links Suisse */}
      {isSwiss && (
        <section className="border-t border-white/[0.05] bg-[#050509] py-10">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <p className="mb-4 text-center text-[10px] font-bold uppercase tracking-widest text-gray-700">Autres villes suisses</p>
            <div className="flex flex-wrap justify-center gap-2.5">
              {SWISS_LINKS.filter((l) => !l.href.includes(data.slug)).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-white/[0.07] bg-white/[0.025] px-4 py-1.5 text-xs text-gray-500 transition hover:border-blue-500/30 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex gap-2 border-t border-white/[0.08] bg-[#050509]/95 px-4 py-3 backdrop-blur-sm sm:hidden">
        <Link
          href={devisUrl}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/25"
        >
          Devis gratuit <FiArrowRight size={13} />
        </Link>
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-white shadow-md"
        >
          <FiMessageCircle size={14} />
          WA
        </a>
      </div>
    </div>
  );
}



