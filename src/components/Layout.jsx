import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { useStateContext } from "../context/StateProvider";

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
    <div className="flex h-full">
      <Sidebar activeSideBar />
      <div
        className={`flex flex-col flex-grow transition-all duration-300 ${
          activeSideBar && window.innerWidth >= 768 ? "ml-64" : ""
        }`}
      >
        <Header toggleSidebar={() => setActiveSideBar((prev) => !prev)} />
        <main className="flex-grow p-6 mt-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
