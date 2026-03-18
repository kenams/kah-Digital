import Image from "next/image";
import Link from "next/link";
import type { PortfolioProject } from "@/data/portfolio";

type ProjectSpotlightProps = {
  project: PortfolioProject;
  locale?: "fr" | "en";
};

const copy = {
  fr: {
    eyebrow: "Etude de cas",
    title: "KAH Prod, une realisation KAH-Digital pensee comme une vraie piece de marque.",
    intro:
      "Le but n'etait pas de poser une simple carte projet. Il fallait montrer un univers, une direction visuelle, et un site capable de presenter le label, les artistes, les sorties et les contacts metier avec un rendu plus net.",
    primaryCta: "Voir le site",
    secondaryCta: "Parler de votre projet",
    previewLabel: "Apercu live",
    previewKicker: "Direction artistique / label independant",
    secondaryPreviewLabel: "Navigation structuree",
    metricsEyebrow: "Repere projet",
    detailOneTitle: "Ce que le site rend clair",
    detailTwoTitle: "Ce qui fait la difference",
    detailThreeTitle: "Livrables livres",
    detailOneBody:
      "Un univers musique plus lisible, avec une navigation claire entre label, artistes, sorties, clips, evenements, reseaux et contacts.",
    detailTwoBody:
      "Une presence plus premium, avec une hierarchie visuelle plus forte et une base plus propre pour presenter l'image du projet.",
  },
  en: {
    eyebrow: "Case study",
    title: "KAH Prod, a KAH-Digital build shaped as a true brand piece.",
    intro:
      "The goal was not to place a simple project card. It had to show a universe, a visual direction, and a site able to present the label, artists, releases, and business contacts with a sharper execution.",
    primaryCta: "View live site",
    secondaryCta: "Talk about your project",
    previewLabel: "Live preview",
    previewKicker: "Art direction / independent label",
    secondaryPreviewLabel: "Structured navigation",
    metricsEyebrow: "Project markers",
    detailOneTitle: "What the site makes clear",
    detailTwoTitle: "What creates the difference",
    detailThreeTitle: "Delivered scope",
    detailOneBody:
      "A clearer music universe, with direct navigation between label, artists, releases, clips, events, networks, and business contacts.",
    detailTwoBody:
      "A more premium presence, with stronger visual hierarchy and a cleaner base to present the project image properly.",
  },
} as const;

function splitDeliverables(deliverables: string[]) {
  return deliverables.slice(0, 4);
}

