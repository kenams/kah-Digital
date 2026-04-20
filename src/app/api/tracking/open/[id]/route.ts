import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendAdminNotification } from "@/lib/gmail";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// Pixel GIF 1x1 transparent
const PIXEL_GIF = Buffer.from(
  "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
  "base64"
);

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const supabase = getSupabase();

    // Récupère le prospect
    const { data: prospect } = await supabase
      .from("prospects")
      .select("id, businessName, website, email, openedAt")
      .eq("id", id)
      .single();

    // Première ouverture seulement
    if (prospect && !prospect.openedAt) {
      await supabase
        .from("prospects")
        .update({ openedAt: new Date().toISOString() })
        .eq("id", id);

      // Notification admin
      void sendAdminNotification({
        subject: `Email ouvert — ${prospect.businessName ?? prospect.website}`,
        body: `<strong>${prospect.businessName ?? prospect.website}</strong> a ouvert ton email de prospection !<br/><br/>
               Site : ${prospect.website}<br/>
               Email : ${prospect.email ?? "inconnu"}<br/>
               Date : ${new Date().toLocaleString("fr-FR")}`,
      }).catch(console.error);
    }
  } catch (err) {
    console.error("[tracking:open]", err);
  }

  // Retourne toujours le pixel
  return new NextResponse(PIXEL_GIF, {
    status: 200,
    headers: {
      "Content-Type": "image/gif",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Pragma": "no-cache",
    },
  });
}
