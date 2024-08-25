import React, { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import LogoJeune from './LogoJeune';
import { FaBars, FaRegUserCircle, FaChevronDown } from 'react-icons/fa';
import { PiSignOut } from "react-icons/pi";
import { FaRegUser } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { GlobeIcon } from './ui/icons';

export default function Navbar() {
  const t = useTranslations('');
  const [language, setLanguage] = useState("fr");
  const [activeButton, setActiveButton] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(t('Dossier Medical'));
  const dropdownRef = useRef(null);
  const sidebarRef = useRef(null);

  const toggleLanguage = (lang) => {
    setLanguage(lang);
    window.location.href = `/${lang}`;
  };

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
    setLanguageDropdownOpen(false);
  };

  const toggleLanguageDropdown = () => {
    setLanguageDropdownOpen(!languageDropdownOpen);
    setDropdownOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
      setLanguageDropdownOpen(false);
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
  }, [isOpen]);

  const menuItems = [
    { title: t("Profile"), icon: <FaRegUser /> },
    { title: t("Se déconnecter"), icon: <PiSignOut /> },
  ];

  const navItems = [
    { title: t('Accueil'), href: '#' },
    { title: t('Dossier Medical'), href: '#' },
    { title: t('Education à la Santé'), href: '#' },
    { title: t('Tests Psychologiques'), href: '#' },
  ];

  return (
    <nav className="fixed-navbar p-4 shadow-gray-300 shadow-md h-16 flex items-center justify-between bg-white text-black relative">
      <div className="container mx-auto flex items-center justify-between">
        <LogoJeune height={60} width={120} className="lg:hidden mx-auto" />
        <div className="hidden lg:flex flex-grow justify-center space-x-12 font-medium">
          {navItems.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className={`hover:font-semibold text-gray-950 ${selectedTab === item.title ? 'border-b-4 pb-2 border-blue-900 font-semibold' : ''}`}
              onClick={() => handleTabClick(item.title)}
              style={{ marginInlineStart: "1rem", marginInlineEnd: "1rem" }}
            >
              {item.title}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex items-center space-x-2 relative" ref={dropdownRef}>
          <button onClick={toggleDropdown} className="flex items-center space-x-2 text-blue-950">
            <FaRegUserCircle size={24} />
            <span>{t('Ahmed')} </span>
            <FaChevronDown size={16} />
          </button>
          {dropdownOpen && (
            <div className="absolute -right-12 top-8 w-48 bg-gray-50 border border-gray-300 rounded-md shadow-lg z-10">
              <ul className="py-2">
                {menuItems.map((item) => (
                  <li key={item.title} className="px-4 py-2 hover:bg-gray-100 flex items-center space-x-2">
                    {item.icon}
                    <button onClick={item.action} className="block text-sm font-medium text-gray-700">
                      {item.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full ${activeButton === "language" ? "bg-muted hover:bg-muted/50" : ""}`}
            onClick={() => {
              handleButtonClick("language");
              toggleLanguageDropdown();
            }}
          >
            <GlobeIcon className="w-6 h-6 text-primary" />
            <span className="sr-only">{t('Language')}</span>
          </Button>
          {languageDropdownOpen && (
            <div className="absolute -right-12 top-8 w-48 bg-gray-50 border border-gray-300 rounded-md shadow-lg z-10">
              <ul className="py-2">
                <li className="px-4 py-2 hover:bg-gray-100 flex items-center space-x-2">
                  <img src="/france-flag.svg" alt="France Flag" className="w-5 h-5" />
                  <button onClick={() => toggleLanguage("fr")} className="block text-sm font-medium text-gray-700">
                    {t('Français')}
                  </button>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 flex items-center space-x-2">
                  <img src="/saudi-arabia-flag.svg" alt="Saudi Arabia Flag" className="w-5 h-5" />
                  <button onClick={() => toggleLanguage("ar")} className="block text-sm font-medium text-gray-700">
                    {t('Arabe')}
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="lg:hidden flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full ${activeButton === "language" ? "bg-muted hover:bg-muted/50" : ""}`}
            onClick={() => {
              handleButtonClick("language");
              toggleLanguageDropdown();
            }}
          >
            <GlobeIcon className="w-6 h-6 text-primary" />
            <span className="sr-only">{t('Language')}</span>
          </Button>
          {languageDropdownOpen && (
            <div className="absolute right-0 top-12 w-48 bg-gray-50 border border-gray-300 rounded-md shadow-lg z-10">
              <ul className="py-2">
                <li className="px-4 py-2 hover:bg-gray-100 flex items-center space-x-2">
                  <img src="/france-flag.svg" alt="France Flag" className="w-5 h-5" />
                  <button onClick={() => toggleLanguage("fr")} className="block text-sm font-medium text-gray-700">
                    {t('Français')}
                  </button>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 flex items-center space-x-2">
                  <img src="/saudi-arabia-flag.svg" alt="Saudi Arabia Flag" className="w-5 h-5" />
                  <button onClick={() => toggleLanguage("ar")} className="block text-sm font-medium text-gray-700">
                    {t('Arabe')}
                  </button>
                </li>
              </ul>
            </div>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
          >
            <FaBars className="w-6 h-6 text-primary" />
            <span className="sr-only">{t('Toggle menu')}</span>
          </Button>
        </div>
      </div>
      {isOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-gray-50 border-t border-gray-300 shadow-md">
          <ul className="py-4 space-y-4">
            {navItems.map((item) => (
              <li key={item.title} className="text-center">
                <a
                  href={item.href}
                  className={`block py-2 ${selectedTab === item.title ? 'font-semibold' : ''}`}
                  onClick={() => handleTabClick(item.title)}
                  style={{ marginInlineStart: "1rem", marginInlineEnd: "1rem" }}
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
