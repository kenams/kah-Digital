import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { FiArrowRight, FiCheck, FiMessageCircle } from "react-icons/fi";

export const metadata: Metadata = {
  title: "SEO local pour PME : apparaître en 1ère page Google en 2026 — KAH Digital",
  description:
    "Guide complet SEO local pour PME : Google Business Profile, avis clients, pages locales, balises schema. Les actions concrètes pour que vos clients locaux vous trouvent.",
  keywords: [
    "seo local pme",
    "référencement local entreprise",
    "google my business optimisation",
    "seo local 2026",
    "comment apparaître sur google local",
    "référencement local artisan",
  ],
  alternates: { canonical: "https://KAH Digital.ch/blog/seo-local-pme" },
  openGraph: {
    title: "SEO local pour PME : apparaître en 1ère page Google en 2026",
    description:
      "Les actions concrètes pour que vos clients locaux vous trouvent sur Google — sans agence SEO hors de devis.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "SEO local pour PME : apparaître en 1ère page Google en 2026",
  datePublished: "2026-05-04",
  dateModified: "2026-05-04",
  author: { "@type": "Organization", name: "KAH Digital" },
  publisher: { "@type": "Organization", name: "KAH Digital", url: "https://KAH Digital.ch" },
  mainEntityOfPage: "https://KAH Digital.ch/blog/seo-local-pme",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Qu'est-ce que le SEO local ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le SEO local regroupe toutes les techniques qui permettent à une entreprise d'apparaître dans les résultats Google pour des recherches géolocalisées — par exemple 'plombier Paris' ou 'restaurant Lyon centre'.",
      },
    },
    {
      "@type": "Question",
      name: "Combien de temps pour apparaître sur Google en local ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Avec un Google Business Profile bien complété et une page optimisée, les premiers résultats apparaissent en 4 à 8 semaines. La position stable dans le Pack Local prend 3 à 6 mois selon la concurrence.",
      },
    },
    {
      "@type": "Question",
      name: "Google Business Profile suffit-il pour le SEO local ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Non. Google Business Profile est indispensable mais insuffisant seul. Il faut le coupler avec un site web optimisé (balises title/h1 avec ville + métier, schema LocalBusiness, pages spécifiques par ville) et des avis clients réguliers.",
      },
    },
    {
      "@type": "Question",
      name: "comment estimer le SEO local pour une PME ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mettre en place une base SEO locale solide (page optimisée, schema, Google Business Profile) s'estime après cadrage selon la concurrence locale, les villes ciblées et le niveau de suivi souhaité. KAH Digital intègre le SEO local directement dans la création du site.",
      },
    },
  ],
};

