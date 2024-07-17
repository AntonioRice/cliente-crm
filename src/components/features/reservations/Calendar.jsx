import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useReservationsContext } from "../../../context";
import { useTranslation } from "react-i18next";
import { months, daysOfWeek } from "../../../utils/standardData";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

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

  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
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
      <div className="flex justify-between h-15">
        <h1 className="mb-4 text-2xl font-bold">{t("calendar")}</h1>
        <div className="flex mb-4 space-x-2">
          <div className="inline-flex h-10 text-sm rtl:space-x-reverse">
            <button
              onClick={handlePrevMonth}
              className="flex items-center justify-center h-full px-3 leading-tight text-gray-500 bg-white border border-gray-300 ms-0 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-green-500"
            >
              <IoIosArrowBack />
            </button>

            <button
              onClick={handleNextMonth}
              className="flex items-center justify-center h-full px-3 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-green-400 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-green-500 dark:hover:bg-gray-700"
            >
              <IoIosArrowForward />
            </button>
          </div>
          <select value={month} onChange={handleMonthChange} className="h-10 p-2 bg-gray-700 rounded-md">
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
            className="h-10 px-4 bg-gray-700 rounded-md"
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
