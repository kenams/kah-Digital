"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useRef, useState, type Dispatch, type SetStateAction } from "react";
import { Reveal } from "@/components/reveal";
import { StickyTimelineIndicator } from "@/components/sticky-timeline-indicator";
import { ConfiguratorPreview } from "@/components/configurator-preview";
import { TurnstileWidget, type TurnstileWidgetHandle } from "@/components/turnstile-widget";
import { useLocale } from "@/lib/locale";
import type { QuoteRequest } from "@/lib/quote";
import { countryDialCodesSorted } from "@/data/country-dial-codes";
import type { ConfigSummary } from "@/types/configurator";

type SiteType = {
  id: string;
  title: string;
  summary: string;
  bullets: string[];
};

type StrategyOption = {
  id: string;
  title: string;
  summary: string;
  deliverables: string[];
};

type MoodOption = {
  id: string;
  title: string;
  palette: string;
  description: string;
};

type ToggleOption = {
  id: string;
  title: string;
  description: string;
};

type FinalFormProps = {
  summary: ConfigSummary;
  features: string[];
  integrations: string[];
  aiModules: string[];
  ready: boolean;
};
const siteTypesFr: SiteType[] = [
  {
    id: "vitrine",
    title: "Site vitrine",
    summary: "Pitch clair, preuves sociales et CTA visibles.",
    bullets: ["Hero + services", "Devis connecte", "FAQ + cahier des charges"],
  },
  {
    id: "blog",
    title: "Magazine / blog",
    summary: "Plateforme éditoriale pour publier et nourrir le SEO.",
    bullets: ["Templates SEO", "Newsletter intégrée", "Analytics lecture"],
  },
  {
    id: "shop",
    title: "Boutique",
    summary: "Catalogue produit + panier + paiement.",
    bullets: ["Stripe / Shopify", "Emails auto", "Dashboard ventes"],
  },
  {
    id: "saas",
    title: "Produit / SaaS",
    summary: "Landing produit et use cases.",
    bullets: ["Pricing dynamique", "Hub onboarding", "Demo / Calendly"],
  },
  {
    id: "event",
    title: "Événement",
    summary: "Landing campagne ou lancement.",
    bullets: ["Agenda + speakers", "Billetterie", "Pack media"],
  },
  {
    id: "portal",
    title: "Portail client",
    summary: "Espace sécurisé pour suivre les projets.",
    bullets: ["SSO + rôles", "Docs et support", "Notif Slack"],
  },
];
const siteTypesEn: SiteType[] = [
  {
    id: "vitrine",
    title: "Showcase website",
    summary: "Clear pitch, social proof, visible CTAs.",
    bullets: ["Hero + services", "Connected quote form", "FAQ + project brief"],
  },
  {
    id: "blog",
    title: "Magazine / blog",
    summary: "Editorial platform to publish and grow SEO.",
    bullets: ["SEO templates", "Embedded newsletter", "Reading analytics"],
  },
  {
    id: "shop",
    title: "Store",
    summary: "Product catalog, cart, and checkout.",
    bullets: ["Stripe / Shopify", "Automated emails", "Sales dashboard"],
  },
  {
    id: "saas",
    title: "Product / SaaS",
    summary: "Product landing and use cases.",
    bullets: ["Dynamic pricing", "Onboarding hub", "Demo / Calendly"],
  },
  {
    id: "event",
    title: "Event",
    summary: "Campaign or launch landing.",
    bullets: ["Agenda + speakers", "Ticketing", "Media kit"],
  },
  {
    id: "portal",
    title: "Client portal",
    summary: "Secure space to follow projects.",
    bullets: ["SSO + roles", "Docs and support", "Slack alerts"],
  },
];
const siteTypesDe: SiteType[] = [
  {
    id: "vitrine",
    title: "Showcase-Website",
    summary: "Klare Botschaft, Social Proof und sichtbare CTAs.",
    bullets: ["Hero + Services", "Angebotsformular", "FAQ + Projektbriefing"],
  },
  {
    id: "blog",
    title: "Magazin / Blog",
    summary: "Editoriale Plattform zum Publizieren und für SEO-Wachstum.",
    bullets: ["SEO-Templates", "Integrierter Newsletter", "Lese-Analytics"],
  },
  {
    id: "shop",
    title: "Shop",
    summary: "Produktkatalog, Warenkorb und Checkout.",
    bullets: ["Stripe / Shopify", "Automatisierte E-Mails", "Sales-Dashboard"],
  },
  {
    id: "saas",
    title: "Produkt / SaaS",
    summary: "Produkt-Landingpage und Use Cases.",
    bullets: ["Dynamisches Pricing", "Onboarding-Hub", "Demo / Calendly"],
  },
  {
    id: "event",
    title: "Event",
    summary: "Landingpage für Kampagne oder Launch.",
    bullets: ["Agenda + Speaker", "Ticketing", "Media Kit"],
  },
  {
    id: "portal",
    title: "Kundenportal",
    summary: "Sicherer Bereich zur Projektverfolgung.",
    bullets: ["SSO + Rollen", "Docs und Support", "Slack-Benachrichtigungen"],
  },
];
const strategyMapFr: Record<string, StrategyOption[]> = {
  vitrine: [
    {
      id: "pitch",
      title: "Pitch express",
      summary: "One-page rapide avec promesse claire.",
      deliverables: ["1 page + ancres", "CTA devis", "Tracking basique"],
    },
    {
      id: "story",
      title: "Storytelling",
      summary: "Multi sections avec équipe et preuves sociales.",
      deliverables: ["4-6 pages", "Portfolio filtrable", "Mentions RGPD"],
    },
    {
      id: "premium",
      title: "Premium",
      summary: "Animations, photos et copywriting poussés.",
      deliverables: ["Moodboard", "Animations Framer Motion", "QA multi devices"],
    },
  ],
  blog: [
    {
      id: "editorial",
      title: "Edito",
      summary: "Rubriques, auteurs, ressources.",
      deliverables: ["Template article", "Newsletter", "CTA contextuel"],
    },
    {
      id: "playbook",
      title: "Playbook",
      summary: "Guides longues formes pour nourrir le funnel.",
      deliverables: ["Table des matières", "Bloc CTA", "Tracking scroll"],
    },
    {
      id: "media",
      title: "Media brand",
      summary: "Interviews, podcasts et sponsors.",
      deliverables: ["Page interview", "Flux audio", "Module sponsoring"],
    },
  ],
  shop: [
    {
      id: "starter",
      title: "Shop starter",
      summary: "Catalogue court pour valider l'offre.",
      deliverables: ["15 produits", "Paiement Stripe", "Emails de confirmation"],
    },
    {
      id: "scale",
      title: "Scale",
      summary: "Filtres, ventes croisees, promos.",
      deliverables: ["100+ produits", "Logistique", "Dashboard"],
    },
    {
      id: "subscription",
      title: "Abonnement",
      summary: "Box ou service récurrent.",
      deliverables: ["Paiement récurrent", "Portail client", "Automations"],
    },
  ],
  saas: [
    {
      id: "product-led",
      title: "Product-led",
      summary: "Screens interactifs et use cases.",
      deliverables: ["Sections use case", "Pricing dynamique", "Calendly"],
    },
    {
      id: "enterprise",
      title: "Enterprise",
      summary: "Focus sécurité et support.",
      deliverables: ["Page sécurité", "Livre blanc", "Logos clients"],
    },
    {
      id: "community",
      title: "Community",
      summary: "Ressources, feedback, roadmap.",
      deliverables: ["Hub ressources", "Templates", "Form feedback"],
    },
  ],
  event: [
    {
      id: "launch",
      title: "Lancement",
      summary: "Reveal + précommandes.",
      deliverables: ["Hero video", "Compteur", "CTA WhatsApp"],
    },
    {
      id: "conference",
      title: "Conférence",
      summary: "Agenda + intervenants.",
      deliverables: ["Fiches speakers", "Billetterie", "FAQ"],
    },
    {
      id: "workshop",
      title: "Workshop",
      summary: "Cohortes limitées.",
      deliverables: ["Devis", "RDV", "Kit media"],
    },
  ],
  portal: [
    {
      id: "support",
      title: "Support",
      summary: "Centre d'aide et tickets.",
      deliverables: ["Portail sécurisé", "Historique", "Emails auto"],
    },
    {
      id: "project",
      title: "Suivi projet",
      summary: "Timeline et validations.",
      deliverables: ["Vue timeline", "Upload docs", "Notif Slack"],
    },
    {
      id: "academy",
      title: "Academy",
      summary: "Courses, quiz, certification.",
      deliverables: ["Catalogue", "Progression", "Export PDF"],
    },
  ],
};
const strategyMapEn: Record<string, StrategyOption[]> = {
  vitrine: [
    {
      id: "pitch",
      title: "Quick pitch",
      summary: "Fast one-pager with a clear promise.",
      deliverables: ["1 page + anchors", "Quote CTA", "Basic tracking"],
    },
    {
      id: "story",
      title: "Storytelling",
      summary: "Multi-section story with team and proof.",
      deliverables: ["4-6 pages", "Filterable portfolio", "GDPR notices"],
    },
    {
      id: "premium",
      title: "Premium",
      summary: "Animations, photography, and refined copy.",
      deliverables: ["Moodboard", "Framer Motion animations", "Multi-device QA"],
    },
  ],
  blog: [
    {
      id: "editorial",
      title: "Editorial",
      summary: "Sections, authors, resources.",
      deliverables: ["Article template", "Newsletter", "Contextual CTA"],
    },
    {
      id: "playbook",
      title: "Playbook",
      summary: "Long-form guides to feed the funnel.",
      deliverables: ["Table of contents", "CTA block", "Scroll tracking"],
    },
    {
      id: "media",
      title: "Media brand",
      summary: "Interviews, podcasts, sponsors.",
      deliverables: ["Interview page", "Audio feed", "Sponsorship module"],
    },
  ],
  shop: [
    {
      id: "starter",
      title: "Shop starter",
      summary: "Small catalog to validate the offer.",
      deliverables: ["15 products", "Stripe checkout", "Confirmation emails"],
    },
    {
      id: "scale",
      title: "Scale",
      summary: "Filters, cross-sell, promos.",
      deliverables: ["100+ products", "Logistics", "Dashboard"],
    },
    {
      id: "subscription",
      title: "Subscription",
      summary: "Box or recurring service.",
      deliverables: ["Recurring billing", "Client portal", "Automations"],
    },
  ],
  saas: [
    {
      id: "product-led",
      title: "Product-led",
      summary: "Interactive screens and use cases.",
      deliverables: ["Use case sections", "Dynamic pricing", "Calendly"],
    },
    {
      id: "enterprise",
      title: "Enterprise",
      summary: "Security and support focus.",
      deliverables: ["Security page", "Whitepaper", "Client logos"],
    },
    {
      id: "community",
      title: "Community",
      summary: "Resources, feedback, roadmap.",
      deliverables: ["Resource hub", "Templates", "Feedback form"],
    },
  ],
  event: [
    {
      id: "launch",
      title: "Launch",
      summary: "Reveal + preorders.",
      deliverables: ["Hero video", "Countdown", "WhatsApp CTA"],
    },
    {
      id: "conference",
      title: "Conference",
      summary: "Agenda + speakers.",
      deliverables: ["Speaker profiles", "Ticketing", "FAQ"],
    },
    {
      id: "workshop",
      title: "Workshop",
      summary: "Limited cohorts.",
      deliverables: ["Pricing", "Bookings", "Media kit"],
    },
  ],
  portal: [
    {
      id: "support",
      title: "Support",
      summary: "Help center and tickets.",
      deliverables: ["Secure portal", "History", "Automated emails"],
    },
    {
      id: "project",
      title: "Project tracking",
      summary: "Timeline and approvals.",
      deliverables: ["Timeline view", "Document uploads", "Slack alerts"],
    },
    {
      id: "academy",
      title: "Academy",
      summary: "Courses, quizzes, certification.",
      deliverables: ["Catalog", "Progress tracking", "PDF export"],
    },
  ],
};
const strategyMapDe: Record<string, StrategyOption[]> = {
  vitrine: [
    {
      id: "pitch",
      title: "Schneller Pitch",
      summary: "Schneller One-Pager mit klarer Botschaft.",
      deliverables: ["1 Seite + Anker", "CTA für Anfrage", "Basis-Tracking"],
    },
    {
      id: "story",
      title: "Storytelling",
      summary: "Mehrere Sektionen mit Team und Proof.",
      deliverables: ["4-6 Seiten", "Filterbares Portfolio", "DSGVO-Hinweise"],
    },
    {
      id: "premium",
      title: "Premium",
      summary: "Animationen, Fotografie und feinere Texte.",
      deliverables: ["Moodboard", "Framer-Motion-Animationen", "QA auf mehreren Geraeten"],
    },
  ],
  blog: [
    {
      id: "editorial",
      title: "Editorial",
      summary: "Rubriken, Autoren und Ressourcen.",
      deliverables: ["Artikel-Template", "Newsletter", "Kontextueller CTA"],
    },
    {
      id: "playbook",
      title: "Playbook",
      summary: "Longform-Guides für den Funnel.",
      deliverables: ["Inhaltsverzeichnis", "CTA-Block", "Scroll-Tracking"],
    },
    {
      id: "media",
      title: "Media Brand",
      summary: "Interviews, Podcasts und Sponsoren.",
      deliverables: ["Interview-Seite", "Audio-Feed", "Sponsoring-Modul"],
    },
  ],
  shop: [
    {
      id: "starter",
      title: "Shop Starter",
      summary: "Kleiner Katalog zum Testen des Angebots.",
      deliverables: ["15 Produkte", "Stripe-Checkout", "Bestätigungs-E-Mails"],
    },
    {
      id: "scale",
      title: "Scale",
      summary: "Filter, Cross-Sell und Promo-Logik.",
      deliverables: ["100+ Produkte", "Logistik", "Dashboard"],
    },
    {
      id: "subscription",
      title: "Abo",
      summary: "Box- oder Recurring-Service.",
      deliverables: ["Wiederkehrende Zahlung", "Kundenportal", "Automationen"],
    },
  ],
  saas: [
    {
      id: "product-led",
      title: "Product-led",
      summary: "Interaktive Screens und Use Cases.",
      deliverables: ["Use-Case-Sektionen", "Dynamisches Pricing", "Calendly"],
    },
    {
      id: "enterprise",
      title: "Enterprise",
      summary: "Fokus auf Sicherheit und Support.",
      deliverables: ["Security-Seite", "Whitepaper", "Kundenlogos"],
    },
    {
      id: "community",
      title: "Community",
      summary: "Ressourcen, Feedback und Roadmap.",
      deliverables: ["Resource Hub", "Templates", "Feedback-Formular"],
    },
  ],
  event: [
    {
      id: "launch",
      title: "Launch",
      summary: "Reveal + Vorbestellungen.",
      deliverables: ["Hero-Video", "Countdown", "WhatsApp-CTA"],
    },
    {
      id: "conference",
      title: "Konferenz",
      summary: "Agenda + Speaker.",
      deliverables: ["Speaker-Profile", "Ticketing", "FAQ"],
    },
    {
      id: "workshop",
      title: "Workshop",
      summary: "Limitierte Cohorts.",
      deliverables: ["Preise", "Buchungen", "Media Kit"],
    },
  ],
  portal: [
    {
      id: "support",
      title: "Support",
      summary: "Help Center und Tickets.",
      deliverables: ["Sicheres Portal", "Historie", "Automatisierte E-Mails"],
    },
    {
      id: "project",
      title: "Projekt-Tracking",
      summary: "Timeline und Freigaben.",
      deliverables: ["Timeline-Ansicht", "Dokument-Uploads", "Slack-Alerts"],
    },
    {
      id: "academy",
      title: "Academy",
      summary: "Kurse, Quiz und Zertifizierung.",
      deliverables: ["Katalog", "Fortschritt", "PDF-Export"],
    },
  ],
};
const moodOptionsFr: MoodOption[] = [
  {
    id: "minimal",
    title: "Minimal & premium",
    palette: "Noir, sable, dore",
    description: "Peu d'element, beaucoup d'espace blanc.",
  },
  {
    id: "vibrant",
    title: "Vibrant & colore",
    palette: "Bleu electrique, corail",
    description: "Illustrations, gradients, micro interactions.",
  },
  {
    id: "editorial",
    title: "Editorial",
    palette: "Ivoire, vert foret",
    description: "Mise en page magazine.",
  },
  {
    id: "dark",
    title: "Dark futuriste",
    palette: "Graphite, neon",
    description: "Ambiance data / produit.",
  },
];
const moodOptionsEn: MoodOption[] = [
  {
    id: "minimal",
    title: "Minimal & premium",
    palette: "Black, sand, gold",
    description: "Few elements, plenty of whitespace.",
  },
  {
    id: "vibrant",
    title: "Vibrant & colorful",
    palette: "Electric blue, coral",
    description: "Illustrations, gradients, micro interactions.",
  },
  {
    id: "editorial",
    title: "Editorial",
    palette: "Ivory, forest green",
    description: "Magazine-style layout.",
  },
  {
    id: "dark",
    title: "Dark futurist",
    palette: "Graphite, neon",
    description: "Data and product atmosphere.",
  },
];
const moodOptionsDe: MoodOption[] = [
  {
    id: "minimal",
    title: "Minimal & premium",
    palette: "Schwarz, Sand, Gold",
    description: "Wenige Elemente, viel Weissraum.",
  },
  {
    id: "vibrant",
    title: "Vibrant & farbig",
    palette: "Electric Blue, Coral",
    description: "Illustrationen, Gradients und Micro-Interactions.",
  },
  {
    id: "editorial",
    title: "Editorial",
    palette: "Elfenbein, Waldgruen",
    description: "Layout im Magazin-Stil.",
  },
  {
    id: "dark",
    title: "Dark futuristisch",
    palette: "Graphit, Neon",
    description: "Data- und Produkt-Atmosphaere.",
  },
];

