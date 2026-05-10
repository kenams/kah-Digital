import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase: SupabaseClient | null =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey, {
        auth: { persistSession: false },
        global: { headers: { "x-application-name": "kah-digital-social" } },
      })
    : null;

export type SocialLogStatus = "ok" | "error" | "skipped";

export type SocialLog = {
  id: string;
  createdAt: string;
  platform: string;
  lang: string;
  status: SocialLogStatus;
  content: string | null;
  error: string | null;
  runId: string | null;
};

export function isSocialSupabaseConfigured() {
  return !!supabase;
}

function db() {
  if (!supabase) throw new Error("Supabase non configuré");
  return supabase;
}

export async function insertSocialLog(input: {
  platform: string;
  lang: string;
  status: SocialLogStatus;
  content?: string | null;
  error?: string | null;
  runId?: string | null;
}) {
  const { error } = await db().from("social_logs").insert({
    platform: input.platform,
    lang: input.lang,
    status: input.status,
    content: input.content ?? null,
    error: input.error ?? null,
    runId: input.runId ?? null,
  });

  if (error && error.code !== "42P01") {
    console.error("[social-store] insert error", error);
  }
}

export async function getRecentSocialLogs(limit = 100): Promise<SocialLog[]> {
  const { data, error } = await db()
    .from("social_logs")
    .select("*")
    .order("createdAt", { ascending: false })
    .limit(limit);

  if (error) {
    if (error.code === "42P01") return [];
    console.error("[social-store] fetch error", error);
    throw new Error("Impossible de charger les logs sociaux.");
  }

  return (data as SocialLog[]) ?? [];
}
