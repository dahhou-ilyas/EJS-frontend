"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import Header from "../../../../../components/Header";
import Breadcrumb from "@/components/soutien/home/breadcrumb";
import Image from 'next/image'; // Make sure to import Image for Next.js image optimization
import logo from "../../../../../assets/img/logo.png";
import sendEmail from '../../../../api/sendEmail';

export default function HumeurResult() {
  const searchParams = useSearchParams();
  const Score = searchParams.get("finalScore");
  const [currentDate, setCurrentDate] = useState("");
  const [interpretation, setInterpretation] = useState("");
  const pdfRef = useRef(null);

  useEffect(() => {
    if (Score < 8) {
      setInterpretation(
        "Votre évaluation indique que vous avez un bon état émotionnel. Continuez à prendre soin de vous et à pratiquer des activités qui vous apportent joie et satisfaction. Restez attentif à votre bien-être et n'hésitez pas à consulter nos ressources pour maintenir cet équilibre."
      );
    } else if (Score >= 8 && Score <= 10) {
      setInterpretation(
        "Votre évaluation suggère que vous traversez peut-être une période de changements émotionnels. Il est important de prêter attention à vos sentiments et de prendre soin de vous. Considérez parler à un professionnel ou à un proche de confiance, et explorez nos conseils pour gérer les moments de stress ou de tristesse."
      );
    } else {
      setInterpretation(
        "Votre évaluation suggère que vous traversez peut-être une période de préoccupations émotionnelles. Il est important de prêter attention à vos sentiments et de prendre soin de vous. Considérez parler à un professionnel ou à un proche de confiance, et explorez nos conseils pour gérer les moments de stress ou de tristesse."
      );
    }
  }, [Score]);

  useEffect(() => {
    const date = new Date();
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    setCurrentDate(formattedDate);
  }, []);

  const generatePDF = async () => {
    const element = pdfRef.current;
    const canvas = await html2canvas(element, {
      scale: 1, // Reduces the scale, which can significantly reduce file size
      logging: false,
      useCORS: true
    });
    const imgData = canvas.toDataURL("image/jpeg", 0.7); // 0.7 is the quality of the image
    const pdf = new jsPDF({
      unit: 'px',
      format: 'a4',
      orientation: 'portrait'
    });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const widthRatio = pageWidth / canvas.width;
    const heightRatio = pageHeight / canvas.height;
    const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;
  
    const canvasWidth = canvas.width * ratio;
    const canvasHeight = canvas.height * ratio;
  
    pdf.addImage(imgData, 'JPEG', 0, 0, canvasWidth, canvasHeight);
    return pdf.output('arraybuffer');
  };

  const handleGenerateAndSendPDF = async () => {
    try {
      const pdfArrayBuffer = await generatePDF();
      
      // Convert ArrayBuffer to Base64
      const pdfBase64 = btoa(
        new Uint8Array(pdfArrayBuffer).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ''
        )
      );
      
      // Call the server action
      const result = await sendEmail(pdfBase64);
      
      if (result.success) {
        console.log("PDF sent successfully");
        // Optionally, you can still allow the user to download the PDF
        const blob = new Blob([pdfArrayBuffer], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'test_result.pdf';
        link.click();
      } else {
        console.error("Failed to send PDF:", result.error);
      }
    } catch (error) {
      console.error("Error generating and sending PDF:", error);
    }
  };

  return (
    <div className="main-wrapper">
      <Header />
      <div className="page-wrapper">
        <div className="content">
          <Breadcrumb title={"Humeur"} />
          <div className="container">
            <div className="top soutien-container-title">
              <p className="text-center" style={{ fontSize: '30px' }}>
                Résultat du test de l'Humeur et de la Vitalité
              </p>
            </div>
            <div ref={pdfRef} style={{ fontSize: '20px' }}>
              <div className="middle soutien-blog blog-single-post">
                <Image src={logo} alt="Logo" width={100} height={100} />
                <h5 className="relat-head" style={{ fontSize: '28px' }}>Vos informations</h5>
                <p className="my-2">
                  <strong>Identifiant:</strong> 01
                </p>
                <p className="my-2">
                  <strong>Nom et Prénom:</strong> nom prenom
                </p>
                <p className="my-2">
                  <strong>Date du test:</strong> {currentDate}
                </p>
                <p className="my-2">
                  <strong>Score:</strong> {Score}
                </p>
              </div>
              <div className="bottom soutien-blog blog-single-post">
                <h5 className="relat-head">Interprétation du résultat</h5>
                <p className="text-justify">{interpretation}</p>
              </div>
            </div>
            <button onClick={handleGenerateAndSendPDF} className="btn btn-primary mt-4">
              Télécharger le PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
