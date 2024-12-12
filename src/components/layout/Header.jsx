import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext, useStateContext } from "../../context";
import { ProfileImage } from "../../components";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();
  const { setActiveSideBar } = useStateContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarItems = [
    { path: "/dashboard", label: t("dashboard") },
    { path: "/guests", label: t("guests") },
    { path: "/reservations", label: t("reservations") },
    { path: "/room", label: t("rooms") },
    { path: "/team", label: t("team") },
    { path: "/tenants", label: t("tenant.tenants") },
  ];

  const getBreadcrumbs = () => {
    const pathSegments = location.pathname.split("/").filter((segment) => segment);
    const breadcrumbs = pathSegments.map((segment, index) => {
      const path = "/" + pathSegments.slice(0, index + 1).join("/");
      const matchedItem = sidebarItems.find((item) => item.path === path);
      const label = matchedItem ? matchedItem.label : segment.charAt(0).toUpperCase() + segment.slice(1);

      return {
        label,
        path,
        isLast: index === pathSegments.length - 1,
      };
    });

    return breadcrumbs;
  };

  const renderBreadcrumbs = () => {
    const breadcrumbs = getBreadcrumbs();

    return (
      <div className="flex items-center space-x-2 text-sm dark:text-white">
        {breadcrumbs.map((crumb, index) => (
          <div key={crumb.path} className="flex items-center">
            {index > 0 && <span className="mx-2 text-gray-300">&gt;</span>}
            {crumb.isLast ? (
              <span className="font-semibold">{crumb.label}</span>
            ) : (
              <Link to={crumb.path} className="hover:text-green-500 dark:hover:text-green-500">
                {crumb.label}
              </Link>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <nav className="fixed top-0 z-20 w-full border-b border-gray-200 bg-white dark:border-neutral-700 dark:bg-[#1b1a1a]">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <button onClick={() => setActiveSideBar((prev) => !prev)} type="button" className="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
              <svg className="h-6 w-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
              </svg>
            </button>
            <div className="ms-2 flex flex-col md:me-24">
              <Link to="/dashboard" className="self-center whitespace-nowrap text-xl font-semibold text-white sm:text-2xl">
                {renderBreadcrumbs()}
              </Link>
            </div>
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
                <ProfileImage img={user.profile_picture} firstName={user.first_name} lastName={user.last_name} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
