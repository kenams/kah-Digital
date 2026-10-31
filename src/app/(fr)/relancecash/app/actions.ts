"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createPilotAuth } from "@/lib/pilot-auth";
import { parseInvoicesCsv } from "@/lib/relancecash/csv";
import { findAccount, importInvoices, markPaid, markReminderSent, reopen } from "@/lib/relancecash/store";

const auth = createPilotAuth("relancecash");

async function requireAccount() {
  const email = await auth.getSessionEmail();
  const account = email ? await findAccount(email) : null;
  if (!account) redirect("/relancecash/connexion");
  return account;
}

export async function importCsvAction(formData: FormData) {
  const account = await requireAccount();
  const text = String(formData.get("csv") ?? "");
  if (text.length > 600_000) redirect("/relancecash/app?erreur=taille");
  const { rows, errors } = parseInvoicesCsv(text);
  let created = 0;
  let updated = 0;
  if (rows.length) {
    try {
      ({ created, updated } = await importInvoices(account.id, rows));
    } catch (error) {
      console.error("relancecash import", error instanceof Error ? error.message : error);
      redirect("/relancecash/app?erreur=import");
    }
  }
  const params = new URLSearchParams({ crees: String(created), maj: String(updated), ko: String(errors.length) });
  if (errors.length) params.set("details", errors.slice(0, 5).join(" | "));
  revalidatePath("/relancecash/app");
  redirect(`/relancecash/app?${params.toString()}`);
}

export async function markPaidAction(formData: FormData) {
  const account = await requireAccount();
  await markPaid(account.id, String(formData.get("invoiceId") ?? ""));
  revalidatePath("/relancecash/app");
}

export async function reopenAction(formData: FormData) {
  const account = await requireAccount();
  await reopen(account.id, String(formData.get("invoiceId") ?? ""));
  revalidatePath("/relancecash/app");
}

export async function reminderSentAction(formData: FormData) {
  const account = await requireAccount();
  const level = Number(formData.get("level"));
  if (![1, 2, 3].includes(level)) return;
  await markReminderSent(account.id, String(formData.get("invoiceId") ?? ""), level);
  revalidatePath("/relancecash/app");
}
