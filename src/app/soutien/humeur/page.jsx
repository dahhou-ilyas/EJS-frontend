import Header from '../../../components/Header'
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from '@/components/soutien/home/breadcrumb';

export default function Humeur() {

    return (
  
        <div className="main-wrapper">
        <Header />
        <div className="page-wrapper">
           <div className="content">
           <Breadcrumb title={"Humeur"} /> 
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
                    </div>
               </article>
               </div>
       </div>
   </div>
   </div>
   </div>
 
      )
    }
    
