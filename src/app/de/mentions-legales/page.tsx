import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Rechtliche Informationen zu KAH-Digital und zur Herausgabe der Website.",
};

export default function MentionsLegalesPageDe() {
  return (
    <div className="section-shell space-y-8">
      <div className="flex flex-wrap gap-3 text-sm text-white/70">
        <Link href="/de" className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white">
          Zur Startseite
        </Link>
        <Link
          href="/de/devis"
          className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white"
        >
          Projekt anfragen
        </Link>
      </div>

      <div className="light-surface px-6 py-8 sm:px-8 sm:py-12">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Impressum</p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-900">Rechtliche Informationen</h1>
        <div className="mt-6 grid gap-8 text-sm text-slate-700 md:grid-cols-2">
          <div className="space-y-3">
            <p>
              <strong>Markenname:</strong> KAH-Digital
            </p>
            <p>
              <strong>Herausgeber:</strong> KAH-Digital
            </p>
            <p>
              <strong>E-Mail:</strong> kahdigital42@gmail.com
            </p>
            <p>
              <strong>Telefon:</strong> +33 7 59 55 84 14
            </p>
          </div>
          <div className="space-y-3">
            <p>
              <strong>Sitz:</strong> Rue du Simplon 4, 1006 Lausanne, Switzerland
            </p>
            <p>
              <strong>Hosting:</strong> Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="light-outline p-6">
          <h2 className="text-xl font-semibold text-slate-900">Urheberrecht</h2>
          <p className="mt-4 text-slate-700">
            Inhalte, Texte, Visuals, Markenbestandteile und Code bleiben Eigentum von KAH-Digital oder der jeweiligen
            Rechteinhaber. Jede Wiederverwendung braucht eine vorherige schriftliche Freigabe.
          </p>
        </div>
        <div className="light-outline p-6">
          <h2 className="text-xl font-semibold text-slate-900">Haftung</h2>
          <p className="mt-4 text-slate-700">
            KAH-Digital bemueht sich um korrekte Informationen, uebernimmt jedoch keine Haftung fuer Fehler, Ausfaelle oder
            Inhalte externer Websites.
          </p>
        </div>
      </div>
    </div>
  );
}
