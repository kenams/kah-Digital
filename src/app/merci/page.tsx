import type { Metadata } from "next";
import Link from "next/link";
import { brandContact } from "@/config/brand";

export const metadata: Metadata = {
  title: "Merci",
  robots: { index: false, follow: false },
};

export default function MerciPage() {
  return (
    <div className="section-shell">
      <div className="light-surface p-10 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Merci</p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-900">Demande envoyee.</h1>
        <p className="mt-4 text-lg text-slate-700">
          On revient vers toi rapidement avec un devis clair, des reco et un planning.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm">
          <Link
            href="/"
            className="rounded-full border border-slate-300 px-5 py-2 text-slate-800 transition hover:border-slate-500"
          >
            Retour accueil
          </Link>
          <Link
            href={`mailto:${brandContact.email}`}
            className="rounded-full bg-black px-5 py-2 font-semibold text-white transition hover:bg-slate-800"
          >
            Ecrire un email
          </Link>
          <Link
            href={`tel:${brandContact.phoneHref}`}
            className="rounded-full border border-slate-300 px-5 py-2 text-slate-800 transition hover:border-slate-500"
          >
            Appeler
          </Link>
          {brandContact.calendlyUrl && (
            <Link
              href={brandContact.calendlyUrl}
              className="rounded-full bg-slate-900 px-5 py-2 font-semibold text-white transition hover:bg-slate-800"
            >
              Planifier un appel
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
