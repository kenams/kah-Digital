import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { QuoteRecord } from "@/lib/quote";

type MemoryBucket = {
  items: QuoteRecord[];
};

declare global {
  var __quoteMemoryBucket: MemoryBucket | undefined;
}

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase: SupabaseClient | null =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey, {
        auth: { persistSession: false },
        global: {
          headers: { "x-application-name": "kah-digital-admin" },
        },
      })
    : null;

function getMemoryBucket(): MemoryBucket {
  if (!globalThis.__quoteMemoryBucket) {
    globalThis.__quoteMemoryBucket = { items: [] };
  }
  return globalThis.__quoteMemoryBucket;
}

export async function saveQuoteRecord(quote: QuoteRecord) {
  if (supabase) {
    const { error } = await supabase.from("quotes").insert({ ...quote });
    if (!error) {
      return;
    }
    console.error("[quote-store] Failed to persist quote to Supabase", error);
  }

  const bucket = getMemoryBucket();
  bucket.items.push(quote);
  if (bucket.items.length > 200) {
    bucket.items.splice(0, bucket.items.length - 200);
  }
}

export async function getRecentQuotes(limit = 50) {
  if (supabase) {
    const { data, error } = await supabase
      .from("quotes")
      .select("*")
      .order("submittedAt", { ascending: false })
      .limit(limit);
    if (!error && data) {
      return data as QuoteRecord[];
    }
    console.error("[quote-store] Failed to read quotes from Supabase", error);
  }

  const bucket = getMemoryBucket();
  return bucket.items
    .slice()
    .sort((a, b) => b.submittedAt.localeCompare(a.submittedAt))
    .slice(0, limit);
}
