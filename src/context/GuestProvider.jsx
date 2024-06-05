import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const GuestContext = createContext();

export const useGuest = () => useContext(GuestContext);

export const GuestProvider = ({ children }) => {
  const [currentGuests, setCurrentGuests] = useState([]);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [primaryGuest, setPrimaryGuest] = useState(null);
  const [additionalGuests, setAdditionalGuests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchCurrentGuests = async (page = 1, limit = 10) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3015/api/v1/guests/current`, {
        params: { page, limit },
      });
      setCurrentGuests(response.data.data);
      setTotalPages(response.data.meta.totalPages);
      setCurrentPage(response.data.meta.currentPage);
    } catch (error) {
      console.error("Error fetching guests:", error);
    } finally {
      setLoading(false);
    }
  };

  const selectGuest = (guest) => {
    const guestWithId = { ...guest, id: uuidv4() };
    if (!primaryGuest) {
      setPrimaryGuest(guestWithId);
      setSelectedGuest(guestWithId);
    } else {
      setAdditionalGuests((prevGuests) => [...prevGuests, guestWithId]);
    }
  };

  const clearGuests = () => {
    setPrimaryGuest(null);
    setAdditionalGuests([]);
    setSelectedGuest(null);
  };

  return (
    <GuestContext.Provider
      value={{
        currentGuests,
        fetchCurrentGuests,
        selectedGuest,
        setSelectedGuest,
        setPrimaryGuest,
        primaryGuest,
        additionalGuests,
        setAdditionalGuests,
        selectGuest,
        clearGuests,
        currentPage,
        totalPages,
        loading,
      }}
    >
      {children}
    </GuestContext.Provider>
  );
};
