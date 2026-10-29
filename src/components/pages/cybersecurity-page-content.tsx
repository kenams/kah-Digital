import Link from "next/link";
import {
  FiArrowRight,
  FiAward,
  FiCheck,
  FiClipboard,
  FiFileText,
  FiLock,
  FiSearch,
  FiShield,
  FiTarget,
  FiUsers,
} from "react-icons/fi";
import type { IconType } from "react-icons";
import type { Locale } from "@/lib/locales";
import { withLocalePrefix } from "@/lib/locales";

type Props = { locale: Locale };

type Offer = {
  icon: IconType;
  title: string;
  price: string;
  unit: string;
  forWho: string;
  items: string[];
};

type Copy = {
  eyebrow: string;
  title: string;
  title2: string;
  intro: string;
  ctaPrimary: string;
  ctaSecondary: string;
  proof: { value: string; label: string }[];
  audienceTitle: string;
  audience: { title: string; desc: string }[];
  offersTitle: string;
  offersIntro: string;
  offers: Offer[];
  quoteNote: string;
  methodTitle: string;
  steps: { title: string; desc: string }[];
  expertTitle: string;
  expertIntro: string;
  skills: { group: string; items: string[] }[];
  credentials: string[];
  trackTitle: string;
  track: string[];
  limitsTitle: string;
  limits: string;
  webTitle: string;
  webBody: string;
  webCta: string;
  ctaTitle: string;
  ctaBody: string;
  ctaButton: string;
  ctaSub: string;
};

