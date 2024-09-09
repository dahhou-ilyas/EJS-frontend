import React, { useEffect, useState } from 'react';

import { daysForQuestions, daysFoSending, daysBeforeAutoInform } from '@/components/ies/utility/period-delays';
import dayjs from 'dayjs';
import axios from 'axios';
import Live_Planification_Form_Filled from "@/components/ies/ui/forms/live-planification-modify-form";
import { SPRINGBOOT_API_URL } from '@/config';


const getColor = (status) => {
    if (status == 'Avant-Questions des jeunes') return '#CC0000';
    if (status == 'Questions envoyées') return '#385AFE';
    if (status == 'Questions des jeunes') return '#388E3C';
    return '#333333';
};

const Live_Tracker_Card = ({ cardkey, item, isItForAdmin, setStatus, showModifyLivePlanification, showAskQuestion, status }) => {
    const [isHidden, setIsHidden] = useState(false);

    useEffect(() => {
        setStatus(status)
    }, [])

    const [currentTime, setCurrentTime] = useState(null);


    useEffect(() => {
        setCurrentTime(dayjs());
        const interval = setInterval(() => {
            setCurrentTime(dayjs());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    if (!item?.date || !Array.isArray(item.date) || item.date.length < 3) {
        console.error('Invalid date format in item:', item);
        return null;
    }
    
    if (!currentTime) {
        return null; // or a loading spinner? maybe later
    }

    const deleting = async (id) => {
        await axios.delete(`${SPRINGBOOT_API_URL}/streams/${id}`)
    }

    const [year, month, day, hour = 0, minute = 0, second = 0] = item.date;

    const eventDay = dayjs(new Date(year, month - 1, day, hour, minute, second));

    const timeLeftMinutes = eventDay.diff(currentTime, 'minute');

    const timeLeftForPhaseMinutes = status == "Avant-Questions des jeunes"
        ? timeLeftMinutes - (daysFoSending + daysForQuestions) * 24 * 60
        : status == "Questions des jeunes"
            ? timeLeftMinutes - daysFoSending * 24 * 60
            : status == "Questions envoyées"
                ? timeLeftMinutes
                : 0;
    const color = getColor(status);

    const formattedDate = eventDay.format('YYYY-MM-DD');
    const formattedTime = eventDay.format('HH:mm');
    const activedLive = async (id) => {
        const idd = Number(id)
        console.log(id)
        await axios.patch(`${SPRINGBOOT_API_URL}/streams/${idd}`)
    }

    return (
        (!(status === "Avant-Questions des jeunes" && !isItForAdmin) &&
            <div className={`col-auto m-0 ${isHidden ? 'hidden-item' : ''}`} style={{ ...(isItForAdmin ? { cursor: 'pointer' } : {}) }} onClick={() => {
                if (!isItForAdmin) return;
                showModifyLivePlanification(item);

            }}>
                <div className="blog grid-blog m-0" style={{ height: '100%' }}>
                    <div className="blog-content">
                        <div className="blog-grp-blk">
                            <div className="blog-img-blk">
                                <div className="content-blk-blog ms-1 mt-1">
                                    <h4><a
                                        href={item.lienYoutube}
                                        style={{ fontSize: 'calc(0.9em + 0.08vw)', pointerEvents: 'auto' }}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >

                                        {item.subject}</a></h4>
                                    <div style={{ width: '100%', marginInline: 'auto', borderBottom: '2px solid rgba(50, 55, 164, 1)', marginBottom: '8px', paddingTop: '8px' }}></div>
                                </div>
                            </div>
                            <span style={{ marginLeft: '50px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                <span style={{ display: 'flex', fontSize: 'calc(1.4em + 0.08vw)', fontWeight: 'bold', justifyContent: 'center', alignItems: 'center' }}><i className="feather-calendar me-1"></i>{formattedDate}</span>
                                <h4 style={{ color: 'black', fontSize: 'calc(1.5em + 0.08vw)', fontWeight: 'bold' }}>{formattedTime}</h4>
                            </span>
                        </div>
                        <h3 className="blog-title">Phase:
                            <span style={{ color: color, marginLeft: '10px', fontWeight: 'bold' }}>
                                {status}
                            </span>
                        </h3>
                        {(timeLeftMinutes > 0) && <>
                            <h3 className="blog-title">Temps restant dans la phase:
                                <span style={{ color: 'black', marginLeft: '10px', fontWeight: 'bold' }}>
                                    {`${Math.floor(timeLeftForPhaseMinutes / 1440)} jrs ${Math.floor((timeLeftForPhaseMinutes % 1440) / 60)}h ${timeLeftForPhaseMinutes % 60}m`}
                                </span>
                            </h3>
                            <h3 className="blog-title">Temps restant pour le Live:
                                <span style={{ color: 'black', marginLeft: '10px', fontWeight: 'bold' }}>
                                    {`${Math.floor(timeLeftMinutes / 1440)} jrs ${Math.floor((timeLeftMinutes % 1440) / 60)}h ${timeLeftMinutes % 60}m`}
                                </span>
                            </h3>
                        </>
                        }
                        {status === "Avant-Questions des jeunes" && isItForAdmin &&
                            <div className='d-flex gap-2 ' id=''>
                                {(timeLeftMinutes > daysBeforeAutoInform * 24 * 60) && <a
                                    href="#"

                                    className={`btn btn-primary w-100 d-flex justify-content-between align-items-center custom-button-ies custom-button-ies-question ${false ? 'custom-disabled' : ''}`}
                                    onClick={(event) => { event.stopPropagation(); activedLive(item.id) }}
                                >
                                    <span className='me-4' style={{ whiteSpace: 'noWrap' }}>Informer l&apos;intervenant </span><i className="fa fa-user-md" />
                                </a>}
                                <a
                                    href="#"
                                    className={`btn btn-primary w-100 d-flex justify-content-between align-items-center custom-button-ies custom-button-ies-question ${false ? 'custom-disabled' : ''}`}
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        deleting(item.id);
                                        setIsHidden(true);
                                    }}
                                >
                                    <span className='me-4' style={{ whiteSpace: 'noWrap' }}>Supprimer </span><i className="fa fa-trash" />
                                </a>
                            </div>
                        }
                        {status === "Questions des jeunes" && !isItForAdmin &&
                            <a
                                href="#"
                                className={`btn btn-primary col-md d-flex justify-content-between align-items-center custom-button-ies custom-button-ies-question ${false ? 'custom-disabled' : ''}`}
                                onClick={(event) => { event.stopPropagation(); if (!false) showAskQuestion(item); }}
                            >
                                <span className='me-4' style={{ whiteSpace: 'noWrap' }}>Posez une question sur la thématique </span><i className="fa fa-question" />
                            </a>
                        }
                    </div>
                </div>
            </div>
        ));
};

export default Live_Tracker_Card;
