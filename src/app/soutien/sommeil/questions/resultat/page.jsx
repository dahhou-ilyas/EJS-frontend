"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import Header from '@/components/auth/Header';
import Breadcrumb from "@/components/soutien/home/breadcrumb";
import Image from 'next/image'; 
import logo from "../../../../../assets/img/logo.png";
import sendEmail from '../../../../api/sendEmail';
import Link from "next/link";
import Csidebar from "@/components/auth/Csidebar";
import jwtDecode from "jwt-decode";
import { useRouter } from 'next/navigation';

export default function SommeilResult() {
  const searchParams = useSearchParams();
  const Score = searchParams.get("finalScore");
  const [currentDate, setCurrentDate] = useState("");
  const [interpretation, setInterpretation] = useState("");
  const pdfRef = useRef(null);
  const [user, setUser] = useState({});
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('access-token');
  
    if (!token) {
      router.push('/auth/jeunes'); 
      return;
    }
  
    try {
      const decodedToken = jwtDecode(token);
      const currentTimestamp = Math.floor(Date.now() / 1000);
  
      if (decodedToken.exp < currentTimestamp) {
        console.error('Token has expired');
        router.push('/auth/jeunes'); 
        return;
      }
  
      setUser(decodedToken); 
    } catch (error) {
      console.error('Invalid token:', error);
      router.push('/auth/jeunes'); 
      return;
    }
  }, []);

  const userId = user?.claims?.id;
  const userNom = user?.claims?.nom;
  const userPrenom = user?.claims?.prenom;

  useEffect(() => {
    if (Score <= 8) {
      setInterpretation(
        "Votre évaluation indique que vous n'avez pas de signes significatifs de troubles du sommeil. Continuez à maintenir de bonnes habitudes de sommeil pour garantir votre bien-être. Si vous ressentez des symptômes perturbants, consultez un professionnel de la santé."
      );
    } else {
      setInterpretation(
        "Vos résultats indiquent des problèmes potentiels de sommeil. Il est recommandé de consulter un professionnel de la santé pour une évaluation plus approfondie et des conseils personnalisés. Entre-temps, explorez nos ressources pour des conseils sur l'amélioration de la qualité du sommeil."
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
      scale: 1, 
      logging: false,
      useCORS: true
    });
    const imgData = canvas.toDataURL("image/jpeg", 0.7); 
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
      
      // Download the PDF
      const blob = new Blob([pdfArrayBuffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'test_result.pdf';
      link.click();
  
      // Attempt to send the email
      try {
        const result = await sendEmail(pdfBase64);
        if (result.success) {
          console.log("PDF sent successfully via email");
        } else {
          console.error("Failed to send PDF via email:", result.error);
        }
      } catch (emailError) {
        console.error("Error sending PDF via email:", emailError);
      }
  
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <>
    <Csidebar/>
    <div className="main-wrapper">
      <Header />
      <div className="page-wrapper">
        <div className="content">
          <Breadcrumb title={"Paix"} />
          <div className="container">
          <div ref={pdfRef} style={{ fontSize: '20px' }}>
          
            <div className="top soutien-container-title flex items-center space-x-4">
            <Image src={logo} alt="Logo" width={100} height={100} />
              <p className='text-center' style={{ fontSize: '30px' }}>Résultat du test de la Qualité du Sommeil</p>
            </div>
            
              <div className="middle soutien-blog blog-single-post">
                
                <h5 className="relat-head" style={{ fontSize: '28px' }}>Vos informations</h5>
                <p className="my-2"><strong>Identifiant:</strong> {userId}</p>
                <p className="my-2"><strong>Nom et Prénom:</strong> {userNom} { userPrenom}</p>
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
    </>
  );
}
