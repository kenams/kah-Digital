"use client";

import { useState, type FormEvent } from "react";
import { FiCheckCircle } from "react-icons/fi";

const field =
  "w-full rounded-2xl border border-white/12 bg-black/30 px-4 py-3 text-base text-white outline-none transition-all duration-150 placeholder:text-white/30 hover:border-white/20 focus:border-[#d6b36a]/70 focus:ring-2 focus:ring-[#d6b36a]/20";

type Props = { sessionId: string };

export function OrderBriefForm({ sessionId }: Props) {
  const [values, setValues] = useState({
    businessName: "",
    activity: "",
    city: "",
    services: "",
    tone: "",
    existingDomain: "",
    links: "",
    assets: "",
    notes: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  function set<K extends keyof typeof values>(key: K, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/commander/brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, ...values }),
      });
      const data = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) throw new Error(data.error || "Envoi impossible.");
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Envoi impossible.");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-[28px] border border-emerald-400/25 bg-emerald-500/10 p-8 text-center">
        <FiCheckCircle size={36} className="mx-auto text-emerald-300" aria-hidden="true" />
        <h2 className="mt-4 text-2xl font-bold">Brief reçu, je m&apos;y mets</h2>
        <p className="mx-auto mt-2 max-w-md text-white/70">
          Le délai de 5 jours ouvrés démarre maintenant. Vous recevez une copie de votre brief par e-mail.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 rounded-[28px] border border-white/10 bg-white/[0.06] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.45)] sm:p-8">
      <label className="grid gap-2">
        <span className="text-sm font-semibold text-white/78">Nom à afficher sur le site</span>
        <input value={values.businessName} onChange={(e) => set("businessName", e.target.value)} placeholder="Boulangerie Dupont" className={`${field} h-12 py-0`} />
      </label>
      <label className="grid gap-2">
        <span className="text-sm font-semibold text-white/78">Votre activité en une phrase *</span>
        <input required value={values.activity} onChange={(e) => set("activity", e.target.value)} placeholder="Boulangerie artisanale, pains au levain et viennoiseries" className={`${field} h-12 py-0`} />
      </label>
      <label className="grid gap-2">
        <span className="text-sm font-semibold text-white/78">Ville ou zone d&apos;intervention</span>
        <input value={values.city} onChange={(e) => set("city", e.target.value)} placeholder="Toulouse et alentours" className={`${field} h-12 py-0`} />
      </label>
      <label className="grid gap-2">
        <span className="text-sm font-semibold text-white/78">Vos services ou produits, horaires, tarifs à afficher</span>
        <textarea rows={5} value={values.services} onChange={(e) => set("services", e.target.value)} placeholder="Listez ce que vous proposez, vos horaires, vos tarifs si vous voulez les afficher…" className={field} />
      </label>
      <label className="grid gap-2">
        <span className="text-sm font-semibold text-white/78">Ton et couleurs souhaités</span>
        <input value={values.tone} onChange={(e) => set("tone", e.target.value)} placeholder="Chaleureux, tons crème et vert foncé" className={`${field} h-12 py-0`} />
      </label>
      <label className="grid gap-2">
        <span className="text-sm font-semibold text-white/78">Nom de domaine existant (si vous en avez un)</span>
        <input value={values.existingDomain} onChange={(e) => set("existingDomain", e.target.value)} placeholder="boulangerie-dupont.fr" className={`${field} h-12 py-0`} />
      </label>
      <label className="grid gap-2">
        <span className="text-sm font-semibold text-white/78">Liens utiles (réseaux sociaux, ancien site, fiche Google)</span>
        <textarea rows={3} value={values.links} onChange={(e) => set("links", e.target.value)} placeholder="https://…" className={field} />
      </label>
      <label className="grid gap-2">
        <span className="text-sm font-semibold text-white/78">Logo et photos (lien Google Drive, WeTransfer, Dropbox…)</span>
        <textarea rows={2} value={values.assets} onChange={(e) => set("assets", e.target.value)} placeholder="https://drive.google.com/…" className={field} />
      </label>
      <label className="grid gap-2">
        <span className="text-sm font-semibold text-white/78">Autre chose à me dire ?</span>
        <textarea rows={3} value={values.notes} onChange={(e) => set("notes", e.target.value)} className={field} />
      </label>

      {error ? (
        <p role="alert" className="rounded-2xl border border-rose-400/25 bg-rose-500/10 p-3 text-sm text-rose-100">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-[#d6b36a] px-6 text-base font-bold text-[#11131b] shadow-lg shadow-[#d6b36a]/20 transition hover:bg-[#f0d99b] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Envoi…" : "Envoyer mon brief"}
      </button>
    </form>
  );
}
