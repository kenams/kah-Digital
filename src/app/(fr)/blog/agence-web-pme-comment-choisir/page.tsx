import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { FiArrowRight, FiCheck, FiX } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Comment choisir une agence web pour votre PME � Guide 2026 � KAH Digital",
  description: "devis, red flags, questions � poser, crit�res cl�s : tout ce qu'une PME doit savoir avant de choisir une agence web ou un d�veloppeur freelance.",
  keywords: ["choisir agence web PME", "agence web PME", "comment choisir agence digitale", "freelance vs agence web", "agence web petite entreprise"],
  alternates: { canonical: "https://kah-digital.ch/blog/agence-web-pme-comment-choisir" },
  openGraph: {
    title: "Comment choisir une agence web pour votre PME",
    description: "Les crit�res qui comptent vraiment, les red flags, et les bonnes questions � poser.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Comment choisir une agence web pour votre PME � Guide 2026",
  "datePublished": "2026-05-04",
  "dateModified": "2026-05-04",
  "author": { "@type": "Organization", "name": "KAH Digital" },
  "publisher": { "@type": "Organization", "name": "KAH Digital", "url": "https://kah-digital.ch" },
  "mainEntityOfPage": "https://kah-digital.ch/blog/agence-web-pme-comment-choisir",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Vaut-il mieux une agence web ou un freelance pour une PME ?", "acceptedAnswer": { "@type": "Answer", "text": "Pour une PME, un freelance senior ou un studio ind�pendant offre souvent plus de r�activit� et moins d'overhead qu'une grande agence. Pour des projets complexes, une agence structur�e peut �tre pr�f�rable." } },
    { "@type": "Question", "name": "Quelles questions poser avant de signer avec une agence web ?", "acceptedAnswer": { "@type": "Answer", "text": "Demandez : Qui va vraiment travailler sur mon projet ? Ai-je acc�s au code et � l'h�bergement ? Qu'est-ce qui est inclus apr�s la mise en ligne ? Avez-vous des r�f�rences dans mon secteur ?" } },
    { "@type": "Question", "name": "Comment cadrer le p�rim�tre pour une PME ?", "acceptedAnswer": { "@type": "Answer", "text": "Un site vitrine PME propre et performant s'estime apr�s cadrage. M�fiez-vous des propositions trop vagues, trop standardis�es ou sans explication claire des livrables." } },
  ],
};

const GOOD_SIGNS = [
  "Porte-folio avec des vrais projets livr�s (pas des maquettes)",
  "Process clair : brief ? maquette ? dev ? recette ? livraison",
  "Devis personnalis� expliqu� apr�s un premier cadrage simple",
  "Vous recevez les acc�s : h�bergement, domaine, code source",
  "R�ponse rapide (sous 24-48h) d�s le premier contact",
  "Interlocuteur unique qui comprend votre m�tier",
];

const RED_FLAGS = [
  "Aucun portfolio visible ou des projets non cliquables",
  "Devis sign� avant d'avoir compris votre besoin",
  "\"Nos devis sont sur devis\" sans aucune explication de m�thode ou de p�rim�tre",
  "H�bergement propri�taire que vous ne pouvez pas quitter",
  "Contrat de maintenance mensuel obligatoire sans justification claire",
  "Interlocuteur commercial qui passe ensuite le projet � une �quipe offshore",
];

