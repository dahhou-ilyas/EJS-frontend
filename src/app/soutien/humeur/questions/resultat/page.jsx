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
        if ( Score < 8 ){
            setInterpretation("Votre évaluation indique que vous avez un bon état émotionnel. Continuez à prendre soin de vous et à pratiquer des activités qui vous apportent joie et satisfaction. Restez attentif à votre bien-être et n'hésitez pas à consulter nos ressources pour maintenir cet équilibre.")
        }else if (Score >= 8 & Score <= 10 ){
            setInterpretation("Votre évaluation suggère que vous traversez peut-être une période de changements émotionnels. Il est important de prêter attention à vos sentiments et de prendre soin de vous. Considérez parler à un professionnel ou à un proche de confiance, et explorez nos conseils pour gérer les moments de stress ou de tristesse.")
        } else setInterpretation("Votre évaluation suggère que vous traversez peut-être une période de préoccupations émotionnelles. Il est important de prêter attention à vos sentiments et de prendre soin de vous. Considérez parler à un professionnel ou à un proche de confiance, et explorez nos conseils pour gérer les moments de stress ou de tristesse.")
    })

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
              <Breadcrumb title={"Humeur"} /> 
                <div class="container">
                    <div class="top soutien-container-title">
                        <p className=' text-center'>Résultat du test de l'Humeur et de la Vitalité  </p>
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
  