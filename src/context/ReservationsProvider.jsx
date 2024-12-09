import { useState, useContext, createContext } from "react";
import axios from "axios";

const ReservationsContext = createContext();

export const useReservationsContext = () => useContext(ReservationsContext);

export const ReservationsProvider = ({ children }) => {
  const [reservationsAnalytics, setReservationsAnalytics] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchReservationsAnalytics = async (currentWeek) => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3015/api/v1/reservations/analytics", {
        params: { currentWeek },
      });
      setReservationsAnalytics(response.data.data.reservationsByWeek);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching reservations data", error);
    }
  };

  const clearReservation = () => {
    setSelectedReservation(null);
  };

  return (
    <ReservationsContext.Provider
      value={{
        fetchReservationsAnalytics,
        reservationsAnalytics,
        setReservationsAnalytics,
        selectedReservation,
        setSelectedReservation,
        loading,
        setLoading,
        clearReservation,
      }}
    >
      {children}
    </ReservationsContext.Provider>
  );
};
