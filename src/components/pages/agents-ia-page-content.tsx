"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiArrowRight, FiCheck, FiMail, FiHeadphones, FiFileText,
  FiStar, FiZap, FiUsers, FiTrendingUp, FiClock, FiShield,
  FiChevronDown, FiChevronUp, FiX,
} from "react-icons/fi";
import { useState, useRef } from "react";
import type { Locale } from "@/lib/locales";
import { withLocalePrefix } from "@/lib/locales";

type Props = { locale: Locale };

const WHATSAPP_URL = "https://wa.me/33759558414?text=Bonjour%20KAH%20Digital%2C%20je%20veux%20une%20d%C3%A9mo%20de%20votre%20agent%20IA";
const DEVIS_URL = "/devis";

const COPY = {
  fr: {
    eyebrow: "Agents IA sur mesure · KAH Digital",
    title: "Des agents IA qui travaillent",
    titleAccent: "pendant que vous dormez.",
    intro: "KAH Digital conçoit des agents IA packagés, opérationnels en 10 jours. Prospection, support, devis, casting — chaque agent est formé sur votre métier et livré avec le code source. Preuve que ça marche en production : KAH Workforce, notre agent vertical sur-mesure pour artistes indépendants. Résultats mesurables dès J+30 ou on corrige gratuitement.",
    cta: "Réserver ma démo gratuite",
    ctaSub: "Réponse sous 2h · Sans engagement · Démo sur votre cas concret",
    ctaSecondary: "Voir les tarifs",
    stats: [
      { value: "120", unit: "", label: "contacts ciblés/jour" },
      { value: "70", unit: "%", label: "tickets résolus sans humain" },
      { value: "30", unit: "s", label: "pour générer un devis" },
      { value: "10", unit: "j", label: "pour être en production" },
    ],
    beforeAfterTitle: "Avant / Après un agent KAH Digital",
    beforeAfterSub: "Ce que ça change concrètement dans votre quotidien",
    beforeAfter: [
      { before: "3h/jour à envoyer des emails de prospection", after: "120 contacts ciblés envoyés automatiquement, chaque matin" },
      { before: "Clients qui attendent 24h une réponse support", after: "Réponse en < 5 secondes, 24h/24, 7j/7" },
      { before: "Devis préparés à la main, envoyés le lendemain", after: "Devis généré et envoyé en 30 secondes, la nuit incluse" },
      { before: "Des heures à trier des profils de casting", after: "Les 5 meilleurs profils proposés en moins d'une minute" },
    ],
    agentsTitle: "Les 4 agents KAH Digital",
    agentsSub: "Chaque agent est un produit packagé avec code source, documentation et formation. Pas un projet sur-mesure de 6 mois.",
    agents: [
      {
        icon: FiMail,
        accent: "#3b82f6",
        accentBg: "#3b82f610",
        badge: "Prospection",
        name: "Agent Prospection",
        tagline: "120 contacts ciblés par jour, en automatique.",
        desc: "L'agent identifie vos prospects idéaux, rédige des messages personnalisés selon leur secteur, envoie, relance J+3 et J+7, et vous livre uniquement les réponses positives. Zéro prospection manuelle.",
        metrics: ["120 envois/jour", "Relances J+3 et J+7", "Réponses filtrées"],
        roi: "+8 RDV qualifiés/mois en moyenne",
        price: "490€",
        forWho: "Freelances, agences, commerciaux",
      },
      {
        icon: FiHeadphones,
        accent: "#10b981",
        accentBg: "#10b98110",
        badge: "Support",
        name: "Agent Support",
        tagline: "70% des tickets résolus sans intervention humaine.",
        desc: "Chatbot formé sur votre base de connaissance. Répond instantanément 24/7, escalade proprement vers votre équipe si besoin. Compatible Slack, WhatsApp, site web, widget.",
        metrics: ["Réponse < 5 secondes", "Escalade automatique", "Base de connaissance sur mesure"],
        roi: "-65% de charge support en moyenne",
        price: "1 690€",
        forWho: "E-commerce, SaaS, services",
      },
      {
        icon: FiFileText,
        accent: "#8b5cf6",
        accentBg: "#8b5cf610",
        badge: "Devis",
        name: "Agent Devis",
        tagline: "Un devis structuré en 30 secondes, 24h/24.",
        desc: "Le prospect remplit un formulaire intelligent. L'agent analyse la demande, génère un devis professionnel et l'envoie par email en moins d'une minute. Vous validez, vous signez.",
        metrics: ["Devis en 30 secondes", "Envoi automatique", "Format signable"],
        roi: "+40% de devis envoyés sans effort supplémentaire",
        price: "690€",
        forWho: "Artisans, agences, prestataires",
      },
      {
        icon: FiStar,
        accent: "#f59e0b",
        accentBg: "#f59e0b10",
        badge: "Casting",
        name: "Agent Castly",
        tagline: "Le bon talent trouvé en quelques secondes.",
        desc: "Pour les créatifs, labels et marques : l'agent analyse votre brief de casting, parcourt la base d'artistes et vous propose les 5 meilleurs profils avec scoring automatique. Fini les heures de tri.",
        metrics: ["Matching IA instantané", "Scoring multi-critères", "Brief → profils en < 1 min"],
        roi: "-80% du temps de présélection",
        price: "1 490€",
        forWho: "Labels, agences créatives, marques",
      },
    ],
    howTitle: "De zéro à un agent en production en 10 jours",
    steps: [
      { num: "01", title: "Démo gratuite — 20 min", desc: "On comprend votre besoin, on vous montre l'agent en action sur un cas réel similaire au vôtre. Sans engagement.", icon: FiZap },
      { num: "02", title: "Configuration & formation — 5 jours", desc: "On paramètre l'agent sur votre métier, vos données, votre ton. Tests en conditions réelles, ajustements jusqu'à satisfaction.", icon: FiShield },
      { num: "03", title: "Mise en production — J+10", desc: "L'agent tourne en autonomie. Reporting hebdomadaire inclus. On reste disponibles pour les ajustements le premier mois.", icon: FiTrendingUp },
    ],
    whyTitle: "Pourquoi KAH Digital plutôt qu'une autre agence IA ?",
    whyPoints: [
      { title: "Opérationnel en 10 jours", desc: "Pas 3 mois de workshop et de consulting. L'agent est en prod en 10 jours ou remboursé." },
      { title: "Prix fixe et transparent", desc: "490€ à 1 490€ selon l'agent. Pas d'abonnement caché, pas de coût par requête. Vous payez une fois." },
      { title: "Code source livré", desc: "Vous possédez l'agent à 100%. Aucune dépendance à notre plateforme. Vous pouvez le modifier ou le confier à un autre prestataire." },
      { title: "ROI mesurable à J+30", desc: "On définit ensemble des métriques avant de commencer. Si les objectifs ne sont pas atteints à J+30, on corrige gratuitement." },
      { title: "Support fondateur direct", desc: "Pas un account manager junior. Le fondateur répond dans les 2h, Slack ou WhatsApp, pendant tout le premier mois." },
      { title: "Intégration à vos outils existants", desc: "CRM, Slack, WhatsApp, email, site web — l'agent s'adapte à votre stack, pas l'inverse." },
    ],
    testimonialsTitle: "Ce que disent nos clients",
    testimonials: [
      { quote: "On a économisé 15h/semaine sur le support client. L'agent répond mieux que ce qu'on faisait à la main.", name: "M. A.", role: "Fondateur SaaS, Paris" },
      { quote: "120 emails de prospection envoyés chaque matin sans rien faire. 6 RDV qualifiés la première semaine.", name: "T. K.", role: "Commercial indépendant, Lyon" },
      { quote: "Nos devis partent en 30 secondes maintenant. Avant on perdait des clients parce qu'on répondait le lendemain.", name: "S. B.", role: "Architecte d'intérieur, Lausanne" },
    ],
    faqTitle: "Questions fréquentes",
    faq: [
      { q: "Est-ce que je dois avoir des compétences techniques ?", a: "Non. On s'occupe de tout : développement, intégration, formation. Vous recevez un agent clé en main avec la documentation. Aucune compétence technique requise de votre côté." },
      { q: "Que se passe-t-il si ça ne fonctionne pas comme prévu ?", a: "On définit ensemble des métriques avant de commencer. Si les objectifs ne sont pas atteints à J+30, on corrige gratuitement jusqu'à ce que ça marche. C'est notre engagement." },
      { q: "Combien ça coûte vraiment, tout inclus ?", a: "Le prix affiché est le prix final. Pas d'abonnement mensuel, pas de coût par requête, pas de frais cachés. Vous payez une seule fois et l'agent est à vous." },
      { q: "L'agent peut-il s'intégrer à mes outils existants ?", a: "Oui. On s'intègre à votre CRM, Slack, WhatsApp, email, Notion, ou n'importe quel outil avec une API. On évalue ça lors de la démo." },
      { q: "Est-ce que je garde le contrôle sur ce que l'agent dit ?", a: "Complètement. Vous validez tous les scripts et réponses avant la mise en production. L'agent ne peut répondre qu'avec ce que vous avez approuvé." },
      { q: "Dans combien de temps je vois un retour sur investissement ?", a: "La plupart de nos clients voient un ROI positif en 3 à 6 semaines. On mesure ensemble dès J+7 et on ajuste si besoin." },
    ],
    ctaFinalTitle: "Votre premier agent IA en 10 jours.",
    ctaFinalBody: "Démo gratuite de 20 min — on vous montre l'agent en action sur votre cas concret. Aucun engagement, aucune carte bancaire.",
    ctaFinal: "Réserver ma démo gratuite",
    ctaFinalSecondary: "Envoyer un message WhatsApp",
    ctaFinalSub: "Réponse sous 2h · Démo en visio ou présentiel · CH / FR / BE",
  },
  en: {
    eyebrow: "Custom AI Agents · KAH Digital",
    title: "AI agents that work",
    titleAccent: "while you sleep.",
    intro: "KAH Digital builds packaged AI agents, live in 10 days. Prospecting, support, quotes, casting — each agent is trained on your business and delivered with full source code. Live proof it works: KAH Workforce, our custom vertical agent for independent artists. Measurable results by D+30 or we fix it for free.",
    cta: "Book my free demo",
    ctaSub: "Reply within 2h · No commitment · Demo on your specific case",
    ctaSecondary: "See pricing",
    stats: [
      { value: "120", unit: "", label: "targeted contacts/day" },
      { value: "70", unit: "%", label: "tickets resolved without humans" },
      { value: "30", unit: "s", label: "to generate a quote" },
      { value: "10", unit: "d", label: "to go live" },
    ],
    beforeAfterTitle: "Before / After a KAH Digital agent",
    beforeAfterSub: "What concretely changes in your day-to-day",
    beforeAfter: [
      { before: "3h/day sending prospecting emails", after: "120 targeted contacts sent automatically, every morning" },
      { before: "Customers waiting 24h for a support reply", after: "Answer in < 5 seconds, 24/7" },
      { before: "Quotes prepared by hand, sent the next day", after: "Quote generated and sent in 30 seconds, nights included" },
      { before: "Hours sorting through casting profiles", after: "Top 5 profiles suggested in under a minute" },
    ],
    agentsTitle: "The 4 KAH Digital agents",
    agentsSub: "Each agent is a packaged product with source code, documentation and training. Not a 6-month bespoke project.",
    agents: [
      {
        icon: FiMail, accent: "#3b82f6", accentBg: "#3b82f610", badge: "Prospecting",
        name: "Prospecting Agent", tagline: "120 targeted contacts per day, on autopilot.",
        desc: "The agent identifies your ideal prospects, writes personalised messages per sector, sends, follows up D+3 and D+7, and delivers only positive replies to you. Zero manual prospecting.",
        metrics: ["120 sends/day", "D+3 and D+7 follow-ups", "Filtered replies only"],
        roi: "+8 qualified meetings/month on average", price: "€490", forWho: "Freelancers, agencies, sales reps",
      },
      {
        icon: FiHeadphones, accent: "#10b981", accentBg: "#10b98110", badge: "Support",
        name: "Support Agent", tagline: "70% of tickets resolved without human intervention.",
        desc: "Chatbot trained on your knowledge base. Answers instantly 24/7, escalates cleanly to your team when needed. Compatible with Slack, WhatsApp, website, widget.",
        metrics: ["Response < 5 seconds", "Automatic escalation", "Custom knowledge base"],
        roi: "-65% support load on average", price: "€1 690", forWho: "E-commerce, SaaS, services",
      },
      {
        icon: FiFileText, accent: "#8b5cf6", accentBg: "#8b5cf610", badge: "Quotes",
        name: "Quote Agent", tagline: "A structured quote in 30 seconds, round the clock.",
        desc: "The prospect fills in a smart form. The agent analyses the request, generates a professional quote and sends it by email in under a minute. You approve, you sign.",
        metrics: ["Quote in 30 seconds", "Automatic sending", "Signable format"],
        roi: "+40% more quotes sent without extra effort", price: "€690", forWho: "Tradespeople, agencies, service providers",
      },
      {
        icon: FiStar, accent: "#f59e0b", accentBg: "#f59e0b10", badge: "Casting",
        name: "Castly Agent", tagline: "The right talent found in seconds.",
        desc: "For creatives, labels and brands: the agent analyses your casting brief, scans the artist database and proposes the 5 best profiles with automatic scoring. No more hours of sorting.",
        metrics: ["Instant AI matching", "Multi-criteria scoring", "Brief → profiles in < 1 min"],
        roi: "-80% pre-selection time", price: "€1,490", forWho: "Labels, creative agencies, brands",
      },
    ],
    howTitle: "From zero to a live agent in 10 days",
    steps: [
      { num: "01", title: "Free demo — 20 min", desc: "We understand your need and show the agent in action on a real case similar to yours. No commitment.", icon: FiZap },
      { num: "02", title: "Setup & training — 5 days", desc: "We configure the agent for your business, your data, your tone. Real-condition tests, adjustments until satisfied.", icon: FiShield },
      { num: "03", title: "Go live — D+10", desc: "The agent runs autonomously. Weekly reporting included. We stay available for adjustments during the first month.", icon: FiTrendingUp },
    ],
    whyTitle: "Why KAH Digital over any other AI agency?",
    whyPoints: [
      { title: "Live in 10 days", desc: "Not 3 months of workshops and consulting. The agent is live in 10 days or you get your money back." },
      { title: "Fixed and transparent price", desc: "€490 to €1,490 depending on the agent. No hidden subscription, no per-request cost. You pay once." },
      { title: "Source code delivered", desc: "You own the agent 100%. No dependency on our platform. You can modify it or hand it to another developer." },
      { title: "Measurable ROI at D+30", desc: "We define metrics together before starting. If targets aren't hit by D+30, we fix it for free." },
      { title: "Direct founder support", desc: "Not a junior account manager. The founder replies within 2h, Slack or WhatsApp, throughout the first month." },
      { title: "Integration with your existing tools", desc: "CRM, Slack, WhatsApp, email, website — the agent adapts to your stack, not the other way around." },
    ],
    testimonialsTitle: "What our clients say",
    testimonials: [
      { quote: "We saved 15h/week on customer support. The agent answers better than what we used to do manually.", name: "M. A.", role: "SaaS Founder, Paris" },
      { quote: "120 prospecting emails sent every morning without doing anything. 6 qualified meetings the first week.", name: "T. K.", role: "Independent sales rep, Lyon" },
      { quote: "Our quotes go out in 30 seconds now. Before we were losing clients because we replied the next day.", name: "S. B.", role: "Interior designer, Lausanne" },
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      { q: "Do I need technical skills?", a: "No. We handle everything: development, integration, training. You receive a turnkey agent with documentation. No technical skills required on your end." },
      { q: "What happens if it doesn't work as expected?", a: "We define metrics together before starting. If targets aren't hit by D+30, we fix it for free until it works. That's our commitment." },
      { q: "What does it really cost, all in?", a: "The listed price is the final price. No monthly subscription, no per-request cost, no hidden fees. You pay once and the agent is yours." },
      { q: "Can the agent integrate with my existing tools?", a: "Yes. We integrate with your CRM, Slack, WhatsApp, email, Notion, or any tool with an API. We assess this during the demo." },
      { q: "Do I keep control over what the agent says?", a: "Completely. You approve all scripts and responses before go-live. The agent can only respond with what you've approved." },
      { q: "How quickly will I see a return on investment?", a: "Most of our clients see a positive ROI within 3 to 6 weeks. We measure together from D+7 and adjust if needed." },
    ],
    ctaFinalTitle: "Your first AI agent in 10 days.",
    ctaFinalBody: "Free 20-min demo — we show the agent in action on your specific case. No commitment, no credit card.",
    ctaFinal: "Book my free demo",
    ctaFinalSecondary: "Message us on WhatsApp",
    ctaFinalSub: "Reply within 2h · Demo via video call or in person · CH / FR / BE",
  },
  de: {
    eyebrow: "Individuelle KI-Agenten · KAH Digital",
    title: "KI-Agenten, die arbeiten,",
    titleAccent: "während Sie schlafen.",
    intro: "KAH Digital entwickelt fertige KI-Agenten, die in 10 Tagen live gehen. Akquise, Support, Angebote, Casting — jeder Agent wird auf Ihr Geschäft trainiert und mit vollständigem Quellcode geliefert. Live-Beweis, dass es funktioniert: KAH Workforce, unser massgeschneiderter vertikaler Agent für unabhängige Künstler. Messbare Ergebnisse bis T+30 oder wir korrigieren kostenlos.",
    cta: "Kostenlose Demo buchen",
    ctaSub: "Antwort in 2h · Unverbindlich · Demo zu Ihrem konkreten Fall",
    ctaSecondary: "Preise ansehen",
    stats: [
      { value: "120", unit: "", label: "Zielkontakte/Tag" },
      { value: "70", unit: "%", label: "Tickets ohne Mensch gelöst" },
      { value: "30", unit: "s", label: "für ein Angebot" },
      { value: "10", unit: "T", label: "bis Go Live" },
    ],
    beforeAfterTitle: "Vor / Nach einem KAH Digital Agenten",
    beforeAfterSub: "Was sich konkret in Ihrem Alltag ändert",
    beforeAfter: [
      { before: "3h/Tag E-Mails für die Akquise schreiben", after: "120 zielgerichtete Kontakte automatisch jeden Morgen versendet" },
      { before: "Kunden warten 24h auf eine Support-Antwort", after: "Antwort in < 5 Sekunden, 24/7" },
      { before: "Angebote manuell erstellt, am nächsten Tag gesendet", after: "Angebot in 30 Sekunden erstellt und gesendet, auch nachts" },
      { before: "Stunden damit verbringen, Casting-Profile zu sortieren", after: "Top 5 Profile in weniger als einer Minute vorgeschlagen" },
    ],
    agentsTitle: "Die 4 KAH Digital Agenten",
    agentsSub: "Jeder Agent ist ein Fertigprodukt mit Quellcode, Dokumentation und Schulung. Kein 6-monatiges Individualprojekt.",
    agents: [
      {
        icon: FiMail, accent: "#3b82f6", accentBg: "#3b82f610", badge: "Akquise",
        name: "Akquise-Agent", tagline: "120 zielgerichtete Kontakte pro Tag, automatisch.",
        desc: "Der Agent identifiziert Ihre Wunschkunden, schreibt personalisierte Nachrichten je Branche, sendet, followt T+3 und T+7 nach und liefert Ihnen nur positive Antworten. Null manuelle Akquise.",
        metrics: ["120 Versendungen/Tag", "Nachfassen T+3 und T+7", "Gefilterte Antworten"],
        roi: "+8 qualifizierte Termine/Monat im Schnitt", price: "490€", forWho: "Freelancer, Agenturen, Vertrieb",
      },
      {
        icon: FiHeadphones, accent: "#10b981", accentBg: "#10b98110", badge: "Support",
        name: "Support-Agent", tagline: "70% der Tickets ohne menschliche Intervention gelöst.",
        desc: "Chatbot auf Ihrer Wissensbasis trainiert. Antwortet sofort 24/7, eskaliert sauber zu Ihrem Team bei Bedarf. Kompatibel mit Slack, WhatsApp, Website, Widget.",
        metrics: ["Antwort < 5 Sekunden", "Automatische Eskalation", "Individuelle Wissensbasis"],
        roi: "-65% Support-Aufwand im Schnitt", price: "1 690€", forWho: "E-Commerce, SaaS, Dienstleistungen",
      },
      {
        icon: FiFileText, accent: "#8b5cf6", accentBg: "#8b5cf610", badge: "Angebote",
        name: "Angebots-Agent", tagline: "Ein strukturiertes Angebot in 30 Sekunden, rund um die Uhr.",
        desc: "Der Interessent füllt ein intelligentes Formular aus. Der Agent analysiert die Anfrage, erstellt ein professionelles Angebot und sendet es per E-Mail in unter einer Minute.",
        metrics: ["Angebot in 30 Sekunden", "Automatischer Versand", "Unterzeichenbares Format"],
        roi: "+40% mehr Angebote ohne Mehraufwand", price: "690€", forWho: "Handwerker, Agenturen, Dienstleister",
      },
      {
        icon: FiStar, accent: "#f59e0b", accentBg: "#f59e0b10", badge: "Casting",
        name: "Castly-Agent", tagline: "Das richtige Talent in Sekunden gefunden.",
        desc: "Für Kreative, Labels und Marken: Der Agent analysiert Ihr Casting-Brief, durchsucht die Datenbank und schlägt die 5 besten Profile mit automatischem Scoring vor.",
        metrics: ["Sofortiges KI-Matching", "Multi-Kriterien-Scoring", "Brief → Profile in < 1 Min"],
        roi: "-80% der Vorauswahlzeit", price: "1.490€", forWho: "Labels, Kreativagenturen, Marken",
      },
    ],
    howTitle: "Von null zum Live-Agenten in 10 Tagen",
    steps: [
      { num: "01", title: "Kostenlose Demo — 20 Min", desc: "Wir verstehen Ihren Bedarf und zeigen den Agenten in Aktion an einem echten Fall ähnlich Ihrem. Unverbindlich.", icon: FiZap },
      { num: "02", title: "Konfiguration & Training — 5 Tage", desc: "Wir konfigurieren den Agenten für Ihr Geschäft, Ihre Daten, Ihren Ton. Tests unter realen Bedingungen.", icon: FiShield },
      { num: "03", title: "Go Live — T+10", desc: "Der Agent läuft autonom. Wöchentliches Reporting inklusive. Wir bleiben im ersten Monat für Anpassungen erreichbar.", icon: FiTrendingUp },
    ],
    whyTitle: "Warum KAH Digital statt einer anderen KI-Agentur?",
    whyPoints: [
      { title: "Live in 10 Tagen", desc: "Nicht 3 Monate Workshops. Der Agent ist in 10 Tagen live oder Sie erhalten Ihr Geld zurück." },
      { title: "Fester und transparenter Preis", desc: "490€ bis 1.490€ je nach Agent. Kein verstecktes Abo, keine Kosten pro Anfrage. Einmalige Zahlung." },
      { title: "Quellcode geliefert", desc: "Sie besitzen den Agenten zu 100%. Keine Abhängigkeit von unserer Plattform." },
      { title: "Messbarer ROI an T+30", desc: "Wir definieren vor dem Start gemeinsam Metriken. Wenn die Ziele nicht erreicht werden, korrigieren wir kostenlos." },
      { title: "Direkter Support vom Gründer", desc: "Kein Junior-Account-Manager. Der Gründer antwortet in 2h, Slack oder WhatsApp, den ganzen ersten Monat." },
      { title: "Integration in bestehende Tools", desc: "CRM, Slack, WhatsApp, E-Mail, Website — der Agent passt sich Ihrem Stack an." },
    ],
    testimonialsTitle: "Was unsere Kunden sagen",
    testimonials: [
      { quote: "Wir haben 15h/Woche im Kundensupport gespart. Der Agent antwortet besser als wir manuell.", name: "M. A.", role: "SaaS-Gründer, Paris" },
      { quote: "120 Akquise-E-Mails jeden Morgen automatisch. 6 qualifizierte Termine in der ersten Woche.", name: "T. K.", role: "Selbstständiger Vertrieb, Lyon" },
      { quote: "Unsere Angebote gehen jetzt in 30 Sekunden raus. Vorher haben wir Kunden verloren, weil wir am nächsten Tag geantwortet haben.", name: "S. B.", role: "Innenarchitektin, Lausanne" },
    ],
    faqTitle: "Häufig gestellte Fragen",
    faq: [
      { q: "Brauche ich technische Kenntnisse?", a: "Nein. Wir kümmern uns um alles: Entwicklung, Integration, Schulung. Sie erhalten einen schlüsselfertigen Agenten mit Dokumentation." },
      { q: "Was passiert, wenn es nicht wie erwartet funktioniert?", a: "Wir definieren vor dem Start gemeinsam Metriken. Wenn die Ziele bis T+30 nicht erreicht werden, korrigieren wir kostenlos." },
      { q: "Was kostet es wirklich, alles inklusive?", a: "Der angegebene Preis ist der Endpreis. Kein Monatsabo, keine Kosten pro Anfrage, keine versteckten Gebühren." },
      { q: "Kann der Agent in meine bestehenden Tools integriert werden?", a: "Ja. Wir integrieren in Ihr CRM, Slack, WhatsApp, E-Mail, Notion oder jedes Tool mit einer API." },
      { q: "Behalte ich die Kontrolle über das, was der Agent sagt?", a: "Vollständig. Sie genehmigen alle Skripte und Antworten vor dem Go-Live." },
      { q: "Wie schnell sehe ich eine Kapitalrendite?", a: "Die meisten unserer Kunden sehen eine positive ROI innerhalb von 3 bis 6 Wochen." },
    ],
    ctaFinalTitle: "Ihr erster KI-Agent in 10 Tagen.",
    ctaFinalBody: "Kostenlose 20-Min-Demo — wir zeigen den Agenten in Aktion auf Ihren konkreten Fall. Kein Engagement, keine Kreditkarte.",
    ctaFinal: "Kostenlose Demo buchen",
    ctaFinalSecondary: "WhatsApp-Nachricht senden",
    ctaFinalSub: "Antwort in 2h · Demo per Video oder persönlich · CH / FR / BE",
  },
};

