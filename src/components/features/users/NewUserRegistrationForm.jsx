import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { FaUser } from "react-icons/fa";
import { countries } from "../../../utils/standardData";
import { formatPhoneNumber } from "../../../utils/standardMethods";
import { PasswordInput } from "../../../components";
import { userRegistrationSchema } from "../../utils/Schemas";

const NewUserRegistrationForm = ({ setFormState, handleRegistration }) => {
  const { t } = useTranslation();
  const queryParams = new URLSearchParams(location.search);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[5]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userRegistrationSchema),
    defaultValues: {
      first_name: queryParams.get("first_name") || "",
      last_name: queryParams.get("last_name") || "",
      email: queryParams.get("email") || "",
      country_code: selectedCountry.code,
      language: "en",
      display_mode: "dark",
    },
  });

  const onSubmit = async (data) => {
    const formattedForm = {
      ...data,
      phone_number: `${data.country_code}-${formatPhoneNumber(data.phone_number)}`,
      preferences: {
        language: data.language,
        display_mode: data.display_mode,
      },
    };

    handleRegistration(formattedForm);
  };

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setValue("country_code", country.code);
    setDropdownOpen(false);
  };

  return (
    <form className="mx-auto max-w-lg flex-grow rounded-xl border border-gray-700 bg-gray-800 p-10 shadow-lg dark:border-gray-700" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center py-5 text-xl">
        <h1>{t("complete_user_registration")}</h1>
      </div>
      <div className="flex gap-3">
        <div className="w-1/2">
          <label className="mb-2 block text-sm font-medium text-gray-400 dark:text-white">{t("first_name")}</label>
          <div className="relative mb-5">
            <div className="pointer-events-none absolute start-0 top-3 flex items-center ps-3.5">
              <FaUser className="size-4 text-gray-500 dark:text-gray-400" />
            </div>
            <input
              type="text"
              id="first_name"
              className="block w-full rounded-lg border border-gray-300 p-2.5 ps-10 text-sm text-gray-900 focus:border-green-500 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-green-500 dark:focus:ring-green-500"
              placeholder="First Name"
              {...register("first_name")}
            />
            {errors.first_name && <p className="mt-2 text-sm text-red-500">{errors.first_name.message}</p>}
          </div>
        </div>
        <div className="w-1/2">
          <label className="mb-2 block text-sm font-medium text-gray-400 dark:text-white">{t("last_name")}</label>
          <div className="relative mb-5">
            <div className="pointer-events-none absolute start-0 top-3 flex items-center ps-3.5">
              <FaUser className="size-4 text-gray-500 dark:text-gray-400" />
            </div>
            <input
              type="text"
              id="last_name"
              className="block w-full rounded-lg border border-gray-300 p-2.5 ps-10 text-sm text-gray-900 focus:border-green-500 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-green-500 dark:focus:ring-green-500"
              placeholder="Last Name"
              {...register("last_name")}
            />
            {errors.last_name && <p className="mt-2 text-sm text-red-500">{errors.last_name.message}</p>}
          </div>
        </div>
      </div>
      <label className="mb-2 block text-sm font-medium text-gray-400 dark:text-white">{t("email")}</label>
      <div className="relative mb-5">
        <div className="pointer-events-none absolute start-0 top-3 flex items-center ps-3.5">
          <FaUser className="size-4 text-gray-500 dark:text-gray-400" />
        </div>
        <input
          type="email"
          id="email"
          className="block w-full rounded-lg border border-gray-300 p-2.5 ps-10 text-sm text-gray-900 focus:border-green-500 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-green-500 dark:focus:ring-green-500"
          placeholder="Email Address"
          {...register("email")}
        />
        {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>}
      </div>
      <div className="flex gap-3">
        <div className="w-1/2">
          <label className="mb-2 block text-sm font-medium text-gray-400 dark:text-white">{t("country_code")}</label>
          <div className="relative">
            <button
              type="button"
              className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <p className="inline-flex gap-2">
                {selectedCountry.flag} {selectedCountry.name} ({selectedCountry.code})
              </p>
              <svg className="ms-2.5 size-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute z-10 mt-2 max-h-56 w-full overflow-hidden rounded-lg bg-white py-2 shadow-lg dark:bg-gray-700">
                <div className="overflow-auto rounded-lg ">
                  <div className="max-h-52 rounded-lg">
                    <ul className="py-1">
                      {countries.map((country) => (
                        <li key={country.code}>
                          <button type="button" className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => handleCountryChange(country)}>
                            <div className="inline-flex items-center">
                              {country.flag}
                              <span className="ml-1">
                                {country.name} ({country.code})
                              </span>
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-1/2">
          <label className="mb-2 block text-sm font-medium text-gray-400 dark:text-white">{t("phone_number")}</label>
          <div className="relative mb-5">
            <div className="pointer-events-none absolute start-0 top-3 flex items-center ps-3.5">
              <FaUser className="size-4 text-gray-500 dark:text-gray-400" />
            </div>
            <input
              id="phone_number"
              type="tel"
              placeholder="(---) --- ----"
              className="block w-full rounded-lg border border-gray-300 p-2.5 ps-10 text-sm text-gray-900 focus:border-green-500 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-green-500 dark:focus:ring-green-500"
              {...register("phone_number")}
            />
            {errors.phone_number && <p className="mt-1 text-xs text-red-500">{errors.phone_number.message}</p>}
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <div className="w-1/2">
          <label className="mb-2 block text-sm font-medium text-gray-400 dark:text-white">{t("language")}</label>
          <div className="mb-6 items-center">
            <label className="inline-flex cursor-pointer items-center">
              <input type="checkbox" id="language" className="peer sr-only" {...register("language")} />
              <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all peer-checked:bg-blue-600 peer-checked:after:translate-x-full dark:border-gray-600 dark:bg-gray-700 rtl:peer-checked:after:-translate-x-full"></div>
              <span className="ms-3 text-xs font-medium text-gray-400">EN / ES</span>
            </label>
          </div>
        </div>
        <div className="w-1/2">
          <label className="mb-2 block text-sm font-medium text-gray-400 dark:text-white">{t("display_mode")}</label>
          <div className="mb-6 items-center">
            <label className="inline-flex cursor-pointer items-center">
              <input type="checkbox" id="display_mode" className="peer sr-only" {...register("display_mode")} />
              <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px]  after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all peer-checked:bg-blue-600 peer-checked:after:translate-x-full dark:border-gray-600 dark:bg-gray-700 rtl:peer-checked:after:-translate-x-full"></div>
              <span className="ms-3 text-xs font-medium text-gray-400">
                {t("light")} / {t("dark")}
              </span>
            </label>
          </div>
        </div>
      </div>
      <PasswordInput label={t("password.new_password")} id="newPassword" register={register} error={errors.newPassword} placeholder="*********" />
      <PasswordInput label={t("password.re_enter_password")} id="confirmPassword" register={register} error={errors.confirmPassword} placeholder="*********" />
      <button type="submit" className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:cursor-not-allowed dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto">
        {t("register")}
      </button>
    </form>
  );
};

export default NewUserRegistrationForm;
