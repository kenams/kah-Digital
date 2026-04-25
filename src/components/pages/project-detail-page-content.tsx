import Image from "next/image";
import Link from "next/link";
import { ProjectSceneRender } from "@/components/project-scene";
import { Reveal } from "@/components/reveal";
import type { PortfolioProject } from "@/data/portfolio";
import type { Locale } from "@/lib/locales";
import { withLocalePrefix } from "@/lib/locales";

type Props = {
  locale: Locale;
  project: PortfolioProject;
};

const copy = {
  fr: {
    backProjects: "Retour aux projets",
    backHome: "Accueil",
    liveSite: "Voir le site live",
    timeline: "Timeline",
    outcome: "Résultat",
    liveStructure: "Lecture du site live",
    liveStructureTitle: "Ce que le site montre réellement aujourd'hui.",
    contactRoles: "Contacts métier",
    contactRolesTitle: "Des points d'entrée clairs selon le besoin.",
    challenge: "Challenge",
    challengeTitle: "Le vrai besoin derrière le projet.",
    solution: "Solution",
    delivered: "Rendu obtenu",
    deliveredTitle: "Ce que cette version apporte concrètement.",
    visuals: "Visuels",
    visualsTitle: "Rendu livré pour porter le projet.",
    nextEyebrow: "Suite logique",
    nextTitle: "Besoin d'un site dans ce niveau de rendu ?",
    nextBody: "KAH-Digital peut cadrer, designer et livrer une base propre pour un label, une marque ou un projet qui doit mieux présenter son univers, ses contenus et ses contacts.",
    nextPrimary: "Demander un devis",
    liveSections: ["Le Label", "Artistes", "Sorties", "Clips", "Événements", "Réseaux", "Contact"],
    contactItems: ["Management", "Booking", "Presse", "Communication"],
    signals: [
      "Un univers visuel plus propre et plus sérieux pour porter l'image du label.",
      "Une lecture plus directe des artistes, sorties et contenus vidéo.",
      "Des points de contact métier séparés selon le bon besoin.",
      "Une base simple à faire évoluer sans repartir de zéro.",
    ],
  },
  en: {
    backProjects: "Back to projects",
    backHome: "Home",
    liveSite: "Visit live site",
    timeline: "Timeline",
    outcome: "Outcome",
    liveStructure: "Live site structure",
    liveStructureTitle: "What the live website actually shows today.",
    contactRoles: "Business contacts",
    contactRolesTitle: "Clear entry points depending on the request.",
    challenge: "Challenge",
    challengeTitle: "The real need behind the project.",
    solution: "Solution",
    delivered: "Delivered outcome",
    deliveredTitle: "What this version concretely improves.",
    visuals: "Visual output",
    visualsTitle: "Delivered visuals supporting the project.",
    nextEyebrow: "Next step",
    nextTitle: "Need this level of result for your own website?",
    nextBody: "KAH-Digital can scope, design, and deliver a clean base for a label, a brand, or a project that needs to present its universe, content, and contact points in a stronger way.",
    nextPrimary: "Request a quote",
    liveSections: ["Label", "Artists", "Releases", "Clips", "Events", "Networks", "Contact"],
    contactItems: ["Management", "Booking", "Press", "Communication"],
    signals: [
      "A cleaner and more serious visual direction to support the label image.",
      "A more direct reading of artists, releases, and video content.",
      "Business contact points separated by real need.",
      "A simple base that can evolve without rebuilding from scratch.",
    ],
  },
  de: {
    backProjects: "Zurueck zu Projekten",
    backHome: "Start",
    liveSite: "Live-Website ansehen",
    timeline: "Timeline",
    outcome: "Ergebnis",
    liveStructure: "Live-Struktur",
    liveStructureTitle: "Was die Live-Website heute konkret zeigt.",
    contactRoles: "Business-Kontakte",
    contactRolesTitle: "Saubere Einstiege je nach Anliegen.",
    challenge: "Ausgangslage",
    challengeTitle: "Der reale Bedarf hinter dem Projekt.",
    solution: "Antwort",
    delivered: "Lieferergebnis",
    deliveredTitle: "Was diese Version konkret verbessert.",
    visuals: "Visual Output",
    visualsTitle: "Gelieferte Screens und visuelle Qualität.",
    nextEyebrow: "Nächster Schritt",
    nextTitle: "Brauchst du dieses Niveau auch für deine eigene Website?",
    nextBody: "KAH-Digital kann ein Label, eine Marke oder ein Projekt mit einer stärkeren Struktur, klaren Content-Pfaden und besserer Präsentation sauber ausarbeiten und online bringen.",
    nextPrimary: "Projekt anfragen",
    liveSections: ["Label", "Artists", "Releases", "Clips", "Events", "Networks", "Contact"],
    contactItems: ["Management", "Booking", "Presse", "Kommunikation"],
    signals: [
      "Ein klarerer und wertigerer visueller Rahmen für das Label.",
      "Direkterer Zugriff auf Artists, Releases und Video-Inhalte.",
      "Kontaktpunkte nach realem Bedarf getrennt.",
      "Eine saubere Basis, die später weiterentwickelt werden kann.",
    ],
  },
} as const;

