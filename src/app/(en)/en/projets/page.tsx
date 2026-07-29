import type { Metadata } from "next";
import { ProjectsPageContent } from "@/components/pages/projects-page-content";
import { portfolioProjectsEn } from "@/data/portfolio.en";
import { buildPageMetadata } from "@/lib/shared-metadata";

const projectsDescription =
  "Vertical AI agents, websites, applications, and support solutions delivered by KAH Digital — including KAH Workforce, an AI chief-of-staff for independent artists.";

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  path: "/projets",
  title: "Projects — KAH Workforce & our work",
  description: projectsDescription,
});

export default function ProjectsPageEn() {
  return <ProjectsPageContent locale="en" projects={portfolioProjectsEn} />;
}
