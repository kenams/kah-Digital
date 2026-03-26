import Link from "next/link";
import type { Locale } from "@/lib/locales";
import { withLocalePrefix } from "@/lib/locales";

type OffersPageContentProps = {
  locale: Locale;
};

const copy = {
  fr: {
    backHome: "Retour a l'accueil",
    requestQuote: "Demander un devis",
    openConfigurator: "Ouvrir le configurateur",
    eyebrow: "Offres cadres",
    title: "Des offres plus simples a comprendre, plus faciles a acheter.",
    body:
      "Ici, le but n'est pas d'empiler des options. Chaque format montre ce que KAH-Digital peut livrer, pour quel type de besoin, et avec quel niveau d'intensite.",
    markers: [
      { label: "Lecture rapide", value: "1 offre = 1 usage clair" },
      { label: "Budget cadre", value: "Base lisible en CHF" },
      { label: "Execution", value: "Design, build, QA, mise en ligne" },
    ],
    offerLabel: "Format",
    budgetLabel: "Base budgetaire",
    timelineLabel: "Delai moyen",
    whyLabel: "Pourquoi ce cadre",
    includedLabel: "Ce qui est inclus",
    idealLabel: "Quand c'est le bon choix",
    finalEyebrow: "Et ensuite",
    finalTitle: "Si le cadre te parle, on affine ensuite le bon niveau de complexite.",
    finalBody:
      "Ces offres servent de point d'entree. Le vrai travail ensuite consiste a cadrer les details utiles, les integrations et les modules IA qui changent vraiment le resultat.",
    offers: [
      {
        id: "landing-conversion",
        title: "Landing conversion",
        price: "1'900 CHF",
        timeline: "3 semaines",
        summary: "Une page nette, orientee message et conversion, pour lancer une offre ou capter des leads qualifies.",
        why: "Le budget couvre le cadrage du message, la direction visuelle, l'integration du formulaire et une mise en ligne propre.",
        includes: [
          "Structure du message + hierarchie du hero",
          "Design premium sur une page",
          "Formulaire, CTA, tracking de base",
          "QA et mise en ligne",
        ],
        ideal: ["Lancement d'offre", "Campagne locale", "Premier funnel propre"],
      },
      {
        id: "portail-membres",
        title: "Portail membres prive",
        price: "5'900 CHF",
        timeline: "5 semaines",
        summary: "Un espace securise pour contenus, comptes, acces, abonnements et suivi d'utilisateurs.",
        why: "Le cadre inclut la logique d'authentification, les roles, le dashboard principal et la base de gestion.",
        includes: [
          "Auth + roles + gestion comptes",
          "Dashboard membre et parcours connecte",
          "Paiement recurrent si besoin",
          "Back-office simple pour operer",
        ],
        ideal: ["Formation", "Communaute", "Produit B2B avec acces prive"],
      },
      {
        id: "configurateur-deck",
        title: "Configurateur + dossier PDF",
        price: "7'900 CHF",
        timeline: "6 semaines",
        summary: "Un parcours interactif pour qualifier un besoin, produire une synthese claire et accelerer le cadrage commercial.",
        why: "Le budget couvre les ecrans, la logique de qualification, l'export PDF et le raccord avec l'outil de suivi.",
        includes: [
          "Parcours multi-etapes",
          "Recap projet + export PDF",
          "Connexion CRM / Notion / automation",
          "Support de vente plus defendable",
        ],
        ideal: ["Agence", "Studio", "Equipe sales", "Offre sur-mesure a structurer"],
      },
    ],
  },
  en: {
    backHome: "Back to home",
    requestQuote: "Request a quote",
    openConfigurator: "Open configurator",
    eyebrow: "Offer frames",
    title: "Offers that are easier to read, easier to buy, and easier to scope.",
    body:
      "The point here is not to stack options. Each format shows what KAH-Digital can deliver, for which kind of need, and at what level of intensity.",
    markers: [
      { label: "Fast read", value: "1 offer = 1 clear use case" },
      { label: "Budget frame", value: "Readable CHF baseline" },
      { label: "Execution", value: "Design, build, QA, launch" },
    ],
    offerLabel: "Format",
    budgetLabel: "Budget baseline",
    timelineLabel: "Average delivery",
    whyLabel: "Why this frame",
    includedLabel: "Included",
    idealLabel: "Best fit when",
    finalEyebrow: "Next move",
    finalTitle: "If the frame makes sense, the next step is refining the real complexity.",
    finalBody:
      "These offers are entry points, not rigid boxes. The useful work then becomes scoping the right details, integrations, and AI modules that actually improve the business result.",
    offers: [
      {
        id: "landing-conversion",
        title: "Conversion landing",
        price: "CHF 1,900",
        timeline: "3 weeks",
        summary: "A focused page built around message clarity and conversion for launches, campaigns, and qualified lead capture.",
        why: "The budget covers messaging structure, visual direction, form setup, and a clean launch.",
        includes: [
          "Message structure + hero hierarchy",
          "Premium one-page design",
          "Form, CTA, basic tracking",
          "QA and launch",
        ],
        ideal: ["Offer launch", "Local campaign", "First clean funnel"],
      },
      {
        id: "portail-membres",
        title: "Private member portal",
        price: "CHF 5,900",
        timeline: "5 weeks",
        summary: "A secure space for content, accounts, access control, subscriptions, and ongoing client operations.",
        why: "The frame includes authentication logic, roles, the core dashboard, and the operational base.",
        includes: [
          "Auth + roles + account management",
          "Member dashboard and logged-in flow",
          "Recurring payments if needed",
          "Simple back-office",
        ],
        ideal: ["Training", "Community", "B2B product with gated access"],
      },
      {
        id: "configurateur-deck",
        title: "Configurator + PDF deck",
        price: "CHF 7,900",
        timeline: "6 weeks",
        summary: "An interactive flow to qualify needs, generate a clear summary, and accelerate commercial scoping.",
        why: "The budget covers the screens, qualification logic, PDF export, and the connection to your internal workflow.",
        includes: [
          "Multi-step qualification flow",
          "Project recap + PDF export",
          "CRM / Notion / automation connection",
          "More defendable sales support",
        ],
        ideal: ["Agency", "Studio", "Sales team", "Custom offer to structure"],
      },
    ],
  },
  de: {
    backHome: "Zur Startseite",
    requestQuote: "Projekt anfragen",
    openConfigurator: "Konfigurator oeffnen",
    eyebrow: "Angebotsrahmen",
    title: "Angebote, die schneller verstanden, leichter bewertet und sauberer verkauft werden.",
    body:
      "Es geht hier nicht darum, moeglichst viele Optionen zu stapeln. Jeder Rahmen zeigt, was KAH-Digital liefern kann, fuer welchen Bedarf und mit welchem Intensitaetsniveau.",
    markers: [
      { label: "Schneller Einstieg", value: "1 Angebot = 1 klarer Anwendungsfall" },
      { label: "Budgetrahmen", value: "Lesbare CHF-Basis" },
      { label: "Umsetzung", value: "Design, Build, QA, Launch" },
    ],
    offerLabel: "Format",
    budgetLabel: "Budgetbasis",
    timelineLabel: "Durchschnittliche Dauer",
    whyLabel: "Warum dieser Rahmen",
    includedLabel: "Enthalten",
    idealLabel: "Passt besonders fuer",
    finalEyebrow: "Naechster Schritt",
    finalTitle: "Wenn der Rahmen passt, verfeinern wir danach die echte Komplexitaet.",
    finalBody:
      "Diese Angebote sind Einstiegsrahmen und keine starren Boxen. Der sinnvolle Schritt danach ist das saubere Scoping von Details, Integrationen und KI-Modulen, die das Resultat wirklich verbessern.",
    offers: [
      {
        id: "landing-conversion",
        title: "Conversion-Landingpage",
        price: "CHF 1'900",
        timeline: "3 Wochen",
        summary: "Eine fokussierte Seite fuer klares Messaging und Conversion bei Launches, Kampagnen und qualifizierter Lead-Gewinnung.",
        why: "Das Budget umfasst Messaging-Struktur, visuelle Richtung, Formular-Setup und einen sauberen Launch.",
        includes: [
          "Botschaftsstruktur + Hero-Hierarchie",
          "Premium One-Page Design",
          "Formular, CTA, Basis-Tracking",
          "QA und Launch",
        ],
        ideal: ["Angebotsstart", "Lokale Kampagne", "Erster sauberer Funnel"],
      },
      {
        id: "portail-membres",
        title: "Privates Mitgliederportal",
        price: "CHF 5'900",
        timeline: "5 Wochen",
        summary: "Ein sicherer Bereich fuer Inhalte, Konten, Zugriffe, Abos und laufende Nutzerverwaltung.",
        why: "Der Rahmen deckt Authentifizierung, Rollen, das Kern-Dashboard und die operative Basis ab.",
        includes: [
          "Auth + Rollen + Kontoverwaltung",
          "Mitglieder-Dashboard und Login-Flow",
          "Wiederkehrende Zahlungen falls noetig",
          "Einfaches Backoffice",
        ],
        ideal: ["Training", "Community", "B2B-Produkt mit geschuetztem Bereich"],
      },
      {
        id: "configurateur-deck",
        title: "Konfigurator + PDF-Dossier",
        price: "CHF 7'900",
        timeline: "6 Wochen",
        summary: "Ein interaktiver Ablauf, um Bedarf zu qualifizieren, ein klares Recap zu erzeugen und das kommerzielle Scoping zu beschleunigen.",
        why: "Das Budget umfasst Screens, Qualifikationslogik, PDF-Export und die Verbindung zu eurem internen Workflow.",
        includes: [
          "Mehrstufiger Qualifikationsablauf",
          "Projekt-Recap + PDF-Export",
          "CRM / Notion / Automation-Verbindung",
          "Sauberere Verkaufsunterlage",
        ],
        ideal: ["Agentur", "Studio", "Sales-Team", "Strukturierung eines Custom-Angebots"],
      },
    ],
  },
} as const;

