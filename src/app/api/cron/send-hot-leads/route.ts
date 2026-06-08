import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

const LEADS = [
  {
    to: "info@gdm-not.ch",
    subject: "Votre site — Etude Gampert Demierre Moreno",
    html: `<p>Bonjour,</p>
<p>Je vous avais envoyé il y a quelques jours une analyse de votre site. Je vois que vous l'avez consultée — je voulais donc reprendre contact directement.</p>
<p>En bref, ce que j'ai identifié sur gdm-not.ch : vitesse de chargement à améliorer, optimisation mobile insuffisante, et peu de signaux de confiance visibles pour des nouveaux clients qui vous trouvent via Google.</p>
<p>Est-ce que ces points vous parlent ? Je travaille avec plusieurs études notariales et cabinets juridiques en Suisse romande — une refonte prend en général 3 à 4 semaines, facturation CHF.</p>
<p>Une réponse à cet email suffit si vous souhaitez qu'on en parle.</p>
<p>Bonne journée,<br>Kénan — KAH Digital<br>kah-digital.ch</p>`,
  },
  {
    to: "contact@wbmnotaires.ch",
    subject: "Votre site — wbm notaires",
    html: `<p>Bonjour,</p>
<p>Je vous avais envoyé une analyse de wbmnotaires.ch il y a quelques jours. Vous l'avez regardée — je vous recontacte donc directement.</p>
<p>Ce que j'ai noté : le site est élégant et l'histoire depuis 1845 est un atout fort. Mais techniquement, il y a des points à corriger côté mobile et performance qui pénalisent votre référencement Google.</p>
<p>Je travaille avec des cabinets professionnels en Suisse romande — refonte en 3 à 4 semaines, facturation CHF, code livré clé en main.</p>
<p>Si c'est un sujet d'actualité pour vous, répondez simplement à cet email.</p>
<p>Cordialement,<br>Kénan — KAH Digital<br>kah-digital.ch</p>`,
  },
  {
    to: "office@ipsofacto.notaires.fr",
    subject: "Votre site — Etude Birraux-Naz-Delecluse",
    html: `<p>Bonjour,</p>
<p>Suite à l'analyse de votre site que je vous avais transmise — je vois que vous l'avez consultée, alors je vous contacte directement.</p>
<p>Ce que j'ai relevé : performance mobile à améliorer, et quelques points SEO qui vous font perdre de la visibilité sur Google face à des confrères mieux positionnés.</p>
<p>Je développe des sites pour des études notariales et cabinets juridiques en France et Suisse — livraison en 3 à 4 semaines, sans sous-traitance.</p>
<p>Une réponse à cet email si vous souhaitez qu'on en discute.</p>
<p>Bonne journée,<br>Kénan — KAH Digital<br>kah-digital.ch</p>`,
  },
  {
    to: "milena.eigenmann@boltshauser.info",
    subject: "Votre site — Boltshauser Architekten",
    html: `<p>Hallo,</p>
<p>Ich habe Ihnen vor einigen Tagen eine Analyse Ihrer Website geschickt. Sie haben sie sich angesehen — deshalb melde ich mich jetzt direkt.</p>
<p>Was mir bei boltshauser.info aufgefallen ist: Die mobile Performance kann verbessert werden, und einige technische Details beeinflussen Ihre Sichtbarkeit bei Google.</p>
<p>Ich entwickle Websites für Architekturbüros und Fachkanzleien in der Schweiz — Lieferung in 3 bis 4 Wochen, Abrechnung in CHF.</p>
<p>Eine kurze Antwort auf diese E-Mail genügt, wenn Sie Interesse haben.</p>
<p>Mit freundlichen Grüssen,<br>Kénan — KAH Digital<br>kah-digital.ch</p>`,
  },
  {
    to: "info@bkg.ch",
    subject: "Ihre Website — BKG Architekten",
    html: `<p>Hallo,</p>
<p>Ich habe Ihnen vor einigen Tagen eine Analyse von bkg.ch geschickt. Sie haben sie sich angesehen — deshalb melde ich mich direkt.</p>
<p>Verbesserungspotenzial: mobile Optimierung und einige SEO-Punkte, die Ihre Auffindbarkeit bei Google beeinflussen.</p>
<p>Ich arbeite mit Architekturbüros und professionellen Kanzleien in der Schweiz zusammen — 3 bis 4 Wochen Lieferzeit, CHF-Abrechnung.</p>
<p>Antworten Sie einfach auf diese E-Mail, wenn Sie mehr erfahren möchten.</p>
<p>Freundliche Grüsse,<br>Kénan — KAH Digital<br>kah-digital.ch</p>`,
  },
];

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY!);
  const results: { to: string; ok: boolean; id?: string; error?: string }[] = [];

  for (const lead of LEADS) {
    try {
      const { data, error } = await resend.emails.send({
        from: "Kénan — KAH Digital <contact@kah-digital.ch>",
        to: [lead.to],
        replyTo: ["kahdigital42@gmail.com"],
        subject: lead.subject,
        html: lead.html,
      });
      if (error) throw new Error(error.message);
      results.push({ to: lead.to, ok: true, id: data?.id });
    } catch (e) {
      results.push({ to: lead.to, ok: false, error: String(e) });
    }
  }

  return NextResponse.json({ sent: results.filter(r => r.ok).length, results });
}
