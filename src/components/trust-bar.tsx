"use client";

import { FiCheckCircle, FiClock, FiMapPin, FiUsers } from "react-icons/fi";

export function TrustBar() {
  const trustItems = [
    { icon: FiMapPin, text: "Base a Lausanne, ouvert a l'international" },
    { icon: FiClock, text: "Reponse sous 24h ouvrables" },
    { icon: FiUsers, text: "Concu pour PME et structures en croissance" },
    { icon: FiCheckCircle, text: "Approche claire, rapide et exploitable" },
  ];

  return (
    <section className="bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {trustItems.map((item) => (
            <div key={item.text} className="flex items-center space-x-3">
              <item.icon className="text-green-600" size={24} />
              <span className="text-gray-800 font-medium">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
