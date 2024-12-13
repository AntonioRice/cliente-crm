import { useNavigate } from "react-router-dom";
import { useGuestContext } from "../../context";

const AddButtonLarge = ({ title, path }) => {
  const navigate = useNavigate();
  const { setSelectedGuest } = useGuestContext();

  const handleButtonClick = () => {
    setSelectedGuest(null);
    navigate(path);
  };

  return (
    <button onClick={handleButtonClick} className="h-24 w-full rounded-xl border border-gray-300 bg-white p-4 text-gray-500 hover:bg-gray-100 hover:text-black dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:hover:bg-neutral-600">
      <div className="flex items-center justify-between">
        <span className="text-base font-semibold">{title}</span>
        <svg className="size-5 text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
        </svg>
      </div>
    </button>
  );
};

export default AddButtonLarge;
