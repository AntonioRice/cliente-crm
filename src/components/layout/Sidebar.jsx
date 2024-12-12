import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext, useStateContext } from "../../context";
import { SlCalender } from "react-icons/sl";
import { CiSettings } from "react-icons/ci";
import { PiSignOutLight, PiBuildingLight } from "react-icons/pi";
import { MdOutlineRoomService } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import { RxDashboard } from "react-icons/rx";

const Sidebar = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuthContext();
  const { activeSideBar } = useStateContext();
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveClass = (path) => {
    return location.pathname.startsWith(path) ? "text-green-400 dark:bg-neutral-700" : "";
  };

  const sidebarItems = [
    { path: "/dashboard", label: t("dashboard"), icon: <RxDashboard size={20} /> },
    { path: "/guests", label: t("guests"), icon: <MdOutlineRoomService size={20} /> },
    { path: "/reservations", label: t("reservations"), icon: <SlCalender size={20} /> },
    { path: "/team", label: t("team"), icon: <FaPeopleGroup size={20} />, roles: ["Admin", "SuperAdmin"] },
    { path: "/tenants", label: t("tenant.tenants"), icon: <PiBuildingLight size={20} />, roles: ["SuperAdmin"] },
  ];

  const filterSidebarItems = (items, userRole) => {
    return items.filter((item) => !item.roles || item.roles.includes(userRole));
  };

  const filteredSidebarItems = filterSidebarItems(sidebarItems, user?.role);

  return (
    <aside className={`fixed left-0 top-0 z-50 h-screen w-64 transition-transform ${activeSideBar ? "translate-x-0" : "-translate-x-full"} sm:-translate-x-full`}>
      <div className="fixed ms-3 mt-2 rounded-full bg-gray-100 px-2 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">Pro</div>
      <div className="h-full overflow-y-auto border-r border-gray-200 bg-white px-3 py-4 dark:border-neutral-700 dark:bg-[#1b1a1a]">
        <ul className="space-y-2 font-extralight">
          <li className="p-5">
            <p className="ms-3 flex justify-center text-xs text-gray-400">
              {t("welcome")}, {user?.first_name}
            </p>
          </li>
          {filteredSidebarItems.map((item) => (
            <li key={item.path}>
              <button onClick={() => navigate(item.path)} className={`group flex w-full items-center rounded-lg p-2 hover:bg-gray-100 hover:text-white dark:hover:bg-neutral-600 ${getActiveClass(item.path)}`}>
                <span className="flex items-center">{item.icon}</span>
                <span className="ms-3 whitespace-nowrap text-sm">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="fixed bottom-0 w-full p-2">
        <div className="grid w-full grid-cols-2 items-center">
          <div className="flex items-center justify-center">
            <button onClick={() => navigate("/settings")} className={`group flex w-full items-center justify-center rounded-lg p-2 hover:bg-gray-100 hover:text-white dark:hover:bg-neutral-600 ${getActiveClass("/settings") || ""}`}>
              <CiSettings size={15} />
              <span className="ms-2 whitespace-nowrap text-xs">{t("settings")}</span>
            </button>
          </div>
          <div className="flex items-center justify-center">
            <button onClick={logout} className="group flex w-full items-center justify-center rounded-lg p-2 hover:text-white dark:hover:bg-neutral-600">
              <PiSignOutLight size={15} />
              <span className="ms-2 whitespace-nowrap text-xs">{t("sign_out")}</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
