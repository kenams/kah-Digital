import Link from "next/link";
import { companyConfig } from "@/config/company";
import type { Locale } from "@/lib/locales";
import { withLocalePrefix } from "@/lib/locales";

type Props = {
  locale: Locale;
};

const copy = {
  fr: {
    title: "Mentions legales",
    eyebrow: "Cadre legal",
    intro:
      "Les informations juridiques et administratives de KAH-Digital sont centralisees ici dans un format plus lisible, sans habillage inutile.",
    sections: [
      {
        title: "Editeur du site",
        lines: [
          ["Nom commercial", companyConfig.brandName],
          ["Raison sociale", companyConfig.legalName],
          ["Statut", companyConfig.registrationStatus],
          ["Adresse", companyConfig.address],
          ["Ville", `${companyConfig.postalCode} ${companyConfig.city}, ${companyConfig.country}`],
          ["Email", companyConfig.email],
          ["Telephone", companyConfig.phone],
          ["Numero IDE/UID", companyConfig.uid],
          ["Numero TVA", companyConfig.vatNumber],
          ["Directeur de la publication", companyConfig.legalName],
        ],
      },
      {
        title: "Hebergement",
        paragraphs: [`Vercel Inc. - ${companyConfig.hosting}`, "Site web : vercel.com"],
      },
      {
        title: "Propriete intellectuelle",
        paragraphs: [
          `L'ensemble du contenu de ce site est protege par le droit d'auteur. Toute reproduction, distribution, modification ou publication, meme partielle, est interdite sans l'accord prealable ecrit de ${companyConfig.brandName}.`,
          `Les solutions, architectures, methodes de cadrage, parcours support, mecanismes d'assistance, documentations, scripts, maquettes et schemas fonctionnels presentes par ${companyConfig.brandName} restent sa propriete exclusive sauf accord ecrit contraire.`,
          `Les devis, propositions commerciales, audits, demonstrations, prototypes et livrables de presentation communiques avant contractualisation restent la propriete de ${companyConfig.brandName}.`,
        ],
      },
      {
        title: "Donnees personnelles",
        paragraphs: ["Les informations recueillies via les formulaires sont utilisees uniquement pour repondre a vos demandes. Consultez notre politique de confidentialite pour plus de details."],
      },
      {
        title: "Cookies",
        paragraphs: ["Ce site n'utilise pas de cookies de suivi ou de marketing. Seuls des cookies techniques necessaires au fonctionnement du site peuvent etre utilises."],
      },
      {
        title: "Responsabilite",
        paragraphs: [`${companyConfig.brandName} s'efforce d'assurer l'exactitude des informations diffusees sur ce site, mais ne peut etre tenu responsable d'eventuelles erreurs ou omissions.`],
      },
      {
        title: "Droit applicable",
        paragraphs: ["Les presentes mentions legales sont soumises au droit suisse. Tout litige relatif a l'utilisation de ce site releve de la competence exclusive des tribunaux suisses."],
      },
      {
        title: "Contact",
        paragraphs: [`Pour toute question concernant ces mentions legales, vous pouvez nous contacter a l'adresse suivante : ${companyConfig.email}`],
      },
    ],
    privacyLabel: "politique de confidentialite",
    updatedAt: "Derniere mise a jour",
  },
  en: {
    title: "Legal notice",
    eyebrow: "Legal frame",
    intro: "The legal and administrative information for KAH-Digital is centralised here in a cleaner, easier-to-read format.",
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
    eyebrow: "Rechtlicher Rahmen",
    intro: "Die rechtlichen und administrativen Informationen von KAH-Digital sind hier in einem klareren und lesbareren Format zusammengefasst.",
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
    <>
      <section className="section-shell pt-8 sm:pt-10 lg:pt-12">
        <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[linear-gradient(135deg,rgba(9,8,7,0.96),rgba(18,14,28,0.96))] p-6 shadow-[0_40px_140px_rgba(0,0,0,0.45)] sm:p-8 lg:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(214,179,106,0.16),transparent_30%),radial-gradient(circle_at_82%_20%,rgba(127,184,199,0.14),transparent_24%)]" />
          <div className="relative text-white">
            <p className="text-sm uppercase tracking-[0.35em] text-white/52">{content.eyebrow}</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold sm:text-5xl lg:text-6xl">{content.title}</h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-white/72 sm:text-lg">{content.intro}</p>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="space-y-6">
          {content.sections.map((section, index) => (
            <section
              key={section.title}
              className={`rounded-[32px] border border-white/10 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:p-8 ${
                index % 2 === 0
                  ? "premium-card bg-[linear-gradient(145deg,rgba(12,10,18,0.96),rgba(7,7,10,0.96))]"
                  : "accent-section"
              }`}
            >
              <div className={index % 2 === 0 ? "" : "content"}>
                <h2 className="text-2xl font-semibold text-white sm:text-3xl">{section.title}</h2>
                {"lines" in section ? (
                  <div className="mt-5 space-y-3 text-white/72">
                    {section.lines.filter(([, value]) => value).map(([label, value]) => (
                      <p key={label} className="leading-7">
                        <span className="font-semibold text-white">{label}:</span> {value}
                      </p>
                    ))}
                  </div>
                ) : null}
                {"paragraphs" in section ? (
                  <div className="mt-5 space-y-4 text-white/72">
                    {section.paragraphs.map((paragraph, paragraphIndex) => (
                      <p key={paragraphIndex} className="leading-8">
                        {section.title === content.sections[3].title && paragraphIndex === 0 ? (
                          <>
                            {paragraph}{" "}
                            <Link href={privacyHref} className="text-white underline decoration-white/40 underline-offset-4 hover:decoration-white">
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
              </div>
            </section>
          ))}
        </div>

        <div className="mt-10 text-center text-sm text-white/45">
          {content.updatedAt}: {new Date().toLocaleDateString(locale === "en" ? "en-GB" : locale === "de" ? "de-CH" : "fr-FR")}
        </div>
      </section>
    </>
  );
}
