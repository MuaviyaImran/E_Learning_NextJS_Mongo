import { useState } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';

const Certificate = () => {
  const [certificateUrl, setCertificateUrl] = useState(null);
  const courseName = 'HTML';
  const username = 'Muaviya Imran';

  const generateCertificate = async () => {
    const existingPdfBytes = await fetch('/certificate.pdf').then((res) => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    const { width, height } = firstPage.getSize();
    const fontSize = 48;
    const textX = width / 2;
    const textY = height / 2;

    firstPage.drawText(username, {
      x: textX,
      y: textY,
      size: fontSize,
      color: rgb(1, 1, 1),
      opacity: 1,
    });
    

    const modifiedPdfBytes = await pdfDoc.save();

    const modifiedPdfBlob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
    const modifiedPdfUrl = URL.createObjectURL(modifiedPdfBlob);
    setCertificateUrl(modifiedPdfUrl);
  };

  return (
    <div>
      <h1>Certificate Generator</h1>
      <button onClick={generateCertificate}>Generate Certificate</button>
      {certificateUrl && (
        <a href={certificateUrl} download="certificate.pdf">
          Download Certificate
        </a>
      )}
    </div>
  );
};

export default Certificate;
