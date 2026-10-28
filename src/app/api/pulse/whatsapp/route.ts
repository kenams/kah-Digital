import { createHmac, timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { handlePulseMessage } from "@/lib/pulse/service";
import { getSiteByWhatsApp, isPulseConfigured } from "@/lib/pulse/store";
import { sendWhatsAppText, whatsappConfigured } from "@/lib/pulse/messaging";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/** Vérification du webhook par Meta (abonnement). */
export function GET(request: NextRequest) {
  const p = request.nextUrl.searchParams;
  const expected = process.env.PULSE_WA_VERIFY_TOKEN;
  if (expected && p.get("hub.mode") === "subscribe" && p.get("hub.verify_token") === expected) {
    return new NextResponse(p.get("hub.challenge") ?? "", { status: 200 });
  }
  return new NextResponse("forbidden", { status: 403 });
}

function validSignature(raw: string, header: string | null) {
  const secret = process.env.PULSE_WA_APP_SECRET;
  if (!secret) return false; // sans secret d'application, on refuse tout : pas de webhook non signé.
  if (!header?.startsWith("sha256=")) return false;
  const expected = Buffer.from(createHmac("sha256", secret).update(raw).digest("hex"));
  const given = Buffer.from(header.slice(7));
  return expected.length === given.length && timingSafeEqual(expected, given);
}

type WaPayload = {
  entry?: Array<{ changes?: Array<{ value?: { messages?: Array<{ from?: string; type?: string; text?: { body?: string }; id?: string }> } }> }>;
};

/** Messages WhatsApp entrants (Meta Cloud API). Seuls les numéros enregistrés pour un site sont servis. */
export async function POST(request: NextRequest) {
  const raw = await request.text();
  if (!validSignature(raw, request.headers.get("x-hub-signature-256"))) {
    return new NextResponse("invalid signature", { status: 401 });
  }
  if (!isPulseConfigured()) return NextResponse.json({ ok: true });

  let payload: WaPayload = {};
  try {
    payload = JSON.parse(raw) as WaPayload;
  } catch {
    return NextResponse.json({ ok: true });
  }

  const messages = (payload.entry ?? []).flatMap((e) => (e.changes ?? []).flatMap((c) => c.value?.messages ?? []));
  for (const m of messages) {
    const from = (m.from ?? "").replace(/\D/g, "");
    if (!from) continue;
    const site = await getSiteByWhatsApp(from);
    if (!site) continue; // numéro inconnu : on ne répond pas

    const reply =
      m.type === "text" && m.text?.body
        ? (await handlePulseMessage(site, m.text.body, "whatsapp")).reply
        : "Je ne comprends pour l'instant que les messages texte. Écrivez-moi ce que vous voulez changer sur votre site.";

    if (whatsappConfigured()) await sendWhatsAppText(from, reply).catch((e) => console.error("[pulse] wa reply failed", e));
  }
  return NextResponse.json({ ok: true });
}
