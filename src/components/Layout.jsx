import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-full">
      <Sidebar isOpen={isSidebarOpen} />
      <div
        className={`flex flex-col flex-grow transition-all duration-300 ${
          isSidebarOpen && window.innerWidth >= 768 ? "ml-64" : ""
        }`}
      >
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-grow p-6 mt-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
