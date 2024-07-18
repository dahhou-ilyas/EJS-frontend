"use client"

import { useState } from 'react';

import { useRouter } from "next/navigation";

import AntecedantsFamiliaux from '@/components/auth/firstLogin/AntecedantsFamiliaux';
import Habitudes from '@/components/auth/firstLogin/Habitudes';
import MaladiesChirurgicaux from '@/components/auth/firstLogin/MaladiesChirurgicaux';
import MaladiesChroniques from '@/components/auth/firstLogin/MaladiesChroniques';
import Medicaments from '@/components/auth/firstLogin/Medicaments';


const MultiStepFirstLogin = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    maladieJeune: [],
    medicaments: "",
    typeMedicaments: "",
    chirurgicaux: '',
    typeOperation: "",
    anneeOperation: "",
    habitudes: [], 
    tabac: "",
    alcool: "",
    tempsEcran: "",
    antecedantsFamiliaux: [],
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  
  const router = useRouter();
  
  const handleSubmit = (values) => {
    console.log('Form Data:', values);
    router.push('/')
  };

   
  const renderStep = () => {
 
    switch (step) {
      case 1:
        return <MaladiesChroniques nextStep={nextStep} prevStep={prevStep} setFormData={setFormData} formData={formData} />;
      case 2:
        return <Medicaments nextStep={nextStep} prevStep={prevStep} setFormData={setFormData} formData={formData} />;
      case 3:
        return <MaladiesChirurgicaux nextStep={nextStep} prevStep={prevStep} setFormData={setFormData} formData={formData} />;
      case 4:
        return <Habitudes nextStep={nextStep} prevStep={prevStep} setFormData={setFormData} formData={formData} />;
      default:
        return <AntecedantsFamiliaux nextStep={handleSubmit} prevStep={prevStep} setFormData={setFormData} formData={formData} />;
    }
  };

  return (
    <div>
      {renderStep()}
    </div>
  );
};

export default MultiStepFirstLogin;