const featureOptionsFr: ToggleOption[] = [
  { id: "questionnaire", title: "Questionnaire", description: "Form multi etapes relie a Notion/Airtable." },
  { id: "booking", title: "Prise de rendez-vous", description: "Calendly, Cal.com, HubSpot." },
  { id: "download", title: "Telechargement guide", description: "Cahier des charges suivi." },
  { id: "chat", title: "Chat & support", description: "Intercom, Crisp, WhatsApp." },
  { id: "seo", title: "Pack SEO", description: "Audit keywords + contenus." },
  { id: "motion", title: "Animations avancees", description: "Framer Motion, Lottie." },
];
const featureOptionsEn: ToggleOption[] = [
  { id: "questionnaire", title: "Questionnaire", description: "Multi-step form connected to Notion/Airtable." },
  { id: "booking", title: "Scheduling", description: "Calendly, Cal.com, HubSpot." },
  { id: "download", title: "Guide download", description: "Follow-up project brief." },
  { id: "chat", title: "Chat & support", description: "Intercom, Crisp, WhatsApp." },
  { id: "seo", title: "SEO pack", description: "Keyword audit + content plan." },
  { id: "motion", title: "Advanced motion", description: "Framer Motion, Lottie." },
];
const featureOptionsDe: ToggleOption[] = [
  { id: "questionnaire", title: "Fragebogen", description: "Mehrstufiges Formular mit Notion/Airtable." },
  { id: "booking", title: "Terminbuchung", description: "Calendly, Cal.com, HubSpot." },
  { id: "download", title: "Guide-Download", description: "Projektbriefing im Follow-up." },
  { id: "chat", title: "Chat & Support", description: "Intercom, Crisp, WhatsApp." },
  { id: "seo", title: "SEO-Paket", description: "Keyword-Audit + Content-Plan." },
  { id: "motion", title: "Erweiterte Animationen", description: "Framer Motion, Lottie." },
];

