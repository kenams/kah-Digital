import { safeFetch } from "@/lib/safe-fetch";
import { sendAlert, sendRecovery } from "./mail";
import { db, findAccountById, type Check } from "./store";

const TIMEOUT_MS = 10_000;
const MAX_BODY = 500_000;
const ALERT_AFTER_FAILURES = 2;
const MAX_PER_RUN = 100;
const CONCURRENCY = 5;

export type Outcome = { ok: boolean; status: number | null; latencyMs: number; error: string | null };

async function attempt(check: Pick<Check, "url" | "must_contain">): Promise<Outcome> {
  const started = Date.now();
  try {
    const res = await safeFetch(check.url, {
      method: "GET",
      headers: { "user-agent": "SiteWatch/1.0 (KAH Digital Studio; contact kah-digital.ch)", accept: "text/html,*/*" },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    const latencyMs = Date.now() - started;
    if (res.status < 200 || res.status >= 300) {
      await res.body?.cancel().catch(() => {});
      return { ok: false, status: res.status, latencyMs, error: `Réponse HTTP ${res.status}` };
    }
    if (check.must_contain) {
      const text = (await res.text()).slice(0, MAX_BODY).toLowerCase();
      if (!text.includes(check.must_contain.toLowerCase())) {
        return { ok: false, status: res.status, latencyMs, error: `Texte attendu introuvable : « ${check.must_contain} »` };
      }
    } else {
      await res.body?.cancel().catch(() => {});
    }
    return { ok: true, status: res.status, latencyMs, error: null };
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erreur inconnue";
    const timeout = /timeout|aborted/i.test(msg);
    return { ok: false, status: null, latencyMs: Date.now() - started, error: timeout ? "Délai dépassé (10 s)" : msg.slice(0, 180) };
  }
}

/** Une vérification, avec une seconde tentative immédiate pour écarter un raté ponctuel. */
export async function runCheck(check: Check): Promise<Outcome> {
  let outcome = await attempt(check);
  if (!outcome.ok) {
    await new Promise((r) => setTimeout(r, 4000));
    outcome = await attempt(check);
  }
  await record(check, outcome);
  return outcome;
}

async function record(check: Check, o: Outcome) {
  const client = db();
  const now = new Date().toISOString();
  await client.from("sitewatch_results").insert({ check_id: check.id, ok: o.ok, status_code: o.status, latency_ms: o.latencyMs, error: o.error });
  const failures = o.ok ? 0 : check.failures + 1;
  let incidentOpen = check.incident_open;
  let notify: "alert" | "recovery" | null = null;

  if (!o.ok && failures >= ALERT_AFTER_FAILURES && !check.incident_open) {
    incidentOpen = true;
    notify = "alert";
    await client.from("sitewatch_incidents").insert({ check_id: check.id, error: o.error });
  } else if (o.ok && check.incident_open) {
    incidentOpen = false;
    notify = "recovery";
    await client.from("sitewatch_incidents").update({ resolved_at: now }).eq("check_id", check.id).is("resolved_at", null);
  }

  await client.from("sitewatch_checks").update({
    last_ok: o.ok, last_status: o.status, last_latency_ms: o.latencyMs, last_error: o.error, last_checked_at: now, failures, incident_open: incidentOpen,
  }).eq("id", check.id);

  if (notify) {
    const account = await findAccountById(check.account_id);
    if (account) {
      const send = notify === "alert" ? sendAlert({ to: account.email, name: check.name, url: check.url, error: o.error ?? "" }) : sendRecovery({ to: account.email, name: check.name, url: check.url });
      await send.catch((e) => console.error("sitewatch mail", e instanceof Error ? e.message : e));
    }
  }
}

/** Lance les vérifications échues (appelé toutes les 15 min par GitHub Actions). */
export async function runDue() {
  const client = db();
  const { data } = await client.from("sitewatch_checks").select("*").eq("active", true).limit(1000);
  const nowMs = Date.now();
  const due = ((data ?? []) as Check[])
    .filter((c) => !c.last_checked_at || new Date(c.last_checked_at).getTime() + c.frequency_minutes * 60_000 - 60_000 <= nowMs)
    .slice(0, MAX_PER_RUN);

  let ok = 0;
  let ko = 0;
  for (let i = 0; i < due.length; i += CONCURRENCY) {
    const outcomes = await Promise.all(due.slice(i, i + CONCURRENCY).map((c) => runCheck(c)));
    for (const o of outcomes) o.ok ? ok++ : ko++;
  }

  // Conservation : 30 jours de résultats.
  await client.from("sitewatch_results").delete().lt("created_at", new Date(nowMs - 30 * 86_400_000).toISOString());
  return { checked: due.length, passed: ok, failed: ko };
}
