import React from "react";
import { SlCalender } from "react-icons/sl";
import { CiSettings } from "react-icons/ci";
import { PiSignOutLight } from "react-icons/pi";
import { IoPeople } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { VscInbox } from "react-icons/vsc";

const Sidebar = ({ isOpen }) => {
  return (
    <aside
      className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } sm:-translate-x-full`}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-white border-r border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <ul className="space-y-2 font-extralight">
          <li className=" p-5">
            <p className="flex justify-center ms-3 text-xs text-gray-500">Welcome, Miguel</p>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <RxDashboard size={20} />
              <span className="flex-1 ms-3 whitespace-nowrap text-sm">Dashboard</span>
              <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                Pro
              </span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <VscInbox size={20} />
              <span className="flex-1 ms-3 whitespace-nowrap text-sm">Inbox</span>
              {/* <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                3
              </span> */}
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <SlCalender size={20} />
              <span className="flex-1 ms-3 whitespace-nowrap text-sm">Calendar</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <IoPeople size={20} />
              <span className="flex-1 ms-3 whitespace-nowrap text-sm">Guests</span>
            </a>
          </li>
          <div className="fixed bottom-0 pb-2 w-full flex justify-between">
            <ul className="flex flex-row space-x-4">
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <CiSettings size={20} />
                  <span className="flex-1 ms-3 whitespace-nowrap text-sm">Settings</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <PiSignOutLight size={20} />
                  <span className="flex-1 ms-3 whitespace-nowrap text-sm">Sign Out</span>
                </a>
              </li>
            </ul>
          </div>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
