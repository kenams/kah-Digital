import type { jsPDF } from "jspdf";

const BLUE: [number, number, number] = [46, 168, 255];
const DARK: [number, number, number] = [15, 23, 42];
const MUTED: [number, number, number] = [100, 116, 139];

export function drawKahDigitalPdfLogo(doc: jsPDF, x = 16, y = 12) {
  const unit = 1.6;
  const squares = [
    [0, 8, 4, 0.9],
    [5, 3, 4, 0.82],
    [5, 13, 4, 0.94],
    [10, 8, 4, 1],
    [10, 18, 4, 0.9],
    [15, 0, 4, 0.74],
    [15, 8, 4, 0.96],
    [15, 18, 4, 1],
    [15, 23, 4, 0.86],
    [20, 3, 4, 0.8],
  ] as const;

  squares.forEach(([sx, sy, size, alpha]) => {
    const color = BLUE.map((value) => Math.round(255 - (255 - value) * alpha)) as [number, number, number];
    doc.setFillColor(...color);
    doc.roundedRect(x + sx * unit, y + sy * unit, size * unit, size * unit, 0.8, 0.8, "F");
  });

  doc.setFillColor(...BLUE);
  doc.rect(x + 24 * unit, y + 4 * unit, 5 * unit, 26 * unit, "F");
  doc.triangle(x + 29 * unit, y + 16 * unit, x + 44 * unit, y + 4 * unit, x + 55 * unit, y + 4 * unit, "F");
  doc.triangle(x + 29 * unit, y + 19 * unit, x + 55 * unit, y + 30 * unit, x + 43 * unit, y + 30 * unit, "F");

  const wordmarkX = x + 62 * unit;
  const baselineY = y + 22;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.setTextColor(...DARK);
  doc.text("KAH-", wordmarkX, baselineY);
  const offset = doc.getTextWidth("KAH-");
  doc.setTextColor(...BLUE);
  doc.text("DIGITAL", wordmarkX + offset + 1.5, baselineY);

  doc.setFontSize(8);
  doc.setTextColor(...MUTED);
  doc.text("Solutions digitales", wordmarkX, baselineY + 7);
}
