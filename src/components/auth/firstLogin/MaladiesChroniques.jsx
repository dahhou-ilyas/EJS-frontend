"use client"

import * as React from "react"
import Layout from "@/components/auth/Layout"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useTranslations } from "next-intl"

import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const Fields = ({ setFormData, nextStep, formData }) => {
  const t = useTranslations("MaladiesChroniques")

  const maladieJeune = [
    {
      id: "asthme",
      label: t("maladieJeune.asthme"),
    },
    {
      id: "diabete",
      label: t("maladieJeune.diabete"),
    }
  ]

  const FormSchema = z.object({
    maladieJeune: z.array(z.string()).optional(),
    autre: z.string().optional()
  })

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      maladieJeune: [],
      autre: "",
    },
  })

  const onSubmit = (data) => {
    const filteredData = data.maladieJeune.filter((item) =>
      maladieJeune.map((i) => i.id).includes(item)
    )
    setFormData((prevFormData) => ({
      ...prevFormData,
      maladieJeune: [...filteredData, data.autre].filter(Boolean),
    }));
    const test=[...filteredData, data.autre].filter(Boolean);
    console.log(test)
    nextStep()
  }

  return (
    <div className="sm:mt-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="w-full flex flex-col justify-between gap-4">
            <FormField
              control={form.control}
              name="maladieJeune"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">
                      {t("maladieJeune.label")}
                    </FormLabel>
                    <FormDescription>{t("maladieJeune.description")}</FormDescription>
                  </div>
                  {maladieJeune.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="maladieJeune"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                              className="rtl:ml-2"
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="autre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('otherLabel')}</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder={t('otherPlaceholder')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button
              type="submit"
              className="bg-sky-700
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
    focus:ring-sky-600 rounded-2xl mt-8 py-1 px-6 w-fit text-white font-medium ml-auto"
            >
              {t("nextButton")}
            </button>
          </div>
        </form>
      </Form>
    </div>
  )
}

const MaladiesChroniques = ({ setFormData, nextStep, formData }) => {
  const t = useTranslations("MaladiesChroniques")

  return (
    <Layout
      title={t("title")}
      subtitle={t("subtitle")}
      fields={<Fields setFormData={setFormData} nextStep={nextStep} formData={formData} />}
    />
  )
}

export default MaladiesChroniques
