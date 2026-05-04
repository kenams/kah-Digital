import Link from "next/link";

import type { PortfolioProject } from "@/data/portfolio";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import type { Locale } from "@/lib/locales";
import { withLocalePrefix } from "@/lib/locales";

type Props = {
  locale: Locale;
  projects: PortfolioProject[];
};

const copy = {
  fr: {
    eyebrow: "Réalisations",
    title: "Des projets concrets, livrés et en ligne.",
    body: "Sites vitrines premium, plateformes SaaS, applications mobiles et outils métier — chaque projet est conçu pour être utilisable, clair et orienté résultat.",
    primaryLabel: "Demander un devis gratuit",
    secondaryLabel: "Voir les offres",
    nextEyebrow: "La suite",
    nextTitle: "Vous avez un projet ? Parlons-en.",
    nextBody:
      "Remplissez le formulaire, je vous réponds sous 24h avec une première estimation claire. Aucun engagement, aucun jargon.",
    nextPrimary: "Demander un devis",
    nextSecondary: "Voir les offres",
  },
  en: {
    eyebrow: "Portfolio",
    title: "Real projects, delivered and live.",
    body: "Premium showcase sites, SaaS platforms, mobile apps and business tools — every project is built to be usable, clear and result-oriented.",
    primaryLabel: "Request a free quote",
    secondaryLabel: "See our offers",
    nextEyebrow: "Next step",
    nextTitle: "Got a project? Let's talk.",
    nextBody:
      "Fill in the form, I reply within 24h with a clear first estimate. No commitment, no jargon.",
    nextPrimary: "Request a quote",
    nextSecondary: "See our offers",
  },
  de: {
    eyebrow: "Referenzen",
    title: "Echte Projekte, geliefert und live.",
    body: "Premium-Websites, SaaS-Plattformen, mobile Apps und Business-Tools — jedes Projekt ist auf Nutzbarkeit, Klarheit und Ergebnisse ausgerichtet.",
    primaryLabel: "Kostenloses Angebot anfordern",
    secondaryLabel: "Angebote ansehen",
    nextEyebrow: "Nächster Schritt",
    nextTitle: "Sie haben ein Projekt? Lassen Sie uns reden.",
    nextBody:
      "Füllen Sie das Formular aus, ich antworte innerhalb von 24h mit einer klaren ersten Schätzung. Kein Engagement, kein Fachjargon.",
    nextPrimary: "Projekt anfragen",
    nextSecondary: "Angebote ansehen",
  },
} as const;

export function ProjectsPageContent({ locale, projects }: Props) {
  const content = copy[locale];

  return (
    <div className="space-y-16 sm:space-y-20">

      {/* Header */}
      <section className="bg-gray-950 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-400">
              {content.eyebrow}
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              {content.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-gray-400">{content.body}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={withLocalePrefix("/devis", locale)}
                className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-500/40"
              >
                {content.primaryLabel}
              </Link>
              <Link
                href={withLocalePrefix("/offres", locale)}
                className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5"
              >
                {content.secondaryLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Grid uniforme — tous les projets au même niveau */}
      <section className="bg-gray-900 py-4 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            {projects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-gray-950 py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="rounded-[32px] border border-white/10 bg-gray-900 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
              <div className="grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-center">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
                    {content.nextEyebrow}
                  </p>
                  <h2 className="mt-3 text-3xl font-extrabold text-white">
                    {content.nextTitle}
                  </h2>
                  <p className="mt-4 text-lg text-gray-400">{content.nextBody}</p>
                </div>
                <div className="flex flex-col gap-4">
                  <Link
                    href={withLocalePrefix("/devis", locale)}
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3 font-semibold text-white transition-all hover:opacity-90"
                  >
                    {content.nextPrimary}
                  </Link>
                  <Link
                    href={withLocalePrefix("/offres", locale)}
                    className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5"
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
