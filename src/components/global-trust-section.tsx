"use client";

import Link from "next/link";
import { FiClock, FiFileText, FiGlobe, FiShield } from "react-icons/fi";
import { useLocale } from "@/lib/locale";

export function GlobalTrustSection() {
  const { locale, prefix } = useLocale();
  const copy = {
    fr: {
      title: "Base solide, execution ouverte",
      body:
        "KAH-Digital travaille avec une base stable, une execution lisible et une organisation adaptee a des projets francophones, anglophones et internationaux.",
      items: [
        {
          icon: FiGlobe,
          title: "Organisation internationale",
          description: "Une structure de travail adaptee aux projets a distance, aux equipes mixtes et a des marches varies.",
        },
        {
          icon: FiClock,
          title: "Communication claire",
          description: "Reponses rapides, points reguliers et vision nette de l'avancement sans opacite technique.",
        },
        {
          icon: FiFileText,
          title: "Devis structures",
          description: "Budgets, perimetres et livrables presentes de facon lisible pour faciliter la decision.",
        },
        {
          icon: FiShield,
          title: "Execution professionnelle",
          description: "Un niveau de livraison propre et exploitable, quel que soit le marche vise par le projet.",
        },
      ],
      linksTitle: "Pages d'entree utiles",
      links: [
        { label: "Site web entreprise", href: "/site-web-entreprise" },
        { label: "Refonte site web", href: "/refonte-site-web" },
        { label: "Application web sur mesure", href: "/application-web-sur-mesure" },
        { label: "Automatisation IA entreprise", href: "/automatisation-ia-entreprise" },
      ],
    },
    en: {
      title: "Strong foundation, open execution",
      body:
        "KAH-Digital works with a stable base, readable execution, and a structure that fits French-speaking, English-speaking, and international projects.",
      items: [
        {
          icon: FiGlobe,
          title: "International-ready setup",
          description: "A work structure adapted to remote projects, mixed teams, and clients from different markets.",
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
          description: "A clean level of delivery that stays useful whether the client is local or international.",
        },
      ],
      linksTitle: "Useful entry pages",
      links: [
        { label: "Business website", href: "/site-web-entreprise" },
        { label: "Website redesign", href: "/refonte-site-web" },
        { label: "Custom web app", href: "/application-web-sur-mesure" },
        { label: "AI automation for business", href: "/automatisation-ia-entreprise" },
      ],
    },
    de: {
      title: "Starke Basis, offene Umsetzung",
      body:
        "KAH-Digital arbeitet mit einer stabilen Basis, klarer Umsetzung und einer Struktur, die fuer frankophone, englischsprachige und internationale Projekte passt.",
      items: [
        {
          icon: FiGlobe,
          title: "International aufgestellt",
          description: "Eine Arbeitsstruktur fuer Remote-Projekte, gemischte Teams und unterschiedliche Maerkte.",
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
          description: "Saubere Ausfuehrung mit brauchbaren Deliverables, egal aus welchem Markt die Anfrage kommt.",
        },
      ],
      linksTitle: "Nuetzliche Einstiegsseiten",
      links: [
        { label: "Unternehmenswebsite", href: "/site-web-entreprise" },
        { label: "Website-Refonte", href: "/refonte-site-web" },
        { label: "Individuelle Web-App", href: "/application-web-sur-mesure" },
        { label: "KI-Automatisierung fuer Unternehmen", href: "/automatisation-ia-entreprise" },
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
        <div className="mt-12 rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{copy.linksTitle}</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            {copy.links.map((item) => (
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
      </div>
    </section>
  );
}
