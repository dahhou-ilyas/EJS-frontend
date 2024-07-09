"use client"
import AuthJeunes from '@/components/auth/firstLogin/AuthJeunesFirstLogin';
import AntecedantsFamiliaux from '@/components/auth/firstLogin/AntecedantsFamiliaux';
import Habitudes from '@/components/auth/firstLogin/Habitudes';
import MaladiesChirurgicaux from '@/components/auth/firstLogin/MaladiesChirurgicaux';
import MaladiesChroniques from '@/components/auth/firstLogin/MaladiesChroniques';
import { useState } from 'react';


const MultiStepFirstLogin = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    maladieJeune: [],
    chirurgicaux: '',
    habitudes: [], 
    antecedantsFamiliaux: [],
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  
  
  const handleSubmit = (values) => {
    console.log('Form Data:', values);
  };

   
  const renderStep = () => {
 
    switch (step) {
      case 1:
        return <AuthJeunes nextStep={nextStep} />;
      case 2:
        return <MaladiesChroniques nextStep={nextStep} prevStep={prevStep} setFormData={setFormData} formData={formData} />;
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