const COPY: Record<Locale, Copy> = {
  fr: {
    eyebrow: "Cybersécurité & conformité",
    title: "Une sécurité et une conformité",
    title2: "claires, chiffrées et suivies.",
    intro:
      "KAH Digital Studio s'appuie sur Vincent L’helgoual’ch, expert cybersécurité et conformité : 11 ans d'IT dont 7 en cybersécurité. On vous dit où vous en êtes, ce qui compte vraiment et dans quel ordre agir, puis on pilote la mise en œuvre. Sans jargon, avec un prix annoncé avant de commencer.",
    ctaPrimary: "Demander un diagnostic",
    ctaSecondary: "Poser une question",
    proof: [
      { value: "11 ans", label: "d'IT, dont 7 en cybersécurité" },
      { value: "ISO 27001 · RGPD", label: "DORA · EBIOS RM · NIST" },
      { value: "100+", label: "projets accompagnés" },
      { value: "30+", label: "tests d'intrusion suivis" },
    ],
    audienceTitle: "Pour qui",
    audience: [
      {
        title: "TPE et PME",
        desc: "Savoir si vos accès, sauvegardes, messageries et postes tiennent face aux risques courants, et être en règle avec le RGPD.",
      },
      {
        title: "Professions réglementées et intermédiaires financiers",
        desc: "Cabinets, courtiers, assureurs, conseillers : exigences RGPD, gestion des prestataires et résilience numérique (DORA).",
      },
      {
        title: "Startups et éditeurs SaaS",
        desc: "Sécurité intégrée à vos projets : revue des pipelines CI/CD, gestion des secrets, durcissement des serveurs Linux, tests applicatifs.",
      },
      {
        title: "Entreprises qui répondent à un client exigeant",
        desc: "Questionnaire de sécurité, audit client, clause contractuelle : on prépare les preuves et le plan d'action qui rassurent.",
      },
    ],
    offersTitle: "Les prestations",
    offersIntro: "Un périmètre clair et un prix annoncé. Les prix s'entendent hors taxes ; le devis est envoyé sous 48 h après un premier échange gratuit de 30 minutes.",
    offers: [
      {
        icon: FiSearch,
        title: "Diagnostic cybersécurité",
        price: "dès 1 000 €",
        unit: "HT · 1 à 2 jours",
        forWho: "Pour savoir où vous en êtes, sans vous noyer dans un audit de 200 pages.",
        items: [
          "État des lieux : accès, mots de passe et double authentification, sauvegardes, mises à jour, messagerie, postes",
          "Revue de la configuration cloud et Microsoft 365 / Azure de base",
          "Rapport lisible, risques classés par priorité",
          "Plan d'action chiffré sur 90 jours",
        ],
      },
      {
        icon: FiFileText,
        title: "Mise en conformité RGPD",
        price: "dès 3 000 €",
        unit: "HT · 2 à 4 semaines",
        forWho: "Pour être en règle et pouvoir le prouver, sans immobiliser vos équipes.",
        items: [
          "Registre des traitements et cartographie des données",
          "Politique de confidentialité, mentions, gestion des cookies",
          "Procédure de réponse aux demandes (accès, effacement) et gestion des violations",
          "Évaluation de vos prestataires et sous-traitants",
        ],
      },
      {
        icon: FiTarget,
        title: "Analyse de risques EBIOS RM",
        price: "dès 6 000 €",
        unit: "HT · sur devis",
        forWho: "Pour décider vos investissements sécurité sur des risques réels, pas sur des impressions.",
        items: [
          "Cadrage et périmètre de l'étude",
          "Scénarios de risque et niveaux de gravité / vraisemblance",
          "Mesures de traitement priorisées et budgétées",
          "Restitution à la direction",
        ],
      },
      {
        icon: FiUsers,
        title: "Sensibilisation des équipes",
        price: "dès 1 000 €",
        unit: "HT · 1 session, préparation incluse",
        forWho: "Pour faire de vos équipes la première ligne de défense.",
        items: [
          "Hameçonnage, mots de passe, usages mobiles, télétravail",
          "Version développeurs : gestion des secrets, sécurité dans les projets",
          "Exemples tirés de cas réels, supports remis",
          "Jusqu'à 15 personnes par session",
        ],
      },
      {
        icon: FiShield,
        title: "RSSI à temps partagé",
        price: "dès 1 900 €",
        unit: "HT / mois · 2 jours par mois, sans engagement long",
        forWho: "Un responsable sécurité à la journée, sans en recruter un.",
        items: [
          "Roadmap sécurité annuelle et tableau de bord",
          "Cadrage des audits et tests d'intrusion, choix des prestataires, suivi des corrections",
          "Animation d'un comité sécurité, reporting à la direction",
          "Revue sécurité des nouveaux projets",
        ],
      },
      {
        icon: FiClipboard,
        title: "Accompagnement réglementaire",
        price: "sur devis",
        unit: "ISO 27001 · DORA · NIST",
        forWho: "Pour structurer un programme de conformité et le tenir dans la durée.",
        items: [
          "Écarts par rapport au référentiel visé et feuille de route",
          "Rédaction de la documentation et des politiques",
          "Pilotage du programme, comités, suivi des plans d'actions",
          "Préparation aux audits internes et externes",
        ],
      },
    ],
    quoteNote: "Besoin d'un format différent ou d'un périmètre plus large ? Chaque mission est cadrée sur mesure.",
    methodTitle: "Comment on travaille",
    steps: [
      { title: "Échange gratuit de 30 minutes", desc: "On comprend votre activité, vos contraintes et ce qui vous inquiète." },
      { title: "Diagnostic", desc: "On regarde l'existant et on classe ce qui compte par ordre d'importance." },
      { title: "Plan d'action chiffré", desc: "Vous savez quoi faire, dans quel ordre, pour quel budget." },
      { title: "Mise en œuvre et suivi", desc: "On pilote ou on vous accompagne, avec un point régulier jusqu'aux preuves de conformité." },
    ],
    expertTitle: "Votre expert : Vincent L’helgoual’ch",
    expertIntro:
      "Vincent est un profil de terrain, formé en sécurité informatique (Master Sécurité Informatique), qui a travaillé aussi bien côté technique que côté gouvernance, dans de grandes organisations.",
    skills: [
      { group: "Gouvernance et conformité", items: ["ISO 27001 / 27005", "NIST, CIS", "RGPD, Privacy by Design", "DORA", "EBIOS RM", "Gestion des tiers (TPRM)"] },
      { group: "Pilotage sécurité", items: ["Programmes et roadmaps sécurité", "Audits et tests d'intrusion : cadrage et suivi", "Comités opérationnels et de pilotage", "Sensibilisation"] },
      { group: "Technique et outils", items: ["Scans de vulnérabilités web (DAST)", "CI/CD, Jenkins, gestion des secrets (Vault)", "Durcissement Linux (CIS)", "Azure, ServiceNow"] },
    ],
    credentials: ["Master Sécurité Informatique", "CSX Fundamentals (ISACA)", "EBIOS RM (EGÉRIE)", "Anglais courant (TOEIC 970)"],
    trackTitle: "Dans les missions précédentes de Vincent",
    track: [
      "Plus de 100 projets accompagnés sur la conformité et la sécurité",
      "Plus de 30 tests d'intrusion suivis, avec plans de correction",
      "Programme NIST déployé sur plus de 30 entités internationales",
      "Sessions de sensibilisation pour équipes IT et développeurs",
    ],
    limitsTitle: "Ce qu'on fait et ce qu'on ne fait pas",
    limits:
      "Nous cadrons, pilotons et suivons les audits et les tests d'intrusion. Les tests offensifs eux-mêmes sont confiés à un prestataire spécialisé que nous aidons à choisir. Aucune mission n'est lancée sans accord écrit sur le périmètre, et vos données restent confidentielles.",
    webTitle: "Un site web livré sécurisé",
    webBody:
      "Pour nos clients web : revue de sécurité du site (en-têtes, accès, sauvegardes) et mentions légales, cookies et formulaires conformes au RGPD, en option à partir de 490 € HT.",
    webCta: "Voir les offres web",
    ctaTitle: "Savoir où vous en êtes en 2 jours",
    ctaBody: "Un échange de 30 minutes, gratuit. Vous repartez avec une idée claire du périmètre et du prix, sans engagement.",
    ctaButton: "Demander un diagnostic",
    ctaSub: "Réponse sous 24 h ouvrées · Devis sous 48 h",
  },
  en: {
    eyebrow: "Cybersecurity & compliance",
    title: "Security and compliance that are",
    title2: "clear, priced and followed through.",
    intro:
      "KAH Digital Studio works with Vincent L’helgoual’ch, a cybersecurity and compliance expert: 11 years in IT, 7 of them in cybersecurity. We tell you where you stand, what really matters and in which order to act, then we lead the implementation. No jargon, and the price is agreed before we start.",
    ctaPrimary: "Request an assessment",
    ctaSecondary: "Ask a question",
    proof: [
      { value: "11 years", label: "in IT, 7 in cybersecurity" },
      { value: "ISO 27001 · GDPR", label: "DORA · EBIOS RM · NIST" },
      { value: "100+", label: "projects supported" },
      { value: "30+", label: "penetration tests followed" },
    ],
    audienceTitle: "Who it is for",
    audience: [
      {
        title: "Small and mid-sized businesses",
        desc: "Know whether your access, backups, email and devices stand up to common threats, and be compliant with GDPR.",
      },
      {
        title: "Regulated professions and financial intermediaries",
        desc: "Firms, brokers, insurers, advisers: GDPR requirements, supplier management and digital operational resilience (DORA).",
      },
      {
        title: "Startups and SaaS vendors",
        desc: "Security built into your projects: CI/CD pipeline review, secrets management, Linux server hardening, application testing.",
      },
      {
        title: "Companies answering a demanding customer",
        desc: "Security questionnaire, customer audit, contract clause: we prepare the evidence and the action plan that reassure.",
      },
    ],
    offersTitle: "Services",
    offersIntro: "A clear scope and a stated price. Prices exclude tax; a quote is sent within 48 hours after a free 30-minute call.",
    offers: [
      {
        icon: FiSearch,
        title: "Cybersecurity assessment",
        price: "from €1,000",
        unit: "excl. tax · 1 to 2 days",
        forWho: "To know where you stand, without a 200-page audit.",
        items: [
          "Baseline review: access, passwords and two-factor authentication, backups, updates, email, devices",
          "Basic cloud and Microsoft 365 / Azure configuration review",
          "Readable report, risks ranked by priority",
          "Costed 90-day action plan",
        ],
      },
      {
        icon: FiFileText,
        title: "GDPR compliance",
        price: "from €3,000",
        unit: "excl. tax · 2 to 4 weeks",
        forWho: "To be compliant and able to prove it, without tying up your teams.",
        items: [
          "Record of processing and data mapping",
          "Privacy policy, legal notices, cookie management",
          "Procedure for data subject requests (access, erasure) and breach handling",
          "Assessment of your suppliers and processors",
        ],
      },
      {
        icon: FiTarget,
        title: "EBIOS RM risk analysis",
        price: "from €6,000",
        unit: "excl. tax · on quote",
        forWho: "To decide your security spending on real risks, not impressions.",
        items: [
          "Study scoping",
          "Risk scenarios with severity and likelihood levels",
          "Prioritised, budgeted treatment measures",
          "Presentation to management",
        ],
      },
      {
        icon: FiUsers,
        title: "Team awareness training",
        price: "from €1,000",
        unit: "excl. tax · 1 session, preparation included",
        forWho: "To turn your people into the first line of defence.",
        items: [
          "Phishing, passwords, mobile use, remote work",
          "Developer edition: secrets management, security in projects",
          "Examples drawn from real cases, materials provided",
          "Up to 15 people per session",
        ],
      },
      {
        icon: FiShield,
        title: "Part-time security officer",
        price: "from €1,900",
        unit: "excl. tax / month · 2 days per month, no long commitment",
        forWho: "A security lead by the day, without hiring one.",
        items: [
          "Annual security roadmap and dashboard",
          "Scoping of audits and penetration tests, supplier selection, follow-up of fixes",
          "Security committee leadership, reporting to management",
          "Security review of new projects",
        ],
      },
      {
        icon: FiClipboard,
        title: "Regulatory support",
        price: "on quote",
        unit: "ISO 27001 · DORA · NIST",
        forWho: "To structure a compliance programme and sustain it over time.",
        items: [
          "Gap analysis against the target framework and roadmap",
          "Writing documentation and policies",
          "Programme management, committees, action plan follow-up",
          "Preparation for internal and external audits",
        ],
      },
    ],
    quoteNote: "Need a different format or a wider scope? Every engagement is scoped to fit.",
    methodTitle: "How we work",
    steps: [
      { title: "Free 30-minute call", desc: "We understand your business, your constraints and what worries you." },
      { title: "Assessment", desc: "We review what exists and rank what matters most." },
      { title: "Costed action plan", desc: "You know what to do, in which order and for what budget." },
      { title: "Delivery and follow-up", desc: "We lead or support delivery, with regular check-ins until the compliance evidence is in place." },
    ],
    expertTitle: "Your expert: Vincent L’helgoual’ch",
    expertIntro:
      "Vincent is a field-tested profile, trained in information security (Master's degree), who has worked on both the technical and governance sides in large organisations.",
    skills: [
      { group: "Governance and compliance", items: ["ISO 27001 / 27005", "NIST, CIS", "GDPR, Privacy by Design", "DORA", "EBIOS RM", "Third-party risk (TPRM)"] },
      { group: "Security leadership", items: ["Security programmes and roadmaps", "Audits and penetration tests: scoping and follow-up", "Operational and steering committees", "Awareness training"] },
      { group: "Technical and tooling", items: ["Web vulnerability scanning (DAST)", "CI/CD, Jenkins, secrets management (Vault)", "Linux hardening (CIS)", "Azure, ServiceNow"] },
    ],
    credentials: ["Master's in Information Security", "CSX Fundamentals (ISACA)", "EBIOS RM (EGÉRIE)", "Fluent English (TOEIC 970)"],
    trackTitle: "From Vincent's previous engagements",
    track: [
      "100+ compliance and security projects supported",
      "30+ penetration tests followed, with remediation plans",
      "NIST programme rolled out across 30+ international entities",
      "Awareness sessions for IT teams and developers",
    ],
    limitsTitle: "What we do and what we don't",
    limits:
      "We scope, lead and follow up audits and penetration tests. The offensive tests themselves are carried out by a specialist provider that we help you choose. No engagement starts without written agreement on scope, and your data stays confidential.",
    webTitle: "A website delivered secure",
    webBody:
      "For our web clients: a security review of the site (headers, access, backups) and legal notices, cookies and forms compliant with GDPR, optional from €490 excl. tax.",
    webCta: "See web offers",
    ctaTitle: "Know where you stand within 2 days",
    ctaBody: "A free 30-minute call. You leave with a clear view of scope and price, no commitment.",
    ctaButton: "Request an assessment",
    ctaSub: "Reply within 1 business day · Quote within 48 hours",
  },
  de: {
    eyebrow: "Cybersicherheit & Compliance",
    title: "Sicherheit und Compliance,",
    title2: "klar, bepreist und nachverfolgt.",
    intro:
      "KAH Digital Studio arbeitet mit Vincent L’helgoual’ch, Experte für Cybersicherheit und Compliance: 11 Jahre IT, davon 7 in der Cybersicherheit. Wir zeigen Ihnen, wo Sie stehen, was wirklich zählt und in welcher Reihenfolge Sie handeln sollten, und steuern dann die Umsetzung. Ohne Fachjargon, mit einem Preis vor Projektbeginn.",
    ctaPrimary: "Analyse anfragen",
    ctaSecondary: "Frage stellen",
    proof: [
      { value: "11 Jahre", label: "IT, davon 7 in Cybersicherheit" },
      { value: "ISO 27001 · DSGVO", label: "DORA · EBIOS RM · NIST" },
      { value: "100+", label: "begleitete Projekte" },
      { value: "30+", label: "begleitete Penetrationstests" },
    ],
    audienceTitle: "Für wen",
    audience: [
      {
        title: "Kleine und mittlere Unternehmen",
        desc: "Wissen, ob Zugänge, Backups, E-Mail und Geräte gängigen Risiken standhalten, und die DSGVO einhalten.",
      },
      {
        title: "Regulierte Berufe und Finanzvermittler",
        desc: "Kanzleien, Makler, Versicherer, Berater: DSGVO-Anforderungen, Dienstleistersteuerung und digitale operative Resilienz (DORA).",
      },
      {
        title: "Startups und SaaS-Anbieter",
        desc: "Sicherheit in Ihren Projekten: Prüfung der CI/CD-Pipelines, Geheimnisverwaltung, Härtung von Linux-Servern, Anwendungstests.",
      },
      {
        title: "Unternehmen mit anspruchsvollen Kunden",
        desc: "Sicherheitsfragebogen, Kundenaudit, Vertragsklausel: Wir bereiten Nachweise und den Massnahmenplan vor, die überzeugen.",
      },
    ],
    offersTitle: "Leistungen",
    offersIntro: "Klarer Umfang, genannter Preis. Preise ohne Steuern; das Angebot folgt innerhalb von 48 Stunden nach einem kostenlosen Gespräch von 30 Minuten.",
    offers: [
      {
        icon: FiSearch,
        title: "Cybersicherheits-Analyse",
        price: "ab 1 000 €",
        unit: "netto · 1 bis 2 Tage",
        forWho: "Um zu wissen, wo Sie stehen, ohne ein Audit von 200 Seiten.",
        items: [
          "Bestandsaufnahme: Zugänge, Passwörter und Zwei-Faktor-Authentifizierung, Backups, Updates, E-Mail, Geräte",
          "Grundprüfung der Cloud- und Microsoft-365-/Azure-Konfiguration",
          "Lesbarer Bericht, Risiken nach Priorität geordnet",
          "Bezifferter Massnahmenplan für 90 Tage",
        ],
      },
      {
        icon: FiFileText,
        title: "DSGVO-Konformität",
        price: "ab 3 000 €",
        unit: "netto · 2 bis 4 Wochen",
        forWho: "Um konform zu sein und es nachweisen zu können, ohne Ihre Teams zu blockieren.",
        items: [
          "Verzeichnis der Verarbeitungstätigkeiten und Datenübersicht",
          "Datenschutzerklärung, Impressum, Cookie-Verwaltung",
          "Verfahren für Betroffenenanfragen (Auskunft, Löschung) und Umgang mit Datenpannen",
          "Bewertung Ihrer Dienstleister und Auftragsverarbeiter",
        ],
      },
      {
        icon: FiTarget,
        title: "Risikoanalyse EBIOS RM",
        price: "ab 6 000 €",
        unit: "netto · auf Anfrage",
        forWho: "Um Ihre Sicherheitsinvestitionen auf echte Risiken zu stützen, nicht auf Eindrücke.",
        items: [
          "Abgrenzung und Umfang der Studie",
          "Risikoszenarien mit Schweregrad und Eintrittswahrscheinlichkeit",
          "Priorisierte und budgetierte Behandlungsmassnahmen",
          "Präsentation für die Geschäftsleitung",
        ],
      },
      {
        icon: FiUsers,
        title: "Sensibilisierung der Teams",
        price: "ab 1 000 €",
        unit: "netto · 1 Sitzung, inkl. Vorbereitung",
        forWho: "Damit Ihre Teams zur ersten Verteidigungslinie werden.",
        items: [
          "Phishing, Passwörter, mobile Nutzung, Homeoffice",
          "Entwickler-Version: Geheimnisverwaltung, Sicherheit in Projekten",
          "Beispiele aus echten Fällen, Unterlagen inklusive",
          "Bis zu 15 Personen pro Sitzung",
        ],
      },
      {
        icon: FiShield,
        title: "Sicherheitsverantwortlicher auf Teilzeit",
        price: "ab 1 900 €",
        unit: "netto / Monat · 2 Tage pro Monat, ohne lange Bindung",
        forWho: "Ein Sicherheitsverantwortlicher tageweise, ohne Neueinstellung.",
        items: [
          "Jährliche Sicherheits-Roadmap und Dashboard",
          "Planung von Audits und Penetrationstests, Dienstleisterauswahl, Nachverfolgung der Korrekturen",
          "Leitung eines Sicherheitsgremiums, Reporting an die Geschäftsleitung",
          "Sicherheitsprüfung neuer Projekte",
        ],
      },
      {
        icon: FiClipboard,
        title: "Regulatorische Begleitung",
        price: "auf Anfrage",
        unit: "ISO 27001 · DORA · NIST",
        forWho: "Um ein Compliance-Programm aufzubauen und dauerhaft zu halten.",
        items: [
          "Abweichungsanalyse zum Zielstandard und Roadmap",
          "Erstellung von Dokumentation und Richtlinien",
          "Programmsteuerung, Gremien, Nachverfolgung der Massnahmenpläne",
          "Vorbereitung auf interne und externe Audits",
        ],
      },
    ],
    quoteNote: "Anderes Format oder grösserer Umfang? Jeder Auftrag wird individuell abgegrenzt.",
    methodTitle: "So arbeiten wir",
    steps: [
      { title: "Kostenloses Gespräch (30 Minuten)", desc: "Wir verstehen Ihr Geschäft, Ihre Rahmenbedingungen und Ihre Sorgen." },
      { title: "Analyse", desc: "Wir prüfen den Bestand und ordnen nach Wichtigkeit." },
      { title: "Bezifferter Massnahmenplan", desc: "Sie wissen, was zu tun ist, in welcher Reihenfolge und mit welchem Budget." },
      { title: "Umsetzung und Nachverfolgung", desc: "Wir steuern oder begleiten die Umsetzung, mit regelmässigen Terminen bis zu den Compliance-Nachweisen." },
    ],
    expertTitle: "Ihr Experte: Vincent L’helgoual’ch",
    expertIntro:
      "Vincent ist ein praxiserprobtes Profil mit Ausbildung in Informationssicherheit (Master), das in grossen Organisationen sowohl auf der technischen als auch auf der Governance-Seite gearbeitet hat.",
    skills: [
      { group: "Governance und Compliance", items: ["ISO 27001 / 27005", "NIST, CIS", "DSGVO, Privacy by Design", "DORA", "EBIOS RM", "Drittparteien-Risiken (TPRM)"] },
      { group: "Sicherheitssteuerung", items: ["Sicherheitsprogramme und Roadmaps", "Audits und Penetrationstests: Planung und Nachverfolgung", "Operative und strategische Gremien", "Sensibilisierung"] },
      { group: "Technik und Werkzeuge", items: ["Web-Schwachstellenscans (DAST)", "CI/CD, Jenkins, Geheimnisverwaltung (Vault)", "Linux-Härtung (CIS)", "Azure, ServiceNow"] },
    ],
    credentials: ["Master in Informationssicherheit", "CSX Fundamentals (ISACA)", "EBIOS RM (EGÉRIE)", "Fliessend Englisch (TOEIC 970)"],
    trackTitle: "Aus früheren Einsätzen von Vincent",
    track: [
      "Über 100 begleitete Compliance- und Sicherheitsprojekte",
      "Über 30 begleitete Penetrationstests mit Korrekturplänen",
      "NIST-Programm in über 30 internationalen Einheiten ausgerollt",
      "Sensibilisierungssitzungen für IT-Teams und Entwickler",
    ],
    limitsTitle: "Was wir tun und was nicht",
    limits:
      "Wir planen, steuern und verfolgen Audits und Penetrationstests. Die offensiven Tests selbst übernimmt ein spezialisierter Dienstleister, bei dessen Auswahl wir helfen. Kein Auftrag beginnt ohne schriftliche Einigung über den Umfang, und Ihre Daten bleiben vertraulich.",
    webTitle: "Eine sicher gelieferte Website",
    webBody:
      "Für unsere Web-Kunden: Sicherheitsprüfung der Website (Header, Zugänge, Backups) sowie DSGVO-konformes Impressum, Cookies und Formulare, optional ab 490 € netto.",
    webCta: "Web-Angebote ansehen",
    ctaTitle: "In 2 Tagen wissen, wo Sie stehen",
    ctaBody: "Ein kostenloses Gespräch von 30 Minuten. Sie gehen mit einer klaren Vorstellung von Umfang und Preis, unverbindlich.",
    ctaButton: "Analyse anfragen",
    ctaSub: "Antwort innerhalb von 1 Werktag · Angebot innerhalb von 48 Stunden",
  },
};

