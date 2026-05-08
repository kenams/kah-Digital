"use client";

import Link from "next/link";
import { FiArrowRight, FiGlobe, FiSmartphone, FiBox, FiLayout, FiTool } from "react-icons/fi";
import { useLocale } from "@/lib/locale";

export function ServicesGrid() {
  const { locale, prefix } = useLocale();

  const copy = {
    fr: {
      badge: "Nos offres",
      title: "Ce que je crée pour vous",
      body: "Des solutions digitales claires et accessibles, du site vitrine à l'application mobile, en passant par le SaaS et les outils métier.",
      cta: "Demander un devis",
      forLabel: "Pour qui",
      fromLabel: "À partir de",
      delayLabel: "Délai estimé",
      items: [
        {
          icon: FiLayout,
          accent: "#10b981",
          title: "Landing page",
          eyebrow: "Offre 1",
          forWho: "Entrepreneurs, coachs, freelances, restaurants, artisans, événements",
          description: "Une page claire, percutante et optimisée pour présenter votre offre, collecter des prospects ou vendre un service.",
          includes: ["Design personnalisé", "Formulaire de contact", "Optimisé mobile", "Mise en ligne incluse"],
          price: "300 €",
          delay: "5 à 10 jours",
          href: "/devis",
        },
        {
          icon: FiGlobe,
          accent: "#3b82f6",
          title: "Site web professionnel",
          eyebrow: "Offre 2",
          forWho: "PME, indépendants, commerces, cabinets, associations, restaurants",
          description: "Site vitrine moderne, responsive et rapide. Conçu pour donner confiance, apparaître sur Google et générer des contacts.",
          includes: ["Design sur mesure", "SEO optimisé", "Responsive mobile", "Formulaire de contact"],
          price: "900 €",
          delay: "2 à 3 semaines",
          href: "/devis",
        },
        {
          icon: FiSmartphone,
          accent: "#8b5cf6",
          title: "Application mobile",
          eyebrow: "Offre 3",
          forWho: "Startups, marketplaces, réservation, communauté, sport, outil métier",
          description: "Application iOS et Android ou hybride selon votre besoin. Du MVP simple à la plateforme plus complète, selon votre budget.",
          includes: ["iOS & Android", "Authentification", "Interface sur mesure", "Suivi post-lancement"],
          price: "Sur devis · MVP dès 6 000 €",
          delay: "Sur devis",
          href: "/devis",
        },
        {
          icon: FiBox,
          accent: "#f59e0b",
          title: "SaaS sur mesure",
          eyebrow: "Offre 4",
          forWho: "Entrepreneurs, entreprises qui veulent lancer un outil en ligne",
          description: "Plateforme web avec espace client, abonnements, tableau de bord, gestion utilisateurs et paiements intégrés.",
          includes: ["Espace client", "Paiement Stripe", "Dashboard admin", "Abonnements"],
          price: "Sur devis · MVP dès 6 000 €",
          delay: "Sur devis",
          href: "/devis",
        },
        {
          icon: FiTool,
          accent: "#ec4899",
          title: "Outil web métier",
          eyebrow: "Offre 5",
          forWho: "PME, TPE, équipes qui veulent automatiser ou centraliser",
          description: "Petites applications internes, formulaires intelligents, dashboards, CRM léger, gestion de demandes ou espace administrateur.",
          includes: ["Interface admin", "Base de données", "Formulaires", "Rôles utilisateurs"],
          price: "4 000 €",
          delay: "4 à 10 semaines",
          href: "/devis",
        },
      ],
    },
    en: {
      badge: "Our offers",
      title: "What I build for you",
      body: "Clear, affordable digital solutions: landing pages, mobile apps, SaaS and business tools.",
      cta: "Request a quote",
      forLabel: "For whom",
      fromLabel: "Starting from",
      delayLabel: "Estimated timeline",
      items: [
        {
          icon: FiLayout,
          accent: "#10b981",
          title: "Landing page",
          eyebrow: "Offer 1",
          forWho: "Entrepreneurs, coaches, freelancers, restaurants, events",
          description: "A clear, impactful page optimised to present your offer, collect leads or sell a service.",
          includes: ["Custom design", "Contact form", "Mobile optimised", "Deployment included"],
          price: "€300",
          delay: "5 to 10 days",
          href: "/devis",
        },
        {
          icon: FiGlobe,
          accent: "#3b82f6",
          title: "Professional website",
          eyebrow: "Offer 2",
          forWho: "SMEs, freelancers, shops, practices, associations",
          description: "Modern, responsive and fast showcase site. Designed to build trust, appear on Google and generate enquiries.",
          includes: ["Custom design", "SEO optimised", "Mobile responsive", "Contact form"],
          price: "€900",
          delay: "2 to 3 weeks",
          href: "/devis",
        },
        {
          icon: FiSmartphone,
          accent: "#8b5cf6",
          title: "Mobile application",
          eyebrow: "Offer 3",
          forWho: "Startups, marketplaces, booking, community, sport, business tools",
          description: "iOS and Android or hybrid app. From simple MVP to fuller platform, depending on your budget.",
          includes: ["iOS & Android", "Authentication", "Custom UI", "Post-launch support"],
          price: "On quote · MVP from €6,000",
          delay: "On quote",
          href: "/devis",
        },
        {
          icon: FiBox,
          accent: "#f59e0b",
          title: "Custom SaaS",
          eyebrow: "Offer 4",
          forWho: "Entrepreneurs and businesses wanting to launch an online tool",
          description: "Web platform with client portal, subscriptions, dashboard, user management and integrated payments.",
          includes: ["Client portal", "Stripe payments", "Admin dashboard", "Subscriptions"],
          price: "On quote · MVP from €6,000",
          delay: "On quote",
          href: "/devis",
        },
        {
          icon: FiTool,
          accent: "#ec4899",
          title: "Business web tool",
          eyebrow: "Offer 5",
          forWho: "SMEs and teams wanting to automate or centralise",
          description: "Internal apps, smart forms, dashboards, lightweight CRM, request management or admin portal.",
          includes: ["Admin interface", "Database", "Forms", "User roles"],
          price: "€4,000",
          delay: "4 to 10 weeks",
          href: "/devis",
        },
      ],
    },
    de: {
      badge: "Unsere Angebote",
      title: "Was ich für Sie erstelle",
      body: "Klare, erschwingliche digitale Lösungen: Landing Pages, mobile Apps, SaaS und Business-Tools.",
      cta: "Angebot anfordern",
      forLabel: "Für wen",
      fromLabel: "Ab",
      delayLabel: "Geschätzte Dauer",
      items: [
        {
          icon: FiLayout,
          accent: "#10b981",
          title: "Landing Page",
          eyebrow: "Angebot 1",
          forWho: "Unternehmer, Coaches, Freelancer, Restaurants, Veranstaltungen",
          description: "Eine klare, wirkungsvolle Seite zur Präsentation Ihres Angebots, zur Lead-Generierung oder zum Verkauf eines Dienstleistung.",
          includes: ["Individuelles Design", "Kontaktformular", "Mobile optimiert", "Deployment inklusive"],
          price: "300 €",
          delay: "5 bis 10 Tage",
          href: "/devis",
        },
        {
          icon: FiGlobe,
          accent: "#3b82f6",
          title: "Professionelle Website",
          eyebrow: "Angebot 2",
          forWho: "KMU, Selbstständige, Geschäfte, Praxen, Vereine",
          description: "Moderne, responsive und schnelle Präsentationsseite. Vertrauenswürdig, Google-sichtbar und kontaktgenerierend.",
          includes: ["Individuelles Design", "SEO optimiert", "Responsive", "Kontaktformular"],
          price: "900 €",
          delay: "2 bis 3 Wochen",
          href: "/devis",
        },
        {
          icon: FiSmartphone,
          accent: "#8b5cf6",
          title: "Mobile App",
          eyebrow: "Angebot 3",
          forWho: "Startups, Marktplätze, Buchung, Community, Sport, Business-Tools",
          description: "iOS- und Android-App oder Hybrid je nach Bedarf. Vom einfachen MVP bis zur vollständigeren Plattform.",
          includes: ["iOS & Android", "Authentifizierung", "Individuelles UI", "Post-Launch-Support"],
          price: "Auf Anfrage · MVP ab 6.000 €",
          delay: "Auf Anfrage",
          href: "/devis",
        },
        {
          icon: FiBox,
          accent: "#f59e0b",
          title: "Massgeschneidertes SaaS",
          eyebrow: "Angebot 4",
          forWho: "Unternehmer und Unternehmen, die ein Online-Tool starten möchten",
          description: "Webplattform mit Kundenbereich, Abonnements, Dashboard, Benutzerverwaltung und integrierten Zahlungen.",
          includes: ["Kundenbereich", "Stripe-Zahlung", "Admin-Dashboard", "Abonnements"],
          price: "Auf Anfrage · MVP ab 6.000 €",
          delay: "Auf Anfrage",
          href: "/devis",
        },
        {
          icon: FiTool,
          accent: "#ec4899",
          title: "Business-Web-Tool",
          eyebrow: "Angebot 5",
          forWho: "KMU und Teams, die automatisieren oder zentralisieren möchten",
          description: "Interne Apps, intelligente Formulare, Dashboards, leichtgewichtiges CRM, Anfragenverwaltung oder Admin-Portal.",
          includes: ["Admin-Oberfläche", "Datenbank", "Formulare", "Benutzerrollen"],
          price: "4.000 €",
          delay: "4 bis 10 Wochen",
          href: "/devis",
        },
      ],
    },
  }[locale];

  const withPrefix = (path: string) => (prefix ? `${prefix}${path}` : path);

  return (
    <section className="bg-gray-900 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-400">
            {copy.badge}
          </span>
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-white">{copy.title}</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">{copy.body}</p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {copy.items.map((service) => (
            <div
              key={service.title}
              className="group relative flex flex-col rounded-2xl border border-white/10 bg-gray-950 p-6 transition-all hover:border-white/20"
            >
              {/* Top accent line */}
              <div
                className="absolute inset-x-0 top-0 h-px rounded-t-2xl opacity-60"
                style={{ background: `linear-gradient(to right, transparent, ${service.accent}, transparent)` }}
              />

              {/* Eyebrow */}
              <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: service.accent }}>
                {service.eyebrow}
              </p>

              {/* Icon + title */}
              <div className="mb-4 flex items-center gap-3">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10"
                  style={{ background: `${service.accent}18` }}
                >
                  <service.icon size={20} style={{ color: service.accent }} />
                </div>
                <h3 className="text-xl font-bold text-white">{service.title}</h3>
              </div>

              {/* Pour qui */}
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-500">{copy.forLabel}</p>
              <p className="mb-4 text-sm text-gray-400">{service.forWho}</p>

              {/* Description */}
              <p className="mb-5 text-sm leading-relaxed text-gray-400">{service.description}</p>

              {/* Inclus */}
              <ul className="mb-6 space-y-1.5">
                {service.includes.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-300">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: service.accent }} />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Prix + délai */}
              <div className="mt-auto mb-5 flex flex-wrap items-end justify-between gap-3 border-t border-white/8 pt-5">
                <div>
                  <p className="text-xs text-gray-500">{copy.fromLabel}</p>
                  <p className="text-lg font-bold text-white">{service.price}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">{copy.delayLabel}</p>
                  <p className="text-sm font-semibold text-gray-300">{service.delay}</p>
                </div>
              </div>

              {/* CTA */}
              <Link
                href={withPrefix(service.href)}
                className="group/btn inline-flex items-center justify-center gap-2 rounded-full py-2.5 text-sm font-bold text-white transition-all"
                style={{ background: `linear-gradient(135deg, ${service.accent}cc, ${service.accent})` }}
              >
                {copy.cta}
                <FiArrowRight size={14} className="transition-transform group-hover/btn:translate-x-0.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