const FORM_COPY = {
  fr: {
    title: "Parlez-nous de votre projet",
    sub: "On vous répond sous 2h avec une proposition adaptée à votre cas.",
    name: "Votre prénom ou nom d'entreprise",
    email: "Votre email",
    agent: "Quel agent vous intéresse ?",
    agentOptions: ["Prospection automatique", "Support client IA", "Devis automatique", "Casting IA", "Je ne sais pas encore"],
    message: "Décrivez votre besoin en 2 lignes (optionnel)",
    submit: "Envoyer ma demande",
    submitting: "Envoi...",
    success: "Message reçu ! On vous répond sous 2h.",
    error: "Erreur, réessayez ou écrivez à contact@kah-digital.ch",
  },
  en: {
    title: "Tell us about your project",
    sub: "We'll reply within 2h with a proposal tailored to your case.",
    name: "Your name or company name",
    email: "Your email",
    agent: "Which agent interests you?",
    agentOptions: ["Automated prospecting", "AI customer support", "Automated quoting", "AI casting", "Not sure yet"],
    message: "Describe your need in 2 lines (optional)",
    submit: "Send my request",
    submitting: "Sending...",
    success: "Message received! We'll reply within 2h.",
    error: "Error, please retry or email contact@kah-digital.ch",
  },
  de: {
    title: "Erzählen Sie uns von Ihrem Projekt",
    sub: "Wir antworten innerhalb von 2h mit einem auf Ihren Fall zugeschnittenen Angebot.",
    name: "Ihr Name oder Firmenname",
    email: "Ihre E-Mail",
    agent: "Welcher Agent interessiert Sie?",
    agentOptions: ["Automatische Akquise", "KI-Kundensupport", "Automatische Angebote", "KI-Casting", "Noch nicht sicher"],
    message: "Beschreiben Sie Ihren Bedarf in 2 Zeilen (optional)",
    submit: "Anfrage senden",
    submitting: "Senden...",
    success: "Nachricht erhalten! Wir antworten innerhalb von 2h.",
    error: "Fehler, bitte erneut versuchen oder an contact@kah-digital.ch schreiben",
  },
};

