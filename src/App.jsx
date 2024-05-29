import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Guests from "./pages/Guests";
import GuestDetails from "./pages/GuestDetails";
import Settings from "./pages/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "guests", element: <Guests /> },
      { path: "guests", element: <GuestDetails /> },
      { path: "user/settings", element: <Settings /> },
      { path: "guestdetails/:id", element: <GuestDetails /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
