import React, { useState } from "react";
import ChartCard from "../components/ChartCard";
import TableCard from "../components/TableCard";
import AddClientModal from "../components/AddClientModal";
import AddClientToggleButton from "../components/AddClientToggleButton";

const Dashboard = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  const toggleAddClientModal = () => {
    setShowAddModal(!showAddModal);
  };

  return (
    <>
      <div className="flex justify-between items-center pb-4">
        <h1 className="font-semibold text-2xl">DashBoard</h1>
        <AddClientToggleButton toggleAddClientModal={toggleAddClientModal} />
      </div>
      <AddClientModal show={showAddModal} toggleAddClientModal={toggleAddClientModal} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <ChartCard />
        <ChartCard />
        <ChartCard />
      </div>
      <TableCard limit={5} />
    </>
  );
};

export default Dashboard;
