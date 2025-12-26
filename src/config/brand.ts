const EMAIL_FALLBACK = "hello@kah-digital.com";
const PHONE_FALLBACK = "+33 6 00 00 00 00";

const rawEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? EMAIL_FALLBACK;
const rawPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE ?? PHONE_FALLBACK;

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
};
