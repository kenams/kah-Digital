import type { Metadata } from "next";
import { ProjectsPageContent } from "@/components/pages/projects-page-content";
import { portfolioProjectsEn } from "@/data/portfolio.en";

const projectsDescription =
  "Websites, applications, and support solutions delivered by KAH-Digital for French-speaking, English-speaking, and international companies.";

export const metadata: Metadata = {
  title: "Projects",
  description: projectsDescription,
  alternates: {
    canonical: "/en/projets",
    languages: {
      fr: "/projets",
      de: "/de/projets",
    },
  },
  openGraph: {
    type: "website",
    title: "Projects | KAH-Digital",
    description: projectsDescription,
    url: "/en/projets",
    images: [{ url: "/og-kah-digital.png", width: 1200, height: 630, alt: "KAH-Digital projects" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | KAH-Digital",
    description: projectsDescription,
    images: ["/og-kah-digital.png"],
  },
};

export default function ProjectsPageEn() {
  return <ProjectsPageContent locale="en" projects={portfolioProjectsEn} />;
}
