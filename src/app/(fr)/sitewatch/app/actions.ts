"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { clip } from "@/lib/html-escape";
import { createPilotAuth } from "@/lib/pilot-auth";
import { assertPublicUrl } from "@/lib/safe-fetch";
import { runCheck } from "@/lib/sitewatch/runner";
import {
  countChecks, createCheck, deleteCheck, findAccount, getOwnedCheck, MAX_CHECKS, setActive, type Kind,
} from "@/lib/sitewatch/store";

const auth = createPilotAuth("sitewatch");
const KINDS: Kind[] = ["page", "form", "booking", "payment"];
const FREQUENCIES = [15, 30, 60, 360, 1440];

async function requireAccount() {
  const email = await auth.getSessionEmail();
  const account = email ? await findAccount(email) : null;
  if (!account) redirect("/sitewatch/connexion");
  return account;
}

export async function createCheckAction(formData: FormData) {
  const account = await requireAccount();
  const name = clip(formData.get("name"), 80);
  const kind = String(formData.get("kind")) as Kind;
  const rawUrl = clip(formData.get("url"), 500);
  const mustContain = clip(formData.get("mustContain"), 120) || null;
  const frequency = Number(formData.get("frequency"));
  if (!name || !KINDS.includes(kind) || !FREQUENCIES.includes(frequency)) redirect("/sitewatch/app?erreur=champs");
  let url: string;
  try {
    const parsed = await assertPublicUrl(/^https?:\/\//i.test(rawUrl) ? rawUrl : `https://${rawUrl}`);
    url = parsed.toString();
  } catch {
    redirect("/sitewatch/app?erreur=url");
  }
  if ((await countChecks(account.id)) >= MAX_CHECKS) redirect("/sitewatch/app?erreur=limite");
  await createCheck(account.id, { name, kind, url, mustContain, frequency });
  revalidatePath("/sitewatch/app");
}

export async function runNowAction(formData: FormData) {
  const account = await requireAccount();
  const check = await getOwnedCheck(account.id, String(formData.get("checkId") ?? ""));
  if (!check) return;
  // Une vérification manuelle par minute et par point de contrôle.
  if (check.last_checked_at && Date.now() - new Date(check.last_checked_at).getTime() < 60_000) return;
  await runCheck(check);
  revalidatePath("/sitewatch/app");
}

export async function toggleCheckAction(formData: FormData) {
  const account = await requireAccount();
  await setActive(account.id, String(formData.get("checkId") ?? ""), formData.get("active") === "true");
  revalidatePath("/sitewatch/app");
}

export async function deleteCheckAction(formData: FormData) {
  const account = await requireAccount();
  await deleteCheck(account.id, String(formData.get("checkId") ?? ""));
  revalidatePath("/sitewatch/app");
}