const integrationOptionsFr: ToggleOption[] = [
  { id: "crm", title: "CRM", description: "HubSpot, Pipedrive, Notion CRM." },
  { id: "marketing", title: "Marketing", description: "Brevo, Klaviyo, Customer.io." },
  { id: "analytics", title: "Analytics", description: "Plausible, GA4, PostHog, Sentry." },
  { id: "payment", title: "Paiement", description: "Stripe, Paddle, PayPlug." },
  { id: "cms", title: "CMS", description: "Sanity, Storyblok, Contentful." },
  { id: "automation", title: "Automations", description: "Make, Zapier, n8n." },
];
const integrationOptionsEn: ToggleOption[] = [
  { id: "crm", title: "CRM", description: "HubSpot, Pipedrive, Notion CRM." },
  { id: "marketing", title: "Marketing", description: "Brevo, Klaviyo, Customer.io." },
  { id: "analytics", title: "Analytics", description: "Plausible, GA4, PostHog, Sentry." },
  { id: "payment", title: "Payments", description: "Stripe, Paddle, PayPlug." },
  { id: "cms", title: "CMS", description: "Sanity, Storyblok, Contentful." },
  { id: "automation", title: "Automations", description: "Make, Zapier, n8n." },
];
const integrationOptionsDe: ToggleOption[] = [
  { id: "crm", title: "CRM", description: "HubSpot, Pipedrive, Notion CRM." },
  { id: "marketing", title: "Marketing", description: "Brevo, Klaviyo, Customer.io." },
  { id: "analytics", title: "Analytics", description: "Plausible, GA4, PostHog, Sentry." },
  { id: "payment", title: "Zahlung", description: "Stripe, Paddle, PayPlug." },
  { id: "cms", title: "CMS", description: "Sanity, Storyblok, Contentful." },
  { id: "automation", title: "Automationen", description: "Make, Zapier, n8n." },
];
const aiModuleOptionsFr: ToggleOption[] = [
  {
    id: "ai-automation",
    title: "Automatisation relation client",
    description: "Reponses, devis et relances automatiques.",
  },
  {
    id: "ai-chatbot",
    title: "Chatbot metier & support",
    description: "Assistant 24/7 entraine sur vos contenus.",
  },
  {
    id: "ai-scoring",
    title: "Qualification & lead scoring",
    description: "Scoring, routage et priorisation des leads.",
  },
  {
    id: "ai-content",
    title: "Contenu & assets IA",
    description: "Templates et scripts alignés à la marque.",
  },
  {
    id: "ai-micro-tool",
    title: "Micro-outil IA sur-mesure",
    description: "Extraction, résumé ou aide à la décision.",
  },
];
const aiModuleOptionsEn: ToggleOption[] = [
  {
    id: "ai-automation",
    title: "Client automation layer",
    description: "Automated replies, quotes, and follow-ups.",
  },
  {
    id: "ai-chatbot",
    title: "Industry chatbot & support",
    description: "24/7 assistant trained on your content.",
  },
  {
    id: "ai-scoring",
    title: "Lead qualification & scoring",
    description: "Scoring, routing, and lead prioritization.",
  },
  {
    id: "ai-content",
    title: "AI content & assets pack",
    description: "Templates and scripts aligned to your brand.",
  },
  {
    id: "ai-micro-tool",
    title: "Custom AI micro-tool",
    description: "Extraction, summaries, or decision support.",
  },
];
const aiModuleOptionsDe: ToggleOption[] = [
  {
    id: "ai-automation",
    title: "Client-Automation-Layer",
    description: "Automatisierte Antworten, Angebote und Follow-ups.",
  },
  {
    id: "ai-chatbot",
    title: "Branchen-Chatbot & Support",
    description: "24/7-Assistent auf Basis deiner Inhalte.",
  },
  {
    id: "ai-scoring",
    title: "Lead-Qualifizierung & Scoring",
    description: "Scoring, Routing und Priorisierung von Leads.",
  },
  {
    id: "ai-content",
    title: "AI-Content & Assets",
    description: "Templates und Scripts im Stil deiner Marke.",
  },
  {
    id: "ai-micro-tool",
    title: "Custom AI Micro-Tool",
    description: "Extraktion, Zusammenfassungen oder Decision Support.",
  },
];

