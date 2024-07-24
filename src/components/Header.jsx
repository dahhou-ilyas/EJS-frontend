"use client";
import Link from "next/link";
import { useEffect } from "react";
import {
  logo,
  baricon,
  baricon1,
  searchnormal,
  imguser,
  noteicon,
  user06,
  settingicon01,
  noteicon1,
} from "./imagepath";
import Image from "next/image";


const Header = () => {

  /* useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []); */
  
  const handlesidebar = () => {
    document.body.classList.toggle("mini-sidebar");
  };

  const handlesidebarmobilemenu = () => {
    document.body.classList.toggle("slide-nav");
    document.getElementsByTagName("html")[0].classList.toggle("menu-opened");
    documentChaimaAitAli
      .getElementsByClassName("sidebar-overlay")[0]
      .classList.toggle("opened");
  };

  const openDrawer = () => {
    const div = document.querySelector(".main-wrapper");
    if (div?.className?.includes("open-msg-box")) {
      div?.classList?.remove("open-msg-box");
    } else {
      div?.classList?.add("open-msg-box");
    }
  };

  useEffect(() => {
    const handleClick = () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        if (document.exitChaimaAitAliFullscreen) {
          document.exitFullscreen();
        }
      }
    };

    const maximizeBtn = document.querySelector(".win-maximize");
    // maximizeBtn.addEventListener('click', handleClick);

    return () => {
      // maximizeBtn.removeEventListener('click', handleClick);
    };
  }, []);
  return (
    <div className="main-wrapper">
      <div className="header">
        <div className="header-left">
          <Link href="/" className="logo">
         <Image src={logo} width={35} height={35} alt="" />{" "} 
            <span>e-ESJ</span>
          </Link>
        </div>
    {  /*     <Link href="/" id="toggle_btn" onClick={handlesidebar}>
          <Image src={baricon} alt="" />
        </Link>
     <Link
          href="/"
          id="mobile_btn"
          className="mobile_btn float-start"
          onClick={handlesidebarmobilemenu}>
     
          <Image src={baricon1} alt="" />
        </Link> */}
        <div className="top-nav-search mob-view">
          <form>
            <input
              type="text"
              className="form-control"
              placeholder="Search here"
            />
            <Link href="/" className="btn">
              <Image src={searchnormal} alt="" />
            </Link>
          </form>
        </div>
        <ul className="nav user-menu float-end">
          <li className="nav-item dropdown d-none d-sm-block">
            <Link
              href="/"
              className="dropdown-toggle nav-link"
              data-bs-toggle="dropdown"
            >
              <Image src={noteicon} alt="" />
              <span className="pulse" />{" "}
            </Link>
            <div className="dropdown-menu notifications">
              <div className="topnav-dropdown-header">
                <span>Notifications</span>
              </div>
              <div className="drop-scroll">
                <ul className="notification-list">
                  <li className="notification-message">
                    <Link href="/">
                      <div className="media">
                        <span className="avatar">V</span>
                        <div className="media-body">
                          <p className="noti-details">
                            <span className="noti-title">John Doe</span> added
                            new task{" "}
                            <span className="noti-title">
                              Patient appointment booking
                            </span>
                          </p>
                          <p className="noti-time">
                            <span className="notification-time">
                              4 mins ago
                            </span>
                          </p>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="notification-message">
                    <Link href="/">
                      <div className="media">
                        <span className="avatar">V</span>
                        <div className="media-body">
                          <p className="noti-details">
                            <span className="noti-title">Tarah Shropshire</span>{" "}
                            changed the task name{" "}
                            <span className="noti-title">
                              Appointment booking with payment gateway
                            </span>
                          </p>
                          <p className="noti-time">
                            <span className="notification-time">
                              6 mins ago
                            </span>
                          </p>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="notification-message">
                    <Link href="/">
                      <div className="media">
                        <span className="avatar">L</span>
                        <div className="media-body">
                          <p className="noti-details">
                            <span className="noti-title">Misty Tison</span>{" "}
                            added{" "}
                            <span className="noti-title">Domenic Houston</span>{" "}
                            and <span className="noti-title">Claire Mapes</span>{" "}
                            to project{" "}
                            <span className="noti-title">
                              Doctor available module
                            </span>
                          </p>
                          <p className="noti-time">
                            <span className="notification-time">
                              8 mins ago
                            </span>
                          </p>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="notification-message">
                    <Link href="/">
                      <div className="media">
                        <span className="avatar">G</span>
                        <div className="media-body">
                          <p className="noti-details">
                            <span className="noti-title">Rolland Webber</span>{" "}
                            completed task{" "}
                            <span className="noti-title">
                              Patient and Doctor video conferencing
                            </span>
                          </p>
                          <p className="noti-time">
                            <span className="notification-time">
                              12 mins ago
                            </span>
                          </p>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="notification-message">
                    <Link href="/">
                      <div className="media">
                        <span className="avatar">V</span>
                        <div className="media-body">
                          <p className="noti-details">
                            <span className="noti-title">Bernardo Galaviz</span>{" "}
                            added new task{" "}
                            <span className="noti-title">
                              Private chat module
                            </span>
                          </p>
                          <p className="noti-time">
                            <span className="notification-time">
                              2 days ago
                            </span>
                          </p>
                        </div>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="topnav-dropdown-footer">
                <Link href="/">View all Notifications</Link>
              </div>
            </div>
          </li>
          <li className="nav-item dropdown d-none d-sm-block">
            <Link
              href="/"
              onClick={openDrawer}
              id="open_msg_box"
              className="hasnotifications nav-link"
            >
              <Image src={noteicon1} alt="" />
              <span className="pulse" />{" "}
            </Link>
          </li>
          <li className="nav-item dropdown has-arrow user-profile-list">
            <Link
              href="/"
              className="dropdown-toggle nav-link user-link"
              data-bs-toggle="dropdown"
            >
              <div className="user-names">
                <h5>Liam Michael </h5>
                <span>Admin</span>
              </div>
              {/* <span className="user-img">
                <Image src={user06} alt="Admin"/>
              </span> */}
              <Image src={user06} alt="Admin" className="user-img"/>
            </Link>
            <div className="dropdown-menu">
              <Link href="/" className="dropdown-item">
                My Profile
              </Link>
              <Link href="/" className="dropdown-item">
                Edit Profile
              </Link>
              <Link href="/" className="dropdown-item">
                Settings
              </Link>
              <Link href="/" className="dropdown-item">
                Logout
              </Link>
            </div>
          </li>
    <li className="nav-item ">
            <Link href="/" className="hasnotifications nav-link">
              <Image src={settingicon01} alt="" />{" "}
            </Link>
          </li>
        </ul>
        <div className="dropdown mobile-user-menu float-end">
          <Link
            href="/"
            className="dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa-solid fa-ellipsis-vertical" />
          </Link>
          <div className="dropdown-menu dropdown-menu-end">
            <Link href="/" className="dropdown-item">
              My Profile
            </Link>
            <Link href="/" className="dropdown-item">
              Edit Profile
            </Link>
            <Link href="/" className="dropdown-item">
              Settings
            </Link>
            <Link href="/" className="dropdown-item">
              Logout
            </Link>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="notification-box">
        <div className="msg-sidebar notifications msg-noti">
          <div className="topnav-dropdown-header">
            <span>Messages</span>
          </div>
          <div className="drop-scroll msg-list-scroll" id="msg_list">
            <ul className="list-box">
              <li>
                <Link href="/">
                  <div className="list-item">
                    <div className="list-left">
                      <span className="avatar">R</span>
                    </div>
                    <div className="list-body">
                      <span className="message-author">Richard Miles </span>
                      <span className="message-time">12:28 AM</span>
                      <div className="clearfix"></div>
                      <span className="message-content">
                        Lorem ipsum dolor sit amet, consectetur adipiscing
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <div className="list-item new-message">
                    <div className="list-left">
                      <span className="avatar">J</span>
                    </div>
                    <div className="list-body">
                      <span className="message-author">John Doe</span>
                      <span className="message-time">1 Aug</span>
                      <div className="clearfix"></div>
                      <span className="message-content">
                        Lorem ipsum dolor sit amet, consectetur adipiscing
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <div className="list-item">
                    <div className="list-left">
                      <span className="avatar">T</span>
                    </div>
                    <div className="list-body">
                      <span className="message-author"> Tarah Shropshire </span>
                      <span className="message-time">12:28 AM</span>
                      <div className="clearfix"></div>
                      <span className="message-content">
                        Lorem ipsum dolor sit amet, consectetur adipiscing
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <div className="list-item">
                    <div className="list-left">
                      <span className="avatar">M</span>
                    </div>
                    <div className="list-body">
                      <span className="message-author">Mike Litorus</span>
                      <span className="message-time">12:28 AM</span>
                      <div className="clearfix"></div>
                      <span className="message-content">
                        Lorem ipsum dolor sit amet, consectetur adipiscing
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <div className="list-item">
                    <div className="list-left">
                      <span className="avatar">C</span>
                    </div>
                    <div className="list-body">
                      <span className="message-author">
                        {" "}
                        Catherine Manseau{" "}
                      </span>
                      <span className="message-time">12:28 AM</span>
                      <div className="clearfix"></div>
                      <span className="message-content">
                        Lorem ipsum dolor sit amet, consectetur adipiscing
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <div className="list-item">
                    <div className="list-left">
                      <span className="avatar">D</span>
                    </div>
                    <div className="list-body">
                      <span className="message-author"> Domenic Houston </span>
                      <span className="message-time">12:28 AM</span>
                      <div className="clearfix"></div>
                      <span className="message-content">
                        Lorem ipsum dolor sit amet, consectetur adipiscing
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <div className="list-item">
                    <div className="list-left">
                      <span className="avatar">B</span>
                    </div>
                    <div className="list-body">
                      <span className="message-author"> Buster Wigton </span>
                      <span className="message-time">12:28 AM</span>
                      <div className="clearfix"></div>
                      <span className="message-content">
                        Lorem ipsum dolor sit amet, consectetur adipiscing
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <div className="list-item">
                    <div className="list-left">
                      <span className="avatar">R</span>
                    </div>
                    <div className="list-body">
                      <span className="message-author"> Rolland Webber </span>
                      <span className="message-time">12:28 AM</span>
                      <div className="clearfix"></div>
                      <span className="message-content">
                        Lorem ipsum dolor sit amet, consectetur adipiscing
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <div className="list-item">
                    <div className="list-left">
                      <span className="avatar">C</span>
                    </div>
                    <div className="list-body">
                      <span className="message-author"> Claire Mapes </span>
                      <span className="message-time">12:28 AM</span>
                      <div className="clearfix"></div>
                      <span className="message-content">
                        Lorem ipsum dolor sit amet, consectetur adipiscing
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <div className="list-item">
                    <div className="list-left">
                      <span className="avatar">M</span>
                    </div>
                    <div className="list-body">
                      <span className="message-author">Melita Faucher</span>
                      <span className="message-time">12:28 AM</span>
                      <div className="clearfix"></div>
                      <span className="message-content">
                        Lorem ipsum dolor sit amet, consectetur adipiscing
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <div className="list-item">
                    <div className="list-left">
                      <span className="avatar">J</span>
                    </div>
                    <div className="list-body">
                      <span className="message-author">Jeffery Lalor</span>
                      <span className="message-time">12:28 AM</span>
                      <div className="clearfix"></div>
                      <span className="message-content">
                        Lorem ipsum dolor sit amet, consectetur adipiscing
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <div className="list-item">
                    <div className="list-left">
                      <span className="avatar">L</span>
                    </div>
                    <div className="list-body">
                      <span className="message-author">Loren Gatlin</span>
                      <span className="message-time">12:28 AM</span>
                      <div className="clearfix"></div>
                      <span className="message-content">
                        Lorem ipsum dolor sit amet, consectetur adipiscing
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <div className="list-item">
                    <div className="list-left">
                      <span className="avatar">T</span>
                    </div>
                    <div className="list-body">
                      <span className="message-author">Tarah Shropshire</span>
                      <span className="message-time">12:28 AM</span>
                      <div className="clearfix"></div>
                      <span className="message-content">
                        Lorem ipsum dolor sit amet, consectetur adipiscing
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
          <div className="topnav-dropdown-footer">
            <Link href="/">See all messages</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
