"use client";

import Link from "next/link";
import { useState } from "react";
import { FiArrowRight, FiCheckCircle, FiMapPin, FiMessageSquare, FiTrendingUp, FiSearch } from "react-icons/fi";
import { trackEvent } from "@/lib/analytics";

const STEPS = [
  { icon: FiSearch, title: "On mesure", text: "Votre fiche Google, votre site, vos avis, et ce que répondent les assistants IA quand on cherche votre métier dans votre ville." },
  { icon: FiTrendingUp, title: "On compare", text: "Votre score face aux entreprises qui apparaissent à votre place, avec ce qui fait la différence." },
  { icon: FiMessageSquare, title: "On vous dit quoi faire", text: "Trois actions concrètes par mois, classées par effet attendu. Pas un tableau de bord à déchiffrer." },
];

export default function VisibiliteLocalePage() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setState("loading");
    try {
      const res = await fetch("/api/visibilite-waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setState("done");
      trackEvent("generate_lead", { form_name: "visibilite_locale_waitlist" });
    } catch {
      setState("error");
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <section className="relative overflow-hidden pt-24 pb-14">
        <div aria-hidden className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-blue-600/15 blur-3xl" />
        <div aria-hidden className="absolute -top-24 right-1/4 h-80 w-80 rounded-full bg-violet-600/15 blur-3xl" />
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-200">
            <FiMapPin size={13} /> Pour commerces, artisans et professions de santé
          </div>
          <h1 className="mb-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Quand on cherche votre métier<br />dans votre ville, on tombe sur qui ?
          </h1>
          <p className="mx-auto mb-9 max-w-xl text-lg leading-relaxed text-gray-400">
            Google, Maps, et maintenant les assistants IA : vos futurs clients demandent, on leur répond par quelques noms.
            Nous suivons chaque mois si le vôtre en fait partie, et ce qu&apos;il faut changer pour y entrer.
          </p>

          {state === "done" ? (
            <div role="status" className="mx-auto max-w-md rounded-2xl border border-emerald-400/25 bg-emerald-500/10 p-6 text-left">
              <p className="mb-1 flex items-center gap-2 font-bold text-emerald-200">
                <FiCheckCircle /> Vous êtes sur la liste
              </p>
              <p className="text-sm leading-relaxed text-emerald-100/80">
                Nous vous écrivons à <strong className="text-white">{email}</strong> dès l&apos;ouverture. En attendant, l&apos;audit gratuit de votre site est disponible tout de suite.
              </p>
              <Link href="/audit-gratuit" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white underline underline-offset-4">
                Lancer mon audit gratuit <FiArrowRight />
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
              <label htmlFor="vl-email" className="sr-only">Votre e-mail</label>
              <input
                id="vl-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vous@votre-entreprise.fr"
                className="w-full rounded-full border border-white/15 bg-slate-950/60 px-5 py-3.5 text-white placeholder:text-white/40 focus:border-blue-400/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/40"
              />
              <button
                type="submit"
                disabled={state === "loading"}
                className="group flex shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-600 px-7 py-3.5 font-bold text-white shadow-lg shadow-blue-500/25 transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 disabled:opacity-60"
              >
                {state === "loading" ? "Envoi…" : "Rejoindre la liste"}
                <FiArrowRight className="transition group-hover:translate-x-0.5" />
              </button>
            </form>
          )}
          {state === "error" && (
            <p role="status" className="mx-auto mt-3 max-w-md rounded-xl border border-rose-500/25 bg-rose-500/10 px-4 py-2.5 text-sm text-rose-200">
              Une erreur est survenue. Réessayez dans un instant.
            </p>
          )}
          <p className="mt-4 text-xs text-gray-500">Tarif prévu : 39 € par mois, sans engagement. Aucun paiement maintenant.</p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-20">
        <div className="grid gap-5 md:grid-cols-3">
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <div key={title} className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300"><Icon size={18} /></span>
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Étape {i + 1}</span>
              </div>
              <h2 className="mb-2 text-lg font-bold text-white">{title}</h2>
              <p className="text-sm leading-relaxed text-gray-400">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-center sm:p-8">
          <h2 className="mb-2 text-xl font-bold text-white">Voir à quoi ça ressemble, maintenant</h2>
          <p className="mx-auto mb-5 max-w-lg text-sm leading-relaxed text-gray-400">
            L&apos;audit gratuit analyse déjà votre site (référencement, vitesse, mobile) et vous envoie un score avec des recommandations. Le suivi local s&apos;appuie sur le même socle.
          </p>
          <Link href="/audit-gratuit" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50">
            Obtenir mon audit gratuit <FiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
}