export function CybersecurityPageContent({ locale }: Props) {
  const c = COPY[locale];
  const focus =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050509]";

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#050509] py-20 sm:py-28">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -top-40 left-1/4 h-[520px] w-[520px] rounded-full bg-emerald-500/[0.07] blur-[140px]" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-300">
            <FiLock size={11} aria-hidden="true" />
            {c.eyebrow}
          </span>
          <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
            {c.title} <span className="text-emerald-300">{c.title2}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-300">{c.intro}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={withLocalePrefix("/devis", locale)}
              className={`inline-flex items-center justify-center gap-2 rounded-full bg-emerald-400 px-8 py-3.5 font-bold text-[#04120c] transition hover:-translate-y-0.5 hover:bg-emerald-300 ${focus}`}
            >
              {c.ctaPrimary} <FiArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link
              href={withLocalePrefix("/contact", locale)}
              className={`inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-8 py-3.5 font-semibold text-white transition hover:border-white/40 hover:bg-white/5 ${focus}`}
            >
              {c.ctaSecondary}
            </Link>
          </div>

          <dl className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {c.proof.map((p) => (
              <div key={p.label} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4">
                <dt className="text-lg font-extrabold text-white sm:text-xl">{p.value}</dt>
                <dd className="mt-1 text-xs leading-snug text-gray-400">{p.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Audience */}
      <section className="bg-gray-950 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-3xl font-extrabold text-white">{c.audienceTitle}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {c.audience.map((a) => (
              <div key={a.title} className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
                <h3 className="font-bold text-white">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-300">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offers */}
      <section className="bg-[#050509] py-16 sm:py-20" id="prestations">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white">{c.offersTitle}</h2>
          <p className="mt-3 max-w-3xl text-gray-300">{c.offersIntro}</p>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {c.offers.map((o) => {
              const Icon = o.icon;
              return (
                <article
                  key={o.title}
                  className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-emerald-400/30"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/25 bg-emerald-400/10 text-emerald-300">
                    <Icon size={18} aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-white">{o.title}</h3>
                  <p className="mt-1 text-sm text-gray-300">{o.forWho}</p>
                  <p className="mt-5 text-2xl font-extrabold text-emerald-300">{o.price}</p>
                  <p className="text-xs text-gray-400">{o.unit}</p>
                  <ul className="mt-5 space-y-2.5 border-t border-white/10 pt-5">
                    {o.items.map((it) => (
                      <li key={it} className="flex items-start gap-2.5 text-sm text-gray-300">
                        <FiCheck size={15} className="mt-0.5 shrink-0 text-emerald-300" aria-hidden="true" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
          <p className="mt-8 text-sm text-gray-400">{c.quoteNote}</p>
        </div>
      </section>

      {/* Method */}
      <section className="bg-gray-950 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-3xl font-extrabold text-white">{c.methodTitle}</h2>
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {c.steps.map((s, i) => (
              <li key={s.title} className="relative rounded-2xl border border-white/10 bg-white/[0.025] p-6">
                <span className="text-3xl font-black text-emerald-300/60" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-bold text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-300">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Expertise */}
      <section className="bg-[#050509] py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white">{c.expertTitle}</h2>
          <p className="mt-3 max-w-3xl text-gray-300">{c.expertIntro}</p>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {c.skills.map((g) => (
              <div key={g.group} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <h3 className="font-bold text-emerald-300">{g.group}</h3>
                <ul className="mt-4 space-y-2">
                  {g.items.map((it) => (
                    <li key={it} className="flex items-start gap-2.5 text-sm text-gray-300">
                      <FiCheck size={15} className="mt-0.5 shrink-0 text-emerald-300" aria-hidden="true" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-2" aria-label="Certifications">
            {c.credentials.map((cr) => (
              <span
                key={cr}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 text-xs font-semibold text-gray-200"
              >
                <FiAward size={12} className="text-emerald-300" aria-hidden="true" />
                {cr}
              </span>
            ))}
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div>
              <h3 className="text-lg font-bold text-white">{c.trackTitle}</h3>
              <ul className="mt-4 space-y-3">
                {c.track.map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-sm text-gray-300">
                    <FiCheck size={15} className="mt-0.5 shrink-0 text-emerald-300" aria-hidden="true" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="text-lg font-bold text-white">{c.limitsTitle}</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-300">{c.limits}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Web tie-in */}
      <section className="bg-gray-950 py-14">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-xl font-bold text-white">{c.webTitle}</h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-300">{c.webBody}</p>
          </div>
          <Link
            href={withLocalePrefix("/offres", locale)}
            className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-emerald-400/40 px-6 py-3 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-400/10 ${focus}`}
          >
            {c.webCta} <FiArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#050509] py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">{c.ctaTitle}</h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-300">{c.ctaBody}</p>
          <Link
            href={withLocalePrefix("/devis", locale)}
            className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-emerald-400 px-10 py-4 font-bold text-[#04120c] transition hover:-translate-y-0.5 hover:bg-emerald-300 ${focus}`}
          >
            {c.ctaButton} <FiArrowRight size={16} aria-hidden="true" />
          </Link>
          <p className="mt-4 text-xs text-gray-400">{c.ctaSub}</p>
        </div>
      </section>
    </>
  );
}
