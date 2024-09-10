"use client"
import { useLanguage } from "../context/LanguageContext"
import Header from "@/components/auth/Header"
import Breadcrumb from "@/components/soutien/home/breadcrumb"
import Image from "next/image"
import PostItem from "@/components/soutien/home/PostItem"
import Csidebar from "@/components/auth/Csidebar"
const postItems_francais = [
    {
      href: "/soutien/estime",
      imgSrc: "https://img.freepik.com/free-vector/high-self-esteem-illustration_23-2148743572.jpg?t=st=1725465274~exp=1725468874~hmac=867c067e47a5c0adbb311e5cbd2a587a48503645710a5420d67a6e5b039f47eb&w=740",
      imgAlt: "Estime de soi",
      title: "Estime de soi",
      description: "Est-ce que vous avez confiance en vous-même ?"
    },
    {
      href: "/soutien/paix",
      imgSrc: "https://img.freepik.com/free-vector/post-traumatic-stress-disorder-concept-illustration_114360-3564.jpg?t=st=1725465381~exp=1725468981~hmac=16689482db9ca5ae29c39d1adf8da95ede895a195cc283ac81c94b7feca4ce8e&w=740",
      imgAlt: "Paix",
      title: "Bonheur",
      description: "Êtes-vous en paix avec vous-même ?"
    },
    {
      href: "/soutien/humeur",
      imgSrc: "https://img.freepik.com/free-vector/anxiety-concept-illustration_114360-8014.jpg?t=st=1725465303~exp=1725468903~hmac=a4406b85f724a87a735925831d5e118feeed46a06f8bfbafcf4cdad5b8541228&w=740",
      imgAlt: "Humeur",
      title: "Humeur",
      description: "Est-ce que votre humeur et vitalité sont équilibrées ?"
    },
    {
      href: "/soutien/sommeil",
      imgSrc: "https://img.freepik.com/free-vector/woman-sleeping-bedroom_24877-76413.jpg?t=st=1725465718~exp=1725469318~hmac=7e0fd2903a918b546d8b1cce2c52f9ffce1462ec76807ffee03b8a6404a7a58d&w=826",
      imgAlt: "Sommeil",
      title: "Sommeil",
      description: "Est-ce que votre qualité de sommeil est satisfaisante ?"
    }
  ];
  const postItems_arabe = [
    {
      href: "/soutien/estime",
      imgSrc: "https://img.freepik.com/free-vector/high-self-esteem-illustration_23-2148743572.jpg?t=st=1725465274~exp=1725468874~hmac=867c067e47a5c0adbb311e5cbd2a587a48503645710a5420d67a6e5b039f47eb&w=740",
      imgAlt: "تقدير الذات",
      title: "تقدير الذات",
      description: "هل لديك ثقة في نفسك؟"
    },
    {
      href: "/soutien/paix",
      imgSrc: "https://img.freepik.com/free-vector/post-traumatic-stress-disorder-concept-illustration_114360-3564.jpg?t=st=1725465381~exp=1725468981~hmac=16689482db9ca5ae29c39d1adf8da95ede895a195cc283ac81c94b7feca4ce8e&w=740",
      imgAlt: "سلام",
      title: "سلام",
      description: "هل أنت في سلام مع نفسك؟"
    },
    {
      href: "/soutien/humeur",
      imgSrc: "https://img.freepik.com/free-vector/anxiety-concept-illustration_114360-8014.jpg?t=st=1725465303~exp=1725468903~hmac=a4406b85f724a87a735925831d5e118feeed46a06f8bfbafcf4cdad5b8541228&w=740",
      imgAlt: "مزاج",
      title: "مزاج",
      description: "هل مزاجك وحيويتك متوازنان؟"
    },
    {
      href: "/soutien/sommeil",
      imgSrc: "https://img.freepik.com/free-vector/woman-sleeping-bedroom_24877-76413.jpg?t=st=1725465718~exp=1725469318~hmac=7e0fd2903a918b546d8b1cce2c52f9ffce1462ec76807ffee03b8a6404a7a58d&w=826",
      imgAlt: "نوم",
      title: "نوم",
      description: "هل جودة نومك مرضية؟"
    }
];

