"use client";
import { useEffect, useState } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../../assets/css/font-awesome.min.css";
import Link from "next/link";
import Image from "next/image";
import { dashboard, doctor, logout, menuicon10, menuicon08 } from "./imagepath";
import Scrollbars from "react-custom-scrollbars-2";
import 'boxicons';

const Sidebar = (props) => {
  const [sidebar, setSidebar] = useState("");
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = (e) => {
    setSubMenuOpen((prev) => !prev);
    const menuArrow = document.querySelector('#menu-item1');
    
      if(subMenuOpen) {menuArrow.classList.remove('subdrop') } else{ menuArrow.classList.add('subdrop');}
      console.log(subMenuOpen)
    
  };

  const expandMenu = () => {
    document.body.classList.remove("expand-menu");
  };

  const expandMenuOpen = () => {
    document.body.classList.add("expand-menu");
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
                  
            onClick={(e)=>toggleSubMenu(e)}
                  href="#"
                   id="menu-item1"
                >

                  <span className="menu-side">
                    <Image src={doctor} alt="" />
                  </span>{" "}
                  <span> Médecin  </span>  <span  className="menu-arrow" />
                </Link>
      
                  <ul style={{ display: subMenuOpen ? 'block' : 'none' }} className="menu-items1 ">
                  <li>
                  <Link
                  className={
                    props?.activeClassName === "chat" ? "active" : ""
                  }
                  href="/espaceMedecin/MonProfil"
                >Profil du Médecin</Link>
                  </li>
                  <li>
                  <Link
                  className={
                    props?.activeClassName === "chat" ? "active" : ""
                  }
                  href="/espaceMedecin/ModifierProfil"
                >Modifier Mon Profil</Link>
                  </li>
                </ul>
                
              </li>
              <li className="submenu">
                <Link
                  className={
                    props?.activeClassName === "doctors" ? "active" : ""
                  }
                  href="/espaceMedecin/MesPatients"
                >
                  <span className="menu-side">
                    <Image src={menuicon08} alt="" />
                  </span>{" "}
                  <span> Mes Patients </span>
                </Link>
              </li>
              <li className="submenu">
                <Link
                  className={
                    props?.activeClassName === "doctors" ? "active" : ""
                  }
                  href="https://module-ies.vercel.app/ies/professional"
                >
                  <span className="menu-side">
                    <box-icon type='solid' name='info-circle' color='gray'></box-icon>
                  </span>{" "}
                  <span> IES</span>
                </Link>
              </li>
              <li className="submenu">
                <Link
                  className={
                    props?.activeClassName === "doctors" ? "active" : ""
                  }
                  href="/chatbot"
                >
                  <span className="menu-side">
                    <box-icon type='solid' name='bot' color='gray'></box-icon>
                  </span>{" "}
                  <span> Chat Bot</span>
                </Link>
              </li>
              <li className="submenu">
                <Link
                  className={
                    props?.activeClassName === "doctors" ? "active" : ""
                  }
                  href="/TeleExpertise"
                >
                  <span className="menu-side">
                    <box-icon name='tv' color='gray'></box-icon>
                  </span>{" "}
                  <span> Télé-Expértise </span>
                </Link>
              </li>
              <li>
                <Link
                  className={
                    props?.activeClassName === "parametres" ? "active" : ""
                  }
                  href="/"
                >
                  <span className="menu-side">
                    <Image src={logout} alt="" />
                  </span>{" "}
                  <span>Se Déconnecter</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Scrollbars>
    </div>
  );
};

export default Sidebar;
