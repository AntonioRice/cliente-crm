import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext, useStateContext } from "../../context";
import { SlCalender } from "react-icons/sl";
import { CiSettings } from "react-icons/ci";
import { PiSignOutLight } from "react-icons/pi";
import { IoPeople } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";

const Sidebar = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuthContext();
  const { activeSideBar } = useStateContext();
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveClass = (path) => {
    return location.pathname.startsWith(path) ? "bg-gray-700 rounded-lg" : "";
  };

  const sidebarItems = [
    { path: "/dashboard", label: t("dashboard"), icon: <RxDashboard size={20} /> },
    { path: "/guests", label: t("guests"), icon: <IoPeople size={20} /> },
    { path: "/reservations", label: t("reservations"), icon: <SlCalender size={20} /> },
    { path: "/team-members", label: t("team_members"), icon: <IoPeople size={20} />, roles: ["Admin", "SuperAdmin"] },
    { path: "/tenants", label: t("tenants"), icon: <SlCalender size={20} />, roles: ["SuperAdmin"] },
  ];

  const filterSidebarItems = (items, userRole) => {
    return items.filter((item) => !item.roles || item.roles.includes(userRole));
  };

  const filteredSidebarItems = filterSidebarItems(sidebarItems, user.role);

  return (
    <aside
      className={`fixed top-0 left-0 z-50 w-64 h-screen transition-transform ${
        activeSideBar ? "translate-x-0" : "-translate-x-full"
      } sm:-translate-x-full`}
    >
      <div className="fixed px-2 mt-2 text-xs font-medium text-gray-800 bg-gray-100 rounded-full ms-3 dark:bg-gray-700 dark:text-gray-300">
        Pro
      </div>
      <div className="h-full px-3 py-4 overflow-y-auto bg-white border-r border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <ul className="space-y-2 font-extralight">
          <li className="p-5">
            <p className="flex justify-center text-xs text-gray-400 ms-3">
              {t("welcome")}, {user.first_name}
            </p>
          </li>
          {filteredSidebarItems.map((item) => (
            <li key={item.path} className={getActiveClass(item.path)}>
              <button
                onClick={() => navigate(item.path)}
                className="flex w-full items-center p-2 text-gray-900 rounded-lg dark:text-[#cccccc] hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                {item.icon}
                <span className="text-sm ms-3 whitespace-nowrap">{item.label}</span>
              </button>
            </li>
          ))}
          <div className="fixed bottom-0 flex justify-between w-full pb-2">
            <ul className="flex flex-row space-x-2">
              <li className={getActiveClass("/settings")}>
                <a
                  href="/settings"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <CiSettings size={15} />
                  <span className="flex-1 text-xs ms-2 whitespace-nowrap">{t("settings")}</span>
                </a>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <PiSignOutLight size={15} />
                  <span className="flex-1 text-xs ms-2 whitespace-nowrap">{t("sign_out")}</span>
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
