import React from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { useRoomContext } from "../../../context";
import { useTranslation } from "react-i18next";

const RoomsChart = ({ rooms }) => {
  const { t } = useTranslation();
  const { setSelectedRoom } = useRoomContext();
  const navigate = useNavigate();

  const handleRoomSelection = (room) => {
    setSelectedRoom(room);
    navigate(`/room/${room.room_id}`);
  };

  return (
    <div className="flex flex-col overflow-hidden rounded-xl bg-gray-50 dark:bg-[#282828] md:col-span-2 xl:col-span-1">
      <div className="p-4">
        <h1 className="text-sm text-white">{t("rooms")}</h1>
        <p className="text-xs text-gray-500">Total: {rooms.length}</p>
      </div>
      <div className="scrollbar-hidden flex-1 overflow-auto">
        <table className="w-full text-left text-xs text-gray-500 dark:text-gray-400">
          <thead className="sticky top-0 bg-gray-50 uppercase dark:bg-neutral-700 dark:text-gray-400">
            <tr>
              <th className="px-2 py-2 sm:px-4 md:px-6">Room</th>
              <th className="px-2 py-2 sm:px-4 md:px-6">Name</th>
              <th className="px-2 py-2 sm:px-4 md:px-6">Status</th>
              <th className="px-2 py-2 sm:px-4 md:px-6">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.number} className="border-t first:border-t-0 last:border-b-0 hover:bg-neutral-700 hover:text-white dark:border-neutral-600" onClick={() => handleRoomSelection(room)}>
                <td className="px-2 py-4 sm:px-4 md:px-6">{room.number}</td>
                <td className="px-2 py-4 sm:px-4 md:px-6">{room.name}</td>
                <td className={`px-2 py-4 sm:px-4 md:px-6 ${room.occupied ? "text-red-500" : ""}`}>{room.occupied ? "Occupied" : "Available"}</td>
                <td className="px-2 py-4 text-right sm:px-4 md:px-6">
                  <button className="font-medium">
                    <IoIosArrowForward />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoomsChart;
