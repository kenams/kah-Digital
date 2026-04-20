import { ProjectsPageContent } from "@/components/pages/projects-page-content";
import { portfolioProjects } from "@/data/portfolio";
import { buildPageMetadata } from "@/lib/shared-metadata";

const projectsDescription =
  "Sites web, applications et solutions support livres par KAH-Digital pour entreprises francophones, anglophones et internationales.";

export const metadata = buildPageMetadata({
  locale: "fr",
  path: "/projets",
  title: "Projets",
  description: projectsDescription,
});

export default function ProjectsPage() {
  return <ProjectsPageContent locale="fr" projects={portfolioProjects} />;
}