const ACTIONS = [
  {
    step: "01",
    title: "Google Business Profile — la base obligatoire",
    content: `C'est votre vitrine sur Google Maps et dans le Pack Local (les 3 résultats avec carte en haut des résultats). Si vous ne l'avez pas encore, c'est la première action à faire.

**Ce qu'il faut faire :**
- Créer ou réclamer votre fiche sur business.google.com
- Remplir 100% des informations : horaires, téléphone, site web, catégorie principale et secondaires
- Ajouter 10+ photos récentes (façade, intérieur, équipe, réalisations)
- Répondre à TOUS les avis (positifs et négatifs) — Google le mesure
- Publier un Post Google toutes les 2 semaines (actualité, offre, événement)

**Pourquoi c'est critique :** 46% des recherches Google ont une intention locale. Ne pas être sur Google Maps, c'est invisible pour la moitié de vos clients potentiels.`,
  },
  {
    step: "02",
    title: "Votre site web — la page locale optimisée",
    content: `Google Business Profile seul ne suffit pas. Il faut un site web qui renforce votre crédibilité locale. Les signaux que Google lit :

**Balise title :** \`[Métier] [Ville] — [Nom entreprise]\`
Exemple : "Plombier Lyon 3 — Dupont Plomberie"

**H1 :** même logique que le title, avec le mot-clé principal

**Contenu de la page :**
- Mentionnez votre ville et quartier naturellement dans le texte
- Incluez votre adresse complète (schema.org LocalBusiness)
- Intégrez Google Maps sur votre page contact
- Citez des lieux connus à proximité ("à 2 minutes de la gare Part-Dieu")

**URL :** \`/plombier-lyon\` ou \`/plombier-lyon-3\` si vous ciblez un arrondissement.`,
  },
  {
    step: "03",
    title: "Schema.org LocalBusiness — le code que Google lit",
    content: `Le schema LocalBusiness est un balisage JSON-LD que vous ajoutez dans le \`<head>\` de vos pages. Google le lit directement et s'en sert pour le Knowledge Panel et le Pack Local.

**Exemple minimal :**
\`\`\`json
{
  "@type": "LocalBusiness",
  "name": "Dupont Plomberie",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "12 rue de la Paix",
    "addressLocality": "Lyon",
    "postalCode": "69003",
    "addressCountry": "FR"
  },
  "telephone": "+33600000000",
  "openingHours": "Mo-Fr 08:00-18:00",
  "url": "https://dupont-plomberie.fr"
}
\`\`\`

Ajoutez-y aussi \`"geo"\` avec latitude/longitude pour renforcer le signal géographique.`,
  },
  {
    step: "04",
    title: "Avis clients — le moteur du Pack Local",
    content: `Google classe les entreprises dans le Pack Local en fonction de 3 critères : pertinence, distance et notoriété. Les avis sont le principal signal de notoriété.

**Stratégie simple :**
- Après chaque mission réussie, envoyez un SMS/email avec le lien direct vers votre fiche Google
- Objectif : 1 nouvel avis par semaine
- Répondez à tous les avis sous 24h (y compris les négatifs, calmement)
- Ne jamais acheter de faux avis — Google détecte et peut supprimer votre fiche

**Impact mesuré :** Passer de 10 à 30 avis (tous 5 étoiles) augmente la visibilité dans le Pack Local de 40 à 60% selon les secteurs.`,
  },
  {
    step: "05",
    title: "Citations locales — cohérence NAP partout",
    content: `NAP = Name, Address, Phone. Google vérifie que ces informations sont identiques partout sur le web. Une incohérence pénalise votre classement local.

**Où vérifier :**
- Pages Jaunes / 118000
- Yelp France / TripAdvisor
- Kompass, Foursquare
- Répertoires sectoriels (Doctolib, La Fourchette, Houzz...)
- Vos profils LinkedIn, Facebook, Instagram

**Action :** Faites un audit de vos citations avec BrightLocal (payant) ou en cherchant votre numéro de téléphone sur Google.`,
  },
  {
    step: "06",
    title: "Contenu local — articles et pages de service par ville",
    content: `Si vous couvrez plusieurs villes ou quartiers, créez une page dédiée par zone géographique. Pas de copier-coller — chaque page doit avoir du contenu unique.

**Structure gagnante par page :**
- H1 : [Service] [Ville]
- Introduction avec mention du secteur géographique
- Liste de vos interventions dans cette zone
- Témoignage d'un client local (nom, ville)
- FAQ locale ("Quel délai d'intervention à [Ville] ?")
- Schema LocalBusiness avec l'adresse locale

**Blog local :** "Nos 3 dernières interventions à Lyon 6" ou "Pourquoi nos clients de Bordeaux nous recommandent" — contenu frais, signal frais pour Google.`,
  },
];

