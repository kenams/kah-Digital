import type { Locale } from "@/lib/locales";
import type { PackId, SubscriptionId } from "@/lib/pack-orders";

type PackCopy = { name: string; summary: string; points: string[]; delivery: string };
type PlanCopy = { name: string; tagline: string; points: string[] };

export type OrderCopy = {
  meta: { title: string; description: string };
  hero: { badge: string; title: string; subtitle: string; cancelled: string };
  steps: { pack: string; plan: string; contact: string };
  planIntro: (days: number) => string;
  deliveredIn: string;
  included: string;
  packs: Record<PackId, PackCopy>;
  plans: Record<SubscriptionId, PlanCopy>;
  perMonth: string;
  none: string;
  fields: {
    name: string; namePh: string; company: string; companyPh: string;
    email: string; emailPh: string; phone: string; phonePh: string;
  };
  summary: {
    title: string; pack: string; subscription: string; payToday: string;
    thenPer: (price: string, days: number) => string; vat: string;
  };
  terms: { accept: string; read: string; items: string[] };
  submit: (price: string) => string;
  loading: string;
  secure: string;
  errorGeneric: string;
  checkoutVat: string;
  email: {
    confirmedEyebrow: string;
    title: (name: string, pack: string) => string;
    intro: string;
    packLabel: string; planLabel: string; planNone: string;
    nextTitle: string;
    step1: [string, string]; step2: [string, string];
    step3: [string, string];
    step3Sub: (price: string, days: number) => string;
    step3None: string;
    cta: string;
    subject: (pack: string) => string;
    briefSubject: string; briefEyebrow: string; briefTitle: string; briefIntro: string;
  };
  thanks: {
    title: string;
    body: (name: string, pack: string, price: string, plan: string, planPrice: string, hasSub: boolean, days: number) => string;
    mailed: (email: string) => string;
    lastStep: string; formTitle: string; formIntro: string;
    genericTitle: string; genericBody: string; home: string;
  };
  brief: {
    businessName: string; businessNamePh: string; activity: string; activityPh: string;
    city: string; cityPh: string; services: string; servicesPh: string;
    tone: string; tonePh: string; domain: string; domainPh: string;
    links: string; assets: string; assetsPh: string; notes: string;
    send: string; sending: string; doneTitle: string; doneBody: string;
  };
};

