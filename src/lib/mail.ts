const resendFrom = process.env.RESEND_FROM?.trim();

export function getResendFromAddress() {
  return resendFrom || "KAH Digital Studio <onboarding@resend.dev>";
}
