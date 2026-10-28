import { NextRequest, NextResponse } from "next/server";
import { cleanText, describeContent, publicView } from "@/lib/pulse/content";
import { emailConfigured, smsConfigured } from "@/lib/pulse/messaging";
import {
  DEFAULT_REMINDERS, db, getSiteByToken, isPulseConfigured, listAppointments, recentUpdates, type ReminderSettings,
} from "@/lib/pulse/store";

export const dynamic = "force-dynamic";

async function authed(request: NextRequest) {
  if (!isPulseConfigured()) return null;
  return getSiteByToken(request.headers.get("x-pulse-token") ?? "");
}

/** Données de « Mon espace » : contenu, derniers messages, rendez-vous, réglages. */
export async function GET(request: NextRequest) {
  const site = await authed(request);
  if (!site) return NextResponse.json({ error: "Accès refusé." }, { status: 401 });

  const since = new Date(Date.now() - 24 * 3600_000).toISOString();
  const [updates, appointments] = await Promise.all([recentUpdates(site.id), listAppointments(site.id, since)]);

  return NextResponse.json({
    name: site.client_name,
    plan: site.plan,
    siteKey: site.site_key,
    content: publicView(site.content, site.timezone),
    summary: describeContent(publicView(site.content, site.timezone)),
    googleReviewUrl: site.google_review_url,
    reminders: { ...DEFAULT_REMINDERS, ...site.reminder_settings },
    channelsAvailable: { email: emailConfigured(), sms: smsConfigured() },
    updates,
    appointments: appointments.map((a) => ({
      id: a.id, customer_name: a.customer_name, customer_email: a.customer_email, customer_phone: a.customer_phone,
      service: a.service, starts_at: a.starts_at, status: a.status, consent: a.consent,
      reminders: a.reminders_sent.map((r) => r.kind), reviewRequested: Boolean(a.review_requested_at),
    })),
  });
}

/** Réglages : lien d'avis Google, rappels. */
export async function PATCH(request: NextRequest) {
  const site = await authed(request);
  if (!site) return NextResponse.json({ error: "Accès refusé." }, { status: 401 });

  const body = (await request.json().catch(() => ({}))) as {
    googleReviewUrl?: unknown;
    reminders?: { enabled?: unknown; channels?: unknown; hoursBefore?: unknown; reviewDelayHours?: unknown };
  };

  const patch: Record<string, unknown> = { updated_at: new Date().toISOString() };

  if (typeof body.googleReviewUrl === "string") {
    const url = cleanText(body.googleReviewUrl, 300);
    if (url && !/^https:\/\/[^\s]+$/.test(url)) return NextResponse.json({ error: "Le lien d'avis doit commencer par https://" }, { status: 400 });
    patch.google_review_url = url || null;
  }

  if (body.reminders) {
    const current: ReminderSettings = { ...DEFAULT_REMINDERS, ...site.reminder_settings };
    const r = body.reminders;
    const channels = Array.isArray(r.channels)
      ? (r.channels.filter((c): c is "email" | "sms" => c === "email" || c === "sms") as Array<"email" | "sms">)
      : current.channels;
    const hours = Array.isArray(r.hoursBefore)
      ? r.hoursBefore.map(Number).filter((h) => Number.isFinite(h) && h >= 1 && h <= 72).slice(0, 3)
      : current.hoursBefore;
    const delay = Number(r.reviewDelayHours);
    patch.reminder_settings = {
      enabled: typeof r.enabled === "boolean" ? r.enabled : current.enabled,
      channels: channels.length ? channels : ["email"],
      hoursBefore: hours.length ? hours : current.hoursBefore,
      reviewDelayHours: Number.isFinite(delay) && delay >= 1 && delay <= 24 ? delay : current.reviewDelayHours,
    } satisfies ReminderSettings;
  }

  const { error } = await db().from("pulse_sites").update(patch).eq("id", site.id);
  if (error) return NextResponse.json({ error: "Enregistrement impossible." }, { status: 500 });
  return NextResponse.json({ ok: true });
}
