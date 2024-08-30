import Layout from "@/components/auth/Layout"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useTranslations } from 'next-intl'

import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from "@/components/ui/form"

const Fields = ({ nextStep }) => {
    const t = useTranslations("VerifyToken");

    // Schema moved inside Fields component
    const schema = z.object({
        token: z.string().refine(value => /^[a-zA-Z0-9]{6}$/.test(value), {
            message: t('tokenInvalid'),
        }),
    });

    const form = useForm({
        defaultValues: {
            token: "",
        },
        resolver: zodResolver(schema),
    });

    const { handleSubmit, formState } = form;
    const { errors } = formState;

    const onSubmit = (data) => {
        console.log(data.token);
        nextStep(data.token);
    };

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="w-full flex flex-col justify-between gap-4">
                    <FormField
                        control={form.control}
                        name="token"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('codeSecret')}</FormLabel>
                                <FormControl>
                                    <Input
                                        className="md:w-96 max-w-sm"
                                        placeholder={t('codePlaceholder')}
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    {t('codeExample')}
                                </FormDescription>
                                <FormMessage>{errors.token?.message}</FormMessage>
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
                        {t('nextButton')}
                    </button>
                </div>
            </form>
        </Form>
    );
};

const VerifyToken = ({ nextStep }) => {
    const t = useTranslations("VerifyToken");
    return (
        <Layout
            title={t('title')}
            subtitle={t('subtitle')}
            fields={<Fields nextStep={nextStep} />}
        />
    );
}

export default VerifyToken;
