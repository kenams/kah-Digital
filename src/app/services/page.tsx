import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowRight, FiCheckCircle, FiGlobe, FiMapPin, FiSmartphone, FiTool } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Services web et applications en Suisse",
  description:
    "Découvrez nos services de création de site vitrine, développement d'application web et intégration GLPI depuis Lausanne, pour la Suisse et l'international.",
};

export default function ServicesPage() {
  const services = [
    {
      icon: FiGlobe,
      title: "Création de sites vitrines",
      description:
        "Des sites web rapides, clairs et crédibles pour présenter votre activité, capter des demandes et améliorer votre visibilité locale.",
      href: "/services/site-web",
      features: ["Positionnement SEO local", "Design responsive", "Pages pensées conversion", "Maintenance évolutive"],
    },
    {
      icon: FiSmartphone,
      title: "Applications web et mobiles",
      description:
        "Des applications metier, dashboards, espaces clients et MVP mobiles pour automatiser ce qui vous ralentit.",
      href: "/services/applications",
      features: ["Architecture evolutive", "Portails et dashboards", "MVP mobile iOS / Android", "Integrations API"],
    },
    {
      icon: FiTool,
      title: "Support IT intelligent / GLPI",
      description:
        "La mise en place d'un support IT structure avec GLPI, base de connaissances et assistant IA de premier niveau.",
      href: "/services/glpi",
      features: ["Installation complete", "Base de connaissances", "Assistant IA + escalation ticket", "Maintenance preventive"],
    },
  ];

  const signals = [
    "Base à Lausanne avec un ciblage naturel sur la Suisse romande",
    "Pages construites pour répondre à des recherches comme site vitrine, refonte web et application web",
    "Livrables pensés pour générer des demandes, pas seulement pour être jolis",
  ];

  return (
    <>
      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <span className="inline-flex items-center rounded-full border border-white/20 px-4 py-2 text-sm text-blue-100">
              <FiMapPin className="mr-2" />
              Lausanne, Suisse
            </span>
            <h1 className="mt-6 text-4xl font-bold sm:text-5xl">Services web pensés pour la Suisse, prêts pour l'international</h1>
            <p className="mt-6 max-w-3xl text-xl text-blue-50">
              KAH-Digital conçoit des sites vitrines, des applications web et des outils métier avec un objectif
              simple : rendre votre présence digitale plus visible, plus crédible et plus rentable.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {services.map((service) => (
              <article key={service.href} className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
                <service.icon className="mb-6 text-blue-600" size={56} />
                <h2 className="mb-4 text-2xl font-bold text-slate-950">{service.title}</h2>
                <p className="mb-6 text-slate-600">{service.description}</p>
                <ul className="mb-6 space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start text-slate-700">
                      <FiCheckCircle className="mr-3 mt-1 flex-shrink-0 text-blue-600" size={18} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={service.href}
                  className="inline-flex items-center rounded-full bg-slate-950 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  Voir le service <FiArrowRight className="ml-2" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-100 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <h2 className="mb-6 text-3xl font-bold text-slate-950">Pourquoi ce positionnement aide aussi le SEO</h2>
            <div className="space-y-4">
              {signals.map((signal) => (
                <div key={signal} className="flex items-start text-slate-700">
                  <FiCheckCircle className="mr-3 mt-1 flex-shrink-0 text-blue-600" size={18} />
                  <span>{signal}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blue-600 py-16 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold">Besoin d'une solution sur mesure ?</h2>
          <p className="mt-4 text-xl">
            Décris ton besoin et on te propose une réponse claire, avec un périmètre, un délai et un budget.
          </p>
          <Link
            href="/devis"
            className="mt-8 inline-flex rounded-full bg-white px-8 py-3 font-semibold text-blue-700 transition-colors hover:bg-slate-100"
          >
            Demander un devis
          </Link>
        </div>
      </section>
    </>
  );
}
