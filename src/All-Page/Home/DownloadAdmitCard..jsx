// DownloadAdmitCard.jsx
import React, { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import AdmitCardPDF from "./AdmitCardPDF";

export default function DownloadAdmitCard() {
  const pdfRef = useRef();

  const studentData = {
    name: "Robin",
    roll: "23",
    className: "10",
    section: "A",
    exam: "Final",
  };

  const handleDownload = async () => {
    const element = pdfRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "pt", "a4");

    // A4 width 595pt, height 842pt
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${studentData.name}_AdmitCard.pdf`);
  };

  return (
    <div className="p-6">
      <AdmitCardPDF ref={pdfRef} student={studentData} />
      <button
        onClick={handleDownload}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Download PDF
      </button>
    </div>
  );
}
