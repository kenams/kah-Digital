"use client";

import Link from "next/link";
import { FiClock, FiFileText, FiMapPin, FiShield } from "react-icons/fi";
import { useLocale } from "@/lib/locale";

export function SwissTrustSection() {
  const { locale, prefix } = useLocale();
  const copy = {
    fr: {
      title: "Ancrage suisse, exécution ouverte",
      body:
        "KAH-Digital travaille avec un ancrage local utile pour la Suisse, tout en gardant un positionnement adapté à des projets plus larges.",
      items: [
        {
          icon: FiMapPin,
          title: "Base à Lausanne",
          description: "Ancrage suisse pour le cadrage, la langue, les attentes et le niveau de formalisation des projets.",
        },
        {
          icon: FiClock,
          title: "Communication claire",
          description: "Réponses rapides, points réguliers et vision nette de l'avancement sans opacité technique.",
        },
        {
          icon: FiFileText,
          title: "Devis structurés",
          description: "Budgets, périmètres et livrables présentés de façon lisible pour faciliter la décision.",
        },
        {
          icon: FiShield,
          title: "Approche professionnelle",
          description: "Un niveau d'exécution propre pour la Suisse, sans fermer la porte à des projets internationaux.",
        },
      ],
    },
    en: {
      title: "Swiss foundation, open execution",
      body:
        "KAH-Digital works from a local Swiss base that stays useful for expectations, while remaining adapted to broader projects.",
      items: [
        {
          icon: FiMapPin,
          title: "Based in Lausanne",
          description: "A Swiss anchor for scoping, language, expectations, and the level of project structure.",
        },
        {
          icon: FiClock,
          title: "Clear communication",
          description: "Fast replies, regular checkpoints, and clear progress without technical opacity.",
        },
        {
          icon: FiFileText,
          title: "Structured quotes",
          description: "Budgets, scope, and deliverables presented in a readable way to make decisions easier.",
        },
        {
          icon: FiShield,
          title: "Professional approach",
          description: "A clean level of execution for Swiss standards, while staying open to international work.",
        },
      ],
    },
    de: {
      title: "Schweizer Basis, offene Umsetzung",
      body:
        "KAH-Digital arbeitet mit einer lokalen Schweizer Basis, die fuer Erwartungen und Arbeitsweise hilfreich bleibt und trotzdem fuer breitere Projekte passt.",
      items: [
        {
          icon: FiMapPin,
          title: "Basis in Lausanne",
          description: "Schweizer Verankerung fuer Briefing, Sprache, Erwartungen und den richtigen Formalisierungsgrad.",
        },
        {
          icon: FiClock,
          title: "Klare Kommunikation",
          description: "Schnelle Antworten, regelmaessige Punkte und ein klarer Blick auf den Fortschritt ohne technische Nebelwand.",
        },
        {
          icon: FiFileText,
          title: "Saubere Offerten",
          description: "Budgets, Scope und Deliverables werden lesbar dargestellt, damit Entscheidungen leichter fallen.",
        },
        {
          icon: FiShield,
          title: "Professioneller Ansatz",
          description: "Saubere Ausfuehrung auf Schweizer Niveau, ohne internationale Projekte auszuschliessen.",
        },
      ],
    },
  }[locale];

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">{copy.title}</h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">{copy.body}</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {copy.items.map((item) => (
            <div key={item.title} className="text-center">
              <item.icon className="mx-auto mb-4 text-green-600" size={48} />
              <h3 className="mb-3 text-xl font-semibold text-gray-900">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
        {locale === "fr" ? (
          <div className="mt-12 rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Pages locales utiles</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              {[
                { label: "Site web a Geneve", href: "/site-web-geneve" },
                { label: "Site web a Lausanne", href: "/site-web-lausanne" },
                { label: "Application web en Suisse", href: "/application-web-suisse" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={prefix ? `${prefix}${item.href}` : item.href}
                  className="rounded-full border border-slate-300 px-5 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-slate-900 hover:text-slate-900"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
