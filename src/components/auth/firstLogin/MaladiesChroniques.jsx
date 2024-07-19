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



const maladieJeune = [
    {
      id: "asthme",
      label: "Asthme",
    },
    {
      id: "diabete",
      label: "Diabète",
    },
    {
      id: "epilepsie",
      label: "Épilepsie",
    },
    {
      id: "tsa",
      label: "Troubles du spectre de l'autisme (TSA)",
    },
    {
      id: "troubleSommeil",
      label: "Trouble de Sommeil",
    },

  ]
   
  const FormSchema = z.object({
    maladieJeune: z.array(z.string()).optional(),
  })

const Fields = ({ setFormData, nextStep, formData }) => {
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
          maladieJeune: [],
        },
      })


  const onSubmit = (data) => {
    console.log('AntecedantsFamiliaux formData:', formData);
    const filteredData = data.maladieJeune.filter(item => maladieJeune.map(i => i.id).includes(item));
    setFormData((prevFormData) => ({
      ...prevFormData,
      maladieJeune: filteredData,
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
          name="maladieJeune"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Souffrez vous des maladies chroniques suivantes?</FormLabel>
                <FormDescription>
                Vous pouvez sélectionner aucune ou plusieurs.
                </FormDescription>
              </div>
              {maladieJeune.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="maladieJeune"
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

const MaladiesChroniques = ({ setFormData, nextStep, formData}) => {
  return ( 
    <Layout 
      title={"Antécédents Personnels Médicaux"} 
      subtitle={"Veuillez saisir les informations suivantes"} 
      fields={<Fields setFormData={setFormData} nextStep={nextStep} formData={formData}/>}  
    />
  );
}

export default MaladiesChroniques;
