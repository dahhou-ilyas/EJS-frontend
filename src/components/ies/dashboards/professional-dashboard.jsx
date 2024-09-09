"use client"

import React, { useState, useEffect } from "react";

import Link from "next/link";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
//import dayjs from "dayjs";
import Data_Table from "@/components/ies/ui/tables/schedule-table";
import { DATA } from "@/components/ies/ui/tables/schedule-data";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { jwtDecode } from 'jwt-decode';
import Loading from "../utility/loading";
import axios from "axios";
import { EXPRESS_API_URL } from "@/config";

/*const doneLives = livesData.filter(event => dayjs(event.Date).add(1, "hours").add(30, "minutes").isBefore(dayjs()));
const notDoneYetLives = livesData.filter(event => dayjs(event.Date).add(1, "hours").add(30, "minutes").isAfter(dayjs()));*/

/*const questionsData = [
    { id: 1, question: "Quels sont quelques conseils pour maintenir une alimentation équilibrée ?" },
    { id: 2, question: "Comment l'activité physique contribue-t-elle à la santé globale ?" },
    { id: 3, question: "Quelles sont les méthodes efficaces pour gérer le stress chez les jeunes ?" },
    { id: 4, question: "Quels sont quelques conseils pour maintenir une alimentation équilibrée ?" },
    { id: 5, question: "Comment l'activité physique contribue-t-elle à la santé globale ?" },
    { id: 6, question: "Quelles sont les méthodes efficaces pour gérer le stress chez les jeunes ?" },
    { id: 7, question: "Quels sont quelques conseils pour maintenir une alimentation équilibrée ?" },
    { id: 8, question: "Comment l'activité physique contribue-t-elle à la santé globale ?" },
    { id: 9, question: "Quelles sont les méthodes efficaces pour gérer le stress chez les jeunes ?" },
    { id: 10, question: "Quels sont quelques conseils pour maintenir une alimentation équilibrée ?" },
    { id: 11, question: "Comment l'activité physique contribue-t-elle à la santé globale ?" },
    { id: 12, question: "Quelles sont les méthodes efficaces pour gérer le stress chez les jeunes ?" }
];*/

const tabNames = {
    dashboard: 0,
    linkAndQuestions: 1
};

const Professional_Dashboard = () => {
    const [doneLives, setdoneLives] = useState([])
    const [notDoneYetLives, setDoneYetLive] = useState([]);
    const [selectedTab, setSelectedTab] = useState(tabNames.dashboard);
    const [questionreceive, setquestionreceive] = useState([]);
    const [LiveSelect, setLiveSelect] = useState(null);
    const showDashboard = () => { setSelectedTab(tabNames.dashboard); };
    const [fetched, setFetched] = useState(false);
    const showLinkAndQuestions = async (LiveSelected) => {
        try {
            const questions = LiveSelected.questions.length > 0 ? LiveSelected.questions : null;

            if ((questions !== null) && (questions !== undefined)) {
                const response = await axios.post(
                    EXPRESS_API_URL+'/summarized_questions',
                    { questions },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );

                const responseData = response.data.replace(/```json|```/g, '').split(" - ");
                setquestionreceive(responseData)
            }
        } catch (error) {
            console.error('Error fetching summarized questions:', error);
        }

        setLiveSelect(LiveSelected)
        setSelectedTab(tabNames.linkAndQuestions);
    };
    const fetchQuestions = async (token, id) => {
        const { fetch1, fetch2 } = DATA(token, id);
        const data1 = await fetch1();
        const data2 = await fetch2();
        setDoneYetLive(data1)
        setdoneLives(data2)

    }
    const router = useRouter();
    let [name, setName] = useState("User");
    useEffect(
        () => {

            const init = async () => {

                const token = localStorage.getItem("access-token");

                if (!token) {
                    router.push("/auth/professionnels");
                    return;
                }

                try {
                    const decodedToken = jwtDecode(token);
                    const id = decodedToken.claims.id;
                    const role = decodedToken.claims.role;

                    if (!role.includes("MEDECIN") && !role.includes("SANTE")) {
                        router.push("/auth/professionnels");
                        return;
                    }

                    setName(decodedToken.claims.nom.toUpperCase() + " " + decodedToken.claims.prenom);
                    fetchQuestions(token, id);
                } catch (error) {
                }
            };

            init();
            setFetched(true);
        }
        , [])


    const handleRedirect = (lienStreamYard) => {
        const url = lienStreamYard.startsWith('http') ? lienStreamYard : `https://${lienStreamYard}`;
        window.location.href = url;
    };

    if (!fetched) return <Loading />;

    return (
        <>
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


                            <h4 className="card-title d-inline-block custom-timeline-title" style={{ marginLeft: '20px', color: 'black' }}>
                                Lives que vous devez animer
                            </h4>
                            <p style={{ textAlign: 'center', backgroundColor: 'rgba(230, 230, 255, 1)', paddingBlock: '12px', paddingInline: '32px', borderRadius: '8px', fontSize: 'calc(0.9em + 0.2vw)' }}>
                                <i className="fa fa-lightbulb-o me-2" /> Veuillez cliquer sur une thématique pour accéder au <strong>lien du Live</strong> et aux <strong>questions des jeunes</strong>.
                            </p>
                            <Data_Table livesData={notDoneYetLives} showLinkAndQuestions={showLinkAndQuestions} defaultSorting={'ascend'} />


                            <h4 className="card-title d-inline-block custom-timeline-title" style={{ marginLeft: '20px', color: 'black' }}>
                                Lives que vous avez animés
                            </h4>
                            <Data_Table livesData={doneLives} showLinkAndQuestions={showLinkAndQuestions} defaultSorting={'descend'} />
                        </div>
                    </div>
                </div>
            }
            {(selectedTab === tabNames.linkAndQuestions) &&
                <div className="page-wrapper custom-wrapper">
                    <div className="content">
                        <div className="page-header">
                            <div className="row">
                                <div className="col-sm-12">
                                    <ul className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <Link href="#" onClick={showDashboard}>Tableau de bord </Link>
                                        </li>
                                        <li className="breadcrumb-item">
                                            <i className="feather-chevron-right"></i>
                                        </li>
                                        <li className="breadcrumb-item active">Planification du Live</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card-box">
                                    <div className="col-12 p-4 pb-0">
                                        <div className="form-heading mb-4 pb-4">
                                            <h4 className="mb-4">Lien StreamYard</h4>
                                            <a href="#" onClick={(e) => { e.preventDefault(); handleRedirect(LiveSelect.lienStreamYard); }}>Veuillez cliquer ici pour joindre le Live quand c&apos;est le moment.</a>
                                        </div>
                                        <div className="form-heading">
                                            <h4 className="mb-4">Questions des jeunes (résumés par l&apos;IA e-ESJ)</h4>
                                            <ul>
                                                {questionreceive.map(question => (
                                                    <><li key={question}>{question}</li><br /></>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}
export default Professional_Dashboard;

