/* eslint-disable react/no-unescaped-entities */
"use client";
import { useEffect, useState } from "react";

import "@/assets/css/font-awesome.min.css";
import Link from "next/link";
import Image from "next/image";
import { dashboard, logout } from "@/components/imagepath";
import Scrollbars from "react-custom-scrollbars-2";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const Sidebar = (props) => {
  // État pour contrôler si la barre latérale est ouverte ou fermée
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Fermée par défaut
  const router = useRouter();

  // Utiliser useEffect pour exécuter ce code uniquement côté client
  useEffect(() => {
    if (typeof document !== "undefined") {
      const expandMenu = () => {
        document.body.classList.remove("expand-menu");
      };
  
      const expandMenuOpen = () => {
        document.body.classList.add("expand-menu");
      };
  
      const sidebarMenu = document.getElementById("sidebar-menu");
      if (sidebarMenu) {
        sidebarMenu.addEventListener("mouseleave", expandMenu);
        sidebarMenu.addEventListener("mouseover", expandMenuOpen);
      }
  
      return () => {
        if (sidebarMenu) {
          sidebarMenu.removeEventListener("mouseleave", expandMenu);
          sidebarMenu.removeEventListener("mouseover", expandMenuOpen);
        }
      };
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access-token');
    router.push('/auth/medecins');
  };

  return (
    <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`} id="sidebar">
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
          >
            <ul>
              <li className="menu-title">Menu</li>
              <li className="submenu">
                <Link
                  className={props?.activeClassName === "dashboard" ? "active" : ""}
                  href="/TeleExpertise"
                >
                  <span className="menu-side">
                    <Image src={dashboard} alt="" />
                  </span>{" "}
                  <span> Page d'accueil </span>
                </Link>
              </li>
{/*               
              <li>
                <button
                  className={props?.activeClassName === "parametres" ? "active mx-auto" : "ml-5 p-2"}
                  onClick={handleLogout}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "0",
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  <span className="menu-side pr-3">
                    <Image width={25} src={logout} alt="" />
                  </span>{" "}
                  <span>Se Déconnecter</span>
                </button>
              </li> */}

            <li onClick={handleLogout}>
                <Link
                  className={
                    props?.activeClassName === "parametres" ? "active" : ""
                  }
                  
                  href="#"
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
