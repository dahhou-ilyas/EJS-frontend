"use client"
import { useState } from 'react';
import PasswordForm from '@/components/auth/register/PasswordForm';
import EmailRecovery from '@/components/auth/recoverPassword/EmailRecovery';
import VerifyToken from '@/components/auth/recoverPassword/VerifyToken';

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

    // fetch('http://localhost:8080/password/forget', {
    //   method: 'POST',
    //   headers: {
    //       'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     email:email
    //   })
    // })
    // .then(data => nextStep())
    // .catch(error => console.error('Erroxxxxr:', error));

    nextStep()

  }

  const verifyToken = (token) => {
    setForgetPasswordData({
      token: token
    });
    nextStep();
  }
  const resetPassword = (values) => {
    // fetch('http://localhost:8080/password/reset', {
    //   method: 'POST',
    //   headers: {
    //       'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     token:forgetPasswordData.token,
    //     newPassword:values
    //   })
    // })
    // .then(data => {
    //   console.log("!!!!!!!!!!!!!!!!!!!! sucess");
    //   nextStep()
    // })
    // .catch(error => console.error('Error:', error));
    nextStep()
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