"use client"
import { useState } from 'react';
import InformationsActivites from '@/components/auth/register/InformationsActivites';
import NameForm from '@/components/auth/register/NameForm';
import EmailForm from '@/components/auth/register/EmailForm';
import PasswordForm from '@/components/auth/register/PasswordForm';
import Confirmation from '@/components/auth/register/Confirmation';



const RegisterProfessionnelsForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    cin: "",
    inpe: "",
    email: '',
    tel: '',
    password: "",
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  
  
  const handleSubmit = (values) => {
    console.log('Form Data:', values);
    fetch('http://localhost:8080/register/professionnels', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        infoUser:{
          nom:formData.nom,
          prenom:formData.prenom,
          mail:formData.email,
          numTel:formData.tel,
          motDePasse:formData.password,
        },
        cin:formData.cin,
        inpe:formData.inpe
      })
    })
    .then(response => response.json())
    .then(data => nextStep())
    .catch(error => console.error('Error:', error));

    //nextStep()
  };

   
  const renderStep = () => {
 
    switch (step) {
      case 1:
        return <NameForm nextStep={nextStep} setFormData={setFormData} formData={formData} />;
      case 2:
        return <InformationsActivites nextStep={nextStep} prevStep={prevStep} setFormData={setFormData} formData={formData} />;
      case 3:
        return <EmailForm nextStep={nextStep} prevStep={prevStep} setFormData={setFormData} formData={formData}  />;
      
      case 4:
        return <PasswordForm nextStep={handleSubmit} prevStep={prevStep} setFormData={setFormData} formData={formData} />;
      case 5:
        return <Confirmation />;
    }
  };

  return (
    <div>
      {renderStep()}
    </div>
  );
};

export default RegisterProfessionnelsForm;