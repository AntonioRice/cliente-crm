import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const DisplayCard = ({ title, data, path }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <button onClick={handleButtonClick} className={`w-full rounded-xl p-4 shadow-lg dark:bg-[#282828] ${path ? "dark:hover:bg-neutral-600" : "cursor-auto"}`}>
      <div className="flex items-center justify-between">
        <div className="w-full items-center text-left">
          <h1 className="py-2 text-sm text-white">{title}</h1>
          <p className="text-md">{data}</p>
        </div>
        {path && <IoIosArrowForward size={25} className="text-green-500" />}
      </div>
    </button>
  );
};

export default DisplayCard;
