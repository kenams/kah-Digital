import Link from "next/link";
import Script from "next/script";
import { FiArrowRight, FiCheck, FiClock, FiMapPin, FiZap } from "react-icons/fi";

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
    subline: "Studio digital basé à Lausanne — sites, apps et solutions IA pour indépendants, PME et startups vaudoises.",
    intro: "KAH-Digital est un studio digital installé à Lausanne. Nous créons des sites web professionnels, des applications métier et des automatisations IA pour les entreprises et particuliers de la région lémanique — de Nyon à Montreux, de Lausanne à Fribourg.",
    sectors: ["Avocats & fiduciaires", "Restaurants & hôtels", "Coachs & thérapeutes", "Artisans & indépendants", "Startups & PME vaudoises", "Photographes & créatifs"],
    proofLine: "Réponse en 24h · Devis gratuit · Tarifs dès € 300",
    faq: [
      { q: "Travaillez-vous uniquement à Lausanne ?", a: "Non — nous travaillons à distance pour toute la Suisse romande, la France et l'international. Lausanne est notre base, mais le projet se gère entièrement en ligne." },
      { q: "Quels sont vos délais pour un site à Lausanne ?", a: "Un site vitrine simple : 2 à 3 semaines. Un site corporate complet : 3 à 5 semaines. Une app sur mesure : 6 à 10 semaines selon le scope." },
      { q: "Faites-vous des réunions en personne ?", a: "Oui, si le projet le nécessite — nous pouvons nous rencontrer à Lausanne ou dans la région. La plupart du cadrage se fait en visioconférence pour gagner du temps." },
    ],
  },
  "site-web-geneve": {
    city: "Genève", country: "Suisse", region: "Genève", locale: "fr", slug: "site-web-geneve",
    headline: "Création de site web à Genève",
    subline: "Studio digital proche de Genève — sites professionnels, apps et solutions digitales pour entreprises et particuliers genevois.",
    intro: "KAH-Digital accompagne les entreprises et indépendants de la région genevoise dans leur présence digitale. Cabinets d'avocats, fiduciaires, restaurants, coachs, artisans : nous créons des sites web qui représentent correctement votre activité et génèrent des contacts.",
    sectors: ["Cabinets d'avocats & notaires", "Fiduciaires & consultants", "Hôtels & restauration", "ONG & associations", "Startups Geneva Lake", "Médecins & thérapeutes"],
    proofLine: "Réponse en 24h · Devis gratuit · Tarifs dès € 300",
    faq: [
      { q: "Êtes-vous basés à Genève ?", a: "Notre studio est à Lausanne, à 45 min de Genève. Nous travaillons régulièrement avec des clients genevois — tout se gère en ligne ou en déplacement si besoin." },
      { q: "Travaillez-vous en anglais pour des clients genevois ?", a: "Oui — nous travaillons en français, anglais et allemand. Beaucoup de nos clients genevois sont internationaux ou bilingues." },
      { q: "Quel budget prévoir pour un site à Genève ?", a: "De € 300 pour un portfolio simple à € 4 000-12 000 pour une application métier. Un site vitrine standard se situe entre € 900 et € 2 500." },
    ],
  },
  "site-web-fribourg": {
    city: "Fribourg", country: "Suisse", region: "Fribourg", locale: "fr", slug: "site-web-fribourg",
    headline: "Création de site web à Fribourg",
    subline: "Studio digital romand — sites web professionnels et applications pour entreprises et indépendants de Fribourg.",
    intro: "KAH-Digital crée des sites web et des solutions digitales pour les entreprises, artisans et indépendants du canton de Fribourg. Bilingue français-allemand, notre studio comprend les besoins spécifiques du marché fribourgeois.",
    sectors: ["Artisans & PME", "Restaurants & cafés", "Coachs & formateurs", "Associations & institutions", "Agriculture & terroir", "Professions libérales"],
    proofLine: "Bilingue FR/DE · Devis gratuit · Dès € 300",
    faq: [
      { q: "Travaillez-vous en allemand pour les clients fribourgeoises ?", a: "Oui — KAH-Digital produit des sites en français, allemand et anglais. Idéal pour le marché bilingue fribourgeois." },
      { q: "Quels sont vos tarifs pour un site à Fribourg ?", a: "De € 300 pour une page simple à € 1 500 pour un site vitrine complet. Un devis gratuit est fourni après un court échange." },
      { q: "Peut-on se rencontrer à Fribourg ?", a: "Nous pouvons nous déplacer à Fribourg pour les projets importants. La plupart des échanges se font en visioconférence." },
    ],
  },
  "agence-web-paris": {
    city: "Paris", country: "France", region: "Île-de-France", locale: "fr", slug: "agence-web-paris",
    headline: "Création de site web à Paris",
    subline: "Studio digital franco-suisse — sites web, apps et solutions IA pour freelances, PME et startups parisiennes.",
    intro: "KAH-Digital accompagne les entreprises et indépendants parisiens dans leur présence digitale. Basé en Suisse, notre studio travaille à distance pour toute la France — process clair, réponse rapide et tarifs transparents dès € 300.",
    sectors: ["Avocats & experts-comptables", "Agences & consultants", "E-commerce & boutiques", "Coachs & formateurs", "Startups & scale-ups", "Freelances & créatifs"],
    proofLine: "Réponse en 24h · Devis gratuit · Dès € 300",
    faq: [
      { q: "Travaillez-vous avec des clients parisiens à distance ?", a: "Oui — tout le projet se gère en ligne. Visioconférence pour le cadrage, livraison et suivi par email. Aucun déplacement nécessaire." },
      { q: "Quels délais pour un site à Paris ?", a: "Landing page : 1 semaine. Site vitrine : 2-3 semaines. Site corporate : 4-5 semaines. Application : 6-12 semaines." },
      { q: "Pourquoi passer par un studio suisse pour un site parisien ?", a: "Nous offrons la rigueur suisse — process structuré, devis lisible, délais tenus — avec des tarifs compétitifs et une réactivité maximale." },
    ],
  },
  "agence-web-lyon": {
    city: "Lyon", country: "France", region: "Auvergne-Rhône-Alpes", locale: "fr", slug: "agence-web-lyon",
    headline: "Création de site web à Lyon",
    subline: "Studio digital — sites web professionnels, apps et solutions IA pour entreprises et indépendants de Lyon et la région.",
    intro: "KAH-Digital crée des sites web et solutions digitales pour les entreprises lyonnaises. Proche géographiquement de la Suisse, nous travaillons régulièrement avec des clients de la région Auvergne-Rhône-Alpes — process simple, tarifs clairs, livraison rapide.",
    sectors: ["Restaurants & bouchons lyonnais", "PME industrielles", "Cabinets & professions libérales", "E-commerce & boutiques", "Startups & incubateurs", "Artisans & indépendants"],
    proofLine: "Réponse en 24h · Devis gratuit · Dès € 300",
    faq: [
      { q: "Intervenez-vous à Lyon pour des réunions ?", a: "Lyon est à 2h de notre studio suisse. Nous pouvons nous déplacer pour les projets importants. Le cadrage se fait généralement en visio." },
      { q: "Quels tarifs pour un site à Lyon ?", a: "De € 300 pour un portfolio simple à € 4 500 pour un site corporate complet. Tous les devis sont gratuits et fournis sous 24h." },
      { q: "Avez-vous déjà travaillé avec des entreprises lyonnaises ?", a: "Oui — restaurants, cabinets de conseil, PME industrielles. La région est proche et nous en comprenons le tissu économique." },
    ],
  },
  "agence-web-marseille": {
    city: "Marseille", country: "France", region: "PACA", locale: "fr", slug: "agence-web-marseille",
    headline: "Création de site web à Marseille",
    subline: "Studio digital pour Marseille et la région PACA — sites, apps et solutions IA pour PME, indépendants et commerces.",
    intro: "KAH-Digital accompagne les entreprises marseillaises dans leur présence digitale. Restaurants, cabinets, boutiques, artisans : un site web propre, rapide et qui convertit — avec un process clair et des tarifs transparents dès € 300.",
    sectors: ["Restaurants & commerces", "Artisans & indépendants", "Professions libérales", "Tourisme & hôtellerie", "E-commerce", "Startups PACA"],
    proofLine: "Réponse en 24h · Devis gratuit · Dès € 300",
    faq: [
      { q: "Travaillez-vous avec des clients à Marseille à distance ?", a: "Oui — tout le projet se gère en ligne. Visioconférence pour le cadrage, livraison par email. Pas de déplacement nécessaire." },
      { q: "Quels délais pour un site à Marseille ?", a: "Landing page : 1 semaine. Site vitrine : 2-3 semaines. Application : 6-10 semaines selon le scope." },
      { q: "Quel budget prévoir ?", a: "De € 300 pour un portfolio simple à € 12 000 pour une application sur mesure. Devis gratuit et sans engagement sous 24h." },
    ],
  },
  "agence-web-bordeaux": {
    city: "Bordeaux", country: "France", region: "Nouvelle-Aquitaine", locale: "fr", slug: "agence-web-bordeaux",
    headline: "Création de site web à Bordeaux",
    subline: "Studio digital — sites web et applications pour PME, indépendants et startups de Bordeaux et la région.",
    intro: "KAH-Digital crée des sites web professionnels pour les entreprises bordelaises. Vignobles, cabinets, startups, commerces — un site web clair, rapide et adapté à votre activité, livré dans les délais convenus.",
    sectors: ["Vignobles & domaines", "Cabinets & consultants", "Startups & scale-ups", "Restaurants & hôtels", "E-commerce", "Artisans & indépendants"],
    proofLine: "Réponse en 24h · Devis gratuit · Dès € 300",
    faq: [
      { q: "Faites-vous des sites pour le secteur viticole à Bordeaux ?", a: "Oui — sites de domaines viticoles avec boutique en ligne, réservations de dégustations et galerie photo. Un secteur qu'on connaît bien." },
      { q: "Quels tarifs pour un site à Bordeaux ?", a: "De € 300 pour un portfolio simple à € 4 500 pour un site corporate. Tous les devis sont gratuits et fournis sous 24h." },
      { q: "Travaillez-vous à distance pour Bordeaux ?", a: "Oui — tout le projet se gère en visioconférence et email. Efficace et sans perte de temps en déplacement." },
    ],
  },
  "agence-web-nantes": {
    city: "Nantes", country: "France", region: "Pays de la Loire", locale: "fr", slug: "agence-web-nantes",
    headline: "Création de site web à Nantes",
    subline: "Studio digital pour Nantes et la région — sites web, apps et automatisations IA pour entreprises et indépendants.",
    intro: "KAH-Digital accompagne les entreprises nantaises dans leur présence digitale. Nantes est l'un des écosystèmes startup les plus actifs de France — notre studio comprend les besoins tech des scale-ups comme des TPE.",
    sectors: ["Startups & tech", "Cabinets & consultants", "E-commerce", "Associations & ONG", "Artisans & indépendants", "Restaurants & commerces"],
    proofLine: "Réponse en 24h · Devis gratuit · Dès € 300",
    faq: [
      { q: "Travaillez-vous avec des startups nantaises ?", a: "Oui — MVP, portails, dashboards et intégrations IA. Nantes a un écosystème tech solide que nous suivons de près." },
      { q: "Quels tarifs pour un site à Nantes ?", a: "De € 300 pour un portfolio simple à € 12 000+ pour une application complète. Devis gratuit sous 24h." },
      { q: "Pouvez-vous faire une application mobile pour une startup nantaise ?", a: "Oui — application Expo React Native, cross-platform iOS et Android. Délai moyen : 6 à 12 semaines selon le scope." },
    ],
  },
  "agence-web-strasbourg": {
    city: "Strasbourg", country: "France", region: "Alsace", locale: "fr", slug: "agence-web-strasbourg",
    headline: "Création de site web à Strasbourg",
    subline: "Studio digital trilingue FR/DE/EN — sites web et applications pour entreprises alsaciennes, transfrontalières et internationales.",
    intro: "KAH-Digital est un studio idéal pour les entreprises strasbourgeoises : trilingue français-allemand-anglais, nous comprenons les enjeux des marchés transfrontaliers. Sites vitrines, applications métier ou solutions IA — process clair, livraison rapide.",
    sectors: ["Entreprises transfrontalières FR/DE", "Institutions & collectivités", "Cabinets d'avocats", "E-commerce", "Artisans & PME", "Tourisme & culture"],
    proofLine: "Trilingue FR/DE/EN · Devis gratuit · Dès € 300",
    faq: [
      { q: "Faites-vous des sites bilingues français-allemand ?", a: "Oui — c'est l'une de nos spécialités. Nous créons des sites natifs multilingues, optimisés SEO dans chaque langue." },
      { q: "Travaillez-vous avec des entreprises du Bade-Wurtemberg proches de Strasbourg ?", a: "Oui — notre studio est trilingue. Nous accompagnons aussi les entreprises allemandes ou suisses proches de Strasbourg." },
      { q: "Quel budget pour un site bilingue ?", a: "Un site vitrine bilingue FR/DE se situe entre € 1 200 et € 2 500. Devis précis et gratuit sous 24h." },
    ],
  },
  "agence-web-berne": {
    city: "Berne", country: "Suisse", region: "Berne", locale: "fr", slug: "agence-web-berne",
    headline: "Création de site web à Berne",
    subline: "Studio digital suisse bilingue FR/DE — sites, apps et solutions pour entreprises, PME et indépendants de la région bernoise.",
    intro: "KAH-Digital accompagne les entreprises et indépendants de la région bernoise dans leur présence digitale. Bilingue français-allemand, notre studio est parfaitement adapté aux besoins du marché bernois — fédéral, institutionnel, ou PME de proximité.",
    sectors: ["Institutions & administrations", "Cabinets & consultants", "PME bilingues", "Artisans & indépendants", "Associations & ONG", "Startups bernoises"],
    proofLine: "Bilingue FR/DE · Devis gratuit · Dès € 300",
    faq: [
      { q: "Faites-vous des sites pour des institutions bernoises ?", a: "Oui — sites institutionnels, portails de services et intranets. Expérience avec les structures fédérales et cantonales." },
      { q: "Quels tarifs pour un site à Berne ?", a: "De CHF 300 pour une page simple à CHF 12 000+ pour une application sur mesure. Devis gratuit sous 24h." },
      { q: "Travaillez-vous en allemand pour les clients bernois ?", a: "Oui — KAH-Digital produit des sites en allemand, français et anglais. Idéal pour le marché bilingue bernois." },
    ],
  },
  "agence-web-toulouse": {
    city: "Toulouse", country: "France", region: "Occitanie", locale: "fr", slug: "agence-web-toulouse",
    headline: "Création de site web à Toulouse",
    subline: "Studio digital pour Toulouse et l'Occitanie — sites web, apps et solutions IA pour PME, startups et indépendants.",
    intro: "KAH-Digital accompagne les entreprises toulousaines dans leur présence digitale. Toulouse est la 4ème ville de France et un hub technologique majeur — notre studio comprend autant les besoins des PME aéronautiques que des restaurants du Capitole. Process clair, tarifs transparents, livraison rapide.",
    sectors: ["Aéronautique & ingénierie", "Restaurants & commerces", "Cabinets & professions libérales", "Startups & tech", "Artisans & indépendants", "E-commerce"],
    proofLine: "Réponse en 24h · Devis gratuit · Dès € 300",
    faq: [
      { q: "Travaillez-vous avec des PME du secteur aéronautique à Toulouse ?", a: "Oui — sites institutionnels, portails partenaires et intranets. Le tissu économique toulousain nous est familier." },
      { q: "Quels délais pour un site à Toulouse ?", a: "Landing page : 1 sem. Site vitrine : 2-3 sem. App sur mesure : 6-12 sem. selon scope." },
      { q: "Quel budget prévoir ?", a: "De € 300 pour un portfolio à € 12 000+ pour une application. Devis gratuit sous 24h." },
    ],
  },
  "agence-web-nice": {
    city: "Nice", country: "France", region: "Côte d'Azur", locale: "fr", slug: "agence-web-nice",
    headline: "Création de site web à Nice",
    subline: "Studio digital pour Nice et la Côte d'Azur — sites web professionnels pour hôtels, restaurants, professions libérales et commerces.",
    intro: "KAH-Digital crée des sites web pour les entreprises niçoises. Tourisme, hôtellerie, restaurants gastronomiques, cabinets médicaux, boutiques — un site rapide, mobile et qui convertit. La Côte d'Azur mérite une présence digitale à la hauteur.",
    sectors: ["Hôtels & résidences", "Restaurants gastronomiques", "Boutiques & luxe", "Médecins & thérapeutes", "Agences immobilières", "Artisans & prestataires"],
    proofLine: "Réponse en 24h · Devis gratuit · Dès € 300",
    faq: [
      { q: "Faites-vous des sites pour le secteur hôtelier niçois ?", a: "Oui — sites vitrines, réservation en ligne, galeries photo. Nous connaissons bien les besoins du tourisme haut de gamme." },
      { q: "Créez-vous des sites en plusieurs langues pour Nice ?", a: "Oui — sites FR/EN/IT/DE pour accueillir la clientèle internationale de la Côte d'Azur." },
      { q: "Quels tarifs pour un site à Nice ?", a: "De € 300 pour une page simple à € 4 500 pour un site corporate complet. Devis gratuit sous 24h." },
    ],
  },
  "agence-web-lille": {
    city: "Lille", country: "France", region: "Hauts-de-France", locale: "fr", slug: "agence-web-lille",
    headline: "Création de site web à Lille",
    subline: "Studio digital pour Lille et les Hauts-de-France — sites web, apps et solutions IA pour PME, indépendants et commerces.",
    intro: "KAH-Digital accompagne les entreprises lilloises dans leur présence digitale. Carrefour entre Paris, Bruxelles et Londres, Lille est un marché dynamique — notre studio crée des sites web efficaces pour artisans, cabinets, startups et commerces de la région.",
    sectors: ["Commerces & boutiques", "PME industrielles", "Cabinets & consultants", "Restaurants & cafés", "Startups & tech", "Artisans & indépendants"],
    proofLine: "Réponse en 24h · Devis gratuit · Dès € 300",
    faq: [
      { q: "Faites-vous des sites bilingues FR/EN pour des entreprises lilloises ?", a: "Oui — Lille étant à la croisée des marchés européens, nous créons régulièrement des sites multilingues." },
      { q: "Quels délais pour un site à Lille ?", a: "Landing : 1 sem. Site vitrine : 2-3 sem. App : 6-12 sem. Devis gratuit sous 24h." },
      { q: "Avez-vous de l'expérience avec des PME industrielles du Nord ?", a: "Oui — portails B2B, catalogues produits, intranets. On connaît les besoins des PME industrielles." },
    ],
  },
  "agence-web-montpellier": {
    city: "Montpellier", country: "France", region: "Occitanie", locale: "fr", slug: "agence-web-montpellier",
    headline: "Création de site web à Montpellier",
    subline: "Studio digital pour Montpellier — sites web, apps et solutions IA pour startups, professions de santé et entreprises méditerranéennes.",
    intro: "KAH-Digital crée des sites web professionnels pour les entreprises montpelliéraines. Montpellier est une ville dynamique — startups, médecins, avocats, restaurants, e-commerce. Notre studio propose un process simple : brief en ligne, devis sous 24h, livraison en 2 à 6 semaines.",
    sectors: ["Professions de santé", "Startups & tech", "Cabinets juridiques", "Restaurants & commerces", "E-commerce", "Artisans & indépendants"],
    proofLine: "Réponse en 24h · Devis gratuit · Dès € 300",
    faq: [
      { q: "Faites-vous des sites pour des médecins et thérapeutes à Montpellier ?", a: "Oui — sites médicaux clairs, conformes RGPD, avec prise de rendez-vous en ligne si besoin." },
      { q: "Quel budget prévoir à Montpellier ?", a: "De € 300 pour un portfolio simple à € 12 000+ pour une application. Devis gratuit sous 24h." },
      { q: "Combien de temps pour un site à Montpellier ?", a: "Landing page : 1 sem. Site vitrine : 2-3 sem. Site corporate : 4-5 sem. App : 6-12 sem." },
    ],
  },
  "agence-web-rennes": {
    city: "Rennes", country: "France", region: "Bretagne", locale: "fr", slug: "agence-web-rennes",
    headline: "Création de site web à Rennes",
    subline: "Studio digital pour Rennes et la Bretagne — sites web, apps et solutions IA pour startups, PME et indépendants.",
    intro: "KAH-Digital accompagne les entreprises rennaises dans leur présence digitale. Rennes est l'un des écosystèmes tech les plus actifs de l'ouest de la France — notre studio crée des sites et applications pour startups, freelances, artisans et TPE de la région.",
    sectors: ["Startups & tech", "Artisans & indépendants", "Restaurants & commerces", "Cabinets & professions libérales", "E-commerce", "Associations & ONG"],
    proofLine: "Réponse en 24h · Devis gratuit · Dès € 300",
    faq: [
      { q: "Créez-vous des applications pour des startups rennaises ?", a: "Oui — MVP, portails SaaS, dashboards et intégrations API. Rennes est une ville tech et on l'accompagne." },
      { q: "Quels tarifs pour un site à Rennes ?", a: "De € 300 pour un portfolio simple à € 12 000+ pour une application complète. Devis gratuit sous 24h." },
      { q: "Pouvez-vous créer un site e-commerce pour un artisan breton ?", a: "Oui — boutique en ligne, paiement sécurisé, gestion de commandes. On aime les projets d'artisans." },
    ],
  },
  "agence-web-zurich": {
    city: "Zurich", country: "Suisse", region: "Zurich", locale: "fr", slug: "agence-web-zurich",
    headline: "Création de site web à Zurich",
    subline: "Studio digital suisse multilingue — sites web, apps et solutions IA pour entreprises de Zurich et la Suisse alémanique.",
    intro: "KAH-Digital accompagne les entreprises de Zurich dans leur présence digitale. Zurich est la capitale économique suisse — banques, cabinets d'avocats, startups fintech, PME industrielles : notre studio crée des sites professionnels multilingues (FR/DE/EN) adaptés au marché zurichois.",
    sectors: ["Finance & banques", "Cabinets d'avocats & fiduciaires", "Startups fintech", "Hôtels & restauration", "PME industrielles", "Professions libérales"],
    proofLine: "Multilingue FR/DE/EN · Devis gratuit · Dès CHF 300",
    faq: [
      { q: "Faites-vous des sites en allemand pour des entreprises zurichoises ?", a: "Oui — sites natifs en allemand, français et anglais. Idéal pour les entreprises qui ciblent la Suisse alémanique et internationale." },
      { q: "Quels tarifs pour un site à Zurich ?", a: "De CHF 300 pour une page simple à CHF 12 000+ pour une application sur mesure. Devis gratuit sous 24h." },
      { q: "Travaillez-vous avec des startups fintech zurichoises ?", a: "Oui — portails client, dashboards, landing pages et MVPs. On connaît les exigences du marché financier suisse." },
    ],
  },
  "agence-web-basel": {
    city: "Basel", country: "Suisse", region: "Bâle", locale: "fr", slug: "agence-web-basel",
    headline: "Création de site web à Bâle",
    subline: "Studio digital pour Bâle et la région rhénane — sites web trilingues FR/DE/EN pour entreprises pharmaceutiques, culturelles et PME.",
    intro: "KAH-Digital crée des sites web pour les entreprises bâloises. Bâle est un carrefour international unique — industrie pharmaceutique, foires internationales, culture et banques. Notre studio propose des sites multilingues adaptés aux entreprises qui opèrent en France, Allemagne et Suisse.",
    sectors: ["Pharma & life sciences", "Industrie & manufacturing", "Culture & art", "PME transfrontalières", "Cabinets & consultants", "Restaurants & hôtels"],
    proofLine: "Trilingue FR/DE/EN · Devis gratuit · Dès CHF 300",
    faq: [
      { q: "Faites-vous des sites trilingues pour les entreprises bâloises ?", a: "Oui — sites natifs en FR, DE, EN avec SEO dans chaque langue. Idéal pour le marché rhénan." },
      { q: "Quels tarifs pour un site à Bâle ?", a: "De CHF 300 pour une page simple à CHF 12 000+ pour une application. Devis gratuit sous 24h." },
      { q: "Avez-vous travaillé avec des entreprises du secteur pharma ?", a: "Oui — sites institutionnels, portails partenaires et intranets. Nous respectons les exigences de conformité du secteur." },
    ],
  },
  "agence-web-lugano": {
    city: "Lugano", country: "Suisse", region: "Tessin", locale: "fr", slug: "agence-web-lugano",
    headline: "Création de site web à Lugano",
    subline: "Studio digital pour Lugano et le Tessin — sites web, apps et solutions IA en FR, IT et DE pour entreprises tessinoises.",
    intro: "KAH-Digital accompagne les entreprises de Lugano dans leur présence digitale. Le Tessin est unique en Suisse : italien de cœur, suisse d'esprit, tourné vers l'Italie et le monde. Notre studio crée des sites multilingues adaptés aux besoins des entreprises tessinoises — finance, tourisme, luxe, PME.",
    sectors: ["Finance & wealth management", "Tourisme & hôtellerie", "Luxe & mode", "PME & indépendants", "Restaurants & café", "Professions libérales"],
    proofLine: "Trilingue IT/FR/DE · Devis gratuit · Dès CHF 300",
    faq: [
      { q: "Faites-vous des sites en italien pour des entreprises de Lugano ?", a: "Oui — sites natifs en italien, français, allemand et anglais. Le Tessin est notre marché naturel pour l'italien." },
      { q: "Quels tarifs pour un site à Lugano ?", a: "De CHF 300 pour une page simple à CHF 12 000+ pour une application. Devis gratuit sous 24h." },
      { q: "Créez-vous des sites pour le secteur wealth management à Lugano ?", a: "Oui — sites institutionnels discrets, sécurisés, avec RGPD et conformité suisse. Rigueur et élégance." },
    ],
  },
};

