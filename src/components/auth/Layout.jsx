import React from 'react';
import Image from "next/image";
import { useTranslations } from 'next-intl';
//import { LanguageSelector } from '@/components/LanguageSelector';
import Logo from "../../../public/e-Espace.jpeg";
import { BiArrowBack } from "react-icons/bi";
import { LanguageSelector2 } from '../LanguageSelector2';

const Layout = ({ title, subtitle, fields, prevStep }) => {
  const t = useTranslations('Layout');

  const logoConfig = {
    default: {
      src: Logo,
      height: 120,
      width: 250,
      ml: '-ml-2',
      mt: 'mt-4',
    },
  };

  const selectedLogo = logoConfig.default;

  return (
    <div className="min-h-screen lg:flex lg:items-center lg:justify-center lg:bg-gray-400">
      <div className="ml-4 mt-1 flex justify-between lg:hidden w-full">
        {prevStep && (
          <div onClick={prevStep}>
            <BiArrowBack
              color="black"
              size={20}
              className="cursor-pointer rtl:ml-1 inline rtl:rotate-180"
            />
            <span className="ltr:ml-2 rtl:mr-2 mt-1 cursor-pointer hover:opacity-70 transition">{t('back')}</span>
          </div>
        )}
        <div className="ltr:ml-auto sm:ltr:mr-4 rtl:mr-auto sm:rtl:ml-4">
          <LanguageSelector2 />
        </div>
      </div>
      <div className="w-full lg:min-h-[450px] lg:max-w-7xl lg:border lg:rounded-3xl lg:min-w-[900px] xl:min-w-[1000px] bg-white sm:flex lg:mx-48 shadow-md">
        <div className="w-full sm:w-1/2 sm:ml-8 mr-8 sm:mb-2 sm:mt-8 mx-4 flex flex-col justify-between">
          <div className="">
            {prevStep && (
              <div onClick={prevStep} className="cursor-pointer hover:opacity-70 transition -mt-4 mb-2 hidden lg:block">
                <BiArrowBack
                  color="black"
                  size={20}
                  className="inline rtl:rotate-180 rtl:ml-1"
                />
                <span className="ml-2">{t('back')}</span>
              </div>
            )}
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
            <LanguageSelector2 />
          </div>
        </div>
        <div className="w-full sm:w-1/2 sm:mt-8 sm:mb-4 sm:mr-8 sm:ml-4 px-4 mt-4">
          {fields}
        </div>
      </div>
    </div>
  );
};

export default Layout;
