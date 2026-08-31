import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return new NextResponse("ID manquant", { status: 400 });

  try {
    await getSupabase()
      .from("prospects")
      .update({ status: "rejected" })
      .eq("id", id);
  } catch { /* ignore — on affiche quand même la page de confirmation */ }

  return new NextResponse(
    `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Désinscription — KAH Digital</title>
</head>
<body style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;background:#f4f6f9;display:flex;align-items:center;justify-content:center;min-height:100vh;">
  <div style="background:#fff;border-radius:16px;padding:48px 40px;max-width:420px;width:90%;text-align:center;box-shadow:0 8px 40px rgba(0,0,0,0.10);">
    <div style="font-size:52px;margin-bottom:20px;">✅</div>
    <h2 style="margin:0 0 12px;color:#111827;font-size:22px;">Désinscription enregistrée</h2>
    <p style="color:#6b7280;margin:0 0 24px;line-height:1.6;">Vous ne recevrez plus de messages de notre part. Si c'était une erreur ou si vous souhaitez reprendre contact, écrivez-nous.</p>
    <a href="mailto:contact@kah-digital.ch" style="display:inline-block;background:linear-gradient(135deg,#1e3a8a,#7c3aed);color:#fff;text-decoration:none;padding:12px 28px;border-radius:9999px;font-weight:600;font-size:14px;">Nous contacter</a>
    <p style="margin:20px 0 0;font-size:12px;color:#9ca3af;"><a href="https://kah-digital.ch" style="color:#9ca3af;">kah-digital.ch</a></p>
  </div>
</body>
</html>`,
    { headers: { "Content-Type": "text/html; charset=utf-8" } },
  );
}
