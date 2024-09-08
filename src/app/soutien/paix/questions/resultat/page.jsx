"use client";
import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from "next/navigation";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import Header from '@/components/auth/Header';
import Breadcrumb from '@/components/soutien/home/breadcrumb';
import Image from 'next/image';
import logo from "../../../../../assets/img/logo.png";
import sendEmail from '../../../../api/sendEmail';
import Link from 'next/link';
import Csidebar from '@/components/auth/Csidebar';
import {jwtDecode} from "jwt-decode";
import { useRouter } from 'next/navigation';


function Humeur_Result() {
  const searchParams = useSearchParams();
  const Score = searchParams.get('finalScore');
  const [currentDate, setCurrentDate] = useState('');
  const [interpretation, setInterpretation] = useState('');
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
  const userEmail = user?.claims?.mail;
  

  useEffect(() => {
    if (Score < 8) {
      setInterpretation("Votre évaluation indique que vous êtes en paix avec vous-même. Continuez à pratiquer des activités qui favorisent votre tranquillité et bien-être. Restez attentif à votre sérénité et n'hésitez pas à consulter nos ressources pour maintenir cet équilibre.");
    } else if (Score >= 8 && Score <= 10) {
      setInterpretation("Votre évaluation suggère que vous traversez peut-être une période de stress. Il est important de prêter attention à vos sentiments et de prendre soin de vous. Considérez parler à un professionnel ou à un proche de confiance pour gérer les moments d'anxiété.");
    } else {
      setInterpretation("Votre évaluation suggère que vous traversez peut-être une période difficile. Il est important de prêter attention à vos sentiments et de prendre soin de vous. Considérez parler à un professionnel ou à un proche de confiance pour gérer les moments d'anxiété.");
    }
  }, [Score]);

  useEffect(() => {
    const date = new Date();
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
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
      
      // Download the PDF
      const blob = new Blob([pdfArrayBuffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'test_result.pdf';
      link.click();
  
      // Attempt to send the email
      try {
        const result = await sendEmail(userEmail, pdfBase64);
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
          <Breadcrumb title={"Bonheur"} />
          <div className="container">
          <div ref={pdfRef} style={{ fontSize: '20px' }}>
          
            <div className="top soutien-container-title flex flex-row space-x-4">
            <Image src={logo} alt="Logo" width={150} height={150} />
              <p className='text-center' style={{ fontSize: '25px' }}>Résultat du test de la Paix Intérieure</p>
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

export default function ResultPage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <Humeur_Result />
    </Suspense>
  );
}