import React, { useEffect, useState } from "react";
import ChartCard from "../components/ChartCard";
import TableCard from "../components/TableCard";
import AddClientButton from "../components/AddClientButton";
import AnimatedPage from "../components/AnimatedPage";
import { useGuestContext } from "../context/GuestProvider";
import { useReservationsContext } from "../context/ReservationsProvider";
import { useTranslation } from "react-i18next";
import moment from "moment";
import BarChart from "../components/BarChart";

const Dashboard = () => {
  const { currentGuests, fetchCurrentGuests, currentPage, totalPages, totalCurrentGuests, setCurrentPage } =
    useGuestContext();
  const { fetchReservationsAnalytics, reservationsAnalytics, loading, setLoading } = useReservationsContext();
  const { t } = useTranslation();
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentWeek, setCurrentWeek] = useState(moment().startOf("isoWeek").format("YYYY-MM-DD"));

  useEffect(() => {
    fetchCurrentGuests(currentPage, sortConfig.key, sortConfig.direction);
  }, [currentPage, sortConfig]);

  useEffect(() => {
    fetchReservationsAnalytics();
  }, []);

  const handlePrevWeek = () => {
    setCurrentWeek((prevWeek) => moment(prevWeek).subtract(1, "weeks").startOf("isoWeek").format("YYYY-MM-DD"));
  };

  const handleNextWeek = () => {
    setCurrentWeek((prevWeek) => moment(prevWeek).add(1, "weeks").startOf("isoWeek").format("YYYY-MM-DD"));
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

  const countReservationsInWeek = (reservations, weekStart) => {
    const start = moment(weekStart);
    const end = start.clone().endOf("isoWeek");
    return reservations.filter((reservation) => {
      const checkIn = moment(reservation.check_in);
      const checkOut = moment(reservation.check_out);
      return checkIn.isBefore(end) && checkOut.isAfter(start);
    }).length;
  };

  const calculateDelta = (currentData, previousData) => {
    const currentCount = countReservationsInWeek(currentData, currentWeek);
    const previousCount = countReservationsInWeek(
      previousData,
      moment(currentWeek).subtract(1, "weeks").startOf("isoWeek").format("YYYY-MM-DD")
    );

    if (previousCount === 0) {
      if (currentCount === 0) {
        return "0%";
      } else {
        return `+${(currentCount * 100).toFixed(2)}%`; // Showing true percentage increase from 0
      }
    }

    const delta = ((currentCount - previousCount) / previousCount) * 100;
    return `${delta > 0 ? "+" : ""}${delta.toFixed(2)}%`;
  };

  const currentWeekData = reservationsAnalytics[currentWeek] || [];
  const previousWeekData =
    reservationsAnalytics[moment(currentWeek).subtract(1, "weeks").startOf("isoWeek").format("YYYY-MM-DD")] || [];
  const delta = calculateDelta(currentWeekData, previousWeekData);

  const getWeekData = (weekStart) => {
    const start = moment(weekStart);
    const weekData = Array(7).fill(0);
    Object.values(reservationsAnalytics)
      .flat()
      .forEach((reservation) => {
        const checkIn = moment(reservation.check_in);
        const checkOut = moment(reservation.check_out);
        for (let i = 0; i < 7; i++) {
          const day = start.clone().add(i, "days");
          if (checkIn.isBefore(day.endOf("day")) && checkOut.isAfter(day.startOf("day"))) {
            weekData[i]++;
          }
        }
      });
    return weekData;
  };

  const barChartData = getWeekData(currentWeek);

  const columns = [
    { header: "First Name", key: "first_name" },
    { header: "Last Name", key: "last_name" },
    { header: "Room(s)", key: "room_numbers" },
    { header: "Check-in", key: "check_in" },
    { header: "Check-Out", key: "check_out" },
    { header: "Status", key: "guest_status" },
  ];

  return (
    <AnimatedPage>
      <div className="flex justify-between items-center pb-4">
        <h1 className="font-semibold text-2xl">{t("dashboard")}</h1>
        <AddClientButton />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <ChartCard
          title="Reservations"
          week={currentWeek}
          value={`${currentWeekData.length}`}
          description={`${delta} Since last week`}
          bgColor={delta.startsWith("+") ? "bg-green-400" : "bg-red-400"}
          handlePrevWeek={handlePrevWeek}
          handleNextWeek={handleNextWeek}
        />
        <BarChart data={barChartData} title={"Breakdown"} week={currentWeek} />
      </div>
      <TableCard
        columns={columns}
        guests={currentGuests}
        title={t("current_guests")}
        currentPage={currentPage}
        totalPages={totalPages}
        totalGuests={totalCurrentGuests}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
        handleSort={handleSort}
        sortConfig={sortConfig}
      />
    </AnimatedPage>
  );
};

export default Dashboard;
