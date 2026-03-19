import type { Metadata } from "next";
import Link from "next/link";
import { ProjectSpotlight } from "@/components/project-spotlight";
import { Reveal } from "@/components/reveal";
import { portfolioProjectsDe } from "@/data/portfolio.de";

export const metadata: Metadata = {
  title: "Projekte",
  description: "Ausgewaehlte KAH-Digital Referenz mit Fokus auf Struktur, Bildsprache und klares digitales Rendering.",
  alternates: {
    canonical: "/de/projets",
    languages: {
      fr: "/projets",
      en: "/en/projets",
    },
  },
};

export default function ProjectsPageDe() {
  const visibleProjects = portfolioProjectsDe.filter((project) => project.slug === "kah-prod");

  return (
    <div className="space-y-16 sm:space-y-20">
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Projekte</p>
              <h1 className="mt-3 text-4xl font-bold text-slate-950 sm:text-5xl">
                KAH Prod ist eines der von KAH-Digital entwickelten Projekte.
              </h1>
              <p className="mt-5 max-w-3xl text-lg text-slate-600">
                Hier steht KAH Prod als sichtbare Referenz im Fokus - nicht als einfache Projektkarte, sondern als sauber
                praesentierte Case Study mit klarer visueller Qualitaet.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/de/devis"
                  className="inline-flex items-center rounded-full bg-slate-950 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  Projekt anfragen
                </Link>
                <Link
                  href="/de/services"
                  className="inline-flex items-center rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-900 transition-colors hover:border-slate-950 hover:bg-slate-950 hover:text-white"
                >
                  Leistungen ansehen
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Websites</p>
                <p className="mt-2 text-2xl font-semibold text-slate-950">Showcase</p>
                <p className="mt-2 text-sm text-slate-600">Positionierung, Seitenstruktur, lokales SEO und Conversion.</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Anwendungen</p>
                <p className="mt-2 text-2xl font-semibold text-slate-950">Web / Mobile</p>
                <p className="mt-2 text-sm text-slate-600">Portale, interne Tools, MVPs und klarere Nutzerwege.</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Support</p>
                <p className="mt-2 text-2xl font-semibold text-slate-950">GLPI Workflow</p>
                <p className="mt-2 text-sm text-slate-600">Virtuelle Hilfe, Wissensbasis und saubere Ticket-Eskalation.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.12),transparent_35%),linear-gradient(180deg,#08111f_0%,#04070d_100%)] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="text-white">
              <p className="text-sm uppercase tracking-[0.3em] text-white/55">Case Study</p>
              <h2 className="mt-3 text-3xl font-bold">Eine staerkere und visuellere Referenz im KAH-Digital Standard.</h2>
              <p className="mt-3 max-w-3xl text-white/70">
                KAH Prod zeigt, wie KAH-Digital ein Markenuniversum in eine hochwertige, klar gefuehrte Website uebersetzt.
              </p>
            </div>
            <Link
              href="/de/contact"
              className="inline-flex items-center rounded-full border border-white/20 px-5 py-2 font-semibold text-white/80 transition-colors hover:border-white hover:text-white"
            >
              Ueber dein Projekt sprechen
            </Link>
          </div>

          {visibleProjects.map((project) => (
            <ProjectSpotlight key={project.slug} project={project} locale="de" />
          ))}
        </div>
      </section>

      <section className="bg-slate-100 py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="rounded-[32px] bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] ring-1 ring-slate-200">
              <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Naechster Schritt</p>
                  <h2 className="mt-3 text-3xl font-bold text-slate-950">
                    Referenz gesehen. Der sinnvolle naechste Schritt ist ein klares Briefing.
                  </h2>
                  <p className="mt-4 text-lg text-slate-600">
                    Wenn du eine neue Website, eine strukturierte Anwendung oder einen klareren digitalen Workflow brauchst,
                    starten wir mit einem sauberen Scope und einem passenden Angebotsrahmen.
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <Link
                    href="/de/devis"
                    className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
                  >
                    Projekt anfragen
                  </Link>
                  <Link
                    href="/de/contact"
                    className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-900 transition-colors hover:border-slate-950 hover:bg-slate-950 hover:text-white"
                  >
                    Direkt Kontakt aufnehmen
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
