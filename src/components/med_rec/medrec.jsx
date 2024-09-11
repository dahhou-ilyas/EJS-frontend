"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Navbar from "../Navbar";
import { useTranslations } from 'next-intl';
import './custom.css';
import { UserIcon, CalendarIcon } from '../ui/icons';

export function Medrec() {
  const t = useTranslations('Med');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className={`flex flex-col min-h-screen ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
      <Navbar toggleTheme={toggleTheme} theme={theme} />

      <div className="flex flex-1 border-t border-muted-foreground/20">
        <main className={`flex-1 p-8 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-32 h-32">
              <AvatarImage src="/264x264.jpg" alt="User Image" className="w-full h-full object-cover" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="text-center text-primary">
              <p className="font-bold">{t('Ahmed')}</p>
              <p>
                {t('NIP')}: A123456
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 justify-center">
            <Link href="/ppn/profile">
              <div className={`flex flex-col items-center p-4 space-y-2 border rounded-md ${theme === 'light' ? 'bg-[#e6f2ff]' : 'bg-gray-700'} shadow-md hover:bg-muted/50 transition-colors`}>
                <UserIcon className="w-8 h-8 text-primary" />
                <p className="font-bold text-primary">
                  {t('Mon profil')}
                </p>
              </div>
            </Link>

            <Link href="/ppn/Historique">
              <div className={`flex flex-col items-center p-4 space-y-2 border rounded-md ${theme === 'light' ? 'bg-[#e6f2ff]' : 'bg-gray-700'} shadow-md hover:bg-muted/50 transition-colors`}>
                <CalendarIcon className="w-8 h-8 text-primary" />
                <p className="font-bold text-primary">
                  {t('Historique médical')}
                </p>
              </div>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
