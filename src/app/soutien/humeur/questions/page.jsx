"use client"

import React, { useState } from 'react';
import Header from '@/components/auth/Header';
import Link from 'next/link';
import questions_arabe from "./DepressionTest_arabe"
import questions_francais from "./DepressionTest"
import { useRouter } from 'next/navigation';
import Breadcrumb from '@/components/soutien/home/breadcrumb';
import { useLanguage } from '@/app/context/LanguageContext';
import Csidebar from '@/components/auth/Csidebar';



export default function Questions() {
  const { arabic } = useLanguage();

  var questions;
  const router = useRouter();
  const [stage, setStage] = useState('questions');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [finalScore, setFinalScore] = useState(0);
 
  if(arabic){
    questions=questions_arabe;
  } else{
   questions=questions_francais;
  }

  const backFunction = (index) => {
    if (index === 0) {
      router.push('/soutien/humeur');
    } else {
      setCurrentQuestionIndex(index - 1);
    }
  };

  const handleAnswer = (answerIndex) => {
    const currentQuestion = questions[currentQuestionIndex];
    const score = currentQuestion.scores[answerIndex];
    setFinalScore(finalScore + score)
    
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setStage('completed');    }
  };

  if(arabic){
    return (
      <>
      <Csidebar/>
      <div className="main-wrapper">
        <Header />
        <div className="page-wrapper">
          <div className="content">
            <Breadcrumb title={"المزاج"} arabic={true} showbutt  />
            <div className="container">
              <div className="top soutien-container-title">
                <p className='text-center'>تقييم المزاج والحيوية</p>
              </div>
              <div className="middle">
                {stage === 'questions' && (
                  <article className="soutien-blog blog-single-post">
                    <div className="col-sm-12">
                      <ul className="breadcrumb">
                        <li>
                          <i className="feather-chevron-left"></i>
                        </li>
                        <li className="breadcrumb-item">
                          <Link className="text-decoration-none" href="#" onClick={(e) => { e.preventDefault(); backFunction(currentQuestionIndex); }}>
                            <span className="cursor-pointer text-decoration-none text-[#2E37A4] text-[15px]">السابق</span>
                          </Link>
                        </li>
                        <li className="ms-auto text-[#2E37A4] text-[15px]">{currentQuestionIndex + 1} / {questions.length}</li>
                      </ul>
                    </div>
    
                    <div className="mb-4 d-flex flex-column align-items-center">
                      <p className='mb-5'>{questions[currentQuestionIndex].question}</p>
    
                      {questions[currentQuestionIndex].answers.map((answer, index) => (
                        <div key={index}>
                          <button
                            key={index}
                            onClick={() => handleAnswer(index)}
                            className="btn-primary"
                          >
                            {answer}
                          </button>
                        </div>
                      ))}
                    </div>
                  </article>
                )}
    
                {stage === 'completed' && (
                  <article className="soutien-blog blog-single-post">
                    <div className="container mx-auto p-4 d-flex flex-column align-items-center">
                      <h3 className="font-light my-8">شكراً لإكمال الاختبار!</h3>
                      <img
                        src="https://cdn-icons-png.freepik.com/512/6559/6559073.png"
                        alt="Logo"
                        className="w-50 my-3"
                      />
                      <Link
                        href={{
                          pathname: "/soutien/humeur/questions/resultat",
                          query: { finalScore },
                        }}
                      >
                        <button className="btn-primary">
                          نتيجة الاختبار
                        </button>
                      </Link>
                      <Link href="/soutien">
                        <button className="btn-primary">
                          العودة إلى الاختبارات النفسية
                        </button>
                      </Link>
                    </div>
                  </article>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
    );
    
  }

  return (

    <>
    <Csidebar/>
    <div className="main-wrapper">
    <Header />
    <div className="page-wrapper">
       <div className="content">
       <Breadcrumb title={"Humeur"}  showbutt  /> 
       <div class="container">
           <div class="top soutien-container-title">
               <p className=' text-center'>   Evaluation de l&apos;Humeur et de la Vitalité   </p>
           </div>
       <div class="middle">

                  {stage === 'questions' && (        
                        <article className="soutien-blog blog-single-post">
                          <div className="col-sm-12">
                            <ul className="breadcrumb">
                              <li>
                              <i className="feather-chevron-left">
                              </i>
                              </li>
                              <li className="breadcrumb-item">
                                <Link className="text-decoration-none" href="#" onClick={(e) => { e.preventDefault(); backFunction(currentQuestionIndex); }}>
                                  <span className="cursor-pointer text-decoration-none text-[#2E37A4] text-[15px]">Précédent</span>
                                </Link>
                              </li>
                              <li className="ms-auto  text-[#2E37A4] text-[15px]">{currentQuestionIndex + 1 } / {questions.length} </li>
                            </ul>
                          </div>



                          <div className="mb-4 d-flex flex-column align-items-center  ">
                          
                            <p className='mb-5'>{questions[currentQuestionIndex].question}</p>

                            {questions[currentQuestionIndex].answers.map((answer, index) => (
                              <div key={index}>
                              <button
                                key={index}
                                onClick={() => handleAnswer(index)}
                                className="btn-primary  "
                              >
                                {answer}
                              </button>
                              </div>
                            ))}
                          </div>
                        </article>
                  )}

        {stage === 'completed' && (
            
                  <article className="soutien-blog blog-single-post">

                   <div className="container mx-auto p-4 d-flex flex-column align-items-center">
                    <h3 className="font-light  my-8">Merci d&apos;avoir complété le test !</h3>
                    <img
                        src="https://cdn-icons-png.freepik.com/512/6559/6559073.png"
                        alt="Logo"
                        className="w-50 my-3"
                     
                    />
                        <Link  href={{
                                        pathname:"/soutien/humeur/questions/resultat",
                                        query:{finalScore },
                                        }} >
   
                        <button className="btn-primary ">
                        Résultat du test
                        </button>
                        </Link>
                
                        <Link href= "/soutien" >
                
                        <button className="btn-primary">
                        Revenir aux tests psychologiques
                        </button>
                
                        </Link>
                        
                 </div>
                 </article>
      

                  )}
                  </div>
                </div>
            </div>
      </div>

    
      </div>
      </>
  );
}
