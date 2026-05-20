"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight, FiCheck, FiCpu, FiZap, FiTrendingUp, FiUsers, FiShield, FiGlobe } from "react-icons/fi";
import type { Locale } from "@/lib/locales";
import { withLocalePrefix } from "@/lib/locales";

type Props = { locale: Locale };

const COPY = {
  fr: {
    eyebrow: "Agence IA · Lausanne · International",
    title: "L'agence IA qui livre",
    title2: "des résultats, pas des slides.",
    intro: "KAH Digital est une agence spécialisée en intelligence artificielle appliquée aux entreprises. Chatbots GPT-4, agents d'automatisation, systèmes de qualification leads, intégrations CRM — on construit ce qui fonctionne en production, pas ce qui impressionne en démo.",
    stats: [
      { value: "120+", label: "Projets livrés" },
      { value: "-70%", label: "Tâches manuelles" },
      { value: "10j", label: "Déploiement moyen" },
      { value: "24/7", label: "Disponibilité IA" },
    ],
    useCasesTitle: "Ce qu'on automatise pour vous",
    useCases: [
      {
        icon: FiCpu,
        accent: "#3b82f6",
        title: "Qualification leads automatique",
        desc: "Un agent GPT-4 qualifie vos prospects entrants, pose les bonnes questions et ne vous transfère que les leads chauds. Résultat : 3x plus de conversions, 0 temps perdu.",
      },
      {
        icon: FiZap,
        accent: "#10b981",
        title: "Support client 24/7",
        desc: "Chatbot IA formé sur votre base de connaissance. Répond instantanément, escalade proprement vers un humain si besoin. Réduit les tickets de 60%.",
      },
      {
        icon: FiTrendingUp,
        accent: "#8b5cf6",
        title: "Automatisation CRM & emails",
        desc: "Séquences email intelligentes, mise à jour CRM automatique, routage des demandes, résumés de conversations. Votre équipe se concentre sur la vente.",
      },
      {
        icon: FiUsers,
        accent: "#f59e0b",
        title: "Agents métier sur mesure",
        desc: "Agents IA personnalisés pour votre secteur : immobilier, e-commerce, conseil, SaaS. Entraînés sur vos données, intégrés à votre stack existant.",
      },
      {
        icon: FiShield,
        accent: "#ec4899",
        title: "Extraction & analyse de données",
        desc: "Scraping intelligent, synthèse automatique, rapports générés en temps réel. Transformez la donnée brute en décision rapide.",
      },
      {
        icon: FiGlobe,
        accent: "#06b6d4",
        title: "Intégrations API & webhooks",
        desc: "Make, Zapier, n8n, API directes — on connecte vos outils entre eux et on automatise les flux sans coder de zéro.",
      },
    ],
    whyTitle: "Pourquoi KAH Digital plutôt qu'une grande agence IA ?",
    whyPoints: [
      "Vous parlez au fondateur, pas à un account manager qui relaie",
      "Déploiement en 10 jours — pas 6 mois de workshop",
      "Prix fixe et transparent dès le premier email",
      "Code source 100% livré — aucune dépendance fournisseur",
      "ROI mesurable à J+30 ou on corrige gratuitement",
      "Stack moderne : GPT-4, Langchain, Supabase, Next.js, n8n",
    ],
    processTitle: "Notre process en 3 étapes",
    steps: [
      { num: "01", title: "Audit IA gratuit — 24h", desc: "On analyse vos processus et identifie les 3 automations à plus fort ROI. Gratuit, sans engagement." },
      { num: "02", title: "Build & test — 10 jours", desc: "On développe, configure et teste l'agent en conditions réelles sur vos données. Zéro disruption." },
      { num: "03", title: "Déploiement & ROI — J+30", desc: "Mise en production, formation de l'équipe, reporting. Résultats mesurables dans le premier mois." },
    ],
    ctaTitle: "Combien vous coûte l'absence d'automatisation IA ?",
    ctaBody: "Chaque semaine sans IA = heures perdues, leads non qualifiés, coûts opérationnels inutiles. Audit gratuit en 24h — on vous dit exactement combien vous pouvez récupérer.",
    cta: "Demander l'audit IA gratuit",
    ctaSub: "Gratuit · Sans engagement · Réponse sous 24h",
  },
  en: {
    eyebrow: "AI Agency · Lausanne · International",
    title: "The AI agency that delivers",
    title2: "results, not slides.",
    intro: "KAH Digital is an agency specialising in applied AI for businesses. GPT-4 chatbots, automation agents, lead qualification systems, CRM integrations — we build what works in production, not what impresses in demos.",
    stats: [
      { value: "120+", label: "Projects delivered" },
      { value: "-70%", label: "Manual tasks" },
      { value: "10d", label: "Avg. deployment" },
      { value: "24/7", label: "AI availability" },
    ],
    useCasesTitle: "What we automate for you",
    useCases: [
      {
        icon: FiCpu,
        accent: "#3b82f6",
        title: "Automatic lead qualification",
        desc: "A GPT-4 agent qualifies your inbound prospects, asks the right questions, and only transfers hot leads to you. Result: 3x more conversions, zero time wasted.",
      },
      {
        icon: FiZap,
        accent: "#10b981",
        title: "24/7 customer support",
        desc: "AI chatbot trained on your knowledge base. Answers instantly, escalates cleanly to a human when needed. Reduces tickets by 60%.",
      },
      {
        icon: FiTrendingUp,
        accent: "#8b5cf6",
        title: "CRM & email automation",
        desc: "Smart email sequences, automatic CRM updates, request routing, conversation summaries. Your team focuses on selling.",
      },
      {
        icon: FiUsers,
        accent: "#f59e0b",
        title: "Custom business agents",
        desc: "AI agents tailored for your sector: real estate, e-commerce, consulting, SaaS. Trained on your data, integrated into your existing stack.",
      },
      {
        icon: FiShield,
        accent: "#ec4899",
        title: "Data extraction & analysis",
        desc: "Smart scraping, automatic synthesis, real-time reports. Turn raw data into fast decisions.",
      },
      {
        icon: FiGlobe,
        accent: "#06b6d4",
        title: "API & webhook integrations",
        desc: "Make, Zapier, n8n, direct APIs — we connect your tools and automate flows without building from scratch.",
      },
    ],
    whyTitle: "Why KAH Digital over a big AI agency?",
    whyPoints: [
      "You talk to the founder, not an account manager who relays",
      "Deployed in 10 days — not 6 months of workshops",
      "Fixed, transparent pricing from the first email",
      "100% source code delivered — no vendor dependency ever",
      "Measurable ROI at D+30 or we fix it for free",
      "Modern stack: GPT-4, Langchain, Supabase, Next.js, n8n",
    ],
    processTitle: "Our 3-step process",
    steps: [
      { num: "01", title: "Free AI audit — 24h", desc: "We analyse your processes and identify the 3 highest-ROI automations. Free, no commitment." },
      { num: "02", title: "Build & test — 10 days", desc: "We develop, configure, and test the agent in real conditions on your data. Zero disruption." },
      { num: "03", title: "Deploy & ROI — D+30", desc: "Go live, team training, reporting. Measurable results within the first month." },
    ],
    ctaTitle: "How much is the absence of AI costing you?",
    ctaBody: "Every week without AI = wasted hours, unqualified leads, unnecessary operating costs. Free audit in 24h — we tell you exactly how much you can recover.",
    cta: "Request the free AI audit",
    ctaSub: "Free · No commitment · Reply within 24h",
  },
  de: {
    eyebrow: "KI-Agentur · Lausanne · International",
    title: "Die KI-Agentur, die",
    title2: "Ergebnisse liefert, keine Slides.",
    intro: "KAH Digital ist eine auf angewandte KI für Unternehmen spezialisierte Agentur. GPT-4-Chatbots, Automatisierungsagenten, Lead-Qualifizierungssysteme, CRM-Integrationen — wir bauen, was in der Produktion funktioniert, nicht was in der Demo beeindruckt.",
    stats: [
      { value: "120+", label: "Projekte geliefert" },
      { value: "-70%", label: "Manuelle Aufgaben" },
      { value: "10T", label: "Ø Deployment" },
      { value: "24/7", label: "KI-Verfügbarkeit" },
    ],
    useCasesTitle: "Was wir für Sie automatisieren",
    useCases: [
      {
        icon: FiCpu,
        accent: "#3b82f6",
        title: "Automatische Lead-Qualifizierung",
        desc: "Ein GPT-4-Agent qualifiziert eingehende Interessenten, stellt die richtigen Fragen und leitet nur heiße Leads weiter. Ergebnis: 3x mehr Conversions, null Zeitverlust.",
      },
      {
        icon: FiZap,
        accent: "#10b981",
        title: "24/7 Kundensupport",
        desc: "KI-Chatbot auf Ihrer Wissensbasis trainiert. Antwortet sofort, eskaliert sauber zu einem Menschen bei Bedarf. Reduziert Tickets um 60%.",
      },
      {
        icon: FiTrendingUp,
        accent: "#8b5cf6",
        title: "CRM- & E-Mail-Automatisierung",
        desc: "Intelligente E-Mail-Sequenzen, automatische CRM-Updates, Anfrage-Routing, Gesprächszusammenfassungen. Ihr Team konzentriert sich auf Verkauf.",
      },
      {
        icon: FiUsers,
        accent: "#f59e0b",
        title: "Individuelle Business-Agenten",
        desc: "KI-Agenten für Ihren Sektor: Immobilien, E-Commerce, Beratung, SaaS. Auf Ihren Daten trainiert, in Ihren Stack integriert.",
      },
      {
        icon: FiShield,
        accent: "#ec4899",
        title: "Datenextraktion & Analyse",
        desc: "Intelligentes Scraping, automatische Synthese, Echtzeit-Berichte. Rohdaten in schnelle Entscheidungen verwandeln.",
      },
      {
        icon: FiGlobe,
        accent: "#06b6d4",
        title: "API- & Webhook-Integrationen",
        desc: "Make, Zapier, n8n, direkte APIs — wir verbinden Ihre Tools und automatisieren Abläufe ohne Neubau.",
      },
    ],
    whyTitle: "Warum KAH Digital statt einer großen KI-Agentur?",
    whyPoints: [
      "Sie sprechen mit dem Gründer, nicht mit einem Account Manager",
      "Deployment in 10 Tagen — nicht 6 Monate Workshops",
      "Fester, transparenter Preis ab der ersten E-Mail",
      "100% Quellcode geliefert — keine Anbieterabhängigkeit",
      "Messbarer ROI an T+30 oder wir beheben es kostenlos",
      "Moderner Stack: GPT-4, Langchain, Supabase, Next.js, n8n",
    ],
    processTitle: "Unser 3-Schritte-Prozess",
    steps: [
      { num: "01", title: "Kostenloses KI-Audit — 24h", desc: "Wir analysieren Ihre Prozesse und identifizieren die 3 ROI-stärksten Automationen. Kostenlos, unverbindlich." },
      { num: "02", title: "Build & Test — 10 Tage", desc: "Wir entwickeln, konfigurieren und testen den Agenten unter realen Bedingungen auf Ihren Daten. Null Störung." },
      { num: "03", title: "Deployment & ROI — T+30", desc: "Go Live, Team-Schulung, Reporting. Messbare Ergebnisse innerhalb des ersten Monats." },
    ],
    ctaTitle: "Was kostet Sie das Fehlen von KI-Automatisierung?",
    ctaBody: "Jede Woche ohne KI = verlorene Stunden, unqualifizierte Leads, unnötige Betriebskosten. Kostenloses Audit in 24h — wir sagen Ihnen genau, was Sie zurückgewinnen können.",
    cta: "Kostenloses KI-Audit anfragen",
    ctaSub: "Kostenlos · Unverbindlich · Antwort in 24h",
  },
};

