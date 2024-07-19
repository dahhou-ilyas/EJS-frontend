import React from 'react';
import Image from "next/image";

import { LanguageSelector } from '@/components/LanguageSelector';

import Logo from "../../../public/logoJeune.png";
import { BiArrowBack } from "react-icons/bi";



const Layout = ({ title, subtitle, fields, prevStep }) => {

    

      const logoConfig = {
        default: {
            src: Logo,
            height: 80,
            width: 160,
            ml: '-ml-2',
            mt: 'mt-2',
        },
    };

    const selectedLogo = logoConfig.default;

  return (

    <div className="lg:h-screen lg:flex lg:items-center lg:justify-center bg-[#6d7886a3]">
        <div className="ml-4 mt-1 flex justify-between lg:hidden w-full">
            {prevStep && <div onClick={prevStep}><BiArrowBack 
                color="black" 
                size={20} 
                className="
                cursor-pointer 
                hover:opacity-70 
                transition
                inline
            "/>
            <span className="ml-2 mt-1">Retour</span></div>}
            <div className="ml-auto mr-4">
                <LanguageSelector />
            </div>
        </div>
        <div className="w-full lg:min-h-[450px] lg:max-w-7xl lg:border lg:rounded-3xl lg:min-w-[900px] xl:min-w-[1000px] bg-white sm:flex lg:mx-48">
            <div className="w-full sm:w-1/2 sm:ml-8 sm:mb-2 sm:mt-8 mx-4 flex flex-col justify-between">
                <div className="">
                    {prevStep && <div onClick={prevStep} className='cursor-pointer hover:opacity-70 transition -mt-4 mb-2 hidden lg:block'>
                    
                        <BiArrowBack 
                        color="black" 
                        size={20} 
                        className="inline"
                        />
                        <span className="ml-2 ">Retour</span>
                    </div>}
                    <div className={`flex items-center justify-center w-fit ${selectedLogo.ml}`}>
                            <Image 
                                src={selectedLogo.src} 
                                alt="Logo" 
                                height={selectedLogo.height} 
                                width={selectedLogo.width} 
                                
                            />
                        </div>
                        <h2 className={`sm:text-3xl text-2xl font-medium ${selectedLogo.mt} text-gray-950`}>{title}</h2>
                    <h4 className="sm:text-lg text-gray-700 mt-1">{subtitle}</h4>   
                </div>
                <div className="hidden lg:block">
                    <LanguageSelector />
                </div>
            </div>
            <div className="w-full sm:w-1/2 sm:mt-8 sm:mb-4 sm:mr-8 sm:ml-4 px-4 mt-4">
                {fields}
            </div>
            
        </div>
        </div>
    )
    }

export default Layout;