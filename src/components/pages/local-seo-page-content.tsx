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
    headline: "Cr�ation de site web � Lausanne",
    subline: "Studio bas� � Lausanne � Next.js 15, Lighthouse 95+, SEO technique. D�s CHF 149, livr� en 5 jours. Prix fixe garanti.",
    intro: "KAH Digital est bas� � Lausanne. Nous cr�ons des sites web haute-performance sur Next.js 15 pour les PME, ind�pendants et startups vaudoises. Design SaaS-level, Core Web Vitals 95+, SEO technique int�gr�. Starter d�s CHF 149 � Business d�s CHF 790 � Syst�me IA complet d�s CHF 1'690. Devis gratuit en 24h, sans engagement.",
    sectors: ["Avocats & fiduciaires", "Restaurants & h�tels", "Coachs & th�rapeutes", "Startups & scale-ups EPFL", "PME vaudoises", "M�decins & professions lib�rales"],
    proofLine: "Studio � Lausanne � R�ponse 24h � Prix fixe CHF 149 � Sans engagement",
    faq: [
      { q: "Combien co�te un site web professionnel � Lausanne ?", a: "Starter (landing page) d�s CHF 149, livr� en 5 jours. Business (jusqu'� 6 pages, SEO) d�s CHF 790, livr� en 14 jours. Syst�me complet avec IA d�s CHF 1'690. Prix fixe garanti avant de commencer, z�ro surprise." },
      { q: "Vous �tes vraiment bas�s � Lausanne ?", a: "Oui, KAH Digital est bas� � Lausanne. Vous pouvez nous rencontrer en personne ou travailler enti�rement � distance � m�me qualit�, m�me prix." },
      { q: "Quels d�lais pour un site � Lausanne ?", a: "Landing page : 5 jours ouvrables. Site vitrine complet : 14 jours. Application ou syst�me IA : 28 jours. D�lais confirm�s par �crit avant d�marrage � pas de mauvaise surprise." },
      { q: "Faites-vous du SEO local pour Lausanne et le Vaud ?", a: "Oui � SEO technique complet, donn�es structur�es, Core Web Vitals 95+, URLs propres, sitemap. Inclus d�s le plan Business. Optimis� pour Google CH." },
    ],
  },
  "site-web-geneve": {
    city: "Gen�ve", country: "Suisse", region: "Gen�ve", locale: "fr", slug: "site-web-geneve",
    headline: "Cr�ation de site web � Gen�ve",
    subline: "Studio romand proche de Gen�ve � Next.js 15, multilingue FR/EN/DE, Lighthouse 95+. D�s CHF 149, 14 jours. Prix fixe.",
    intro: "KAH Digital accompagne les entreprises genevaises dans leur pr�sence digitale : cabinets d'avocats, fiduciaires, ONG, h�tels, startups, m�decins. Sites web haute-performance en fran�ais, anglais et allemand. Bas� � Lausanne, � 45 min de Gen�ve. Devis gratuit sous 24h, prix fixe, code 100% � vous.",
    sectors: ["Cabinets d'avocats & notaires", "Fiduciaires & consultants", "ONG & organisations internationales", "H�tels & restauration de luxe", "Startups Geneva Lake", "M�decins & cliniques"],
    proofLine: "� 45 min de Gen�ve � Multilingue FR/EN/DE � Prix fixe CHF 149 � R�ponse 24h",
    faq: [
      { q: "Combien co�te un site web professionnel � Gen�ve ?", a: "Starter (landing page) d�s CHF 149, livr� en 5 jours. Business (6 pages, SEO multilingue) d�s CHF 790. Syst�me IA complet d�s CHF 1'690. Prix fixe confirm� avant tout d�marrage." },
      { q: "�tes-vous bas�s � Gen�ve ?", a: "Notre studio est � Lausanne, � 45 min de Gen�ve. Nous rencontrons nos clients genevois en personne si besoin ou travaillons enti�rement � distance � m�me qualit�, m�me prix." },
      { q: "Faites-vous des sites multilingues pour les entreprises genevoises ?", a: "Oui � fran�ais, anglais, allemand et plus. hreflang correct, URLs propres par langue, SEO par langue. Standard d�s le plan Business." },
      { q: "Travaillez-vous avec des ONG et organisations internationales � Gen�ve ?", a: "Oui. Nous avons l'exp�rience des secteurs sensibles aux conformit�s et pouvons adapter notre process � vos contraintes de procurement." },
    ],
  },
  "site-web-fribourg": {
    city: "Fribourg", country: "Suisse", region: "Fribourg", locale: "fr", slug: "site-web-fribourg",
    headline: "Cr�ation de site web � Fribourg",
    subline: "Studio romand bilingue FR/DE � Next.js 15, SEO technique, prix fixe. D�s CHF 149, livr� en 5 jours. Sans engagement.",
    intro: "KAH Digital cr�e des sites web professionnels pour les entreprises, artisans et ind�pendants du canton de Fribourg. Bilingue fran�ais-allemand, nous comprenons les besoins sp�cifiques du march� fribourgeois. Sites haute-performance, SEO local, design premium. Starter d�s CHF 149 � Business d�s CHF 790 � Devis gratuit en 24h.",
    sectors: ["Artisans & PME fribourgeois", "Restaurants & caf�s", "Coachs & formateurs", "Agriculture & terroir", "Associations & institutions", "Professions lib�rales"],
    proofLine: "Bilingue FR/DE � Prix fixe CHF 149 � R�ponse 24h � Sans engagement",
    faq: [
      { q: "Combien co�te un site web professionnel � Fribourg ?", a: "Starter (landing page bilingue FR/DE) d�s CHF 149, livr� en 5 jours. Business (6 pages, SEO) d�s CHF 790. Syst�me IA complet d�s CHF 1'690. Prix fixe, z�ro surprise." },
      { q: "Faites-vous des sites bilingues fran�ais-allemand pour le march� fribourgeois ?", a: "Oui � sites FR/DE parfaitement bilingues avec hreflang correct, URLs propres par langue, SEO optimis� dans les deux langues. Id�al pour le march� fribourgeois." },
      { q: "Peut-on se rencontrer � Fribourg ?", a: "Nous pouvons nous d�placer � Fribourg pour les projets importants. La plupart des �changes se font en visioconf�rence depuis Lausanne." },
    ],
  },
  "agence-web-paris": {
    city: "Paris", country: "France", region: "�le-de-France", locale: "fr", slug: "agence-web-paris",
    headline: "Cr�ation de site web � Paris",
    subline: "Studio digital franco-suisse � sites web, apps et solutions digitales pour freelances, PME et startups parisiennes.",
    intro: "KAH Digital accompagne les entreprises et ind�pendants parisiens dans leur pr�sence digitale. Bas� en Suisse, notre studio travaille � distance pour toute la France. Process clair, r�ponse rapide et devis personnalis�s apr�s �change.",
    sectors: ["Avocats & experts-comptables", "Agences & consultants", "E-commerce & boutiques", "Coachs & formateurs", "Startups & scale-ups", "Freelances & cr�atifs"],
    proofLine: "R�ponse en 24h � Devis personnalis� � Sans engagement",
    faq: [
      { q: "Travaillez-vous avec des clients parisiens � distance ?", a: "Oui, tout le projet se g�re en ligne. Visioconf�rence pour le cadrage, livraison et suivi par email. Aucun d�placement n�cessaire." },
      { q: "Quels d�lais pour un site � Paris ?", a: "Landing page : 1 semaine. Site vitrine : 2-3 semaines. Site corporate : 4-5 semaines. Application : 6-12 semaines." },
      { q: "Pourquoi passer par un studio suisse pour un site parisien ?", a: "Nous offrons la rigueur suisse : process structur�, devis lisible, d�lais tenus. Propositions ajust�es et une r�activit� maximale." },
    ],
  },
  "agence-web-lyon": {
    city: "Lyon", country: "France", region: "Auvergne-Rh�ne-Alpes", locale: "fr", slug: "agence-web-lyon",
    headline: "Cr�ation de site web � Lyon",
    subline: "Studio digital � sites web professionnels, apps et solutions digitales pour entreprises et ind�pendants de Lyon et la r�gion.",
    intro: "KAH Digital cr�e des sites web et solutions digitales pour les entreprises lyonnaises. Proche g�ographiquement de la Suisse, nous travaillons r�guli�rement avec des clients de la r�gion Auvergne-Rh�ne-Alpes. Process simple, devis clairs, livraison rapide.",
    sectors: ["Restaurants & bouchons lyonnais", "PME industrielles", "Cabinets & professions lib�rales", "E-commerce & boutiques", "Startups & incubateurs", "Artisans & ind�pendants"],
    proofLine: "R�ponse en 24h � Devis personnalis� � Sans engagement",
    faq: [
      { q: "Intervenez-vous � Lyon pour des r�unions ?", a: "Lyon est � 2h de notre studio suisse. Nous pouvons nous d�placer pour les projets importants. Le cadrage se fait g�n�ralement en visio." },
      { q: "Comment est d�fini le devis pour un projet local ?", a: "Chaque projet est cadr� selon le besoin r�el, les fonctionnalit�s, les d�lais et vos priorit�s. Le devis personnalis� est fourni apr�s un court �change, sans engagement." },
      { q: "Avez-vous d�j� travaill� avec des entreprises lyonnaises ?", a: "Oui, restaurants, cabinets de conseil, PME industrielles. La r�gion est proche et nous en comprenons le tissu �conomique." },
    ],
  },
  "agence-web-marseille": {
    city: "Marseille", country: "France", region: "PACA", locale: "fr", slug: "agence-web-marseille",
    headline: "Cr�ation de site web � Marseille",
    subline: "Studio digital pour Marseille et la r�gion PACA � sites, apps et solutions digitales pour PME, ind�pendants et commerces.",
    intro: "KAH Digital accompagne les entreprises marseillaises dans leur pr�sence digitale. Restaurants, cabinets, boutiques, artisans : un site web propre, rapide et qui convertit. Process clair et des devis personnalis�s apr�s �change.",
    sectors: ["Restaurants & commerces", "Artisans & ind�pendants", "Professions lib�rales", "Tourisme & h�tellerie", "E-commerce", "Startups PACA"],
    proofLine: "R�ponse en 24h � Devis personnalis� � Sans engagement",
    faq: [
      { q: "Travaillez-vous avec des clients � Marseille � distance ?", a: "Oui, tout le projet se g�re en ligne. Visioconf�rence pour le cadrage, livraison par email. Pas de d�placement n�cessaire." },
      { q: "Quels d�lais pour un site � Marseille ?", a: "Landing page : 1 semaine. Site vitrine : 2-3 semaines. Application : 6-10 semaines selon le scope." },
      { q: "Comment est d�fini le budget d'un projet local ?", a: "L'objectif est d'adapter la prestation � votre contexte, � vos priorit�s business et au budget disponible, sans formule rigide ni option inutile." },
    ],
  },
  "agence-web-bordeaux": {
    city: "Bordeaux", country: "France", region: "Nouvelle-Aquitaine", locale: "fr", slug: "agence-web-bordeaux",
    headline: "Cr�ation de site web � Bordeaux",
    subline: "Studio digital � sites web et applications pour PME, ind�pendants et startups de Bordeaux et la r�gion.",
    intro: "KAH Digital cr�e des sites web professionnels pour les entreprises bordelaises. Vignobles, cabinets, startups, commerces, un site web clair, rapide et adapt� � votre activit�, livr� dans les d�lais convenus.",
    sectors: ["Vignobles & domaines", "Cabinets & consultants", "Startups & scale-ups", "Restaurants & h�tels", "E-commerce", "Artisans & ind�pendants"],
    proofLine: "R�ponse en 24h � Devis personnalis� � Sans engagement",
    faq: [
      { q: "Faites-vous des sites pour le secteur viticole � Bordeaux ?", a: "Oui, sites de domaines viticoles avec boutique en ligne, r�servations de d�gustations et galerie photo. Un secteur qu'on conna�t bien." },
      { q: "Comment est d�fini le devis pour un projet local ?", a: "Chaque projet est cadr� selon le besoin r�el, les fonctionnalit�s, les d�lais et vos priorit�s. Le devis personnalis� est fourni apr�s un court �change, sans engagement." },
      { q: "Travaillez-vous � distance pour Bordeaux ?", a: "Oui, tout le projet se g�re en visioconf�rence et email. Efficace et sans perte de temps en d�placement." },
    ],
  },
  "agence-web-nantes": {
    city: "Nantes", country: "France", region: "Pays de la Loire", locale: "fr", slug: "agence-web-nantes",
    headline: "Cr�ation de site web � Nantes",
    subline: "Studio digital pour Nantes et la r�gion � sites web, apps et automatisations IA pour entreprises et ind�pendants.",
    intro: "KAH Digital accompagne les entreprises nantaises dans leur pr�sence digitale. Nantes est l'un des �cosyst�mes startup les plus actifs de France. Notre studio comprend les besoins tech des scale-ups comme des TPE.",
    sectors: ["Startups & tech", "Cabinets & consultants", "E-commerce", "Associations & ONG", "Artisans & ind�pendants", "Restaurants & commerces"],
    proofLine: "R�ponse en 24h � Devis personnalis� � Sans engagement",
    faq: [
      { q: "Travaillez-vous avec des startups nantaises ?", a: "Oui, MVP, portails, dashboards et int�grations IA. Nantes a un �cosyst�me tech solide que nous suivons de pr�s." },
      { q: "Comment est d�fini le devis pour un projet local ?", a: "Chaque projet est cadr� selon le besoin r�el, les fonctionnalit�s, les d�lais et vos priorit�s. Le devis personnalis� est fourni apr�s un court �change, sans engagement." },
      { q: "Pouvez-vous faire une application mobile pour une startup nantaise ?", a: "Oui, application Expo React Native, cross-platform iOS et Android. D�lai moyen : 6 � 12 semaines selon le scope." },
    ],
  },
  "agence-web-strasbourg": {
    city: "Strasbourg", country: "France", region: "Alsace", locale: "fr", slug: "agence-web-strasbourg",
    headline: "Cr�ation de site web � Strasbourg",
    subline: "Studio digital trilingue FR/DE/EN � sites web et applications pour entreprises alsaciennes, transfrontali�res et internationales.",
    intro: "KAH Digital est un studio id�al pour les entreprises strasbourgeoises : trilingue fran�ais-allemand-anglais, nous comprenons les enjeux des march�s transfrontaliers. Sites vitrines, applications m�tier ou solutions digitales. Process clair, livraison rapide.",
    sectors: ["Entreprises transfrontali�res FR/DE", "Institutions & collectivit�s", "Cabinets d'avocats", "E-commerce", "Artisans & PME", "Tourisme & culture"],
    proofLine: "Trilingue FR/DE/EN � Devis personnalis� � Sans engagement",
    faq: [
      { q: "Faites-vous des sites bilingues fran�ais-allemand ?", a: "Oui, c'est l'une de nos sp�cialit�s. Nous cr�ons des sites natifs multilingues, optimis�s SEO dans chaque langue." },
      { q: "Travaillez-vous avec des entreprises du Bade-Wurtemberg proches de Strasbourg ?", a: "Oui, notre studio est trilingue. Nous accompagnons aussi les entreprises allemandes ou suisses proches de Strasbourg." },
      { q: "Comment est d�fini le budget d'un projet local ?", a: "L'objectif est d'adapter la prestation � votre contexte, � vos priorit�s business et au budget disponible, sans formule rigide ni option inutile." },
    ],
  },
  "agence-web-berne": {
    city: "Berne", country: "Suisse", region: "Berne", locale: "fr", slug: "agence-web-berne",
    headline: "Cr�ation de site web � Berne",
    subline: "Studio digital suisse bilingue FR/DE � Next.js 15, Lighthouse 95+, prix fixe. D�s CHF 149, livr� en 5 jours. Sans engagement.",
    intro: "KAH Digital accompagne les entreprises et ind�pendants de la r�gion bernoise dans leur pr�sence digitale. Bilingue fran�ais-allemand, notre studio est parfaitement adapt� aux besoins du march� bernois : f�d�ral, institutionnel, ou PME de proximit�. Starter d�s CHF 149 � Business d�s CHF 790 � Syst�me IA d�s CHF 1'690. Devis gratuit en 24h.",
    sectors: ["Institutions & administrations f�d�rales", "Cabinets & consultants", "PME bilingues FR/DE", "Artisans & ind�pendants", "Associations & ONG", "Startups bernoises"],
    proofLine: "Studio Suisse � Bilingue FR/DE � Prix fixe CHF 149 � R�ponse 24h",
    faq: [
      { q: "Combien co�te un site web professionnel � Berne ?", a: "Starter (landing page bilingue FR/DE) d�s CHF 149, livr� en 5 jours. Business (6 pages, SEO) d�s CHF 790. Syst�me IA complet d�s CHF 1'690. Prix fixe, devis confirm� avant de commencer." },
      { q: "Faites-vous des sites pour des institutions bernoises ?", a: "Oui, sites institutionnels, portails de services et intranets. Exp�rience avec les structures f�d�rales et cantonales suisses." },
      { q: "Travaillez-vous en allemand pour les clients bernois ?", a: "Oui, KAH Digital produit des sites en allemand, fran�ais et anglais. Id�al pour le march� bilingue bernois." },
      { q: "Acceptez-vous le paiement en CHF et TWINT ?", a: "Oui � virement bancaire CHF, TWINT et carte bancaire accept�s. Facturation depuis notre si�ge � Lausanne." },
    ],
  },
  "agence-web-toulouse": {
    city: "Toulouse", country: "France", region: "Occitanie", locale: "fr", slug: "agence-web-toulouse",
    headline: "Cr�ation de site web � Toulouse",
    subline: "Studio digital pour Toulouse et l'Occitanie � sites web, apps et solutions digitales pour PME, startups et ind�pendants.",
    intro: "KAH Digital accompagne les entreprises toulousaines dans leur pr�sence digitale. Toulouse est la 4�me ville de France et un hub technologique majeur. Notre studio comprend autant les besoins des PME a�ronautiques que des restaurants du Capitole. Process clair, devis personnalis�s, livraison rapide.",
    sectors: ["A�ronautique & ing�nierie", "Restaurants & commerces", "Cabinets & professions lib�rales", "Startups & tech", "Artisans & ind�pendants", "E-commerce"],
    proofLine: "R�ponse en 24h � Devis personnalis� � Sans engagement",
    faq: [
      { q: "Travaillez-vous avec des PME du secteur a�ronautique � Toulouse ?", a: "Oui, sites institutionnels, portails partenaires et intranets. Le tissu �conomique toulousain nous est familier." },
      { q: "Quels d�lais pour un site � Toulouse ?", a: "Landing page : 1 sem. Site vitrine : 2-3 sem. App sur mesure : 6-12 sem. selon scope." },
      { q: "Comment est d�fini le budget d'un projet local ?", a: "L'objectif est d'adapter la prestation � votre contexte, � vos priorit�s business et au budget disponible, sans formule rigide ni option inutile." },
    ],
  },
  "agence-web-nice": {
    city: "Nice", country: "France", region: "C�te d'Azur", locale: "fr", slug: "agence-web-nice",
    headline: "Cr�ation de site web � Nice",
    subline: "Studio digital pour Nice et la C�te d'Azur � sites web professionnels pour h�tels, restaurants, professions lib�rales et commerces.",
    intro: "KAH Digital cr�e des sites web pour les entreprises ni�oises. Tourisme, h�tellerie, restaurants gastronomiques, cabinets m�dicaux, boutiques, un site rapide, mobile et qui convertit. La C�te d'Azur m�rite une pr�sence digitale � la hauteur.",
    sectors: ["H�tels & r�sidences", "Restaurants gastronomiques", "Boutiques & luxe", "M�decins & th�rapeutes", "Agences immobili�res", "Artisans & prestataires"],
    proofLine: "R�ponse en 24h � Devis personnalis� � Sans engagement",
    faq: [
      { q: "Faites-vous des sites pour le secteur h�telier ni�ois ?", a: "Oui, sites vitrines, r�servation en ligne, galeries photo. Nous connaissons bien les besoins du tourisme haut de gamme." },
      { q: "Cr�ez-vous des sites en plusieurs langues pour Nice ?", a: "Oui, sites FR/EN/IT/DE pour accueillir la client�le internationale de la C�te d'Azur." },
      { q: "Comment est d�fini le devis pour un projet local ?", a: "Chaque projet est cadr� selon le besoin r�el, les fonctionnalit�s, les d�lais et vos priorit�s. Le devis personnalis� est fourni apr�s un court �change, sans engagement." },
    ],
  },
  "agence-web-lille": {
    city: "Lille", country: "France", region: "Hauts-de-France", locale: "fr", slug: "agence-web-lille",
    headline: "Cr�ation de site web � Lille",
    subline: "Studio digital pour Lille et les Hauts-de-France � sites web, apps et solutions digitales pour PME, ind�pendants et commerces.",
    intro: "KAH Digital accompagne les entreprises lilloises dans leur pr�sence digitale. Carrefour entre Paris, Bruxelles et Londres, Lille est un march� dynamique. Notre studio cr�e des sites web efficaces pour artisans, cabinets, startups et commerces de la r�gion.",
    sectors: ["Commerces & boutiques", "PME industrielles", "Cabinets & consultants", "Restaurants & caf�s", "Startups & tech", "Artisans & ind�pendants"],
    proofLine: "R�ponse en 24h � Devis personnalis� � Sans engagement",
    faq: [
      { q: "Faites-vous des sites bilingues FR/EN pour des entreprises lilloises ?", a: "Oui, Lille �tant � la crois�e des march�s europ�ens, nous cr�ons r�guli�rement des sites multilingues." },
      { q: "Quels d�lais pour un site � Lille ?", a: "Landing : 1 sem. Site vitrine : 2-3 sem. App : 6-12 sem. Devis personnalis� sous 24h." },
      { q: "Avez-vous de l'exp�rience avec des PME industrielles du Nord ?", a: "Oui, portails B2B, catalogues produits, intranets. On conna�t les besoins des PME industrielles." },
    ],
  },
  "agence-web-montpellier": {
    city: "Montpellier", country: "France", region: "Occitanie", locale: "fr", slug: "agence-web-montpellier",
    headline: "Cr�ation de site web � Montpellier",
    subline: "Studio digital pour Montpellier � sites web, apps et solutions digitales pour startups, professions de sant� et entreprises m�diterran�ennes.",
    intro: "KAH Digital cr�e des sites web professionnels pour les entreprises montpelli�raines. Montpellier est une ville dynamique : startups, m�decins, avocats, restaurants, e-commerce. Notre studio propose un process simple : brief en ligne, devis sous 24h, livraison en 2 � 6 semaines.",
    sectors: ["Professions de sant�", "Startups & tech", "Cabinets juridiques", "Restaurants & commerces", "E-commerce", "Artisans & ind�pendants"],
    proofLine: "R�ponse en 24h � Devis personnalis� � Sans engagement",
    faq: [
      { q: "Faites-vous des sites pour des m�decins et th�rapeutes � Montpellier ?", a: "Oui, sites m�dicaux clairs, conformes RGPD, avec prise de rendez-vous en ligne si besoin." },
      { q: "Comment est d�fini le budget d'un projet local ?", a: "L'objectif est d'adapter la prestation � votre contexte, � vos priorit�s business et au budget disponible, sans formule rigide ni option inutile." },
      { q: "Combien de temps pour un site � Montpellier ?", a: "Landing page : 1 sem. Site vitrine : 2-3 sem. Site corporate : 4-5 sem. App : 6-12 sem." },
    ],
  },
  "agence-web-rennes": {
    city: "Rennes", country: "France", region: "Bretagne", locale: "fr", slug: "agence-web-rennes",
    headline: "Cr�ation de site web � Rennes",
    subline: "Studio digital pour Rennes et la Bretagne � sites web, apps et solutions digitales pour startups, PME et ind�pendants.",
    intro: "KAH Digital accompagne les entreprises rennaises dans leur pr�sence digitale. Rennes est l'un des �cosyst�mes tech les plus actifs de l'ouest de la France. Notre studio cr�e des sites et applications pour startups, freelances, artisans et TPE de la r�gion.",
    sectors: ["Startups & tech", "Artisans & ind�pendants", "Restaurants & commerces", "Cabinets & professions lib�rales", "E-commerce", "Associations & ONG"],
    proofLine: "R�ponse en 24h � Devis personnalis� � Sans engagement",
    faq: [
      { q: "Cr�ez-vous des applications pour des startups rennaises ?", a: "Oui, MVP, portails SaaS, dashboards et int�grations API. Rennes est une ville tech et on l'accompagne." },
      { q: "Comment est d�fini le devis pour un projet local ?", a: "Chaque projet est cadr� selon le besoin r�el, les fonctionnalit�s, les d�lais et vos priorit�s. Le devis personnalis� est fourni apr�s un court �change, sans engagement." },
      { q: "Pouvez-vous cr�er un site e-commerce pour un artisan breton ?", a: "Oui, boutique en ligne, paiement s�curis�, gestion de commandes. On aime les projets d'artisans." },
    ],
  },
  "agence-web-zurich": {
    city: "Zurich", country: "Suisse", region: "Zurich", locale: "fr", slug: "agence-web-zurich",
    headline: "Cr�ation de site web � Zurich",
    subline: "Studio digital suisse multilingue DE/FR/EN � Next.js 15, Lighthouse 95+. D�s CHF 149, 5 jours. Prix fixe garanti.",
    intro: "KAH Digital accompagne les entreprises de Zurich dans leur pr�sence digitale. Zurich est la capitale �conomique suisse : banques, cabinets d'avocats, startups fintech, PME industrielles � notre studio cr�e des sites professionnels multilingues (DE/FR/EN) adapt�s au march� zurichois. Starter d�s CHF 149 � Business d�s CHF 790 � Syst�me IA d�s CHF 1'690. Devis gratuit en 24h.",
    sectors: ["Finance & banques", "Cabinets d'avocats & fiduciaires", "Startups fintech & crypto", "H�tels & restauration", "PME Suisse al�manique", "Professions lib�rales"],
    proofLine: "Studio Suisse � Multilingue DE/FR/EN � Prix fixe CHF 149 � R�ponse 24h",
    faq: [
      { q: "Combien co�te un site web professionnel � Zurich ?", a: "Starter (landing page) d�s CHF 149, livr� en 5 jours. Business (6 pages, SEO multilingue) d�s CHF 790. Syst�me IA complet d�s CHF 1'690. Prix fixe confirm� avant tout d�marrage." },
      { q: "Faites-vous des sites en allemand pour des entreprises zurichoises ?", a: "Oui, sites natifs en allemand, fran�ais et anglais. SEO optimis� dans chaque langue. Id�al pour les entreprises qui ciblent la Suisse al�manique et internationale." },
      { q: "Travaillez-vous avec des startups fintech zurichoises ?", a: "Oui, portails client, dashboards, landing pages et MVPs. On conna�t les exigences du march� financier suisse et les standards LPD." },
      { q: "Acceptez-vous le paiement en CHF et TWINT ?", a: "Oui � virement bancaire CHF, TWINT et carte bancaire accept�s. Facturation depuis notre si�ge � Lausanne, en CHF." },
    ],
  },
  "agence-web-basel": {
    city: "Basel", country: "Suisse", region: "B�le", locale: "fr", slug: "agence-web-basel",
    headline: "Cr�ation de site web � B�le",
    subline: "Studio digital suisse trilingue FR/DE/EN � Next.js 15, Lighthouse 95+. D�s CHF 149, 5 jours. Prix fixe garanti.",
    intro: "KAH Digital cr�e des sites web pour les entreprises b�loises. B�le est un carrefour international unique : industrie pharmaceutique, foires internationales, culture et banques. Notre studio propose des sites multilingues adapt�s aux entreprises qui op�rent en France, Allemagne et Suisse. Starter d�s CHF 149 � Business d�s CHF 790 � Syst�me IA d�s CHF 1'690.",
    sectors: ["Pharma & life sciences", "Industrie & manufacturing", "Culture & art Basel", "PME transfrontali�res CH/DE/FR", "Cabinets & consultants", "Restaurants & h�tels"],
    proofLine: "Studio Suisse � Trilingue FR/DE/EN � Prix fixe CHF 149 � R�ponse 24h",
    faq: [
      { q: "Combien co�te un site web professionnel � B�le ?", a: "Starter (landing page trilingue) d�s CHF 149, livr� en 5 jours. Business (6 pages, SEO dans 3 langues) d�s CHF 790. Syst�me IA complet d�s CHF 1'690. Prix fixe, z�ro surprise." },
      { q: "Faites-vous des sites trilingues pour les entreprises b�loises ?", a: "Oui, sites natifs en FR, DE, EN avec SEO dans chaque langue et hreflang correct. Id�al pour le march� rh�nan et les foires internationales." },
      { q: "Avez-vous travaill� avec des entreprises du secteur pharma ?", a: "Oui, sites institutionnels, portails partenaires et intranets. Nous respectons les exigences LPD et les standards de conformit� du secteur." },
      { q: "Acceptez-vous le paiement en CHF et TWINT ?", a: "Oui � virement bancaire CHF, TWINT et carte bancaire accept�s. Facturation en CHF depuis Lausanne." },
    ],
  },
  "agence-web-lausanne": {
    city: "Lausanne", country: "Suisse", region: "Vaud", locale: "fr", slug: "agence-web-lausanne",
    headline: "Agence web à Lausanne",
    subline: "Studio digital basé à Lausanne — Next.js 15, Lighthouse 95+, SEO local Vaud. Dès CHF 149, livré en 5 jours. Prix fixe garanti.",
    intro: "KAH Digital est votre agence web à Lausanne. Nous créons des sites web haute-performance pour les PME, indépendants, startups et professions libérales vaudoises. Basés au cœur de Lausanne, nous combinons design premium, SEO technique et intégration IA pour donner à votre entreprise une présence digitale qui génère de vrais clients. Starter dès CHF 149 — Business dès CHF 790 — Système IA dès CHF 1'690. Devis gratuit sous 24h.",
    sectors: ["Avocats & fiduciaires vaudois", "Restaurants & hôtels lausannois", "Coachs & thérapeutes", "Startups EPFL & Scale-up", "PME & artisans du Vaud", "Médecins & professions de santé"],
    proofLine: "Agence basée à Lausanne · Réponse 24h · Prix fixe CHF 149 · Sans engagement",
    faq: [
      { q: "Combien coûte une agence web à Lausanne ?", a: "Starter (landing page) dès CHF 149, livré en 5 jours. Business (6 pages, SEO local Lausanne) dès CHF 790. Système IA complet dès CHF 1'690. Prix fixe garanti, zéro surprise — contrairement à beaucoup d'agences lausannoises qui facturent à l'heure." },
      { q: "Vous êtes vraiment une agence web basée à Lausanne ?", a: "Oui, KAH Digital est basé à Lausanne (Rue de Bourg 27, 1003 Lausanne). Vous pouvez nous rencontrer en personne pour votre projet ou travailler entièrement à distance — même qualité, même prix." },
      { q: "Faites-vous du SEO local pour Lausanne ?", a: "Oui — SEO technique complet, Google Business Profile, données structurées Schema.org, Core Web Vitals 95+, sitemap. Optimisé pour apparaître sur les recherches 'agence web Lausanne' et 'création site web Vaud'." },
      { q: "Quels délais pour un projet web à Lausanne ?", a: "Landing page : 5 jours. Site vitrine complet : 14 jours. Application ou système IA : 28 jours. Délais confirmés par écrit avant démarrage." },
    ],
  },
  "agence-web-geneve": {
    city: "Genève", country: "Suisse", region: "Genève", locale: "fr", slug: "agence-web-geneve",
    headline: "Agence web à Genève",
    subline: "Studio digital romand multilingue FR/EN/DE pour entreprises genevoises — Next.js 15, Lighthouse 95+. Dès CHF 149, prix fixe.",
    intro: "KAH Digital accompagne les entreprises genevoises dans leur transformation digitale. Cabinets d'avocats, ONG internationales, fiduciaires, hôtels de luxe, cliniques, startups — nous créons des sites web et applications multilingues (FR/EN/DE) adaptés aux exigences du marché genevois. Studio basé à Lausanne, à 45 minutes de Genève. Devis gratuit sous 24h, code source 100% à vous.",
    sectors: ["Cabinets d'avocats & notaires", "ONG & organisations internationales", "Fiduciaires & wealth management", "Hôtels & restauration de luxe", "Cliniques & médecins", "Startups Geneva Lake"],
    proofLine: "À 45 min de Genève · Multilingue FR/EN/DE · Prix fixe CHF 149 · Réponse 24h",
    faq: [
      { q: "Combien coûte une agence web à Genève ?", a: "Starter (landing page) dès CHF 149. Business (6 pages, SEO multilingue) dès CHF 790. Système IA dès CHF 1'690. Prix fixe confirmé avant démarrage. Beaucoup d'agences genevoises facturent 3x ce tarif pour un résultat équivalent." },
      { q: "Êtes-vous basés à Genève ?", a: "Notre studio est à Lausanne, à 45 min de Genève. Nous rencontrons nos clients genevois en personne si nécessaire, ou travaillons entièrement à distance. Même qualité, même prix." },
      { q: "Faites-vous des sites web multilingues pour entreprises genevoises ?", a: "Oui — français, anglais, allemand et plus. hreflang correct, URLs propres par langue, SEO optimisé dans chaque langue. Standard dès le plan Business. Idéal pour les organisations internationales de Genève." },
      { q: "Travaillez-vous avec des ONG et institutions internationales ?", a: "Oui, nous avons l'expérience des secteurs exigeants en conformité et pouvons adapter notre process à vos contraintes de procurement et validation interne." },
    ],
  },
  "agence-web-lugano": {
    city: "Lugano", country: "Suisse", region: "Tessin", locale: "fr", slug: "agence-web-lugano",
    headline: "Cr�ation de site web � Lugano",
    subline: "Studio digital suisse trilingue IT/FR/DE � Next.js 15, Lighthouse 95+. D�s CHF 149, 5 jours. Prix fixe garanti.",
    intro: "KAH Digital accompagne les entreprises de Lugano dans leur pr�sence digitale. Le Tessin est unique en Suisse : italien de c�ur, suisse d'esprit, tourn� vers l'Italie et le monde. Notre studio cr�e des sites multilingues adapt�s aux besoins des entreprises tessinoises : finance, tourisme, luxe, PME. Starter d�s CHF 149 � Business d�s CHF 790 � Devis gratuit en 24h.",
    sectors: ["Finance & wealth management", "Tourisme & h�tellerie luxe", "Luxe & mode", "PME tessinoises", "Restaurants & caf�s", "Professions lib�rales"],
    proofLine: "Studio Suisse � Trilingue IT/FR/DE � Prix fixe CHF 149 � R�ponse 24h",
    faq: [
      { q: "Combien co�te un site web professionnel � Lugano ?", a: "Starter (landing page) d�s CHF 149, livr� en 5 jours. Business (6 pages, SEO) d�s CHF 790. Syst�me IA complet d�s CHF 1'690. Prix fixe, devis confirm� avant de commencer." },
      { q: "Faites-vous des sites en italien pour des entreprises de Lugano ?", a: "Oui, sites natifs en italien, fran�ais, allemand et anglais. Le Tessin est notre march� naturel pour l'italien." },
      { q: "Cr�ez-vous des sites pour le secteur wealth management � Lugano ?", a: "Oui, sites institutionnels discrets, s�curis�s, conformes LPD et RGPD. Rigueur et �l�gance � les standards suisses." },
      { q: "Acceptez-vous le paiement en CHF et TWINT ?", a: "Oui � virement bancaire CHF, TWINT et carte bancaire accept�s. Facturation en CHF depuis Lausanne." },
    ],
  },
  "agence-web-grenoble": {
    city: "Grenoble", country: "France", region: "Auvergne-Rh�ne-Alpes", locale: "fr", slug: "agence-web-grenoble",
    headline: "Cr�ation de site web � Grenoble",
    subline: "Studio digital pour Grenoble et l'Is�re � sites web, apps et solutions digitales pour startups deeptech, PME et ind�pendants.",
    intro: "KAH Digital accompagne les entreprises grenobloises dans leur pr�sence digitale. Grenoble est l'une des villes les plus innovantes de France : nanotechnologies, ing�nierie, startups deeptech. Notre studio cr�e des sites web et applications qui refl�tent votre niveau d'expertise : clairs, rapides, bien r�f�renc�s.",
    sectors: ["Startups deeptech & ing�nierie", "PME industrielles & high-tech", "Professions de sant�", "Cabinets & consultants", "Restaurants & commerces", "Artisans & ind�pendants"],
    proofLine: "R�ponse en 24h � Devis personnalis� � Sans engagement",
    faq: [
      { q: "Cr�ez-vous des sites pour des startups tech � Grenoble ?", a: "Oui, landing pages, portails SaaS, dashboards et MVPs. On conna�t bien l'�cosyst�me grenoblois entre Bpifrance et les incubateurs." },
      { q: "Quels d�lais pour un site � Grenoble ?", a: "Landing page : 1 sem. Site vitrine : 2-3 sem. App sur mesure : 6-12 sem. selon scope." },
      { q: "Comment est d�fini le budget d'un projet local ?", a: "L'objectif est d'adapter la prestation � votre contexte, � vos priorit�s business et au budget disponible, sans formule rigide ni option inutile." },
    ],
  },
  "agence-web-rouen": {
    city: "Rouen", country: "France", region: "Normandie", locale: "fr", slug: "agence-web-rouen",
    headline: "Cr�ation de site web � Rouen",
    subline: "Studio digital pour Rouen et la Normandie � sites web professionnels pour PME, artisans et commerces normands.",
    intro: "KAH Digital cr�e des sites web professionnels pour les entreprises rouennaises. Rouen est une ville dynamique avec un tissu �conomique dense : PME, artisans, commerces, professions lib�rales. Notre studio propose un process simple : brief en ligne, devis sous 24h, livraison en 2 � 6 semaines.",
    sectors: ["PME normandes", "Commerces & boutiques", "Artisans & ind�pendants", "Cabinets & professions lib�rales", "Restaurants & h�tels", "E-commerce"],
    proofLine: "R�ponse en 24h � Devis personnalis� � Sans engagement",
    faq: [
      { q: "Travaillez-vous avec des PME rouennaises � distance ?", a: "Oui, tout le projet se g�re en ligne. Visioconf�rence pour le cadrage, livraison par email. Aucun d�placement n�cessaire." },
      { q: "Comment est d�fini le devis pour un projet local ?", a: "Chaque projet est cadr� selon le besoin r�el, les fonctionnalit�s, les d�lais et vos priorit�s. Le devis personnalis� est fourni apr�s un court �change, sans engagement." },
      { q: "Combien de temps pour un site vitrine � Rouen ?", a: "Un site vitrine standard : 2 � 3 semaines. Un site corporate : 4 � 5 semaines." },
    ],
  },
  "agence-web-aix-en-provence": {
    city: "Aix-en-Provence", country: "France", region: "PACA", locale: "fr", slug: "agence-web-aix-en-provence",
    headline: "Cr�ation de site web � Aix-en-Provence",
    subline: "Studio digital pour Aix-en-Provence et la r�gion PACA � sites web �l�gants pour cabinets, vignobles, boutiques et professions lib�rales.",
    intro: "KAH Digital accompagne les entreprises aixoises dans leur pr�sence digitale. Aix-en-Provence est une ville � fort pouvoir d'achat et une client�le exigeante : cabinets d'avocats, vignobles, boutiques premium, m�decins. Notre studio cr�e des sites web � la hauteur de votre r�putation.",
    sectors: ["Cabinets d'avocats & notaires", "Vignobles & domaines", "Boutiques & luxe", "M�decins & th�rapeutes", "Startups & tech", "Restaurants gastronomiques"],
    proofLine: "R�ponse en 24h � Devis personnalis� � Sans engagement",
    faq: [
      { q: "Faites-vous des sites pour des vignobles de la r�gion d'Aix ?", a: "Oui, sites domaines viticoles avec boutique en ligne, r�servation de d�gustations et galerie photo. Un secteur qu'on conna�t bien." },
      { q: "Comment est d�fini le devis pour un projet local ?", a: "Chaque projet est cadr� selon le besoin r�el, les fonctionnalit�s, les d�lais et vos priorit�s. Le devis personnalis� est fourni apr�s un court �change, sans engagement." },
      { q: "Travaillez-vous en anglais pour des clients internationaux � Aix ?", a: "Oui, sites bilingues FR/EN ou trilingues pour accueillir la client�le internationale." },
    ],
  },
  "agence-web-angers": {
    city: "Angers", country: "France", region: "Pays de la Loire", locale: "fr", slug: "agence-web-angers",
    headline: "Cr�ation de site web � Angers",
    subline: "Studio digital pour Angers et la Maine-et-Loire � sites web, apps et solutions digitales pour startups, PME et ind�pendants angevins.",
    intro: "KAH Digital accompagne les entreprises angevines dans leur pr�sence digitale. Angers est une ville �tudiante et entrepreneuriale : startups, artisans, vignobles du Val de Loire, professions lib�rales. Notre studio cr�e des sites efficaces avec un process clair et des devis personnalis�s.",
    sectors: ["Startups & tech", "Vignobles & domaines", "Artisans & ind�pendants", "Professions lib�rales", "Restaurants & commerces", "Associations & ONG"],
    proofLine: "R�ponse en 24h � Devis personnalis� � Sans engagement",
    faq: [
      { q: "Faites-vous des sites pour des domaines viticoles du Val de Loire ?", a: "Oui, sites vitrines, boutiques en ligne, r�servations de d�gustations. Le vignoble angevin nous est familier." },
      { q: "Comment est d�fini le devis pour un projet local ?", a: "Chaque projet est cadr� selon le besoin r�el, les fonctionnalit�s, les d�lais et vos priorit�s. Le devis personnalis� est fourni apr�s un court �change, sans engagement." },
      { q: "Travaillez-vous avec des startups angevines ?", a: "Oui, MVP, portails SaaS, dashboards. Angers a un �cosyst�me entrepreneurial dynamique." },
    ],
  },
  "agence-web-dijon": {
    city: "Dijon", country: "France", region: "Bourgogne-Franche-Comt�", locale: "fr", slug: "agence-web-dijon",
    headline: "Cr�ation de site web � Dijon",
    subline: "Studio digital pour Dijon et la Bourgogne � sites web professionnels pour vignobles, restaurants gastronomiques, PME et ind�pendants.",
    intro: "KAH Digital cr�e des sites web pour les entreprises dijonnaises. Dijon est la capitale de la gastronomie et des vins de Bourgogne. Notre studio comprend les besoins des domaines viticoles, restaurants �toil�s, cabinets d'avocats et PME locales. Sites �l�gants, rapides et bien r�f�renc�s.",
    sectors: ["Vignobles & domaines", "Restaurants gastronomiques", "Cabinets & professions lib�rales", "PME & artisans", "Tourisme & culture", "E-commerce"],
    proofLine: "R�ponse en 24h � Devis personnalis� � Sans engagement",
    faq: [
      { q: "Faites-vous des sites pour des domaines viticoles de Bourgogne ?", a: "Oui, sites vitrines, boutiques en ligne, r�servation de d�gustations. La Bourgogne viticole est un march� qu'on adore." },
      { q: "Comment est d�fini le devis pour un projet local ?", a: "Chaque projet est cadr� selon le besoin r�el, les fonctionnalit�s, les d�lais et vos priorit�s. Le devis personnalis� est fourni apr�s un court �change, sans engagement." },
      { q: "Cr�ez-vous des sites en anglais pour accueillir les touristes �notouristiques ?", a: "Oui, sites bilingues FR/EN ou trilingues pour cibler les clients internationaux de la Route des Grands Crus." },
    ],
  },
  "agence-web-caen": {
    city: "Caen", country: "France", region: "Normandie", locale: "fr", slug: "agence-web-caen",
    headline: "Cr�ation de site web � Caen",
    subline: "Studio digital pour Caen et le Calvados � sites web professionnels pour PME, artisans et ind�pendants normands.",
    intro: "KAH Digital cr�e des sites web pour les entreprises caennaises. Caen est une ville dynamique au c�ur de la Normandie : artisans, PME, commerces, professions lib�rales. Notre studio propose un process simple : Devis personnalis� sous 24h, livraison en 2 � 5 semaines, sans jargon.",
    sectors: ["PME normandes", "Artisans & ind�pendants", "Restaurants & commerces", "Professions lib�rales", "E-commerce", "Associations & culture"],
    proofLine: "R�ponse en 24h � Devis personnalis� � Sans engagement",
    faq: [
      { q: "Travaillez-vous avec des PME caennaises � distance ?", a: "Oui, tout le projet se g�re en visioconf�rence et email. Efficace, sans d�placement." },
      { q: "Comment est d�fini le devis pour un projet local ?", a: "Chaque projet est cadr� selon le besoin r�el, les fonctionnalit�s, les d�lais et vos priorit�s. Le devis personnalis� est fourni apr�s un court �change, sans engagement." },
      { q: "Combien de temps pour cr�er un site vitrine � Caen ?", a: "Un site vitrine : 2 � 3 semaines. Landing page : 5 � 10 jours. Application sur mesure : 6 � 12 semaines." },
    ],
  },
  "agence-web-clermont-ferrand": {
    city: "Clermont-Ferrand", country: "France", region: "Auvergne-Rh�ne-Alpes", locale: "fr", slug: "agence-web-clermont-ferrand",
    headline: "Cr�ation de site web � Clermont-Ferrand",
    subline: "Studio digital pour Clermont-Ferrand et l'Auvergne � sites web, apps et solutions digitales pour PME, startups et ind�pendants.",
    intro: "KAH Digital accompagne les entreprises clermontoise dans leur pr�sence digitale. Clermont-Ferrand est une ville industrielle et entrepreneuriale : Michelin, startups, PME agroalimentaires, professions lib�rales. Notre studio cr�e des sites web efficaces avec un process clair et des devis personnalis�s apr�s �change.",
    sectors: ["PME industrielles", "Startups & tech", "Agroalimentaire & terroir", "Artisans & ind�pendants", "Cabinets & professions lib�rales", "Restaurants & commerces"],
    proofLine: "R�ponse en 24h � Devis personnalis� � Sans engagement",
    faq: [
      { q: "Faites-vous des sites pour des PME industrielles � Clermont-Ferrand ?", a: "Oui, sites institutionnels, catalogues produits, portails B2B. On conna�t les besoins des entreprises industrielles." },
      { q: "Comment est d�fini le devis pour un projet local ?", a: "Chaque projet est cadr� selon le besoin r�el, les fonctionnalit�s, les d�lais et vos priorit�s. Le devis personnalis� est fourni apr�s un court �change, sans engagement." },
      { q: "Travaillez-vous avec des startups auvergnates ?", a: "Oui, MVP, landing pages, applications m�tier. L'�cosyst�me auvergnat est actif et en croissance." },
    ],
  },
  "agence-web-metz": {
    city: "Metz", country: "France", region: "Grand Est", locale: "fr", slug: "agence-web-metz",
    headline: "Cr�ation de site web � Metz",
    subline: "Studio digital pour Metz et le Grand Est � sites web, apps et solutions digitales pour PME, ind�pendants et entreprises transfrontali�res.",
    intro: "KAH Digital cr�e des sites web pour les entreprises messines. Metz est une ville strat�gique � la crois�e de la France, du Luxembourg et de l'Allemagne : PME industrielles, commerces, professions lib�rales, entreprises transfrontali�res. Sites web professionnels, multilingues si besoin, livr�s rapidement.",
    sectors: ["PME & industries", "Entreprises transfrontali�res FR/LU/DE", "Commerces & boutiques", "Cabinets & professions lib�rales", "Restaurants & h�tels", "Artisans & ind�pendants"],
    proofLine: "R�ponse en 24h � Devis personnalis� � Sans engagement",
    faq: [
      { q: "Faites-vous des sites bilingues pour des entreprises transfrontali�res � Metz ?", a: "Oui, sites FR/DE, FR/EN ou trilingues. Metz est � la crois�e des march�s europ�ens et nous comprenons ces enjeux." },
      { q: "Comment est d�fini le devis pour un projet local ?", a: "Chaque projet est cadr� selon le besoin r�el, les fonctionnalit�s, les d�lais et vos priorit�s. Le devis personnalis� est fourni apr�s un court �change, sans engagement." },
      { q: "Travaillez-vous avec des entreprises bas�es au Luxembourg proches de Metz ?", a: "Oui, notre studio travaille pour toute la Grande R�gion. Sites en fran�ais, allemand et anglais disponibles." },
    ],
  },
};

