"use client"

import React, { useRef, useState } from 'react'; 
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { LanguageSelector } from '@/components/LanguageSelector';
import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"

import Logo from "../../../public/logoJeune.png";
import Illustration from "../../../public/2862289.webp";

import Terms from './Terms';
import CheckVerifiedEmail from './CheckVerifiedEmail';
import { jwtDecode } from 'jwt-decode';


const schema = z.object({
    identifier: z.string().min(1, "Veuillez saisir votre identifiant"),
    password: z.string()
    .min(8, 'Le mot de passe doit faire au moins 8 caractères')
    .max(16, 'Le mot de passe ne peut pas dépasser 16 caractères'),
  });


const AuthJeunes = () => {
    const [token,setToken]=useState({});
    const [accesToken,setAccesToken]=useState('');
    const router = useRouter();
    const form = useForm({
        defaultValues: {
          identifier: "",
          password: "",
        },
        resolver: zodResolver(schema),
      });
    
      const alertDialogTriggerRef = useRef(null);

    const alertDialogTriggerRef2 = useRef(null);

    const onSubmit = (data) => {

        fetch('http://localhost:8080/auth/login/jeunes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username:data.identifier,
                password:data.password
            })
          })
          .then(response => response.json())
          .then(res => {
            console.log(res);
            const decodeJwt=jwtDecode(res["access-token"]);
            console.log(decodeJwt);
            setAccesToken(res["access-token"]);
            setToken(decodeJwt.claims);
            if(!decodeJwt.claims.confirmed){
                alertDialogTriggerRef2.current.click();
            }else if(decodeJwt.claims.isFirstAuth){
                alertDialogTriggerRef.current.click();
            }else{
                tohomePage();
            }
          })
          .catch(error => console.error('Error:', error));
    }
    const tohomePage=()=>{
        router.push('/')
    }
    const nextStep = () => {
        router.push('/auth/firstlogin?token='+accesToken)
    }
    const envoyerEmail = () => {
        fetch('http://localhost:8080/register/resend-token?email='+token.mail, {
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
        //envoyerEmailderécuperation
        //afficher Confirmation component (a faire plus tard)
    }
  return (

    <div className="lg:h-screen lg:flex lg:items-center lg:justify-center lg:bg-gray-400">
        <div className="mt-1 flex justify-between lg:hidden w-full">
            <div className="ml-auto mr-2">
                <LanguageSelector />
            </div>
        </div>
        
        <div className="lg:min-h-[550px] lg:max-w-7xl lg:border lg:rounded-3xl xl:min-w-[1000px] lg:min-w-[900px] bg-white sm:flex xl:mx-48">
            <div className="w-full md:w-1/2 flex flex-col justify-center mt-8">
                    <div className='px-4 md:px-0 md:ml-8 lg:ml-12'>
                        <div
                        className="
                            flex 
                            items-center 
                            justify-center 
                            -ml-2
                            mb-4
                        ">
                        <Image 
                        src={Logo} 
                        alt="Logo" 
                        height={200} 
                        width={250} 
                        />
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        
                            <FormField
                            control={form.control}
                            name="identifier"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Email ou CIN ou CNE ou Code Massar</FormLabel>
                                <FormControl>
                                    <Input className="sm:w-96 max-w-sm" placeholder="Email ou CIN ou CNE ou Code Massar" {...field} />
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
                                <FormLabel className=" sm:inline">Mot de Passe</FormLabel>
                                <FormDescription className="hidden sm:inline border-b-2 border-blue-600 text-blue-600 cursor-pointer sm:ml-40">
                                <Link href="/forgotPassword">Mot de passe oublié?</Link>
                                </FormDescription>
                                
                                <FormControl>
                                    <Input className="sm:w-96 max-w-sm" type="password" id="password" placeholder="Mot de Passe" {...field} />
                                </FormControl>
                                
                                <FormMessage className="sm:w-96 max-w-sm" />
                                <FormDescription className="sm:hidden border-b-[1px] inline-block border-blue-600 text-blue-600 cursor-pointer">
                                <Link href="/forgotPassword">Mot de passe oublié?</Link>
                                </FormDescription>
                                </FormItem>
                            )}
                            />

                            <button type="submit" className='bg-blue-900 rounded-2xl mt-4 py-1 w-full max-w-sm text-white font-medium'> Se Connecter</button> 

                            <Terms nextStep={nextStep}  alertDialogTriggerRef={alertDialogTriggerRef}/>
                            <CheckVerifiedEmail envoyerEmail={envoyerEmail}  alertDialogTriggerRef={alertDialogTriggerRef2}/>
                        </form>
                        </Form>
                     
                    </div>
                    <Link href="/register/jeunes" ><h4 className="text-xs text-center text-gray-700 mt-4">Vous n'avez pas de compte ?  <span className=' font-semibold border-b-2 border-gray-700 cursor-pointer'> Inscrivez-vous </span></h4>  </Link>
                </div>    
                <div className="hidden lg:block ml-3 mt-auto">
                    <LanguageSelector />
                </div>
            </div>
            <div className="hidden md:block md:w-1/2 md:mt-20 lg:mt-28 md:animate-bounce-slow">
                <Image 
                        src={Illustration} 
                        alt="Illustration" 
                        layout="responsive"
                        height={1000} 
                        width={450} 
                    />
            </div>
            
        </div>
        </div>
    )
    }

export default AuthJeunes;