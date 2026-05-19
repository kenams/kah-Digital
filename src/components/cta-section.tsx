"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "@/lib/locale";
import { FiArrowRight, FiMessageCircle } from "react-icons/fi";

export function CTASection() {
  const { locale, prefix } = useLocale();
  const copy = {
    fr: {
      eyebrow: "Prêt à passer à la vitesse supérieure ?",
      title: "Votre système de croissance commence ici.",
      body: "Audit gratuit sous 24h. On analyse votre situation, on identifie les leviers prioritaires et on vous propose un plan d'action concret — sans engagement.",
      primary: "Obtenir mon audit gratuit",
      secondary: "WhatsApp — réponse sous 2h",
      waText: "Bonjour KAH Digital, je souhaite un audit gratuit pour mon projet.",
      trust: ["Audit personnalisé offert", "Réponse sous 24h ouvrables", "Sans engagement"],
    },
    en: {
      eyebrow: "Ready to scale?",
      title: "Your growth system starts here.",
      body: "Free audit within 24h. We analyze your situation, identify priority levers, and propose a concrete action plan — no commitment.",
      primary: "Get my free audit",
      secondary: "WhatsApp — reply in 2h",
      waText: "Hi KAH Digital, I'd like a free audit for my project.",
      trust: ["Personalised audit included", "Reply within 24 business hours", "No commitment"],
    },
    de: {
      eyebrow: "Bereit für den nächsten Schritt?",
      title: "Ihr Wachstumssystem beginnt hier.",
      body: "Kostenloses Audit in 24h. Wir analysieren Ihre Situation, identifizieren die wichtigsten Hebel und schlagen einen konkreten Aktionsplan vor — ohne Verpflichtung.",
      primary: "Mein kostenloses Audit erhalten",
      secondary: "WhatsApp — Antwort in 2h",
      waText: "Hallo KAH Digital, ich möchte ein kostenloses Audit für mein Projekt.",
      trust: ["Persönliches Audit inklusive", "Antwort in 24 Arbeitsstunden", "Ohne Verpflichtung"],
    },
  }[locale];

  const withPrefix = (path: string) => (prefix ? `${prefix}${path}` : path);
  const waUrl = `https://wa.me/33759558414?text=${encodeURIComponent(copy.waText)}`;

  return (
    <section className="relative overflow-hidden bg-gray-950 py-28">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/15 via-transparent to-purple-600/10" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8"
      >
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-400">{copy.eyebrow}</p>
        <h2 className="mb-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">{copy.title}</h2>
        <p className="mb-10 text-lg text-gray-400">{copy.body}</p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={withPrefix("/audit-gratuit")}
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-8 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-500/40 hover:gap-3"
          >
            {copy.primary}
            <FiArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-8 py-3.5 font-semibold text-white shadow-lg shadow-green-500/20 transition hover:brightness-110"
          >
            <FiMessageCircle size={15} />
            {copy.secondary}
          </a>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
          {copy.trust.map((item) => (
            <div key={item} className="flex items-center gap-2 text-sm text-gray-500">
              <span className="h-1 w-1 rounded-full bg-green-400" />
              {item}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
