"use client";

import type { PortfolioProject } from "@/data/portfolio";
import { useLocale } from "@/lib/locale";

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

const projectSceneMapFr: Record<string, ProjectScene> = {
  "kah-prod": {
    badge: "Label",
    hero: "Label, artistes, sorties, clips et contacts métier",
    statLabel: "Sections",
    statValue: "7",
    chip: "Label independant",
    callout: "Navigation claire pour présenter l'univers du label et séparer management, booking, presse et communication.",
    footer: "Next.js / Vercel",
  },
};

const projectSceneMapEn: Record<string, ProjectScene> = {
  "kah-prod": {
    badge: "Label",
    hero: "Label, artists, releases, clips, and business contacts",
    statLabel: "Sections",
    statValue: "7",
    chip: "Independent label",
    callout: "Clear navigation to present the label universe and separate management, booking, press, and communication.",
    footer: "Next.js / Vercel",
  },
};

const projectSceneMapDe: Record<string, ProjectScene> = {
  "kah-prod": {
    badge: "Label",
    hero: "Label, Artists, Releases, Clips und Business-Kontakte",
    statLabel: "Bereiche",
    statValue: "7",
    chip: "Unabhaengiges Label",
    callout: "Klare Navigation, um das Label-Universum zu zeigen und Management, Booking, Presse und Kommunikation sauber zu trennen.",
    footer: "Next.js / Vercel",
  },
};

export type ProjectSceneVariant = "card" | "hero";

const fallbackScene = (project: PortfolioProject, locale: "fr" | "en" | "de"): ProjectScene => ({
  badge: project.type,
  hero: project.tagline,
  statLabel: locale === "en" ? "Result" : "Resultat",
  statValue: project.result,
  chip: project.timeline,
  callout: project.shortDescription,
  calloutLabel: "Modules",
  footer: project.stack.slice(0, 2).join(" / "),
});

type ProjectSceneRenderProps = {
  project: PortfolioProject;
  variant?: ProjectSceneVariant;
};

export function ProjectSceneRender({ project, variant = "card" }: ProjectSceneRenderProps) {
  const { locale } = useLocale();
  const palette = project.palette;
  const sceneMap = locale === "en" ? projectSceneMapEn : projectSceneMapFr;
  const scene = sceneMap[project.slug] ?? fallbackScene(project, locale);
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
