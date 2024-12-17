import { useState, useRef, useEffect, useMemo } from "react";
import { CgMathPlus } from "react-icons/cg";
import { useRoomContext, useReservationsContext } from "../../context";
import classNames from "classnames";

const MultiSelectDropdown = ({ handleRoomsChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { rooms, fetchRooms } = useRoomContext();
  const { reservationData, setReservationData, selectedReservation } = useReservationsContext();

  useEffect(() => {
    fetchRooms();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const activeReservation = selectedReservation || reservationData;

  const handleCheckboxChange = (room) => {
    const updatedRoomNumbers = activeReservation.room_numbers.includes(room.room_id) ? activeReservation.room_numbers.filter((id) => id !== room.room_id) : [...activeReservation.room_numbers, room.room_id];

    setReservationData((prev) => ({
      ...prev,
      room_numbers: updatedRoomNumbers,
    }));

    handleRoomsChange(room.number);
  };

  const selectedRoomsText = useMemo(() => {
    return `${activeReservation.room_numbers?.length || 0} Room(s) Selected`;
  }, [activeReservation.room_numbers]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-controls="rooms-dropdown"
        className="flex h-[38px] w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-black focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-200 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:hover:bg-neutral-600"
      >
        <CgMathPlus className="-ml-1 mr-1.5 size-4 text-green-400" />
        {selectedRoomsText}
      </button>
      {isOpen && (
        <div id="rooms-dropdown" className="absolute z-50 mt-2 w-full rounded-lg border bg-white opacity-95 shadow dark:border-neutral-600 dark:bg-neutral-700">
          <ul className="grid grid-cols-6 gap-2 p-4 text-sm">
            {rooms.map((room) => (
              <li key={room.room_id}>
                <div
                  className={classNames("flex cursor-pointer items-center justify-center rounded p-2", {
                    "bg-green-500 text-white": activeReservation.room_numbers.includes(room.room_id),
                    "cursor-not-allowed text-red-500": room.occupied,
                    "hover:bg-gray-100 dark:hover:bg-neutral-600": !room.occupied,
                  })}
                  onClick={() => handleCheckboxChange(room)}
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
