"use client"
import Header from '../../../components/Header'
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from '@/components/soutien/home/breadcrumb';
import { useLanguage } from '@/app/context/LanguageContext';


export default function Sommeil() {
    const {arabic}=useLanguage();   
    if (arabic){
        return (
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
                                                src="https://blog.reseau-morphee.fr/wp-content/uploads/sites/2/2021/12/mieux_dormir_pour_mieux_vivre-1130x580.jpg"
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
        );
        
    }
    return (

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
                                        src="https://blog.reseau-morphee.fr/wp-content/uploads/sites/2/2021/12/mieux_dormir_pour_mieux_vivre-1130x580.jpg"
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
  
        
      )
    }
    
