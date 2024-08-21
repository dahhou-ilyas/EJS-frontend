"use client";
import "@/assets/css/style.css";
import { useEffect, useState } from "react";
import Sidebar from "@/components/TeleExpertise/Sidebar";
import Link from "next/link";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import Calender from "@/components/TeleExpertise/Calendar";
const Calendrier = () => {
  return (
    <>
      <Calender />
    </>
    // <>
    //   <Sidebar activeClassName="calendar" />
    //   <>
    //     <div className="page-wrapper">
    //       <div className="content">
    //         {/* Page Header */}
    //         <div className="page-header">
    //           <div className="row">
    //             <div className="col-sm-12">
    //               <ul className="breadcrumb">
    //                 <li className="breadcrumb-item">
    //                   <Link href="/">Page d'accueil</Link>
    //                 </li>
    //                 <li className="breadcrumb-item">
    //                   <FeatherIcon icon="chevron-right" />
    //                 </li>
    //                 <li className="breadcrumb-item active">Calendrier</li>
    //               </ul>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </>
    // </>
  );
};
export default Calendrier;