const mvpHighlightsFr = [
  {
    title: "Compose ton MVP",
    description: "Scope fonctionnel priorise avec ateliers express.",
    bullets: ["Audit idée", "Wireflows", "Roadmap 6-8 semaines"],
  },
  {
    title: "Pack Site + MVP",
    description: "Un brief unique pour la landing et le produit.",
    bullets: ["Landing + onboarding", "Kit UI commun", "Devis synchronises"],
  },
  {
    title: "Coaching produit",
    description: "Stand-up hebdo pour arbitrer rapidement.",
    bullets: ["Board Notion", "Checklist investisseurs", "Suivi KPI"],
  },
];
const mvpHighlightsEn = [
  {
    title: "Shape your MVP",
    description: "Prioritized functional scope with fast workshops.",
    bullets: ["Idea audit", "Wireflows", "6-8 week roadmap"],
  },
  {
    title: "Site + MVP pack",
    description: "One brief for the landing and the product.",
    bullets: ["Landing + onboarding", "Shared UI kit", "Synced quotes"],
  },
  {
    title: "Product coaching",
    description: "Weekly standups to decide fast.",
    bullets: ["Notion board", "Investor checklist", "KPI tracking"],
  },
];
const mvpHighlightsDe = [
  {
    title: "Dein MVP strukturieren",
    description: "Priorisierter Funktionsumfang mit schnellen Workshops.",
    bullets: ["Idea Audit", "Wireflows", "Roadmap für 6-8 Wochen"],
  },
  {
    title: "Site + MVP Paket",
    description: "Ein gemeinsames Briefing für Landingpage und Produkt.",
    bullets: ["Landing + Onboarding", "Gemeinsames UI-Kit", "Synchronisierte Angebote"],
  },
  {
    title: "Produkt-Coaching",
    description: "Wöchentliche Stand-ups für schnelle Entscheidungen.",
    bullets: ["Notion-Board", "Investor-Checkliste", "KPI-Tracking"],
  },
];

