"use client";

import { FiCheck, FiClock, FiUsers, FiZap } from "react-icons/fi";

export function WhyChooseSection() {
  const reasons = [
    {
      icon: FiZap,
      title: "Execution rapide",
      description: "Un cadrage court, des decisions claires et une production qui avance sans allers-retours inutiles.",
    },
    {
      icon: FiUsers,
      title: "Dialogue simple",
      description: "Un interlocuteur unique, des echanges directs et un niveau de langage adapte a l'entreprise.",
    },
    {
      icon: FiCheck,
      title: "Solutions utiles",
      description: "Le but n'est pas d'ajouter de la complexite, mais de resoudre un vrai besoin avec un perimetre juste.",
    },
    {
      icon: FiClock,
      title: "Cadre propre",
      description: "Devis lisibles, rythme de travail clair et priorites assumees du debut a la mise en ligne.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Pourquoi choisir KAH-Digital ?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Parce qu'un projet digital doit etre bien cadre, bien execute et rester comprenable pour l'entreprise.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason) => (
            <div key={reason.title} className="text-center">
              <reason.icon className="text-blue-600 mx-auto mb-4" size={48} />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{reason.title}</h3>
              <p className="text-gray-600">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
