import { NextResponse } from "next/server";
import { isValidEmail } from "@/lib/html-escape";
import { createPilotAuth } from "@/lib/pilot-auth";
import { sendPilotLoginLink } from "@/lib/pilot-mail";
import { getRequestIp, rateLimit } from "@/lib/rate-limit";
import { findAccount } from "@/lib/relancecash/store";

const auth = createPilotAuth("relancecash");

export async function POST(request: Request) {
  const ip = getRequestIp(request);
  if (!rateLimit(`rc-login:${ip}`, { windowMs: 10 * 60 * 1000, max: 8 }).allowed) {
    return NextResponse.json({ ok: false, error: "Trop de tentatives, réessayez dans quelques minutes." }, { status: 429 });
  }
  const body = await request.json().catch(() => ({}));
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!isValidEmail(email)) return NextResponse.json({ ok: false, error: "Adresse email invalide." }, { status: 400 });
  if (!rateLimit(`rc-login-mail:${email}`, { windowMs: 10 * 60 * 1000, max: 3 }).allowed) return NextResponse.json({ ok: true });
  try {
    // Réponse identique que le compte existe ou non : pas d'énumération des partenaires.
    if (await findAccount(email)) await sendPilotLoginLink({ product: "relancecash", label: "RelanceCash", to: email, token: auth.makeLoginToken(email) });
  } catch (error) {
    console.error("relancecash login", error instanceof Error ? error.message : error);
    return NextResponse.json({ ok: false, error: "Envoi impossible pour le moment." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
