"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import Header from "../../../../../components/Header";
import Breadcrumb from "@/components/soutien/home/breadcrumb";
import Image from 'next/image'; // Make sure to import Image for Next.js image optimization
import logo from "../../../../../assets/img/logo.png";

export default function SommeilResult() {
  const searchParams = useSearchParams();
  const Score = searchParams.get("finalScore");
  const [currentDate, setCurrentDate] = useState("");
  const [interpretation, setInterpretation] = useState("");
  const pdfRef = useRef(null);

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
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("sommeil_result.pdf");
  };

  return (
    <div className="main-wrapper">
      <Header />
      <div className="page-wrapper">
        <div className="content">
          <Breadcrumb title={"Sommeil"} />
          <div className="container">
            <div className="top soutien-container-title">
              <p className="text-center" style={{ fontSize: '30px' }}>
                Résultat du test de la qualité de sommeil
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
            <button onClick={generatePDF} className="btn btn-primary mt-4">
              Télécharger le PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
