"use client";

import { Reveal } from "@/components/reveal";
import { useLocale } from "@/lib/locale";
import Link from "next/link";

// Pas de faux avis. Tant qu'on n'a pas de témoignages clients validés à
// afficher, on met en avant ce qui est vérifiable : les sites livrés,
// en ligne, que n'importe qui peut ouvrir.

const provenFr = [
  {
    name: "BCS Nettoyage",
    type: "Site vitrine + réservation en ligne",
    detail: "Entreprise de nettoyage à Toulouse. Réservation de créneau intégrée, en production sur son domaine.",
    url: "https://bcs-nettoyage.fr",
  },
  {
    name: "Vellio Shop",
    type: "E-commerce",
    detail: "Boutique Next.js, paiement Stripe en production, 21 produits, design premium.",
    url: "https://vellio.kah-digital.ch",
  },
  {
    name: "DSE Yana",
    type: "Refonte + prise de rendez-vous automatisée",
    detail: "Bureau d'études fluides en Guyane. Réservation d'appel de cadrage en autonomie, espace admin.",
    url: "https://dse-yana-premium-client.vercel.app",
  },
];

const provenEn = [
  {
    name: "BCS Nettoyage",
    type: "Brochure site + online booking",
    detail: "Cleaning company in Toulouse. Built-in slot booking, live in production on its own domain.",
    url: "https://bcs-nettoyage.fr",
  },
  {
    name: "Vellio Shop",
    type: "E-commerce",
    detail: "Next.js store, Stripe payments in production, 21 products, premium design.",
    url: "https://vellio.kah-digital.ch",
  },
  {
    name: "DSE Yana",
    type: "Redesign + automated booking",
    detail: "Fluids engineering office in French Guiana. Self-service call booking, admin dashboard.",
    url: "https://dse-yana-premium-client.vercel.app",
  },
];

export function Testimonials() {
  const { isEnglish, prefix } = useLocale();
  const proven = isEnglish ? provenEn : provenFr;
  const withPrefix = (path: string) => (prefix ? `${prefix}${path}` : path);

  return (
    <section className="section-shell space-y-8">
      <Reveal>
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-white/60">
            {isEnglish ? "Verifiable work" : "Du concret, vérifiable"}
          </p>
          <h2 className="text-3xl font-semibold text-white">
            {isEnglish ? "Open the sites. Judge for yourself." : "Ouvrez les sites. Jugez par vous-même."}
          </h2>
          <p className="max-w-2xl text-white/60">
            {isEnglish
              ? "No invented testimonials. Client reviews are being collected — meanwhile, every project below is live and public."
              : "Pas de témoignages inventés. Les avis clients sont en cours de collecte — en attendant, chaque projet ci-dessous est en ligne et public."}
          </p>
        </div>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {proven.map((item, index) => (
          <Reveal key={item.name} delay={index * 0.08}>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="premium-card group flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-6 text-white transition hover:border-white/25 hover:bg-white/[0.08]"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-white/45">{item.type}</p>
                <p className="mt-3 text-lg font-semibold text-white">{item.name}</p>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{item.detail}</p>
              </div>
              <span className="mt-5 inline-flex items-center gap-2 border-t border-white/10 pt-4 text-sm text-white/60 transition group-hover:text-white">
                {isEnglish ? "Open the site" : "Ouvrir le site"} ↗
              </span>
            </a>
          </Reveal>
        ))}
        <Reveal delay={0.3}>
          <div className="premium-card flex h-full flex-col items-start justify-between rounded-3xl border border-dashed border-white/20 bg-white/[0.03] p-6 text-white">
            <div>
              <p className="text-lg font-semibold text-white/80">
                {isEnglish ? "Your project here?" : "Votre projet ici ?"}
              </p>
              <p className="mt-2 text-sm text-white/50">
                {isEnglish
                  ? "We have slots open. Proposal within 24h, no commitment."
                  : "Créneaux disponibles. Proposition sous 24h, sans engagement."}
              </p>
            </div>
            <Link
              href={withPrefix("/devis")}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-neutral-200"
            >
              {isEnglish ? "Start now" : "Démarrer maintenant"}
            </Link>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <Link
          href={withPrefix("/projets")}
          className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition hover:text-white"
        >
          {isEnglish ? "See all projects" : "Voir tous les projets"} →
        </Link>
      </Reveal>
    </section>
  );
}
