import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout, PrivateRoute } from "./components";
import {
  Dashboard,
  Guests,
  GuestDetails,
  GuestRegistration,
  Reservations,
  ReservationDetails,
  Settings,
  Login,
} from "./pages";
import { AuthProvider, GuestProvider, StateProvider, ReservationsProvider } from "./context";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "./App.css";

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
      { path: "guests/register", element: <GuestRegistration /> },
      { path: "guests/details/:id", element: <GuestDetails /> },
      { path: "reservations", element: <Reservations /> },
      { path: "reservations/details/:id", element: <ReservationDetails /> },
      { path: "settings", element: <Settings /> },
    ],
  },
]);

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StateProvider>
        <ReservationsProvider>
          <AuthProvider>
            <GuestProvider>
              <RouterProvider router={router} />
            </GuestProvider>
          </AuthProvider>
        </ReservationsProvider>
      </StateProvider>
    </LocalizationProvider>
  );
}

export default App;
