import type { Metadata } from "next";
import Link from "next/link";
import { FiCheck, FiClock, FiShield, FiTool, FiTrendingUp, FiUsers } from "react-icons/fi";

export const metadata: Metadata = {
  title: "GLPI-connected support workflow",
  description: "A cleaner support workflow around GLPI: virtual help, request guidance, and ticket creation when needed.",
};

export default function GLPIPageEn() {
  const positioning = [
    "A support and assistance layer before GLPI",
    "A simpler entry point for users who need help",
    "A discreet virtual helper for simple issues and guidance",
    "Ticket creation when human support must take over",
    "An approach adapted to your existing support organisation",
  ];

  const benefits = [
    { icon: FiClock, title: "Less friction", description: "Users get useful first-level help before opening a ticket." },
    { icon: FiUsers, title: "Better framed requests", description: "Support receives more context and cleaner handoff to the right channel." },
    { icon: FiShield, title: "Discreet positioning", description: "The solution can stay framed as virtual help and a stronger support journey." },
    { icon: FiTrendingUp, title: "Cleaner escalation", description: "When help is not enough, the handoff to ticket becomes smoother and more usable." },
  ];

  const services = [
    { title: "Support journey scoping", description: "Analysis of frequent requests, blocking points, and handoff moments to human support.", price: "From CHF 900" },
    { title: "First-level virtual help", description: "A useful assistance entry point connected to your content, procedures, or frequent questions.", price: "From CHF 1,500" },
    { title: "GLPI ticket handoff", description: "Clean transition from guided support to ticket creation when the support team must take over.", price: "From CHF 1,200" },
    { title: "Follow-up and tuning", description: "Evolution of the journey, responses, and handoff points based on field feedback.", price: "From CHF 180 / month" },
  ];

  const useCases = [
    "User help before ticket creation",
    "Cleaner qualification of internal requests",
    "Reduction of repetitive or incomplete tickets",
    "Simpler support entry point for SMBs",
    "Smooth handoff to GLPI when human support must take over",
    "A clearer support path for teams that need to save time",
  ];

  return (
    <>
      <section className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm uppercase tracking-[0.3em] text-white/70 mb-4">Support journey, virtual help, and GLPI tickets</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">A simpler support layer around GLPI</h1>
          <p className="text-xl max-w-3xl mb-8">
            KAH-Digital does not replace your GLPI team and does not pretend to be full GLPI management. We build a smoother support journey around your existing setup, with first-level virtual help and ticket creation when real support needs to take over.
          </p>
          <p className="text-sm uppercase tracking-[0.3em] text-white/70">KAH-Digital proprietary solution, adapted to your support organisation</p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link href="/en/devis" className="bg-white text-emerald-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Request a quote
            </Link>
            <Link href="#services" className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-emerald-700 transition-colors">
              View services
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How we position this offer</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A useful complement to your support, without replacing your tool or your existing organisation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {positioning.map((feature) => (
              <div key={feature} className="flex items-start bg-gray-50 rounded-2xl p-6">
                <FiCheck className="text-emerald-500 mt-1 mr-3 flex-shrink-0" size={20} />
                <span className="text-gray-800">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What it brings in practice</h2>
            <p className="text-xl text-gray-600">A clearer support flow for users and a cleaner handoff for the team.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="text-center bg-white rounded-2xl p-6 shadow-md">
                <benefit.icon className="text-emerald-600 mx-auto mb-4" size={48} />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Common use cases</h2>
            <p className="text-xl text-gray-600">Situations where upstream help really improves the support experience.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase) => (
              <div key={useCase} className="bg-gray-50 rounded-2xl p-6">
                <FiTool className="text-emerald-600 mb-3" size={24} />
                <p className="text-gray-800 font-medium">{useCase}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Services around GLPI</h2>
            <p className="text-xl text-gray-600">From scoping to ticket handoff, without overselling the promise.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <div key={service.title} className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <p className="text-emerald-600 font-semibold text-lg">{service.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What we do, and what we do not do</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <FiUsers className="text-emerald-600 mx-auto mb-4" size={48} />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">We structure the journey</h3>
              <p className="text-gray-600">We work on entry, user help, request orientation, and clean handoff to ticketing.</p>
            </div>
            <div className="text-center">
              <FiClock className="text-emerald-600 mx-auto mb-4" size={48} />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">We integrate cleanly</h3>
              <p className="text-gray-600">We adapt the logic to your support workflow without breaking existing habits.</p>
            </div>
            <div className="text-center">
              <FiShield className="text-emerald-600 mx-auto mb-4" size={48} />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">We do not replace your GLPI team</h3>
              <p className="text-gray-600">GLPI operations stay with you or your current provider. We work as a complement.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-emerald-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Need a smoother support layer around GLPI?</h2>
          <p className="text-xl mb-8">We can scope a useful, discreet, cleaner journey for both your users and your support team.</p>
          <Link href="/en/devis" className="bg-white text-emerald-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
            Request a quote
          </Link>
        </div>
      </section>
    </>
  );
}
