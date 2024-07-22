import { useEffect, useState } from "react";
import axios from "axios";
import { AnimatedPage, Calendar } from "../components";

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(`http://localhost:3015/api/v1/reservations/calendar`, {
          params: { month: month + 1, year },
        });
        setReservations(response.data.data);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };
    fetchReservations();
  }, [month, year]);

  const handleMonthChange = (newMonth) => setMonth(newMonth);
  const handleYearChange = (newYear) => setYear(newYear);

  return (
    <AnimatedPage>
      <Calendar reservations={reservations} month={month} year={year} onMonthChange={handleMonthChange} onYearChange={handleYearChange} />
    </AnimatedPage>
  );
};

export default Reservations;
