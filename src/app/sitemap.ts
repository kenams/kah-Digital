import type { MetadataRoute } from "next";
import { portfolioProjects } from "@/data/portfolio";
import { portfolioProjectsEn } from "@/data/portfolio.en";
import { SITE_URL } from "@/lib/shared-metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes = [
    "",
    "/services",
    "/services/site-web",
    "/services/applications",
    "/services/glpi",
    "/offres",
    "/contact",
    "/site-web-entreprise",
    "/refonte-site-web",
    "/application-web-sur-mesure",
    "/automatisation-ia-entreprise",
    "/automatisation-ia-suisse",
    "/application-web-suisse",
    "/agence-ia",
    "/projets",
    "/lexique",
    // Pages SEO locales — priorité haute
    "/site-web-lausanne",
    "/site-web-geneve",
    "/site-web-fribourg",
    "/agence-web-paris",
    "/agence-web-lyon",
    "/agence-web-marseille",
    "/agence-web-bordeaux",
    "/agence-web-nantes",
    "/agence-web-strasbourg",
    "/agence-web-berne",
    "/agence-web-toulouse",
    "/agence-web-nice",
    "/agence-web-lille",
    "/agence-web-montpellier",
    "/agence-web-rennes",
    "/agence-web-zurich",
    "/agence-web-basel",
    "/agence-web-lugano",
    "/agence-web-grenoble",
    "/agence-web-rouen",
    "/agence-web-aix-en-provence",
    "/agence-web-angers",
    "/agence-web-dijon",
    "/agence-web-caen",
    "/agence-web-clermont-ferrand",
    "/agence-web-metz",
    "/audit-gratuit",
    "/blog",
    "/blog/prix-site-web-professionnel",
    "/blog/refonte-site-web",
    "/blog/creation-site-web-pme",
    "/blog/site-web-artisan",
    "/blog/site-web-restaurant",
    "/blog/agence-web-pme-comment-choisir",
    "/blog/application-mobile-cout",
    "/blog/landing-page-vs-site-vitrine",
    "/blog/seo-local-pme",
    "/references",
    "/mentions-legales",
    "/politique-de-confidentialite",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: (path.includes("agence-web") || path.includes("site-web-"))
      ? ("weekly" as const)
      : ("monthly" as const),
    priority: path === "" ? 1.0 : path === "/offres" ? 0.9 : path.includes("lausanne") || path.includes("geneve") || path.includes("fribourg") || path.includes("zurich") || path.includes("basel") || path.includes("lugano") ? 0.9 : path.includes("agence-web") || path.includes("site-web-") ? 0.8 : 0.7,
  }));

  const routesEn = [
    "/en",
    "/en/services",
    "/en/offres",
    "/en/contact",
    "/en/site-web-entreprise",
    "/en/refonte-site-web",
    "/en/application-web-sur-mesure",
    "/en/automatisation-ia-entreprise",
    "/en/agence-ia",
    "/en/projets",
    // EN city pages — SEO international
    "/en/ai-agency-london",
    "/en/web-development-london",
    "/en/ai-agency-new-york",
    "/en/web-development-new-york",
    "/en/ai-agency-dubai",
    "/en/web-development-dubai",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: (path.includes("agency") || path.includes("development")) ? ("weekly" as const) : ("monthly" as const),
    priority: path === "/en" ? 0.9 : path.includes("agency") || path.includes("development") ? 0.85 : 0.7,
  }));

  const routesDe = [
    "/de",
    "/de/offres",
    "/de/contact",
    "/de/devis",
    "/de/site-web-entreprise",
    "/de/refonte-site-web",
    "/de/application-web-sur-mesure",
    "/de/automatisation-ia-entreprise",
    "/de/agence-ia",
    // DE city pages — SEO DACH + international
    "/de/webentwicklung-zuerich",
    "/de/ki-agentur-zuerich",
    "/de/webentwicklung-muenchen",
    "/de/ki-agentur-muenchen",
    "/de/webentwicklung-berlin",
    "/de/ki-agentur-berlin",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: (path.includes("agentur") || path.includes("entwicklung")) ? ("weekly" as const) : ("monthly" as const),
    priority: path === "/de" ? 0.9 : path.includes("agentur") || path.includes("entwicklung") ? 0.85 : 0.7,
  }));

  const projectRoutes = portfolioProjects.filter((p) => p.slug !== "kah-prod").map((p) => ({
    url: `${SITE_URL}/projets/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const projectRoutesEn = portfolioProjectsEn.filter((p) => p.slug !== "kah-prod").map((p) => ({
    url: `${SITE_URL}/en/projets/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...routes, ...routesEn, ...routesDe, ...projectRoutes, ...projectRoutesEn];
}
