import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatedPage, ChartCard, DataTable, TableRow, AddButton, BarChart, LineGraph, Notes } from "../components";
import { useGuestContext, useReservationsContext } from "../context";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { IoIosArrowForward } from "react-icons/io";

const Dashboard = () => {
  const { currentGuests, fetchCurrentGuests, currentPage, totalPages, totalCurrentGuests, setCurrentPage, setSelectedGuest } = useGuestContext();
  const { fetchReservationsAnalytics, reservationsAnalytics, fetchRooms, rooms } = useReservationsContext();
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
  }, [currentPage, sortConfig, searchTerm, rooms]);

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
    navigate(`/guests/details/${guest.guest_id}`);
  };

  const countReservationsInWeek = (reservations) => {
    return reservations.length;
  };

  const calculateDelta = (currentData, previousData, currentWeek) => {
    const currentCount = countReservationsInWeek(currentData.reservations || [], currentWeek);
    const previousWeek = moment(currentWeek).subtract(1, "weeks").startOf("week").format("YYYY-MM-DD");
    const previousCount = countReservationsInWeek(previousData.reservations || [], previousWeek);

    if (previousCount === 0) {
      if (currentCount === 0) {
        return "0%";
      } else {
        return `+${(currentCount * 100).toFixed(2)}%`;
      }
    }

    const delta = ((currentCount - previousCount) / previousCount) * 100;
    return `${delta > 0 ? "+" : ""}${delta.toFixed(2)}%`;
  };

  const currentWeekData = reservationsAnalytics[currentWeek] || {
    reservations: [],
    totalGuestsForWeek: 0,
  };

  const previousWeekData = reservationsAnalytics[moment(currentWeek).subtract(1, "weeks").startOf("week").format("YYYY-MM-DD")] || {
    reservations: [],
    totalGuestsForWeek: 0,
  };

  const delta = calculateDelta(currentWeekData, previousWeekData);

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
      <div className="flex items-center justify-between py-4">
        <h1 className="text-2xl font-semibold">{t("dashboard")}</h1>
        <AddButton path="/guests/register" />
      </div>
      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="col-span-3">
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <ChartCard title="Reservations" week={currentWeek} value={`${currentWeekData.reservations.length}`} description={`${delta} Since last week`} handlePrevWeek={handlePrevWeek} handleNextWeek={handleNextWeek} delta={delta} />
            <ChartCard title="Guests" week={currentWeek} value={`${currentWeekData.totalGuestsForWeek}`} description={`${delta} Since last week`} handlePrevWeek={handlePrevWeek} handleNextWeek={handleNextWeek} delta={delta} />
            <LineGraph title="7-Day View" week={currentWeek} data={chartData} />
          </div>
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
        <div className="= col-span-1 max-h-[75vh]">
          <div className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
            <div className="p-5">
              <h1 className="text-sm">Rooms</h1>
              <p className="text-xs text-gray-500">Total: {rooms.length}</p>
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="no-scrollbar h-full overflow-auto">
                <table className="w-full text-left text-xs text-gray-500 dark:text-gray-400">
                  <thead className="sticky top-0 bg-gray-50 uppercase dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th className="px-2 py-2 sm:px-4 md:px-6">Room</th>
                      <th className="px-2 py-2 sm:px-4 md:px-6">Name</th>
                      <th className="px-2 py-2 sm:px-4 md:px-6">Status</th>
                      <th className="px-2 py-2 sm:px-4 md:px-6">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rooms.map((room) => (
                      <tr key={room.number} className="border-b border-gray-500 hover:bg-gray-600 hover:text-white">
                        <td className="px-2 py-4 sm:px-4 md:px-6">{room.number}</td>
                        <td className="px-2 py-4 sm:px-4 md:px-6">{room.name}</td>
                        <td className={`px-2 py-4 sm:px-4 md:px-6 ${room.occupied ? "text-red-500" : ""}`}>{room.occupied ? "Occupied" : "Available"}</td>
                        <td className="px-2 py-4 text-right sm:px-4 md:px-6">
                          <button className="font-medium">
                            <IoIosArrowForward />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Dashboard;
