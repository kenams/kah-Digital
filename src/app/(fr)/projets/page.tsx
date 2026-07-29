import { ProjectsPageContent } from "@/components/pages/projects-page-content";
import { portfolioProjects } from "@/data/portfolio";
import { buildPageMetadata } from "@/lib/shared-metadata";

const projectsDescription =
  "Agents IA verticaux, sites web, applications et solutions support livrés par KAH Digital — dont KAH Workforce, chef de cabinet IA pour artistes indépendants.";

export const metadata = buildPageMetadata({
  locale: "fr",
  path: "/projets",
  title: "Projets — KAH Workforce & réalisations",
  description: projectsDescription,
});

export default function ProjectsPage() {
  return <ProjectsPageContent locale="fr" projects={portfolioProjects} />;
}
