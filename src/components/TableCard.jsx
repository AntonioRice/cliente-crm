import React from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import GuestsList from "./GuestList";
import LoadingComponent from "../components/LoadingComponent";

const TableCard = ({ guests, title, currentPage, totalPages, handlePrevPage, handleNextPage, loading }) => {
  return (
    <div className="flex flex-col mb-4 rounded-xl border bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <div className="p-5 inline-flex justify-between">
        <div>
          <h1 className="text-sm">{title}</h1>
          <p className="text-gray-500 text-xs">Total: {guests.length}</p>
        </div>
        <div className="w-full md:w-1/2">
          <form className="flex items-center">
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="simple-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Search"
                required=""
              />
            </div>
          </form>
        </div>
      </div>
      <div className="overflow-x-hidden rounded-b-xl">
        <table className="min-w-full text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">First Name</th>
              <th className="px-6 py-3 sm:hidden">Last Name</th>
              <th className="px-6 py-3">Room(s)</th>
              <th className="px-6 py-3 sm:hidden">Check-in</th>
              <th className="px-6 py-3">Check-Out</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <GuestsList guests={guests} />
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
