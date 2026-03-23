import type { Metadata } from "next";
import Link from "next/link";
import { brandContact } from "@/config/brand";

export const metadata: Metadata = {
  title: "Danke",
  robots: { index: false, follow: false },
};

export default function MerciPageDe() {
  return (
    <div className="section-shell">
      <div className="light-surface p-10 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Danke</p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-900">Anfrage erfolgreich gesendet.</h1>
        <p className="mt-4 text-lg text-slate-700">
          Wir melden uns zeitnah mit einem klaren Rahmen, Empfehlungen und einem realistischen Timing.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm">
          <Link
            href="/de"
            className="rounded-full border border-slate-300 px-5 py-2 text-slate-800 transition hover:border-slate-500"
          >
            Zur Startseite
          </Link>
          <Link
            href={`mailto:${brandContact.email}`}
            className="rounded-full bg-black px-5 py-2 font-semibold text-white transition hover:bg-slate-800"
          >
            E-Mail senden
          </Link>
          <Link
            href={`tel:${brandContact.phoneHref}`}
            className="rounded-full border border-slate-300 px-5 py-2 text-slate-800 transition hover:border-slate-500"
          >
            Anrufen
          </Link>
        </div>
      </div>
    </div>
  );
}
