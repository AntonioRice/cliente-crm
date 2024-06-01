import React from "react";
import PropTypes from "prop-types";

const AddClientToggleButton = ({ toggleAddClientModal }) => {
  return (
    <button
      onClick={toggleAddClientModal}
      className="flex items-center justify-center size-10 rounded-xl bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-700 dark:hover:text-white"
    >
      <svg className="size-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
      </svg>
    </button>
  );
};

AddClientToggleButton.propTypes = {
  toggleAddClientModal: PropTypes.func.isRequired,
};

export default AddClientToggleButton;
