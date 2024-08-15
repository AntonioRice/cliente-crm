import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Alert from "./Alert";
import AnimatedPage from "./AnimatedPage";
import { PasswordInput } from "../../components";
import { passwordSchema } from "./Schemas";

const ResetPasswordForm = ({ onSubmit, error }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(passwordSchema),
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
              <li>is longer than 8 characters</li>
              <li>Does not match or significantly contain your username</li>
            </ul>
          </div>
          {error && <Alert message={error} type="error" />}
          <PasswordInput label={t("password.new_password")} id="newPassword" register={register} error={errors.newPassword} placeholder="*********" />
          <PasswordInput label={t("password.re_enter_password")} id="confirmPassword" register={register} error={errors.confirmPassword} placeholder="*********" />
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
