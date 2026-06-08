import type { Metadata } from "next";
import { ProjectsPageContent } from "@/components/pages/projects-page-content";
import { portfolioProjectsDe } from "@/data/portfolio.de";
import { buildPageMetadata } from "@/lib/shared-metadata";

const projectsDescription =
  "Websites, Anwendungen und Support-Lösungen von KAH Digital für deutsch- und französischsprachige sowie internationale Unternehmen.";

export const metadata: Metadata = buildPageMetadata({
  locale: "de",
  path: "/projets",
  title: "Referenzen",
  description: projectsDescription,
});

export default function ProjectsPageDe() {
  return <ProjectsPageContent locale="de" projects={portfolioProjectsDe} />;
}
