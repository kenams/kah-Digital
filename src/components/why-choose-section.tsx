"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/lib/locale";
import {
  FiZap, FiAward, FiCpu, FiHeadphones,
  FiTrendingUp, FiSearch, FiSmartphone, FiLock,
} from "react-icons/fi";

const REASONS = {
  fr: [
    {
      icon: FiZap,
      accent: "#3b82f6",
      tag: "5 à 28 jours",
      title: "Exécution ultra rapide",
      desc: "Starter livré en 5 jours. Business en 14 jours. Un cadrage court, des décisions claires, zéro réunion inutile.",
      featured: true,
    },
    {
      icon: FiAward,
      accent: "#8b5cf6",
      tag: "Niveau SaaS",
      title: "Design premium",
      desc: "Pas le design d'une agence locale. Le niveau visuel d'une startup valorisée — Stripe, Linear, Framer.",
      featured: false,
    },
    {
      icon: FiCpu,
      accent: "#10b981",
      tag: "IA intégrée",
      title: "Intelligence artificielle",
      desc: "Chatbot IA, automatisations, agents personnalisés. L'IA n'est pas un bonus — c'est notre stack de base.",
      featured: false,
    },
    {
      icon: FiHeadphones,
      accent: "#f59e0b",
      tag: "Accès direct",
      title: "Support humain réel",
      desc: "Vous parlez au fondateur, pas à un account manager. Réponse sous 24h, pas sous 5 jours ouvrés.",
      featured: false,
    },
    {
      icon: FiTrendingUp,
      accent: "#ec4899",
      tag: "Lighthouse 95+",
      title: "Performance maximale",
      desc: "Score Core Web Vitals, chargement < 2s, rendu optimisé. Votre site ne perd pas de clients à cause de la lenteur.",
      featured: false,
    },
    {
      icon: FiSearch,
      accent: "#06b6d4",
      tag: "Inclus dès le Starter",
      title: "SEO technique de base",
      desc: "Meta tags, sitemap, balises structurées, URLs propres. Chaque projet est indexable dès la mise en ligne.",
      featured: false,
    },
    {
      icon: FiSmartphone,
      accent: "#a78bfa",
      tag: "Pixel-perfect garanti",
      title: "Mobile-first absolu",
      desc: "62% du trafic web est mobile. Chaque composant est conçu pour l'écran le plus petit d'abord.",
      featured: false,
    },
    {
      icon: FiLock,
      accent: "#34d399",
      tag: "Zéro surprise",
      title: "Prix fixe & propriété totale",
      desc: "Devis ferme avant démarrage. Vous possédez 100% du code, du domaine et de l'hébergement. Pas de lock-in.",
      featured: true,
    },
  ],
  en: [
    {
      icon: FiZap,
      accent: "#3b82f6",
      tag: "5 to 28 days",
      title: "Ultra-fast execution",
      desc: "Starter delivered in 5 days. Business in 14. Short scoping, clear decisions, zero unnecessary meetings.",
      featured: true,
    },
    {
      icon: FiAward,
      accent: "#8b5cf6",
      tag: "SaaS-level",
      title: "Premium design",
      desc: "Not a local agency design. Startup-grade visuals — Stripe, Linear, Framer-level quality.",
      featured: false,
    },
    {
      icon: FiCpu,
      accent: "#10b981",
      tag: "Built-in AI",
      title: "Artificial intelligence",
      desc: "AI chatbot, automations, custom agents. AI isn't a bonus — it's our default stack.",
      featured: false,
    },
    {
      icon: FiHeadphones,
      accent: "#f59e0b",
      tag: "Direct access",
      title: "Real human support",
      desc: "You talk to the founder, not an account manager. Reply in 24h, not 5 business days.",
      featured: false,
    },
    {
      icon: FiTrendingUp,
      accent: "#ec4899",
      tag: "Lighthouse 95+",
      title: "Maximum performance",
      desc: "Core Web Vitals score, load time < 2s, optimised rendering. Your site won't lose clients because of slowness.",
      featured: false,
    },
    {
      icon: FiSearch,
      accent: "#06b6d4",
      tag: "Included from Starter",
      title: "Base technical SEO",
      desc: "Meta tags, sitemap, structured data, clean URLs. Every project is indexable from day one.",
      featured: false,
    },
    {
      icon: FiSmartphone,
      accent: "#a78bfa",
      tag: "Pixel-perfect guaranteed",
      title: "Mobile-first by default",
      desc: "62% of web traffic is mobile. Every component is designed for the smallest screen first.",
      featured: false,
    },
    {
      icon: FiLock,
      accent: "#34d399",
      tag: "Zero surprises",
      title: "Fixed price & full ownership",
      desc: "Fixed quote before starting. You own 100% of the code, domain, and hosting. No lock-in.",
      featured: true,
    },
  ],
  de: [
    {
      icon: FiZap,
      accent: "#3b82f6",
      tag: "5 bis 28 Tage",
      title: "Ultra-schnelle Umsetzung",
      desc: "Starter in 5 Tagen geliefert. Business in 14 Tagen. Kurzes Briefing, klare Entscheidungen, null unnötige Meetings.",
      featured: true,
    },
    {
      icon: FiAward,
      accent: "#8b5cf6",
      tag: "SaaS-Niveau",
      title: "Premium-Design",
      desc: "Kein lokales Agentur-Design. Startup-Qualität — Stripe, Linear, Framer-Niveau.",
      featured: false,
    },
    {
      icon: FiCpu,
      accent: "#10b981",
      tag: "KI integriert",
      title: "Künstliche Intelligenz",
      desc: "KI-Chatbot, Automatisierungen, individuelle Agenten. KI ist kein Bonus — es ist unser Standard-Stack.",
      featured: false,
    },
    {
      icon: FiHeadphones,
      accent: "#f59e0b",
      tag: "Direktzugang",
      title: "Echter menschlicher Support",
      desc: "Sie sprechen direkt mit dem Gründer, nicht mit einem Account Manager. Antwort in 24h.",
      featured: false,
    },
    {
      icon: FiTrendingUp,
      accent: "#ec4899",
      tag: "Lighthouse 95+",
      title: "Maximale Performance",
      desc: "Core Web Vitals Score, Ladezeit < 2s, optimiertes Rendering. Ihre Website verliert keine Kunden durch Langsamkeit.",
      featured: false,
    },
    {
      icon: FiSearch,
      accent: "#06b6d4",
      tag: "Ab Starter inklusive",
      title: "Technisches Basis-SEO",
      desc: "Meta-Tags, Sitemap, strukturierte Daten, saubere URLs. Jedes Projekt ist ab dem ersten Tag indexierbar.",
      featured: false,
    },
    {
      icon: FiSmartphone,
      accent: "#a78bfa",
      tag: "Pixel-perfect garantiert",
      title: "Mobile-first als Standard",
      desc: "62% des Web-Traffics ist mobil. Jede Komponente wird zuerst für den kleinsten Bildschirm entwickelt.",
      featured: false,
    },
    {
      icon: FiLock,
      accent: "#34d399",
      tag: "Null Überraschungen",
      title: "Fester Preis & volles Eigentum",
      desc: "Festes Angebot vor dem Start. Sie besitzen 100% des Codes, der Domain und des Hostings. Kein Lock-in.",
      featured: true,
    },
  ],
};