export function AgenceIaPageContent({ locale }: Props) {
  const c = COPY[locale];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#050509] py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/3 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-blue-600/8 blur-[140px]" />
          <div className="absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-violet-600/6 blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/8 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-400">
              <FiCpu size={10} />
              {c.eyebrow}
            </span>
            <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {c.title}{" "}
              <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">{c.title2}</span>
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
              <Link
                href={withLocalePrefix("/devis", locale)}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 px-8 py-3.5 font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:-translate-y-0.5 hover:shadow-blue-500/40"
              >
                {c.cta} <FiArrowRight size={16} />
              </Link>
              <Link
                href={withLocalePrefix("/contact", locale)}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-8 py-3.5 font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
              >
                {locale === "fr" ? "Parler au fondateur" : locale === "en" ? "Talk to the founder" : "Direkt zum Gründer"}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Use cases grid */}
      <section className="bg-gray-950 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center text-3xl font-extrabold text-white"
          >
            {c.useCasesTitle}
          </motion.h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {c.useCases.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.45 }}
                  className="rounded-2xl border border-white/8 bg-white/[0.025] p-6 transition hover:border-white/15"
                >
                  <div
                    className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ background: `${item.accent}15`, border: `1px solid ${item.accent}25` }}
                  >
                    <Icon size={18} style={{ color: item.accent }} />
                  </div>
                  <h3 className="mb-2 font-bold text-white">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-400">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why us + Process */}
      <section className="bg-[#050509] py-20">
        <div className="mx-auto max-w-6xl gap-12 px-4 sm:px-6 lg:grid lg:grid-cols-2 lg:px-8">
          {/* Why */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
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

          {/* Process */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="mb-8 text-2xl font-extrabold text-white">{c.processTitle}</h2>
            <div className="space-y-6">
              {c.steps.map((step) => (
                <div key={step.num} className="flex gap-5">
                  <span className="mt-0.5 shrink-0 text-3xl font-black text-blue-500/40">{step.num}</span>
                  <div>
                    <p className="font-bold text-white">{step.title}</p>
                    <p className="mt-1 text-sm text-gray-400">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-950 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl border border-blue-500/15 bg-gradient-to-br from-blue-950/50 via-[#050509] to-violet-950/50 p-10 text-center"
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-1/4 top-0 h-[200px] w-[300px] rounded-full bg-blue-500/8 blur-[80px]" />
              <div className="absolute right-1/4 bottom-0 h-[200px] w-[300px] rounded-full bg-violet-500/8 blur-[80px]" />
            </div>
            <div className="relative">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">{c.ctaTitle}</h2>
              <p className="mx-auto mt-4 max-w-xl text-gray-400">{c.ctaBody}</p>
              <Link
                href={withLocalePrefix("/devis", locale)}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 px-10 py-4 font-bold text-white shadow-xl shadow-blue-500/25 transition-all hover:-translate-y-0.5 hover:shadow-blue-500/40"
              >
                {c.cta} <FiArrowRight size={16} />
              </Link>
              <p className="mt-4 text-xs text-gray-600">{c.ctaSub}</p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
