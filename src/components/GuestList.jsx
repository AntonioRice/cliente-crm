import React from "react";
import { useNavigate } from "react-router-dom";
import { useGuest } from "../context/GuestProvider";
import { IoIosArrowForward } from "react-icons/io";
import StatusIndicator from "./StatusIndicator";

const GuestsList = ({ guests }) => {
  const navigate = useNavigate();
  const { setSelectedGuest } = useGuest();

  const handleRowClick = (guest) => {
    setSelectedGuest(guest);
    navigate(`/guests/details/${guest.guest_id}`);
  };

  return (
    <tbody>
      {guests.map((guest, i) => (
        <tr
          key={i}
          onClick={() => handleRowClick(guest)}
          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
        >
          <th className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">{guest.first_name}</th>
          <td className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white sm:hidden">
            {guest.last_name}
          </td>
          <td className="px-6 py-2">{guest.room_number}</td>
          <td className="px-6 py-2 sm:hidden">{guest.check_in}</td>
          <td className="px-6 py-2">{guest.check_out}</td>
          <td className="px-6 py-2">
            <StatusIndicator checkOut={guest.check_out} />
          </td>
          <td className="px-6 py-2 text-right">
            <button className="font-medium text-blue-600 dark:text-blue-500">
              <IoIosArrowForward />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default GuestsList;
