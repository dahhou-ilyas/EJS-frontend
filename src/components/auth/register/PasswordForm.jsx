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
import { useTranslations } from 'next-intl';

const Fields = ({ setFormData, nextStep, formData }) => {
  const t = useTranslations('PasswordForm');

  const schema = z.object({
    password: z
      .string()
      .min(8, t("passwordMin"))
      .max(16, t("passwordMax"))
      .regex(/[A-Z]/, t("passwordUppercase"))
      .regex(/[!@#$%^&*(),.?":{}|<>]/, t("passwordSpecial")),
    confirmerPassword: z.string()
      .min(1, t("confirmPasswordRequired")),
  });

  const form = useForm({
    defaultValues: {
      password: "",
      confirmerPassword: "",
    },
    resolver: zodResolver(schema),
  });

  const { handleSubmit, formState, watch } = form;
  const { errors } = formState;

  const password = watch("password");
  const confirmerPassword = watch("confirmerPassword");

  const onSubmit = (data) => {
    if (password !== confirmerPassword) {
      form.setError("confirmerPassword", {
        type: "manual",
        message: t("passwordMismatch"),
      });
      return;
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      password: data.password,
    }));
    nextStep({ formData, password: data.password });
  };

  return (
    <div className="mt-4">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="w-full flex flex-col justify-between gap-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("passwordLabel")}</FormLabel>
                  <FormControl>
                    <Input
                      className="md:w-96 max-w-sm"
                      type="password"
                      placeholder={t("passwordPlaceholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{errors.password?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmerPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("confirmPasswordLabel")}</FormLabel>
                  <FormControl>
                    <Input
                      className="md:w-96 max-w-sm"
                      type="password"
                      placeholder={t("confirmPasswordPlaceholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{errors.confirmerPassword?.message}</FormMessage>
                </FormItem>
              )}
            />

            <button
              type="submit"
              className="rounded-2xl mt-8 py-1 px-6 w-fit text-white font-medium ml-auto bg-sky-700
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
    focus:ring-sky-600"
            >
              {t("submitButton")}
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};

const PasswordForm = ({ setFormData, nextStep, prevStep, formData }) => {
  const t = useTranslations('PasswordForm');

  return (
    <Layout
      title={t("layoutTitle")}
      subtitle={t("layoutSubtitle")}
      fields={<Fields setFormData={setFormData} nextStep={nextStep} formData={formData} />}
      prevStep={prevStep}
    />
  );
};

export default PasswordForm;
