import { notFound } from "next/navigation";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { ProjectSceneRender } from "@/components/project-scene";
import { AssetGrid } from "@/components/asset-grid";
import { assetShots } from "@/data/asset-shots";
import { portfolioProjects } from "@/data/portfolio";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = portfolioProjects.find((item) => item.slug === slug);
  if (!project) return {};
  return {
    title: `${project.name}  Kah-Digital`,
    description: project.shortDescription,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = portfolioProjects.find((item) => item.slug === slug);
  if (!project) {
    return notFound();
  }
  const relatedAssets = assetShots.filter((asset) => asset.cta.href.includes(`/projets/${project.slug}`));
  const gridAssets = relatedAssets.length > 0 ? relatedAssets : assetShots.slice(0, 3);

  return (
    <div className="section-shell space-y-10">
      <div className="flex flex-wrap gap-3 text-sm text-white/70">
        <Link
          href="/projets"
          className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white"
        >
          ← Retour aux projets
        </Link>
        <Link
          href="/"
          className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white"
        >
          Accueil
        </Link>
      </div>
      <Reveal>
        <div
          className="relative overflow-hidden rounded-[40px] p-8 text-white"
          style={{ background: `linear-gradient(135deg, ${project.palette.primary}, ${project.palette.secondary})` }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{ background: `radial-gradient(circle at 15% 15%, ${project.palette.accent}, transparent 65%)` }}
          />
          <div className="relative space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-white/70">{project.type}</p>
            <h1 className="text-4xl font-semibold">{project.name}</h1>
            <p className="text-lg text-white/80 max-w-3xl">{project.tagline}</p>
            <div className="flex flex-wrap gap-3 text-sm text-white/70">
              <span className="rounded-full border border-white/30 px-3 py-1">Timeline : {project.timeline}</span>
              <span className="rounded-full border border-white/30 px-3 py-1">Resultat : {project.result}</span>
            </div>
            <div className="mt-6">
              <ProjectSceneRender project={project} variant="hero" />
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div className="grid gap-6 rounded-[32px] border border-white/10 bg-white/5 p-8 md:grid-cols-[2fr,1fr]">
          <div className="space-y-6">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-white/60">Mission</p>
              <p className="mt-3 text-white/80">{project.description}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <p className="text-xs uppercase tracking-[0.4em] text-white/60">Challenge</p>
                <p className="mt-2 text-sm text-white/80">{project.challenge}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <p className="text-xs uppercase tracking-[0.4em] text-white/60">Solution</p>
                <p className="mt-2 text-sm text-white/80">{project.solution}</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">Stack</p>
            <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.3em] text-white/70">
              {project.stack.map((tech) => (
                <span key={tech} className="rounded-full border border-white/15 px-3 py-1">
                  {tech}
                </span>
              ))}
            </div>
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">Deliverables</p>
            <ul className="list-disc space-y-1 pl-4 text-white/75">
              {project.deliverables.map((deliverable) => (
                <li key={deliverable}>{deliverable}</li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {project.metrics.map((metric) => (
            <Reveal key={metric.label}>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center">
                <p className="text-3xl font-semibold text-white">{metric.value}</p>
                <p className="text-sm uppercase tracking-[0.3em] text-white/60">{metric.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Reveal>

      <Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">Points forts</p>
            <ul className="mt-4 space-y-3 text-white/75">
              {project.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-white/60" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">Et ensuite -</p>
            <p className="mt-4 text-white/70">
              Besoin d&apos;un site dans la meme energie - On adapte ce niveau de qualite a ton univers, avec un process en 4 a 6 semaines et des notifications des le brief.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/devis"
                className="inline-flex items-center rounded-full bg-white px-5 py-2 text-black transition hover:bg-neutral-200"
              >
                Demander un devis
              </Link>
              <Link
                href="/cahier-des-charges"
                className="inline-flex items-center rounded-full border border-white/30 px-5 py-2 text-white transition hover:border-white"
              >
                Cahier des charges
              </Link>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <section className="rounded-[36px] border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-8 text-white shadow-[0_30px_90px_rgba(0,0,0,0.45)]">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.35em] text-white/60">Asset grid</p>
              <h2 className="text-3xl font-semibold">Scenes exportees pour prolonger le storytelling.</h2>
              <p className="text-white/70 max-w-2xl">
                Chaque projet est livre avec ses mockups HD et ses variantes claires/sombres pour alimenter portfolio, deck
                investisseur ou onboarding. Voici les extraits lies a ce cas, que tu peux reutiliser partout.
              </p>
            </div>
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center rounded-full border border-white/25 px-5 py-2 text-sm text-white/80 transition hover:border-white hover:text-white"
            >
              Voir plus de scenes
            </Link>
          </div>
          <div className="mt-8">
            <AssetGrid assets={gridAssets} columns="dense" />
          </div>
        </section>
      </Reveal>
    </div>
  );
}

