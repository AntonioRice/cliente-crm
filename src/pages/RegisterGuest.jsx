import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import NewGuestForm from "../components/NewGuestForm";
import AnimatedPage from "../components/AnimatedPage";
import SearchBar from "../components/SearchBar";
import { CgMathMinus, CgMathPlus } from "react-icons/cg";
import { useGuest } from "../context/GuestProvider";

const RegisterGuest = () => {
  const navigate = useNavigate();
  const { selectedGuest, clearGuests } = useGuest();
  const [showNewGuestForm, setShowNewGuestForm] = useState(false);
  const submitRef = useRef();

  useEffect(() => {
    if (selectedGuest) {
      setShowNewGuestForm(true);
    }
  }, [selectedGuest]);

  const toggleGuestForm = () => {
    if (showNewGuestForm) {
      clearGuests();
    }
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
        <div className="p-5 inline-flex justify-between">
          <div>
            <h1 className="font-semibold text-2xl">Registration</h1>
          </div>
          <div className="w-full md:w-1/2">
            <SearchBar />
          </div>
          <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
            <div className="flex items-center space-x-3 w-full md:w-auto">
              <button
                type="button"
                onClick={toggleGuestForm}
                className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                {showNewGuestForm ? (
                  <CgMathMinus className="-ml-1 mr-1.5 size-4" />
                ) : (
                  <CgMathPlus className="-ml-1 mr-1.5 size-4" />
                )}
                {showNewGuestForm ? "Clear Form" : "New Guest"}
              </button>
            </div>
          </div>
        </div>
        <div className="flex-grow">{showNewGuestForm && <NewGuestForm submitRef={submitRef} />}</div>
        <div className="fixed bottom-0 left-0 right-0 flex justify-end p-4 border-t border-gray-200 dark:border-gray-600 space-x-2 bg-[#111827] z-50">
          <button
            onClick={() => navigate("/guests")}
            className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none rounded-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-800 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Submit
          </button>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default RegisterGuest;
