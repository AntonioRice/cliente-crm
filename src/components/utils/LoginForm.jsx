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
    <form className="max-w-sm mx-auto" onSubmit={handleSubmit(onSubmitForm)}>
      <div className="flex flex-col items-center py-10 text-xl">
        <h1>{t("login")}</h1>
      </div>
      <label className="block mb-2 text-sm font-medium text-gray-400 dark:text-white">{t("username")}</label>
      <div className="relative mb-5">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          <FaUser className="text-gray-500 size-4 dark:text-gray-400" />
        </div>
        <input
          type="text"
          id="username"
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="*********"
          {...register("username")}
        />
        {errors.username && <p className="mt-1 text-xs text-red-500">{errors.username.message}</p>}
      </div>
      <label className="block mb-2 text-sm font-medium text-gray-400 dark:text-white">{t("password.password")}</label>
      <div className="relative mb-5">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          <IoMdLock className="size-4.5 text-gray-500 dark:text-gray-400" />
        </div>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="*********"
          {...register("password")}
        />
        <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 p-4">
          {showPassword ? (
            <IoMdEye className="text-gray-500 size-4 dark:text-gray-400" />
          ) : (
            <IoMdEyeOff className="text-gray-500 size-4 dark:text-gray-400" />
          )}
        </button>
        {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
      </div>
      <button
        type="submit"
        className="disabled:cursor-not-allowed text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {t("login")}
      </button>
    </form>
  );
};

export default LoginForm;
