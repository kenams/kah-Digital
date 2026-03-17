import type { Metadata } from "next";
import Link from "next/link";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { portfolioProjectsEn } from "@/data/portfolio.en";

export const metadata: Metadata = {
  title: "Projects",
  description: "Websites, applications, and support solutions delivered by KAH-Digital from Switzerland.",
  alternates: {
    canonical: "/en/projets",
    languages: {
      fr: "/projets",
    },
  },
  openGraph: {
    type: "website",
    title: "Projects | KAH-Digital",
    description: "Websites, applications, and support solutions delivered by KAH-Digital from Switzerland.",
    url: "/en/projets",
    images: [
      {
        url: "/og-kah-digital.png",
        width: 1200,
        height: 630,
        alt: "KAH-Digital projects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | KAH-Digital",
    description: "Websites, applications, and support solutions delivered by KAH-Digital from Switzerland.",
    images: ["/og-kah-digital.png"],
  },
};

export default function ProjectsPageEn() {
  const visibleProjects = portfolioProjectsEn.filter((project) => project.slug === "kah-prod");

  return (
    <div className="space-y-16 sm:space-y-20">
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Projects</p>
              <h1 className="mt-3 text-4xl font-bold text-slate-950 sm:text-5xl">
                A cleaner project page, aligned with the rest of the site.
              </h1>
              <p className="mt-5 max-w-3xl text-lg text-slate-600">
                Showcase websites, web apps, mobile MVPs, and SMB support tools: this page now presents case studies in a
                clearer way, closer to how the rest of the public site works.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/en/devis"
                  className="inline-flex items-center rounded-full bg-slate-950 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  Request a quote
                </Link>
                <Link
                  href="/en/services"
                  className="inline-flex items-center rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-900 transition-colors hover:border-slate-950 hover:bg-slate-950 hover:text-white"
                >
                  See services
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Websites</p>
                <p className="mt-2 text-2xl font-semibold text-slate-950">Showcase</p>
                <p className="mt-2 text-sm text-slate-600">Positioning, service pages, local SEO, and conversion logic.</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Applications</p>
                <p className="mt-2 text-2xl font-semibold text-slate-950">Web / mobile</p>
                <p className="mt-2 text-sm text-slate-600">Portals, internal tools, MVPs, and cleaner user journeys.</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">SMB support</p>
                <p className="mt-2 text-2xl font-semibold text-slate-950">AI + GLPI</p>
                <p className="mt-2 text-sm text-slate-600">Support assistant, knowledge base, and proper ticket escalation.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.12),transparent_35%),linear-gradient(180deg,#08111f_0%,#04070d_100%)] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="text-white">
              <p className="text-sm uppercase tracking-[0.3em] text-white/55">Case studies</p>
              <h2 className="mt-3 text-3xl font-bold">The single featured project on this version of the site.</h2>
              <p className="mt-3 max-w-3xl text-white/70">
                This page now highlights only KAH Prod to keep the portfolio simple and focused.
              </p>
            </div>
            <Link
              href="/en/contact"
              className="inline-flex items-center rounded-full border border-white/20 px-5 py-2 font-semibold text-white/80 transition-colors hover:border-white hover:text-white"
            >
              Talk about your project
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
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Next step</p>
                  <h2 className="mt-3 text-3xl font-bold text-slate-950">You have seen the references. The useful next move is the scoping step.</h2>
                  <p className="mt-4 text-lg text-slate-600">
                    If you need a website redesign, a structured application, or a clearer SMB support workflow, the fastest
                    way forward is a scoped brief and a proper quote.
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <Link
                    href="/en/devis"
                    className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
                  >
                    Request a quote
                  </Link>
                  <Link
                    href="/en/cahier-des-charges"
                    className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-900 transition-colors hover:border-slate-950 hover:bg-slate-950 hover:text-white"
                  >
                    Open the brief
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
