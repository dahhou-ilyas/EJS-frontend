import Layout from "@/components/auth/Layout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTranslations } from 'next-intl';

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const Fields = ({ setFormData, nextStep, formData }) => {
  const t = useTranslations('Fields');
  
  const schema = z.object({
    medecinESJ: z.string().nonempty(t('medecinESJError')),
    medecinGeneraliste: z.string().nonempty(t('medecinGeneralisteError')),
    specialite: z.string().optional(),
    autre: z.string().optional(),
  });

  const form = useForm({
    defaultValues: {
      medecinESJ: formData.medecinESJ || "",
      medecinGeneraliste: formData.medecinGeneraliste || "",
      specialite: formData.specialite || "",
      autre: formData.autre || "",
    },
    resolver: zodResolver(schema),
  });

  const { handleSubmit, control, formState: { errors }, watch } = form;
  const generalisteValue = watch("medecinGeneraliste");

  const onSubmit = (data) => {
    if (data.medecinGeneraliste === "non") {
      if (!data.specialite && !data.autre) {
        form.setError("specialite", {
          type: "manual",
          message: t('specialiteError'),
        });
        return;
      } else if (!data.specialite && data.autre) {
        data.specialite = data.autre;
      }
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
                  <FormLabel>{t('medecinESJLabel')}</FormLabel>
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
                        <FormLabel className="font-normal">{t('oui')}</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0 rtl:flex-row-reverse">
                        <FormControl>
                          <RadioGroupItem value="non" className="rtl:ml-2"/>
                        </FormControl>
                        <FormLabel className="font-normal">{t('non')}</FormLabel>
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
                  <FormLabel>{t('medecinGeneralisteLabel')}</FormLabel>
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
                        <FormLabel className="font-normal">{t('oui')}</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0 rtl:flex-row-reverse">
                        <FormControl>
                          <RadioGroupItem value="non" className="rtl:ml-2"/>
                        </FormControl>
                        <FormLabel className="font-normal">{t('non')}</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage>{errors.medecinGeneraliste?.message}</FormMessage>
                </FormItem>
              )}
            />

            {generalisteValue === "non" && (
              <>
                <FormField
                  control={control}
                  name="specialite"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('specialiteLabel')}</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0 rtl:flex-row-reverse">
                            <FormControl>
                              <RadioGroupItem value="Pédiatre" className="rtl:ml-2"/>
                            </FormControl>
                            <FormLabel className="font-normal">{t('pediatre')}</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0 rtl:flex-row-reverse">
                            <FormControl>
                              <RadioGroupItem value="Psychiatre" className="rtl:ml-2"/>
                            </FormControl>
                            <FormLabel className="font-normal">{t('psychiatre')}</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0 rtl:flex-row-reverse">
                            <FormControl>
                              <RadioGroupItem value="Gynécologue" className="rtl:ml-2"/>
                            </FormControl>
                            <FormLabel className="font-normal">{t('gynecologue')}</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0 rtl:flex-row-reverse">
                            <FormControl>
                              <RadioGroupItem value="Dermatologue" className="rtl:ml-2"/>
                            </FormControl>
                            <FormLabel className="font-normal">{t('dermatologue')}</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0 rtl:flex-row-reverse">
                            <FormControl>
                              <RadioGroupItem value="Ophtalmologue" className="rtl:ml-2"/>
                            </FormControl>
                            <FormLabel className="font-normal">{t('ophtalmologue')}</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage>{errors.specialite?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="autre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('autreLabel')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('autrePlaceholder')} {...field} />
                      </FormControl>
                      <FormMessage>{errors.autre?.message}</FormMessage>
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
    focus:ring-sky-600 rounded-2xl mt-8 py-1 px-6 w-fit text-white font-medium ml-auto">
              {t('suivant')}
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};

const InformationsMedecin = ({ setFormData, prevStep, nextStep, formData }) => {
  const t = useTranslations('Layout');
  return (
    <Layout
      title={t('title')}
      fields={<Fields setFormData={setFormData} nextStep={nextStep} formData={formData} />}
      prevStep={prevStep}
    />
  );
};

export default InformationsMedecin;
