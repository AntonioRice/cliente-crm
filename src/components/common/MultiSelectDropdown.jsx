import { useState, useRef, useEffect } from "react";
import { CgMathPlus } from "react-icons/cg";
import { useRoomContext } from "../../context";

const MultiSelectDropdown = ({ handleRoomsChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { rooms, fetchRooms } = useRoomContext();

  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleCheckboxChange = (room) => {
    if (selectedRooms.includes(room.room_id)) {
      setSelectedRooms(selectedRooms.filter((id) => id !== room.room_id));
    } else {
      setSelectedRooms([...selectedRooms, room.room_id]);
    }

    const updatedRoom = { ...room, occupied: !room.occupied };
    handleRoomsChange(updatedRoom.number);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const selectedRoomsText = `${selectedRooms.length} Room(s) Selected`;

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
          <ul className="grid grid-cols-6 gap-2 p-1 text-sm">
            {rooms.map((room, i) => (
              <li key={i}>
                <div className={`flex items-center justify-center rounded-lg p-2 ${selectedRooms.includes(room.room_id) ? "bg-green-500 text-white" : ""} ${room.occupied ? "cursor-not-allowed text-red-500" : "dark:hover:bg-gray-600"}`} onClick={() => !room.occupied && handleCheckboxChange(room)}>
                  <label className="text-sm">{room.number}</label>
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
