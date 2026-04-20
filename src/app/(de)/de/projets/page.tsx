import type { Metadata } from "next";
import { ProjectsPageContent } from "@/components/pages/projects-page-content";
import { portfolioProjectsDe } from "@/data/portfolio.de";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "de",
  path: "/projets",
  title: "Projekte",
  description: "Ausgewaehlte KAH-Digital Referenz mit Fokus auf Struktur, Bildsprache und klares digitales Rendering.",
});

export default function ProjectsPageDe() {
  return <ProjectsPageContent locale="de" projects={portfolioProjectsDe} />;
}
