"use client"
import Header from '../../../components/Header'
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from '@/components/soutien/home/breadcrumb';
import { useLanguage } from '@/app/context/LanguageContext';

export default function Humeur() {
    const {arabic}=useLanguage();   
  if(arabic){
    return (
        <div className="main-wrapper">
          <Header />
          <div className="page-wrapper">
            <div className="content">
              <Breadcrumb title={"تقييم المزاج والحيوية"}   arabic={true} showbutt/>
              <div className="container">
                <div className="top soutien-container-title">
                  <p className='text-center'>تقييم المزاج والحيوية</p>
                </div>
                <div className="middle">
                  <article className="soutien-blog blog-single-post">
                    <p className="text-justify">
                      استكشف مزاجك واكتشف طرقًا لاستعادة حيويتك العاطفية لحياة أكثر توازنًا.
                    </p>
                    <div className='d-flex flex-column align-items-center'>
                      <Image
                        alt="Illustration de dépression"
                        src='https://static.vecteezy.com/system/resources/previews/011/411/660/non_2x/man-felling-depression-under-moral-stressful-sad-feel-guilty-need-attention-help-sitting-alone-vector.jpg'
                        className="img-fluid my-5"
                        width={350}
                        height={350}
                      />
                      <Link className={"start-test"} href={"/soutien/humeur/questions"}>ابدأ الاختبار</Link>
                      <a className={"start-test"} href="/tests-psycho/had-arabe.pdf" download>تحميل الاختبار</a>
                      </div>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}
    return (
  
        <div className="main-wrapper">
        <Header />
        <div className="page-wrapper">
           <div className="content">
           <Breadcrumb title={"Humeur"}   showbutt/> 
           <div class="container">
               <div class="top soutien-container-title">
                   <p className=' text-center'>   Evaluation de l'Humeur et de la Vitalité   </p>
               </div>
               <div class="middle">
               <article className="soutien-blog blog-single-post">
                          
                   <p className=" text-justify	 ">
                   Explorez votre humeur et découvrez des moyens de retrouver votre vitalité émotionnelle pour une vie plus équilibrée.
                    </p>
                    <div className='d-flex flex-column align-items-center'>
                                    <Image
                                        alt="#"
                                        src='https://static.vecteezy.com/system/resources/previews/011/411/660/non_2x/man-felling-depression-under-moral-stressful-sad-feel-guilty-need-attention-help-sitting-alone-vector.jpg'
                                        className=" img-fluid my-5 "
                                        width= {350} height= {350}
                                        />
                                        <Link className={"start-test"} href={"/soutien/humeur/questions" }>Commencer le test</Link>
                                        <Link className={"start-test"} href="/tests-psycho/had.pdf" target="_blank" alt="test" rel="noopener noreferrer">Télécharger le test</Link>
                    </div>
               </article>
               </div>
       </div>
   </div>
   </div>
   </div>
 
      )
    }
    
