import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useReservationsContext } from "../../../context";
import { useTranslation } from "react-i18next";
import { months, daysOfWeek } from "../../../utils/standardData";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const Calendar = ({ reservations, month, year, onMonthChange, onYearChange }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setSelectedReservation } = useReservationsContext();
  const [dates, setDates] = useState([]);

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
    navigate(`/reservations/details/${reservation.reservation_id}`);
  };

  const getReservationsForDate = (date) => {
    const selectedDate = new Date(year, month, date).toISOString();
    return reservations.filter((res) => selectedDate >= res.check_in && selectedDate <= res.check_out);
  };

  return (
    <>
      <div className="h-15 flex justify-between">
        <h1 className="mb-4 text-2xl font-bold">{t("reservations")}</h1>
        <div className="mb-4 flex space-x-2">
          <div className="inline-flex h-10 text-sm rtl:space-x-reverse">
            <button
              onClick={handlePrevMonth}
              className="ms-0 flex h-full items-center justify-center rounded-s-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-green-500"
            >
              <IoIosArrowBack />
            </button>

            <button
              onClick={handleNextMonth}
              className="flex h-full items-center justify-center rounded-e-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-green-400 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-green-500"
            >
              <IoIosArrowForward />
            </button>
          </div>
          <select value={month} onChange={handleMonthChange} className="h-10 rounded-md bg-gray-700 p-2">
            {months().map((monthName, index) => (
              <option key={index} value={index}>
                {monthName}
              </option>
            ))}
          </select>
          <input type="number" value={year} onChange={handleYearChange} className="h-10 rounded-md bg-gray-700 px-4" min="1900" max="2100" />
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {daysOfWeek().map((day) => (
          <div key={day} className="rounded-md bg-gray-700 p-2 text-center font-bold">
            {day}
          </div>
        ))}
        {dates.map((date, index) => (
          <div key={index} className={`flex h-[7.45rem] flex-col rounded-md border border-gray-700 ${!date ? "bg-gray-700 opacity-25" : ""}`}>
            <p className="p-2 text-gray-300">{date}</p>
            <div className="h-full overflow-y-auto">
              {getReservationsForDate(date).map((reservation) => (
                <div key={reservation.reservation_id} className="m-1 cursor-pointer rounded-sm bg-green-600 p-0.5 text-xs text-white" onClick={() => handleReservationOnClick(reservation)}>
                  <p className="px-1">{`${reservation.primary_guest.first_name} ${reservation.primary_guest.last_name}`}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Calendar;
