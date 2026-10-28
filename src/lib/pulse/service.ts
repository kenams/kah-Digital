import { runPulseAgent, type AgentAppointment } from "@/lib/pulse/agent";
import { applyOps, publicView, type PulseContent } from "@/lib/pulse/content";
import { sendTelegramAlert } from "@/lib/notify";
import { db, logUpdate, saveContent, type PulseAppointment, type PulseSite } from "@/lib/pulse/store";

/** Convertit « AAAA-MM-JJTHH:mm » (heure locale d'un fuseau IANA) en ISO UTC. */
export function zonedToUtcIso(local: string, timeZone: string): string | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(local);
  if (!m) return null;
  const [y, mo, d, h, mi] = m.slice(1).map(Number) as [number, number, number, number, number];
  const guess = Date.UTC(y, mo - 1, d, h, mi);
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit",
  });
  const parts = Object.fromEntries(fmt.formatToParts(new Date(guess)).map((p) => [p.type, p.value]));
  const asLocal = Date.UTC(Number(parts.year), Number(parts.month) - 1, Number(parts.day), Number(parts.hour), Number(parts.minute));
  const offset = asLocal - guess;
  const utc = new Date(guess - offset);
  return Number.isNaN(utc.getTime()) ? null : utc.toISOString();
}

export function formatLocal(iso: string, timeZone: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    timeZone, weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit",
  }).format(new Date(iso));
}

export type MessageOutcome = {
  reply: string;
  status: "applied" | "needs_clarification" | "rejected" | "error";
  content: PulseContent;
  changed: boolean;
  appointmentsCreated: number;
  appointmentsCancelled: number;
};

async function createAppointments(site: PulseSite, list: AgentAppointment[]) {
  let created = 0;
  const notes: string[] = [];
  for (const a of list) {
    const iso = zonedToUtcIso(a.local_start, site.timezone);
    if (!iso || new Date(iso).getTime() < Date.now() - 60 * 60 * 1000) {
      notes.push(`Le rendez-vous de ${a.customer_name} est dans le passé, il n'a pas été créé.`);
      continue;
    }
    const { error } = await db().from("pulse_appointments").insert({
      site_id: site.id,
      customer_name: a.customer_name,
      customer_phone: a.customer_phone ?? null,
      customer_email: a.customer_email ?? null,
      service: a.service ?? null,
      starts_at: iso,
      consent: a.consent,
      source: "message",
    });
    if (error) notes.push(`Impossible d'enregistrer le rendez-vous de ${a.customer_name}.`);
    else created += 1;
  }
  return { created, notes };
}

async function cancelAppointments(site: PulseSite, list: Array<{ customer_name: string; date?: string }>) {
  let cancelled = 0;
  const notes: string[] = [];
  for (const c of list) {
    const { data } = await db()
      .from("pulse_appointments")
      .select("*")
      .eq("site_id", site.id)
      .eq("status", "scheduled")
      .ilike("customer_name", `%${c.customer_name.replace(/[%_]/g, "")}%`)
      .gte("starts_at", new Date().toISOString())
      .order("starts_at", { ascending: true })
      .limit(10);
    let matches = (data as PulseAppointment[] | null) ?? [];
    if (c.date) {
      matches = matches.filter((m) => new Intl.DateTimeFormat("en-CA", { timeZone: site.timezone }).format(new Date(m.starts_at)) === c.date);
    }
    if (matches.length === 0) {
      notes.push(`Aucun rendez-vous à venir trouvé pour « ${c.customer_name} ».`);
    } else if (matches.length > 1) {
      notes.push(`Plusieurs rendez-vous pour « ${c.customer_name} » : précisez la date (${matches.map((m) => formatLocal(m.starts_at, site.timezone)).join(" ou ")}).`);
    } else {
      await db().from("pulse_appointments").update({ status: "cancelled" }).eq("id", matches[0]!.id);
      cancelled += 1;
    }
  }
  return { cancelled, notes };
}

/** Traite un message du commerçant : comprend, applique, journalise. Jamais d'exception vers l'appelant. */
export async function handlePulseMessage(
  site: PulseSite,
  message: string,
  source: "web" | "whatsapp" | "demo",
): Promise<MessageOutcome> {
  const text = message.trim().slice(0, 1200);
  const base = { content: publicView(site.content, site.timezone), changed: false, appointmentsCreated: 0, appointmentsCancelled: 0 };

  if (!text) return { ...base, reply: "Je n'ai rien reçu. Écrivez-moi ce que vous voulez changer.", status: "rejected" };

  try {
    const result = await runPulseAgent({ clientName: site.client_name, content: site.content, timeZone: site.timezone, message: text });
    const hasWork = result.ops.length > 0 || result.appointments.length > 0 || result.cancel.length > 0;

    if (result.needsClarification || !hasWork) {
      await logUpdate({ siteId: site.id, source, message: text, ops: null, reply: result.reply, status: "needs_clarification" });
      return { ...base, reply: result.reply, status: "needs_clarification" };
    }

    let content = site.content;
    if (result.ops.length) {
      content = applyOps(site.content, result.ops);
      await saveContent(site.id, content);
    }
    const appts = result.appointments.length ? await createAppointments(site, result.appointments) : { created: 0, notes: [] as string[] };
    const cancels = result.cancel.length ? await cancelAppointments(site, result.cancel) : { cancelled: 0, notes: [] as string[] };

    const notes = [...appts.notes, ...cancels.notes];
    const reply = [result.reply, ...notes].join(" ");
    await logUpdate({ siteId: site.id, source, message: text, ops: result.ops, reply, status: "applied" });

    return {
      reply,
      status: "applied",
      content: publicView(content, site.timezone),
      changed: result.ops.length > 0,
      appointmentsCreated: appts.created,
      appointmentsCancelled: cancels.cancelled,
    };
  } catch (error) {
    console.error("[pulse] message failed", error);
    const reply = "Le service est momentanément indisponible. Votre message est bien reçu et sera appliqué à la main par KAH Digital Studio dans l'heure.";
    await logUpdate({ siteId: site.id, source, message: text, ops: null, reply, status: "error" }).catch(() => {});
    // Aucun message client ne doit se perdre : on prévient Kenams pour qu'il l'applique à la main.
    if (source !== "demo") {
      const esc = (v: string) => v.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
      await sendTelegramAlert(`⚠️ <b>PULSE — message client NON traité (IA indisponible)</b>
Site : ${esc(site.client_name)} (${esc(site.site_key)})
Canal : ${source}
« ${esc(text.slice(0, 400))} »`).catch(() => {});
    }
    return { ...base, reply, status: "error" };
  }
}
