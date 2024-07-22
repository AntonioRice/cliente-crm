import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaUser } from "react-icons/fa";
import { IoMdEye, IoMdEyeOff, IoMdLock } from "react-icons/io";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const LoginForm = ({ onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmitForm = (data) => {
    onSubmit(data.username, data.password);
  };

  return (
    <form className="mx-auto max-w-sm" onSubmit={handleSubmit(onSubmitForm)}>
      <div className="flex flex-col items-center py-10 text-xl">
        <h1>{t("login")}</h1>
      </div>
      <label className="mb-2 block text-sm font-medium text-gray-400 dark:text-white">{t("username")}</label>
      <div className="relative mb-5">
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
          <FaUser className="size-4 text-gray-500 dark:text-gray-400" />
        </div>
        <input
          type="text"
          id="username"
          className="block w-full rounded-lg border border-gray-300 p-2.5 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="*********"
          {...register("username")}
        />
        {errors.username && <p className="mt-1 text-xs text-red-500">{errors.username.message}</p>}
      </div>
      <label className="mb-2 block text-sm font-medium text-gray-400 dark:text-white">{t("password.password")}</label>
      <div className="relative mb-5">
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
          <IoMdLock className="size-4.5 text-gray-500 dark:text-gray-400" />
        </div>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          className="block w-full rounded-lg border border-gray-300 p-2.5 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="*********"
          {...register("password")}
        />
        <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 p-4">
          {showPassword ? <IoMdEye className="size-4 text-gray-500 dark:text-gray-400" /> : <IoMdEyeOff className="size-4 text-gray-500 dark:text-gray-400" />}
        </button>
        {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
      </div>
      <button type="submit" className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:cursor-not-allowed dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto">
        {t("login")}
      </button>
    </form>
  );
};

export default LoginForm;
