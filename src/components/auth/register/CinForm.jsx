import Layout from "@/components/auth/Layout"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

const schema = z.object({
    cin: z.string()
        .regex(/^[A-Za-z]{1,2}\d+$/, "Ce numéro de CIN est invalide"),
});

const Fields = ({ setFormData, nextStep }) => {
    const form = useForm({
        defaultValues: {
            cin: "",
        },
        resolver: zodResolver(schema),
    });

    const { handleSubmit, formState } = form;
    const { errors } = formState;

    const onSubmit = (data) => {
        console.log(data);
        setFormData((prevFormData) => ({
            ...prevFormData,
            cin: data.cin,
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
                        name="cin"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Numéro de CIN*</FormLabel>
                                <FormControl>
                                    <Input
                                        className="md:w-96 max-w-sm"
                                        placeholder="N° CIN"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage>{errors.cin?.message}</FormMessage>
                            </FormItem>
                        )}
                    />
                    <button type="submit" className='bg-blue-900 rounded-2xl mt-8 py-1 px-6 w-fit text-white font-medium ml-auto'>Suivant</button>
                </div>
            </form>
        </Form></div>
    );
};

const CinForm = ({ setFormData, nextStep, prevStep }) => {
    return (
        <Layout
            title={"Informations d'activités"}
            subtitle={"Veuillez saisir votre Numéro de CIN"}
            fields={<Fields setFormData={setFormData} nextStep={nextStep} />}
            prevStep={prevStep}
            />
    );
}

export default CinForm;
