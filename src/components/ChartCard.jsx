import React from "react";
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from "react-icons/md";

const ChartCard = ({ title, week, value, description, bgColor, handlePrevWeek, handleNextWeek }) => {
  return (
    <div
      className={`text-black rounded-xl border border-gray-200 dark:border-gray-700 p-6 opacity-80 ${bgColor} flex flex-col justify-between`}
    >
      <div>
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-xs">Week: {week}</p>
        <p className="text-6xl font-bold mt-4">{value}</p>
        <p className="text-xs mt-2">{description}</p>
      </div>
      <div className="flex justify-between mt-4">
        <button onClick={handlePrevWeek} className="w-full hover:text-white">
          <MdOutlineArrowBackIosNew className="float-start" />
        </button>
        <button onClick={handleNextWeek} className="w-full hover:text-white">
          <MdOutlineArrowForwardIos className="float-right" />
        </button>
      </div>
    </div>
  );
};

export default ChartCard;
