import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider, GuestProvider, GuestRegistrationProvider, StateProvider, ReservationsProvider, TeamProvider, AlertProvider, RoomProvider } from "./context";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "./App.css";
import { Layout, ProtectedRoute } from "./components";
import { Dashboard, Guests, GuestDetails, GuestRegistration, Reservations, ReservationDetails, Room, Settings, Login, Tenants, TenantDetails, Team, Unauthorized, EmployeeDetails, EmployeeRegistration, Contact, Analytics } from "./pages";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/password/reset/:token",
    element: <Login />,
  },
  {
    path: "/register/:token",
    element: <Login />,
  },
  {
    path: "/contact",
    element: <Contact />,
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
      { path: "guests/:id", element: <GuestDetails /> },
      { path: "reservations", element: <Reservations /> },
      { path: "room/:id", element: <Room /> },
      { path: "reservations/:id", element: <ReservationDetails /> },
      { path: "settings", element: <Settings /> },
      {
        path: "analytics",
        element: (
          <ProtectedRoute allowedRoles={["Admin", "SuperAdmin"]}>
            <Analytics />
          </ProtectedRoute>
        ),
      },
      {
        path: "team",
        element: (
          <ProtectedRoute allowedRoles={["Admin", "SuperAdmin"]}>
            <Team />
          </ProtectedRoute>
        ),
      },
      {
        path: "team/register",
        element: (
          <ProtectedRoute allowedRoles={["Admin", "SuperAdmin"]}>
            <EmployeeRegistration />
          </ProtectedRoute>
        ),
      },
      {
        path: "team/:id",
        element: (
          <ProtectedRoute allowedRoles={["Admin", "SuperAdmin"]}>
            <EmployeeDetails />
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
        path: "tenants/:id",
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
          <RoomProvider>
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
          </RoomProvider>
        </AuthProvider>
      </StateProvider>
    </LocalizationProvider>
  );
}

export default App;
