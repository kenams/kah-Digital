import type { Metadata } from "next";
import Link from "next/link";
import { FiCheck, FiFileText, FiMail, FiPercent, FiUsers } from "react-icons/fi";

const url = "https://kah-digital.ch/partenaires";
const mailto =
  "mailto:kahdigital42@gmail.com?subject=Partenariat%20KAH%20Digital%20Studio&body=Bonjour%2C%20je%20suis%20%5Bm%C3%A9tier%5D%20%C3%A0%20%5Bville%5D%20et%20je%20souhaite%20en%20savoir%20plus%20sur%20votre%20programme%20partenaire.";

export const metadata: Metadata = {
  title: "Devenir partenaire | KAH Digital Studio",
  description:
    "Comptables, courtiers, associations de commerçants, fédérations d'artisans : recommandez un site web à vos clients et touchez 10 % du prix du site, ou offrez-leur 10 % de remise.",
  alternates: { canonical: url },
  openGraph: {
    images: [{ url: "/og-kah-digital.png", width: 1200, height: 630 }],
    title: "Programme partenaire KAH Digital Studio",
    description: "Recommandez un site web à vos clients : 10 % du prix du site pour vous, ou 10 % de remise pour eux.",
    url,
    type: "website",
  },
};

const who = ["Experts-comptables et comptables", "Courtiers et conseillers", "Associations de commerçants", "Fédérations et réseaux d'artisans", "Clubs d'affaires et incubateurs"];

const steps = [
  { icon: FiUsers, title: "Vous nous présentez un client", body: "Un simple message ou un e-mail avec ses coordonnées, et son accord pour être contacté." },
  { icon: FiFileText, title: "On lui fait une proposition claire", body: "Devis écrit, prix annoncé à l'avance. Nous vous tenons informé de l'avancement." },
  { icon: FiPercent, title: "Vous êtes remercié", body: "10 % du prix HT du site, versés une fois le paiement du client encaissé." },
];

const faq = [
  { q: "Combien je touche ?", a: "10 % du prix HT du site apporté (par exemple 79 € sur un site à 790 €), versés après encaissement. Pas de plafond sur le nombre de clients recommandés." },
  { q: "Ma profession encadre les commissions. Que faire ?", a: "Certaines professions réglementées limitent ce type de rémunération. Dans ce cas, choisissez l'option remise : votre client bénéficie de 10 % sur son site et vous ne touchez rien. À vous de vérifier ce qui est permis par votre déontologie." },
  { q: "Qui s'occupe du client ?", a: "Nous. Vous n'avez ni vente, ni suivi, ni facturation à gérer." },
  { q: "Faut-il un contrat ?", a: "Un accord écrit d'une page suffit : le taux, le délai de versement et la façon dont nous comptons les clients recommandés." },
  { q: "Mes clients reçoivent-ils des démarches commerciales ?", a: "Non. Nous ne contactons que les personnes que vous nous avez présentées, avec leur accord." },
];

export default function PartnersPage() {
  return (
    <main className="min-h-screen bg-[#0a0908] text-white">
      <section className="section-shell">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d6b36a]/35 bg-[#d6b36a]/10 px-4 py-2 text-sm text-[#f0d99b]">
            <FiUsers size={14} aria-hidden="true" /> Programme partenaire
          </p>
          <h1 className="text-4xl font-bold sm:text-6xl">Vos clients ont besoin d&apos;un site. Recommandez-nous.</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/65">
            Nous créons des sites pour les artisans, commerçants et indépendants. Vous recommandez, nous nous occupons de tout, et vous touchez 10 % du prix du site, ou vous offrez 10 % de remise à votre client.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={mailto} className="inline-flex items-center gap-2 rounded-full bg-[#d6b36a] px-7 py-3.5 font-bold text-[#11131b] transition hover:bg-[#f0d99b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f0d99b]">
              <FiMail size={16} aria-hidden="true" /> Devenir partenaire
            </a>
            <Link href="/offres" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-semibold text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
              Voir nos offres
            </Link>
          </div>
        </div>
      </section>

      <section className="section-shell pt-0">
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

      <section className="section-shell pt-0">
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
          <div className="rounded-3xl border border-[#d6b36a]/30 bg-[#d6b36a]/[0.06] p-7">
            <h2 className="text-2xl font-bold">Pour qui ?</h2>
            <ul className="mt-5 space-y-3">
              {who.map((w) => (
                <li key={w} className="flex items-start gap-3 text-white/80">
                  <FiCheck size={18} className="mt-0.5 shrink-0 text-[#d6b36a]" aria-hidden="true" />
                  {w}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <h2 className="text-2xl font-bold">Ce que nous proposons à vos clients</h2>
            <ul className="mt-5 space-y-3 text-white/80">
              <li className="flex items-start gap-3"><FiCheck size={18} className="mt-0.5 shrink-0 text-[#d6b36a]" aria-hidden="true" />Landing 1 page : 290 €</li>
              <li className="flex items-start gap-3"><FiCheck size={18} className="mt-0.5 shrink-0 text-[#d6b36a]" aria-hidden="true" />Site professionnel : 790 €</li>
              <li className="flex items-start gap-3"><FiCheck size={18} className="mt-0.5 shrink-0 text-[#d6b36a]" aria-hidden="true" />Site + réservation + espace admin : 1 490 €</li>
              <li className="flex items-start gap-3"><FiCheck size={18} className="mt-0.5 shrink-0 text-[#d6b36a]" aria-hidden="true" />Option : abonnement mensuel pour garder le site à jour</li>
            </ul>
            <p className="mt-5 text-xs text-white/45">Prix HT. Détails sur la page Offres.</p>
          </div>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-bold">Questions fréquentes</h2>
          <div className="mt-8 space-y-3">
            {faq.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <summary className="cursor-pointer list-none font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f0d99b]">{f.q}</summary>
                <p className="mt-3 text-sm leading-relaxed text-white/65">{f.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href={mailto} className="inline-flex items-center gap-2 rounded-full bg-[#d6b36a] px-7 py-3.5 font-bold text-[#11131b] transition hover:bg-[#f0d99b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f0d99b]">
              <FiMail size={16} aria-hidden="true" /> Écrire à KAH Digital Studio
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