var postItems;

export default function Page() {
const {arabic}=useLanguage();
  if(arabic){
    postItems=postItems_arabe
  }else{
    postItems=postItems_francais
  }

  if(arabic){
    return (
      <>
      <Csidebar/>
      <div className="main-wrapper">
          <Header />
          
          <div className="page-wrapper">
              <div className="content">
                  <Breadcrumb title={""}  arabic={true} showbutt/>
                  <div className="container">
                      <div className="top soutien-container-title" >
                          <p className='text-center'>مرحباً بك في فضاء صحتك النفسية</p>
                      </div>
                      <div className="middle">
                          <article className="soutien-blog blog-single-post">
                              <h5 className="text-center"  dir="rtl">
                                  الدعم النفسي 
                              </h5>
                              <div className="clearfix">
                                  <Image
                                      alt="#"
                                      src= "https://img.freepik.com/free-vector/mental-health-flat-concept-with-people-dealing-with-psychological-problems-vector-illustration_1284-80677.jpg?t=st=1725465048~exp=1725468648~hmac=927c5d4beba7e52a20f10a0c9f6ce618a3da649854ca5b1bca0a6d80cb760921&w=1060"
                                      className="img-fluid my-5 mx-auto d-block"
                                      width={500}
                                      height={500}
                                  />
                                  
                              </div>
                              <div className="blog-content">
                                  <p className='text-justify'  dir="rtl">
                                      خذ لحظة لنفسك، لرفاهيتك. اختباراتنا التفاعلية مصممة لمساعدتك في استكشاف حالتك العاطفية بطريقة لطيفة وإيجابية.
                                      من خلال الإجابة على بعض الأسئلة البسيطة، ستحصل على رؤى قيمة حول صحتك النفسية ونصائح مخصصة لتحسين شعورك اليومي.
                                      يمكن أن يكون لهذه الخطوة الصغيرة تأثير كبير على جودة حياتك.
                                  </p>
                                  <p  className='text-justify' dir="rtl">
                                      ابدأ الآن واكتشف طرقًا لحياة أكثر توازنًا وازدهارًا. أنت تستحق أن تشعر بالراحة.
                                  </p>
                              </div>
                          </article>
                      </div>
                      <div className="bottom" >
                          <article className="soutien-blog blog-single-post">
                              <h5 className="relat-head" dir="rtl">
                                  اختبارات نفسية
                              </h5>
                              <ul className="latest-posts" >
                                  {postItems.map((item, index) => (
                                      <PostItem
                                          key={index}
                                          href={item.href}
                                          imgSrc={item.imgSrc}
                                          imgAlt={item.imgAlt}
                                          title={item.title}
                                          description={item.description}
                                          arabic={true}
                                      />
                                  ))}
                              </ul>
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
            <Breadcrumb title={""}   showbutt/>
            <div class="container">
                <div class="top soutien-container-title">
                    <p className=' text-center'> Bienvenue dans votre espace Bien Etre   </p>
                </div>
                <div class="middle">
                <article className="soutien-blog blog-single-post">
                            <h5 className="relat-head ">
                            Soutien psychologique et bien être
                            </h5>
                            <div className=" clearfix ">
                            
                            <Image
                                alt="#"
                                src= "https://img.freepik.com/free-vector/mental-health-flat-concept-with-people-dealing-with-psychological-problems-vector-illustration_1284-80677.jpg?t=st=1725465048~exp=1725468648~hmac=927c5d4beba7e52a20f10a0c9f6ce618a3da649854ca5b1bca0a6d80cb760921&w=1060"
                                className="img-fluid my-5  mx-auto d-block"
                                width={500}
                                height={500}
                             />

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
                <div className='footer'>
                <p className='text-center text-[5px] my-20'>Soutien Psychologique</p>
                </div>
            </div>
            </div>
         </div>
      
    </div>
    </>
  )
}
