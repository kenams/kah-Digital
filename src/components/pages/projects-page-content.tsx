import Link from "next/link";

import type { PortfolioProject } from "@/data/portfolio";
import { ProjectCard } from "@/components/project-card";
import { ProjectSpotlight } from "@/components/project-spotlight";
import { Reveal } from "@/components/reveal";
import type { Locale } from "@/lib/locales";
import { withLocalePrefix } from "@/lib/locales";

type Props = {
  locale: Locale;
  projects: PortfolioProject[];
};

const copy = {
  fr: {
    eyebrow: "Projets",
    title: "KAH Prod, l'un des projets portes par KAH-Digital.",
    body: "Cette page met en avant KAH Prod comme reference officielle sur cette version du site, avec une presentation plus claire et plus coherente avec le reste de l'univers KAH-Digital.",
    primaryLabel: "Demander un devis",
    secondaryLabel: "Voir les services",
    cards: [
      {
        eyebrow: "Sites web",
        title: "Vitrine",
        body: "Positionnement, pages services, SEO local et conversion.",
      },
      {
        eyebrow: "Applications",
        title: "Web / mobile",
        body: "Portails, outils metier, MVP et parcours utilisateurs plus clairs.",
      },
      {
        eyebrow: "Support PME",
        title: "Aide virtuelle + GLPI",
        body: "Parcours support plus clair, base de reponse et escalation ticket propre.",
      },
    ],
    spotlightEyebrow: "Etudes de cas",
    spotlightTitle:
      "Une mise en avant plus forte, plus visuelle et plus coherente avec le niveau KAH-Digital.",
    spotlightBody:
      "KAH Prod merite un vrai traitement editorial, avec une presence plus premium qu'une simple carte projet.",
    spotlightCta: "Parler de votre projet",
    gridEyebrow: "Autres references",
    gridTitle: "D'autres produits et projets signes KAH-Digital.",
    gridBody:
      "MineAlert et TechCash Academy s'ajoutent ici comme produits concus et realises par KAH-Digital, sans changer la mise en avant principale de cette page.",
    nextEyebrow: "Suite logique",
    nextTitle:
      "Vous avez vu les references. Le plus utile maintenant, c'est le cadrage.",
    nextBody:
      "Si vous avez un site a refaire, une application a structurer ou une logique support PME a clarifier, le plus rapide est de partir sur un brief simple et un devis cadre.",
    nextPrimary: "Demander un devis",
    nextSecondary: "Ouvrir le cahier des charges",
    nextSecondaryHref: "/cahier-des-charges",
  },
  en: {
    eyebrow: "Projects",
    title: "KAH Prod, one of the projects produced by KAH-Digital.",
    body: "This page now puts KAH Prod forward as the official featured reference on this version of the site, with a presentation aligned with the rest of the KAH-Digital public experience.",
    primaryLabel: "Request a quote",
    secondaryLabel: "See services",
    cards: [
      {
        eyebrow: "Websites",
        title: "Showcase",
        body: "Positioning, service pages, local SEO, and conversion logic.",
      },
      {
        eyebrow: "Applications",
        title: "Web / mobile",
        body: "Portals, internal tools, MVPs, and cleaner user journeys.",
      },
      {
        eyebrow: "SMB support",
        title: "AI + GLPI",
        body: "Support assistant, knowledge base, and proper ticket escalation.",
      },
    ],
    spotlightEyebrow: "Case studies",
    spotlightTitle:
      "A stronger, more visual showcase aligned with the KAH-Digital standard.",
    spotlightBody:
      "KAH Prod deserves a true editorial showcase, not a generic project card.",
    spotlightCta: "Talk about your project",
    gridEyebrow: "More references",
    gridTitle: "More products and projects built by KAH-Digital.",
    gridBody:
      "MineAlert and TechCash Academy are now listed here as products designed and delivered by KAH-Digital, without changing the main editorial spotlight.",
    nextEyebrow: "Next step",
    nextTitle:
      "You have seen the references. The useful next move is the scoping step.",
    nextBody:
      "If you need a website redesign, a structured application, or a clearer SMB support workflow, the fastest way forward is a scoped brief and a proper quote.",
    nextPrimary: "Request a quote",
    nextSecondary: "Open the brief",
    nextSecondaryHref: "/cahier-des-charges",
  },
  de: {
    eyebrow: "Projekte",
    title: "KAH Prod ist eines der von KAH-Digital entwickelten Projekte.",
    body: "Hier steht KAH Prod als sichtbare Referenz im Fokus - nicht als einfache Projektkarte, sondern als sauber praesentierte Case Study mit klarer visueller Qualitaet.",
    primaryLabel: "Projekt anfragen",
    secondaryLabel: "Leistungen ansehen",
    cards: [
      {
        eyebrow: "Websites",
        title: "Showcase",
        body: "Positionierung, Seitenstruktur, lokales SEO und Conversion.",
      },
      {
        eyebrow: "Anwendungen",
        title: "Web / Mobile",
        body: "Portale, interne Tools, MVPs und klarere Nutzerwege.",
      },
      {
        eyebrow: "Support",
        title: "GLPI Workflow",
        body: "Virtuelle Hilfe, Wissensbasis und saubere Ticket-Eskalation.",
      },
    ],
    spotlightEyebrow: "Case Study",
    spotlightTitle:
      "Eine staerkere und visuellere Referenz im KAH-Digital Standard.",
    spotlightBody:
      "KAH Prod zeigt, wie KAH-Digital ein Markenuniversum in eine hochwertige, klar gefuehrte Website uebersetzt.",
    spotlightCta: "Ueber dein Projekt sprechen",
    gridEyebrow: "Weitere Referenzen",
    gridTitle: "Weitere Produkte und Projekte von KAH-Digital.",
    gridBody:
      "MineAlert und TechCash Academy werden hier als von KAH-Digital entwickelte Produkte hinzugefuegt, ohne die bestehende Hauptreferenz zu verschieben.",
    nextEyebrow: "Naechster Schritt",
    nextTitle:
      "Referenz gesehen. Der sinnvolle naechste Schritt ist ein klares Briefing.",
    nextBody:
      "Wenn du eine neue Website, eine strukturierte Anwendung oder einen klareren digitalen Workflow brauchst, starten wir mit einem sauberen Scope und einem passenden Angebotsrahmen.",
    nextPrimary: "Projekt anfragen",
    nextSecondary: "Direkt Kontakt aufnehmen",
    nextSecondaryHref: "/contact",
  },
} as const;

