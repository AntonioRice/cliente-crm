import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const AddClientButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/guests/register")}
      className="flex items-center justify-center size-10 rounded-xl bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-700 dark:hover:text-white"
    >
      <svg className="size-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
      </svg>
    </button>
  );
};

AddClientButton.propTypes = {
  toggleAddClientModal: PropTypes.func.isRequired,
};

export default AddClientButton;
