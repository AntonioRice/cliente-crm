import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaUser } from "react-icons/fa";
import { IoMdEye, IoMdEyeOff, IoMdLock } from "react-icons/io";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Error from "../alerts/Error";

const schema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const LoginForm = ({ onSubmit, error, setError }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleInputChange = () => {
    if (error) {
      setError("");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmitForm = (data) => {
    onSubmit(data.username, data.password);
  };

  return (
    <form className="smx-auto max-w-sm flex-grow rounded-xl border border-gray-700 bg-gray-800 p-10 shadow-lg dark:border-gray-700" onSubmit={handleSubmit(onSubmitForm)}>
      <div className="flex flex-col items-center pb-10 text-2xl">
        <h1>{t("login")}</h1>
      </div>
      {error && <Error message={error} />}
      <label className="mb-2 block text-sm font-medium  dark:text-[#cccccc]">{t("username")}</label>
      <div className="relative mb-5">
        <div className="pointer-events-none absolute start-0 top-3 flex items-center ps-3.5">
          <FaUser className="size-4 text-gray-500 dark:text-gray-400" />
        </div>
        <input
          type="text"
          id="username"
          className="block w-full rounded-lg border border-gray-300 p-2.5 ps-10 text-sm text-gray-900 focus:border-green-500 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-green-500 dark:focus:ring-green-500"
          placeholder="*********"
          {...register("username")}
          onChange={handleInputChange}
        />
        {errors.username && <p className="mt-1 text-xs text-red-500">{errors.username.message}</p>}
      </div>
      <label className="mb-2 block text-sm font-medium  dark:text-[#cccccc]">{t("password.password")}</label>
      <div className="relative mb-5">
        <div className="pointer-events-none absolute start-0 top-3 flex items-center ps-3.5">
          <IoMdLock className="size-4.5 text-gray-500 dark:text-gray-400" />
        </div>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          className="block w-full rounded-lg border border-gray-300 p-2.5 ps-10 text-sm text-gray-900 focus:border-green-500 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-green-500 dark:focus:ring-green-500"
          placeholder="*********"
          {...register("password")}
          onChange={handleInputChange}
        />
        <button type="button" onClick={togglePasswordVisibility} className="absolute -top-1 right-0 p-4">
          {showPassword ? <IoMdEye className="size-4 text-gray-500 dark:text-gray-400" /> : <IoMdEyeOff className="size-4 text-gray-500 dark:text-gray-400" />}
        </button>
        {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
      </div>
      <button
        type="submit"
        className="w-full rounded-lg bg-green-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-400 disabled:cursor-not-allowed dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 sm:w-auto"
      >
        {t("login")}
      </button>
      <button className="pt-4 text-xs font-thin text-[#cccccc] underline disabled:cursor-not-allowed">{t("forgot_password")}</button>
    </form>
  );
};

export default LoginForm;
