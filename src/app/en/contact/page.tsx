import type { Metadata } from "next";
import { FiClock, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { ContactForm } from "@/components/contact-form";
import { companyConfig } from "@/config/company";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact KAH-Digital for your digital projects. Reply within 24 hours.",
};

const contactCards = [
  { icon: FiMail, title: "Email", value: companyConfig.email },
  { icon: FiPhone, title: "Phone", value: companyConfig.phone },
  { icon: FiMapPin, title: "Location", value: `${companyConfig.city}, ${companyConfig.country}` },
  { icon: FiClock, title: "Availability", value: "Monday - Friday, 9am - 6pm" },
];

export default function ContactPageEn() {
  return (
    <>
      <section className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-6 text-4xl font-bold sm:text-5xl">Contact us</h1>
          <p className="text-xl">A question, a need, or a project? Fast reply and simple scoping.</p>
        </div>
      </section>

      <section className="bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_35%),linear-gradient(180deg,#08111f_0%,#04070d_100%)] py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr,1.1fr] lg:px-8">
          <div className="space-y-6 text-white">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-white/60">Direct contact</p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Let&apos;s talk concretely about your need.</h2>
              <p className="mt-4 max-w-2xl text-base text-white/70 sm:text-lg">
                We work with clients in Switzerland and internationally, with a simple setup, a fast pace, and no useless friction.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {contactCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div key={card.title} className="rounded-3xl border border-white/10 bg-white/5 p-5 text-white shadow-[0_18px_50px_rgba(0,0,0,0.25)]">
                    <Icon className="text-sky-300" size={28} />
                    <p className="mt-4 text-xs uppercase tracking-[0.3em] text-white/55">{card.title}</p>
                    <p className="mt-2 text-base font-medium text-white/85">{card.value}</p>
                  </div>
                );
              })}
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/20 p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-white/55">What you can send</p>
              <ul className="mt-4 space-y-2 text-sm text-white/75">
                <li>Quote request or quick scoping need</li>
                <li>Question about a redesign, MVP, or automation</li>
                <li>Support, maintenance, or a one-off technical request</li>
              </ul>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
