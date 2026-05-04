"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Reveal } from "@/components/reveal";
import { StickyTimelineIndicator } from "@/components/sticky-timeline-indicator";
import { useLocale } from "@/lib/locale";

type LexiqueTopic = {
  title: string;
  summary: string;
  bullets: string[];
};

const topicsFr: LexiqueTopic[] = [
  {
    title: "UX",
    summary: "Organisation de l'expérience utilisateur pour que chaque action soit logique et agréable.",
    bullets: [
      "Ateliers express pour cerner la cible, ses freins et ses besoins.",
      "Wireframes (maquettes simples) pour valider le contenu avant d'investir dans le design.",
      "Tests rapides : on vérifie que l'information clé est trouvée en moins de 10 secondes.",
    ],
  },
  {
    title: "UI",
    summary: "Interface visuelle : couleurs, typographies, composants et animations.",
    bullets: [
      "Design system réutilisable (boutons, tags, cartes) pour garder une cohérence premium.",
      "Respect strict de l'identité (logo, teintes, iconographie).",
      "Animations légères pour guider le regard sans ralentir la lecture.",
    ],
  },
  {
    title: "Hero",
    summary: "Le premier bloc en haut de la page : il résume l'offre et la promesse.",
    bullets: [
      "Titre principal + sous-titre + CTA visible.",
      "Visuel fort (image, vidéo ou mockup) pour poser l'ambiance.",
      "Doit expliquer l'essentiel en 5 à 10 secondes.",
    ],
  },
  {
    title: "CTA",
    summary: "Call-to-Action : bouton ou lien qui pousse à une action claire.",
    bullets: [
      "Exemples : Demander un devis, Prendre rendez-vous.",
      "Doit être visible et formulé avec un verbe d'action.",
      "Permet de mesurer les clics et la conversion.",
    ],
  },
  {
    title: "Wireframe",
    summary: "Maquette filaire simple pour organiser une page avant le design.",
    bullets: [
      "Structure des blocs et des parcours.",
      "Sans couleurs ni images finales.",
      "Valide le contenu rapidement.",
    ],
  },
  {
    title: "Figma",
    summary: "Outil de design collaboratif pour maquettes et prototypes.",
    bullets: [
      "Maquettes UI partagées avec l'équipe.",
      "Commentaires en temps réel.",
      "Prototype cliquable pour valider les écrans.",
    ],
  },
  {
    title: "Développement",
    summary: "Le code qui fait tourner le site : front (ce que l'on voit) et back (serveur).",
    bullets: [
      "Stack Next.js + React 19 pour des pages ultra rapides.",
      "APIs sécurisées pour connecter CRM, paiement, outils internes.",
      "Pipeline Vercel : chaque push déclenche un build, des tests, puis le déploiement.",
    ],
  },
  {
    title: "Site vitrine",
    summary: "Présenter l'entreprise, l'équipe et les offres en quelques scrolls.",
    bullets: [
      "Sections modulaires : hero, services, preuves, FAQ, CTA.",
      "Formulaire de devis relié à vos emails (ou CRM) pour ne rien perdre.",
      "Page cahier des charges téléchargeable pour cadrer les besoins.",
    ],
  },
  {
    title: "Landing page",
    summary: "Page unique dédiée à une campagne ou un lancement produit.",
    bullets: [
      "Structure courte : promesse, bénéfices, preuve sociale, appel à l'action.",
      "Tracking précis (Pixel Meta, GA4, LinkedIn) pour mesurer chaque lead.",
      "Livraison en quelques jours pour tester un concept ou une offre.",
    ],
  },
  {
    title: "Boutique en ligne",
    summary: "Interface de vente avec catalogue, panier et paiement sécurisé.",
    bullets: [
      "Stripe, Shopify Headless ou Commerce Layer selon le volume et les pays cibles.",
      "Emails automatisés (confirmation, relance panier, suivi colis).",
      "Tableau de bord ventes + marge pour piloter les stocks.",
    ],
  },
  {
    title: "SaaS",
    summary: "Logiciel accessible en ligne, souvent par abonnement.",
    bullets: [
      "Connexion via navigateur, sans installation locale.",
      "Mises à jour continues côté serveur.",
      "Facturation récurrente par utilisateur ou usage.",
    ],
  },
  {
    title: "Automatisation IA",
    summary: "Automatiser des tâches répétitives (emails, devis, support) avec des outils IA.",
    bullets: [
      "Workflows reliés à un CRM ou Google Sheets.",
      "Chatbots pour répondre aux demandes simples 24/7.",
      "Gain de temps immédiat pour une PME.",
    ],
  },
  {
    title: "Chatbot métier",
    summary: "Assistant conversationnel adapté à un secteur (SAV, RH, immobilier, formation).",
    bullets: [
      "Base de connaissances ou FAQ connectée.",
      "Réponses cohérentes avec le ton de la marque.",
      "Réduction des tickets et des appels répétitifs.",
    ],
  },
  {
    title: "Génération de leads IA",
    summary: "Prospection automatisée avec messages personnalisés et suivi CRM.",
    bullets: [
      "Séquences LinkedIn + email pour obtenir des RDV.",
      "Ciblage par secteur, taille d'entreprise, rôles.",
      "Reporting clair (taux d'ouverture, réponse, RDV).",
    ],
  },
  {
    title: "Produit digital IA",
    summary: "E-books, templates, prompts ou mini-formations produits plus vite grâce à l'IA.",
    bullets: [
      "Offre ciblée pour une niche claire.",
      "Vente en ligne via Stripe ou Gumroad.",
      "Revenus récurrents si le trafic est stable.",
    ],
  },
  {
    title: "Micro-SaaS IA",
    summary: "Petit logiciel très ciblé qui automatise une tâche unique.",
    bullets: [
      "MVP rapide pour tester la demande.",
      "Abonnement mensuel simple.",
      "Améliorations continues selon les retours.",
    ],
  },
  {
    title: "MVP",
    summary: "Version minimale d'un produit pour tester le marché.",
    bullets: [
      "Fonctionnalités essentielles uniquement.",
      "Test rapide avec de vrais utilisateurs.",
      "Permet d'itérer sans gros budget.",
    ],
  },
  {
    title: "Sprint",
    summary: "Période courte de travail avec objectifs clairs.",
    bullets: [
      "Souvent 1 à 2 semaines.",
      "Livrable précis à la fin.",
      "Points de suivi pour avancer vite.",
    ],
  },
  {
    title: "Dashboard",
    summary: "Tableau de bord qui résume les infos importantes.",
    bullets: [
      "KPIs et stats visibles en un coup d'oeil.",
      "Suivi temps réel si besoin.",
      "Actions rapides pour piloter l'activité.",
    ],
  },
  {
    title: "Onboarding",
    summary: "Parcours d'accueil pour guider un nouvel utilisateur.",
    bullets: [
      "Premiers écrans et messages utiles.",
      "Aide à activer le compte rapidement.",
      "Réduit la friction et les abandons.",
    ],
  },
  {
    title: "SEO",
    summary: "Optimisation pour que Google (et les autres moteurs) comprennent et classent le site.",
    bullets: [
      "Balises title, description et rubriquage clair (H1/H2).",
      "Temps de chargement < 1,5 s grâce à Next.js et Vercel.",
      "Plan du site, schema.org et contenus structurés pour répondre aux requêtes.",
    ],
  },
  {
    title: "Responsive",
    summary: "Un site qui s'adapte automatiquement aux mobiles, tablettes et grands écrans.",
    bullets: [
      "Tailwind CSS et tests multi-devices pour garder les CTA visibles partout.",
      "Grilles fluides et images optimisées pour ne pas exploser la data.",
      "Menus simplifiés sur mobile et interactions accessibles (tap, swipe).",
    ],
  },
  {
    title: "API & Webhooks",
    summary: "Connexions entre votre site et des services externes (CRM, paiement, newsletter).",
    bullets: [
      "Routes API Next.js pour centraliser les échanges sécurisés.",
      "Webhooks : un service (Stripe, Airtable...) envoie un signal dès qu'un événement arrive.",
      "Logs et clés secrètes stockées dans .env pour garder le contrôle.",
    ],
  },
  {
    title: "Stack",
    summary: "Ensemble des technologies utilisées pour un projet.",
    bullets: [
      "Exemples : Next.js, Supabase, Stripe.",
      "Impacte la vitesse, le budget et la maintenance.",
      "Choisie selon les besoins du projet.",
    ],
  },
  {
    title: "Roadmap",
    summary: "Plan des étapes et livrables dans le temps.",
    bullets: [
      "Donne une vision claire du projet.",
      "Fixe les priorités et les deadlines.",
      "Évite les retards et les oublis.",
    ],
  },
  {
    title: "Prototype",
    summary: "Version simple d'une page ou d'une app pour tester rapidement.",
    bullets: [
      "Permet de valider l'idée avant de produire.",
      "Peut être cliquable ou interactif.",
      "Moins coûteux qu'un développement complet.",
    ],
  },
  {
    title: "QA",
    summary: "Quality Assurance : phase de test avant mise en ligne.",
    bullets: [
      "Vérification des bugs et des erreurs.",
      "Tests sur mobile, tablette, desktop.",
      "Assure une expérience stable.",
    ],
  },
  {
    title: "CMS",
    summary: "Outil d'édition pour mettre à jour textes, études de cas ou blog sans coder.",
    bullets: [
      "Sanity, Storyblok ou Notion connectée selon l'équipe en place.",
      "Permissions par rôle pour publier en toute sécurité.",
      "Prévisualisation instantanée pour valider avant mise en ligne.",
    ],
  },
  {
    title: "CRM & Automation",
    summary: "Gestion des leads et automatisation des relances.",
    bullets: [
      "HubSpot, Pipedrive ou Notion CRM alimentes automatiquement par les formulaires.",
      "Scénarios d'emails (merci, relance, prise de rendez-vous).",
      "Suivi de la valeur pipeline pour prioriser les prospects chauds.",
    ],
  },
  {
    title: "Sécurité / SSL",
    summary: "Protection des données échangées entre l'utilisateur et le site.",
    bullets: [
      "Certificat SSL automatique sur Vercel : cadenas affiché dans le navigateur.",
      "Pare-feu applicatif et filtrage anti-bot pour les formulaires.",
      "Stockage chiffré des secrets (.env local puis Vercel Environment).",
    ],
  },
  {
    title: "Monitoring & Analytics",
    summary: "Contrôler la santé du site et comprendre ce que font les visiteurs.",
    bullets: [
      "Alertes Vercel (logs, erreurs 500, temps de réponse) + notifications email.",
      "Plausible ou GA4 pour suivre trafic, conversions, pages les plus consultées.",
      "Heatmaps (Hotjar) pour voir où les visiteurs bloquent.",
    ],
  },
  {
    title: "KYC",
    summary: "Know Your Customer : vérification d'identité des utilisateurs.",
    bullets: [
      "Utilisée pour les services finances ou sensibles.",
      "Vérifie documents et informations.",
      "Renforce la sécurité et la conformité.",
    ],
  },
  {
    title: "KPI",
    summary: "Indicateur clé de performance.",
    bullets: [
      "Exemples : taux de conversion, temps de lecture, leads.",
      "Mesure un objectif précis.",
      "Compare les évolutions dans le temps.",
    ],
  },
  {
    title: "React Native",
    summary: "Framework mobile (iOS + Android) basé sur React pour partager la majorité du code.",
    bullets: [
      "Une seule base de code pour deux apps compilées nativement.",
      "Accès aux capteurs (caméra, GPS, Bluetooth) via des modules Expo ou community.",
      "Idéal pour lancer un MVP rapidement puis itérer sans recoder deux fois.",
    ],
  },
  {
    title: "PWA",
    summary: "Site web qui se comporte comme une app.",
    bullets: [
      "Installable sur mobile comme une application.",
      "Peut fonctionner partiellement hors-ligne.",
      "Chargement rapide et fluide.",
    ],
  },
  {
    title: "Expo",
    summary: "Toolchain qui simplifie le développement React Native (builds cloud, OTA, accès API natives).",
    bullets: [
      "Expo Go pour prévisualiser instantanément l'app sur iPhone/Android.",
      "Packaging TestFlight / Android Beta en quelques commandes.",
      "Mises à jour OTA : pousser un fix sans attendre la validation des stores.",
    ],
  },
  {
    title: "Supabase",
    summary: "Base Postgres + Auth + Storage prête à brancher sur un MVP web/mobile.",
    bullets: [
      "Auth sécurisée (OTP, Magic Link, OAuth) et règles row level pour gérer les rôles.",
      "API REST et GraphQL générées automatiquement à partir de tes tables.",
      "Dashboard clair + logs temps réel pour suivre les requêtes et webhooks.",
    ],
  },
  {
    title: "OAuth",
    summary: "Méthode de connexion via un service tiers (Google, Apple...).",
    bullets: [
      "L'utilisateur se connecte avec un compte existant.",
      "Aucun mot de passe partagé avec l'app.",
      "Accès sécurisé par jetons.",
    ],
  },
  {
    title: "SSO",
    summary: "Single Sign-On : un seul login pour plusieurs outils.",
    bullets: [
      "Un compte pour plusieurs applications.",
      "Moins de mots de passe à retenir.",
      "Gestion centralisée des accès.",
    ],
  },
  {
    title: "TestFlight & Android Beta",
    summary: "Canaux Apple/Google pour distribuer ton app en test privé avant la release publique.",
    bullets: [
      "Inviter des testeurs avec un simple lien et contrôler les builds.",
      "Android Internal / Closed testing pour récolter des feedbacks en sécurité.",
      "Étape indispensable pour vérifier performances, crashs et conformité store.",
    ],
  },
];

