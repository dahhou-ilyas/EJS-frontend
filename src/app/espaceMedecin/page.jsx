"use client";
import "../../assets/css/style.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Sidebar from "../../components/espaceMedecin/Sidebar1";
import { bu, gp, tv, cb, i } from "../../components/espaceMedecin/imagepath";
import { useRouter } from 'next/navigation';
import { Card } from "antd";
import Live_list from "../../components/espaceMedecin/Live_list";
import { jwtDecode } from "jwt-decode";
import { SPRINGBOOT_API_URL } from "@/config";


const Home = () => {
  const router = useRouter();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [favoritePatients, setFavoritePatients] = useState(null);
  const [user, setUser] = useState(null);
  const [isMedecin,SetIsMedecin]=useState(false);
  let token = null;

  useEffect(() => {
    require("boxicons");
    token = localStorage.getItem('access-token');

    if (isTokenInvalidOrNotExist(token)) {
      router.push('/auth/medecins');
    } else {
      const decodedToken = jwtDecode(token);
      setUser(decodedToken);
      SetIsMedecin(decodedToken.claims.role=="ROLE_MEDECIN");
      getFavoritePatients(decodedToken?.claims?.id);
    }
  }, []); 

  const getFavoritePatients = (medecinId) => {
    axios.get(`${SPRINGBOOT_API_URL}/jeune/favorite/${medecinId}`, {
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

  function isTokenInvalidOrNotExist(token) {
    if (typeof token !== 'string' || token.trim() === '') {
      console.error('Token is invalid or does not exist');
      return true; 
    }
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp && decodedToken.exp < currentTime) {
        return true; 
      }
      return false; 
    } catch (error) {
      console.error("Error decoding token:", error);
      return true; 
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
                      Bonjour, <span>Dr. {user?.claims?.nom ? `${user.claims.nom} ` : ''}{user?.claims?.prenom || ''}</span>
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
          <div>
          <div className="doctor-list-blk" style={{ width: "100%"}}>
          <div className="row d-flex justify-content-center flex-wrap">
              <div className="col-6 col-sm-4 col-md-3 col-lg-2 mb-4 d-flex align-items-stretch">
                  <div className="doctor-widget  h-100 d-flex flex-column align-items-center text-center">
                      <div className="doctor-box-icon mb-2">
                          <img src={bu.src} alt="Mon Profil" className="img-fluid" />
                      </div>
                      <div className="doctor-content dash-count">
                          <Link href="/espaceMedecin/MonProfil">
                              <h4 style={{ color: "#333448", fontSize: "20px", fontWeight: "600", marginTop: "10px", letterSpacing: "0.5px" }}>
                                  Mon Profil
                              </h4>
                          </Link>
                      </div>
                  </div>
              </div>
              <div className="col-6 col-sm-4 col-md-3 col-lg-2 mb-4 d-flex align-items-stretch">
                  <div className="doctor-widget  h-100 d-flex flex-column align-items-center text-center">
                      <div className="doctor-box-icon mb-2">
                          <img src={gp.src} alt="Mes Patients" className="img-fluid" />
                      </div>
                      <div className="doctor-content dash-count">
                          <Link href="/espaceMedecin/MesPatients">
                              <h4 style={{ color: "#333448", fontSize: "20px", fontWeight: "600", marginTop: "10px", letterSpacing: "0.5px" }}>
                                  Mes Patients
                              </h4>
                          </Link>
                      </div>
                  </div>
              </div>
              {isMedecin && (
                <div className="col-6 col-sm-4 col-md-3 col-lg-2 mb-4 d-flex align-items-stretch">
                  <div className="doctor-widget h-100 d-flex flex-column align-items-center text-center">
                      <div className="doctor-box-icon mb-2">
                          <img src={cb.src} alt="Chat Bot" className="img-fluid" />
                      </div>
                      <div className="doctor-content dash-count flex-grow-1">
                          <Link href="/chatbot">
                              <h4 style={{ color: "#333448", fontSize: "20px", fontWeight: "600", marginTop: "10px", letterSpacing: "0.5px" }}>
                                  Chat Bot
                              </h4>
                          </Link>
                      </div>
                  </div>
                </div>
              )}
              <div className="col-6 col-sm-4 col-md-3 col-lg-2 mb-4 d-flex align-items-stretch">
                  <div className="doctor-widget  h-100 d-flex flex-column align-items-center text-center">
                      <div className="doctor-box-icon mb-2">
                          <img src={tv.src} alt="Télé-Expertise" className="img-fluid" />
                      </div>
                      <div className="doctor-content dash-count flex-grow-1">
                          <Link href="/TeleExpertise">
                              <h4 style={{ color: "#333448", fontSize: "20px", fontWeight: "600", marginTop: "10px", letterSpacing: "0.5px" }}>
                                  Télé-Expertise
                              </h4>
                          </Link>
                      </div>
                  </div>
              </div>
              <div className="col-6 col-sm-4 col-md-3 col-lg-2 mb-4 d-flex align-items-stretch">
                  <div className="doctor-widget h-100 d-flex flex-column align-items-center text-center">
                      <div className="doctor-box-icon mb-2">
                          <img src={i.src} alt="IES" className="img-fluid" />
                      </div>
                      <div className="doctor-content dash-count flex-grow-1">
                          <Link href="/ies/professional">
                              <h4 style={{ color: "#333448", fontSize: "20px", fontWeight: "600", marginTop: "10px",marginLeft:"18px", letterSpacing: "0.5px" }}>
                                  IES
                              </h4>
                          </Link>
                      </div>
                  </div>
              </div>
            </div>
          </div>
          </div>
          <p style={{ marginTop: "3rem", fontWeight: "550" }}></p>
          <div className="row d-flex flex-column flex-xl-row">
            <div >
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
                              <i class='bx bxs-user-circle' style={{fontSize: '150px', marginLeft: '50px', color: '#2E37A4'}}></i>
                            </div>
                            <div className="col-sm-7">
                                <div className="card-body">
                                    <h4 className="card-title">{ item[2] + ' ' + item[1] }</h4>
                                    <p className="card-text" style={{ width: '300px' }}>{ item[3] }, { item[4] } ans</p>
                                    <a href={'/patients/' + item[0]} className="btn btn-primary" style={{ maxWidth: '150px', display: 'inline-block', whiteSpace: 'nowrap' }}>Dossier médical</a>
                                </div>
                            </div>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
