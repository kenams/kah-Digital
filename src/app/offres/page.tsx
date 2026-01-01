import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Offres claires",
  description: "Details des offres claires et raisons des budgets.",
};

const offers = [
  {
    id: "landing-conversion",
    title: "Landing conversion",
    price: "3 500 EUR",
    timeline: "3 semaines",
    summary: "Une page unique, rapide et orientee conversion pour capter des leads qualifies.",
    why: "Le budget couvre la strategie de message, un design sur mesure, l'integration du formulaire et la QA avant mise en ligne.",
    includes: [
      "Workshop express + structure du message",
      "Design premium + animations legeres",
      "Formulaire + tracking basique",
      "Mise en ligne + QA",
    ],
    ideal: ["Campagne produit", "Lancement marque", "Offre premium"],
  },
  {
    id: "portail-membres",
    title: "Portail membres prive",
    price: "8 000 EUR",
    timeline: "5 semaines",
    summary: "Espace securise pour contenus, abonnements et tableaux de bord internes.",
    why: "Le prix inclut l'authentification, la gestion des roles, la base de donnees et les paiements recurrents.",
    includes: [
      "Auth + roles + gestion comptes",
      "Dashboard et pages membres",
      "Paiements recurrents (Stripe)",
      "Back-office simple",
    ],
    ideal: ["Communautes", "Formations", "SaaS B2B"],
  },
  {
    id: "configurateur-deck",
    title: "Configurateur + deck",
    price: "12 000 EUR",
    timeline: "6 semaines",
    summary: "Configurateur de devis + generation d'un deck PDF pour vendre vite en interne.",
    why: "Le budget couvre le parcours multi-etapes, le calcul de budget, et l'automatisation du deck.",
    includes: [
      "Parcours multi-etapes",
      "Synthese devis + export PDF",
      "Connexion CRM / Notion",
      "Templates commerciaux",
    ],
    ideal: ["Agences", "Studios", "Equipes sales"],
  },
];

export default function OffresPage() {
  return (
    <div className="section-shell space-y-10">
      <div className="flex flex-wrap gap-3 text-sm text-white/70">
        <Link
          href="/"
          className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white"
        >
          Retour a l&apos;accueil
        </Link>
        <Link
          href="/devis"
          className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white"
        >
          Demander un devis
        </Link>
      </div>

      <header className="rounded-[36px] border border-white/10 bg-white/5 p-6 text-white shadow-[0_20px_70px_rgba(0,0,0,0.35)] sm:p-10">
        <p className="text-sm uppercase tracking-[0.3em] text-white/60">Offres claires</p>
        <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Ce que couvre chaque offre, et pourquoi.</h1>
        <p className="mt-3 max-w-3xl text-white/70">
          Objectif: rendre les budgets transparents. Chaque offre liste ce qui est inclus et le temps de production moyen.
        </p>
      </header>

      <div className="space-y-6">
        {offers.map((offer) => (
          <section
            key={offer.id}
            id={offer.id}
            className="rounded-[32px] border border-white/10 bg-black/40 p-6 text-white shadow-[0_20px_70px_rgba(0,0,0,0.35)] sm:p-8"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">Offre</p>
                <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">{offer.title}</h2>
                <p className="mt-2 max-w-2xl text-white/70">{offer.summary}</p>
              </div>
              <div className="rounded-3xl border border-white/15 bg-white/5 p-4 text-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">Budget indicatif</p>
                <p className="mt-1 text-2xl font-semibold">{offer.price}</p>
                <p className="mt-1 text-white/60">Delai moyen: {offer.timeline}</p>
              </div>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">Pourquoi ce prix</p>
                <p className="mt-3 text-white/70">{offer.why}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">Inclus</p>
                <ul className="mt-3 space-y-2 text-sm text-white/70">
                  {offer.includes.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">Ideal pour</p>
                <ul className="mt-3 space-y-2 text-sm text-white/70">
                  {offer.ideal.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <Link
                href="/devis"
                className="rounded-full bg-white px-5 py-2 font-semibold text-black transition hover:bg-neutral-200"
              >
                Demander un devis
              </Link>
              <Link
                href="/configurateur"
                className="rounded-full border border-white/30 px-5 py-2 text-white/80 transition hover:border-white hover:text-white"
              >
                Ouvrir le configurateur
              </Link>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
