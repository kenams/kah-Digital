const resendFrom = process.env.RESEND_FROM?.trim();

export function getResendFromAddress() {
  return resendFrom || "KAH Digital <onboarding@resend.dev>";
}
