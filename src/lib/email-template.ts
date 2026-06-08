type EmailMetric = {
  label: string;
  value: string;
};

type EmailSectionItem = {
  label: string;
  value: string;
};

type EmailSection = {
  title: string;
  items: EmailSectionItem[];
};

type BrandedEmailOptions = {
  eyebrow?: string;
  title: string;
  intro?: string;
  metrics?: EmailMetric[];
  sections?: EmailSection[];
  ctaLabel?: string;
  ctaUrl?: string;
  footer?: string;
};

const fallbackSiteUrl = "https://kah-digital.ch";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "") || fallbackSiteUrl;

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatValue(value: string) {
  return escapeHtml(value).replace(/\n/g, "<br />");
}

export function getSiteUrl() {
  return siteUrl;
}

export function renderBrandedEmail({
  eyebrow,
  title,
  intro,
  metrics = [],
  sections = [],
  ctaLabel,
  ctaUrl,
  footer,
}: BrandedEmailOptions) {
  const renderedMetrics = metrics.length
    ? `
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin: 0 0 24px;">
        <tr>
          ${metrics
            .map(
              (metric) => `
                <td style="padding: 0 8px 8px 0;">
                  <div style="border: 1px solid #2b313d; border-radius: 16px; padding: 14px 16px; background: #121925;">
                    <div style="font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: #99a3b8; margin-bottom: 8px;">
                      ${escapeHtml(metric.label)}
                    </div>
                    <div style="font-size: 18px; line-height: 1.35; font-weight: 700; color: #f8fafc;">
                      ${formatValue(metric.value)}
                    </div>
                  </div>
                </td>`
            )
            .join("")}
        </tr>
      </table>`
    : "";

  const renderedSections = sections
    .filter((section) => section.items.some((item) => item.value.trim()))
    .map(
      (section) => `
        <div style="margin: 0 0 18px; border: 1px solid #232a37; border-radius: 18px; background: #0f1622; overflow: hidden;">
          <div style="padding: 14px 18px; background: #131c2a; color: #f3d089; font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; font-weight: 700;">
            ${escapeHtml(section.title)}
          </div>
          <div style="padding: 8px 18px 2px;">
            ${section.items
              .filter((item) => item.value.trim())
              .map(
                (item) => `
                  <div style="padding: 10px 0; border-bottom: 1px solid #1d2532;">
                    <div style="font-size: 12px; color: #94a3b8; margin-bottom: 6px;">${escapeHtml(item.label)}</div>
                    <div style="font-size: 14px; line-height: 1.6; color: #f8fafc;">${formatValue(item.value)}</div>
                  </div>`
              )
              .join("")}
          </div>
        </div>`
    )
    .join("");

  const renderedCta =
    ctaLabel && ctaUrl
      ? `
        <div style="margin: 28px 0 0;">
          <a href="${escapeHtml(ctaUrl)}" style="display: inline-block; padding: 14px 20px; border-radius: 999px; background: linear-gradient(135deg, #d4af63 0%, #f3d089 100%); color: #111827; text-decoration: none; font-weight: 700;">
            ${escapeHtml(ctaLabel)}
          </a>
        </div>`
      : "";

  return `
    <!DOCTYPE html>
    <html lang="fr">
      <body style="margin: 0; padding: 0; background: #09111b; font-family: Inter, Helvetica, Arial, sans-serif; color: #e5e7eb;">
        <div style="padding: 32px 16px; background:
          radial-gradient(circle at top left, rgba(212,175,99,0.18), transparent 34%),
          radial-gradient(circle at top right, rgba(59,130,246,0.14), transparent 28%),
          #09111b;">
          <div style="max-width: 680px; margin: 0 auto; border: 1px solid #212a38; border-radius: 28px; overflow: hidden; background: #0b1220;">
            <div style="padding: 28px 28px 22px; border-bottom: 1px solid #1e293b; background: linear-gradient(180deg, rgba(212,175,99,0.08), rgba(11,18,32,0));">
              <div style="display: inline-flex; align-items: center; gap: 12px; margin-bottom: 18px;">
                <div style="width: 42px; height: 42px; border-radius: 14px; background: linear-gradient(135deg, #d4af63 0%, #f3d089 100%); color: #111827; font-weight: 800; font-size: 22px; line-height: 42px; text-align: center;">
                  K
                </div>
                <div>
                  <div style="font-size: 21px; line-height: 1.2; font-weight: 800; color: #f8fafc;">KAH Digital</div>
                  <div style="font-size: 11px; color: #94a3b8; letter-spacing: 0.14em; text-transform: uppercase;">Digital Studio</div>
                </div>
              </div>
              ${eyebrow ? `<div style="font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #d4af63; margin-bottom: 10px;">${escapeHtml(eyebrow)}</div>` : ""}
              <div style="font-size: 32px; line-height: 1.18; font-weight: 800; color: #f8fafc; margin-bottom: 12px;">${escapeHtml(title)}</div>
              ${intro ? `<div style="font-size: 15px; line-height: 1.7; color: #cbd5e1; max-width: 560px;">${formatValue(intro)}</div>` : ""}
            </div>
            <div style="padding: 26px 28px 30px;">
              ${renderedMetrics}
              ${renderedSections}
              ${renderedCta}
            </div>
            <div style="padding: 18px 28px 26px; border-top: 1px solid #1e293b; font-size: 12px; line-height: 1.7; color: #94a3b8;">
              ${footer ? formatValue(footer) : "Notification automatique KAH Digital."}<br />
              <a href="${siteUrl}" style="color: #d4af63; text-decoration: none;">${siteUrl.replace(/^https?:\/\//, "")}</a>
            </div>
          </div>
        </div>
      </body>
    </html>`;
}