const topicsEn: LexiqueTopic[] = [
  {
    title: "UX",
    summary: "How the user experience is organized so every action feels logical and pleasant.",
    bullets: [
      "Fast workshops to understand the audience, frictions, and needs.",
      "Wireframes (simple mockups) to validate content before investing in design.",
      "Quick tests: we check key info is found in under 10 seconds.",
    ],
  },
  {
    title: "UI",
    summary: "Visual interface: colors, typography, components, and animation.",
    bullets: [
      "Reusable design system (buttons, tags, cards) to keep a premium feel.",
      "Strict alignment with the brand identity (logo, colors, iconography).",
      "Light animations to guide the eye without slowing the read.",
    ],
  },
  {
    title: "Hero",
    summary: "The first block at the top of the page: it summarizes the offer and the promise.",
    bullets: [
      "Main headline + subheadline + visible CTA.",
      "Strong visual (image, video, or mockup) to set the tone.",
      "Must explain the essentials in 5 to 10 seconds.",
    ],
  },
  {
    title: "CTA",
    summary: "Call-to-Action: a button or link that drives a clear action.",
    bullets: [
      "Examples: Request a quote, Book a call.",
      "Must be visible and phrased with an action verb.",
      "Helps track clicks and conversion.",
    ],
  },
  {
    title: "Wireframe",
    summary: "Simple layout mockup to organize a page before design.",
    bullets: [
      "Defines structure and user flow.",
      "No final colors or images.",
      "Validates content quickly.",
    ],
  },
  {
    title: "Figma",
    summary: "Collaborative design tool for mockups and prototypes.",
    bullets: [
      "Shared UI mockups for the team.",
      "Real-time comments.",
      "Clickable prototype to validate screens.",
    ],
  },
  {
    title: "Development",
    summary: "The code that runs the site: front (what you see) and back (server).",
    bullets: [
      "Next.js + React 19 stack for ultra fast pages.",
      "Secure APIs to connect CRM, payments, and internal tools.",
      "Vercel pipeline: each push triggers build, tests, then deployment.",
    ],
  },
  {
    title: "Showcase website",
    summary: "Present the company, team, and offers in a few scrolls.",
    bullets: [
      "Modular sections: hero, services, proof, FAQ, CTA.",
      "Quote form connected to your email (or CRM) so nothing is missed.",
      "Downloadable project brief to frame the needs.",
    ],
  },
  {
    title: "Landing page",
    summary: "Single page dedicated to a campaign or product launch.",
    bullets: [
      "Short structure: promise, benefits, social proof, call to action.",
      "Precise tracking (Meta Pixel, GA4, LinkedIn) to measure each lead.",
      "Delivered in a few days to test a concept or an offer.",
    ],
  },
  {
    title: "Online store",
    summary: "Sales interface with catalog, cart, and secure payment.",
    bullets: [
      "Stripe, Shopify Headless, or Commerce Layer based on volume and markets.",
      "Automated emails (confirmation, cart recovery, shipping updates).",
      "Sales dashboard with margin to manage stock.",
    ],
  },
  {
    title: "SaaS",
    summary: "Software delivered online, often with a subscription.",
    bullets: [
      "Access through a browser, no local install.",
      "Continuous updates on the server side.",
      "Recurring billing per user or usage.",
    ],
  },
  {
    title: "AI automation",
    summary: "Automate repetitive tasks (emails, quotes, support) with AI tools.",
    bullets: [
      "Workflows connected to a CRM or Google Sheets.",
      "Chatbots for simple requests 24/7.",
      "Immediate time savings for SMBs.",
    ],
  },
  {
    title: "Industry chatbot",
    summary: "Conversational assistant tailored to a sector (support, HR, real estate, training).",
    bullets: [
      "Knowledge base or FAQ connected to the bot.",
      "Answers aligned with the brand tone.",
      "Fewer tickets and repetitive calls.",
    ],
  },
  {
    title: "AI lead generation",
    summary: "Automated outreach with personalized messages and CRM tracking.",
    bullets: [
      "LinkedIn + email sequences to book calls.",
      "Targeting by industry, company size, and roles.",
      "Clear reporting (open rate, replies, booked calls).",
    ],
  },
  {
    title: "AI digital product",
    summary: "Ebooks, templates, prompts, or mini-courses produced faster with AI.",
    bullets: [
      "A focused offer for a clear niche.",
      "Online sales via Stripe or Gumroad.",
      "Recurring income if traffic is stable.",
    ],
  },
  {
    title: "AI micro-SaaS",
    summary: "Small, focused software that automates one task.",
    bullets: [
      "Fast MVP to test demand.",
      "Simple monthly subscription.",
      "Iterate with real user feedback.",
    ],
  },
  {
    title: "MVP",
    summary: "Minimum viable product to test the market.",
    bullets: [
      "Only essential features.",
      "Quick test with real users.",
      "Iterate without a big budget.",
    ],
  },
  {
    title: "Sprint",
    summary: "Short work period with clear goals.",
    bullets: [
      "Usually 1 to 2 weeks.",
      "Specific deliverable at the end.",
      "Check-ins to move fast.",
    ],
  },
  {
    title: "Dashboard",
    summary: "Control panel that summarizes key information.",
    bullets: [
      "KPIs and stats visible at a glance.",
      "Real-time tracking if needed.",
      "Quick actions to manage activity.",
    ],
  },
  {
    title: "Onboarding",
    summary: "Welcome flow that guides a new user.",
    bullets: [
      "First screens and helpful messages.",
      "Helps activate the account quickly.",
      "Reduces friction and drop-offs.",
    ],
  },
  {
    title: "SEO",
    summary: "Optimization so Google (and other engines) understand and rank the site.",
    bullets: [
      "Title tags, descriptions, and clear structure (H1/H2).",
      "Load time under 1.5s thanks to Next.js and Vercel.",
      "Sitemap, schema.org, and structured content to answer queries.",
    ],
  },
  {
    title: "Responsive",
    summary: "A site that adapts automatically to mobile, tablet, and large screens.",
    bullets: [
      "Tailwind CSS and multi-device testing to keep CTAs visible everywhere.",
      "Fluid grids and optimized images to avoid heavy data usage.",
      "Simplified mobile menus and accessible interactions (tap, swipe).",
    ],
  },
  {
    title: "API & Webhooks",
    summary: "Connections between your site and external services (CRM, payment, newsletter).",
    bullets: [
      "Next.js API routes to centralize secure exchanges.",
      "Webhooks: a service (Stripe, Airtable...) sends a signal when an event happens.",
      "Logs and secret keys stored in .env to keep control.",
    ],
  },
  {
    title: "Stack",
    summary: "Set of technologies used for a project.",
    bullets: [
      "Examples: Next.js, Supabase, Stripe.",
      "Impacts speed, budget, and maintenance.",
      "Chosen based on project needs.",
    ],
  },
  {
    title: "Roadmap",
    summary: "Plan of milestones and deliverables over time.",
    bullets: [
      "Gives a clear project vision.",
      "Sets priorities and deadlines.",
      "Avoids delays and missing tasks.",
    ],
  },
  {
    title: "Prototype",
    summary: "Simple version of a page or app to test quickly.",
    bullets: [
      "Validates the idea before production.",
      "Can be clickable or interactive.",
      "Cheaper than full development.",
    ],
  },
  {
    title: "QA",
    summary: "Quality Assurance: testing phase before launch.",
    bullets: [
      "Checks bugs and errors.",
      "Tests on mobile, tablet, desktop.",
      "Ensures a stable experience.",
    ],
  },
  {
    title: "CMS",
    summary: "Editing tool to update copy, case studies, or blog without coding.",
    bullets: [
      "Sanity, Storyblok, or Notion connected depending on your team.",
      "Role-based permissions to publish safely.",
      "Instant preview to validate before going live.",
    ],
  },
  {
    title: "CRM & Automation",
    summary: "Lead management and automated follow-ups.",
    bullets: [
      "HubSpot, Pipedrive, or Notion CRM fed automatically by forms.",
      "Email scenarios (thank you, follow-up, meeting scheduling).",
      "Pipeline value tracking to prioritize hot prospects.",
    ],
  },
  {
    title: "Security / SSL",
    summary: "Protection of data exchanged between the user and the site.",
    bullets: [
      "Automatic SSL certificate on Vercel: lock icon in the browser.",
      "Application firewall and anti-bot filtering for forms.",
      "Encrypted storage of secrets (.env local then Vercel Environment).",
    ],
  },
  {
    title: "Monitoring & Analytics",
    summary: "Monitor site health and understand what visitors do.",
    bullets: [
      "Vercel alerts (logs, 500 errors, response time) + email notifications.",
      "Plausible or GA4 to track traffic, conversions, top pages.",
      "Heatmaps (Hotjar) to see where visitors hesitate.",
    ],
  },
  {
    title: "KYC",
    summary: "Know Your Customer: user identity verification.",
    bullets: [
      "Used for financial or sensitive services.",
      "Verifies documents and information.",
      "Improves security and compliance.",
    ],
  },
  {
    title: "KPI",
    summary: "Key performance indicator.",
    bullets: [
      "Examples: conversion rate, read time, leads.",
      "Measures a specific goal.",
      "Tracks change over time.",
    ],
  },
  {
    title: "React Native",
    summary: "Mobile framework (iOS + Android) built on React to share most code.",
    bullets: [
      "One codebase for two apps compiled natively.",
      "Access to sensors (camera, GPS, Bluetooth) via Expo or community modules.",
      "Ideal to launch an MVP fast and iterate without rebuilding twice.",
    ],
  },
  {
    title: "PWA",
    summary: "A website that behaves like an app.",
    bullets: [
      "Installable on mobile like an application.",
      "Can work partially offline.",
      "Fast and smooth loading.",
    ],
  },
  {
    title: "Expo",
    summary: "Toolchain that simplifies React Native development (cloud builds, OTA, native APIs).",
    bullets: [
      "Expo Go to preview the app instantly on iPhone/Android.",
      "TestFlight / Android Beta packaging in a few commands.",
      "OTA updates: push a fix without waiting for store approval.",
    ],
  },
  {
    title: "Supabase",
    summary: "Postgres + Auth + Storage backend ready for a web or mobile MVP.",
    bullets: [
      "Secure auth (OTP, Magic Link, OAuth) and row-level rules to manage roles.",
      "REST and GraphQL APIs generated automatically from your tables.",
      "Clear dashboard + real-time logs to follow queries and webhooks.",
    ],
  },
  {
    title: "OAuth",
    summary: "Login method using a third-party service (Google, Apple...).",
    bullets: [
      "User signs in with an existing account.",
      "No password shared with the app.",
      "Secure access via tokens.",
    ],
  },
  {
    title: "SSO",
    summary: "Single Sign-On: one login for multiple tools.",
    bullets: [
      "One account across several apps.",
      "Fewer passwords to remember.",
      "Centralized access management.",
    ],
  },
  {
    title: "TestFlight & Android Beta",
    summary: "Apple/Google channels to distribute your app in private test before public release.",
    bullets: [
      "Invite testers with a simple link and control builds.",
      "Android Internal / Closed testing to collect feedback safely.",
      "Key step to validate performance, crashes, and store compliance.",
    ],
  },
];

