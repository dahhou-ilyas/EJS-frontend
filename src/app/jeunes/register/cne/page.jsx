"use client"
import Layout from "@/components/auth/register/Layout"
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
    cne: z.string()
        .regex(/^\d+$/, "Le numéro de CNE invalid"),
});

const Fields = () => {
    const form = useForm({
        defaultValues: {
            cne: "",
        },
        resolver: zodResolver(schema),
    });

    const { handleSubmit, formState } = form;
    const { errors } = formState;

    const onSubmit = (data) => {
        console.log(data);
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
                                <FormLabel>Numéro de CNE*</FormLabel>
                                <FormControl>
                                    <Input
                                        className="md:w-96 max-w-sm"
                                        placeholder="N° CNE"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage>{errors.cne?.message}</FormMessage>
                            </FormItem>
                        )}
                    />
                    <button type="submit" className='bg-blue-900 rounded-2xl mt-8 py-1 px-6 w-fit text-white font-medium ml-auto'>Suivant</button>
                </div>
            </form>
        </Form></div>
    );
};

const Cne = () => {
    return (
        <Layout
            title={"Informations d'activités"}
            subtitle={"Saisissez votre CNE (Code National de l'Etudiant)"}
            fields={<Fields />}
        />
    );
}

export default Cne;