export function OffersPageContent({ locale }: OffersPageContentProps) {
  const content = copy[locale];
  const homeHref = withLocalePrefix("/", locale);
  const quoteHref = withLocalePrefix("/devis", locale);
  const configuratorHref = withLocalePrefix("/configurateur", locale);

  return (
    <>
      <section className="section-shell pt-8 sm:pt-10 lg:pt-12">
        <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[linear-gradient(135deg,rgba(9,8,7,0.96),rgba(18,14,28,0.96))] p-6 shadow-[0_40px_140px_rgba(0,0,0,0.45)] sm:p-8 lg:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(214,179,106,0.16),transparent_30%),radial-gradient(circle_at_82%_20%,rgba(127,184,199,0.14),transparent_24%)]" />
          <div className="relative grid gap-8 lg:grid-cols-[1.05fr,0.95fr] lg:items-end">
            <div className="text-white">
              <div className="flex flex-wrap gap-3 text-sm text-white/70">
                <Link href={homeHref} className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white">
                  {content.backHome}
                </Link>
                <Link href={quoteHref} className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white">
                  {content.requestQuote}
                </Link>
              </div>
              <p className="mt-6 text-sm uppercase tracking-[0.35em] text-white/52">{content.eyebrow}</p>
              <h1 className="mt-5 max-w-4xl text-4xl font-semibold sm:text-5xl lg:text-6xl">{content.title}</h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-white/72 sm:text-lg">{content.body}</p>
            </div>
            <div className="grid gap-3">
              {content.markers.map((item, index) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-black/25 px-4 py-4 text-white/78">
                  <p className="text-[0.68rem] uppercase tracking-[0.28em] text-white/42">
                    0{index + 1} / {item.label}
                  </p>
                  <p className="mt-3 text-sm leading-7">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="space-y-6">
          {content.offers.map((offer, index) => (
            <section
              key={offer.id}
              id={offer.id}
              className={`rounded-[32px] border border-white/10 p-6 text-white shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:p-8 ${
                index % 2 === 0
                  ? "premium-card bg-[linear-gradient(145deg,rgba(12,10,18,0.96),rgba(7,7,10,0.96))]"
                  : "accent-section"
              }`}
            >
              <div className={index % 2 === 0 ? "" : "content"}>
                <div className="grid gap-8 lg:grid-cols-[0.95fr,1.05fr] lg:items-start">
                  <div>
                    <p className="text-[0.68rem] uppercase tracking-[0.32em] text-white/45">{content.offerLabel}</p>
                    <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">{offer.title}</h2>
                    <p className="mt-4 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">{offer.summary}</p>
                    <div className="mt-6 flex flex-wrap gap-3 text-sm">
                      <div className="rounded-full border border-white/12 bg-white/6 px-4 py-2">
                        {content.budgetLabel}: <span className="font-semibold text-white">{offer.price}</span>
                      </div>
                      <div className="rounded-full border border-white/12 bg-white/6 px-4 py-2">
                        {content.timelineLabel}: <span className="font-semibold text-white">{offer.timeline}</span>
                      </div>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-3 text-sm">
                      <Link href={quoteHref} className="rounded-full bg-white px-5 py-2.5 font-semibold text-black transition hover:bg-neutral-200">
                        {content.requestQuote}
                      </Link>
                      <Link
                        href={configuratorHref}
                        className="rounded-full border border-white/30 px-5 py-2.5 text-white/80 transition hover:border-white hover:bg-white/5 hover:text-white"
                      >
                        {content.openConfigurator}
                      </Link>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                    <div className="rounded-[26px] border border-white/10 bg-black/20 p-5">
                      <p className="text-[0.68rem] uppercase tracking-[0.3em] text-white/45">{content.whyLabel}</p>
                      <p className="mt-3 text-sm leading-7 text-white/72">{offer.why}</p>
                    </div>
                    <div className="rounded-[26px] border border-white/10 bg-black/20 p-5">
                      <p className="text-[0.68rem] uppercase tracking-[0.3em] text-white/45">{content.includedLabel}</p>
                      <ul className="mt-3 space-y-3 text-sm text-white/72">
                        {offer.includes.map((item) => (
                          <li key={item} className="flex gap-3">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--brand-gold)]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-[26px] border border-white/10 bg-black/20 p-5">
                      <p className="text-[0.68rem] uppercase tracking-[0.3em] text-white/45">{content.idealLabel}</p>
                      <ul className="mt-3 space-y-3 text-sm text-white/72">
                        {offer.ideal.map((item) => (
                          <li key={item} className="flex gap-3">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--brand-sky)]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="accent-section">
          <div className="content px-6 py-10 text-center sm:px-8 lg:px-10">
            <div className="mx-auto max-w-4xl">
              <p className="text-sm uppercase tracking-[0.35em] text-white/50">{content.finalEyebrow}</p>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">{content.finalTitle}</h2>
              <p className="mt-4 text-base leading-8 text-white/68 sm:text-lg">{content.finalBody}</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href={quoteHref} className="rounded-full bg-white px-6 py-3 font-semibold text-black transition hover:bg-neutral-200">
                  {content.requestQuote}
                </Link>
                <Link
                  href={configuratorHref}
                  className="rounded-full border border-white/30 px-6 py-3 text-white/80 transition hover:border-white hover:bg-white/5 hover:text-white"
                >
                  {content.openConfigurator}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
