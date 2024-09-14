/* eslint-disable react/no-unescaped-entities */
"use client";
import { useEffect, useState } from "react";

import "@/assets/css/font-awesome.min.css";
import Link from "next/link";
import Image from "next/image";
import { dashboard, doctor, logout, menuicon10, menuicon08 } from "./imagepath";
import Scrollbars from "react-custom-scrollbars-2";
import { useRouter } from "next/navigation";
import 'boxicons/css/boxicons.min.css';
import { jwtDecode } from "jwt-decode";


const Sidebar = (props) => {
  const [isMedecin,setIsMedecin]=useState(false);
  

  const [sidebar, setSidebar] = useState("");
  const [isMedecinsOpen, setIsMedecinsOpen] = useState(false); // State for toggle
  const router = useRouter();

  useEffect(()=>{
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  },[])

  useEffect(() => {
    const token= localStorage.getItem("access-token");
    const decodeToken=jwtDecode(token);
    const isMedcins=(decodeToken.claims.role=="ROLE_MEDECIN");
    setIsMedecin(isMedcins);
  }, []);

  const useClientOnlyEffect = (effect, deps) => {
    const [isClient, setIsClient] = useState(false);
  
    useEffect(() => {
      setIsClient(true);
    }, []);
  
    useEffect(() => {
      if (isClient) {
        effect();
      }
    }, [isClient, ...deps]);
  };

  const expandMenu = () => {
    document.body.classList.remove("expand-menu");
  };

  const expandMenuOpen = () => {
    document.body.classList.add("expand-menu");
  };

  const handleLogout = () => {
    const token= localStorage.getItem("access-token");
    const decod=jwtDecode(token);
    const checkRole = decod.claims.role;
    if(checkRole=="ROLE_PROFESSIONELSANTE"){
      localStorage.removeItem("access-token");
      router.push("/auth/professionnels");
      return;
    }else{
      localStorage.removeItem("access-token");
      router.push("/auth/medecins");
      return;
    }
  };

  const toggleMedecinsMenu = () => {
    setIsMedecinsOpen(!isMedecinsOpen);
  };

  return (
    <div className="sidebar" id="sidebar">
      <Scrollbars
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
        autoHeight
        autoHeightMin={0}
        autoHeightMax="95vh"
        thumbMinSize={30}
        universal={false}
        hideTracksWhenNotNeeded={true}
      >
        <div className="sidebar-inner slimscroll">
          <div
            id="sidebar-menu"
            className="sidebar-menu"
            onMouseLeave={expandMenu}
            onMouseOver={expandMenuOpen}
          >
            <ul>
              <li className="menu-title">Menu</li>
              <li className="submenu">
                <Link
                  className={
                    props?.activeClassName === "dashboard" ? "active" : ""
                  }
                  href="/espaceMedecin"
                >
                  <span className="menu-side">
                    <Image src={dashboard} alt="" />
                  </span>{" "}
                  <span> Page d'accueil </span>
                </Link>
              </li>
              <li className="submenu">
                <Link
                  onClick={toggleMedecinsMenu} // Toggle visibility
                  href="#"
                >
                  <span className="menu-side">
                    <Image src={doctor} alt="" />
                  </span>{" "}
                  <span> Médecins </span> <span className="menu-arrow" />
                </Link>
                <ul style={{ display: isMedecinsOpen ? 'block' : 'none' }} className="menu-items1">
                  <li>
                    <Link
                      className={
                        props?.activeClassName === "monProfil" ? "active" : ""
                      }
                      href="/espaceMedecin/MonProfil"
                    >
                      Mon Profil
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={
                        props?.activeClassName === "modifierProfil" ? "active" : ""
                      }
                      href="/espaceMedecin/ModifierProfil"
                    >
                      Modifier Mon Profil
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link
                  className={
                    props?.activeClassName === "ppnx" ? "active" : ""
                  }
                  href="/espaceMedecin/MesPatients"
                >
                  <span className="menu-side">
                    <Image src={menuicon08} alt="" />
                  </span>{" "}
                  <span>Mes Patients</span>
                </Link>
              </li>
              <li>
                <Link
                  className={
                    props?.activeClassName === "ies" ? "active" : ""
                  }
                  href="/ies/professional"
                >
                  <span className="menu-side">
                  <i className="fa fa-info-circle" />
                  </span>{" "}
                  <span>IES</span>
                </Link>
              </li>
              <li>
                <Link
                  className={
                    props?.activeClassName === "ppn" ? "active" : ""
                  }
                  href="/patients"
                >
                  <span className="menu-side">
                  <Image src={menuicon08} alt="" />
                  </span>{" "}
                  <span>Patients</span>
                </Link>
              </li>
              {
                isMedecin && (
                    <li>
                      <Link
                        className={
                          props?.activeClassName === "chatbot" ? "active" : ""
                        }
                        href="/chatbot"
                      >
                        <span className="menu-side">
                        <i className="fa fa-commenting" />
                        </span>{" "}
                        <span>ChatBot</span>
                      </Link>
                    </li>
                )
              }
              <li>
                <Link
                  className={
                    props?.activeClassName === "chatbodt" ? "active" : ""
                  }
                  href="/TeleExpertise"
                >
                  <span className="menu-side">
                  <i className="fa fa-info-circle" />
                  </span>{" "}
                  <span>Télé-Expertise</span>
                </Link>
              </li>
              
              <li>
                {/* <button
                  className="sidebar-btn"
                  onClick={handleLogout} 
                >
                  <span className="menu-side">
                  <i className="fa fa-sign-out" />
                  </span>{" "}
                  <span>Se Déconnecter</span>
                </button> */}
                <a
                href="#"
                onClick={handleLogout}
                style={{ textDecoration: 'none' }}
              >
                <span className="menu-side">
                  <i className="fa fa-sign-out" />
                </span>{" "}
                <span>Se Déconnecter</span>
              </a>
              </li>
            </ul>
          </div>
        </div>
      </Scrollbars>
    </div>
  );
};

export default Sidebar;