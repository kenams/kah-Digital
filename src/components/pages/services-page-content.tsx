import Link from "next/link";
import { FiArrowRight, FiGlobe, FiSmartphone, FiTool } from "react-icons/fi";
import type { Locale } from "@/lib/locales";
import { withLocalePrefix } from "@/lib/locales";

type ServicesPageContentProps = {
  locale: Locale;
};

const copy = {
  fr: {
    eyebrow: "Suisse, international, PME et structures en croissance",
    title: "Des solutions digitales utiles pour les entreprises",
    intro:
      "KAH-Digital conçoit des sites web, des applications et des parcours support plus lisibles. Depuis Lausanne, avec une logique de production claire, rapide et exploitable.",
    sectionTitle: "Un positionnement simple",
    sectionBody:
      "Nous ne cherchons pas à tout promettre. Nous construisons des bases utiles, propres et crédibles pour aider une entreprise à mieux se présenter, mieux s'organiser ou mieux accompagner ses utilisateurs.",
    ctaTitle: "Besoin d'une solution sur mesure ?",
    ctaBody: "Parlons du bon niveau de site, d'application ou de parcours support pour votre entreprise.",
    ctaLabel: "Demander un devis",
    learnMore: "En savoir plus",
    services: [
      {
        icon: FiGlobe,
        title: "Sites web pour entreprises",
        description:
          "Sites vitrines, sites corporate et plateformes de présentation, avec paiement simple possible selon le besoin.",
        href: "/services/site-web",
        features: ["Design responsive", "Structure claire", "SEO de base propre", "Paiement simple en option", "Mise en ligne accompagnée"],
      },
      {
        icon: FiSmartphone,
        title: "Applications web et mobiles",
        description:
          "Outils métier, portails, tableaux de bord et applications sur mesure pour fluidifier votre fonctionnement.",
        href: "/services/applications",
        features: ["Architecture évolutive", "Interface utile", "Intégrations possibles", "Accompagnement projet"],
      },
      {
        icon: FiTool,
        title: "Parcours support connecté à GLPI",
        description:
          "Aide virtuelle, qualification des demandes et passage vers ticket GLPI quand l'assistance de premier niveau ne suffit plus.",
        href: "/services/glpi",
        features: ["Parcours plus clair", "Escalade propre", "Base de réponse", "Adaptation à votre support"],
      },
    ],
  },
  en: {
    eyebrow: "Switzerland, international, SMBs, and growing teams",
    title: "Useful digital services for companies",
    intro:
      "KAH-Digital designs websites, applications, and clearer support workflows from Lausanne, with a production approach that stays clean and practical.",
    sectionTitle: "A simple positioning",
    sectionBody:
      "We do not try to promise everything. We build useful, clean, credible foundations to help a company present itself better, operate more smoothly, or support its users more clearly.",
    ctaTitle: "Need a tailored solution?",
    ctaBody: "Let's talk about the right level of website, application, or support workflow for your company.",
    ctaLabel: "Request a quote",
    learnMore: "Learn more",
    services: [
      {
        icon: FiGlobe,
        title: "Business websites",
        description:
          "Showcase websites, corporate websites, and presentation platforms to position your company more clearly online.",
        href: "/services/site-web",
        features: ["Responsive design", "Clear structure", "Clean SEO basics", "Supported launch"],
      },
      {
        icon: FiSmartphone,
        title: "Web and mobile applications",
        description:
          "Business tools, portals, dashboards, and custom applications to make your operations smoother.",
        href: "/services/applications",
        features: ["Scalable architecture", "Useful interface", "Possible integrations", "Project support"],
      },
      {
        icon: FiTool,
        title: "GLPI-connected support workflow",
        description:
          "Virtual help, request qualification, and handoff to GLPI tickets when first-level assistance is no longer enough.",
        href: "/services/glpi",
        features: ["Clearer journey", "Clean escalation", "Knowledge base", "Adapted to your support setup"],
      },
    ],
  },
  de: {
    eyebrow: "Schweiz, international, KMU und wachsende Teams",
    title: "Digitale Leistungen mit echtem Nutzen fuer Unternehmen",
    intro:
      "KAH-Digital entwickelt Websites, Anwendungen und klarere Support-Ablaufe aus Lausanne, mit einer klaren, schnellen und sauber lesbaren Produktionslogik.",
    sectionTitle: "Eine einfache Positionierung",
    sectionBody:
      "Wir versprechen nicht alles. Wir bauen nuetzliche, saubere und glaubwuerdige Grundlagen, damit Unternehmen sich besser praesentieren, besser organisieren oder Nutzer klarer begleiten koennen.",
    ctaTitle: "Braucht ihr eine passende Loesung?",
    ctaBody: "Lass uns ueber das richtige Niveau fuer Website, Anwendung oder Support-Workflow sprechen.",
    ctaLabel: "Projekt anfragen",
    learnMore: "Mehr erfahren",
    services: [
      {
        icon: FiGlobe,
        title: "Unternehmenswebsites",
        description:
          "Praesentationswebsites, Corporate Sites und Plattformen, um das Unternehmen klarer online zu positionieren.",
        href: "/services/site-web",
        features: ["Responsives Design", "Klare Struktur", "Saubere SEO-Basis", "Begleiteter Launch"],
      },
      {
        icon: FiSmartphone,
        title: "Web- und Mobile-Anwendungen",
        description:
          "Business-Tools, Portale, Dashboards und massgeschneiderte Anwendungen fuer reibungslosere Prozesse.",
        href: "/services/applications",
        features: ["Skalierbare Architektur", "Nuetzliche Oberflaeche", "Moegliche Integrationen", "Projektbegleitung"],
      },
      {
        icon: FiTool,
        title: "GLPI-verbundener Support-Workflow",
        description:
          "Virtuelle Hilfe, Qualifizierung von Anfragen und saubere Uebergabe an GLPI, wenn First-Level-Support nicht mehr reicht.",
        href: "/services/glpi",
        features: ["Klarerer Ablauf", "Saubere Eskalation", "Wissensbasis", "An euer Setup angepasst"],
      },
    ],
  },
} as const;

