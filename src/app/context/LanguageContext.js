"use client"
import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [arabic, setArabic] = useState(false);

  const toggleLanguage = () => {
    setArabic((prev) => !prev);
  };

  return (
    <LanguageContext.Provider value={{ arabic, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
