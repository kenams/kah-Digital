const EMAIL_FALLBACK = "kah-digital@hotmail.com";
const PHONE_FALLBACK = "+33 7 59 55 84 14";

const rawEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? EMAIL_FALLBACK;
const rawPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE ?? PHONE_FALLBACK;
const rawCalendly = process.env.NEXT_PUBLIC_CALENDLY_URL ?? "";

function toPhoneHref(phone: string) {
  const digits = phone.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) return digits;
  if (digits.startsWith("0")) {
    return `+33${digits.slice(1)}`;
  }
  return digits;
}

export const brandContact = {
  email: rawEmail,
  phone: rawPhone,
  phoneHref: toPhoneHref(rawPhone),
  calendlyUrl: rawCalendly || undefined,
};
