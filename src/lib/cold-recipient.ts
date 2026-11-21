// Garde-fou commun à TOUS les envois à froid : adresse syntaxiquement stricte et domaine
// capable de recevoir du courrier. Une adresse refusée n'est jamais envoyée : un rebond
// coûte plus cher (réputation du sous-domaine) qu'un prospect perdu.
import { domainCanReceiveMail } from "@/lib/prospect-send-gate";

// Partie locale et domaine ASCII stricts : refuse espaces, %20 hérités d'URL, guillemets, IDN non encodés.
const STRICT_EMAIL = /^[a-z0-9](?:[a-z0-9._%+-]{0,62}[a-z0-9])?@(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,24}$/;

export function isStrictEmail(value: unknown): value is string {
  if (typeof value !== "string") return false;
  const e = value.trim().toLowerCase();
  if (e !== value.trim().toLowerCase() || /\s|%[0-9a-f]{2}|\.\./i.test(value)) return false;
  return STRICT_EMAIL.test(e);
}

export async function assertColdRecipient(email: string): Promise<void> {
  if (!isStrictEmail(email)) throw new Error(`adresse refusée (syntaxe): ${JSON.stringify(email)}`);
  if (!(await domainCanReceiveMail(email.trim()))) throw new Error("adresse refusée (domaine sans serveur mail)");
}
