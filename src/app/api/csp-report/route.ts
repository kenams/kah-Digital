import { NextResponse } from "next/server";
import { clip } from "@/lib/html-escape";
import { getRequestIp, rateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

// Réception des rapports de la politique de sécurité (mode « rapport seul »).
// Rien n'est stocké : on journalise quelques champs bornés pour repérer ce qu'il faudrait autoriser
// avant de passer la politique en mode bloquant. Limité par IP, corps plafonné.
export async function POST(request: Request) {
  const rate = rateLimit(`csp-report:${getRequestIp(request)}`, { windowMs: 60 * 1000, max: 30 });
  if (!rate.allowed) return new NextResponse(null, { status: 429 });

  const text = await request.text().catch(() => "");
  if (text.length > 8000) return new NextResponse(null, { status: 413 });

  try {
    const parsed = JSON.parse(text) as unknown;
    const first = Array.isArray(parsed) ? parsed[0] : parsed;
    const body = (first as { "csp-report"?: Record<string, unknown>; body?: Record<string, unknown> } | undefined) ?? {};
    const r = (body["csp-report"] ?? body.body ?? {}) as Record<string, unknown>;
    console.warn("[csp-report]", {
      directive: clip(r["violated-directive"] ?? r["effectiveDirective"], 80),
      blocked: clip(r["blocked-uri"] ?? r["blockedURL"], 160),
      page: clip(r["document-uri"] ?? r["documentURL"], 160),
    });
  } catch {
    /* rapport illisible : ignoré */
  }
  return new NextResponse(null, { status: 204 });
}
