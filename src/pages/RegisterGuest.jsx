import React from "react";
import NewClientForm from "../components/NewClientForm";
import AnimatedPage from "../components/AnimatedPage";
import { IoIosSearch } from "react-icons/io";

const RegisterGuest = () => {
  return (
    <AnimatedPage>
      <div className="flex flex-col">
        <div className="flex justify-between items-center pb-4">
          <h1 className="font-semibold text-2xl">Add Guest</h1>
          <div className="relative">
            <div className="absolute inset-y-0 flex items-center pl-3 pointer-events-none">
              <IoIosSearch size={20} />
            </div>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Search Guests"
              required=""
            />
          </div>
        </div>
        <div className="flex-grow overflow-y-auto">
          <NewClientForm />
        </div>
        <div className="fixed bottom-0 left-0 right-0 flex justify-end p-4 border-t border-gray-200 dark:border-gray-600 space-x-2 bg-[#111827]">
          <button
            // onClick={toggleAddClientModal}
            className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none rounded-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button className="disabled:pointer-events-none disabled:bg-green-800 text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-800 dark:hover:bg-green-700 dark:focus:ring-green-800">
            Submit
          </button>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default RegisterGuest;
