import { useNavigate } from "react-router-dom";
import { useGuestContext } from "../../context";

const AddButton = ({ path }) => {
  const navigate = useNavigate();
  const { setSelectedGuest } = useGuestContext();

  const handleButtonClick = () => {
    setSelectedGuest(null);
    navigate(path);
  };

  return (
    <button
      onClick={handleButtonClick}
      className="flex size-9 items-center justify-center rounded-xl border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-black dark:border-neutral-600 dark:bg-neutral-700 dark:text-gray-400 dark:hover:bg-neutral-600 dark:hover:text-white"
    >
      <svg className="size-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
      </svg>
    </button>
  );
};

export default AddButton;
