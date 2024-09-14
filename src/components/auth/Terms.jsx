"use client"

import React, { useEffect, useState } from 'react';

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
import { ScrollArea } from '../ui/scroll-area';
import { jwtDecode } from 'jwt-decode';

const Terms = ({nextStep, alertDialogTriggerRef}) => {

    const [termsAccepted, setTermsAccepted] = useState(false);
    const [isJeune,setIsJeune]=useState(false);

    const handleCheckboxChange = () => {
        setTermsAccepted(!termsAccepted);
    };

    useEffect(()=>{
        if (typeof window !== 'undefined') {
            // Le code ne s'exécutera que côté client
            const token = localStorage.getItem('access-token');
            
            if (token) {
                try {
                    const decodedToken = jwtDecode(token);
                    setIsJeune(decodedToken?.claims?.role === "ROLE_JEUNE");
                } catch (error) {
                    console.error("Erreur lors du décodage du token : ", error);
                }
            } else {
                console.log("Aucun token trouvé dans localStorage");
            }
        }
    },[])

    function removeToken(){
        localStorage.removeItem('access-token');
    }

    return (  
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button ref={alertDialogTriggerRef}></button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Conditions d&apos;utilisation de la plateforme</AlertDialogTitle>
                    <AlertDialogDescription>
                        <ScrollArea className="h-[60vh] pr-4">
                            {isJeune ? (
                                <p>
                                Les droits et les obligations décrites dans la présente charte s&apos;appliquent à tous les adolescents et les jeunes qui fréquentent l&apos;Espace Santé Jeunes et qui bénéficient de l&apos;une des prestations offertes à son niveau.<br /><br />
                                <strong>Mission de l&apos;Espace Santé Jeunes :</strong><br />
                                Contribuer à la promotion de la santé des adolescents et des jeunes en leur offrant des services accessibles et adaptés en matière d&apos;écoute, de conseil, d&apos;accompagnement psychosocial, de prise en charge et d&apos;orientation médicale et psychologique y compris dans le domaine de la santé sexuelle et reproductive et de la lutte contre les addictions.<br /><br />
                                <strong>Principes éthiques et engagements :</strong><br />
                                La présente charte a pour objet de définir les principales règles d&apos;utilisation de l&apos;Espace Santé Jeunes.<br /><br />
                                <strong>Droits des jeunes :</strong><br />
                                - Droit à un accès direct, libre et gratuit<br />
                                - Droit au respect et à l&apos;écoute<br />
                                - Droit au non jugement<br />
                                - Droit à la non-discrimination<br />
                                - Droit à la confidentialité et au respect de l&apos;intimité<br />
                                - Droit à un service de qualité<br /><br />
                                <strong>Obligations des jeunes :</strong><br />
                                - Respecter le lieu et son encadrement<br />
                                - Respecter le règlement interne de l&apos;espace<br />
                                - Veiller à une bonne utilisation du matériel mis à leur disposition<br />
                                - Respecter leurs pairs et collègues<br />
                                - Avoir une participation constructive dans les activités de l&apos;espace<br />
                              </p>
                            ):(
                                <p>
                                  <strong>Confidentialité et protection des données :</strong><br />
                                  - Respecter strictement le secret médical et la confidentialité des informations des patients<br />
                                  - Utiliser la plateforme uniquement sur des appareils sécurisés<br />
                                  - Ne pas partager les identifiants de connexion<br /><br />

                                  <strong>Responsabilités professionnelles :</strong><br />
                                  - Fournir des informations et des conseils médicaux précis et à jour<br />
                                  - Orienter les jeunes vers des services spécialisés quand nécessaire<br />
                                  - Participer aux formations proposées sur l&apos;utilisation de la plateforme<br /><br />

                                  <strong>Communication :</strong><br />
                                  - Utiliser un langage adapté et compréhensible pour les jeunes<br />
                                  - Répondre aux demandes dans un délai raisonnable<br />
                                  - Signaler tout problème technique ou de sécurité à l&apos;administrateur de la plateforme<br /><br />

                                  <strong>Éthique :</strong><br />
                                  - Maintenir une relation professionnelle appropriée avec les jeunes utilisateurs<br />
                                  - Éviter tout conflit d&apos;intérêts dans l&apos;utilisation de la plateforme<br />
                                  - Respecter les limites de ses compétences et demander l&apos;avis d&apos;autres professionnels si nécessaire<br />
                                </p>
                            )}
                            
                        </ScrollArea>
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
                    <AlertDialogCancel onClick={removeToken}>Annuler</AlertDialogCancel>
                    <AlertDialogAction disabled={!termsAccepted} onClick={nextStep}>Continuer</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
 
export default Terms;