export function ProjectDetailPageContent({ locale, project }: Props) {
  const text = copy[locale];
  const screens = project.mockups?.gallery ?? (project.mockups?.primary ? [project.mockups.primary] : []);

  return (
    <div className="space-y-16 sm:space-y-20">
      <section className="bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.12),transparent_35%),linear-gradient(180deg,#08111f_0%,#04070d_100%)] py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 text-sm text-white/70">
            <Link href={withLocalePrefix("/projets", locale)} className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white">
              {text.backProjects}
            </Link>
            <Link href={withLocalePrefix("/", locale)} className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white">
              {text.backHome}
            </Link>
            {project.website ? (
              <a href={project.website} target="_blank" rel="noreferrer" className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white">
                {text.liveSite}
              </a>
            ) : null}
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-white/55">{project.type}</p>
              <h1 className="mt-3 text-4xl font-bold sm:text-5xl">{project.name}</h1>
              <p className="mt-5 max-w-3xl text-lg text-white/75">{project.tagline}</p>
              <p className="mt-5 max-w-3xl text-base text-white/70">{project.description}</p>
              <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/70">
                <span className="rounded-full border border-white/25 px-4 py-2">{text.timeline}: {project.timeline}</span>
                <span className="rounded-full border border-white/25 px-4 py-2">{text.outcome}: {project.result}</span>
              </div>
            </div>
            <ProjectSceneRender project={project} variant="hero" />
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <Reveal>
              <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-8 shadow-sm">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{text.liveStructure}</p>
                <h2 className="mt-3 text-3xl font-bold text-slate-950">{text.liveStructureTitle}</h2>
                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  {text.liveSections.map((item) => (
                    <div key={item} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-8 shadow-sm">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{text.contactRoles}</p>
                <h2 className="mt-3 text-3xl font-bold text-slate-950">{text.contactRolesTitle}</h2>
                <div className="mt-6 space-y-3">
                  {text.contactItems.map((item) => (
                    <div key={item} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-slate-100 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {project.metrics.map((metric) => (
              <Reveal key={metric.label}>
                <div className="rounded-3xl bg-white p-6 text-center shadow-[0_18px_50px_rgba(15,23,42,0.08)] ring-1 ring-slate-200">
                  <p className="text-3xl font-semibold text-slate-950">{metric.value}</p>
                  <p className="mt-2 text-sm uppercase tracking-[0.3em] text-slate-500">{metric.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-8 shadow-sm">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{text.challenge}</p>
                <h2 className="mt-3 text-3xl font-bold text-slate-950">{text.challengeTitle}</h2>
                <p className="mt-5 text-slate-700">{project.challenge}</p>
                <p className="mt-6 text-sm uppercase tracking-[0.3em] text-slate-500">{text.solution}</p>
                <p className="mt-3 text-slate-700">{project.solution}</p>
              </div>
            </Reveal>

            <Reveal>
              <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-8 shadow-sm">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{text.delivered}</p>
                <h2 className="mt-3 text-3xl font-bold text-slate-950">{text.deliveredTitle}</h2>
                <ul className="mt-6 space-y-4 text-slate-700">
                  {text.signals.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-slate-900" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.12),transparent_35%),linear-gradient(180deg,#08111f_0%,#04070d_100%)] py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-white/60">{text.visuals}</p>
              <h2 className="text-3xl font-semibold">{text.visualsTitle}</h2>
            </div>
            <div className="text-sm text-white/60">{project.stack.join(" / ")}</div>
          </div>
          <div className={`grid gap-4 ${screens.length > 1 ? "md:grid-cols-2" : ""}`}>
            {screens.map((src, index) => (
              <div key={`${src}-${index}`} className="overflow-hidden rounded-3xl border border-white/10 bg-black/40">
                <Image src={src} alt={`${project.name} visual ${index + 1}`} width={1200} height={900} sizes="(min-width: 1024px) 520px, 90vw" className="h-full w-full object-cover" />
              </div>
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
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{text.nextEyebrow}</p>
                  <h2 className="mt-3 text-3xl font-bold text-slate-950">{text.nextTitle}</h2>
                  <p className="mt-4 text-lg text-slate-600">{text.nextBody}</p>
                </div>
                <div className="flex flex-col gap-4">
                  <Link href={withLocalePrefix("/devis", locale)} className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700">
                    {text.nextPrimary}
                  </Link>
                  {project.website ? (
                    <a href={project.website} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-900 transition-colors hover:border-slate-950 hover:bg-slate-950 hover:text-white">
                      {text.liveSite}
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