export default function SeoLocalPmePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Script id="ld-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Script id="ld-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/6 pt-16 pb-12">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="relative mx-auto max-w-3xl px-4">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <Link href="/blog" className="text-xs text-gray-500 transition hover:text-gray-400">
              ? Blog
            </Link>
            <span className="text-xs text-gray-600">·</span>
            <span className="rounded-full bg-emerald-500/10 px-3 py-0.5 text-xs font-semibold text-emerald-400">SEO Local</span>
            <span className="text-xs text-gray-600">4 mai 2026</span>
          </div>
          <h1 className="mb-4 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            SEO local pour PME : apparaître en 1ère page Google en 2026
          </h1>
          <p className="mb-6 text-lg text-gray-400 leading-relaxed">
            46% des recherches Google ont une intention locale. Si votre entreprise n'apparaît pas dans le Pack Local (les 3 résultats avec carte), vous perdez la moitié de vos clients potentiels. Voici les 6 actions concrètes pour y remédier.
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <span>KAH Digital</span>
            <span>·</span>
            <span>8 min de lecture</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="mx-auto max-w-3xl px-4 py-16 space-y-14">
        {/* Intro */}
        <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6">
          <p className="text-sm font-semibold text-blue-400 mb-2">Ce que vous apprendrez dans cet article</p>
          <ul className="space-y-1.5">
            {[
              "Comment optimiser votre Google Business Profile pour le Pack Local",
              "Les balises SEO indispensables sur votre site web",
              "Le schema LocalBusiness — le balisage que Google lit en priorité",
              "La stratégie d'avis clients qui fait exploser votre visibilité",
              "Citations locales : la cohérence NAP qui fait la différence",
              "Pages et contenu locaux pour dominer plusieurs zones",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-gray-300">
                <FiCheck size={14} className="mt-0.5 shrink-0 text-blue-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        {ACTIONS.map((action) => (
          <section key={action.step} className="scroll-mt-20">
            <div className="mb-4 flex items-center gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-violet-600 text-sm font-black text-white">
                {action.step}
              </span>
              <h2 className="text-xl font-bold text-white">{action.title}</h2>
            </div>
            <div className="prose prose-invert prose-sm max-w-none pl-14 text-gray-300 leading-relaxed [&_strong]:text-white [&_code]:rounded [&_code]:bg-gray-800 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-xs [&_code]:text-blue-300 [&_pre]:rounded-xl [&_pre]:bg-gray-900 [&_pre]:p-4 [&_pre]:text-xs [&_pre]:leading-loose">
              {action.content.split("\n").map((line, i) => {
                if (line.startsWith("**") && line.endsWith("**")) {
                  return <p key={i} className="font-semibold text-white mt-4 mb-1">{line.slice(2, -2)}</p>;
                }
                if (line.startsWith("- ")) {
                  return <li key={i} className="ml-4 list-disc text-gray-400">{line.slice(2)}</li>;
                }
                if (line.startsWith("```")) {
                  return null;
                }
                if (line.trim() === "") return <br key={i} />;
                return <p key={i}>{line}</p>;
              })}
            </div>
          </section>
        ))}

        {/* FAQ */}
        <section>
          <h2 className="mb-6 text-2xl font-bold text-white">Questions fréquentes</h2>
          <div className="space-y-4">
            {faqJsonLd.mainEntity.map((faq) => (
              <details key={faq.name} className="group rounded-xl border border-white/8 bg-gray-900/50 p-5">
                <summary className="cursor-pointer list-none font-semibold text-white group-open:text-blue-400">
                  {faq.name}
                </summary>
                <p className="mt-3 text-sm text-gray-400 leading-relaxed">{faq.acceptedAnswer.text}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA inline */}
        <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 to-violet-600/10 p-8 text-center">
          <h3 className="mb-3 text-xl font-bold text-white">
            Votre site est-il bien optimisé pour le SEO local ?
          </h3>
          <p className="mb-6 text-sm text-gray-400">
            On analyse votre site gratuitement : score SEO local, problèmes détectés, actions prioritaires.
            Résultats par email sous 24h.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/audit-gratuit"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3 font-bold text-white shadow-lg shadow-blue-500/25 transition hover:opacity-90"
            >
              Obtenir mon audit gratuit <FiArrowRight size={15} />
            </Link>
            <a
              href="https://wa.me/33759558414?text=Bonjour%2C%20j'ai%20lu%20l'article%20SEO%20local%20et%20j'aimerais%20analyser%20mon%20site."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              <FiMessageCircle size={15} /> En parler sur WhatsApp
            </a>
          </div>
        </div>

        {/* Conclusion */}
        <section>
          <h2 className="mb-4 text-2xl font-bold text-white">Ce qu'il faut retenir</h2>
          <p className="mb-4 text-gray-400 leading-relaxed">
            Le SEO local n'est pas sorcier, mais il demande de la cohérence. Les entreprises qui dominent le Pack Local dans leur secteur font toutes la même chose : fiche Google complète, avis réguliers, site technique propre et contenu local unique.
          </p>
          <p className="text-gray-400 leading-relaxed">
            La bonne nouvelle : la majorité de vos concurrents ne font rien de tout ça. Commencez par Google Business Profile et une page web optimisée — c'est 80% du résultat avec 20% de l'effort.
          </p>
        </section>

        {/* Related articles */}
        <section className="border-t border-white/6 pt-10">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-500">Articles liés</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { href: "/blog/creation-site-web-pme", label: "Créer un site web pour PME en 2026" },
              { href: "/blog/devis-site-web-professionnel", label: "comment estimer un site web ?" },
              { href: "/blog/refonte-site-web", label: "Refonte site web : quand et comment ?" },
              { href: "/blog/site-web-artisan", label: "Site web pour artisan : le guide 2026" },
            ].map((article) => (
              <Link
                key={article.href}
                href={article.href}
                className="flex items-center gap-2 rounded-xl border border-white/8 bg-gray-900/50 px-4 py-3 text-sm font-semibold text-gray-300 transition hover:border-white/20 hover:text-white"
              >
                <FiArrowRight size={13} className="shrink-0 text-gray-500" />
                {article.label}
              </Link>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}


