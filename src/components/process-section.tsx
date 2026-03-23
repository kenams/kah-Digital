"use client";

import { FiMessageSquare, FiSettings, FiZap } from "react-icons/fi";
import { useLocale } from "@/lib/locale";

export function ProcessSection() {
  const { locale } = useLocale();
  const copy = {
    fr: {
      title: "Notre méthode",
      body: "Un processus structuré pour des résultats fiables et dans les délais.",
      steps: [
        {
          icon: FiMessageSquare,
          title: "Échange initial",
          description: "Discussion approfondie de vos besoins, analyse de votre situation actuelle et définition des objectifs.",
        },
        {
          icon: FiSettings,
          title: "Proposition sur mesure",
          description: "Élaboration d'une solution adaptée avec devis détaillé, planning précis et spécifications claires.",
        },
        {
          icon: FiZap,
          title: "Livraison & accompagnement",
          description: "Développement, tests, mise en ligne et support continu pour assurer votre satisfaction.",
        },
      ],
    },
    en: {
      title: "Our method",
      body: "A structured process for reliable results delivered on time.",
      steps: [
        {
          icon: FiMessageSquare,
          title: "Initial exchange",
          description: "Deep discussion of your needs, analysis of the current situation, and definition of the goals.",
        },
        {
          icon: FiSettings,
          title: "Tailored proposal",
          description: "A fitting solution with a detailed quote, a clear timeline, and precise specifications.",
        },
        {
          icon: FiZap,
          title: "Delivery & support",
          description: "Build, tests, launch, and continued support to keep the result solid.",
        },
      ],
    },
    de: {
      title: "Unsere Methode",
      body: "Ein strukturierter Prozess fuer verlaessliche Resultate und saubere Termine.",
      steps: [
        {
          icon: FiMessageSquare,
          title: "Erstes Briefing",
          description: "Praezise Besprechung der Beduerfnisse, Analyse der aktuellen Lage und Definition der Ziele.",
        },
        {
          icon: FiSettings,
          title: "Passende Offerte",
          description: "Ausarbeitung einer passenden Loesung mit klarer Offerte, sauberem Timing und konkreten Spezifikationen.",
        },
        {
          icon: FiZap,
          title: "Lieferung & Begleitung",
          description: "Entwicklung, Tests, Launch und begleitender Support fuer ein stabiles Ergebnis.",
        },
      ],
    },
  }[locale];

  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">{copy.title}</h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">{copy.body}</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {copy.steps.map((step) => (
            <div key={step.title} className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white">
                <step.icon size={32} />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
