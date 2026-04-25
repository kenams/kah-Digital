import Link from "next/link";
import type { PortfolioProject } from "@/data/portfolio";

type ProjectSpotlightProps = {
  project: PortfolioProject;
  locale?: "fr" | "en" | "de";
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
  de: {
    eyebrow: "Referenz",
    title: "KAH Prod, ein KAH-Digital Projekt mit klarem Markencharakter.",
    intro:
      "Es ging nicht um eine einfache Projektkarte, sondern um eine echte Markenpräsenz: ein klares Universum, eine saubere visuelle Richtung und eine Website, die Label, Artists, Releases und Business-Kontakte hochwertig präsentiert.",
    primaryCta: "Website ansehen",
    secondaryCta: "Projekt besprechen",
    previewLabel: "Live-Vorschau",
    previewKicker: "Art Direction / unabhängiges Label",
    secondaryPreviewLabel: "Strukturierte Navigation",
    metricsEyebrow: "Projektmarker",
    detailOneTitle: "Was die Website sofort klar macht",
    detailTwoTitle: "Was den eigentlichen Unterschied schafft",
    detailThreeTitle: "Gelieferter Umfang",
    detailOneBody:
      "Ein klareres Musikuniversum mit direkter Navigation zwischen Label, Artists, Releases, Clips, Events, Netzwerken und Business-Kontakten.",
    detailTwoBody:
      "Eine deutlich wertigere Präsenz mit stärkerer visueller Hierarchie und einer saubereren Basis für das Markenbild.",
  },
} as const;

function splitDeliverables(deliverables: string[]) {
  return deliverables.slice(0, 4);
}

function KahProdHeroPreview({ locale }: { locale: "fr" | "en" | "de" }) {
  const content =
    locale === "en"
      ? {
          badge: "Independent label - Toulouse / France",
          lead: "Premium production, cinematic image, and tailored digital direction for ambitious French-speaking artists.",
          primary: "Discover artists",
          secondary: "View releases",
        }
      : locale === "de"
        ? {
            badge: "Unabhängiges Label - Toulouse / Frankreich",
            lead:
              "Premium-Produktion, cineastische Bildsprache und eine maßgeschneiderte digitale Ausrichtung für ambitionierte frankophone Artists.",
            primary: "Artists entdecken",
            secondary: "Releases ansehen",
          }
        : {
            badge: "Label independant - Toulouse / France",
            lead: "Production premium, image cine et direction digitale sur-mesure pour des artistes francophones ambitieux.",
            primary: "Decouvrir les artistes",
            secondary: "Voir les sorties",
          };

  return (
    <div className="relative overflow-hidden rounded-[30px] border border-[#6f5530] bg-[linear-gradient(135deg,#121318_0%,#1b1716_35%,#2a1f19_58%,#0f1014_100%)] p-7 shadow-[0_30px_90px_rgba(0,0,0,0.42)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(211,129,76,0.34),transparent_24%),radial-gradient(circle_at_22%_24%,rgba(255,214,140,0.12),transparent_18%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent)]" />
      <div className="pointer-events-none absolute inset-0 flex items-start justify-center pt-6 text-[8.5rem] font-black uppercase tracking-[0.22em] text-white/[0.035]">
        K P
      </div>

      <div className="relative">
        <span className="inline-flex rounded-full border border-[#8d6a35] bg-[linear-gradient(180deg,rgba(88,69,41,0.7),rgba(53,42,29,0.6))] px-5 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[#e5c46f]">
          {content.badge}
        </span>

        <div className="mt-6 flex items-end gap-2 text-[clamp(3.4rem,9vw,7rem)] font-light uppercase leading-none tracking-[-0.08em] text-[#f5efe6]">
          <span className="font-extralight">KAH</span>
          <span className="text-[#d6ab59]">-</span>
          <span className="bg-[linear-gradient(90deg,#f7ecd8_0%,#d4ab5b_45%,#cf875e_100%)] bg-clip-text text-transparent">PROD</span>
        </div>

        <p className="mt-6 max-w-2xl text-lg leading-9 text-white/72">{content.lead}</p>

        <div className="mt-8 flex flex-wrap gap-4">
          <span className="inline-flex items-center rounded-full bg-[#d6a74e] px-6 py-3 font-semibold text-[#14161d] shadow-[0_10px_30px_rgba(214,167,78,0.32)]">
            {content.primary}
          </span>
          <span className="inline-flex items-center rounded-full border border-white/14 px-6 py-3 font-semibold text-white/82">
            {content.secondary}
          </span>
        </div>
      </div>
    </div>
  );
}

export function ProjectSpotlight({ project, locale = "fr" }: ProjectSpotlightProps) {
  const text = copy[locale];
  const metrics = project.metrics.slice(0, 3);
  const deliverables = splitDeliverables(project.deliverables);

  return (
    <div className="relative overflow-hidden rounded-[36px] border border-white/12 bg-[linear-gradient(135deg,#07111f_0%,#0b1728_45%,#09101b_100%)] p-6 shadow-[0_35px_100px_rgba(2,6,23,0.55)] sm:p-8 lg:p-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(71,184,255,0.18),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(251,191,36,0.14),transparent_20%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:44px_44px]" />

      <div className="relative grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="text-white">
          <p className="text-xs uppercase tracking-[0.45em] text-white/45">{text.eyebrow}</p>
          <h3 className="mt-4 max-w-2xl text-3xl font-semibold leading-tight text-white sm:text-4xl">{text.title}</h3>
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
              href={locale === "en" ? "/en/contact" : locale === "de" ? "/de/contact" : "/contact"}
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
            <Link
              href={project.website ?? "/projets/kah-prod"}
              target={project.website ? "_blank" : undefined}
              rel={project.website ? "noreferrer" : undefined}
              aria-label={`${text.primaryCta} - ${project.name}`}
              className="group block transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="relative rounded-[34px] border border-white/14 bg-white/8 p-4 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-sm">
                <div className="mb-4 flex items-center justify-between px-1 text-white/60">
                  <span className="text-[0.65rem] uppercase tracking-[0.35em]">{text.previewLabel}</span>
                  <span className="h-px w-16 bg-white/15 transition-colors duration-300 group-hover:bg-amber-300/60" />
                </div>
                <div className="transition-transform duration-500 group-hover:scale-[1.01]">
                  <KahProdHeroPreview locale={locale} />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="relative mt-10 grid gap-4 lg:grid-cols-[1.15fr_1.15fr_0.9fr]">
        <div className="rounded-[28px] border border-white/10 bg-white/6 p-6 text-white/80 backdrop-blur-sm">
          <p className="text-[0.68rem] uppercase tracking-[0.35em] text-white/45">{text.previewKicker}</p>
          <p className="mt-3 text-2xl font-semibold text-white">{project.name}</p>
          <p className="mt-3 text-base leading-7 text-white/72">{project.shortDescription}</p>
        </div>

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
