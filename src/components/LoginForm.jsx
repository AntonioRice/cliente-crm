import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaUser } from "react-icons/fa";
import { IoMdEye, IoMdEyeOff, IoMdLock } from "react-icons/io";

const LoginForm = ({ onSubmit }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(username, password);
  };

  return (
    <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
      <div className="flex flex-col items-center py-10 text-xl">
        <h1>{t("login")}</h1>
      </div>
      <label className="block mb-2 text-sm font-medium text-gray-400 dark:text-white">{t("username")}</label>
      <div className="relative mb-5">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          <FaUser className="text-gray-500 size-4 dark:text-gray-400" />
        </div>
        <input
          type="text"
          id="username"
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="*********"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <label className="block mb-2 text-sm font-medium text-gray-400 dark:text-white">{t("password.password")}</label>
      <div className="relative mb-5">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          <IoMdLock className="size-4.5 text-gray-500 dark:text-gray-400" />
        </div>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="*********"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 p-4">
          {showPassword ? (
            <IoMdEye className="text-gray-500 size-4 dark:text-gray-400" />
          ) : (
            <IoMdEyeOff className="text-gray-500 size-4 dark:text-gray-400" />
          )}
        </button>
      </div>
      <button
        type="submit"
        disabled={!username.length || !password.length}
        className="disabled:cursor-not-allowed text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {t("login")}
      </button>
    </form>
  );
};

export default LoginForm;
