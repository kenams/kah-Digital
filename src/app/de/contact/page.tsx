import type { Metadata } from "next";
import { FiClock, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { ContactForm } from "@/components/contact-form";
import { companyConfig } from "@/config/company";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kontaktieren Sie KAH-Digital fuer Websites, Anwendungen und digitale Projekte.",
};

const contactCards = [
  { icon: FiMail, title: "E-Mail", value: companyConfig.email },
  { icon: FiPhone, title: "Telefon", value: companyConfig.phone },
  { icon: FiMapPin, title: "Standort", value: `${companyConfig.city}, ${companyConfig.country}` },
  { icon: FiClock, title: "Erreichbarkeit", value: "Montag bis Freitag, 9:00 bis 18:00" },
];

export default function ContactPageDe() {
  return (
    <>
      <section className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-6 text-4xl font-bold sm:text-5xl">Kontakt</h1>
          <p className="text-xl">Frage, Bedarf oder Projekt? Schnelle Rueckmeldung und klares Briefing.</p>
        </div>
      </section>

      <section className="bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_35%),linear-gradient(180deg,#08111f_0%,#04070d_100%)] py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr,1.1fr] lg:px-8">
          <div className="space-y-6 text-white">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-white/60">Direkter Kontakt</p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Lass uns konkret ueber dein Vorhaben sprechen.</h2>
              <p className="mt-4 max-w-2xl text-base text-white/70 sm:text-lg">
                Wir arbeiten mit Unternehmen in der Schweiz und international - mit klarer Struktur, gutem Tempo und ohne
                unnoetige Reibung.
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
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
