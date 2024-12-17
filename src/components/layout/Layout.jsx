import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import GlobalAlert from "../utils/GlobalAlert";
import { useStateContext } from "../../context";

const Layout = () => {
  const { activeSideBar, setActiveSideBar, currentMode } = useStateContext();

  useEffect(() => {
    document.body.className = currentMode === "dark" ? "dark" : "";
  }, [currentMode]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setActiveSideBar(true);
      } else {
        setActiveSideBar(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-full w-full">
      <Sidebar activeSideBar />
      <div className={`flex flex-grow flex-col transition-all duration-300 ${activeSideBar && window.innerWidth >= 768 ? "ml-64" : ""}`}>
        <Header toggleSidebar={() => setActiveSideBar((prev) => !prev)} />
        <main className="mt-16 px-6">
          <Outlet />
        </main>
      </div>
      <GlobalAlert />
    </div>
  );
};

export default Layout;
