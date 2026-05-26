import { NextResponse } from "next/server";

const SERVICES = [
  { name: "assistant-pme", url: "https://assistant-pme.onrender.com/health" },
];

export async function GET(req: Request) {
  const cronSecret = process.env.CRON_SECRET;
  const auth = req.headers.get("authorization");
  if (cronSecret && auth !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results = await Promise.all(
    SERVICES.map(async (s) => {
      try {
        const res = await fetch(s.url, { signal: AbortSignal.timeout(15000) });
        return { name: s.name, status: res.status, ok: res.ok };
      } catch (e) {
        return { name: s.name, status: 0, ok: false, error: String(e) };
      }
    })
  );

  return NextResponse.json({ pinged: results.length, results, ts: new Date().toISOString() });
}

export const dynamic = "force-dynamic";