const topicsDe: LexiqueTopic[] = [
  {
    title: "UX",
    summary: "Wie die Nutzererfahrung organisiert wird, damit jede Aktion logisch und angenehm wirkt.",
    bullets: [
      "Schnelle Workshops, um Zielgruppe, Reibungen und Beduerfnisse zu verstehen.",
      "Wireframes, um Inhalte zu validieren, bevor in Design investiert wird.",
      "Kurze Tests, damit Schluesselinformationen in weniger als 10 Sekunden gefunden werden.",
    ],
  },
  {
    title: "UI",
    summary: "Visuelle Oberflaeche: Farben, Typografie, Komponenten und Animationen.",
    bullets: [
      "Wiederverwendbares Designsystem, damit das Produkt konsistent und premium bleibt.",
      "Saubere Ausrichtung auf Logo, Farben und Ikonografie der Marke.",
      "Leichte Animationen, die den Blick fuehren ohne die Lesbarkeit zu bremsen.",
    ],
  },
  {
    title: "Hero",
    summary: "Der erste Block oben auf der Seite, der Angebot und Versprechen zusammenfasst.",
    bullets: [
      "Haupttitel, Untertitel und klar sichtbarer CTA.",
      "Starkes Visual, um den Ton der Seite sofort zu setzen.",
      "Muss das Wesentliche in 5 bis 10 Sekunden erklaeren.",
    ],
  },
  {
    title: "CTA",
    summary: "Call-to-Action: ein Button oder Link, der zu einer klaren Aktion fuehrt.",
    bullets: [
      "Beispiele: Anfrage senden, Termin buchen.",
      "Muss sichtbar sein und mit einem Aktionsverb formuliert werden.",
      "Hilft, Klicks und Conversion sauber zu messen.",
    ],
  },
  {
    title: "Wireframe",
    summary: "Einfache Struktur-Skizze, um eine Seite vor dem Design zu organisieren.",
    bullets: [
      "Definiert Aufbau und Nutzerfluss.",
      "Noch ohne finale Farben oder Bilder.",
      "Hilft, Inhalte schnell zu validieren.",
    ],
  },
  {
    title: "Figma",
    summary: "Kollaboratives Design-Tool für Mockups und Prototypen.",
    bullets: [
      "Geteilte UI-Mockups für das Team.",
      "Kommentare in Echtzeit.",
      "Klickbarer Prototyp zur Validierung von Screens.",
    ],
  },
  {
    title: "Development",
    summary: "Der Code, der die Website antreibt: Frontend für das Sichtbare und Backend für den Server.",
    bullets: [
      "Next.js + React 19 für sehr schnelle Seiten.",
      "Sichere APIs für CRM, Zahlungen und interne Tools.",
      "Vercel-Pipeline: Jeder Push startet Build, Tests und Deployment.",
    ],
  },
  {
    title: "Showcase website",
    summary: "Unternehmen, Team und Angebote in wenigen Scrolls klar praesentieren.",
    bullets: [
      "Modulare Sektionen: Hero, Services, Proof, FAQ, CTA.",
      "Anfrageformular mit E-Mail oder CRM verbunden, damit nichts verloren geht.",
      "Downloadbares Projektbriefing, um den Bedarf zu strukturieren.",
    ],
  },
  {
    title: "Landing page",
    summary: "Einzelne Seite für eine Kampagne oder einen Produktlaunch.",
    bullets: [
      "Kurze Struktur: Versprechen, Nutzen, Social Proof, Call-to-Action.",
      "Präzises Tracking über Meta Pixel, GA4 oder LinkedIn.",
      "Schnelle Lieferung, um ein Angebot oder einen Test sauber zu validieren.",
    ],
  },
  {
    title: "Online store",
    summary: "Verkaufsoberfläche mit Katalog, Warenkorb und sicherer Zahlung.",
    bullets: [
      "Stripe, Shopify Headless oder Commerce Layer je nach Volumen und Markt.",
      "Automatisierte E-Mails für Bestätigung, Warenkorbabbruch und Versand.",
      "Sales-Dashboard mit Margenblick für die Steuerung.",
    ],
  },
  {
    title: "SaaS",
    summary: "Software, die online bereitgestellt wird und meist per Abo funktioniert.",
    bullets: [
      "Zugriff ueber den Browser ohne lokale Installation.",
      "Kontinuierliche Updates auf Serverseite.",
      "Wiederkehrende Abrechnung pro Nutzer oder Nutzung.",
    ],
  },
  {
    title: "AI automation",
    summary: "Wiederkehrende Aufgaben wie E-Mails, Angebote oder Support mit AI automatisieren.",
    bullets: [
      "Workflows mit CRM oder Google Sheets verbunden.",
      "Chatbots für einfache Anfragen rund um die Uhr.",
      "Sofortiger Zeitgewinn für kleine und mittlere Unternehmen.",
    ],
  },
  {
    title: "Industry chatbot",
    summary: "Konversationeller Assistent für eine konkrete Branche wie Support, HR, Immobilien oder Training.",
    bullets: [
      "Wissensbasis oder FAQ direkt mit dem Bot verbunden.",
      "Antworten im Ton der Marke.",
      "Weniger Tickets und weniger repetitive Anrufe.",
    ],
  },
  {
    title: "AI lead generation",
    summary: "Automatisierte Prospection mit personalisierten Nachrichten und CRM-Tracking.",
    bullets: [
      "LinkedIn- und E-Mail-Sequenzen, um Termine zu buchen.",
      "Targeting nach Branche, Unternehmensgröße und Rollen.",
      "Klares Reporting zu Öffnungen, Antworten und gebuchten Calls.",
    ],
  },
  {
    title: "AI digital product",
    summary: "E-Books, Templates, Prompts oder Mini-Kurse, die mit AI schneller produziert werden.",
    bullets: [
      "Fokussiertes Angebot für eine klare Nische.",
      "Online-Verkauf über Stripe oder Gumroad.",
      "Wiederkehrender Umsatz, wenn der Traffic stabil ist.",
    ],
  },
  {
    title: "AI micro-SaaS",
    summary: "Kleine fokussierte Software, die genau eine Aufgabe automatisiert.",
    bullets: [
      "Schnelles MVP, um Nachfrage zu testen.",
      "Einfaches Monatsabo.",
      "Iteration mit echtem Nutzerfeedback.",
    ],
  },
  {
    title: "MVP",
    summary: "Minimum viable product, um den Markt mit dem nötigen Kernumfang zu testen.",
    bullets: [
      "Nur die wirklich essenziellen Funktionen.",
      "Schneller Test mit realen Nutzern.",
      "Iteration ohne großes Startbudget.",
    ],
  },
  {
    title: "Sprint",
    summary: "Kurze Arbeitsphase mit klaren Zielen.",
    bullets: [
      "Meist 1 bis 2 Wochen.",
      "Klares Deliverable am Ende.",
      "Regelmäßige Check-ins für schnelles Vorankommen.",
    ],
  },
  {
    title: "Dashboard",
    summary: "Steuerungsoberfläche, die die wichtigsten Informationen zusammenfasst.",
    bullets: [
      "KPIs und Zahlen auf einen Blick.",
      "Wenn nötig mit Echtzeitdaten.",
      "Schnelle Aktionen für das operative Geschäft.",
    ],
  },
  {
    title: "Onboarding",
    summary: "Einstiegsfluss, der neue Nutzer beim Start führt.",
    bullets: [
      "Erste Screens und hilfreiche Nachrichten.",
      "Hilft, das Konto schnell zu aktivieren.",
      "Reduziert Reibung und Abbrueche.",
    ],
  },
  {
    title: "SEO",
    summary: "Optimierung, damit Google und andere Suchmaschinen die Seite verstehen und einordnen.",
    bullets: [
      "Saubere Titles, Descriptions und Struktur über H1 und H2.",
      "Ladezeit unter 1,5 Sekunden dank Next.js und Vercel.",
      "Sitemap, schema.org und strukturierte Inhalte für Suchanfragen.",
    ],
  },
  {
    title: "Responsive",
    summary: "Eine Seite, die sich automatisch an Mobile, Tablet und grosse Screens anpasst.",
    bullets: [
      "Tailwind CSS und Multi-Device-Tests für sichtbare CTAs auf jedem Gerät.",
      "Fluide Grids und optimierte Bilder gegen übermäßigen Datenverbrauch.",
      "Vereinfachte Mobile-Navigation und zugängliche Interaktionen.",
    ],
  },
  {
    title: "API & Webhooks",
    summary: "Verbindungen zwischen deiner Website und externen Diensten wie CRM, Zahlung oder Newsletter.",
    bullets: [
      "Next.js API-Routen für sichere zentrale Datenflüsse.",
      "Webhooks senden Signale, sobald bei Stripe, Airtable und Co. ein Ereignis eintritt.",
      "Logs und Secret Keys bleiben in `.env` unter Kontrolle.",
    ],
  },
  {
    title: "Stack",
    summary: "Die Kombination der Technologien, auf denen ein Projekt aufbaut.",
    bullets: [
      "Beispiele: Next.js, Supabase, Stripe.",
      "Beeinflusst Geschwindigkeit, Budget und Wartung.",
      "Wird passend zu den Anforderungen gewaehlt.",
    ],
  },
  {
    title: "Roadmap",
    summary: "Plan der Etappen und Deliverables ueber die Zeit.",
    bullets: [
      "Gibt eine klare Projektsicht.",
      "Setzt Prioritaeten und Deadlines.",
      "Vermeidet Verzoegerungen und Luecken.",
    ],
  },
  {
    title: "Prototype",
    summary: "Einfache Version einer Seite oder App, um schnell zu testen.",
    bullets: [
      "Validiert die Idee vor der Produktion.",
      "Kann klickbar oder interaktiv sein.",
      "Deutlich guenstiger als eine volle Entwicklung.",
    ],
  },
  {
    title: "QA",
    summary: "Quality Assurance: Testphase vor dem Launch.",
    bullets: [
      "Prueft Bugs und Fehler.",
      "Tests auf Mobile, Tablet und Desktop.",
      "Sichert eine stabile Erfahrung.",
    ],
  },
  {
    title: "CMS",
    summary: "Redaktionstool, um Inhalte, Cases oder Blog ohne Code zu pflegen.",
    bullets: [
      "Sanity, Storyblok oder Notion je nach Team und Arbeitsweise.",
      "Rollenbasierte Rechte für sicheres Publizieren.",
      "Sofortige Vorschau vor dem Go-live.",
    ],
  },
  {
    title: "CRM & Automation",
    summary: "Lead-Management und automatisierte Follow-ups.",
    bullets: [
      "HubSpot, Pipedrive oder Notion CRM werden automatisch aus Formularen gespeist.",
      "E-Mail-Szenarien für Danke, Follow-up oder Terminbuchung.",
      "Tracking des Pipeline-Werts für die Priorisierung heißer Leads.",
    ],
  },
  {
    title: "Security / SSL",
    summary: "Schutz der Daten, die zwischen Nutzer und Website ausgetauscht werden.",
    bullets: [
      "Automatisches SSL auf Vercel mit Schloss im Browser.",
      "Application Firewall und Anti-Bot-Filter für Formulare.",
      "Verschlüsselte Ablage von Secrets in `.env` und Vercel Environment.",
    ],
  },
  {
    title: "Monitoring & Analytics",
    summary: "Überwacht die Gesundheit der Seite und zeigt, was Besucher wirklich tun.",
    bullets: [
      "Vercel-Alerts für Logs, 500er-Fehler und Antwortzeiten.",
      "Plausible oder GA4 für Traffic, Conversions und Top-Seiten.",
      "Heatmaps wie Hotjar zeigen, wo Besucher zögern oder abbrechen.",
    ],
  },
  {
    title: "KYC",
    summary: "Know Your Customer: Identitätsprüfung von Nutzern.",
    bullets: [
      "Wird für Finanz- oder sensible Services eingesetzt.",
      "Prüft Dokumente und Informationen.",
      "Stärkt Sicherheit und Compliance.",
    ],
  },
  {
    title: "KPI",
    summary: "Key Performance Indicator.",
    bullets: [
      "Beispiele: Conversion Rate, Lesezeit oder Leads.",
      "Misst ein konkretes Ziel.",
      "Macht Entwicklungen über die Zeit sichtbar.",
    ],
  },
  {
    title: "React Native",
    summary: "Mobiles Framework auf React-Basis, um den Großteil des Codes zwischen iOS und Android zu teilen.",
    bullets: [
      "Eine Codebasis für zwei nativ kompilierte Apps.",
      "Zugriff auf Sensoren wie Kamera, GPS oder Bluetooth über Expo oder Community-Module.",
      "Ideal, um ein MVP schnell zu starten und danach weiterzuentwickeln.",
    ],
  },
  {
    title: "PWA",
    summary: "Eine Website, die sich wie eine App verhält.",
    bullets: [
      "Kann auf dem Smartphone wie eine App installiert werden.",
      "Funktioniert teilweise auch offline.",
      "Lädt schnell und wirkt flüssig.",
    ],
  },
  {
    title: "Expo",
    summary: "Toolchain, die React-Native-Entwicklung mit Cloud-Builds, OTA und nativen APIs vereinfacht.",
    bullets: [
      "Expo Go für sofortige Vorschau auf iPhone und Android.",
      "TestFlight- oder Android-Beta-Pakete in wenigen Befehlen.",
      "OTA-Updates für schnelle Fixes ohne Store-Wartezeit.",
    ],
  },
  {
    title: "Supabase",
    summary: "Postgres-, Auth- und Storage-Backend, das sich schnell an ein Web- oder Mobile-MVP anschließen lässt.",
    bullets: [
      "Sichere Auth mit OTP, Magic Link oder OAuth sowie Row-Level-Rules für Rollen.",
      "REST- und GraphQL-APIs werden automatisch aus den Tabellen erzeugt.",
      "Klares Dashboard und Realtime-Logs für Queries und Webhooks.",
    ],
  },
  {
    title: "OAuth",
    summary: "Login-Methode über einen Drittanbieter wie Google oder Apple.",
    bullets: [
      "Nutzer melden sich mit einem vorhandenen Konto an.",
      "Kein Passwort wird mit der App geteilt.",
      "Sicherer Zugriff ueber Tokens.",
    ],
  },
  {
    title: "SSO",
    summary: "Single Sign-On: ein Login für mehrere Tools.",
    bullets: [
      "Ein Konto für mehrere Anwendungen.",
      "Weniger Passwörter zum Merken.",
      "Zentrale Verwaltung der Zugänge.",
    ],
  },
  {
    title: "TestFlight & Android Beta",
    summary: "Apple- und Google-Kanäle, um Apps vor dem Public Release privat zu testen.",
    bullets: [
      "Tester können über einen einfachen Link eingeladen werden.",
      "Android Internal oder Closed Testing sammelt Feedback in sicherem Rahmen.",
      "Wichtiger Schritt, um Performance, Crashs und Store-Konformität zu prüfen.",
    ],
  },
];

