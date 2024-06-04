import React, { useState } from "react";
import { CgMathPlus } from "react-icons/cg";

const MultiSelectDropdown = ({ roomList, onRoomSelectionChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState([]);

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
    console.log(room);
    onRoomSelectionChange(newSelectedRooms);
  };

  const selectedRoomsText = selectedRooms.length > 0 ? `${selectedRooms.length} room(s) selected` : "Select Room(s)";

  return (
    <div className="relative">
      <button
        type="button"
        onClick={toggleDropdown}
        className="w-full min-h-12 flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white
         rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 
         focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600
         dark:hover:text-white dark:hover:bg-gray-700"
      >
        <CgMathPlus className="-ml-1 mr-1.5 size-4" />
        {selectedRoomsText}
      </button>

      {isOpen && (
        <ul>
          <div className="absolute z-50 mt-2 w-full rounded-lg shadow dark:bg-gray-700">
            <ul className="grid grid-cols-6 gap-2 p-2 text-sm">
              {Array.from({ length: 26 }, (_, i) => i + 1).map((room, i) => (
                <li key={i}>
                  <div
                    className="flex justify-center items-center dark:hover:bg-gray-600 rounded-lg"
                    onClick={() => handleCheckboxChange(room)}
                  >
                    <input
                      id={`checkbox-${room}`}
                      type="checkbox"
                      value={room}
                      checked={selectedRooms.includes(room)}
                    />
                    <label className="p-1 text-sm">{room}</label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </ul>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
