import React from "react";
import PropTypes from "prop-types";
import NewClientForm from "./NewClientForm";

const AddClientModal = ({ show, toggleAddClientModal }) => {
  if (!show) return null;

  return (
    <div className="flex overflow-x-hidden fixed inset-0 z-50 justify-center">
      <div className="p-4 w-full max-w-7xl h-auto">
        <div className="rounded-xl shadow-full dark:bg-gray-800 overflow-hidden border-gray-600 border">
          <div className="flex items-center justify-between p-4 border-b dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Add Guest</h3>
            <button
              type="button"
              onClick={toggleAddClientModal}
              className="text-gray-400 rounded-lg p-1 dark:hover:bg-gray-600 dark:hover:text-white border-gray-600 border"
            >
              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-auto h-[75vh] overflow-y-auto p-4">
            <NewClientForm />
          </div>
          <div className="flex justify-end p-4 border-t border-gray-200 dark:border-gray-600 space-x-2">
            <button
              onClick={toggleAddClientModal}
              className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none rounded-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button className="disabled:pointer-events-none disabled:bg-green-800 text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-800 dark:hover:bg-green-700 dark:focus:ring-green-800">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

AddClientModal.propTypes = {
  show: PropTypes.bool.isRequired,
  toggleAddClientModal: PropTypes.func.isRequired,
};

export default AddClientModal;
