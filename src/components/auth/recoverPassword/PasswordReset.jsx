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

const Fields = ({ nextStep }) => {
  const t = useTranslations("PasswordReset");

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

  const { handleSubmit, formState, watch, setError } = form;
  const { errors } = formState;

  const password = watch("password");
  const confirmerPassword = watch("confirmerPassword");

  const onSubmit = (data) => {
    if (password !== confirmerPassword) {
      setError("confirmerPassword", {
        type: "manual",
        message: t("passwordMismatch"),
      });
      return;
    }

    console.log(data);
    nextStep(data.password);
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
                  <FormLabel>{t("confirmLabel")}</FormLabel>
                  <FormControl>
                    <Input
                      className="md:w-96 max-w-sm"
                      type="password"
                      placeholder={t("confirmPlaceholder")}
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

const PasswordReset = ({ nextStep }) => {
  const t = useTranslations("PasswordReset");
  return (
    <Layout
      title={t("passwordResetTitle")}
      subtitle={t("passwordResetSubtitle")}
      fields={<Fields nextStep={nextStep} />}
    />
  );
};

export default PasswordReset;
