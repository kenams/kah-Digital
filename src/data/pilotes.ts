// Trois pilotes SaaS en co-développement. Noms de travail : ni marque déposée ni domaine réservé.
// Aucun prix affiché sur les pages : le prix fixe « partenaire fondateur » est communiqué avant tout engagement.

export type PilotSlug = "sitewatch" | "relancecash" | "scopelock";

export type Pilot = {
  slug: PilotSlug;
  name: string;
  tag: string;
  eyebrow: string;
  title: string;
  promise: string;
  audience: string[];
  problem: string;
  before: string[];
  after: string[];
  v1: string[];
  notV1: string[];
  fields: { siteLabel: string; sitePlaceholder: string; siteRequired: boolean };
  situationLabel: string;
  situationPlaceholder: string;
  note: string;
  metaDescription: string;
  faq: { q: string; a: string }[];
};

export const PILOT_DELIVERY = {
  scoping: "48 h",
  v1: "7 jours",
  condition:
    "à compter de la validation écrite du périmètre et de la réception des accès et contenus nécessaires",
  wider: "Un périmètre plus large fait l'objet d'un nouveau délai, annoncé avant tout engagement.",
};

export const pilots: Pilot[] = [
  {
    slug: "sitewatch",
    name: "SiteWatch",
    tag: "sitewatch",
    eyebrow: "Pilote SaaS · Parcours clients",
    title: "Chaque demande compte.",
    promise:
      "SiteWatch vérifie que les formulaires, réservations et liens clés fonctionnent, et vous alerte lorsqu'un point d'entrée client lâche.",
    audience: [
      "Entreprises de services qui reçoivent des demandes via leur site",
      "Entreprises avec formulaires, réservations, liens de contact ou parcours de paiement",
      "Petites agences web qui suivent les sites de leurs clients",
    ],
    problem:
      "Un site peut répondre normalement alors que le formulaire de contact n'envoie plus rien, que le lien de réservation renvoie une erreur ou que le parcours de paiement est cassé. On le découvre souvent par hasard, après des demandes perdues.",
    before: [
      "Vous découvrez un formulaire cassé quand un client se plaint",
      "Un simple test de disponibilité du site ne voit pas ce problème",
      "Personne ne sait depuis quand le point d'entrée est en panne",
    ],
    after: [
      "Les parcours qui rapportent des demandes sont vérifiés régulièrement",
      "Vous recevez un email dès qu'un point d'entrée lâche",
      "Un historique des incidents et un rapport simple vous montrent ce qui s'est passé",
    ],
    v1: [
      "Choix des parcours importants à surveiller (formulaire, réservation, lien clé, paiement)",
      "Vérifications périodiques, fréquence définie avec vous au cadrage",
      "Historique des incidents",
      "Alertes par email",
      "Rapport simple",
    ],
    notV1: [
      "Pas de surveillance 24h/24 : la fréquence de vérification est fixée au cadrage",
      "Pas de remplacement d'un outil de disponibilité (uptime) : SiteWatch se concentre sur les parcours de conversion",
      "Pas de correction automatique des pannes",
    ],
    fields: { siteLabel: "Site à surveiller", sitePlaceholder: "https://votre-site.fr", siteRequired: true },
    situationLabel: "Quels parcours comptent le plus pour vous ?",
    situationPlaceholder: "Ex : formulaire de devis, réservation en ligne, lien de paiement, prise de rendez-vous…",
    note: "SiteWatch complète le suivi de disponibilité déjà inclus dans une offre de maintenance : ici, l'accent est mis sur les parcours qui rapportent des demandes, pas seulement sur le site en ligne.",
    metaDescription:
      "Pilote SaaS SiteWatch : vérification des formulaires, réservations et liens clés de votre site, avec alerte email. Partenaire fondateur : cadrage sous 48 h, V1 pilote en 7 jours.",
    faq: [
      {
        q: "En quoi est-ce différent d'un simple contrôle de disponibilité ?",
        a: "Un contrôle de disponibilité vérifie que le site répond. SiteWatch vérifie que les parcours qui rapportent des demandes (formulaire, réservation, lien clé) fonctionnent réellement.",
      },
      {
        q: "Est-ce une surveillance 24h/24 ?",
        a: "Non. La V1 pilote réalise des vérifications périodiques dont la fréquence est fixée avec vous au cadrage. Nous ne promettons pas de surveillance continue tant qu'elle n'existe pas.",
      },
      {
        q: "Que se passe-t-il pendant les 7 jours ?",
        a: "Cadrage sous 48 h pour fixer les parcours et la fréquence, puis réalisation de la V1 pilote avec vous. Le délai de 7 jours court à compter de la validation écrite du périmètre et de la réception des accès et contenus nécessaires.",
      },
      {
        q: "Combien ça coûte ?",
        a: "Les premiers pilotes sont des offres payantes de partenaire fondateur, à prix fixe annoncé clairement avant tout engagement, avec un éventuel abonnement ensuite. Aucun montant n'est engagé avant votre accord écrit.",
      },
    ],
  },
  {
    slug: "relancecash",
    name: "RelanceCash",
    tag: "relancecash",
    eyebrow: "Pilote SaaS · Factures à suivre",
    title: "Plus de relance oubliée.",
    promise:
      "Gardez une vue claire de ce qui doit être relancé et envoyez le bon rappel au bon moment. Ne laissez plus une facture en retard devenir une relance oubliée.",
    audience: [
      "Indépendants et consultants qui facturent régulièrement",
      "Prestataires de services B2B",
      "Petites agences qui gèrent elles-mêmes leurs relances",
    ],
    problem:
      "Les factures sont émises, puis le suivi se fait de tête ou dans un tableur. Une échéance passe, la relance attend un jour plus calme, et le retard s'installe.",
    before: [
      "Le suivi des échéances vit dans plusieurs fichiers ou dans votre tête",
      "On ne sait pas toujours quelle facture relancer en premier",
      "La relance est rédigée à chaque fois de zéro, ou repoussée",
    ],
    after: [
      "Une liste claire des factures à suivre, triée par échéance et statut",
      "Des brouillons de relance prêts, que vous relisez et modifiez",
      "Un historique de ce qui a été envoyé et quand",
    ],
    v1: [
      "Import de vos factures par fichier CSV",
      "Échéances et statuts",
      "Liste des factures à suivre",
      "Brouillons de relance modifiables",
      "Historique des actions",
    ],
    notV1: [
      "Pas de comptabilité ni de facturation",
      "Pas de paiement automatique, pas d'intégration bancaire",
      "Pas de recouvrement juridique",
      "Vous vérifiez et envoyez vous-même chaque relance",
      "Aucune facture n'est transmise à une IA",
    ],
    fields: { siteLabel: "Site de l'entreprise (facultatif)", sitePlaceholder: "https://votre-site.fr", siteRequired: false },
    situationLabel: "Comment suivez-vous vos relances aujourd'hui ?",
    situationPlaceholder: "Ex : tableur, logiciel de facturation sans relance, de tête… et combien de factures par mois ?",
    note: "RelanceCash ne remplace pas votre logiciel de facturation : il vous aide à ne pas oublier ce qu'il faut relancer.",
    metaDescription:
      "Pilote SaaS RelanceCash : import CSV, échéances, liste des factures à suivre et brouillons de relance modifiables. Partenaire fondateur : cadrage sous 48 h, V1 pilote en 7 jours.",
    faq: [
      {
        q: "Mes factures sont-elles envoyées à une IA ?",
        a: "Non. Aucune facture n'est transmise à une IA. Vous restez maître de ce qui est envoyé : les brouillons de relance sont modifiables et c'est vous qui les envoyez.",
      },
      {
        q: "RelanceCash gère-t-il la comptabilité ou les paiements ?",
        a: "Non. La V1 ne fait ni comptabilité, ni paiement automatique, ni intégration bancaire, ni recouvrement juridique. Elle sert à suivre les échéances et à préparer les rappels.",
      },
      {
        q: "Comment mes factures arrivent-elles dans l'outil ?",
        a: "Par un import CSV. Le format exact est défini avec vous au cadrage, à partir de l'export de votre outil actuel.",
      },
      {
        q: "Combien ça coûte ?",
        a: "Les premiers pilotes sont des offres payantes de partenaire fondateur, à prix fixe annoncé clairement avant tout engagement, avec un éventuel abonnement ensuite. Aucun montant n'est engagé avant votre accord écrit.",
      },
    ],
  },
  {
    slug: "scopelock",
    name: "ScopeLock",
    tag: "scopelock",
    eyebrow: "Pilote SaaS · Demandes de changement",
    title: "Validé avant d'être commencé.",
    promise:
      "Gardez le budget et la relation client au clair : chaque nouvelle demande est estimée et validée avant le début du travail.",
    audience: [
      "Développeurs et designers freelances",
      "Petits studios et agences web",
      "Prestataires qui travaillent sur devis et reçoivent des demandes supplémentaires",
    ],
    problem:
      "En cours de projet, le client ajoute « une petite chose ». Sans estimation écrite ni accord, le travail s'accumule hors budget et la discussion sur le prix arrive trop tard.",
    before: [
      "Les demandes supplémentaires arrivent par email, messagerie ou à l'oral",
      "Le travail démarre avant que le prix et le délai soient validés",
      "Le désaccord sur « ce qui était prévu » arrive à la facturation",
    ],
    after: [
      "Chaque demande de changement est décrite, estimée en prix et en délai",
      "Le client valide (ou refuse) depuis un lien, avant le début du travail",
      "Un historique horodaté garde une trace claire des échanges",
    ],
    v1: [
      "Description d'une demande de changement",
      "Estimation de prix et de délai",
      "Lien de validation envoyé au client",
      "Statuts : brouillon, envoyé, accepté, refusé",
      "Historique horodaté",
    ],
    notV1: [
      "La validation n'est pas une signature électronique certifiée",
      "Aucune promesse juridique : c'est un outil de clarté entre vous et votre client",
      "Pas de facturation ni de gestion de projet complète",
    ],
    fields: { siteLabel: "Site ou portfolio (facultatif)", sitePlaceholder: "https://votre-site.fr", siteRequired: false },
    situationLabel: "Comment gérez-vous les demandes supplémentaires aujourd'hui ?",
    situationPlaceholder: "Ex : email au fil de l'eau, avenant au devis, rien de formalisé… et combien de projets en parallèle ?",
    note: "ScopeLock est un outil de clarté commerciale entre prestataire et client, pas un service de signature électronique ni un conseil juridique.",
    metaDescription:
      "Pilote SaaS ScopeLock : décrivez une demande de changement, estimez prix et délai, faites-la valider par votre client avant de commencer. Partenaire fondateur : cadrage sous 48 h, V1 pilote en 7 jours.",
    faq: [
      {
        q: "La validation du client a-t-elle une valeur légale ?",
        a: "ScopeLock n'est pas une signature électronique certifiée et ne fait aucune promesse juridique. C'est un historique horodaté qui clarifie ce que votre client a accepté ou refusé.",
      },
      {
        q: "Mon client doit-il créer un compte ?",
        a: "La V1 prévoit un lien de validation envoyé au client. Les détails d'accès sont fixés avec vous au cadrage.",
      },
      {
        q: "Que se passe-t-il pendant les 7 jours ?",
        a: "Cadrage sous 48 h, puis réalisation de la V1 pilote avec vous. Le délai de 7 jours court à compter de la validation écrite du périmètre et de la réception des accès et contenus nécessaires.",
      },
      {
        q: "Combien ça coûte ?",
        a: "Les premiers pilotes sont des offres payantes de partenaire fondateur, à prix fixe annoncé clairement avant tout engagement, avec un éventuel abonnement ensuite. Aucun montant n'est engagé avant votre accord écrit.",
      },
    ],
  },
];

export function getPilot(slug: string) {
  return pilots.find((p) => p.slug === slug);
}
