import React from "react";

const ChartCard = ({ title }) => {
  return (
    <div className="flex h-52 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      <div className="p-5">
        <h1 className="text-sm">Activity</h1>
        <p className="text-gray-500 text-xs">Week: 52</p>
      </div>
    </div>
  );
};

export default ChartCard;