const FR: OrderCopy = {
  meta: {
    title: "Commander mon site en ligne — Starter 290 € ou Business 790 € | KAH Digital Studio",
    description:
      "Choisissez votre pack, payez en ligne en toute sécurité et recevez votre site professionnel en 5 jours ouvrés. Prix fixe, abonnement optionnel sans engagement.",
  },
  hero: {
    badge: "Commande en ligne · paiement sécurisé Stripe",
    title: "Commandez votre site, il est livré en 5 jours",
    subtitle: "Choisissez votre pack, payez en ligne, puis envoyez vos contenus. Je m'occupe du reste.",
    cancelled: "Le paiement a été annulé. Aucun montant n'a été prélevé.",
  },
  steps: { pack: "1 · Votre pack", plan: "2 · Votre abonnement", contact: "3 · Vos coordonnées" },
  planIntro: (d) =>
    `Hébergement, nom de domaine, sécurité et modifications : pour que votre site reste en ligne et à jour. Sans engagement, premier prélèvement ${d} jours après la commande.`,
  deliveredIn: "Livré en",
  included: "Inclus",
  packs: {
    starter: {
      name: "Starter",
      summary: "Une landing page propre et rapide qui donne confiance dès le premier regard.",
      points: [
        "1 landing page complète (hero, services, contact)",
        "Formulaire de contact + design mobile",
        "SEO technique de base",
        "Livraison en 5 jours ouvrés après réception de vos contenus",
      ],
      delivery: "5 jours ouvrés",
    },
    business: {
      name: "Business",
      summary: "Le site professionnel complet, jusqu'à 6 pages, pensé pour transformer les visiteurs en clients.",
      points: [
        "Jusqu'à 6 pages, logo et identité visuelle inclus",
        "SEO technique complet, design premium",
        "Formulaire de devis + WhatsApp",
        "3 retouches incluses",
        "Livraison en 5 jours ouvrés après réception de vos contenus",
      ],
      delivery: "5 jours ouvrés",
    },
  },
  plans: {
    essentiel: { name: "Essentiel", tagline: "On s'occupe de tout", points: ["Hébergement, domaine, sécurité, sauvegardes", "1 petite modification par mois", "Réponse sous 72 h"] },
    confort: { name: "Confort", tagline: "Pour un site qui évolue", points: ["Tout Essentiel", "3 modifications par mois", "Rapport mensuel + suivi des avis Google", "Réponse sous 24 h"] },
    pro: { name: "Pro", tagline: "Accompagnement renforcé", points: ["Tout Confort", "Modifications illimitées (usage raisonnable)", "Support WhatsApp direct", "Réponse sous 4 h ouvrées"] },
    none: { name: "Sans abonnement", tagline: "Je gère l'hébergement moi-même", points: ["Je reçois les accès à la livraison", "Hébergement, domaine et mises à jour à ma charge"] },
  },
  perMonth: "/mois",
  none: "Aucun",
  fields: {
    name: "Nom et prénom *", namePh: "Jean Dupont", company: "Entreprise", companyPh: "Boulangerie Dupont",
    email: "E-mail *", emailPh: "jean@exemple.fr", phone: "Téléphone", phonePh: "06 12 34 56 78",
  },
  summary: {
    title: "Récapitulatif", pack: "Pack", subscription: "Abonnement", payToday: "À payer aujourd'hui",
    thenPer: (p, d) => `puis ${p}/mois à partir du ${d}e jour, sans engagement`,
    vat: "TVA non applicable — art. 293 B du CGI",
  },
  terms: {
    accept: "J'accepte les conditions de vente et d'abonnement ci-dessous. *",
    read: "Lire les conditions",
    items: [
      "Le pack est payé à la commande ; la livraison a lieu sous 5 jours ouvrés après réception de vos contenus.",
      "Les retouches incluses sont celles décrites dans le pack ; toute fonctionnalité supplémentaire fait l'objet d'un devis.",
      "L'abonnement est prélevé chaque mois par carte, sans engagement, résiliable avec un mois de préavis par simple message.",
      "Les modifications comprises dans l'abonnement ne sont pas reportables d'un mois sur l'autre.",
      "Vos données et contenus restent votre propriété ; vous recevez les accès sur demande.",
    ],
  },
  submit: (p) => `Payer ${p} et lancer mon site`,
  loading: "Ouverture du paiement…",
  secure: "Paiement sécurisé par Stripe. Je ne vois jamais vos données de carte.",
  errorGeneric: "Impossible d'ouvrir le paiement. Réessayez ou contactez-nous.",
  checkoutVat: "TVA non applicable, art. 293 B du CGI. Livraison sous 5 jours ouvrés après réception de vos contenus.",
  email: {
    confirmedEyebrow: "Commande confirmée",
    title: (n, p) => `Merci ${n}, votre pack ${p} est lancé`,
    intro: "Votre paiement est bien reçu. Pour tenir le délai de 5 jours ouvrés, il me manque vos contenus : cela prend 5 minutes.",
    packLabel: "Pack", planLabel: "Abonnement", planNone: "Aucun",
    nextTitle: "La suite",
    step1: ["1. Vos contenus", "Remplissez le formulaire de démarrage (lien ci-dessous) : activité, textes, photos, couleurs."],
    step2: ["2. Réalisation", "Livraison sous 5 jours ouvrés après réception de vos contenus."],
    step3: ["3. Abonnement", ""],
    step3Sub: (p, d) => `Le premier prélèvement de ${p} aura lieu ${d} jours après la commande, puis chaque mois. Sans engagement, résiliable avec un mois de préavis.`,
    step3None: "Vous recevrez les accès à la livraison. Hébergement et mises à jour restent à votre charge.",
    cta: "Remplir mon formulaire de démarrage",
    subject: (p) => `Commande confirmée — Pack ${p} KAH Digital Studio`,
    briefSubject: "Votre brief est bien reçu — KAH Digital Studio",
    briefEyebrow: "Brief reçu", briefTitle: "Merci, je m'y mets",
    briefIntro: "Voici le récapitulatif de ce que vous m'avez envoyé. Le délai de 5 jours ouvrés démarre maintenant. Si quelque chose est faux, répondez simplement à cet e-mail.",
  },
  thanks: {
    title: "Commande confirmée",
    body: (n, p, price, plan, planPrice, hasSub, d) =>
      `Merci ${n} ! Votre pack ${p} (${price}) est payé.${hasSub ? ` Votre abonnement ${plan} (${planPrice}/mois) démarre ${d} jours après la commande.` : ""}`,
    mailed: (e) => `Un e-mail de confirmation vient de vous être envoyé à ${e}.`,
    lastStep: "Dernière étape",
    formTitle: "Envoyez-moi vos contenus (5 minutes)",
    formIntro: "Le délai de 5 jours ouvrés démarre dès réception de ce formulaire.",
    genericTitle: "Merci pour votre commande",
    genericBody: "Si votre paiement est bien passé, vous recevez un e-mail de confirmation avec le lien vers votre formulaire de démarrage.",
    home: "Retour à l'accueil",
  },
  brief: {
    businessName: "Nom à afficher sur le site", businessNamePh: "Boulangerie Dupont",
    activity: "Votre activité en une phrase *", activityPh: "Boulangerie artisanale, pains au levain et viennoiseries",
    city: "Ville ou zone d'intervention", cityPh: "Toulouse et alentours",
    services: "Vos services ou produits, horaires, tarifs à afficher", servicesPh: "Listez ce que vous proposez, vos horaires, vos tarifs si vous voulez les afficher…",
    tone: "Ton et couleurs souhaités", tonePh: "Chaleureux, tons crème et vert foncé",
    domain: "Nom de domaine existant (si vous en avez un)", domainPh: "boulangerie-dupont.fr",
    links: "Liens utiles (réseaux sociaux, ancien site, fiche Google)",
    assets: "Logo et photos (lien Google Drive, WeTransfer, Dropbox…)", assetsPh: "https://drive.google.com/…",
    notes: "Autre chose à me dire ?",
    send: "Envoyer mon brief", sending: "Envoi…",
    doneTitle: "Brief reçu, je m'y mets",
    doneBody: "Le délai de 5 jours ouvrés démarre maintenant. Vous recevez une copie de votre brief par e-mail.",
  },
};

