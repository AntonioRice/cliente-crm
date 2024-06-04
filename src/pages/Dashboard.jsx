import React, { useEffect } from "react";
import ChartCard from "../components/ChartCard";
import TableCard from "../components/TableCard";
import AddClientButton from "../components/AddClientButton";
import AnimatedPage from "../components/AnimatedPage";
import { useGuest } from "../context/GuestProvider";

const Dashboard = () => {
  const { guests, fetchGuests } = useGuest();

  useEffect(() => {
    fetchGuests();
  }, []);

  return (
    <AnimatedPage>
      <div className="flex justify-between items-center pb-4">
        <h1 className="font-semibold text-2xl">DashBoard</h1>
        <AddClientButton />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <ChartCard />
        <ChartCard />
        <ChartCard />
      </div>
      <TableCard guests={guests} limit={5} />
    </AnimatedPage>
  );
};

export default Dashboard;
