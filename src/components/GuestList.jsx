import React from "react";
import { useNavigate } from "react-router-dom";
import { useGuestContext } from "../context/GuestProvider";
import { IoIosArrowForward } from "react-icons/io";
import StatusIndicator from "./StatusIndicator";
import { formatDateTime, getLastVisit } from "../utils/standardMethods";

const GuestsList = ({ guests, columns }) => {
  const navigate = useNavigate();
  const { setSelectedGuest } = useGuestContext();

  const handleRowClick = (guest) => {
    setSelectedGuest(guest);
    navigate(`/guests/details/${guest.guest_id}`);
  };

  const renderCellContent = (guest, col) => {
    if (col.key === "guest_status") {
      return <StatusIndicator status={guest[col.key]} />;
    }
    if (col.header === "Last Visit") {
      return getLastVisit(guest) || formatDateTime(guest[col.key]);
    }
    if (col.key === "check_in" || col.key === "check_out") {
      return formatDateTime(guest[col.key]);
    }
    return guest[col.key];
  };

  return (
    <tbody>
      {guests.map((guest) => (
        <tr
          key={guest.guest_id}
          onClick={() => handleRowClick(guest)}
          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer dark:hover:text-green-400"
        >
          {columns.map((col) => (
            <td key={col.key} className="px-6 py-2 font-light text-gray-900 whitespace-nowrap dark:text-white">
              {renderCellContent(guest, col)}
            </td>
          ))}
          <td className="px-6 py-2 text-right">
            <button className="font-medium">
              <IoIosArrowForward />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default GuestsList;
