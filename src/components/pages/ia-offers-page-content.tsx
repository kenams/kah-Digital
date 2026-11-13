import Link from "next/link";
import { FiArrowRight, FiCheck, FiLock, FiShield, FiTarget } from "react-icons/fi";
import { IA_OFFERS, formatIaAmount, type IaLocale, type IaOffer } from "@/data/ia-offers";
import { SITE_URL } from "@/lib/shared-metadata";
import { JsonLd } from "@/components/json-ld";

const PREFIX: Record<IaLocale, string> = { fr: "", en: "/en", de: "/de" };

export const IA_PAGE_COPY = {
  fr: {
    eyebrow: "Formation · Mise en place · Accompagnement",
    h1: "L'IA utile à votre entreprise, de la formation à la mise en place",
    lead: "Tout le monde a accès aux mêmes outils. La différence, c'est de savoir s'en servir sur son propre métier, sans prendre de risque avec ses données.",
    ctaBusiness: "Offres entreprises",
    ctaPersonal: "Offres particuliers",
    approach: "Notre approche",
    principles: [
      { title: "Vos tâches, pas des exemples", text: "Chaque atelier part de ce que votre équipe fait vraiment chaque semaine." },
      { title: "Confidentialité d'abord", text: "On définit ce qui peut être confié à un outil IA et ce qui doit rester en interne." },
      { title: "Toujours vérifié par un humain", text: "L'IA prépare, une personne relit et valide. Rien ne part sans contrôle." },
    ],
    businessTitle: "Pour les entreprises",
    businessLead: "Indépendants, TPE et PME. Commencez par un atelier : il montre vite où l'IA fait gagner du temps chez vous.",
    stepsTitle: "Comment on avance",
    steps: [
      { title: "Atelier", text: "On identifie les tâches qui prennent du temps et on apprend à les traiter avec l'IA." },
      { title: "Mise en place", text: "On installe et on branche les outils sur le processus qui rapporte le plus." },
      { title: "Accompagnement", text: "On ajuste chaque mois et on forme les nouveaux arrivants." },
    ],
    personalTitle: "Pour les particuliers",
    personalLead: "Des sessions individuelles à distance pour utiliser l'IA sur un objectif précis.",
    faqTitle: "Questions fréquentes",
    faq: [
      { q: "Faut-il des connaissances techniques ?", a: "Non. Les ateliers sont pensés pour des personnes qui utilisent un ordinateur au quotidien, sans compétence technique particulière." },
      { q: "Quels outils utilisez-vous ?", a: "Les outils sont choisis selon votre besoin et vos règles de confidentialité (ChatGPT, Claude, Copilot, outils intégrés à vos logiciels…). Nous ne vous imposons pas d'abonnement." },
      { q: "La formation est-elle finançable par un OPCO ou le CPF ?", a: "Non, pas à ce jour : ces ateliers ne sont pas certifiés Qualiopi. Le prix affiché est le prix payé, TVA non applicable (art. 293 B du CGI)." },
      { q: "Comment se passe la suite après le paiement ?", a: "Vous recevez une confirmation, puis nous vous contactons sous 48 h ouvrées pour fixer la date et préparer la séance avec vous." },
      { q: "Et si la date ne convient plus ?", a: "La séance peut être déplacée sans frais en prévenant au moins 48 h avant. L'accompagnement mensuel se résilie à tout moment, effet à la fin du mois en cours." },
    ],
    question: "Une question avant de réserver ?",
    writeUs: "Écrivez-nous",
    featured: "Le plus choisi",
    from: "À partir de",
    perMonth: "mois",
    subscribe: "S'abonner",
    book: "Réserver et payer",
    quote: "Demander un devis",
    secure: "Paiement sécurisé par Stripe",
    home: "Accueil",
    crumb: "IA en entreprise",
    serviceName: "Formation et mise en place de l'IA",
  },
  en: {
    eyebrow: "Training · Implementation · Ongoing support",
    h1: "AI that actually helps your business, from training to implementation",
    lead: "Everyone has access to the same tools. The difference is knowing how to use them in your own line of work, without putting your data at risk.",
    ctaBusiness: "Business offers",
    ctaPersonal: "Personal offers",
    approach: "Our approach",
    principles: [
      { title: "Your tasks, not examples", text: "Every workshop starts from what your team really does each week." },
      { title: "Confidentiality first", text: "We define what can be handed to an AI tool and what must stay in-house." },
      { title: "Always checked by a human", text: "AI drafts, a person reviews and approves. Nothing goes out unchecked." },
    ],
    businessTitle: "For businesses",
    businessLead: "Freelancers, small and mid-sized companies. Start with a workshop: it quickly shows where AI saves you time.",
    stepsTitle: "How we work",
    steps: [
      { title: "Workshop", text: "We pinpoint the time-consuming tasks and learn to handle them with AI." },
      { title: "Implementation", text: "We install and connect the tools on the process with the biggest payoff." },
      { title: "Support", text: "We fine-tune every month and train new team members." },
    ],
    personalTitle: "For individuals",
    personalLead: "One-to-one remote sessions to use AI for a specific goal.",
    faqTitle: "Frequently asked questions",
    faq: [
      { q: "Do I need technical skills?", a: "No. The workshops are designed for people who use a computer every day, with no particular technical background." },
      { q: "Which tools do you use?", a: "Tools are chosen to fit your needs and confidentiality rules (ChatGPT, Claude, Copilot, AI built into your software…). We never force a subscription on you." },
      { q: "Which language are sessions held in?", a: "Sessions are run in French by default. If your team needs another language, contact us before booking and we will confirm what is possible." },
      { q: "Is VAT added to the price?", a: "No. The price shown is the price you pay: VAT is not applicable (French VAT exemption, art. 293 B of the CGI). Payment is processed securely by Stripe, which sends you a receipt." },
      { q: "What happens after payment?", a: "You get a confirmation, then we contact you within 2 business days to set the date and prepare the session with you." },
      { q: "What if the date no longer works?", a: "Sessions can be moved free of charge with at least 48 hours' notice. The monthly plan can be cancelled at any time, effective at the end of the current month." },
    ],
    question: "A question before booking?",
    writeUs: "Contact us",
    featured: "Most popular",
    from: "From",
    perMonth: "month",
    subscribe: "Subscribe",
    book: "Book and pay",
    quote: "Request a quote",
    secure: "Secure payment by Stripe",
    home: "Home",
    crumb: "AI for business",
    serviceName: "AI training and implementation",
  },
  de: {
    eyebrow: "Schulung · Einführung · Begleitung",
    h1: "KI, die Ihrem Unternehmen wirklich hilft – von der Schulung bis zur Einführung",
    lead: "Alle haben Zugang zu denselben Werkzeugen. Der Unterschied liegt darin, sie im eigenen Beruf richtig einzusetzen, ohne Risiko für Ihre Daten.",
    ctaBusiness: "Angebote für Unternehmen",
    ctaPersonal: "Angebote für Privatpersonen",
    approach: "Unser Ansatz",
    principles: [
      { title: "Ihre Aufgaben, keine Beispiele", text: "Jeder Workshop geht von dem aus, was Ihr Team jede Woche wirklich tut." },
      { title: "Vertraulichkeit zuerst", text: "Wir legen fest, was einem KI-Werkzeug anvertraut werden darf und was intern bleibt." },
      { title: "Immer von einem Menschen geprüft", text: "Die KI bereitet vor, ein Mensch prüft und gibt frei. Nichts geht ungeprüft raus." },
    ],
    businessTitle: "Für Unternehmen",
    businessLead: "Selbstständige, kleine und mittlere Unternehmen. Starten Sie mit einem Workshop: Er zeigt schnell, wo KI bei Ihnen Zeit spart.",
    stepsTitle: "So gehen wir vor",
    steps: [
      { title: "Workshop", text: "Wir finden die zeitraubenden Aufgaben und lernen, sie mit KI zu erledigen." },
      { title: "Einführung", text: "Wir installieren und verbinden die Werkzeuge im Prozess mit dem größten Nutzen." },
      { title: "Begleitung", text: "Wir passen jeden Monat an und schulen neue Mitarbeitende." },
    ],
    personalTitle: "Für Privatpersonen",
    personalLead: "Online-Einzelsitzungen, um KI für ein bestimmtes Ziel zu nutzen.",
    faqTitle: "Häufige Fragen",
    faq: [
      { q: "Brauche ich technische Kenntnisse?", a: "Nein. Die Workshops richten sich an Menschen, die täglich am Computer arbeiten, ohne besondere technische Vorkenntnisse." },
      { q: "Welche Werkzeuge verwenden Sie?", a: "Die Werkzeuge werden nach Ihrem Bedarf und Ihren Vertraulichkeitsregeln gewählt (ChatGPT, Claude, Copilot, KI in Ihrer Software…). Wir zwingen Ihnen kein Abonnement auf." },
      { q: "In welcher Sprache finden die Sitzungen statt?", a: "Die Sitzungen finden standardmäßig auf Französisch statt. Wenn Ihr Team eine andere Sprache benötigt, kontaktieren Sie uns vor der Buchung, und wir bestätigen, was möglich ist." },
      { q: "Kommt noch Mehrwertsteuer dazu?", a: "Nein. Der angezeigte Preis ist der Endpreis: keine MwSt. (französische Kleinunternehmerregelung, Art. 293 B CGI). Die Zahlung erfolgt sicher über Stripe, Sie erhalten eine Quittung per E-Mail." },
      { q: "Wie geht es nach der Zahlung weiter?", a: "Sie erhalten eine Bestätigung, dann melden wir uns innerhalb von 2 Werktagen, um den Termin festzulegen und die Sitzung vorzubereiten." },
      { q: "Und wenn der Termin nicht mehr passt?", a: "Die Sitzung kann bis 48 Stunden vorher kostenlos verschoben werden. Die monatliche Begleitung ist jederzeit zum Monatsende kündbar." },
    ],
    question: "Eine Frage vor der Buchung?",
    writeUs: "Schreiben Sie uns",
    featured: "Am beliebtesten",
    from: "Ab",
    perMonth: "Monat",
    subscribe: "Abonnieren",
    book: "Buchen und bezahlen",
    quote: "Angebot anfragen",
    secure: "Sichere Zahlung über Stripe",
    home: "Startseite",
    crumb: "KI im Unternehmen",
    serviceName: "KI-Schulung und -Einführung",
  },
} as const;

