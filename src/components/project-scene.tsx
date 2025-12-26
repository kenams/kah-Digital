"use client";

import type { PortfolioProject } from "@/data/portfolio";

type ProjectScene = {
  badge: string;
  hero: string;
  statLabel: string;
  statValue: string;
  chip: string;
  callout: string;
  calloutLabel?: string;
  footer: string;
};

const projectSceneMap: Record<string, ProjectScene> = {
  "atelier-nomade": {
    badge: "Manifesto",
    hero: "Portfolio immersif + timeline chantier",
    statLabel: "Conversion",
    statValue: "+40%",
    chip: "5 semaines",
    callout: "Histoire, moodboard, briefs pre-remplis.",
    footer: "7 pages / Sanity",
  },
  "lumea-skin": {
    badge: "Shopflow",
    hero: "Routine personnalisee & panier intelligent",
    statLabel: "Panier moyen",
    statValue: "+22%",
    chip: "Scale e-commerce",
    callout: "Quiz skincare, bundles, Stripe + Klaviyo.",
    footer: "Next.js / Commerce Layer",
  },
  novapay: {
    badge: "Fintech deck",
    hero: "Landing claire + chiffres animes",
    statLabel: "Demos",
    statValue: "x2",
    chip: "3 semaines",
    callout: "Manifesto video, pricing limpide, CTA sticky.",
    footer: "HubSpot / Framer Motion",
  },
  "valoris-conseil": {
    badge: "Editorial",
    hero: "Site bilingue + exports PDF instantanes",
    statLabel: "Prod time",
    statValue: "x3",
    chip: "6 semaines",
    callout: "Filtres multi-criteres + fiches missions.",
    footer: "Contentful / Next.js",
  },
  "pulse-studio": {
    badge: "Events",
    hero: "Portfolio fullscreen + brief connecte",
    statLabel: "Pipeline",
    statValue: "x1.8",
    chip: "4 semaines",
    callout: "Carrousel GSAP + formulaire multi-etapes.",
    footer: "GSAP / Airtable/Slack",
  },
  "oko-energy": {
    badge: "Cleantech",
    hero: "Timeline impact + carte Mapbox live",
    statLabel: "Perf score",
    statValue: "94",
    chip: "Microsite 4 chapitres",
    callout: "Data viz, carte des sites, lien data room.",
    footer: "Next.js / GSAP / Mapbox",
  },
  "fairbuild-mvp": {
    badge: "MVP",
    hero: "Double onboarding promoteur / artisan",
    statLabel: "Deals pilotes",
    statValue: "12",
    chip: "5 semaines",
    callout: "Scoring auto, webhooks Make, dashboard scoring.",
    footer: "Next.js / Supabase",
  },
  pulselearn: {
    badge: "Cohortes",
    hero: "Plateforme audio + quiz legers",
    statLabel: "Completion",
    statValue: "+35%",
    chip: "4 semaines",
    callout: "Lecteur progressif, PWA offline, Stripe checkout.",
    footer: "Supabase / Stripe",
  },
};

export type ProjectSceneVariant = "card" | "hero";

const fallbackScene = (project: PortfolioProject): ProjectScene => ({
  badge: project.type,
  hero: project.tagline,
  statLabel: "Resultat",
  statValue: project.result,
  chip: project.timeline,
  callout: project.shortDescription,
  footer: project.stack.slice(0, 2).join(" / "),
});

type ProjectSceneRenderProps = {
  project: PortfolioProject;
  variant?: ProjectSceneVariant;
};

export function ProjectSceneRender({ project, variant = "card" }: ProjectSceneRenderProps) {
  const palette = project.palette;
  const scene = projectSceneMap[project.slug] ?? fallbackScene(project);
  const height = variant === "hero" ? "h-64" : "h-48";

  return (
    <div
      className="relative overflow-hidden rounded-[22px] border border-white/15 bg-white/5 p-4 text-[#0f1229]"
      style={{
        background: `linear-gradient(135deg, ${palette.primary}, ${palette.secondary})`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className={`relative grid ${height} grid-cols-[1.2fr,0.8fr] gap-3 text-xs`}>
        <div className="rounded-2xl bg-white/95 p-3 text-[#0f1229] shadow-[0_20px_45px_rgba(10,10,10,0.25)]">
          <div className="inline-flex items-center gap-2 rounded-full bg-black/5 px-3 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.35em] text-[#0f1229]/70">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            {scene.badge}
          </div>
          <p className="mt-2 text-lg font-semibold leading-tight">{scene.hero}</p>
          <div className="mt-3 rounded-xl bg-[#f4f4f8] p-3 text-xs text-[#1b2345]">
            <p className="text-[0.58rem] uppercase tracking-[0.35em] text-[#9ca3c7]">
              {scene.calloutLabel ?? "Modules"}
            </p>
            <p className="mt-1 font-medium leading-relaxed">{scene.callout}</p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="rounded-2xl bg-white/90 p-3 text-[#0f1229] shadow-[0_16px_40px_rgba(0,0,0,0.18)]">
            <p className="text-[0.58rem] uppercase tracking-[0.35em] text-[#9ca3c7]">{scene.statLabel}</p>
            <p className="text-2xl font-bold leading-tight">{scene.statValue}</p>
          </div>
          <div className="rounded-2xl bg-white/70 p-3 text-xs text-[#0f1229] shadow-[0_12px_30px_rgba(0,0,0,0.12)]">
            <p className="font-medium">{scene.footer}</p>
            <p className="text-[0.58rem] uppercase tracking-[0.35em] text-[#6b7399]">{scene.chip}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
