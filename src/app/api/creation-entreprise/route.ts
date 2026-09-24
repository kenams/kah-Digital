import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { brandContact } from "@/config/brand";
import { sendAdminWhatsAppNotification } from "@/lib/admin-alerts";
import { getSiteUrl, renderBrandedEmail } from "@/lib/email-template";
import { getResendFromAddress } from "@/lib/mail";
import { getRateLimitHeaders, getRequestIp, rateLimit } from "@/lib/rate-limit";
import { verifyTurnstile } from "@/lib/turnstile";

const resendClient = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const notificationEmail = process.env.QUOTE_NOTIFICATION_EMAIL ?? brandContact.email;
const formRateLimit = { windowMs: 10 * 60 * 1000, max: 4 };
const adminUrl = `${getSiteUrl()}/admin`;

const formSchema = z.object({
  lastName: z.string().min(2),
  firstName: z.string().min(2),
  birthDate: z.string().min(4),
  birthPlace: z.string().min(2),
  address: z.string().min(5),
  nationality: z.string().min(2),
  activity: z.string().min(10),
  email: z.string().email(),
  phone: z.string().min(6),
  website: z.string().optional(),
  turnstileToken: z.string().min(1),
});

export async function POST(request: NextRequest) {
  if (!resendClient || !notificationEmail) {
    return NextResponse.json({ error: "Service email indisponible" }, { status: 503 });
  }

  if (!process.env.TURNSTILE_SECRET_KEY) {
    return NextResponse.json({ error: "Captcha non configure" }, { status: 503 });
  }

  const ip = getRequestIp(request);
  const remoteIp = ip === "unknown" ? null : ip;
  const rate = rateLimit(`creation-entreprise:${ip}`, formRateLimit);
  const rateHeaders = getRateLimitHeaders(rate, formRateLimit.max);

  if (!rate.allowed) {
    return NextResponse.json(
      { error: `Trop de demandes. Reessaie dans ${rate.retryAfter}s.` },
      { status: 429, headers: { ...rateHeaders, "Retry-After": String(rate.retryAfter) } }
    );
  }

  try {
    const payload = await request.json();
    const parsed = formSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Donnees invalides", details: parsed.error.flatten() },
        { status: 400, headers: rateHeaders }
      );
    }

    const { website, turnstileToken, ...data } = parsed.data;
    if (website && website.trim()) {
      return NextResponse.json({ ok: true }, { headers: rateHeaders });
    }

    const verification = await verifyTurnstile(turnstileToken, remoteIp);
    if (!verification.success) {
      const errorCodes = verification["error-codes"] ?? [];
      const errorSuffix = errorCodes.length ? ` (codes: ${errorCodes.join(", ")})` : "";
      return NextResponse.json(
        { error: `Captcha invalide${errorSuffix}`, details: errorCodes },
        { status: 400, headers: rateHeaders }
      );
    }

    const fullName = `${data.firstName} ${data.lastName}`;

    const adminHtml = renderBrandedEmail({
      eyebrow: "Création d'entreprise",
      title: `Nouvelle demande — ${fullName}`,
      intro: "Nouvelle demande de création d'auto-entreprise via l'INPI depuis le site. Réponds directement à l'email du client.",
      metrics: [
        { label: "Email", value: data.email },
        { label: "Téléphone", value: data.phone },
        { label: "Nationalité", value: data.nationality },
      ],
      sections: [
        {
          title: "État civil",
          items: [
            { label: "Nom", value: data.lastName },
            { label: "Prénom", value: data.firstName },
            { label: "Date de naissance", value: data.birthDate },
            { label: "Lieu de naissance", value: data.birthPlace },
            { label: "Nationalité", value: data.nationality },
            { label: "Adresse du domicile", value: data.address },
          ],
        },
        {
          title: "Contact",
          items: [
            { label: "Email", value: data.email },
            { label: "Téléphone", value: data.phone },
          ],
        },
        {
          title: "Activité envisagée",
          items: [{ label: "Description", value: data.activity }],
        },
      ],
      ctaLabel: "Ouvrir l'admin",
      ctaUrl: adminUrl,
      footer: `Reply-to configuré sur ${data.email}. Pièce d'identité à demander par email.`,
    });

    await resendClient.emails.send({
      from: getResendFromAddress(),
      to: notificationEmail.split(",").map((mail) => mail.trim()),
      replyTo: data.email,
      subject: `Création auto-entreprise — ${fullName}`,
      html: adminHtml,
      text: `Nom: ${data.lastName}\nPrenom: ${data.firstName}\nNe(e) le: ${data.birthDate} a ${data.birthPlace}\nNationalite: ${data.nationality}\nAdresse: ${data.address}\nEmail: ${data.email}\nTelephone: ${data.phone}\n\nActivite envisagee:\n${data.activity}`,
    });

    const clientHtml = renderBrandedEmail({
      eyebrow: "KAH Digital",
      title: `Merci ${data.firstName}, on s'occupe de tout`,
      intro:
        "Ta demande de création d'auto-entreprise a bien été reçue. On revient vers toi sous 24h pour finaliser ton immatriculation à l'INPI, sans erreur et sans perte de temps.",
      sections: [
        {
          title: "Prochaine étape",
          items: [
            {
              label: "Pièce d'identité",
              value: "On te la demandera par email (recto/verso) après le premier contact pour boucler le dossier.",
            },
          ],
        },
      ],
      footer: `Une question avant ? Réponds directement à cet email ou écris à ${brandContact.email}.`,
    });

    await resendClient.emails.send({
      from: getResendFromAddress(),
      to: [data.email],
      subject: "KAH Digital — Demande de création d'auto-entreprise reçue",
      html: clientHtml,
      text: `Merci ${data.firstName}, ta demande a bien été reçue. On revient vers toi sous 24h pour finaliser ton auto-entreprise. On te demandera ta pièce d'identité (recto/verso) par email après le premier contact.`,
    });

    await sendAdminWhatsAppNotification({
      title: `Création entreprise — ${fullName}`,
      source: "contact",
      summary: data.activity.slice(0, 220),
      email: data.email,
      company: undefined,
      adminPath: "/creation-entreprise",
    });

    return NextResponse.json({ ok: true }, { headers: rateHeaders });
  } catch (error) {
    console.error("[api/creation-entreprise] Failed to send email", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500, headers: rateHeaders });
  }
}
