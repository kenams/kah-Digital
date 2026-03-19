import type { Metadata } from "next";
import Link from "next/link";
import { ContactCard } from "@/components/contact-card";
import { ProjectSpotlight } from "@/components/project-spotlight";
import { portfolioProjectsDe } from "@/data/portfolio.de";

export const metadata: Metadata = {
  title: "Websites, Apps und digitale Loesungen",
  description: "KAH-Digital entwickelt Websites, Anwendungen und digitale Loesungen fuer Unternehmen in der Schweiz und international.",
  alternates: {
    canonical: "/de",
    languages: {
      fr: "/",
      en: "/en",
    },
  },
};

const services = [
  {
    title: "Unternehmenswebsites",
    body: "Klar strukturierte Websites fuer Positionierung, Angebote, Kontakt und Sichtbarkeit.",
    href: "/de/services/site-web",
  },
  {
    title: "Web- und Mobile-Apps",
    body: "Portale, interne Tools, MVPs und Anwendungen fuer Teams, Kunden und Prozesse.",
    href: "/de/services/applications",
  },
  {
    title: "Support-Workflow mit GLPI",
    body: "Virtuelle Hilfe, gefuehrte Anfragen und saubere Ticket-Uebergabe an GLPI.",
    href: "/de/services/glpi",
  },
];

export default function HomePageDe() {
  const featuredProject = portfolioProjectsDe[0];

  return (
    <div className="space-y-16 sm:space-y-20">
      <section className="bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.14),transparent_30%),linear-gradient(180deg,#07111f_0%,#05080f_100%)] py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-white/60">KAH-Digital</p>
              <h1 className="mt-4 text-4xl font-bold sm:text-5xl">Websites, Apps und digitale Loesungen fuer Unternehmen.</h1>
              <p className="mt-5 max-w-3xl text-lg text-white/72">
                Aus Lausanne entwickelt KAH-Digital klare Websites, nuetzliche Anwendungen und strukturierte digitale Ablaufe
                fuer Unternehmen in der Schweiz und weit darueber hinaus.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/de/devis" className="rounded-full bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-slate-100">
                  Projekt anfragen
                </Link>
                <Link
                  href="/de/services"
                  className="rounded-full border border-white/20 px-6 py-3 font-semibold text-white/85 transition hover:border-white hover:text-white"
                >
                  Leistungen ansehen
                </Link>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-white/55">Standort</p>
                <p className="mt-2 text-2xl font-semibold text-white">Lausanne</p>
                <p className="mt-2 text-sm text-white/70">Schweizer Basis mit offenem internationalen Fokus.</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-white/55">Tempo</p>
                <p className="mt-2 text-2xl font-semibold text-white">4-6 Wochen</p>
                <p className="mt-2 text-sm text-white/70">Straffe Umsetzung ohne unnoetige Abstimmungsschleifen.</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-white/55">Fokus</p>
                <p className="mt-2 text-2xl font-semibold text-white">B2B</p>
                <p className="mt-2 text-sm text-white/70">Websites, Anwendungen und digitale Support-Loesungen.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Leistungen</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-950">Drei klare Leistungsfelder.</h2>
            <p className="mt-4 text-lg text-slate-600">
              Kein Agenturtheater. Nur Leistungen, die Unternehmen wirklich weiterbringen.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <div key={service.title} className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-2xl font-semibold text-slate-950">{service.title}</h3>
                <p className="mt-3 text-slate-600">{service.body}</p>
                <Link href={service.href} className="mt-5 inline-flex text-sm font-semibold text-sky-600 hover:text-sky-700">
                  Mehr erfahren
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.12),transparent_35%),linear-gradient(180deg,#08111f_0%,#04070d_100%)] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="text-white">
              <p className="text-sm uppercase tracking-[0.3em] text-white/55">Referenz</p>
              <h2 className="mt-3 text-3xl font-bold">Ein reales Projekt, sichtbar und sauber praesentiert.</h2>
              <p className="mt-3 max-w-3xl text-white/70">
                KAH Prod zeigt, wie KAH-Digital ein Markenuniversum in eine klare, visuell starke Website uebersetzt.
              </p>
            </div>
            <Link
              href="/de/projets"
              className="inline-flex items-center rounded-full border border-white/20 px-5 py-2 font-semibold text-white/80 transition hover:border-white hover:text-white"
            >
              Projektdetails ansehen
            </Link>
          </div>
          <ProjectSpotlight project={featuredProject} locale="de" />
        </div>
      </section>

      <section className="bg-slate-100 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_0.8fr] lg:px-8">
          <div className="rounded-[32px] bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] ring-1 ring-slate-200">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Naechster Schritt</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-950">Ein klares Briefing spart am meisten Zeit.</h2>
            <p className="mt-4 text-lg text-slate-600">
              Wenn du eine Website, eine App oder einen besseren Support-Workflow aufsetzen willst, starten wir mit einer
              einfachen Anfrage und einem klaren Angebotsrahmen.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/de/devis" className="rounded-full bg-slate-950 px-6 py-3 font-semibold text-white transition hover:bg-sky-700">
                Projekt anfragen
              </Link>
              <Link
                href="/de/contact"
                className="rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-900 transition hover:border-slate-950 hover:bg-slate-950 hover:text-white"
              >
                Direkt Kontakt aufnehmen
              </Link>
            </div>
          </div>
          <ContactCard title="Direkter Kontakt" />
        </div>
      </section>
    </div>
  );
}
