import Alert from "./Alert";
import AnimatedPage from "./AnimatedPage";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MdEmail } from "react-icons/md";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailSchema } from "./Schemas";

const ForgotPasswordForm = ({ onSubmit, error }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(emailSchema),
  });

  const handleForgotPasswordSubmit = (data) => {
    onSubmit(data.email);
  };

  return (
    <AnimatedPage>
      <div className="flex min-h-screen items-center justify-center">
        <form className="mx-auto max-w-md flex-grow rounded-xl border border-gray-700 bg-gray-800 p-10 shadow-lg dark:border-gray-700" onSubmit={handleSubmit(handleForgotPasswordSubmit)}>
          <div className="flex flex-col items-center text-2xl">
            <h1>{t("password.forgot_password")}</h1>
          </div>
          <div className="pb-4 pt-5 text-xs">
            <p className="mb-2">{t("password.password_reset_text")}</p>
          </div>
          {error && <Alert message={error} type="error" />}
          <label className="mb-2 block text-sm font-medium dark:text-[#cccccc]">{t("email")}</label>
          <div className="relative mb-5">
            <div className="pointer-events-none absolute start-0 top-3 flex items-center ps-3.5">
              <MdEmail className="size-4.5 text-gray-500 dark:text-gray-400" />
            </div>
            <input
              type="email"
              id="email"
              className="block w-full rounded-lg border border-gray-300 p-2.5 ps-10 text-sm text-gray-900 focus:border-green-500 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-green-500 dark:focus:ring-green-500"
              placeholder="Your Email Address"
              {...register("email")}
            />

            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
          </div>
          <div className="pt-5">
            <button
              type="submit"
              className="w-full rounded-lg bg-green-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-400 disabled:cursor-not-allowed dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 sm:w-auto"
            >
              {t("password.reset_password")}
            </button>
          </div>
          <button onClick={() => navigate("/")} className="pt-4 text-xs font-thin text-[#cccccc] underline disabled:cursor-not-allowed">
            {t("cancel")}
          </button>
        </form>
      </div>
    </AnimatedPage>
  );
};

export default ForgotPasswordForm;
