import type { Metadata } from "next";
import { ProjectsPageContent } from "@/components/pages/projects-page-content";
import { portfolioProjects } from "@/data/portfolio";

const projectsDescription =
  "Sites web, applications et solutions support livres par KAH-Digital pour entreprises francophones, anglophones et internationales.";

export const metadata: Metadata = {
  title: "Projets",
  description: projectsDescription,
  alternates: {
    canonical: "/projets",
    languages: {
      en: "/en/projets",
      de: "/de/projets",
    },
  },
  openGraph: {
    type: "website",
    title: "Projets | KAH-Digital",
    description: projectsDescription,
    url: "/projets",
    images: [{ url: "/og-kah-digital.png", width: 1200, height: 630, alt: "KAH-Digital projets" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projets | KAH-Digital",
    description: projectsDescription,
    images: ["/og-kah-digital.png"],
  },
};

export default function ProjectsPage() {
  return <ProjectsPageContent locale="fr" projects={portfolioProjects} />;
}
