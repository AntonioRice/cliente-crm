import React, { useState, useEffect } from "react";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const reservations = [
  {
    reservation_id: "1",
    tenant_id: "",
    primary_guest_id: "",
    check_in: "2024-07-05",
    check_out: "2024-07-12",
    room_numbers: "",
    payment_method: "",
    guest_status: "",
    payment_status: "",
    total_amount: "",
    created_date: "",
    updated_date: "",
  },
  {
    reservation_id: "2",
    tenant_id: "",
    primary_guest_id: "",
    check_in: "2024-07-08",
    check_out: "2024-07-15",
    room_numbers: "",
    payment_method: "",
    guest_status: "",
    payment_status: "",
    total_amount: "",
    created_date: "",
    updated_date: "",
  },
  {
    reservation_id: "3",
    tenant_id: "",
    primary_guest_id: "",
    check_in: "2024-07-09",
    check_out: "2024-07-26",
    room_numbers: "",
    payment_method: "",
    guest_status: "",
    payment_status: "",
    total_amount: "",
    created_date: "",
    updated_date: "",
  },
  {
    reservation_id: "4",
    tenant_id: "",
    primary_guest_id: "",
    check_in: "2024-07-09",
    check_out: "2024-07-26",
    room_numbers: "",
    payment_method: "",
    guest_status: "",
    payment_status: "",
    total_amount: "",
    created_date: "",
    updated_date: "",
  },
];

const Calendar = () => {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [dates, setDates] = useState([]);

  useEffect(() => {
    generateDates(month, year);
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

  const handleReservationClick = (reservation_id) => {};

  const getReservationsForDate = (date) => {
    const selectedDate = new Date(year, month, date).toISOString().split("T")[0];
    return reservations.filter((res) => selectedDate >= res.check_in && selectedDate <= res.check_out);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">Calendar</h1>
        <div className="flex space-x-2 mb-4">
          <select value={month} onChange={handleMonthChange} className="p-2 bg-gray-700 rounded-md">
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i}>
                {new Date(0, i).toLocaleString("default", { month: "long" })}
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
        {daysOfWeek.map((day) => (
          <div key={day} className="p-2 text-center font-bold bg-gray-700">
            {day}
          </div>
        ))}
        {dates.map((date, index) => (
          <div
            key={index}
            className={`h-32 flex flex-col border border-gray-700 ${!date ? "bg-gray-700 opacity-25" : ""}`}
          >
            <p className="p-2 text-gray-300">{date}</p>
            <div className="overflow-y-auto h-full">
              {getReservationsForDate(date).map((reservation) => (
                <div
                  key={reservation.reservation_id}
                  className="bg-green-600 p-.5 m-1 text-xs text-white cursor-pointer"
                  onClick={() => handleReservationClick(reservation.reservation_id)}
                >
                  <p className="px-1">{`Reservation ${reservation.reservation_id}`}</p>
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
