"use client"
import * as React from "react";
import Layout from "@/components/auth/Layout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const habitudes = [
  {
    id: "sport",
    label: "Sport",
  },
  {
    id: "tabac",
    label: "Tabac",
    question: "Combien de cigarettes fumez-vous par jour?",
    type: "input",
    placeholder: "Nombre de cigarettes",
  },
  {
    id: "alcool",
    label: "Alcool",
    question: "Consommation d'alcool",
    type: "radio",
    options: ["Quotidien", "Occasionnel"],
  },
  {
    id: "tempsEcran",
    label: "Temps d'écran",
    question: "Combien de temps passez-vous devant un écran par jour?",
    type: "radio",
    options: ["1-2h", "3-5h", "5h+"],
  },
];

const FormSchema = z.object({
  habitudes: z.array(z.string()).optional(),
  tabac: z.string().optional(),
  alcool: z.string().optional(),
  tempsEcran: z.string().optional(),
});

const Fields = ({ setFormData, nextStep, formData }) => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      habitudes: [],
      tabac: "",
      alcool: "",
      tempsEcran: "",
    },
  });

  const selectedHabitudes = useWatch({ control: form.control, name: "habitudes" });

  const onSubmit = (data) => {
    const filteredData = data.habitudes.filter(item => habitudes.map(i => i.id).includes(item));

    setFormData((prevFormData) => ({
      ...prevFormData,
      habitudes: filteredData,
      tabac: data.tabac || "",
      alcool: data.alcool || "",
      tempsEcran: data.tempsEcran || "",
    }));
    console.log(formData)
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
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
            {selectedHabitudes && selectedHabitudes.map((habit) => {
              const habitObj = habitudes.find(h => h.id === habit);
              if (habitObj?.type === "input") {
                return (
                  <FormField
                    key={habit}
                    control={form.control}
                    name={habit}
                    render={({ field }) => (
                      <FormItem className="flex flex-col space-y-2">
                        <FormLabel className="text-sm font-normal">{habitObj.question}</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="input"
                            placeholder={habitObj.placeholder}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                );
              } else if (habitObj?.type === "radio") {
                return (
                  <FormField
                    key={habit}
                    control={form.control}
                    name={habit}
                    render={({ field }) => (
                      <FormItem className="flex flex-col space-y-2">
                        <FormLabel className="text-sm font-normal">{habitObj.question}</FormLabel>
                        <FormControl>
                          <RadioGroup
                            {...field}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            {habitObj.options.map((option) => (
                              <FormItem key={option} className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value={option} />
                                </FormControl>
                                <FormLabel className="font-normal">{option}</FormLabel>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                );
              }
              return null;
            })}
            <button type="submit" className="bg-blue-900 rounded-2xl mt-8 py-1 px-6 w-fit text-white font-medium ml-auto">
              Suivant
            </button>
          </div>
        </form>
      </Form>
    </div>
  ); 
};

const Habitudes = ({ setFormData, nextStep, prevStep, formData }) => {
  return (
    <Layout
      title={"Antécédents Personnels"}
      subtitle={"Veuillez saisir les informations suivantes"}
      fields={<Fields setFormData={setFormData} nextStep={nextStep} formData={formData} />}
      prevStep={prevStep}
    />
  );
};

export default Habitudes;
