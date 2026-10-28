import type { jsPDF } from "jspdf";

const NAVY: [number, number, number] = [8, 14, 40];
const GOLD: [number, number, number] = [217, 174, 98];
const GOLD_DARK: [number, number, number] = [160, 110, 40];
const BLUE: [number, number, number] = [61, 123, 255];
const DARK: [number, number, number] = [15, 23, 42];

/** Médaille + titre « KAH DIGITAL / STUDIO » en vectoriel (pas d'image à charger). */
export function drawKahDigitalPdfLogo(doc: jsPDF, x = 16, y = 12) {
  const r = 9;
  const cx = x + r;
  const cy = y + r + 1;

  doc.setFillColor(...NAVY);
  doc.circle(cx, cy, r, "F");
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.9);
  doc.circle(cx, cy, r, "S");
  doc.setLineWidth(0.2);
  doc.setDrawColor(...BLUE);
  doc.circle(cx, cy, r - 1.4, "S");

  doc.setLineWidth(0.5);
  doc.setDrawColor(...GOLD);
  doc.roundedRect(cx - 3.6, cy - 5.6, 7.2, 7.2, 1.8, 1.8, "S");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...GOLD);
  doc.text("K", cx, cy - 0.2, { align: "center" });

  doc.setFontSize(3.6);
  doc.setTextColor(...GOLD);
  doc.text("KAH-DIGITAL", cx, cy + 4.1, { align: "center" });
  doc.setFontSize(3.2);
  doc.text("STUDIO", cx, cy + 6.3, { align: "center" });

  const tx = x + r * 2 + 5;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.setTextColor(...DARK);
  doc.text("KAH DIGITAL", tx, y + 9, { charSpace: 1.1 });

  doc.setFont("helvetica", "bolditalic");
  doc.setFontSize(17);
  doc.setTextColor(...GOLD_DARK);
  doc.text("STUDIO", tx, y + 18, { charSpace: 3 });
  const w = doc.getTextWidth("STUDIO") + 5 * 3;
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.3);
  doc.line(tx + w + 2, y + 16.2, tx + w + 18, y + 16.2);

  doc.setLineWidth(0.2);
  doc.setFont("helvetica", "normal");
}
