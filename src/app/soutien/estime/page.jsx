"use client"
import Header from '@/components/auth/Header'
import { useLanguage } from '@/app/context/LanguageContext';
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from '@/components/soutien/home/breadcrumb';
import Csidebar from '@/components/auth/Csidebar';

export default function Estime() {
    const { arabic } = useLanguage();

    if(arabic){
        return (
            <>
            <Csidebar/>
            <div className="main-wrapper">
                <Header />
                <div className="page-wrapper">
                    <div className="content">
                        <Breadcrumb title={"تقدير الذات"} arabic={true} showbutt /> 
                        <div className="container" >
                            <div className="top soutien-container-title" >
                                <p className=' text-center'>تقييم تقدير الذات</p>
                            </div>
                            <div className="middle" >
                                <article className="soutien-blog blog-single-post" dir='rtl'>
                                    <p className="text-justify" >
                                        يُعرّف تقدير الذات على أنه الحكم أو التقييم الذي يقوم به الشخص لنفسه، لقيمته الشخصية. بشكل أكثر بساطة، يمكن أيضًا تشبيه تقدير الذات بتأكيد الذات. يعتبر تقدير الذات عاملاً أساسيًا في الأداء الرياضي.
                                    </p>
                                    <p className="text-justify">
                                        من خلال الإجابة على هذا الاختبار، ستتمكن من الحصول على تقييم لتقديرك لذاتك.
                                    </p>
                                    <div className='d-flex flex-column align-items-center'>
                                        <Image
                                            alt="#"
                                            src="https://img.freepik.com/free-vector/high-self-esteem-illustration_23-2148743572.jpg?t=st=1725465274~exp=1725468874~hmac=867c067e47a5c0adbb311e5cbd2a587a48503645710a5420d67a6e5b039f47eb&w=740"
                                            className="img-fluid my-5"
                                            width={350} height={350}
                                        />
                                        <Link className={"start-test"} href={"/soutien/estime/questions"}>بدء الاختبار</Link>
                                        <a className={"start-test"} href="/tests-psycho/echelle-estime-de-soi-de-rosenberg-arabe.pdf" download>تحميل الاختبار</a>
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


    return (
  
        <>
        <Csidebar/>
            <div className="main-wrapper">
                 <Header />
                 <div className="page-wrapper">
                    <div className="content">
                    <Breadcrumb title={"Estime de soi"} showbutt /> 
                    <div class="container">
                        <div class="top soutien-container-title">
                            <p className=' text-center'>Evaluation de l&apos;Estime de soi   </p>
                        </div>
                        <div class="middle">
                        <article className="soutien-blog blog-single-post">
                                   
                            <p className=" text-justify	 ">
                                L’estime de soi est définie comme le jugement ou l’évaluation que l’on fait de soi-même, de sa valeur
                                personnelle. De façon plus simple, l’estime de soi peut-être également assimilée à l’affirmation de soi. L’estime
                                de soi est un facteur essentiel dans la performance sportive. </p>
                            <p className="  text-justify ">    En répondant à ce test, vous pourrez ainsi obtenir une évaluation de votre estime de soi. </p>
                            <div className='d-flex flex-column align-items-center'>
                                <Image
                                    alt="#"
                                    src="https://img.freepik.com/free-vector/high-self-esteem-illustration_23-2148743572.jpg?t=st=1725465274~exp=1725468874~hmac=867c067e47a5c0adbb311e5cbd2a587a48503645710a5420d67a6e5b039f47eb&w=740"
                                    className=" img-fluid my-5 "
                                    width= {350} height= {350}
                                    />
                                    <Link className={"start-test"} href={"/soutien/estime/questions" }>Commencer le test</Link> 
                                    <a className={"start-test"} href="/tests-psycho/echelle-estime-de-soi-de-rosenberg.pdf" download> Télécharger le test</a>

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
