import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SlCalender } from "react-icons/sl";
import { CiSettings } from "react-icons/ci";
import { PiSignOutLight } from "react-icons/pi";
import { IoPeople } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { AuthContext } from "../context/AuthProvider";

const Sidebar = ({ isOpen }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <aside
      className={`fixed top-0 left-0 z-50 w-64 h-screen transition-transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } sm:-translate-x-full`}
      aria-label="Sidebar"
    >
      <div className="fixed px-2 ms-3 mt-2 text-xs font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
        Premium
      </div>
      <div className="h-full px-3 py-4 overflow-y-auto bg-white border-r border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <ul className="space-y-2 font-extralight">
          <li className=" p-5">
            <p className="flex justify-center ms-3 text-xs text-gray-400">Welcome, {user.first_name}</p>
          </li>
          <li>
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-[#cccccc] hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <RxDashboard size={20} />
              <span className="flex-1 ms-3 whitespace-nowrap text-sm">Dashboard</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/guests")}
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-[#cccccc] hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <IoPeople size={20} />
              <span className="flex-1 ms-3 whitespace-nowrap text-sm">Guests</span>
            </button>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-[#cccccc] hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <SlCalender size={20} />
              <span className="flex-1 ms-3 whitespace-nowrap text-sm">Calendar</span>
            </a>
          </li>

          <div className="fixed bottom-0 pb-2 w-full flex justify-between">
            <ul className="flex flex-row space-x-4">
              <li>
                <a
                  href="/settings"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <CiSettings size={15} />
                  <span className="flex-1 ms-2 whitespace-nowrap text-xs">Settings</span>
                </a>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <PiSignOutLight size={15} />
                  <span className="flex-1 ms-2 whitespace-nowrap text-xs">Sign Out</span>
                </button>
              </li>
            </ul>
          </div>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
