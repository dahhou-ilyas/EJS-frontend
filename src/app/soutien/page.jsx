import Header from "@/components/Header"
import Breadcrumb from "@/components/soutien/home/breadcrumb"
import Image from "next/image"
import Link from "next/link"
import PostItem from "@/components/soutien/home/PostItem"

const postItems = [
    {
      href: "/soutien/estime",
      imgSrc: "https://www.ciao.ch/media/topics/estime-de-soi.png.767x576_q85.png",
      imgAlt: "Estime de soi",
      title: "Estime de soi",
      description: "Est-ce que Vous Avez Confiance en Vous-Même ?"
    },
    {
      href: "/soutien/paix",
      imgSrc: "https://resize.elle.fr/article/var/plain_site/storage/images/love-sexe/news/stress-inquietude-ou-anxiete-voici-comment-les-differencier-4043472/97177063-1-fre-FR/Stress-inquietude-ou-anxiete-Voici-comment-les-differencier-!.jpg",
      imgAlt: "Paix",
      title: "Paix",
      description: "Êtes-vous en Paix avec Vous-Même ?"
    },
    {
      href: "/soutien/humeur",
      imgSrc: "https://static.vecteezy.com/system/resources/previews/011/411/660/non_2x/man-felling-depression-under-moral-stressful-sad-feel-guilty-need-attention-help-sitting-alone-vector.jpg",
      imgAlt: "Humeur",
      title: "Humeur",
      description: "Est-ce que Votre Humeur et Vitalité sont Équilibrées ?"
    },
    {
      href: "/soutien/sommeil",
      imgSrc: "https://blog.reseau-morphee.fr/wp-content/uploads/sites/2/2021/12/mieux_dormir_pour_mieux_vivre-1130x580.jpg",
      imgAlt: "Sommeil",
      title: "Sommeil",
      description: "Est-ce que Votre Qualité de Sommeil Est Satisfaisante ?"
    }
  ];

export default function page() {
  return (
    <div className="main-wrapper">
         <Header />
         <div className="page-wrapper">
            <div className="content">
            <Breadcrumb title={""}/>
            <div class="container">
                <div class="top soutien-container-title">
                    <p className=' text-center'> Bienvenue dans votre espace Bien Etre   </p>
                </div>
                <div class="middle">
                <article className="soutien-blog blog-single-post">
                            <h5 className="relat-head ">
                            Soutien Psychologique et Bien être
                            </h5>
                            <div className="blog-info clearfix">
                            
                            <Image
                                alt="#"
                                src='https://itsocial.fr/wp-content/uploads/2021/09/Capture-d%E2%80%99%C3%A9cran-2021-09-14-093859.jpg'
                                className="img-fluid my-5"
                                width={500}
                                height={500}
                                />
                            <div className="post-right read-blks">
                                <Link className={"text-decoration-none"} href="/">Lire plus </Link>
                            </div>
                            </div>
                            <div className="blog-content">
                            <p className='text-justify'>
                            Prenez un moment pour vous, pour votre bien-être. Nos tests interactifs sont conçus pour vous aider à explorer votre état émotionnel de manière douce et positive.
                             En répondant à quelques questions simples, vous obtiendrez des insights précieux sur votre santé mentale et des conseils personnalisés pour vous sentir mieux au quotidien.
                              Ce petit geste peut avoir un grand impact sur votre qualité de vie.
                              </p>
                              <p>
                               Commencez dès maintenant et découvrez des chemins vers une vie plus épanouie et équilibrée. Vous méritez de vous sentir bien.
                            </p>
                            </div>

                        </article>
                </div>
                <div class="bottom">
                    <article className="soutien-blog blog-single-post">
                         <h5 className="relat-head ">
                                Tests Psychologiques  
                          </h5>

                          <ul className="latest-posts">
                                {postItems.map((item, index) => (
                                <PostItem
                                    key={index}
                                    href={item.href}
                                    imgSrc={item.imgSrc}
                                    imgAlt={item.imgAlt}
                                    title={item.title}
                                    description={item.description}
                                />
                                ))}
                            </ul>
                    </article>
                </div>
            </div>
            </div>
         </div>
      
    </div>
  )
}
