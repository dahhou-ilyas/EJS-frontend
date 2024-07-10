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
    cin: z.string().min(1, "Veuillez saisir votre numéro de CIN").regex(/^[A-Za-z]{1,2}\d+$/, "Ce numéro de CIN est invalide"),
    inpe: z.string().min(1, "Veuillez saisir votre INPE"),
    ppr: z.string().optional(),
  });


  const Fields = ({ setFormData, nextStep, medecin }) => {
    const form = useForm({
      defaultValues: {
        cin: "",
        inpe: "",
        ppr: "",
      },
      resolver: zodResolver(schema),
    });
  
    const { handleSubmit, formState } = form;
    const { errors } = formState;
  
    const onSubmit = (data) => {
        if (medecin && !data.ppr) {
            form.setError("ppr", {
              type: "manual",
              message: "Veuillez saisir votre PPR",
            });
            return;
          }
          setFormData((prevFormData) => ({
            ...prevFormData,
            cin: data.cin,
            inpe: data.inpe,
            ...(medecin && { ppr: data.ppr }),
        }));
      
      nextStep();
    };
  
    return (
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="w-full flex flex-col justify-between gap-4">
          
          <FormField
            control={form.control}
            name="cin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numéro de CIN**</FormLabel>
                <FormControl>
                  <Input
                    className="md:w-96 max-w-sm"
                    placeholder="N° de CIN"
                    {...field}
                  />
                </FormControl>
                <FormMessage>{errors.cin?.message}</FormMessage>
              </FormItem>
            )}
          />
  
          <FormField
            control={form.control}
            name="inpe"
            render={({ field }) => (
              <FormItem>
                <FormLabel>INPE*</FormLabel>
                <FormControl>
                  <Input
                    className="md:w-96 max-w-sm"
                    placeholder="INPE"
                    {...field}
                  />
                </FormControl>
                <FormMessage>{errors.inpe?.message}</FormMessage>
              </FormItem>
            )}
          />
        {medecin && <FormField
            control={form.control}
            name="ppr"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PPR*</FormLabel>
                <FormControl>
                  <Input
                    className="md:w-96 max-w-sm"
                    placeholder="PPR"
                    {...field}
                  />
                </FormControl>
                <FormMessage>{errors.ppr?.message}</FormMessage>
              </FormItem>
            )}
          />}
        <button type="submit" className='bg-[#018A90] rounded-2xl mt-8 py-1 px-6 w-fit text-white font-medium ml-auto'> Suivant </button></div>
        </form>
      </Form>
    );
  };

const InformationsActivites = ({ setFormData, nextStep, prevStep, medecin }) => {
    return ( 
    <Layout 
      title={"Informations d'activités"} 
      subtitle={"Veuillez saisir votre numéro de CIN, INPE et PPR"} 
      fields={<Fields setFormData={setFormData}  nextStep={nextStep} medecin={medecin}/>}
      prevStep= {prevStep}
      bgColor={"green"}
      />
     );
}
 
export default InformationsActivites;


