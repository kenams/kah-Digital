import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { ProjectSceneRender } from "@/components/project-scene";
import { AssetGrid } from "@/components/asset-grid";
import { assetShotsEn } from "@/data/asset-shots";
import { portfolioProjectsEn } from "@/data/portfolio.en";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return portfolioProjectsEn.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = portfolioProjectsEn.find((item) => item.slug === slug);
  if (!project) return {};
  const ogImage = project.mockups?.primary ?? "/og-kah-digital.png";
  const title = `${project.name} | Kah-Digital`;
  const description = project.shortDescription;
  return {
    title,
    description,
    alternates: {
      canonical: `/en/projets/${slug}`,
      languages: {
        fr: `/projets/${slug}`,
      },
    },
    openGraph: {
      type: "article",
      url: `/en/projets/${slug}`,
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 900,
          alt: `${project.name} mockup`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function ProjectPageEn({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = portfolioProjectsEn.find((item) => item.slug === slug);
  if (!project) {
    return notFound();
  }
  const relatedAssets = assetShotsEn.filter((asset) => asset.cta.href.includes(`/en/projets/${project.slug}`));
  const gridAssets = relatedAssets.length > 0 ? relatedAssets : assetShotsEn.slice(0, 3);
  const screens = project.mockups?.gallery ?? (project.mockups?.primary ? [project.mockups.primary] : []);

  return (
    <div className="section-shell space-y-10">
      <div className="flex flex-wrap gap-3 text-sm text-white/70">
        <Link
          href="/en/projets"
          className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white"
        >
          Back to projects
        </Link>
        <Link
          href="/en"
          className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white"
        >
          Home
        </Link>
      </div>
      <Reveal>
        <div
          className="premium-card relative overflow-hidden rounded-[40px] p-8 text-white"
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
              <span className="rounded-full border border-white/30 px-3 py-1">Timeline: {project.timeline}</span>
              <span className="rounded-full border border-white/30 px-3 py-1">Result: {project.result}</span>
            </div>
            <div className="mt-6">
              <ProjectSceneRender project={project} variant="hero" />
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div className="premium-card grid gap-6 rounded-[32px] border border-white/10 bg-white/5 p-8 md:grid-cols-[2fr,1fr]">
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
              <div className="premium-card rounded-3xl border border-white/10 bg-white/5 p-6 text-center">
                <p className="text-3xl font-semibold text-white">{metric.value}</p>
                <p className="text-sm uppercase tracking-[0.3em] text-white/60">{metric.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Reveal>

      <Reveal>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="premium-card rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">Before</p>
            <p className="mt-3 text-white/80">{project.challenge}</p>
          </div>
          <div className="premium-card rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">After</p>
            <p className="mt-3 text-white/80">{project.solution}</p>
          </div>
          <div className="premium-card rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">Outcome</p>
            <p className="mt-3 text-white/80">{project.result}</p>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="premium-card rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">Highlights</p>
            <ul className="mt-4 space-y-3 text-white/75">
              {project.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-white/60" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="premium-card rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">What is next</p>
            <p className="mt-4 text-white/70">
              Need a site with the same energy? We adapt this level of quality to your universe with a 4 to 6 week process
              and notifications from the first brief.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/en/devis"
                className="inline-flex items-center rounded-full bg-white px-5 py-2 text-black transition hover:bg-neutral-200"
              >
                Request a quote
              </Link>
              <Link
                href="/en/cahier-des-charges"
                className="inline-flex items-center rounded-full border border-white/30 px-5 py-2 text-white transition hover:border-white"
              >
                Project brief
              </Link>
            </div>
          </div>
        </div>
      </Reveal>

      {screens.length > 0 && (
        <Reveal>
          <section className="premium-card rounded-[36px] border border-white/10 bg-white/5 p-8 text-white">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-white/60">Screens</p>
                <h2 className="text-3xl font-semibold">Key visuals delivered for this project.</h2>
                <p className="mt-2 max-w-2xl text-white/70">
                  Clean, shareable screens ready for decks, press kits, and sales touchpoints.
                </p>
              </div>
              <Link
                href="/en/devis"
                className="inline-flex items-center justify-center rounded-full border border-white/25 px-5 py-2 text-sm text-white/80 transition hover:border-white hover:text-white"
              >
                Request a quote
              </Link>
            </div>
            <div className={`mt-6 grid gap-4 ${screens.length > 1 ? "md:grid-cols-2" : ""}`}>
              {screens.map((src, index) => (
                <div key={`${src}-${index}`} className="premium-card overflow-hidden rounded-3xl border border-white/10 bg-black/40">
                  <Image
                    src={src}
                    alt={`${project.name} visual ${index + 1}`}
                    width={1200}
                    height={900}
                    sizes="(min-width: 1024px) 520px, 90vw"
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </section>
        </Reveal>
      )}

      <Reveal>
        <section className="premium-card rounded-[36px] border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-8 text-white shadow-[0_30px_90px_rgba(0,0,0,0.45)]">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.35em] text-white/60">Asset grid</p>
              <h2 className="text-3xl font-semibold">Exported scenes to extend the story.</h2>
              <p className="text-white/70 max-w-2xl">
                Each project ships with HD mockups and light/dark variants to feed portfolios, investor decks, or onboarding.
                Here are the excerpts tied to this case, ready to reuse anywhere.
              </p>
            </div>
            <Link
              href="/en/projets"
              className="inline-flex items-center justify-center rounded-full border border-white/25 px-5 py-2 text-sm text-white/80 transition hover:border-white hover:text-white"
            >
              See more scenes
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