const EN: OrderCopy = {
  meta: {
    title: "Order your website online — Starter $290 or Business $790 | KAH Digital Studio",
    description: "Pick your pack, pay securely online and get your professional website in 5 working days. Fixed price, optional no-commitment subscription.",
  },
  hero: {
    badge: "Online order · secure Stripe payment",
    title: "Order your website, delivered in 5 days",
    subtitle: "Pick your pack, pay online, then send your content. I take care of the rest.",
    cancelled: "The payment was cancelled. You have not been charged.",
  },
  steps: { pack: "1 · Your pack", plan: "2 · Your subscription", contact: "3 · Your details" },
  planIntro: (d) =>
    `Hosting, domain name, security and edits: so your site stays online and up to date. No commitment, first charge ${d} days after the order.`,
  deliveredIn: "Delivered in",
  included: "Included",
  packs: {
    starter: {
      name: "Starter",
      summary: "A clean, fast landing page that builds trust at first glance.",
      points: ["1 complete landing page (hero, services, contact)", "Contact form + mobile design", "Basic technical SEO", "Delivered in 5 working days after we receive your content"],
      delivery: "5 working days",
    },
    business: {
      name: "Business",
      summary: "The complete professional website, up to 6 pages, built to turn visitors into clients.",
      points: ["Up to 6 pages, logo and visual identity included", "Full technical SEO, premium design", "Quote form + WhatsApp", "3 revision rounds included", "Delivered in 5 working days after we receive your content"],
      delivery: "5 working days",
    },
  },
  plans: {
    essentiel: { name: "Essential", tagline: "We take care of everything", points: ["Hosting, domain, security, backups", "1 small edit per month", "Reply within 72 h"] },
    confort: { name: "Comfort", tagline: "For a site that evolves", points: ["Everything in Essential", "3 edits per month", "Monthly report + Google reviews follow-up", "Reply within 24 h"] },
    pro: { name: "Pro", tagline: "Enhanced support", points: ["Everything in Comfort", "Unlimited edits (fair use)", "Direct WhatsApp support", "Reply within 4 working hours"] },
    none: { name: "No subscription", tagline: "I'll handle hosting myself", points: ["I receive the access details at delivery", "Hosting, domain and updates are my responsibility"] },
  },
  perMonth: "/month",
  none: "None",
  fields: {
    name: "Full name *", namePh: "Jane Smith", company: "Company", companyPh: "Smith Bakery",
    email: "Email *", emailPh: "jane@example.com", phone: "Phone", phonePh: "+1 555 123 4567",
  },
  summary: {
    title: "Summary", pack: "Pack", subscription: "Subscription", payToday: "To pay today",
    thenPer: (p, d) => `then ${p}/month starting on day ${d}, no commitment`,
    vat: "VAT not applicable — art. 293 B of the French tax code",
  },
  terms: {
    accept: "I accept the terms of sale and subscription below. *",
    read: "Read the terms",
    items: [
      "The pack is paid at order; delivery takes place within 5 working days after we receive your content.",
      "Included revisions are those described in the pack; any additional feature is quoted separately.",
      "The subscription is charged monthly by card, with no commitment, and can be cancelled with one month's notice by simple message.",
      "Edits included in the subscription cannot be carried over from one month to the next.",
      "Your data and content remain your property; you receive the access details on request.",
    ],
  },
  submit: (p) => `Pay ${p} and start my website`,
  loading: "Opening payment…",
  secure: "Secure payment by Stripe. I never see your card details.",
  errorGeneric: "Unable to open the payment. Please try again or contact us.",
  checkoutVat: "VAT not applicable, art. 293 B of the French tax code. Delivery within 5 working days after we receive your content.",
  email: {
    confirmedEyebrow: "Order confirmed",
    title: (n, p) => `Thank you ${n}, your ${p} pack is under way`,
    intro: "Your payment has been received. To keep the 5-working-day delivery, I need your content: it takes 5 minutes.",
    packLabel: "Pack", planLabel: "Subscription", planNone: "None",
    nextTitle: "What happens next",
    step1: ["1. Your content", "Fill in the start-up form (link below): business, texts, photos, colours."],
    step2: ["2. Production", "Delivery within 5 working days after we receive your content."],
    step3: ["3. Subscription", ""],
    step3Sub: (p, d) => `The first charge of ${p} takes place ${d} days after the order, then every month. No commitment, cancellable with one month's notice.`,
    step3None: "You will receive the access details at delivery. Hosting and updates remain your responsibility.",
    cta: "Fill in my start-up form",
    subject: (p) => `Order confirmed — ${p} pack, KAH Digital Studio`,
    briefSubject: "Your brief has been received — KAH Digital Studio",
    briefEyebrow: "Brief received", briefTitle: "Thank you, I'm on it",
    briefIntro: "Here is a summary of what you sent me. The 5-working-day delivery starts now. If anything is wrong, simply reply to this email.",
  },
  thanks: {
    title: "Order confirmed",
    body: (n, p, price, plan, planPrice, hasSub, d) =>
      `Thank you ${n}! Your ${p} pack (${price}) is paid.${hasSub ? ` Your ${plan} subscription (${planPrice}/month) starts ${d} days after the order.` : ""}`,
    mailed: (e) => `A confirmation email has just been sent to ${e}.`,
    lastStep: "Last step",
    formTitle: "Send me your content (5 minutes)",
    formIntro: "The 5-working-day delivery starts as soon as I receive this form.",
    genericTitle: "Thank you for your order",
    genericBody: "If your payment went through, you will receive a confirmation email with the link to your start-up form.",
    home: "Back to home",
  },
  brief: {
    businessName: "Name to display on the site", businessNamePh: "Smith Bakery",
    activity: "Your business in one sentence *", activityPh: "Artisan bakery, sourdough bread and pastries",
    city: "City or service area", cityPh: "Zurich and surroundings",
    services: "Your services or products, opening hours, prices to display", servicesPh: "List what you offer, your hours, and prices if you want them displayed…",
    tone: "Preferred tone and colours", tonePh: "Warm, cream and dark green tones",
    domain: "Existing domain name (if any)", domainPh: "smith-bakery.com",
    links: "Useful links (social media, old site, Google listing)",
    assets: "Logo and photos (Google Drive, WeTransfer, Dropbox link…)", assetsPh: "https://drive.google.com/…",
    notes: "Anything else to tell me?",
    send: "Send my brief", sending: "Sending…",
    doneTitle: "Brief received, I'm on it",
    doneBody: "The 5-working-day delivery starts now. You will receive a copy of your brief by email.",
  },
};

