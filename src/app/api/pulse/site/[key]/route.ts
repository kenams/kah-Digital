import { NextResponse } from "next/server";
import { publicView } from "@/lib/pulse/content";
import { getSiteByKey, isPulseConfigured } from "@/lib/pulse/store";

export const dynamic = "force-dynamic";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Cache-Control": "public, s-maxage=20, stale-while-revalidate=120",
};

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS });
}

/** Contenu public d'un site connecté (lu par le script pulse.js sur le site du client). */
export async function GET(_request: Request, context: { params: Promise<{ key: string }> }) {
  const { key } = await context.params;
  if (!isPulseConfigured() || !/^[a-z0-9][a-z0-9-]{1,60}$/.test(key)) {
    return NextResponse.json({ error: "not_found" }, { status: 404, headers: CORS });
  }
  const site = await getSiteByKey(key);
  if (!site) return NextResponse.json({ error: "not_found" }, { status: 404, headers: CORS });

  return NextResponse.json(
    { name: site.client_name, timezone: site.timezone, content: publicView(site.content, site.timezone), updatedAt: site.updated_at },
    { headers: CORS },
  );
}
