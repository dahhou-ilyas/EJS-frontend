"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import Header from "../../../../../components/Header";
import Link from "next/link";
import Image from 'next/image'; // Make sure to import Image for Next.js image optimization
import logo from "../../../../../assets/img/logo.png";

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
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("test_result.pdf");
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
            <button onClick={generatePDF} className="btn btn-primary mt-4">
              Télécharger le PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
