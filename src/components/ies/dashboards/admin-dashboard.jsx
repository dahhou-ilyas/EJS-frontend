"use client"

import React, { useState, useEffect } from "react";

import Carousel from "@/components/ies/ui/carousel";
import Live_Planification_Tracker from "@/components/ies/ui/live-planification-tracker";
import Live_Planification_Form_Filled from "@/components/ies/ui/forms/live-planification-modify-form";
import Live_Banner from "@/components/ies/ui/banners/we-live-banner";
import Live_Timeline from "@/components/ies/ui/live-timeline";
import Link from "next/link";
import { carouselSlides } from "@/components/ies/utility/carousel-slides";
import { useRouter } from "next/navigation";
import { jwtDecode } from 'jwt-decode';
import Loading from "../utility/loading";

const tabNames = {
    dashboard: 0,
    modifyLivePlanification: 3,
    //askquestion:4
};

const Admin_Dashboard = () => {
    const [selectedTab, setSelectedTab] = useState(tabNames.dashboard);
    const [selectedLive, setselectedLive] = useState(null);
    const [fetched, setFetched] = useState(false);

    const showDashboard = () => { setSelectedTab(tabNames.dashboard); };
    const showModifyLivePlanification = (live) => {
        setSelectedTab(tabNames.modifyLivePlanification);
        setselectedLive(live)
    };
    /*const showAskQuestion=(live)=>{
       setSelectedTab(tabNames.askquestion)
       setSelectedTab(live)

   }*/

    const [liveCardStatus, setLiveCardStatus] = useState(null);
    const router = useRouter();
    let [name, setName] = useState("User");

    useEffect(() => {
        const init = async () => {

            const token = localStorage.getItem("access-token");

            if (!token) {
                router.push("/auth/administrateur");
                return;
            }

            try {
                const decodedToken = jwtDecode(token);
                const role = decodedToken.claims.role;

                if (role.includes("MEDECIN") || role.includes("SANTE") || role.includes("JEUNE")) {
                    router.push("/auth/administrateur");
                    return;
                }

                setName(decodedToken.claims.nom.toUpperCase() + " " + decodedToken.claims.prenom);
            } catch (error) {
            }
        };

        init();
        setFetched(true);
    }, []);

    if (!fetched) return <Loading />;

    return (
        <>
            {(selectedTab === tabNames.dashboard) &&
                <div className="page-wrapper custom-wrapper-full-size mt-0 pt-0">
                    <div className="content d-xl-flex p-xl-0 py-0 my-0 mt-0 pt-0">
                        <div className="col-auto col-xl-8 mx-auto mt-md-0 pt-md-4 col-xl-4" style={{ paddingBottom: '40px' }}>
                            <div className="page-header pt-md-0" style={{ marginLeft: '116px' }}>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <ul className="breadcrumb">
                                            <li className="breadcrumb-item">
                                                {/* <Link href="#"> Dashboard </Link> */}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="good-morning-blk">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="morning-user">
                                            <h2>
                                                Bonjour, <span>{name}</span>
                                            </h2>
                                            <p>Bienvenue dans votre espace IES</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-auto mx-auto mb-4">
                                <div className="row gap-2 mx-auto">
                                    <Link
                                        href="admin/livePlanificationForm"
                                        className="btn btn-primary col-md d-flex justify-content-between align-items-center custom-button-ies"
                                    >
                                        <span className='me-4' style={{ whiteSpace: 'noWrap' }}>Planifier un Live {" "} </span><i className="fa fa-video-camera" />
                                    </Link>
                                    <Link
                                        href="admin/listLives"
                                        className="btn btn-primary col-md d-flex justify-content-between align-items-center custom-button-ies"
                                    >
                                        <span className='me-4' style={{ whiteSpace: 'noWrap' }}>Voir les Lives précédents {" "} </span><i className="fa fa-list" />
                                    </Link>
                                    <Link
                                        href="admin/propositions"
                                        className="btn btn-primary col-md d-flex justify-content-between align-items-center custom-button-ies"
                                    >
                                        <span className='me-4' style={{ whiteSpace: 'noWrap' }}>Voir les propositions des thématiques {" "} </span><i className="fa fa-bar-chart" />
                                    </Link>
                                </div>
                            </div>

                            <div style={{ paddingTop: '4px', marginBottom: '30px' }}><Live_Planification_Tracker showModifyLivePlanification={showModifyLivePlanification} setStatus={setLiveCardStatus} isItForAdmin={true} /></div>

                            {/*<div style={{ paddingTop: '4px', paddingBottom: '4px' }}><Carousel slides={carouselSlides} /></div> */}
                        </div>

                        <Live_Timeline isItForAdmin={true} />
                    </div>
                </div>
            }
            {(selectedTab === tabNames.modifyLivePlanification) && <Live_Planification_Form_Filled showDashboard={showDashboard} status={liveCardStatus} liveData={selectedLive} />}
        </>
    );
};

export default Admin_Dashboard;

