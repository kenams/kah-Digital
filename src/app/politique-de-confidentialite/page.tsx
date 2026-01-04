import Link from "next/link";

const sections = [
  {
    title: "Finalites et base juridique",
    content:
      "Les donnees collectees via les formulaires (devis, configurateur, cahier des charges ou contact) nous permettent de qualifier votre projet, repondre a vos demandes et vous envoyer une proposition commerciale. La base legale est l'execution de mesures precontractuelles (art. 6.1.b RGPD).",
  },
  {
    title: "Duree de conservation",
    content:
      "Les informations sont conservees pendant 24 mois maximum apres le dernier echange, puis archivees ou supprimees. Les devis acceptes sont gardes le temps necessaire a l'execution de la mission et au respect des obligations comptables.",
  },
  {
    title: "Hebergement et securite",
    content:
      "Le site est heberge chez Vercel (UE/USA) et les donnees sont stockees sur des services securises (Resend pour l'emailing, Google Workspace ou Notion pour le suivi interne). Chaque outil est configure avec authentification forte, journalisation des acces et chiffrement en transit.",
  },
  {
    title: "Partage et sous-traitance",
    content:
      "Seuls les membres de Kah-Digital et, le cas echeant, des partenaires dument contractes peuvent acceder a vos informations. Nous ne revendons ni ne louons vos donnees. En cas de sous-traitance (freelance, studio partenaire), un accord de confidentialite est signe en amont.",
  },
];

const rights = [
  "Droit d'acces et de rectification",
  "Droit a l'effacement (droit a l'oubli)",
  "Droit a la limitation et a l'opposition",
  "Droit a la portabilite des donnees",
];

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="section-shell space-y-8">
      <div className="flex flex-wrap gap-3 text-sm text-white/70">
        <Link
          href="/"
          className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white"
        >
          Retour a l&apos;accueil
        </Link>
        <Link
          href="/mentions-legales"
          className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white"
        >
          Mentions legales
        </Link>
      </div>

      <div className="light-surface px-6 py-8 sm:px-8 sm:py-12">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Confidentialite</p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-900">Politique de confidentialite</h1>
        <p className="mt-4 text-slate-700">
          Cette page detaille la maniere dont Kah-Digital collecte, utilise et protege les donnees transmises via
          kah-digital.com. Nous respectons le RGPD et les recommandations de la CNIL.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {sections.map((section) => (
          <article key={section.title} className="light-outline p-6 text-slate-700">
            <h2 className="text-xl font-semibold text-slate-900">{section.title}</h2>
            <p className="mt-4">{section.content}</p>
          </article>
        ))}
      </div>

      <div className="light-outline p-6">
        <h2 className="text-xl font-semibold text-slate-900">Vos droits</h2>
        <p className="mt-4 text-slate-700">Vous pouvez exercer a tout moment les droits suivants aupres de kah-digital@hotmail.com :</p>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">
          {rights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-4 text-slate-700">
          Pour des raisons de securite, nous pouvons vous demander de confirmer votre identite avant de traiter la requete.
          Vous disposez egalement du droit d&apos;introduire une reclamation aupres de la CNIL.
        </p>
      </div>

      <div className="light-outline p-6">
        <h2 className="text-xl font-semibold text-slate-900">Cookies & mesure d&apos;audience</h2>
        <p className="mt-4 text-slate-700">
          Le site utilise un outil de mesure d&apos;audience (Plausible ou Google Analytics) configure sans cookies marketing. Les
          donnees collectees sont anonymisees et servent uniquement a ameliorer l&apos;experience utilisateur. Vous pouvez bloquer
          ces mesures via les reglages de votre navigateur.
        </p>
      </div>
    </div>
  );
}