const categoriesFr = [
  { label: "UX / UI", keywords: ["UX", "UI", "Hero", "CTA", "Wireframe", "Figma", "Responsive"] },
  {
    label: "Delivery",
    keywords: [
      "Developpement",
      "Site vitrine",
      "Landing page",
      "Boutique en ligne",
      "SaaS",
      "MVP",
      "Sprint",
      "Dashboard",
      "Onboarding",
      "Roadmap",
      "Prototype",
      "QA",
    ],
  },
  {
    label: "Tech / Stack",
    keywords: [
      "SEO",
      "API & Webhooks",
      "Stack",
      "CMS",
      "CRM & Automation",
      "Automatisation IA",
      "Chatbot metier",
      "Generation de leads IA",
      "Produit digital IA",
      "Micro-SaaS IA",
      "Securite / SSL",
      "Monitoring & Analytics",
      "KYC",
      "KPI",
      "OAuth",
      "SSO",
    ],
  },
  { label: "Mobile", keywords: ["React Native", "PWA", "Expo", "Supabase", "TestFlight & Android Beta"] },
];

const categoriesEn = [
  { label: "UX / UI", keywords: ["UX", "UI", "Hero", "CTA", "Wireframe", "Figma", "Responsive"] },
  {
    label: "Delivery",
    keywords: [
      "Development",
      "Showcase website",
      "Landing page",
      "Online store",
      "SaaS",
      "MVP",
      "Sprint",
      "Dashboard",
      "Onboarding",
      "Roadmap",
      "Prototype",
      "QA",
    ],
  },
  {
    label: "Tech / Stack",
    keywords: [
      "SEO",
      "API & Webhooks",
      "Stack",
      "CMS",
      "CRM & Automation",
      "AI automation",
      "Industry chatbot",
      "AI lead generation",
      "AI digital product",
      "AI micro-SaaS",
      "Security / SSL",
      "Monitoring & Analytics",
      "KYC",
      "KPI",
      "OAuth",
      "SSO",
    ],
  },
  { label: "Mobile", keywords: ["React Native", "PWA", "Expo", "Supabase", "TestFlight & Android Beta"] },
];

