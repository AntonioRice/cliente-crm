import { useState, useEffect } from "react";
import axios from "axios";
import { AnimatedPage, TableCard, AddClientButton } from "../components";

const Guests = () => {
  const [allGuests, setAllGuests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalGuests, setTotalGuests] = useState(0);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [isLoading, setIsLoading] = useState(false);

  const columns = [
    { header: "First Name", key: "first_name" },
    { header: "Last Name", key: "last_name" },
    { header: "Email", key: "email" },
    { header: "Phone Number", key: "phone_number" },
    { header: "Last Visit", key: "check_out" },
    { header: "Status", key: "guest_status" },
  ];

  const fetchAllGuests = async (page = 1, sortKey = null, sortDirection = "asc") => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:3015/api/v1/guests", {
        params: { page, limit: 10, sortKey, sortDirection },
      });

      setAllGuests(response.data.data);
      setTotalPages(response.data.meta.totalPages);
      setCurrentPage(response.data.meta.currentPage);
      setTotalGuests(response.data.meta.totalGuests);
    } catch (error) {
      console.error("Error fetching all guests", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllGuests(currentPage, sortConfig.key, sortConfig.direction);
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
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <AnimatedPage>
      <div className="flex items-center justify-between pb-4">
        <h1 className="text-2xl font-semibold">Guests</h1>
        <AddClientButton />
      </div>
      <div className="h-full">
        <TableCard
          columns={columns}
          guests={allGuests}
          title={"All Guests"}
          currentPage={currentPage}
          totalPages={totalPages}
          totalGuests={totalGuests}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          handleSort={handleSort}
          sortConfig={sortConfig}
        />
      </div>
    </AnimatedPage>
  );
};

export default Guests;
