import type { PortfolioProject } from "@/data/portfolio";
import Link from "next/link";
import { ProjectSpotlight } from "@/components/project-spotlight";
import type { Locale } from "@/lib/locales";
import { withLocalePrefix } from "@/lib/locales";

type Props = {
  locale: Locale;
  projects: PortfolioProject[];
};

const copy = {
  fr: {
    eyebrow: "References",
    title: "Des projets presentes comme des preuves, pas comme une galerie generique.",
    body:
      "Cette page doit rassurer vite. Le bon client ne cherche pas dix mini-vignettes sans contexte. Il veut comprendre le niveau d'execution, la direction visuelle et ce que KAH-Digital sait vraiment produire.",
    primaryLabel: "Demander un devis",
    secondaryLabel: "Voir les services",
    spotlightCta: "Parler du projet",
    markers: [
      { label: "Narration", value: "Une reference mise en avant avec vrai contexte" },
      { label: "Execution", value: "Direction visuelle, structure, parcours, rendu" },
      { label: "Utilite", value: "Voir le niveau avant de parler budget" },
    ],
    spotlightEyebrow: "Case study mise en avant",
    spotlightTitle: "Une reference traitee comme une vraie piece commerciale.",
    spotlightBody:
      "KAH Prod n'est pas seulement montre pour le style. La page sert a prouver qu'un univers de marque peut etre traduit en presence digitale plus nette, plus lisible et plus defendable.",
    nextEyebrow: "Suite logique",
    nextTitle: "Si le niveau te parle, le plus utile ensuite est de cadrer ton propre projet.",
    nextBody:
      "Un bon projet commence rarement par une longue reunion. Il commence par un cadre propre: besoin, intensite, priorites et prochaine etape claire.",
    nextPrimary: "Demander un devis",
    nextSecondary: "Ouvrir le cahier des charges",
    nextSecondaryHref: "/cahier-des-charges",
  },
  en: {
    eyebrow: "References",
    title: "Projects shown as proof, not as a generic gallery.",
    body:
      "This page should reassure fast. The right client is not looking for ten tiny thumbnails with no context. They want to understand the level of execution, the visual direction, and what KAH-Digital can actually produce.",
    primaryLabel: "Request a quote",
    secondaryLabel: "See services",
    spotlightCta: "Talk about the project",
    markers: [
      { label: "Narrative", value: "A reference shown with real context" },
      { label: "Execution", value: "Visual direction, structure, journey, output" },
      { label: "Usefulness", value: "See the level before discussing budget" },
    ],
    spotlightEyebrow: "Featured case study",
    spotlightTitle: "A reference treated like an actual commercial proof piece.",
    spotlightBody:
      "KAH Prod is not shown only for style. The page proves that a brand universe can be translated into a cleaner, sharper, more defensible digital presence.",
    nextEyebrow: "Next move",
    nextTitle: "If the level feels right, the useful next step is scoping your own project.",
    nextBody:
      "A strong project rarely starts with a long meeting. It starts with a clean frame: need, intensity, priorities, and one obvious next step.",
    nextPrimary: "Request a quote",
    nextSecondary: "Open the brief",
    nextSecondaryHref: "/cahier-des-charges",
  },
  de: {
    eyebrow: "Referenzen",
    title: "Projekte als Nachweis, nicht als generische Galerie.",
    body:
      "Diese Seite soll schnell Sicherheit geben. Der richtige Kunde sucht keine zehn kleinen Vorschaubilder ohne Kontext. Er will das Ausfuehrungsniveau, die visuelle Richtung und die tatsaechliche Leistungsfaehigkeit von KAH-Digital verstehen.",
    primaryLabel: "Projekt anfragen",
    secondaryLabel: "Leistungen ansehen",
    spotlightCta: "Ueber das Projekt sprechen",
    markers: [
      { label: "Narrativ", value: "Eine Referenz mit echtem Kontext" },
      { label: "Umsetzung", value: "Visuelle Richtung, Struktur, Journey, Ergebnis" },
      { label: "Nutzen", value: "Das Niveau sehen, bevor ueber Budget gesprochen wird" },
    ],
    spotlightEyebrow: "Hervorgehobene Case Study",
    spotlightTitle: "Eine Referenz als echte kommerzielle Beweisflaeche.",
    spotlightBody:
      "KAH Prod wird nicht nur wegen des Looks gezeigt. Die Seite beweist, dass ein Markenuniversum in eine klarere, schaerfere und besser verteidigbare digitale Praesenz uebersetzt werden kann.",
    nextEyebrow: "Naechster Schritt",
    nextTitle: "Wenn das Niveau passt, ist der sinnvolle naechste Schritt dein eigenes Scoping.",
    nextBody:
      "Ein starkes Projekt beginnt selten mit einem langen Meeting. Es beginnt mit einem klaren Rahmen: Bedarf, Intensitaet, Prioritaeten und ein sauberer naechster Schritt.",
    nextPrimary: "Projekt anfragen",
    nextSecondary: "Briefing oeffnen",
    nextSecondaryHref: "/cahier-des-charges",
  },
} as const;

