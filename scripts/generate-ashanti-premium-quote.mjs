import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { jsPDF } from "jspdf";

const outputDir = join(process.cwd(), "public", "proposals");
mkdirSync(outputDir, { recursive: true });

const quote = {
  number: "DEV-2026-ASHANTI-001",
  date: "27 avril 2026",
  validUntil: "27 mai 2026",
  client: "Ashanti",
  project: "Phase premium - Site vitrine Ashanti Beauty",
  total: 790,
  currency: "EUR",
};

const items = [
  {
    description: "Lancement de la phase premium : cadrage visuel, direction artistique, intégration logo, palette et préparation des assets client.",
    qty: 1,
    unit: 300,
  },
  {
    description: "Intégration vidéo hero haute qualité, photos client, typographie complémentaire, section partenaires avec logos défilants.",
    qty: 1,
    unit: 250,
  },
  {
    description: "Optimisation mobile/desktop, hiérarchie visuelle, ajustements premium et livraison d'une version quasi finale.",
    qty: 1,
    unit: 240,
  },
];

const scope = [
  "Intégration de la vidéo haute qualité en hero sur la page d'accueil.",
  "Intégration du logo Ashanti Beauty.",
  "Intégration et adaptation de la palette de couleurs fournie.",
  "Intégration des photos transmises par le client.",
  "Amélioration globale de la direction artistique.",
  "Travail sur une typographie complémentaire moderne, élégante et cohérente avec le logo.",
  "Renforcement de la hiérarchie visuelle.",
  "Création d'une section « Nos partenaires » avec logos défilants.",
  "Optimisation du rendu mobile et desktop.",
  "Ajustements visuels afin d'obtenir une version quasi finale du site.",
];

const terms = [
  "Le paiement est réparti en trois étapes : 300 EUR au lancement, 250 EUR après intégration des principaux éléments visuels, puis 240 EUR à la livraison de la version quasi finale.",
  "Paiement par virement bancaire avec RIB ou via lien de paiement sécurisé.",
  "Le lancement de cette phase intervient après validation du devis et réception du premier règlement.",
  "Le devis inclut les éléments listés ci-dessus. Toute demande supplémentaire importante non prévue pourra faire l'objet d'un complément tarifaire après validation.",
  "TVA non applicable.",
];

function money(value) {
  return `${value.toLocaleString("fr-FR")} €`;
}

