import { useNavigate } from "react-router-dom";
import { useGuestContext } from "../context";

const AddClientButton = () => {
  const navigate = useNavigate();
  const { setSelectedGuest } = useGuestContext();

  const toggleNewGuestForm = () => {
    setSelectedGuest(null);
    navigate("/guests/register");
  };

  return (
    <button
      onClick={toggleNewGuestForm}
      className="flex items-center justify-center border border-gray-200 size-10 rounded-xl bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600 dark:border-gray-700 dark:hover:text-green-400"
    >
      <svg className="size-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
      </svg>
    </button>
  );
};

export default AddClientButton;
