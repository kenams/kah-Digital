import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowRight, FiGlobe, FiSmartphone, FiTool } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Digital services",
  description: "Websites, custom applications, and GLPI-connected support workflows for companies in Switzerland and internationally.",
};

export default function ServicesPageEn() {
  const services = [
    {
      icon: FiGlobe,
      title: "Business websites",
      description: "Showcase websites, corporate websites, and presentation platforms to position your company more clearly online.",
      href: "/en/services/site-web",
      features: ["Responsive design", "Clear structure", "Clean SEO basics", "Supported launch"],
    },
    {
      icon: FiSmartphone,
      title: "Web and mobile applications",
      description: "Business tools, portals, dashboards, and custom applications to make your operations smoother.",
      href: "/en/services/applications",
      features: ["Scalable architecture", "Useful interface", "Possible integrations", "Project support"],
    },
    {
      icon: FiTool,
      title: "GLPI-connected support workflow",
      description: "Virtual help, request qualification, and handoff to GLPI tickets when first-level assistance is no longer enough.",
      href: "/en/services/glpi",
      features: ["Clearer journey", "Clean escalation", "Knowledge base", "Adapted to your support setup"],
    },
  ];

  return (
    <>
      <section className="bg-gradient-to-r from-blue-600 to-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-white/70 mb-4">
            Switzerland, international, SMBs, and growing teams
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Useful digital services for companies</h1>
          <p className="text-xl max-w-3xl mx-auto text-white/90">
            KAH-Digital designs websites, applications, and clearer support workflows from Lausanne, with a production approach that stays clean and practical.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.title} className="bg-white rounded-2xl shadow-lg p-8">
                <service.icon className="text-blue-600 mb-6" size={64} />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h2>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="mb-6 space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={service.href}
                  className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
                >
                  Learn more <FiArrowRight className="ml-2" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">A simple positioning</h2>
          <p className="text-xl text-gray-600">
            We do not try to promise everything. We build useful, clean, credible foundations to help a company present itself better, operate more smoothly, or support its users more clearly.
          </p>
        </div>
      </section>

      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Need a tailored solution?</h2>
          <p className="text-xl mb-8 text-white/90">
            Let&apos;s talk about the right level of website, application, or support workflow for your company.
          </p>
          <Link
            href="/en/devis"
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Request a quote
          </Link>
        </div>
      </section>
    </>
  );
}
