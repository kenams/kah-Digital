import type { MetadataRoute } from "next";
import { portfolioProjects } from "@/data/portfolio";
import { portfolioProjectsDe } from "@/data/portfolio.de";
import { portfolioProjectsEn } from "@/data/portfolio.en";
import type { Locale } from "@/lib/locales";
import { getLocalizedPath } from "@/lib/locales";
import { SITE_URL } from "@/lib/shared-metadata";

const locales: Locale[] = ["fr", "en", "de"];

const staticRoutes: Array<{
  path: string;
  priority: number;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
}> = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9, changeFrequency: "weekly" },
  { path: "/services/site-web", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/applications", priority: 0.85, changeFrequency: "monthly" },
  { path: "/services/glpi", priority: 0.75, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.9, changeFrequency: "monthly" },
  { path: "/site-web-entreprise", priority: 0.9, changeFrequency: "weekly" },
  { path: "/refonte-site-web", priority: 0.9, changeFrequency: "weekly" },
  { path: "/application-web-sur-mesure", priority: 0.9, changeFrequency: "weekly" },
  { path: "/automatisation-ia-entreprise", priority: 0.9, changeFrequency: "weekly" },
  { path: "/projets", priority: 0.7, changeFrequency: "monthly" },
  { path: "/lexique", priority: 0.5, changeFrequency: "monthly" },
];

function absoluteUrl(path: string, locale: Locale) {
  return `${SITE_URL}${getLocalizedPath(path, locale)}`;
}

function languageAlternates(path: string) {
  return {
    languages: {
      fr: absoluteUrl(path, "fr"),
      en: absoluteUrl(path, "en"),
      de: absoluteUrl(path, "de"),
      "x-default": absoluteUrl(path, "fr"),
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = staticRoutes.flatMap((route) =>
    locales.map((locale) => ({
      url: absoluteUrl(route.path, locale),
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: languageAlternates(route.path),
    }))
  );

  const projectSlugs = Array.from(
    new Set([
      ...portfolioProjects.map((project) => project.slug),
      ...portfolioProjectsEn.map((project) => project.slug),
      ...portfolioProjectsDe.map((project) => project.slug),
    ])
  ).filter((slug) => slug !== "kah-prod");

  const projectEntries = projectSlugs.flatMap((slug) =>
    locales.map((locale) => ({
      url: absoluteUrl(`/projets/${slug}`, locale),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.65,
      alternates: languageAlternates(`/projets/${slug}`),
    }))
  );

  return [...staticEntries, ...projectEntries];
}
