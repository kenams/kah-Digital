import Image from "next/image";
import Link from "next/link";
import { StickyTimelineIndicator } from "@/components/sticky-timeline-indicator";
import { QuoteForm } from "@/components/quote-form";

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
              Retour à l&apos;accueil
            </Link>
            <Link
              href="/configurateur"
              className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white"
            >
              Ouvrir le configurateur
            </Link>
          </div>
          <div className="light-surface px-8 py-12">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Devis rapide</p>
            <h1 className="mt-4 text-4xl font-semibold text-slate-900">Vision du projet en 1-2 minutes.</h1>
            <p className="mt-4 max-w-3xl text-lg text-slate-700">
              Chaque demande déclenche un email automatique (et un backup webhook optionnel). Réponse détaillée sous 24 h avec
              budget, planning et recommandations.
            </p>
            <div className="mt-4 grid gap-4 text-sm text-slate-600 md:grid-cols-3">
              <div className="light-outline p-4 text-slate-900">
                <p className="text-2xl font-semibold">4-6 semaines</p>
                <p>Livraison moyenne</p>
              </div>
              <div className="light-outline p-4 text-slate-900">
                <p className="text-2xl font-semibold">+70 projets</p>
                <p>Sites & produits digitaux</p>
              </div>
              <div className="light-outline p-4 text-slate-900">
                <p className="text-2xl font-semibold">Support</p>
                <p>Slack dédié + Notion partagée</p>
              </div>
            </div>
          </div>
        </section>

        <section id="devis-form" className="section-shell space-y-8">
          <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
            <QuoteForm />
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <Image
                src="/mockups/global-dashboard.svg"
                alt="Aperçu du workspace briefing"
                width={760}
                height={520}
                className="h-full w-full rounded-2xl object-cover"
              />
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
