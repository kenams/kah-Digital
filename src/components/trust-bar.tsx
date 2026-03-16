"use client";

import { FiCheckCircle, FiClock, FiMapPin, FiUsers } from "react-icons/fi";

export function TrustBar() {
  const trustItems = [
    { icon: FiMapPin, text: "Spécialisé Suisse romande" },
    { icon: FiClock, text: "Réponse sous 24h" },
    { icon: FiUsers, text: "Pensé pour les PME" },
    { icon: FiCheckCircle, text: "Approche claire et efficace" },
  ];

  return (
    <section className="bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {trustItems.map((item, index) => (
            <div key={index} className="flex items-center space-x-3">
              <item.icon className="text-green-600" size={24} />
              <span className="text-gray-800 font-medium">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}