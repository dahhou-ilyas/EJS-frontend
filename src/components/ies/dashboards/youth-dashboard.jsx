"use client"

import React, { useState, useEffect } from "react";

import Carousel from "@/components/ies/ui/carousel";
import Live_Timeline from "@/components/ies/ui/live-timeline";
import Ask_Question_Form from "@/components/ies/ui/forms/ask-question-form";
import Live_Planification_Tracker from "@/components/ies/ui/live-planification-tracker";
import Post_Live_Banner from "@/components/ies/ui/banners/post-live-banner";

import { carouselSlides } from "@/components/ies/utility/carousel-slides";
import { jwtDecode } from 'jwt-decode';
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

const tabNames = {
    dashboard: 0,
    askQuestion: 1,
    modifyLivePlanification: 4
};

const Youth_Dashboard = () => {
    const [selectedTab, setSelectedTab] = useState(tabNames.dashboard);

    const showDashboard = () => { setSelectedTab(tabNames.dashboard); };
    const showAskQuestion = (lives) => {
        setSelectedTab(tabNames.askQuestion);
        setselectedLive(lives)
    };
    const showModifyLivePlanification = () => { setSelectedTab(tabNames.modifyLivePlanification); };

    const [liveCardStatus, setLiveCardStatus] = useState(null);
    const [lastLive, setLastLive] = useState(null);
    const [selectedLive, setselectedLive] = useState(null);

    const router = useRouter();
    let [name, setName] = useState("User");

    useEffect(() => {
        const fetchLastLive = async () => {

            const token = localStorage.getItem("access-token");

            if (!token) {
                router.push("/auth/jeunes");
                return;
            }

            try {
                const decodedToken = jwtDecode(token);
                const idJeune = decodedToken.claims.id;
                setName(decodedToken.claims.nom.toUpperCase() + " " + decodedToken.claims.prenom);

                const response = await axios.get(`http://localhost:8080/jeunes/${idJeune}/streams/last`);
                setLastLive(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchLastLive();
    }, []);

    return (
        <>
            {/*lastLive &&
                <Link href="/youth/postLiveForm">
                    <Post_Live_Banner />
                </Link>
            */}
            {(selectedTab === tabNames.dashboard) &&
                <div className="page-wrapper custom-wrapper-full-size mt-0 pt-0">
                    <div className="content d-xl-flex p-xl-0 py-0 my-0 pt-0 mt-0">
                        <div className="col-auto col-xl-8 mx-auto mt-md-0 pt-md-4" style={{ paddingBottom: '40px' }}>
                            <div className="page-header mt-md-0" style={{ marginLeft: '30px' }}>
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
                                        href="youth/listLives"
                                        className="btn btn-primary col-md d-flex justify-content-between align-items-center custom-button-ies"
                                    >
                                        <span className='me-4' style={{ whiteSpace: 'noWrap' }}>Voir les Lives précédents {" "} </span><i className="fa fa-list" />
                                    </Link>
                                </div>
                            </div>

                            <div style={{ paddingTop: '4px', marginBottom: '30px' }}><Live_Planification_Tracker showModifyLivePlanification={showModifyLivePlanification} setStatus={setLiveCardStatus} isItForAdmin={false} showAskQuestion={showAskQuestion} /></div>

                            {/*<div style={{ paddingTop: '4px', paddingBottom: '4px' }}><Carousel slides={carouselSlides} /></div>*/}
                        </div>

                        <Live_Timeline isItForAdmin={false} />
                    </div>
                </div>
            }
            {(selectedTab === tabNames.askQuestion) && <Ask_Question_Form showDashboard={showDashboard} liveData={selectedLive} />}
        </>
    );
};

export default Youth_Dashboard;

