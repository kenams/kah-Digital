"use client";

import { FiCheckCircle, FiClock, FiMapPin, FiUsers } from "react-icons/fi";
import { useLocale } from "@/lib/locale";

export function TrustBar() {
  const { locale } = useLocale();
  const trustItems = {
    fr: [
      { icon: FiMapPin,       text: "Disponible à distance — projets FR, EN et internationaux" },
      { icon: FiClock,        text: "Réponse sous 24h ouvrables" },
      { icon: FiUsers,        text: "PME, marques et startups en croissance" },
      { icon: FiCheckCircle,  text: "Approche claire, rapide et livrable" },
    ],
    en: [
      { icon: FiMapPin,       text: "Remote-ready — FR, EN and international projects" },
      { icon: FiClock,        text: "Reply within 24 business hours" },
      { icon: FiUsers,        text: "SMBs, brands, and growing startups" },
      { icon: FiCheckCircle,  text: "Clear, fast, deliverable approach" },
    ],
    de: [
      { icon: FiMapPin,       text: "Remote verfuegbar — FR, EN und internationale Projekte" },
      { icon: FiClock,        text: "Antwort in 24 Arbeitsstunden" },
      { icon: FiUsers,        text: "KMU, Marken und wachsende Startups" },
      { icon: FiCheckCircle,  text: "Klar, schnell und lieferbar" },
    ],
  }[locale];

  return (
    <section className="border-y border-white/10 bg-gray-900 py-5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {trustItems.map((item) => (
            <div key={item.text} className="flex items-center gap-3">
              <item.icon className="shrink-0 text-blue-400" size={18} />
              <span className="text-sm text-gray-300">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
