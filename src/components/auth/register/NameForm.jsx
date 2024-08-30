import React from 'react';
import Layout from "@/components/auth/Layout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useTranslations } from "next-intl";

const Fields = ({ setFormData, nextStep }) => {
  const t = useTranslations("NameForm");

  const schema = z.object({
    nom: z.string()
      .min(1, t("nomErrorRequired"))
      .regex(/^[a-zA-ZÀ-ÿ\u0600-\u06FF\s-]+$/, t("nomErrorInvalid")),
    prenom: z.string()
      .min(1, t("prenomErrorRequired"))
      .regex(/^[a-zA-ZÀ-ÿ\u0600-\u06FF\s-]+$/, t("prenomErrorInvalid"))
  });

  const form = useForm({
    defaultValues: {
      nom: "",
      prenom: "",
    },
    resolver: zodResolver(schema),
  });

  const { handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log(data);
    setFormData((prevFormData) => ({
      ...prevFormData,
      nom: data.nom,
      prenom: data.prenom,
    }));
    
    nextStep();
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="w-full flex flex-col justify-between gap-4">
        
        <FormField
          control={form.control}
          name="nom"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('nomLabel')}*</FormLabel>
              <FormControl>
                <Input
                  className="md:w-96 max-w-sm"
                  placeholder={t('nomPlaceholder')}
                  {...field}
                />
              </FormControl>
              <FormMessage>{errors.nom?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="prenom"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('prenomLabel')}*</FormLabel>
              <FormControl>
                <Input
                  className="md:w-96 max-w-sm"
                  placeholder={t('prenomPlaceholder')}
                  {...field}
                />
              </FormControl>
              <FormMessage>{errors.prenom?.message}</FormMessage>
            </FormItem>
          )}
        />
      
        <button type="submit" className="rounded-2xl mt-8 py-1 px-6 w-fit text-white font-medium ml-auto bg-sky-700
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
    focus:ring-sky-600">
          {t('submitButton')}
        </button>
        </div>
      </form>
    </Form>
  );
};

const NameForm = ({ setFormData, nextStep }) => {
  const t = useTranslations("NameForm");

  return ( 
    <Layout 
      title={t("title")} 
      subtitle={t("subtitle")} 
      fields={<Fields setFormData={setFormData} nextStep={nextStep}/>} 
    />
  );
}

export default NameForm;

