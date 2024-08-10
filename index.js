import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";
import * as fs from "fs";

// This should be a Uint8Array or ArrayBuffer
// This data can be obtained in a number of different ways
// If your running in a Node environment, you could use fs.readFile()
// In the browser, you could make a fetch() call and use res.arrayBuffer()

async function x() {
  const existingPdfBytes = await fs.readFileSync("./example.pdf");

  // Load a PDFDocument from the existing PDF bytes
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  // Embed the Helvetica font
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Get the first page of the document
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  // Get the width and height of the first page
  const { width, height } = firstPage.getSize();

  // Draw a string of text diagonally across the first page
  firstPage.drawText("X", {
    // 0 0  kiri bawah
    x: width / 2,
    y: height / 2,
    size: 50,
    font: helveticaFont,
    color: rgb(0.95, 0.1, 0.1),
  });

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save();

  fs.writeFileSync("mynewfile.pdf", pdfBytes);
}

x();
