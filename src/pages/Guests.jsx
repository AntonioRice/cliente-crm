import React, { useState, useEffect } from "react";
import TableCard from "../components/TableCard";
import AnimatedPage from "../components/AnimatedPage";
import AddClientButton from "../components/AddClientButton";
import axios from "axios";

const Guests = () => {
  const [loading, setLoading] = useState(false);
  const [allGuests, setAllGuests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchAllGuests = async (page = 1) => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3015/api/v1/guests", {
        params: { page, limit: 10 },
      });
      setAllGuests(response.data.data);
      setTotalPages(response.data.meta.totalPages);
      setCurrentPage(response.data.meta.currentPage);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching all guests", error);
    }
  };

  useEffect(() => {
    fetchAllGuests(currentPage);
  }, [currentPage]);

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

  return (
    <AnimatedPage>
      <div className="flex justify-between items-center pb-4">
        <h1 className="font-semibold text-2xl">Guests</h1>
        <AddClientButton />
      </div>
      <div className="h-full">
        <TableCard
          guests={allGuests}
          title={"All Guests"}
          currentPage={currentPage}
          totalPages={totalPages}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          loading={loading}
        />
      </div>
    </AnimatedPage>
  );
};

export default Guests;
