import Link from "next/link";
import { InteractiveBrief } from "@/components/interactive-brief";
import type { Locale } from "@/lib/locales";
import { withLocalePrefix } from "@/lib/locales";

type BriefPageContentProps = {
  locale: Locale;
};

const copy = {
  fr: {
    backHome: "Retour a l'accueil",
    openConfigurator: "Ouvrir le configurateur",
    eyebrow: "Cahier des charges",
    title: "Un brief plus propre pour cadrer le projet avant de parler execution.",
    body:
      "Cette page sert a poser les vraies bases: contexte, objectifs, perimetre, contraintes et priorites. Tu peux telecharger le PDF ou remplir la version interactive plus bas.",
    download: "Telecharger le PDF",
    quote: "Passer directement au devis",
    markers: [
      { label: "Usage", value: "Structurer le besoin avant le budget detaille" },
      { label: "Format", value: "PDF partageable + version interactive" },
      { label: "Resultat", value: "Un cadrage plus exploitable pour l'equipe et pour nous" },
    ],
    pdfHref: "/cahier-des-charges.pdf",
  },
  en: {
    backHome: "Back to home",
    openConfigurator: "Open configurator",
    eyebrow: "Project brief",
    title: "A cleaner brief to frame the project before discussing execution.",
    body:
      "This page is here to capture the real baseline first: context, goals, scope, constraints, and priorities. You can download the PDF or fill the interactive version below.",
    download: "Download the PDF",
    quote: "Go straight to the quote",
    markers: [
      { label: "Use", value: "Structure the need before detailed pricing" },
      { label: "Format", value: "Shareable PDF + interactive version" },
      { label: "Result", value: "A brief that is more actionable internally and commercially" },
    ],
    pdfHref: "/cahier-des-charges.en.pdf",
  },
  de: {
    backHome: "Zur Startseite",
    openConfigurator: "Konfigurator oeffnen",
    eyebrow: "Projektbriefing",
    title: "Ein saubereres Briefing, um das Projekt vor der Umsetzung klar zu rahmen.",
    body:
      "Diese Seite sammelt zuerst die echte Grundlage: Kontext, Ziele, Umfang, Constraints und Prioritaeten. Du kannst das PDF herunterladen oder die interaktive Version weiter unten ausfuellen.",
    download: "PDF herunterladen",
    quote: "Direkt zur Anfrage",
    markers: [
      { label: "Nutzen", value: "Bedarf sauber strukturieren, bevor es um Detailbudget geht" },
      { label: "Format", value: "Teilbares PDF + interaktive Version" },
      { label: "Ergebnis", value: "Ein verwertbareres Briefing fuer Team und Scoping" },
    ],
    pdfHref: "/cahier-des-charges.de.pdf",
  },
} as const;

export function BriefPageContent({ locale }: BriefPageContentProps) {
  const content = copy[locale];

  return (
    <>
      <section className="section-shell pt-8 sm:pt-10 lg:pt-12">
        <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[linear-gradient(135deg,rgba(9,8,7,0.96),rgba(18,14,28,0.96))] p-6 shadow-[0_40px_140px_rgba(0,0,0,0.45)] sm:p-8 lg:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(214,179,106,0.16),transparent_30%),radial-gradient(circle_at_82%_20%,rgba(127,184,199,0.14),transparent_24%)]" />
          <div className="relative grid gap-8 lg:grid-cols-[1.05fr,0.95fr] lg:items-end">
            <div className="text-white">
              <div className="flex flex-wrap gap-3 text-sm text-white/70">
                <Link
                  href={withLocalePrefix("/", locale)}
                  className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white"
                >
                  {content.backHome}
                </Link>
                <Link
                  href={withLocalePrefix("/configurateur", locale)}
                  className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white"
                >
                  {content.openConfigurator}
                </Link>
              </div>
              <p className="mt-6 text-sm uppercase tracking-[0.35em] text-white/52">{content.eyebrow}</p>
              <h1 className="mt-5 max-w-4xl text-4xl font-semibold sm:text-5xl lg:text-6xl">{content.title}</h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-white/72 sm:text-lg">{content.body}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={content.pdfHref}
                  target="_blank"
                  rel="noreferrer"
                  download
                  className="inline-flex items-center rounded-full bg-white px-6 py-3 font-semibold text-black transition hover:bg-neutral-200"
                >
                  {content.download}
                </a>
                <Link
                  href={withLocalePrefix("/devis", locale)}
                  className="inline-flex items-center rounded-full border border-white/30 px-6 py-3 text-white/82 transition hover:border-white hover:bg-white/5 hover:text-white"
                >
                  {content.quote}
                </Link>
              </div>
            </div>
            <div className="grid gap-3">
              {content.markers.map((item, index) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-black/25 px-4 py-4 text-white/78">
                  <p className="text-[0.68rem] uppercase tracking-[0.28em] text-white/42">
                    0{index + 1} / {item.label}
                  </p>
                  <p className="mt-3 text-sm leading-7">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <InteractiveBrief />
      </section>
    </>
  );
}
