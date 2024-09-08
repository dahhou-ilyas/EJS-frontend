"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {jwtDecode} from 'jwt-decode';

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import Logo from "../../../public/logoJeune.png"; // Admin logo
import Illustration from "../../../public/logoAdmin.png"; // Admin illustration

import Terms from "./Terms";
import CheckVerifiedEmail from "./CheckVerifiedEmail";

import { useTranslations } from "next-intl";
import { LanguageSelector2 } from "../LanguageSelector2";
import { SPRINGBOOT_API_URL } from "@/config";

const AuthAdmin = () => {
  const t = useTranslations("AuthAdmin"); // Admin translation key
  const [token, setToken] = useState({});
  const [accesToken, setAccesToken] = useState('');
  const router = useRouter();

  // Define validation schema with Zod
  const schema = z.object({
    identifier: z.string().min(1, t("identifierError")),
    password: z
      .string()
      .min(8, t("passwordMinError"))
      .max(16, t("passwordMaxError")),
  });

  // Initialize form with react-hook-form
  const form = useForm({
    defaultValues: {
      identifier: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  const alertDialogTriggerRef = useRef(null);
  const alertDialogTriggerRef2 = useRef(null);

  // Define submit handler
  const onSubmit = (data) => {
    console.log("Sending data to API:", data);
  
    fetch(SPRINGBOOT_API_URL+"/auth/login/administrateurs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.identifier, // Ensure this matches your API expectation
        password: data.password,
      }),
    })
    .then(response => response.json())
    .then(res => {
      console.log(res);
      localStorage.setItem('access-token', res["access-token"]);
      const decodeJwt=jwtDecode(res["access-token"]);
      setAccesToken(res["access-token"]);
      setToken(decodeJwt.claims);
      if(!decodeJwt.claims.confirmed){
          alertDialogTriggerRef2.current.click();
      }else if(decodeJwt.claims.isFirstAuth){
          alertDialogTriggerRef.current.click();
      }else{
          nextStep();
      }
    })
    .catch(error => console.error('Error:', error));
}
  
const nextStep = () => {
  router.push('/ies/admin');
}
const envoyerEmail = () => {
  fetch(SPRINGBOOT_API_URL+'/register/resend-token?email='+token.mail, {
      method: 'POST'
    }).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(data => {
      console.log('Success:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

const confirmeRules=()=>{
  console.log("***************");
  console.log(accesToken);
  console.log("***************");
  fetch(`${SPRINGBOOT_API_URL}/administrateurs/${token.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accesToken}`
      },
      body: JSON.stringify({
          isFirstAuth:false,
      })
  }).then(response => response.json())
  .then(data => {
    nextStep();
  })
  .catch(error => {
    console.error('Erreur lors de la mise à jour d"admin:', error);
  });
}



  return (
    <div className="lg:h-screen lg:flex lg:items-center lg:justify-center lg:bg-gray-400">
      <div className="mt-1 flex justify-between md:hidden w-full">
        <div className="ml-auto mr-2">
          <LanguageSelector2 />
        </div>
      </div>

      <div className="lg:min-h-[550px] lg:max-w-7xl lg:border lg:rounded-3xl xl:min-w-[1000px] lg:min-w-[900px] bg-white sm:flex xl:mx-48 relative">
        <div className="w-full md:w-1/2 flex flex-col justify-center mt-8 sm:rtl:mr-8">
          <div className="px-4 md:px-0 md:ml-8 lg:ml-12">
            <div className="flex items-center justify-center -ml-2 mb-4">
              <Image src={Logo} alt="Logo" height={200} width={250} />
            </div>
            <div className="flex flex-col items-center justify-center">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="identifier" // Ensure this matches the schema and form defaultValues
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("identifierLabel")}</FormLabel>
                        <FormControl>
                          <Input
                            className="w-80 sm:w-96 max-w-sm"
                            placeholder={t("identifierPlaceholder")}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="sm:w-96 max-w-sm" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="sm:inline">{t("passwordLabel")}</FormLabel>
                        <FormControl>
                          <Input
                            className="w-80 sm:w-96 max-w-sm"
                            type="password"
                            id="password"
                            placeholder={t("passwordPlaceholder")}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="sm:w-96 max-w-sm" />
                        <FormDescription className="border-b-[1px] inline-block border-blue-600 text-blue-600 cursor-pointer">
                          <Link href="/forgotPassword">{t("forgotPassword")}</Link>
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  <button
                    type="submit"
                    className="
                      bg-blue-900 
                      rounded-2xl 
                      mt-4 
                      py-1 
                      w-full 
                      max-w-sm 
                      text-white 
                      font-medium 
                      transform 
                      transition 
                      duration-300 
                      lg:hover:scale-100
                      lg:scale-95
                      hover:shadow-lg
                      hover:bg-blue-800
                    "
                  >
                    {t("loginButton")}
                  </button>
                  <Terms
                    nextStep={nextStep}
                    alertDialogTriggerRef={alertDialogTriggerRef}
                  />
                  <CheckVerifiedEmail
                   CheckVerifiedEmail envoyerEmail={envoyerEmail} alertDialogTriggerRef={alertDialogTriggerRef2}
                  />
                </form>
              </Form>
            </div>

           
          </div>
        </div>
        <div className="hidden md:block md:w-1/2 md:mt-20 2xl:mt-12">
          <div className="md:animate-bounce-slow">
            <Image
              src={Illustration}
              alt="Illustration"
              layout="responsive"
              height={2000}
              width={450}
            />
          </div>
        </div>
        <div className="hidden md:block absolute bottom-6 ltr:right-6 rtl:left-6">
          <LanguageSelector2 />
        </div>
      </div>
    </div>
  );
};

export default AuthAdmin;
