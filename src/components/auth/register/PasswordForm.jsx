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

const schema = z.object({
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .max(16, "Le mot de passe ne peut pas dépasser 16 caractères")
    .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une lettre majuscule")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Le mot de passe doit contenir au moins un caractère spécial"),
  confirmerPassword: z.string()
    .min(1, "Veuillez confirmer votre mot de passe"),
    
});

const Fields = ({ setFormData, nextStep, formData, buttonColor }) => {
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
        message: "Les mots de passe ne correspondent pas",
      });
      return;
    }

    console.log(data);
    setFormData((prevFormData) => ({
      ...prevFormData,
      password: data.password,
    }));
    nextStep(formData);
  };
  const bgClasses = {
    green: 'bg-[#018A90]',
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
                  <FormLabel>Mot De Passe*</FormLabel>
                  <FormControl>
                    <Input
                      className="md:w-96 max-w-sm"
                      type="password"
                      placeholder="Mot De Passe"
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
                  <FormLabel>Confirmer*</FormLabel>
                  <FormControl>
                    <Input
                      className="md:w-96 max-w-sm"
                      type="password"
                      placeholder="Confirmer Mot De Passe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{errors.confirmerPassword?.message}</FormMessage>
                </FormItem>
              )}
            />

            <button
              type="submit"
              className={`rounded-2xl mt-8 py-1 px-6 w-fit text-white font-medium ml-auto ${bgClasses[buttonColor] || 'bg-blue-900'}`}
            >
              Valider
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};

const PasswordForm = ({ setFormData, nextStep, prevStep, formData, buttonColor, bgColor }) => {
  return (
    <Layout
      title={"Mot de passe sécurisé"}
      subtitle={
        "Créez un mot de passe sécurisé avec des lettres, des chiffres et des symboles."
      }
      fields={<Fields setFormData={setFormData} nextStep={nextStep} formData={formData} buttonColor={buttonColor}/>}
      prevStep={prevStep}
      bgColor={bgColor}
    />
  );
};

export default PasswordForm;
