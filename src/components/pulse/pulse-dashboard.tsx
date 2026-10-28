"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { FiBell, FiCalendar, FiCheck, FiClock, FiMessageCircle, FiSend, FiSettings, FiStar, FiX } from "react-icons/fi";

type Appointment = {
  id: string; customer_name: string; customer_email: string | null; customer_phone: string | null;
  service: string | null; starts_at: string; status: string; consent: boolean; reminders: string[]; reviewRequested: boolean;
};

type EspaceData = {
  name: string;
  plan: string;
  siteKey: string;
  summary: string[];
  googleReviewUrl: string | null;
  reminders: { enabled: boolean; channels: Array<"email" | "sms">; hoursBefore: number[]; reviewDelayHours: number };
  channelsAvailable: { email: boolean; sms: boolean };
  updates: Array<{ id: string; message: string; reply: string; status: string; created_at: string }>;
  appointments: Appointment[];
};

type ChatLine = { id: string; from: "user" | "bot"; text: string };

const EXAMPLES = [
  "Fermé lundi prochain",
  "Plat du jour : poulet yassa et riz, 12 €",
  "Promo -20 % ce week-end",
  "RDV Mme Diallo mardi 14h coupe, avec rappel",
];

const field =
  "w-full rounded-xl border border-white/12 bg-black/30 px-3.5 py-2.5 text-sm text-white outline-none transition placeholder:text-white/30 hover:border-white/20 focus:border-[#d6b36a]/70 focus:ring-2 focus:ring-[#d6b36a]/20";

