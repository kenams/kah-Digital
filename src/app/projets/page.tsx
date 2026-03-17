import type { Metadata } from "next";
import Link from "next/link";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { portfolioProjects } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Projets",
  description: "Sites web, applications et solutions support livres par KAH-Digital depuis la Suisse.",
  alternates: {
    canonical: "/projets",
    languages: {
      en: "/en/projets",
    },
  },
  openGraph: {
    type: "website",
    title: "Projets | KAH-Digital",
    description: "Sites web, applications et solutions support livres par KAH-Digital depuis la Suisse.",
    url: "/projets",
    images: [
      {
        url: "/og-kah-digital.png",
        width: 1200,
        height: 630,
        alt: "KAH-Digital projets",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projets | KAH-Digital",
    description: "Sites web, applications et solutions support livres par KAH-Digital depuis la Suisse.",
    images: ["/og-kah-digital.png"],
  },
};

export default function ProjectsPage() {
  const visibleProjects = portfolioProjects.filter((project) => project.slug === "kah-prod");

  return (
    <div className="space-y-16 sm:space-y-20">
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Projets</p>
              <h1 className="mt-3 text-4xl font-bold text-slate-950 sm:text-5xl">
                KAH Prod, l'un des projets portes par KAH-Digital.
              </h1>
              <p className="mt-5 max-w-3xl text-lg text-slate-600">
                Cette page met en avant KAH Prod comme reference officielle sur cette version du site, avec une presentation
                plus claire et plus coherente avec le reste de l'univers KAH-Digital.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/devis"
                  className="inline-flex items-center rounded-full bg-slate-950 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  Demander un devis
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-900 transition-colors hover:border-slate-950 hover:bg-slate-950 hover:text-white"
                >
                  Voir les services
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Sites web</p>
                <p className="mt-2 text-2xl font-semibold text-slate-950">Vitrine</p>
                <p className="mt-2 text-sm text-slate-600">Positionnement, pages services, SEO local et conversion.</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Applications</p>
                <p className="mt-2 text-2xl font-semibold text-slate-950">Web / mobile</p>
                <p className="mt-2 text-sm text-slate-600">Portails, outils metier, MVP et parcours utilisateurs plus clairs.</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Support PME</p>
                <p className="mt-2 text-2xl font-semibold text-slate-950">IA + GLPI</p>
                <p className="mt-2 text-sm text-slate-600">Assistant support, knowledge base et escalation ticket propre.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.12),transparent_35%),linear-gradient(180deg,#08111f_0%,#04070d_100%)] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="text-white">
              <p className="text-sm uppercase tracking-[0.3em] text-white/55">Etudes de cas</p>
              <h2 className="mt-3 text-3xl font-bold">KAH Prod, une realisation KAH-Digital pour un univers musique et production.</h2>
              <p className="mt-3 max-w-3xl text-white/70">
                Une reference claire pour montrer le niveau de direction, de structure et de rendu que KAH-Digital peut produire.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full border border-white/20 px-5 py-2 font-semibold text-white/80 transition-colors hover:border-white hover:text-white"
            >
              Parler de votre projet
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {visibleProjects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
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
                  <h2 className="mt-3 text-3xl font-bold text-slate-950">Vous avez vu les references. Le plus utile maintenant, c'est le cadrage.</h2>
                  <p className="mt-4 text-lg text-slate-600">
                    Si vous avez un site a refaire, une application a structurer ou une logique support PME a clarifier,
                    le plus rapide est de partir sur un brief simple et un devis cadre.
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <Link
                    href="/devis"
                    className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
                  >
                    Demander un devis
                  </Link>
                  <Link
                    href="/cahier-des-charges"
                    className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-900 transition-colors hover:border-slate-950 hover:bg-slate-950 hover:text-white"
                  >
                    Ouvrir le cahier des charges
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
