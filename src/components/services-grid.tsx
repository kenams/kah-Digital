"use client";

import Link from "next/link";
import { FiArrowRight, FiGlobe, FiMessageSquare, FiTool } from "react-icons/fi";
import { useLocale } from "@/lib/locale";

export function ServicesGrid() {
  const { locale, prefix } = useLocale();
  const copy = {
    fr: {
      title: "3 leviers clairs pour comprendre KAH-Digital en quelques secondes",
      body:
        "La home doit se lire vite. KAH-Digital s'organise donc autour de trois missions simples a comprendre, a expliquer et a vendre.",
      cta: "Voir le cadre",
      items: [
        {
          icon: FiGlobe,
          stage: "01 Capter",
          title: "Site premium et pages d'acquisition",
          description:
            "Pour rendre l'offre plus lisible, inspirer confiance des la premiere seconde et transformer plus de visites en demandes utiles.",
          chips: ["Site vitrine", "Landing page", "SEO propre", "Parcours de conversion"],
          href: "/services/site-web",
        },
        {
          icon: FiMessageSquare,
          stage: "02 Automatiser",
          title: "Assistant IA et support intelligent",
          description: "Pour absorber les questions repetitives, qualifier les demandes et garder un passage propre vers l'humain.",
          chips: ["Assistant IA", "Qualification", "FAQ vivante", "Routage support"],
          href: "/automatisation-ia-entreprise",
        },
        {
          icon: FiTool,
          stage: "03 Operer",
          title: "Portail client, outil metier, workflow",
          description: "Pour remplacer les allers-retours manuels par un systeme plus propre, plus rapide et plus simple a suivre.",
          chips: ["Portail prive", "Dashboard", "GLPI", "Automatisation metier"],
          href: "/services/applications",
        },
      ],
    },
    en: {
      title: "3 clear levers to understand KAH-Digital in seconds",
      body: "The homepage should be understood quickly. KAH-Digital is therefore built around three missions that are easy to grasp, explain, and sell.",
      cta: "See the frame",
      items: [
        {
          icon: FiGlobe,
          stage: "01 Capture",
          title: "Premium website and acquisition pages",
          description: "To make the offer clearer, build trust faster, and turn more visits into qualified requests.",
          chips: ["Showcase site", "Landing page", "Clean SEO", "Conversion path"],
          href: "/services/site-web",
        },
        {
          icon: FiMessageSquare,
          stage: "02 Automate",
          title: "AI assistant and smart support",
          description: "To absorb repetitive questions, qualify requests, and keep a clean path to a human when needed.",
          chips: ["AI assistant", "Qualification", "Living FAQ", "Support routing"],
          href: "/automatisation-ia-entreprise",
        },
        {
          icon: FiTool,
          stage: "03 Operate",
          title: "Client portal, business tool, workflow",
          description: "To replace manual back-and-forth with a cleaner system that is easier to run and easier to monitor.",
          chips: ["Private portal", "Dashboard", "GLPI", "Business automation"],
          href: "/services/applications",
        },
      ],
    },
    de: {
      title: "3 klare Hebel, um KAH-Digital in wenigen Sekunden zu verstehen",
      body: "Die Startseite soll schnell verstanden werden. Darum organisiert sich KAH-Digital um drei Missionen, die klar, erklaerbar und verkaufsstark sind.",
      cta: "Rahmen ansehen",
      items: [
        {
          icon: FiGlobe,
          stage: "01 Erfassen",
          title: "Premium-Website und Akquise-Seiten",
          description: "Um das Angebot klarer zu machen, schneller Vertrauen aufzubauen und mehr qualifizierte Anfragen zu erzeugen.",
          chips: ["Unternehmenswebsite", "Landingpage", "Sauberes SEO", "Conversion-Pfad"],
          href: "/services/site-web",
        },
        {
          icon: FiMessageSquare,
          stage: "02 Automatisieren",
          title: "KI-Assistent und smarter Support",
          description: "Um repetitive Fragen zu absorbieren, Anfragen zu qualifizieren und Menschen sauber einzubinden.",
          chips: ["KI-Assistent", "Qualifizierung", "Dynamische FAQ", "Support-Routing"],
          href: "/automatisation-ia-entreprise",
        },
        {
          icon: FiTool,
          stage: "03 Umsetzen",
          title: "Kundenportal, Business-Tool, Workflow",
          description: "Um manuelle Schleifen durch ein saubereres System zu ersetzen, das einfacher laeuft und leichter steuerbar ist.",
          chips: ["Privates Portal", "Dashboard", "GLPI", "Business-Automatisierung"],
          href: "/services/applications",
        },
      ],
    },
  }[locale];

  const withPrefix = (path: string) => (prefix ? `${prefix}${path}` : path);

  return (
    <section className="section-shell">
      <div className="mb-10 text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-white/50">Offer map</p>
        <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">{copy.title}</h2>
        <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-white/70 sm:text-lg">{copy.body}</p>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {copy.items.map((service) => (
          <div
            key={service.title}
            className="premium-card group rounded-[28px] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 text-white shadow-[0_25px_70px_rgba(0,0,0,0.35)]"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/6 text-[#f3ddb0]">
                <service.icon size={22} />
              </div>
              <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[0.68rem] uppercase tracking-[0.28em] text-white/45">
                {service.stage}
              </span>
            </div>
            <h3 className="mt-6 text-2xl font-semibold text-white">{service.title}</h3>
            <p className="mt-4 text-sm leading-7 text-white/70">{service.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {service.chips.map((chip) => (
                <span key={chip} className="rounded-full border border-white/12 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.22em] text-white/58">
                  {chip}
                </span>
              ))}
            </div>
            <Link href={withPrefix(service.href)} className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#f3ddb0] transition group-hover:text-white">
              {copy.cta}
              <FiArrowRight className="transition group-hover:translate-x-1" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
