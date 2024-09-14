/* eslint-disable react/no-unescaped-entities */

import "@/assets/css/font-awesome.min.css";
import Link from "next/link";
import Image from "next/image";


import { useRouter } from 'next/navigation';

import { dashboard, doctor, logout, menuicon10, menuicon08 } from "@/components/imagepath";
import Scrollbars from "react-custom-scrollbars-2";
import { useEffect } from "react";
//import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Sidebar = (props) => {
  const router = useRouter();

  useEffect(()=>{
    require("bootstrap/dist/js/bootstrap.bundle.min.js")
  },[])
  const expandMenu = () => {
    document.body.classList.remove("expand-menu");
  };

  const expandMenuOpen = () => {
    document.body.classList.add("expand-menu");
  };
  const handleLogout = () => {
    console.log("object");
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
            onMouseLeave={expandMenu}
            onMouseOver={expandMenuOpen}
          >
            <ul>
              <li className="menu-title rtl:mr-4 ltr:ml-4">e-ESJ</li>
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
                  <span> {(typeof props.t === 'function' && props.t('home')) || "Accueil"} </span>
                </Link>
              </li>
              <li className="submenu">
                <Link
                  className={
                    props?.activeClassName === "doctors" ? "active" : ""
                  }
                  href="/profil"
                >
                  <span className="menu-side">
                    <Image src={doctor} alt="" />
                  </span>{" "}
                  <span> {(typeof props.t === 'function' && props.t('medicalRecord')) || "Dossier Medical"} </span>
                </Link>
              </li>
              <li>
                <Link
                  className={
                    props?.activeClassName === "discussions" ? "active" : ""
                  }
                  href="/ies/youth"
                >
                  <span className="menu-side">
                    <Image src={menuicon08} alt="" />
                  </span>{" "}
                  <span>{(typeof props.t === 'function' && props.t('healthEducation')) || "Education à la Sante"}</span>
                </Link>
              </li>
              <li>
                <Link
                  className={props?.activeClassName === "chat" ? "active" : ""}
                  href="/soutien"
                >
                  <span className="menu-side">
                    <Image src={menuicon10} alt="" />
                  </span>{" "}
                  <span>{(typeof props.t === 'function' && props.t('psychTests')) || "Tests Psychologiques"}</span>
                </Link>
              </li>
              
              <li onClick={handleLogout}>
                <Link
                  className={
                    props?.activeClassName === "parametres" ? "active" : ""
                  }
                  
                  href="#"
                >
                  <span className="menu-side" >
                    <Image src={logout} alt="" />
                  </span>{" "}
                  <span>{(typeof props.t === 'function' && props.t('logout')) || "Se déconnecter"}</span>
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