export function ProjectsPageContent({ locale, projects }: Props) {
  const content = copy[locale];
  const visibleProjects = projects.filter((project) => project.slug === "kah-prod");

  return (
    <>
      <section className="section-shell pt-8 sm:pt-10 lg:pt-12">
        <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[linear-gradient(135deg,rgba(9,8,7,0.96),rgba(18,14,28,0.96))] p-6 shadow-[0_40px_140px_rgba(0,0,0,0.45)] sm:p-8 lg:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(214,179,106,0.16),transparent_30%),radial-gradient(circle_at_82%_20%,rgba(127,184,199,0.14),transparent_24%)]" />
          <div className="relative grid gap-8 lg:grid-cols-[1.05fr,0.95fr] lg:items-end">
            <div className="text-white">
              <p className="text-sm uppercase tracking-[0.35em] text-white/52">{content.eyebrow}</p>
              <h1 className="mt-5 max-w-4xl text-4xl font-semibold sm:text-5xl lg:text-6xl">{content.title}</h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-white/72 sm:text-lg">{content.body}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={withLocalePrefix("/devis", locale)}
                  className="inline-flex items-center rounded-full bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-neutral-200"
                >
                  {content.primaryLabel}
                </Link>
                <Link
                  href={withLocalePrefix("/services", locale)}
                  className="inline-flex items-center rounded-full border border-white/18 px-6 py-3 font-semibold text-white transition hover:border-white/40 hover:bg-white/8"
                >
                  {content.secondaryLabel}
                </Link>
              </div>
            </div>
            <div className="grid gap-3">
              {content.markers.map((item, index) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-black/25 px-4 py-4 text-white/78">
                  <p className="text-[0.68rem] uppercase tracking-[0.28em] text-white/42">
                    0{index + 1} / {item.label}
                  </p>
                  <p className="mt-3 text-sm leading-7">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="accent-section">
          <div className="content px-6 py-10 sm:px-8 lg:px-10">
            <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="text-white">
                <p className="text-sm uppercase tracking-[0.35em] text-white/50">{content.spotlightEyebrow}</p>
                <h2 className="mt-4 max-w-4xl text-3xl font-semibold sm:text-4xl">{content.spotlightTitle}</h2>
                <p className="mt-4 max-w-3xl text-base leading-8 text-white/68 sm:text-lg">{content.spotlightBody}</p>
              </div>
              <Link
                href={withLocalePrefix("/contact", locale)}
                className="inline-flex items-center rounded-full border border-white/18 px-5 py-2.5 text-sm font-semibold text-white/80 transition hover:border-white/35 hover:bg-white/8 hover:text-white"
              >
                {content.spotlightCta}
              </Link>
            </div>

            {visibleProjects.map((project) => (
              <ProjectSpotlight key={project.slug} project={project} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="premium-card rounded-[32px] border border-white/10 bg-[linear-gradient(145deg,rgba(12,10,18,0.96),rgba(7,7,10,0.96))] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1fr,0.82fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-white/50">{content.nextEyebrow}</p>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">{content.nextTitle}</h2>
              <p className="mt-4 max-w-3xl text-base leading-8 text-white/68 sm:text-lg">{content.nextBody}</p>
            </div>
            <div className="grid gap-4">
              <Link
                href={withLocalePrefix("/devis", locale)}
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-neutral-200"
              >
                {content.nextPrimary}
              </Link>
              <Link
                href={withLocalePrefix(content.nextSecondaryHref, locale)}
                className="inline-flex items-center justify-center rounded-full border border-white/18 px-6 py-3 font-semibold text-white/82 transition hover:border-white/35 hover:bg-white/8 hover:text-white"
              >
                {content.nextSecondary}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
