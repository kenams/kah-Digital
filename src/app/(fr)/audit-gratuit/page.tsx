"use client";

import { useState } from "react";
import { FiArrowRight, FiCheckCircle, FiZap, FiSearch, FiTrendingUp, FiMessageCircle } from "react-icons/fi";
import { trackEvent } from "@/lib/analytics";

const WA_AUDIT_URL = "https://wa.me/33759558414?text=Bonjour%20KAH%20Digital%2C%20je%20voudrais%20un%20audit%20gratuit%20de%20mon%20site%20web.";

const CHECKS = [
  { icon: FiSearch, label: "Référencement Google (SEO)" },
  { icon: FiZap, label: "Vitesse de chargement" },
  { icon: FiTrendingUp, label: "Taux de conversion" },
  { icon: FiCheckCircle, label: "Compatibilité mobile" },
];

export default function AuditGratuitPage() {
  const [form, setForm] = useState({ businessName: "", website: "", email: "", phone: "" });
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.website || !form.email) return;
    setState("loading");
    try {
      const res = await fetch("/api/audit-gratuit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setState("done");
      trackEvent("generate_lead", { form_name: "audit_gratuit", website: form.website });
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-4">
        <div className="max-w-md text-center">
          <div className="mb-6 flex h-20 w-20 mx-auto items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-violet-600">
            <FiCheckCircle size={36} className="text-white" />
          </div>
          <h1 className="mb-4 text-3xl font-extrabold text-white">Audit en cours !</h1>
          <p className="mb-6 text-gray-400 leading-relaxed">
            Votre audit personnalisé est en cours de préparation. Vous recevrez les résultats sur <strong className="text-white">{form.email}</strong> dans les prochaines heures.
          </p>
          <div className="rounded-2xl border border-white/8 bg-gray-900 p-5 text-left space-y-2">
            <p className="text-sm text-gray-500 font-semibold uppercase tracking-wide">Vous allez recevoir :</p>
            {["Score digital sur 100", "Liste des problèmes détectés", "Recommandations concrètes", "Estimation de budget"].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-gray-300">
                <FiCheckCircle size={13} className="text-emerald-400 shrink-0" />
                {item}
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-gray-600">Aucun engagement · Résultats personnalisés · Gratuit</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero */}
      <section className="relative overflow-hidden pt-20 pb-12">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute -top-32 left-1/3 h-96 w-96 rounded-full bg-blue-600/15 blur-3xl" />
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-sm text-amber-300">
            <FiZap size={13} /> Analyse offerte — sans engagement
          </div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Obtenez l'audit gratuit<br />de votre site web
          </h1>
          <p className="mb-8 text-lg text-gray-400">
            KAH-Digital analyse votre site et vous envoie un rapport complet : score, problèmes détectés, recommandations et estimation de budget.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 pb-24 grid gap-12 lg:grid-cols-2">
        {/* Form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-gray-300">Nom de votre entreprise *</label>
              <input
                type="text"
                value={form.businessName}
                onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                placeholder="Ex: Cabinet Dupont, Restaurant Le Moulin..."
                className="w-full rounded-xl border border-white/10 bg-gray-900 px-4 py-3 text-white placeholder-gray-600 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-gray-300">URL de votre site *</label>
              <input
                type="url"
                required
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
                placeholder="https://votre-site.fr"
                className="w-full rounded-xl border border-white/10 bg-gray-900 px-4 py-3 text-white placeholder-gray-600 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-gray-300">Votre email *</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="vous@votre-entreprise.fr"
                className="w-full rounded-xl border border-white/10 bg-gray-900 px-4 py-3 text-white placeholder-gray-600 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-gray-300">Téléphone (optionnel)</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+33 6 00 00 00 00"
                className="w-full rounded-xl border border-white/10 bg-gray-900 px-4 py-3 text-white placeholder-gray-600 focus:border-blue-500 focus:outline-none"
              />
            </div>
            {state === "error" && (
              <p className="text-sm text-red-400">Une erreur est survenue. Réessayez ou envoyez un email à kahdigital42@gmail.com.</p>
            )}
            <button
              type="submit"
              disabled={state === "loading"}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-8 py-4 font-bold text-white shadow-lg shadow-blue-500/25 transition hover:shadow-blue-500/40 disabled:opacity-60"
            >
              {state === "loading" ? "Analyse en cours..." : <>Lancer mon audit gratuit <FiArrowRight size={16} /></>}
            </button>
            <p className="text-center text-xs text-gray-600">Aucune carte bleue · Résultats par email · 100% gratuit</p>
          </form>
          <div className="mt-6 rounded-2xl border border-[#25D366]/25 bg-[#25D366]/8 p-4 text-center">
            <p className="mb-2 text-sm font-semibold text-white">Vous préférez un retour direct ?</p>
            <a
              href={WA_AUDIT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-bold text-white transition hover:brightness-110"
            >
              <FiMessageCircle size={15} />
              Demander via WhatsApp
            </a>
            <p className="mt-2 text-xs text-gray-500">Réponse sous 2h en semaine</p>
          </div>
        </div>

        {/* What you get */}
        <div className="space-y-6">
          <div>
            <h2 className="mb-4 text-lg font-bold text-white">Ce que vous recevez</h2>
            <div className="space-y-3">
              {[
                { icon: FiSearch, title: "Score digital /100", desc: "Une note globale de la santé de votre site web." },
                { icon: FiZap, title: "Problèmes identifiés", desc: "SEO, vitesse, mobile, UX — chaque point faible détaillé." },
                { icon: FiTrendingUp, title: "Recommandations", desc: "Actions concrètes pour améliorer votre site immédiatement." },
                { icon: FiCheckCircle, title: "Estimation de budget", desc: "Fourchette indicative pour une refonte ou amélioration." },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3 rounded-xl border border-white/8 bg-gray-900/50 p-4">
                  <item.icon size={16} className="mt-0.5 shrink-0 text-blue-400" />
                  <div>
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-white/8 bg-gray-900/50 p-5">
            <div className="flex gap-0.5 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} viewBox="0 0 24 24" fill="#fbbf24" className="h-3.5 w-3.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              ))}
            </div>
            <p className="text-sm text-gray-300 italic">"En 3 semaines j'avais un site vitrine propre et professionnel. 4 nouveaux clients le premier mois."</p>
            <p className="mt-2 text-xs text-gray-600">S.M. — Coach business, Lyon</p>
          </div>
        </div>
      </div>

      {/* What we check */}
      <section className="border-t border-white/6 py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="mb-8 text-center text-xl font-bold text-white">Ce que l'audit analyse</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {CHECKS.map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-2 rounded-xl border border-white/8 bg-gray-900/50 p-4 text-center">
                <item.icon size={20} className="text-blue-400" />
                <span className="text-xs text-gray-400">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Urgency CTA final */}
      <section className="border-t border-white/6 bg-gradient-to-r from-blue-950/60 to-violet-950/40 py-14">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-400">Places limitées</p>
          <h2 className="mb-4 text-2xl font-extrabold text-white">2 audits gratuits disponibles ce mois-ci</h2>
          <p className="mb-8 text-gray-400">Chaque audit est préparé manuellement par Kénan. Places limitées pour garantir la qualité.</p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href={WA_AUDIT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 font-bold text-white shadow-lg shadow-green-500/20 transition hover:brightness-110"
            >
              <FiMessageCircle size={16} />
              Réserver mon audit sur WhatsApp
            </a>
          </div>
          <p className="mt-4 text-xs text-gray-600">100% gratuit · Sans engagement · Résultats personnalisés</p>
        </div>
      </section>
    </div>
  );
}
