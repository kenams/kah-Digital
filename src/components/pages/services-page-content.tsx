import Link from "next/link";
import { FiArrowRight, FiCpu, FiGlobe, FiSmartphone, FiTool } from "react-icons/fi";
import type { Locale } from "@/lib/locales";
import { withLocalePrefix } from "@/lib/locales";

type ServicesPageContentProps = {
  locale: Locale;
};

const copy = {
  fr: {
    eyebrow: "Francophone, anglophone, PME et structures en croissance",
    title: "Un agent IA vertical, et les fondations digitales qui vont avec",
    intro:
      "KAH Digital conçoit des agents IA verticaux — branchés sur un seul métier, de bout en bout — ainsi que les sites web, applications et parcours support qui les accompagnent. Preuve en production : KAH Workforce, chef de cabinet IA pour artistes indépendants.",
    sectionTitle: "Un positionnement simple",
    sectionBody:
      "Nous ne cherchons pas à tout promettre. Nous construisons des agents et des bases utiles, propres et crédibles pour aider une entreprise à déléguer un métier, mieux se présenter ou mieux accompagner ses utilisateurs.",
    ctaTitle: "Besoin d'une solution sur mesure ?",
    ctaBody: "Parlons du bon niveau d'agent, de site ou d'application pour votre entreprise.",
    ctaLabel: "Demander un devis",
    learnMore: "En savoir plus",
    services: [
      {
        icon: FiCpu,
        title: "Agent IA vertical",
        description:
          "Un agent branché sur votre métier de bout en bout, qui agit à votre place — pas un chatbot générique. Sur le modèle de KAH Workforce.",
        href: "/agents-ia",
        features: ["Intégré à vos outils réels", "Autonome, pas piloté au prompt", "Mémoire persistante", "Code source livré"],
      },
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
    eyebrow: "French-speaking, English-speaking, SMBs, and growing teams",
    title: "A vertical AI agent, and the digital foundations to match",
    intro:
      "KAH Digital designs vertical AI agents — wired into one job, end to end — plus the websites, applications, and support workflows around them. Live proof: KAH Workforce, an AI chief-of-staff for independent artists.",
    sectionTitle: "A simple positioning",
    sectionBody:
      "We do not try to promise everything. We build agents and useful, clean, credible foundations to help a company delegate a job, present itself better, or support its users more clearly.",
    ctaTitle: "Need a tailored solution?",
    ctaBody: "Let's talk about the right level of agent, website, or application for your company.",
    ctaLabel: "Request a quote",
    learnMore: "Learn more",
    services: [
      {
        icon: FiCpu,
        title: "Vertical AI agent",
        description:
          "An agent wired into your business end to end, acting in your place — not a generic chatbot. Built on the KAH Workforce model.",
        href: "/agents-ia",
        features: ["Integrated into your real tools", "Autonomous, not prompt-driven", "Persistent memory", "Source code delivered"],
      },
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
    eyebrow: "Frankophon, englischsprachig, KMU und wachsende Teams",
    title: "Ein vertikaler KI-Agent, und die passenden digitalen Grundlagen",
    intro:
      "KAH Digital entwickelt vertikale KI-Agenten — Ende-zu-Ende auf einen Job spezialisiert — sowie die Websites, Anwendungen und Support-Abläufe drumherum. Live-Beweis: KAH Workforce, ein KI-Kabinettschef für unabhängige Künstler.",
    sectionTitle: "Eine einfache Positionierung",
    sectionBody:
      "Wir versprechen nicht alles. Wir bauen Agenten und nützliche, saubere und glaubwürdige Grundlagen, damit Unternehmen einen Job delegieren, sich besser präsentieren oder Nutzer klarer begleiten können.",
    ctaTitle: "Braucht ihr eine passende Lösung?",
    ctaBody: "Lass uns über das richtige Niveau für Agent, Website oder Anwendung sprechen.",
    ctaLabel: "Projekt anfragen",
    learnMore: "Mehr erfahren",
    services: [
      {
        icon: FiCpu,
        title: "Vertikaler KI-Agent",
        description:
          "Ein Agent, der Ende-zu-Ende in Ihr Geschäft eingebettet ist und für Sie handelt — kein generischer Chatbot. Nach dem Vorbild von KAH Workforce.",
        href: "/agents-ia",
        features: ["In Ihre echten Tools integriert", "Autonom, nicht prompt-gesteuert", "Persistentes Gedächtnis", "Quellcode geliefert"],
      },
      {
        icon: FiGlobe,
        title: "Unternehmenswebsites",
        description:
          "Präsentationswebsites, Corporate Sites und Plattformen, um das Unternehmen klarer online zu positionieren.",
        href: "/services/site-web",
        features: ["Responsives Design", "Klare Struktur", "Saubere SEO-Basis", "Begleiteter Launch"],
      },
      {
        icon: FiSmartphone,
        title: "Web- und Mobile-Anwendungen",
        description:
          "Business-Tools, Portale, Dashboards und maßgeschneiderte Anwendungen für reibungslosere Prozesse.",
        href: "/services/applications",
        features: ["Skalierbare Architektur", "Nützliche Oberfläche", "Mögliche Integrationen", "Projektbegleitung"],
      },
      {
        icon: FiTool,
        title: "GLPI-verbundener Support-Workflow",
        description:
          "Virtuelle Hilfe, Qualifizierung von Anfragen und saubere Übergabe an GLPI, wenn First-Level-Support nicht mehr reicht.",
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

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              {locale === "fr"
                ? "Pages d'entree utiles"
                : locale === "en"
                  ? "Useful entry pages"
                  : "Nuetzliche Einstiegsseiten"}
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-gray-600">
              {locale === "fr"
                ? "Des pages plus generales pour capter des besoins autour des sites web, de la refonte, des applications et de l'automatisation."
                : locale === "en"
                  ? "More general entry pages to capture needs around websites, redesigns, applications, and automation."
                  : "Allgemeinere Einstiegsseiten für Bedarf rund um Websites, Refonte, Anwendungen und Automatisierung."}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                title:
                  locale === "fr" ? "Site web entreprise" : locale === "en" ? "Business website" : "Unternehmenswebsite",
                href: "/site-web-entreprise",
              },
              {
                title:
                  locale === "fr" ? "Refonte site web" : locale === "en" ? "Website redesign" : "Website-Refonte",
                href: "/refonte-site-web",
              },
              {
                title:
                  locale === "fr" ? "Application web sur mesure" : locale === "en" ? "Custom web app" : "Individuelle Web-App",
                href: "/application-web-sur-mesure",
              },
              {
                title:
                  locale === "fr"
                    ? "Automatisation IA entreprise"
                    : locale === "en"
                      ? "AI automation for business"
                      : "KI-Automatisierung für Unternehmen",
                href: "/automatisation-ia-entreprise",
              },
            ].map((page) => (
              <div key={page.href} className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
                <h3 className="text-xl font-semibold text-gray-900">{page.title}</h3>
                <p className="mt-3 text-sm text-gray-600">
                  {locale === "fr"
                    ? "Page d'acquisition plus universelle pour attirer des demandes qualifiees au-dela d'un territoire unique."
                    : locale === "en"
                      ? "A more universal acquisition page designed to attract qualified requests beyond one location."
                      : "Allgemeinere Akquisitionsseite für qualifizierte Anfragen über einen einzelnen Standort hinaus."}
                </p>
                <Link
                  href={withLocalePrefix(page.href, locale)}
                  className="mt-5 inline-flex items-center rounded-full bg-blue-600 px-5 py-2 font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  {locale === "fr" ? "Voir la page" : locale === "en" ? "Open page" : "Seite ansehen"} <FiArrowRight className="ml-2" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

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
