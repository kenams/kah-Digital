import Link from "next/link";

const timeline = [
  {
    year: "2021",
    title: "Creation de Kah-Digital",
    detail: "Studio independant lance par Karim Haddad pour piloter des projets premium Next.js / React Native.",
  },
  {
    year: "2023",
    title: "Deploiement Vercel",
    detail: "Infrastructure mutualisee (Vercel, Supabase, Stripe) avec monitoring et backup integres.",
  },
  {
    year: "2024",
    title: "Process RGPD renforce",
    detail: "Gestion des consentements, suppression sur demande, journal des acces aux donnees.",
  },
];

export default function MentionsLegalesPage() {
  return (
    <div className="section-shell space-y-8">
      <div className="flex flex-wrap gap-3 text-sm text-white/70">
        <Link href="/" className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white">
          Retour a l&apos;accueil
        </Link>
        <Link
          href="/configurateur"
          className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white"
        >
          Configurateur
        </Link>
      </div>

      <div className="light-surface px-6 py-8 sm:px-8 sm:py-12">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Mentions legales</p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-900">Informations legales</h1>
        <p className="mt-2 text-sm text-slate-500">
          Informations en cours d&apos;actualisation (SIREN, siege, TVA).
        </p>
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
              <strong>Email :</strong> kah-digital@hotmail.com
            </p>
            <p>
              <strong>Telephone :</strong> +33 7 59 55 84 14 (numero temporaire)
            </p>
          </div>
          <div className="space-y-3">
            <p>
              <strong>Siege social :</strong> 10 rue de la Creation, 75000 Paris
            </p>
            <p>
              <strong>SIREN :</strong> 901 234 567
            </p>
            <p>
              <strong>TVA intracommunautaire :</strong> FR42 901234567
            </p>
            <p>
              <strong>Hebergement :</strong> Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789 (USA)
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="light-outline p-6">
          <h2 className="text-xl font-semibold text-slate-900">Propriete intellectuelle</h2>
          <p className="mt-4 text-slate-700">
            L&apos;ensemble des contenus (textes, visuels, videos, elements graphiques et code) presents sur kah-digital.com est
            protege par le droit d&apos;auteur et demeure la propriete exclusive de Kah-Digital ou de ses partenaires. Toute
            reproduction ou reutilisation requiert un accord ecrit prealable.
          </p>
        </div>
        <div className="light-outline p-6">
          <h2 className="text-xl font-semibold text-slate-900">Responsabilite</h2>
          <p className="mt-4 text-slate-700">
            Kah-Digital met tout en oeuvre pour fournir des informations exactes mais ne saurait etre tenu responsable des
            erreurs, omissions ou indisponibilites du site. Les liens externes renvoient vers des ressources dont nous ne
            maitrisons pas le contenu.
          </p>
        </div>
      </div>

      <div className="light-outline p-6">
        <h2 className="text-xl font-semibold text-slate-900">Timeline conformite</h2>
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
        <h2 className="text-xl font-semibold text-slate-900">Contact et mediation</h2>
        <p className="mt-4 text-slate-700">
          Pour toute question, reclamation ou signalement concernant les contenus publies, ecrivez a kah-digital@hotmail.com ou
          adressez un courrier au siege social. Si un litige persiste, une solution amiable pourra etre recherchee via un
          mediateur de la consommation.
        </p>
      </div>
      <div className="light-surface space-y-5 px-8 py-10">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">CTA</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900">Toujours alignes sur la conformite et l&apos;action.</h2>
          <p className="mt-2 max-w-3xl text-slate-600">
            Formalise ton projet tout en gardant un fil conducteur legal: configurateur, devis express et relecture cahier des
            charges restent dispo pour enclencher la suite.
          </p>
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
