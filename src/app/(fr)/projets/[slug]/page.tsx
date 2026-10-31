import { notFound } from "next/navigation";
import { ProjectDetailPageContent } from "@/components/pages/project-detail-page-content";
import { portfolioProjects } from "@/data/portfolio";
import { portfolioProjectsEn } from "@/data/portfolio.en";
import { buildNoIndexMetadata } from "@/lib/shared-metadata";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = portfolioProjects.find((item) => item.slug === slug);
  if (!project) return {};
  if (slug === "kah-prod") {
    return buildNoIndexMetadata({
      locale: "fr",
      path: `/projets/${slug}`,
      title: `${project.name} | KAH Digital Studio`,
      description: project.shortDescription,
    });
  }

  const ogImage = project.mockups?.primary ?? "/og-kah-studio.png";
  const title = `${project.name} | KAH Digital Studio`;

  return {
    title,
    description: project.shortDescription,
    alternates: {
      canonical: `/projets/${slug}`,
      // hreflang EN uniquement si la fiche anglaise existe (sinon 404)
      languages: portfolioProjectsEn.some((p) => p.slug === slug) ? { en: `/en/projets/${slug}` } : undefined,
    },
    openGraph: {
      type: "article",
      url: `/projets/${slug}`,
      title,
      description: project.shortDescription,
      images: [{ url: ogImage, width: 1200, height: 900, alt: `${project.name} mockup` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.shortDescription,
      images: [ogImage],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = portfolioProjects.find((item) => item.slug === slug);

  if (!project) return notFound();

  return <ProjectDetailPageContent locale="fr" project={project} />;
}
