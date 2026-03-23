import type { Metadata } from "next";
import { ProjectsPageContent } from "@/components/pages/projects-page-content";
import { portfolioProjectsDe } from "@/data/portfolio.de";

export const metadata: Metadata = {
  title: "Projekte",
  description: "Ausgewaehlte KAH-Digital Referenz mit Fokus auf Struktur, Bildsprache und klares digitales Rendering.",
  alternates: {
    canonical: "/de/projets",
    languages: {
      fr: "/projets",
      en: "/en/projets",
      de: "/de/projets",
    },
  },
};

export default function ProjectsPageDe() {
  return <ProjectsPageContent locale="de" projects={portfolioProjectsDe} />;
}
