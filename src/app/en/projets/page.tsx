import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AssetGrid } from "@/components/asset-grid";
import { Reveal } from "@/components/reveal";
import { assetShotsEn } from "@/data/asset-shots";
import { portfolioProjectsEn } from "@/data/portfolio.en";

export const metadata: Metadata = {
  title: "Kah-Digital projects",
  description: "Selection of case studies delivered by Kah-Digital.",
  alternates: {
    canonical: "/en/projets",
    languages: {
      fr: "/projets",
    },
  },
  openGraph: {
    type: "website",
    title: "Kah-Digital projects",
    description: "Selection of case studies delivered by Kah-Digital.",
    url: "/en/projets",
    images: [
      {
        url: "/og-kah-digital.png",
        width: 1200,
        height: 630,
        alt: "Kah-Digital projects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kah-Digital projects",
    description: "Selection of case studies delivered by Kah-Digital.",
    images: ["/og-kah-digital.png"],
  },
};

export default function ProjectsPageEn() {
  return (
    <div className="section-shell space-y-8">
      <div className="flex flex-wrap gap-3 text-sm text-white/70">
        <Link
          href="/en"
          className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white"
        >
          Back to home
        </Link>
        <Link
          href="/en/configurateur"
          className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white"
        >
          Quick quote
        </Link>
      </div>
      <Reveal>
        <div className="premium-card surface-dark rounded-[38px] border border-white/10 bg-gradient-to-br from-[#070818] via-[#0f0d21] to-[#1d1338] p-6 text-white sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.3em] text-white/60">Portfolio</p>
              <h1 className="text-4xl font-semibold">Recent projects</h1>
              <p className="text-white/70 max-w-3xl">
                From narrative showcase sites to polished e-commerce flows: here are representative case studies from our
                Next.js + React Native studio.
              </p>
            </div>
            <div className="premium-card rounded-3xl border border-white/15 bg-white/5 p-4">
              <Image
                src="/mockups/global-dashboard.svg"
                alt="Kah-Digital portfolio preview"
                width={520}
                height={360}
                sizes="(min-width: 1024px) 260px, 70vw"
                className="h-40 w-full rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </Reveal>
      <div className="grid gap-6 md:grid-cols-2">
        {portfolioProjectsEn.map((project, index) => (
          <Reveal key={project.slug} delay={index * 0.05}>
            <Link
              href={`/en/projets/${project.slug}`}
              className="premium-card surface-dark dark-card relative overflow-hidden rounded-3xl p-6 text-white transition duration-500 hover:-translate-y-1"
              style={{
                background: `linear-gradient(135deg, ${project.palette.primary}, ${project.palette.secondary})`,
              }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-40"
                style={{ background: `radial-gradient(circle at 10% 10%, ${project.palette.accent}, transparent 60%)` }}
              />
              <div className="relative space-y-3">
                <p className="text-xs uppercase tracking-[0.4em] text-white/70">{project.type}</p>
                <p className="text-2xl font-semibold">{project.name}</p>
                <p className="text-sm text-white/75">{project.tagline}</p>
                <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.3em] text-white/60">
                  {project.stack.slice(0, 4).map((tech) => (
                    <span key={tech} className="rounded-full border border-white/20 px-3 py-1">
                      {tech}
                    </span>
                  ))}
                </div>
                <p className="text-sm font-medium text-white">{project.result}</p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <section className="premium-card surface-dark space-y-6 rounded-[38px] border border-white/10 bg-gradient-to-br from-[#070818] via-[#110b26] to-[#23123d] p-6 text-white shadow-[0_25px_80px_rgba(11,6,32,0.45)] sm:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-white/60">AssetShots</p>
              <h2 className="text-3xl font-semibold">Figma scenes exported for each project.</h2>
              <p className="mt-2 max-w-3xl text-white/70">
                We also deliver HD mockups and 3D variants of key screens to feed portfolios, investor decks, and case
                studies. Available in light and dark formats depending on pages.
              </p>
            </div>
            <Link
              href="/en/projets"
              className="inline-flex items-center justify-center rounded-full border border-white/25 px-5 py-2 text-sm text-white/80 transition hover:border-white hover:text-white"
            >
              View the full pack
            </Link>
          </div>
          <AssetGrid assets={assetShotsEn.slice(0, 4)} columns="dense" />
        </section>
      </Reveal>
    </div>
  );
}
