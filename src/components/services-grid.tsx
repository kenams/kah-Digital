"use client";

import Link from "next/link";
import { FiArrowRight, FiGlobe, FiSmartphone, FiTool, FiZap } from "react-icons/fi";
import { useLocale } from "@/lib/locale";

export function ServicesGrid() {
  const { locale, prefix } = useLocale();
  const copy = {
    fr: {
      badge: "Nos services",
      title: "Tout ce qu'il faut pour développer votre présence digitale",
      body: "Trois axes clairs : présenter votre activité, outiller votre équipe, ou fluidifier votre support.",
      cta: "En savoir plus",
      items: [
        {
          icon: FiGlobe,
          accent: "#3b82f6",
          title: "Sites web pour entreprises",
          description: "Sites vitrines et corporate ultra-propres, rapides et optimisés SEO. Design sur mesure, paiement intégré si besoin.",
          tags: ["Vitrine", "Corporate", "SEO", "Paiement"],
          href: "/services/site-web",
        },
        {
          icon: FiSmartphone,
          accent: "#8b5cf6",
          title: "Applications web & mobiles",
          description: "Outils métier, portails clients, tableaux de bord et apps sur mesure adaptés à vos process et votre équipe.",
          tags: ["Web", "Mobile", "Dashboard", "Sur mesure"],
          href: "/services/applications",
        },
        {
          icon: FiTool,
          accent: "#10b981",
          title: "Support connecté GLPI",
          description: "Assistant virtuel, orientation des demandes et passage fluide au ticket GLPI quand le support humain doit reprendre.",
          tags: ["GLPI", "Chatbot", "Support", "Tickets"],
          href: "/services/glpi",
        },
        {
          icon: FiZap,
          accent: "#f59e0b",
          title: "Outils IA & automatisation",
          description: "Prospection automatique, agents IA, workflows no-code/low-code pour libérer votre équipe des tâches répétitives.",
          tags: ["IA", "Automation", "Claude", "Emails"],
          href: "/services",
        },
      ],
    },
    en: {
      badge: "Our services",
      title: "Everything you need to grow your digital presence",
      body: "Three clear directions: showcase your business, equip your team, or smooth out your support.",
      cta: "Learn more",
      items: [
        {
          icon: FiGlobe,
          accent: "#3b82f6",
          title: "Business websites",
          description: "Clean, fast, SEO-optimised showcase and corporate websites. Custom design, integrated payments if needed.",
          tags: ["Showcase", "Corporate", "SEO", "Payments"],
          href: "/services/site-web",
        },
        {
          icon: FiSmartphone,
          accent: "#8b5cf6",
          title: "Web & mobile apps",
          description: "Business tools, client portals, dashboards, and custom apps adapted to your workflows and team.",
          tags: ["Web", "Mobile", "Dashboard", "Custom"],
          href: "/services/applications",
        },
        {
          icon: FiTool,
          accent: "#10b981",
          title: "GLPI-connected support",
          description: "Virtual assistant, request routing, and clean ticket handoff to GLPI when human support needs to step in.",
          tags: ["GLPI", "Chatbot", "Support", "Tickets"],
          href: "/services/glpi",
        },
        {
          icon: FiZap,
          accent: "#f59e0b",
          title: "AI tools & automation",
          description: "Automated outreach, AI agents, no-code/low-code workflows to free your team from repetitive tasks.",
          tags: ["AI", "Automation", "Claude", "Emails"],
          href: "/services",
        },
      ],
    },
    de: {
      badge: "Unsere Leistungen",
      title: "Alles fuer eine starke digitale Praesenz",
      body: "Drei klare Richtungen: Unternehmen praesentieren, Team ausruesten oder Support optimieren.",
      cta: "Mehr erfahren",
      items: [
        {
          icon: FiGlobe,
          accent: "#3b82f6",
          title: "Unternehmenswebsites",
          description: "Saubere, schnelle und SEO-optimierte Praesentationsseiten. Custom-Design, integrierte Zahlungen falls noetig.",
          tags: ["Vitrine", "Corporate", "SEO", "Zahlung"],
          href: "/services/site-web",
        },
        {
          icon: FiSmartphone,
          accent: "#8b5cf6",
          title: "Web- & Mobile-Anwendungen",
          description: "Business-Tools, Kundenportale, Dashboards und Apps passend zu euren Prozessen und eurer Arbeitsweise.",
          tags: ["Web", "Mobile", "Dashboard", "Custom"],
          href: "/services/applications",
        },
        {
          icon: FiTool,
          accent: "#10b981",
          title: "GLPI-verbundener Support",
          description: "Virtueller Assistent, Routing von Anfragen und saubere Uebergabe an GLPI-Tickets.",
          tags: ["GLPI", "Chatbot", "Support", "Tickets"],
          href: "/services/glpi",
        },
        {
          icon: FiZap,
          accent: "#f59e0b",
          title: "KI-Tools & Automatisierung",
          description: "Automatisierte Akquise, KI-Agenten, No-Code-Workflows fuer weniger Routinearbeit.",
          tags: ["KI", "Automation", "Claude", "Emails"],
          href: "/services",
        },
      ],
    },
  }[locale];

  const withPrefix = (path: string) => (prefix ? `${prefix}${path}` : path);

  return (
    <section className="bg-gray-950 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-400">
            {copy.badge}
          </span>
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-white">{copy.title}</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">{copy.body}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {copy.items.map((service) => (
            <Link
              key={service.title}
              href={withPrefix(service.href)}
              className="group relative rounded-2xl border border-white/10 bg-gray-900 p-6 transition-all hover:border-white/20 hover:bg-gray-800/80"
            >
              {/* Accent glow */}
              <div
                className="absolute inset-x-0 top-0 h-px rounded-t-2xl transition-opacity group-hover:opacity-100 opacity-0"
                style={{ background: `linear-gradient(to right, transparent, ${service.accent}, transparent)` }}
              />

              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10"
                style={{ background: `${service.accent}18` }}>
                <service.icon size={22} style={{ color: service.accent }} />
              </div>

              <h3 className="mb-2 text-lg font-bold text-white">{service.title}</h3>
              <p className="mb-4 text-sm leading-relaxed text-gray-400">{service.description}</p>

              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-white/5 px-2.5 py-0.5 text-xs text-gray-500">{tag}</span>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-1 text-sm font-semibold transition-colors"
                style={{ color: service.accent }}>
                {copy.cta} <FiArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
