"use client";

import { FiCheck, FiClock, FiUsers, FiZap } from "react-icons/fi";
import { useLocale } from "@/lib/locale";

export function WhyChooseSection() {
  const { locale } = useLocale();
  const copy = {
    fr: {
      badge: "Pourquoi KAH-Digital",
      title: "Simple, rapide, livrable",
      body: "Un projet digital doit être bien cadré, bien exécuté et rester compréhensible pour l'entreprise.",
      reasons: [
        { icon: FiZap,   accent: "#3b82f6", title: "Exécution rapide",  description: "Un cadrage court, des décisions claires et une production qui avance sans allers-retours inutiles." },
        { icon: FiUsers, accent: "#8b5cf6", title: "Dialogue simple",   description: "Un interlocuteur unique, des échanges directs et un niveau de langage adapté à votre entreprise." },
        { icon: FiCheck, accent: "#10b981", title: "Solutions utiles",  description: "Le but n'est pas d'ajouter de la complexité, mais de résoudre un vrai besoin avec le bon périmètre." },
        { icon: FiClock, accent: "#f59e0b", title: "Cadre propre",      description: "Devis lisibles, rythme de travail clair et priorités assumées du début à la mise en ligne." },
      ],
    },
    en: {
      badge: "Why KAH-Digital",
      title: "Simple, fast, deliverable",
      body: "A digital project should be well scoped, well executed, and remain understandable for the company.",
      reasons: [
        { icon: FiZap,   accent: "#3b82f6", title: "Fast execution",   description: "Short scoping, clear decisions, and production that moves without useless back-and-forth." },
        { icon: FiUsers, accent: "#8b5cf6", title: "Simple dialogue",  description: "One point of contact, direct exchanges, and a language level adapted to the company." },
        { icon: FiCheck, accent: "#10b981", title: "Useful solutions", description: "The goal is not to add complexity, but to solve a real need with the right scope." },
        { icon: FiClock, accent: "#f59e0b", title: "Clean framework",  description: "Readable quotes, clear rhythm, and priorities held from day one to launch." },
      ],
    },
    de: {
      badge: "Warum KAH-Digital",
      title: "Einfach, schnell, lieferbar",
      body: "Ein digitales Projekt muss sauber gebrieft, sauber umgesetzt und fuer das Unternehmen nachvollziehbar sein.",
      reasons: [
        { icon: FiZap,   accent: "#3b82f6", title: "Schnelle Umsetzung",  description: "Kurzes Briefing, klare Entscheidungen und eine Produktion ohne unnoetige Schleifen." },
        { icon: FiUsers, accent: "#8b5cf6", title: "Einfacher Austausch", description: "Ein Ansprechpartner, direkte Kommunikation und passendes Sprachlevel fuer dein Team." },
        { icon: FiCheck, accent: "#10b981", title: "Nuetzliche Loesungen",description: "Kein Mehraufwand um des Aufwands willen — nur was wirklich gebraucht wird." },
        { icon: FiClock, accent: "#f59e0b", title: "Sauberer Rahmen",     description: "Lesbare Angebote, klares Tempo und sichtbare Prioritaeten vom Start bis zum Launch." },
      ],
    },
  }[locale];

  return (
    <section className="bg-gray-900 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-400">
            {copy.badge}
          </span>
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-white">{copy.title}</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">{copy.body}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {copy.reasons.map((reason) => (
            <div key={reason.title} className="rounded-2xl border border-white/10 bg-gray-950 p-6">
              <div
                className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ background: `${reason.accent}18`, border: `1px solid ${reason.accent}30` }}
              >
                <reason.icon size={20} style={{ color: reason.accent }} />
              </div>
              <h3 className="mb-2 text-base font-bold text-white">{reason.title}</h3>
              <p className="text-sm leading-relaxed text-gray-400">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
