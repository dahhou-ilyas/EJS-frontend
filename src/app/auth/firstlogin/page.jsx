"use client"

import { useState } from 'react';

import { useRouter, useSearchParams } from "next/navigation";

import AntecedantsFamiliaux from '@/components/auth/firstLogin/AntecedantsFamiliaux';
import Habitudes from '@/components/auth/firstLogin/Habitudes';
import MaladiesChirurgicaux from '@/components/auth/firstLogin/MaladiesChirurgicaux';
import MaladiesChroniques from '@/components/auth/firstLogin/MaladiesChroniques';
import Medicaments from '@/components/auth/firstLogin/Medicaments';
import { jwtDecode } from 'jwt-decode';


const MultiStepFirstLogin = () => {
  const [step, setStep] = useState(1);
  const searchParams = useSearchParams();
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
    const idJeune=jwtDecode(searchParams.get("token")).claims.id;
    
    const {formData,antecedentFamiliale}=values;

    const requeteAntecedentsFamiliaux =fetch(`http://localhost:8080/jeunes/${idJeune}/antecedents/familiaux`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${searchParams.get("token")}`
      },
      body: JSON.stringify({
        maladiesFamiliales:antecedentFamiliale
      }),
    })

    const requeteAntecedentsPersonnels =fetch(`http://localhost:8080/jeunes/${idJeune}/antecedents/personnels`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${searchParams.get("token")}`
      },
      body: JSON.stringify({
        maladies:formData.maladieJeune,
        utiliseMedicaments:(formData.medicaments=="oui") ? true:false,
        typesMedicaments:formData.typeMedicaments.split(','),
        souffreChirurgicaux:(formData.chirurgicaux=="oui") ? true:false,
        operationsChirurgicales:{
          typeOperation:formData.typeOperation,
          anneeOperation:formData.anneeOperation
        },
        habitudes:formData.habitudes,
        cigarettesParJour:formData.tabac,
        consommationAlcool:formData.alcool,
        tempsEcran:formData.tempsEcran
      }),
    })
    Promise.all([requeteAntecedentsFamiliaux, requeteAntecedentsPersonnels])
    .then(responses => {
      const allResponsesOk = responses.every(response => response.ok);

      if (allResponsesOk) {
        return fetch(`http://localhost:8080/jeunes/${idJeune}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${searchParams.get("token")}`
          },
          body: JSON.stringify({
            isFirstAuth: false
          }),
        });
      } else {
        throw new Error('Une ou plusieurs requêtes POST ont échoué');
      }
    })
    .then(patchResponse => {
      if (patchResponse.ok) {
        router.push('/');
      } else {
        throw new Error('La requête PATCH a échoué');
      }
    })
    .catch(error => {
      console.error('Erreur:', error);
    });
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