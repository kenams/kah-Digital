import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { FiArrowRight, FiAlertCircle, FiCheck } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Refonte de site web : quand et comment ? � KAH Digital",
  description: "Les 7 signaux qui indiquent qu'il est temps de refondre votre site web, et la m�thode pour r�ussir votre refonte sans gaspiller de P�rim�tre.",
  keywords: ["refonte site web", "r�nover site web", "mettre � jour site internet", "refaire son site web", "moderniser site web"],
  alternates: { canonical: "https://kah-digital.ch/blog/refonte-site-web" },
  openGraph: {
    title: "Refonte de site web : quand et comment ?",
    description: "7 signaux pour savoir si votre site a besoin d'une refonte, et la m�thode pour le faire bien.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Refonte de site web : quand faut-il se lancer et comment s'y prendre ?",
  "datePublished": "2026-04-24",
  "dateModified": "2026-04-24",
  "author": { "@type": "Organization", "name": "KAH Digital" },
  "publisher": { "@type": "Organization", "name": "KAH Digital", "url": "https://kah-digital.ch" },
};

const SIGNALS = [
  { num: "01", title: "Votre site n'est pas adapt� mobile", detail: "Plus de 60% du trafic web vient des smartphones. Si votre site n'est pas responsive, vous perdez plus de la moiti� de vos visiteurs potentiels d�s la premi�re seconde." },
  { num: "02", title: "Il charge lentement", detail: "Au-del� de 3 secondes, 53% des visiteurs mobile abandonnent. Un site lent s'estime des clients chaque jour." },
  { num: "03", title: "Le design date de plus de 4 ans", detail: "Le web �volue vite. Un site vieux de 4 ans donne une impression d'entreprise d�pass�e � avant m�me que le visiteur ait lu une ligne." },
  { num: "04", title: "Vous ne pouvez pas le mettre � jour vous-m�me", detail: "Si chaque modification de texte ou d'image n�cessite de contacter votre d�veloppeur, c'est un frein majeur � votre communication." },
  { num: "05", title: "Il ne g�n�re pas de contacts", detail: "Un site vitrine devrait convertir entre 1 et 3% de ses visiteurs en contacts. En dessous, il y a un probl�me de structure ou de CTA." },
  { num: "06", title: "Il ne remonte pas sur Google", detail: "Si vos concurrents apparaissent avant vous sur les recherches locales, votre site a un probl�me SEO technique ou de contenu." },
  { num: "07", title: "Votre offre a chang� mais pas votre site", detail: "Un site qui ne refl�te plus ce que vous faites r�ellement est contre-productif � il attire les mauvaises personnes et repousse les bonnes." },
];

