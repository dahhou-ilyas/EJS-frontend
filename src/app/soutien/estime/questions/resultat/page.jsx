"use client" ;
import React ,  { useState, useEffect } from 'react'
import {  useSearchParams } from "next/navigation";
import Header from "../../../../../components/Header"
import Link from 'next/link';

export default function resultat() {
    const searchParams = useSearchParams();
    const Score = searchParams.get('finalScore');
    const [currentDate, setCurrentDate] = useState('');
    const [interpretation, setInterpretation] = useState("");
    

    useEffect(() => {
      if (Score < 25) {
          setInterpretation("Votre estime de soi est très faible. Un travail dans ce domaine semble souhaitable.");
      } else if (Score >= 25 && Score < 31) {
          setInterpretation("Votre estime de soi est faible. Un travail dans ce domaine serait bénéfique.");
      } else if (Score >= 31 && Score < 34) {
          setInterpretation("Votre estime de soi est dans la moyenne.");
      } else if (Score >= 34 && Score <= 39) {
          setInterpretation("Votre estime de soi est forte.");
      } else if (Score > 39) {
          setInterpretation("Votre estime de soi est très forte et vous avez tendance à être fortement affirmé.");
      }
  }, [Score]);
  

    useEffect(() => {
    const date = new Date();
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    setCurrentDate(formattedDate);
    }, []);



  return (
    <div className="main-wrapper">
    {/* Header */}
    <Header />
    {/*   <Sidebar id='menu-item11' id1='menu-items11' activeClassName='blog-grid' />
  Sidebar */}
    {/* Page Wrapper */}
    <div className="page-wrapper">
      <div className="content">
        {/* Page Header */}

        <div className="page-header">
                        <div className="row">
                            <div className="col-sm-12">
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link className={"text-decoration-none text-[#2E37A4]"} href="/soutien">Soutien Psychologique </Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <i className="feather-chevron-right">
                                            </i>
                                    </li>
                                    <li className="breadcrumb-item active">Estime de soi</li>
                                </ul>
                            </div>
                        </div>
                    </div>
        <div className='grid place-items-center '>
          <div className="soutien-container-title">
              <div className="row">
                            
               <p className='mx-3 text-center'> Résultat du test de l'Estime de soi   </p>
                            
               </div>
            </div>

        <div className="row">
              
                  <div>
                  <div className="blog blog-single-post">
                    <h4 className='blog-title'>Vos informations</h4>
                        <p className="my-2" ><strong>Identifiant:</strong> 01</p>
                        <p className="my-2"><strong>Nom et Prénom:</strong> nom prenom</p>
                        <p className="my-2"><strong>Date du test:</strong> {currentDate} </p>
                        <p className="my-2"><strong>Score:</strong> {Score} </p>
                  </div>
                  </div>
              
              
              <div className="blog-view">
                  <div className="blog blog-single-post">
                  <h4 className='blog-title'>Interprétation du résultat</h4>
                    <p className='text-justify' > {interpretation} </p>
                  </div>
              </div>
         
          </div>
        </div>
      </div>
    </div>
  </div>
);
}
