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
  } from "@/components/ui/form"



  const schema = z.object({
    nom: z.string().min(1, "Veuillez saisir votre nom"),
    prenom: z.string().min(1, "Veuillez saisir votre prénom"),
  });


  const Fields = ({ setFormData, nextStep, buttonColor }) => {
    const form = useForm({
      defaultValues: {
        nom: "",
        prenom: "",
      },
      resolver: zodResolver(schema),
    });
  
    const { handleSubmit, formState } = form;
    const { errors } = formState;
  
    const onSubmit = (data) => {
      console.log(data);
      setFormData((prevFormData) => ({
        ...prevFormData,
        nom: data.nom,
        prenom: data.prenom,
      }));
      
      nextStep();
    };
    const bgClasses = {
      green: 'bg-[#018A90]',
    };
    return (
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="w-full flex flex-col justify-between gap-4">
          
          <FormField
            control={form.control}
            name="nom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom*</FormLabel>
                <FormControl>
                  <Input
                    className="md:w-96 max-w-sm"
                    placeholder="Nom"
                    {...field}
                  />
                </FormControl>
                <FormMessage>{errors.nom?.message}</FormMessage>
              </FormItem>
            )}
          />
  
          <FormField
            control={form.control}
            name="prenom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prénom*</FormLabel>
                <FormControl>
                  <Input
                    className="md:w-96 max-w-sm"
                    placeholder="Prénom"
                    {...field}
                  />
                </FormControl>
                <FormMessage>{errors.prenom?.message}</FormMessage>
              </FormItem>
            )}
          />
        
        <button type="submit" className={`rounded-2xl mt-8 py-1 px-6 w-fit text-white font-medium ml-auto ${bgClasses[buttonColor] || 'bg-blue-900'}`} > Suivant </button></div>
        </form>
      </Form>
    );
  };

const NameForm = ({ setFormData, nextStep, buttonColor, bgColor  }) => {
    return ( 
    <Layout 
      title={"Créer votre compte e-ESJ"} 
      subtitle={"Veuillez saisir votre nom et prénom"} 
      fields={<Fields setFormData={setFormData} nextStep={nextStep} buttonColor={buttonColor}/>} 
      bgColor={bgColor}
      />
     );
}
 
export default NameForm;


