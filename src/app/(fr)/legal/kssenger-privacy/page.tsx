import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité — K-ssenger",
  description:
    "Politique de confidentialité de l'application K-ssenger, éditée par KAH Digital.",
  alternates: {
    canonical: "/legal/kssenger-privacy",
  },
};

const sections: { title: string; paragraphs?: string[]; items?: string[] }[] = [
  {
    title: "Ce que K-ssenger fait",
    paragraphs: [
      "K-ssenger est une application de messagerie personnelle. Les conversations privées et de groupe sont chiffrées de bout en bout (protocole de type Signal) : le contenu de vos messages est chiffré sur votre appareil avant d'être transmis, et n'est déchiffré que sur l'appareil du ou des destinataires. KAH Digital n'a pas techniquement accès au contenu de vos messages.",
    ],
  },
  {
    title: "Données collectées",
    items: [
      "Compte : identifiant de connexion (email ou téléphone selon la méthode choisie) nécessaire pour créer et retrouver votre compte.",
      "Messages : le contenu est chiffré de bout en bout et stocké chiffré sur nos serveurs le temps de la livraison (relais), de façon à pouvoir vous être délivré même si votre appareil est hors ligne.",
      "Métadonnées techniques minimales : identifiants d'appareil et jetons de notification push (Firebase Cloud Messaging), nécessaires pour vous envoyer une alerte quand vous recevez un message.",
      "Position (optionnelle) : uniquement si vous choisissez explicitement de partager votre position dans une conversation. Jamais collectée en arrière-plan.",
      "Photos, vidéos, micro (optionnels) : uniquement pour les médias que vous choisissez vous-même de partager (galerie, caméra, message vocal).",
    ],
  },
  {
    title: "Ce que nous ne faisons pas",
    items: [
      "Nous ne lisons pas et ne pouvons pas lire le contenu de vos messages (chiffrement de bout en bout).",
      "Nous ne vendons aucune donnée à des tiers.",
      "Nous n'utilisons pas de traceurs publicitaires ni d'outils d'analytics tiers (pas de Google Analytics, Meta Pixel, etc.).",
      "Nous ne partageons pas vos contacts ou vos conversations avec des tiers.",
    ],
  },
  {
    title: "Services tiers utilisés",
    items: [
      "Firebase Cloud Messaging (Google) : uniquement pour l'envoi des notifications push. Google traite un identifiant d'appareil technique, jamais le contenu de vos messages.",
      "Hébergement infrastructure : les données chiffrées transitent et sont relayées via nos serveurs (Render) et notre base de données (Neon), situés en Europe.",
    ],
  },
  {
    title: "Vos droits",
    paragraphs: [
      "Vous pouvez à tout moment demander la suppression de votre compte et de vos données depuis l'application (Profil → Données du compte), ou en nous contactant à contact@kah-digital.ch. Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données.",
    ],
  },
  {
    title: "Conservation des données",
    paragraphs: [
      "Les messages chiffrés sont supprimés de nos serveurs relais une fois livrés à tous les destinataires. Les données de compte sont conservées tant que votre compte est actif, et supprimées dans un délai raisonnable après suppression de compte.",
    ],
  },
  {
    title: "Enfants",
    paragraphs: ["K-ssenger n'est pas destiné aux enfants de moins de 16 ans."],
  },
  {
    title: "Modifications",
    paragraphs: [
      "Cette politique peut être mise à jour ; toute modification substantielle sera signalée dans l'application.",
    ],
  },
];

export default function KssengerPrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-center text-3xl font-bold text-gray-900">
          Politique de confidentialité — K-ssenger
        </h1>
        <p className="mb-8 text-center text-sm text-gray-500">
          Éditeur : KAH Digital — Contact : contact@kah-digital.ch — Dernière mise à jour : 24 septembre 2026
        </p>

        <div className="space-y-8">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">{section.title}</h2>
              {section.paragraphs ? (
                <div className="space-y-4 text-gray-700">
                  {section.paragraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              ) : null}
              {section.items ? (
                <ul className="list-disc space-y-2 pl-6 text-gray-700">
                  {section.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          <div className="mt-12 border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
            KAH Digital — {new Date().toLocaleDateString("fr-FR")}
          </div>
        </div>
      </div>
    </div>
  );
}
