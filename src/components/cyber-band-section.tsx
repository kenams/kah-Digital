"use client";

import Link from "next/link";
import { FiArrowRight, FiLock } from "react-icons/fi";
import { useLocale } from "@/lib/locale";

const COPY = {
  fr: {
    eyebrow: "Cybersécurité & conformité",
    title: "Un site, une IA… et une sécurité à la hauteur.",
    body: "Avec Vincent L’helgoual’ch, expert cybersécurité (11 ans d'IT, dont 7 en cybersécurité) : diagnostic, RGPD, analyse de risques, sensibilisation des équipes, RSSI à temps partagé.",
    points: ["Diagnostic dès 1 000 € HT", "RGPD dès 3 000 € HT", "ISO 27001 · DORA · EBIOS RM"],
    cta: "Découvrir la cybersécurité",
    href: "/cybersecurite",
  },
  en: {
    eyebrow: "Cybersecurity & compliance",
    title: "A website, AI… and security to match.",
    body: "With Vincent L’helgoual’ch, cybersecurity expert (11 years in IT, 7 in cybersecurity): assessment, GDPR, risk analysis, team awareness training, part-time security officer.",
    points: ["Assessment from €1,000 excl. tax", "GDPR from €3,000 excl. tax", "ISO 27001 · DORA · EBIOS RM"],
    cta: "Discover cybersecurity",
    href: "/en/cybersecurite",
  },
  de: {
    eyebrow: "Cybersicherheit & Compliance",
    title: "Website, KI … und passende Sicherheit.",
    body: "Mit Vincent L’helgoual’ch, Experte für Cybersicherheit (11 Jahre IT, davon 7 in Cybersicherheit): Analyse, DSGVO, Risikoanalyse, Sensibilisierung der Teams, Sicherheitsverantwortlicher auf Teilzeit.",
    points: ["Analyse ab 1 000 € netto", "DSGVO ab 3 000 € netto", "ISO 27001 · DORA · EBIOS RM"],
    cta: "Cybersicherheit entdecken",
    href: "/de/cybersecurite",
  },
} as const;

export function CyberBandSection() {
  const { locale } = useLocale();
  const c = COPY[locale];

  return (
    <section className="bg-[#050509] py-14" aria-labelledby="cyber-band-title">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 rounded-3xl border border-emerald-400/20 bg-emerald-400/[0.05] p-8 md:flex-row md:items-center md:justify-between md:p-10">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-300">
              <FiLock size={12} aria-hidden="true" />
              {c.eyebrow}
            </span>
            <h2 id="cyber-band-title" className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">
              {c.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-300 sm:text-base">{c.body}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {c.points.map((p) => (
                <li
                  key={p}
                  className="rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-xs font-semibold text-gray-200"
                >
                  {p}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-gray-300">
              <span className="font-semibold text-white">Vincent L’helgoual’ch</span> ·{" "}
              <a href="tel:+33762607458" className="font-semibold text-emerald-300 underline-offset-4 hover:underline">+33 7 62 60 74 58</a> ·{" "}
              <a href="mailto:vlhelgoualch@gmail.com" className="font-semibold text-emerald-300 underline-offset-4 hover:underline">vlhelgoualch@gmail.com</a>
            </p>
          </div>
          <Link
            href={c.href}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-emerald-400 px-8 py-3.5 font-bold text-[#04120c] transition hover:-translate-y-0.5 hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050509]"
          >
            {c.cta} <FiArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
