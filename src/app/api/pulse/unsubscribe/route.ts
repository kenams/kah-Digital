import { NextRequest, NextResponse } from "next/server";
import { verifyAppointmentSignature } from "@/lib/pulse/messaging";
import { db, isPulseConfigured } from "@/lib/pulse/store";

export const dynamic = "force-dynamic";

function page(title: string, body: string, status = 200) {
  return new NextResponse(
    `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${title}</title></head><body style="font-family:Arial,sans-serif;max-width:480px;margin:15vh auto;padding:0 20px;color:#111827"><h1 style="font-size:22px">${title}</h1><p style="line-height:1.6">${body}</p></body></html>`,
    { status, headers: { "Content-Type": "text/html; charset=utf-8" } },
  );
}

/** Lien « Ne plus recevoir de messages » des e-mails de rappel : retire le consentement de ce rendez-vous. */
export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("a") ?? "";
  const sig = request.nextUrl.searchParams.get("s") ?? "";
  if (!isPulseConfigured() || !/^[0-9a-f-]{36}$/.test(id) || !verifyAppointmentSignature(id, sig)) {
    return page("Lien invalide", "Ce lien n'est pas valide ou a expiré.", 400);
  }
  await db().from("pulse_appointments").update({ consent: false }).eq("id", id);
  return page("C'est noté", "Vous ne recevrez plus de rappels ni de demandes d'avis pour ce rendez-vous.");
}
