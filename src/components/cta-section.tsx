"use client";

import Link from "next/link";
import { useLocale } from "@/lib/locale";

export function CTASection() {
  const { locale, prefix } = useLocale();
  const copy = {
    fr: {
      title: "Parlons d'un projet utile pour votre entreprise",
      body: "Site web, application ou parcours support : l'important est de cadrer juste et de produire proprement.",
      primary: "Demander un devis gratuit",
      secondary: "Nous contacter",
    },
    en: {
      title: "Let's talk about a useful project for your company",
      body: "Website, application, or support workflow: the point is to scope it right and build it cleanly.",
      primary: "Request a free quote",
      secondary: "Contact us",
    },
    de: {
      title: "Lass uns ueber ein nuetzliches Projekt fuer dein Unternehmen sprechen",
      body: "Website, Anwendung oder Support-Flow: wichtig ist ein sauberer Scope und eine saubere Umsetzung.",
      primary: "Kostenlose Anfrage",
      secondary: "Kontakt aufnehmen",
    },
  }[locale];

  const withPrefix = (path: string) => (prefix ? `${prefix}${path}` : path);

  return (
    <section className="bg-blue-600 py-16">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="mb-4 text-3xl font-bold text-white">{copy.title}</h2>
        <p className="mb-8 text-xl text-blue-100">{copy.body}</p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href={withPrefix("/devis")}
            className="rounded-full bg-white px-8 py-3 font-semibold text-blue-600 transition-colors hover:bg-gray-100"
          >
            {copy.primary}
          </Link>
          <Link
            href={withPrefix("/contact")}
            className="rounded-full border-2 border-white px-8 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-blue-600"
          >
            {copy.secondary}
          </Link>
        </div>
      </div>
    </section>
  );
}