const DE: OrderCopy = {
  meta: {
    title: "Website online bestellen — Starter CHF 290 oder Business CHF 790 | KAH Digital Studio",
    description: "Wählen Sie Ihr Paket, zahlen Sie sicher online und erhalten Sie Ihre professionelle Website in 5 Werktagen. Fixpreis, optionales Abo ohne Bindung.",
  },
  hero: {
    badge: "Online-Bestellung · sichere Zahlung über Stripe",
    title: "Bestellen Sie Ihre Website, Lieferung in 5 Tagen",
    subtitle: "Paket wählen, online bezahlen, dann Ihre Inhalte senden. Den Rest übernehme ich.",
    cancelled: "Die Zahlung wurde abgebrochen. Es wurde nichts abgebucht.",
  },
  steps: { pack: "1 · Ihr Paket", plan: "2 · Ihr Abonnement", contact: "3 · Ihre Angaben" },
  planIntro: (d) =>
    `Hosting, Domain, Sicherheit und Änderungen: damit Ihre Website online und aktuell bleibt. Ohne Bindung, erste Abbuchung ${d} Tage nach der Bestellung.`,
  deliveredIn: "Lieferung in",
  included: "Inklusive",
  packs: {
    starter: {
      name: "Starter",
      summary: "Eine saubere, schnelle Landingpage, die auf den ersten Blick Vertrauen schafft.",
      points: ["1 komplette Landingpage (Hero, Leistungen, Kontakt)", "Kontaktformular + Mobile-Design", "Technische Basis-SEO", "Lieferung in 5 Werktagen nach Erhalt Ihrer Inhalte"],
      delivery: "5 Werktage",
    },
    business: {
      name: "Business",
      summary: "Die komplette professionelle Website mit bis zu 6 Seiten, gemacht, um Besucher in Kunden zu verwandeln.",
      points: ["Bis zu 6 Seiten, Logo und visuelle Identität inklusive", "Vollständige technische SEO, Premium-Design", "Offertformular + WhatsApp", "3 Korrekturschleifen inklusive", "Lieferung in 5 Werktagen nach Erhalt Ihrer Inhalte"],
      delivery: "5 Werktage",
    },
  },
  plans: {
    essentiel: { name: "Essentiel", tagline: "Wir kümmern uns um alles", points: ["Hosting, Domain, Sicherheit, Backups", "1 kleine Änderung pro Monat", "Antwort innert 72 h"] },
    confort: { name: "Confort", tagline: "Für eine Website, die sich weiterentwickelt", points: ["Alles aus Essentiel", "3 Änderungen pro Monat", "Monatsbericht + Google-Bewertungen im Blick", "Antwort innert 24 h"] },
    pro: { name: "Pro", tagline: "Verstärkte Betreuung", points: ["Alles aus Confort", "Unbegrenzte Änderungen (angemessene Nutzung)", "Direkter WhatsApp-Support", "Antwort innert 4 Arbeitsstunden"] },
    none: { name: "Ohne Abonnement", tagline: "Ich kümmere mich selbst ums Hosting", points: ["Ich erhalte die Zugänge bei der Lieferung", "Hosting, Domain und Updates liegen bei mir"] },
  },
  perMonth: "/Monat",
  none: "Keines",
  fields: {
    name: "Vor- und Nachname *", namePh: "Hans Muster", company: "Unternehmen", companyPh: "Bäckerei Muster",
    email: "E-Mail *", emailPh: "hans@beispiel.ch", phone: "Telefon", phonePh: "+41 79 123 45 67",
  },
  summary: {
    title: "Zusammenfassung", pack: "Paket", subscription: "Abonnement", payToday: "Heute zu zahlen",
    thenPer: (p, d) => `danach ${p}/Monat ab dem ${d}. Tag, ohne Bindung`,
    vat: "MwSt. nicht anwendbar — Art. 293 B des französischen Steuergesetzes",
  },
  terms: {
    accept: "Ich akzeptiere die nachstehenden Verkaufs- und Abonnementbedingungen. *",
    read: "Bedingungen lesen",
    items: [
      "Das Paket wird bei der Bestellung bezahlt; die Lieferung erfolgt innert 5 Werktagen nach Erhalt Ihrer Inhalte.",
      "Die enthaltenen Korrekturen sind die im Paket beschriebenen; jede zusätzliche Funktion wird separat offeriert.",
      "Das Abonnement wird monatlich per Karte abgebucht, ohne Bindung, mit einem Monat Kündigungsfrist per einfacher Nachricht kündbar.",
      "Im Abonnement enthaltene Änderungen sind nicht auf den Folgemonat übertragbar.",
      "Ihre Daten und Inhalte bleiben Ihr Eigentum; die Zugänge erhalten Sie auf Anfrage.",
    ],
  },
  submit: (p) => `${p} bezahlen und meine Website starten`,
  loading: "Zahlung wird geöffnet…",
  secure: "Sichere Zahlung über Stripe. Ich sehe Ihre Kartendaten nie.",
  errorGeneric: "Die Zahlung konnte nicht geöffnet werden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns.",
  checkoutVat: "MwSt. nicht anwendbar, Art. 293 B des französischen Steuergesetzes. Lieferung in 5 Werktagen nach Erhalt Ihrer Inhalte.",
  email: {
    confirmedEyebrow: "Bestellung bestätigt",
    title: (n, p) => `Danke ${n}, Ihr Paket ${p} ist gestartet`,
    intro: "Ihre Zahlung ist eingegangen. Um die Lieferfrist von 5 Werktagen einzuhalten, fehlen mir noch Ihre Inhalte: das dauert 5 Minuten.",
    packLabel: "Paket", planLabel: "Abonnement", planNone: "Keines",
    nextTitle: "Wie es weitergeht",
    step1: ["1. Ihre Inhalte", "Füllen Sie das Startformular aus (Link unten): Tätigkeit, Texte, Fotos, Farben."],
    step2: ["2. Umsetzung", "Lieferung innert 5 Werktagen nach Erhalt Ihrer Inhalte."],
    step3: ["3. Abonnement", ""],
    step3Sub: (p, d) => `Die erste Abbuchung von ${p} erfolgt ${d} Tage nach der Bestellung, danach jeden Monat. Ohne Bindung, mit einem Monat Frist kündbar.`,
    step3None: "Sie erhalten die Zugänge bei der Lieferung. Hosting und Updates liegen bei Ihnen.",
    cta: "Mein Startformular ausfüllen",
    subject: (p) => `Bestellung bestätigt — Paket ${p}, KAH Digital Studio`,
    briefSubject: "Ihr Briefing ist eingegangen — KAH Digital Studio",
    briefEyebrow: "Briefing erhalten", briefTitle: "Danke, ich lege los",
    briefIntro: "Hier die Zusammenfassung Ihrer Angaben. Die Lieferfrist von 5 Werktagen beginnt jetzt. Falls etwas nicht stimmt, antworten Sie einfach auf diese E-Mail.",
  },
  thanks: {
    title: "Bestellung bestätigt",
    body: (n, p, price, plan, planPrice, hasSub, d) =>
      `Danke ${n}! Ihr Paket ${p} (${price}) ist bezahlt.${hasSub ? ` Ihr Abonnement ${plan} (${planPrice}/Monat) beginnt ${d} Tage nach der Bestellung.` : ""}`,
    mailed: (e) => `Eine Bestätigungs-E-Mail wurde soeben an ${e} gesendet.`,
    lastStep: "Letzter Schritt",
    formTitle: "Senden Sie mir Ihre Inhalte (5 Minuten)",
    formIntro: "Die Lieferfrist von 5 Werktagen beginnt, sobald ich dieses Formular erhalte.",
    genericTitle: "Danke für Ihre Bestellung",
    genericBody: "Wenn Ihre Zahlung durchgegangen ist, erhalten Sie eine Bestätigungs-E-Mail mit dem Link zu Ihrem Startformular.",
    home: "Zurück zur Startseite",
  },
  brief: {
    businessName: "Name für die Website", businessNamePh: "Bäckerei Muster",
    activity: "Ihre Tätigkeit in einem Satz *", activityPh: "Handwerksbäckerei, Sauerteigbrot und Gebäck",
    city: "Ort oder Einsatzgebiet", cityPh: "Zürich und Umgebung",
    services: "Ihre Leistungen oder Produkte, Öffnungszeiten, Preise zur Anzeige", servicesPh: "Listen Sie auf, was Sie anbieten, Ihre Zeiten und Preise, falls gewünscht…",
    tone: "Gewünschter Ton und Farben", tonePh: "Warm, Creme- und Dunkelgrüntöne",
    domain: "Bestehende Domain (falls vorhanden)", domainPh: "baeckerei-muster.ch",
    links: "Nützliche Links (Social Media, alte Website, Google-Eintrag)",
    assets: "Logo und Fotos (Link zu Google Drive, WeTransfer, Dropbox…)", assetsPh: "https://drive.google.com/…",
    notes: "Möchten Sie mir sonst noch etwas mitteilen?",
    send: "Mein Briefing senden", sending: "Wird gesendet…",
    doneTitle: "Briefing erhalten, ich lege los",
    doneBody: "Die Lieferfrist von 5 Werktagen beginnt jetzt. Sie erhalten eine Kopie Ihres Briefings per E-Mail.",
  },
};

export const ORDER_COPY: Record<Locale, OrderCopy> = { fr: FR, en: EN, de: DE };
