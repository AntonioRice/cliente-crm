import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IoMdEye, IoMdEyeOff, IoMdLock } from "react-icons/io";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Alert from "./Alert";
import AnimatedPage from "./AnimatedPage";

const schema = z
  .object({
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

const ResetPasswordForm = ({ onSubmit, error }) => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmitForm = (data) => {
    onSubmit(data.newPassword);
  };

  return (
    <AnimatedPage>
      <div className="flex min-h-screen items-center justify-center">
        <form className="mx-auto max-w-md flex-grow rounded-xl border border-gray-700 bg-gray-800 p-10 shadow-lg dark:border-gray-700" onSubmit={handleSubmit(onSubmitForm)}>
          <div className="flex flex-col items-center text-2xl">
            <h1>{t("password.change_password")}</h1>
          </div>
          <div className="pb-10 pt-5 text-xs">
            <p className="mb-2">In order to protect your account, make sure your password:</p>
            <ul>
              <li>is longer than 6 characters</li>
              <li>Does not match or significantly contain your username</li>
            </ul>
          </div>
          {error && <Alert message={error} type="error" />}

          <label className="mb-2 block text-sm font-medium dark:text-[#cccccc]">{t("password.new_password")}</label>
          <div className="relative mb-5">
            <div className="pointer-events-none absolute start-0 top-3 flex items-center ps-3.5">
              <IoMdLock className="size-4.5 text-gray-500 dark:text-gray-400" />
            </div>
            <input
              type={showNewPassword ? "text" : "password"}
              id="newPassword"
              className="block w-full rounded-lg border border-gray-300 p-2.5 ps-10 text-sm text-gray-900 focus:border-green-500 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-green-500 dark:focus:ring-green-500"
              placeholder="*********"
              {...register("newPassword")}
            />
            <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute -top-1 right-0 p-4">
              {showNewPassword ? <IoMdEye className="size-4 text-gray-500 dark:text-gray-400" /> : <IoMdEyeOff className="size-4 text-gray-500 dark:text-gray-400" />}
            </button>
            {errors.newPassword && <p className="mt-1 text-xs text-red-500">{errors.newPassword.message}</p>}
          </div>
          <label className="mb-2 block text-sm font-medium dark:text-[#cccccc]">{t("password.re_enter_password")}</label>
          <div className="relative mb-5">
            <div className="pointer-events-none absolute start-0 top-3 flex items-center ps-3.5">
              <IoMdLock className="size-4.5 text-gray-500 dark:text-gray-400" />
            </div>
            <input
              type={showConfirmedPassword ? "text" : "password"}
              id="confirmPassword"
              className="block w-full rounded-lg border border-gray-300 p-2.5 ps-10 text-sm text-gray-900 focus:border-green-500 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-green-500 dark:focus:ring-green-500"
              placeholder="*********"
              {...register("confirmPassword")}
            />
            <button type="button" onClick={() => setShowConfirmedPassword(!showConfirmedPassword)} className="absolute -top-1 right-0 p-4">
              {showConfirmedPassword ? <IoMdEye className="size-4 text-gray-500 dark:text-gray-400" /> : <IoMdEyeOff className="size-4 text-gray-500 dark:text-gray-400" />}
            </button>
            {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>}
          </div>
          <div className="pt-4">
            <button
              type="submit"
              className="w-full rounded-lg bg-green-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-400 disabled:cursor-not-allowed dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 sm:w-auto"
            >
              {t("password.change_password")}
            </button>
          </div>
          <button onClick={() => navigate("/login")} className="pt-4 text-xs font-thin text-[#cccccc] underline disabled:cursor-not-allowed">
            {t("cancel")}
          </button>
        </form>
      </div>
    </AnimatedPage>
  );
};

export default ResetPasswordForm;
