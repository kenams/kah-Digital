import Link from "next/link";
import { InteractiveBrief } from "@/components/interactive-brief";
import type { Locale } from "@/lib/locales";
import { withLocalePrefix } from "@/lib/locales";

type BriefPageContentProps = {
  locale: Locale;
};

const copy = {
  fr: {
    backHome: "Retour à l'accueil",
    openConfigurator: "Ouvrir le configurateur",
    eyebrow: "Cahier des charges",
    title: "Tout est prêt pour cadrer ton projet.",
    body: "Télécharge le PDF pré-rempli ou remplis la version interactive ci-dessous. Tu peux ensuite partager le document avec ton équipe ou nous l'envoyer directement.",
    download: "Télécharger le PDF",
    quote: "Passer directement au devis",
    pdfHref: "/cahier-des-charges.pdf",
  },
  en: {
    backHome: "Back to home",
    openConfigurator: "Open configurator",
    eyebrow: "Project brief",
    title: "Everything is ready to frame your project.",
    body: "Download the pre-filled PDF or fill the interactive version below. Then share it with your team or send it directly to us.",
    download: "Download the PDF",
    quote: "Go straight to the quote",
    pdfHref: "/cahier-des-charges.en.pdf",
  },
  de: {
    backHome: "Zur Startseite",
    openConfigurator: "Konfigurator oeffnen",
    eyebrow: "Projektbriefing",
    title: "Alles ist bereit, um dein Projekt sauber zu strukturieren.",
    body: "Lade das vorausgefuellte PDF herunter oder nutze unten die interaktive Version. Danach kannst du das Dokument intern teilen oder direkt an uns senden.",
    download: "PDF herunterladen",
    quote: "Direkt zur Anfrage",
    pdfHref: "/cahier-des-charges.de.pdf",
  },
} as const;

export function BriefPageContent({ locale }: BriefPageContentProps) {
  const content = copy[locale];

  return (
    <div className="section-shell space-y-12">
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
      <div className="light-surface px-6 py-8 text-slate-900 sm:px-8 sm:py-12">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{content.eyebrow}</p>
        <h1 className="mt-4 text-4xl font-semibold">{content.title}</h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-700">{content.body}</p>
        <div className="mt-6 flex flex-wrap gap-4">
          <a
            href={content.pdfHref}
            target="_blank"
            rel="noreferrer"
            download
            className="inline-flex items-center rounded-full bg-slate-900 px-6 py-3 text-white transition hover:bg-slate-800"
          >
            {content.download}
          </a>
          <Link
            href={withLocalePrefix("/devis", locale)}
            className="inline-flex items-center rounded-full border border-slate-900/20 px-6 py-3 text-slate-900 transition hover:border-slate-900"
          >
            {content.quote}
          </Link>
        </div>
      </div>
      <InteractiveBrief />
    </div>
  );
}
