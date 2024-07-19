import Layout from "@/components/auth/Layout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const schema = z.object({
  medecinESJ: z.string().nonempty("Veuillez indiquer si vous êtes médecin au sein d'un centre ESJ"),
  medecinGeneraliste: z.string().nonempty("Veuillez indiquer si vous êtes un médecin généraliste"),
  specialite: z.string().optional(),
  autre: z.string().optional(),
});

const Fields = ({ setFormData, nextStep, formData }) => {
  const form = useForm({
    defaultValues: {
      medecinESJ: "",
      medecinGeneraliste: "",
      specialite: "",
      autre: "",
    },
    resolver: zodResolver(schema),
  });

  const { handleSubmit, control, formState: { errors }, watch } = form;
  const generalisteValue = watch("medecinGeneraliste");

  const onSubmit = (data) => {
    if (data.medecinGeneraliste === "non") {
      if (!data.specialite && !data.autre) {
        form.setError("specialite", {
          type: "manual",
          message: "Veuillez sélectionner votre spécialité ou indiquer autre",
        });
        return;
      } else if (!data.specialite && data.autre) {
        data.specialite = data.autre; // Assign data.autre to data.specialite if specialite is not selected
      }
    }
  
    // Update form data and move to next step
    setFormData((prevFormData) => ({
      ...prevFormData,
      medecinESJ: data.medecinESJ,
      medecinGeneraliste: data.medecinGeneraliste,
      specialite: data.specialite || "", // Ensure specialite is set, fallback to empty string
    }));
    console.log(data.specialite)
    
    console.log(formData); // Verify formData update
    nextStep(); // Move to the next step
    console.log(data.specialite)
  };
  

  return (
    <div className="sm:mt-8">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="w-full flex flex-col justify-between gap-4">
            <FormField
              control={control}
              name="medecinESJ"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Médecin au sein d'un centre ESJ?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="oui" />
                        </FormControl>
                        <FormLabel className="font-normal">OUI</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="non" />
                        </FormControl>
                        <FormLabel className="font-normal">NON</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage>{errors.medecinESJ?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="medecinGeneraliste"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Médecin Généraliste</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="oui" />
                        </FormControl>
                        <FormLabel className="font-normal">OUI</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="non" />
                        </FormControl>
                        <FormLabel className="font-normal">NON</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage>{errors.medecinGeneraliste?.message}</FormMessage>
                </FormItem>
              )}
            />

            {generalisteValue === "non" && (
              <>
                <FormField
                  control={control}
                  name="specialite"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Spécialité</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Pédiatre" />
                            </FormControl>
                            <FormLabel className="font-normal">Pédiatre</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Psychiatre" />
                            </FormControl>
                            <FormLabel className="font-normal">Psychiatre</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Gynécologue" />
                            </FormControl>
                            <FormLabel className="font-normal">Gynécologue</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Dermatologue" />
                            </FormControl>
                            <FormLabel className="font-normal">Dermatologue</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Ophtalmologue" />
                            </FormControl>
                            <FormLabel className="font-normal">Ophtalmologue</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage>{errors.specialite?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="autre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Autre :</FormLabel>
                      <FormControl>
                        <Input placeholder="Veuillez indiquez votre spécialité" {...field} />
                      </FormControl>
                      <FormMessage>{errors.autre?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </>
            )}

            <button type="submit" className="bg-blue-900 rounded-2xl mt-8 py-1 px-6 w-fit text-white font-medium ml-auto">
              Suivant
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};

const InformationsMedecin = ({ setFormData, prevStep, nextStep, formData }) => {
  return (
    <Layout
      title={"Informations d'activités"}
      fields={<Fields setFormData={setFormData} nextStep={nextStep} formData={formData}/>}
      prevStep={prevStep}
    />
  );
};

export default InformationsMedecin;
