"use client";

import { FiMapPin, FiClock, FiFileText, FiShield } from "react-icons/fi";

export function SwissTrustSection() {
  const trustPoints = [
    {
      icon: FiMapPin,
      title: "Travail à distance possible",
      description: "Collaboration fluide depuis la France pour vos projets en Suisse romande.",
    },
    {
      icon: FiClock,
      title: "Communication claire",
      description: "Réponses rapides, points réguliers et transparence sur l'avancement.",
    },
    {
      icon: FiFileText,
      title: "Devis structurés",
      description: "Documents professionnels avec TVA suisse et conditions adaptées.",
    },
    {
      icon: FiShield,
      title: "Accompagnement professionnel",
      description: "Expertise technique et conseil stratégique pour votre transformation digitale.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Confiance suisse</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Des solutions pensées pour les PME suisses, avec une approche adaptée à votre marché.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustPoints.map((point, index) => (
            <div key={index} className="text-center">
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