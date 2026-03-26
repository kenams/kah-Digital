import Link from "next/link";
import { FiArrowRight, FiGlobe, FiMessageSquare, FiTool } from "react-icons/fi";
import type { Locale } from "@/lib/locales";
import { withLocalePrefix } from "@/lib/locales";

type ServicesPageContentProps = {
  locale: Locale;
};

const copy = {
  fr: {
    eyebrow: "Capture, automatisation, operations",
    title: "Des services penses pour vendre mieux et operer plus proprement.",
    intro:
      "KAH-Digital ne vend pas une liste de prestations abstraites. Le studio s'organise autour de trois leviers concrets: rendre l'offre plus lisible, absorber le support repetitif, et structurer les operations utiles.",
    servicesTitle: "Les 3 leviers KAH",
    servicesBody:
      "Chaque mission doit aider une entreprise a gagner en clarte, en confiance ou en execution. Si ca ne sert pas cet objectif, on ne le vend pas comme un service.",
    manifestoTitle: "Ce que le tunnel doit faire",
    manifestoItems: [
      "donner une lecture immediate du positionnement",
      "montrer une offre credible, pas un catalogue flou",
      "faire comprendre ou l'IA apporte un vrai gain",
      "diriger vers le bon point d'entree sans surcharge",
    ],
    entriesTitle: "Pages d'entree utiles",
    entriesBody:
      "Des pages plus specifiques pour capter une demande selon le contexte, sans forcer tout le monde a entrer par le meme angle.",
    entriesCta: "Ouvrir la page",
    sectionTitle: "Un studio plus selectif, donc plus lisible",
    sectionBody:
      "On prefere une offre plus courte, plus claire et plus defendable. C'est ce qui aide a attirer de meilleurs clients et a faire gagner du temps des deux cotes.",
    ctaTitle: "Besoin de cadrer le bon levier pour ton cas ?",
    ctaBody: "On peut t'aider a choisir entre site premium, assistant IA, portail ou combinaison plus utile pour ton activite.",
    ctaLabel: "Demander un devis",
    learnMore: "Voir le detail",
    services: [
      {
        icon: FiGlobe,
        stage: "01 Capter",
        title: "Site premium et pages d'acquisition",
        description:
          "Pour rendre l'offre plus lisible, inspirer confiance des la premiere seconde et transformer plus de visites en demandes utiles.",
        href: "/services/site-web",
        features: ["Design responsive", "Structure claire", "SEO de base propre", "Paiement simple en option", "Mise en ligne accompagnee"],
      },
      {
        icon: FiMessageSquare,
        stage: "02 Automatiser",
        title: "Assistant IA et support intelligent",
        description: "Pour absorber les questions repetitives, qualifier les demandes et garder un passage propre vers l'humain.",
        href: "/automatisation-ia-entreprise",
        features: ["Base de reponses", "Qualification", "Routage utile", "Widget web", "Approche mesurable"],
      },
      {
        icon: FiTool,
        stage: "03 Operer",
        title: "Applications, portails et workflows",
        description: "Pour remplacer les allers-retours manuels par un systeme plus propre, plus rapide et plus simple a suivre.",
        href: "/services/applications",
        features: ["Architecture evolutive", "Interface utile", "Integrations possibles", "Accompagnement projet", "GLPI si pertinent"],
      },
    ],
  },
  en: {
    eyebrow: "Capture, automation, operations",
    title: "Services designed to sell better and operate more cleanly.",
    intro:
      "KAH-Digital does not sell an abstract list of deliverables. The studio is built around three concrete levers: making the offer clearer, reducing repetitive support, and structuring useful operations.",
    servicesTitle: "The 3 KAH levers",
    servicesBody:
      "Each mission should help a company gain clarity, trust, or execution speed. If it does not serve that goal, it does not belong in the offer.",
    manifestoTitle: "What the funnel should do",
    manifestoItems: [
      "make the positioning obvious at a glance",
      "show a credible offer instead of a vague catalog",
      "explain where AI creates real value",
      "route visitors to the right entry point without clutter",
    ],
    entriesTitle: "Useful entry pages",
    entriesBody:
      "More specific entry pages to capture intent depending on context, without forcing everyone through the same angle.",
    entriesCta: "Open page",
    sectionTitle: "A more selective studio, therefore a clearer one",
    sectionBody:
      "We prefer a shorter, clearer, more defensible offer. That is what helps attract better clients and save time on both sides.",
    ctaTitle: "Need help choosing the right lever for your case?",
    ctaBody: "We can help you decide between a premium website, AI assistant, client portal, or a more useful combination.",
    ctaLabel: "Request a quote",
    learnMore: "See details",
    services: [
      {
        icon: FiGlobe,
        stage: "01 Capture",
        title: "Premium website and acquisition pages",
        description: "To make the offer clearer, build trust faster, and turn more visits into qualified requests.",
        href: "/services/site-web",
        features: ["Responsive design", "Clear structure", "Clean SEO basics", "Simple payment optional", "Supported launch"],
      },
      {
        icon: FiMessageSquare,
        stage: "02 Automate",
        title: "AI assistant and smart support",
        description: "To absorb repetitive questions, qualify requests, and keep a clean path to a human when needed.",
        href: "/automatisation-ia-entreprise",
        features: ["Knowledge base", "Qualification", "Useful routing", "Web widget", "Measurable approach"],
      },
      {
        icon: FiTool,
        stage: "03 Operate",
        title: "Applications, portals, and workflows",
        description: "To replace manual back-and-forth with a cleaner system that is easier to run and easier to monitor.",
        href: "/services/applications",
        features: ["Scalable architecture", "Useful interface", "Possible integrations", "Project support", "GLPI if relevant"],
      },
    ],
  },
  de: {
    eyebrow: "Capture, Automatisierung, Operations",
    title: "Services, die besser verkaufen und sauberer operieren lassen.",
    intro:
      "KAH-Digital verkauft keine abstrakte Liste von Leistungen. Das Studio organisiert sich um drei konkrete Hebel: das Angebot klarer machen, repetitiven Support reduzieren und nuetzliche Operations strukturieren.",
    servicesTitle: "Die 3 KAH Hebel",
    servicesBody:
      "Jede Mission soll einem Unternehmen mehr Klarheit, Vertrauen oder Ausfuehrungsstaerke geben. Wenn sie dieses Ziel nicht stuetzt, gehoert sie nicht ins Angebot.",
    manifestoTitle: "Was der Funnel leisten muss",
    manifestoItems: [
      "die Positionierung sofort klar machen",
      "ein glaubwuerdiges Angebot statt eines vagen Katalogs zeigen",
      "erklaeren, wo KI echten Nutzen bringt",
      "Besucher ohne Ueberladung zum richtigen Einstieg fuehren",
    ],
    entriesTitle: "Nuetzliche Einstiegsseiten",
    entriesBody:
      "Spezifischere Einstiegsseiten, um Intent je nach Kontext sauber aufzufangen, ohne alle durch denselben Einstieg zu zwingen.",
    entriesCta: "Seite oeffnen",
    sectionTitle: "Ein selektiveres Studio und dadurch ein klareres Angebot",
    sectionBody:
      "Wir bevorzugen ein kuerzeres, klareres und besser verteidigbares Angebot. Genau das hilft, bessere Kunden zu gewinnen und auf beiden Seiten Zeit zu sparen.",
    ctaTitle: "Du willst den passenden Hebel fuer deinen Fall sauber einordnen?",
    ctaBody: "Wir helfen dir zu entscheiden zwischen Premium-Website, KI-Assistent, Portal oder einer sinnvolleren Kombination.",
    ctaLabel: "Projekt anfragen",
    learnMore: "Details ansehen",
    services: [
      {
        icon: FiGlobe,
        stage: "01 Erfassen",
        title: "Premium-Website und Akquise-Seiten",
        description: "Um das Angebot klarer zu machen, schneller Vertrauen aufzubauen und mehr qualifizierte Anfragen zu erzeugen.",
        href: "/services/site-web",
        features: ["Responsives Design", "Klare Struktur", "Saubere SEO-Basis", "Einfache Zahlung optional", "Begleiteter Launch"],
      },
      {
        icon: FiMessageSquare,
        stage: "02 Automatisieren",
        title: "KI-Assistent und smarter Support",
        description: "Um repetitive Fragen zu absorbieren, Anfragen zu qualifizieren und Menschen sauber einzubinden.",
        href: "/automatisation-ia-entreprise",
        features: ["Wissensbasis", "Qualifizierung", "Nuetzliches Routing", "Web-Widget", "Messbarer Ansatz"],
      },
      {
        icon: FiTool,
        stage: "03 Umsetzen",
        title: "Anwendungen, Portale und Workflows",
        description: "Um manuelle Schleifen durch ein saubereres System zu ersetzen, das einfacher laeuft und leichter steuerbar ist.",
        href: "/services/applications",
        features: ["Skalierbare Architektur", "Nuetzliche Oberflaeche", "Moegliche Integrationen", "Projektbegleitung", "GLPI wenn passend"],
      },
    ],
  },
} as const;

