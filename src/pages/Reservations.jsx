import { useEffect, useState } from "react";
import axios from "axios";
import { Calendar } from "../components";

const Reservations = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(`http://localhost:3015/api/v1/reservations`);
        setReservations(response.data.data);
      } catch (error) {
        console.error("Error fetching reservation data:", error);
      }
    };
    fetchReservations();
  }, []);

  return <Calendar reservations={reservations} />;
};

export default Reservations;
