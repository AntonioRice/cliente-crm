import React, { createContext, useState, useContext } from "react";
import axios from "axios";

const GuestContext = createContext();

export const useGuest = () => useContext(GuestContext);

export const GuestProvider = ({ children }) => {
  const [guests, setGuests] = useState([]);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchGuests = async (page = 1, limit = 10) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3015/api/v1/guests`, {
        params: { page, limit },
      });
      console.log(response.data.data);
      setGuests(response.data.data);
      setTotalPages(response.data.meta.totalPages);
      setCurrentPage(response.data.meta.currentPage);
    } catch (error) {
      console.error("Error fetching guests:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GuestContext.Provider
      value={{ guests, fetchGuests, selectedGuest, setSelectedGuest, currentPage, totalPages, loading }}
    >
      {children}
    </GuestContext.Provider>
  );
};
