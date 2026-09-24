import { FiCheckCircle, FiClock, FiShield, FiZap } from "react-icons/fi";
import { CreationEntrepriseForm } from "@/components/creation-entreprise-form";

const cards = [
  { eyebrow: "Rapide", title: "24h pour lancer le dossier", body: "Dès ta demande envoyée, on prépare et vérifie ton immatriculation INPI." },
  { eyebrow: "Zéro erreur", title: "Dossier vérifié par un humain", body: "Chaque champ est contrôlé avant transmission, pas de rejet administratif évitable." },
  { eyebrow: "Zéro prise de tête", title: "Un seul interlocuteur", body: "Tu ne gères ni formulaires, ni démarches, ni relances. On s'occupe de tout jusqu'au SIREN." },
];

const steps = [
  { icon: FiCheckCircle, title: "Tu remplis le formulaire", body: "État civil, adresse, activité envisagée : 5 minutes suffisent." },
  { icon: FiClock, title: "On te recontacte sous 24h", body: "Validation des infos et demande de ta pièce d'identité par email." },
  { icon: FiShield, title: "On dépose ton dossier à l'INPI", body: "Immatriculation suivie de A à Z, sans jargon ni allers-retours inutiles." },
  { icon: FiZap, title: "Ton auto-entreprise est lancée", body: "SIREN reçu, tu peux facturer. On peut enchaîner avec ton site pro." },
];

export function CreationEntreprisePageContent() {
  return (
    <>
      <section className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-white/70">Création d'entreprise</p>
          <h1 className="mb-6 text-4xl font-bold sm:text-5xl">Lance ton auto-entreprise sans prise de tête</h1>
          <p className="text-xl text-white/85">
            On s'occupe de ton immatriculation INPI, vite et sans erreur, pendant que tu te concentres sur ton activité.
          </p>
        </div>
      </section>

      <section className="bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_35%),linear-gradient(180deg,#08111f_0%,#04070d_100%)] py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr,1.1fr] lg:px-8">
          <div className="space-y-6 text-white">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-white/60">Comment ça marche</p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">4 étapes, zéro friction.</h2>
              <p className="mt-4 max-w-2xl text-base text-white/70 sm:text-lg">
                Renseigne tes informations une fois, on gère le reste avec l'administration.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.title} className="rounded-3xl border border-white/10 bg-white/5 p-5 text-white shadow-[0_18px_50px_rgba(0,0,0,0.25)]">
                    <Icon className="text-sky-300" size={28} />
                    <p className="mt-4 text-base font-medium text-white/90">{step.title}</p>
                    <p className="mt-2 text-sm text-white/70">{step.body}</p>
                  </div>
                );
              })}
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/20 p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-white/55">Pourquoi passer par KAH Digital</p>
              <ul className="mt-4 space-y-2 text-sm text-white/75">
                <li>Immatriculation INPI suivie par un vrai humain, pas un formulaire perdu</li>
                <li>Service gratuit si couplé à un pack site (890€ / 1590€ + abo)</li>
                <li>Un seul interlocuteur pour ton entreprise ET ton site web</li>
              </ul>
            </div>
          </div>

          <CreationEntrepriseForm />
        </div>
      </section>

      <section className="bg-slate-100 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Pourquoi c'est simple</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">Zéro démarche, zéro erreur, zéro perte de temps.</h2>
            <p className="mt-4 text-lg text-slate-600">
              On gère les pièges administratifs qui font traîner ou rejeter un dossier mal préparé. Toi, tu n'as rien à démêler seul.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {cards.map((card) => (
              <div key={card.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{card.eyebrow}</p>
                <h3 className="mt-3 text-xl font-semibold text-slate-900">{card.title}</h3>
                <p className="mt-3 text-slate-600">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
