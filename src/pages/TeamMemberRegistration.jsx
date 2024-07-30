import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AnimatedPage, LoadingComponent } from "../components";
import { CgMathMinus } from "react-icons/cg";
import { useState } from "react";

const TeamMemberRegistration = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {};
  const resetForm = () => {};
  const handleCancel = () => {
    navigate(-1);
  };

  if (loading) return <LoadingComponent />;

  return (
    <AnimatedPage>
      <div className="flex flex-col pt-4">
        <div className="mb-4">
          <h1 className="text-2xl font-semibold">{t("team_member_registration")}</h1>
        </div>
        <div className="mb-4 flex-grow px-4">{/* <NewTeamMemberForm /> */}</div>
        <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-end space-x-2 border-t border-gray-200 bg-[#111827] p-4 dark:border-gray-600">
          <button
            onClick={handleCancel}
            className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-700"
          >
            {t("cancel")}
          </button>
          <button onClick={handleSubmit} className="rounded-lg bg-green-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-green-800 dark:hover:bg-green-700 dark:focus:ring-green-800">
            {t("submit")}
          </button>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default TeamMemberRegistration;
