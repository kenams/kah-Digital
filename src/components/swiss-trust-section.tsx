"use client";

import { FiClock, FiFileText, FiMapPin, FiShield } from "react-icons/fi";

export function SwissTrustSection() {
  const trustPoints = [
    {
      icon: FiMapPin,
      title: "Base a Lausanne",
      description: "Ancrage Suisse pour le cadrage, la langue, les attentes et le niveau de formalisation des projets.",
    },
    {
      icon: FiClock,
      title: "Communication claire",
      description: "Reponses rapides, points reguliers et vision nette de l'avancement sans opacite technique.",
    },
    {
      icon: FiFileText,
      title: "Devis structures",
      description: "Budgets, perimetres et livrables presents de facon lisible pour faciliter la decision.",
    },
    {
      icon: FiShield,
      title: "Approche professionnelle",
      description: "Un niveau d'execution propre pour la Suisse, sans fermer la porte a des projets internationaux.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ancrage Suisse, execution ouverte</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            KAH-Digital travaille avec un ancrage local utile pour la Suisse, tout en gardant un positionnement adapte a des projets plus larges.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustPoints.map((point) => (
            <div key={point.title} className="text-center">
              <point.icon className="text-green-600 mx-auto mb-4" size={48} />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{point.title}</h3>
              <p className="text-gray-600">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
