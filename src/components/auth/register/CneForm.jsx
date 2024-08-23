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

    const onSubmit = (data) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            cne: data.cne,
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
                    <button type="submit" className='bg-blue-900 rounded-2xl mt-8 py-1 px-6 w-fit text-white font-medium ml-auto'>{t("submitButton")}</button>
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
