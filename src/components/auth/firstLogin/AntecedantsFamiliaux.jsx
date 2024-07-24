"use client"

import * as React from "react";
import Layout from "@/components/auth/Layout";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const antecedantsFamiliaux = [
  {
    id: "diabete",
    label: "Diabète",
  },
  {
    id: "tension",
    label: "Hypertension artérielle (tension)",
  },
  {
    id: "cancer",
    label: "Cancer",
  },
  {
    id: "maladieCardiovasculaire",
    label: "Maladie cardio-vasculaire",
  },
  {
    id: "aucune",
    label: "Aucune",
  },
];

const FormSchema = z.object({
  antecedantsFamiliaux: z.array(z.string()).min(1, "Veuillez sélectionner au moins une maladie. Selectionnez aucune si vous n'en avez pas."),
  autre: z.string().optional(),
});

const Fields = ({ setFormData, nextStep, formData }) => {

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      antecedantsFamiliaux: [],
      autre: "",
    },
  });

  const { handleSubmit } = form;


  const onSubmit = (data) => {

    const filteredData = data.antecedantsFamiliaux.filter((item) =>
      antecedantsFamiliaux.map((i) => i.id).includes(item)
    );

    setFormData((prevFormData) => ({
      ...prevFormData,
      antecedantsFamiliaux: [...filteredData, data.autre].filter(Boolean),
    }));

    const antecedentFamiliale=[...filteredData, data.autre].filter(Boolean);

    nextStep({formData,antecedentFamiliale});
  };


  return (
    <div className="sm:mt-8">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="w-full flex flex-col justify-between gap-4">
            <FormField
              control={form.control}
              name="antecedantsFamiliaux"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Est-ce que vous avez un membre de la famille souffrant de l'une des maladies suivantes ?</FormLabel>
                    <FormDescription>
                      Vous pouvez sélectionner plusieurs ou aucune si aucun de vos proches souffrent de l'une de ces maladies.
                    </FormDescription>
                  </div>
                  {antecedantsFamiliaux.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="antecedantsFamiliaux"
                      render={({ field }) => (
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
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="autre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Autre:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Veuillez préciser"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button type="submit" className='bg-blue-900 rounded-2xl mt-8 py-1 px-6 w-fit text-white font-medium ml-auto'> Valider </button>
          </div>
        </form>
      </Form>
    </div>
  );
};

const AntecedantsFamiliaux = ({ setFormData, nextStep, prevStep, formData }) => {
  return (
    <Layout
      title={"Antécédents Familiaux"}
      subtitle={"Veuillez saisir les informations suivantes"}
      fields={<Fields setFormData={setFormData} nextStep={nextStep} formData={formData} />}
      prevStep={prevStep}
    />
  );
};

export default AntecedantsFamiliaux;
