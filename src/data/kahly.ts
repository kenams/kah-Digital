import type { Locale } from "@/lib/locales";

type KahlyCopy = {
  title: string; description: string; by: string; headline: string; intro: string;
  demo: string; discover: string; note: string; bandTitle: string; bandText: string;
  example: string; request: string; steps: string[]; result: string; output: string;
  capabilitiesTitle: string; capabilities: { title: string; text: string }[];
  offersTitle: string; offersIntro: string; quote: string;
  offers: { name: string; audience: string; includes: string[] }[];
  processTitle: string; process: { title: string; text: string }[];
  faqTitle: string; faq: { q: string; a: string }[];
  demoTitle: string; demoText: string; email: string;
};

export const KAHLY_COPY: Record<Locale, KahlyCopy> = {
  fr: {
    title: "KAHLY — Votre assistant IA sur mesure",
    description: "KAHLY, par KAH Digital Studio : un assistant IA adapté à vos documents, outils et tâches. Installation Windows, personnalisation et accompagnement sur devis.",
    by: "Par KAH Digital Studio", headline: "Votre assistant IA, à votre façon.",
    intro: "Vos documents. Vos outils. Votre manière de travailler. KAHLY rassemble ce qui compte pour vous aider à préparer, exécuter et vérifier vos tâches, avec un périmètre défini ensemble.",
    demo: "Demander une démonstration", discover: "Découvrir KAHLY", note: "Démonstration personnalisée · Offre sur devis · Aucun achat immédiat",
    bandTitle: "Un assistant qui connaît votre travail.",
    bandText: "Découvrez KAHLY : notre assistant IA personnalisé pour les indépendants et les entreprises. Vos outils, vos commandes, un premier cas d’usage concret.",
    example: "Exemple d’usage illustratif", request: "Prépare le point sur ce projet à partir de mes documents.",
    steps: ["Retrouver les documents autorisés", "Préparer une synthèse et les prochaines étapes", "Vérifier les éléments utilisés"],
    result: "Un résultat exploitable", output: "Synthèse du projet, points à confirmer et liste d’actions. Vous gardez la main sur les décisions importantes.",
    capabilitiesTitle: "Moins de tâches dispersées. Plus de travail qui avance.",
    capabilities: [
      { title: "Vos documents, au bon endroit", text: "Préparer des synthèses, comparer des informations et organiser les fichiers que vous autorisez." },
      { title: "Vos outils, dans le même parcours", text: "Effectuer des opérations dans le navigateur et relier les outils compatibles, selon les accès convenus." },
      { title: "Vos commandes, à portée de clic", text: "Retrouver vos procédures et lancer des tâches récurrentes avec des consignes adaptées à votre métier." },
    ],
    offersTitle: "Un assistant personnel. Ou un nouvel appui pour votre équipe.",
    offersIntro: "KAHLY est proposé comme une prestation personnalisée : installation, configuration et prise en main. On commence par un usage utile, puis on élargit si le résultat le justifie.", quote: "Sur devis",
    offers: [
      { name: "KAHLY Indépendant", audience: "Pour votre activité et vos tâches du quotidien.", includes: ["Installation sur un poste Windows compatible", "Un premier cas d’usage défini ensemble", "Commandes et contexte de travail personnalisés", "Prise en main et vérification du parcours"] },
      { name: "KAHLY Entreprise", audience: "Pour un besoin métier concret et un déploiement accompagné.", includes: ["Cadrage avec votre équipe et votre référent IT", "Étude des outils et des accès nécessaires", "Configuration d’un pilote sur un périmètre validé", "Formation, documentation et suivi à définir"] },
    ],
    processTitle: "Du besoin réel au premier usage utile.",
    process: [
      { title: "On choisit une tâche", text: "Vous nous montrez un exemple concret, vos outils et le résultat attendu." },
      { title: "On prépare votre assistant", text: "Compatibilité, accès, livrables, délai et prix sont validés avant l’installation." },
      { title: "On teste avec vous", text: "Nous vérifions le parcours sur votre environnement et vous accompagnons pour le reprendre en main." },
    ],
    faqTitle: "Ce qu’il faut savoir avant de commencer.",
    faq: [
      { q: "Est-ce un logiciel à télécharger immédiatement ?", a: "Nous proposons d’abord une démonstration et une adaptation à votre besoin. KAHLY s’appuie sur notre assistant interne ; la version livrée est configurée pour votre environnement et votre périmètre." },
      { q: "Sur quel ordinateur peut-il être installé ?", a: "La première offre concerne Windows. Nous vérifions la compatibilité de votre poste et des outils demandés pendant le cadrage. Un autre environnement se discute avant tout engagement." },
      { q: "Peut-il accéder à tous mes comptes ?", a: "Il utilise uniquement les outils et comptes que vous autorisez et qui sont compatibles. Certaines connexions, validations ou authentifications à deux facteurs restent à effectuer par vous." },
      { q: "Les services d’IA sont-ils compris dans le prix ?", a: "Le devis distingue la prestation, les éventuels frais d’IA ou de services tiers et le support. Vos identifiants et abonnements personnels ne sont pas revendus à d’autres clients." },
      { q: "Qui décide des actions importantes ?", a: "Le périmètre est défini avec vous. Les actions sensibles, irréversibles ou engageantes nécessitent les validations prévues. Nous ne promettons pas une autonomie illimitée." },
    ],
    demoTitle: "Montrez-nous la tâche que vous aimeriez déléguer.",
    demoText: "Décrivez votre activité, vos outils et un exemple de tâche. Nous préparerons un échange pour évaluer KAHLY dans votre contexte, sans engagement.", email: "Vous préférez un échange par email ?",
  },
  en: {
    title: "KAHLY — Your custom AI assistant",
    description: "KAHLY by KAH Digital Studio: an AI assistant tailored to your documents, tools and tasks. Windows setup, customisation and onboarding, quoted for your needs.",
    by: "By KAH Digital Studio", headline: "Your AI assistant. Your way of working.",
    intro: "Your documents. Your tools. Your workflow. KAHLY brings them together to help prepare, carry out and check your tasks, within a scope we agree with you.",
    demo: "Request a demonstration", discover: "Discover KAHLY", note: "Personalised demonstration · Custom quote · No immediate purchase",
    bandTitle: "An assistant that understands your work.", bandText: "Meet KAHLY: our custom AI assistant for independent professionals and businesses. Your tools, your commands and a practical first use case.",
    example: "Illustrative use case", request: "Prepare a project update from my documents.",
    steps: ["Find the authorised documents", "Draft a summary and next steps", "Check the information used"],
    result: "Something you can work with", output: "A project summary, points to confirm and an action list. Important decisions remain yours.",
    capabilitiesTitle: "Less scattered work. More progress.",
    capabilities: [
      { title: "Your documents, in context", text: "Prepare summaries, compare information and organise the files you authorise." },
      { title: "Your tools, in one workflow", text: "Carry out browser tasks and connect compatible tools, using the access we agree on." },
      { title: "Your commands, a click away", text: "Keep procedures close and launch recurring tasks with instructions tailored to your work." },
    ],
    offersTitle: "A personal assistant. Or a helping hand for your team.",
    offersIntro: "KAHLY is a tailored service covering setup, configuration and onboarding. We start with one useful task and expand when the results justify it.", quote: "Custom quote",
    offers: [
      { name: "KAHLY Independent", audience: "For your business and day-to-day work.", includes: ["Setup on one compatible Windows computer", "One initial use case agreed together", "Personalised commands and working context", "Onboarding and workflow verification"] },
      { name: "KAHLY Business", audience: "For a specific business need, with guided deployment.", includes: ["Scoping with your team and IT contact", "Review of tools and access requirements", "Pilot configuration within an agreed scope", "Training, documentation and support to define"] },
    ],
    processTitle: "From a real need to a useful first workflow.",
    process: [
      { title: "Choose a task", text: "Show us a real example, your tools and the outcome you expect." },
      { title: "Prepare your assistant", text: "Compatibility, access, deliverables, timing and price are agreed before setup." },
      { title: "Test it together", text: "We verify the workflow in your environment and help you take it forward." },
    ],
    faqTitle: "Before we get started.",
    faq: [
      { q: "Can I download it straight away?", a: "We first offer a demonstration and an adaptation to your needs. KAHLY builds on our internal assistant; the delivered version is configured for your environment and agreed scope." },
      { q: "Which computers does it support?", a: "The initial offer is for Windows. We check your computer and requested tools during scoping. Other environments can be discussed before you commit." },
      { q: "Can it access all my accounts?", a: "It only uses compatible tools and accounts you authorise. You may still need to sign in, approve access or complete two-factor authentication." },
      { q: "Is AI usage included in the price?", a: "The quote separates our service, any AI or third-party costs, and support. Your personal credentials and subscriptions are not resold to other customers." },
      { q: "Who controls important actions?", a: "We agree the scope with you. Sensitive, irreversible or binding actions require the relevant approvals. We do not promise unlimited autonomy." },
    ],
    demoTitle: "Show us the task you would like to hand over.", demoText: "Tell us about your work, tools and one example task. We will arrange a conversation to assess KAHLY in your context, with no commitment.", email: "Prefer to talk by email?",
  },
  de: {
    title: "KAHLY — Ihr individueller KI-Assistent",
    description: "KAHLY von KAH Digital Studio: ein KI-Assistent für Ihre Dokumente, Werkzeuge und Aufgaben. Windows-Einrichtung, Anpassung und Einführung auf Offerte.",
    by: "Von KAH Digital Studio", headline: "Ihr KI-Assistent. Ihre Arbeitsweise.",
    intro: "Ihre Dokumente. Ihre Werkzeuge. Ihre Arbeitsabläufe. KAHLY verbindet sie, um Aufgaben vorzubereiten, auszuführen und zu überprüfen – im gemeinsam vereinbarten Rahmen.",
    demo: "Vorführung anfragen", discover: "KAHLY entdecken", note: "Persönliche Vorführung · Individuelle Offerte · Kein sofortiger Kauf",
    bandTitle: "Ein Assistent, der Ihre Arbeit kennt.", bandText: "Entdecken Sie KAHLY: unseren individuellen KI-Assistenten für Selbstständige und Unternehmen. Ihre Werkzeuge, Ihre Befehle und ein konkreter erster Anwendungsfall.",
    example: "Illustratives Anwendungsbeispiel", request: "Erstelle aus meinen Dokumenten einen Projektüberblick.",
    steps: ["Freigegebene Dokumente finden", "Zusammenfassung und nächste Schritte vorbereiten", "Verwendete Informationen überprüfen"],
    result: "Ein nutzbares Ergebnis", output: "Projektüberblick, offene Fragen und eine Aufgabenliste. Wichtige Entscheidungen bleiben bei Ihnen.",
    capabilitiesTitle: "Weniger verstreute Aufgaben. Mehr Fortschritt.",
    capabilities: [
      { title: "Ihre Dokumente im Zusammenhang", text: "Zusammenfassungen vorbereiten, Informationen vergleichen und freigegebene Dateien organisieren." },
      { title: "Ihre Werkzeuge im selben Ablauf", text: "Aufgaben im Browser erledigen und kompatible Werkzeuge über die vereinbarten Zugänge verbinden." },
      { title: "Ihre Befehle mit einem Klick", text: "Abläufe griffbereit halten und wiederkehrende Aufgaben mit passenden Anweisungen starten." },
    ],
    offersTitle: "Ein persönlicher Assistent. Oder Unterstützung für Ihr Team.",
    offersIntro: "KAHLY ist eine individuelle Dienstleistung mit Einrichtung, Konfiguration und Einführung. Wir beginnen mit einer sinnvollen Aufgabe und erweitern den Umfang anhand der Ergebnisse.", quote: "Auf Offerte",
    offers: [
      { name: "KAHLY Selbstständig", audience: "Für Ihr Geschäft und Ihre täglichen Aufgaben.", includes: ["Einrichtung auf einem kompatiblen Windows-PC", "Ein gemeinsam definierter Anwendungsfall", "Individuelle Befehle und Arbeitskontext", "Einführung und Überprüfung des Ablaufs"] },
      { name: "KAHLY Unternehmen", audience: "Für einen konkreten Bedarf mit begleiteter Einführung.", includes: ["Bedarfsanalyse mit Team und IT-Ansprechperson", "Prüfung der Werkzeuge und erforderlichen Zugänge", "Pilotkonfiguration im vereinbarten Rahmen", "Schulung, Dokumentation und Support nach Absprache"] },
    ],
    processTitle: "Vom konkreten Bedarf zum ersten nützlichen Ablauf.",
    process: [
      { title: "Eine Aufgabe auswählen", text: "Zeigen Sie uns ein Beispiel, Ihre Werkzeuge und das gewünschte Ergebnis." },
      { title: "Den Assistenten vorbereiten", text: "Kompatibilität, Zugänge, Leistungen, Termin und Preis werden vor der Einrichtung vereinbart." },
      { title: "Gemeinsam testen", text: "Wir prüfen den Ablauf in Ihrer Umgebung und begleiten die Einführung." },
    ],
    faqTitle: "Vor dem Start.",
    faq: [
      { q: "Kann ich KAHLY sofort herunterladen?", a: "Zunächst bieten wir eine Vorführung und eine Anpassung an Ihren Bedarf an. KAHLY basiert auf unserem internen Assistenten; die gelieferte Version wird für Ihre Umgebung und den vereinbarten Umfang konfiguriert." },
      { q: "Welche Computer werden unterstützt?", a: "Das erste Angebot richtet sich an Windows-Nutzer. Rechner und gewünschte Werkzeuge werden während der Bedarfsanalyse geprüft. Andere Umgebungen besprechen wir vor einer verbindlichen Zusage." },
      { q: "Kann er auf alle meine Konten zugreifen?", a: "Er nutzt nur kompatible Werkzeuge und Konten, die Sie freigeben. Anmeldungen, Bestätigungen oder Zwei-Faktor-Authentifizierung können weiterhin Ihre Mitwirkung erfordern." },
      { q: "Sind KI-Kosten im Preis enthalten?", a: "Die Offerte unterscheidet unsere Leistung, allfällige KI- oder Drittanbieter-Kosten und den Support. Ihre persönlichen Zugangsdaten und Abonnements werden nicht an andere Kunden weiterverkauft." },
      { q: "Wer entscheidet über wichtige Aktionen?", a: "Der Rahmen wird mit Ihnen vereinbart. Sensible, irreversible oder verbindliche Aktionen erfordern die vorgesehenen Freigaben. Wir versprechen keine unbegrenzte Autonomie." },
    ],
    demoTitle: "Zeigen Sie uns die Aufgabe, die Sie abgeben möchten.", demoText: "Beschreiben Sie Ihre Tätigkeit, Ihre Werkzeuge und eine Beispielaufgabe. Wir vereinbaren ein unverbindliches Gespräch, um KAHLY für Ihren Bedarf einzuschätzen.", email: "Lieber per E-Mail sprechen?",
  },
};
