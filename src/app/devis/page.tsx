import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { StickyTimelineIndicator } from "@/components/sticky-timeline-indicator";
import { QuoteForm } from "@/components/quote-form";
import { ContactCard } from "@/components/contact-card";
import { aiBusinessGuide } from "@/data/home";

export const metadata: Metadata = {
  title: "Devis rapide",
  description: "Formulaire express pour estimer un site ou une experience digitale.",
  alternates: {
    canonical: "/devis",
    languages: {
      en: "/en/devis",
    },
  },
  openGraph: {
    type: "website",
    title: "Devis rapide",
    description: "Formulaire express pour estimer un site ou une experience digitale.",
    url: "/devis",
    images: [
      {
        url: "/mockups/global-dashboard.png",
        width: 1200,
        height: 860,
        alt: "Apercu devis Kah-Digital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Devis rapide",
    description: "Formulaire express pour estimer un site ou une experience digitale.",
    images: ["/mockups/global-dashboard.png"],
  },
};

const devisSections = [
  { id: "devis-hero", label: "Brief rapide" },
  { id: "devis-ai", label: "Modules IA" },
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
              <div className="premium-card light-outline p-4 text-slate-900">
                <p className="text-xl font-semibold sm:text-2xl">4-6 semaines</p>
                <p>Livraison moyenne</p>
              </div>
              <div className="premium-card light-outline p-4 text-slate-900">
                <p className="text-xl font-semibold sm:text-2xl">+70 projets</p>
                <p>Sites & produits digitaux</p>
              </div>
              <div className="premium-card light-outline p-4 text-slate-900">
                <p className="text-xl font-semibold sm:text-2xl">Support</p>
                <p>Slack dedie + Notion partagee</p>
              </div>
            </div>
          </div>
        </section>

        <section id="devis-ai" className="section-shell space-y-6">
          <div className="premium-card rounded-[32px] border border-white/10 bg-gradient-to-br from-[#0b0a08] via-[#15120e] to-[#1c1711] p-8 text-white shadow-[0_30px_120px_rgba(32,22,8,0.35)]">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-white/60">Modules IA premium</p>
                <h2 className="mt-3 text-3xl font-semibold text-white">
                  5 modules IA a ajouter a votre projet.
                </h2>
                <p className="mt-2 max-w-3xl text-white/70">
                  Automatisation, assistants et scoring pour accelerer le business. Cadrage clair et integration propre.
                </p>
              </div>
              <Link
                href="/lexique"
                className="rounded-full border border-white/30 px-5 py-2 text-sm text-white/80 transition hover:border-white hover:text-white"
              >
                Lexique IA
              </Link>
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {aiBusinessGuide.map((item, index) => (
                <article
                  key={item.title}
                  className="premium-card group relative overflow-hidden rounded-3xl border border-amber-200/30 bg-gradient-to-br from-amber-500/10 via-black/40 to-black/20 p-4 text-white shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition hover:border-amber-200/60"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(214,179,106,0.22),transparent_55%)] opacity-0 transition duration-500 group-hover:opacity-100" />
                  <div className="relative overflow-hidden rounded-2xl border border-amber-200/20">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      className="h-40 w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/20" />
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.3em] text-amber-100/80">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
                      IA premium
                    </div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/50">Option {index + 1}</p>
                    <h3 className="mt-2 text-xl font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm text-white/70">{item.description}</p>
                    <div className="mt-4 grid gap-3 text-xs uppercase tracking-[0.3em] text-white/60">
                      <div>
                        <span className="text-white/40">Tarif</span>
                        <p className="text-sm normal-case text-white/80">{item.pricing}</p>
                      </div>
                      <div>
                        <span className="text-white/40">Delai</span>
                        <p className="text-sm normal-case text-white/80">{item.timeline}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2 text-xs uppercase tracking-[0.3em] text-white/60">
                      {item.tools.map((tool) => (
                        <span key={tool} className="rounded-full border border-white/20 px-3 py-1 text-white/70">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="devis-form" className="section-shell space-y-8">
          <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
            <QuoteForm />
            <div className="space-y-4">
              <div className="premium-card overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-0">
                <div className="grid gap-0">
                  <div className="relative overflow-hidden">
                    <Image
                      src="/mockups/global-dashboard.png"
                      alt="Dashboard produit premium"
                      width={1200}
                      height={900}
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className="h-56 w-full object-cover sm:h-64"
                    />
                  </div>
                  <div className="grid gap-0 sm:grid-cols-2">
                    <div className="relative overflow-hidden">
                      <Image
                        src="/mockups/mvp-minimum-viable-product-concept-260nw-2207922401.webp"
                        alt="Concept MVP minimal"
                        width={900}
                        height={720}
                        sizes="(min-width: 1024px) 20vw, 100vw"
                        className="h-40 w-full object-cover"
                      />
                    </div>
                    <div className="relative overflow-hidden">
                      <Image
                        src="/mockups/pulselearn.png"
                        alt="Ecran d'application mobile"
                        width={900}
                        height={720}
                        sizes="(min-width: 1024px) 20vw, 100vw"
                        className="h-40 w-full object-cover"
                      />
                    </div>
                  </div>
                </div>
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
