"use client";
import { useState } from "react";
import { FiArrowRight, FiCheck } from "react-icons/fi";

interface Props {
  prospectId: string;
  siteUrl: string;
  businessName: string;
  lang: "fr" | "en" | "de";
}

const LABELS = {
  fr: {
    title: "Je veux améliorer mon site",
    sub: "Réponse sous 2h — sans engagement",
    namePh: "Votre prénom",
    emailPh: "Votre email",
    phonePh: "Téléphone / WhatsApp (optionnel)",
    cta: "Être contacté →",
    success: "✅ Reçu ! Vous serez contacté dans les 2h.",
  },
  en: {
    title: "I want to improve my site",
    sub: "Response within 2h — no commitment",
    namePh: "Your first name",
    emailPh: "Your email",
    phonePh: "Phone / WhatsApp (optional)",
    cta: "Get contacted →",
    success: "✅ Received! You'll be contacted within 2h.",
  },
  de: {
    title: "Ich möchte meine Website verbessern",
    sub: "Antwort innerhalb 2h — unverbindlich",
    namePh: "Ihr Vorname",
    emailPh: "Ihre E-Mail",
    phonePh: "Telefon / WhatsApp (optional)",
    cta: "Kontaktiert werden →",
    success: "✅ Erhalten! Sie werden innerhalb 2h kontaktiert.",
  },
};

export default function QuickContactForm({ prospectId, siteUrl, businessName, lang }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const label = LABELS[lang] ?? LABELS.fr;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setLoading(true);
    try {
      await fetch("/api/prospect-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prospectId, name, email, phone, businessName, siteUrl }),
      });
      setDone(true);
    } catch {
      setDone(true);
    }
    setLoading(false);
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/10 p-5 text-center">
        <FiCheck size={24} className="mx-auto mb-2 text-emerald-400" />
        <p className="font-semibold text-emerald-200">{label.success}</p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-5 shadow-[0_16px_50px_rgba(0,0,0,0.3)] backdrop-blur">
      <div aria-hidden className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-sky-500/10 blur-2xl" />
      <p className="relative mb-1 text-center font-bold text-white">{label.title}</p>
      <p className="relative mb-4 text-center text-xs text-white/50">{label.sub}</p>
      <form onSubmit={submit} className="relative flex flex-col gap-2.5">
        <input
          type="text"
          placeholder={label.namePh}
          value={name}
          onChange={e => setName(e.target.value)}
          required
          className="w-full rounded-xl border border-white/12 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-white/40 transition-all duration-150 focus:border-sky-400/60 focus:bg-slate-950/80 focus:outline-none focus:ring-2 focus:ring-sky-500/20 hover:border-white/20"
        />
        <input
          type="email"
          placeholder={label.emailPh}
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full rounded-xl border border-white/12 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-white/40 transition-all duration-150 focus:border-sky-400/60 focus:bg-slate-950/80 focus:outline-none focus:ring-2 focus:ring-sky-500/20 hover:border-white/20"
        />
        <input
          type="tel"
          placeholder={label.phonePh}
          value={phone}
          onChange={e => setPhone(e.target.value)}
          className="w-full rounded-xl border border-white/12 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-white/40 transition-all duration-150 focus:border-sky-400/60 focus:bg-slate-950/80 focus:outline-none focus:ring-2 focus:ring-sky-500/20 hover:border-white/20"
        />
        <button
          type="submit"
          disabled={loading || !name.trim() || !email.trim()}
          className="group flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 py-3 font-bold text-slate-950 shadow-lg shadow-sky-500/25 transition-all hover:gap-3 hover:shadow-sky-500/40 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:gap-2"
        >
          {loading ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950/30 border-t-slate-950" />
          ) : (
            <>{label.cta} <FiArrowRight size={15} /></>
          )}
        </button>
      </form>
    </div>
  );
}
