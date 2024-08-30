import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Layout from "@/components/auth/Layout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addYears, getYear, getMonth, isBefore, isAfter } from "date-fns";
import { useTranslations } from "next-intl";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";



const range = (start, end, step) => {
  let years = [];
  for (let i = start; i <= end; i += step) {
    years.push(i);
  }
  return years;
};

const Fields = ({ setFormData, nextStep }) => {
  const t = useTranslations("BirthDateForm");
  const dir = document.documentElement.dir;
  
  const schema = z.object({
    dateNaissance: z.date().nullable().refine(
      (date) => date !== null,
      {
        message: t("dateNaissanceErrorRequired"),
      }
    ).refine(
      (date) => date && isBefore(date, addYears(new Date(), -10)) && isAfter(date, addYears(new Date(), -30)),
      {
        message: t("dateNaissanceErrorInvalid"),
      }
    ),
    genre: z.string().nonempty({
      message: t("genreErrorRequired"),
    }),
  });
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
    console.log(data.dateNaissance)
    nextStep();
  };

  const years = range(getYear(new Date())-30, getYear(new Date()) + 1, 1);
  const months = [
    t("month1"),
    t("month2"),
    t("month3"),
    t("month4"),
    t("month5"),
    t("month6"),
    t("month7"),
    t("month8"),
    t("month9"),
    t("month10"),
    t("month11"),
    t("month12"),
  ];
  
  return (
    <div className="sm:mt-8">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="w-full flex flex-col justify-between gap-4">
            <div className="md:w-96 max-w-sm">
              <FormField
                control={control}
                name="dateNaissance"
                render={({ field }) => (
                  <FormItem className="flex flex-col z-50">
                    <FormLabel>{t("dateNaissanceLabel")}*</FormLabel>
                    <FormControl>
                      <DatePicker
                        showIcon
                        icon={
                          <svg
                            className='mt-[2.5px]'
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 48 48"
                            
                          >
                            <mask id="ipSApplication0">
                              <g fill="none" stroke="#fff" strokeLinejoin="round" strokeWidth="4">
                                <path strokeLinecap="round" d="M40.04 22v20h-32V22"></path>
                                <path
                                  fill="#fff"
                                  d="M5.842 13.777C4.312 17.737 7.263 22 11.51 22c3.314 0 6.019-2.686 6.019-6a6 6 0 0 0 6 6h1.018a6 6 0 0 0 6-6c0 3.314 2.706 6 6.02 6c4.248 0 7.201-4.265 5.67-8.228L39.234 6H8.845l-3.003 7.777Z"
                                ></path>
                              </g>
                            </mask>
                            <path
                              fill="currentColor"
                              d="M0 0h48v48H0z"
                              mask="url(#ipSApplication0)"
                            ></path>
                          </svg>
                        }
                        renderCustomHeader={({
                          date,
                          changeYear,
                          changeMonth,
                          decreaseMonth,
                          increaseMonth,
                          prevMonthButtonDisabled,
                          nextMonthButtonDisabled,
                        }) => (
                          <div
                            style={{
                              margin: 10,
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <button className="ltr:mr-4 rtl:ml-4" onClick={decreaseMonth} disabled={prevMonthButtonDisabled}> 
                              {"< "}
                            </button>
                            <select
                              value={getYear(date)}
                              onChange={({ target: { value } }) => changeYear(value)}
                              className='mx-2 border border-black rounded-md'
                            >
                              {years.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>

                            <select
                              value={months[getMonth(date)]}
                              onChange={({ target: { value } }) =>
                                changeMonth(months.indexOf(value))
                              }
                              className='border border-black rounded-md'
                            >
                              {months.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>

                            <button className="ltr:ml-4 rtl:mr-4" onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                              {" >"}
                            </button>
                          </div>
                        )}
                        selected={field.value}
                        onChange={field.onChange}
                        dateFormat="dd/MM/yyyy"
                        placeholderText={t("dateNaissancePlaceholder")}
                        className="w-full px-3 py-2 border rounded-md ml-1 rtl:mr-5"
                        maxDate={addYears(new Date(), -10)}
                        minDate={addYears(new Date(), -30)}
                      />
                    </FormControl>
                    <FormMessage>{errors.dateNaissance?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <div className="md:w-96 max-w-sm">
            <FormField
                control={control}
                name="genre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("genreLabel")}*</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} dir={dir}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t("genrePlaceholder")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="FEMININ">{t("genreFeminine")}</SelectItem>
                        <SelectItem value="MASCULIN">{t("genreMasculine")}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage>{errors.genre?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </div>
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

const BirthDateForm = ({ setFormData, nextStep, prevStep }) => {
  const t = useTranslations("BirthDateForm");

  return (
    <Layout
      title={t("title")}
      subtitle={t("subtitle")}
      fields={<Fields setFormData={setFormData} nextStep={nextStep} />}
      prevStep={prevStep}
    />
  );
};

export default BirthDateForm;
