import Header from '../../../components/Header'
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from '@/components/soutien/home/breadcrumb';

export default function Estime() {

    return (
  
            <div className="main-wrapper">
                 <Header />
                 <div className="page-wrapper">
                    <div className="content">
                    <Breadcrumb title={"Estime de soi"} /> 
                    <div class="container">
                        <div class="top soutien-container-title">
                            <p className=' text-center'>Evaluation de l'Estime de soi   </p>
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
                                    src="https://www.ciao.ch/media/topics/estime-de-soi.png.767x576_q85.png"
                                    className=" img-fluid my-5 "
                                    width= {350} height= {350}
                                    />
                                    <Link className={"start-test"} href={"/soutien/estime/questions" }>Commencer le test</Link>
                            </div>
                        </article>
                        </div>
                </div>
            </div>
            </div>
            </div>
            

  
      )
    }
