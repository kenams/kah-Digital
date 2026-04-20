import type { MetadataRoute } from "next";
import { portfolioProjects } from "@/data/portfolio";
import { portfolioProjectsDe } from "@/data/portfolio.de";
import { portfolioProjectsEn } from "@/data/portfolio.en";
import { SITE_URL } from "@/lib/shared-metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/services",
    "/services/site-web",
    "/services/applications",
    "/services/glpi",
    "/contact",
    "/site-web-entreprise",
    "/refonte-site-web",
    "/application-web-sur-mesure",
    "/automatisation-ia-entreprise",
    "/projets",
    "/lexique",
    "/mentions-legales",
    "/politique-de-confidentialite",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  const routesEn = [
    "/en",
    "/en/services",
    "/en/services/site-web",
    "/en/services/applications",
    "/en/services/glpi",
    "/en/contact",
    "/en/site-web-entreprise",
    "/en/refonte-site-web",
    "/en/application-web-sur-mesure",
    "/en/automatisation-ia-entreprise",
    "/en/projets",
    "/en/lexique",
    "/en/mentions-legales",
    "/en/politique-de-confidentialite",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  const routesDe = [
    "/de",
    "/de/services",
    "/de/services/site-web",
    "/de/services/applications",
    "/de/services/glpi",
    "/de/contact",
    "/de/site-web-entreprise",
    "/de/refonte-site-web",
    "/de/application-web-sur-mesure",
    "/de/automatisation-ia-entreprise",
    "/de/projets",
    "/de/lexique",
    "/de/mentions-legales",
    "/de/politique-de-confidentialite",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  const projectRoutes = portfolioProjects.filter((project) => project.slug !== "kah-prod").map((project) => ({
    url: `${SITE_URL}/projets/${project.slug}`,
    lastModified: new Date(),
  }));

  const projectRoutesEn = portfolioProjectsEn.filter((project) => project.slug !== "kah-prod").map((project) => ({
    url: `${SITE_URL}/en/projets/${project.slug}`,
    lastModified: new Date(),
  }));

  const projectRoutesDe = portfolioProjectsDe.filter((project) => project.slug !== "kah-prod").map((project) => ({
    url: `${SITE_URL}/de/projets/${project.slug}`,
    lastModified: new Date(),
  }));

  return [...routes, ...routesEn, ...routesDe, ...projectRoutes, ...projectRoutesEn, ...projectRoutesDe];
}
