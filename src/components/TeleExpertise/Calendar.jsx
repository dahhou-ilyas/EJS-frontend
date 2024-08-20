/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Header from "@/components/TeleExpertise/Header";
import Sidebar from "@/components/TeleExpertise/Sidebar";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { DatePicker } from "antd";

const Calender = () => {
  const [menu, setMenu] = useState(false);
  const onChange = (date, dateString) => {
    // console.log(date, dateString);
  };

  const toggleMobileMenu = () => {
    setMenu(!menu);
  };
  const [startDate, setDate] = useState(new Date()),
    [showCategory, setshowCategory] = useState(false),
    [showmodel, setshowmodel] = useState(false),
    [showEvents, setshowEvents] = useState(false),
    [show, setshow] = useState(false),
    [iseditdelete, setiseditdelete] = useState(false),
    [addneweventobj, setaddneweventobj] = useState(null),
    [isnewevent, setisnewevent] = useState(false),
    [event_title, setevent_title] = useState(""),
    [category_color, setcategory_color] = useState(""),
    [calenderevent, setcalenderevent] = useState(""),
    [weekendsVisible, setweekendsVisible] = useState(true),
    [currentEvents, setscurrentEvents] = useState([]),
    defaultEvents = [
      {
        title: "Event Name 4",
        start: Date.now() + 148000000,
        className: "bg-purple",
      },
      {
        title: "Test Event 1",
        start: Date.now(),
        end: Date.now(),
        className: "bg-success",
      },
      {
        title: "Test Event 2",
        start: Date.now() + 168000000,
        className: "bg-info",
      },
      {
        title: "Test Event 3",
        start: Date.now() + 338000000,
        className: "bg-primary",
      },
    ];
  useEffect(() => {
    let elements = Array.from(
      document.getElementsByClassName("react-datepicker-wrapper")
    );
    elements.map((element) => element.classList.add("width-100"));
  }, []);

  const handleChange = (date) => {
    setDate(date);
  };
  const addEvent = () => {
    setshowEvents(true);
  };
  const categoryHandler = () => {
    setshowCategory(true);
  };

  const handleClose = () => {
    setisnewevent(false);
    setiseditdelete(false);
    setshow(false);
    setshowCategory(false);
    setshowEvents(false);
    setshowmodel(false);
  };

  const handleEventClick = (clickInfo) => {
    setiseditdelete(false);
    setevent_title(clickInfo.event.title);
    setcalenderevent(clickInfo.event);
  };

  const handleDateSelect = (selectInfo) => {
    setisnewevent(true);
    setaddneweventobj(selectInfo);
  };
  const addnewevent = () => {
    let calendarApi = addneweventobj.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (event_title) {
      calendarApi.addEvent({
        id: 10,
        title: event_title,
        className: category_color,
        start: addneweventobj.startStr,
        end: addneweventobj.endStr,
        allDay: addneweventobj.allDay,
      });
    }
    setisnewevent(false);
  };

  const onupdateModalClose = () => {
    setiseditdelete(false);
    setevent_title("");
  };
  //   const oncreateeventModalClose = () => {
  //     setevent_title("");
  //     setisnewevent(false);
  //   };
  //   const removeevent = () => {
  //     calenderevent.remove();
  //     setiseditdelete(false);
  //   };
  //   const clickupdateevent = () => {
  //     const newArray = defaultEvents;
  //     for (let i = 0; i < newArray.length; i++) {
  //       if (newArray[i].id === parseInt(calenderevent.id)) {
  //         newArray[i].title = event_title;
  //       }
  //     }
  //     defaultEvents = newArray;
  //     setiseditdelete(false);
  //   };

  const handleClick = () => {
    setshow(true);
  };
  // console.log("showmodel", showmodel);

  return (
    <>
      <div className="main-wrapper">
        <Header />
        <Sidebar activeClassName="calendar" />
        {/* Page Wrapper */}
        <div className="page-wrapper">
          <div className="content container-fluid">
            {/* Page Header */}
            <div className="page-header">
              <div className="row align-items-center">
                <div className="col">
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link href="/TeleExpertise">Page d'accueil</Link>
                    </li>
                    <li className="breadcrumb-item">
                      <i className="feather-chevron-right">
                        <FeatherIcon icon="chevron-right" />
                      </i>
                    </li>
                    <li className="breadcrumb-item active">Calendrier</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="page-header">
              <div className="row align-items-center">
                <div className="col" />
              </div>
            </div>
            {/* /Page Header */}
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="card">
                  <div className="card-body">
                    <div id="calendar">
                      <FullCalendar
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
                        initialEvents={defaultEvents} // alternatively, use the `events` setting to fetch from a feed
                        select={handleDateSelect}
                        eventClick={(clickInfo) => handleEventClick(clickInfo)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Add Event Modal */}
            <div className="modal fade none-border" id="my_event">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className="modal-title">Add Event</h4>

                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-hidden="true"
                    ></button>
                  </div>
                  <div className="modal-body" />
                </div>
              </div>
            </div>
            {/* /Add Event Modal */}
          </div>

          {/* Footer */}
        </div>
        <div id="add_event" className="modal custom-modal fade" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Event</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true"></span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label>
                      Event Name <span className="text-danger">*</span>
                    </label>
                    <input className="form-control" type="text" />
                  </div>
                  <div className="form-group">
                    <label>
                      Event Date <span className="text-danger">*</span>
                    </label>
                    <div className="cal-icon">
                      <DatePicker
                        className="form-control datetimepicker"
                        onChange={onChange}
                        suffixIcon={null}
                      />
                    </div>
                  </div>
                  <div className="submit-section">
                    <button className="btn btn-primary submit-btn">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Main Wrapper */}
    </>
  );
};

export default Calender;
