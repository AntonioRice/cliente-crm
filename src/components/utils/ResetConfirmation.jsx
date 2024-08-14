import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ResetConfirmation = ({ userEmail }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="mx-auto max-w-md flex-grow rounded-xl border border-gray-700 bg-gray-800 p-10 shadow-lg dark:border-gray-700">
      <div className="flex flex-col items-center ">
        <h1 className="text-2xl">{t("password.reset_success_header")}</h1>
      </div>
      <div className="pb-4 pt-5 text-xs">
        <p className="mb-2">
          {t("password.reset_success_text")} {userEmail}
        </p>
      </div>

      <div className="pt-4">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="w-full rounded-lg bg-green-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-400 disabled:cursor-not-allowed dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 sm:w-auto"
        >
          {t("password.back_to_login")}
        </button>
      </div>
    </div>
  );
};

export default ResetConfirmation;
