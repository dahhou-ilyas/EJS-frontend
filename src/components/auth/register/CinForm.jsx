import Layout from "@/components/auth/Layout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SPRINGBOOT_API_URL } from "@/config";

const Fields = ({ setFormData, nextStep }) => {
  const t = useTranslations('CinForm'); 

  const schema = z.object({
    cin: z.string()
      .regex(/^[A-Za-z]{1,2}\d+$/, t("cinErrorInvalid")),
  });

  const form = useForm({
    defaultValues: {
      cin: "",
    },
    resolver: zodResolver(schema),
  });

  const { handleSubmit, formState } = form;
  const { errors } = formState;

  // const onSubmit = (data) => {
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     cin: data.cin,
  //   }));
  //   nextStep();
  // };

  const onSubmit = async (data) => {
    try {
      // Fetch validation from backend
      const response = await fetch(`${SPRINGBOOT_API_URL}/validator/cin?cin=${data.cin}`);
      
      if (!response.ok) {
        form.setError('cin', {
          type: 'manual',
          message: t("cinErrorExist"),
        });
        return;
      } else {
        setFormData((prevFormData) => ({
          ...prevFormData,
          cin: data.cin,
        }));
        nextStep();
      }
    } catch (error) {
      // Handle unexpected errors
      form.setError('cin', {
        type: 'manual',
        message: "Erreur: " + error.message,
      });
    }
  };
  return (
    <div className="mt-4">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="w-full flex flex-col justify-between gap-4">
            <FormField
              control={form.control}
              name="cin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("cinLabel")}*</FormLabel>
                  <FormControl>
                    <Input
                      className="md:w-96 max-w-sm"
                      placeholder={t("cinPlaceholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{errors.cin?.message}</FormMessage>
                </FormItem>
              )}
            />
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
              {t("submitButton")}
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};

const CinForm = ({ setFormData, nextStep, prevStep }) => {
    const t = useTranslations('CinForm');

    return (
      <Layout
        title={t("title")}
        subtitle={t("subtitle")}
        fields={<Fields setFormData={setFormData} nextStep={nextStep} />}
        prevStep={prevStep}
      />
    );
  };

export default CinForm;