function AgentContactForm({ locale }: { locale: Locale }) {
  const fc = FORM_COPY[locale] ?? FORM_COPY.fr;
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/agents-ia-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          agent: fd.get("agent"),
          message: fd.get("message"),
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      formRef.current?.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="bg-gray-950 py-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-950/40 via-[#0a0a14] to-blue-950/40 p-8 sm:p-12"
        >
          <div className="mb-8 text-center">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/8 px-3 py-1 text-xs font-semibold text-violet-400">
              <FiZap size={11} /> KAH Digital
            </span>
            <h2 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">{fc.title}</h2>
            <p className="mt-2 text-sm text-gray-500">{fc.sub}</p>
          </div>

          {status === "success" ? (
            <div className="flex flex-col items-center gap-3 py-8 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15">
                <FiCheck size={24} className="text-emerald-400" />
              </div>
              <p className="font-semibold text-white">{fc.success}</p>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  name="name"
                  type="text"
                  placeholder={fc.name}
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/30"
                />
                <input
                  name="email"
                  type="email"
                  placeholder={fc.email}
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/30"
                />
              </div>
              <select
                name="agent"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-300 focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/30"
              >
                <option value="">{fc.agent}</option>
                {fc.agentOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <textarea
                name="message"
                rows={3}
                placeholder={fc.message}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/30 resize-none"
              />
              {status === "error" && (
                <p className="text-xs text-red-400">{fc.error}</p>
              )}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-xl bg-gradient-to-r from-violet-500 to-blue-500 py-3.5 font-bold text-white shadow-lg shadow-violet-500/20 transition-all hover:brightness-110 disabled:opacity-60"
              >
                {status === "loading" ? fc.submitting : fc.submit}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/8 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-semibold text-white">{q}</span>
        {open ? <FiChevronUp className="shrink-0 text-violet-400" /> : <FiChevronDown className="shrink-0 text-gray-500" />}
      </button>
      {open && <p className="pb-5 text-sm leading-relaxed text-gray-400">{a}</p>}
    </div>
  );
}

export function AgentsIaPageContent({ locale }: Props) {
  const c = COPY[locale];

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#050509] pb-24 pt-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-0 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-violet-600/8 blur-[180px]" />
          <div className="absolute right-0 bottom-0 h-[600px] w-[600px] rounded-full bg-blue-600/6 blur-[150px]" />
          <div className="absolute left-2/3 top-1/3 h-[400px] w-[400px] rounded-full bg-amber-500/4 blur-[120px]" />
          {/* Grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <div className="mb-6 flex items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-violet-400">
                <FiZap size={10} />{c.eyebrow}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/8 px-3 py-1 text-xs font-semibold text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {locale === "fr" ? "Opérationnel en 10 jours" : locale === "en" ? "Live in 10 days" : "Live in 10 Tagen"}
              </span>
            </div>

            <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
              {c.title}{" "}
              <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
                {c.titleAccent}
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-400 sm:text-xl">{c.intro}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-8 py-4 font-bold text-white shadow-xl shadow-violet-500/25 transition-all hover:-translate-y-0.5 hover:shadow-violet-500/40"
              >
                {c.cta} <FiArrowRight size={16} />
              </a>
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-8 py-4 font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
              >
                {c.ctaSecondary}
              </a>
            </div>
            <p className="mt-3 text-xs text-gray-600">{c.ctaSub}</p>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {c.stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/8 bg-white/[0.03] p-5 text-center backdrop-blur-sm">
                <p className="text-3xl font-black text-white">
                  {s.value}<span className="text-violet-400">{s.unit}</span>
                </p>
                <p className="mt-1 text-xs text-gray-500">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── BEFORE / AFTER ───────────────────────────────────────────── */}
      <section className="bg-gray-950 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">{c.beforeAfterTitle}</h2>
            <p className="mt-3 text-gray-500">{c.beforeAfterSub}</p>
          </motion.div>

          <div className="space-y-3">
            {c.beforeAfter.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="grid gap-0 overflow-hidden rounded-2xl border border-white/8 sm:grid-cols-2"
              >
                <div className="flex items-center gap-3 bg-red-950/20 px-5 py-4 text-sm text-gray-400">
                  <FiX size={14} className="shrink-0 text-red-500" />
                  {item.before}
                </div>
                <div className="flex items-center gap-3 bg-emerald-950/20 px-5 py-4 text-sm font-semibold text-emerald-300">
                  <FiCheck size={14} className="shrink-0 text-emerald-400" />
                  {item.after}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── AGENTS GRID + PRICING ────────────────────────────────────── */}
      <section id="pricing" className="bg-[#050509] py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">{c.agentsTitle}</h2>
            <p className="mt-3 text-gray-500">{c.agentsSub}</p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2">
            {c.agents.map((agent, i) => {
              const Icon = agent.icon;
              return (
                <motion.div
                  key={agent.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="group relative overflow-hidden rounded-3xl border border-white/8 bg-white/[0.025] p-7 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04]"
                >
                  <div
                    className="pointer-events-none absolute right-0 top-0 h-56 w-56 rounded-full opacity-0 blur-[90px] transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: agent.accent }}
                  />
                  <div className="relative">
                    {/* Header */}
                    <div className="mb-5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-11 w-11 items-center justify-center rounded-xl"
                          style={{ background: agent.accentBg, border: `1px solid ${agent.accent}30` }}
                        >
                          <Icon size={20} style={{ color: agent.accent }} />
                        </div>
                        <span
                          className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider"
                          style={{ background: `${agent.accent}15`, color: agent.accent }}
                        >
                          {agent.badge}
                        </span>
                      </div>
                      <span className="text-2xl font-black text-white">{agent.price}</span>
                    </div>

                    <h3 className="mb-1 text-xl font-extrabold text-white">{agent.name}</h3>
                    <p className="mb-3 font-semibold" style={{ color: agent.accent }}>{agent.tagline}</p>
                    <p className="mb-4 text-sm leading-relaxed text-gray-400">{agent.desc}</p>

                    {/* ROI badge */}
                    <div className="mb-4 inline-flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/8 px-3 py-1.5 text-xs font-semibold text-emerald-400">
                      <FiTrendingUp size={11} />
                      {agent.roi}
                    </div>

                    {/* Metrics */}
                    <div className="mb-4 flex flex-wrap gap-2">
                      {agent.metrics.map((m) => (
                        <span key={m} className="rounded-lg border border-white/8 bg-white/[0.04] px-3 py-1.5 text-xs text-gray-300">
                          {m}
                        </span>
                      ))}
                    </div>

                    {/* For who */}
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <FiUsers size={11} />
                      {agent.forWho}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* All-inclusive note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 rounded-2xl border border-white/6 bg-white/[0.02] p-5 text-center text-sm text-gray-500"
          >
            {locale === "fr"
              ? "💡 Prix fixe, tout inclus — développement, intégration, formation, code source, 1 mois de support. Aucun abonnement, aucun frais caché."
              : locale === "en"
              ? "💡 Fixed price, all included — development, integration, training, source code, 1 month of support. No subscription, no hidden fees."
              : "💡 Fester Preis, alles inklusive — Entwicklung, Integration, Schulung, Quellcode, 1 Monat Support. Kein Abonnement, keine versteckten Gebühren."}
          </motion.div>
        </div>
      </section>

      {/* ─── PROCESS ──────────────────────────────────────────────────── */}
      <section className="bg-gray-950 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">{c.howTitle}</h2>
          </motion.div>

          <div className="relative grid gap-8 sm:grid-cols-3">
            <div className="pointer-events-none absolute left-[16.66%] right-[16.66%] top-6 hidden h-px bg-gradient-to-r from-violet-500/40 via-blue-500/40 to-emerald-500/40 sm:block" />
            {c.steps.map((step, i) => {
              const Icon = step.icon;
              const colors = ["text-violet-400", "text-blue-400", "text-emerald-400"];
              const bgColors = ["bg-violet-500/15 border-violet-500/25", "bg-blue-500/15 border-blue-500/25", "bg-emerald-500/15 border-emerald-500/25"];
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="relative text-center"
                >
                  <div className={`mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border ${bgColors[i]}`}>
                    <Icon size={20} className={colors[i]} />
                  </div>
                  <p className="mb-1 text-xs font-bold uppercase tracking-widest text-gray-600">{step.num}</p>
                  <p className="mb-2 font-bold text-white">{step.title}</p>
                  <p className="text-sm leading-relaxed text-gray-400">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── WHY KAH DIGITAL ──────────────────────────────────────────── */}
      <section className="bg-[#050509] py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">{c.whyTitle}</h2>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {c.whyPoints.map((pt, i) => (
              <motion.div
                key={pt.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl border border-white/8 bg-white/[0.025] p-6"
              >
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/15">
                  <FiCheck size={14} className="text-violet-400" />
                </div>
                <p className="mb-1.5 font-bold text-white">{pt.title}</p>
                <p className="text-sm leading-relaxed text-gray-500">{pt.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─────────────────────────────────────────────── */}
      <section className="bg-gray-950 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">{c.testimonialsTitle}</h2>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-3">
            {c.testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-3xl border border-white/8 bg-white/[0.025] p-7"
              >
                <div className="mb-4 flex gap-0.5">
                  {[...Array(5)].map((_, s) => (
                    <FiStar key={s} size={13} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="mb-5 text-sm leading-relaxed text-gray-300">"{t.quote}"</p>
                <div>
                  <p className="font-bold text-white">{t.name}</p>
                  <p className="text-xs text-gray-600">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────────────── */}
      <section className="bg-[#050509] py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">{c.faqTitle}</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-white/8 bg-white/[0.025] px-7 py-2"
          >
            {c.faq.map((item) => (
              <FAQItem key={item.q} q={item.q} a={item.a} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── CONTACT FORM ─────────────────────────────────────────────── */}
      <AgentContactForm locale={locale} />

      {/* ─── FINAL CTA ────────────────────────────────────────────────── */}
      <section className="bg-gray-950 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-950/70 via-[#050509] to-blue-950/70 p-12 text-center"
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-1/4 top-0 h-[300px] w-[500px] rounded-full bg-violet-500/10 blur-[100px]" />
              <div className="absolute right-1/4 bottom-0 h-[250px] w-[400px] rounded-full bg-blue-500/8 blur-[90px]" />
            </div>
            <div className="relative">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/8 px-3 py-1 text-xs font-semibold text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {locale === "fr" ? "Disponible maintenant" : locale === "en" ? "Available now" : "Jetzt verfügbar"}
              </span>
              <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">{c.ctaFinalTitle}</h2>
              <p className="mx-auto mt-4 max-w-xl text-gray-400">{c.ctaFinalBody}</p>

              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-10 py-4 font-bold text-white shadow-2xl shadow-violet-500/30 transition-all hover:-translate-y-0.5 hover:shadow-violet-500/50"
                >
                  {c.ctaFinal} <FiArrowRight size={16} />
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-8 py-4 font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
                >
                  {c.ctaFinalSecondary}
                </a>
              </div>
              <p className="mt-5 text-xs text-gray-600">{c.ctaFinalSub}</p>

              {/* Trust badges */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-600">
                <span className="flex items-center gap-1.5"><FiClock size={11} /> {locale === "fr" ? "Réponse sous 2h" : locale === "en" ? "Reply within 2h" : "Antwort in 2h"}</span>
                <span className="flex items-center gap-1.5"><FiShield size={11} /> {locale === "fr" ? "Sans engagement" : locale === "en" ? "No commitment" : "Unverbindlich"}</span>
                <span className="flex items-center gap-1.5"><FiCheck size={11} /> {locale === "fr" ? "Code source livré" : locale === "en" ? "Source code delivered" : "Quellcode geliefert"}</span>
                <span className="flex items-center gap-1.5"><FiZap size={11} /> {locale === "fr" ? "Opérationnel en 10 jours" : locale === "en" ? "Live in 10 days" : "Live in 10 Tagen"}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
