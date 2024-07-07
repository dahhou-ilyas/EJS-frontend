"use client"
import Layout from "@/components/auth/register/Layout"
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
    email: z.string().email("Veuillez saisir une adresse email valide"),
    tel: z.string()
        .regex(/^0[67]\d{8}$/, "Le numéro de téléphone doit commencer par 06 ou 07 et contenir 10 chiffres"),
});

  const Fields = () => {
    const form = useForm({
      defaultValues: {
        email: "",
        tel: "",
      },
      resolver: zodResolver(schema),
    });
  
    const { handleSubmit, formState } = form;
    const { errors } = formState;
  
    const onSubmit = (data) => {
      console.log(data);
    };
  
    return (
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="w-full flex flex-col justify-between gap-4">
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adresse email*</FormLabel>
                <FormControl>
                  <Input
                    className="md:w-96 max-w-sm"
                    placeholder="Email"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                    exemple@gmail.com
                </FormDescription>
                <FormMessage>{errors.email?.message}</FormMessage>
              </FormItem>
            )}
          />
  
          <FormField
            control={form.control}
            name="tel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numéro de Téléphone*</FormLabel>
                <FormControl>
                  <Input
                    className="md:w-96 max-w-sm"
                    placeholder="N° Tél"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                    Exemple: 0612345678 / 0712345678
                </FormDescription>
                <FormMessage>{errors.tel?.message}</FormMessage>
              </FormItem>
            )}
          />
        
        <button type="submit" className='bg-blue-900 rounded-2xl mt-8 py-1 px-6 w-fit text-white font-medium ml-auto'> Suivant </button></div>
        </form>
      </Form>
    );
  };

const EmailTel = () => {
    return ( 
    <Layout 
      title={"Saisissez votre Adresse email et Numéro de Téléphone "} 
      fields={<Fields />} 
      />
     );
}
 
export default EmailTel;


