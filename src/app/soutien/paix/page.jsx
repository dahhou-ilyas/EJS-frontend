import Header from '../../../components/Header'
import Link from "next/link";
import Image from "next/image";

export default function Paix() {

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
                                        <Link className={"text-decoration-none text-[#2E37A4]"} href="/soutien">Soutien Psychologique </Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <i className="feather-chevron-right">
                                            </i>
                                    </li>
                                    <li className="breadcrumb-item active">Paix</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className='grid place-items-center'>
                    <div className="soutien-container-title">
                        <div className="row">
                            
                                <p className=' text-center'>
                                Evaluation de la Paix Intérieure  </p>
                            
                        </div>
                    </div>
    
    
                    <div className="row">
                        <div className="col">
                            <article className="soutien-blog blog-single-post">
                                <p className=" text-justify ">
                                Plongez dans votre tranquillité intérieure pour comprendre et maîtriser votre niveau d'anxiété. </p>
                                <div className="blog-info clearfix">
                                <div className='d-flex flex-column align-items-center'>
                                    <Image
                                        alt="#"
                                        src="https://resize.elle.fr/article/var/plain_site/storage/images/love-sexe/news/stress-inquietude-ou-anxiete-voici-comment-les-differencier-4043472/97177063-1-fre-FR/Stress-inquietude-ou-anxiete-Voici-comment-les-differencier-!.jpg"
                                        className=" img-fluid my-5 "
                                        width= {350} height= {350}
                                        />
                                        <Link className={"start-test"} href={"/soutien/paix/questions" }>Commencer le test</Link>
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
    
