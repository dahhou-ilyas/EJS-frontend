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
    email: z.string().email("Veuillez saisir une adresse email valide"),
});

  const Fields = ({ nextStep, buttonColor }) => {
    const form = useForm({
      defaultValues: {
        email: "",
      },
      resolver: zodResolver(schema),
    });
  
    const { handleSubmit, formState } = form;
    const { errors } = formState;
  
    const onSubmit = (data) => {
        console.log(data.email);
        nextStep(data.email);
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

        <button type="submit" className= "rounded-2xl mt-8 py-1 px-6 w-fit text-white font-medium ml-auto bg-blue-900" > Suivant </button></div>
        </form>
      </Form>
    );
  };

const EmailRecovery = ({ nextStep }) => {
    return ( 
    <Layout 
      title={"Veuillez saisir votre Adresse email "} 
      fields={<Fields nextStep={nextStep} />} 
      />
     );
}
 
export default EmailRecovery;


