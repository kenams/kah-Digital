"use client";

import Link from "next/link";
import { FiArrowRight, FiGlobe, FiSmartphone, FiBox, FiLayout, FiTool } from "react-icons/fi";
import { useLocale } from "@/lib/locale";

export function ServicesGrid() {
  const { locale, prefix } = useLocale();

  const copy = {
    fr: {
      badge: "Prestations ajustables",
      title: "Ce que je crée pour vous",
      body: "Des agents IA verticaux branchés sur un seul métier, et les fondations digitales qui vont avec — du site vitrine au SaaS sur mesure.",
      cta: "Demander un devis personnalisé",
      forLabel: "Pour qui",
      fromLabel: "Approche",
      delayLabel: "Délai estimé",
      items: [
        {
          icon: FiBox,
          accent: "#8b5cf6",
          title: "Agent IA vertical",
          eyebrow: "Solution phare",
          forWho: "Artistes indépendants, PME, indépendants qui veulent déléguer un métier entier",
          description: "Un agent branché sur votre métier de bout en bout — pas un chatbot générique. Preuve en production : KAH Workforce, chef de cabinet IA pour artistes.",
          includes: ["Intégré à vos outils réels", "Autonome, pas piloté au prompt", "Mémoire persistante", "Décisions courantes déléguées"],
          price: "Périmètre défini après échange",
          delay: "Selon périmètre",
          href: "/devis",
        },
        {
          icon: FiLayout,
          accent: "#10b981",
          title: "Landing page",
          eyebrow: "Solution 1",
          forWho: "Entrepreneurs, coachs, freelances, restaurants, artisans, événements",
          description: "Une page claire, percutante et optimisée pour présenter votre offre, collecter des prospects ou vendre un service.",
          includes: ["Design personnalisé", "Formulaire de contact", "Optimisé mobile", "Mise en ligne incluse"],
          price: "Périmètre défini après échange",
          delay: "5 à 10 jours",
          href: "/devis",
        },
        {
          icon: FiGlobe,
          accent: "#3b82f6",
          title: "Site web professionnel",
          eyebrow: "Solution 2",
          forWho: "PME, indépendants, commerces, cabinets, associations, restaurants",
          description: "Site vitrine moderne, responsive et rapide. Conçu pour donner confiance, apparaître sur Google et générer des contacts.",
          includes: ["Design sur mesure", "SEO optimisé", "Responsive mobile", "Formulaire de contact"],
          price: "Prestation adaptée au contenu",
          delay: "2 à 3 semaines",
          href: "/devis",
        },
        {
          icon: FiSmartphone,
          accent: "#8b5cf6",
          title: "Application mobile",
          eyebrow: "Solution 3",
          forWho: "Startups, marketplaces, réservation, communauté, sport, outil métier",
          description: "Application iOS et Android ou hybride selon votre besoin. Du MVP simple à la plateforme plus complète, selon vos priorités.",
          includes: ["iOS & Android", "Authentification", "Interface sur mesure", "Suivi post-lancement"],
          price: "Estimation après cadrage",
          delay: "Selon périmètre",
          href: "/devis",
        },
        {
          icon: FiBox,
          accent: "#f59e0b",
          title: "SaaS sur mesure",
          eyebrow: "Solution 4",
          forWho: "Entrepreneurs, entreprises qui veulent lancer un outil en ligne",
          description: "Plateforme web avec espace client, abonnements, tableau de bord, gestion utilisateurs et paiements intégrés.",
          includes: ["Espace client", "Paiement Stripe", "Dashboard admin", "Abonnements"],
          price: "Solution construite sur mesure",
          delay: "Selon périmètre",
          href: "/devis",
        },
        {
          icon: FiTool,
          accent: "#ec4899",
          title: "Outil web métier",
          eyebrow: "Solution 5",
          forWho: "PME, TPE, équipes qui veulent automatiser ou centraliser",
          description: "Petites applications internes, formulaires intelligents, dashboards, CRM léger, gestion de demandes ou espace administrateur.",
          includes: ["Interface admin", "Base de données", "Formulaires", "Rôles utilisateurs"],
          price: "Priorités définies ensemble",
          delay: "4 à 10 semaines",
          href: "/devis",
        },
      ],
    },
    en: {
      badge: "Adjustable services",
      title: "What I build for you",
      body: "Vertical AI agents wired into one job, plus the digital foundations that come with them — from landing pages to custom SaaS.",
      cta: "Request a custom quote",
      forLabel: "For whom",
      fromLabel: "Approach",
      delayLabel: "Estimated timeline",
      items: [
        {
          icon: FiBox,
          accent: "#8b5cf6",
          title: "Vertical AI agent",
          eyebrow: "Flagship solution",
          forWho: "Independent artists, SMEs, freelancers who want to delegate an entire job",
          description: "An agent wired into your business end to end — not a generic chatbot. Flagship proof: KAH Workforce, a live AI chief-of-staff for artists.",
          includes: ["Integrated into your real tools", "Autonomous, not prompt-driven", "Persistent memory", "Everyday decisions delegated"],
          price: "Scope defined after discussion",
          delay: "Based on scope",
          href: "/devis",
        },
        {
          icon: FiLayout,
          accent: "#10b981",
          title: "Landing page",
          eyebrow: "Solution 1",
          forWho: "Entrepreneurs, coaches, freelancers, restaurants, events",
          description: "A clear, impactful page optimised to present your offer, collect leads or sell a service.",
          includes: ["Custom design", "Contact form", "Mobile optimised", "Deployment included"],
          price: "Scope defined after discussion",
          delay: "5 to 10 days",
          href: "/devis",
        },
        {
          icon: FiGlobe,
          accent: "#3b82f6",
          title: "Professional website",
          eyebrow: "Solution 2",
          forWho: "SMEs, freelancers, shops, practices, associations",
          description: "Modern, responsive and fast showcase site. Designed to build trust, appear on Google and generate enquiries.",
          includes: ["Custom design", "SEO optimised", "Mobile responsive", "Contact form"],
          price: "Adjusted to the content",
          delay: "2 to 3 weeks",
          href: "/devis",
        },
        {
          icon: FiSmartphone,
          accent: "#8b5cf6",
          title: "Mobile application",
          eyebrow: "Solution 3",
          forWho: "Startups, marketplaces, booking, community, sport, business tools",
          description: "iOS and Android or hybrid app. From simple MVP to fuller platform, depending on your priorities.",
          includes: ["iOS & Android", "Authentication", "Custom UI", "Post-launch support"],
          price: "Estimated after scoping",
          delay: "Based on scope",
          href: "/devis",
        },
        {
          icon: FiBox,
          accent: "#f59e0b",
          title: "Custom SaaS",
          eyebrow: "Solution 4",
          forWho: "Entrepreneurs and businesses wanting to launch an online tool",
          description: "Web platform with client portal, subscriptions, dashboard, user management and integrated payments.",
          includes: ["Client portal", "Stripe payments", "Admin dashboard", "Subscriptions"],
          price: "Built around the need",
          delay: "Based on scope",
          href: "/devis",
        },
        {
          icon: FiTool,
          accent: "#ec4899",
          title: "Business web tool",
          eyebrow: "Solution 5",
          forWho: "SMEs and teams wanting to automate or centralise",
          description: "Internal apps, smart forms, dashboards, lightweight CRM, request management or admin portal.",
          includes: ["Admin interface", "Database", "Forms", "User roles"],
          price: "Priorities defined together",
          delay: "4 to 10 weeks",
          href: "/devis",
        },
      ],
    },
    de: {
      badge: "Anpassbare Leistungen",
      title: "Was ich für Sie erstelle",
      body: "Vertikale KI-Agenten, die auf einen Job spezialisiert sind, plus die digitalen Grundlagen dazu — von der Landing Page bis zum massgeschneiderten SaaS.",
      cta: "Individuelle Offerte anfragen",
      forLabel: "Für wen",
      fromLabel: "Ansatz",
      delayLabel: "Geschätzte Dauer",
      items: [
        {
          icon: FiBox,
          accent: "#8b5cf6",
          title: "Vertikaler KI-Agent",
          eyebrow: "Vorzeigelösung",
          forWho: "Unabhängige Künstler, KMU, Selbstständige, die einen ganzen Job delegieren wollen",
          description: "Ein Agent, der Ende-zu-Ende in Ihr Geschäft eingebettet ist — kein generischer Chatbot. Aushängeschild: KAH Workforce, ein live KI-Kabinettschef für Künstler.",
          includes: ["In Ihre echten Tools integriert", "Autonom, nicht prompt-gesteuert", "Persistentes Gedächtnis", "Alltägliche Entscheidungen delegiert"],
          price: "Umfang nach Gespräch definiert",
          delay: "Je nach Umfang",
          href: "/devis",
        },
        {
          icon: FiLayout,
          accent: "#10b981",
          title: "Landing Page",
          eyebrow: "Lösung 1",
          forWho: "Unternehmer, Coaches, Freelancer, Restaurants, Veranstaltungen",
          description: "Eine klare, wirkungsvolle Seite zur Präsentation Ihres Angebots, zur Lead-Generierung oder zum Verkauf eines Dienstleistung.",
          includes: ["Individuelles Design", "Kontaktformular", "Mobile optimiert", "Deployment inklusive"],
          price: "Umfang nach Gespräch definiert",
          delay: "5 bis 10 Tage",
          href: "/devis",
        },
        {
          icon: FiGlobe,
          accent: "#3b82f6",
          title: "Professionelle Website",
          eyebrow: "Lösung 2",
          forWho: "KMU, Selbstständige, Geschäfte, Praxen, Vereine",
          description: "Moderne, responsive und schnelle Präsentationsseite. Vertrauenswürdig, Google-sichtbar und kontaktgenerierend.",
          includes: ["Individuelles Design", "SEO optimiert", "Responsive", "Kontaktformular"],
          price: "An Inhalte angepasst",
          delay: "2 bis 3 Wochen",
          href: "/devis",
        },
        {
          icon: FiSmartphone,
          accent: "#8b5cf6",
          title: "Mobile App",
          eyebrow: "Lösung 3",
          forWho: "Startups, Marktplätze, Buchung, Community, Sport, Business-Tools",
          description: "iOS- und Android-App oder Hybrid je nach Bedarf. Vom einfachen MVP bis zur vollständigeren Plattform.",
          includes: ["iOS & Android", "Authentifizierung", "Individuelles UI", "Post-Launch-Support"],
          price: "Schätzung nach Scoping",
          delay: "Je nach Umfang",
          href: "/devis",
        },
        {
          icon: FiBox,
          accent: "#f59e0b",
          title: "Massgeschneidertes SaaS",
          eyebrow: "Lösung 4",
          forWho: "Unternehmer und Unternehmen, die ein Online-Tool starten möchten",
          description: "Webplattform mit Kundenbereich, Abonnements, Dashboard, Benutzerverwaltung und integrierten Zahlungen.",
          includes: ["Kundenbereich", "Stripe-Zahlung", "Admin-Dashboard", "Abonnements"],
          price: "Rund um den Bedarf gebaut",
          delay: "Je nach Umfang",
          href: "/devis",
        },
        {
          icon: FiTool,
          accent: "#ec4899",
          title: "Business-Web-Tool",
          eyebrow: "Lösung 5",
          forWho: "KMU und Teams, die automatisieren oder zentralisieren möchten",
          description: "Interne Apps, intelligente Formulare, Dashboards, leichtgewichtiges CRM, Anfragenverwaltung oder Admin-Portal.",
          includes: ["Admin-Oberfläche", "Datenbank", "Formulare", "Benutzerrollen"],
          price: "Prioritäten gemeinsam definiert",
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

              {/* Périmètre + délai */}
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
