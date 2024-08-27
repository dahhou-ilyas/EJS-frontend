import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../utility/loading";
import dayjs from "dayjs";
import { sortByDate } from "./live-planification-tracker";

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

const Live_Timeline = () => {
    const [lives, setLives] = useState({});
    const [livesLoaded, setLivesLoaded] = useState(false);

    const currentYear = dayjs().year();

    const getLives = async () => {
        try {
            // A optimiser: deux requêtes pour la même donnée
            const response = await axios.get('http://localhost:7000/streams?phase=outdated');
            const data = response.data;

            const currentYearStreams = data.filter(live => {
                const year = live.date[0];
                return year === currentYear || year === currentYear + 1;
            });

            const groupedByMonth = currentYearStreams.reduce((acc, live) => {
                const [year, month, day] = live.date; // Assuming date is an array like [year, month, day, hour, minute]
                const monthName = getMonthName(month, 'fr');

                if (!acc[monthName]) {
                    acc[monthName] = [];
                }
                acc[monthName].push(live);

                return acc;
            }, {});

            for (const month in groupedByMonth) {
                sortByDate(groupedByMonth[month]);
            }

            setLives(groupedByMonth);
            setLivesLoaded(true);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getLives();
    }, []);

    return (
        <div className="col-auto col-xl-3 float-xl-end mb-0 pb-4 pb-xl-0">
            <div className="card flex-fill comman-shadow custom-timeline-card px-4 pt-2 mb-0 pb-0">
                <div className="card-header custom-timeline-header">
                    <h4 className="card-title d-inline-block custom-timeline-title">
                        Lives de l'année {currentYear}
                    </h4>
                </div>
                <div className="card-body mx-auto w-100">
                    <div className="teaching-card w-100">
                        <ul className="custom-activity-feed w-100">
                            {livesLoaded ? (
                                Object.keys(lives).length > 0 ? (
                                    Object.keys(lives).reverse().map((month, index) => (
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
                                                                    <span className="custom-theme">{live.thematique.contenu}</span> - intervenant: {live.responsable.infoUser.nom}
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