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

const Fields = ({ setFormData, nextStep }) => {
    const t = useTranslations('CodeMassarForm');

    const schema = z.object({
        codeMassar: z.string()
            .regex(/^[A-Za-z]{1}\d+$/, {
                message: t('codeMassarInvalid'),
            }),
    });

    const form = useForm({
        defaultValues: {
            codeMassar: "",
        },
        resolver: zodResolver(schema),
    });

    const { handleSubmit, formState } = form;
    const { errors } = formState;

    const onSubmit = (data) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            codeMassar: data.codeMassar,
        }));

        nextStep();
    };

    return (
      <div className="mt-4">
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="w-full flex flex-col justify-between gap-4">
                    <FormField
                        control={form.control}
                        name="codeMassar"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t("codeMassarLabel")}</FormLabel>
                                <FormControl>
                                    <Input
                                        className="md:w-96 max-w-sm"
                                        placeholder={t("codeMassarPlaceholder")}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage>{errors.codeMassar?.message}</FormMessage>
                            </FormItem>
                        )}
                    />
                    <button type="submit" className='bg-blue-900 rounded-2xl mt-8 py-1 px-6 w-fit text-white font-medium ml-auto'>{t("submitButton")}</button>
                </div>
            </form>
        </Form></div>
    );
};

const CodeMassarForm = ({ setFormData, nextStep, prevStep }) => {
    const t = useTranslations('CodeMassarForm');

    return (
        <Layout
            title={t("layoutTitle")}
            subtitle={t("layoutSubtitle")}
            fields={<Fields setFormData={setFormData} nextStep={nextStep} />}
            prevStep={prevStep}
        />
    );
}

export default CodeMassarForm;
