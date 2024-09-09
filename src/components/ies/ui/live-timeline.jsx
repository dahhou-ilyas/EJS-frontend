import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../utility/loading";
import dayjs from "dayjs";
import { sortByDate } from "./live-planification-tracker";
import { jwtDecode } from 'jwt-decode';
import { SPRINGBOOT_API_URL } from "@/config";

function capitalizeFirstLetter(x) {
    return x.charAt(0).toUpperCase() + x.slice(1);
}

const months = {
    en: [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ],
    fr: [
        "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ],
    ar: [
        "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
        "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
    ]
};

function getMonthName(monthRank, lang = 'en') {
    const monthIndex = parseInt(monthRank, 10) - 1;
    const monthName = months[lang][monthIndex];
    return capitalizeFirstLetter(monthName);
}

const Live_Timeline = ({ isItForAdmin }) => {
    const [lives, setLives] = useState({});
    const [livesLoaded, setLivesLoaded] = useState(false);

    const currentYear = dayjs().year();

    useEffect(() => {
        const getLives = async () => {
            try {
                const token = localStorage.getItem("access-token");

                if (!token) {
                    router.push("/auth/administrateur");
                    return;
                }

                const decodedToken = jwtDecode(token);

                let response = null;
                const idUser = decodedToken.claims.id;
                if (!isItForAdmin) {
                    response = await axios.get(`${SPRINGBOOT_API_URL}/admins/${1}/streams?phase=outdated`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                } else {
                    response = await axios.get(`${SPRINGBOOT_API_URL}/admins/${idUser}/streams?phase=outdated`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                }
                const data = response.data;

                const currentYearStreams = data.filter(live => {
                    const year = live.date[0];
                    return year === currentYear;
                });

                const groupedByMonth = currentYearStreams.reduce((acc, live) => {
                    const [year, month, day] = live.date;
                    const monthName = getMonthName(month, 'fr');

                    if (!acc[monthName]) {
                        acc[monthName] = [];
                    }
                    acc[monthName].push(live);

                    return acc;
                }, {});

                Object.keys(groupedByMonth).forEach(month => {
                    groupedByMonth[month].sort((a, b) => {
                        const [yearA, monthA, dayA] = a.date;
                        const [yearB, monthB, dayB] = b.date;
                        return new Date(yearA, monthA - 1, dayA) - new Date(yearB, monthB - 1, dayB);
                    });
                });

                const sortedGroupedByMonth = {};
                months.fr.forEach(monthName => {
                    if (groupedByMonth[monthName]) {
                        sortedGroupedByMonth[monthName] = groupedByMonth[monthName];
                    }
                });

                setLives(groupedByMonth);
                setLivesLoaded(true);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        getLives();
    }, []);

    return (
        <div className="col-auto col-xl-3 float-xl-end mb-0 pb-4 pb-xl-0">
            <div className="card flex-fill comman-shadow custom-timeline-card px-4 pt-2 mb-0 pb-0">
                <div className="card-header custom-timeline-header">
                    <h4 className="card-title d-inline-block custom-timeline-title">
                        Lives de l&apos;année {currentYear}
                    </h4>
                </div>
                <div className="card-body mx-auto w-100">
                    <div className="teaching-card w-100">
                        <ul className="custom-activity-feed w-100">
                            {livesLoaded ? (
                                Object.keys(lives).length > 0 ? (
                                    Object.keys(lives).map((month, index) => (
                                        <li key={index} className="feed-item custom-feed-item align-items-center">
                                            <h4 className="mb-4">{month}</h4>
                                            <div className="dolor-activity d-flex">
                                                <ul className="doctor-date-list custom-timeline-list">
                                                    {lives[month].map((live, idx) => {
                                                        const [year, month, day] = live.date;
                                                        const formattedDate = `${day}/${month}/${year}`;

                                                        return (
                                                            <li key={idx}>
                                                                {formattedDate} <span>
                                                                    <span className="custom-theme">{live.thematique.contenu}</span> - intervenant: <p style={{ color: "black" }}>{live.responsable.infoUser.nom.toUpperCase() + " " + live.responsable.infoUser.prenom}</p>
                                                                </span>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            </div>
                                        </li>
                                    ))
                                ) : (
                                    <p>Aucun Live planifié.</p>
                                )
                            ) : (
                                <Loading />
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Live_Timeline;
