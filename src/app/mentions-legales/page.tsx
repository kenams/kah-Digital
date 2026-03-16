import { Metadata } from "next";
import { companyConfig } from "@/config/company";

export const metadata: Metadata = {
  title: "Mentions legales",
  description: "Mentions legales de KAH-Digital. Informations juridiques et administratives.",
};

export default function MentionsLegalesPage() {
  const displayName = companyConfig.brandName || "KAH-Digital";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Mentions legales</h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Editeur du site</h2>
            <div className="text-gray-700 space-y-2">
              <p><strong>Nom commercial :</strong> {companyConfig.brandName}</p>
              <p><strong>Raison sociale :</strong> {companyConfig.legalName}</p>
              <p><strong>Statut :</strong> {companyConfig.registrationStatus}</p>
              <p><strong>Adresse :</strong> {companyConfig.address}</p>
              <p><strong>Ville :</strong> {companyConfig.postalCode} {companyConfig.city}, {companyConfig.country}</p>
              <p><strong>Email :</strong> {companyConfig.email}</p>
              <p><strong>Telephone :</strong> {companyConfig.phone}</p>
              {companyConfig.uid ? <p><strong>Numero IDE/UID :</strong> {companyConfig.uid}</p> : null}
              {companyConfig.vatNumber ? <p><strong>Numero TVA :</strong> {companyConfig.vatNumber}</p> : null}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Directeur de la publication</h2>
            <p className="text-gray-700">{companyConfig.legalName}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Hebergement</h2>
            <div className="text-gray-700 space-y-2">
              <p><strong>Vercel Inc.</strong></p>
              <p>{companyConfig.hosting}</p>
              <p>
                <strong>Site web :</strong>{" "}
                <a href="https://vercel.com" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
                  vercel.com
                </a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Propriete intellectuelle</h2>
            <p className="text-gray-700">
              L'ensemble du contenu de ce site (textes, images, graphismes, logos, icones, sons, logiciels) est protege par le droit d'auteur.
              Toute reproduction, distribution, modification ou publication, meme partielle, de ces differents elements est strictement interdite
              sans l'accord prealable ecrit de {displayName}.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Donnees personnelles</h2>
            <p className="text-gray-700">
              Conformement a la Loi federale sur la protection des donnees (LPD), les informations recueillies via les formulaires de contact
              sont utilisees uniquement pour repondre a vos demandes. Elles ne sont ni vendues ni transmises a des tiers.
              Consultez notre <a href="/confidentialite" className="text-blue-600 underline">politique de confidentialite</a> pour plus de details.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cookies</h2>
            <p className="text-gray-700">
              Ce site n'utilise pas de cookies de suivi ou de marketing. Seuls des cookies techniques necessaires au fonctionnement du site
              peuvent etre utilises (par exemple pour la navigation ou les formulaires).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Responsabilite</h2>
            <p className="text-gray-700">
              {displayName} s'efforce d'assurer l'exactitude des informations diffusees sur ce site, mais ne peut etre tenu responsable
              d'eventuelles erreurs ou omissions. L'utilisation des informations et outils disponibles sur ce site se fait sous la
              responsabilite exclusive de l'utilisateur.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Droit applicable</h2>
            <p className="text-gray-700">
              Les presentes mentions legales sont soumises au droit suisse. Tout litige relatif a l'utilisation de ce site sera
              de la competence exclusive des tribunaux suisses.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact</h2>
            <p className="text-gray-700">
              Pour toute question concernant ces mentions legales, vous pouvez nous contacter a l'adresse suivante : {companyConfig.email}
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
