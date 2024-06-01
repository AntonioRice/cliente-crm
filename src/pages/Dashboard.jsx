import React, { useState, useEffect } from "react";
import axios from "axios";
import ChartCard from "../components/ChartCard";
import TableCard from "../components/TableCard";
import AddClientModal from "../components/AddClientModal";
import AddClientToggleButton from "../components/AddClientToggleButton";
import AnimatedPage from "../components/AnimatedPage";

const Dashboard = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const response = await axios.get(`http://localhost:3015/api/v1/guests`);
        setGuests(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGuests();
  }, []);

  const toggleAddClientModal = () => {
    setShowAddModal(!showAddModal);
  };

  console.log(guests);

  return (
    <AnimatedPage>
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
      <TableCard guests={guests} limit={5} />
    </AnimatedPage>
  );
};

export default Dashboard;
