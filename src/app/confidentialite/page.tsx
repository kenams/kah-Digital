import { Metadata } from "next";
import { companyConfig } from "@/config/company";

export const metadata: Metadata = {
  title: "Politique de confidentialite",
  description: "Politique de confidentialite de KAH-Digital. Protection des donnees personnelles et RGPD.",
  alternates: {
    canonical: "/confidentialite",
  },
};

export default function ConfidentialitePage() {
  const displayName = companyConfig.brandName || "KAH-Digital";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Politique de confidentialite</h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Introduction</h2>
            <p className="text-gray-700">
              {displayName} s'engage a proteger la confidentialite et les donnees personnelles de ses utilisateurs
              conformement a la Loi federale sur la protection des donnees (LPD) et au Reglement general sur la
              protection des donnees (RGPD) applicable aux residents europeens.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Donnees collectees</h2>
            <div className="text-gray-700 space-y-4">
              <p>Nous collectons uniquement les donnees necessaires au traitement de vos demandes :</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Formulaire de contact :</strong> nom, prenom, email, telephone, societe</li>
                <li><strong>Formulaire de devis :</strong> informations de projet, budget, delais souhaites</li>
                <li><strong>Donnees techniques :</strong> adresse IP, navigateur, pages visitees (via analytics anonymes)</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Finalite du traitement</h2>
            <div className="text-gray-700 space-y-4">
              <p>Vos donnees sont utilisees exclusivement pour :</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Repondre a vos demandes de contact et devis</li>
                <li>Fournir nos services de developpement web</li>
                <li>Ameliorer notre site web et nos services</li>
                <li>Respecter nos obligations legales et contractuelles</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Base legale</h2>
            <p className="text-gray-700">Le traitement de vos donnees personnelles repose sur :</p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
              <li>Votre consentement explicite lors de l'envoi de formulaires</li>
              <li>L'execution de mesures precontractuelles (devis, contrats)</li>
              <li>Nos interets legitimes pour ameliorer nos services</li>
              <li>Le respect d'obligations legales</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Duree de conservation</h2>
            <div className="text-gray-700 space-y-4">
              <p>Nous conservons vos donnees pour la duree necessaire :</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Donnees de contact :</strong> 3 ans apres le dernier contact</li>
                <li><strong>Donnees de projet :</strong> duree de la relation contractuelle + 10 ans (obligations fiscales)</li>
                <li><strong>Donnees techniques :</strong> 13 mois maximum</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Partage des donnees</h2>
            <p className="text-gray-700">Vos donnees ne sont jamais vendues a des tiers. Elles peuvent etre partagees uniquement avec :</p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
              <li>Nos sous-traitants techniques (hebergement Vercel, emails)</li>
              <li>Nos partenaires commerciaux dans le cadre de projets</li>
              <li>Les autorites legales en cas d'obligation</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Securite</h2>
            <p className="text-gray-700">
              Nous mettons en oeuvre des mesures techniques et organisationnelles appropriees pour proteger vos donnees
              contre l'acces non autorise, la perte, l'alteration ou la divulgation. Cela inclut le chiffrement,
              les sauvegardes regulieres et l'acces restreint aux donnees.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Vos droits</h2>
            <div className="text-gray-700 space-y-4">
              <p>Conformement a la LPD, vous disposez des droits suivants :</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Droit d'acces :</strong> connaitre les donnees que nous detenons sur vous</li>
                <li><strong>Droit de rectification :</strong> corriger des donnees inexactes</li>
                <li><strong>Droit a l'effacement :</strong> supprimer vos donnees dans certains cas</li>
                <li><strong>Droit a la portabilite :</strong> recevoir vos donnees dans un format structure</li>
                <li><strong>Droit d'opposition :</strong> refuser le traitement de vos donnees</li>
              </ul>
              <p>Pour exercer ces droits, contactez-nous a : {companyConfig.email}</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cookies</h2>
            <p className="text-gray-700">
              Notre site n'utilise pas de cookies de suivi publicitaire ou de marketing. Nous pouvons utiliser
              des cookies techniques essentiels au fonctionnement du site (par exemple pour les formulaires
              ou la navigation). Ces cookies ne collectent pas de donnees personnelles identifiables.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact</h2>
            <p className="text-gray-700">Pour toute question sur cette politique ou pour exercer vos droits :</p>
            <div className="mt-4 text-gray-700">
              <p><strong>Email :</strong> {companyConfig.email}</p>
              <p><strong>Adresse :</strong> {companyConfig.address}, {companyConfig.city}, {companyConfig.country}</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Modifications</h2>
            <p className="text-gray-700">
              Cette politique peut etre mise a jour. La version actuelle est toujours disponible sur cette page.
              Nous vous informerons de tout changement important par email.
            </p>
          </section>

          <div className="text-center text-sm text-gray-500 mt-12 pt-8 border-t border-gray-200">
            Derniere mise a jour : {new Date().toLocaleDateString("fr-FR")}
          </div>
        </div>
      </div>
    </div>
  );
}
