"use client" ;
import React ,  { useState, useEffect } from 'react'
import {  useSearchParams } from "next/navigation";
import Header from "../../../../../components/Header"
import Breadcrumb from '@/components/soutien/home/breadcrumb';

export default function resultat() {
    const searchParams = useSearchParams();
    const Score = searchParams.get('finalScore');
    const [currentDate, setCurrentDate] = useState('');
    const [interpretation, setInterpretation] = useState("");
    

    useEffect(() => {
      if (Score < 25) {
          setInterpretation("Vos résultats montrent quelques défis avec votre estime de soi. Il est important de se rappeler que ce test n'est qu'un instantané et ne définit pas votre valeur. Parler avec un professionnel peut vous aider à explorer des moyens pour renforcer votre confiance en vous.");
      } else if (Score >= 25 && Score < 31) {
          setInterpretation("Vos résultats montrent quelques faibles défis avec votre estime de soi. Il est important de se rappeler que ce test n'est qu'un instantané et ne définit pas votre valeur. Parler avec un professionnel peut vous aider à explorer des moyens pour renforcer votre confiance en vous.");
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
      <Header />
        <div className="page-wrapper">
            <div className="content">
              <Breadcrumb title={"Estime de soi"} /> 
                <div class="container">
                    <div class="top soutien-container-title">
                        <p className=' text-center'>Résultat du test de l'Estime de soi  </p>
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
