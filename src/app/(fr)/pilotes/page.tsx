import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowRight, FiClock, FiZap } from "react-icons/fi";
import { PILOT_DELIVERY, pilots } from "@/data/pilotes";
import { SITE_URL, buildPageMetadata } from "@/lib/shared-metadata";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = buildPageMetadata({
  locale: "fr",
  path: "/pilotes",
  title: "Pilotes SaaS : SiteWatch, RelanceCash, ScopeLock",
  description:
    "Trois pilotes SaaS construits avec leurs partenaires fondateurs : surveillance des parcours clients, relances de factures, validation des changements. Cadrage sous 48 h, V1 en 7 jours.",
  keywords: ["pilote SaaS", "partenaire fondateur", "co-développement SaaS", "SiteWatch", "RelanceCash", "ScopeLock"],
});

export default function PilotesIndexPage() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/pilotes#page`,
        url: `${SITE_URL}/pilotes`,
        name: "Pilotes SaaS KAH Digital Studio",
        inLanguage: "fr-FR",
        isPartOf: { "@type": "WebSite", url: SITE_URL, name: "KAH Digital Studio" },
        hasPart: pilots.map((p) => ({ "@type": "WebPage", name: p.name, url: `${SITE_URL}/pilotes/${p.slug}` })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Pilotes SaaS", item: `${SITE_URL}/pilotes` },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#0a0908] text-white">
      <JsonLd data={graph} />
      <section className="section-shell">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 inline-flex rounded-full border border-[#d6b36a]/35 bg-[#d6b36a]/10 px-4 py-2 text-sm text-[#f0d99b]">
            Partenaires fondateurs
          </p>
          <h1 className="text-4xl font-bold sm:text-6xl">Trois pilotes SaaS, construits avec vous</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/70">
            Chaque pilote part d&apos;un problème concret de petites entreprises et de prestataires. Cadrage sous {PILOT_DELIVERY.scoping}, V1 pilote en {PILOT_DELIVERY.v1} {PILOT_DELIVERY.condition}.
          </p>
          <ul className="mx-auto mt-8 flex max-w-xl flex-col gap-3 text-sm text-white/75 sm:flex-row sm:justify-center">
            <li className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2">
              <FiClock size={14} className="text-[#d6b36a]" aria-hidden="true" /> Cadrage sous {PILOT_DELIVERY.scoping}
            </li>
            <li className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2">
              <FiZap size={14} className="text-[#d6b36a]" aria-hidden="true" /> V1 pilote en {PILOT_DELIVERY.v1}
            </li>
          </ul>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
          {pilots.map((p) => (
            <Link
              key={p.slug}
              href={`/pilotes/${p.slug}`}
              className="group flex flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-7 transition hover:border-[#d6b36a]/50 hover:bg-white/[0.07] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f0d99b]"
            >
              <span className="text-sm text-[#f0d99b]">{p.eyebrow.replace("Pilote SaaS · ", "")}</span>
              <h2 className="mt-2 text-2xl font-bold text-[#d6b36a]">{p.name}</h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-white/70">{p.promise}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white">
                Voir le périmètre <FiArrowRight size={14} aria-hidden="true" className="transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
