/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Sidebar from "@/components/TeleExpertise/Sidebar";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { getDiscussionsByMonth } from "@/services/discussionService";

const Calender = () => {
  const calendarRef = useRef(null);
  const [discussions, setDiscussions] = useState([]);
  const [ready, setReady] = useState(false);
  const [weekendsVisible, setweekendsVisible] = useState(true)

  const handleDatesSet = async (info) => {
    const calendarDate = info.view.currentStart;
    const month = calendarDate.getMonth() + 1;
    const year = calendarDate.getFullYear();
    
    const token = localStorage.getItem("access-token");
    try {
      const res = await getDiscussionsByMonth(token, month, year);
      setDiscussions(res.map(d => ({
        ...d,
        title: d.titre,
        start: d.date,
        className: "bg-primary"
      })));
      setReady(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {

    const initialLoad = async () => {
      const token = localStorage.getItem("access-token");
      const today = new Date();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();
      
      try {
        const res = await getDiscussionsByMonth(token, month, year);
        setDiscussions(res.map(d => ({
          ...d,
          title: d.titre,
          start: d.date,
          className: "bg-primary"
        })));
        setReady(true);
      } catch (error) {
        console.log(error.message);
      }
    };
    initialLoad();
  }, []);

  return (
    <>
      <div className="main-wrapper">
        <Sidebar activeClassName="calendar" />
        <div className="page-wrapper">
          <div className="content container-fluid">
            <div className="page-header">
              <div className="row align-items-center">
                <div className="col">
                  <ul className="breadcrumb">
                   <li className="breadcrumb-item">
                        <Link href="/espaceMedecin">Page d&#39;accueil </Link>
                    </li>
                    <li className="breadcrumb-item">
                        <FeatherIcon icon="chevron-right" />
                    </li>
                    <li className="breadcrumb-item">
                      <Link href="/TeleExpertise">Télé-Expertise</Link>
                    </li>
                    <li className="breadcrumb-item">
                      <FeatherIcon icon="chevron-right" />
                    </li>
                    <li className="breadcrumb-item active">Calendrier</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="card">
                  <div className="card-body">
                    <div id="calendar">
                      {ready && (
                        <FullCalendar
                          ref={calendarRef}
                          plugins={[
                            dayGridPlugin,
                            timeGridPlugin,
                            interactionPlugin,
                          ]}
                          headerToolbar={{
                            left: "prev,next today",
                            center: "title",
                            right: "dayGridMonth,timeGridWeek,timeGridDay",
                          }}
                          initialView="dayGridMonth"
                          editable={true}
                          selectable={true}
                          selectMirror={true}
                          dayMaxEvents={true}
                          weekends={weekendsVisible}
                          events={discussions}
                          datesSet={handleDatesSet}
                        />
                      )}
                    </div>
                  </div> 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Calender;
