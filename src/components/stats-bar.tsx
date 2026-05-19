"use client";

import { useLocale } from "@/lib/locale";

export function StatsBar() {
  const { locale } = useLocale();

  const stats =
    locale === "en"
      ? [
          { value: "99€", label: "Starting price" },
          { value: "5 days", label: "First delivery" },
          { value: "70+", label: "Systems delivered" },
          { value: "24h", label: "Response time" },
          { value: "100%", label: "On-budget" },
        ]
      : locale === "de"
      ? [
          { value: "99€", label: "Ab diesem Preis" },
          { value: "5 Tage", label: "Erste Lieferung" },
          { value: "70+", label: "Systeme geliefert" },
          { value: "24h", label: "Antwortzeit" },
          { value: "100%", label: "Budget eingehalten" },
        ]
      : [
          { value: "99€", label: "Dès ce prix" },
          { value: "5 jours", label: "1ère livraison" },
          { value: "70+", label: "Systèmes livrés" },
          { value: "24h", label: "Délai de réponse" },
          { value: "100%", label: "Budget respecté" },
        ];

  return (
    <section className="border-y border-white/6 bg-gray-950 py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1 text-center">
              <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-2xl font-extrabold text-transparent sm:text-3xl">
                {stat.value}
              </span>
              <span className="text-xs text-gray-500">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
