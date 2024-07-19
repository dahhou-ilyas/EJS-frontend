"use client"
import * as React from "react";
import Layout from "@/components/auth/Layout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const schema = z.object({
  chirurgicaux: z.string().nonempty("Veuillez indiquer si vous êtes souffrez ou non de maladies chirurgicaux"),
  typeOperation: z.string().optional(), 
  anneeOperation: z.string()
    .optional(),
    // .regex(/^\d{4}$/, "L'année doit être un nombre à 4 chiffres."),


});

const Fields = ({ setFormData, nextStep }) => {
  const form = useForm({
    defaultValues: {
      chirurgicaux: "",
      typeOperation: "",
      anneeOperation: "",
    },
    resolver: zodResolver(schema),
  });

  const { handleSubmit, control, formState: { errors }, watch } = form;

  const onSubmit = (data) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      chirurgicaux: data.chirurgicaux,
      typeOperation: data.typeOperation || "",
      anneeOperation: data.anneeOperation || "",
    }));
    nextStep();
  };
    
  const chirurgicauxValue = watch("chirurgicaux");


  return (
    <div className="sm:mt-8">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="w-full flex flex-col justify-between gap-4">
            <FormField
              control={control}
              name="chirurgicaux"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Souffrez vous de maladies chirurgicaux?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="oui" />
                        </FormControl>
                        <FormLabel className="font-normal">OUI</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="non" />
                        </FormControl>
                        <FormLabel className="font-normal">NON</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage>{errors.chirurgicaux?.message}</FormMessage>
                </FormItem>
              )}
            />
            {chirurgicauxValue === "oui" && ( <>
              <FormField
              control={form.control}
              name="typeOperation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type d'opération</FormLabel>
                  <FormControl>
                    <Input
                      className="md:w-96 max-w-sm"
                      placeholder="Type d'opération"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                  Veuillez indiquer le type d'opération que vous avez reçue
                </FormDescription>
                  <FormMessage>{errors.typeOperation?.message}</FormMessage>
                </FormItem>
              )}
            />
              <FormField
              control={form.control}
              name="anneeOperation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Année de l'opération</FormLabel>
                  <FormControl>
                    <Input
                      className="md:w-96 max-w-sm"
                      placeholder="Année d'opération"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                  Veuillez indiquer l'année d'opération que vous avez reçue
                </FormDescription>
                  <FormMessage>{errors.anneeOperation?.message}</FormMessage>
                </FormItem>
              )}
            />
    </>
              )}


            <button type="submit" className="bg-blue-900 rounded-2xl mt-8 py-1 px-6 w-fit text-white font-medium ml-auto">
              Suivant
            </button>
          </div>
        </form>
      </Form>
    </div>
  ); 
};

const MaladiesChirurgicaux = ({ setFormData, prevStep, nextStep }) => {
  return (
    <Layout
      title={"Antécédents Personnels Médicaux"}
      subtitle={"Veuillez saisir les informations suivantes"}
      fields={<Fields setFormData={setFormData} nextStep={nextStep} />}
      prevStep={prevStep}
    />
  );
};

export default MaladiesChirurgicaux;
