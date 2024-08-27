/* eslint-disable react/no-unescaped-entities */
"use client";
import { useEffect, useState } from "react";

import "@/assets/css/font-awesome.min.css";
import Link from "next/link";
import Image from "next/image";
import { dashboard, logout } from "@/components/imagepath";
import Scrollbars from "react-custom-scrollbars-2";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { usePathname, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useLocale, useTranslations } from "next-intl";

const Sidebar = (props) => {
    const t = useTranslations('sideBare');
  const locale = useLocale();
  const pathname = usePathname();
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
    router.push('/auth/jeunes');
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
          >
            <ul>
              <li className="menu-title">Menu</li>
              <li className="submenu">
                <Link
                  className={props?.activeClassName === "dashboard" ? "active" : ""}
                  href="/soutien"
                >
                  <span className="menu-side">
                    <Image src={dashboard} alt="" />
                  </span>{" "}
                  <span> {t('accueil')} </span>
                </Link>
              </li>
              <li className="submenu">
                <Link
                  className={props?.activeClassName === "dashboard" ? "active" : ""}
                  href="/soutien"
                >
                  <span className="menu-side">
                    <Image src={dashboard} alt="" />
                  </span>{" "}
                  <span> {t('psychTests')} </span>
                </Link>
              </li>
              <li className="submenu">
                <Link
                  className={props?.activeClassName === "dashboard" ? "active" : ""}
                  href="/ies/youth"
                >
                  <span className="menu-side">
                    <Image src={dashboard} alt="" />
                  </span>{" "}
                  <span> {t('espaceIes')} </span>
                </Link>
              </li>

              

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
                  <span>{t('logout')}</span>
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
