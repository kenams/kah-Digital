import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { StickyTimelineIndicator } from "@/components/sticky-timeline-indicator";
import { QuoteForm } from "@/components/quote-form";
import { ContactCard } from "@/components/contact-card";

export const metadata: Metadata = {
  title: "Devis rapide",
  description: "Formulaire express pour estimer un site ou une experience digitale.",
};

const devisSections = [
  { id: "devis-hero", label: "Brief rapide" },
  { id: "devis-form", label: "Formulaire & assets" },
] as const;

export default function DevisPage() {
  return (
    <div className="lg:flex lg:items-start lg:gap-10">
      <div className="flex-1 space-y-12">
        <section id="devis-hero" className="section-shell space-y-12">
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
          <div className="light-surface px-6 py-8 sm:px-8 sm:py-12">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Devis rapide</p>
            <h1 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl">Vision du projet en 1-2 minutes.</h1>
            <p className="mt-4 max-w-3xl text-base text-slate-700 sm:text-lg">
              Chaque demande declenche un email automatique (et un backup webhook optionnel). Reponse detaillee sous 24 h avec
              budget, planning et recommandations.
            </p>
            <div className="mt-4 grid gap-4 text-sm text-slate-600 sm:grid-cols-2 md:grid-cols-3">
              <div className="light-outline p-4 text-slate-900">
                <p className="text-xl font-semibold sm:text-2xl">4-6 semaines</p>
                <p>Livraison moyenne</p>
              </div>
              <div className="light-outline p-4 text-slate-900">
                <p className="text-xl font-semibold sm:text-2xl">+70 projets</p>
                <p>Sites & produits digitaux</p>
              </div>
              <div className="light-outline p-4 text-slate-900">
                <p className="text-xl font-semibold sm:text-2xl">Support</p>
                <p>Slack dedie + Notion partagee</p>
              </div>
            </div>
          </div>
        </section>

        <section id="devis-form" className="section-shell space-y-8">
          <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
            <QuoteForm />
            <div className="space-y-4">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <Image
                  src="/mockups/devis-collage.png"
                  alt="Collage d'ecrans d'apps et sites"
                  width={1200}
                  height={860}
                  className="h-full w-full rounded-2xl object-cover"
                />
              </div>
              <ContactCard title="Hotline produit" />
            </div>
          </div>
        </section>
      </div>
      <div className="sticky top-32 hidden lg:block lg:w-72">
        <StickyTimelineIndicator sections={devisSections} />
      </div>
    </div>
  );
}
