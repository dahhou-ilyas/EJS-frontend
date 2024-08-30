"use client"

import * as React from "react";
import Layout from "@/components/auth/Layout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTranslations } from 'next-intl';

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

const Fields = ({ setFormData, nextStep, formData }) => {
  const t = useTranslations("AntecedantsFamilliaux");

  const antecedantsFamiliaux = [
    { id: "diabete", label: t('diabetes') },
    { id: "tension", label: t('hypertension') },
    { id: "cancer", label: t('cancer') },
    { id: "maladieCardiovasculaire", label: t('cardiovascularDisease') },
    { id: "aucune", label: t('none') },
  ];

  const FormSchema = z.object({
    antecedantsFamiliaux: z.array(z.string()).min(1, t('minSelectionError')),
    autre: z.string().optional(),
  });

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
    nextStep({ formData, antecedentFamiliale });
  };

  return (
    <div className="sm:mt-2">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="w-full flex flex-col justify-between gap-4">
            <FormField
              control={form.control}
              name="antecedantsFamiliaux"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">{t('diseaseQuestion')}</FormLabel>
                    <FormDescription>{t('diseaseDescription')}</FormDescription>
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
                            className="rtl:ml-2"
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
                          <FormLabel className="text-sm font-normal">{item.label}</FormLabel>
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
                  <FormLabel>{t('otherLabel')}</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder={t('otherPlaceholder')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button type="submit" className='bg-sky-700
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
    focus:ring-sky-600 rounded-2xl mt-8 py-1 px-6 w-fit text-white font-medium ml-auto'>
              {t('submitButton')}
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};

const AntecedantsFamiliaux = ({ setFormData, nextStep, prevStep, formData }) => {
  const t = useTranslations("AntecedantsFamilliaux");
  return (
    <Layout
      title={t('antecedentsFamiliauxTitle')}
      subtitle={t('antecedentsFamiliauxSubtitle')}
      fields={<Fields setFormData={setFormData} nextStep={nextStep} formData={formData} />}
      prevStep={prevStep}
    />
  );
};

export default AntecedantsFamiliaux;
