"use client"
import * as React from "react";
import Layout from "@/components/auth/Layout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { useTranslations } from 'next-intl';

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

const Fields = ({ setFormData, nextStep }) => {
  const t = useTranslations("Habitudes");

  const habitudes = [
    { id: "sport", label: t('sport') },
    { id: "tabac", label: t('smoking'), question: t('smokingQuestion'), type: "input", placeholder: t('smokingPlaceholder'), additionalQuestion: t('smokingSinceQuestion'), additionalPlaceholder: t('smokingSincePlaceholder') },
    { id: "alcool", label: t('alcohol'), question: t('alcoholQuestion'), type: "radio", options: [t('daily'), t('occasional')] },
    { id: "tempsEcran", label: t('screenTime'), question: t('screenTimeQuestion'), type: "radio", options: [t('1-2h'), t('3-5h'), t('5h+')] },
  ];

  const FormSchema = z.object({
    habitudes: z.array(z.string()).optional(),
    tabac: z.string().optional(),
    tabacSince: z.string().optional(),
    alcool: z.string().optional(),
    tempsEcran: z.string().optional(),
  });

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      habitudes: [],
      tabac: "",
      tabacSince: "",
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
      tabacSince: data.tabacSince || "",
      alcool: data.alcool || "",
      tempsEcran: data.tempsEcran || "",
    }));
    nextStep();
  };

  return (
    <div className="sm:mt-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="w-full flex flex-col justify-between gap-4">
            <FormField
              control={form.control}
              name="habitudes"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">{t('habitsQuestion')}</FormLabel>
                    <FormDescription>{t('habitsDescription')}</FormDescription>
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
                  <React.Fragment key={habit}>
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
                    {habitObj.additionalQuestion && (
                      <FormField
                        key={`${habit}Since`}
                        control={form.control}
                        name={`${habit}Since`}
                        render={({ field }) => (
                          <FormItem className="flex flex-col space-y-2">
                            <FormLabel className="text-sm font-normal">{habitObj.additionalQuestion}</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                className="input"
                                placeholder={habitObj.additionalPlaceholder}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </React.Fragment>
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
                              <FormItem key={option} className="flex items-center rtl:flex-row-reverse space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value={option} className="rtl:ml-2"/>
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
    focus:ring-sky-600 rounded-2xl mt-8 py-1 px-6 w-fit text-white font-medium ml-auto mb-4">
              {t('nextButton')}
            </button>
          </div>
        </form>
      </Form>
    </div>
  ); 
};

const Habitudes = ({ setFormData, nextStep, prevStep, formData }) => {
  const t = useTranslations("Habitudes");
  return (
    <Layout
      title={t('personalAntecedentsTitle')}
      subtitle={t('personalAntecedentsSubtitle')}
      fields={<Fields setFormData={setFormData} nextStep={nextStep} formData={formData} />}
      prevStep={prevStep}
    />
  );
};

export default Habitudes;
