import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from "react-icons/md";
import { IoTrendingUpOutline, IoTrendingDownOutline } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";

const ChartCard = ({ title, week, value, description, handlePrevWeek, handleNextWeek, delta }) => {
  let bgColor = "bg-gray-800";
  let TrendingIcon;

  if (parseFloat(delta) > 0) {
    TrendingIcon = IoTrendingUpOutline;
    bgColor = "bg-green-400";
  } else if (parseFloat(delta) < 0) {
    TrendingIcon = IoTrendingDownOutline;
    bgColor = "bg-red-400";
  } else {
    TrendingIcon = FaArrowRightLong;
  }

  return (
    <div className={`rounded-xl border border-gray-200 p-6 text-white opacity-80 dark:border-gray-700 ${bgColor} flex flex-col justify-between`}>
      <div>
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-xs">Week: {week}</p>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="flex flex-col items-start justify-center">
          <p className="text-6xl font-bold">{value}</p>
          <p className="mt-2 text-xs">{description}</p>
        </div>
        <div className="flex items-center justify-center">
          <TrendingIcon size={150} />
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <button onClick={handlePrevWeek} className="hover:text-white">
          <MdOutlineArrowBackIosNew />
        </button>
        <button onClick={handleNextWeek} className="hover:text-white">
          <MdOutlineArrowForwardIos />
        </button>
      </div>
    </div>
  );
};

export default ChartCard;
