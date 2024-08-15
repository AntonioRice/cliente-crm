import { useState } from "react";
import { IoMdEye, IoMdEyeOff, IoMdLock } from "react-icons/io";

const PasswordInput = ({ label, id, register, error, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <label className="mb-2 block text-sm font-medium dark:text-[#cccccc]">{label}</label>
      <div className="relative mb-5">
        <div className="pointer-events-none absolute start-0 top-3 flex items-center ps-3.5">
          <IoMdLock className="size-4.5 text-gray-500 dark:text-gray-400" />
        </div>
        <input
          type={showPassword ? "text" : "password"}
          id={id}
          className={`block w-full rounded-lg border border-gray-300 p-2.5 ps-10 text-sm text-gray-900 focus:border-green-500 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-green-500 dark:focus:ring-green-500 ${error ? "border-red-500" : ""}`}
          placeholder={placeholder}
          {...register(id)}
        />
        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute -top-1 right-0 p-4">
          {showPassword ? <IoMdEye className="size-4 text-gray-500 dark:text-gray-400" /> : <IoMdEyeOff className="size-4 text-gray-500 dark:text-gray-400" />}
        </button>
        {error && <p className="mt-1 text-xs text-red-500">{error.message}</p>}
      </div>
    </>
  );
};

export default PasswordInput;
