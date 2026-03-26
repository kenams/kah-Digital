import { companyConfig } from "@/config/company";
import type { Locale } from "@/lib/locales";

type Props = {
  locale: Locale;
};

const copy = {
  fr: {
    title: "Politique de confidentialite",
    eyebrow: "Protection des donnees",
    intro:
      "KAH-Digital s'engage a proteger la confidentialite et les donnees personnelles de ses utilisateurs conformement a la loi suisse sur la protection des donnees et au RGPD lorsque celui-ci s'applique.",
    sections: [
      { title: "Donnees collectees", list: ["Contact : nom, prenom, email, telephone, societe", "Devis : informations de projet, budget, delais souhaites", "Donnees techniques : IP, navigateur et pages visitees via analytics anonymes"] },
      { title: "Finalite du traitement", list: ["Repondre a vos demandes", "Fournir nos services web et produit", "Ameliorer le site et nos services", "Respecter nos obligations legales et contractuelles"] },
      { title: "Base legale", list: ["Votre consentement explicite", "L'execution de mesures precontractuelles", "Nos interets legitimes", "Le respect d'obligations legales"] },
      { title: "Duree de conservation", list: ["Contact : jusqu'a 3 ans apres le dernier echange", "Projet : duree de la relation contractuelle + 10 ans si necessaire", "Technique : jusqu'a 13 mois"] },
      { title: "Partage des donnees", list: ["Sous-traitants techniques pour hebergement, emails ou outils projet", "Partenaires dans le cadre de projets", "Autorites legales en cas d'obligation"] },
      { title: "Confidentialite des echanges projet", body: "Les informations fonctionnelles, techniques, commerciales ou organisationnelles partagees lors d'un contact, brief, demo, devis ou cadrage sont traitees comme confidentielles dans la limite de ce qui est necessaire a l'etude du projet, a l'execution d'une mission ou au respect de nos obligations." },
      { title: "Securite", body: "Nous mettons en oeuvre des mesures techniques et organisationnelles appropriees pour proteger vos donnees contre l'acces non autorise, la perte, l'alteration ou la divulgation." },
      { title: "Vos droits", body: `Vous disposez de droits d'acces, de rectification, d'effacement, de portabilite et d'opposition. Pour les exercer, contactez-nous a : ${companyConfig.email}` },
      { title: "Cookies", body: "Notre site n'utilise pas de cookies publicitaires ou marketing. Nous pouvons utiliser des cookies techniques essentiels au fonctionnement du site et des formulaires." },
      { title: "Contact", body: `Pour toute question sur cette politique : ${companyConfig.email}, ${companyConfig.address}, ${companyConfig.city}, ${companyConfig.country}.` },
      { title: "Modifications", body: "Cette politique peut etre mise a jour. La version actuelle est toujours disponible sur cette page." },
    ],
    updatedAt: "Derniere mise a jour",
    introLabel: "Introduction",
  },
  en: {
    title: "Privacy policy",
    eyebrow: "Data protection",
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
    introLabel: "Introduction",
  },
  de: {
    title: "Datenschutzerklaerung",
    eyebrow: "Datenschutz",
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
    introLabel: "Einleitung",
  },
} as const;

export function PrivacyPolicyPageContent({ locale }: Props) {
  const content = copy[locale];

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
          <section className="premium-card rounded-[32px] border border-white/10 bg-[linear-gradient(145deg,rgba(12,10,18,0.96),rgba(7,7,10,0.96))] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:p-8">
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">{content.introLabel}</h2>
            <p className="mt-4 leading-8 text-white/72">{content.intro}</p>
          </section>
          {content.sections.map((section, index) => (
            <section
              key={section.title}
              className={`rounded-[32px] border border-white/10 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:p-8 ${
                index % 2 === 0
                  ? "accent-section"
                  : "premium-card bg-[linear-gradient(145deg,rgba(12,10,18,0.96),rgba(7,7,10,0.96))]"
              }`}
            >
              <div className={index % 2 === 0 ? "content" : ""}>
                <h2 className="text-2xl font-semibold text-white sm:text-3xl">{section.title}</h2>
                {"body" in section && section.body ? <p className="mt-4 leading-8 text-white/72">{section.body}</p> : null}
                {"list" in section && section.list ? (
                  <ul className="mt-5 space-y-3 text-white/72">
                    {section.list.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--brand-gold)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
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