export default function AgenceWebPmePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Script id="ld-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Script id="ld-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="relative overflow-hidden pt-24 pb-12">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="relative mx-auto max-w-3xl px-4">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-300">? Blog</Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">PME</span>
            <span className="text-xs text-gray-600">4 mai 2026 � 6 min de lecture</span>
          </div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Comment choisir une agence web pour votre PME
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            Les crit�res qui comptent vraiment, les red flags qui doivent vous faire fuir, et les bonnes questions � poser avant de signer.
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 pb-24">
        <div className="mb-10 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5">
          <p className="text-sm leading-relaxed text-blue-200">
            <strong>TL;DR :</strong> V�rifiez le portfolio, demandez qui travaille sur votre projet, assurez-vous d'avoir tous les acc�s. Fuyez les contrats sans sortie possible et les devis sans p�rim�tre clair.
          </p>
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">Agence web ou freelance � laquelle choisir pour une PME ?</h2>
        <p className="mb-6 text-gray-400 leading-relaxed">
          La vraie question n'est pas "agence ou freelance" mais "qui va vraiment travailler sur mon projet". Une grande agence peut vous mettre sur votre projet un junior ou un sous-traitant offshore. Un bon studio ind�pendant peut vous offrir la m�me qualit� qu'une grande structure, avec plus de r�activit� et moins d'interm�diaires.
        </p>
        <p className="mb-10 text-gray-400 leading-relaxed">
          Pour un projet de PME, un freelance senior ou un petit studio est souvent un bon �quilibre entre qualit�, cadrage et r�activit�.
        </p>

        <h2 className="mb-8 text-2xl font-bold text-white">Les bons signes</h2>
        <div className="mb-10 space-y-3">
          {GOOD_SIGNS.map((item) => (
            <div key={item} className="flex items-start gap-3 rounded-xl border border-emerald-500/15 bg-emerald-500/5 p-4">
              <FiCheck size={16} className="mt-0.5 shrink-0 text-emerald-400" />
              <span className="text-sm text-gray-300">{item}</span>
            </div>
          ))}
        </div>

        <h2 className="mb-8 text-2xl font-bold text-white">Les red flags � fuyez</h2>
        <div className="mb-10 space-y-3">
          {RED_FLAGS.map((item) => (
            <div key={item} className="flex items-start gap-3 rounded-xl border border-red-500/15 bg-red-500/5 p-4">
              <FiX size={16} className="mt-0.5 shrink-0 text-red-400" />
              <span className="text-sm text-gray-300">{item}</span>
            </div>
          ))}
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">Les questions � poser obligatoirement</h2>
        <div className="mb-10 space-y-4">
          {[
            { q: "Qui va travailler sur mon projet ?", a: "Vous devez conna�tre le ou les profils qui vont coder et designer votre site. Pas un chef de projet qui d�l�gue." },
            { q: "Est-ce que j'aurai acc�s � mon code et mon h�bergement ?", a: "Vous devez �tre propri�taire de tout. Si la r�ponse est vague, fuyez." },
            { q: "Que se passe-t-il apr�s la mise en ligne ?", a: "Corrections de bugs, mises � jour, support : demandez ce qui est inclus, ce qui est optionnel et le d�lai de r�ponse." },
            { q: "Avez-vous des r�f�rences dans mon secteur ?", a: "Pas obligatoire, mais un plus. Demandez � voir des projets livr�s et � contacter des anciens clients." },
          ].map((item) => (
            <div key={item.q} className="rounded-xl border border-white/8 bg-gray-900/50 p-5">
              <p className="font-semibold text-white">? {item.q}</p>
              <p className="mt-2 text-sm text-gray-400">{item.a}</p>
            </div>
          ))}
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">Questions fr�quentes</h2>
        <div className="mb-12 space-y-4">
          {faqJsonLd.mainEntity.map((f) => (
            <div key={f.name} className="rounded-xl border border-white/8 bg-gray-900/50 p-5">
              <h3 className="mb-2 font-semibold text-white">{f.name}</h3>
              <p className="text-sm text-gray-400">{f.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-violet-600/10 p-8 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Travaillez avec un studio transparent et r�actif</h2>
          <p className="mb-6 text-gray-400">Process clair � Acc�s complets � R�ponse sous 24h � Devis personnalis�</p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/devis" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-8 py-3.5 font-bold text-white shadow-lg transition hover:shadow-blue-500/30">
              Demander un devis <FiArrowRight size={15} />
            </Link>
            <Link href="/projets" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 font-semibold text-white transition hover:border-white/40">
              Voir notre portfolio
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}



