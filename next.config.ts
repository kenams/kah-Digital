import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  experimental: { globalNotFound: true },
  poweredByHeader: false,
  devIndicators: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/portfolio",
        destination: "/projets",
        permanent: true,
      },
      {
        source: "/en/portfolio",
        destination: "/en/projets",
        permanent: true,
      },
      // Le blog DE et la page services DE n'existent qu'en français (les blogs EN et DE existent maintenant) : on évite le 404
      // quand un article EN/DE ou une page DE renvoie vers son index.
      { source: "/de/services", destination: "/services", permanent: false },
      {
        source: "/link",
        destination: "/links",
        permanent: true,
      },
      // Anciennes URL signalées en 404 par Google Search Console (13/11/2026) : projets retirés
      // du portfolio et pages DE/FR déplacées. 301 vers la page la plus proche.
      ...[
        "featness",
        "dropigo",
        "ashanti-beauty",
        "tontine-app",
        "vellio-shop",
        "spotfinder-toulouse",
        "immortal-arena",
        "kah-support",
        "ruby-gallery",
        "ante",
      ].flatMap((slug) => [
        { source: `/projets/${slug}`, destination: "/projets", permanent: true },
        { source: `/en/projets/${slug}`, destination: "/en/projets", permanent: true },
        { source: `/de/projets/${slug}`, destination: "/de/projets", permanent: true },
      ]),
      { source: "/de/agence-web-marseille", destination: "/agence-web-marseille", permanent: true },
      { source: "/de/agence-web-zurich", destination: "/de/webentwicklung-zuerich", permanent: true },
      { source: "/ki-agentur-muenchen", destination: "/de/ki-agentur-muenchen", permanent: true },
      { source: "/de/factures", destination: "/factures", permanent: true },
    ];
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
