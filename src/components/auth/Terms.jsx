"use client"

import React, { useState } from 'react';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

import { Checkbox } from "@/components/ui/checkbox"

const Terms = ({nextStep, alertDialogTriggerRef}) => {

    const [termsAccepted, setTermsAccepted] = useState(false);

    const handleCheckboxChange = () => {
        setTermsAccepted(!termsAccepted);
    };


    return (  
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button ref={alertDialogTriggerRef}></button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Conditions d&apos;utilisation de la plateforme</AlertDialogTitle>
                    <AlertDialogDescription>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="flex items-center justify-center space-x-2">
                    <Checkbox id="terms" checked={termsAccepted} onCheckedChange={handleCheckboxChange} />
                    <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        J&apos;ai lu et j&apos;accepte les conditions d&apos;utilisation de la plateforme
                    </label>
                </div>
                <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction disabled={!termsAccepted} onClick={nextStep}>Continuer</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
 
export default Terms;
