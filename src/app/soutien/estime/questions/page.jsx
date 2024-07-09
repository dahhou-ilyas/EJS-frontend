"use client"

import { useState } from 'react';
import Header from '../../../../components/Header';
import Link from 'next/link';
import questions from "./Estime"
import { useRouter } from 'next/navigation';

export default function Questions() {
  const router = useRouter();
  const [stage, setStage] = useState('questions');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [finalScore, setFinalScore] = useState(0);
 

  const backFunction = (index) => {
    if (index === 0) {
      router.push('/soutien/estime');
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


  return (
    <div className="main-wrapper">
      {/* Header */}
      <Header />
  {/*      <Sidebar id='menu-item11' id1='menu-items11' activeClassName='blog-grid' />
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
                                        <Link className={"text-decoration-none"} href="/soutien">Soutien Psychologique </Link>
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
          <div className="good-morning-blk">
            <div className="row">
              <div className="morning-user">
                <h2 className='ml-3 text-center'>
                  Evaluation de l'Estime de soi
                </h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="blog-view">
                <article className="blog blog-single-post">

    {/**questions */}
               {stage === 'questions' && (
                <>
                    <div className="col-sm-12">
                      <ul className="breadcrumb">
                        <li>
                        <i className="feather-chevron-left">
                        </i>
                        </li>
                        <li className="breadcrumb-item">
                          <Link className="text-decoration-none" href="#" onClick={(e) => { e.preventDefault(); backFunction(currentQuestionIndex); }}>
                            <span className="cursor-pointer text-decoration-none">Précédent</span>
                          </Link>
                        </li>
                        <li className="ms-auto">{currentQuestionIndex + 1 } / {questions.length} </li>
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
               </>
             )}

     {/**test completed */}

                  {stage === 'completed' && (
                   
                   <div className="container mx-auto p-4 d-flex flex-column align-items-center">
                    <h3 className="font-light  my-8">Merci d'avoir complété le test !</h3>
                    <img
                        src="https://cdn-icons-png.freepik.com/512/6559/6559073.png"
                        alt="Logo"
                        className="w-50 my-3"
                     
                    />
                        <Link  href={{
                                        pathname:"/soutien/estime/questions/resultat",
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
                  )}

                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
