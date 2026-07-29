import type { Metadata } from "next";
import { ProjectsPageContent } from "@/components/pages/projects-page-content";
import { portfolioProjectsDe } from "@/data/portfolio.de";
import { buildPageMetadata } from "@/lib/shared-metadata";

const projectsDescription =
  "Vertikale KI-Agenten, Websites, Anwendungen und Support-Lösungen von KAH Digital — darunter KAH Workforce, ein KI-Kabinettschef für unabhängige Künstler.";

export const metadata: Metadata = buildPageMetadata({
  locale: "de",
  path: "/projets",
  title: "Referenzen — KAH Workforce & unsere Arbeit",
  description: projectsDescription,
});

export default function ProjectsPageDe() {
  return <ProjectsPageContent locale="de" projects={portfolioProjectsDe} />;
}
