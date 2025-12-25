import Link from "next/link";

const timeline = [
  {
    year: "2021",
    title: "Création de Kah-Digital",
    detail: "Studio indépendant lancé par Karim Haddad pour piloter des projets premium Next.js / React Native.",
  },
  {
    year: "2023",
    title: "Déploiement Vercel",
    detail: "Infrastructure mutualisée (Vercel, Supabase, Stripe) avec monitoring et backup intégrés.",
  },
  {
    year: "2024",
    title: "Process RGPD renforcé",
    detail: "Gestion des consentements, suppression sur demande, journal des accès aux données.",
  },
];

export default function MentionsLegalesPage() {
  return (
    <div className="section-shell space-y-8">
      <div className="flex flex-wrap gap-3 text-sm text-white/70">
        <Link href="/" className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white">
          Retour à l&apos;accueil
        </Link>
        <Link
          href="/configurateur"
          className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white"
        >
          Configurateur
        </Link>
      </div>

      <div className="light-surface px-8 py-12">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Mentions légales</p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-900">Informations légales</h1>
        <div className="mt-6 grid gap-8 text-sm text-slate-700 md:grid-cols-2">
          <div className="space-y-3">
            <p>
              <strong>Raison sociale :</strong> Kah-Digital
            </p>
            <p>
              <strong>Forme :</strong> Entreprise individuelle
            </p>
            <p>
              <strong>Responsable de la publication :</strong> Karim Haddad
            </p>
            <p>
              <strong>Email :</strong> hello@kah-digital.com
            </p>
            <p>
              <strong>Téléphone :</strong> +33 6 52 41 11 22
            </p>
          </div>
          <div className="space-y-3">
            <p>
              <strong>Siège social :</strong> 10 rue de la Création, 75000 Paris
            </p>
            <p>
              <strong>SIREN :</strong> 901 234 567
            </p>
            <p>
              <strong>TVA intracommunautaire :</strong> FR42 901234567
            </p>
            <p>
              <strong>Hébergement :</strong> Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789 (USA)
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="light-outline p-6">
          <h2 className="text-xl font-semibold text-slate-900">Propriété intellectuelle</h2>
          <p className="mt-4 text-slate-700">
            L’ensemble des contenus (textes, visuels, vidéos, éléments graphiques et code) présents sur kah-digital.com est
            protégé par le droit d’auteur et demeure la propriété exclusive de Kah-Digital ou de ses partenaires. Toute
            reproduction ou réutilisation requiert un accord écrit préalable.
          </p>
        </div>
        <div className="light-outline p-6">
          <h2 className="text-xl font-semibold text-slate-900">Responsabilité</h2>
          <p className="mt-4 text-slate-700">
            Kah-Digital met tout en œuvre pour fournir des informations exactes mais ne saurait être tenu responsable des
            erreurs, omissions ou indisponibilités du site. Les liens externes renvoient vers des ressources dont nous ne
            maîtrisons pas le contenu.
          </p>
        </div>
      </div>

      <div className="light-outline p-6">
        <h2 className="text-xl font-semibold text-slate-900">Timeline conformité</h2>
        <div className="mt-6 space-y-4">
          {timeline.map((step) => (
            <div key={step.year} className="rounded-2xl border border-slate-900/10 bg-white/80 p-4">
              <p className="text-sm font-semibold text-slate-500">{step.year}</p>
              <p className="text-lg font-semibold text-slate-900">{step.title}</p>
              <p className="text-slate-700">{step.detail}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="light-outline p-6">
        <h2 className="text-xl font-semibold text-slate-900">Contact et médiation</h2>
        <p className="mt-4 text-slate-700">
          Pour toute question, réclamation ou signalement concernant les contenus publiés, écrivez à hello@kah-digital.com ou
          adressez un courrier au siège social. Si un litige persiste, une solution amiable pourra être recherchée via un
          médiateur de la consommation.
        </p>
      </div>
      <div className="light-surface space-y-5 px-8 py-10">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">CTA</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900">Toujours alignes sur la conformite et l&apos;action.</h2>
          <p className="mt-2 max-w-3xl text-slate-600">Formalise ton projet tout en gardant un fil conducteur legal: configurateur, devis express et relecture cahier des charges restent dispo pour enclencher la suite.</p>
        </div>
        <div className="flex flex-wrap gap-3 text-sm text-slate-900">
          <Link
            href="/devis"
            className="rounded-full border border-slate-900/20 px-5 py-2 transition hover:border-slate-900 hover:bg-white"
          >
            Lancer un devis
          </Link>
          <Link
            href="/configurateur"
            className="rounded-full border border-slate-900/20 px-5 py-2 transition hover:border-slate-900 hover:bg-white"
          >
            Composer un MVP
          </Link>
          <Link
            href="/portfolio"
            className="rounded-full border border-slate-900/20 px-5 py-2 transition hover:border-slate-900 hover:bg-white"
          >
            Voir des cas concrets
          </Link>
        </div>
      </div>

    </div>
  );
}
