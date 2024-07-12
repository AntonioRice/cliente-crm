import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGuestContext } from "../context";
import { AnimatedPage, NewGuestForm, SearchBar } from "../components";
import { CgMathMinus, CgMathPlus } from "react-icons/cg";

const RegisterGuest = () => {
  const navigate = useNavigate();
  const { selectedGuest, clearGuests } = useGuestContext();
  const [showNewGuestForm, setShowNewGuestForm] = useState(false);
  const { t } = useTranslation();
  const submitRef = useRef();

  useEffect(() => {
    if (selectedGuest) {
      setShowNewGuestForm(true);
    }
  }, [selectedGuest]);

  const toggleGuestForm = () => {
    clearGuests();
    setShowNewGuestForm(!showNewGuestForm);
  };

  const handleSubmit = () => {
    if (submitRef.current) {
      submitRef.current.click();
    }
  };

  return (
    <AnimatedPage>
      <div className="flex flex-col">
        <div className="inline-flex justify-between p-5">
          <div>
            <h1 className="text-2xl font-semibold">{t("registration")}</h1>
          </div>
          <div className="w-full md:w-1/2">
            <SearchBar />
          </div>
          <div className="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
            <div className="flex items-center w-full space-x-3 md:w-auto">
              <button
                type="button"
                onClick={toggleGuestForm}
                className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg md:w-auto focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                {showNewGuestForm ? (
                  <CgMathMinus className="-ml-1 mr-1.5 size-4 text-green-400" />
                ) : (
                  <CgMathPlus className="-ml-1 mr-1.5 size-4 text-green-400" />
                )}
                {showNewGuestForm ? t("clear_form") : t("new_guest")}
              </button>
            </div>
          </div>
        </div>
        <div className="flex-grow">{showNewGuestForm && <NewGuestForm submitRef={submitRef} />}</div>
        <div className="fixed bottom-0 left-0 right-0 flex justify-end p-4 border-t border-gray-200 dark:border-gray-600 space-x-2 bg-[#111827] z-40">
          <button
            onClick={() => navigate("/guests")}
            className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none rounded-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-600"
          >
            {t("cancel")}
          </button>
          <button
            onClick={handleSubmit}
            className="text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-800 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {t("submit")}
          </button>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default RegisterGuest;
