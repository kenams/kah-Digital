"use client";

import { FiCheckCircle, FiClock, FiMapPin, FiUsers } from "react-icons/fi";
import { useLocale } from "@/lib/locale";

export function TrustBar() {
  const { locale } = useLocale();
  const trustItems = {
    fr: [
      { icon: FiMapPin, text: "Basé à Lausanne, ouvert à l'international" },
      { icon: FiClock, text: "Réponse sous 24h ouvrables" },
      { icon: FiUsers, text: "Conçu pour PME et structures en croissance" },
      { icon: FiCheckCircle, text: "Approche claire, rapide et exploitable" },
    ],
    en: [
      { icon: FiMapPin, text: "Based in Lausanne, open internationally" },
      { icon: FiClock, text: "Reply within 24 business hours" },
      { icon: FiUsers, text: "Built for SMBs and growing teams" },
      { icon: FiCheckCircle, text: "Clear, fast, and actionable approach" },
    ],
    de: [
      { icon: FiMapPin, text: "Basis in Lausanne, offen fuer international" },
      { icon: FiClock, text: "Antwort innerhalb von 24 Arbeitsstunden" },
      { icon: FiUsers, text: "Fuer KMU und wachsende Strukturen gedacht" },
      { icon: FiCheckCircle, text: "Klare, schnelle und nutzbare Arbeitsweise" },
    ],
  }[locale];

  return (
    <section className="bg-white py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {trustItems.map((item) => (
            <div key={item.text} className="flex items-center space-x-3">
              <item.icon className="text-green-600" size={24} />
              <span className="font-medium text-gray-800">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
