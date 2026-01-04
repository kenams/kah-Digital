import type { Metadata } from "next";
import Link from "next/link";
import { InteractiveBrief } from "@/components/interactive-brief";

export const metadata: Metadata = {
  title: "Cahier des charges",
  description: "Brief interactif et export PDF pour cadrer un projet digital.",
};

export default function CahierDesChargesPage() {
  return (
    <div className="section-shell space-y-12">
      <div className="flex flex-wrap gap-3 text-sm text-white/70">
        <Link
          href="/"
          className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white"
        >
          Retour a l&apos;accueil
        </Link>
        <Link
          href="/configurateur"
          className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white"
        >
          Ouvrir le configurateur
        </Link>
      </div>
      <div className="light-surface px-6 py-8 sm:px-8 sm:py-12 text-slate-900">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Cahier des charges</p>
        <h1 className="mt-4 text-4xl font-semibold">Tout est pret pour cadrer ton projet.</h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-700">
          Telecharge le PDF pre-rempli ou remplis la version interactive ci-dessous. Tu peux ensuite partager le
          document avec ton equipe ou nous l&apos;envoyer directement.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <a
            href="/cahier-des-charges.pdf"
            target="_blank"
            rel="noreferrer"
            download
            className="inline-flex items-center rounded-full bg-slate-900 px-6 py-3 text-white transition hover:bg-slate-800"
          >
            Telecharger le PDF
          </a>
          <Link
            href="/devis"
            className="inline-flex items-center rounded-full border border-slate-900/20 px-6 py-3 text-slate-900 transition hover:border-slate-900"
          >
            Passer directement au devis
          </Link>
        </div>
      </div>
      <InteractiveBrief />
    </div>
  );
}
