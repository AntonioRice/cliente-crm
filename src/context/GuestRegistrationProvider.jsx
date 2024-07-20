import { createContext, useContext, useState } from "react";

const GuestRegistrationContext = createContext();

export const useGuestRegistrationContext = () => {
  return useContext(GuestRegistrationContext);
};

export const GuestRegistrationProvider = ({ children }) => {
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

  const initialReservationData = {
    payment_method: "",
    total_amount: "",
    payment_status: "",
    additional_guests: [],
    room_numbers: [],
    check_in: new Date().toISOString().split("T")[0],
    check_out: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0],
  };

  const [guestData, setGuestData] = useState(initialGuestData);
  const [reservationData, setReservationData] = useState(initialReservationData);
  const [showReservationForm, setShowReservationForm] = useState(false);

  return (
    <GuestRegistrationContext.Provider
      value={{
        guestData,
        setGuestData,
        reservationData,
        setReservationData,
        initialGuestData,
        initialReservationData,
        showReservationForm,
        setShowReservationForm,
      }}
    >
      {children}
    </GuestRegistrationContext.Provider>
  );
};
