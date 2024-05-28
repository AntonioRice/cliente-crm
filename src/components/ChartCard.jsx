import React from "react";

const ChartCard = ({ title }) => {
  return (
    <div className="flex items-center justify-center h-24 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      <p className="text-2xl text-gray-400 dark:text-gray-500">
        <svg
          className="w-3.5 h-3.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 18"
        >
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
        </svg>
      </p>
    </div>
  );
};

export default ChartCard;