const COPY = {
  fr: {
    eyebrow: "Pourquoi KAH Digital",
    title: "Un niveau de qualité",
    title2: "qui change tout.",
    sub: "On ne livre pas des sites. On livre des systèmes qui fonctionnent — rapides, beaux, mesurables.",
  },
  en: {
    eyebrow: "Why KAH Digital",
    title: "A quality standard",
    title2: "that changes everything.",
    sub: "We don't deliver websites. We deliver systems that work — fast, beautiful, measurable.",
  },
  de: {
    eyebrow: "Warum KAH Digital",
    title: "Ein Qualitätsniveau,",
    title2: "das alles verändert.",
    sub: "Wir liefern keine Websites. Wir liefern Systeme, die funktionieren — schnell, schön, messbar.",
  },
};

export function WhyChooseSection() {
  const { locale } = useLocale();
  const reasons = REASONS[locale] ?? REASONS.fr;
  const copy = COPY[locale] ?? COPY.fr;

  return (
    <section className="bg-gray-950 py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-400">
            {copy.eyebrow}
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            {copy.title}{" "}
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">{copy.title2}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-gray-400">{copy.sub}</p>
        </motion.div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.45 }}
              className={`group relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 ${
                r.featured
                  ? "lg:col-span-2 border-white/12 bg-gradient-to-br from-white/[0.04] to-white/[0.01]"
                  : "border-white/8 bg-white/[0.025] hover:border-white/15 hover:bg-white/[0.035]"
              }`}
            >
              {/* Subtle glow on featured */}
              {r.featured && (
                <div
                  className="pointer-events-none absolute inset-0 opacity-20"
                  style={{
                    background: `radial-gradient(circle at 20% 50%, ${r.accent}40 0%, transparent 60%)`,
                  }}
                />
              )}

              {/* Icon */}
              <div
                className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${r.accent}18`, border: `1px solid ${r.accent}28` }}
              >
                <r.icon size={20} style={{ color: r.accent }} />
              </div>

              {/* Tag */}
              <span
                className="mb-3 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                style={{ background: `${r.accent}15`, color: r.accent }}
              >
                {r.tag}
              </span>

              <h3 className="mb-2 font-extrabold text-white">{r.title}</h3>
              <p className="text-sm leading-relaxed text-gray-400">{r.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