const configuratorSectionsFr = [
  { id: "brief-final", label: "Brief express" },
  { id: "mvp", label: "Pack MVP" },
  { id: "etape-1", label: "Etape 1", description: "Type de site" },
  { id: "etape-2", label: "Etape 2", description: "Vision" },
  { id: "etape-3", label: "Etape 3", description: "Style" },
  { id: "etape-4", label: "Etape 4", description: "Options" },
  { id: "etape-5", label: "Etape 5", description: "Recap" },
] as const;
const configuratorSectionsEn = [
  { id: "brief-final", label: "Quick brief" },
  { id: "mvp", label: "MVP pack" },
  { id: "etape-1", label: "Step 1", description: "Site type" },
  { id: "etape-2", label: "Step 2", description: "Vision" },
  { id: "etape-3", label: "Step 3", description: "Style" },
  { id: "etape-4", label: "Step 4", description: "Options" },
  { id: "etape-5", label: "Step 5", description: "Recap" },
] as const;
const configuratorSectionsDe = [
  { id: "brief-final", label: "Kurzbriefing" },
  { id: "mvp", label: "MVP-Paket" },
  { id: "etape-1", label: "Schritt 1", description: "Website-Typ" },
  { id: "etape-2", label: "Schritt 2", description: "Vision" },
  { id: "etape-3", label: "Schritt 3", description: "Stil" },
  { id: "etape-4", label: "Schritt 4", description: "Optionen" },
  { id: "etape-5", label: "Schritt 5", description: "Recap" },
] as const;
function ConfiguratorFinalForm({ summary, features, integrations, aiModules, ready }: FinalFormProps) {
  const { locale, prefix } = useLocale();
  const [clientType, setClientType] = useState<"entreprise" | "particulier">("entreprise");
  const [companyName, setCompanyName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneCountry, setPhoneCountry] = useState("+41");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaReset, setCaptchaReset] = useState(0);
  const [captchaError, setCaptchaError] = useState("");
  const widgetRef = useRef<TurnstileWidgetHandle | null>(null);
  const pendingSubmitRef = useRef(false);
  const router = useRouter();

  const text = useMemo(
    () =>
      locale === "en"
        ? {
          validation: "Validation",
          title: "Finalize your request",
          description: "Leave your details to lock the quote based on your options.",
          missingSteps: "Finish the steps above to enable sending.",
          statusLabel: "Status *",
          company: "Company",
          individual: "Individual",
          companyName: "Company name",
          optional: "(optional)",
          fullName: "Full name *",
          email: "Email *",
          phone: "Phone",
          notes: "Additional notes",
          notesPlaceholder: "Internal budget, constraints, availability...",
          captcha: "Anti-spam verification",
          captchaMissing: "Captcha not configured.",
          captchaFail: "Verification failed. Try again.",
          sending: "Sending...",
          send: "Send request",
          missingItems: "Missing items (type, vision, or style).",
          success: "Request sent. We'll get back within 24h.",
          companyRequired: "Add the company name to continue.",
          captchaNotConfigured: "Captcha not configured. Contact us directly.",
          captchaNeeded: "Please validate the captcha before sending.",
          sendError: "Unable to send the request. Email us at contact@kah-digital.ch.",
          summaryType: "Type",
          summaryVision: "Vision",
          summaryStyle: "Style",
          summaryOptions: "Options",
          summaryIntegrations: "Integrations",
          summaryAiModules: "AI modules",
          companyPlaceholder: "Ex: Atelier Nova",
          namePlaceholder: "e.g. Alex Martin",
          emailPlaceholder: "hello@company.com",
          phonePlaceholder: "00 00 00 00 00",
          summaryFallback: "Configurator",
          budget: "Defined via configurator",
          timeline: "To define",
        }
        : {
            validation: "Validation",
            title: "Finaliser ta demande",
            description: "Laisse tes coordonnées pour verrouiller le devis selon tes options.",
            missingSteps: "Termine les etapes ci-dessus pour activer l'envoi.",
            statusLabel: "Statut *",
            company: "Entreprise",
            individual: "Particulier",
            companyName: "Nom de société",
            optional: "(optionnel)",
            fullName: "Nom complet *",
            email: "Email *",
            phone: "Téléphone",
            notes: "Notes complementaires",
            notesPlaceholder: "Budget interne, contraintes, disponibilites...",
            captcha: "Verification anti-spam",
            captchaMissing: "Captcha non configuré.",
            captchaFail: "Vérification impossible. Réessaie.",
            sending: "Envoi...",
            send: "Envoyer la demande",
            missingItems: "Il manque des elements (type, vision ou style).",
            success: "Demande envoyee. On revient vers toi sous 24h.",
            companyRequired: "Ajoute le nom de la société pour continuer.",
            captchaNotConfigured: "Captcha non configuré. Contacte-nous directement.",
            captchaNeeded: "Valide le captcha avant d'envoyer.",
            sendError: "Impossible d'envoyer la demande. Ecris-nous sur contact@kah-digital.ch.",
            summaryType: "Type",
            summaryVision: "Vision",
            summaryStyle: "Style",
            summaryOptions: "Options",
            summaryIntegrations: "Integrations",
            summaryAiModules: "Modules IA",
            companyPlaceholder: "Ex: Atelier Nova",
            namePlaceholder: "Ex : Alex Martin",
            emailPlaceholder: "contact@entreprise.com",
            phonePlaceholder: "00 00 00 00 00",
            summaryFallback: "Configurateur",
            budget: "À définir via configurateur",
            timeline: "À définir",
          },
    [locale]
  );
  const noneLabel = locale === "en" ? "None" : "Aucune";
  const companyLabelSuffix = clientType === "entreprise" ? "*" : text.optional;
  const summaryText = [
    `${text.summaryType}: ${summary.type}`,
    `${text.summaryVision}: ${summary.strategy}`,
    `${text.summaryStyle}: ${summary.mood}`,
    `${text.summaryOptions}: ${features.length ? features.join(", ") : noneLabel}`,
    `${text.summaryIntegrations}: ${integrations.length ? integrations.join(", ") : noneLabel}`,
    `${text.summaryAiModules}: ${aiModules.length ? aiModules.join(", ") : noneLabel}`,
  ].join("\n");

  const isSubmitting = status === "loading";

  const submitConfiguratorRequest = useCallback(async (token: string) => {
    if (clientType === "entreprise" && !companyName.trim()) {
      setStatus("error");
      setServerMessage(text.companyRequired);
      return;
    }

    if (!siteKey) {
      setStatus("error");
      setServerMessage(text.captchaNotConfigured);
      return;
    }

    const fallbackType = summary.type !== "-" ? summary.type : text.summaryFallback;
    const fullPhone = phone.trim() ? `${phoneCountry} ${phone.trim()}`.trim() : "";
    const payload: QuoteRequest & { turnstileToken: string } = {
      name: name.trim(),
      email: email.trim(),
      phone: fullPhone || undefined,
      clientType,
      companyName: clientType === "entreprise" ? companyName.trim() || undefined : undefined,
      projectType: fallbackType,
      goal: `${text.summaryVision}: ${summary.strategy} / ${text.summaryStyle}: ${summary.mood}`,
      pages: features.length ? features : [fallbackType],
      aiModules,
      mobilePlatforms: [],
      mobileFeatures: [],
      inspirations: undefined,
      budget: text.budget,
      timeline: text.timeline,
      message: notes ? `${notes.trim()}\n\n${summaryText}` : summaryText,
      storeSupport: undefined,
      techPreferences: undefined,
      projectFocus: "web",
      configurator: {
        siteType: summary.type,
        strategy: summary.strategy,
        mood: summary.mood,
        features,
        integrations,
      },
      turnstileToken: token,
    };

    setStatus("loading");
    setServerMessage("");

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const errorPayload = await response.json().catch(() => null);
        const fallbackMessage = text.sendError;
        const errorMessage = errorPayload?.error ?? fallbackMessage;
        setCaptchaToken("");
        setCaptchaReset((prev) => prev + 1);
        setStatus("error");
        setServerMessage(errorMessage);
        return;
      }
      setStatus("success");
      setServerMessage(text.success);
      window.setTimeout(() => {
        router.push(`${prefix}/merci`);
      }, 800);
      setCompanyName("");
      setName("");
      setEmail("");
      setPhone("");
      setPhoneCountry("+41");
      setNotes("");
      setCaptchaToken("");
      setCaptchaReset((prev) => prev + 1);
    } catch (error) {
      console.error(error);
      setStatus("error");
      setServerMessage(text.sendError);
    }
  }, [
    aiModules,
    clientType,
    companyName,
    email,
    features,
    integrations,
    name,
    notes,
    phone,
    phoneCountry,
    prefix,
    router,
    siteKey,
    summary.mood,
    summary.strategy,
    summary.type,
    summaryText,
    text,
  ]);

  const handleCaptchaVerify = useCallback((token: string) => {
    setCaptchaToken(token);
    setCaptchaError("");
    if (pendingSubmitRef.current) {
      pendingSubmitRef.current = false;
      void submitConfiguratorRequest(token);
    }
  }, [submitConfiguratorRequest]);
  const handleCaptchaExpire = useCallback(() => {
    setCaptchaToken("");
    pendingSubmitRef.current = false;
  }, []);
  const handleCaptchaError = useCallback(() => {
    setCaptchaToken("");
    setCaptchaError(text.captchaFail);
    pendingSubmitRef.current = false;
  }, [text.captchaFail]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (clientType === "entreprise" && !companyName.trim()) {
      setStatus("error");
      setServerMessage(text.companyRequired);
      return;
    }

    if (!siteKey) {
      setStatus("error");
      setServerMessage(text.captchaNotConfigured);
      return;
    }

    if (!captchaToken) {
      pendingSubmitRef.current = true;
      setServerMessage("");
      setCaptchaError("");
      widgetRef.current?.execute();
      return;
    }

    void submitConfiguratorRequest(captchaToken);
  }

  return (
    <div className="premium-card space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-white shadow-[0_25px_70px_rgba(0,0,0,0.45)]">
      <div className="flex flex-col gap-2">
        <p className="text-sm uppercase tracking-[0.3em] text-white/60">{text.validation}</p>
        <h3 className="text-2xl font-semibold text-white">{text.title}</h3>
        <p className="text-white/70">{text.description}</p>
        {!ready && <p className="text-sm text-amber-300">{text.missingSteps}</p>}
      </div>
      <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-white/70">{text.statusLabel}</label>
          <div className="flex gap-3">
            <label className="inline-flex items-center gap-2 text-sm text-white/80">
              <input
                type="radio"
                name="clientType"
                value="entreprise"
                checked={clientType === "entreprise"}
                onChange={() => setClientType("entreprise")}
                className="h-4 w-4 rounded border-white/30 text-black focus:ring-white/70"
              />
              {text.company}
            </label>
            <label className="inline-flex items-center gap-2 text-sm text-white/80">
              <input
                type="radio"
                name="clientType"
                value="particulier"
                checked={clientType === "particulier"}
                onChange={() => setClientType("particulier")}
                className="h-4 w-4 rounded border-white/30 text-black focus:ring-white/70"
              />
              {text.individual}
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-white/70">{`${text.companyName} ${companyLabelSuffix}`}</label>
          <input
            value={companyName}
            onChange={(event) => setCompanyName(event.target.value)}
            className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/60"
            placeholder={text.companyPlaceholder}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-white/70">{text.fullName}</label>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/60"
            placeholder={text.namePlaceholder}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-white/70">{text.email}</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/60"
            placeholder={text.emailPlaceholder}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-white/70">{text.phone}</label>
          <div className="flex flex-wrap gap-3">
            <select
              value={phoneCountry}
              onChange={(event) => setPhoneCountry(event.target.value)}
              className="min-w-[170px] rounded-2xl border border-white/10 bg-white/10 px-3 py-3 text-white focus:border-white/60"
            >
              {countryDialCodesSorted.map((entry) => (
                <option key={entry.iso} value={entry.code} className="text-black">
                  {entry.country} ({entry.code})
                </option>
              ))}
            </select>
            <input
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              inputMode="tel"
              className="min-w-[200px] flex-1 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/60"
              placeholder={text.phonePlaceholder}
            />
          </div>
        </div>
        <div className="md:col-span-2 flex flex-col gap-2">
          <label className="text-sm text-white/70">{text.notes}</label>
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            rows={4}
            className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/60"
            placeholder={text.notesPlaceholder}
          />
        </div>
        <div className="md:col-span-2 space-y-2 text-sm text-white/70">
          <p>{text.captcha}</p>
          {siteKey ? (
            <div className="min-h-[96px] rounded-2xl border border-white/10 bg-white/5 p-4 flex items-center">
              <TurnstileWidget
                ref={widgetRef}
                siteKey={siteKey}
                onVerify={handleCaptchaVerify}
                onExpire={handleCaptchaExpire}
                onError={handleCaptchaError}
                resetKey={String(captchaReset)}
              />
            </div>
          ) : (
            <p className="text-amber-300">{text.captchaMissing}</p>
          )}
          {captchaError && <p className="text-rose-200">{captchaError}</p>}
        </div>
        <div className="md:col-span-2 flex flex-col gap-3">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-black transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isSubmitting || !ready || !name || !email}
          >
            {isSubmitting ? text.sending : text.send}
          </button>
          {serverMessage && (
            <p className={`text-sm ${status === "error" ? "text-rose-200" : "text-emerald-200"}`}>{serverMessage}</p>
          )}
          {!ready && <p className="text-xs text-white/60">{text.missingItems}</p>}
        </div>
      </form>
    </div>
  );
}
type ToggleSetter = Dispatch<SetStateAction<string[]>>;

