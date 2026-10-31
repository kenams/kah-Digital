"use client";

import Link from "next/link";
import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { getUtm } from "@/lib/utm";
import { PILOT_DELIVERY, type Pilot } from "@/data/pilotes";

const field =
  "w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-white placeholder:text-white/40 transition focus:border-[#d6b36a]/70 focus:outline-none focus:ring-2 focus:ring-[#d6b36a]/25 hover:border-white/25";

/** Demande de pilote : envoyée au système de devis existant (/api/quote), identifiée par le tag du pilote. */
export function PilotForm({ pilot }: { pilot: Pilot }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fd = new FormData(form);
    const get = (key: string) => String(fd.get(key) ?? "").trim();
    const situation = get("situation");

    if (situation.length < 5) {
      setStatus("error");
      setMessage("Décrivez votre situation en une ou deux phrases pour que nous puissions vous répondre.");
      return;
    }

    setStatus("loading");
    setMessage("");

    const payload = {
      name: get("name"),
      email: get("email"),
      phone: get("phone") || undefined,
      clientType: "entreprise" as const,
      companyName: get("company"),
      projectType: `Pilote ${pilot.name}`,
      goal: situation,
      pages: [] as string[],
      budget: "Partenaire fondateur — prix fixe communiqué avant engagement",
      timeline: `Cadrage ${PILOT_DELIVERY.scoping} · V1 pilote ${PILOT_DELIVERY.v1}`,
      message: [
        `[${pilot.tag}] Demande de pilote ${pilot.name}`,
        get("siteUrl") ? `Site : ${get("siteUrl")}` : "",
        `Situation : ${situation}`,
      ]
        .filter(Boolean)
        .join("\n"),
      website: get("website") || undefined, // piège anti-robots (champ caché)
      ...getUtm(),
      utm_campaign: getUtm().utm_campaign ?? `pilote-${pilot.tag}`,
      landing_page: `/pilotes/${pilot.slug}`,
    };

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const err = await response.json().catch(() => null);
        setStatus("error");
        setMessage(err?.error ?? "Impossible d'envoyer la demande. Écrivez-nous à kahdigital42@gmail.com.");
        return;
      }
      setStatus("success");
      trackEvent("generate_lead", { form_name: `pilote_${pilot.tag}`, destination: `pilotes_${pilot.tag}` });
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Impossible d'envoyer la demande. Écrivez-nous à kahdigital42@gmail.com.");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-3xl border border-[#d6b36a]/40 bg-[#d6b36a]/[0.08] p-8 text-center">
        <p className="text-2xl font-bold text-white">Demande reçue, merci.</p>
        <p className="mt-3 text-white/75">
          Nous revenons vers vous sous {PILOT_DELIVERY.scoping} ouvrées avec une proposition de cadrage, le périmètre de la V1 et le prix fixe, avant tout engagement de votre part.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-white/12 bg-white/[0.04] p-6 sm:p-8" noValidate={false}>
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" defaultValue="" />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="pilot-name" className="text-sm text-white/75">Nom complet *</label>
          <input id="pilot-name" name="name" required minLength={2} autoComplete="name" className={field} placeholder="Ex : Alex Martin" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="pilot-email" className="text-sm text-white/75">Email professionnel *</label>
          <input id="pilot-email" name="email" type="email" required autoComplete="email" className={field} placeholder="vous@entreprise.fr" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="pilot-company" className="text-sm text-white/75">Entreprise *</label>
          <input id="pilot-company" name="company" required minLength={2} autoComplete="organization" className={field} placeholder="Nom de votre entreprise" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="pilot-site" className="text-sm text-white/75">
            {pilot.fields.siteLabel}
            {pilot.fields.siteRequired ? " *" : ""}
          </label>
          <input
            id="pilot-site"
            name="siteUrl"
            type="url"
            required={pilot.fields.siteRequired}
            autoComplete="url"
            className={field}
            placeholder={pilot.fields.sitePlaceholder}
          />
        </div>
        <div className="flex flex-col gap-2 sm:col-span-2">
          <label htmlFor="pilot-situation" className="text-sm text-white/75">{pilot.situationLabel} *</label>
          <textarea id="pilot-situation" name="situation" required rows={4} className={field} placeholder={pilot.situationPlaceholder} />
        </div>
        <div className="flex flex-col gap-2 sm:col-span-2">
          <label htmlFor="pilot-phone" className="text-sm text-white/75">Téléphone (facultatif)</label>
          <input id="pilot-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" className={field} placeholder="Pour un échange rapide si vous préférez" />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#d6b36a] px-7 py-3.5 font-bold text-[#11131b] transition hover:bg-[#f0d99b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f0d99b] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "loading" ? "Envoi en cours…" : "Rejoindre le pilote"}
      </button>
      <p className="mt-4 text-xs leading-relaxed text-white/60">
        Nous n'utilisons ces informations que pour répondre à votre demande de pilote. Aucun engagement : le prix fixe vous est communiqué avant toute décision. Voir la{" "}
        <Link href="/confidentialite" className="underline underline-offset-2 hover:text-white">politique de confidentialité</Link>.
      </p>
      {message && (
        <p role="status" className="mt-4 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          {message}
        </p>
      )}
    </form>
  );
}
