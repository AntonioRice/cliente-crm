import { createContext, useState, useContext } from "react";
import axios from "axios";

const GuestContext = createContext();

export const useGuestContext = () => useContext(GuestContext);

export const GuestProvider = ({ children }) => {
  const initialGuestData = {
    first_name: "",
    last_name: "",
    date_of_birth: "",
    nationality: "",
    identification_number: "",
    email: "",
    phone_number: "",
    address: {
      city: "",
      state: "",
      postal_code: "",
      country: "",
    },
    emergency_contact: {
      first_name: "",
      last_name: "",
      phone_number: "",
    },
    vehicle: {
      make: "",
      model: "",
      plate_number: "",
    },
  };

  const [guestData, setGuestData] = useState(initialGuestData);
  const [currentGuests, setCurrentGuests] = useState([]);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [primaryGuest, setPrimaryGuest] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCurrentGuests, setTotalCurrentGuests] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchCurrentGuests = async (page = 1, sortKey = null, sortDirection = "asc", searchQuery) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3015/api/v1/guests/current`, {
        params: { page, limit: 5, sortKey, sortDirection, searchQuery },
      });
      setCurrentGuests(response.data.data);
      setTotalPages(response.data.meta.totalPages);
      setCurrentPage(response.data.meta.currentPage);
      setTotalCurrentGuests(response.data.meta.totalCurrentGuests);
    } catch (error) {
      console.error("Error fetching guests:", error);
    } finally {
      setLoading(false);
    }
  };

  const clearGuests = () => {
    setSelectedGuest(null);
  };

  const resetGuestData = () => {
    setGuestData(initialGuestData);
  };

  return (
    <GuestContext.Provider
      value={{
        initialGuestData,
        guestData,
        setGuestData,
        resetGuestData,
        currentGuests,
        fetchCurrentGuests,
        selectedGuest,
        setSelectedGuest,
        setPrimaryGuest,
        primaryGuest,
        clearGuests,
        currentPage,
        setCurrentPage,
        totalPages,
        totalCurrentGuests,
        loading,
      }}
    >
      {children}
    </GuestContext.Provider>
  );
};
