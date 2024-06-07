import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { Layout, PrivateRoute } from "./components";
import { Dashboard, Guests, GuestDetails, RegisterGuest, Settings, Login } from "./pages";
import { AuthProvider, GuestProvider, StateProvider } from "./context";

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
      { path: "guests/register", element: <RegisterGuest /> },
      { path: "guests/details/:id", element: <GuestDetails /> },
      { path: "settings", element: <Settings /> },
    ],
  },
]);

function App() {
  return (
    <StateProvider>
      <AuthProvider>
        <GuestProvider>
          <RouterProvider router={router} />;
        </GuestProvider>
      </AuthProvider>
    </StateProvider>
  );
}

export default App;
