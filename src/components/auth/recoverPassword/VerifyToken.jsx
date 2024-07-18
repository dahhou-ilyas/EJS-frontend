import Layout from "@/components/auth/Layout"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
  } from "@/components/ui/form"




  const schema = z.object({
    token: z.string().refine(value => /^[a-zA-Z0-9]{6}$/.test(value), {
        message: "Veuillez saisir votre code à 6 chiffres valides",
    }),
});

  const Fields = ({ nextStep, buttonColor }) => {
    const form = useForm({
      defaultValues: {
        token: "",
      },
      resolver: zodResolver(schema),
    });
  
    const { handleSubmit, formState } = form;
    const { errors } = formState;
  
    const onSubmit = (data) => {
        console.log(data.token);
        nextStep(data.token);
    };

   
    return (
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="w-full flex flex-col justify-between gap-4">
          
          <FormField
            control={form.control}
            name="token"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code Secret*</FormLabel>
                <FormControl>
                  <Input
                    className="md:w-96 max-w-sm"
                    placeholder="Code"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                    ex: abc123
                </FormDescription>
                <FormMessage>{errors.token?.message}</FormMessage>
              </FormItem>
            )}
          />

        <button type="submit" className= "rounded-2xl mt-8 py-1 px-6 w-fit text-white font-medium ml-auto bg-blue-900" > Suivant </button></div>
        </form>
      </Form>
    );
  };

const VerifyToken = ({ nextStep }) => {
    return ( 
    <Layout 
      title={"Veuillez consulter votre boite mail"}
      subtitle={"Un code à 6 chiffres a été envoyé à votre adresse. Veuillez consulter votre boîte de réception et insérer le code à 6 chiffres."} 
      fields={<Fields nextStep={nextStep}  />} 
      />
     );
}
 
export default VerifyToken;


