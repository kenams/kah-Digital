"use client";

import Link from "next/link";
import { useLocale } from "@/lib/locale";
import { FiArrowRight, FiMail } from "react-icons/fi";

export function CTASection() {
  const { locale, prefix } = useLocale();
  const copy = {
    fr: {
      eyebrow: "Prêt à démarrer ?",
      title: "Parlons d'un projet utile pour votre entreprise",
      body: "Site web, application ou automatisation IA : l'important est de cadrer juste et de produire proprement.",
      primary: "Demander un devis gratuit",
      secondary: "Nous contacter",
    },
    en: {
      eyebrow: "Ready to start?",
      title: "Let's talk about a useful project for your company",
      body: "Website, application, or AI automation: the point is to scope it right and build it cleanly.",
      primary: "Request a free quote",
      secondary: "Contact us",
    },
    de: {
      eyebrow: "Bereit loszulegen?",
      title: "Lass uns ueber ein nuetzliches Projekt sprechen",
      body: "Website, Anwendung oder KI-Automatisierung: wichtig ist ein sauberer Scope und eine saubere Umsetzung.",
      primary: "Kostenloses Angebot",
      secondary: "Kontakt aufnehmen",
    },
  }[locale];

  const withPrefix = (path: string) => (prefix ? `${prefix}${path}` : path);

  return (
    <section className="relative overflow-hidden bg-gray-950 py-24">
      {/* Gradient BG */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-purple-600/10" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-400">{copy.eyebrow}</p>
        <h2 className="mb-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">{copy.title}</h2>
        <p className="mb-10 text-lg text-gray-400">{copy.body}</p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={withPrefix("/devis")}
            className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 font-semibold text-gray-950 transition-all hover:bg-gray-100 hover:gap-3"
          >
            {copy.primary}
            <FiArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href={withPrefix("/contact")}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5"
          >
            <FiMail size={15} />
            {copy.secondary}
          </Link>
        </div>
      </div>
    </section>
  );
}