export default function ConfigurateurPage() {
  const { locale, prefix } = useLocale();
  const pdfHref =
    locale === "en" ? "/cahier-des-charges.en.pdf" : "/cahier-des-charges.pdf";
  const siteTypes = locale === "en" ? siteTypesEn : siteTypesFr;
  const strategyMap = locale === "en" ? strategyMapEn : strategyMapFr;
  const moodOptions = locale === "en" ? moodOptionsEn : moodOptionsFr;
  const featureOptions = locale === "en" ? featureOptionsEn : featureOptionsFr;
  const integrationOptions =
    locale === "en" ? integrationOptionsEn : integrationOptionsFr;
  const aiModuleOptions = locale === "en" ? aiModuleOptionsEn : aiModuleOptionsFr;
  const mvpHighlights = locale === "en" ? mvpHighlightsEn : mvpHighlightsFr;
  const configuratorSections =
    locale === "en" ? configuratorSectionsEn : configuratorSectionsFr;
  const stepLabels =
    locale === "en"
      ? ["Step 1: Type", "Step 2: Vision", "Step 3: Style", "Step 4: Options"]
      : ["Etape 1 : Type", "Etape 2 : Vision", "Etape 3 : Style", "Etape 4 : Options"];
  const textCopy =
    locale === "en"
      ? {
        heroKicker: "Quick quote",
        heroTitle: "Describe your website or mobile app",
        heroBody: "Pick what you want, check useful options, then get a simple recap to start the quote.",
        heroHome: "Back to home",
        heroSteps: "Jump to steps",
        heroClassic: "Use classic quote",
        timelineStart: "Start by choosing: website or mobile app.",
        timelineDone: "Your recap is ready for the quote.",
        timelineProgress: "Keep going to refine your quote.",
        mvpKicker: "Mobile app option",
        mvpTitle: "Describe your app in a few points",
        mvpBody:
          "Want to test an idea? We turn this brief into a simple plan to define screens, features, and a 6 to 8 week roadmap.",
        mvpPrimary: "Start my MVP brief",
        mvpSecondary: "Schedule a product call",
        mvpPanelKicker: "Site + MVP",
        mvpPanelTitle: "One single thread",
        mvpPanelBody:
          "We keep this configurator to align identity, marketing pages, and product options. Result: one cohesive brief for marketing, product, and tech.",
        mvpDeliveryLabel: "Estimated delivery",
        mvpDeliveryValue: "6 to 8 weeks",
        mvpFormatLabel: "Format",
        mvpFormatValue: "Landing + interactive MVP",
        step1Kicker: "Step 1",
        step1Title: "Which site type do you want to launch?",
        step1Reset: "Reset",
        step2Kicker: "Step 2",
        step2Title: "Refine vision and deliverables",
        step2Body: "Each card describes tone, pages, and included deliverables.",
        step2Empty: "Pick a site type first.",
        step3Kicker: "Step 3",
        step3Title: "Which visual style inspires you?",
        step3Body: "Each mood shows dominant palettes and overall feel.",
        step4Kicker: "Step 4",
        step4Title: "Features & integrations",
        step4Body: "Select what you need to avoid surprises in the quote.",
        step4Reset: "Clear options",
        step4FeaturesLabel: "Key features",
        step4IntegrationsLabel: "Integrations",
        step4AiLabel: "AI modules",
        step4AiBadge: "Premium AI",
        step5Kicker: "Step 5",
        step5Title: "Recap",
        step5Body: "This summary can be copied into the quote form or shared with your team.",
        recapType: "Type",
        recapVision: "Vision",
        recapStyle: "Style",
        recapFeatures: "Features",
        recapIntegrations: "Integrations",
        recapAiModules: "AI modules",
        recapNoneFeatures: "No options selected yet.",
        recapNoneIntegrations: "No integrations selected.",
        recapNoneAiModules: "No AI modules selected.",
        recapDownload: "Download the project brief",
        recapClassic: "Go to classic quote",
      }
      : {
            heroKicker: "Devis rapide",
            heroTitle: "Décris ton site ou ton app mobile",
            heroBody: "Choisis ce que tu veux, coche les options utiles, puis récupère un récap simple pour lancer le devis.",
            heroHome: "Retour à l'accueil",
            heroSteps: "Aller aux étapes",
            heroClassic: "Passer au devis classique",
            timelineStart: "Commence par choisir: site web ou app mobile.",
            timelineDone: "Ton récap est prêt pour le devis.",
            timelineProgress: "Continue pour affiner ton devis.",
            mvpKicker: "Option app mobile",
            mvpTitle: "Décris ton app en quelques points",
            mvpBody:
              "Tu veux tester une idée ? On transforme ce brief en plan simple pour définir les écrans, les fonctions, et la roadmap sur 6 à 8 semaines.",
            mvpPrimary: "Lancer mon brief MVP",
            mvpSecondary: "Planifier un call produit",
            mvpPanelKicker: "Site + MVP",
            mvpPanelTitle: "Un fil conducteur unique",
            mvpPanelBody:
              "On garde ce configurateur pour cadrer identité, pages marketing et options produit. Résultat : un brief cohérent pour marketing, produit et tech.",
            mvpDeliveryLabel: "Livraison estimée",
            mvpDeliveryValue: "6 à 8 semaines",
            mvpFormatLabel: "Format",
            mvpFormatValue: "Landing + MVP interactif",
            step1Kicker: "Étape 1",
            step1Title: "Quel type de site veux-tu lancer ?",
            step1Reset: "Réinitialiser",
            step2Kicker: "Étape 2",
            step2Title: "Affinons la vision et le livrable",
            step2Body: "Chaque bloc décrit le ton, les pages et les livrables inclus.",
            step2Empty: "Sélectionne d'abord un type de site.",
            step3Kicker: "Étape 3",
            step3Title: "Quel style visuel t'inspire ?",
            step3Body: "Chaque mood indique les palettes dominantes et le ressenti global.",
            step4Kicker: "Étape 4",
            step4Title: "Fonctionnalités & intégrations",
            step4Body: "Sélectionne ce dont tu as besoin pour éviter les surprises au devis.",
            step4Reset: "Vider les options",
            step4FeaturesLabel: "Fonctionnalites cles",
            step4IntegrationsLabel: "Integrations",
            step4AiLabel: "Modules IA",
            step4AiBadge: "IA premium",
            step5Kicker: "Étape 5",
            step5Title: "Récapitulatif",
            step5Body: "Ce résumé peut être copié dans le formulaire de devis ou partagé à ton équipe.",
            recapType: "Type",
            recapVision: "Vision",
            recapStyle: "Style",
            recapFeatures: "Fonctionnalités",
            recapIntegrations: "Intégrations",
            recapAiModules: "Modules IA",
            recapNoneFeatures: "Aucune option pour l'instant.",
            recapNoneIntegrations: "Aucune intégration définie.",
            recapNoneAiModules: "Aucun module IA sélectionné.",
            recapDownload: "Télécharger le cahier des charges",
            recapClassic: "Accéder au devis classique",
          };
  const homeHref = prefix || "/";
  const withPrefix = (path: string) => `${prefix}${path}`;
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedIntegrations, setSelectedIntegrations] = useState<string[]>([]);
  const [selectedAiModules, setSelectedAiModules] = useState<string[]>([]);

  const toggleValue = (value: string, setter: ToggleSetter) => {
    setter((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
  };

  const availableStrategies = useMemo(
    () => (selectedType ? strategyMap[selectedType] ?? [] : []),
    [selectedType, strategyMap],
  );

  const summary = useMemo<ConfigSummary>(() => {
    const typeLabel = selectedType ? siteTypes.find((item) => item.id === selectedType)?.title ?? selectedType : "-";
    const strategyLabel = selectedStrategy
      ? availableStrategies.find((item) => item.id === selectedStrategy)?.title ?? selectedStrategy
      : "-";
    const moodLabel = selectedMood ? moodOptions.find((item) => item.id === selectedMood)?.title ?? selectedMood : "-";
    return { type: typeLabel, strategy: strategyLabel, mood: moodLabel };
  }, [selectedType, selectedStrategy, selectedMood, availableStrategies, siteTypes, moodOptions]);

  const selectedFeatureLabels = useMemo(
    () => selectedFeatures.map((featureId) => featureOptions.find((item) => item.id === featureId)?.title ?? featureId),
    [selectedFeatures, featureOptions],
  );

  const selectedIntegrationLabels = useMemo(
    () =>
      selectedIntegrations.map(
        (integrationId) => integrationOptions.find((item) => item.id === integrationId)?.title ?? integrationId,
      ),
    [selectedIntegrations, integrationOptions],
  );
  const selectedAiModuleLabels = useMemo(
    () => selectedAiModules.map((moduleId) => aiModuleOptions.find((item) => item.id === moduleId)?.title ?? moduleId),
    [selectedAiModules, aiModuleOptions],
  );

  const stepStatus = [
    Boolean(selectedType),
    Boolean(selectedStrategy),
    Boolean(selectedMood),
    selectedFeatures.length > 0 || selectedIntegrations.length > 0 || selectedAiModules.length > 0,
  ];
  const completedSteps = stepStatus.filter(Boolean).length;
  const configuratorProgress = stepStatus.length ? completedSteps / stepStatus.length : 0;
  const timelineMessage =
    completedSteps === 0
      ? textCopy.timelineStart
      : completedSteps === stepStatus.length
      ? textCopy.timelineDone
      : textCopy.timelineProgress;

  const isConfiguratorReady = summary.type !== "-" && summary.strategy !== "-" && summary.mood !== "-";

  return (
    <div className="lg:flex lg:items-start lg:gap-10">
      <div className="flex-1 space-y-16">
        <section id="brief-final" className="section-shell space-y-6">
          <Reveal>
            <div className="accent-section">
              <div className="content px-6 py-10">
                <p className="text-sm uppercase tracking-[0.3em] text-white/60">{textCopy.heroKicker}</p>
                <h1 className="mt-4 text-4xl font-semibold text-white">{textCopy.heroTitle}</h1>
                <p className="mt-3 max-w-3xl text-white/70">{textCopy.heroBody}</p>
                <div className="mt-6 flex flex-wrap gap-3 text-sm">
                  <Link
                    href={homeHref}
                    className="rounded-full border border-white/20 px-5 py-2 text-white/80 transition hover:border-white hover:text-white"
                  >
                    {textCopy.heroHome}
                  </Link>
                  <Link
                    href="#etape-1"
                    className="rounded-full border border-white/20 px-5 py-2 text-white/80 transition hover:border-white hover:text-white"
                  >
                    {textCopy.heroSteps}
                  </Link>
                  <Link
                    href={withPrefix("/devis")}
                    className="rounded-full bg-white px-5 py-2 font-semibold text-black transition hover:bg-white/90"
                  >
                    {textCopy.heroClassic}
                  </Link>
                </div>
                <div className="mt-6 flex flex-col gap-4 text-sm text-white/70">
                  <div className="flex flex-wrap gap-2">
                    {stepLabels.map((label, index) => (
                      <span
                        key={label}
                        className={`rounded-full border px-4 py-1 transition ${
                          stepStatus[index] ? "border-white bg-white/20 text-white" : "border-white/20"
                        }`}
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/80">{timelineMessage}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
        <section id="mvp" className="section-shell space-y-8">
          <Reveal>
            <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
              <div className="premium-card rounded-[32px] border border-white/10 bg-white/5 px-6 py-10 text-white">
                <p className="text-sm uppercase tracking-[0.3em] text-white/60">{textCopy.mvpKicker}</p>
                <h2 className="mt-2 text-3xl font-semibold">{textCopy.mvpTitle}</h2>
                <p className="mt-4 text-white/70">{textCopy.mvpBody}</p>
                <ul className="mt-5 space-y-3 text-sm text-white/80">
                  {mvpHighlights[0].bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2">
                      <span className="text-white/40">-</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-3 text-sm">
                  <Link
                    href="#etape-1"
                    className="rounded-full bg-white px-5 py-2 font-semibold text-black transition hover:bg-white/90"
                  >
                    {textCopy.mvpPrimary}
                  </Link>
                  <Link
                    href={withPrefix("/devis")}
                    className="rounded-full border border-white/30 px-5 py-2 text-white/80 transition hover:border-white hover:text-white"
                  >
                    {textCopy.mvpSecondary}
                  </Link>
                </div>
              </div>
              <div className="premium-card rounded-[32px] border border-white/10 bg-gradient-to-br from-white/10 to-white/0 px-6 py-8 text-white/80">
                <p className="text-xs uppercase tracking-[0.4em] text-white/60">{textCopy.mvpPanelKicker}</p>
                <h3 className="mt-3 text-2xl font-semibold text-white">{textCopy.mvpPanelTitle}</h3>
                <p className="mt-3">{textCopy.mvpPanelBody}</p>
                <div className="mt-5 grid gap-4 text-sm text-white">
                  <div className="rounded-2xl border border-white/20 bg-black/30 p-4">
                    <p className="text-white/60">{textCopy.mvpDeliveryLabel}</p>
                    <p className="text-2xl font-semibold text-white">{textCopy.mvpDeliveryValue}</p>
                  </div>
                  <div className="rounded-2xl border border-white/20 bg-black/30 p-4">
                    <p className="text-white/60">{textCopy.mvpFormatLabel}</p>
                    <p className="text-2xl font-semibold text-white">{textCopy.mvpFormatValue}</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {mvpHighlights.map((item) => (
                <div key={item.title} className="premium-card rounded-3xl border border-white/10 bg-white/5 p-6 text-white">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="mt-2 text-white/70">{item.description}</p>
                  <ul className="mt-4 space-y-2 text-sm text-white/80">
                    {item.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2">
                        <span className="text-white/40">-</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </section>
        <section id="etape-1" className="section-shell space-y-6">
          <Reveal>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-white/60">{textCopy.step1Kicker}</p>
                <h2 className="mt-2 text-3xl font-semibold text-white">{textCopy.step1Title}</h2>
              </div>
              {selectedType && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedType(null);
                    setSelectedStrategy(null);
                  }}
                  className="text-sm text-white/60 hover:text-white"
                >
                  {textCopy.step1Reset}
                </button>
              )}
            </div>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2">
            {siteTypes.map((type) => {
              const isActive = selectedType === type.id;
              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => {
                    setSelectedType(type.id);
                    setSelectedStrategy(null);
                  }}
                  className={`premium-card rounded-3xl border border-white/15 bg-white/5 p-6 text-left transition ${
                    isActive ? "border-white bg-white/10 shadow-lg glow-card" : "opacity-80 hover:opacity-100 hover:bg-white/5"
                  }`}
                >
                  <p className="text-xl font-semibold text-white">{type.title}</p>
                  <p className="mt-2 text-white/70">{type.summary}</p>
                  <ul className="mt-4 space-y-1 text-sm text-white/60">
                    {type.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/50" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </button>
              );
            })}
          </div>
        </section>

        <section id="etape-2" className="section-shell space-y-6">
          <Reveal>
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-white/60">{textCopy.step2Kicker}</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">{textCopy.step2Title}</h2>
              <p className="mt-2 max-w-3xl text-white/70">{textCopy.step2Body}</p>
            </div>
          </Reveal>
          {!selectedType && (
            <div className="premium-card rounded-3xl border border-dashed border-white/20 bg-black/30 p-6 text-white/60">
              {textCopy.step2Empty}
            </div>
          )}
          {selectedType && (
            <div className="grid gap-5 md:grid-cols-3">
              {availableStrategies.map((strategy) => {
                const isActive = selectedStrategy === strategy.id;
                return (
                  <button
                    key={strategy.id}
                    type="button"
                    onClick={() => setSelectedStrategy(strategy.id)}
                    className={`premium-card rounded-3xl border border-white/15 bg-white/5 p-6 text-left transition ${
                      isActive ? "border-white bg-white/10 shadow-lg glow-card" : "opacity-70 hover:opacity-100 hover:bg-white/5"
                    }`}
                  >
                    <p className="text-lg font-semibold text-white">{strategy.title}</p>
                    <p className="mt-2 text-white/70">{strategy.summary}</p>
                    <ul className="mt-3 space-y-1 text-sm text-white/60">
                      {strategy.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/50" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </button>
                );
              })}
            </div>
          )}
        </section>
        <section id="etape-3" className="section-shell space-y-6">
          <Reveal>
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-white/60">{textCopy.step3Kicker}</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">{textCopy.step3Title}</h2>
              <p className="mt-2 max-w-3xl text-white/70">{textCopy.step3Body}</p>
            </div>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2">
            {moodOptions.map((mood) => {
              const isActive = selectedMood === mood.id;
              return (
                <button
                  key={mood.id}
                  type="button"
                  onClick={() => setSelectedMood(mood.id)}
                  className={`premium-card rounded-3xl border border-white/15 bg-white/5 p-6 text-left transition ${
                    isActive ? "border-white bg-white/10 shadow-lg glow-card" : "opacity-80 hover:opacity-100 hover:bg-white/5"
                  }`}
                >
                  <p className="text-xl font-semibold text-white">{mood.title}</p>
                  <p className="mt-1 text-sm uppercase tracking-[0.2em] text-white/50">{mood.palette}</p>
                  <p className="mt-3 text-white/70">{mood.description}</p>
                </button>
              );
            })}
          </div>
        </section>

        <section id="etape-4" className="section-shell space-y-6">
          <Reveal>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-white/60">{textCopy.step4Kicker}</p>
                <h2 className="mt-2 text-3xl font-semibold text-white">{textCopy.step4Title}</h2>
                <p className="mt-2 max-w-2xl text-white/70">{textCopy.step4Body}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedFeatures([]);
                  setSelectedIntegrations([]);
                  setSelectedAiModules([]);
                }}
                className="text-sm text-white/60 hover:text-white"
              >
                {textCopy.step4Reset}
              </button>
            </div>
          </Reveal>
          <div className="grid gap-5 lg:grid-cols-3">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-white/50">{textCopy.step4FeaturesLabel}</p>
              {featureOptions.map((feature) => {
                const isActive = selectedFeatures.includes(feature.id);
                return (
                  <button
                    key={feature.id}
                    type="button"
                    onClick={() => toggleValue(feature.id, setSelectedFeatures)}
                    className={`premium-card rounded-3xl border border-white/15 bg-white/5 p-6 text-left transition ${
                      isActive ? "border-white bg-white/10 shadow-lg glow-card" : "opacity-70 hover:opacity-100 hover:bg-white/5"
                    }`}
                  >
                    <p className="text-lg font-semibold text-white">{feature.title}</p>
                    <p className="mt-2 text-white/70">{feature.description}</p>
                  </button>
                );
              })}
            </div>
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-white/50">{textCopy.step4IntegrationsLabel}</p>
              {integrationOptions.map((integration) => {
                const isActive = selectedIntegrations.includes(integration.id);
                return (
                  <button
                    key={integration.id}
                    type="button"
                    onClick={() => toggleValue(integration.id, setSelectedIntegrations)}
                    className={`premium-card rounded-3xl border border-white/15 bg-white/5 p-6 text-left transition ${
                      isActive ? "border-white bg-white/10 shadow-lg glow-card" : "opacity-70 hover:opacity-100 hover:bg-white/5"
                    }`}
                  >
                    <p className="text-lg font-semibold text-white">{integration.title}</p>
                    <p className="mt-2 text-white/70">{integration.description}</p>
                  </button>
                );
              })}
            </div>
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-white/50">{textCopy.step4AiLabel}</p>
              {aiModuleOptions.map((module) => {
                const isActive = selectedAiModules.includes(module.id);
                return (
                  <button
                    key={module.id}
                    type="button"
                    onClick={() => toggleValue(module.id, setSelectedAiModules)}
                    className={`premium-card group relative overflow-hidden rounded-3xl border border-amber-200/30 bg-gradient-to-br from-amber-500/10 via-white/5 to-transparent p-6 text-left transition ${
                      isActive
                        ? "border-amber-200/70 bg-white/10 shadow-[0_20px_60px_rgba(214,179,106,0.25)] glow-card"
                        : "opacity-80 hover:opacity-100 hover:border-amber-200/50"
                    }`}
                  >
                    <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(214,179,106,0.25),transparent_55%)] opacity-0 transition duration-500 group-hover:opacity-100" />
                    <div className="relative space-y-3">
                      <div className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.3em] text-amber-100/80">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
                        {textCopy.step4AiBadge}
                      </div>
                      <p className="text-lg font-semibold text-white">{module.title}</p>
                      <p className="text-white/70">{module.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
        <section id="etape-5" className="section-shell space-y-6">
          <Reveal>
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-white/60">{textCopy.step5Kicker}</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">{textCopy.step5Title}</h2>
              <p className="mt-2 max-w-3xl text-white/70">{textCopy.step5Body}</p>
            </div>
          </Reveal>
          <div className="premium-card rounded-3xl border border-white/10 bg-white/5 p-6 text-white">
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">{textCopy.recapType}</p>
                <p className="mt-2 text-xl font-semibold">{summary.type}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">{textCopy.recapVision}</p>
                <p className="mt-2 text-xl font-semibold">{summary.strategy}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">{textCopy.recapStyle}</p>
                <p className="mt-2 text-xl font-semibold">{summary.mood}</p>
              </div>
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">{textCopy.recapFeatures}</p>
                <ul className="mt-3 space-y-2 text-white/80">
                  {selectedFeatures.length === 0 && <li>{textCopy.recapNoneFeatures}</li>}
                  {selectedFeatures.map((featureId) => {
                    const option = featureOptions.find((item) => item.id === featureId);
                    return option ? <li key={featureId}>- {option.title}</li> : null;
                  })}
                </ul>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">{textCopy.recapIntegrations}</p>
                <ul className="mt-3 space-y-2 text-white/80">
                  {selectedIntegrations.length === 0 && <li>{textCopy.recapNoneIntegrations}</li>}
                  {selectedIntegrations.map((integrationId) => {
                    const option = integrationOptions.find((item) => item.id === integrationId);
                    return option ? <li key={integrationId}>- {option.title}</li> : null;
                  })}
                </ul>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">{textCopy.recapAiModules}</p>
                <ul className="mt-3 space-y-2 text-white/80">
                  {selectedAiModules.length === 0 && <li>{textCopy.recapNoneAiModules}</li>}
                  {selectedAiModules.map((moduleId) => {
                    const option = aiModuleOptions.find((item) => item.id === moduleId);
                    return option ? <li key={moduleId}>- {option.title}</li> : null;
                  })}
                </ul>
              </div>
            </div>
            <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
              <div className="space-y-4">
                <ConfiguratorFinalForm
                  summary={summary}
                  features={selectedFeatureLabels}
                  integrations={selectedIntegrationLabels}
                  aiModules={selectedAiModuleLabels}
                  ready={isConfiguratorReady}
                />
                <div className="flex flex-wrap gap-3 text-sm">
                  <a
                    href={pdfHref}
                    target="_blank"
                    rel="noreferrer"
                    download
                    className="rounded-full border border-white/40 px-5 py-2 text-white/80 transition hover:border-white hover:text-white"
                  >
                    {textCopy.recapDownload}
                  </a>
                  <Link
                    href={withPrefix("/devis")}
                    className="rounded-full border border-white/20 px-5 py-2 text-white/70 transition hover:border-white hover:text-white"
                  >
                    {textCopy.recapClassic}
                  </Link>
                </div>
              </div>
              <div className="premium-card rounded-3xl border border-white/10 bg-white/5 p-4">
                <ConfiguratorPreview
                  summary={summary}
                  features={selectedFeatureLabels}
                  integrations={selectedIntegrationLabels}
                  aiModules={selectedAiModuleLabels}
                  ready={isConfiguratorReady}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="sticky top-32 hidden lg:block lg:w-72">
        <StickyTimelineIndicator sections={configuratorSections} progressOverride={configuratorProgress} />
      </div>
    </div>
  );
}
