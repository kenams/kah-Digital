import Link from "next/link";
import { FiArrowRight, FiZap } from "react-icons/fi";
import { PILOT_DELIVERY, pilots } from "@/data/pilotes";

const SHORT: Record<string, string> = {
  sitewatch: "Vos formulaires et réservations fonctionnent-ils vraiment ? Alerte email dès qu'un point d'entrée client lâche.",
  relancecash: "Les factures à relancer, d'un coup d'œil, avec des brouillons de relance que vous relisez avant d'envoyer.",
  scopelock: "Chaque demande de changement estimée et validée par votre client avant d'être commencée.",
};

export function PilotBandSection() {
  return (
    <section className="bg-[#07070c] py-14" aria-labelledby="pilot-band-title">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-[#d6b36a]/25 bg-[#d6b36a]/[0.04] p-8 md:p-10">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#f0d99b]">
            <FiZap size={12} aria-hidden="true" />
            Nouveau · Pilotes SaaS · Partenaires fondateurs
          </span>
          <h2 id="pilot-band-title" className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">
            Trois outils, construits avec vous.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-300 sm:text-base">
            Cadrage sous {PILOT_DELIVERY.scoping}, V1 pilote en {PILOT_DELIVERY.v1}. Rejoignez le groupe des partenaires fondateurs et façonnez le produit avec nous.
          </p>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {pilots.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/pilotes/${p.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-0.5 hover:border-[#d6b36a]/50 hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0d99b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#07070c]"
                >
                  <span className="text-xl font-extrabold text-[#d6b36a]">{p.name}</span>
                  <span className="mt-2 flex-1 text-sm leading-relaxed text-gray-300">{SHORT[p.slug]}</span>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white">
                    Voir le pilote <FiArrowRight size={14} aria-hidden="true" className="transition group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm">
            <Link href="/pilotes" className="font-semibold text-[#f0d99b] underline-offset-4 hover:underline">
              Voir les trois pilotes
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
