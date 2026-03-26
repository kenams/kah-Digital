"use client";

import { FiCheck, FiClock, FiUsers, FiZap } from "react-icons/fi";
import { useLocale } from "@/lib/locale";

export function WhyChooseSection() {
  const { locale } = useLocale();
  const copy = {
    fr: {
      title: "Pourquoi choisir KAH-Digital ?",
      body: "Parce qu'un projet digital doit être bien cadré, bien exécuté et rester compréhensible pour l'entreprise.",
      reasons: [
        {
          icon: FiZap,
          title: "Exécution rapide",
          description: "Un cadrage court, des décisions claires et une production qui avance sans allers-retours inutiles.",
        },
        {
          icon: FiUsers,
          title: "Dialogue simple",
          description: "Un interlocuteur unique, des échanges directs et un niveau de langage adapté à l'entreprise.",
        },
        {
          icon: FiCheck,
          title: "Solutions utiles",
          description: "Le but n'est pas d'ajouter de la complexité, mais de résoudre un vrai besoin avec un périmètre juste.",
        },
        {
          icon: FiClock,
          title: "Cadre propre",
          description: "Devis lisibles, rythme de travail clair et priorités assumées du début à la mise en ligne.",
        },
      ],
    },
    en: {
      title: "Why choose KAH-Digital?",
      body: "Because a digital project should be well scoped, well executed, and remain understandable for the company.",
      reasons: [
        {
          icon: FiZap,
          title: "Fast execution",
          description: "Short scoping, clear decisions, and production that moves without useless back-and-forth.",
        },
        {
          icon: FiUsers,
          title: "Simple dialogue",
          description: "One point of contact, direct exchanges, and a language level adapted to the company.",
        },
        {
          icon: FiCheck,
          title: "Useful solutions",
          description: "The goal is not to add complexity, but to solve a real need with the right scope.",
        },
        {
          icon: FiClock,
          title: "Clean framework",
          description: "Readable quotes, clear rhythm, and priorities held from day one to launch.",
        },
      ],
    },
    de: {
      title: "Warum KAH-Digital?",
      body: "Weil ein digitales Projekt sauber gebrieft, sauber umgesetzt und fuer das Unternehmen nachvollziehbar bleiben muss.",
      reasons: [
        {
          icon: FiZap,
          title: "Schnelle Umsetzung",
          description: "Kurzes Briefing, klare Entscheidungen und eine Produktion ohne unnoetige Schleifen.",
        },
        {
          icon: FiUsers,
          title: "Einfacher Austausch",
          description: "Ein Ansprechpartner, direkte Kommunikation und ein Sprachlevel passend zum Unternehmen.",
        },
        {
          icon: FiCheck,
          title: "Nuetzliche Loesungen",
          description: "Es geht nicht darum, Komplexitaet hinzuzufuegen, sondern ein echtes Problem mit dem richtigen Scope zu loesen.",
        },
        {
          icon: FiClock,
          title: "Sauberer Rahmen",
          description: "Lesbare Angebote, klares Tempo und sichtbare Prioritaeten vom Start bis zum Launch.",
        },
      ],
    },
  }[locale];

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">{copy.title}</h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">{copy.body}</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {copy.reasons.map((reason) => (
            <div key={reason.title} className="text-center">
              <reason.icon className="mx-auto mb-4 text-blue-600" size={48} />
              <h3 className="mb-3 text-xl font-semibold text-gray-900">{reason.title}</h3>
              <p className="text-gray-600">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
