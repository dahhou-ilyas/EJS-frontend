import * as React from "react"
import Layout from "@/components/auth/Layout"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { addYears, isBefore, isAfter, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

const schema = z.object({
  dateNaissance: z.date()
  .refine(
    (date) => isBefore(date, addYears(new Date(), -10)) && isAfter(date, addYears(new Date(), -30)),
    "Vous devez avoir entre 10 et 30 ans" 
  )
  ,
  genre: z.string().nonempty("Veuillez sélectionner votre genre"),
});

const Fields = ({ setFormData, nextStep }) => {
  const form = useForm({
    defaultValues: {
      dateNaissance: null,
      genre: "",
    },
    resolver: zodResolver(schema),
  });

  const { handleSubmit, control, formState: { errors } } = form;

  const onSubmit = (data) => {
    console.log(data);
    setFormData((prevFormData) => ({
      ...prevFormData,
      dateNaissance: data.dateNaissance,
      genre: data.genre,
    }));
    nextStep();
  };

  return (
    <div className="sm:mt-8">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="w-full flex flex-col justify-between gap-4">
            
            <FormField
              control={control}
              name="dateNaissance"
              render={({ field }) => (
                <FormItem className="flex flex-col ">
                  <FormLabel>Date de Naissance</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "md:w-96 max-w-sm pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Date de Naissance</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage>{errors.dateNaissance?.message}</FormMessage>
                </FormItem>
              )}
            />
            <div className="md:w-96 max-w-sm">
            <FormField
              control={control}
              name="genre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Genre</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger >
                        <SelectValue placeholder="Genre" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Femme">Féminin</SelectItem>
                      <SelectItem value="Homme">Masculin</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage>{errors.genre?.message}</FormMessage>
                </FormItem>
              )}
            /></div>
            <button type="submit" className='bg-blue-900 rounded-2xl mt-8 py-1 px-6 w-fit text-white font-medium ml-auto'> Suivant </button>
          </div>
        </form>
      </Form>
    </div>
  );
};

const BirthDateForm = ({ setFormData, nextStep, prevStep }) => {
  return ( 
    <Layout 
      title={"Informations générales"} 
      subtitle={"Saisissez votre date de naissance et votre genre. Remarquez que vous devez être âgé entre 10 et 30 ans pour avoir accès à e-ESJ."} 
      fields={<Fields setFormData={setFormData} nextStep={nextStep} />}  
      prevStep={prevStep}
    />
  );
}

export default BirthDateForm;
