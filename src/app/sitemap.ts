import type { MetadataRoute } from "next";
import { portfolioProjects } from "@/data/portfolio";
import { portfolioProjectsDe } from "@/data/portfolio.de";
import { portfolioProjectsEn } from "@/data/portfolio.en";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://kah-digital-site.vercel.app").trim().replace(/\/+$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/services",
    "/services/site-web",
    "/services/applications",
    "/services/glpi",
    "/contact",
    "/site-web-geneve",
    "/site-web-lausanne",
    "/application-web-suisse",
    "/automatisation-ia-suisse",
    "/factures",
    "/offres",
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

  const routesEn = [
    "/en",
    "/en/services",
    "/en/services/site-web",
    "/en/services/applications",
    "/en/services/glpi",
    "/en/contact",
    "/en/site-web-geneve",
    "/en/site-web-lausanne",
    "/en/application-web-suisse",
    "/en/automatisation-ia-suisse",
    "/en/factures",
    "/en/offres",
    "/en/devis",
    "/en/devis/mvp",
    "/en/configurateur",
    "/en/cahier-des-charges",
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
    "/de/site-web-geneve",
    "/de/site-web-lausanne",
    "/de/application-web-suisse",
    "/de/automatisation-ia-suisse",
    "/de/factures",
    "/de/offres",
    "/de/devis",
    "/de/devis/mvp",
    "/de/configurateur",
    "/de/cahier-des-charges",
    "/de/projets",
    "/de/lexique",
    "/de/mentions-legales",
    "/de/politique-de-confidentialite",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  const projectRoutes = portfolioProjects.map((project) => ({
    url: `${SITE_URL}/projets/${project.slug}`,
    lastModified: new Date(),
  }));

  const projectRoutesEn = portfolioProjectsEn.map((project) => ({
    url: `${SITE_URL}/en/projets/${project.slug}`,
    lastModified: new Date(),
  }));

  const projectRoutesDe = portfolioProjectsDe.map((project) => ({
    url: `${SITE_URL}/de/projets/${project.slug}`,
    lastModified: new Date(),
  }));

  return [...routes, ...routesEn, ...routesDe, ...projectRoutes, ...projectRoutesEn, ...projectRoutesDe];
}
