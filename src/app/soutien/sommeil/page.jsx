"use client"
import Header from '@/components/auth/Header';
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from '@/components/soutien/home/breadcrumb';
import { useLanguage } from '@/app/context/LanguageContext';
import Csidebar from '@/components/auth/Csidebar';


export default function Sommeil() {
    const {arabic}=useLanguage();   
    if (arabic){
        return (
            <>
            <Csidebar/>
            <div className="main-wrapper">
                <Header />
                <div className="page-wrapper">
                    <div className="content">
                        <Breadcrumb title={"نوم"} showbutt arabic={true} />
                        <div class="container">
                            <div class="top soutien-container-title">
                                <p className='text-center'>تقييم جودة النوم</p>
                            </div>
                            <div class="middle">
                                <article className="soutien-blog blog-single-post">
                                    <p className="text-center" dir='rtl'>
                                        استبيان النوم للأطفال (PSQ) هو أداة للكشف عن مشاكل النوم عند الأطفال. يُستخدم PSQ على نطاق واسع في البحث وفي الوسط السريري. يحتوي الاستبيان على 22 سؤالًا، تتضمن ثلاثة مجمعات من الأعراض: الشخير، النعاس المفرط أثناء النهار، والسلوك غير المتوقع أو فرط النشاط.
                                    </p>
                                    <div className="clearfix">
                                        <div className='d-flex flex-column align-items-center'>
                                            <Image
                                                alt="#"
                                                src="https://img.freepik.com/free-vector/woman-sleeping-bedroom_24877-76413.jpg?t=st=1725465718~exp=1725469318~hmac=7e0fd2903a918b546d8b1cce2c52f9ffce1462ec76807ffee03b8a6404a7a58d&w=826"
                                                className="img-fluid my-5"
                                                width={350}
                                                height={350}
                                            />
                                            <Link className={"start-test"} href={"/soutien/sommeil/questions"}>ابدأ الاختبار</Link>
                                            <a className={"start-test"} href="/tests-psycho/test-de-sommeil-arabe.pdf" download>تحميل الاختبار</a>
                                        </div>
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
           <Breadcrumb title={"Sommeil"} showbutt/> 
           <div class="container">
               <div class="top soutien-container-title">
                   <p className=' text-center'>Evaluation de la qualité de sommeil   </p>
               </div>
               <div class="middle">
               <article className="soutien-blog blog-single-post">
                                <p className=" text-justify ">
                                Le Questionnaire sur le sommeil pédiatrique PSQ est un outil de dépistage des problèmes de sommeil chez les enfants.  Le PSQ est largement utilisé pour la recherche et en milieu clinique. Le questionnaire comporte 22 questions, comprenant trois complexes de symptômes : le ronflement, la somnolence diurne excessive et le comportement inattentif ou hyperactif.
                               
                             </p>
                                <div className=" clearfix">
                                <div className='d-flex flex-column align-items-center'>
                                    <Image
                                        alt="#"
                                        src="https://img.freepik.com/free-vector/woman-sleeping-bedroom_24877-76413.jpg?t=st=1725465718~exp=1725469318~hmac=7e0fd2903a918b546d8b1cce2c52f9ffce1462ec76807ffee03b8a6404a7a58d&w=826"
                                        className=" img-fluid my-5 "
                                        width= {350} height= {350}
                                        />
                                        <Link className={"start-test"} href={"/soutien/sommeil/questions" }>Commencer le test</Link>
                                        <a className={"start-test"} href="/tests-psycho/echelle-estime-de-soi-de-rosenberg.pdf" download>Télécharger le test</a>
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
    
