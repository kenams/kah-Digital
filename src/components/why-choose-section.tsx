"use client";

import { FiCheck, FiClock, FiUsers, FiZap } from "react-icons/fi";

export function WhyChooseSection() {
  const reasons = [
    {
      icon: FiZap,
      title: "Rapidité d'exécution",
      description: "De l'idée au lancement en quelques semaines, sans compromis sur la qualité.",
    },
    {
      icon: FiUsers,
      title: "Accompagnement humain",
      description: "Un interlocuteur dédié qui comprend vos enjeux et vous guide à chaque étape.",
    },
    {
      icon: FiCheck,
      title: "Solutions concrètes",
      description: "Des outils qui résolvent vos problèmes réels et améliorent votre productivité.",
    },
    {
      icon: FiClock,
      title: "Approche claire et efficace",
      description: "Communication transparente, devis détaillés et délais respectés.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Pourquoi choisir KAH-Digital ?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Parce que votre temps est précieux et que vos projets méritent une exécution professionnelle.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <div key={index} className="text-center">
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