"use client";
import "../../assets/css/style.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import Sidebar from "../../components/espaceMedecin/Sidebar1";
import { morning_img_02, bu, gp, tv, cb ,i} from "../../components/espaceMedecin/imagepath";
import { useRouter } from "next/navigation";
import { Card } from "antd";
import Live_list from "../../components/espaceMedecin/Live_list";
import * as bootstrap from "bootstrap";

// const appointments = [
//   { day: "Monday", hour: "10:00 AM", patient: "John Doe" },
//   { day: "Wednesday", hour: "2:00 PM", patient: "Jane Smith" },
//   { day: "Friday", hour: "1:00 PM", patient: "Bob Johnson" },
//   { day: "Monday", hour: "10:00 AM", patient: "John Doe" },
//   { day: "Monday", hour: "10:00 AM", patient: "John Doe" },
//   { day: "Monday", hour: "10:00 AM", patient: "John Doe" },
// ];

const Home = () => {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [news, setNews] = useState([]);

  const [favoritePatients, setFavoritePatients] = useState(null);
  const token = localStorage.getItem('access-token');

  useEffect(() => {
    window.bootstrap = bootstrap;
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(
      (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
    );
    // getAllHealthNews();
    getFavoritePatients();
    // getMedecinEvaluation();
  }, []);

  // const getAllHealthNews = () => {
  //   //pub_488678f840dc44dfcd2ec89a5c7a1c935d490
  //   // pub_49337535ef755132b13ece3e4b4f7ccf6a335
  //   axios
  //     .get("https://newsdata.io/api/1/news?apikey=pub_49337535ef755132b13ece3e4b4f7ccf6a335&q=health&country=fr,ma&language=en,fr&category=health ")
  //     .then((res) => {
  //       setNews(res.data.results);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const getFavoritePatients = () => {
    axios.get('http://localhost:8080/jeune/favorite-patients', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => {
      setFavoritePatients(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  }

  // const getMedecinEvaluation = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:8080/medecin/evaluation');
  //     const data = response.data;
  //     let newRating = 0;
  //     for (let i = 1; i <= 5; i++) {
  //       if (data[i] !== null && data[i] !== "") {
  //         newRating++;
  //       }
  //     }
  //     setRating(newRating);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // const renderStars = (rating) => {
  //   const stars = [];
  //   for (let i = 0; i < 5; i++) {
  //     if (i < rating) {
  //       stars.push(<i key={i} className="bx bxs-star" style={{ color: "yellow", fontSize: "24px", marginTop: "20px" }}></i>);
  //     } else {
  //       stars.push(<i key={i} className="bx bxs-star" style={{ color: "grey", fontSize: "24px" }}></i>);
  //     }
  //   }
  //   return stars;
  // };

  return (
    <div id="root">
      <Sidebar activeClassName="dashboard" />
      <div className="page-wrapper">
        <div className="content">
          {/* Page Header */}
          <div className="page-header" style={isSmallScreen ? { marginBottom: "70px" } : {}}>
            <div className="row">
              <div className="col-sm-12">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                  <Link href="/espaceMedecin">Page d&apos;accueil</Link>
                  </li>
                  </ul>
              </div>
            </div>
          </div>
          {/* Page Header */}

          <div className="topSection">
            {/* Bonjour Section */}
            <div className="good-morning-blk">
              <div className="row">
                <div className="col-md-6">
                  <div className="morning-user">
                    <h2>
                      Bonjour, <span>Dr. El Amrani Mohamed </span>
                    </h2>
                    <p>Bonne journée au travail</p>
                    <div style={{ display: "inline-block", marginTop: "-4px" }}>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 position-blk">
                  <div className="morning-img z-index-0">
                    {/* <Image src={morning_img_02} alt="" /> */}
                  </div>
                </div>
              </div>
            </div>
            {/* Bonjour Section */}
          </div>
          {/* <p style={{ fontWeight: "550" }}>Accès Rapide</p> */}
          <div className="d-flex flex-row mt-4">
          <i className="fa fa-rocket" style={{marginTop :'5px' ,  color : '#2E37A4' , type : 'solide'}}  />
          <p className="mx-2" style={{ fontWeight: '550' }}>Accès Rapide</p>
          </div>
          <div className="doctor-list-blk" style={{ width: "100%" }}>
          <div className="row d-flex justify-content-center">
          <div className="col-sm-4 col-md-2">
            <div className="doctor-widget border-right-bg">
                <div className="doctor-box-icon flex-shrink-0">
                    <img src={bu.src} alt="" />
                </div>
                <div className="doctor-content dash-count flex-grow-1">
                    <Link href="/espaceMedecin/MonProfil">
                        <h4 style={{ color: "#333448", fontSize: "18px" , fontWeight: "700" }}>Mon Profil</h4>
                    </Link>
                </div>
            </div>
        </div>
        <div className="col-sm-4 col-md-2">
            <div className="doctor-widget border-right-bg">
                <div className="doctor-box-icon flex-shrink-0">
                    <img src={gp.src} alt="" />
                </div>
                <div className="doctor-content dash-count flex-grow-1">
                    <Link href="/espaceMedecin/MesPatients">
                        <h4 style={{ color: "#333448", fontSize: "18px" , fontWeight: "700" }}>Mes Patients</h4>
                    </Link>
                </div>
            </div>
        </div>
        
        <div className="col-sm-4 col-md-2" >
            <div className="doctor-widget border-right-bg">
                <div className="doctor-box-icon flex-shrink-0">
                    <img src={cb.src} alt="" />
                </div>
                <div className="doctor-content dash-count flex-grow-1">
                    <Link href="/chatbot">
                        <h4 style={{ color: "#333448", fontSize: "18px" , fontWeight: "700" }}>Chat Bot</h4>
                    </Link>
                </div>
            </div>
        </div>
        <div className="col-sm-4 col-md-2" >
            <div className="doctor-widget border-right-bg" >
                <div className="doctor-box-icon flex-shrink-0" >
                    <img src={tv.src} alt="" />
                </div>
                <div className="doctor-content dash-count flex-grow-1">
                    <Link href="/TeleExpertise">
                        <h4 style={{ color: "#333448", fontSize: "18px" , fontWeight: "700" }}>Télé-Expertise</h4>
                    </Link>
                </div>
            </div>
        </div>
        <div className="col-sm-4 col-md-2" >
            <div className="doctor-widget">
                <div className="doctor-box-icon flex-shrink-0">
                    <img src={i.src} alt="" />
                </div>
                <div className="doctor-content dash-count flex-grow-1">
                    <Link href="/IES">
                        <h4 style={{ color: "#333448", fontSize: "18px" , fontWeight: "700" }}>IES</h4>
                    </Link>
                </div>
            </div>
        </div>
    </div>
</div>

          <div>
            <div></div>
            <div></div>
          </div>
          <p style={{ marginTop: "3rem", fontWeight: "550" }}></p>
          <div className="row d-flex flex-column flex-xl-row">
            <div >
              {/* <p style={{ fontWeight: '550' }}>Rendez-vous</p> */}
              {/* <div className="d-flex flex-row mt-4">
              <i className="fa fa-calendar" style={{marginTop :'5px' ,  color : '#2E37A4' , type : 'solide'}}  />
                <p className="mx-2" style={{ fontWeight: '550' }}>Rendez-vous</p>
              </div>
              <Card className="custom-card" style={{ height: "600px", display: 'flex', justifyContent: 'center', alignItems: 'center' , width:"700px" }}>
                <div className="card-bodyy" >
                  <h5 className="card-title">À venir</h5>
                  {appointments.map((appointment, index) => (
                    <div key={index} className="appointment">
                      <p className="appointment-details">
                        <span><strong>Jour:</strong> {appointment.day}</span>
                        <span><strong>Heure:</strong> {appointment.hour}</span>
                        <span><strong>Nom du patient:</strong> {appointment.patient}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
              <Card className="custom-card" style={{ height: "600px", display: 'flex', justifyContent: 'center', alignItems: 'center', width:"700px" }}>
                <div className="card-bodyy">
                  <h5 className="card-title">Dernières consultations</h5>
                  {appointments.map((appointment, index) => (
                    <div key={index} className="appointment">
                      <p className="appointment-details">
                        <span><strong>Jour:</strong> {appointment.day}</span>
                        <span><strong>Heure:</strong> {appointment.hour}</span>
                        <span><strong>Nom du patient:</strong> {appointment.patient}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </Card> */}
               <div className="row d-flex flex-column flex-xl-row">
            <div className="top-left-content">
              <div className="d-flex flex-row mt-4">
                <i className="fa fa-newspaper-o" style={{ marginTop: '5px', color: '#2E37A4', type: 'solid' }} />
                <p className="mx-2" style={{ fontWeight: '550' }}>A la une</p>
              </div>
              <div className="content" style={{marginRight:'150px' , marginBottom:'60px' }}>
                <Live_list toDashborad="/espaceMdecin" />
              </div>
            </div>
          </div>
              <div className="d-flex flex-row mt-4">
              <i className="fa fa-bookmark" style={{marginTop :'5px' ,  color : '#2E37A4' , type : 'solide'}}  />
                <p className="mx-2" style={{ fontWeight: '550' }}>Patients épinglés</p>
              </div>
              <Card className="custom-card" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' , width:"700px" }}>
                {
                  favoritePatients && favoritePatients.map((item, index) => (
                    <div className="card-bodyy" key={index}>
                      <div className="card">
                        <div className="row no-gutters">
                            <div className="col-sm-5">
                                <img className="card-img" src={ item[5] } alt=""/>
                            </div>
                            <div className="col-sm-7">
                                <div className="card-body">
                                    <h4 className="card-title">{ item[2] + ' ' + item[1] }</h4>
                                    <p className="card-text" style={{ width: '300px' }}>{ item[3] }, { item[4] } ans</p>
                                    <a href={'/MesPatients/DossierMedical/' + item[0]} className="btn btn-primary">Consulter le dossier médical</a>
                                </div>
                            </div>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </Card>
            </div>
            {/* <div className="col-sm-6" style={{ marginLeft: '-50px' }}>
              <div className="d-flex flex-row mt-4">
              <i className="fa fa-newspaper-o" style={{marginTop :'5px' ,  color : '#2E37A4' , type : 'solide'}}  />
                <p className="mx-2" style={{ fontWeight: '550' }}>A la une</p>
              </div>
              {news.slice(0, 10).length > 0 ? (
                news.slice(0, 10).map((article, index) => (
                  (article.image_url != null) ?
                  <Card key={index} className="custom-card " style={{ height: "400px", display: 'flex', justifyContent: 'center', alignItems: 'center', width:"800px" }}>
                    <div className="card-bodyy" style={{ display: 'flex', flexDirection: 'row' }}>
                      <div><img style={{ width: '350px', paddingRight: '10px' }} src={ article.image_url } alt="" /></div>
                      <div>
                        <h5 className="card-title">{article.title}</h5>
                        <p className="card-text">{article.description}</p>
                        <a href={article.link} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                          Lire la suite
                        </a>
                      </div>
                    </div> */}
                  {/* </Card>
                  : null
                ))
              ) : (
                <p>Aucune nouvelle trouvée.</p>
              )}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
