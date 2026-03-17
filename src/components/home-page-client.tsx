"use client";

import Link from "next/link";
import { FiArrowRight, FiCheckCircle, FiClock, FiGlobe, FiMapPin, FiSmartphone } from "react-icons/fi";
import { ContactCard } from "@/components/contact-card";
import { ProjectCard } from "@/components/project-card";
import { Testimonials } from "@/components/testimonials";
import { portfolioProjects } from "@/data/portfolio";
import { portfolioProjectsEn } from "@/data/portfolio.en";
import type { HomePageData } from "@/data/home";
import { useLocale } from "@/lib/locale";

type HomePageClientProps = {
  data: HomePageData;
};

export function HomePageClient({ data }: HomePageClientProps) {
  const { services, processSteps, stats, fastDeals } = data;
  const { isEnglish, prefix } = useLocale();
  const projects = (isEnglish ? portfolioProjectsEn : portfolioProjects).slice(0, 3);

  const withPrefix = (path: string) => {
    if (!path.startsWith("/")) return path;
    if (path.endsWith(".pdf")) return path;
    if (path.startsWith("/admin")) return path;
    return prefix ? `${prefix}${path}` : path;
  };

  const heroBadges = isEnglish
    ? ["Lausanne, Switzerland", "Sites vitrines", "Applications web", "Delivery with clear scope"]
    : ["Lausanne, Suisse", "Sites vitrines", "Applications web", "Livraison avec cadrage clair"];

  const highlights = isEnglish
    ? [
        "A clearer offer, a cleaner site, and stronger conversion paths.",
        "A Swiss positioning that stays open to international opportunities.",
        "A short process, direct communication, and a senior execution level.",
      ]
    : [
        "Une offre plus lisible, un site plus propre et un parcours plus convaincant.",
        "Un positionnement suisse sans se fermer aux opportunites internationales.",
        "Un process court, une communication directe et un niveau d'execution senior.",
      ];

  const offerTitle = isEnglish ? "Clear formats to launch fast." : "Des formats clairs pour lancer vite.";
  const offerText = isEnglish
    ? "You get a clear perimeter, a budget range, and a delivery rhythm before the project starts."
    : "Tu obtiens un perimetre clair, une fourchette budgetaire et un rythme de livraison avant de lancer le projet.";

  return (
    <div className="space-y-16 sm:space-y-20">
      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <div className="flex flex-wrap gap-3 text-sm text-blue-100">
                {heroBadges.map((badge, index) => (
                  <span
                    key={badge}
                    className={`inline-flex items-center rounded-full border px-4 py-2 ${
                      index === 0 ? "border-white/20 bg-white/5" : "border-white/10 bg-white/5"
                    }`}
                  >
                    {index === 0 ? <FiMapPin className="mr-2" /> : null}
                    {badge}
                  </span>
                ))}
              </div>

              <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                {isEnglish
                  ? "Websites and digital tools aligned with the rest of your business."
                  : "Des sites et outils digitaux enfin alignes avec le reste de ton business."}
              </h1>

              <p className="mt-6 max-w-3xl text-lg text-blue-50 sm:text-xl">
                {isEnglish
                  ? "KAH-Digital designs showcase websites, web applications, client portals, and structured digital projects from Lausanne, for Switzerland and beyond."
                  : "KAH-Digital conçoit des sites vitrines, des applications web, des portails clients et des projets digitaux structures depuis Lausanne, pour la Suisse et au-dela."}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href={withPrefix("/devis")}
                  className="inline-flex items-center rounded-full bg-white px-6 py-3 font-semibold text-slate-950 transition-colors hover:bg-slate-100"
                >
                  {isEnglish ? "Get a quote" : "Demander un devis"}
                </Link>
                <Link
                  href={withPrefix("/services")}
                  className="inline-flex items-center rounded-full border border-white/25 px-6 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-slate-950"
                >
                  {isEnglish ? "See services" : "Voir les services"}
                  <FiArrowRight className="ml-2" />
                </Link>
              </div>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.3)]">
              <p className="text-sm uppercase tracking-[0.3em] text-white/55">
                {isEnglish ? "Why clients move fast" : "Pourquoi les projets avancent vite"}
              </p>
              <div className="mt-6 space-y-4">
                {highlights.map((item) => (
                  <div key={item} className="flex items-start text-white/80">
                    <FiCheckCircle className="mr-3 mt-1 flex-shrink-0 text-sky-300" size={18} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/50">{stat.label}</p>
                    <p className="mt-2 text-2xl font-semibold text-white">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
              {isEnglish ? "Services" : "Services"}
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-950 sm:text-4xl">
              {isEnglish ? "A clearer home, with the same logic as the rest of the site." : "Une home plus claire, avec la meme logique que le reste du site."}
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              {isEnglish
                ? "The objective is simple: explain what you do fast, guide visitors to the right page, and make contact obvious."
                : "L'objectif est simple : expliquer vite ce que tu fais, guider vers la bonne page et rendre la prise de contact evidente."}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {services.slice(0, 3).map((service, index) => {
              const icon = index === 0 ? FiGlobe : index === 1 ? FiSmartphone : FiClock;
              const Icon = icon;
              return (
                <article key={service.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                  <Icon className="text-blue-600" size={34} />
                  <h3 className="mt-4 text-xl font-semibold text-slate-950">{service.title}</h3>
                  <p className="mt-3 text-slate-600">{service.description}</p>
                  <p className="mt-4 text-sm text-slate-500">{service.tech}</p>
                </article>
              );
            })}
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              href={withPrefix("/services")}
              className="inline-flex items-center rounded-full bg-slate-950 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
            >
              {isEnglish ? "Explore all services" : "Explorer tous les services"}
              <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-slate-100 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
              {isEnglish ? "Offers" : "Formats"}
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-950">{offerTitle}</h2>
            <p className="mt-4 text-lg text-slate-600">{offerText}</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {fastDeals.map((deal) => (
              <article key={deal.title} className="rounded-3xl bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] ring-1 ring-slate-200">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{deal.stack}</p>
                <h3 className="mt-3 text-2xl font-semibold text-slate-950">{deal.title}</h3>
                <div className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{isEnglish ? "Budget" : "Budget"}</p>
                    <p className="mt-1 font-medium text-slate-900">{deal.budget}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{isEnglish ? "Timeline" : "Delai"}</p>
                    <p className="mt-1 font-medium text-slate-900">{deal.timeline}</p>
                  </div>
                </div>
                <p className="mt-4 text-slate-600">{deal.deliverable}</p>
                <Link
                  href={withPrefix("/devis")}
                  className="mt-6 inline-flex items-center rounded-full border border-slate-300 px-5 py-2 font-semibold text-slate-900 transition-colors hover:border-slate-950 hover:bg-slate-950 hover:text-white"
                >
                  {isEnglish ? "Request this format" : "Demander ce format"}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
              {isEnglish ? "Process" : "Process"}
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-950">
              {isEnglish ? "A short, readable process." : "Un process court et lisible."}
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            {processSteps.map((step, index) => (
              <div key={step.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold text-slate-950">{step.title}</h3>
                <p className="mt-3 text-slate-600">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.12),transparent_35%),linear-gradient(180deg,#08111f_0%,#04070d_100%)] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="text-white">
              <p className="text-sm uppercase tracking-[0.3em] text-white/55">
                {isEnglish ? "Selected work" : "Projets selectionnes"}
              </p>
              <h2 className="mt-3 text-3xl font-bold">
                {isEnglish ? "Recent projects in the same visual language." : "Des projets recents dans le meme langage visuel."}
              </h2>
            </div>
            <Link
              href={withPrefix("/projets")}
              className="inline-flex items-center rounded-full border border-white/20 px-5 py-2 font-semibold text-white/80 transition-colors hover:border-white hover:text-white"
            >
              {isEnglish ? "View all case studies" : "Voir toutes les etudes de cas"}
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      <div className="bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.12),transparent_35%),linear-gradient(180deg,#08111f_0%,#04070d_100%)] pb-16">
        <Testimonials />
      </div>

      <section className="bg-slate-100 py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[32px] bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] ring-1 ring-slate-200">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-start">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
                  {isEnglish ? "Contact" : "Contact"}
                </p>
                <h2 className="mt-3 text-3xl font-bold text-slate-950">
                  {isEnglish ? "Ready to move to the next step?" : "Pret a passer a l'etape suivante ?"}
                </h2>
                <p className="mt-4 text-lg text-slate-600">
                  {isEnglish
                    ? "Send the project, the goal, or simply the current situation. The next response should help you decide."
                    : "Envoie le projet, l'objectif ou simplement la situation actuelle. La prochaine reponse doit t'aider a decider."}
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href={withPrefix("/devis")}
                    className="inline-flex items-center rounded-full bg-slate-950 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
                  >
                    {isEnglish ? "Request a quote" : "Demander un devis"}
                  </Link>
                  <Link
                    href={withPrefix("/contact")}
                    className="inline-flex items-center rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-900 transition-colors hover:border-slate-950 hover:bg-slate-950 hover:text-white"
                  >
                    {isEnglish ? "Contact us" : "Nous contacter"}
                  </Link>
                </div>
              </div>
              <ContactCard className="text-left" title={isEnglish ? "Direct support" : "Contact direct"} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
