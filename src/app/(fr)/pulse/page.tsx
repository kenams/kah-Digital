import type { Metadata } from "next";
import Link from "next/link";
import { FiBell, FiCheck, FiClock, FiMessageCircle, FiShield, FiStar } from "react-icons/fi";
import { PulseDemo } from "@/components/pulse/pulse-demo";

const url = "https://kah-digital.ch/pulse";

export const metadata: Metadata = {
  title: "Site web qui se met à jour par message + rappels de RDV",
  description:
    "Écrivez « fermé lundi » ou « plat du jour : … » : votre site se met à jour en quelques secondes. Rappels de rendez-vous et demandes d'avis Google automatiques. Dès 99 €/mois.",
  alternates: { canonical: url },
  openGraph: {
    images: [{ url: "/og-kah-digital.png", width: 1200, height: 630 }],
    title: "Votre site se met à jour par un simple message",
    description: "Horaires, fermetures, promos, plat du jour : écrivez, c'est en ligne. Rappels de RDV et avis Google en plus.",
    url,
    type: "website",
  },
};

const steps = [
  { icon: FiMessageCircle, title: "Vous écrivez", body: "Comme à un collègue : « fermé du 24 au 26 », « promo −20 % ce week-end », « RDV Mme Diallo mardi 14h »." },
  { icon: FiCheck, title: "C'est appliqué", body: "L'assistant comprend, met à jour votre site et vous confirme ce qui a changé. S'il hésite, il vous pose une question au lieu de deviner." },
  { icon: FiClock, title: "En ligne en quelques secondes", body: "Un petit script sur votre site affiche tout seul le bandeau, les horaires, la promo ou le plat du jour." },
];

const faq = [
  { q: "Où est-ce que j'écris mes messages ?", a: "Dans votre espace privé « Mon espace », depuis le téléphone ou l'ordinateur. L'envoi par WhatsApp est en préparation : il sera proposé aux clients dès qu'il sera ouvert." },
  { q: "Que peut changer l'assistant ?", a: "Uniquement ce qui est prévu : annonce, fermeture exceptionnelle, horaires, promo, plat du jour, coordonnées, et vos rendez-vous. Il ne touche ni au design ni au reste du site." },
  { q: "Et s'il se trompe ?", a: "Vous voyez immédiatement ce qui est affiché et vous pouvez corriger en un message (« finalement ouvert lundi »). Chaque demande est conservée dans l'historique." },
  { q: "Les rappels, c'est légal ?", a: "Oui, à condition que le client donne son accord. Dans « Mon espace », la case d'accord est obligatoire : sans elle, rien n'est envoyé. Chaque e-mail contient un lien « ne plus recevoir »." },
  { q: "Quels canaux pour les rappels ?", a: "E-mail dès aujourd'hui. Le SMS s'active selon votre formule et notre fournisseur de messages." },
  { q: "Mon site actuel peut-il en profiter ?", a: "Oui : une seule ligne à ajouter dans la page. Pour les sites construits par KAH Digital Studio, c'est déjà prévu." },
];

