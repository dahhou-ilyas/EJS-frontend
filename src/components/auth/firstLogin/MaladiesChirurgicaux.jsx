"use client"
import * as React from "react";
import Layout from "@/components/auth/Layout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTranslations } from "next-intl";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const Fields = ({ setFormData, nextStep }) => {
  const t = useTranslations("MaladiesChirurgicaux");

  const chirurgicaux = [
    {
      id: "oui",
      label: t("chirurgicaux.oui"),
    },
    {
      id: "non",
      label: t("chirurgicaux.non"),
    },
  ];

  const schema = z.object({
    chirurgicaux: z.string().nonempty(t("schema.chirurgicaux")),
    typeOperation: z.string().optional(),
    anneeOperation: z.string().optional(),
  });

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
                  <FormLabel>{t("chirurgicaux.label")}</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      {chirurgicaux.map((item) => (
                        <FormItem key={item.id} className="flex items-center space-x-3 space-y-0 rtl:flex-row-reverse">
                          <FormControl>
                            <RadioGroupItem value={item.id} className="rtl:ml-2"/>
                          </FormControl>
                          <FormLabel className="font-normal">{item.label}</FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage>{errors.chirurgicaux?.message}</FormMessage>
                </FormItem>
              )}
            />
            {chirurgicauxValue === "oui" && (
              <>
                <FormField
                  control={control}
                  name="typeOperation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("typeOperation.label")}</FormLabel>
                      <FormControl>
                        <Input
                          className="md:w-96 max-w-sm"
                          placeholder={t("typeOperation.placeholder")}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>{t("typeOperation.description")}</FormDescription>
                      <FormMessage>{errors.typeOperation?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="anneeOperation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("anneeOperation.label")}</FormLabel>
                      <FormControl>
                        <Input
                          className="md:w-96 max-w-sm"
                          placeholder={t("anneeOperation.placeholder")}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>{t("anneeOperation.description")}</FormDescription>
                      <FormMessage>{errors.anneeOperation?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </>
            )}
            <button type="submit" className="bg-sky-700
    hover:bg-sky-800
    transition
    duration-300
    ease-in-out
    transform
    hover:scale-105
    hover:shadow-lg
    focus:outline-none
    focus:ring-2
    focus:ring-offset-2
    focus:ring-sky-600 rounded-2xl mt-4 py-1 px-6 w-fit text-white font-medium ml-auto">
              {t("nextButton")}
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};

const MaladiesChirurgicaux = ({ setFormData, prevStep, nextStep }) => {
  const t = useTranslations("MaladiesChirurgicaux");
  
  return (
    <Layout
      title={t("title")}
      subtitle={t("subtitle")}
      fields={<Fields setFormData={setFormData} nextStep={nextStep} />}
      prevStep={prevStep}
    />
  );
};

export default MaladiesChirurgicaux;
