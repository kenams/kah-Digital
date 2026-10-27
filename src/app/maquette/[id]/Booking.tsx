"use client";

import { useMemo, useState } from "react";

const SLOTS = ["09:00", "10:30", "14:00", "15:30", "17:00"];
export type BookingDay = { key: string; label: string };

type Props = { businessName: string; ctaLabel: string; days: BookingDay[] };

// Réservation de démonstration : aucune donnée n'est envoyée nulle part.
export default function Booking({ businessName, ctaLabel, days }: Props) {
  const [day, setDay] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [done, setDone] = useState(false);

  const ready = useMemo(() => Boolean(day && slot && name.trim().length > 1 && phone.trim().length > 5), [day, slot, name, phone]);
  const chosenLabel = days.find((d) => d.key === day)?.label;

  if (done) {
    return (
      <div role="status" className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-900">
        <p className="text-lg font-semibold">Rendez-vous demandé : {chosenLabel} à {slot}</p>
        <p className="mt-2 text-sm leading-relaxed">
          C&apos;est une démonstration. Sur votre vrai site, {name.split(" ")[0]} reçoit un e-mail de confirmation avec un fichier agenda,
          et {businessName} voit la demande dans son espace admin. Un rappel part automatiquement la veille.
        </p>
        <button type="button" onClick={() => { setDone(false); setSlot(null); }} className="mt-4 text-sm font-medium underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700">
          Refaire un essai
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); if (ready) setDone(true); }}
      className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-7"
      aria-label="Réservation en ligne (démonstration)"
    >
      <fieldset>
        <legend className="text-sm font-semibold text-stone-900">1. Choisissez un jour</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {days.length === 0 && <span className="text-sm text-stone-400">Chargement des disponibilités…</span>}
          {days.map((d) => (
            <button
              key={d.key}
              type="button"
              aria-pressed={day === d.key}
              onClick={() => setDay(d.key)}
              className={`rounded-lg border px-3 py-2 text-sm capitalize transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${day === d.key ? "border-[var(--accent)] bg-[var(--accent)] text-white" : "border-stone-200 bg-white text-stone-700 hover:border-stone-400"}`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-6">
        <legend className="text-sm font-semibold text-stone-900">2. Choisissez une heure</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {SLOTS.map((s) => (
            <button
              key={s}
              type="button"
              disabled={!day}
              aria-pressed={slot === s}
              onClick={() => setSlot(s)}
              className={`rounded-lg border px-3 py-2 text-sm tabular-nums transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-40 ${slot === s ? "border-[var(--accent)] bg-[var(--accent)] text-white" : "border-stone-200 bg-white text-stone-700 hover:border-stone-400"}`}
            >
              {s}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-stone-900">
          3. Votre nom
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            className="mt-2 w-full rounded-lg border border-stone-300 bg-white px-3 py-2.5 text-base font-normal text-stone-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
          />
        </label>
        <label className="block text-sm font-semibold text-stone-900">
          Téléphone
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            inputMode="tel"
            autoComplete="tel"
            className="mt-2 w-full rounded-lg border border-stone-300 bg-white px-3 py-2.5 text-base font-normal text-stone-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={!ready}
        className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-[var(--accent)] px-6 py-3.5 text-base font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
      >
        {ctaLabel}
      </button>
      <p className="mt-3 text-xs text-stone-500">Démonstration : rien n&apos;est enregistré ni envoyé.</p>
    </form>
  );
}
