import { notFound } from "next/navigation";
import { ProjectDetailPageContent } from "@/components/pages/project-detail-page-content";
import { portfolioProjectsEn } from "@/data/portfolio.en";
import { buildNoIndexMetadata, sanitizeDescription } from "@/lib/shared-metadata";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return portfolioProjectsEn.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = portfolioProjectsEn.find((item) => item.slug === slug);
  if (!project) return {};
  if (slug === "kah-prod") {
    return buildNoIndexMetadata({
      locale: "en",
      path: `/projets/${slug}`,
      title: `${project.name} — Case Study | KAH Digital Studio`,
      description: sanitizeDescription(project.shortDescription),
    });
  }

  const ogImage = project.mockups?.primary ?? "/og-kah-studio.png";
  const title = `${project.name} — Case Study | KAH Digital Studio`;

  return {
    title,
    description: sanitizeDescription(project.shortDescription),
    alternates: {
      canonical: `/en/projets/${slug}`,
      languages: {
        fr: `/projets/${slug}`,
      },
    },
    openGraph: {
      type: "article",
      url: `/en/projets/${slug}`,
      title,
      description: sanitizeDescription(project.shortDescription),
      images: [{ url: ogImage, width: 1200, height: 900, alt: `${project.name} mockup` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: sanitizeDescription(project.shortDescription),
      images: [ogImage],
    },
  };
}

export default async function ProjectPageEn({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = portfolioProjectsEn.find((item) => item.slug === slug);

  if (!project) return notFound();

  return <ProjectDetailPageContent locale="en" project={project} />;
}
