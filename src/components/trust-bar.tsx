"use client";

import { FiCheckCircle, FiClock, FiMapPin, FiTrendingUp } from "react-icons/fi";
import { useLocale } from "@/lib/locale";

export function TrustBar() {
  const { locale } = useLocale();
  const trustItems = {
    fr: [
      {
        icon: FiTrendingUp,
        title: "Lecture immediate",
        text: "L'offre doit se comprendre vite et donner envie d'aller plus loin.",
      },
      {
        icon: FiCheckCircle,
        title: "Resultat concret",
        text: "Chaque ecran doit capter, qualifier ou reduire une tache repetitive.",
      },
      {
        icon: FiClock,
        title: "Cadre rapide",
        text: "Plan, budget et premiere direction poses sous 48h quand le brief est clair.",
      },
      {
        icon: FiMapPin,
        title: "Execution souple",
        text: "Projet gere a distance pour PME, marques et equipes multi-pays.",
      },
    ],
    en: [
      {
        icon: FiTrendingUp,
        title: "Fast read",
        text: "The offer should be understood quickly and make the next step obvious.",
      },
      {
        icon: FiCheckCircle,
        title: "Concrete outcome",
        text: "Every screen should capture, qualify, or reduce repetitive work.",
      },
      {
        icon: FiClock,
        title: "Fast framework",
        text: "Plan, budget, and first direction within 48h when the brief is clear.",
      },
      {
        icon: FiMapPin,
        title: "Flexible delivery",
        text: "Remote-ready for SMBs, brands, and multi-country teams.",
      },
    ],
    de: [
      {
        icon: FiTrendingUp,
        title: "Schnell erfassbar",
        text: "Das Angebot soll sofort klar sein und den naechsten Schritt ausloesen.",
      },
      {
        icon: FiCheckCircle,
        title: "Konkreter Nutzen",
        text: "Jeder Screen soll erfassen, qualifizieren oder repetitive Arbeit reduzieren.",
      },
      {
        icon: FiClock,
        title: "Schneller Rahmen",
        text: "Plan, Budget und erste Richtung in 48h, wenn das Briefing klar ist.",
      },
      {
        icon: FiMapPin,
        title: "Flexible Umsetzung",
        text: "Remote-geeignet fuer KMU, Marken und internationale Teams.",
      },
    ],
  }[locale];

  return (
    <section className="section-shell py-0">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {trustItems.map((item) => (
          <div key={item.title} className="premium-card rounded-3xl border border-white/10 bg-white/5 p-5 text-white">
            <item.icon className="text-[#d6b36a]" size={22} />
            <p className="mt-4 text-sm uppercase tracking-[0.28em] text-white/45">{item.title}</p>
            <p className="mt-3 text-sm leading-6 text-white/70">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