const lexiqueSectionsFr = [
  { id: "lexique-hero", label: "Introduction" },
  { id: "lexique-filtres", label: "Filtres & recherche" },
  { id: "lexique-terms", label: "Entrees du lexique" },
] as const;

const lexiqueSectionsEn = [
  { id: "lexique-hero", label: "Intro" },
  { id: "lexique-filtres", label: "Filters & search" },
  { id: "lexique-terms", label: "Glossary entries" },
] as const;

const categoriesDe = [
  { label: "UX / UI", keywords: ["UX", "UI", "Hero", "CTA", "Wireframe", "Figma", "Responsive"] },
  {
    label: "Delivery",
    keywords: [
      "Development",
      "Showcase website",
      "Landing page",
      "Online store",
      "SaaS",
      "MVP",
      "Sprint",
      "Dashboard",
      "Onboarding",
      "Roadmap",
      "Prototype",
      "QA",
    ],
  },
  {
    label: "Tech / Stack",
    keywords: [
      "SEO",
      "API & Webhooks",
      "Stack",
      "CMS",
      "CRM & Automation",
      "AI automation",
      "Industry chatbot",
      "AI lead generation",
      "AI digital product",
      "AI micro-SaaS",
      "Security / SSL",
      "Monitoring & Analytics",
      "KYC",
      "KPI",
      "OAuth",
      "SSO",
    ],
  },
  { label: "Mobile", keywords: ["React Native", "PWA", "Expo", "Supabase", "TestFlight & Android Beta"] },
];