const PRINCIPLE_ICONS = [FiTarget, FiLock, FiShield];

function OfferCard({ offer, locale }: { offer: IaOffer; locale: IaLocale }) {
  const t = IA_PAGE_COPY[locale];
  const c = offer.copy[locale];
  const link = offer.payment?.[locale] ?? null;
  const cta = link ? (offer.monthly ? t.subscribe : t.book) : t.quote;
  const href = link?.url ?? `${PREFIX[locale]}/devis`;
  const amount = locale === "en" ? `€${formatIaAmount(offer.price, locale)}` : `${formatIaAmount(offer.price, locale)} €`;
  return (
    <article
      className={`relative flex h-full flex-col rounded-2xl border p-6 sm:p-7 ${
        offer.featured ? "border-[#d6b36a]/60 bg-[#d6b36a]/[0.07]" : "border-white/10 bg-white/[0.03]"
      }`}
    >
      {offer.featured && (
        <span className="absolute -top-3 left-6 rounded-full bg-[#d6b36a] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#0a0908]">
          {t.featured}
        </span>
      )}
      <h3 className="text-xl font-bold text-white">{c.name}</h3>
      <p className="mt-1 text-sm text-white/60">{c.format}</p>
      <p className="mt-5 text-[#f0d99b]">
        {offer.from && <span className="block text-xs font-semibold uppercase tracking-wider text-white/55">{t.from}</span>}
        <span className="text-3xl font-extrabold tracking-tight">{amount}</span>
        {offer.monthly && <span className="ml-1 text-sm font-medium text-white/60">/ {t.perMonth}</span>}
      </p>
      <p className="mt-4 text-sm leading-relaxed text-white/80">{c.pitch}</p>
      <ul className="mt-5 flex-1 space-y-2.5 text-sm text-white/75">
        {c.includes.map((item) => (
          <li key={item} className="flex gap-2.5">
            <FiCheck size={16} className="mt-0.5 shrink-0 text-[#d6b36a]" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <a
        href={href}
        {...(link ? { rel: "noopener" } : {})}
        className={`mt-7 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0d99b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0908] ${
          offer.featured
            ? "bg-[#d6b36a] text-[#0a0908] hover:bg-[#f0d99b]"
            : "border border-white/20 text-white hover:border-[#d6b36a]/70 hover:bg-white/[0.06]"
        }`}
      >
        {cta} <FiArrowRight size={15} aria-hidden="true" />
      </a>
      {link && <p className="mt-3 text-center text-xs text-white/45">{t.secure}</p>}
    </article>
  );
}

export function IaOffersPageContent({ locale }: { locale: IaLocale }) {
  const t = IA_PAGE_COPY[locale];
  const prefix = PREFIX[locale];
  const pageUrl = `${SITE_URL}${prefix}/ia-entreprise`;
  const business = IA_OFFERS.filter((o) => o.audience === "entreprise");
  const personal = IA_OFFERS.filter((o) => o.audience === "particulier");
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: t.serviceName,
        serviceType: t.serviceName,
        inLanguage: locale,
        provider: { "@type": "Organization", name: "KAH Digital Studio", url: SITE_URL },
        areaServed: ["FR", "CH", "BE", "LU", "DE", "AT", "GB"],
        offers: IA_OFFERS.map((o) => ({
          "@type": "Offer",
          name: o.copy[locale].name,
          description: o.copy[locale].pitch,
          price: o.price,
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
          url: o.payment?.[locale].url ?? pageUrl,
          ...(o.monthly
            ? { priceSpecification: { "@type": "UnitPriceSpecification", price: o.price, priceCurrency: "EUR", unitCode: "MON" } }
            : {}),
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: t.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t.home, item: `${SITE_URL}${prefix || "/"}` },
          { "@type": "ListItem", position: 2, name: t.crumb, item: pageUrl },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#0a0908] text-white">
      <JsonLd data={graph} />

      <section className="section-shell">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 inline-flex rounded-full border border-[#d6b36a]/35 bg-[#d6b36a]/10 px-4 py-2 text-sm text-[#f0d99b]">{t.eyebrow}</p>
          <h1 className="text-4xl font-bold leading-tight text-balance sm:text-6xl">{t.h1}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/70">{t.lead}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="#entreprises" className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#d6b36a] px-6 font-semibold text-[#0a0908] transition hover:bg-[#f0d99b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0d99b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0908]">
              {t.ctaBusiness} <FiArrowRight aria-hidden="true" />
            </a>
            <a href="#particuliers" className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-white/20 px-6 font-semibold text-white transition hover:border-[#d6b36a]/70 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0d99b]">
              {t.ctaPersonal}
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-6 sm:px-6 lg:px-8" aria-label={t.approach}>
        <ul className="grid gap-4 md:grid-cols-3">
          {t.principles.map(({ title, text }, i) => {
            const Icon = PRINCIPLE_ICONS[i];
            return (
              <li key={title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <Icon size={20} className="text-[#d6b36a]" aria-hidden="true" />
                <h2 className="mt-3 text-base font-semibold text-white">{title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{text}</p>
              </li>
            );
          })}
        </ul>
      </section>

      <section id="entreprises" className="mx-auto max-w-7xl scroll-mt-28 px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="ent-title">
        <h2 id="ent-title" className="text-3xl font-bold sm:text-4xl">{t.businessTitle}</h2>
        <p className="mt-3 max-w-2xl text-white/65">{t.businessLead}</p>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4 xl:gap-5">
          {business.map((o) => (
            <OfferCard key={o.id} offer={o} locale={locale} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-4 sm:px-6 lg:px-8" aria-labelledby="steps-title">
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:p-10">
          <h2 id="steps-title" className="text-2xl font-bold">{t.stepsTitle}</h2>
          <ol className="mt-8 grid gap-6 md:grid-cols-3">
            {t.steps.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#d6b36a]/50 font-bold text-[#f0d99b]" aria-hidden="true">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-white">{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/65">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="particuliers" className="mx-auto max-w-6xl scroll-mt-28 px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="perso-title">
        <h2 id="perso-title" className="text-3xl font-bold sm:text-4xl">{t.personalTitle}</h2>
        <p className="mt-3 max-w-2xl text-white/65">{t.personalLead}</p>
        <div className="mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
          {personal.map((o) => (
            <OfferCard key={o.id} offer={o} locale={locale} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-20 sm:px-6" aria-labelledby="faq-title">
        <h2 id="faq-title" className="text-2xl font-bold">{t.faqTitle}</h2>
        <div className="mt-6 divide-y divide-white/10 rounded-2xl border border-white/10">
          {t.faq.map((f) => (
            <details key={f.q} className="group p-5 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0d99b]">
                {f.q}
                <span className="text-[#d6b36a] transition group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{f.a}</p>
            </details>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-white/60">
          {t.question}{" "}
          <Link href={`${prefix}/contact`} className="font-semibold text-[#f0d99b] underline-offset-4 hover:underline">
            {t.writeUs}
          </Link>
        </p>
      </section>
    </div>
  );
}
