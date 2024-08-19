import { useState, useContext, createContext } from "react";
import axios from "axios";

const ReservationsContext = createContext();

export const useReservationsContext = () => useContext(ReservationsContext);

export const ReservationsProvider = ({ children }) => {
  const [reservationsAnalytics, setReservationsAnalytics] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState([]);
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

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3015/api/v1/rooms");
      setRooms(response.data.data);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching rooms", error);
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
        fetchRooms,
        rooms,
        setRooms,
        selectedReservation,
        setSelectedReservation,
        selectedRooms,
        setSelectedRooms,
        loading,
        setLoading,
        clearReservation,
      }}
    >
      {children}
    </ReservationsContext.Provider>
  );
};
