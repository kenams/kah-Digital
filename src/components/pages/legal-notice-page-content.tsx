import Link from "next/link";
import { companyConfig } from "@/config/company";
import type { Locale } from "@/lib/locales";
import { withLocalePrefix } from "@/lib/locales";

type Props = {
  locale: Locale;
};

const copy = {
  fr: {
    title: "Mentions légales",
    sections: [
      {
        title: "Éditeur du site",
        lines: [
          ["Nom commercial", companyConfig.brandName],
          ["Raison sociale", companyConfig.legalName],
          ["Statut", companyConfig.registrationStatus],
          ["Adresse", companyConfig.address],
          ["Ville", `${companyConfig.postalCode} ${companyConfig.city}, ${companyConfig.country}`],
          ["Email", companyConfig.email],
          ["Téléphone", companyConfig.phone],
          ["Numéro IDE/UID", companyConfig.uid],
          ["Numéro TVA", companyConfig.vatNumber],
          ["Directeur de la publication", companyConfig.legalName],
        ],
      },
      {
        title: "Hébergement",
        paragraphs: [
          `Vercel Inc. - ${companyConfig.hosting}`,
          "Site web : vercel.com",
        ],
      },
      {
        title: "Propriété intellectuelle",
        paragraphs: [
          `L'ensemble du contenu de ce site est protégé par le droit d'auteur. Toute reproduction, distribution, modification ou publication, même partielle, est interdite sans l'accord préalable écrit de ${companyConfig.brandName}.`,
          `Les solutions, architectures, méthodes de cadrage, parcours support, mécanismes d'assistance, documentations, scripts, maquettes et schémas fonctionnels présentés par ${companyConfig.brandName} restent sa propriété exclusive sauf accord écrit contraire.`,
          `Les devis, propositions commerciales, audits, démonstrations, prototypes et livrables de présentation communiqués avant contractualisation restent la propriété de ${companyConfig.brandName}.`,
        ],
      },
      {
        title: "Données personnelles",
        paragraphs: ["Les informations recueillies via les formulaires sont utilisées uniquement pour répondre à vos demandes. Consultez notre politique de confidentialité pour plus de détails."],
      },
      {
        title: "Cookies",
        paragraphs: ["Ce site n'utilise pas de cookies de suivi ou de marketing. Seuls des cookies techniques nécessaires au fonctionnement du site peuvent être utilisés."],
      },
      {
        title: "Responsabilité",
        paragraphs: [`${companyConfig.brandName} s'efforce d'assurer l'exactitude des informations diffusées sur ce site, mais ne peut être tenu responsable d'éventuelles erreurs ou omissions.`],
      },
      {
        title: "Droit applicable",
        paragraphs: ["Les présentes mentions légales sont soumises au droit suisse. Tout litige relatif à l'utilisation de ce site relève de la compétence exclusive des tribunaux suisses."],
      },
      {
        title: "Contact",
        paragraphs: [`Pour toute question concernant ces mentions légales, vous pouvez nous contacter à l'adresse suivante : ${companyConfig.email}`],
      },
    ],
    privacyLabel: "politique de confidentialité",
    updatedAt: "Dernière mise à jour",
  },
  en: {
    title: "Legal notice",
    sections: [
      {
        title: "Site publisher",
        lines: [
          ["Brand name", companyConfig.brandName],
          ["Legal entity", companyConfig.legalName],
          ["Status", companyConfig.registrationStatus],
          ["Address", companyConfig.address],
          ["City", `${companyConfig.postalCode} ${companyConfig.city}, ${companyConfig.country}`],
          ["Email", companyConfig.email],
          ["Phone", companyConfig.phone],
          ["UID number", companyConfig.uid],
          ["VAT number", companyConfig.vatNumber],
          ["Publishing director", companyConfig.legalName],
        ],
      },
      {
        title: "Hosting",
        paragraphs: [`Vercel Inc. - ${companyConfig.hosting}`, "Website: vercel.com"],
      },
      {
        title: "Intellectual property",
        paragraphs: [
          `All content on this site is protected by copyright. Any reproduction, distribution, modification, or publication, even partial, requires the prior written approval of ${companyConfig.brandName}.`,
          `The solutions, architectures, scoping methods, support workflows, assistance mechanisms, documentation, scripts, mockups, and functional schemes presented by ${companyConfig.brandName} remain its exclusive property unless stated otherwise in writing.`,
          `Quotes, business proposals, audits, demos, prototypes, and presentation deliverables shared before signature remain the property of ${companyConfig.brandName}.`,
        ],
      },
      {
        title: "Personal data",
        paragraphs: ["Information collected through forms is used only to answer your requests. See our privacy policy for more details."],
      },
      {
        title: "Cookies",
        paragraphs: ["This site does not use marketing or tracking cookies. Only technical cookies required for the proper operation of the site may be used."],
      },
      {
        title: "Liability",
        paragraphs: [`${companyConfig.brandName} makes every effort to provide accurate information but cannot be held liable for any errors, omissions, or temporary unavailability.`],
      },
      {
        title: "Applicable law",
        paragraphs: ["This legal notice is governed by Swiss law. Any dispute related to the use of this site falls under the exclusive jurisdiction of Swiss courts."],
      },
      {
        title: "Contact",
        paragraphs: [`For any question regarding this legal notice, you can contact us at: ${companyConfig.email}`],
      },
    ],
    privacyLabel: "privacy policy",
    updatedAt: "Last update",
  },
  de: {
    title: "Impressum",
    sections: [
      {
        title: "Herausgeber der Website",
        lines: [
          ["Markenname", companyConfig.brandName],
          ["Rechtlicher Name", companyConfig.legalName],
          ["Status", companyConfig.registrationStatus],
          ["Adresse", companyConfig.address],
          ["Ort", `${companyConfig.postalCode} ${companyConfig.city}, ${companyConfig.country}`],
          ["E-Mail", companyConfig.email],
          ["Telefon", companyConfig.phone],
          ["UID-Nummer", companyConfig.uid],
          ["MWST-Nummer", companyConfig.vatNumber],
          ["Verantwortlich fuer die Publikation", companyConfig.legalName],
        ],
      },
      {
        title: "Hosting",
        paragraphs: [`Vercel Inc. - ${companyConfig.hosting}`, "Website: vercel.com"],
      },
      {
        title: "Urheberrecht",
        paragraphs: [
          `Alle Inhalte dieser Website sind urheberrechtlich geschuetzt. Jede Vervielfaeltigung, Verbreitung, Aenderung oder Veroeffentlichung bedarf der vorherigen schriftlichen Genehmigung von ${companyConfig.brandName}.`,
          `Die von ${companyConfig.brandName} vorgestellten Loesungen, Architekturen, Support-Journeys, Dokumentationen, Skripte, Mockups und funktionalen Modelle bleiben, sofern nicht schriftlich anders geregelt, dessen exklusives Eigentum.`,
          `Offerten, kommerzielle Vorschlaege, Audits, Demos, Prototypen und Konzeptdokumente, die vor Vertragsabschluss geteilt werden, bleiben Eigentum von ${companyConfig.brandName}.`,
        ],
      },
      {
        title: "Personenbezogene Daten",
        paragraphs: ["Informationen aus Formularen werden nur zur Beantwortung eurer Anfragen verwendet. Weitere Details stehen in unserer Datenschutzerklaerung."],
      },
      {
        title: "Cookies",
        paragraphs: ["Diese Website nutzt keine Marketing- oder Tracking-Cookies. Es koennen nur technisch notwendige Cookies fuer den Betrieb der Website eingesetzt werden."],
      },
      {
        title: "Haftung",
        paragraphs: [`${companyConfig.brandName} bemueht sich um korrekte Informationen, kann jedoch nicht fuer Fehler, Auslassungen oder voruebergehende Nichtverfuegbarkeit haftbar gemacht werden.`],
      },
      {
        title: "Anwendbares Recht",
        paragraphs: ["Dieses Impressum untersteht dem Schweizer Recht. Fuer Streitigkeiten im Zusammenhang mit der Nutzung dieser Website sind ausschliesslich Schweizer Gerichte zustaendig."],
      },
      {
        title: "Kontakt",
        paragraphs: [`Bei Fragen zu diesem Impressum erreicht ihr uns unter: ${companyConfig.email}`],
      },
    ],
    privacyLabel: "Datenschutzerklaerung",
    updatedAt: "Letzte Aktualisierung",
  },
} as const;