type Props = { data: CityPageData };

export function LocalSeoPageContent({ data }: Props) {
  const devisUrl = `/devis?city=${encodeURIComponent(data.city)}&ref=local-seo`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "KAH-Digital",
    "description": `Studio digital — création de sites web, applications et solutions IA à ${data.city}`,
    "url": `https://kah-digital.ch/${data.slug}`,
    "telephone": "+33759558414",
    "email": "kahdigital42@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Lausanne",
      "addressCountry": "CH",
    },
    "areaServed": { "@type": "City", "name": data.city },
    "priceRange": "€€",
    "currenciesAccepted": "EUR, CHF",
    "openingHours": "Mo-Fr 09:00-18:00",
    "sameAs": ["https://www.linkedin.com/company/kah-digital", "https://github.com/kenams"],
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Script id={`ld-${data.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Hero */}
      <section className="relative overflow-hidden bg-gray-950 pt-24 pb-16">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-blue-600/15 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-300">
            <FiMapPin size={13} className="text-blue-400" />
            {data.city}, {data.country}
          </div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {data.headline}
          </h1>
          <p className="mb-8 text-lg text-gray-400">{data.subline}</p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={devisUrl}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-8 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:gap-3 hover:shadow-blue-500/40"
            >
              Devis gratuit en 24h <FiArrowRight size={15} />
            </Link>
            <a
              href="tel:+33759558414"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 font-semibold text-white transition hover:border-white/40"
            >
              Appeler directement
            </a>
          </div>
          <p className="mt-5 text-sm text-gray-500">{data.proofLine}</p>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-gray-900/50 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-lg leading-relaxed text-gray-300">{data.intro}</p>
        </div>
      </section>

      {/* Sectors */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="mb-8 text-center text-2xl font-extrabold tracking-tight text-white">
            Secteurs accompagnés à {data.city}
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {data.sectors.map((s) => (
              <div key={s} className="flex items-center gap-2.5 rounded-xl border border-white/8 bg-gray-900 px-4 py-3">
                <FiCheck size={14} className="shrink-0 text-blue-400" />
                <span className="text-sm text-gray-300">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="bg-gray-900/50 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="mb-10 text-center text-2xl font-extrabold tracking-tight text-white">
            Pourquoi KAH-Digital à {data.city} ?
          </h2>
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              { icon: FiZap, title: "Exécution rapide", body: "Cadrage court, décisions claires. Pas d'aller-retours inutiles. Délai moyen : 2 à 6 semaines." },
              { icon: FiClock, title: "Réponse 24h", body: "Première réponse le jour ouvrable suivant votre demande — devis, question ou brief." },
              { icon: FiMapPin, title: "Tarifs transparents", body: `Dès € 300 pour une page simple. Chaque devis détaille le périmètre avant tout engagement.` },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/8 bg-gray-900 p-6">
                <item.icon size={20} className="mb-3 text-blue-400" />
                <h3 className="mb-2 font-bold text-white">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-400">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <h2 className="mb-4 text-2xl font-extrabold tracking-tight text-white">Tarifs pour {data.city}</h2>
          <p className="mb-8 text-gray-400">Fourchettes indicatives — devis personnalisé gratuit sous 24h.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { label: "Landing / Portfolio", price: "€ 300 – 600", delay: "1–2 sem." },
              { label: "Site vitrine", price: "€ 900 – 1 500", delay: "2–3 sem." },
              { label: "Site corporate", price: "€ 2 200 – 4 500", delay: "3–5 sem." },
              { label: "App web / IA", price: "€ 4 000 – 12 000", delay: "4–10 sem." },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-white/8 bg-gray-900 p-5 text-left">
                <div className="mb-1 text-sm text-gray-500">{item.label}</div>
                <div className="text-xl font-bold text-white">{item.price}</div>
                <div className="mt-1 text-xs text-gray-600">{item.delay}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-900/50 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="mb-8 text-2xl font-extrabold tracking-tight text-white text-center">Questions fréquentes</h2>
          <div className="space-y-4">
            {data.faq.map((item) => (
              <div key={item.q} className="rounded-xl border border-white/8 bg-gray-900 p-5">
                <h3 className="mb-2 font-semibold text-white">{item.q}</h3>
                <p className="text-sm leading-relaxed text-gray-400">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-white">
            Votre projet à {data.city} — on en parle ?
          </h2>
          <p className="mb-8 text-gray-400">Devis gratuit · Réponse sous 24h · Dès € 300</p>
          <Link
            href={devisUrl}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-10 py-4 font-bold text-white shadow-lg shadow-blue-500/25 transition hover:shadow-blue-500/40"
          >
            Demander mon devis gratuit <FiArrowRight size={15} />
          </Link>
        </div>
      </section>
    </div>
  );
}
