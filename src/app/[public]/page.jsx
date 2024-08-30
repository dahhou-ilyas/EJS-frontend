"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
//import Navbar from "@/components/Navbar";
import WelcomingText from "@/components/WelcomingText";
//import LiveCaroussel from '@/components/LiveCaroussel';
// import {
//   PacmanLoader, RingLoader
// } from 'react-spinners'; // Import the desired spinner
import Header from '@/components/auth/Header';
import Csidebar from '@/components/auth/Csidebar';
//import Carousel from '@/components/ies/ui/carousel';
//import { carouselSlides } from '@/components/ies/utility/carousel-slides';
import { useLocale, useTranslations } from 'next-intl';
import CardsCaroussel from '@/components/CardsCaroussel';

export default function Home() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const t = useTranslations('Navbar');
  const locale = useLocale();

useEffect(() => {
  const handleResize = () => {
    setIsSmallScreen(window.innerWidth <= 768);
  };

  handleResize();
  window.addEventListener("resize", handleResize);

  return () => window.removeEventListener("resize", handleResize);
}, []);

  //   useEffect(() => {
  //     const token = localStorage.getItem('access-token');

  //     if (!token) {
  //       router.push('/auth/jeunes');
  //       return;
  //     }

  //     try {
  //       const decodedToken = jwtDecode(token);
  //       console.log(decodedToken);
  //       setUser(decodedToken);
  //     } catch (error) {
  //       console.error('Invalid token:', error);
  //       router.push('/auth/jeunes');
  //       return;
  //     }finally {
  //       setLoading(false);
  //     }
  //   }, [router]);

  //   if (loading) {
  //     return (
  //       <div className="flex items-center justify-center h-screen">
  //         <PacmanLoader
  //  color="#1e234a" />
  //       </div>
  //     );
  //   }

  //   if (!user) {
  //     return (
  //       <div className="flex items-center justify-center h-screen">
  //         <RingLoader color="#3498db" />
  //       </div>
  //     );
  //   }

  return (
    <>   
    <Header t={t} locale={locale}/>
    <div id="root">
      
      <Csidebar t={t}/>
      <div className="page-wrapper">
        <div className="content">
         
          
      <WelcomingText />
      {/* <LiveCaroussel /> */}
      <CardsCaroussel />
      </div>
      </div>
      </div>
    </>
  );
}