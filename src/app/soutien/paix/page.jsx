"use client"
import Header from '@/components/auth/Header';
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from '@/components/soutien/home/breadcrumb';
import { useLanguage } from '@/app/context/LanguageContext';
import Csidebar from '@/components/auth/Csidebar';


export default function Paix() {
    const {arabic}=useLanguage();   
if (arabic){
    return (
  <>
  <Csidebar/>
        <div className="main-wrapper">
                 <Header />
                 <div className="page-wrapper">
                    <div className="content">
                    <Breadcrumb title={"سلام"} showbutt arabic={true}/> 
                    <div class="container" >
                        <div class="top soutien-container-title">
                            <p className=' text-center'>تقييم السلام الداخلي   </p>
                        </div>
                        <div class="middle">
                        <article className="soutien-blog blog-single-post" dir='rtl'>
                                <p className=" text-center  ">
                                غمر في هدوئك الداخلي لفهم والسيطرة على مستوى القلق لديك </p>
                                <div className="clearfix">
                                <div className='d-flex flex-column align-items-center'>
                                    <Image
                                        alt="#"
                                        src="https://img.freepik.com/free-vector/post-traumatic-stress-disorder-concept-illustration_114360-3564.jpg?t=st=1725465381~exp=1725468981~hmac=16689482db9ca5ae29c39d1adf8da95ede895a195cc283ac81c94b7feca4ce8e&w=740"
                                        className=" img-fluid my-5 "
                                        width= {350} height= {350}
                                        />
                                        <Link className={"start-test"} href={"/soutien/paix/questions" }>ابدأ الاختبار</Link>
                                        <a className={"start-test"} href="/tests-psycho/had-arabe.pdf" download> تحميل الاختبار</a>

                                </div>
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
                    <Breadcrumb title={"Paix"} showbutt/> 
                    <div class="container">
                        <div class="top soutien-container-title">
                            <p className=' text-center'>Evaluation de la Paix Intérieure   </p>
                        </div>
                        <div class="middle">
                        <article className="soutien-blog blog-single-post">
                                <p className=" text-justify ">
                                Plongez dans votre tranquillité intérieure pour comprendre et maîtriser votre niveau d&apos;anxiété. </p>
                                <div className="clearfix">
                                <div className='d-flex flex-column align-items-center'>
                                    <Image
                                        alt="#"
                                        src="https://img.freepik.com/free-vector/post-traumatic-stress-disorder-concept-illustration_114360-3564.jpg?t=st=1725465381~exp=1725468981~hmac=16689482db9ca5ae29c39d1adf8da95ede895a195cc283ac81c94b7feca4ce8e&w=740"
                                        className=" img-fluid my-5 "
                                        width= {350} height= {350}
                                        />
                                        <Link className={"start-test"} href={"/soutien/paix/questions" }>Commencer le test</Link>
                                        <a className={"start-test"} href="/tests-psycho/had.pdf" download> Télécharger le test</a>

                                </div>
                                </div>
                             
    
                            </article>
                        </div>
                </div>
            </div>
            </div>
            </div>
            </>
    )}