"use client";
import "../../assets/css/style.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

import {
  logo,
  baricon,
  baricon1

} from "./imagepath";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

const Header = ({section}) => {
  const router = useRouter();
  const [user,setUser]=useState({})

  // useEffect(() => {
  //   const token = localStorage.getItem('access-token');

  //   if (!token) {
  //     router.push('/auth/medecins');
  //     return;
  //   }
  //   try {
  //     const decodedToken = jwtDecode(token);
  //     const currentTimestamp = Math.floor(Date.now() / 1000);

  //     if (decodedToken.exp < currentTimestamp) {
  //       console.error('Token has expired');
  //       router.push('/auth/medecins');
  //       return;
  //     }

  //     if(decodedToken.claims.role=="ROLE_JEUNE"){
  //       router.push('/');
  //       return;
  //     }

  //     setUser(decodedToken);
  //   } catch (error) {
  //     console.error('Invalid token:', error);
  //     router.push('/auth/medecins');
  //     return;
  //   }
  // }, []);

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  const openDrawer = () => {
    const div = document.querySelector(".main-wrapper");
    if (div?.className?.includes("open-msg-box")) {
      div?.classList?.remove("open-msg-box");
    } else {
      div?.classList?.add("open-msg-box");
    }
  };

  useEffect(() => {
    const handleClick = () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        if (document.exitChaimaAitAliFullscreen) {
          document.exitFullscreen();
        }
      }
    };

    const maximizeBtn = document.querySelector(".win-maximize");
    // maximizeBtn.addEventListener('click', handleClick);

    return () => {
      // maximizeBtn.removeEventListener('click', handleClick);
    };
  }, []);
  const handlesidebar = () => {
    document.body.classList.toggle("mini-sidebar");
  };

  const handlesidebarmobilemenu = () => {
    document.body.classList.toggle("slide-nav");
    document.getElementsByTagName("html")[0].classList.toggle("menu-opened");
    /*document
      .getElementsByClassName("sidebar-overlay")[0]
      .classList.toggle("opened");*/
  };

  const handleLogout = () => {
    localStorage.removeItem("access-token");
    router.push("/auth/medecins");
  };

  const firstName = user?.claims?.prenom
    ? user.claims.nom.toUpperCase() +" "+ user.claims.prenom.toLowerCase()
    : "";

  return (
    <div >
      <div className="header">
        <div className="header-left">
          <Link href="/espaceMedecin" className="logo">
            <Image src={logo} width={80} height={80} alt="" />{" "}
            <span>{section}</span>
          </Link>
        </div>
        <Link href="#" id="toggle_btn" onClick={handlesidebar}>
          <Image src={baricon} alt=""  style={{marginLeft:"25px",marginTop:"26px"}}/>
        </Link>
        <Link
          href="#"
          id="mobile_btn"
          className="mobile_btn float-start"
          onClick={handlesidebarmobilemenu}
        >
          <Image src={baricon1} alt="" style={{marginTop:"22px"}}/>
        </Link>
        
        <ul className="nav user-menu float-end">
          <li className="nav-item dropdown d-none d-sm-block">
          </li>
          <li className="nav-item dropdown has-arrow user-profile-list">
            <Link
              href="#"
              className="dropdown-toggle nav-link user-link"
              data-bs-toggle="dropdown"
            >
              <div className="user-names">
                <h5>{firstName || "Mon Profile"}</h5>
              </div>
              <img src="https://i.postimg.cc/Kzp0N0w8/image.png" alt="Admin" className="user-img" />
            </Link>
            <div className="dropdown-menu">
              <Link href="/MonProfil" className="dropdown-item">
                My Profile
              </Link>
              <Link href="/ModifierProfil" className="dropdown-item">
                Edit Profile
              </Link>
              <Link href="#" onClick={handleLogout}  className="dropdown-item">
              
                Logout
              </Link>
            </div>
          </li>
        </ul>
        <div className="dropdown mobile-user-menu float-end">
          <Link
            href="/"
            className="dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa-solid fa-ellipsis-vertical" />
          </Link>
          <div className="dropdown-menu dropdown-menu-end">
            <Link href="/" className="dropdown-item">
              My Profile
            </Link>
            <Link href="/" className="dropdown-item">
              Edit Profile
            </Link>
            <Link href="#" onClick={handleLogout}  className="dropdown-item">
              Logout
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media only screen and (max-width: 768px) {
          .header-left {
            margin-left: -100px;
          }
        }
      `}</style>
    </div>
  );
};

export default Header;