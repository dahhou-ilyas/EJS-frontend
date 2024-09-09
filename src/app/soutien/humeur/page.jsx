"use client"
import Header from '@/components/auth/Header';
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from '@/components/soutien/home/breadcrumb';
import { useLanguage } from '@/app/context/LanguageContext';
import Csidebar from '@/components/auth/Csidebar';

export default function Humeur() {
    const {arabic}=useLanguage();   
  if(arabic){
    return (
      <>
      <Csidebar/>
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
                        src='https://img.freepik.com/free-vector/anxiety-concept-illustration_114360-8014.jpg?t=st=1725465303~exp=1725468903~hmac=a4406b85f724a87a735925831d5e118feeed46a06f8bfbafcf4cdad5b8541228&w=740'
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
           <Breadcrumb title={"Humeur"}   showbutt/> 
           <div class="container">
               <div class="top soutien-container-title">
                   <p className=' text-center'>   Evaluation de l&apos;Humeur et de la Vitalité   </p>
               </div>
               <div class="middle">
               <article className="soutien-blog blog-single-post">
                          
                   <p className=" text-justify	 ">
                   Explorez votre humeur et découvrez des moyens de retrouver votre vitalité émotionnelle pour une vie plus équilibrée.
                    </p>
                    <div className='d-flex flex-column align-items-center'>
                                    <Image
                                        alt="#"
                                        src='https://img.freepik.com/free-vector/anxiety-concept-illustration_114360-8014.jpg?t=st=1725465303~exp=1725468903~hmac=a4406b85f724a87a735925831d5e118feeed46a06f8bfbafcf4cdad5b8541228&w=740'
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
   </>
      )
    }
    
