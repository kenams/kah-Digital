"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "@/lib/locale";
import { FiArrowRight, FiCheckCircle, FiClock, FiMessageCircle } from "react-icons/fi";

const WA_NUMBER = "33759558414";

export function HeroSection() {
  const { locale, prefix } = useLocale();

  const copy = locale === "en"
    ? {
        badge: "30+ projects delivered · Lausanne · France & Switzerland · No commitment",
        title1: "Your digital presence,",
        title2: "built to convert.",
        body: "We design and deliver custom websites, mobile apps, and SaaS — for businesses that want a digital presence equal to their ambition.",
        primary: "Let's talk about your project",
        secondary: "View portfolio",
        wa: "Free 15-min call",
        waText: "Hi Kénan, I'd like to book a free 15-min discovery call to discuss my project.",
        badges: [
          "Scope defined after discussion",
          "Service adjusted to the real context",
          "Reply within 24h",
          "Clear proposal, no commitment",
          "30-day corrections included",
        ],
        proof1: { label: "Simple, effective scoping", desc: "Real need · priorities · action plan" },
        proof2: { label: "Custom proposal within 24h", desc: "Clear · adjustable · no commitment" },
        proof3: { label: "Senior support throughout", desc: "One dedicated contact, not a middleman" },
      }
    : {
        badge: "30+ projets livrés · Lausanne · France & Suisse · Sans engagement",
        title1: "Votre présence digitale,",
        title2: "pensée pour convertir.",
        body: "On conçoit et livre des sites web, apps mobiles et SaaS sur mesure — pour des entreprises qui veulent une présence digitale à la hauteur de leur ambition.",
        primary: "Parlons de votre projet",
        secondary: "Voir les réalisations",
        wa: "Appel découverte 15 min",
        waText: "Bonjour Kénan, je voudrais réserver un appel découverte de 15 min pour discuter de mon projet.",
        badges: [
          "Périmètre défini après échange",
          "Prestation ajustée au contexte",
          "Réponse sous 24h",
          "Proposition claire sans engagement",
          "30 jours de corrections inclus",
        ],
        proof1: { label: "Cadrage simple et efficace", desc: "Besoin réel · priorités · plan d'action" },
        proof2: { label: "Proposition personnalisée sous 24h", desc: "Claire · ajustable · sans engagement" },
        proof3: { label: "Accompagnement à chaque étape", desc: "Un interlocuteur senior, pas un intermédiaire" },
      };

  const withPrefix = (path: string) => (prefix ? `${prefix}${path}` : path);
  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(copy.waText)}`;

  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-gray-950">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
      <div className="absolute -top-32 left-1/4 h-[32rem] w-[32rem] rounded-full bg-blue-600/20 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-violet-600/15 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>

          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-300 backdrop-blur-sm">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
            {copy.badge}
          </div>

          <h1 className="mb-6 text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
            <span className="block">{copy.title1}</span>
            <span className="block bg-gradient-to-r from-blue-400 via-violet-400 to-purple-500 bg-clip-text text-transparent">
              {copy.title2}
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-gray-400">{copy.body}</p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={withPrefix("/devis")}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-8 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-500/40 hover:gap-3"
            >
              {copy.primary}
              <FiArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href={withPrefix("/projets")}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5"
            >
              {copy.secondary}
            </Link>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#25D366]/30 bg-[#25D366]/10 px-8 py-3.5 font-semibold text-[#25D366] transition-all hover:bg-[#25D366]/20"
            >
              <FiMessageCircle size={16} />
              {copy.wa}
            </a>
          </div>

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

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {[
              { icon: FiCheckCircle, color: "text-green-400", proof: copy.proof1, extra: "" },
              { icon: FiClock, color: "text-blue-400", proof: copy.proof2, extra: "" },
              { icon: FiMessageCircle, color: "text-violet-400", proof: copy.proof3, extra: "border-violet-500/20 bg-violet-500/8" },
            ].map(({ icon: Icon, color, proof, extra }, i) => (
              <motion.div
                key={proof.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.15, duration: 0.5 }}
                className={`flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5 backdrop-blur-sm ${extra}`}
              >
                <Icon size={15} className={`shrink-0 ${color}`} />
                <div className="text-left">
                  <p className="text-xs font-semibold text-white">{proof.label}</p>
                  <p className="text-xs text-gray-500">{proof.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
}
