import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useReservationsContext } from "../../../context";
import { useTranslation } from "react-i18next";
import { months, daysOfWeek } from "../../../utils/standardData";
import { IoIosArrowForward, IoIosArrowBack, IoIosArrowDown } from "react-icons/io";

const Calendar = ({ reservations, month, year, onMonthChange, onYearChange }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setSelectedReservation } = useReservationsContext();
  const [dates, setDates] = useState([]);
  const [today, setToday] = useState(new Date().getDate());

  useEffect(() => {
    generateDates(month, year);
  }, [month, year]);

  const generateDates = (month, year) => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const tempDates = Array.from({ length: firstDay }, () => null).concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

    setDates(tempDates);
  };

  const handleMonthChange = (e) => {
    onMonthChange(parseInt(e.target.value));
  };

  const handleYearChange = (e) => {
    onYearChange(parseInt(e.target.value));
  };

  const handlePrevMonth = () => {
    if (month === 0) {
      onMonthChange(11);
      onYearChange(year - 1);
    } else {
      onMonthChange(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      onMonthChange(0);
      onYearChange(year + 1);
    } else {
      onMonthChange(month + 1);
    }
  };

  const handleReservationOnClick = (reservation) => {
    setSelectedReservation(reservation);
    navigate(`/reservations/${reservation.reservation_id}`);
  };

  const getReservationsForDate = (date) => {
    const selectedDate = new Date(year, month, date).toISOString();
    return reservations.filter((res) => selectedDate >= res.check_in && selectedDate <= res.check_out);
  };

  return (
    <div className="flex h-[85vh] flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex h-10 items-center space-x-2">
          <div className="inline-flex h-full text-sm rtl:space-x-reverse">
            <button
              onClick={handlePrevMonth}
              className="flex h-full items-center justify-center rounded-l-lg border border-gray-300 bg-white px-3 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-neutral-600 dark:bg-neutral-700 dark:text-gray-400 dark:hover:bg-neutral-600 dark:hover:text-white"
            >
              <IoIosArrowBack />
            </button>

            <button
              onClick={handleNextMonth}
              className="flex h-full items-center justify-center rounded-r-lg border border-gray-300 bg-white px-3 text-gray-500 hover:bg-gray-100 hover:text-green-400 dark:border-neutral-600 dark:bg-neutral-700 dark:text-gray-400 dark:hover:bg-neutral-600 dark:hover:text-white"
            >
              <IoIosArrowForward />
            </button>
          </div>

          <select
            value={month}
            onChange={handleMonthChange}
            className="h-full rounded-lg border border-gray-300 bg-gray-50 px-5 py-2 text-sm text-gray-900 focus:appearance-none focus:border-white focus:outline-none focus:ring-2 focus:ring-white dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:placeholder-gray-400 dark:focus:ring-neutral-400"
          >
            {months().map((monthName, index) => (
              <option key={index} value={index}>
                {monthName}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-1 top-3">
            <IoIosArrowDown />
          </span>

          <input
            type="number"
            value={year}
            onChange={handleYearChange}
            className="h-full rounded-lg border border-gray-300 bg-gray-50 px-4 text-sm text-gray-900 focus:border-white focus:outline-none focus:ring-2 focus:ring-white dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:placeholder-gray-400 dark:focus:ring-neutral-400"
            min="1900"
            max="2100"
          />
        </div>
      </div>

      <div className="mb-1 grid h-10 grid-cols-7 gap-1">
        {daysOfWeek().map((day) => (
          <div key={day} className="h-10 rounded-md p-2 text-center font-bold dark:bg-neutral-700">
            {day}
          </div>
        ))}
      </div>
      <div className="grid flex-grow grid-cols-7 gap-1">
        {dates.map((date, index) => (
          <div key={index} className={`flex flex-col rounded-md border border-neutral-700 ${!date ? "bg-neutral-700 opacity-10" : date === today ? "bg-neutral-800" : ""}`}>
            <p className="p-2 text-gray-300">{date}</p>
            <div className="h-full overflow-y-auto">
              {getReservationsForDate(date).map((reservation) => (
                <div key={reservation.reservation_id} className="m-1 cursor-pointer rounded-sm border-b border-b-neutral-500 p-0.5 text-xs text-black hover:bg-neutral-600 dark:text-white" onClick={() => handleReservationOnClick(reservation)}>
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
