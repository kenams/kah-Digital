"use client";

import { FiCheckCircle, FiClock, FiGlobe, FiShield } from "react-icons/fi";
import { useLocale } from "@/lib/locale";

export function TrustBar() {
  const { locale } = useLocale();
  const trustItems = {
    fr: [
      { icon: FiGlobe,       text: "Lausanne, Suisse · FR / EN / DE" },
      { icon: FiClock,       text: "Réponse sous 24h garantie" },
      { icon: FiCheckCircle, text: "Projets livrables dès € 300" },
      { icon: FiShield,      text: "Devis clair avant tout engagement" },
    ],
    en: [
      { icon: FiGlobe,       text: "Lausanne, Switzerland · FR / EN / DE" },
      { icon: FiClock,       text: "Reply guaranteed within 24h" },
      { icon: FiCheckCircle, text: "Projects from € 300" },
      { icon: FiShield,      text: "Clear quote before any commitment" },
    ],
    de: [
      { icon: FiGlobe,       text: "Lausanne, Schweiz · DE / FR / EN" },
      { icon: FiClock,       text: "Antwort in 24h garantiert" },
      { icon: FiCheckCircle, text: "Projekte ab € 300" },
      { icon: FiShield,      text: "Klares Angebot vor jeder Zusage" },
    ],
  }[locale];

  return (
    <section className="border-y border-white/8 bg-gray-900/60 py-4 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {trustItems.map((item) => (
            <div key={item.text} className="flex items-center gap-2.5">
              <item.icon className="shrink-0 text-blue-400" size={16} />
              <span className="text-sm text-gray-300">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
