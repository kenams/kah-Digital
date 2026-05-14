"use client";

import Link from "next/link";
import { useLocale } from "@/lib/locale";
import { FiArrowRight, FiMessageCircle } from "react-icons/fi";

export function CTASection() {
  const { locale, prefix } = useLocale();
  const copy = {
    fr: {
      eyebrow: "Prêt à démarrer ?",
      title: "Votre projet mérite un cadrage sérieux",
      body: "Site web, application ou automatisation IA. Premier échange sous 24h, périmètre ajustable et devis lisible avant toute validation.",
      primary: "Demander un devis personnalisé",
      secondary: "WhatsApp — réponse sous 2h",
      waText: "Bonjour Kénan, je souhaite un devis pour mon projet web.",
      trust: ["Devis clair et sans engagement", "Réponse sous 24h ouvrables", "Prestation ajustée au besoin"],
    },
    en: {
      eyebrow: "Ready to start?",
      title: "Your project deserves serious scoping",
      body: "Website, application, or AI automation. First reply within 24h, adjustable scope and a clear quote before any validation.",
      primary: "Request a custom quote",
      secondary: "WhatsApp — reply in 2h",
      waText: "Hi Kénan, I'd like a quote for my web project.",
      trust: ["Clear quote, no commitment", "Reply within 24 business hours", "Service adjusted to the need"],
    },
    de: {
      eyebrow: "Bereit loszulegen?",
      title: "Ihr Projekt verdient ein ernsthaftes Briefing",
      body: "Website, Anwendung oder KI-Automatisierung. Erste Antwort in 24h, anpassbarer Umfang und klares Angebot vor jeder Freigabe.",
      primary: "Individuelle Offerte anfragen",
      secondary: "WhatsApp — Antwort in 2h",
      waText: "Hallo Kénan, ich möchte ein Angebot für mein Webprojekt.",
      trust: ["Klares Angebot, keine Verpflichtung", "Antwort in 24 Arbeitsstunden", "Leistung passend zum Bedarf"],
    },
  }[locale];

  const withPrefix = (path: string) => (prefix ? `${prefix}${path}` : path);
  const waUrl = `https://wa.me/33759558414?text=${encodeURIComponent(copy.waText)}`;

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
      </div>
    </section>
  );
}
