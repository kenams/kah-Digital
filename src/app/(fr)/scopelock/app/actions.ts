"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { clip, isValidEmail } from "@/lib/html-escape";
import { getSessionEmail } from "@/lib/scopelock/auth";
import { sendRequestToClient } from "@/lib/scopelock/mail";
import {
  createProject, createRequest, findAccount, formatMoney, getOwnedProject, getOwnedRequest, markSent, type Currency,
} from "@/lib/scopelock/store";

async function requireAccount() {
  const email = await getSessionEmail();
  const account = email ? await findAccount(email) : null;
  if (!account) redirect("/scopelock/connexion");
  return account;
}

export async function createProjectAction(formData: FormData) {
  const account = await requireAccount();
  const name = clip(formData.get("name"), 120);
  const clientName = clip(formData.get("clientName"), 120);
  const clientEmail = clip(formData.get("clientEmail"), 200).toLowerCase();
  if (!name || !clientName || !isValidEmail(clientEmail)) redirect("/scopelock/app?erreur=projet");
  await createProject(account.id, name, clientName, clientEmail);
  revalidatePath("/scopelock/app");
}

export async function createRequestAction(formData: FormData) {
  const account = await requireAccount();
  const project = await getOwnedProject(account.id, String(formData.get("projectId") ?? ""));
  if (!project) redirect("/scopelock/app?erreur=projet");
  const title = clip(formData.get("title"), 160);
  const description = clip(formData.get("description"), 4000, true);
  const price = Number(String(formData.get("price") ?? "").replace(",", "."));
  const delay = Math.round(Number(formData.get("delayDays")));
  const currency = String(formData.get("currency")) as Currency;
  if (!title || !Number.isFinite(price) || price < 0 || price > 1_000_000 || !Number.isFinite(delay) || delay < 0 || delay > 3650 || !["EUR", "CHF", "USD"].includes(currency)) {
    redirect("/scopelock/app?erreur=demande");
  }
  await createRequest({ projectId: project.id, title, description, priceCents: Math.round(price * 100), currency, delayDays: delay });
  revalidatePath("/scopelock/app");
}

export async function sendRequestAction(formData: FormData) {
  const account = await requireAccount();
  const request = await getOwnedRequest(account.id, String(formData.get("requestId") ?? ""));
  if (!request || request.status !== "draft") redirect("/scopelock/app");
  const project = request.scopelock_projects;
  try {
    await sendRequestToClient({
      to: project.client_email,
      ownerEmail: account.email,
      ownerName: account.name || account.email,
      clientName: project.client_name,
      projectName: project.name,
      title: request.title,
      description: request.description,
      price: formatMoney(request.price_cents, request.currency),
      delay: request.delay_days ? `${request.delay_days} jour${request.delay_days > 1 ? "s" : ""}` : "à convenir",
      token: request.token,
    });
  } catch (error) {
    console.error("scopelock send", error instanceof Error ? error.message : error);
    redirect("/scopelock/app?erreur=envoi");
  }
  await markSent(request.id);
  revalidatePath("/scopelock/app");
}
