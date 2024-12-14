import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from "react-icons/md";
import { IoTrendingUpOutline, IoTrendingDownOutline } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ChartCard = ({ title, week, value, description, handlePrevWeek, handleNextWeek, delta }) => {
  let bgColor = "dark:bg-[#282828]";
  let TrendingIcon;

  if (parseFloat(delta) > 0) {
    TrendingIcon = IoTrendingUpOutline;
    bgColor = "green";
  } else if (parseFloat(delta) < 0) {
    TrendingIcon = IoTrendingDownOutline;
    bgColor = "red";
  } else {
    TrendingIcon = FaArrowRightLong;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Week: {week}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mt-4 grid grid-cols-2 gap-2 text-white">
          <div className="flex flex-col items-start justify-center">
            <p className="text-8xl font-bold ">{value}</p>
            <div className="mt-2 inline-flex space-x-1 text-xs">
              <p className={`text-${bgColor}-500`}>{delta}</p>
              <p>{description}</p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <TrendingIcon size={140} color={bgColor} />
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
      </CardContent>
    </Card>
  );
};

export default ChartCard;
