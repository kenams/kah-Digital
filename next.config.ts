import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
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
      // Le blog DE et la page services DE n'existent qu'en français (le blog EN existe maintenant) : on évite le 404
      // quand un article EN/DE ou une page DE renvoie vers son index.
      { source: "/de/blog", destination: "/blog", permanent: false },
      { source: "/de/services", destination: "/services", permanent: false },
      {
        source: "/link",
        destination: "/links",
        permanent: true,
      },
    ];
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
