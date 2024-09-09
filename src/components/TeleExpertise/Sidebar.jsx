/* eslint-disable react/no-unescaped-entities */
"use client";
import { useEffect, useState } from "react";

import "@/assets/css/font-awesome.min.css";
import Link from "next/link";
import Image from "next/image";
import { dashboard, doctor, logout, menuicon10, menuicon08 } from "./imagepath";
import Scrollbars from "react-custom-scrollbars-2";
import 'boxicons/css/boxicons.min.css';
import { useRouter } from "next/navigation";

const Sidebar = (props) => {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  const [sidebar, setSidebar] = useState("");
  const router = useRouter();

  const expandMenu = () => {
    document.body.classList.remove("expand-menu");
  };

  const expandMenuOpen = () => {
    document.body.classList.add("expand-menu");
  };
  
  const handleLogout = () => {
    localStorage.removeItem("access-token");
    router.push("/auth/medecins");
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
              <li className="menu-title">Menu: Télé-Expertise</li>
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
              <li>
                <Link
                  className={
                    props?.activeClassName === "discussions" ? "active" : ""
                  }
                  href="/TeleExpertise/Discussions"
                >
                  <span className="menu-side">
                    <Image src={menuicon08} alt="" />
                  </span>{" "}
                  <span>Discussions</span>
                </Link>
              </li>
              <li className="submenu">
                <Link
                  className={
                    props?.activeClassName === "doctors" ? "active" : ""
                  }
                  href="/TeleExpertise/Medecins"
                >
                  <span className="menu-side">
                    <Image src={doctor} alt="" />
                  </span>{" "}
                  <span> Médecins </span>
                </Link>
              </li>
              <li>
                <Link
                  className={props?.activeClassName === "chat" ? "active" : ""}
                  href="/TeleExpertise/Chat"
                >
                  <span className="menu-side">
                    <Image src={menuicon10} alt="" />
                  </span>{" "}
                  <span>Chat</span>
                </Link>
              </li>
              {/* <li>
                <Link
                  className={props?.activeClassName === "chat" ? "active" : ""}
                  href="/patients"
                >
                  <span className="menu-side">
                    <Image src={menuicon10} alt="" />
                  </span>{" "}
                  <span>Mes Patients</span>
                </Link>
              </li> */}
              {/* <li>
                <Link
                  className={props?.activeClassName === "chatbot" ? "active" : ""}
                  href="/chatbot"
                >
                  <span className="menu-side">
                    <Image src={menuicon10} alt="" />
                  </span>{" "}
                  <span>ChatBot</span>
                </Link>
              </li> */}
              <li>
                <Link
                  className={
                    props?.activeClassName === "calendar" ? "active" : ""
                  }
                  href="/TeleExpertise/Calendrier"
                >
                  <i className="fa fa-calendar" /> <span>Calendrier</span>
                </Link>
              </li>
              <li>
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
