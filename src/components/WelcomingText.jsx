import Illustration from "../../public/illustration.png";
import Image from "next/image";
import { useTranslations } from 'next-intl';

const WelcomingText = ({ user }) => {

    const t = useTranslations('WelcomingText');
    
    const firstName = user?.claims?.prenom
        ? user.claims.prenom.charAt(0).toUpperCase() + user.claims.prenom.slice(1).toLowerCase()
        : "";

        
    return (
        <div className="flex flex-col md:flex-row md:justify-center">
            <div className="lg:w-3/5 max-w-[700px] lg:max-w-[620px] xl:max-w-[700px] ml-8 mr-8 lg:mr-0 xl:mr-16 mt-4 lg:mt-24   ">
                <span className="text-blue-950 font-semibold text-lg md:text-xl">
                    {t('headline')}
                </span>
                <h1 className="text-3xl font-bold my-2 md:text-4xl">
                    {t('greeting')} {firstName}!
                </h1>
                <p className="text-gray-600 mb-6">
                    {t('description')}
                </p>
                <div className="sm:hidden max-w-[350px] mx-auto">
                    <Image 
                        src={Illustration} 
                        alt="Illustration" 
                    />
                </div>
                {/* <div className="flex flex-col gap-4 sm:flex-row lg:gap-8 justify-start">
                    <button className="bg-blue-900 hover:bg-blue-800 text-white font-medium md:text-lg rounded-3xl py-2 px-10 mx-6 sm:mx-0">
                        {t('medicalRecordButton')}
                    </button>
                    <button className="bg-lime-600 hover:bg-lime-500 text-white font-medium md:text-lg rounded-3xl py-2 px-10 mx-6 sm:mx-0">
                        {t('psychTestsButton')}
                    </button>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mt-12">
                    {t('spotlightTitle')}
                </h1> */}
            </div>
            <div className="hidden lg:block animate-bounce-slow xl:-mt-4 -z-10">
                <div className="max-w-full max-h-[300px] mx-auto">
                    <Image 
                        src={Illustration} 
                        alt="Illustration" 
                        width={300}
                        height={300}
                        loading="lazy"
                    />
                </div>
            </div>
        </div>
    );
}

export default WelcomingText;
