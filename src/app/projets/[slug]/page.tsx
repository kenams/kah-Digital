import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectSceneRender } from "@/components/project-scene";
import { Reveal } from "@/components/reveal";
import { portfolioProjects } from "@/data/portfolio";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

const liveSections = ["Le Label", "Artistes", "Sorties", "Clips", "Evenements", "Reseaux", "Contact"];
const contactRoles = ["Management", "Booking", "Presse", "Communication"];
const renderedSignals = [
  "Un univers visuel plus propre et plus serieux pour porter l'image du label.",
  "Une lecture plus directe des artistes, sorties et contenus video.",
  "Des points de contact metier separes selon le bon besoin.",
  "Une base simple a faire evoluer sans repartir de zero.",
];

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = portfolioProjects.find((item) => item.slug === slug);
  if (!project) return {};

  const ogImage = project.mockups?.primary ?? "/og-kah-digital.png";
  const title = `${project.name} | KAH-Digital`;

  return {
    title,
    description: project.shortDescription,
    alternates: {
      canonical: `/projets/${slug}`,
      languages: {
        en: `/en/projets/${slug}`,
      },
    },
    openGraph: {
      type: "article",
      url: `/projets/${slug}`,
      title,
      description: project.shortDescription,
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
      description: project.shortDescription,
      images: [ogImage],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = portfolioProjects.find((item) => item.slug === slug);

  if (!project) {
    return notFound();
  }

  const screens = project.mockups?.gallery ?? (project.mockups?.primary ? [project.mockups.primary] : []);

  return (
    <div className="space-y-16 sm:space-y-20">
      <section className="bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.12),transparent_35%),linear-gradient(180deg,#08111f_0%,#04070d_100%)] py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 text-sm text-white/70">
            <Link
              href="/projets"
              className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white"
            >
              Retour aux projets
            </Link>
            <Link
              href="/"
              className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white"
            >
              Accueil
            </Link>
            {project.website && (
              <a
                href={project.website}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white"
              >
                Voir le site live
              </a>
            )}
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-white/55">{project.type}</p>
              <h1 className="mt-3 text-4xl font-bold sm:text-5xl">{project.name}</h1>
              <p className="mt-5 max-w-3xl text-lg text-white/75">{project.tagline}</p>
              <p className="mt-5 max-w-3xl text-base text-white/70">{project.description}</p>
              <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/70">
                <span className="rounded-full border border-white/25 px-4 py-2">Timeline : {project.timeline}</span>
                <span className="rounded-full border border-white/25 px-4 py-2">Resultat : {project.result}</span>
              </div>
            </div>
            <ProjectSceneRender project={project} variant="hero" />
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <Reveal>
              <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-8 shadow-sm">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Lecture du site live</p>
                <h2 className="mt-3 text-3xl font-bold text-slate-950">Ce que le site montre reellement aujourd'hui.</h2>
                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  {liveSections.map((item) => (
                    <div key={item} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-8 shadow-sm">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Contacts metier</p>
                <h2 className="mt-3 text-3xl font-bold text-slate-950">Des points d'entree clairs selon le besoin.</h2>
                <div className="mt-6 space-y-3">
                  {contactRoles.map((item) => (
                    <div key={item} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-slate-100 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {project.metrics.map((metric) => (
              <Reveal key={metric.label}>
                <div className="rounded-3xl bg-white p-6 text-center shadow-[0_18px_50px_rgba(15,23,42,0.08)] ring-1 ring-slate-200">
                  <p className="text-3xl font-semibold text-slate-950">{metric.value}</p>
                  <p className="mt-2 text-sm uppercase tracking-[0.3em] text-slate-500">{metric.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-8 shadow-sm">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Challenge</p>
                <h2 className="mt-3 text-3xl font-bold text-slate-950">Le vrai besoin derriere le projet.</h2>
                <p className="mt-5 text-slate-700">{project.challenge}</p>
                <p className="mt-6 text-sm uppercase tracking-[0.3em] text-slate-500">Solution</p>
                <p className="mt-3 text-slate-700">{project.solution}</p>
              </div>
            </Reveal>

            <Reveal>
              <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-8 shadow-sm">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Rendu obtenu</p>
                <h2 className="mt-3 text-3xl font-bold text-slate-950">Ce que cette version apporte concretement.</h2>
                <ul className="mt-6 space-y-4 text-slate-700">
                  {renderedSignals.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-slate-900" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.12),transparent_35%),linear-gradient(180deg,#08111f_0%,#04070d_100%)] py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-white/60">Visuels</p>
              <h2 className="text-3xl font-semibold">Rendu livre pour porter le projet.</h2>
            </div>
            <div className="text-sm text-white/60">{project.stack.join(" / ")}</div>
          </div>
          <div className={`grid gap-4 ${screens.length > 1 ? "md:grid-cols-2" : ""}`}>
            {screens.map((src, index) => (
              <div key={`${src}-${index}`} className="overflow-hidden rounded-3xl border border-white/10 bg-black/40">
                <Image
                  src={src}
                  alt={`${project.name} visuel ${index + 1}`}
                  width={1200}
                  height={900}
                  sizes="(min-width: 1024px) 520px, 90vw"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-100 py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="rounded-[32px] bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] ring-1 ring-slate-200">
              <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Suite logique</p>
                  <h2 className="mt-3 text-3xl font-bold text-slate-950">Besoin d'un site dans ce niveau de rendu ?</h2>
                  <p className="mt-4 text-lg text-slate-600">
                    KAH-Digital peut cadrer, designer et livrer une base propre pour un label, une marque ou un projet qui
                    doit mieux presenter son univers, ses contenus et ses contacts.
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <Link
                    href="/devis"
                    className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
                  >
                    Demander un devis
                  </Link>
                  {project.website && (
                    <a
                      href={project.website}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-900 transition-colors hover:border-slate-950 hover:bg-slate-950 hover:text-white"
                    >
                      Voir le site live
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
