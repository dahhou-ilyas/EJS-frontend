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

const Fields = ({ setFormData, nextStep, medecin }) => {
    const t = useTranslations('InformationsActivites');
    
    const schema = z.object({
        cin: z.string()
            .min(1, t('errors.cin.required'))
            .regex(/^[A-Za-z]{1,2}\d+$/, t('errors.cin.invalid')),
        inpe: z.string().optional(),
    });

    const form = useForm({
        defaultValues: {
            cin: "",
            inpe: "",
   
        },
        resolver: zodResolver(schema),
    });

    const { handleSubmit, formState } = form;
    const { errors } = formState;

    // const onSubmit = (data) => {
    //     if (data.inpe && !/^\d+$/.test(data.inpe)) {
    //         form.setError("inpe", {
    //             type: "manual",
    //             message: t('errors.inpe.invalid'),
    //         });
    //         return;
    //     }
    //     if (medecin && !data.inpe) {
    //         form.setError("inpe", {
    //             type: "manual",
    //             message: t('errors.inpe.required'),
    //         });
    //         return;
    //     }
    //     setFormData((prevFormData) => ({
    //         ...prevFormData,
    //         cin: data.cin,
    //         inpe: data.inpe || "",
    //     }));

    //     nextStep();
    // };
    const onSubmit = async (data) => {
        try {
            if (data.inpe && !/^\d+$/.test(data.inpe)) {
                form.setError("inpe", {
                    type: "manual",
                    message: t('errors.inpe.invalid'),
                });
                return;
            }
            if (medecin && !data.inpe) {
                form.setError("inpe", {
                    type: "manual",
                    message: t('errors.inpe.required'),
                });
                return;
            }

            if (data.cin) {
                const response = await fetch(`${SPRINGBOOT_API_URL}/validator/cin?cin=${data.cin}`);
                
                if (!response.ok) {
                    form.setError("cin", {
                        type: "manual",
                        message: t("cinErrorExist"), // Ensure this translation key is added to your translation files
                    });
                    return;
                }
            }
    
            // Fetch validation from backend
            if (data.inpe) {
                const response = await fetch(`${SPRINGBOOT_API_URL}/validator/inpe?inpe=${data.inpe}`);
                
                if (!response.ok) {
                    form.setError("inpe", {
                        type: "manual",
                        message: t("inpeErrorExist"), // Ensure this translation key is added to your translation files
                    });
                    return;
                }
            }
    
            setFormData((prevFormData) => ({
                ...prevFormData,
                cin: data.cin,
                inpe: data.inpe || "",
            }));
    
            nextStep();
        } catch (error) {
            // Handle unexpected errors
            form.setError("inpe", {
                type: "manual",
                message: "Erreur: " + error.message,
            });
        }
    };
    
    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="w-full flex flex-col justify-between gap-4">
                    <FormField
                        control={form.control}
                        name="cin"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('labels.cin')}</FormLabel>
                                <FormControl>
                                    <Input
                                        className="md:w-96 max-w-sm"
                                        placeholder={t('placeholders.cin')}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage>{errors.cin?.message}</FormMessage>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="inpe"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('labels.inpe')}{medecin && '*'}</FormLabel>
                                <FormControl>
                                    <Input
                                        className="md:w-96 max-w-sm"
                                        placeholder={t('placeholders.inpe')}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage>{errors.inpe?.message}</FormMessage>
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
                        {t('buttons.next')}
                    </button>
                </div>
            </form>
        </Form>
    );
};

const InformationsActivites = ({ setFormData, nextStep, prevStep, medecin }) => {
    const t = useTranslations('InformationsActivites');

    return ( 
        <Layout 
            title={t('title')} 
            subtitle={t('subtitle')} 
            fields={<Fields setFormData={setFormData} nextStep={nextStep} medecin={medecin} />}
            prevStep={prevStep}
        />
    );
};

export default InformationsActivites;
