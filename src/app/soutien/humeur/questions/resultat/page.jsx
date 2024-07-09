"use client" ;
import React ,  { useState, useEffect } from 'react'
import {  useSearchParams } from "next/navigation";
import Header from "../../../../../components/Header"
import Link from 'next/link';

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
            setInterpretation("Votre évaluation suggère que vous traversez peut-être une période d'incertitude émotionnelle. Il est important de prêter attention à vos sentiments et de prendre soin de vous. Considérez parler à un professionnel ou à un proche de confiance, et explorez nos conseils pour gérer les moments de stress ou de tristesse.")
        } else setInterpretation("Votre évaluation indique un niveau élevé de détresse émotionnelle. Il est essentiel de ne pas ignorer ces sentiments. Nous vous recommandons fortement de consulter un professionnel de la santé pour obtenir un soutien adapté. En attendant, prenez le temps de parcourir nos ressources pour trouver des moyens de vous apaiser et de vous sentir mieux.")
    })

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
                                    <Link  className={"text-decoration-none"}href="/soutien">Soutien Psychologique </Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <i className="feather-chevron-right"></i>
                                </li>
                                <li className="breadcrumb-item active">Humeur</li>
                                </ul>
                        </div>
                    </div>
                </div>
        <div className="good-morning-blk">
          <div className="row">
            <div className="morning-user">
              <h2 className='ml-3 text-center'>
              Résultats du test d&apos;Humeur et Vitalité
              </h2>
            </div>
          </div>
        </div>

        <div className="row">
              <div className="col-md-4 ">
                  <div>
                  <div className="blog blog-single-post">
                    <h4 className='blog-title'>Vos informations</h4>
                        <p className="my-2" ><strong>Identifiant:</strong> 01</p>
                        <p className="my-2"><strong>Nom et Prénom:</strong> nom prenom</p>
                        <p className="my-2"><strong>Date du test:</strong> {currentDate} </p>
                        <p className="my-2"><strong>Score:</strong> {Score} </p>
                  </div>
                  </div>
              </div>
              <div className="col-md-8">
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
