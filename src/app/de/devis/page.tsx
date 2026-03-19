import type { Metadata } from "next";
import Link from "next/link";
import { ContactCard } from "@/components/contact-card";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Projektanfrage",
  description: "Kurze Anfrage fuer Website-, App- oder Support-Projekte mit KAH-Digital.",
  alternates: {
    canonical: "/de/devis",
    languages: {
      fr: "/devis",
      en: "/en/devis",
    },
  },
};

export default function QuotePageDe() {
  return (
    <div className="space-y-12">
      <section className="section-shell space-y-8">
        <div className="flex flex-wrap gap-3 text-sm text-white/70">
          <Link
            href="/de"
            className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white"
          >
            Zur Startseite
          </Link>
          <Link
            href="/de/services"
            className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white"
          >
            Leistungen ansehen
          </Link>
        </div>

        <div className="light-surface px-6 py-8 sm:px-8 sm:py-12">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Projektanfrage</p>
          <h1 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl">
            In wenigen Minuten zu einem klaren Projektstart.
          </h1>
          <p className="mt-4 max-w-3xl text-base text-slate-700 sm:text-lg">
            Wenn du eine Website, eine Anwendung oder einen strukturierteren Support-Workflow planst, reicht eine kurze
            Anfrage. Wir melden uns mit einem klaren Rahmen zu Budget, Timing und den naechsten Schritten.
          </p>
          <div className="mt-6 grid gap-4 text-sm text-slate-600 sm:grid-cols-3">
            <div className="premium-card light-outline p-4 text-slate-900">
              <p className="text-xl font-semibold sm:text-2xl">24h</p>
              <p>Rueckmeldung auf qualifizierte Anfragen</p>
            </div>
            <div className="premium-card light-outline p-4 text-slate-900">
              <p className="text-xl font-semibold sm:text-2xl">Schweiz</p>
              <p>Lausanne als Basis, international offen</p>
            </div>
            <div className="premium-card light-outline p-4 text-slate-900">
              <p className="text-xl font-semibold sm:text-2xl">Klar</p>
              <p>Direkter Scope statt langer Agenturprozesse</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <ContactForm />
          <ContactCard title="Direkter Kontakt" />
        </div>
      </section>
    </div>
  );
}