function fmt(iso: string) {
  return new Date(iso).toLocaleString("fr-FR", { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
}

export function PulseDashboard({ token }: { token: string }) {
  const [data, setData] = useState<EspaceData | null>(null);
  const [error, setError] = useState("");
  const [chat, setChat] = useState<ChatLine[]>([]);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const bottom = useRef<HTMLDivElement>(null);

  const headers = { "Content-Type": "application/json", "x-pulse-token": token };

  const load = useCallback(async () => {
    const res = await fetch("/api/pulse/espace", { headers: { "x-pulse-token": token }, cache: "no-store" });
    if (!res.ok) {
      setError("Ce lien n'est plus valide. Demandez-en un nouveau à KAH Digital Studio.");
      return;
    }
    setData((await res.json()) as EspaceData);
  }, [token]);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [chat]);

  async function send(text: string) {
    const value = text.trim();
    if (!value || sending) return;
    setSending(true);
    setMessage("");
    setChat((c) => [...c, { id: `u${Date.now()}`, from: "user", text: value }]);
    try {
      const res = await fetch("/api/pulse/message", { method: "POST", headers, body: JSON.stringify({ message: value }) });
      const out = (await res.json()) as { reply?: string; error?: string };
      setChat((c) => [...c, { id: `b${Date.now()}`, from: "bot", text: out.reply || out.error || "Une erreur est survenue." }]);
      await load();
    } catch {
      setChat((c) => [...c, { id: `b${Date.now()}`, from: "bot", text: "Connexion impossible. Réessayez." }]);
    } finally {
      setSending(false);
    }
  }

  if (error) {
    return <p className="mx-auto mt-24 max-w-md rounded-2xl border border-rose-400/25 bg-rose-500/10 p-4 text-center text-rose-100">{error}</p>;
  }
  if (!data) return <p className="mt-24 text-center text-white/50">Chargement…</p>;

  const isPro = data.plan === "pro";

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d6b36a]">Mon espace · KAH Pulse</p>
          <h1 className="mt-1 text-3xl font-bold">{data.name}</h1>
        </div>
        <span className="rounded-full border border-[#d6b36a]/40 bg-[#d6b36a]/10 px-3 py-1 text-xs font-semibold text-[#f0d99b]">
          Formule {isPro ? "Pro" : "Confort"}
        </span>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Chat */}
        <section className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.05] p-5" aria-label="Mettre à jour mon site">
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <FiMessageCircle aria-hidden="true" className="text-[#d6b36a]" /> Écrivez ce que vous voulez changer
          </h2>
          <p className="mt-1 text-sm text-white/55">Horaires, fermeture, promo, plat du jour, rendez-vous… c&apos;est pris en compte en quelques secondes.</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {EXAMPLES.map((e) => (
              <button
                key={e}
                type="button"
                onClick={() => send(e)}
                disabled={sending}
                className="rounded-full border border-white/12 bg-black/25 px-3 py-1.5 text-xs text-white/75 transition hover:border-[#d6b36a]/50 hover:text-white disabled:opacity-50"
              >
                {e}
              </button>
            ))}
          </div>

          <div className="mt-4 min-h-[180px] flex-1 space-y-3 overflow-y-auto rounded-2xl bg-black/25 p-4" role="log" aria-live="polite">
            {chat.length === 0 ? <p className="text-sm text-white/40">Vos échanges apparaîtront ici.</p> : null}
            {chat.map((l) => (
              <div key={l.id} className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${l.from === "user" ? "ml-auto bg-[#d6b36a] text-[#11131b]" : "bg-white/10 text-white"}`}>
                {l.text}
              </div>
            ))}
            {sending ? <div className="w-16 rounded-2xl bg-white/10 px-3.5 py-2.5 text-sm text-white/60">…</div> : null}
            <div ref={bottom} />
          </div>

          <form
            onSubmit={(e: FormEvent) => {
              e.preventDefault();
              void send(message);
            }}
            className="mt-3 flex gap-2"
          >
            <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Ex. : fermé du 24 au 26 décembre" maxLength={1000} className={field} aria-label="Votre message" />
            <button type="submit" disabled={sending || !message.trim()} className="inline-flex items-center gap-2 rounded-xl bg-[#d6b36a] px-4 text-sm font-bold text-[#11131b] transition hover:bg-[#f0d99b] disabled:opacity-50">
              <FiSend aria-hidden="true" /> Envoyer
            </button>
          </form>
        </section>

        {/* Ce que voit le site */}
        <section className="rounded-3xl border border-white/10 bg-white/[0.05] p-5" aria-label="Affiché sur mon site">
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <FiCheck aria-hidden="true" className="text-emerald-300" /> Affiché sur votre site
          </h2>
          {data.summary.length ? (
            <ul className="mt-3 space-y-2 text-sm text-white/80">
              {data.summary.map((s) => (
                <li key={s} className="rounded-xl bg-black/25 px-3 py-2">{s}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-white/45">Rien pour l&apos;instant. Envoyez un message pour afficher une annonce, vos horaires ou une promo.</p>
          )}
          {data.updates.length ? (
            <>
              <h3 className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-white/40">Dernières demandes</h3>
              <ul className="mt-2 space-y-2 text-xs text-white/60">
                {data.updates.slice(0, 4).map((u) => (
                  <li key={u.id} className="rounded-lg border border-white/8 px-3 py-2">
                    <span className="text-white/80">« {u.message} »</span>
                    <span className="mt-0.5 block text-white/40">{fmt(u.created_at)}{u.status === "applied" ? " · appliqué" : ""}</span>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </section>
      </div>

      <Agenda token={token} data={data} reload={load} />
      <Settings token={token} data={data} reload={load} />
    </div>
  );
}

function Agenda({ token, data, reload }: { token: string; data: EspaceData; reload: () => Promise<void> }) {
  const [form, setForm] = useState({ customer_name: "", customer_phone: "", customer_email: "", service: "", date: "", time: "", consent: false });
  const [msg, setMsg] = useState("");
  const [saving, setSaving] = useState(false);
  const upcoming = data.appointments.filter((a) => a.status !== "cancelled");

  async function add(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMsg("");
    const res = await fetch("/api/pulse/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-pulse-token": token },
      body: JSON.stringify({ ...form, local_start: `${form.date}T${form.time}`, source: "espace" }),
    });
    const out = (await res.json()) as { error?: string };
    setSaving(false);
    if (!res.ok) return setMsg(out.error || "Enregistrement impossible.");
    setForm({ customer_name: "", customer_phone: "", customer_email: "", service: "", date: "", time: "", consent: false });
    setMsg("Rendez-vous ajouté.");
    await reload();
  }

  async function cancel(id: string) {
    await fetch("/api/pulse/appointments", { method: "DELETE", headers: { "Content-Type": "application/json", "x-pulse-token": token }, body: JSON.stringify({ id }) });
    await reload();
  }

  return (
    <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.05] p-5" aria-label="Agenda">
      <h2 className="flex items-center gap-2 text-lg font-bold">
        <FiCalendar aria-hidden="true" className="text-[#d6b36a]" /> Rendez-vous à venir
      </h2>
      <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <ul className="space-y-2">
          {upcoming.length === 0 ? <li className="text-sm text-white/45">Aucun rendez-vous. Ajoutez-en un, ou écrivez-le dans le message (« RDV Mme Martin mardi 14h »).</li> : null}
          {upcoming.map((a) => (
            <li key={a.id} className="flex items-start justify-between gap-3 rounded-xl bg-black/25 px-3.5 py-3 text-sm">
              <div>
                <p className="font-semibold">{a.customer_name}{a.service ? ` · ${a.service}` : ""}</p>
                <p className="mt-0.5 flex items-center gap-1.5 text-xs text-white/55"><FiClock aria-hidden="true" size={11} /> {fmt(a.starts_at)}</p>
                <p className="mt-1.5 flex flex-wrap gap-1.5 text-[11px]">
                  {a.consent ? <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-emerald-200"><FiBell aria-hidden="true" className="mr-1 inline" size={10} />rappels activés</span> : <span className="rounded-full bg-white/10 px-2 py-0.5 text-white/50">sans rappel</span>}
                  {a.reminders.length ? <span className="rounded-full bg-white/10 px-2 py-0.5 text-white/60">{a.reminders.length} envoyé(s)</span> : null}
                  {a.reviewRequested ? <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-amber-200"><FiStar aria-hidden="true" className="mr-1 inline" size={10} />avis demandé</span> : null}
                </p>
              </div>
              <button type="button" onClick={() => cancel(a.id)} className="rounded-full p-1.5 text-white/40 transition hover:bg-rose-500/15 hover:text-rose-200" aria-label={`Annuler le rendez-vous de ${a.customer_name}`}>
                <FiX aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>

        <form onSubmit={add} className="space-y-3 rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-sm font-semibold">Ajouter un rendez-vous</p>
          <input required value={form.customer_name} onChange={(e) => setForm({ ...form, customer_name: e.target.value })} placeholder="Nom du client *" className={field} />
          <div className="grid grid-cols-2 gap-2">
            <input required type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className={field} aria-label="Date" />
            <input required type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className={field} aria-label="Heure" />
          </div>
          <input value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} placeholder="Prestation (facultatif)" className={field} />
          <div className="grid grid-cols-2 gap-2">
            <input type="email" value={form.customer_email} onChange={(e) => setForm({ ...form, customer_email: e.target.value })} placeholder="E-mail du client" className={field} />
            <input type="tel" value={form.customer_phone} onChange={(e) => setForm({ ...form, customer_phone: e.target.value })} placeholder="Téléphone" className={field} />
          </div>
          <label className="flex cursor-pointer items-start gap-2 text-xs text-white/65">
            <input type="checkbox" checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })} className="mt-0.5 accent-[#d6b36a]" />
            <span>Le client accepte de recevoir un rappel et une demande d&apos;avis. Sans son accord, rien ne lui est envoyé.</span>
          </label>
          {msg ? <p role="status" className="text-xs text-[#f0d99b]">{msg}</p> : null}
          <button type="submit" disabled={saving} className="w-full rounded-xl bg-[#d6b36a] py-2.5 text-sm font-bold text-[#11131b] transition hover:bg-[#f0d99b] disabled:opacity-50">
            {saving ? "Enregistrement…" : "Ajouter"}
          </button>
        </form>
      </div>
    </section>
  );
}

function Settings({ token, data, reload }: { token: string; data: EspaceData; reload: () => Promise<void> }) {
  const [enabled, setEnabled] = useState(data.reminders.enabled);
  const [channels, setChannels] = useState(data.reminders.channels);
  const [review, setReview] = useState(data.googleReviewUrl ?? "");
  const [msg, setMsg] = useState("");

  function toggle(c: "email" | "sms") {
    setChannels((cur) => (cur.includes(c) ? cur.filter((x) => x !== c) : [...cur, c]));
  }

  async function save() {
    setMsg("");
    const res = await fetch("/api/pulse/espace", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-pulse-token": token },
      body: JSON.stringify({ googleReviewUrl: review, reminders: { enabled, channels } }),
    });
    const out = (await res.json()) as { error?: string };
    setMsg(res.ok ? "Réglages enregistrés." : out.error || "Enregistrement impossible.");
    if (res.ok) await reload();
  }

  return (
    <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.05] p-5" aria-label="Réglages">
      <h2 className="flex items-center gap-2 text-lg font-bold">
        <FiSettings aria-hidden="true" className="text-[#d6b36a]" /> Rappels et avis Google
      </h2>
      <div className="mt-4 grid gap-5 sm:grid-cols-2">
        <div className="space-y-3 text-sm">
          <label className="flex cursor-pointer items-center gap-3">
            <input type="checkbox" checked={enabled} onChange={(e) => setEnabled(e.target.checked)} className="h-4 w-4 accent-[#d6b36a]" />
            <span>Envoyer les rappels ({data.reminders.hoursBefore.map((h) => `${h} h`).join(" et ")} avant) et la demande d&apos;avis ({data.reminders.reviewDelayHours} h après)</span>
          </label>
          <fieldset className="flex flex-wrap gap-4 pl-7 text-white/80">
            <legend className="sr-only">Canaux</legend>
            <label className={`flex items-center gap-2 ${data.channelsAvailable.email ? "" : "opacity-40"}`}>
              <input type="checkbox" disabled={!data.channelsAvailable.email} checked={channels.includes("email")} onChange={() => toggle("email")} className="accent-[#d6b36a]" /> E-mail
            </label>
            <label className={`flex items-center gap-2 ${data.channelsAvailable.sms ? "" : "opacity-40"}`} title={data.channelsAvailable.sms ? "" : "SMS pas encore activé sur votre compte"}>
              <input type="checkbox" disabled={!data.channelsAvailable.sms} checked={channels.includes("sms")} onChange={() => toggle("sms")} className="accent-[#d6b36a]" /> SMS
            </label>
          </fieldset>
        </div>
        <label className="grid gap-1.5 text-sm">
          <span className="font-semibold text-white/80">Lien pour laisser un avis Google</span>
          <input value={review} onChange={(e) => setReview(e.target.value)} placeholder="https://g.page/r/…/review" className={field} />
          <span className="text-xs text-white/40">Sans ce lien, aucune demande d&apos;avis n&apos;est envoyée.</span>
        </label>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <button type="button" onClick={save} className="rounded-xl bg-[#d6b36a] px-5 py-2.5 text-sm font-bold text-[#11131b] transition hover:bg-[#f0d99b]">Enregistrer</button>
        {msg ? <p role="status" className="text-sm text-[#f0d99b]">{msg}</p> : null}
      </div>
    </section>
  );
}
