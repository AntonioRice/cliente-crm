import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider, GuestProvider, GuestRegistrationProvider, StateProvider, ReservationsProvider, TeamProvider, AlertProvider } from "./context";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "./App.css";
import { Layout, ProtectedRoute } from "./components";
import { Dashboard, Guests, GuestDetails, GuestRegistration, Reservations, ReservationDetails, Settings, Login, Tenants, TenantDetails, TeamMembers, Unauthorized, TeamMemberDetails, TeamMemberRegistration } from "./pages";

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
        path: "team-members/register",
        element: (
          <ProtectedRoute allowedRoles={["Admin", "SuperAdmin"]}>
            <TeamMemberRegistration />
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
      {
        path: "tenants/details/:id",
        element: (
          <ProtectedRoute allowedRoles={["SuperAdmin"]}>
            <TenantDetails />
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
        <AuthProvider>
          <ReservationsProvider>
            <GuestRegistrationProvider>
              <GuestProvider>
                <TeamProvider>
                  <AlertProvider>
                    <RouterProvider router={router} />
                  </AlertProvider>
                </TeamProvider>
              </GuestProvider>
            </GuestRegistrationProvider>
          </ReservationsProvider>
        </AuthProvider>
      </StateProvider>
    </LocalizationProvider>
  );
}

export default App;
