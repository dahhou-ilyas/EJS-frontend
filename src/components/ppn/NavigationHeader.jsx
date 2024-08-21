"use client"
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { useState,useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { array } from "zod";

const NavigationHeader = (props)=>{
  const pathName = usePathname();
  // const pageNames = props.page; 
  // DYNAMIC LINKS FOR NAVIGATION HEADER
  let links = [];
  let res =  "";
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  for (let i = 0 ; i < props.pages.length ; i++){
    res = props.pages[0]+"/"
    for(let j = 1 ; j <= i ; j++){
      res+=props.pages[j] + "/";
    }
    
    links.push(res);
  }
  let i=-1;
  let pageNames =  links[links.length-1].split('/');
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

//<NavigationHeader pages={pages} currentPage="Patient" />
  return (
    <div
      className="page-header"
      style={isSmallScreen ? { marginBottom: "70px" } : {}}
    >
      {/* Liens de navigation */}
      <div className="row">
        <div className="col-sm-12">
          <ul className="breadcrumb">
            <li className="breadcrumb-item active">
              Profil Patient Numérique
            </li>
          {
            links.map((link)=>{
              i++;
              return (
                <>
                  <li className="breadcrumb-item">
                    <FeatherIcon icon="chevron-right" />
                  </li>
                  <li className="breadcrumb-item" >
                    <Link href={`/${link}`}>{pageNames[i]}</Link>
                  </li>
                </>
              );
            })
          }
          </ul>
        </div>
      </div>
    </div>
  )
}
export default NavigationHeader;