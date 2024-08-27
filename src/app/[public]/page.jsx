"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import Navbar from "@/components/Navbar";
import WelcomingText from "@/components/WelcomingText";
import LiveCaroussel from '@/components/LiveCaroussel';
import {
  PacmanLoader, RingLoader
} from 'react-spinners'; // Import the desired spinner
import Header from '@/components/auth/Header';
import Csidebar from '@/components/auth/Csidebar';
import Carousel from '@/components/ies/ui/carousel';
import { carouselSlides } from '@/components/ies/utility/carousel-slides';

export default function Home() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

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

      <Header />
      <Csidebar />
      {/* <Navbar user={user} /> */}
      <div className='my-9'>.</div>
      <WelcomingText user={user} />


      <div className="flex justify-center">
        <div className="w-full px-[20px] xl:px-0 pt-[20px] pb-[50px] xl:max-w-[1150px]">
          <Carousel slides={carouselSlides} />
        </div>
      </div>
    </>
  );
}