function drawPdfLogo(doc, x, y) {
  const blue = [46, 168, 255];
  const dark = [15, 23, 42];
  const unit = 0.9;
  const squares = [
    [0, 8], [5, 3], [5, 13], [10, 8], [10, 18],
    [15, 0], [15, 8], [15, 18], [15, 23], [20, 3],
  ];

  doc.setFillColor(...blue);
  squares.forEach(([sx, sy]) => {
    doc.roundedRect(x + sx * unit, y + sy * unit, 4 * unit, 4 * unit, 0.6, 0.6, "F");
  });
  doc.rect(x + 24 * unit, y + 4 * unit, 5 * unit, 26 * unit, "F");
  doc.triangle(x + 29 * unit, y + 16 * unit, x + 44 * unit, y + 4 * unit, x + 55 * unit, y + 4 * unit, "F");
  doc.triangle(x + 29 * unit, y + 19 * unit, x + 55 * unit, y + 30 * unit, x + 43 * unit, y + 30 * unit, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(...dark);
  doc.text("KAH-", x + 62 * unit, y + 19);
  doc.setTextColor(...blue);
  doc.text("DIGITAL", x + 62 * unit + doc.getTextWidth("KAH-") + 1.5, y + 19);
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text("Solutions digitales", x + 62 * unit, y + 26);
}

function addWrapped(doc, text, x, y, width, lineHeight = 5) {
  const lines = doc.splitTextToSize(text, width);
  doc.text(lines, x, y);
  return y + lines.length * lineHeight;
}

function generatePdf() {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const left = 16;
  const right = 194;
  let y = 14;

  drawPdfLogo(doc, left, y);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(46, 168, 255);
  doc.text("DEVIS", right, y + 8, { align: "right" });
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(17);
  doc.text("Ashanti Beauty", right, y + 16, { align: "right" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text("Document commercial KAH-Digital", right, y + 22, { align: "right" });

  y = 50;
  doc.setDrawColor(226, 232, 240);
  doc.line(left, y - 7, right, y - 7);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text("DE", left, y);
  doc.text("POUR", 112, y);

  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text("KAH-Digital", left, y + 8);
  doc.text(quote.client, 112, y + 8);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  doc.text("Rue du Simplon 4", left, y + 14);
  doc.text("Lausanne, Switzerland", left, y + 19);
  doc.text("Email : kahdigital42@gmail.com", left, y + 24);
  doc.text("Projet : " + quote.project, 112, y + 14);

  y = 88;
  const meta = [
    ["Numéro de devis", quote.number],
    ["Date", quote.date],
    ["Valable jusqu'au", quote.validUntil],
  ];
  meta.forEach(([label, value], index) => {
    const x = left + index * 60;
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(x, y, 54, 20, 3, 3);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(100, 116, 139);
    doc.text(label.toUpperCase(), x + 4, y + 7);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text(value, x + 4, y + 15);
  });

  y = 122;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text("Détail de la prestation", left, y);
  y += 8;

  doc.setFillColor(248, 250, 252);
  doc.roundedRect(left, y, 178, 10, 2, 2, "F");
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text("Description", left + 4, y + 6.5);
  doc.text("Qté", 144, y + 6.5, { align: "center" });
  doc.text("Prix unit.", 166, y + 6.5, { align: "right" });
  doc.text("Total", right - 4, y + 6.5, { align: "right" });
  y += 12;

  items.forEach((item) => {
    const rowStart = y;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(30, 41, 59);
    y = addWrapped(doc, item.description, left + 4, y + 4, 112, 4.5);
    const rowHeight = Math.max(18, y - rowStart + 5);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(left, rowStart, 178, rowHeight, 2, 2);
    doc.text(String(item.qty), 144, rowStart + 9, { align: "center" });
    doc.text(money(item.unit), 166, rowStart + 9, { align: "right" });
    doc.setFont("helvetica", "bold");
    doc.text(money(item.qty * item.unit), right - 4, rowStart + 9, { align: "right" });
    y = rowStart + rowHeight + 3;
  });

  y += 3;
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(118, y, 76, 26, 3, 3, "F");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  doc.text("Total HT", 124, y + 8);
  doc.text("TVA non applicable", 124, y + 15);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text("Total TTC", 124, y + 23);
  doc.text(money(quote.total), right - 5, y + 23, { align: "right" });

  y += 40;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Périmètre inclus", left, y);
  y += 7;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  scope.forEach((line) => {
    y = addWrapped(doc, `• ${line}`, left, y, 178, 4.4) + 1;
  });

  if (y > 235) {
    doc.addPage();
    y = 18;
  } else {
    y += 5;
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text("Modalités et conditions", left, y);
  y += 7;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  terms.forEach((line) => {
    y = addWrapped(doc, `• ${line}`, left, y, 178, 4.4) + 1;
  });

  y += 8;
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(left, y, 80, 28, 3, 3);
  doc.roundedRect(114, y, 80, 28, 3, 3);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text("Client - Signature et date", left + 5, y + 7);
  doc.text("KAH-Digital - Signature et date", 119, y + 7);

  const footerY = 286;
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.text(`${quote.number} - ${quote.client} - ${quote.project}`, left, footerY);
  doc.text("Page 1", right, footerY, { align: "right" });

  doc.save(join(outputDir, "devis-ashanti-beauty-phase-premium.pdf"));
}

function generateHtml() {
  const tableRows = items.map((item) => `
        <tr>
          <td>${item.description}</td>
          <td class="center">${item.qty}</td>
          <td class="right">${money(item.unit)}</td>
          <td class="right strong">${money(item.qty * item.unit)}</td>
        </tr>`).join("");

  const html = `<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${quote.number} - Devis Ashanti Beauty</title>
  <style>
    :root { color-scheme: light; --blue:#2ea8ff; --dark:#0f172a; --muted:#64748b; --line:#e2e8f0; --soft:#f8fafc; }
    * { box-sizing: border-box; }
    body { margin:0; background:#eef4fb; color:var(--dark); font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
    .toolbar { position: sticky; top:0; z-index:2; display:flex; justify-content:center; gap:12px; padding:14px; background:rgba(15,23,42,.92); backdrop-filter: blur(14px); }
    .toolbar a, .toolbar button { border:0; border-radius:999px; padding:10px 16px; font-weight:800; color:white; background:#2563eb; text-decoration:none; cursor:pointer; }
    .toolbar button { background:#334155; }
    .page { width:min(980px, calc(100% - 28px)); margin:28px auto; background:#fff; border:1px solid var(--line); border-radius:28px; box-shadow:0 24px 80px rgba(15,23,42,.10); padding:34px; }
    header { display:flex; justify-content:space-between; gap:28px; align-items:flex-start; padding-bottom:28px; border-bottom:1px solid var(--line); }
    .logo { display:flex; align-items:center; gap:16px; }
    .logo svg { width:64px; height:64px; flex:0 0 auto; }
    .wordmark { font-size:28px; line-height:.95; font-weight:950; letter-spacing:-.06em; }
    .wordmark span:last-child { color:var(--blue); }
    .tagline { margin-top:6px; color:var(--muted); font-size:10px; text-transform:uppercase; letter-spacing:.28em; font-weight:800; }
    .doc-head { text-align:right; }
    .doc-head .label { color:var(--blue); font-size:13px; text-transform:uppercase; letter-spacing:.3em; font-weight:900; }
    .doc-head h1 { margin:8px 0 4px; font-size:28px; }
    .doc-head p { margin:0; color:var(--muted); }
    .grid { display:grid; grid-template-columns:1fr 1fr; gap:18px; margin:28px 0; }
    .box { border:1px solid var(--line); border-radius:18px; background:var(--soft); padding:18px; }
    .box h2, .section h2 { margin:0 0 10px; color:var(--muted); font-size:12px; text-transform:uppercase; letter-spacing:.18em; }
    .box p { margin:4px 0; color:#334155; }
    .box .strong { color:var(--dark); font-weight:850; }
    .meta { display:grid; grid-template-columns:repeat(3, 1fr); gap:14px; margin-bottom:24px; }
    .meta .box { background:white; }
    table { width:100%; border-collapse:separate; border-spacing:0; overflow:hidden; border:1px solid var(--line); border-radius:18px; }
    th, td { padding:14px; border-bottom:1px solid var(--line); vertical-align:top; }
    th { background:var(--soft); color:#475569; text-align:left; font-size:13px; }
    tr:last-child td { border-bottom:0; }
    .center { text-align:center; }
    .right { text-align:right; white-space:nowrap; }
    .strong { font-weight:850; color:var(--dark); }
    .totals { margin-left:auto; margin-top:18px; width:min(360px, 100%); border:1px solid var(--line); border-radius:18px; overflow:hidden; }
    .totals div { display:flex; justify-content:space-between; gap:12px; padding:12px 16px; border-bottom:1px solid var(--line); }
    .totals div:last-child { border-bottom:0; background:#eaf6ff; font-size:18px; font-weight:950; }
    .section { margin-top:28px; border:1px solid var(--line); border-radius:18px; padding:20px; background:var(--soft); }
    ul { margin:0; padding-left:20px; color:#334155; line-height:1.62; }
    .signatures { display:grid; grid-template-columns:1fr 1fr; gap:18px; margin-top:28px; }
    .signature { border:1px solid var(--line); border-radius:18px; padding:18px; min-height:110px; }
    .signature .line { height:50px; border-bottom:1px solid #cbd5e1; }
    footer { margin-top:22px; display:flex; justify-content:space-between; color:#94a3b8; font-size:12px; }
    @media (max-width: 760px) { .page { padding:20px; border-radius:20px; } header, .grid, .meta, .signatures { grid-template-columns:1fr; display:grid; text-align:left; } .doc-head { text-align:left; } table { font-size:13px; } }
    @media print { body { background:white; } .toolbar { display:none; } .page { width:100%; margin:0; box-shadow:none; border:0; border-radius:0; } }
  </style>
</head>
<body>
  <div class="toolbar">
    <a href="./devis-ashanti-beauty-phase-premium.pdf" download>Télécharger le PDF</a>
    <button onclick="window.print()">Imprimer / enregistrer en PDF</button>
  </div>
  <main class="page">
    <header>
      <div class="logo">
        <svg aria-hidden="true" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="18" width="7" height="7" rx="1.5" fill="#2EA8FF" opacity="0.9"/><rect x="10" y="10" width="7" height="7" rx="1.5" fill="#2EA8FF" opacity="0.85"/><rect x="10" y="26" width="7" height="7" rx="1.5" fill="#2EA8FF" opacity="0.95"/><rect x="18" y="18" width="7" height="7" rx="1.5" fill="#2EA8FF"/><rect x="18" y="34" width="7" height="7" rx="1.5" fill="#2EA8FF" opacity="0.92"/><rect x="26" y="2" width="7" height="7" rx="1.5" fill="#2EA8FF" opacity="0.75"/><rect x="26" y="18" width="7" height="7" rx="1.5" fill="#2EA8FF" opacity="0.95"/><rect x="26" y="34" width="7" height="7" rx="1.5" fill="#2EA8FF"/><rect x="26" y="42" width="7" height="7" rx="1.5" fill="#2EA8FF" opacity="0.9"/><rect x="34" y="10" width="7" height="7" rx="1.5" fill="#2EA8FF" opacity="0.82"/><path d="M36 8H46V29.5L58 8H70L53 28.5L71 56H59L46 35.5V56H36V8Z" fill="#2EA8FF" transform="translate(-8 0)"/>
        </svg>
        <div><div class="wordmark"><span>KAH-</span><span>DIGITAL</span></div><div class="tagline">Solutions digitales</div></div>
      </div>
      <div class="doc-head">
        <div class="label">Devis</div>
        <h1>Ashanti Beauty</h1>
        <p>Document commercial KAH-Digital</p>
      </div>
    </header>

    <section class="grid">
      <div class="box"><h2>De</h2><p class="strong">KAH-Digital</p><p>Rue du Simplon 4</p><p>Lausanne, Switzerland</p><p>Email : kahdigital42@gmail.com</p></div>
      <div class="box"><h2>Pour</h2><p class="strong">${quote.client}</p><p>${quote.project}</p></div>
    </section>

    <section class="meta">
      <div class="box"><h2>Numéro de devis</h2><p class="strong">${quote.number}</p></div>
      <div class="box"><h2>Date</h2><p class="strong">${quote.date}</p></div>
      <div class="box"><h2>Valable jusqu'au</h2><p class="strong">${quote.validUntil}</p></div>
    </section>

    <table>
      <thead><tr><th>Description</th><th class="center">Qté</th><th class="right">Prix unit.</th><th class="right">Total</th></tr></thead>
      <tbody>${tableRows}</tbody>
    </table>

    <div class="totals">
      <div><span>Total HT</span><strong>${money(quote.total)}</strong></div>
      <div><span>TVA non applicable</span><strong>0,00 €</strong></div>
      <div><span>Total TTC</span><strong>${money(quote.total)}</strong></div>
    </div>

    <section class="section"><h2>Périmètre inclus</h2><ul>${scope.map((line) => `<li>${line}</li>`).join("")}</ul></section>
    <section class="section"><h2>Modalités et conditions</h2><ul>${terms.map((line) => `<li>${line}</li>`).join("")}</ul></section>

    <section class="signatures">
      <div class="signature"><p>Client</p><div class="line"></div><small>Signature et date</small></div>
      <div class="signature"><p>KAH-Digital</p><div class="line"></div><small>Signature et date</small></div>
    </section>

    <footer><span>${quote.number} - ${quote.client}</span><span>Total : ${money(quote.total)}</span></footer>
  </main>
</body>
</html>`;

  writeFileSync(join(outputDir, "devis-ashanti-beauty-phase-premium.html"), html, "utf8");
}

generatePdf();
generateHtml();

console.log("Generated:");
console.log("public/proposals/devis-ashanti-beauty-phase-premium.pdf");
console.log("public/proposals/devis-ashanti-beauty-phase-premium.html");