type Props = { data: CityPageData };

const SWISS_CITIES = ["Lausanne", "Gen�ve", "Fribourg", "Zurich", "B�le", "Berne", "Lugano"];
const SWISS_LINKS = [
  { label: "Site web Lausanne", href: "/site-web-lausanne" },
  { label: "Site web Gen�ve", href: "/site-web-geneve" },
  { label: "Site web Fribourg", href: "/site-web-fribourg" },
  { label: "Agence web Zurich", href: "/agence-web-zurich" },
  { label: "Agence web B�le", href: "/agence-web-basel" },
  { label: "Agence web Berne", href: "/agence-web-berne" },
  { label: "Agence web Lugano", href: "/agence-web-lugano" },
];

export function LocalSeoPageContent({ data }: Props) {
  const devisUrl = `/devis?city=${encodeURIComponent(data.city)}&ref=local-seo`;
  const isSwiss = SWISS_CITIES.includes(data.city);
  const WA_URL = isSwiss ? WA_URL_CH : WA_URL_FR;
  const currency = isSwiss ? "CHF" : "�";
  const priceStarter = isSwiss ? "CHF 149" : "149 �";
  const priceBusiness = isSwiss ? "CHF 790" : "790 �";
  const priceAI = isSwiss ? "CHF 1'690" : "1 690 �";

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "KAH Digital",
      "description": `Studio digital � cr�ation de sites web, applications et solutions IA � ${data.city}`,
      "url": `https://kah-digital.ch/${data.slug}`,
      "telephone": "+33759558414",
      "email": "contact@KAH Digital.ch",
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
              Studio bas� en Suisse � Places disponibles cette semaine
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
              WhatsApp � r�ponse 2h
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
              { value: "120+", label: "Sites livr�s" },
              { value: `d�s ${priceStarter}`, label: "Prix fixe garanti" },
              { value: "5 jours", label: "D�lai minimum" },
              { value: "24h", label: "R�ponse garantie" },
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
                { icon: "????", label: "Soci�t� domicili�e � Lausanne" },
                { icon: "??", label: "Facturation CHF � TWINT accept�" },
                { icon: "??", label: "Conforme LPD (loi suisse protection des donn�es)" },
                { icon: "??", label: "Devis en CHF � RC Vaud" },
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
            Secteurs accompagn�s � {data.city}
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
            Pourquoi KAH Digital � {data.city} ?
          </h2>
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              {
                icon: FiZap,
                title: "Livr� en 5 � 14 jours",
                body: "Starter en 5 jours. Business en 14 jours. Brief court, d�cisions rapides, z�ro aller-retour inutile. Pas 6 semaines.",
              },
              {
                icon: FiClock,
                title: "R�ponse en 24h garantie",
                body: "Premi�re r�ponse le jour ouvrable suivant. Acc�s direct au fondateur � pas de chef de projet interm�diaire, pas de d�lai.",
              },
              {
                icon: FiMapPin,
                title: `Prix fixe d�s ${priceStarter}`,
                body: `Devis fixe avant de commencer. Z�ro surprise, z�ro co�t cach�. ${currency === "CHF" ? "Studio bas� � Lausanne, � port�e de main." : "Studio suisse, tarifs comp�titifs."}`,
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
          <p className="mb-8 text-gray-500">Prix fixes et transparents. Z�ro abonnement, z�ro lock-in, 100% � vous � la livraison.</p>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "Starter", price: priceStarter, sub: `Landing page � 5 jours`, highlight: false },
              { label: "Business", price: priceBusiness, sub: `Jusqu'� 6 pages � SEO � 14 jours`, highlight: true },
              { label: "Premium IA", price: priceAI, sub: `Syst�me complet + IA � 28 jours`, highlight: false },
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
            Options disponibles : page suppl�mentaire, SEO avanc�, logo, chatbot IA, maintenance mensuelle.
          </p>
          {isSwiss && (
            <p className="mt-3 text-xs text-emerald-500/60">
              ?? Paiement accept� : virement bancaire CHF � TWINT � Carte bancaire (Stripe)
            </p>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-white/[0.06] bg-white/[0.015] py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="mb-8 text-center text-2xl font-extrabold tracking-tight text-white">Questions fr�quentes</h2>
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
              &ldquo;Depuis la refonte, je re�ois 3 � 4 demandes qualifi�es par semaine. ROI d�s le premier mois.&rdquo;
            </p>
            <p className="mt-2 text-xs text-gray-600">M.L. � Avocate, Lausanne</p>
          </div>
          <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-white">
            Votre projet � {data.city} � on en parle ?
          </h2>
          <p className="mb-8 text-gray-500">Devis gratuit � R�ponse sous 24h � Sans engagement</p>
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



