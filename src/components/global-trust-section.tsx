"use client";

import Link from "next/link";
import { FiClock, FiFileText, FiGlobe, FiShield } from "react-icons/fi";
import { useLocale } from "@/lib/locale";

export function GlobalTrustSection() {
  const { locale, prefix } = useLocale();
  const copy = {
    fr: {
      eyebrow: "Pourquoi KAH-Digital",
      title: "Base solide, exécution ouverte",
      body: "KAH-Digital travaille avec une base stable, une exécution lisible et une organisation adaptée à des projets francophones, anglophones et internationaux.",
      items: [
        {
          icon: FiGlobe,
          accent: "#3b82f6",
          title: "Organisation internationale",
          description: "Structure adaptée aux projets à distance, équipes mixtes et marchés variés.",
        },
        {
          icon: FiClock,
          accent: "#8b5cf6",
          title: "Communication claire",
          description: "Réponses rapides, points réguliers et vision nette de l'avancement, sans opacité technique.",
        },
        {
          icon: FiFileText,
          accent: "#10b981",
          title: "Devis structurés",
          description: "Budgets, périmètres et livrables présentés de façon lisible pour faciliter la décision.",
        },
        {
          icon: FiShield,
          accent: "#f59e0b",
          title: "Approche professionnelle",
          description: "Exécution soignée avec des livrables utilisables, quelle que soit l'origine du projet.",
        },
      ],
      linksTitle: "Pages de services",
      links: [
        { label: "Site web entreprise", href: "/site-web-entreprise" },
        { label: "Refonte site web", href: "/refonte-site-web" },
        { label: "Application web sur mesure", href: "/application-web-sur-mesure" },
        { label: "Automatisation IA entreprise", href: "/automatisation-ia-entreprise" },
      ],
    },
    en: {
      eyebrow: "Why KAH-Digital",
      title: "Solid foundation, open execution",
      body: "KAH-Digital works with a stable base, readable execution, and an organization adapted to French, English, and international projects.",
      items: [
        {
          icon: FiGlobe,
          accent: "#3b82f6",
          title: "International organization",
          description: "Adapted for remote projects, mixed teams, and varied markets.",
        },
        {
          icon: FiClock,
          accent: "#8b5cf6",
          title: "Clear communication",
          description: "Fast replies, regular check-ins, and a clear view of progress, no technical opacity.",
        },
        {
          icon: FiFileText,
          accent: "#10b981",
          title: "Structured quotes",
          description: "Budgets, scopes, and deliverables presented clearly to facilitate decisions.",
        },
        {
          icon: FiShield,
          accent: "#f59e0b",
          title: "Professional approach",
          description: "Clean execution with usable deliverables, regardless of where the project comes from.",
        },
      ],
      linksTitle: "Service pages",
      links: [
        { label: "Business website", href: "/site-web-entreprise" },
        { label: "Website redesign", href: "/refonte-site-web" },
        { label: "Custom web application", href: "/application-web-sur-mesure" },
        { label: "AI automation for business", href: "/automatisation-ia-entreprise" },
      ],
    },
    de: {
      eyebrow: "Warum KAH-Digital",
      title: "Stabile Basis, offene Umsetzung",
      body: "KAH-Digital arbeitet mit einer stabilen Basis, lesbarer Umsetzung und einer Organisation, die für deutsch-, französisch- und englischsprachige Projekte ausgelegt ist.",
      items: [
        {
          icon: FiGlobe,
          accent: "#3b82f6",
          title: "Internationale Organisation",
          description: "Für Remote-Projekte, gemischte Teams und verschiedene Märkte ausgelegt.",
        },
        {
          icon: FiClock,
          accent: "#8b5cf6",
          title: "Klare Kommunikation",
          description: "Schnelle Antworten, regelmäßige Updates, klarer Fortschrittsblick, ohne technische Intransparenz.",
        },
        {
          icon: FiFileText,
          accent: "#10b981",
          title: "Strukturierte Angebote",
          description: "Budgets, Umfang und Lieferables klar dargestellt, damit Entscheidungen leicht fallen.",
        },
        {
          icon: FiShield,
          accent: "#f59e0b",
          title: "Professioneller Ansatz",
          description: "Saubere Umsetzung mit brauchbaren Deliverables, egal aus welchem Markt die Anfrage kommt.",
        },
      ],
      linksTitle: "Service-Seiten",
      links: [
        { label: "Unternehmenswebsite", href: "/site-web-entreprise" },
        { label: "Website-Refonte", href: "/refonte-site-web" },
        { label: "Individuelle Web-App", href: "/application-web-sur-mesure" },
        { label: "KI-Automatisierung für Unternehmen", href: "/automatisation-ia-entreprise" },
      ],
    },
  }[locale];

  return (
    <section className="bg-gray-950 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-400">
            {copy.eyebrow}
          </span>
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-white">{copy.title}</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">{copy.body}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {copy.items.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/8 bg-gray-900/60 p-5 transition hover:border-white/16"
            >
              <div
                className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ background: `${item.accent}20` }}
              >
                <item.icon size={20} style={{ color: item.accent }} />
              </div>
              <h3 className="mb-2 font-semibold text-white">{item.title}</h3>
              <p className="text-sm leading-relaxed text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-white/8 bg-white/[0.03] p-5 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500">{copy.linksTitle}</p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {copy.links.map((item) => (
              <Link
                key={item.href}
                href={prefix ? `${prefix}${item.href}` : item.href}
                className="rounded-full border border-white/10 px-4 py-2 text-sm text-gray-400 transition hover:border-white/25 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