const lexiqueSectionsDe = [
  { id: "lexique-hero", label: "Intro" },
  { id: "lexique-filtres", label: "Filter & Suche" },
  { id: "lexique-terms", label: "Begriffe" },
] as const;

export default function LexiquePage() {
  const { locale, prefix } = useLocale();
  const topics = locale === "en" ? topicsEn : topicsFr;
  const categoryData = locale === "en" ? categoriesEn : categoriesFr;
  const lexiqueSections = locale === "en" ? lexiqueSectionsEn : lexiqueSectionsFr;
  const textCopy =
    locale === "en"
      ? {
          heroKicker: "Glossary",
          heroTitle: "Understand the terms in 5 minutes",
          heroBody:
            "A simple page to align clients, sales, or freelancers. No jargon: just what you need to decide fast.",
          backHome: "Back to home",
          openConfigurator: "Open configurator",
          filterPlaceholder: "Search: SEO, API, responsive, React Native, Supabase...",
          noResults: "No term found. Try \"SEO\", \"CMS\", \"responsive\"...",
          nextStepsKicker: "Next steps",
          nextStepsTitle: "Ready to scope your sprint or MVP?",
          nextStepsBody:
            "We turn these definitions into actions: project brief sprint, guided configurator, and quick quote to kick off production.",
          nextStepsCta1: "Plan a sprint",
          nextStepsCta2: "Build your MVP",
          nextStepsCta3: "Download the pack",
        }
      : {
            heroKicker: "Lexique",
            heroTitle: "Comprendre les termes en 5 minutes",
            heroBody:
              "Une page simple pour aligner clients, commerciaux ou freelancers. Pas de jargon inutile : juste ce qu'il faut pour décider vite.",
            backHome: "Retour à l'accueil",
            openConfigurator: "Accéder au configurateur",
            filterPlaceholder: "Rechercher : SEO, API, responsive, React Native, Supabase...",
            noResults: "Aucun terme trouvé. Essaie \"SEO\", \"CMS\", \"responsive\"...",
            nextStepsKicker: "Prochaines étapes",
            nextStepsTitle: "Prêt à cadrer ton sprint ou ton MVP ?",
            nextStepsBody:
              "On transforme ces définitions en actions concrètes : sprint cahier des charges, configurateur guidant les modules et devis express pour enclencher la prod.",
            nextStepsCta1: "Planifier un sprint",
            nextStepsCta2: "Composer ton MVP",
            nextStepsCta3: "Télécharger le pack",
          };
  const homeHref = prefix || "/";
  const withPrefix = (path: string) => `${prefix}${path}`;
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const filteredTopics = useMemo(() => {
    let list = topics;
    if (activeCategory) {
      const cat = categoryData.find((item) => item.label === activeCategory);
      if (cat) list = list.filter((topic) => cat.keywords.includes(topic.title));
    }
    if (!query.trim()) return list;
    const lower = query.toLowerCase();
    return list.filter((topic) => {
      const haystack = [topic.title, topic.summary, ...topic.bullets].join(" ").toLowerCase();
      return haystack.includes(lower);
    });
  }, [query, activeCategory, topics, categoryData]);

  return (
    <div className="lg:flex lg:items-start lg:gap-10">
      <div className="flex-1 space-y-12">
        <section id="lexique-hero" className="section-shell space-y-8">
          <div className="flex flex-wrap gap-3 text-sm text-white/70">
            <Link
              href={homeHref}
              className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white"
            >
              {textCopy.backHome}
            </Link>
            <Link
              href={withPrefix("/configurateur")}
              className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white"
            >
              {textCopy.openConfigurator}
            </Link>
          </div>
          <Reveal>
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.3em] text-white/60">{textCopy.heroKicker}</p>
              <h1 className="text-4xl font-semibold text-white">{textCopy.heroTitle}</h1>
              <p className="text-white/70 max-w-3xl">{textCopy.heroBody}</p>
            </div>
          </Reveal>
        </section>

        <section id="lexique-filtres" className="section-shell space-y-6">
          <Reveal>
            <div className="space-y-4 text-slate-900">
              <div className="flex flex-wrap gap-3">
                {categoryData.map((cat) => (
                  <button
                    key={cat.label}
                    type="button"
                    onClick={() => setActiveCategory((prev) => (prev === cat.label ? null : cat.label))}
                    className={`rounded-full border px-4 py-2 text-sm transition ${
                      activeCategory === cat.label
                        ? "border-slate-900 bg-white text-slate-900"
                        : "border-slate-300 bg-white/60 text-slate-600 hover:border-slate-900/40"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
              <div className="light-outline p-4">
                <input
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={textCopy.filterPlaceholder}
                  className="w-full rounded-2xl border border-slate-900/10 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-slate-900/40 focus:outline-none"
                />
              </div>
            </div>
          </Reveal>
        </section>

        <section id="lexique-terms" className="section-shell space-y-6">
          <div className="space-y-6">
            {filteredTopics.length === 0 && (
              <Reveal>
                <div className="premium-card rounded-3xl border border-white/10 bg-white/5 p-6 text-white/70">
                  {textCopy.noResults}
                </div>
              </Reveal>
            )}
            {filteredTopics.map((topic, index) => (
              <Reveal key={topic.title} delay={index * 0.05}>
                <div className="premium-card rounded-3xl border border-white/10 bg-white/5 p-6">
                  <h2 className="text-2xl font-semibold text-white">{topic.title}</h2>
                  <p className="mt-3 text-white/75">{topic.summary}</p>
                  <ul className="mt-4 space-y-2 text-white/70">
                    {topic.bullets.map((detail) => (
                      <li key={detail} className="flex items-start gap-2">
                        <span className="mt-1 h-2 w-2 rounded-full bg-white/50" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section-shell">
          <div className="accent-section">
            <div className="content space-y-6 px-6 py-10 text-white">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-white/60">{textCopy.nextStepsKicker}</p>
                <h2 className="mt-3 text-3xl font-semibold">{textCopy.nextStepsTitle}</h2>
                <p className="mt-2 max-w-3xl text-white/70">{textCopy.nextStepsBody}</p>
              </div>
              <div className="flex flex-wrap gap-3 text-sm">
                <Link
                  href={withPrefix("/devis")}
                  className="rounded-full border border-white/30 px-5 py-2 text-white/80 transition hover:border-white hover:text-white"
                >
                  {textCopy.nextStepsCta1}
                </Link>
                <Link
                  href={withPrefix("/configurateur")}
                  className="rounded-full border border-white/30 px-5 py-2 text-white/80 transition hover:border-white hover:text-white"
                >
                  {textCopy.nextStepsCta2}
                </Link>
                <Link
                  href={withPrefix("/cahier-des-charges")}
                  className="rounded-full border border-white/30 px-5 py-2 text-white/80 transition hover:border-white hover:text-white"
                >
                  {textCopy.nextStepsCta3}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="sticky top-32 hidden lg:block lg:w-72">
        <StickyTimelineIndicator sections={lexiqueSections} />
      </div>
    </div>
  );
}
