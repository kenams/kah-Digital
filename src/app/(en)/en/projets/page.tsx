import type { Metadata } from "next";
import { ProjectsPageContent } from "@/components/pages/projects-page-content";
import { portfolioProjectsEn } from "@/data/portfolio.en";
import { buildPageMetadata } from "@/lib/shared-metadata";

const projectsDescription =
  "Websites, applications, and support solutions delivered by KAH-Digital for French-speaking, English-speaking, and international companies.";

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  path: "/projets",
  title: "Projects",
  description: projectsDescription,
});

export default function ProjectsPageEn() {
  return <ProjectsPageContent locale="en" projects={portfolioProjectsEn} />;
}
