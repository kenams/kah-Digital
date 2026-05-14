"use client";

import { FiCheckCircle, FiClock, FiGlobe, FiShield } from "react-icons/fi";
import { useLocale } from "@/lib/locale";

export function TrustBar() {
  const { locale } = useLocale();

  const trustItems = locale === "en"
    ? [
        { icon: FiGlobe,       text: "Lausanne, Switzerland · FR / EN" },
        { icon: FiClock,       text: "Reply guaranteed within 24h" },
        { icon: FiCheckCircle, text: "Service adjusted to your need" },
        { icon: FiShield,      text: "Clear quote before any commitment" },
      ]
    : [
        { icon: FiGlobe,       text: "Lausanne, Suisse · FR / EN" },
        { icon: FiClock,       text: "Réponse sous 24h garantie" },
        { icon: FiCheckCircle, text: "Prestation ajustée à votre besoin" },
        { icon: FiShield,      text: "Devis clair avant tout engagement" },
      ];

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