export function ProjectSpotlight({ project, locale = "fr" }: ProjectSpotlightProps) {
  const text = copy[locale];
  const primaryMockup = project.mockups?.primary ?? "/mockups/global-dashboard.png";
  const secondaryMockup = project.mockups?.gallery?.[0] ?? primaryMockup;
  const metrics = project.metrics.slice(0, 3);
  const deliverables = splitDeliverables(project.deliverables);

  return (
    <div className="relative overflow-hidden rounded-[36px] border border-white/12 bg-[linear-gradient(135deg,#07111f_0%,#0b1728_45%,#09101b_100%)] p-6 shadow-[0_35px_100px_rgba(2,6,23,0.55)] sm:p-8 lg:p-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(71,184,255,0.18),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(251,191,36,0.14),transparent_20%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:44px_44px]" />

      <div className="relative grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="text-white">
          <p className="text-xs uppercase tracking-[0.45em] text-white/45">{text.eyebrow}</p>
          <h3 className="mt-4 max-w-2xl text-3xl font-semibold leading-tight text-white sm:text-4xl">
            {text.title}
          </h3>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">{text.intro}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {metrics.map((metric) => (
              <div key={metric.label} className="rounded-[24px] border border-white/12 bg-white/6 p-4 backdrop-blur-sm">
                <p className="text-[0.65rem] uppercase tracking-[0.35em] text-white/45">{metric.label}</p>
                <p className="mt-2 text-2xl font-semibold text-white">{metric.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={project.website ?? "/projets/kah-prod"}
              target={project.website ? "_blank" : undefined}
              rel={project.website ? "noreferrer" : undefined}
              className="inline-flex items-center rounded-full bg-white px-6 py-3 font-semibold text-slate-950 transition-transform duration-300 hover:-translate-y-0.5"
            >
              {text.primaryCta}
            </Link>
            <Link
              href={locale === "en" ? "/en/contact" : "/contact"}
              className="inline-flex items-center rounded-full border border-white/18 bg-white/5 px-6 py-3 font-semibold text-white transition-colors hover:border-white/35 hover:bg-white/10"
            >
              {text.secondaryCta}
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-8 top-8 h-28 w-28 rounded-full bg-amber-300/20 blur-3xl" />
          <div className="absolute right-6 top-0 h-36 w-36 rounded-full bg-sky-400/20 blur-3xl" />

          <div className="relative mx-auto max-w-3xl">
            <div className="relative rounded-[32px] border border-white/14 bg-white/8 p-3 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-sm">
              <div className="flex items-center justify-between rounded-[24px] border border-white/10 bg-[#08101a] px-4 py-3 text-white/65">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                </div>
                <span className="text-[0.65rem] uppercase tracking-[0.35em]">{text.previewLabel}</span>
              </div>

              <div className="mt-3 overflow-hidden rounded-[26px] border border-white/10 bg-[#08111f]">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={primaryMockup}
                    alt={`${project.name} preview`}
                    fill
                    className="object-cover object-top"
                    sizes="(min-width: 1024px) 44vw, 100vw"
                    priority
                  />
                </div>
              </div>
            </div>

            <div className="absolute -bottom-8 -left-4 w-[48%] rounded-[28px] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(241,245,249,0.92))] p-4 text-slate-900 shadow-[0_25px_70px_rgba(0,0,0,0.32)] backdrop-blur-md sm:-left-8">
              <p className="text-[0.62rem] uppercase tracking-[0.38em] text-slate-500">{text.previewKicker}</p>
              <p className="mt-3 text-xl font-semibold leading-tight">{project.name}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{project.shortDescription}</p>
            </div>

            <div className="absolute -right-2 top-10 w-[42%] rounded-[26px] border border-white/12 bg-white/10 p-3 text-white shadow-[0_25px_70px_rgba(0,0,0,0.28)] backdrop-blur-md sm:-right-6">
              <p className="text-[0.62rem] uppercase tracking-[0.38em] text-white/55">{text.secondaryPreviewLabel}</p>
              <div className="mt-3 overflow-hidden rounded-[20px] border border-white/10 bg-[#0a1320]">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={secondaryMockup}
                    alt={`${project.name} secondary preview`}
                    fill
                    className="object-cover object-top"
                    sizes="(min-width: 1024px) 18vw, 45vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mt-16 grid gap-4 lg:grid-cols-[1.15fr_1.15fr_0.9fr]">
        <div className="rounded-[28px] border border-white/10 bg-white/6 p-6 text-white/80 backdrop-blur-sm">
          <p className="text-[0.68rem] uppercase tracking-[0.35em] text-white/45">{text.detailOneTitle}</p>
          <p className="mt-4 text-base leading-7 text-white/78">{text.detailOneBody}</p>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/6 p-6 text-white/80 backdrop-blur-sm">
          <p className="text-[0.68rem] uppercase tracking-[0.35em] text-white/45">{text.detailTwoTitle}</p>
          <p className="mt-4 text-base leading-7 text-white/78">{text.detailTwoBody}</p>
          <p className="mt-4 rounded-2xl border border-white/10 bg-black/15 p-4 text-sm leading-6 text-white/70">
            {project.solution}
          </p>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.11),rgba(255,255,255,0.04))] p-6 text-white backdrop-blur-sm">
          <p className="text-[0.68rem] uppercase tracking-[0.35em] text-white/45">{text.detailThreeTitle}</p>
          <div className="mt-4 space-y-3">
            {deliverables.map((deliverable) => (
              <div key={deliverable} className="rounded-2xl border border-white/10 bg-black/12 px-4 py-3 text-sm text-white/78">
                {deliverable}
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-2xl border border-amber-300/20 bg-amber-300/8 px-4 py-3">
            <p className="text-[0.62rem] uppercase tracking-[0.35em] text-amber-100/75">{text.metricsEyebrow}</p>
            <p className="mt-2 text-sm leading-6 text-amber-50/88">{project.result}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
