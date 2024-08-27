"use client";
import "@/assets/css/style.css";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import {
  logo,
  baricon,
  baricon1,
  user06,
  noteicon1,
} from "@/components/imagepath";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from 'next/navigation';
import { RxCross1 } from "react-icons/rx";
import { IoCheckmark } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { PiSignOut } from "react-icons/pi";

const Header = () => {

    const t = useTranslations('Navbar');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(t('home'));

  const handleLogout = () => {
    console.log("object");
    localStorage.removeItem('access-token');
    router.push('/auth/jeunes');
  };
  const menuItems = [
    { title: t('profile'), icon: <FaRegUser/> },
    { title: t('logout'), icon: <PiSignOut /> , onClick: handleLogout },
  ];

  const onSelectChange = (value) => {
    const segments = pathname.split('/').filter(Boolean);
    segments[0] = value;
    const newPathname = `/${segments.join('/')}`;

    startTransition(() => {
      router.replace(newPathname);
    });
  };
  
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  const handlesidebar = () => {
    document.body.classList.toggle("mini-sidebar");
  };

  const handlesidebarmobilemenu = () => {
    document.body.classList.toggle("slide-nav");
    document.getElementsByTagName("html")[0].classList.toggle("menu-opened");
    /*document
      .getElementsByClassName("sidebar-overlay")[0]
      .classList.toggle("opened");*/
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
            <Image src={logo} width={50} height={35} alt="" />{" "}
            <span className="whitespace-nowrap">Espace Jeune</span>
          </Link>
        </div>
        <Link
          href="#"
          id="toggle_btn"
          onClick={handlesidebar}
          style={{ marginTop: "28px" }}
        >
          <Image src={baricon} alt="" />
        </Link>
        <Link
          href="#"
          id="mobile_btn"
          className="mobile_btn float-start mt-4"
          onClick={handlesidebarmobilemenu}
        >
          <Image src={baricon1} alt="" />
        </Link>

        <ul className="nav user-menu float-end">
          <li className="nav-item dropdown has-arrow user-profile-list">
            <Link
              href="/"
              className="dropdown-toggle nav-link user-link"
              data-bs-toggle="dropdown"
            >
              <div className="user-names">
                <h5>Ahmad Berada </h5>
              </div>
              <Image src={user06} alt="Admin" className="user-img" />
            </Link>
            <div className="dropdown-menu">
                {menuItems.map((item) => (
                    <p key={item.title} className="px-4 py-2 hover:bg-zinc-100 flex items-center space-x-2">
                      <span className="rtl:ml-1">{item.icon}</span>
                      <button 
                        onClick={item.onClick} // Use the onClick from the menuItems array
                        className="block text-sm font-medium text-gray-700"
                      >
                        {item.title}
                      </button>
                    </p>
                ))}
                <p className="px-4 py-2 hover:bg-zinc-100 flex items-center space-x-2">
                  {locale === 'fr' ? <span className="rtl:ml-1"><IoCheckmark /></span> : <span className="rtl:ml-1"><RxCross1 /></span>}
                  <button onClick={() => onSelectChange('fr')} className="block text-sm font-medium text-gray-700">
                    {t('languageFr')}
                  </button>
                </p>
                <p className="px-4 py-2 hover:bg-zinc-100 flex items-center space-x-2">
                  {locale === 'ar' ? <span className="rtl:ml-1"><IoCheckmark /></span> : <span className="rtl:ml-1"><RxCross1 /></span>}
                  <button onClick={() => onSelectChange('ar')} className="block text-sm font-medium text-gray-700 ">
                    {t('languageAr')}
                  </button>
                </p>
             
            </div>
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
      <style jsx>{`
        @media only screen and (max-width: 768px) {
          .header-left {
            margin-left: -100px;
          }
        }
      `}</style>
    </div>
  );
};

export default Header;