export default function PulsePage() {
  return (
    <main className="min-h-screen bg-[#0a0908] text-white">
      <section className="section-shell">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d6b36a]/35 bg-[#d6b36a]/10 px-4 py-2 text-sm text-[#f0d99b]">
            <FiMessageCircle size={14} aria-hidden="true" /> KAH Pulse · nouveau
          </p>
          <h1 className="text-4xl font-bold sm:text-6xl">Votre site se met à jour par un simple message</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/65">
            Fermé lundi, plat du jour, promo, nouveaux horaires : vous écrivez, c&apos;est en ligne. Et vos clients reçoivent leurs rappels de rendez-vous, puis une demande d&apos;avis Google.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#demo" className="inline-flex items-center gap-2 rounded-full bg-[#d6b36a] px-7 py-3.5 font-bold text-[#11131b] transition hover:bg-[#f0d99b]">
              Essayer la démo
            </a>
            <Link href="/commander?pack=business" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-semibold text-white transition hover:bg-white/10">
              Commander mon site
            </Link>
          </div>
        </div>
      </section>

      <section id="demo" className="section-shell pt-0">
        <div className="mx-auto max-w-6xl">
          <p className="mb-5 text-center text-sm font-semibold uppercase tracking-[0.2em] text-[#d6b36a]">Démo en direct</p>
          <PulseDemo />
        </div>
      </section>

      <section className="section-shell">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-bold">Comment ça marche</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {steps.map((s) => (
              <div key={s.title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <s.icon size={22} className="text-[#d6b36a]" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#d6b36a]">Formule Pro</p>
            <h2 className="mt-2 text-3xl font-bold">Moins d&apos;absences, plus d&apos;avis Google</h2>
            <p className="mt-4 text-white/65">
              Chaque rendez-vous enregistré déclenche un rappel avant l&apos;heure. Après la visite, le client reçoit un lien pour laisser un avis. Vous ne gérez rien.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-white/80">
              <li className="flex gap-3"><FiBell className="mt-0.5 shrink-0 text-[#d6b36a]" aria-hidden="true" /> Rappels 24 h et 2 h avant (réglables)</li>
              <li className="flex gap-3"><FiStar className="mt-0.5 shrink-0 text-[#d6b36a]" aria-hidden="true" /> Demande d&apos;avis Google quelques heures après la visite</li>
              <li className="flex gap-3"><FiShield className="mt-0.5 shrink-0 text-[#d6b36a]" aria-hidden="true" /> Uniquement avec l&apos;accord du client, lien « ne plus recevoir » dans chaque e-mail</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white p-6 text-[#111827] shadow-[0_30px_90px_rgba(0,0,0,0.5)]">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#6b7280]">Exemple de rappel envoyé au client</p>
            <p className="mt-3 text-sm font-semibold">Rappel : rendez-vous mardi 14 h chez Salon Léa</p>
            <p className="mt-3 text-sm leading-relaxed text-[#374151]">
              Bonjour Awa, petit rappel : vous avez rendez-vous chez Salon Léa (Coupe) le mardi 14:00. Pour déplacer ou annuler, appelez le 05 00 00 00 00. À bientôt !
            </p>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-3xl font-bold">Deux formules, sans engagement</h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-white/60">S&apos;ajoutent à un site KAH Digital Studio (dès 290 €). Résiliable avec un mois de préavis.</p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <p className="text-sm font-semibold text-white/60">Confort</p>
              <p className="mt-1 text-4xl font-black">99 €<span className="text-base font-semibold text-white/50"> /mois</span></p>
              <ul className="mt-5 space-y-2 text-sm text-white/80">
                {["Hébergement, domaine, sécurité, sauvegardes", "Mises à jour du site par message", "3 modifications de fond par mois", "Rapport mensuel + suivi des avis", "Réponse sous 24 h"].map((i) => (
                  <li key={i} className="flex gap-2"><FiCheck className="mt-0.5 shrink-0 text-[#d6b36a]" aria-hidden="true" />{i}</li>
                ))}
              </ul>
            </div>
            <div className="relative rounded-3xl border border-[#d6b36a]/60 bg-[#d6b36a]/10 p-6">
              <span className="absolute -top-3 left-6 rounded-full bg-[#d6b36a] px-3 py-1 text-xs font-bold text-[#11131b]">Le plus complet</span>
              <p className="text-sm font-semibold text-[#f0d99b]">Pro</p>
              <p className="mt-1 text-4xl font-black">199 €<span className="text-base font-semibold text-white/50"> /mois</span></p>
              <ul className="mt-5 space-y-2 text-sm text-white/85">
                {["Tout Confort", "Rappels de rendez-vous automatiques", "Demandes d'avis Google automatiques", "Modifications de fond illimitées", "Support WhatsApp direct, réponse sous 4 h"].map((i) => (
                  <li key={i} className="flex gap-2"><FiCheck className="mt-0.5 shrink-0 text-[#d6b36a]" aria-hidden="true" />{i}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Link href="/commander?pack=business" className="inline-flex items-center gap-2 rounded-full bg-[#d6b36a] px-8 py-3.5 font-bold text-[#11131b] transition hover:bg-[#f0d99b]">
              Commander mon site et choisir ma formule
            </Link>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-bold">Questions fréquentes</h2>
          <div className="mt-8 space-y-3">
            {faq.map((f) => (
              <details key={f.q} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <summary className="cursor-pointer font-semibold">{f.q}</summary>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
