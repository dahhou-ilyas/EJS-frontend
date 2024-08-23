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

    const onSubmit = (data) => {
        console.log(data.email);
        nextStep(data.email);
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
                    <button type="submit" className="rounded-2xl mt-8 py-1 px-6 w-fit text-white font-medium ml-auto bg-blue-900">
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
