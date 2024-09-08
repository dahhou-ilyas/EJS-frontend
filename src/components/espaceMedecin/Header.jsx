"use client";
import "../../assets/css/style.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "../../../public/e-Espace.jpeg";
import { logo, baricon, baricon1, user06 } from "./imagepath";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import axios from 'axios';
import { SPRINGBOOT_API_URL } from "@/config";

const Header = ({section}) => {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [medecin, setMedecin] = useState(null);
  const [token,setToken]=useState("");
  

  useEffect(() => {
    const token = localStorage.getItem('access-token');
    if (isTokenInvalidOrNotExist(token)) {
      router.push('/auth/medecins');
    } else {
      setToken(token);
      const decodedToken = jwtDecode(token);
      if(decodedToken?.claims?.role=="ROLE_JEUNE"){
        router.push("/");
        return;
      }
      setUser(decodedToken);
      getMedecinData(decodedToken?.claims?.id);
    }
  }, [token]);

  const getMedecinData = (id) => {
    if (id != null) {
      axios.get(SPRINGBOOT_API_URL+'/medecins/' + id, {
      headers: {
        Authorization: `Bearer ${token}`
      }
      })
      .then(res => {
        setMedecin(res.data);
      })
      .catch(err => {
        console.log(err);
      })
    }
  }

  const isTokenInvalidOrNotExist = (token) => {
    if (typeof token !== 'string' || token.trim() === '') {
      console.error('Token is invalid or does not exist');
      return true; 
    }
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp && decodedToken.exp < currentTime) {
        localStorage.removeItem('access-token');
        return true; 
      }
      return false; 
    } catch (error) {
      console.error("Error decoding token:", error);
      return true; 
    }
  }
  
  const handlesidebar = () => {
    document.body.classList.toggle("mini-sidebar");
  };

  const handlesidebarmobilemenu = () => {
    document.body.classList.toggle("slide-nav");
    document.getElementsByTagName("html")[0].classList.toggle("menu-opened");
  };

  const handleLogout = () => {
    const decod=jwtDecode(token);
    const checkRole=decod.claims.role;
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

  return (
    <div >
      <div className="header">
        <div className="header-left">
          <Link href="/espaceMedecin" className="logo">
            <Image src={ Logo } width={ 150 } alt="Logo" />
            <span>{''}</span>
          </Link>
        </div>
        <Link href="#" id="toggle_btn" onClick={ handlesidebar }>
          <Image src={ baricon } alt="" style={{ marginLeft: '20px', marginTop: '27px' }}/>
        </Link>
        <Link
          href="#"
          id="mobile_btn"
          className="mobile_btn float-start"
          onClick={handlesidebarmobilemenu}
        >
          <Image src={baricon1} alt="" style={{ marginTop:"22px" }}/>
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
              <div className="user-names" style={{ textTransform: 'capitalize' }}>
                <h5>{user?.claims?.nom ? `${user.claims.nom} ` : ''}{user?.claims?.prenom || '' || "Mon Profile"}</h5>
              </div>
              <img src={ medecin?.image_url || user06.src } alt="Admin" className="user-img" />
            </Link>
            <div className="dropdown-menu">
              <Link href="/espaceMedecin/MonProfil" className="dropdown-item">
                Mon profil
              </Link>
              <Link href="/espaceMedecin/ModifierProfil" className="dropdown-item">
                Modifier profil
              </Link>
              <a href="#" onClick={handleLogout}  className="dropdown-item">
                Se déconnecter
              </a>
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
            <Link href="/espaceMedecin/MonProfil" className="dropdown-item">
              My Profile
            </Link>
            <Link href="/espaceMedecin/ModifierProfil" className="dropdown-item">
              Edit Profile
            </Link>
            <a href="#" onClick={handleLogout}  className="dropdown-item">
              Logout
            </a>
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