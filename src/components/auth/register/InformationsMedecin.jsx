import * as React from "react";
import Layout from "@/components/auth/Layout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const schema = z.object({
  medecinESJ: z.string().nonempty("Veuillez indiquer si vous êtes médecin au sein d'un centre ESJ"),
  medecinGeneraliste: z.string().nonempty("Veuillez sélectionner si vous êtes un médecin géneraliste"),
  specialite: z.string().optional(), 
});

const Fields = ({ setFormData, nextStep }) => {
  const form = useForm({
    defaultValues: {
      medecinESJ: "",
      medecinGeneraliste: "",
      specialite: "", 
    },
    resolver: zodResolver(schema),
  });

  const { handleSubmit, control, formState: { errors },  watch } = form;
  const generalisteValue = watch("medecinGeneraliste");

  const onSubmit = (data) => {
    // Ensure situationActuelle is validated if scolarise is 'oui'
    if (data.medecinGeneraliste === "non" && !data.specialite) {
      form.setError("specialite", {
        type: "manual",
        message: "Veuillez sélectionner votre specialité",
      });
      return;
    }
    

    setFormData((prevFormData) => ({
      ...prevFormData,
      medecinESJ: data.medecinESJ,
      medecinGeneraliste: data.medecinGeneraliste,
      specialite: data.specialite || "",
    }));
    nextStep();
    
  };

  return (
    <div className="sm:mt-8">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="w-full flex flex-col justify-between gap-4">
            <FormField
              control={control}
              name="medecinESJ"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Médecin au sein d'un centre ESJ?</FormLabel>
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
                  <FormMessage>{errors.medecinESJ?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="medecinGeneraliste"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Médecin Généraliste</FormLabel>
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
                  <FormMessage>{errors.medecinGeneraliste?.message}</FormMessage>
                </FormItem>
              )}
            />


        {generalisteValue == "non" && <FormField
                  control={control}
                  name="specialite"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Spécialité</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez votre spécialité" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Psychiatre">Psychiatre</SelectItem>
                          <SelectItem value="Gynécologue">Gynécologue</SelectItem>
                          <SelectItem value="Dermatologue">Dermatologue</SelectItem>
                          <SelectItem value="Ophtalmologue">Ophtalmologue</SelectItem>
                          <SelectItem value="Médecin spécialiste en sevrage tabagique ">Médecin spécialiste en sevrage tabagique</SelectItem>
                          <SelectItem value="Dentiste">Dentiste</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage>{errors.specialite?.message}</FormMessage>
                    </FormItem>
                  )}
                />
}

                
            <button type="submit" className="bg-[#018A90] rounded-2xl mt-8 py-1 px-6 w-fit text-white font-medium ml-auto">
              Suivant
            </button>
          </div>
        </form>
      </Form>
    </div>
  ); 
};

const InformationsMedecin = ({ setFormData, prevStep, nextStep }) => {
  return (
    <Layout
      title={"Informations d'activités"}
      fields={<Fields setFormData={setFormData} nextStep={nextStep} />}
      prevStep={prevStep}
      bgColor={"green"}
    />
  );
};

export default InformationsMedecin;
