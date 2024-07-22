import { useState, useRef, useEffect } from "react";
import { CgMathPlus } from "react-icons/cg";
import { useGuestRegistrationContext } from "../../context";

const MultiSelectDropdown = ({ handleRoomsChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { reservationData } = useGuestRegistrationContext();
  const dropdownRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleCheckboxChange = (room) => {
    handleRoomsChange(room);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const selectedRoomsText = reservationData.room_numbers.length > 0 ? `${reservationData.room_numbers.length} Room(s) Selected` : "Select Room(s)";

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={toggleDropdown}
        className="hover:text-primary-700 flex min-h-12 w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
      >
        <CgMathPlus className="-ml-1 mr-1.5 size-4 text-green-400" />
        {selectedRoomsText}
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-4 w-full rounded-lg border border-gray-400 shadow dark:bg-gray-700">
          <ul className="grid grid-cols-6 gap-2 p-2 text-sm">
            {Array.from({ length: 26 }, (_, i) => i + 1).map((room, i) => (
              <li key={i}>
                <div className="flex items-center justify-center rounded-lg dark:hover:bg-gray-600" onClick={() => handleCheckboxChange(room)}>
                  <input id={`checkbox-${room}`} type="checkbox" value={room} checked={reservationData.room_numbers.includes(room)} readOnly />
                  <label className="p-1 text-sm">{room}</label>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
