"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "@/lib/locale";
import { FiArrowRight, FiCheckCircle, FiZap } from "react-icons/fi";

export function HeroSection() {
  const { locale, prefix } = useLocale();
  const copy = {
    fr: {
      badge: "Studio digital · Lausanne, Suisse · Disponible à distance",
      title1: "Des sites web, apps &",
      title2: "automatisations IA",
      title3: "qui font vraiment avancer votre entreprise",
      body: "KAH-Digital accompagne les PME, indépendants et structures en croissance avec des solutions digitales claires et orientées résultats. Site vitrine, application métier, automatisation IA, support GLPI — cadré proprement, livré dans les délais.",
      primary: "Demander un devis gratuit",
      secondary: "Voir les services",
      stats: [
        { value: "24h", label: "Premier retour garanti" },
        { value: "FR · EN · DE", label: "Langues parlées" },
        { value: "300€", label: "Sites web dès" },
      ],
      proof1: { label: "Site livré en 3 semaines", desc: "Vitrine · cadrage clair · zéro surprise" },
      proof2: { label: "Réponse garantie sous 24h", desc: "Devis lisible · aucun engagement" },
    },
    en: {
      badge: "Digital studio · Lausanne, Switzerland · Remote-friendly",
      title1: "Websites, apps &",
      title2: "AI automation",
      title3: "that actually move your business forward",
      body: "KAH-Digital helps SMEs, freelancers, and growing businesses with clear, result-oriented digital solutions. Showcase site, business app, AI automation, GLPI support — properly scoped, delivered on time.",
      primary: "Request a free quote",
      secondary: "See our services",
      stats: [
        { value: "24h", label: "First reply guaranteed" },
        { value: "FR · EN · DE", label: "Languages" },
        { value: "€300", label: "Websites from" },
      ],
      proof1: { label: "Site delivered in 3 weeks", desc: "Showcase · clear scope · no surprises" },
      proof2: { label: "Reply in 24h guaranteed", desc: "Readable quote · no commitment" },
    },
    de: {
      badge: "Digitalstudio · Lausanne, Schweiz · Remote verfuegbar",
      title1: "Websites, Apps &",
      title2: "KI-Automatisierung",
      title3: "die Ihr Unternehmen wirklich voranbringen",
      body: "KAH-Digital unterstuetzt KMU, Selbststaendige und wachsende Unternehmen mit klaren, ergebnisorientierten digitalen Loesungen. Website, Business-App, KI-Automatisierung, GLPI-Support — sauber gescoped, termingerecht geliefert.",
      primary: "Kostenloses Angebot anfordern",
      secondary: "Leistungen ansehen",
      stats: [
        { value: "24h", label: "Erste Antwort garantiert" },
        { value: "DE · FR · EN", label: "Sprachen" },
        { value: "300€", label: "Websites ab" },
      ],
      proof1: { label: "Website in 3 Wochen geliefert", desc: "Praesentation · klares Scope · keine Ueberraschungen" },
      proof2: { label: "Antwort in 24h garantiert", desc: "Lesbares Angebot · keine Verpflichtung" },
    },
  }[locale];

  const withPrefix = (path: string) => (prefix ? `${prefix}${path}` : path);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-950">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
      {/* Gradient orbs */}
      <div className="absolute -top-32 left-1/4 h-[32rem] w-[32rem] rounded-full bg-blue-600/20 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-purple-600/15 blur-3xl" />
      <div className="absolute top-1/3 right-1/3 h-48 w-48 rounded-full bg-violet-500/10 blur-2xl" />

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

          {/* Stats */}
          <div className="mt-16 flex flex-wrap justify-center gap-12">
            {copy.stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-extrabold text-white">{s.value}</p>
                <p className="mt-0.5 text-sm text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Proof cards */}
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55, duration: 0.5 }}
              className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5 backdrop-blur-sm"
            >
              <FiCheckCircle size={15} className="shrink-0 text-green-400" />
              <div className="text-left">
                <p className="text-xs font-semibold text-white">{copy.proof1.label}</p>
                <p className="text-xs text-gray-500">{copy.proof1.desc}</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5 backdrop-blur-sm"
            >
              <FiZap size={15} className="shrink-0 text-blue-400" />
              <div className="text-left">
                <p className="text-xs font-semibold text-white">{copy.proof2.label}</p>
                <p className="text-xs text-gray-500">{copy.proof2.desc}</p>
              </div>
            </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
