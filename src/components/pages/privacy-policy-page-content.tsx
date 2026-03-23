import { companyConfig } from "@/config/company";
import type { Locale } from "@/lib/locales";

type Props = {
  locale: Locale;
};

const copy = {
  fr: {
    title: "Politique de confidentialité",
    intro: "KAH-Digital s'engage à protéger la confidentialité et les données personnelles de ses utilisateurs conformément à la Loi fédérale sur la protection des données (LPD) et au RGPD lorsque celui-ci s'applique.",
    sections: [
      { title: "Données collectées", list: ["Contact : nom, prénom, email, téléphone, société", "Devis : informations de projet, budget, délais souhaités", "Données techniques : IP, navigateur et pages visitées via analytics anonymes"] },
      { title: "Finalité du traitement", list: ["Répondre à vos demandes", "Fournir nos services web et produit", "Améliorer le site et nos services", "Respecter nos obligations légales et contractuelles"] },
      { title: "Base légale", list: ["Votre consentement explicite", "L'exécution de mesures précontractuelles", "Nos intérêts légitimes", "Le respect d'obligations légales"] },
      { title: "Durée de conservation", list: ["Contact : jusqu'à 3 ans après le dernier échange", "Projet : durée de la relation contractuelle + 10 ans si nécessaire", "Technique : jusqu'à 13 mois"] },
      { title: "Partage des données", list: ["Sous-traitants techniques pour hébergement, emails ou outils projet", "Partenaires dans le cadre de projets", "Autorités légales en cas d'obligation"] },
      { title: "Confidentialité des échanges projet", body: "Les informations fonctionnelles, techniques, commerciales ou organisationnelles partagées lors d'un contact, brief, démo, devis ou cadrage sont traitées comme confidentielles dans la limite de ce qui est nécessaire à l'étude du projet, à l'exécution d'une mission ou au respect de nos obligations." },
      { title: "Sécurité", body: "Nous mettons en oeuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre l'accès non autorisé, la perte, l'altération ou la divulgation." },
      { title: "Vos droits", body: `Vous disposez de droits d'accès, de rectification, d'effacement, de portabilité et d'opposition. Pour les exercer, contactez-nous à : ${companyConfig.email}` },
      { title: "Cookies", body: "Notre site n'utilise pas de cookies publicitaires ou marketing. Nous pouvons utiliser des cookies techniques essentiels au fonctionnement du site et des formulaires." },
      { title: "Contact", body: `Pour toute question sur cette politique : ${companyConfig.email}, ${companyConfig.address}, ${companyConfig.city}, ${companyConfig.country}.` },
      { title: "Modifications", body: "Cette politique peut être mise à jour. La version actuelle est toujours disponible sur cette page." },
    ],
    updatedAt: "Dernière mise à jour",
  },
  en: {
    title: "Privacy policy",
    intro: "KAH-Digital is committed to protecting the privacy and personal data of its users in line with Swiss data protection law and GDPR where applicable.",
    sections: [
      { title: "Collected data", list: ["Contact: first name, last name, email, phone, company", "Quote forms: project information, budget, preferred timeline", "Technical data: IP address, browser, and visited pages through privacy-friendly analytics"] },
      { title: "Purpose of processing", list: ["Reply to your requests", "Provide our web and product services", "Improve the site and our services", "Meet legal and contractual obligations"] },
      { title: "Legal basis", list: ["Your explicit consent", "Pre-contractual measures", "Our legitimate interests", "Compliance with legal obligations"] },
      { title: "Retention period", list: ["Contact data: up to 3 years after the last exchange", "Project data: duration of the relationship plus 10 years when required", "Technical data: up to 13 months"] },
      { title: "Data sharing", list: ["Technical processors for hosting, email, or project tools", "Partners involved in projects", "Legal authorities when disclosure is mandatory"] },
      { title: "Confidentiality of project exchanges", body: "Functional, technical, commercial, or organisational information shared during a contact, brief, demo, quote, or scoping phase is treated as confidential within the limits reasonably necessary to study the project, perform the mission, or comply with legal obligations." },
      { title: "Security", body: "We implement appropriate technical and organisational measures to protect your data against unauthorised access, loss, alteration, or disclosure." },
      { title: "Your rights", body: `You may request access, correction, deletion, portability, or object to processing. To exercise these rights, contact us at ${companyConfig.email}.` },
      { title: "Cookies", body: "This site does not use marketing cookies. We may use essential technical cookies required for navigation and forms." },
      { title: "Contact", body: `For any question about this policy: ${companyConfig.email}, ${companyConfig.address}, ${companyConfig.city}, ${companyConfig.country}.` },
      { title: "Changes", body: "This policy may be updated. The latest version is always available on this page." },
    ],
    updatedAt: "Last update",
  },
  de: {
    title: "Datenschutzerklaerung",
    intro: "KAH-Digital verpflichtet sich zum Schutz der Privatsphaere und der personenbezogenen Daten seiner Nutzer gemaess Schweizer Datenschutzrecht und, soweit anwendbar, der DSGVO.",
    sections: [
      { title: "Erhobene Daten", list: ["Kontakt: Vorname, Nachname, E-Mail, Telefon, Unternehmen", "Anfrageformulare: Projektinformationen, Budget und gewuenschter Zeitrahmen", "Technische Daten: IP-Adresse, Browser und besuchte Seiten ueber datenschutzfreundliche Analytics"] },
      { title: "Zweck der Verarbeitung", list: ["Eure Anfragen beantworten", "Unsere Web- und Produktleistungen erbringen", "Website und Services verbessern", "Gesetzliche und vertragliche Pflichten erfuellen"] },
      { title: "Rechtsgrundlage", list: ["Eure ausdrueckliche Einwilligung", "Vorvertragliche Massnahmen", "Unsere berechtigten Interessen", "Gesetzliche Verpflichtungen"] },
      { title: "Speicherdauer", list: ["Kontaktdaten: bis zu 3 Jahre nach dem letzten Austausch", "Projektdaten: Dauer der Zusammenarbeit plus 10 Jahre wenn erforderlich", "Technische Daten: bis zu 13 Monate"] },
      { title: "Weitergabe von Daten", list: ["Technische Dienstleister fuer Hosting, E-Mail oder Projekttools", "Partner im Rahmen von Projekten", "Behoerden bei gesetzlicher Pflicht"] },
      { title: "Vertraulichkeit bei Projektaustausch", body: "Funktionale, technische, kommerzielle oder organisatorische Informationen, die im Rahmen eines Kontakts, Briefings, einer Demo, Offerte oder Scoping-Phase geteilt werden, behandeln wir als vertraulich, soweit dies fuer Projektpruefung, Auftragserfuellung oder rechtliche Pflichten notwendig ist." },
      { title: "Sicherheit", body: "Wir setzen geeignete technische und organisatorische Massnahmen ein, um eure Daten vor unbefugtem Zugriff, Verlust, Veraenderung oder Offenlegung zu schuetzen." },
      { title: "Eure Rechte", body: `Ihr habt Rechte auf Auskunft, Berichtigung, Loeschung, Datenportabilitaet und Widerspruch. Zur Ausuebung dieser Rechte erreicht ihr uns unter ${companyConfig.email}.` },
      { title: "Cookies", body: "Diese Website verwendet keine Marketing-Cookies. Es koennen technisch notwendige Cookies fuer Navigation und Formulare eingesetzt werden." },
      { title: "Kontakt", body: `Bei Fragen zu dieser Datenschutzerklaerung: ${companyConfig.email}, ${companyConfig.address}, ${companyConfig.city}, ${companyConfig.country}.` },
      { title: "Aenderungen", body: "Diese Richtlinie kann aktualisiert werden. Die jeweils aktuelle Version steht immer auf dieser Seite." },
    ],
    updatedAt: "Letzte Aktualisierung",
  },
} as const;

export function PrivacyPolicyPageContent({ locale }: Props) {
  const content = copy[locale];

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <div className="rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-900">{content.title}</h1>
        <div className="space-y-8">
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">{locale === "en" ? "Introduction" : locale === "de" ? "Einleitung" : "Introduction"}</h2>
            <p className="text-gray-700">{content.intro}</p>
          </section>
          {content.sections.map((section) => (
            <section key={section.title}>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">{section.title}</h2>
              {"body" in section && section.body ? <p className="text-gray-700">{section.body}</p> : null}
              {"list" in section && section.list ? (
                <ul className="ml-4 mt-4 list-disc space-y-2 text-gray-700">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
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
