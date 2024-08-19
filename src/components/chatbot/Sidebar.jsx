"use client";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
/* import "@assets/css/font-awesome.min.css"; */
import Link from "next/link";
import Image from "next/image";
import { dashboard, doctor, logout, menuicon10, menuicon08 } from "../imagepath";
import Scrollbars from "react-custom-scrollbars-2";

const Sidebar = (props) => {
  const [role, setRole] = useState(null);

  useEffect(() => {
      // Retrieve and decode the token from localStorage
      const token = localStorage.getItem('access-token');
      
      if (token) {
          try {
              const decodeJwt = jwtDecode(token);
              if(decodeJwt.claims.confirmed ){
                setRole(decodeJwt.claims.role);
              }
          } catch (error) {
              console.error("Failed to decode token:", error);
          }
      }
  }, []);

  const expandMenu = () => {
    document.body.classList.remove("expand-menu");
  };
  useEffect(() => {
    // Load Bootstrap JS only on the client side
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  

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
              <li className="menu-title">Main</li>
              <li className="submenu">
                <Link
                  className={
                    props?.activeClassName === "dashboard" ? "active" : ""
                  }
                  href="/"
                >
                  <span className="menu-side">
                    <Image src={dashboard} alt="" />
                  </span>{" "}
                  <span> {`Page d'accueil`} </span>
                </Link>
              </li>
              <li>
                <Link
                  className={
                    props?.activeClassName === "discussions" ? "active" : ""
                  }
                  href="/Discussions"
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
                  href="/Medecins"
                >
                  <span className="menu-side">
                    <Image src={doctor} alt="" />
                  </span>{" "}
                  <span> Médecins </span>
                </Link>
              </li>
              { role==='ROLE_MEDECIN' && (
                <>
                  <li>
                    <Link
                      className={props?.activeClassName === "chat" ? "active" : ""}
                      href="/Chatbot"
                    >
                      <span className="menu-side">
                        <Image src={menuicon10} alt="" />
                      </span>{" "}
                      <span>Chatbot</span>
                    </Link>
                  </li>
                </>
              )}
              <li>
                <Link
                  className={
                    props?.activeClassName === "calendar" ? "active" : ""
                  }
                  href="/Calendrier"
                >
                  <i className="fa fa-calendar" /> <span>Calendrier</span>
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
