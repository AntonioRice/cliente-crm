import { useState, useRef, useEffect } from "react";
import { CgMathPlus } from "react-icons/cg";
import { useReservationsContext } from "../../context";

const MultiSelectDropdown = ({ onRoomSelectionChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedRooms, setSelectedRooms } = useReservationsContext();
  const dropdownRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleCheckboxChange = (room) => {
    const newSelectedRooms = [...selectedRooms];
    const roomIndex = newSelectedRooms.indexOf(room);

    if (roomIndex === -1) {
      newSelectedRooms.push(room);
    } else {
      newSelectedRooms.splice(roomIndex, 1);
    }

    setSelectedRooms(newSelectedRooms);
    onRoomSelectionChange(room);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const selectedRoomsText = selectedRooms.length > 0 ? `${selectedRooms.length} Room(s) Selected` : "Select Room(s)";

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={toggleDropdown}
        className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg min-h-12 focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        <CgMathPlus className="-ml-1 mr-1.5 size-4 text-green-400" />
        {selectedRoomsText}
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 rounded-lg shadow dark:bg-gray-700">
          <ul className="grid grid-cols-6 gap-2 p-2 text-sm">
            {Array.from({ length: 26 }, (_, i) => i + 1).map((room, i) => (
              <li key={i}>
                <div
                  className="flex items-center justify-center rounded-lg dark:hover:bg-gray-600"
                  onClick={() => handleCheckboxChange(room)}
                >
                  <input
                    id={`checkbox-${room}`}
                    type="checkbox"
                    value={room}
                    checked={selectedRooms.includes(room)}
                    readOnly
                  />
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
