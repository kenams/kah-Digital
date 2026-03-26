"use client";

import Link from "next/link";
import { FiCheckCircle, FiGlobe, FiLayers, FiMessageSquare } from "react-icons/fi";
import { useLocale } from "@/lib/locale";

export function GlobalTrustSection() {
  const { locale, prefix } = useLocale();
  const copy = {
    fr: {
      title: "Une offre d'entree claire pour demarrer vite",
      body: "Tu n'as pas besoin d'un grand chantier pour commencer. Il faut surtout une premiere brique utile, propre et mesurable.",
      offer: {
        eyebrow: "Offre phare",
        title: "Sprint Assistant IA Business",
        price: "A partir de 2'900 CHF",
        description:
          "Un assistant adapte a votre activite pour repondre, qualifier et orienter les demandes sans casser l'experience client.",
        bullets: [
          "Cadrage du use case principal",
          "Base de connaissances et reponses guidees",
          "Widget web ou point d'entree support",
          "Qualification et passage vers humain ou ticket",
        ],
      },
      items: [
        {
          icon: FiMessageSquare,
          title: "Ideal pour",
          description: "Support repetitif, FAQ lourde, qualification de leads ou tri des demandes avant intervention humaine.",
        },
        {
          icon: FiLayers,
          title: "Ce que tu obtiens",
          description: "Un systeme concret, visible et presentable a un vrai client, pas juste une experimentation technique.",
        },
        {
          icon: FiCheckCircle,
          title: "Pourquoi c'est fort",
          description: "Tu introduis l'IA avec une offre credible et vendable sans promettre un SaaS irreel a bas prix.",
        },
        {
          icon: FiGlobe,
          title: "Cadre",
          description: "Convient aux PME, marques et equipes support qui veulent une premiere automatisation sans derapage de scope.",
        },
      ],
      primary: "Lancer ce sprint",
      secondary: "Voir les modules IA",
      linksTitle: "Pages d'entree utiles",
      links: [
        { label: "Site web entreprise", href: "/site-web-entreprise" },
        { label: "Refonte site web", href: "/refonte-site-web" },
        { label: "Application web sur mesure", href: "/application-web-sur-mesure" },
        { label: "Automatisation IA entreprise", href: "/automatisation-ia-entreprise" },
      ],
    },
    en: {
      title: "A clear entry offer to move quickly",
      body: "You do not need a huge project to get started. You need a first brick that is useful, clean, and measurable.",
      offer: {
        eyebrow: "Signature offer",
        title: "AI Business Assistant Sprint",
        price: "Starting at CHF 2,900",
        description:
          "An assistant adapted to your business to reply, qualify, and route requests without damaging the client experience.",
        bullets: [
          "Main use-case scoping",
          "Knowledge base and guided replies",
          "Web widget or support entry point",
          "Qualification and human or ticket handoff",
        ],
      },
      items: [
        {
          icon: FiMessageSquare,
          title: "Ideal for",
          description: "Repetitive support, heavy FAQ flows, lead qualification, or request triage before human follow-up.",
        },
        {
          icon: FiLayers,
          title: "What you get",
          description: "A concrete system you can show to a real client, not just a technical proof of concept.",
        },
        {
          icon: FiCheckCircle,
          title: "Why it works",
          description: "You introduce AI with a credible and sellable offer without inventing a fake low-cost SaaS.",
        },
        {
          icon: FiGlobe,
          title: "Framework",
          description: "Fits SMBs, brands, and support teams that want a first automation step without scope drift.",
        },
      ],
      primary: "Start this sprint",
      secondary: "View AI modules",
      linksTitle: "Useful entry pages",
      links: [
        { label: "Business website", href: "/site-web-entreprise" },
        { label: "Website redesign", href: "/refonte-site-web" },
        { label: "Custom web app", href: "/application-web-sur-mesure" },
        { label: "AI automation for business", href: "/automatisation-ia-entreprise" },
      ],
    },
    de: {
      title: "Ein klares Einstiegsangebot fuer den schnellen Start",
      body: "Du brauchst kein riesiges Projekt, um zu starten. Du brauchst eine erste saubere und messbare Baustein-Loesung.",
      offer: {
        eyebrow: "Signature Offer",
        title: "KI Business Assistant Sprint",
        price: "Ab CHF 2'900",
        description:
          "Ein Assistent passend zu eurem Geschaeft, der Anfragen beantwortet, qualifiziert und sauber weiterleitet, ohne das Kundenerlebnis zu stoeren.",
        bullets: [
          "Scoping des Haupt-Use-Cases",
          "Wissensbasis und gefuehrte Antworten",
          "Web-Widget oder Support-Einstieg",
          "Qualifizierung und Uebergabe an Mensch oder Ticket",
        ],
      },
      items: [
        {
          icon: FiMessageSquare,
          title: "Ideal fuer",
          description: "Repetitiven Support, umfangreiche FAQs, Lead-Qualifizierung oder Vorsortierung vor dem menschlichen Team.",
        },
        {
          icon: FiLayers,
          title: "Was ihr bekommt",
          description: "Ein konkretes System, das man echten Kunden zeigen kann, statt nur eines technischen Tests.",
        },
        {
          icon: FiCheckCircle,
          title: "Warum das stark ist",
          description: "KI wird als glaubwuerdiges und verkaufbares Angebot positioniert, ohne ein unrealistisches Billig-SaaS zu behaupten.",
        },
        {
          icon: FiGlobe,
          title: "Rahmen",
          description: "Geeignet fuer KMU, Marken und Support-Teams, die einen ersten Automatisierungs-Schritt ohne Scope-Ausweitung wollen.",
        },
      ],
      primary: "Diesen Sprint starten",
      secondary: "KI-Module ansehen",
      linksTitle: "Nuetzliche Einstiegsseiten",
      links: [
        { label: "Unternehmenswebsite", href: "/site-web-entreprise" },
        { label: "Website-Refonte", href: "/refonte-site-web" },
        { label: "Individuelle Web-App", href: "/application-web-sur-mesure" },
        { label: "KI-Automatisierung fuer Unternehmen", href: "/automatisation-ia-entreprise" },
      ],
    },
  }[locale];

  const withPrefix = (path: string) => (prefix ? `${prefix}${path}` : path);

  return (
    <section className="section-shell">
      <div className="mb-10 text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-white/50">Offer</p>
        <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">{copy.title}</h2>
        <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-white/68 sm:text-lg">{copy.body}</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="rounded-[32px] border border-[#d6b36a]/30 bg-[linear-gradient(145deg,rgba(214,179,106,0.14),rgba(255,255,255,0.03))] p-6 text-white shadow-[0_30px_120px_rgba(0,0,0,0.35)]">
          <p className="text-xs uppercase tracking-[0.32em] text-[#f3ddb0]">{copy.offer.eyebrow}</p>
          <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h3 className="text-3xl font-semibold text-white">{copy.offer.title}</h3>
              <p className="mt-3 max-w-2xl text-base leading-7 text-white/72">{copy.offer.description}</p>
            </div>
            <div className="rounded-3xl border border-white/12 bg-black/25 px-5 py-4 text-left md:text-right">
              <p className="text-xs uppercase tracking-[0.28em] text-white/45">Budget</p>
              <p className="mt-2 text-2xl font-semibold text-white">{copy.offer.price}</p>
            </div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {copy.offer.bullets.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/72">
                <FiCheckCircle className="mt-0.5 shrink-0 text-[#d6b36a]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={withPrefix("/devis")} className="rounded-full bg-white px-5 py-3 font-semibold text-black transition hover:bg-neutral-200">
              {copy.primary}
            </Link>
            <Link
              href={withPrefix("/automatisation-ia-entreprise")}
              className="rounded-full border border-white/20 px-5 py-3 font-semibold text-white/90 transition hover:border-white hover:text-white"
            >
              {copy.secondary}
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {copy.items.map((item) => (
            <div key={item.title} className="premium-card rounded-3xl border border-white/10 bg-white/5 p-5 text-white">
              <item.icon className="text-[#7fb8c7]" size={22} />
              <h3 className="mt-4 text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/68">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-white/45">{copy.linksTitle}</p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          {copy.links.map((item) => (
            <Link
              key={item.href}
              href={withPrefix(item.href)}
              className="rounded-full border border-white/15 px-5 py-2 text-sm font-medium text-white/75 transition-colors hover:border-white hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
