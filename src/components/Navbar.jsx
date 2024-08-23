"use client";

import React, { useState, useEffect, useRef } from 'react';
import LogoJeune from './LogoJeune';
import { FaBars, FaRegUserCircle, FaChevronDown } from 'react-icons/fa';
import { PiSignOut } from "react-icons/pi";
import { IoCheckmark } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { FaRegUser } from "react-icons/fa6";
import { FiChevronRight } from "react-icons/fi";
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useTransition } from 'react';

export default function Navbar({ user }) {
  const t = useTranslations('Navbar');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(t('home'));
  const dropdownRef = useRef(null);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
    if (sidebarRef.current && !sidebarRef.current.contains(event.target) && isOpen) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  const handleLogout = () => {
    console.log("object");
    localStorage.removeItem('access-token');
    router.push('/auth/jeunes');
  };

  const menuItems = [
    { title: t('profile'), icon: <FaRegUser/> },
    { title: t('logout'), icon: <PiSignOut /> , onClick: handleLogout },
  ];

  const navItems = [
    { title: t('home'), href: '#' },
    { title: t('medicalRecord'), href: '#' },
    { title: t('healthEducation'), href: '#' },
    { title: t('psychTests'), href: '#' },
    { title: t('chatBot'), href: '#' },
    { title: t('tele'), href: "/TeleExpertise" }
  ];

  const onSelectChange = (value) => {
    const segments = pathname.split('/').filter(Boolean);
    segments[0] = value;
    const newPathname = `/${segments.join('/')}`;

    startTransition(() => {
      router.replace(newPathname);
    });
  };

  // Extract prenom and capitalize it
  const firstName = user?.claims?.prenom
    ? user.claims.prenom.charAt(0).toUpperCase() + user.claims.prenom.slice(1).toLowerCase()
    : "";

  return (
    <nav className="p-4 shadow-gray-300 shadow-md h-16 flex items-center justify-between bg-white text-black relative">
      <div className="container mx-auto flex items-center justify-between">
        <LogoJeune height={60} width={120} className="lg:hidden mx-auto" />
        <div className="hidden lg:flex flex-grow justify-center font-medium">
          {navItems.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className={`hover:font-semibold text-gray-950 no-underline ${selectedTab === item.title ? 'border-b-4 pb-2 border-blue-900 font-semibold' : ''} mx-6 text-sm`}
              onClick={() => handleTabClick(item.title)}
            >
              {item.title}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex items-center space-x-2 relative" ref={dropdownRef}>
          <button onClick={toggleDropdown} className="flex items-center space-x-2 text-blue-950">
            <FaRegUserCircle size={24} className='rtl:ml-2'/>
            <span>{firstName || t('username')}</span>
            <FaChevronDown size={16} />
          </button>
          {dropdownOpen && (
            <div className="absolute -right-12 top-8 w-48 bg-gray-50 border border-gray-300 rounded-md shadow-lg z-10">
              <ul className="py-2">
                {menuItems.map((item) => (
                  <li key={item.title} className="px-4 py-2 hover:bg-zinc-100 flex items-center space-x-2">
                    <span className="rtl:ml-1">{item.icon}</span>
                    <button 
                      onClick={item.onClick} // Use the onClick from the menuItems array
                      className="block text-sm font-medium text-gray-700"
                    >
                      {item.title}
                    </button>
                  </li>
                ))}
                <li className="px-4 py-2 hover:bg-zinc-100 flex items-center space-x-2">
                  {locale === 'fr' ? <span className="rtl:ml-1"><IoCheckmark /></span> : <span className="rtl:ml-1"><RxCross1 /></span>}
                  <button onClick={() => onSelectChange('fr')} className="block text-sm font-medium text-gray-700">
                    {t('languageFr')}
                  </button>
                </li>
                <li className="px-4 py-2 hover:bg-zinc-100 flex items-center space-x-2">
                  {locale === 'ar' ? <span className="rtl:ml-1"><IoCheckmark /></span> : <span className="rtl:ml-1"><RxCross1 /></span>}
                  <button onClick={() => onSelectChange('ar')} className="block text-sm font-medium text-gray-700 ">
                    {t('languageAr')}
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
        <button className="lg:hidden" onClick={toggleSidebar}>
          <FaBars size={24} />
        </button>
      </div>

      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-75 ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-0 lg:hidden z-50`}
      >
        <div ref={sidebarRef} className={`transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} ltr:transition-transform ltr:duration-300 ltr:ease-in-out p-4 bg-white h-full flex flex-col justify-between w-3/5 sm:w-2/5`}>
          <div>
            <div className="flex justify-between mb-4">
              <LogoJeune height={60} width={120} />
              <button onClick={toggleSidebar} className="text-black">
                <RxCross1 size={24} />
              </button>
            </div>
            <nav className="space-y-4">
              {navItems.map((item) => (
                <div key={item.title}>
                  <a
                    href={item.href}
                    className={`pb-2 flex justify-between items-center text-black hover:font-bold font-semibold transition-colors duration-300 ease-in-out ${selectedTab === item.title ? 'font-bold' : ''}`}
                    onClick={() => handleTabClick(item.title)}
                  >
                    {item.title}
                    <FiChevronRight />
                  </a>
                  <hr className="border-gray-300 " />
                </div>
              ))}
            </nav>
          </div>
          <nav className="space-y-4">
            {menuItems.map((item) => (
              <div key={item.title}>
                <p
                  className="flex items-center space-x-2 text-black hover:font-semibold transition-colors duration-300 ease-in-out"
                >
                  <span className="rtl:ml-1">{item.icon}</span>
                  <button
                    onClick={item.onClick} // Use the onClick from the menuItems array
                    className="block text-sm font-medium text-gray-700"
                  >
                    {item.title}
                  </button>
                </p>
                <hr className="border-gray-300" />
              </div>
            ))}
            <div>
              <button
                onClick={() => onSelectChange('fr')}
                className="flex items-center space-x-2 text-black hover:font-semibold transition-colors duration-300 ease-in-out"
              >
                {locale === 'fr' ? <span className="rtl:ml-1"><IoCheckmark /></span> : <span className="rtl:ml-1"><RxCross1 /></span>}
                <span className='rtl:mr-1'>{t('languageFr')}</span>
              </button>
              <hr className="border-gray-300" />
            </div>
            <div>
              <button
                onClick={() => onSelectChange('ar')}
                className="flex items-center space-x-2 text-black hover:font-semibold transition-colors duration-300 ease-in-out"
              >
                {locale === 'ar' ? <span className="rtl:ml-1"><IoCheckmark /></span> : <span className="rtl:ml-1"><RxCross1 /></span>}
                <span className='rtl:mr-1'>{t('languageAr')}</span>
              </button>
              <hr className="border-gray-300" />
            </div>
          </nav>
        </div>
      </div>
    </nav>
  );
}
