import Image from "next/image";
import { useTranslations } from "next-intl";

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
} from "@/components/ui/alert-dialog";

import emailIcon from "../../../public/image.png";

const CheckVerifiedEmail = ({ alertDialogTriggerRef, envoyerEmail }) => {
    const t = useTranslations("CheckVerifiedEmail");

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button ref={alertDialogTriggerRef}></button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <div className="flex items-center justify-center flex-col mt-4">
                        <Image 
                            src={emailIcon} 
                            alt="email icon" 
                            height={120} 
                            width={120} 
                        />
                        <AlertDialogTitle className="mt-8 text-2xl text-gray-800">
                            {t("verifyEmailTitle")}
                        </AlertDialogTitle>
                    </div>
                    <AlertDialogDescription className="mb-2 text-gray-600 rtl:text-start">
                        {t("verifyEmailDescription")}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="mt-4 rtl:flex-row-reverse">
                    <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
                    <AlertDialogAction onClick={envoyerEmail} className="bg-blue-950 hover:bg-blue-900">
                        {t("verifyEmailButton")}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default CheckVerifiedEmail;
