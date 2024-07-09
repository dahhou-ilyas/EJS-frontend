import Header from '../../../components/Header'
import Link from "next/link";
import Image from "next/image";

export default function Estime() {

    return (
  
        <div className="main-wrapper">
            {/* Header */}
            <Header />
          {/*    <Sidebar id='menu-item11' id1='menu-items11' activeClassName='blog-grid'/>
           Sidebar */}
            {/* Page Wrapper */}
            
            <div className="page-wrapper">
                <div className="content">
                    {/* Page Header */}
                    <div className="page-header">
                        <div className="row">
                            <div className="col-sm-12">
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link className={"text-decoration-none"} href="/soutien">Soutien Psychologique </Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <i className="feather-chevron-right">
                                            </i>
                                    </li>
                                    <li className="breadcrumb-item active">Estime de soi</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="good-morning-blk">
                        <div className="row">
                            <div className="morning-user">
                                <h2 className='ml-3 text-center'>
                                Evaluation de l'Estime de soi   </h2>
                            </div>
                        </div>
                    </div>
    
    
                    <div className="row">
                        <div className="col">
                            <div className="blog-view">
                            <article className="blog blog-single-post">
                                <p className=" text-center	 ">
                                      L’estime de soi est définie comme le jugement ou l’évaluation que l’on fait de soi-même, de sa valeur
                                    personnelle. De façon plus simple, l’estime de soi peut-être également assimilée à l’affirmation de soi. L’estime
                                    de soi est un facteur essentiel dans la performance sportive. </p>
                                <p className=" text-[#2e37a4] text-center ">    En répondant à ce test, vous pourrez ainsi obtenir une évaluation de votre estime de soi. </p>
                                <div className="blog-info clearfix">
                                <div className='d-flex flex-column align-items-center'>
                                    <Image
                                        alt="#"
                                        src="https://www.ciao.ch/media/topics/estime-de-soi.png.767x576_q85.png"
                                        className=" img-fluid my-5 "
                                        width= {350} height= {350}
                                        />
                                        <Link className={"text-decoration-none"} href={"/soutien/estime/questions" }>Commencer le test</Link>
                                </div>
                                </div>
                             
    
                            </article>
                        </div>
                        </div>                
                </div>
                </div>
            </div>
        </div>
        
      )
    }
    
