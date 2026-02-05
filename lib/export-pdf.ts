import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";

export async function generatePdf(elementId: string, fileName: string): Promise<void> {
  await document.fonts.ready;
  const el = document.getElementById(elementId);
  if (!el) {
    throw new Error("Не удалось найти область резюме");
  }
  const canvas = await html2canvas(el, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
    width: 595,
    height: 842,
  });
  const imgData = canvas.toDataURL("image/jpeg", 0.95);
  const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: "a4" });
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
  pdf.save(`${fileName}.pdf`);
}
