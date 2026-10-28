"use client";

import Script from "next/script";
import { useState, type FormEvent } from "react";
import { FiSend } from "react-icons/fi";

type Line = { id: string; from: "user" | "bot"; text: string };

const EXAMPLES = [
  "Fermé lundi prochain",
  "Plat du jour : poulet yassa et riz, 12 €",
  "Promo -20 % sur les desserts ce week-end",
  "Nouveaux horaires : ouvert tous les jours de 11h à 22h",
];

declare global {
  interface Window {
    KahPulse?: { refresh: () => void };
  }
}

export function PulseDemo() {
  const [lines, setLines] = useState<Line[]>([
    { id: "hello", from: "bot", text: "Essayez : écrivez ce que vous voulez changer. Le site à gauche se met à jour en direct." },
  ]);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function send(text: string) {
    const value = text.trim();
    if (!value || busy) return;
    setBusy(true);
    setMessage("");
    setLines((l) => [...l, { id: `u${Date.now()}`, from: "user", text: value }]);
    try {
      const res = await fetch("/api/pulse/demo", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: value }) });
      const out = (await res.json()) as { reply?: string; error?: string };
      setLines((l) => [...l, { id: `b${Date.now()}`, from: "bot", text: out.reply || out.error || "Une erreur est survenue." }]);
      window.KahPulse?.refresh();
    } catch {
      setLines((l) => [...l, { id: `b${Date.now()}`, from: "bot", text: "Connexion impossible, réessayez." }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
      <Script src="/pulse.js" data-site="demo" data-banner="off" strategy="afterInteractive" />

      {/* Faux site du restaurant */}
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#fbf7ef] text-[#2b1d12] shadow-[0_30px_90px_rgba(0,0,0,0.5)]" aria-label="Exemple de site de restaurant">
        <div className="flex items-center gap-1.5 border-b border-black/10 bg-[#efe7d6] px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#e0a090]" /><span className="h-2.5 w-2.5 rounded-full bg-[#e6c78a]" /><span className="h-2.5 w-2.5 rounded-full bg-[#a8c9a0]" />
          <span className="ml-3 truncate rounded-md bg-white/70 px-3 py-0.5 text-xs text-black/50">chez-lena.exemple</span>
        </div>

        <div data-pulse="closure" className="empty:hidden bg-[#92400e] px-4 py-2 text-center text-sm font-medium text-[#fef3c7]" />
        <div data-pulse="announcement" className="empty:hidden bg-[#2b1d12] px-4 py-2 text-center text-sm font-medium text-[#fbf7ef]" />

        <div className="px-6 pb-8 pt-6 sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#a1692f]">Cuisine franco-africaine · Toulouse</p>
          <h3 className="mt-1 font-serif text-4xl font-bold">Chez Léna</h3>
          <p className="mt-2 max-w-md text-sm text-[#6b5844]">Une table généreuse, des plats faits maison, à deux pas du centre.</p>

          <div data-pulse="promo" className="empty:hidden mt-5 rounded-2xl border border-[#d9a85a]/60 bg-[#fff1d6] px-4 py-3 text-sm" />

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#a1692f]">Aujourd&apos;hui</p>
              <div data-pulse="special" className="mt-2 min-h-[48px] text-sm empty:before:text-[#9a8a76] empty:before:content-['Le_plat_du_jour_apparaît_ici.']" />
            </div>
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#a1692f]">Horaires</p>
              <div data-pulse="hours" className="mt-2 space-y-0.5 text-xs" />
            </div>
          </div>
          <p className="mt-5 text-xs text-[#6b5844]">
            <span data-pulse="address" /> · <span data-pulse="phone" />
          </p>
        </div>
      </div>

      {/* Chat */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-5">
        <div className="flex flex-wrap gap-2">
          {EXAMPLES.map((e) => (
            <button key={e} type="button" disabled={busy} onClick={() => send(e)} className="rounded-full border border-white/12 bg-black/25 px-3 py-1.5 text-left text-xs text-white/75 transition hover:border-[#d6b36a]/50 hover:text-white disabled:opacity-50">
              {e}
            </button>
          ))}
        </div>
        <div className="mt-4 max-h-[320px] min-h-[200px] space-y-3 overflow-y-auto rounded-2xl bg-black/25 p-4" role="log" aria-live="polite">
          {lines.map((l) => (
            <div key={l.id} className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${l.from === "user" ? "ml-auto bg-[#d6b36a] text-[#11131b]" : "bg-white/10 text-white"}`}>
              {l.text}
            </div>
          ))}
          {busy ? <div className="w-14 rounded-2xl bg-white/10 px-3.5 py-2.5 text-sm text-white/60">…</div> : null}
        </div>
        <form
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            void send(message);
          }}
          className="mt-3 flex gap-2"
        >
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={240}
            placeholder="Écrivez votre changement…"
            aria-label="Votre message"
            className="w-full rounded-xl border border-white/12 bg-black/30 px-3.5 py-2.5 text-sm text-white outline-none placeholder:text-white/30 focus:border-[#d6b36a]/70 focus:ring-2 focus:ring-[#d6b36a]/20"
          />
          <button type="submit" disabled={busy || !message.trim()} className="inline-flex items-center gap-2 rounded-xl bg-[#d6b36a] px-4 text-sm font-bold text-[#11131b] transition hover:bg-[#f0d99b] disabled:opacity-50">
            <FiSend aria-hidden="true" /> Envoyer
          </button>
        </form>
        <p className="mt-3 text-xs text-white/40">Démo publique : elle se remet à zéro toute seule. Votre vrai espace est privé.</p>
      </div>
    </div>
  );
}
