"use client";

import { FiMessageSquare, FiSettings, FiZap } from "react-icons/fi";

export function ProcessSection() {
  const steps = [
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
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Notre méthode</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Un processus structuré pour des résultats fiables et dans les délais.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <step.icon size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}