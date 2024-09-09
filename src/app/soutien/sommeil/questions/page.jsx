"use client"

import React, { useState } from 'react';
import Header from '@/components/auth/Header';
import Link from 'next/link';
import tests_farncais from './Sommeil';
import tests_arabic from './Sommeil_arabic';
import { useLanguage } from '@/app/context/LanguageContext';
import { useRouter } from 'next/navigation';
import Breadcrumb from '@/components/soutien/home/breadcrumb';
import Csidebar from '@/components/auth/Csidebar';

export default function Questions() {
  const {arabic}=useLanguage();
  var tests
  const router = useRouter();
  const [stage, setStage] = useState('questions');
  const [currentTestIndex, setCurrentTestIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [finalScore, setFinalScore] = useState(0);

  if(arabic){
    tests=tests_arabic;
  }
  else{
    tests=tests_farncais;
  }

  const currentTest = tests[currentTestIndex];

  const backFunction = () => {
    if (currentTestIndex > 0) {
      setCurrentTestIndex(currentTestIndex - 1);
    } else {
      router.push('/soutien');
    }
  };
  const nextFunction = () => {
    const allAnswered = currentTest.parts.every((part, partIndex) =>
      part.choix.every((choice, choiceIndex) =>
        responses[`choice-${currentTestIndex}-${partIndex}-${choiceIndex}`] !== undefined
      )
    );
  
    if (allAnswered) {
      if (currentTestIndex < tests.length - 1) {
        setCurrentTestIndex(currentTestIndex + 1);
      } else {
        calculateFinalScore();
        setStage('completed');
      }
    } else {
      alert('Veuillez répondre à toutes les questions avant de continuer.');
    }
  };
  const handleChoice = (currentTestIndex, partIndex, choiceIndex, value) => {
    setResponses(prev => ({
      ...prev,
      [`choice-${currentTestIndex}-${partIndex}-${choiceIndex}`]: value
    }));
  };
  const calculateFinalScore = () => {
    console.log("Responses:", responses);
    const score = Object.values(responses).reduce((total, response) => {
      return total + (response === 'oui' ? 1 : 0);
    }, 0);
    setFinalScore(score);
  };

  if(arabic){
    return (
      <>
      <Csidebar/>
      <div className="main-wrapper">
        <Header />
        <div className="page-wrapper">
          <div className="content">
            <Breadcrumb title={"نوم"} arabic={true}/> 
            <div className="container" >
              <div className="top soutien-container-title">
                <p className='text-center'>تقييم جودة النوم</p>
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
                          <Link className="text-decoration-none" href="#" onClick={(e) => { e.preventDefault(); backFunction(); }}>
                            <span className="cursor-pointer text-decoration-none text-[#2E37A4] text-[15px]">السابق</span>
                          </Link>
                        </li>
                        <li className="ms-auto text-[#2E37A4] text-[15px]">{currentTestIndex + 1} / {tests.length}</li>
                      </ul>
                    </div>
    
                    <div className="mb-4 d-flex flex-column align-items-center">
                      <h6 className='test-title'>{currentTest.title}</h6>
                      {currentTest.parts.map((part, partIndex) => (
                        <div key={partIndex} className="soutien-questions">
                          <h6 className='part-title'>{part.title}</h6>
                          {part.choix.map((choice, choiceIndex) => (
                            <div className='soutien-question' key={choiceIndex}>
                              
                               <div className='options'>
                                <label >
                                  <input type="radio" name={`choice-${currentTestIndex}-${partIndex}-${choiceIndex}`} value="oui" onChange={() => handleChoice(currentTestIndex, partIndex, choiceIndex, 'oui')} checked={responses[`choice-${currentTestIndex}-${partIndex}-${choiceIndex}`] === 'oui'}/>
                                  نعم
                                </label>
                                <label>
                                  <input type="radio" name={`choice-${currentTestIndex}-${partIndex}-${choiceIndex}`} value="non" onChange={() => handleChoice(currentTestIndex, partIndex, choiceIndex, 'non')} checked={responses[`choice-${currentTestIndex}-${partIndex}-${choiceIndex}`] === 'non'}/>
                                  لا
                                </label>
                              </div>
                              <p>{choice}</p>
                            </div>
                          ))}
                        </div>
                      ))}
    
                      <div className="test-next-part">
                        <div className="mt-4">
                          <Link className="text-decoration-none" href="#" onClick={(e) => { e.preventDefault(); nextFunction(); }}>
                            <span className="cursor-pointer text-decoration-none text-[#2E37A4] text-[15px]">التالي {'>'}</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                )}
    
                {stage === 'completed' && (
                  <article className="soutien-blog blog-single-post">
                    <div className="container mx-auto p-4 d-flex flex-column align-items-center">
                      <h3 className="font-light my-8">شكراً لإتمام الاختبار!</h3>
                      <img
                        src="https://cdn-icons-png.freepik.com/512/6559/6559073.png"
                        alt="Logo"
                        className="w-50 my-3"
                      />
                      <Link href={{
                        pathname: "/soutien/sommeil/questions/resultat",
                        query: { finalScore },
                      }}>
                        <button className="btn-primary">نتيجة الاختبار</button>
                      </Link>
                      <Link href="/soutien">
                        <button className="btn-primary">العودة إلى الاختبارات النفسية</button>
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
          <Breadcrumb title={"Sommeil"} /> 
          <div className="container">
            <div className="top soutien-container-title">
              <p className='text-center'>Evaluation de la qualité de sommeil</p>
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
                        <Link className="text-decoration-none" href="#" onClick={(e) => { e.preventDefault(); backFunction(); }}>
                          <span className="cursor-pointer text-decoration-none text-[#2E37A4] text-[15px]">Précédent</span>
                        </Link>
                      </li>
                      <li className="ms-auto text-[#2E37A4] text-[15px]">{currentTestIndex + 1} / {tests.length}</li>
                    </ul>
                  </div>

                  <div className="mb-4 d-flex flex-column align-items-center">
                    <h6 className='test-title'>{currentTest.title}</h6>
                    {currentTest.parts.map((part, partIndex) => (
                      <div key={partIndex} className="soutien-questions">
                        <h6 className='part-title'>{part.title}</h6>
                        {part.choix.map((choice, choiceIndex) => (
                          <div className='soutien-question' key={choiceIndex}>
                            <p>{choice}</p>
                             <div className='options'>
                              <label>
                                <input type="radio" name={`choice-${currentTestIndex}-${partIndex}-${choiceIndex}`} value="oui" onChange={() => handleChoice(currentTestIndex, partIndex, choiceIndex, 'oui')} checked={responses[`choice-${currentTestIndex}-${partIndex}-${choiceIndex}`] === 'oui'}/>
                                Oui
                              </label>
                              <label>
                                <input type="radio" name={`choice-${currentTestIndex}-${partIndex}-${choiceIndex}`} value="non" onChange={() => handleChoice(currentTestIndex, partIndex, choiceIndex, 'non')} checked={responses[`choice-${currentTestIndex}-${partIndex}-${choiceIndex}`] === 'non'}/>
                                Non
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}

                    <div className="test-next-part">
                      <div className="mt-4">
                        <Link className="text-decoration-none" href="#" onClick={(e) => { e.preventDefault(); nextFunction(); }}>
                          <span className="cursor-pointer text-decoration-none text-[#2E37A4] text-[15px]">Suivant {'>'}</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              )}

              {stage === 'completed' && (
                <article className="soutien-blog blog-single-post">
                  <div className="container mx-auto p-4 d-flex flex-column align-items-center">
                    <h3 className="font-light my-8">Merci d&apos;avoir complété le test !</h3>
                    <img
                      src="https://cdn-icons-png.freepik.com/512/6559/6559073.png"
                      alt="Logo"
                      className="w-50 my-3"
                    />
                    <Link href={{
                      pathname: "/soutien/sommeil/questions/resultat",
                      query: { finalScore },
                    }}>
                      <button className="btn-primary">Résultat du test</button>
                    </Link>
                    <Link href="/soutien">
                      <button className="btn-primary">Revenir aux tests psychologiques</button>
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
