import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useReservationsContext } from "../../../context";
import { useTranslation } from "react-i18next";
import { months, daysOfWeek } from "../../../utils/standardData";

const Calendar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setSelectedReservation } = useReservationsContext();
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [dates, setDates] = useState([]);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    generateDates(month, year);
  }, [month, year]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        console.log(month, year);
        const response = await axios.get(`http://localhost:3015/api/v1/reservations/calendar`, {
          params: { month, year },
        });

        console.log(response.data.data);
        setReservations(response.data.data);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };
    fetchReservations();
  }, [month, year]);

  const generateDates = (month, year) => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const tempDates = Array.from({ length: firstDay }, () => null).concat(
      Array.from({ length: daysInMonth }, (_, i) => i + 1)
    );
    setDates(tempDates);
  };

  const handleMonthChange = (e) => {
    setMonth(parseInt(e.target.value));
  };

  const handleYearChange = (e) => {
    setYear(parseInt(e.target.value));
  };

  const handleReservationOnClick = (reservation) => {
    setSelectedReservation(reservation);
    navigate(`/reservations/details/${reservation.reservation_id}`);
  };

  const getReservationsForDate = (date) => {
    const selectedDate = new Date(year, month, date).toISOString().split("T")[0];
    return reservations.filter((res) => selectedDate >= res.check_in && selectedDate <= res.check_out);
  };

  return (
    <div className="p-2">
      <div className="flex justify-between">
        <h1 className="mb-4 text-2xl font-bold">{t("calendar")}</h1>
        <div className="flex mb-4 space-x-2">
          <select value={month} onChange={handleMonthChange} className="p-2 bg-gray-700 rounded-md">
            {months().map((monthName, index) => (
              <option key={index} value={index}>
                {monthName}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={year}
            onChange={handleYearChange}
            className="px-4 bg-gray-700 rounded-md"
            min="1900"
            max="2100"
          />
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {daysOfWeek().map((day) => (
          <div key={day} className="p-2 font-bold text-center bg-gray-700 rounded-md">
            {day}
          </div>
        ))}
        {dates.map((date, index) => (
          <div
            key={index}
            className={`h-32 flex flex-col border rounded-md border-gray-700 ${!date ? "bg-gray-700 opacity-25" : ""}`}
          >
            <p className="p-2 text-gray-300">{date}</p>
            <div className="h-full overflow-y-auto">
              {getReservationsForDate(date).map((reservation) => (
                <div
                  key={reservation.reservation_id}
                  className="bg-green-600 p-0.5 m-1 text-white text-xs cursor-pointer rounded-sm"
                  onClick={() => handleReservationOnClick(reservation)}
                >
                  <p className="px-1">{`${reservation.primary_guest.first_name} ${reservation.primary_guest.last_name}`}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
