import Image from "next/image";
import Link from "next/link";
import { AssetGrid } from "@/components/asset-grid";
import { Reveal } from "@/components/reveal";
import { assetShots } from "@/data/asset-shots";
import { portfolioProjects } from "@/data/portfolio";

export const metadata = {
  title: "Projets Kah-Digital",
  description: "Selection d&apos;etudes de cas livrees par Kah-Digital.",
};

export default function ProjectsPage() {
  return (
    <div className="section-shell space-y-8">
      <div className="flex flex-wrap gap-3 text-sm text-white/70">
        <Link
          href="/"
          className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white"
        >
          Retour a l&apos;accueil
        </Link>
        <Link
          href="/configurateur"
          className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white"
        >
          Configurateur
        </Link>
      </div>
      <Reveal>
        <div className="surface-dark rounded-[38px] border border-white/10 bg-gradient-to-br from-[#070818] via-[#0f0d21] to-[#1d1338] p-6 text-white sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.3em] text-white/60">Portfolio</p>
              <h1 className="text-4xl font-semibold">Nos projets recents</h1>
              <p className="text-white/70 max-w-3xl">
                De vitrines narratives a des parcours e-commerce aboutis : voici des cas representatifs de notre studio Next.js
                + React Native.
              </p>
            </div>
            <div className="rounded-3xl border border-white/15 bg-white/5 p-4">
              <Image
                src="/mockups/global-dashboard.svg"
                alt="Apercu portfolio Kah-Digital"
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
        {portfolioProjects.map((project, index) => (
          <Reveal key={project.slug} delay={index * 0.05}>
            <Link
              href={`/projets/${project.slug}`}
              className="surface-dark dark-card relative overflow-hidden rounded-3xl p-6 text-white transition duration-500 hover:-translate-y-1"
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
        <section className="surface-dark space-y-6 rounded-[38px] border border-white/10 bg-gradient-to-br from-[#070818] via-[#110b26] to-[#23123d] p-6 text-white shadow-[0_25px_80px_rgba(11,6,32,0.45)] sm:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-white/60">AssetShots</p>
              <h2 className="text-3xl font-semibold">Scenes Figma exportees pour chaque projet.</h2>
              <p className="mt-2 max-w-3xl text-white/70">
                On livre aussi les mockups HD et versions 3D des ecrans clefs pour alimenter portfolio, deck investisseur
                et case study. Disponible en formats light et dark selon les pages.
              </p>
            </div>
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center rounded-full border border-white/25 px-5 py-2 text-sm text-white/80 transition hover:border-white hover:text-white"
            >
              Voir tout le pack
            </Link>
          </div>
          <AssetGrid assets={assetShots.slice(0, 4)} columns="dense" />
        </section>
      </Reveal>
    </div>
  );
}

