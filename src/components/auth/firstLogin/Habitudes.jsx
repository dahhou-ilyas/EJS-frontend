"use client"

import * as React from "react"
import Layout from "@/components/auth/Layout" 

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"



const habitudes = [
    {
      id: "sport",
      label: "Sport",
    },
    {
      id: "tabac",
      label: "Tabac",
    },
    {
      id: "alcool",
      label: "Acool",
    },
    {
      id: "tempsEcran",
      label: "Temps d'écran",
    },
    {
      id: "troubleSommeil",
      label: "Trouble de Sommeil",
    }
  ]
   
  const FormSchema = z.object({
    habitudes: z.array(z.string()).optional(),
  })

const Fields = ({ setFormData, nextStep }) => {
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
          habitudes: [],
        },
      })


  const onSubmit = (data) => {
    const filteredData = data.habitudes.filter(item => habitudes.map(i => i.id).includes(item));

    setFormData((prevFormData) => ({
      ...prevFormData,
      habitudes: filteredData,
    }));
    nextStep();
  };


  return (
    <div className="sm:mt-8">
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <div className="w-full flex flex-col justify-between gap-4">
        <FormField
          control={form.control}
          name="habitudes"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Avez-vous certaines de ces habitudes?</FormLabel>
                <FormDescription>
                Vous pouvez sélectionner aucune ou plusieurs.
                </FormDescription>
              </div>
              {habitudes.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="habitudes"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <button type="submit" className='bg-blue-900 rounded-2xl mt-8 py-1 px-6 w-fit text-white font-medium ml-auto'> Suivant </button></div>
      </form>
    </Form>
    </div>
  );
};

const Habitudes = ({ setFormData, nextStep, prevStep}) => {
  return ( 
    <Layout 
      title={"Antécédents Personnels"} 
      subtitle={"Veuillez saisir les informations suivantes"} 
      fields={<Fields setFormData={setFormData} nextStep={nextStep} />}  
      prevStep={prevStep}
    />
  );
}

export default Habitudes;
