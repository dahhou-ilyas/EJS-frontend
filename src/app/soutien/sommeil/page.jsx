import Header from '../../../components/Header'
import Link from "next/link";
import Image from "next/image";

export default function Sommeil() {

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
                                    <li className="breadcrumb-item active">Sommeil</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="good-morning-blk">
                        <div className="row">
                            <div className="morning-user">
                                <h2 className='ml-3 text-center'>
                                Evaluation de la qualité de sommeil
                                </h2>
                            </div>
                        </div>
                    </div>
    
    
                    <div className="row">
                        <div className="col">
                            <div className="blog-view">
                            <article className="blog blog-single-post">
                                <h6 className=" text-[#2e37a4] text-center ">
                                Évaluez votre sommeil pour mieux comprendre ses impacts sur votre bien-être quotidien et trouver des solutions pour améliorer votre repos.   </h6>
                                <div className="blog-info clearfix">
                                <div className='d-flex flex-column align-items-center'>
                                    <Image
                                        alt="#"
                                        src="https://blog.reseau-morphee.fr/wp-content/uploads/sites/2/2021/12/mieux_dormir_pour_mieux_vivre-1130x580.jpg"
                                        className=" img-fluid my-5 "
                                        width= {350} height= {350}
                                        />
                                        <Link className={"text-decoration-none"} href={"/soutien/sommeil/questions" }>Commencer le test</Link>
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
    
