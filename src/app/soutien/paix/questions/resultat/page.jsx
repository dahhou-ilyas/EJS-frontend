"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from "next/navigation";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import Header from "../../../../../components/Header";
import Breadcrumb from '@/components/soutien/home/breadcrumb';
import Image from 'next/image';
import logo from "../../../../../assets/img/logo.png";

export default function Humeur_Result() {
  const searchParams = useSearchParams();
  const Score = searchParams.get('finalScore');
  const [currentDate, setCurrentDate] = useState('');
  const [interpretation, setInterpretation] = useState('');
  const pdfRef = useRef(null);

  useEffect(() => {
    if (Score < 8) {
      setInterpretation("Votre évaluation indique que vous êtes en paix avec vous-même. Continuez à pratiquer des activités qui favorisent votre tranquillité et bien-être. Restez attentif à votre sérénité et n'hésitez pas à consulter nos ressources pour maintenir cet équilibre.");
    } else if (Score >= 8 && Score <= 10) {
      setInterpretation("Votre évaluation suggère que vous traversez peut-être une période de stress ou d'inquiétude. Il est important de prêter attention à vos sentiments et de prendre soin de vous. Considérez parler à un professionnel ou à un proche de confiance pour gérer les moments d'anxiété.");
    } else {
      setInterpretation("Votre évaluation suggère que vous traversez peut-être une période d'anxiété. Il est important de prêter attention à vos sentiments et de prendre soin de vous. Considérez parler à un professionnel ou à un proche de confiance pour gérer les moments d'anxiété.");
    }
  }, [Score]);

  useEffect(() => {
    const date = new Date();
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    setCurrentDate(formattedDate);
  }, []);

  const generatePDF = async () => {
    const element = pdfRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("paix_interieure_result.pdf");
  };

  return (
    <div className="main-wrapper">
      <Header />
      <div className="page-wrapper">
        <div className="content">
          <Breadcrumb title={"Paix"} />
          <div className="container">
            <div className="top soutien-container-title">
              <p className='text-center' style={{ fontSize: '30px' }}>Résultat du test de la Paix Intérieure</p>
            </div>
            <div ref={pdfRef} style={{ fontSize: '20px' }}>
              <div className="middle soutien-blog blog-single-post">
                <Image src={logo} alt="Logo" width={100} height={100} />
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
            <button onClick={generatePDF} className="btn btn-primary mt-4">
              Télécharger le PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