export function LegalNoticePageContent({ locale }: Props) {
  const content = copy[locale];
  const privacyHref = locale === "fr" ? "/confidentialite" : withLocalePrefix("/politique-de-confidentialite", locale);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <div className="rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-900">{content.title}</h1>

        <div className="space-y-8">
          {content.sections.map((section) => (
            <section key={section.title}>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">{section.title}</h2>
              {"lines" in section ? (
                <div className="space-y-2 text-gray-700">
                  {section.lines.filter(([, value]) => value).map(([label, value]) => (
                    <p key={label}>
                      <strong>{label} :</strong> {value}
                    </p>
                  ))}
                </div>
              ) : null}
              {"paragraphs" in section ? (
                <div className="space-y-4 text-gray-700">
                  {section.paragraphs.map((paragraph, index) => (
                    <p key={index}>
                      {section.title === content.sections[3].title && index === 0 ? (
                        <>
                          {paragraph}{" "}
                          <Link href={privacyHref} className="text-blue-600 underline">
                            {content.privacyLabel}
                          </Link>
                          .
                        </>
                      ) : (
                        paragraph
                      )}
                    </p>
                  ))}
                </div>
              ) : null}
            </section>
          ))}

          <div className="mt-12 border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
            {content.updatedAt} : {new Date().toLocaleDateString(locale === "en" ? "en-GB" : locale === "de" ? "de-CH" : "fr-FR")}
          </div>
        </div>
      </div>
    </div>
  );
}
