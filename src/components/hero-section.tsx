"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "@/lib/locale";
import { FiArrowRight, FiCheckCircle, FiClock, FiStar } from "react-icons/fi";

export function HeroSection() {
  const { locale, prefix } = useLocale();
  const copy = {
    fr: {
      badge: "Studio digital · Lausanne, Suisse · Disponible à distance",
      title1: "Création de sites web,",
      title2: "applications mobiles",
      title3: "et SaaS sur mesure",
      body: "J'aide les entrepreneurs, indépendants et PME à transformer leurs idées en solutions digitales concrètes : landing page, site vitrine, application mobile ou plateforme SaaS. Clair, rapide, accessible.",
      primary: "Demander un devis gratuit",
      secondary: "Voir les offres",
      badges: [
        "Landing page dès 300 €",
        "Site web dès 800 €",
        "Réponse sous 24h",
        "Livraison rapide",
        "Accompagnement clair",
      ],
      proof1: { label: "Site livré en 2 à 4 semaines", desc: "Cadrage clair · zéro surprise" },
      proof2: { label: "Réponse garantie sous 24h", desc: "Devis gratuit · sans engagement" },
      proof3: { label: "MVP possible dès 2 500 €", desc: "App mobile · SaaS · outil métier" },
    },
    en: {
      badge: "Digital studio · Lausanne, Switzerland · Remote-friendly",
      title1: "Website creation,",
      title2: "mobile applications",
      title3: "and custom SaaS",
      body: "I help entrepreneurs, freelancers and SMEs turn their ideas into concrete digital solutions: landing pages, showcase sites, mobile apps or SaaS platforms. Clear, fast, affordable.",
      primary: "Request a free quote",
      secondary: "See our offers",
      badges: [
        "Landing page from €300",
        "Website from €800",
        "Reply within 24h",
        "Fast delivery",
        "Clear support",
      ],
      proof1: { label: "Site delivered in 2–4 weeks", desc: "Clear scope · no surprises" },
      proof2: { label: "Reply guaranteed within 24h", desc: "Free quote · no commitment" },
      proof3: { label: "MVP from €2,500", desc: "Mobile app · SaaS · business tool" },
    },
    de: {
      badge: "Digitalstudio · Lausanne, Schweiz · Remote verfügbar",
      title1: "Erstellung von Websites,",
      title2: "mobilen Apps",
      title3: "und massgeschneiderten SaaS",
      body: "Ich helfe Unternehmern, Selbstständigen und KMU dabei, ihre Ideen in konkrete digitale Lösungen umzusetzen: Landing Pages, Websites, mobile Apps oder SaaS-Plattformen. Klar, schnell, erschwinglich.",
      primary: "Kostenloses Angebot anfordern",
      secondary: "Leistungen ansehen",
      badges: [
        "Landing Page ab 300 €",
        "Website ab 800 €",
        "Antwort in 24h",
        "Schnelle Lieferung",
        "Klare Begleitung",
      ],
      proof1: { label: "Website in 2–4 Wochen geliefert", desc: "Klares Scope · keine Überraschungen" },
      proof2: { label: "Antwort in 24h garantiert", desc: "Kostenloses Angebot · keine Verpflichtung" },
      proof3: { label: "MVP ab 2.500 €", desc: "Mobile App · SaaS · Business-Tool" },
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
              className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5 backdrop-blur-sm"
            >
              <FiStar size={15} className="shrink-0 text-violet-400" />
              <div className="text-left">
                <p className="text-xs font-semibold text-white">{copy.proof3.label}</p>
                <p className="text-xs text-gray-500">{copy.proof3.desc}</p>
              </div>
            </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
