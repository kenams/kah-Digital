"use client";

import { useLocale } from "@/lib/locale";

export function StatsBar() {
  const { locale } = useLocale();

  const stats = {
    fr: [
      { value: "30+", label: "Projets livrés" },
      { value: "3–4", label: "Semaines en moyenne" },
      { value: "100%", label: "Devis respectés" },
      { value: "24h", label: "Délai de réponse" },
      { value: "5★", label: "Satisfaction client" },
    ],
    en: [
      { value: "30+", label: "Projects delivered" },
      { value: "3–4", label: "Weeks on average" },
      { value: "100%", label: "Quotes honored" },
      { value: "24h", label: "Response time" },
      { value: "5★", label: "Client satisfaction" },
    ],
    de: [
      { value: "30+", label: "Gelieferte Projekte" },
      { value: "3–4", label: "Wochen im Schnitt" },
      { value: "100%", label: "Angebote eingehalten" },
      { value: "24h", label: "Antwortzeit" },
      { value: "5★", label: "Kundenzufriedenheit" },
    ],
  }[locale];

  return (
    <section className="border-y border-white/6 bg-gray-950 py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1 text-center">
              <span className="text-2xl font-extrabold text-white sm:text-3xl">{stat.value}</span>
              <span className="text-xs text-gray-500">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
