import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Guests from "./pages/Guests";
import GuestDetails from "./pages/GuestDetails";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import AuthProvider from "./context/AuthProvider";
import { GuestProvider } from "./context/GuestProvider";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Layout />
      </PrivateRoute>
    ),
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "guests", element: <Guests /> },
      { path: "guests/guestdetails/:id", element: <GuestDetails /> },
      { path: "settings", element: <Settings /> },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <GuestProvider>
        <RouterProvider router={router} />;
      </GuestProvider>
    </AuthProvider>
  );
}

export default App;
