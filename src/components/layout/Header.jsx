import { Link, useNavigate } from "react-router-dom";
import { useAuthContext, useStateContext } from "../../context";

const Header = () => {
  const { setActiveSideBar } = useStateContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 z-20 w-full border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <button onClick={() => setActiveSideBar((prev) => !prev)} type="button" className="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
              <svg className="h-6 w-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
              </svg>
            </button>
            <Link to="/dashboard" className="ms-2 flex md:me-24">
              <span className="self-center whitespace-nowrap text-xl font-semibold text-green-500 sm:text-2xl">Cliente</span>
            </Link>
          </div>
          <div className="fixed right-4 flex items-center">
            <div className="ms-3 flex items-center">
              <button
                type="button"
                onClick={() => {
                  navigate("/settings");
                }}
                className="flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              >
                <img className="h-8 w-8 rounded-full" src={user?.profile_picture} alt="user photo" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
