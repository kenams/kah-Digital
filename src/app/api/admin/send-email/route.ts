import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

// Accepte ADMIN_API_TOKEN (Bearer) ou ADMIN_SECRET_TOKEN (x-admin-token)
function isAuthorized(req: NextRequest): boolean {
  const apiToken = process.env.ADMIN_API_TOKEN;
  const secretToken = process.env.ADMIN_SECRET_TOKEN;
  const bearer = req.headers.get("authorization");
  const xToken = req.headers.get("x-admin-token");
  if (apiToken && bearer === `Bearer ${apiToken}`) return true;
  if (secretToken && xToken === secretToken) return true;
  return false;
}

function getTransport() {
  return nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.BREVO_SMTP_USER!,
      pass: process.env.BREVO_SMTP_PASS!,
    },
  });
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { to, subject, html, text, from, replyTo } = body;

  if (!to || !subject || (!html && !text)) {
    return NextResponse.json({ error: "to, subject, html/text requis" }, { status: 400 });
  }

  const transport = getTransport();

  await transport.sendMail({
    from: from ?? "KAH Digital <contact@kah-digital.ch>",
    to,
    replyTo: replyTo ?? "kahdigital42@gmail.com",
    subject,
    html: html ?? undefined,
    text: text ?? undefined,
  });

  return NextResponse.json({ ok: true, to, subject });
}