const entryPages = {
  fr: [
    { title: "Site web entreprise", href: "/site-web-entreprise" },
    { title: "Refonte site web", href: "/refonte-site-web" },
    { title: "Application web sur mesure", href: "/application-web-sur-mesure" },
    { title: "Automatisation IA entreprise", href: "/automatisation-ia-entreprise" },
  ],
  en: [
    { title: "Business website", href: "/site-web-entreprise" },
    { title: "Website redesign", href: "/refonte-site-web" },
    { title: "Custom web app", href: "/application-web-sur-mesure" },
    { title: "AI automation for business", href: "/automatisation-ia-entreprise" },
  ],
  de: [
    { title: "Unternehmenswebsite", href: "/site-web-entreprise" },
    { title: "Website-Refonte", href: "/refonte-site-web" },
    { title: "Individuelle Web-App", href: "/application-web-sur-mesure" },
    { title: "KI-Automatisierung fuer Unternehmen", href: "/automatisation-ia-entreprise" },
  ],
} as const;

export function ServicesPageContent({ locale }: ServicesPageContentProps) {
  const content = copy[locale];
  const entries = entryPages[locale];

  return (
    <>
      <section className="section-shell pt-8 sm:pt-10 lg:pt-12">
        <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[linear-gradient(135deg,rgba(9,8,7,0.96),rgba(19,17,14,0.96))] p-6 shadow-[0_40px_140px_rgba(0,0,0,0.45)] sm:p-8 lg:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(214,179,106,0.18),transparent_30%),radial-gradient(circle_at_85%_18%,rgba(127,184,199,0.14),transparent_25%)]" />
          <div className="relative grid gap-8 lg:grid-cols-[1.15fr,0.85fr] lg:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-white/55">{content.eyebrow}</p>
              <h1 className="mt-5 max-w-4xl text-4xl font-semibold text-white sm:text-5xl lg:text-6xl">{content.title}</h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-white/72 sm:text-lg">{content.intro}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href={withLocalePrefix("/devis", locale)}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-black transition hover:bg-neutral-200"
                >
                  {content.ctaLabel}
                  <FiArrowRight className="text-black/60" />
                </Link>
                <Link
                  href={withLocalePrefix("/contact", locale)}
                  className="rounded-full border border-white/20 px-6 py-3 font-semibold text-white/85 transition hover:border-white hover:text-white"
                >
                  {locale === "fr" ? "Parler du besoin" : locale === "en" ? "Discuss the need" : "Bedarf besprechen"}
                </Link>
              </div>
            </div>
            <div className="grid gap-3">
              {content.manifestoItems.map((item, index) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-black/25 px-4 py-4 text-white/78">
                  <p className="text-[0.68rem] uppercase tracking-[0.28em] text-white/42">0{index + 1} / {content.manifestoTitle}</p>
                  <p className="mt-3 text-sm leading-7">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-white/50">Services</p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">{content.servicesTitle}</h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-white/70 sm:text-lg">{content.servicesBody}</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {content.services.map((service) => (
            <article
              key={service.title}
              className="premium-card rounded-[30px] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 text-white shadow-[0_25px_80px_rgba(0,0,0,0.35)]"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/6 text-[#f3ddb0]">
                  <service.icon size={22} />
                </div>
                <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[0.68rem] uppercase tracking-[0.28em] text-white/42">
                  {service.stage}
                </span>
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-white">{service.title}</h3>
              <p className="mt-4 text-sm leading-7 text-white/70">{service.description}</p>
              <div className="mt-5 space-y-3">
                {service.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/72">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#d6b36a]" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <Link
                href={withLocalePrefix(service.href, locale)}
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#f3ddb0] transition hover:text-white"
              >
                {content.learnMore}
                <FiArrowRight />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="accent-section">
          <div className="content px-6 py-10 sm:px-8">
            <div className="grid gap-8 lg:grid-cols-[0.9fr,1.1fr] lg:items-center">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-white/50">{content.entriesTitle}</p>
                <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">{content.sectionTitle}</h2>
                <p className="mt-4 max-w-3xl text-base leading-7 text-white/68 sm:text-lg">{content.entriesBody}</p>
                <p className="mt-6 max-w-3xl text-sm leading-7 text-white/58">{content.sectionBody}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {entries.map((page) => (
                  <div key={page.href} className="premium-card rounded-3xl border border-white/10 bg-white/5 p-5">
                    <p className="text-xs uppercase tracking-[0.28em] text-white/42">{content.entriesTitle}</p>
                    <h3 className="mt-3 text-xl font-semibold text-white">{page.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-white/68">
                      {locale === "fr"
                        ? "Point d'entree plus specifique pour capter un besoin avec le bon angle."
                        : locale === "en"
                          ? "A more specific entry page to capture intent through the right angle."
                          : "Spezifischer Einstieg, um Bedarf ueber den passenden Winkel abzufangen."}
                    </p>
                    <Link
                      href={withLocalePrefix(page.href, locale)}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#f3ddb0] transition hover:text-white"
                    >
                      {content.entriesCta}
                      <FiArrowRight />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="rounded-[32px] border border-white/12 bg-[linear-gradient(135deg,rgba(214,179,106,0.16),rgba(127,184,199,0.12),rgba(255,255,255,0.04))] px-6 py-10 shadow-[0_30px_120px_rgba(0,0,0,0.35)] sm:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-white/50">CTA</p>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">{content.ctaTitle}</h2>
              <p className="mt-4 max-w-3xl text-base leading-7 text-white/72 sm:text-lg">{content.ctaBody}</p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
              <Link
                href={withLocalePrefix("/devis", locale)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3 font-semibold text-black transition hover:bg-neutral-200"
              >
                {content.ctaLabel}
                <FiArrowRight className="text-black/60" />
              </Link>
              <Link
                href={withLocalePrefix("/contact", locale)}
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-3 font-semibold text-white/85 transition hover:border-white hover:text-white"
              >
                {locale === "fr" ? "Nous contacter" : locale === "en" ? "Contact us" : "Kontakt"}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
