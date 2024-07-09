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
    scolarise: "",
    niveauEtudes: "",
    situationActuelle: "",
    cne: "",
    codeMassar: "",
  });

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
  
  const handleSubmit = (values) => {
      fetch('http://localhost:8080/jeunes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nom:formData.nom,
            prenom:formData.prenom,
            mail:formData.email,
            numTele:formData.tel.replace(/^0/, "+212"),
            password:formData.password,
            type_jeune:(formData.scolarise == "oui")? "SCOLARISE":"NON_SCOLARISE",
            sexe:(formData.genre=="Homme") ? "MASCULIN":"FEMININ",
            dateNaissance:formData.dateNaissance,
            scolarise:(formData.scolarise == "oui") ? true : false ,
            cin:formData.cin,
            niveauEtudesActuel: (formData.scolarise == "oui") ? formData.niveauEtudes:"",
            cne:"CNE"+formData.cne,
            codeMASSAR:formData.codeMassar,
            dernierNiveauEtudes:(formData.scolarise == "non") ? formData.niveauEtudes:"",
            situationActuelle:formData.situationActuelle,
        })
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch(error => console.error('Error:', error));
    nextStep();
  };

  const calculateAge = (date) => {
    const birthDate = new Date(date);
    const ageDiff = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDiff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
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
        if (formData.niveauEtudes !== "" && (formData.niveauEtudes == "Secondaire" || formData.niveauEtudes == "Supérieure")) {
          return <CneForm nextStep={nextStep} prevStep={prevStep} setFormData={setFormData} formData={formData}/>;
        }
        else if (formData.niveauEtudes !== "" && formData.niveauEtudes == "Primaire"){
          return <CodeMassarForm nextStep={nextStep} prevStep={prevStep} setFormData={setFormData} formData={formData} />;
        }
        else {
        nextStep();
        break;
        }
      case 7:
        return <PasswordForm nextStep={nextStep} prevStep={prevStep} setFormData={setFormData} formData={formData} />;
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