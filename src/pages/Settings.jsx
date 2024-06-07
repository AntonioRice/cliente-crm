import React, { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../context/AuthProvider";
import { useStateContext } from "../context/StateProvider";
import AnimatedPage from "../components/AnimatedPage";
import LoadingComponent from "../components/LoadingComponent";

const Settings = () => {
  const { user } = useAuthContext();
  const [newUserData, setNewUserData] = useState(user);
  const [loading, setLoading] = useState(false);
  const { setMode } = useStateContext();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setNewUserData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleToggleChange = (e) => {
    const { id } = e.target;
    const newValue =
      id === "language"
        ? newUserData.preferences[id] === "en"
          ? "es"
          : "en"
        : newUserData.preferences[id] === "light"
        ? "dark"
        : "light";

    setNewUserData((prevData) => ({
      ...prevData,
      preferences: {
        ...prevData.preferences,
        [id]: newValue,
      },
    }));

    if (id === "ui_mode") {
      setMode(newValue);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await axios.put(`http://localhost:3015/api/v1/users/${newUserData.user_id}`, newUserData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <AnimatedPage>
      {loading ? (
        <LoadingComponent />
      ) : (
        <div className="p-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 border-b-[.5px] border-gray-700">
            <div className="md:col-span-1">
              <h1>General</h1>
              <p className="text-xs text-gray-600">Control basic general settings</p>
            </div>
            <div className="md:col-span-2 flex flex-col gap-6">
              <div className="flex flex-col md:flex-row gap-3 w-full">
                <div className="w-full md:w-1/2 mb-6 items-center">
                  <label className="block uppercase tracking-wide text-[10px] font-light mb-2">First Name</label>
                  <input
                    className="appearance-none block w-full bg-[#111827] border border-gray-400 rounded-lg py-3 px-4 mb-3 leading-tight text-sm focus:outline-none focus:bg-[#141d2f]"
                    id="first_name"
                    type="text"
                    value={newUserData.first_name}
                    placeholder={user.first_name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="w-full md:w-1/2 mb-6">
                  <label className="block uppercase tracking-wide text-[10px] font-light mb-2">Last Name</label>
                  <input
                    className="appearance-none block w-full bg-[#111827] border border-gray-400 rounded-lg py-3 px-4 mb-3 leading-tight text-sm focus:outline-none focus:bg-[#141d2f]"
                    id="last_name"
                    type="text"
                    value={newUserData.last_name}
                    placeholder={user.last_name}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-3 w-full">
                <div className="w-full md:w-1/2 mb-6 items-center">
                  <label className="block uppercase tracking-wide text-[10px] font-light mb-2">Email</label>
                  <input
                    className="appearance-none block w-full bg-[#111827] border border-gray-400 rounded-lg py-3 px-4 mb-3 leading-tight text-sm focus:outline-none focus:bg-[#141d2f]"
                    id="email"
                    type="text"
                    value={newUserData.email}
                    placeholder={user.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="w-full md:w-1/2 mb-6">
                  <label className="block uppercase tracking-wide text-[10px] font-light mb-2">Phone Number</label>
                  <input
                    className="appearance-none block w-full bg-[#111827] border border-gray-400 rounded-lg py-3 px-4 mb-3 leading-tight text-sm focus:outline-none focus:bg-[#141d2f]"
                    id="phone_number"
                    type="text"
                    value={newUserData.phone_number}
                    placeholder={user.phone_number}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 border-b-[.5px] border-gray-700">
            <div className="md:col-span-1">
              <h1>Preferences</h1>
              <p className="text-xs text-gray-600">Control basic preference settings</p>
            </div>
            <div className="md:col-span-2 flex flex-col">
              <div className="flex flex-col md:flex-row gap-10">
                <div className="mb-6 items-center">
                  <label className="block uppercase tracking-wide text-[10px] font-light mb-2">Language</label>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      id="language"
                      type="checkbox"
                      className="sr-only peer"
                      checked={newUserData?.preferences?.language?.toLowerCase() === "es"}
                      onChange={handleToggleChange}
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span className="ms-3 text-xs font-medium text-gray-900 dark:text-gray-400">EN / ES</span>
                  </label>
                </div>
                <div className="mb-6 items-center">
                  <label className="block uppercase tracking-wide text-[10px] font-light mb-2">Display</label>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      id="ui_mode"
                      type="checkbox"
                      className="sr-only peer"
                      checked={newUserData.preferences.ui_mode?.toLowerCase() === "dark"}
                      onChange={handleToggleChange}
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span className="ms-3 text-xs font-medium text-gray-900 dark:text-gray-400">Light / Dark</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button
              onClick={handleSave}
              className="px-4 py-2 text-white rounded-lg p-1 dark:hover:bg-gray-600 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 dark:hover:text-white"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </AnimatedPage>
  );
};

export default Settings;