export default function RefonteWebPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Script id="ld-refonte" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative overflow-hidden pt-24 pb-12">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="relative mx-auto max-w-3xl px-4">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-300">? Blog</Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-400">Strat�gie</span>
            <span className="text-xs text-gray-600">24 avril 2026 � 5 min de lecture</span>
          </div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Refonte de site web : quand faut-il se lancer et comment s'y prendre ?
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            La refonte d'un site est une d�cision importante. Trop t�t, c'est du P�rim�tre gaspill�. Trop tard, c'est des clients perdus. Voici comment savoir quand agir � et comment faire.
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 pb-24">

        <h2 className="mb-8 text-2xl font-bold text-white">Les 7 signaux qui indiquent qu'il est temps</h2>
        <div className="mb-12 space-y-5">
          {SIGNALS.map((s) => (
            <div key={s.num} className="flex gap-4 rounded-2xl border border-white/8 bg-gray-900/50 p-5">
              <span className="shrink-0 font-mono text-2xl font-black text-white/10">{s.num}</span>
              <div>
                <h3 className="mb-1 font-bold text-white">{s.title}</h3>
                <p className="text-sm leading-relaxed text-gray-400">{s.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">Refonte totale ou am�liorations cibl�es ?</h2>
        <p className="mb-6 text-gray-400 leading-relaxed">
          Avant de tout jeter, posez-vous cette question : est-ce un probl�me de surface (design vieilli) ou un probl�me de fond (architecture, CMS inadapt�, stack d�pass�e) ?
        </p>
        <div className="mb-10 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5">
            <div className="mb-2 flex items-center gap-2"><FiAlertCircle size={15} className="text-amber-400" /><span className="font-semibold text-white text-sm">Am�liorations cibl�es</span></div>
            <p className="text-xs text-gray-400 leading-relaxed">Le contenu est bon, la structure tient � il faut juste moderniser le design, am�liorer la vitesse ou corriger le SEO.</p>
            <p className="mt-2 text-xs font-semibold text-amber-400">P�rim�tre : � d�finir apr�s audit</p>
          </div>
          <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-5">
            <div className="mb-2 flex items-center gap-2"><FiCheck size={15} className="text-blue-400" /><span className="font-semibold text-white text-sm">Refonte compl�te</span></div>
            <p className="text-xs text-gray-400 leading-relaxed">Le CMS est vieux, la stack est d�pass�e, ou votre offre a fondamentalement chang�. Repartir sur une base propre.</p>
            <p className="mt-2 text-xs font-semibold text-blue-400">P�rim�tre : � d�finir apr�s audit</p>
          </div>
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">La m�thode en 5 �tapes</h2>
        <ol className="mb-12 space-y-6">
          {[
            { step: "Auditez l'existant", detail: "Avant de construire quoi que ce soit, mesurez : vitesse (PageSpeed), positions SEO (Google Search Console), taux de conversion (Analytics), pages les plus visit�es. Ces donn�es guident les d�cisions." },
            { step: "D�finissez le p�rim�tre pr�cis", detail: "Quelles pages garder, lesquelles supprimer ? Quelles nouvelles fonctionnalit�s ? Un scope vague est la premi�re cause de P�rim�tre d�pass�." },
            { step: "Choisissez la bonne stack", detail: "WordPress si vous voulez g�rer le contenu vous-m�me. Next.js si la performance et le SEO sont prioritaires. �vitez les constructeurs visuels type Wix si vous visez une vraie performance." },
            { step: "G�rez la migration SEO", detail: "Chaque URL qui change doit avoir une redirection 301. Un plan de redirections b�cl� peut faire perdre 30 � 50% du trafic organique en quelques semaines." },
            { step: "Lancez � puis am�liorez", detail: "Un site parfait qui sort dans 6 mois vaut moins qu'un site correct sorti dans 3 semaines. Lancez avec le minimum viable, puis it�rez sur les donn�es r�elles." },
          ].map((item, i) => (
            <li key={item.step} className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-violet-600 text-sm font-bold text-white">{i + 1}</span>
              <div>
                <h3 className="mb-1 font-bold text-white">{item.step}</h3>
                <p className="text-sm leading-relaxed text-gray-400">{item.detail}</p>
              </div>
            </li>
          ))}
        </ol>

        <h2 className="mb-6 text-2xl font-bold text-white">Combien de temps prend une refonte ?</h2>
        <div className="mb-12 grid gap-3 sm:grid-cols-3">
          {[
            { type: "Site vitrine", delay: "2 � 3 semaines" },
            { type: "Site corporate", delay: "3 � 6 semaines" },
            { type: "Application web", delay: "6 � 12 semaines" },
          ].map((item) => (
            <div key={item.type} className="rounded-xl border border-white/8 bg-gray-900 p-4 text-center">
              <div className="text-sm text-gray-500">{item.type}</div>
              <div className="mt-1 font-bold text-white">{item.delay}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-blue-600/10 p-8 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Votre site a besoin d'une refonte ?</h2>
          <p className="mb-6 text-gray-400">On analyse votre site gratuitement et on vous dit ce qui doit changer.</p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/audit-gratuit" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-8 py-3.5 font-bold text-white shadow-lg transition hover:shadow-blue-500/30">
              Audit gratuit <FiArrowRight size={15} />
            </Link>
            <Link href="/refonte-site-web" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 font-semibold text-white transition hover:border-white/40">
              Notre offre refonte
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}


