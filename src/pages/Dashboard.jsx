import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatedPage, ChartCard, DataTable, TableRow, RoomsTable } from "../components";
import { useGuestContext, useReservationsContext, useRoomContext } from "../context";
import { useTranslation } from "react-i18next";
import moment from "moment";
import LineGraph from "../components/ui/LineGraph";

const Dashboard = () => {
  const { currentGuests, fetchCurrentGuests, currentPage, totalPages, totalCurrentGuests, setCurrentPage, setSelectedGuest } = useGuestContext();
  const { fetchReservationsAnalytics, reservationsAnalytics } = useReservationsContext();
  const { fetchRooms, rooms } = useRoomContext();
  const { t } = useTranslation();
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentWeek, setCurrentWeek] = useState(moment().startOf("week").day(0).format("YYYY-MM-DD"));
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const columns = [
    { header: "First Name", key: "first_name" },
    { header: "Last Name", key: "last_name" },
    { header: "Room Number(s)", key: "room_numbers" },
    { header: "Check-in", key: "check_in" },
    { header: "Check-Out", key: "check_out" },
    { header: "Status", key: "guest_status" },
  ];

  useEffect(() => {
    fetchCurrentGuests(currentPage, sortConfig.key, sortConfig.direction, searchTerm);
    fetchRooms();
  }, [currentPage, sortConfig, searchTerm]);

  useEffect(() => {
    fetchReservationsAnalytics(currentWeek);
  }, []);

  const handlePrevWeek = () => {
    setCurrentWeek((prevWeek) => moment(prevWeek).subtract(1, "weeks").startOf("week").day(0).format("YYYY-MM-DD"));
  };

  const handleNextWeek = () => {
    setCurrentWeek((prevWeek) => moment(prevWeek).add(1, "weeks").startOf("week").day(0).format("YYYY-MM-DD"));
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleEditGuest = (guest) => {
    setSelectedGuest(guest);
    navigate(`/guests/${guest.guest_id}`);
  };

  const calculateDelta = (currentValue, previousValue) => {
    if (previousValue === 0) {
      if (currentValue === 0) {
        return "0%";
      } else {
        return `+${(currentValue * 100).toFixed(2)}%`;
      }
    }

    const delta = ((currentValue - previousValue) / previousValue) * 100;
    return `${delta > 0 ? "+" : ""}${delta.toFixed(2)}%`;
  };

  const currentWeekData = reservationsAnalytics[currentWeek] || {
    reservations: [],
    totalGuestsForWeek: 0,
  };

  const previousWeek = moment(currentWeek).subtract(1, "weeks").startOf("week").format("YYYY-MM-DD");
  const previousWeekData = reservationsAnalytics[previousWeek] || {
    reservations: [],
    totalGuestsForWeek: 0,
  };

  const reservationDelta = calculateDelta(currentWeekData.reservations.length, previousWeekData.reservations.length);
  const guestDelta = calculateDelta(currentWeekData.totalGuestsForWeek, previousWeekData.totalGuestsForWeek);

  const getWeekData = (weekStart) => {
    const start = moment(weekStart);
    const weekData = Array(7).fill(0);

    reservationsAnalytics[weekStart]?.reservations.forEach((reservation) => {
      const checkIn = moment(reservation.check_in).startOf("day");
      const checkOut = moment(reservation.check_out).startOf("day");

      for (let i = 0; i < weekData.length; i++) {
        const day = start.clone().add(i, "days").startOf("day");
        if (checkIn.isSameOrBefore(day) && checkOut.isSameOrAfter(day)) {
          weekData[i]++;
        }
      }
    });

    return weekData;
  };

  const chartData = getWeekData(currentWeek);

  const renderRow = (guest) => <TableRow key={guest.guest_id} item={guest} columns={columns} editAction={handleEditGuest} />;

  return (
    <AnimatedPage>
      <div className="grid gap-4 py-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:h-[90vh] xl:grid-cols-4">
        <div className="col-span-1 flex flex-col gap-4 md:col-span-2 lg:col-span-3">
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <ChartCard title="Reservations" week={currentWeek} value={`${currentWeekData.reservations.length}`} description={`since last week`} handlePrevWeek={handlePrevWeek} handleNextWeek={handleNextWeek} delta={reservationDelta} />
            <ChartCard title="Guests" week={currentWeek} value={`${currentWeekData.totalGuestsForWeek}`} description={`since last week`} handlePrevWeek={handlePrevWeek} handleNextWeek={handleNextWeek} delta={guestDelta} />
            <LineGraph title="7-Day View" week={currentWeek} data={chartData} />
          </div>
          <div className="flex-1 overflow-hidden">
            <DataTable
              title={t("current_guests")}
              columns={columns}
              data={currentGuests}
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalCurrentGuests}
              handlePrevPage={handlePrevPage}
              handleNextPage={handleNextPage}
              handleSort={handleSort}
              sortConfig={sortConfig}
              showSearch={true}
              onSearch={handleSearch}
              renderRow={renderRow}
            />
          </div>
        </div>
        <RoomsTable rooms={rooms} />
      </div>
    </AnimatedPage>
  );
};

export default Dashboard;
