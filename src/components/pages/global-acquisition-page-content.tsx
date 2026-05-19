"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight, FiCheck, FiGlobe, FiTrendingUp, FiUsers, FiZap, FiStar } from "react-icons/fi";
import type { Locale } from "@/lib/locales";
import { withLocalePrefix } from "@/lib/locales";

type GlobalAcquisitionPageKey =
  | "site-web-entreprise"
  | "refonte-site-web"
  | "application-web-sur-mesure"
  | "automatisation-ia-entreprise";

type Props = {
  locale: Locale;
  page: GlobalAcquisitionPageKey;
};

const content = {
  fr: {
    "site-web-entreprise": {
      eyebrow: "Site vitrine · Corporate · Conversion",
      title: "Un site web entreprise qui convertit,",
      title2: "livré en 14 jours.",
      intro:
        "Fini les sites génériques qui ne donnent pas confiance. KAH Digital conçoit des sites entreprise niveau SaaS — design premium, Core Web Vitals 95+, SEO technique inclus. Vous possédez 100% du code à la livraison.",
      stats: [
        { value: "14j", label: "Délai Business" },
        { value: "95+", label: "Lighthouse" },
        { value: "100%", label: "Propriété code" },
        { value: "0€", label: "Frais cachés" },
      ],
      benefitsTitle: "Ce que votre site doit faire pour vous",
      benefits: [
        "Présenter l'offre clairement pour déclencher des appels entrants",
        "Inspirer confiance à des prospects B2B ou des partenaires sérieux",
        "Charger en moins de 2 secondes sur mobile comme sur desktop",
        "Servir de base solide pour SEO, campagnes payantes et prospection",
      ],
      profilesTitle: "Ce service est fait pour vous si…",
      profiles: [
        "Votre site actuel fait perdre des clients à la première visite",
        "Vous souhaitez un design niveau Stripe, Linear ou Framer",
        "Vous voulez le code source sans dépendance ni abonnement",
        "Vous avez besoin d'être en ligne rapidement avec un résultat propre",
      ],
      contextTitle: "Notre promesse : résultat mesurable",
      contextBody:
        "On ne livre pas des maquettes. On livre des systèmes performants : structure orientée conversion, contenu utile, rendu optimisé, SEO intégré dès le premier jour. Votre site travaille pendant que vous dormez.",
      highlights: [
        { icon: FiZap, title: "Livraison en 14 jours", body: "Starter en 5 jours. Business en 14. Cadrage court, décisions claires, zéro réunion inutile." },
        { icon: FiGlobe, title: "Stack monde réel", body: "Next.js 15, TypeScript strict, Tailwind, Vercel. La même stack que les startups qui lèvent des millions." },
        { icon: FiTrendingUp, title: "+40% de conversions", body: "Structure claire, CTA optimisés, vitesse de chargement — chaque détail est pensé pour convertir." },
      ],
      ctaTitle: "Votre site perd des clients chaque jour.",
      ctaBody: "Audit gratuit en 24h. On identifie exactement ce qui freine votre conversion et ce qu'il faut corriger en priorité.",
      ctaQuote: "Demander un audit gratuit",
    },
    "refonte-site-web": {
      eyebrow: "Refonte · Repositionnement · Machine à leads",
      title: "Votre site actuel coûte des clients.",
      title2: "On le transforme.",
      intro:
        "Un site lent, mal structuré ou visuellement faible ne pardonne pas en 2025. KAH Digital reprend tout — structure, UX, vitesse, conversion — et livre une machine à leads en 14 à 28 jours. Résultat garanti ou remboursé.",
      stats: [
        { value: "+40%", label: "Conversions" },
        { value: "<2s", label: "Chargement" },
        { value: "95+", label: "Lighthouse" },
        { value: "14j", label: "Livraison" },
      ],
      benefitsTitle: "Ce qu'une vraie refonte change",
      benefits: [
        "Taux de rebond réduit de 30 à 60% avec une UX repensée",
        "Temps de chargement divisé par 3 grâce à Next.js 15",
        "Positionnement SEO amélioré dès la mise en ligne",
        "Demandes entrantes mieux qualifiées et plus nombreuses",
      ],
      profilesTitle: "Refonte urgente si…",
      profiles: [
        "Votre site charge en plus de 3 secondes sur mobile",
        "Le design n'inspire plus confiance à vos prospects B2B",
        "Le taux de conversion stagne sous les 1,5%",
        "Vous perdez des leads au profit de concurrents mieux positionnés",
      ],
      contextTitle: "On ne repeint pas — on reconstruit",
      contextBody:
        "Une refonte KAH Digital, c'est une chirurgie complète : nouvelle architecture, contenu recentré sur la conversion, vitesse maximale, SEO natif. Pas un lifting visuel — un système de croissance.",
      highlights: [
        { icon: FiZap, title: "Refonte complète en 28j", body: "Architecture, UX, copy, performance. Tout revu, tout reconstruit. Livré proprement." },
        { icon: FiUsers, title: "Analyse conversion incluse", body: "Audit de l'existant avant de toucher quoi que ce soit. On corrige ce qui coûte des leads." },
        { icon: FiTrendingUp, title: "SEO renforcé", body: "Sitemap, balises structurées, vitesse, Core Web Vitals. Votre site remonte dans les résultats." },
      ],
      ctaTitle: "Combien vous coûte votre site actuel par mois ?",
      ctaBody: "Audit gratuit en 24h. On mesure votre perte de conversion et on vous dit exactement ce qu'il faut reconstruire.",
      ctaQuote: "Demander un audit gratuit",
    },
    "application-web-sur-mesure": {
      eyebrow: "SaaS · Portail · Dashboard · Outil métier",
      title: "Une application web qui",
      title2: "règle un vrai problème.",
      intro:
        "Pas de feature-creep. Pas de sur-ingénierie. KAH Digital livre des applications web utiles, rapides et évolutives : portails B2B, dashboards, espaces clients, outils internes. V1 fonctionnelle en 4 semaines.",
      stats: [
        { value: "4sem", label: "V1 livrée" },
        { value: "100%", label: "Propriété code" },
        { value: "0", label: "Vendor lock-in" },
        { value: "24h", label: "Premier retour" },
      ],
      benefitsTitle: "Ce que l'app doit résoudre",
      benefits: [
        "Éliminer les tâches manuelles répétitives et les doubles saisies",
        "Centraliser l'information en temps réel pour toute l'équipe",
        "Donner un accès propre aux clients, partenaires ou prestataires",
        "Poser une base technique évolutive sans refaire de zéro dans 18 mois",
      ],
      profilesTitle: "Cas d'usage les plus fréquents",
      profiles: [
        "Portail client B2B avec espace sécurisé",
        "Dashboard reporting ou suivi opérationnel",
        "Outil interne de qualification, planning ou suivi",
        "SaaS micro-niche ou MVP à valider rapidement",
      ],
      contextTitle: "V1 utile, pas V1 parfaite",
      contextBody:
        "On scope une première version utilisable, testable et livrable. Pas de complexité inutile, pas d'architecture pour des besoins hypothétiques. La V1 sert de base solide — on construit dessus quand les usages le justifient.",
      highlights: [
        { icon: FiZap, title: "MVP en 4 semaines", body: "V1 fonctionnelle, testable, déployable. On valide l'usage avant d'investir dans la complexité." },
        { icon: FiGlobe, title: "Stack production-ready", body: "Next.js 15, Supabase, TypeScript strict. Scalable par design dès la première ligne." },
        { icon: FiTrendingUp, title: "Base évolutive", body: "Architecture propre dès le départ. On ajoute des modules sans réécriture." },
      ],
      ctaTitle: "Vous avez un besoin métier qui n'a pas encore de solution propre ?",
      ctaBody: "On cadre votre V1 en 48h. Budget, scope, délai — sans jargon, sans promesse en l'air.",
      ctaQuote: "Cadrer ma V1",
    },
    "automatisation-ia-entreprise": {
      eyebrow: "IA · Agents · Automatisation · ROI mesurable",
      title: "Réduisez vos coûts opérationnels",
      title2: "de 40 à 70% avec l'IA.",
      intro:
        "Pas de l'IA gadget — des agents GPT-4 qui qualifient vos leads, répondent à vos clients et automatisent vos workflows. KAH Digital implémente des automatisations IA concrètes, intégrées à votre stack existant, avec un ROI mesurable dès le premier mois.",
      stats: [
        { value: "-70%", label: "Tâches manuelles" },
        { value: "24/7", label: "Disponibilité" },
        { value: "10j", label: "Déploiement" },
        { value: "x3", label: "Qualification leads" },
      ],
      benefitsTitle: "Ce que l'automatisation IA apporte",
      benefits: [
        "Qualification de leads automatique — seuls les prospects chauds vous atteignent",
        "Support client 24/7 avec escalade propre vers un humain si besoin",
        "Réduction de 70% des tâches répétitives — votre équipe se concentre sur la valeur",
        "ROI mesurable dès le premier mois — temps, leads, satisfaction",
      ],
      profilesTitle: "L'IA fait sens pour vous si…",
      profiles: [
        "Vous traitez plus de 20 demandes entrantes par semaine",
        "Votre équipe passe des heures sur des tâches répétitives",
        "Vous voulez un support réactif sans recruter",
        "Vous avez un CRM, un formulaire ou un workflow à automatiser",
      ],
      contextTitle: "IA utile, pas IA marketing",
      contextBody:
        "On part d'un problème réel, pas d'un buzzword. Chaque automatisation a un objectif mesurable : leads qualifiés, temps économisé, coût réduit. On ne vend pas de l'IA — on livre du résultat.",
      highlights: [
        { icon: FiZap, title: "Agents GPT-4 sur mesure", body: "Chatbot de qualification, support, résumé automatique, routage intelligent. Entraîné sur vos données." },
        { icon: FiUsers, title: "Humain + IA parfaitement calibré", body: "L'escalade vers un humain reste propre et sans friction quand le bot atteint sa limite." },
        { icon: FiTrendingUp, title: "ROI en 30 jours", body: "Déploiement en 10 jours, résultats mesurables à J+30. Temps, leads, satisfaction — tout est tracé." },
      ],
      ctaTitle: "Votre équipe perd combien d'heures par semaine sur des tâches automatisables ?",
      ctaBody: "Audit IA gratuit en 24h. On identifie vos 3 automations à plus fort ROI et on estime le gain concret.",
      ctaQuote: "Demander un audit IA gratuit",
    },
  },
  en: {
    "site-web-entreprise": {
      eyebrow: "Business website · Corporate · Conversion machine",
      title: "A business website that converts,",
      title2: "delivered in 14 days.",
      intro:
        "No more generic sites that lose clients on first visit. KAH Digital builds SaaS-level business websites — premium design, Lighthouse 95+, technical SEO included. 100% yours on delivery, no lock-in ever.",
      stats: [
        { value: "14d", label: "Business delivery" },
        { value: "95+", label: "Lighthouse" },
        { value: "100%", label: "Code ownership" },
        { value: "$0", label: "Hidden fees" },
      ],
      benefitsTitle: "What your website must do for you",
      benefits: [
        "Present your offer clearly to generate inbound calls",
        "Build trust with serious B2B prospects and partners",
        "Load in under 2 seconds on mobile and desktop",
        "Serve as a solid base for SEO, paid campaigns, and outbound",
      ],
      profilesTitle: "This is right for you if…",
      profiles: [
        "Your current site loses clients on the first visit",
        "You want Stripe, Linear, or Framer-level design quality",
        "You want the source code with no vendor dependency",
        "You need to be online fast with a clean, professional result",
      ],
      contextTitle: "Our promise: measurable results",
      contextBody:
        "We don't deliver mockups. We deliver performant systems: conversion-oriented structure, useful content, optimised rendering, SEO from day one. Your site works while you sleep.",
      highlights: [
        { icon: FiZap, title: "Delivered in 14 days", body: "Starter in 5 days. Business in 14. Short scoping, clear decisions, zero unnecessary meetings." },
        { icon: FiGlobe, title: "Real-world stack", body: "Next.js 15, TypeScript strict, Tailwind, Vercel. The same stack as startups raising millions." },
        { icon: FiTrendingUp, title: "+40% conversions", body: "Clear structure, optimised CTAs, load speed — every detail is built to convert." },
      ],
      ctaTitle: "Your site is losing clients every day.",
      ctaBody: "Free audit within 24h. We identify exactly what's blocking your conversion and what to fix first.",
      ctaQuote: "Request a free audit",
    },
    "refonte-site-web": {
      eyebrow: "Redesign · Repositioning · Lead machine",
      title: "Your current site is costing you clients.",
      title2: "We'll rebuild it.",
      intro:
        "A slow, poorly structured, or visually weak site doesn't forgive in 2025. KAH Digital rebuilds everything — structure, UX, speed, conversion — and delivers a lead machine in 14 to 28 days. Results guaranteed.",
      stats: [
        { value: "+40%", label: "Conversions" },
        { value: "<2s", label: "Load time" },
        { value: "95+", label: "Lighthouse" },
        { value: "14d", label: "Delivery" },
      ],
      benefitsTitle: "What a real redesign changes",
      benefits: [
        "Bounce rate reduced 30–60% with a rebuilt UX",
        "Load time cut 3x with Next.js 15",
        "SEO ranking improved from day one",
        "Better qualified and more numerous inbound leads",
      ],
      profilesTitle: "Urgent redesign if…",
      profiles: [
        "Your site loads in over 3 seconds on mobile",
        "The design no longer inspires trust with B2B prospects",
        "Conversion rate is stuck below 1.5%",
        "You're losing leads to better-positioned competitors",
      ],
      contextTitle: "We don't repaint — we rebuild",
      contextBody:
        "A KAH Digital redesign is a full rebuild: new architecture, conversion-focused content, maximum speed, native SEO. Not a visual refresh — a growth system.",
      highlights: [
        { icon: FiZap, title: "Full rebuild in 28 days", body: "Architecture, UX, copy, performance. Everything reviewed and rebuilt. Clean delivery." },
        { icon: FiUsers, title: "Conversion audit included", body: "We audit your existing site before touching anything. We fix what's costing you leads." },
        { icon: FiTrendingUp, title: "Reinforced SEO", body: "Sitemap, structured data, speed, Core Web Vitals. Your site climbs the results." },
      ],
      ctaTitle: "How much is your current site costing you per month?",
      ctaBody: "Free audit within 24h. We measure your conversion loss and tell you exactly what to rebuild.",
      ctaQuote: "Request a free audit",
    },
    "application-web-sur-mesure": {
      eyebrow: "SaaS · Portal · Dashboard · Business tool",
      title: "A web application that",
      title2: "solves a real problem.",
      intro:
        "No feature creep. No over-engineering. KAH Digital delivers useful, fast, scalable web applications: B2B portals, dashboards, client spaces, internal tools. Functional V1 in 4 weeks.",
      stats: [
        { value: "4wk", label: "V1 delivered" },
        { value: "100%", label: "Code ownership" },
        { value: "0", label: "Vendor lock-in" },
        { value: "24h", label: "First response" },
      ],
      benefitsTitle: "What the app must solve",
      benefits: [
        "Eliminate repetitive manual tasks and duplicate data entry",
        "Centralise real-time information for your entire team",
        "Give clean access to clients, partners, or subcontractors",
        "Build a scalable technical base without starting from scratch in 18 months",
      ],
      profilesTitle: "Most common use cases",
      profiles: [
        "B2B client portal with secure space",
        "Reporting or operational tracking dashboard",
        "Internal qualification, planning, or follow-up tool",
        "Micro-niche SaaS or MVP to validate quickly",
      ],
      contextTitle: "Useful V1, not perfect V1",
      contextBody:
        "We scope a usable, testable, deliverable first version. No unnecessary complexity, no architecture for hypothetical needs. V1 serves as a solid base — we build on it when usage justifies it.",
      highlights: [
        { icon: FiZap, title: "MVP in 4 weeks", body: "Functional, testable, deployable. Validate usage before investing in complexity." },
        { icon: FiGlobe, title: "Production-ready stack", body: "Next.js 15, Supabase, TypeScript strict. Scalable by design from line one." },
        { icon: FiTrendingUp, title: "Evolutive base", body: "Clean architecture from the start. Add modules without rewriting." },
      ],
      ctaTitle: "Do you have a business need that still has no clean solution?",
      ctaBody: "We scope your V1 in 48h. Budget, scope, timeline — no jargon, no empty promises.",
      ctaQuote: "Scope my V1",
    },
    "automatisation-ia-entreprise": {
      eyebrow: "AI · Agents · Automation · Measurable ROI",
      title: "Cut operational costs",
      title2: "40–70% with AI.",
      intro:
        "Not gimmick AI — GPT-4 agents that qualify your leads, answer your clients, and automate your workflows. KAH Digital implements concrete AI automations, integrated into your existing stack, with measurable ROI from month one.",
      stats: [
        { value: "-70%", label: "Manual tasks" },
        { value: "24/7", label: "Availability" },
        { value: "10d", label: "Deployment" },
        { value: "x3", label: "Lead qualification" },
      ],
      benefitsTitle: "What AI automation delivers",
      benefits: [
        "Automatic lead qualification — only hot prospects reach you",
        "24/7 customer support with clean handoff to a human when needed",
        "70% reduction in repetitive tasks — your team focuses on value",
        "Measurable ROI from month one: time, leads, satisfaction",
      ],
      profilesTitle: "AI makes sense for you if…",
      profiles: [
        "You handle over 20 inbound requests per week",
        "Your team spends hours on repetitive tasks",
        "You want reactive support without hiring",
        "You have a CRM, form, or workflow to automate",
      ],
      contextTitle: "Useful AI, not marketing AI",
      contextBody:
        "We start from a real problem, not a buzzword. Every automation has a measurable objective: qualified leads, time saved, cost reduced. We don't sell AI — we deliver results.",
      highlights: [
        { icon: FiZap, title: "Custom GPT-4 agents", body: "Qualification chatbot, support, automatic summaries, smart routing. Trained on your data." },
        { icon: FiUsers, title: "Human + AI perfectly calibrated", body: "Escalation to a human stays clean and frictionless when the bot reaches its limit." },
        { icon: FiTrendingUp, title: "ROI in 30 days", body: "Deployed in 10 days, measurable results at D+30. Time, leads, satisfaction — all tracked." },
      ],
      ctaTitle: "How many hours per week does your team spend on automatable tasks?",
      ctaBody: "Free AI audit within 24h. We identify your 3 highest-ROI automations and estimate the concrete gain.",
      ctaQuote: "Request a free AI audit",
    },
  },
  de: {
    "site-web-entreprise": {
      eyebrow: "Business-Website · Corporate · Conversion-Maschine",
      title: "Eine Business-Website, die konvertiert,",
      title2: "in 14 Tagen geliefert.",
      intro:
        "Schluss mit generischen Websites, die beim ersten Besuch Kunden verlieren. KAH Digital entwickelt SaaS-Level Business-Websites — Premium-Design, Lighthouse 95+, technisches SEO inklusive. 100% Ihr Eigentum bei Lieferung, kein Lock-in.",
      stats: [
        { value: "14T", label: "Lieferzeit" },
        { value: "95+", label: "Lighthouse" },
        { value: "100%", label: "Code-Eigentum" },
        { value: "0 CHF", label: "Versteckte Kosten" },
      ],
      benefitsTitle: "Was Ihre Website leisten muss",
      benefits: [
        "Angebot klar präsentieren und eingehende Anrufe generieren",
        "Vertrauen bei ernsthaften B2B-Interessenten aufbauen",
        "In unter 2 Sekunden auf Mobil und Desktop laden",
        "Solide Basis für SEO, Kampagnen und Akquise",
      ],
      profilesTitle: "Das passt zu Ihnen, wenn…",
      profiles: [
        "Ihre aktuelle Website beim ersten Besuch Kunden verliert",
        "Sie Design auf Stripe-, Linear- oder Framer-Niveau wollen",
        "Sie den Quellcode ohne Anbieterabhängigkeit wollen",
        "Sie schnell online sein wollen mit einem sauberen Ergebnis",
      ],
      contextTitle: "Unser Versprechen: messbare Ergebnisse",
      contextBody:
        "Wir liefern keine Mockups. Wir liefern performante Systeme: conversion-orientierte Struktur, nützlicher Inhalt, optimiertes Rendering, SEO ab Tag eins. Ihre Website arbeitet, während Sie schlafen.",
      highlights: [
        { icon: FiZap, title: "Lieferung in 14 Tagen", body: "Starter in 5 Tagen. Business in 14. Kurzes Briefing, klare Entscheidungen, null unnötige Meetings." },
        { icon: FiGlobe, title: "Real-World-Stack", body: "Next.js 15, TypeScript strict, Tailwind, Vercel. Derselbe Stack wie Startups, die Millionen einsammeln." },
        { icon: FiTrendingUp, title: "+40% Conversions", body: "Klare Struktur, optimierte CTAs, Ladegeschwindigkeit — jedes Detail ist auf Conversion ausgelegt." },
      ],
      ctaTitle: "Ihre Website verliert täglich Kunden.",
      ctaBody: "Kostenloses Audit innerhalb von 24h. Wir identifizieren genau, was Ihre Conversion blockiert.",
      ctaQuote: "Kostenloses Audit anfragen",
    },
    "refonte-site-web": {
      eyebrow: "Refonte · Neuausrichtung · Lead-Maschine",
      title: "Ihre aktuelle Website kostet Sie Kunden.",
      title2: "Wir bauen sie neu.",
      intro:
        "Eine langsame, schlecht strukturierte oder visuell schwache Website verzeiht 2025 nichts. KAH Digital baut alles neu — Struktur, UX, Geschwindigkeit, Conversion — und liefert eine Lead-Maschine in 14 bis 28 Tagen.",
      stats: [
        { value: "+40%", label: "Conversions" },
        { value: "<2s", label: "Ladezeit" },
        { value: "95+", label: "Lighthouse" },
        { value: "14T", label: "Lieferzeit" },
      ],
      benefitsTitle: "Was eine echte Refonte verändert",
      benefits: [
        "Absprungrate um 30–60% reduziert durch neu gedachte UX",
        "Ladezeit durch Next.js 15 um Faktor 3 reduziert",
        "SEO-Ranking ab dem ersten Tag verbessert",
        "Mehr und besser qualifizierte eingehende Leads",
      ],
      profilesTitle: "Dringende Refonte wenn…",
      profiles: [
        "Ihre Website auf Mobil über 3 Sekunden lädt",
        "Das Design B2B-Interessenten kein Vertrauen mehr einflößt",
        "Die Conversion-Rate unter 1,5% stagniert",
        "Sie Leads an besser positionierte Mitbewerber verlieren",
      ],
      contextTitle: "Wir streichen nicht — wir bauen neu",
      contextBody:
        "Eine KAH Digital Refonte ist ein kompletter Neubau: neue Architektur, conversion-fokussierter Inhalt, maximale Geschwindigkeit, natives SEO. Kein visuelles Lifting — ein Wachstumssystem.",
      highlights: [
        { icon: FiZap, title: "Komplettumbau in 28 Tagen", body: "Architektur, UX, Copy, Performance. Alles überprüft und neu gebaut. Saubere Lieferung." },
        { icon: FiUsers, title: "Conversion-Audit inklusive", body: "Wir auditieren Ihre bestehende Website, bevor wir etwas anfassen. Wir beheben, was Leads kostet." },
        { icon: FiTrendingUp, title: "Verstärktes SEO", body: "Sitemap, strukturierte Daten, Geschwindigkeit, Core Web Vitals. Ihre Website steigt in den Ergebnissen." },
      ],
      ctaTitle: "Wieviel kostet Ihre aktuelle Website Sie pro Monat?",
      ctaBody: "Kostenloses Audit innerhalb von 24h. Wir messen Ihren Conversion-Verlust und sagen Ihnen genau, was neu gebaut werden muss.",
      ctaQuote: "Kostenloses Audit anfragen",
    },
    "application-web-sur-mesure": {
      eyebrow: "SaaS · Portal · Dashboard · Business-Tool",
      title: "Eine Web-App, die",
      title2: "ein echtes Problem löst.",
      intro:
        "Kein Feature-Creep. Keine Über-Engineering. KAH Digital liefert nützliche, schnelle und skalierbare Web-Anwendungen: B2B-Portale, Dashboards, Kundenbereiche, interne Tools. Funktionale V1 in 4 Wochen.",
      stats: [
        { value: "4Wo", label: "V1 geliefert" },
        { value: "100%", label: "Code-Eigentum" },
        { value: "0", label: "Vendor Lock-in" },
        { value: "24h", label: "Erste Antwort" },
      ],
      benefitsTitle: "Was die App lösen muss",
      benefits: [
        "Repetitive manuelle Aufgaben und Datendoppeleingaben eliminieren",
        "Informationen in Echtzeit für das gesamte Team zentralisieren",
        "Kunden, Partnern oder Lieferanten sauberen Zugang geben",
        "Skalierbare technische Basis aufbauen ohne Neubeginn in 18 Monaten",
      ],
      profilesTitle: "Häufigste Anwendungsfälle",
      profiles: [
        "B2B-Kundenportal mit gesichertem Bereich",
        "Reporting- oder Betriebsverfolgungsdashboard",
        "Internes Qualifizierungs-, Planungs- oder Follow-up-Tool",
        "Micro-Niche-SaaS oder MVP schnell validieren",
      ],
      contextTitle: "Nützliche V1, nicht perfekte V1",
      contextBody:
        "Wir scopen eine nutzbare, testbare, lieferbare erste Version. Keine unnötige Komplexität, keine Architektur für hypothetische Bedürfnisse. V1 dient als solide Basis — wir bauen darauf auf, wenn der Einsatz es rechtfertigt.",
      highlights: [
        { icon: FiZap, title: "MVP in 4 Wochen", body: "Funktional, testbar, deploybar. Einsatz validieren, bevor in Komplexität investiert wird." },
        { icon: FiGlobe, title: "Production-Ready-Stack", body: "Next.js 15, Supabase, TypeScript strict. Ab der ersten Zeile skalierbar." },
        { icon: FiTrendingUp, title: "Evolutive Basis", body: "Saubere Architektur von Anfang an. Module hinzufügen ohne Neuschluss." },
      ],
      ctaTitle: "Haben Sie einen Geschäftsbedarf, der noch keine saubere Lösung hat?",
      ctaBody: "Wir scopen Ihre V1 in 48h. Budget, Umfang, Zeitplan — kein Fachjargon, keine leeren Versprechen.",
      ctaQuote: "Meine V1 scopen",
    },
    "automatisation-ia-entreprise": {
      eyebrow: "KI · Agenten · Automation · Messbarer ROI",
      title: "Betriebskosten um",
      title2: "40–70% mit KI senken.",
      intro:
        "Keine Gadget-KI — GPT-4-Agenten, die Ihre Leads qualifizieren, Kunden antworten und Workflows automatisieren. KAH Digital implementiert konkrete KI-Automationen, integriert in Ihren bestehenden Stack, mit messbarem ROI ab Monat eins.",
      stats: [
        { value: "-70%", label: "Manuelle Aufgaben" },
        { value: "24/7", label: "Verfügbarkeit" },
        { value: "10T", label: "Deployment" },
        { value: "x3", label: "Lead-Qualität" },
      ],
      benefitsTitle: "Was KI-Automatisierung liefert",
      benefits: [
        "Automatische Lead-Qualifizierung — nur heiße Interessenten erreichen Sie",
        "24/7 Kundensupport mit sauberer Übergabe an Menschen bei Bedarf",
        "70% weniger repetitive Aufgaben — Ihr Team konzentriert sich auf Wert",
        "Messbarer ROI ab Monat eins: Zeit, Leads, Zufriedenheit",
      ],
      profilesTitle: "KI macht für Sie Sinn wenn…",
      profiles: [
        "Sie über 20 eingehende Anfragen pro Woche bearbeiten",
        "Ihr Team Stunden mit repetitiven Aufgaben verbringt",
        "Sie reaktiven Support ohne Neueinstellungen wollen",
        "Sie ein CRM, Formular oder Workflow automatisieren wollen",
      ],
      contextTitle: "Nützliche KI, nicht Marketing-KI",
      contextBody:
        "Wir starten von einem echten Problem, nicht einem Buzzword. Jede Automatisierung hat ein messbares Ziel: qualifizierte Leads, gesparte Zeit, reduzierte Kosten. Wir verkaufen keine KI — wir liefern Ergebnisse.",
      highlights: [
        { icon: FiZap, title: "Individuelle GPT-4-Agenten", body: "Qualifizierungs-Chatbot, Support, automatische Zusammenfassungen, intelligentes Routing. Auf Ihren Daten trainiert." },
        { icon: FiUsers, title: "Mensch + KI perfekt kalibriert", body: "Eskalation zu einem Menschen bleibt sauber und reibungslos, wenn der Bot seine Grenze erreicht." },
        { icon: FiTrendingUp, title: "ROI in 30 Tagen", body: "Deployment in 10 Tagen, messbare Ergebnisse an T+30. Zeit, Leads, Zufriedenheit — alles getrackt." },
      ],
      ctaTitle: "Wieviele Stunden pro Woche verbringt Ihr Team mit automatisierbaren Aufgaben?",
      ctaBody: "Kostenloses KI-Audit in 24h. Wir identifizieren Ihre 3 ROI-stärksten Automationen und schätzen den konkreten Gewinn.",
      ctaQuote: "Kostenloses KI-Audit anfragen",
    },
  },
} as const;

