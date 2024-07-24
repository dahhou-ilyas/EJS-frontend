"use client";
import Image from "next/image";
import { arabe, francais } from "./imagepath";
import { useLanguage } from "@/app/context/LanguageContext";

const BUTTON = () => {
  const { arabic, toggleLanguage } = useLanguage();

  return (
    <div>
  <button 
    onClick={toggleLanguage} 
    style={{
      background: 'none', 
      border: 'none', // Retire la bordure par défaut
      padding: '0', // Retire le padding par défaut
      cursor: 'pointer', // Change le curseur pour indiquer que c'est cliquable
    }}
  >
    <Image 
      src={arabic ? arabe : francais} 
      width={35} 
      height={35} 
      alt={arabic ? 'Arabic' : 'French'}
      style={{ 
        transform: 'scale(0.9)', 
        display: 'block' 
      }} 
    />
  </button>
</div>

  );
};

export default BUTTON;
