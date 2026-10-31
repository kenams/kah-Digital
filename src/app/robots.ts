import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/shared-metadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/admin/", "/api/", "/p/", "/maquette/", "/scopelock/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
