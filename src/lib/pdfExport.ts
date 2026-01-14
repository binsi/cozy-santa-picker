import { jsPDF } from "jspdf";
import type { Match } from "./secretSanta";

export function exportMatchesToPDF(matches: Match[]): void {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Title
  doc.setFontSize(28);
  doc.setTextColor(178, 34, 34); // Christmas red
  doc.text("🎄 Secret Santa Matches 🎄", pageWidth / 2, 30, { align: "center" });

  // Subtitle
  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text(`Generated on ${new Date().toLocaleDateString()}`, pageWidth / 2, 42, {
    align: "center",
  });

  // Divider
  doc.setDrawColor(34, 139, 34); // Christmas green
  doc.setLineWidth(0.5);
  doc.line(30, 50, pageWidth - 30, 50);

  // Matches
  let yPosition = 70;
  const lineHeight = 12;

  matches.forEach((match, index) => {
    if (yPosition > 270) {
      doc.addPage();
      yPosition = 30;
    }

    // Number circle
    doc.setFillColor(178, 34, 34);
    doc.circle(25, yPosition - 2, 4, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.text(String(index + 1), 25, yPosition, { align: "center" });

    // Giver
    doc.setTextColor(50, 50, 50);
    doc.setFontSize(14);
    doc.text(match.giver, 40, yPosition);

    // Arrow
    doc.setTextColor(218, 165, 32); // Gold
    doc.text("→", pageWidth / 2, yPosition, { align: "center" });

    // Receiver
    doc.setTextColor(178, 34, 34);
    doc.text(match.receiver, pageWidth - 40, yPosition, { align: "right" });

    yPosition += lineHeight;
  });

  // Footer
  doc.setFontSize(10);
  doc.setTextColor(150, 150, 150);
  doc.text(
    "Made with ❤️ using Secret Santa Generator",
    pageWidth / 2,
    doc.internal.pageSize.getHeight() - 15,
    { align: "center" }
  );

  // Download
  doc.save("secret-santa-matches.pdf");
}
