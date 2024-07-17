import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider, GuestProvider, StateProvider, ReservationsProvider } from "./context";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "./App.css";
import { Layout, ProtectedRoute } from "./components";
import {
  Dashboard,
  Guests,
  GuestDetails,
  GuestRegistration,
  Reservations,
  ReservationDetails,
  Settings,
  Login,
  Tenants,
  TeamMembers,
  Unauthorized,
  TeamMemberDetails,
} from "./pages";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "guests", element: <Guests /> },
      { path: "guests/register", element: <GuestRegistration /> },
      { path: "guests/details/:id", element: <GuestDetails /> },
      { path: "reservations", element: <Reservations /> },
      { path: "reservations/details/:id", element: <ReservationDetails /> },
      { path: "settings", element: <Settings /> },
      {
        path: "team-members",
        element: (
          <ProtectedRoute allowedRoles={["Admin", "SuperAdmin"]}>
            <TeamMembers />
          </ProtectedRoute>
        ),
      },
      {
        path: "team-members/details/:id",
        element: (
          <ProtectedRoute allowedRoles={["Admin", "SuperAdmin"]}>
            <TeamMemberDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "tenants",
        element: (
          <ProtectedRoute allowedRoles={["SuperAdmin"]}>
            <Tenants />
          </ProtectedRoute>
        ),
      },
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
