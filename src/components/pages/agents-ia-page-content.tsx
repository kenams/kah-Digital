"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiCheck,
  FiMail,
  FiHeadphones,
  FiFileText,
  FiStar,
  FiZap,
  FiUsers,
} from "react-icons/fi";
import type { Locale } from "@/lib/locales";
import { withLocalePrefix } from "@/lib/locales";

type Props = { locale: Locale };

const WHATSAPP_URL = "https://wa.me/33759558414?text=Bonjour%20KAH%20Digital%2C%20je%20veux%20une%20d%C3%A9mo%20de%20votre%20agent%20IA";

const COPY = {
  fr: {
    eyebrow: "Agents IA sur mesure · KAH Digital",
    title: "Des agents IA qui travaillent",
    title2: "pendant que vous dormez.",
    intro:
      "KAH Digital conçoit des agents IA packagés, opérationnels en 10 jours. Prospection, support, devis, casting — chaque agent est formé sur votre métier et s'intègre à votre stack existant. Résultats mesurables dès le premier mois.",
    stats: [
      { value: "120", label: "Contacts/jour (Agent Prospection)" },
      { value: "70%", label: "Tickets résolus sans humain" },
      { value: "30s", label: "Délai de réponse devis" },
      { value: "24/7", label: "Disponibilité totale" },
    ],
    agentsTitle: "Les 4 agents KAH Digital",
    agents: [
      {
        icon: FiMail,
        accent: "#3b82f6",
        badge: "Prospection",
        name: "Agent Prospection",
        tagline: "120 contacts ciblés par jour, en automatique.",
        desc: "L'agent identifie vos prospects idéaux, rédige des messages personnalisés, envoie, relance J+3 et J+7, et vous livre uniquement les réponses positives. Zéro prospection manuelle.",
        metrics: ["120 envois/jour", "Relances J+3 et J+7", "Réponses filtrées"],
      },
      {
        icon: FiHeadphones,
        accent: "#10b981",
        badge: "Support",
        name: "Agent Support",
        tagline: "70% des tickets résolus sans intervention humaine.",
        desc: "Chatbot formé sur votre base de connaissance. Répond instantanément 24/7, escalade proprement vers votre équipe si besoin. Compatible Slack, WhatsApp, site web, widget.",
        metrics: ["Réponse < 5 secondes", "Escalade automatique", "Base de connaissance sur mesure"],
      },
      {
        icon: FiFileText,
        accent: "#8b5cf6",
        badge: "Devis",
        name: "Agent Devis",
        tagline: "Un devis structuré en 30 secondes, 24h/24.",
        desc: "Le prospect remplit un formulaire intelligent. L'agent analyse la demande, génère un devis professionnel et l'envoie par email en moins d'une minute. Vous validez, vous signez.",
        metrics: ["Devis en 30 secondes", "Envoi automatique", "Format signable"],
      },
      {
        icon: FiStar,
        accent: "#f59e0b",
        badge: "Casting",
        name: "Agent Castly",
        tagline: "Le bon talent trouvé en quelques secondes.",
        desc: "Pour les créatifs, labels et marques : l'agent analyse votre brief de casting, parcourt la base d'artistes et vous propose les 5 meilleurs profils avec scoring automatique. Fini les heures de tri.",
        metrics: ["Matching IA instantané", "Scoring multi-critères", "Brief → profils en < 1 min"],
      },
    ],
    howTitle: "Comment ça marche",
    steps: [
      { num: "01", title: "Démo gratuite — 20 min", desc: "On comprend votre besoin, on vous montre l'agent en action sur un cas réel. Sans engagement." },
      { num: "02", title: "Configuration & formation — 5 jours", desc: "On paramètre l'agent sur votre métier, vos données, votre ton. Tests en conditions réelles." },
      { num: "03", title: "Mise en production — J+10", desc: "L'agent tourne en autonomie. Reporting hebdomadaire. Ajustements inclus." },
    ],
    whyTitle: "Pourquoi un agent KAH Digital ?",
    whyPoints: [
      "Opérationnel en 10 jours — pas 3 mois de workshop",
      "Prix fixe, pas de surprise : 490€ à 1 490€ selon l'agent",
      "Code source livré — aucune dépendance fournisseur",
      "ROI mesurable dès J+30 ou on corrige gratuitement",
      "Intégration à vos outils existants (CRM, Slack, email)",
      "Support direct avec le fondateur, pas un account manager",
    ],
    ctaTitle: "Votre premier agent IA en 10 jours.",
    ctaBody:
      "Démo gratuite de 20 min — on vous montre l'agent en action sur votre cas concret. Aucun engagement, aucune carte bancaire.",
    cta: "Réserver ma démo gratuite",
    ctaWhatsApp: "Contacter sur WhatsApp",
    ctaSub: "Réponse sous 2h · Démo en visio ou présentiel",
  },
  en: {
    eyebrow: "Custom AI Agents · KAH Digital",
    title: "AI agents that work",
    title2: "while you sleep.",
    intro:
      "KAH Digital builds packaged AI agents, live in 10 days. Prospecting, support, quotes, casting — each agent is trained on your business and integrates with your existing stack. Measurable results from month one.",
    stats: [
      { value: "120", label: "Contacts/day (Prospecting Agent)" },
      { value: "70%", label: "Tickets resolved without humans" },
      { value: "30s", label: "Quote response time" },
      { value: "24/7", label: "Total availability" },
    ],
    agentsTitle: "The 4 KAH Digital agents",
    agents: [
      {
        icon: FiMail,
        accent: "#3b82f6",
        badge: "Prospecting",
        name: "Prospecting Agent",
        tagline: "120 targeted contacts per day, on autopilot.",
        desc: "The agent identifies your ideal prospects, writes personalised messages, sends, follows up D+3 and D+7, and delivers only positive replies to you. Zero manual prospecting.",
        metrics: ["120 sends/day", "D+3 and D+7 follow-ups", "Filtered replies only"],
      },
      {
        icon: FiHeadphones,
        accent: "#10b981",
        badge: "Support",
        name: "Support Agent",
        tagline: "70% of tickets resolved without human intervention.",
        desc: "Chatbot trained on your knowledge base. Answers instantly 24/7, escalates cleanly to your team when needed. Compatible with Slack, WhatsApp, website, widget.",
        metrics: ["Response < 5 seconds", "Automatic escalation", "Custom knowledge base"],
      },
      {
        icon: FiFileText,
        accent: "#8b5cf6",
        badge: "Quotes",
        name: "Quote Agent",
        tagline: "A structured quote in 30 seconds, round the clock.",
        desc: "The prospect fills in a smart form. The agent analyses the request, generates a professional quote and sends it by email in under a minute. You approve, you sign.",
        metrics: ["Quote in 30 seconds", "Automatic sending", "Signable format"],
      },
      {
        icon: FiStar,
        accent: "#f59e0b",
        badge: "Casting",
        name: "Castly Agent",
        tagline: "The right talent found in seconds.",
        desc: "For creatives, labels and brands: the agent analyses your casting brief, scans the artist database and proposes the 5 best profiles with automatic scoring. No more hours of sorting.",
        metrics: ["Instant AI matching", "Multi-criteria scoring", "Brief → profiles in < 1 min"],
      },
    ],
    howTitle: "How it works",
    steps: [
      { num: "01", title: "Free demo — 20 min", desc: "We understand your need, show the agent in action on a real case. No commitment." },
      { num: "02", title: "Setup & training — 5 days", desc: "We configure the agent for your business, your data, your tone. Tests in real conditions." },
      { num: "03", title: "Go live — D+10", desc: "The agent runs autonomously. Weekly reporting. Adjustments included." },
    ],
    whyTitle: "Why a KAH Digital agent?",
    whyPoints: [
      "Live in 10 days — not 3 months of workshops",
      "Fixed price, no surprises: €490 to €1,490 depending on the agent",
      "Source code delivered — no vendor dependency ever",
      "Measurable ROI by D+30 or we fix it for free",
      "Integration with your existing tools (CRM, Slack, email)",
      "Direct support from the founder, not an account manager",
    ],
    ctaTitle: "Your first AI agent in 10 days.",
    ctaBody:
      "Free 20-min demo — we show the agent in action on your specific case. No commitment, no credit card.",
    cta: "Book my free demo",
    ctaWhatsApp: "Chat on WhatsApp",
    ctaSub: "Reply within 2h · Demo via video call or in person",
  },
  de: {
    eyebrow: "Individuelle KI-Agenten · KAH Digital",
    title: "KI-Agenten, die arbeiten,",
    title2: "während Sie schlafen.",
    intro:
      "KAH Digital entwickelt fertige KI-Agenten, die in 10 Tagen live gehen. Akquise, Support, Angebote, Casting — jeder Agent wird auf Ihr Geschäft trainiert und in Ihren Stack integriert. Messbare Ergebnisse ab Monat eins.",
    stats: [
      { value: "120", label: "Kontakte/Tag (Akquise-Agent)" },
      { value: "70%", label: "Tickets ohne Mensch gelöst" },
      { value: "30s", label: "Antwortzeit Angebot" },
      { value: "24/7", label: "Totale Verfügbarkeit" },
    ],
    agentsTitle: "Die 4 KAH Digital Agenten",
    agents: [
      {
        icon: FiMail,
        accent: "#3b82f6",
        badge: "Akquise",
        name: "Akquise-Agent",
        tagline: "120 zielgerichtete Kontakte pro Tag, automatisch.",
        desc: "Der Agent identifiziert Ihre Wunschkunden, schreibt personalisierte Nachrichten, sendet, followt T+3 und T+7 nach und liefert Ihnen nur positive Antworten. Null manuelle Akquise.",
        metrics: ["120 Versendungen/Tag", "Nachfassen T+3 und T+7", "Gefilterte Antworten"],
      },
      {
        icon: FiHeadphones,
        accent: "#10b981",
        badge: "Support",
        name: "Support-Agent",
        tagline: "70% der Tickets ohne menschliche Intervention gelöst.",
        desc: "Chatbot auf Ihrer Wissensbasis trainiert. Antwortet sofort 24/7, eskaliert sauber zu Ihrem Team bei Bedarf. Kompatibel mit Slack, WhatsApp, Website, Widget.",
        metrics: ["Antwort < 5 Sekunden", "Automatische Eskalation", "Individuelle Wissensbasis"],
      },
      {
        icon: FiFileText,
        accent: "#8b5cf6",
        badge: "Angebote",
        name: "Angebots-Agent",
        tagline: "Ein strukturiertes Angebot in 30 Sekunden, rund um die Uhr.",
        desc: "Der Interessent füllt ein intelligentes Formular aus. Der Agent analysiert die Anfrage, erstellt ein professionelles Angebot und sendet es per E-Mail in unter einer Minute. Sie genehmigen, Sie unterschreiben.",
        metrics: ["Angebot in 30 Sekunden", "Automatischer Versand", "Unterzeichenbares Format"],
      },
      {
        icon: FiStar,
        accent: "#f59e0b",
        badge: "Casting",
        name: "Castly-Agent",
        tagline: "Das richtige Talent in Sekunden gefunden.",
        desc: "Für Kreative, Labels und Marken: Der Agent analysiert Ihr Casting-Brief, durchsucht die Künstlerdatenbank und schlägt die 5 besten Profile mit automatischem Scoring vor. Schluss mit stundenlangem Sortieren.",
        metrics: ["Sofortiges KI-Matching", "Multi-Kriterien-Scoring", "Brief → Profile in < 1 Min"],
      },
    ],
    howTitle: "So funktioniert es",
    steps: [
      { num: "01", title: "Kostenlose Demo — 20 Min", desc: "Wir verstehen Ihren Bedarf, zeigen den Agenten in Aktion an einem realen Fall. Unverbindlich." },
      { num: "02", title: "Konfiguration & Training — 5 Tage", desc: "Wir konfigurieren den Agenten für Ihr Geschäft, Ihre Daten, Ihren Ton. Tests unter realen Bedingungen." },
      { num: "03", title: "Go Live — T+10", desc: "Der Agent läuft autonom. Wöchentliches Reporting. Anpassungen inklusive." },
    ],
    whyTitle: "Warum ein KAH Digital Agent?",
    whyPoints: [
      "Live in 10 Tagen — nicht 3 Monate Workshops",
      "Fester Preis, keine Überraschungen: 490€ bis 1.490€ je nach Agent",
      "Quellcode geliefert — keine Anbieterabhängigkeit",
      "Messbarer ROI an T+30 oder wir beheben es kostenlos",
      "Integration in Ihre bestehenden Tools (CRM, Slack, E-Mail)",
      "Direkter Support vom Gründer, kein Account Manager",
    ],
    ctaTitle: "Ihr erster KI-Agent in 10 Tagen.",
    ctaBody:
      "Kostenlose 20-Min-Demo — wir zeigen den Agenten in Aktion auf Ihren konkreten Fall. Kein Engagement, keine Kreditkarte.",
    cta: "Kostenlose Demo buchen",
    ctaWhatsApp: "Auf WhatsApp kontaktieren",
    ctaSub: "Antwort in 2h · Demo per Video oder persönlich",
  },
};