export function ServicesPageContent({ locale }: ServicesPageContentProps) {
  const content = copy[locale];

  return (
    <>
      <section className="bg-gradient-to-r from-blue-600 to-slate-900 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-white/70">{content.eyebrow}</p>
          <h1 className="mb-6 text-4xl font-bold sm:text-5xl">{content.title}</h1>
          <p className="mx-auto max-w-3xl text-xl text-white/90">{content.intro}</p>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {content.services.map((service) => (
              <div key={service.title} className="rounded-2xl bg-white p-8 shadow-lg">
                <service.icon className="mb-6 text-blue-600" size={64} />
                <h2 className="mb-4 text-2xl font-bold text-gray-900">{service.title}</h2>
                <p className="mb-6 text-gray-600">{service.description}</p>
                <ul className="mb-6 space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-gray-700">
                      <span className="mr-3 h-2 w-2 rounded-full bg-blue-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={withLocalePrefix(service.href, locale)}
                  className="inline-flex items-center rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  {content.learnMore} <FiArrowRight className="ml-2" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {locale === "fr" ? (
        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900">Pages locales pour la Suisse romande</h2>
              <p className="mx-auto max-w-3xl text-lg text-gray-600">
                Des pages ciblees pour capter des besoins autour de Lausanne, Geneve, des applications web et de
                l'automatisation IA en Suisse.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {[
                { title: "Site web a Geneve", href: "/site-web-geneve" },
                { title: "Site web a Lausanne", href: "/site-web-lausanne" },
                { title: "Application web en Suisse", href: "/application-web-suisse" },
                { title: "Automatisation IA en Suisse", href: "/automatisation-ia-suisse" },
              ].map((page) => (
                <div key={page.href} className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
                  <h3 className="text-xl font-semibold text-gray-900">{page.title}</h3>
                  <p className="mt-3 text-sm text-gray-600">
                    Requete locale orientee acquisition pour attirer des demandes qualifiees en Suisse.
                  </p>
                  <Link
                    href={page.href}
                    className="mt-5 inline-flex items-center rounded-full bg-blue-600 px-5 py-2 font-semibold text-white transition-colors hover:bg-blue-700"
                  >
                    Voir la page <FiArrowRight className="ml-2" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">{content.sectionTitle}</h2>
          <p className="text-xl text-gray-600">{content.sectionBody}</p>
        </div>
      </section>

      <section className="bg-blue-600 py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold">{content.ctaTitle}</h2>
          <p className="mb-8 text-xl text-white/90">{content.ctaBody}</p>
          <Link
            href={withLocalePrefix("/devis", locale)}
            className="rounded-full bg-white px-8 py-3 font-semibold text-blue-600 transition-colors hover:bg-gray-100"
          >
            {content.ctaLabel}
          </Link>
        </div>
      </section>
    </>
  );
}
