"use client" ;
import React ,  { useState, useEffect } from 'react'
import {  useSearchParams } from "next/navigation";
import Header from "../../../../../components/Header"
import Breadcrumb from '@/components/soutien/home/breadcrumb';


export default function Humeur_Result() {
    const searchParams = useSearchParams();
    const Score = searchParams.get('finalScore');
    const [currentDate, setCurrentDate] = useState('');
    const [interpretation, setInterpretation] = useState("");
    console.log(Score)

    useEffect(() => {
      if (Score <= 8) {
        setInterpretation("Votre évaluation indique que vous n'avez pas de signes significatifs de troubles du sommeil. Continuez à maintenir de bonnes habitudes de sommeil pour garantir votre bien-être. Si vous ressentez des symptômes perturbants, consultez un professionnel de la santé.");
      } else {
        setInterpretation("Vos résultats indiquent des problèmes potentiels de sommeil. Un bon sommeil est crucial pour votre bien-être global. Il pourrait être utile de discuter avec un professionnel pour identifier les causes possibles et explorer des solutions pour améliorer votre qualité de sommeil.");
      }
    }, [Score]);

    useEffect(() => {
    const date = new Date();
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    setCurrentDate(formattedDate);
    }, []);


    return (

      <div className="main-wrapper">
      <Header />
        <div className="page-wrapper">
            <div className="content">
              <Breadcrumb title={"Sommeil"} /> 
                <div class="container">
                    <div class="top soutien-container-title">
                        <p className=' text-center'>Résultat du test de la qualité de sommeil   </p>
                    </div>

                     <div class="middle soutien-blog blog-single-post">
                     <h5 className="relat-head ">Vos informations</h5>
                            <p className="my-2" ><strong>Identifiant:</strong> 01</p>
                            <p className="my-2"><strong>Nom et Prénom:</strong> nom prenom</p>
                            <p className="my-2"><strong>Date du test:</strong> {currentDate} </p>
                            <p className="my-2"><strong>Score:</strong> {Score} </p>
                      </div>
                  
                      <div className="bottom soutien-blog blog-single-post">
                      <h5 className="relat-head ">Interprétation du résultat</h5>
                            <p className='text-justify' > {interpretation} </p>
                      </div>

            </div>
        </div>
    </div>
  
    
  </div>

 
  );
  }
  