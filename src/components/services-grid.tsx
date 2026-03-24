"use client";

import Link from "next/link";
import { FiArrowRight, FiGlobe, FiSmartphone, FiTool } from "react-icons/fi";
import { useLocale } from "@/lib/locale";

export function ServicesGrid() {
  const { locale, prefix } = useLocale();
  const copy = {
    fr: {
      title: "Nos services",
      body:
        "Trois axes simples : mieux présenter votre entreprise, mieux structurer un outil, ou mieux fluidifier un support.",
      cta: "En savoir plus",
      items: [
        {
          icon: FiGlobe,
          title: "Sites web pour entreprises",
          description:
            "Sites vitrines, sites corporate et présences digitales plus propres, avec paiement simple possible selon le besoin.",
          href: "/services/site-web",
        },
        {
          icon: FiSmartphone,
          title: "Applications web et mobiles",
          description: "Outils métier, portails, tableaux de bord et expériences sur mesure adaptés à votre fonctionnement.",
          href: "/services/applications",
        },
        {
          icon: FiTool,
          title: "Parcours support connecté à GLPI",
          description: "Aide virtuelle, orientation des demandes et passage vers ticket quand le support humain doit reprendre.",
          href: "/services/glpi",
        },
      ],
    },
    en: {
      title: "Our services",
      body: "Three simple directions: present your company better, structure a tool better, or make support flows smoother.",
      cta: "Learn more",
      items: [
        {
          icon: FiGlobe,
          title: "Business websites",
          description: "Showcase sites, corporate websites, and cleaner digital presences to present your business more clearly.",
          href: "/services/site-web",
        },
        {
          icon: FiSmartphone,
          title: "Web and mobile apps",
          description: "Business tools, portals, dashboards, and custom experiences adapted to the way your team works.",
          href: "/services/applications",
        },
        {
          icon: FiTool,
          title: "GLPI-connected support flow",
          description: "Virtual help, request routing, and clean ticket handoff when human support needs to step in.",
          href: "/services/glpi",
        },
      ],
    },
    de: {
      title: "Unsere Leistungen",
      body: "Drei klare Richtungen: das Unternehmen besser praesentieren, ein Tool besser strukturieren oder Support sauberer machen.",
      cta: "Mehr erfahren",
      items: [
        {
          icon: FiGlobe,
          title: "Unternehmenswebsites",
          description: "Praesentationsseiten, Corporate Sites und saubere digitale Auftritte, um eure Aktivitaet klarer zu zeigen.",
          href: "/services/site-web",
        },
        {
          icon: FiSmartphone,
          title: "Web- und Mobile-Anwendungen",
          description: "Business-Tools, Portale, Dashboards und massgeschneiderte Erlebnisse passend zu euren Prozessen.",
          href: "/services/applications",
        },
        {
          icon: FiTool,
          title: "GLPI-verbundener Support-Flow",
          description: "Virtuelle Hilfe, Routing von Anfragen und saubere Uebergabe an Tickets, wenn Support uebernehmen muss.",
          href: "/services/glpi",
        },
      ],
    },
  }[locale];

  const withPrefix = (path: string) => (prefix ? `${prefix}${path}` : path);

  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">{copy.title}</h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">{copy.body}</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {copy.items.map((service) => (
            <div key={service.title} className="rounded-lg bg-white p-6 shadow-lg transition-shadow hover:shadow-xl">
              <service.icon className="mb-4 text-blue-600" size={48} />
              <h3 className="mb-3 text-xl font-semibold text-gray-900">{service.title}</h3>
              <p className="mb-4 text-gray-600">{service.description}</p>
              <Link href={withPrefix(service.href)} className="inline-flex items-center font-semibold text-blue-600 hover:text-blue-800">
                {copy.cta} <FiArrowRight className="ml-2" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
