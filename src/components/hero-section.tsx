"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "@/lib/locale";
import { FiArrowRight, FiZap } from "react-icons/fi";

export function HeroSection() {
  const { locale, prefix } = useLocale();
  const copy = {
    fr: {
      badge: "Studio digital · IA & web",
      title1: "Sites, apps &",
      title2: "solutions IA",
      title3: "pour entreprises",
      body: "KAH-Digital conçoit des sites web, des applications sur mesure et des outils IA qui automatisent et font grandir votre business.",
      primary: "Demander un devis gratuit",
      secondary: "Voir nos services",
      stats: [
        { value: "24h", label: "Délai de réponse" },
        { value: "3+", label: "Langues couvertes" },
        { value: "100%", label: "Remote & dispo" },
      ],
    },
    en: {
      badge: "Digital studio · AI & web",
      title1: "Websites, apps &",
      title2: "AI solutions",
      title3: "for companies",
      body: "KAH-Digital builds websites, custom applications, and AI tools that automate and grow your business.",
      primary: "Request a free quote",
      secondary: "See our services",
      stats: [
        { value: "24h", label: "Response time" },
        { value: "3+", label: "Languages covered" },
        { value: "100%", label: "Remote & available" },
      ],
    },
    de: {
      badge: "Digital Studio · KI & Web",
      title1: "Websites, Apps &",
      title2: "KI-Loesungen",
      title3: "fuer Unternehmen",
      body: "KAH-Digital entwickelt Websites, massgeschneiderte Anwendungen und KI-Tools, die dein Business automatisieren und skalieren.",
      primary: "Kostenloses Angebot",
      secondary: "Leistungen ansehen",
      stats: [
        { value: "24h", label: "Antwortzeit" },
        { value: "3+", label: "Sprachen" },
        { value: "100%", label: "Remote verfuegbar" },
      ],
    },
  }[locale];

  const withPrefix = (path: string) => (prefix ? `${prefix}${path}` : path);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-950">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
      {/* Gradient orbs */}
      <div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-purple-600/15 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-300 backdrop-blur-sm">
            <FiZap size={13} className="text-blue-400" />
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
              className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 font-semibold text-gray-950 transition-all hover:bg-gray-100 hover:gap-3"
            >
              {copy.primary}
              <FiArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href={withPrefix("/services")}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5"
            >
              {copy.secondary}
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 flex flex-wrap justify-center gap-10">
            {copy.stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-extrabold text-white">{s.value}</p>
                <p className="mt-0.5 text-sm text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
