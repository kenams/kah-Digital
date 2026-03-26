"use client";

import Link from "next/link";
import { useLocale } from "@/lib/locale";

export function CTASection() {
  const { locale, prefix } = useLocale();
  const copy = {
    fr: {
      title: "Le plus utile maintenant, c'est de cadrer proprement ce qu'il faut vraiment construire.",
      body: "Si le sujet est plus de demandes qualifiees, moins de support manuel ou une offre plus lisible, on peut partir sur un cadre simple et concret.",
      primary: "Demander un cadrage",
      secondary: "Parler du projet",
      chips: ["Priorites plus claires", "Budget plus defendable", "Execution plus nette"],
    },
    en: {
      title: "The useful next move is to scope what actually needs to be built.",
      body: "If the goal is more qualified leads, less manual support, or a clearer offer, we can start with a simple and concrete frame.",
      primary: "Request scoped guidance",
      secondary: "Discuss the project",
      chips: ["Clearer priorities", "More defensible budget", "Sharper execution"],
    },
    de: {
      title: "Der sinnvolle naechste Schritt ist jetzt ein sauberes Briefing dessen, was wirklich gebaut werden soll.",
      body: "Wenn das Ziel mehr qualifizierte Anfragen, weniger manueller Support oder ein klareres Angebot ist, starten wir mit einem einfachen und konkreten Rahmen.",
      primary: "Sauberes Briefing anfragen",
      secondary: "Projekt besprechen",
      chips: ["Klarere Prioritaeten", "Saubereres Budget", "Sauberere Umsetzung"],
    },
  }[locale];

  const withPrefix = (path: string) => (prefix ? `${prefix}${path}` : path);

  return (
    <section className="section-shell">
      <div className="rounded-[32px] border border-white/12 bg-[linear-gradient(135deg,rgba(214,179,106,0.16),rgba(127,184,199,0.14),rgba(255,255,255,0.04))] px-6 py-10 shadow-[0_30px_120px_rgba(0,0,0,0.35)] sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
          <div className="text-left">
            <p className="text-sm uppercase tracking-[0.35em] text-white/50">Next step</p>
            <h2 className="mt-4 max-w-4xl text-3xl font-semibold text-white sm:text-4xl">{copy.title}</h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-white/72 sm:text-lg">{copy.body}</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href={withPrefix("/devis")} className="rounded-full bg-white px-8 py-3 text-center font-semibold text-black transition-colors hover:bg-gray-100">
                {copy.primary}
              </Link>
              <Link
                href={withPrefix("/contact")}
                className="rounded-full border-2 border-white/25 px-8 py-3 text-center font-semibold text-white transition-colors hover:border-white hover:bg-white hover:text-black"
              >
                {copy.secondary}
              </Link>
            </div>
          </div>
          <div className="grid gap-3">
            {copy.chips.map((chip, index) => (
              <div key={chip} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-white/78">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#7fb8c7]/30 bg-[#7fb8c7]/10 text-xs font-semibold text-[#cfe7ee]">
                  0{index + 1}
                </span>
                <span className="text-sm uppercase tracking-[0.26em]">{chip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
