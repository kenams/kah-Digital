import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendAdminNotification } from "@/lib/gmail";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { searchParams } = new URL(req.url);
  const target = searchParams.get("target") ?? "reply";
  const redirect = searchParams.get("redirect");

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kah-digital-site.vercel.app";

  try {
    const supabase = getSupabase();

    const { data: prospect } = await supabase
      .from("prospects")
      .select("id, businessName, website, email, clickedAt")
      .eq("id", id)
      .single();

    if (prospect && !prospect.clickedAt) {
      await supabase
        .from("prospects")
        .update({
          clickedAt: new Date().toISOString(),
          status: "replied", // Un clic = intérêt fort
        })
        .eq("id", id);

      // Notification admin immédiate
      void sendAdminNotification({
        subject: `🔥 CLIC PROSPECT — ${prospect.businessName ?? prospect.website}`,
        body: `<strong style="color:#dc2626;">ACTION REQUISE !</strong><br/><br/>
               <strong>${prospect.businessName ?? prospect.website}</strong> a cliqué sur ton email !<br/><br/>
               Cible : <strong>${target === "reply" ? "Répondre à l'email" : "Demande de devis"}</strong><br/>
               Site : ${prospect.website}<br/>
               Email : ${prospect.email ?? "inconnu"}<br/>
               Date : ${new Date().toLocaleString("fr-FR")}<br/><br/>
               <strong>Contacte-le dans les prochaines heures !</strong>`,
      }).catch(console.error);
    }
  } catch (err) {
    console.error("[tracking:click]", err);
  }

  // Redirect vers la bonne destination
  const destination = redirect
    ? decodeURIComponent(redirect)
    : target === "quote"
      ? `${siteUrl}/devis`
      : `mailto:kahdigital42@gmail.com?subject=Re: Analyse de mon site web`;

  return NextResponse.redirect(destination);
}
