import React from "react";

const Settings = () => {
  return (
    <div>
      <div className="flex pb-4">Settings</div>

      <dl className="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
        <div className="flex flex-col pb-3">
          <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">User Name</dt>
          <dd className="text-lg font-semibold">miguel_vhh</dd>
        </div>
        <div className="flex flex-col py-3">
          <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Email Address</dt>
          <dd className="text-lg font-semibold">miguel_vhh@vhh.com</dd>
        </div>
        <div className="flex flex-col pt-3">
          <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Phone number</dt>
          <dd className="text-lg font-semibold">+00 123 456 789 / +12 345 678</dd>
        </div>
      </dl>
    </div>
  );
};

export default Settings;
