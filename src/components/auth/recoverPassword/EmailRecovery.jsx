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
    FormDescription,
} from "@/components/ui/form";
import { SPRINGBOOT_API_URL } from "@/config";

const Fields = ({ nextStep }) => {
    const t = useTranslations("EmailRecovery");

    const schema = z.object({
        email: z.string().email(t("emailInvalid")),
    });

    const form = useForm({
        defaultValues: {
            email: "",
        },
        resolver: zodResolver(schema),
    });

    const { handleSubmit, formState } = form;
    const { errors } = formState;

    const onSubmit =async (data) => {
        const response = await fetch(SPRINGBOOT_API_URL+'/validator/mail?mail='+data.email);
        if(!response.ok){
            form.setError("email",{
                type: "manual",
                message: "email not existe", // Ensure this translation key is added to your translation files
            });
            return;
        }else{
            nextStep(data.email);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="w-full flex flex-col justify-between gap-4 mt-8">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t("emailLabel")}</FormLabel>
                                <FormControl>
                                    <Input
                                        className="md:w-96 max-w-sm"
                                        placeholder={t("emailPlaceholder")}
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    {t("emailExample")}
                                </FormDescription>
                                <FormMessage>{errors.email?.message}</FormMessage>
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
                        {t("nextButton")}
                    </button>
                </div>
            </form>
        </Form>
    );
};

const EmailRecovery = ({ nextStep }) => {
    const t = useTranslations("EmailRecovery");
    return (
        <Layout
            title={t("emailRecoveryTitle")}
            fields={<Fields nextStep={nextStep} />}
        />
    );
};

export default EmailRecovery;
