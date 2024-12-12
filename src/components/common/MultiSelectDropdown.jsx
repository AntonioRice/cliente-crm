import { useState, useRef, useEffect } from "react";
import { CgMathPlus } from "react-icons/cg";
import { useRoomContext, useGuestRegistrationContext } from "../../context";

const MultiSelectDropdown = ({ handleRoomsChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { rooms, fetchRooms } = useRoomContext();
  const { reservationData, setReservationData } = useGuestRegistrationContext();
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
    const currentRoomNumbers = reservationData.room_numbers || [];

    let updatedRoomNumbers;
    if (currentRoomNumbers.includes(room.room_id)) {
      updatedRoomNumbers = currentRoomNumbers.filter((id) => id !== room.room_id);
    } else {
      updatedRoomNumbers = [...currentRoomNumbers, room.room_id];
    }

    setReservationData((prev) => ({
      ...prev,
      room_numbers: updatedRoomNumbers,
    }));

    handleRoomsChange(room.number);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const selectedRoomsText = `${reservationData.room_numbers?.length || 0} Room(s) Selected`;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={toggleDropdown}
        className="flex h-[38px] w-full items-center justify-center rounded-lg border border-gray-300 bg-white p-4 px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-black focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-200 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white  dark:hover:bg-neutral-600"
      >
        <CgMathPlus className="-ml-1 mr-1.5 size-4 text-green-400" />
        {selectedRoomsText}
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-full rounded-lg border opacity-95 shadow dark:border-neutral-600 dark:bg-neutral-700">
          <ul className="grid grid-cols-6 gap-2 p-4 text-sm">
            {rooms.map((room, i) => (
              <li key={i}>
                <div
                  className={`flex items-center justify-center rounded p-2 ${reservationData.room_numbers?.includes(room.room_id) ? "bg-green-500 text-white" : ""} 
                ${room.occupied ? "cursor-not-allowed text-red-500" : "dark:hover:bg-neutral-600"}`}
                  onClick={() => !room.occupied && handleCheckboxChange(room)}
                >
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
