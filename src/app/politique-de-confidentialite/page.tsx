import Link from "next/link";

const sections = [
  {
    title: "Finalités et base juridique",
    content:
      "Les données collectées via les formulaires (devis, configurateur, cahier des charges ou contact) nous permettent de qualifier votre projet, répondre à vos demandes et vous envoyer une proposition commerciale. La base légale est l’exécution de mesures précontractuelles (art. 6.1.b RGPD).",
  },
  {
    title: "Durée de conservation",
    content:
      "Les informations sont conservées pendant 24 mois maximum après le dernier échange, puis archivées ou supprimées. Les devis acceptés sont gardés le temps nécessaire à l’exécution de la mission et au respect des obligations comptables.",
  },
  {
    title: "Hébergement et sécurité",
    content:
      "Le site est hébergé chez Vercel (UE/USA) et les données sont stockées sur des services sécurisés (Resend pour l’emailing, Google Workspace ou Notion pour le suivi interne). Chaque outil est configuré avec authentification forte, journalisation des accès et chiffrement en transit.",
  },
  {
    title: "Partage et sous-traitance",
    content:
      "Seuls les membres de Kah-Digital et, le cas échéant, des partenaires dûment contractés peuvent accéder à vos informations. Nous ne revendons ni ne louons vos données. En cas de sous-traitance (freelance, studio partenaire), un accord de confidentialité est signé en amont.",
  },
];

const rights = [
  "Droit d’accès et de rectification",
  "Droit à l’effacement (droit à l’oubli)",
  "Droit à la limitation et à l’opposition",
  "Droit à la portabilité des données",
];

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="section-shell space-y-8">
      <div className="flex flex-wrap gap-3 text-sm text-white/70">
        <Link
          href="/"
          className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white"
        >
          Retour à l&apos;accueil
        </Link>
        <Link
          href="/mentions-legales"
          className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white"
        >
          Mentions légales
        </Link>
      </div>

      <div className="light-surface px-6 py-8 sm:px-8 sm:py-12">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Confidentialité</p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-900">Politique de confidentialité</h1>
        <p className="mt-4 text-slate-700">
          Cette page détaille la manière dont Kah-Digital collecte, utilise et protège les données transmises via
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
        <p className="mt-4 text-slate-700">Vous pouvez exercer à tout moment les droits suivants auprès de kah-digital@hotmail.com :</p>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">
          {rights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-4 text-slate-700">
          Pour des raisons de sécurité, nous pouvons vous demander de confirmer votre identité avant de traiter la requête.
          Vous disposez également du droit d’introduire une réclamation auprès de la CNIL.
        </p>
      </div>

      <div className="light-outline p-6">
        <h2 className="text-xl font-semibold text-slate-900">Cookies & mesure d’audience</h2>
        <p className="mt-4 text-slate-700">
          Le site utilise un outil de mesure d’audience (Plausible ou Google Analytics) configuré sans cookies marketing. Les
          données collectées sont anonymisées et servent uniquement à améliorer l’expérience utilisateur. Vous pouvez bloquer
          ces mesures via les réglages de votre navigateur.
        </p>
      </div>
    </div>
  );
}
