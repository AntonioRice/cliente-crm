import { useState, useContext, createContext } from "react";
import axios from "axios";

const ReservationsContext = createContext();

export const useReservationsContext = () => useContext(ReservationsContext);

export const ReservationsProvider = ({ children }) => {
  const initialReservationData = {
    payment_method: "",
    total_amount: "",
    payment_status: "",
    additional_guests: [],
    room_numbers: [],
    check_in: new Date().toISOString().split("T")[0],
    check_out: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0],
  };

  const [reservationsAnalytics, setReservationsAnalytics] = useState([]);
  const [reservationData, setReservationData] = useState(initialReservationData);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [showReservationForm, setShowReservationForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const resetReservationData = () => {
    setReservationData(initialReservationData);
  };

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
        initialReservationData,
        reservationData,
        setReservationData,
        resetReservationData,
        loading,
        setLoading,
        clearReservation,
        showReservationForm,
        setShowReservationForm,
      }}
    >
      {children}
    </ReservationsContext.Provider>
  );
};
