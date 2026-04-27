import { DownloadableQuoteGenerator } from "@/components/downloadable-quote-generator";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata = buildPageMetadata({
  locale: "de",
  path: "/devis/generateur",
  title: "PDF-Angebotsgenerator | KAH-Digital",
  description:
    "Erstelle direkt auf der Website ein KAH-Digital-Angebot mit Kundendaten, Leistungspositionen und herunterladbarem PDF.",
  keywords: ["PDF Angebotsgenerator", "herunterladbares Angebot", "Kundenangebot", "KAH-Digital"],
});

export default function QuoteGeneratorPage() {
  return (
    <main className="bg-slate-50">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(46,168,255,0.22),transparent_34%),linear-gradient(135deg,#020617_0%,#08111f_55%,#111827_100%)] py-16 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-300">Downloadbares Angebot</p>
          <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(280px,0.45fr)] lg:items-end">
            <div>
              <h1 className="max-w-4xl text-4xl font-black tracking-tight sm:text-5xl">
                Erstelle ein PDF-Angebot fuer Kunden.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
                Fuellen Sie die Kundendaten aus, passen Sie die Leistungen an, pruefen Sie den Gesamtbetrag und laden
                Sie das finale KAH-Digital-Dokument herunter.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/8 p-5 text-sm text-white/75 shadow-[0_24px_70px_rgba(0,0,0,0.24)] backdrop-blur">
              <p className="font-semibold text-white">Einfacher Ablauf</p>
              <p className="mt-3 leading-6">
                Kundendaten, Leistungspositionen, Zahlungsmodalitaeten und PDF-Download mit einem Klick.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <DownloadableQuoteGenerator />
        </div>
      </section>
    </main>
  );
}
