import React, { useState, useEffect } from 'react';

import Live_Tracker_Card from '@/components/ies/ui/cards/live-tracker-card';
import axios from 'axios';
import Loading from '../utility/loading';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { SPRINGBOOT_API_URL } from '@/config';

const liveItems = [
    { title: 'Introduction à la Télémédecine 3', planificationDate: '2024-12-15T10:00:00' },
    { title: 'Introduction à la Télémédecine 2', planificationDate: '2024-08-15T10:00:00' },
    { title: 'Introduction à la Télémédecine 1', planificationDate: '2024-08-10T14:30:00' },
    { title: 'Les Avancées de la Chirurgie Robotique', planificationDate: '2024-08-05T09:00:00' },
    { title: 'Gestion des Maladies Chroniques 2', planificationDate: '2024-07-24T16:45:00' },
    { title: 'Gestion des Maladies Chroniques 1', planificationDate: '2024-07-19T08:15:00' },
    { title: 'Prévention et Vaccination', planificationDate: '2024-07-10T11:30:00' },
    { title: 'Santé Mentale et Bien-être', planificationDate: '2024-07-04T13:00:00' },
    { title: 'Technologies de la Santé Connectée', planificationDate: '2024-06-30T07:45:00' },
    { title: 'Nutrition et Santé', planificationDate: '2024-06-29T10:15:00' },
    { title: 'Réhabilitation Cardiaque', planificationDate: '2024-06-11T12:00:00' },
    { title: 'Soins Palliatifs', planificationDate: '2024-05-22T15:30:00' },
    { title: 'Innovation en Thérapie Génique', planificationDate: '2024-05-12T14:00:00' },
];

export function sortByDate(list, reverse = false) {
    if (!Array.isArray(list)) {
        list = Array.from(list);
    }

    return list.sort((a, b) => {
        for (let i = 0; i < a.date.length; i++) {
            if (a.date[i] !== b.date[i]) {
                return reverse ? b.date[i] - a.date[i] : a.date[i] - b.date[i];
            }
        }
        return 0;
    });
}

const Live_Planification_Tracker = ({ showModifyLivePlanification, setStatus, isItForAdmin, showAskQuestion }) => {

    const [notActivatedPhase, setNotActivatedPhase] = useState([])
    const [questionPhase, setQuestionPhase] = useState([])
    const [finalPhase, setFinalPhase] = useState([])
    const [isFetched, setIsFetched] = useState(false);

    const router = useRouter();
    useEffect(() => {
        const fetchLastLive = async () => {
            const token = localStorage.getItem("access-token");

            if (!token) {
                router.push("/auth/jeunes");
                return;
            }

            try {
                const decodedToken = jwtDecode(token);
                const id = decodedToken.claims.id;

                if (isItForAdmin) {
                    const response1 = await axios(`${SPRINGBOOT_API_URL}/admins/${id}/streams?phase=notactivated`)
                    const response2 = await axios(`${SPRINGBOOT_API_URL}/admins/${id}/streams?phase=question`)
                    const response3 = await axios(`${SPRINGBOOT_API_URL}/admins/${id}/streams?phase=final`)
                    const phase1 = await response1.data;
                    const phase2 = await response2.data;
                    const phase3 = await response3.data;
                    setNotActivatedPhase(sortByDate(phase1));
                    setQuestionPhase(sortByDate(phase2));
                    setFinalPhase(sortByDate(phase3));
                } else {
                    const response1 = await axios(`${SPRINGBOOT_API_URL}/jeunes/${id}/streams?phase=question`)
                    const response2 = await axios(`${SPRINGBOOT_API_URL}/jeunes/${id}/streams?phase=final`)
                    const phase1 = await response1.data;
                    const phase2 = await response2.data;
                    setQuestionPhase(sortByDate(phase1));
                    setFinalPhase(sortByDate(phase2));
                }
            } catch (error) {
            }

            setIsFetched(true);
        };

        fetchLastLive();
    }, []);

    if ((notActivatedPhase.length == 0 || notActivatedPhase === undefined) &&
        (questionPhase.length == 0 || questionPhase === undefined) &&
        (finalPhase.length == 0 || finalPhase === undefined)
    ) {
        // Afficher un message ou un composant de chargement en attendant les données
        return isFetched ? <p style={{ textAlign: 'center' }}>Données non disponibles</p> : <Loading />;
    }

    return (
        <>
            <h4 className="card-title d-inline-block custom-timeline-title" style={{ marginLeft: '20px', color: 'black', fontWeight: 'bold' }}>
                Lives planifiés
            </h4>
            <div className="d-flex gap-3" style={{ overflowX: 'auto', paddingBottom: '4px' }}>
                {notActivatedPhase.length > 0 && notActivatedPhase.map((item, index) => (
                    <Live_Tracker_Card
                        cardKey={item.id}
                        key={item.id}
                        item={item}
                        showModifyLivePlanification={showModifyLivePlanification}
                        setStatus={setStatus}
                        status="Avant-Questions des jeunes"
                        isItForAdmin={isItForAdmin}
                        showAskQuestion={showAskQuestion}
                    />
                ))}

                {questionPhase.length > 0 && questionPhase.map((item, index) => (
                    <Live_Tracker_Card
                        cardKey={item.id}
                        key={item.id}
                        item={item}
                        showModifyLivePlanification={showModifyLivePlanification}
                        setStatus={setStatus}
                        status="Questions des jeunes"
                        isItForAdmin={isItForAdmin}
                        showAskQuestion={showAskQuestion}
                    />
                ))}
                {finalPhase.length > 0 && finalPhase.map((item, index) => (
                    <Live_Tracker_Card
                        cardKey={item.id}
                        key={item.id}
                        item={item}
                        showModifyLivePlanification={showModifyLivePlanification}
                        setStatus={setStatus}
                        status="Questions envoyées"
                        isItForAdmin={isItForAdmin}
                        showAskQuestion={showAskQuestion}
                    />
                ))}
            </div>
        </>
    );
};

export default Live_Planification_Tracker;
