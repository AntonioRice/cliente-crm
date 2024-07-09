import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const ReservationsContext = createContext();

export const useReservationsContext = () => useContext(ReservationsContext);

export const ReservationsProvider = ({ children }) => {
  const [reservationsAnalytics, setReservationsAnalytics] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchReservationsAnalytics = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3015/api/v1/reservations/analytics");
      setReservationsAnalytics(response.data.data.reservationsByWeek);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching reservations data", error);
    }
  };

  return (
    <ReservationsContext.Provider
      value={{ fetchReservationsAnalytics, reservationsAnalytics, setReservationsAnalytics, loading, setLoading }}
    >
      {children}
    </ReservationsContext.Provider>
  );
};
