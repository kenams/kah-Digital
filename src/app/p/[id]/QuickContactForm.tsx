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
      <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/8 p-5 text-center">
        <FiCheck size={24} className="mx-auto mb-2 text-emerald-400" />
        <p className="font-semibold text-emerald-300">{label.success}</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-5">
      <p className="mb-1 text-center font-bold text-white">{label.title}</p>
      <p className="mb-4 text-center text-xs text-gray-500">{label.sub}</p>
      <form onSubmit={submit} className="flex flex-col gap-2">
        <input
          type="text"
          placeholder={label.namePh}
          value={name}
          onChange={e => setName(e.target.value)}
          required
          className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-blue-500/50 focus:outline-none"
        />
        <input
          type="email"
          placeholder={label.emailPh}
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-blue-500/50 focus:outline-none"
        />
        <input
          type="tel"
          placeholder={label.phonePh}
          value={phone}
          onChange={e => setPhone(e.target.value)}
          className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-blue-500/50 focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading || !name.trim() || !email.trim()}
          className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 py-3 font-bold text-white shadow-lg shadow-blue-500/25 transition hover:shadow-blue-500/40 disabled:opacity-60"
        >
          {loading ? "..." : <>{label.cta} <FiArrowRight size={15} /></>}
        </button>
      </form>
    </div>
  );
}
