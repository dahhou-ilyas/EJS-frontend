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
import Breadcrumb from "@/components/soutien/home/breadcrumb";

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
      scale: 5, // Reduces the scale, which can significantly reduce file size
      logging: false,
      useCORS: true
    });
    const imgData = canvas.toDataURL("image/jpeg", 0.9); // 0.7 is the quality of the image
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
          <Breadcrumb title={"Paix"} />
          <div className="container">
          <div ref={pdfRef} style={{ fontSize: '40px' }}>
          
            <div className="top soutien-container-title flex items-center space-x-4">
            <Image src={logo} alt="Logo" width={100} height={100} />
              <p className='text-center' style={{ fontSize: '30px' }}>Résultat du test de l'Estime de soi</p>
            </div>
            
              <div className="middle soutien-blog blog-single-post">
                
                <h5 className="relat-head" style={{ fontSize: '28px' }}>Vos informations</h5>
                <p className="my-2"><strong>Identifiant:</strong> 01</p>
                <p className="my-2"><strong>Nom et Prénom:</strong> nom prenom</p>
                <p className="my-2"><strong>Date du test:</strong> {currentDate}</p>
                <p className="my-2"><strong>Score:</strong> {Score}</p>
              </div>
              <div className="bottom soutien-blog blog-single-post">
                <h5 className="relat-head">Interprétation du résultat</h5>
                <p className='text-justify'>{interpretation}</p>
              </div>
         </div> 

           
            <div className='bottom2 soutien-blog blog-single-post d-flex flex-column align-items-center'>
            <button onClick={handleGenerateAndSendPDF} className="btn-primary ">
              Télécharger le PDF
            </button>
            <Link href= "/soutien" >
                
                <button className="btn-primary">
                Revenir aux tests psychologiques
                </button>
        
               </Link>
            </div>

            <div className='footer'>
                <p className='text-center text-[5px] my-20'>Soutien Psychologique</p>
            </div>
         </div>
         </div>
      </div>
    </div>
  );
}