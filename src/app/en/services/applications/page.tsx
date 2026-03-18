import type { Metadata } from "next";
import Link from "next/link";
import { FiCheck, FiCode, FiDatabase, FiSmartphone } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Web and mobile applications",
  description: "Custom web and mobile application development for companies in Switzerland and internationally.",
};

export default function ApplicationsPageEn() {
  const useCases = [
    "Client portals and extranets",
    "Dashboards and reporting",
    "Internal tools for field or back-office teams",
    "Booking, planning, or follow-up applications",
    "Light CRM, back-office, and member areas",
    "Administrative or commercial automation",
  ];

  const benefits = [
    "Less manual entry and duplicate processing",
    "Better centralised and more readable data",
    "Tools adapted to your real operations",
    "Time saved on repetitive tasks",
    "Better information flow",
    "A base that can evolve into future modules",
  ];

  const features = [
    { icon: FiCode, title: "Custom development", description: "An application shaped around your need, not a fragile stack of generic blocks." },
    { icon: FiDatabase, title: "Clean data architecture", description: "Storage, logic, and rights designed around your usage and growth." },
    { icon: FiSmartphone, title: "Web, mobile, or hybrid", description: "The right format according to users, constraints, and budget." },
    { icon: FiCheck, title: "Scoping and support", description: "We help define the scope, prioritise well, and launch without noise." },
  ];

  const projectTypes = [
    { title: "Business application", price: "From CHF 4,500", description: "To replace manual processes, structure an activity, or centralise operations." },
    { title: "Portal or client area", price: "From CHF 7,500", description: "To give access to documents, statuses, requests, or follow-up features." },
    { title: "More complete application", price: "From CHF 12,000", description: "For a richer product with accounts, data, workflows, and multiple integrations." },
  ];

  return (
    <>
      <section className="bg-gradient-to-r from-slate-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm uppercase tracking-[0.3em] text-white/70 mb-4">
            Web applications, business tools, and mobile experiences
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Useful applications, not overbuilt machinery</h1>
          <p className="text-xl max-w-3xl mb-8 text-white/90">
            KAH-Digital builds web and mobile applications for companies that need to organise, automate, or simplify part of their activity from Switzerland, with a production logic that stays clear and usable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/en/devis" className="bg-white text-slate-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Request a quote
            </Link>
            <Link href="/en/contact" className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-slate-900 transition-colors">
              Discuss the need
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Common use cases</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Projects often requested by SMBs, growing teams, or structures that need information to move more smoothly.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase) => (
              <div key={useCase} className="bg-gray-50 rounded-2xl p-6">
                <p className="text-gray-800 font-medium">{useCase}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What should change concretely</h2>
            <p className="text-xl text-gray-600">A better internal workflow, not just another pretty screen.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit} className="bg-white rounded-2xl p-6 shadow-md">
                <FiCheck className="text-green-500 mb-4" size={32} />
                <p className="text-gray-800 font-medium">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What is included in the approach</h2>
            <p className="text-xl text-gray-600">From scoping to launch, with the right level of complexity.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="text-center">
                <feature.icon className="text-blue-700 mx-auto mb-4" size={48} />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Budget ranges</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Realistic starting points for web and application projects in Switzerland, to be refined according to scope, users, and integrations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projectTypes.map((item) => (
              <div key={item.title} className="rounded-2xl bg-white p-8 shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-blue-700 font-semibold text-lg mb-4">{item.price}</p>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-700 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Need a tool that fits the way you work?</h2>
          <p className="text-xl mb-8 text-white/90">
            We can scope a clear, evolutive, useful application for your teams or your clients.
          </p>
          <Link href="/en/devis" className="bg-white text-blue-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
            Request a tailored quote
          </Link>
        </div>
      </section>
    </>
  );
}
