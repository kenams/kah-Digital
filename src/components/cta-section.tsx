"use client";

import Link from "next/link";
import { useLocale } from "@/lib/locale";
import { FiArrowRight, FiPhone } from "react-icons/fi";
import { companyConfig } from "@/config/company";

export function CTASection() {
  const { locale, prefix } = useLocale();
  const copy = {
    fr: {
      eyebrow: "Prêt à démarrer ?",
      title: "Votre projet mérite un cadrage sérieux",
      body: "Site web, application ou automatisation IA — premier échange sous 24h, devis lisible, aucun engagement avant validation.",
      primary: "Demander un devis gratuit",
      secondary: "Appeler directement",
      trust: ["Devis gratuit et sans engagement", "Réponse sous 24h ouvrables", "Dès € 300"],
    },
    en: {
      eyebrow: "Ready to start?",
      title: "Your project deserves serious scoping",
      body: "Website, application, or AI automation — first reply within 24h, clear quote, no commitment before validation.",
      primary: "Request a free quote",
      secondary: "Call directly",
      trust: ["Free quote, no commitment", "Reply within 24 business hours", "From € 300"],
    },
    de: {
      eyebrow: "Bereit loszulegen?",
      title: "Ihr Projekt verdient ein ernsthaftes Briefing",
      body: "Website, Anwendung oder KI-Automatisierung — erste Antwort in 24h, klares Angebot, keine Verpflichtung vor der Freigabe.",
      primary: "Kostenloses Angebot anfragen",
      secondary: "Direkt anrufen",
      trust: ["Kostenloses Angebot, keine Verpflichtung", "Antwort in 24 Arbeitsstunden", "Ab € 300"],
    },
  }[locale];

  const withPrefix = (path: string) => (prefix ? `${prefix}${path}` : path);

  return (
    <section className="relative overflow-hidden bg-gray-950 py-28">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/15 via-transparent to-purple-600/10" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-400">{copy.eyebrow}</p>
        <h2 className="mb-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">{copy.title}</h2>
        <p className="mb-10 text-lg text-gray-400">{copy.body}</p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={withPrefix("/devis")}
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-8 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-500/40 hover:gap-3"
          >
            {copy.primary}
            <FiArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          <a
            href={`tel:${companyConfig.phone.replace(/\s/g, "")}`}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5"
          >
            <FiPhone size={15} />
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
      </div>
    </section>
  );
}
