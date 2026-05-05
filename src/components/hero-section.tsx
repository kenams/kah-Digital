"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "@/lib/locale";
import { FiArrowRight, FiCheckCircle, FiClock, FiZap } from "react-icons/fi";

export function HeroSection() {
  const { locale, prefix } = useLocale();
  const copy = {
    fr: {
      badge: "30+ projets livrés · Lausanne · Disponible à distance · 2 créneaux libres en mai",
      title1: "Sites web, apps mobiles",
      title2: "et SaaS qui convertissent",
      title3: "— livrés en 1 à 6 semaines",
      body: "Prix fixe. Scope clair. Zéro dépassement. Chaque projet est cadré, chiffré et livré dans les délais — ou remboursé. Site vitrine dès 900 €, app mobile dès 6 000 €.",
      primary: "Obtenir mon devis en 2 min",
      secondary: "Voir les offres et tarifs",
      badges: [
        "Landing page dès 300 €",
        "Site vitrine dès 900 €",
        "Réponse sous 24h",
        "Prix fixe garanti",
        "30 jours de corrections inclus",
      ],
      proof1: { label: "Site vitrine livré en 2 à 3 semaines", desc: "Prix fixe · zéro surprise · 30j corrections" },
      proof2: { label: "Devis personnalisé sous 24h", desc: "Gratuit · sans engagement · réponse garantie" },
      proof3: { label: "2 créneaux disponibles en mai", desc: "Prochain démarrage : semaine du 12 mai" },
    },
    en: {
      badge: "30+ projects delivered · Lausanne · Remote-friendly · 2 slots left in May",
      title1: "Websites, mobile apps",
      title2: "and SaaS that convert",
      title3: "— delivered in 1 to 6 weeks",
      body: "Fixed price. Clear scope. No overruns. Every project is scoped, quoted and delivered on time — or refunded. Showcase site from €900, mobile app from €6,000.",
      primary: "Get my quote in 2 min",
      secondary: "See offers & pricing",
      badges: [
        "Landing page from €300",
        "Showcase site from €900",
        "Reply within 24h",
        "Fixed price guaranteed",
        "30-day corrections included",
      ],
      proof1: { label: "Showcase site in 2–3 weeks", desc: "Fixed price · no surprises · 30d corrections" },
      proof2: { label: "Custom quote in under 24h", desc: "Free · no commitment · guaranteed reply" },
      proof3: { label: "2 slots available in May", desc: "Next start: week of May 12" },
    },
    de: {
      badge: "30+ gelieferte Projekte · Lausanne · Remote · 2 freie Plätze im Mai",
      title1: "Websites, mobile Apps",
      title2: "und SaaS die konvertieren",
      title3: "— in 1 bis 6 Wochen geliefert",
      body: "Festpreis. Klares Scope. Keine Überschreitungen. Jedes Projekt wird termingerecht geliefert — oder erstattet. Website ab 900 €, Mobile App ab 6.000 €.",
      primary: "Angebot in 2 Min anfordern",
      secondary: "Angebote & Preise ansehen",
      badges: [
        "Landing Page ab 300 €",
        "Website ab 900 €",
        "Antwort in 24h",
        "Festpreis garantiert",
        "30 Tage Korrekturen inklusive",
      ],
      proof1: { label: "Website in 2–3 Wochen geliefert", desc: "Festpreis · keine Überraschungen" },
      proof2: { label: "Individuelles Angebot in 24h", desc: "Kostenlos · keine Verpflichtung" },
      proof3: { label: "2 freie Plätze im Mai", desc: "Nächster Start: Woche vom 12. Mai" },
    },
  }[locale];

  const withPrefix = (path: string) => (prefix ? `${prefix}${path}` : path);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-950">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
      {/* Gradient orbs */}
      <div className="absolute -top-32 left-1/4 h-[32rem] w-[32rem] rounded-full bg-blue-600/20 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-violet-600/15 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>

          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-300 backdrop-blur-sm">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
            {copy.badge}
          </div>

          {/* Title */}
          <h1 className="mb-6 text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
            <span className="block">{copy.title1}</span>
            <span className="block bg-gradient-to-r from-blue-400 via-violet-400 to-purple-500 bg-clip-text text-transparent">
              {copy.title2}
            </span>
            <span className="block text-gray-300">{copy.title3}</span>
          </h1>

          {/* Body */}
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-gray-400">
            {copy.body}
          </p>

          {/* CTAs */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={withPrefix("/devis")}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-8 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-500/40 hover:gap-3"
            >
              {copy.primary}
              <FiArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href={withPrefix("/offres")}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5"
            >
              {copy.secondary}
            </Link>
          </div>

          {/* Badges de réassurance */}
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {copy.badges.map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-sm text-gray-300"
              >
                <FiCheckCircle size={13} className="text-green-400" />
                {badge}
              </span>
            ))}
          </div>

          {/* Proof cards */}
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5 backdrop-blur-sm"
            >
              <FiCheckCircle size={15} className="shrink-0 text-green-400" />
              <div className="text-left">
                <p className="text-xs font-semibold text-white">{copy.proof1.label}</p>
                <p className="text-xs text-gray-500">{copy.proof1.desc}</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.5 }}
              className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5 backdrop-blur-sm"
            >
              <FiClock size={15} className="shrink-0 text-blue-400" />
              <div className="text-left">
                <p className="text-xs font-semibold text-white">{copy.proof2.label}</p>
                <p className="text-xs text-gray-500">{copy.proof2.desc}</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex items-center gap-2.5 rounded-2xl border border-orange-500/25 bg-orange-500/8 px-4 py-2.5 backdrop-blur-sm"
            >
              <FiZap size={15} className="shrink-0 text-orange-400" />
              <div className="text-left">
                <p className="text-xs font-semibold text-orange-200">{copy.proof3.label}</p>
                <p className="text-xs text-orange-400/70">{copy.proof3.desc}</p>
              </div>
            </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
