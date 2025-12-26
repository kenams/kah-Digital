import type { MetadataRoute } from "next";
import { portfolioProjects } from "@/data/portfolio";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kah-digital-site.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/devis",
    "/devis/mvp",
    "/configurateur",
    "/cahier-des-charges",
    "/projets",
    "/lexique",
    "/mentions-legales",
    "/politique-de-confidentialite",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  const projectRoutes = portfolioProjects.map((project) => ({
    url: `${SITE_URL}/projets/${project.slug}`,
    lastModified: new Date(),
  }));

  return [...routes, ...projectRoutes];
}
