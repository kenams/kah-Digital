import type { Metadata } from "next";
import Link from "next/link";
import { FiCheck, FiCompass, FiMonitor, FiTrendingUp } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Business websites",
  description: "Showcase websites, corporate websites, and custom presentation platforms for companies in Switzerland and internationally.",
};

export default function SiteWebPageEn() {
  const painPoints = [
    "No site, outdated site, or weak first impression",
    "Brand image that does not reflect the actual level of the company",
    "Very few incoming leads from the website",
    "Content that is difficult to maintain internally",
  ];

  const outcomes = [
    "Clearer positioning and offer presentation",
    "A cleaner, faster, easier site to maintain",
    "A more direct contact and quote journey",
    "A solid base for better online visibility",
  ];

  const offers = [
    {
      name: "Essential",
      price: "From CHF 2,900",
      features: ["4 to 6 page showcase site", "Responsive design", "Contact form", "Clean SEO basics", "Launch and handover"],
    },
    {
      name: "Business",
      price: "From CHF 5,500",
      features: ["Full corporate website", "Structured service pages", "CMS or editing area", "Analytics tracking", "Launch support"],
    },
    {
      name: "Custom",
      price: "From CHF 9,500",
      features: ["More premium direction", "Sharper conversion flow", "Connections to your tools", "Custom business features", "Priority launch support"],
    },
  ];

  const process = [
    { step: "01", title: "Scoping", description: "Goals, structure, useful pages, and business priorities." },
    { step: "02", title: "Direction", description: "Visual direction, rhythm, content, and expected experience." },
    { step: "03", title: "Production", description: "Integration, development, optimisation, and useful connectors." },
    { step: "04", title: "Launch", description: "Validation, domain, SEO basics, and final adjustments." },
    { step: "05", title: "Follow-up", description: "Fixes, evolutions, and support when needed." },
  ];

  return (
    <>
      <section className="bg-gradient-to-r from-blue-600 to-sky-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm uppercase tracking-[0.3em] text-white/70 mb-4">
            Showcase websites, corporate sites, and presentation platforms
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Clear, credible, useful websites for companies</h1>
          <p className="text-xl max-w-3xl mb-8 text-white/90">
            From Lausanne, KAH-Digital builds websites for companies in Switzerland and internationally. The goal is not just to be online, but to present the business more clearly, reassure prospects, and make contact easier.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/en/devis" className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Request a quote
            </Link>
            <Link href="/en/projets/kah-prod" className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              View a project
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">When a new website becomes useful</h2>
              <ul className="space-y-4">
                {painPoints.map((item) => (
                  <li key={item} className="flex items-start">
                    <FiTrendingUp className="text-red-500 mt-1 mr-3" size={20} />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What the project should really deliver</h2>
              <ul className="space-y-4">
                {outcomes.map((item) => (
                  <li key={item} className="flex items-start">
                    <FiCheck className="text-green-500 mt-1 mr-3" size={20} />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Project formats</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Clear starting points for typical Swiss budgets, adjustable depending on content, design depth, and functional scope.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offers.map((offer) => (
              <div key={offer.name} className="border border-gray-200 rounded-2xl p-8 bg-white hover:shadow-lg transition-shadow">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{offer.name}</h3>
                <p className="text-blue-600 font-semibold text-lg mb-6">{offer.price}</p>
                <ul className="space-y-3 mb-8">
                  {offer.features.map((feature) => (
                    <li key={feature} className="flex items-center text-gray-700">
                      <FiCheck className="text-green-500 mr-3" size={16} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/en/devis" className="block text-center bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors">
                  Discuss this format
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
            <div className="rounded-2xl bg-gray-50 p-8">
              <FiMonitor className="text-blue-600 mb-4" size={36} />
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Presentation and trust</h2>
              <p className="text-gray-600">A cleaner structure, clearer content, and a more solid image for clients, partners, or recruitment.</p>
            </div>
            <div className="rounded-2xl bg-gray-50 p-8">
              <FiCompass className="text-blue-600 mb-4" size={36} />
              <h2 className="text-xl font-semibold text-gray-900 mb-3">More direct journey</h2>
              <p className="text-gray-600">Users understand what you do, who you serve, and how to reach you without friction.</p>
            </div>
            <div className="rounded-2xl bg-gray-50 p-8">
              <FiCheck className="text-blue-600 mb-4" size={36} />
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Durable base</h2>
              <p className="text-gray-600">The website stays evolutive and can support future tools, campaigns, or automations later on.</p>
            </div>
          </div>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Working method</h2>
            <p className="text-xl text-gray-600">A short, clear framework without unnecessary overproduction.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {process.map((item) => (
              <div key={item.step} className="text-center">
                <div className="bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Need a cleaner website for your company?</h2>
          <p className="text-xl mb-8 text-white/90">
            We can scope a strong showcase or corporate website, with the right level of finish for your market, pace, and budget.
          </p>
          <Link href="/en/devis" className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
            Request a free quote
          </Link>
        </div>
      </section>
    </>
  );
}
