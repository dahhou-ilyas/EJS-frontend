import React from "react";
import Link from "next/link";
import {
  baricon,
  baricon1,
  searchnormal,
  user06,
  settingicon01,
  noteicon1,
  customLogo,
} from "@/components/ies/utility/image-path";
import Image from 'next/image';

const Header = ({ name, role }) => {
  return (
    <div className="main-wrapper">
      <div className="header">
        <div className="header-left">
          <Link href="/" className="logo" style={{ fontSize: '32px' }}>
            IES
            {/* <span style={{ paddingLeft: '10px' }}> IES </span> */}
          </Link>
        </div>
        <div className="top-nav-search mob-view">
          <form>
            <input
              type="text"
              className="form-control"
              placeholder="Search here"
            />
            <Link className="btn" href="#">
              <Image src={searchnormal} width={20} height={20} alt="Search" />
            </Link>
          </form>
        </div>
        <ul className="nav user-menu float-end">
          <li className="nav-item dropdown d-none d-sm-block">
            <Link
              id="open_msg_box"
              className="hasnotifications nav-link"
              href="#"
            >
              {/* <span className="pulse" />{" "} */}
            </Link>
          </li>
          <li className="nav-item dropdown has-arrow user-profile-list">
            <Link
              href="#"
              className="dropdown-toggle nav-link user-link"
              data-bs-toggle="dropdown"
            >
              <div className="user-names">
                <h5>{name} </h5>
                <span>{role}</span>
              </div>
              <span className="user-img">
                <img src={user06} alt="Admin" />
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
