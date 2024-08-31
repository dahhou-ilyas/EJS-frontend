"use client"
import dynamic from 'next/dynamic';

const Csidebar = dynamic(() => import('./Sidebar'), { ssr: false });

export default Csidebar;