export function GlobalAcquisitionPageContent({ locale, page }: Props) {
  const pageContent = content[locale][page];
  const ctaLabel = locale === "fr" ? "Demander un devis" : locale === "en" ? "Request a quote" : "Projekt anfragen";
  const contactLabel = locale === "fr" ? "Parler au fondateur" : locale === "en" ? "Talk to the founder" : "Direkt zum Gründer";

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#050509] py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[120px]" />
          <div className="absolute right-0 top-0 h-[300px] w-[300px] rounded-full bg-violet-600/8 blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gray-400">
              <FiStar size={10} className="text-blue-400" />
              {pageContent.eyebrow}
            </span>
            <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {pageContent.title}{" "}
              <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                {pageContent.title2}
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-gray-400 sm:text-xl">{pageContent.intro}</p>

            {/* Stats pills */}
            <div className="mt-8 flex flex-wrap gap-3">
              {pageContent.stats.map((s) => (
                <div key={s.label} className="rounded-2xl border border-white/8 bg-white/[0.04] px-5 py-3 text-center">
                  <p className="text-xl font-black text-white">{s.value}</p>
                  <p className="text-[10px] text-gray-500">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={withLocalePrefix("/devis", locale)}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 px-8 py-3.5 font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-500/40 hover:-translate-y-0.5"
              >
                {ctaLabel} <FiArrowRight size={16} />
              </Link>
              <Link
                href={withLocalePrefix("/contact", locale)}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-8 py-3.5 font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
              >
                {contactLabel}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits + Profiles */}
      <section className="bg-gray-950 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-white/8 bg-white/[0.025] p-8"
          >
            <h2 className="mb-6 text-xl font-bold text-white">{pageContent.benefitsTitle}</h2>
            <ul className="space-y-4">
              {pageContent.benefits.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-gray-400">
                  <FiCheck className="mt-0.5 shrink-0 text-emerald-400" size={16} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-white/8 bg-white/[0.025] p-8"
          >
            <h2 className="mb-6 text-xl font-bold text-white">{pageContent.profilesTitle}</h2>
            <ul className="space-y-4">
              {pageContent.profiles.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-gray-400">
                  <FiArrowRight className="mt-0.5 shrink-0 text-blue-400" size={16} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Context + Highlights */}
      <section className="bg-[#050509] py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10 text-center"
          >
            <h2 className="text-3xl font-extrabold text-white">{pageContent.contextTitle}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-400">{pageContent.contextBody}</p>
          </motion.div>
          <div className="grid gap-4 md:grid-cols-3">
            {pageContent.highlights.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.45 }}
                  className="rounded-2xl border border-white/8 bg-white/[0.025] p-6"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10">
                    <Icon size={18} className="text-blue-400" />
                  </div>
                  <h3 className="mb-2 font-bold text-white">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-400">{item.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-950 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl border border-white/8 bg-gradient-to-br from-blue-950/40 via-[#050509] to-violet-950/40 p-10 text-center"
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-1/4 top-0 h-[200px] w-[200px] rounded-full bg-blue-500/10 blur-[80px]" />
              <div className="absolute right-1/4 bottom-0 h-[200px] w-[200px] rounded-full bg-violet-500/10 blur-[80px]" />
            </div>
            <div className="relative">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-gray-500">KAH Digital</p>
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">{pageContent.ctaTitle}</h2>
              <p className="mx-auto mt-4 max-w-xl text-gray-400">{pageContent.ctaBody}</p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href={withLocalePrefix("/devis", locale)}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 px-8 py-3.5 font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-500/40 hover:-translate-y-0.5"
                >
                  {pageContent.ctaQuote} <FiArrowRight size={16} />
                </Link>
                <Link
                  href={withLocalePrefix("/services", locale)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-8 py-3.5 font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
                >
                  {locale === "fr" ? "Voir tous les services" : locale === "en" ? "See all services" : "Alle Leistungen"}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
