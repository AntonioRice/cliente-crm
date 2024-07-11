import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaUser } from "react-icons/fa";
import { IoMdEye, IoMdEyeOff, IoMdLock } from "react-icons/io";
import getDataUtil from "../utils/dataUtil";

const NewUserRegistrationForm = ({ onSubmit }) => {
  const { t } = useTranslation();
  const { countries } = getDataUtil();
  const [showPassword, setShowPassword] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[5]);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
    country_code: "",
    phone_number: "",
    language: "en",
    display_mode: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => {
      if (id === "language") {
        return { ...prevData, [id]: prevData.language === "en" ? "es" : "en" };
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const formatPhoneNumber = (input) => {
    input = input.replace(/\D/g, "");

    if (input.length > 10) {
      input = input.slice(0, 10);
    }

    let formatted = "";
    if (input.length > 0) {
      formatted = `(${input.slice(0, 3)}`;
    }
    if (input.length > 3) {
      formatted += `) ${input.slice(3, 6)}`;
    }
    if (input.length > 6) {
      formatted += `-${input.slice(6, 10)}`;
    }

    return formatted;
  };

  return (
    <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
      <div className="flex flex-col items-center py-10 text-xl">
        <h1>{t("new_user_registration")}</h1>
      </div>

      <label className="block mb-2 text-sm font-medium text-gray-400 dark:text-white">{t("first_name")}</label>
      <div className="relative mb-5">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          <FaUser className="text-gray-500 size-4 dark:text-gray-400" />
        </div>
        <input
          type="text"
          id="first_name"
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleInputChange}
        />
      </div>

      <label className="block mb-2 text-sm font-medium text-gray-400 dark:text-white">{t("last_name")}</label>
      <div className="relative mb-5">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          <FaUser className="text-gray-500 size-4 dark:text-gray-400" />
        </div>
        <input
          type="text"
          id="last_name"
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleInputChange}
        />
      </div>

      <label className="block mb-2 text-sm font-medium text-gray-400 dark:text-white">{t("email")}</label>
      <div className="relative mb-5">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          <FaUser className="text-gray-500 size-4 dark:text-gray-400" />
        </div>
        <input
          type="email"
          id="email"
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>

      <div className="flex gap-3">
        <div className="w-1/2">
          <label className="block mb-2 text-sm font-medium text-gray-400 dark:text-white">{t("country_code")}</label>
          <div className="relative">
            <button
              type="button"
              className="flex items-center justify-between border border-gray-300 text-gray-900 bg-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {selectedCountry ? (
                <p className="inline-flex gap-2">
                  {selectedCountry.flag} {selectedCountry.name} ({selectedCountry.code})
                </p>
              ) : (
                <p className="flex justify-center w-full font-normal text-gray-400">Select a Country</p>
              )}
              <svg
                className="size-2 ms-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute z-10 w-full py-2 mt-2 overflow-hidden bg-white rounded-lg shadow-lg max-h-56 dark:bg-gray-700">
                <div className="overflow-auto rounded-lg ">
                  <div className="rounded-lg max-h-52">
                    <ul className="py-1">
                      {countries.map((country) => (
                        <li key={country.code}>
                          <button
                            type="button"
                            className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={() => handleCountryChange(country)}
                          >
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
          <label className="block mb-2 text-sm font-medium text-gray-400 dark:text-white">{t("phone_number")}</label>
          <div className="relative mb-5">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
              <FaUser className="text-gray-500 size-4 dark:text-gray-400" />
            </div>
            <input
              id="phone_number"
              type="tel"
              placeholder="(---) --- ----"
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={formData.phone_number}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      <label className="block mb-2 text-sm font-medium text-gray-400 dark:text-white">{t("language")}</label>
      <div className="items-center mb-6">
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            id="language"
            className="sr-only peer"
            checked={formData.language?.toLowerCase() === "es"}
            onChange={handleInputChange}
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="text-xs font-medium text-gray-400 ms-3">EN / ES</span>
        </label>
      </div>

      <label className="block mb-2 text-sm font-medium text-gray-400 dark:text-white">
        {t("password.new_password")}
      </label>
      <div className="relative mb-5">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          <IoMdLock className="size-4.5 text-gray-500 dark:text-gray-400" />
        </div>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="*********"
          value={formData.password}
          onChange={handleInputChange}
        />
        <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 p-4">
          {showPassword ? (
            <IoMdEye className="text-gray-500 size-4 dark:text-gray-400" />
          ) : (
            <IoMdEyeOff className="text-gray-500 size-4 dark:text-gray-400" />
          )}
        </button>
      </div>

      <button
        type="submit"
        disabled={!formData.username.length || !formData.password.length}
        className="disabled:cursor-not-allowed text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {t("register")}
      </button>
    </form>
  );
};

export default NewUserRegistrationForm;
