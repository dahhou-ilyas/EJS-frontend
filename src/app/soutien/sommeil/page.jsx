import Header from '../../../components/Header'
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from '@/components/soutien/home/breadcrumb';

export default function Sommeil() {

    return (

        <div className="main-wrapper">
        <Header />
        <div className="page-wrapper">
           <div className="content">
           <Breadcrumb title={"Sommeil"} /> 
           <div class="container">
               <div class="top soutien-container-title">
                   <p className=' text-center'>Evaluation de la qualité de sommeil   </p>
               </div>
               <div class="middle">
               <article className="soutien-blog blog-single-post">
                                <p className=" text-center ">
                                Évaluez votre sommeil pour mieux comprendre ses impacts sur votre bien-être quotidien et trouver des solutions pour améliorer votre repos.   </p>
                                <div className="blog-info clearfix">
                                <div className='d-flex flex-column align-items-center'>
                                    <Image
                                        alt="#"
                                        src="https://blog.reseau-morphee.fr/wp-content/uploads/sites/2/2021/12/mieux_dormir_pour_mieux_vivre-1130x580.jpg"
                                        className=" img-fluid my-5 "
                                        width= {350} height= {350}
                                        />
                                        <Link className={"start-test"} href={"/soutien/sommeil/questions" }>Commencer le test</Link>
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
    
