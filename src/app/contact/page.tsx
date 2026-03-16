import { Metadata } from "next";
import { FiClock, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { ContactForm } from "@/components/contact-form";
import { companyConfig } from "@/config/company";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez KAH-Digital pour vos projets digitaux. Reponse sous 24h.",
};

const contactCards = [
  {
    icon: FiMail,
    title: "Email",
    value: companyConfig.email,
  },
  {
    icon: FiPhone,
    title: "Telephone",
    value: companyConfig.phone,
  },
  {
    icon: FiMapPin,
    title: "Localisation",
    value: `${companyConfig.city}, ${companyConfig.country}`,
  },
  {
    icon: FiClock,
    title: "Disponibilite",
    value: "Lundi - Vendredi, 9h - 18h",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-6 text-4xl font-bold sm:text-5xl">Contactez-nous</h1>
          <p className="text-xl">Une question, un besoin ou un projet ? Reponse rapide et cadrage simple.</p>
        </div>
      </section>

      <section className="bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_35%),linear-gradient(180deg,#08111f_0%,#04070d_100%)] py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr,1.1fr] lg:px-8">
          <div className="space-y-6 text-white">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-white/60">Contact direct</p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Parlons concretement de ton besoin.</h2>
              <p className="mt-4 max-w-2xl text-base text-white/70 sm:text-lg">
                Nous accompagnons des clients en Suisse et a l'international, avec une organisation simple, rapide
                et sans friction inutile.
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
              <p className="text-sm uppercase tracking-[0.3em] text-white/55">Ce que tu peux envoyer</p>
              <ul className="mt-4 space-y-2 text-sm text-white/75">
                <li>Demande de devis ou cadrage rapide</li>
                <li>Question sur une refonte, un MVP ou une automatisation</li>
                <li>Support, maintenance ou demande technique ponctuelle</li>
              </ul>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>

      <section className="bg-slate-100 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Approche</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">Un contact simple, puis une suite claire.</h2>
            <p className="mt-4 text-lg text-slate-600">
              Chaque echange doit permettre d'avancer vite, sans jargon ni parcours inutile.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Rapide</p>
              <h3 className="mt-3 text-xl font-semibold text-slate-900">Reponse sous 24h</h3>
              <p className="mt-3 text-slate-600">Un premier retour concret pour lancer l'echange sans attente inutile.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Clair</p>
              <h3 className="mt-3 text-xl font-semibold text-slate-900">Cadrage utile</h3>
              <p className="mt-3 text-slate-600">Un besoin bien compris avant toute proposition, devis ou plan d'action.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Direct</p>
              <h3 className="mt-3 text-xl font-semibold text-slate-900">Echange humain</h3>
              <p className="mt-3 text-slate-600">Des messages simples, exploitables et centres sur ce qu'il faut faire ensuite.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
