"use client"
import { useState } from 'react';
import PasswordForm from '@/components/auth/register/PasswordForm';
import EmailRecovery from '@/components/auth/recoverPassword/EmailRecovery';
import VerifyToken from '@/components/auth/recoverPassword/VerifyToken';
import { toast } from 'react-hot-toast';
import { SPRINGBOOT_API_URL } from '@/config';

const ForgotPassword = () => {

  const [step, setStep] = useState(1);
  

  const [forgetPasswordData,setForgetPasswordData]=useState({
    token:""
  })

  const nextStep = () => setStep(step + 1);

  // pour évité l'erreur de setFormat data not a function
  const vartest =()=>{

  }
  
  const sendPasswordResetToken = (email) => {

    fetch(SPRINGBOOT_API_URL+'/password/forgot', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email:email
      })
    })
    .then(data => nextStep())
    .catch(error => console.error('Erroxxxxr:', error));

    //nextStep()

  }

  const verifyToken = (token) => {
    setForgetPasswordData({
      token: token
    });
    nextStep();
  }
  const resetPassword = (values) => {
    fetch(SPRINGBOOT_API_URL+'/password/reset', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token:forgetPasswordData.token,
        newPassword:values.password
      })
    })
    .then(data => {
      console.log("!!!!!!!!!!!!!!!!!!!! sucess");
      toast.success('le mots de pass est bien changé');
    })
    .catch(error => console.error('Error:', error));
    //nextStep()
  };

 
  const renderStep = () => {

    switch (step) {
      case 1:
        return <EmailRecovery nextStep={sendPasswordResetToken} />;
      case 2:
        return <VerifyToken nextStep={verifyToken} />;
      default:
        return <PasswordForm setFormData={vartest} formData={forgetPasswordData} nextStep={resetPassword}/>;
    }
  };

  return (
    <div>
      {renderStep()}
    </div>
  );
};

export default ForgotPassword;