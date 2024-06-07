import React, { useEffect, useState } from "react";
import ChartCard from "../components/ChartCard";
import TableCard from "../components/TableCard";
import AddClientButton from "../components/AddClientButton";
import AnimatedPage from "../components/AnimatedPage";
import { useGuestContext } from "../context/GuestProvider";
import ReservationsChart from "../components/ReservationsChart";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const { currentGuests, fetchCurrentGuests, currentPage, totalPages, totalCurrentGuests, setCurrentPage } =
    useGuestContext();
  const { t } = useTranslation();
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  useEffect(() => {
    fetchCurrentGuests(currentPage, sortConfig.key, sortConfig.direction);
  }, [currentPage, sortConfig]);

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
    console.log(sortConfig);
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

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
        <ReservationsChart />
        <ChartCard />
        <ChartCard />
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
