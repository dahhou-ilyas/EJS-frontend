"use client"
import { useState } from 'react';
import NameForm from '@/components/auth/register/NameForm';
import BirthDateForm from '@/components/auth/register/BirthDateForm';
import EmailForm from '@/components/auth/register/EmailForm';
import ScolarisationForm from '@/components/auth/register/ScolarisationForm';
import CodeMassarForm from '@/components/auth/register/CodeMassarForm';
import CneForm from '@/components/auth/register/CneForm';
import PasswordForm from '@/components/auth/register/PasswordForm';
import Recapitulatif from '@/components/auth/register/Recapitulatif';
import Confirmation from '@/components/auth/register/Confirmation';
import CinForm from '@/components/auth/register/CinForm';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    dateNaissance: null,
    genre: "",
    email: '',
    tel: '',
    cin: '',
    scolarise: "",
    niveauEtudes: "",
    situationActuelle: "",
    cne: "",
    codeMassar: "",
    password: "",
  });

  
  
  const handleSubmit = (values) => {
    let scolaris=""
    let data={
      infoUser: {
        nom: values.nom,
        prenom: values.prenom,
        mail: values.email,
        numTel: values.tel,
        motDePasse: values.password
      },
      sexe: values.genre,
      dateNaissance: values.dateNaissance,
      scolarise: (values.scolarise == "oui") ? true : false,
      cin: values.cin,
    };
    if(values.scolarise=="oui"){
      scolaris="scolarise"
      data.cne=values.cne
      data.codeMassare=values.codeMassar
      data.niveauEtudeActuel= values.niveauEtudes
    }else if(values.scolarise=="non"){
      scolaris="nonscolarise"
      data.derniereNiveauEtudes=values.niveauEtudes
      data.enActivite=(values.enActivite=="oui") ? true : false
      data.cne=values.cne
      data.codeMassare=values.codeMassar
    }

      fetch('http://localhost:8080/register/jeunes/'+scolaris, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => nextStep())
    .catch(error => console.error('Error:', error));
    //nextStep();
  };

  const calculateAge = (date) => {
    const birthDate = new Date(date);
    const ageDiff = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDiff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  const prevStep2 = () => {
    const age = formData.dateNaissance ? calculateAge(formData.dateNaissance) : null;
    if (step === 5 && (age === null || age < 16 || age > 30)) {
      setStep(3);
    } else {
      setStep(step - 1);
    }
  };
  const prevStep3 = () => {
    if (formData.niveauEtudes == "Aucun") {
      setStep(5);
    } else {
      setStep(step - 1);
    }
  };




  const renderStep = () => {

    switch (step) {
      case 1:
        return <NameForm nextStep={nextStep} setFormData={setFormData} formData={formData} />;
      case 2:
        return <BirthDateForm nextStep={nextStep} prevStep={prevStep} setFormData={setFormData} formData={formData} />;
      case 3:
        return <EmailForm nextStep={nextStep} prevStep={prevStep} setFormData={setFormData} formData={formData} />;
      case 4:
        const age = formData.dateNaissance ? calculateAge(formData.dateNaissance) : null;
        if (age !== null && age >= 16 && age <= 30) {
          return <CinForm nextStep={nextStep} prevStep={prevStep} setFormData={setFormData} formData={formData} />;
        }
        nextStep();
        break;
      case 5:
        return <ScolarisationForm nextStep={nextStep} prevStep={prevStep2} setFormData={setFormData} formData={formData} />;
      case 6:
        if (formData.niveauEtudes !== "" && (formData.niveauEtudes == "SECONDAIRE" || formData.niveauEtudes == "SUPERIEUR")) {
          return <CneForm nextStep={nextStep} prevStep={prevStep} setFormData={setFormData} formData={formData}/>;
        }
        else if (formData.niveauEtudes !== "" && formData.niveauEtudes == "PRIMAIRE"){
          return <CodeMassarForm nextStep={nextStep} prevStep={prevStep} setFormData={setFormData} formData={formData} />;
        }
        else {
        nextStep();
        break;
        }
      case 7:
        return <PasswordForm nextStep={nextStep} prevStep={prevStep3} setFormData={setFormData} formData={formData} />;
      case 8:
        return <Recapitulatif nextStep={nextStep} prevStep={prevStep} formData={formData} handleSubmit={handleSubmit} />;
      default:
        return <Confirmation />;
    }
  };

  return (
    <div>
      {renderStep()}
    </div>
  );
};

export default MultiStepForm;