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
import { SPRINGBOOT_API_URL } from "@/config";

const Fields = ({ setFormData, nextStep }) => {
    const t = useTranslations('CneForm');

    const schema = z.object({
        cne: z.string()
            .regex(/^\d+$/, {
                message: t('cneInvalid'),
            }),
    });

    const form = useForm({
        defaultValues: {
            cne: "",
        },
        resolver: zodResolver(schema),
    });

    const { handleSubmit, formState } = form;
    const { errors } = formState;

    // const onSubmit = (data) => {
    //     setFormData((prevFormData) => ({
    //         ...prevFormData,
    //         cne: data.cne,
    //     }));
    //     nextStep();
    // };
    const onSubmit = async (data) => {
        try {
            // Fetch validation from backend
            const response = await fetch(`${SPRINGBOOT_API_URL}/validator/cne?cne=${data.cne}`);
    
            if (!response.ok) {
                form.setError('cne', {
                    type: 'manual',
                    message: t("cneErrorExist"), // Make sure to add this translation key to your translation files
                });
                return;
            } else {
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    cne: data.cne,
                }));
                nextStep();
            }
        } catch (error) {
            // Handle unexpected errors
            form.setError('cne', {
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
                        name="cne"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t("cneLabel")}</FormLabel>
                                <FormControl>
                                    <Input
                                        className="md:w-96 max-w-sm"
                                        placeholder={t("cnePlaceholder")}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage>{errors.cne?.message}</FormMessage>
                            </FormItem>
                        )}
                    />
                    <button type="submit" className='bg-sky-700
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
    focus:ring-sky-600 rounded-2xl mt-8 py-1 px-6 w-fit text-white font-medium ml-auto'>{t("submitButton")}</button>
                </div>
            </form>
        </Form>
      </div>
    );
};

const CneForm = ({ setFormData, nextStep, prevStep }) => {
    const t = useTranslations('CneForm');

    return (
        <Layout
            title={t("layoutTitle")}
            subtitle={t("layoutSubtitle")}
            fields={<Fields setFormData={setFormData} nextStep={nextStep} />}
            prevStep={prevStep}
        />
    );
}

export default CneForm;
