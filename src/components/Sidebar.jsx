"use client";
import { useEffect, useState } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../assets/css/font-awesome.min.css";
import "@/assets/css/sidebar.css";
import Link from "next/link";
import Image from "next/image";
import {
  dashboard,
  doctor,
  patients,
  logout,
  menuicon10,
  menuicon13,
  callicon1
} from "./imagepath";
import Scrollbars from "react-custom-scrollbars-2";

const Sidebar = (props) => {
  const [sidebar, setSidebar] = useState("");

  const expandMenu = () => {
    document.body.classList.remove("expand-menu");
  };

  const expandMenuOpen = () => {
    document.body.classList.add("expand-menu");
  };
  // const handleClick = (e, item, item1, item3) => {
  //   const div = document.querySelector(`#${item}`);
  //   const ulDiv = document.querySelector(`.${item1}`);
  //   e?.target?.className ? ulDiv.style.display = 'none' : ulDiv.style.display = 'block'
  //   e?.target?.className ? div.classList.remove('subdrop') : div.classList.add('subdrop');
  // }

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
              <li className="menu-title">Dossier Medical</li>

              <li className="submenu" key="dashboard">
                <Link
                  href="/"
                  className={
                    props?.activeClassName === "doctor-home" ? "active" : ""
                  }
                >
                  <span className="menu-side">
                    <Image src={dashboard} alt="dashboard"/>
                  </span>
                  <span>Tableau de Bord</span>
                </Link>
              </li>
              <li className="submenu" key="patients">
                <Link
                  href="/Patients"
                  id="menu-item2"
                  
                  // onClick={(e) => handleClick(e, "menu-item2", "menu-items2")}
                  className={
                    props?.activeClassName === "patients" ? "active" : ""
                  }
                >
                  <span>
                    <Image src={patients} alt="dashboard"/>
                  </span>
                  <span>Patients </span>
                </Link>
              </li>
              <li className="submenu" key="psy">
                <Link
                  href="/Patients"
                  id="menu-item2"
                  // onClick={(e) => handleClick(e, "menu-item2", "menu-items2")}
                  className={
                    props?.activeClassName === "psy" ? "active" : ""
                  }
                >
                  <span>
                    <Image src={menuicon13} alt="dashboard"/>
                  </span>
                  <span>Soutien Psy</span>
                </Link>
              </li>
              <li className="submenu" key="ies">
                <Link
                  href="/Patients"
                  id="menu-item2"
                  // onClick={(e) => handleClick(e, "menu-item2", "menu-items2")}
                  className={
                    props?.activeClassName === "ies" ? "active" : ""
                  }
                >
                  <span>
                    <Image src={menuicon10} alt="dashboard"/>
                  </span>
                  <span>IES</span>
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
