import React from "react";

const Pill = ({ text }) => {
  return (
    <span className="inline-flex items-center px-3 py-1 mb-1 me-2 text-sm font-medium bg-gray-100 rounded dark:bg-gray-700 dark:text-gray-300">
      {text}
      <button
        type="button"
        className="inline-flex items-center p-1 ms-3 text-sm text-gray-400 
        bg-transparent rounded-sm hover:bg-gray-200
      hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-gray-300"
        aria-label="Remove"
      >
        <svg className="size-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </span>
  );
};

export default Pill;
