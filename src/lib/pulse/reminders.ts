import { getSiteUrl } from "@/lib/email-template";
import {
  emailConfigured, sendEmail, sendSms, signAppointment, smsConfigured, toE164,
} from "@/lib/pulse/messaging";
import { formatLocal } from "@/lib/pulse/service";
import { DEFAULT_REMINDERS, db, type PulseAppointment, type PulseSite } from "@/lib/pulse/store";

const HOUR = 3600_000;

export type DueItem =
  | { kind: `h${number}`; appointment: PulseAppointment }
  | { kind: "review"; appointment: PulseAppointment };

/** Calcule les envois dus à l'instant `now` pour un site (fonction pure, testable). */
export function computeDue(site: PulseSite, appointments: PulseAppointment[], now: Date): DueItem[] {
  const settings = { ...DEFAULT_REMINDERS, ...site.reminder_settings };
  if (!settings.enabled) return [];
  const due: DueItem[] = [];

  for (const a of appointments) {
    if (a.status === "cancelled" || !a.consent) continue;
    const start = new Date(a.starts_at).getTime();
    const created = new Date(a.created_at).getTime();
    const sent = new Set(a.reminders_sent.map((r) => r.kind));

    for (const h of settings.hoursBefore) {
      const kind = `h${h}` as const;
      const windowStart = start - h * HOUR;
      // Rappel dû dans la fenêtre [start-h, start), seulement si le RDV a été pris avant cette fenêtre.
      if (now.getTime() >= windowStart && now.getTime() < start && created <= windowStart && !sent.has(kind)) {
        due.push({ kind, appointment: a });
      }
    }

    if (
      site.google_review_url &&
      !a.review_requested_at &&
      now.getTime() >= start + settings.reviewDelayHours * HOUR &&
      now.getTime() < start + 48 * HOUR
    ) {
      due.push({ kind: "review", appointment: a });
    }
  }
  return due;
}

function reminderText(site: PulseSite, item: DueItem) {
  const a = item.appointment;
  const when = formatLocal(a.starts_at, site.timezone);
  const phone = site.content.contact?.phone;
  const first = a.customer_name.split(" ")[0] ?? "";
  if (item.kind === "review") {
    return {
      subject: `Votre avis sur ${site.client_name}`,
      text: `Bonjour ${first},\n\nMerci de votre visite chez ${site.client_name}. Si vous avez 30 secondes, votre avis nous aide beaucoup :\n${site.google_review_url}\n\nÀ bientôt !`,
      sms: `${site.client_name} : merci de votre visite ! Un avis en 30 s nous aide beaucoup : ${site.google_review_url}`,
    };
  }
  const detail = a.service ? ` (${a.service})` : "";
  const contact = phone ? ` Pour déplacer ou annuler, appelez le ${phone}.` : " Pour déplacer ou annuler, répondez à ce message.";
  return {
    subject: `Rappel : rendez-vous ${when} chez ${site.client_name}`,
    text: `Bonjour ${first},\n\nPetit rappel : vous avez rendez-vous chez ${site.client_name}${detail} le ${when}.${contact}\n\nÀ bientôt !`,
    sms: `${site.client_name} : rappel de votre RDV ${when}${detail}.${phone ? ` Pour modifier : ${phone}.` : ""}`,
  };
}

export type RunSummary = { sites: number; due: number; sent: number; skipped: number; errors: number };

/** Envoie tous les rappels et demandes d'avis dus. À appeler toutes les ~30 min. */
export async function runReminders(now: Date = new Date()): Promise<RunSummary> {
  const summary: RunSummary = { sites: 0, due: 0, sent: 0, skipped: 0, errors: 0 };

  const { data: sites } = await db().from("pulse_sites").select("*").eq("active", true);
  for (const site of (sites as PulseSite[] | null) ?? []) {
    if (!site.reminder_settings?.enabled) continue;
    summary.sites += 1;

    const from = new Date(now.getTime() - 50 * HOUR).toISOString();
    const to = new Date(now.getTime() + 49 * HOUR).toISOString();
    const { data: rows } = await db()
      .from("pulse_appointments")
      .select("*")
      .eq("site_id", site.id)
      .neq("status", "cancelled")
      .gte("starts_at", from)
      .lte("starts_at", to);
    const due = computeDue(site, (rows as PulseAppointment[] | null) ?? [], now);
    summary.due += due.length;

    for (const item of due) {
      const a = item.appointment;
      const channels: string[] = [];
      const text = reminderText(site, item);
      const wantsEmail = site.reminder_settings.channels.includes("email") && a.customer_email && emailConfigured();
      const wantsSms = site.reminder_settings.channels.includes("sms") && a.customer_phone && smsConfigured();

      if (!wantsEmail && !wantsSms) {
        summary.skipped += 1;
        continue;
      }

      // « Au plus une fois » : on marque avant d'envoyer pour ne jamais doubler un message.
      const mark = { kind: item.kind, at: now.toISOString(), channels: [] as string[] };
      if (item.kind === "review") {
        await db().from("pulse_appointments").update({ review_requested_at: now.toISOString(), status: "done" }).eq("id", a.id);
      } else {
        await db().from("pulse_appointments").update({ reminders_sent: [...a.reminders_sent, mark] }).eq("id", a.id);
      }

      try {
        if (wantsEmail) {
          const unsub = `${getSiteUrl()}/api/pulse/unsubscribe?a=${a.id}&s=${signAppointment(a.id)}`;
          await sendEmail({
            to: a.customer_email!,
            fromName: site.client_name,
            replyTo: site.owner_email,
            subject: text.subject,
            text: text.text,
            footer: `Message envoyé pour le compte de ${site.client_name}. <a href="${unsub}">Ne plus recevoir de messages</a>`,
          });
          channels.push("email");
        }
        if (wantsSms) {
          await sendSms(toE164(a.customer_phone!), text.sms);
          channels.push("sms");
        }
        summary.sent += 1;
      } catch (error) {
        console.error("[pulse] reminder failed", item.kind, a.id, error);
        summary.errors += 1;
      }
    }
  }
  return summary;
}