export function ProjectsPageContent({ locale, projects }: Props) {
  const content = copy[locale];
  const featuredProject =
    projects.find((project) => project.slug === "kah-prod") ?? projects[0] ?? null;
  const additionalProjects = projects.filter(
    (project) => project.slug !== (featuredProject?.slug ?? "")
  );

  return (
    <div className="space-y-16 sm:space-y-20">
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
                {content.eyebrow}
              </p>
              <h1 className="mt-3 text-4xl font-bold text-slate-950 sm:text-5xl">
                {content.title}
              </h1>
              <p className="mt-5 max-w-3xl text-lg text-slate-600">
                {content.body}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href={withLocalePrefix("/devis", locale)}
                  className="inline-flex items-center rounded-full bg-slate-950 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  {content.primaryLabel}
                </Link>
                <Link
                  href={withLocalePrefix("/services", locale)}
                  className="inline-flex items-center rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-900 transition-colors hover:border-slate-950 hover:bg-slate-950 hover:text-white"
                >
                  {content.secondaryLabel}
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {content.cards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                    {card.eyebrow}
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-slate-950">
                    {card.title}
                  </p>
                  <p className="mt-2 text-sm text-slate-600">{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.12),transparent_35%),linear-gradient(180deg,#08111f_0%,#04070d_100%)] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="text-white">
              <p className="text-sm uppercase tracking-[0.3em] text-white/55">
                {content.spotlightEyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-bold">{content.spotlightTitle}</h2>
              <p className="mt-3 max-w-3xl text-white/70">
                {content.spotlightBody}
              </p>
            </div>
            <Link
              href={withLocalePrefix("/contact", locale)}
              className="inline-flex items-center rounded-full border border-white/20 px-5 py-2 font-semibold text-white/80 transition-colors hover:border-white hover:text-white"
            >
              {content.spotlightCta}
            </Link>
          </div>

          {featuredProject ? (
            <ProjectSpotlight project={featuredProject} locale={locale} />
          ) : null}
        </div>
      </section>

      <section className="bg-[#04070d] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl text-white">
            <p className="text-sm uppercase tracking-[0.3em] text-white/55">
              {content.gridEyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-bold">{content.gridTitle}</h2>
            <p className="mt-3 text-white/70">{content.gridBody}</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {additionalProjects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-100 py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="rounded-[32px] bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] ring-1 ring-slate-200">
              <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
                    {content.nextEyebrow}
                  </p>
                  <h2 className="mt-3 text-3xl font-bold text-slate-950">
                    {content.nextTitle}
                  </h2>
                  <p className="mt-4 text-lg text-slate-600">{content.nextBody}</p>
                </div>
                <div className="flex flex-col gap-4">
                  <Link
                    href={withLocalePrefix("/devis", locale)}
                    className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
                  >
                    {content.nextPrimary}
                  </Link>
                  <Link
                    href={withLocalePrefix(content.nextSecondaryHref, locale)}
                    className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-900 transition-colors hover:border-slate-950 hover:bg-slate-950 hover:text-white"
                  >
                    {content.nextSecondary}
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
