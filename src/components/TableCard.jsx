import React, { useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const TableCard = () => {
  const guests = [
    { firstName: "John", lastName: "Doe", roomNumber: "21", checkIn: "01/01/24", checkOut: "01/05/24" },
    { firstName: "Jane", lastName: "Doe", roomNumber: "21", checkIn: "01/01/24", checkOut: "01/05/24" },
    { firstName: "Angel", lastName: "Reese", roomNumber: "21", checkIn: "01/01/24", checkOut: "01/05/24" },
    { firstName: "Steph", lastName: "Curry", roomNumber: "30", checkIn: "01/05/24", checkOut: "01/10/24" },
    { firstName: "Jordan", lastName: "Curry", roomNumber: "31", checkIn: "01/05/24", checkOut: "01/10/24" },
    { firstName: "Steph", lastName: "Curry", roomNumber: "32", checkIn: "01/05/24", checkOut: "01/10/24" },
    { firstName: "H", lastName: "Curry", roomNumber: "33", checkIn: "01/05/24", checkOut: "01/10/24" },
    { firstName: "Steph", lastName: "Curry", roomNumber: "34", checkIn: "01/05/24", checkOut: "01/10/24" },
    { firstName: "J", lastName: "Curry", roomNumber: "35", checkIn: "01/05/24", checkOut: "01/10/24" },
    { firstName: "Steph", lastName: "Curry", roomNumber: "36", checkIn: "01/05/24", checkOut: "01/10/24" },
    { firstName: "asklnl", lastName: "Curry", roomNumber: "37", checkIn: "01/05/24", checkOut: "01/10/24" },
    { firstName: "Adan", lastName: "Curry", roomNumber: "38", checkIn: "01/05/24", checkOut: "01/10/24" },
    { firstName: "Test", lastName: "Curry", roomNumber: "39", checkIn: "01/05/24", checkOut: "01/10/24" },
    { firstName: "Steph", lastName: "Curry", roomNumber: "40", checkIn: "01/05/24", checkOut: "01/10/24" },
    { firstName: "Mike", lastName: "Curry", roomNumber: "41", checkIn: "01/05/24", checkOut: "01/10/24" },
    { firstName: "Steph", lastName: "Curry", roomNumber: "1", checkIn: "01/05/24", checkOut: "01/10/24" },
    { firstName: "Steph", lastName: "Curry", roomNumber: "2", checkIn: "01/05/24", checkOut: "01/10/24" },
    { firstName: "Bill", lastName: "Curry", roomNumber: "3", checkIn: "01/05/24", checkOut: "01/10/24" },
    { firstName: "Steph", lastName: "Curry", roomNumber: "4", checkIn: "01/05/24", checkOut: "01/10/24" },
    { firstName: "Sara", lastName: "Curry", roomNumber: "5", checkIn: "01/05/24", checkOut: "01/10/24" },
  ];

  const guestsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastGuest = currentPage * guestsPerPage;
  const indexOfFirstGuest = indexOfLastGuest - guestsPerPage;
  const currentGuests = guests.slice(indexOfFirstGuest, indexOfLastGuest);

  const totalPages = Math.ceil(guests.length / guestsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="flex flex-col h-auto mb-4 rounded-xl border bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <div className="p-5">
        <h1 className="text-sm">Current Guests</h1>
        <p className="text-gray-500 text-xs">Total: 15</p>
      </div>
      <div className="overflow-x-hidden rounded-b-xl">
        <table className="min-w-full text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">First Name</th>
              <th className="px-6 py-3">Last Name</th>
              <th className="px-6 py-3">Room</th>
              <th className="px-6 py-3">Check-in</th>
              <th className="px-6 py-3">Check-Out</th>
              <th className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentGuests.map((guest, i) => (
              <tr
                key={i}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {guest.firstName}
                </th>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {guest.lastName}
                </td>
                <td className="px-6 py-4">{guest.roomNumber}</td>
                <td className="px-6 py-4">{guest.checkIn}</td>
                <td className="px-6 py-4">{guest.checkOut}</td>
                <td className="px-6 py-4 text-right">
                  <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    Details
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <nav className="p-4 flex items-center flex-col flex-wrap md:flex-row justify-between pt-4">
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
            Page <span className="font-semibold text-gray-900 dark:text-white">{currentPage}</span> of
            <span className="font-semibold text-gray-900 dark:text-white"> {totalPages}</span>
          </span>
          <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li>
              <button
                onClick={handlePrevPage}
                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <IoIosArrowBack />
              </button>
            </li>
            <li>
              <button
                onClick={handleNextPage}
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <IoIosArrowForward />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default TableCard;
