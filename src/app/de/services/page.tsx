import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowRight, FiGlobe, FiSmartphone, FiTool } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Leistungen",
  description: "Websites, individuelle Anwendungen und GLPI-nahe Support-Workflows fuer Unternehmen in der Schweiz und international.",
};

export default function ServicesPageDe() {
  const services = [
    {
      icon: FiGlobe,
      title: "Unternehmenswebsites",
      description: "Praesentationswebsites, Corporate Sites und saubere digitale Grundlagen fuer Unternehmen.",
      href: "/de/services/site-web",
      features: ["Responsives Design", "Klarer Seitenaufbau", "Saubere SEO-Basis", "Begleiteter Launch"],
    },
    {
      icon: FiSmartphone,
      title: "Web- und Mobile-Anwendungen",
      description: "Portale, Dashboards, interne Tools und massgeschneiderte Anwendungen fuer echte Prozesse.",
      href: "/de/services/applications",
      features: ["Skalierbare Architektur", "Nuetzliche Oberflaeche", "Sinnvolle Integrationen", "Klare Projektbegleitung"],
    },
    {
      icon: FiTool,
      title: "GLPI-verbundener Support-Workflow",
      description: "Virtuelle Hilfe, gefuehrte Anfragen und saubere Uebergabe an GLPI-Tickets, wenn Support uebernehmen muss.",
      href: "/de/services/glpi",
      features: ["Klarerer Ablauf", "Saubere Eskalation", "Wissensbasis", "Passend zu eurem Setup"],
    },
  ];

  return (
    <>
      <section className="bg-gradient-to-r from-blue-600 to-slate-900 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-white/70">Schweiz als Basis, international offen</p>
          <h1 className="mb-6 text-4xl font-bold sm:text-5xl">Digitale Leistungen mit echtem Nutzen fuer Unternehmen</h1>
          <p className="mx-auto max-w-3xl text-xl text-white/90">
            KAH-Digital entwickelt Websites, Anwendungen und klarere digitale Ablaeufe aus Lausanne - mit einem pragmatischen,
            sauberen und gut lesbaren Produktionsansatz.
          </p>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {services.map((service) => (
              <div key={service.title} className="rounded-2xl bg-white p-8 shadow-lg">
                <service.icon className="mb-6 text-blue-600" size={64} />
                <h2 className="mb-4 text-2xl font-bold text-gray-900">{service.title}</h2>
                <p className="mb-6 text-gray-600">{service.description}</p>
                <ul className="mb-6 space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-gray-700">
                      <span className="mr-3 h-2 w-2 rounded-full bg-blue-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={service.href}
                  className="inline-flex items-center rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  Mehr erfahren <FiArrowRight className="ml-2" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
