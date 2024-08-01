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

  const onSubmit = (data) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      email: data.email,
      tel: data.tel,
    }));
    nextStep();
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

          <button type="submit" className="rounded-2xl mt-8 py-1 px-6 w-fit text-white font-medium ml-auto bg-blue-900">
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
