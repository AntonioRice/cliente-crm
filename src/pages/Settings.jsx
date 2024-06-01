import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const Settings = () => {
  const { user } = useContext(AuthContext);
  console.log(user);

  return (
    <div className="p-10 ">
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
                id="firstName"
                type="text"
                placeholder={user.first_name}
              />
            </div>
            <div className="w-full md:w-1/2 mb-6">
              <label className="block uppercase tracking-wide text-[10px] font-light mb-2">Last Name</label>
              <input
                className="appearance-none block w-full bg-[#111827] border border-gray-400 rounded-lg py-3 px-4 mb-3 leading-tight text-sm focus:outline-none focus:bg-[#141d2f]"
                id="lastName"
                type="text"
                placeholder={user.last_name}
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
                placeholder={user.email}
              />
            </div>
            <div className="w-full md:w-1/2 mb-6">
              <label className="block uppercase tracking-wide text-[10px] font-light mb-2">Phone Number</label>
              <input
                className="appearance-none block w-full bg-[#111827] border border-gray-400 rounded-lg py-3 px-4 mb-3 leading-tight text-sm focus:outline-none focus:bg-[#141d2f]"
                id="phoneNumber"
                type="text"
                placeholder={user.phone_number}
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
                <input type="checkbox" value="" className="sr-only peer" />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">EN / ES</span>
              </label>
            </div>
            <div className="mb-6 items-center">
              <label className="block uppercase tracking-wide text-[10px] font-light mb-2">Display</label>
              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Light / Dark</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-6">
        <button className="bg-slate-600 px-4 py-2 text-white rounded-lg">Save</button>
      </div>
    </div>
  );
};

export default Settings;
