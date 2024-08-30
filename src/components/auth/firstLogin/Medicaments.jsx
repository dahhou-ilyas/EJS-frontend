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
  const t = useTranslations("Medicaments");

  const schema = z.object({
    medicaments: z.string().nonempty(t("medicaments.error")),
    typeMedicaments: z.string().optional(),
  });

  const form = useForm({
    defaultValues: {
      medicaments: "",
      typeMedicaments: "",
    },
    resolver: zodResolver(schema),
  });

  const { handleSubmit, control, formState: { errors }, watch } = form;

  const onSubmit = (data) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      medicaments: data.medicaments,
      typeMedicaments: data.typeMedicaments || "",
    }));
    nextStep();
  };

  const medicamentsValue = watch("medicaments");

  return (
    <div className="sm:mt-8">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="w-full flex flex-col justify-between gap-4">
            <FormField
              control={control}
              name="medicaments"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>{t("medicaments.label")}</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0 rtl:flex-row-reverse">
                        <FormControl>
                          <RadioGroupItem value="oui" className="rtl:ml-2"/>
                        </FormControl>
                        <FormLabel className="font-normal">{t("medicaments.yes")}</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0 rtl:flex-row-reverse">
                        <FormControl>
                          <RadioGroupItem value="non" className="rtl:ml-2"/>
                        </FormControl>
                        <FormLabel className="font-normal">{t("medicaments.no")}</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage>{errors.medicaments?.message}</FormMessage>
                </FormItem>
              )}
            />
            {medicamentsValue === "oui" && (
              <FormField
                control={form.control}
                name="typeMedicaments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("typeMedicaments.label")}</FormLabel>
                    <FormControl>
                      <Input
                        className="md:w-96 max-w-sm"
                        placeholder={t("typeMedicaments.placeholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>{t("typeMedicaments.description")}</FormDescription>
                    <FormMessage>{errors.typeMedicaments?.message}</FormMessage>
                  </FormItem>
                )}
              />
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
    focus:ring-sky-600 rounded-2xl mt-8 py-1 px-6 w-fit text-white font-medium ml-auto">
              {t("nextButton")}
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};

const Medicaments = ({ setFormData, prevStep, nextStep }) => {
  const t = useTranslations("Medicaments");

  return (
    <Layout
      title={t("title")}
      subtitle={t("subtitle")}
      fields={<Fields setFormData={setFormData} nextStep={nextStep} />}
      prevStep={prevStep}
    />
  );
};

export default Medicaments;
