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
  FormDescription,
} from "@/components/ui/form";
import { useTranslations } from 'next-intl'; // Adjust import based on your setup
import { SPRINGBOOT_API_URL } from "@/config";





const Fields = ({ setFormData, nextStep }) => {
  const t = useTranslations('EmailForm');
  
  const schema = z.object({
  email: z.string().email(t('emailErrorInvalid')),
  tel: z.string()
    .regex(/^0[67]\d{8}$/, t('telErrorInvalid')),
});
   
  const form = useForm({
    defaultValues: {
      email: "",
      tel: "",
    },
    resolver: zodResolver(schema),
  });

  const { handleSubmit, formState } = form;
  const { errors } = formState;

  // const onSubmit = (data) => {
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     email: data.email,
  //     tel: data.tel,
  //   }));
  //   nextStep();
  // };
  const onSubmit = async (data) => {
    try {
        // Fetch validation from backend
        const response = await fetch(`${SPRINGBOOT_API_URL}/validator/infouser?mail=${data.email}&numTel=${data.tel}`);

        if (!response.ok) {
            form.setError('email', {
                type: 'manual',
                message: t("emailOrTelErrorExist"), // Make sure to add this translation key to your translation files
            });
            form.setError('tel', {
                type: 'manual',
                message: t("emailOrTelErrorExist"),
            });
            return;
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                email: data.email,
                tel: data.tel,
            }));
            nextStep();
        }
    } catch (error) {
        // Handle unexpected errors
        form.setError('email', {
            type: 'manual',
            message: "Erreur: " + error.message,
        });
        form.setError('tel', {
            type: 'manual',
            message: "Erreur: " + error.message,
        });
    }
  };
  
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="w-full flex flex-col justify-between gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('emailLabel')}</FormLabel>
                <FormControl>
                  <Input
                    className="md:w-96 max-w-sm"
                    placeholder={t('emailPlaceholder')}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {t('emailDescription')}
                </FormDescription>
                <FormMessage>{errors.email?.message}</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('telLabel')}</FormLabel>
                <FormControl>
                  <Input
                    className="md:w-96 max-w-sm"
                    placeholder={t('telPlaceholder')}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {t('telDescription')}
                </FormDescription>
                <FormMessage>{errors.tel?.message}</FormMessage>
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

const EmailForm = ({ setFormData, nextStep, prevStep }) => {
  const t = useTranslations('EmailForm'); // Use translations hook

  return (
    <Layout
      title={t('title')}
      fields={<Fields setFormData={setFormData} nextStep={nextStep} />}
      prevStep={prevStep}
    />
  );
};

export default EmailForm;
