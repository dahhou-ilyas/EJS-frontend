import Card from "./Card";

import DossierMedical from "../../public/DossierMedical.png";
import Sensibilisation from "../../public/Sensibilisation.jpg";
import TestsPsycho from "../../public/TestsPsycho.jpg";

import { useTranslations } from 'next-intl';

const CardsCaroussel = () => {

    const t = useTranslations("CardsCaroussel");

    return (
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:gap-x-4 lg:gap-x-6 xl:gap-x-10 justify-center items-center mt-6 pb-6 ">
            <Card href="/profil" src={DossierMedical} title={t('dossier_medical')} />
            <Card href="/ies/youth" src={Sensibilisation} title={t('education_sante')} />
            <Card href="/soutien" src={TestsPsycho} title={t('tests_psychologiques')} />
        </div>
    );
};

export default CardsCaroussel;
