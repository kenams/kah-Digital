import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "MVP-Anfrage",
  description: "Kurze Anfrage fuer ein Web- oder Mobile-MVP mit KAH-Digital.",
  alternates: {
    canonical: "/de/devis/mvp",
    languages: {
      fr: "/devis/mvp",
      en: "/en/devis/mvp",
    },
  },
};

export default function DevisMvpPageDe() {
  return (
    <div className="section-shell space-y-12">
      <div className="flex flex-wrap gap-3 text-sm text-white/70">
        <Link
          href="/de"
          className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white"
        >
          Zur Startseite
        </Link>
        <Link
          href="/de/devis"
          className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white"
        >
          Allgemeine Anfrage
        </Link>
      </div>

      <div className="premium-card rounded-[36px] border border-white/10 bg-gradient-to-br from-[#090b21] via-[#141036] to-[#2a1a55] px-6 py-8 text-white sm:px-8 sm:py-12">
        <p className="text-sm uppercase tracking-[0.3em] text-white/60">MVP / Produktstart</p>
        <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">Erzaehle uns von deinem MVP.</h1>
        <p className="mt-4 max-w-3xl text-base text-white/80 sm:text-lg">
          Ob Web-App, Kundenportal oder mobile Anwendung: Wir helfen, die erste produktive Version sauber zu strukturieren,
          sinnvoll zu priorisieren und realistisch zu budgetieren.
        </p>
        <div className="mt-4 grid gap-4 text-sm text-white/70 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
            <p className="text-xl font-semibold text-white sm:text-2xl">Scope zuerst</p>
            <p>Kernfunktionen klar vor Add-ons.</p>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
            <p className="text-xl font-semibold text-white sm:text-2xl">4 bis 8 Wochen</p>
            <p>Je nach Komplexitaet, Nutzerlogik und Integrationen.</p>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
            <p className="text-xl font-semibold text-white sm:text-2xl">Klarer Stack</p>
            <p>Next.js, React Native, Supabase und passende APIs.</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <ContactForm />
        <div className="premium-card rounded-3xl border border-white/10 bg-white/5 p-4">
          <Image
            src="/mockups/pulselearn.png"
            alt="MVP Vorschau"
            width={760}
            height={520}
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="h-full w-full rounded-2xl object-cover"
          />
        </div>
      </div>
    </div>
  );
}
