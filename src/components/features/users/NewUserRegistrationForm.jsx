import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuthContext } from "../../../context";
import { FaUser } from "react-icons/fa";
import { IoMdEye, IoMdEyeOff, IoMdLock } from "react-icons/io";
import { countries } from "../../../utils/standardData";
import { formatPhoneNumber } from "../../../utils/standardMethods";

const NewUserRegistrationForm = ({ onComplete }) => {
  const { t } = useTranslation();
  const { completeRegistration } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries()[5]);
  const [formData, setFormData] = useState({
    password: "",
    first_name: "",
    last_name: "",
    email: "",
    country_code: selectedCountry.code,
    phone_number: "",
    language: "en",
    display_mode: "dark",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => {
      if (id === "language") {
        return { ...prevData, [id]: prevData.language === "en" ? "es" : "en" };
      }

      if (id === "display_mode") {
        return { ...prevData, [id]: prevData.display_mode === "light" ? "dark" : "light" };
      }

      if (id === "phone_number") {
        return { ...prevData, [id]: formatPhoneNumber(value) };
      }

      return { ...prevData, [id]: value };
    });
  };

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setFormData((prevData) => ({ ...prevData, country_code: country.code }));
    setDropdownOpen(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    const formattedForm = {
      password: formData.password,
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      phone_number: `${formData.country_code}-${formData.phone_number}`,
      preferences: {
        language: formData.language,
        display_mode: formData.display_mode,
      },
    };

    try {
      await completeRegistration(formattedForm);
    } catch (error) {
      console.error(error);
    }

    e.preventDefault();
    onComplete();
  };

  return (
    <form className="mx-auto max-w-lg flex-grow rounded-xl border border-gray-700 bg-gray-800 p-10 shadow-lg dark:border-gray-700" onSubmit={handleSubmit}>
      <div className="flex flex-col items-center py-10 text-xl">
        <h1>{t("new_user_registration")}</h1>
      </div>
      <label className="mb-2 block text-sm font-medium text-gray-400 dark:text-white">{t("first_name")}</label>
      <div className="relative mb-5">
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
          <FaUser className="size-4 text-gray-500 dark:text-gray-400" />
        </div>
        <input
          type="text"
          id="first_name"
          className="block w-full rounded-lg border border-gray-300 p-2.5 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleInputChange}
        />
      </div>
      <label className="mb-2 block text-sm font-medium text-gray-400 dark:text-white">{t("last_name")}</label>
      <div className="relative mb-5">
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
          <FaUser className="size-4 text-gray-500 dark:text-gray-400" />
        </div>
        <input
          type="text"
          id="last_name"
          className="block w-full rounded-lg border border-gray-300 p-2.5 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleInputChange}
        />
      </div>
      <label className="mb-2 block text-sm font-medium text-gray-400 dark:text-white">{t("email")}</label>
      <div className="relative mb-5">
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
          <FaUser className="size-4 text-gray-500 dark:text-gray-400" />
        </div>
        <input
          type="email"
          id="email"
          className="block w-full rounded-lg border border-gray-300 p-2.5 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleInputChange}
        />
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
                      {countries().map((country) => (
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
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
              <FaUser className="size-4 text-gray-500 dark:text-gray-400" />
            </div>
            <input
              id="phone_number"
              type="tel"
              placeholder="(---) --- ----"
              className="block w-full rounded-lg border border-gray-300 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              value={formData.phone_number}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <div className="w-1/2">
          <label className="mb-2 block text-sm font-medium text-gray-400 dark:text-white">{t("language")}</label>
          <div className="mb-6 items-center">
            <label className="inline-flex cursor-pointer items-center">
              <input type="checkbox" id="language" className="peer sr-only" checked={formData.language?.toLowerCase() === "es"} onChange={handleInputChange} />
              <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all peer-checked:bg-blue-600 peer-checked:after:translate-x-full dark:border-gray-600 dark:bg-gray-700 rtl:peer-checked:after:-translate-x-full"></div>
              <span className="ms-3 text-xs font-medium text-gray-400">EN / ES</span>
            </label>
          </div>
        </div>
        <div className="w-1/2">
          <label className="mb-2 block text-sm font-medium text-gray-400 dark:text-white">{t("display_mode")}</label>
          <div className="mb-6 items-center">
            <label className="inline-flex cursor-pointer items-center">
              <input type="checkbox" id="display_mode" className="peer sr-only" checked={formData.display_mode?.toLowerCase() === "dark"} onChange={handleInputChange} />
              <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px]  after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all peer-checked:bg-blue-600 peer-checked:after:translate-x-full dark:border-gray-600 dark:bg-gray-700 rtl:peer-checked:after:-translate-x-full"></div>
              <span className="ms-3 text-xs font-medium text-gray-400">
                {t("light")} / {t("dark")}
              </span>
            </label>
          </div>
        </div>
      </div>
      <label className="mb-2 block text-sm font-medium text-gray-400 dark:text-white">{t("password.new_password")}</label>
      <div className="relative mb-5">
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
          <IoMdLock className="size-4.5 text-gray-500 dark:text-gray-400" />
        </div>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          className="block w-full rounded-lg border border-gray-300 p-2.5 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="*********"
          value={formData.password}
          onChange={handleInputChange}
        />
        <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 p-4">
          {showPassword ? <IoMdEye className="size-4 text-gray-500 dark:text-gray-400" /> : <IoMdEyeOff className="size-4 text-gray-500 dark:text-gray-400" />}
        </button>
      </div>
      <button
        type="submit"
        disabled={!formData.password.length}
        className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:cursor-not-allowed dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
      >
        {t("register")}
      </button>
    </form>
  );
};

export default NewUserRegistrationForm;
