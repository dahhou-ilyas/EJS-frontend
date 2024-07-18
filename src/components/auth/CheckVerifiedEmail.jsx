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



const CheckVerifiedEmail = ({alertDialogTriggerRef, envoyerEmail}) => {

    return ( <AlertDialog>
        <AlertDialogTrigger asChild>
            <button ref={alertDialogTriggerRef}></button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Valider votre email!</AlertDialogTitle>
                <AlertDialogDescription>
                    Votre email n'est pas valide. Veuillez clicker sur le bouton Valider mon email puis consulter votre boite mail pour vérifier votre email!
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction onClick={envoyerEmail}>Valider mon email</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>);
}
 
export default CheckVerifiedEmail;