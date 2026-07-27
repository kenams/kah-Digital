/**
 * Cron — Découverte de leads freelances/créateurs/indépendants pour KAH Workforce
 * Tourne à 8h30 lun-ven, alimente kah_workforce_prospects
 * Cibles : freelances, créateurs de contenu, artistes, coachs indépendants,
 * consultants solo — profils débordés par l'administratif (emails, factures, réseaux)
 */
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { isAdminUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const maxDuration = 300;
export const dynamic = "force-dynamic";

const LEADS_PER_RUN = 20;

const TARGETS = [
  // Freelances / créatifs FR
  { q: "freelance graphiste portfolio site web contact paris", sector: "graphiste", role: "Indépendant" },
  { q: "photographe freelance portfolio site web contact", sector: "photographe", role: "Indépendant" },
  { q: "consultant freelance solo site web contact", sector: "consultant", role: "Indépendant" },
  { q: "coach business independant site web contact", sector: "coach", role: "Indépendant" },
  { q: "developpeur freelance portfolio site web contact", sector: "tech", role: "Indépendant" },
  { q: "illustrateur freelance portfolio site web contact", sector: "illustrateur", role: "Indépendant" },
  { q: "videaste monteur freelance portfolio site web contact", sector: "video", role: "Indépendant" },
  { q: "coach sportif personal trainer independant site web contact", sector: "sport", role: "Indépendant" },
  { q: "decorateur interieur freelance portfolio site web contact", sector: "deco", role: "Indépendant" },
  { q: "traducteur freelance independant site web contact", sector: "traduction", role: "Indépendant" },
  { q: "redacteur copywriter freelance site web contact", sector: "redaction", role: "Indépendant" },
  { q: "community manager freelance independant site web contact", sector: "marketing", role: "Indépendant" },
  { q: "wedding planner independante site web contact", sector: "evenementiel", role: "Indépendant" },
  { q: "artiste peintre sculpteur portfolio site web contact", sector: "artiste", role: "Indépendant" },
  { q: "musicien producteur independant site web contact", sector: "musique", role: "Indépendant" },
  // Suisse romande
  { q: "freelance graphiste independant lausanne geneve site web contact", sector: "graphiste", role: "Indépendant" },
  { q: "photographe independant lausanne geneve site web contact", sector: "photographe", role: "Indépendant" },
  { q: "coach independant lausanne geneve site web contact", sector: "coach", role: "Indépendant" },
  { q: "consultant freelance lausanne geneve site web contact", sector: "consultant", role: "Indépendant" },
  // Belgique / Canada
  { q: "freelance graphiste independant bruxelles site web contact", sector: "graphiste", role: "Indépendant" },
  { q: "photographe independant montreal site web contact", sector: "photographe", role: "Indépendant" },
  { q: "coach business independant montreal site web contact", sector: "coach", role: "Indépendant" },
];

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

async function authorize(req: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && req.headers.get("authorization") === `Bearer ${cronSecret}`) return true;
  try {
    const supabaseAuth = await createSupabaseServerClient();
    if (!supabaseAuth) return false;
    const { data: { user } } = await supabaseAuth.auth.getUser();
    return Boolean(user && isAdminUser(user));
  } catch { return false; }
}

async function searchDDG(query: string): Promise<string[]> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 12000);
  try {
    const res = await fetch(
      `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`,
      { signal: ctrl.signal, headers: { "User-Agent": UA, Accept: "text/html" } }
    );
    clearTimeout(t);
    if (!res.ok) return [];
    const html = await res.text();
    const urls: string[] = [];
    for (const m of html.matchAll(/uddg=([^"&\s]+)/g)) {
      try {
        const u = decodeURIComponent(m[1]);
        if (u.startsWith("http") && !isJunk(u)) urls.push(u);
      } catch { /* skip */ }
    }
    return [...new Set(urls)].slice(0, 8);
  } catch { clearTimeout(t); return []; }
}

function isJunk(url: string) {
  const blocked = ["facebook","linkedin","twitter","instagram","youtube","wikipedia","google","bing",
    "leboncoin","societe.com","pappers","infogreffe","kompass","europages","malt.fr","upwork",
    "indeed","welcome","monster","pagesjaunes","yelp","tripadvisor","fiverr","freelancer.com"];
  return blocked.some(b => url.toLowerCase().includes(b));
}

async function fetchPage(url: string): Promise<string> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 8000);
  try {
    const res = await fetch(url, { signal: ctrl.signal, headers: { "User-Agent": UA } });
    clearTimeout(t);
    return res.ok ? await res.text() : "";
  } catch { clearTimeout(t); return ""; }
}

function extractEmail(html: string): string | null {
  const m = html.match(/mailto:([a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})/i);
  if (m) {
    const e = m[1].split("?")[0].toLowerCase().trim();
    if (!e.startsWith("no-reply") && !e.startsWith("noreply") && isValidEmail(e)) return e;
  }
  const all = html.match(/[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g) ?? [];
  const junk = ["sentry","w3.org","schema","google","apple","wordpress","jquery","sendgrid","amazonaws","cloudflare"];
  for (const e of all) {
    const l = e.toLowerCase();
    if (isValidEmail(l) && !junk.some(j => l.includes(j))) return l;
  }
  return null;
}

function isValidEmail(e: string) {
  if (!e || !e.includes("@") || e.length > 80) return false;
  const ext = e.split(".").pop() ?? "";
  if (["png","jpg","svg","css","js","php","html"].includes(ext)) return false;
  return true;
}

function extractName(html: string, url: string): string {
  const title = html.match(/<title[^>]*>([^<]{2,80})<\/title>/i)?.[1];
  if (title) return title.trim().replace(/\s*[-|–—]\s*.*/g, "").trim().slice(0, 60);
  return new URL(url).hostname.replace("www.", "").split(".")[0];
}

export async function GET(req: Request) {
  if (!(await authorize(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = getSupabase();
  let inserted = 0, skipped = 0;

  const { data: existing } = await supabase.from("kah_workforce_prospects").select("domain");
  const knownDomains = new Set((existing ?? []).map((r: { domain: string }) => r.domain).filter(Boolean));

  const target = TARGETS[Math.floor(Math.random() * TARGETS.length)];
  const urls = await searchDDG(target.q);

  for (const url of urls) {
    if (inserted >= LEADS_PER_RUN) break;
    try {
      const domain = new URL(url).hostname.replace("www.", "");
      if (knownDomains.has(domain)) { skipped++; continue; }

      const html = await fetchPage(url);
      if (!html) continue;

      const email = extractEmail(html);
      if (!email) continue;

      const name = extractName(html, url);

      await supabase.from("kah_workforce_prospects").insert({
        name,
        email,
        company: name,
        domain,
        sector: target.sector,
        contact_role: target.role,
        personal_note: null,
        status: "pending",
        sequence_status: "pending",
      });

      knownDomains.add(domain);
      inserted++;
      await new Promise(r => setTimeout(r, 500));
    } catch { /* skip */ }
  }

  console.log(`[kah-workforce-leads] inserted=${inserted} skipped=${skipped} query="${target.q}"`);
  return NextResponse.json({ inserted, skipped, query: target.q });
}

export async function POST(req: Request) { return GET(req); }
