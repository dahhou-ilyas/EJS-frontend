"use client"
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { useState,useEffect } from "react";
import Link from "next/link";

const NavigationHeader = (props)=>{
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);


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
            props.pages.map((page)=>{
              return (
                <>
                  <li className="breadcrumb-item">
                    <FeatherIcon icon="chevron-right" />
                  </li>
                  <li className="breadcrumb-item" key={page}>
                    {props.currentPage === page?page:<Link href={`/${page}`}>{page}</Link>}
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