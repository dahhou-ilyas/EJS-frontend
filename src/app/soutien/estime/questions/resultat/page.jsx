"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import Header from "../../../../../components/Header";
import Link from "next/link";
import Image from 'next/image'; // Make sure to import Image for Next.js image optimization
import logo from "../../../../../assets/img/logo.png";
import sendEmail from '../../../../api/sendEmail';

export default function Resultat() {
  const searchParams = useSearchParams();
  const Score = searchParams.get("finalScore");
  const [currentDate, setCurrentDate] = useState("");
  const [interpretation, setInterpretation] = useState("");
  const pdfRef = useRef(null);

  useEffect(() => {
    if (Score < 25) {
      setInterpretation(
        "Vos résultats montrent quelques défis avec votre estime de soi. Il est important de se rappeler que ce test n'est qu'un instantané et ne définit pas votre valeur. Parler avec un professionnel peut vous aider à explorer des moyens pour renforcer votre confiance en vous."
      );
    } else if (Score >= 25 && Score < 31) {
      setInterpretation(
        "Votre estime de soi est faible. Un travail dans ce domaine serait bénéfique."
      );
    } else if (Score >= 31 && Score < 34) {
      setInterpretation(
        "Félicite-toi pour tous tes petits succès, vous devrez développer davantage votre bonne estime de soi. Nous vous conseillons de prendre contact avec l’établissement de soins publique le plus proche pour des séances d’écoute et de soutien."
      );
    } else if (Score >= 34 && Score <= 39) {
      setInterpretation("Bravo ! Votre estime de soi est forte.");
    } else if (Score > 39) {
      setInterpretation(
        "Bravo ! Votre estime de soi est très forte et vous avez tendance à être fortement affirmé."
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
      {/* Header */}
      <Header />
      {/* Page Wrapper */}
      <div className="page-wrapper">
        <div className="content">
          {/* Page Header */}
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link
                      className={"text-decoration-none text-[#2E37A4]"}
                      href="/soutien"
                    >
                      Soutien Psychologique{" "}
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <i className="feather-chevron-right"></i>
                  </li>
                  <li className="breadcrumb-item active" >Estime de soi</li>
                </ul>
              </div>
            </div>
            <p className="mx-3 text-center" style={{ fontSize: '30px' }}>
                  Résultat du test de l'Estime de soi
                </p>
          </div>
          <div className="grid place-items-center">
            <div ref={pdfRef} style={{ fontSize: '20px' }}>
              <div className="row">
                
              </div>
              <div className="row">
                <div>
                  <div className="blog blog-single-post">
                    <Image src={logo} alt="Logo" width={100} height={100} />
                    <h4 className="blog-title" style={{ fontSize: '28px' }}>Vos informations</h4>
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
                </div>
                <div className="blog-view">
                  <div className="blog blog-single-post">
                    <h4 className="blog-title">Interprétation du résultat</h4>
                    <p className="text-justify">{interpretation}</p>
                  </div>
                </div>
              </div>
            </div>
            <form action={handleGenerateAndSendPDF}>
              <button type="submit" className="btn btn-primary mt-4">
                Télécharger le PDF
              </button>
              
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