export function AgentsIaPageContent({ locale }: Props) {
  const c = COPY[locale];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#050509] py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-violet-600/7 blur-[160px]" />
          <div className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-blue-600/6 blur-[130px]" />
          <div className="absolute left-2/3 top-1/3 h-[300px] w-[300px] rounded-full bg-amber-500/4 blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/8 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-violet-400">
              <FiZap size={10} />
              {c.eyebrow}
            </span>
            <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {c.title}{" "}
              <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
                {c.title2}
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-gray-400 sm:text-xl">{c.intro}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              {c.stats.map((s) => (
                <div key={s.label} className="rounded-2xl border border-white/8 bg-white/[0.04] px-5 py-3 text-center">
                  <p className="text-xl font-black text-white">{s.value}</p>
                  <p className="text-[10px] text-gray-500">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-8 py-3.5 font-bold text-white shadow-lg shadow-violet-500/25 transition-all hover:-translate-y-0.5 hover:shadow-violet-500/40"
              >
                {c.cta} <FiArrowRight size={16} />
              </a>
              <Link
                href={withLocalePrefix("/contact", locale)}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-8 py-3.5 font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
              >
                {locale === "fr" ? "En savoir plus" : locale === "en" ? "Learn more" : "Mehr erfahren"}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4 Agents grid */}
      <section className="bg-gray-950 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">{c.agentsTitle}</h2>
            <p className="mt-3 text-gray-500">
              {locale === "fr"
                ? "Chaque agent est un produit packagé, pas un projet sur-mesure de 6 mois."
                : locale === "en"
                ? "Each agent is a packaged product, not a 6-month bespoke project."
                : "Jeder Agent ist ein Fertigprodukt, kein 6-monatiges Individualprojekt."}
            </p>
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
                  className="group relative overflow-hidden rounded-3xl border border-white/8 bg-white/[0.025] p-7 transition hover:border-white/15"
                >
                  <div
                    className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full opacity-0 blur-[80px] transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: agent.accent }}
                  />
                  <div className="relative">
                    <div className="mb-5 flex items-center gap-3">
                      <div
                        className="flex h-11 w-11 items-center justify-center rounded-xl"
                        style={{ background: `${agent.accent}18`, border: `1px solid ${agent.accent}30` }}
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
                    <h3 className="mb-1 text-xl font-extrabold text-white">{agent.name}</h3>
                    <p className="mb-3 font-semibold" style={{ color: agent.accent }}>
                      {agent.tagline}
                    </p>
                    <p className="mb-5 text-sm leading-relaxed text-gray-400">{agent.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {agent.metrics.map((m) => (
                        <span
                          key={m}
                          className="rounded-lg border border-white/8 bg-white/[0.04] px-3 py-1.5 text-xs text-gray-300"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process + Why */}
      <section className="bg-[#050509] py-20">
        <div className="mx-auto max-w-6xl gap-14 px-4 sm:px-6 lg:grid lg:grid-cols-2 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-8 text-2xl font-extrabold text-white">{c.howTitle}</h2>
            <div className="space-y-7">
              {c.steps.map((step) => (
                <div key={step.num} className="flex gap-5">
                  <span className="mt-0.5 shrink-0 text-3xl font-black text-violet-500/35">{step.num}</span>
                  <div>
                    <p className="font-bold text-white">{step.title}</p>
                    <p className="mt-1 text-sm text-gray-400">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="mb-8 text-2xl font-extrabold text-white">{c.whyTitle}</h2>
            <ul className="space-y-4">
              {c.whyPoints.map((pt) => (
                <li key={pt} className="flex items-start gap-3 text-sm text-gray-400">
                  <FiCheck size={15} className="mt-0.5 shrink-0 text-emerald-400" />
                  {pt}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Social proof strip */}
      <section className="border-y border-white/5 bg-gray-950 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 text-center">
            {[
              { icon: FiUsers, val: "120+", label: locale === "fr" ? "Projets livrés" : locale === "en" ? "Projects delivered" : "Projekte geliefert" },
              { icon: FiZap, val: "10j", label: locale === "fr" ? "Mise en production" : locale === "en" ? "Time to go live" : "Zeit bis Go Live" },
              { icon: FiCheck, val: "100%", label: locale === "fr" ? "Code livré" : locale === "en" ? "Code delivered" : "Code geliefert" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.val} className="flex items-center gap-3">
                  <Icon size={18} className="text-violet-400" />
                  <span className="text-2xl font-black text-white">{item.val}</span>
                  <span className="text-sm text-gray-500">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#050509] py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl border border-violet-500/15 bg-gradient-to-br from-violet-950/60 via-[#050509] to-blue-950/60 p-10 text-center"
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-1/4 top-0 h-[250px] w-[400px] rounded-full bg-violet-500/8 blur-[90px]" />
              <div className="absolute right-1/4 bottom-0 h-[200px] w-[300px] rounded-full bg-blue-500/7 blur-[80px]" />
            </div>
            <div className="relative">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">{c.ctaTitle}</h2>
              <p className="mx-auto mt-4 max-w-xl text-gray-400">{c.ctaBody}</p>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-10 py-4 font-bold text-white shadow-xl shadow-violet-500/25 transition-all hover:-translate-y-0.5 hover:shadow-violet-500/40"
                >
                  {c.cta} <FiArrowRight size={16} />
                </a>
                <Link
                  href={withLocalePrefix("/contact", locale)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-8 py-4 font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
                >
                  {c.ctaWhatsApp}
                </Link>
              </div>
              <p className="mt-5 text-xs text-gray-600">{c.ctaSub}</p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
