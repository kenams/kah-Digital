import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { IA_OFFERS, formatIaPrice } from "@/data/ia-offers";

const HIGHLIGHTS = ["atelier-decouverte", "atelier-metier", "accompagnement"] as const;

/** Bandeau d'accueil (FR) : offres formation et mise en place de l'IA. */
export function IaBandSection() {
  const offers = HIGHLIGHTS.map((id) => IA_OFFERS.find((o) => o.id === id)!);
  return (
    <section className="bg-[#07070c] py-14" aria-labelledby="ia-band-title">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 rounded-3xl border border-[#d6b36a]/25 bg-[#d6b36a]/[0.04] p-8 md:p-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#f0d99b]">Nouveau · Formation et mise en place de l&apos;IA</span>
            <h2 id="ia-band-title" className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">
              Votre équipe sait-elle vraiment se servir de l&apos;IA ?
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-300 sm:text-base">
              Ateliers sur vos tâches réelles, installation des outils et accompagnement chaque mois. Pour les entreprises, et en individuel pour les particuliers.
            </p>
            <Link
              href="/ia-entreprise"
              className="mt-6 inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-[#d6b36a] px-6 text-sm font-semibold text-[#0a0908] transition hover:bg-[#f0d99b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0d99b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#07070c]"
            >
              Voir les offres IA <FiArrowRight aria-hidden="true" />
            </Link>
          </div>
          <ul className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.03]">
            {offers.map((o) => (
              <li key={o.id} className="flex items-baseline justify-between gap-4 px-5 py-4">
                <span>
                  <span className="block font-semibold text-white">{o.name}</span>
                  <span className="block text-xs text-white/55">{o.format}</span>
                </span>
                <span className="shrink-0 font-bold text-[#f0d99b]">{formatIaPrice(o)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
