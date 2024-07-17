import { useState, useEffect } from "react";
import axios from "axios";
import { AnimatedPage, DataTable, AddClientButton } from "../components";
import { useGuestContext } from "../context";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

const Guests = () => {
  const [allGuests, setAllGuests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalGuests, setTotalGuests] = useState(0);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { setSelectedGuest } = useGuestContext();
  const navigate = useNavigate();

  const columns = [
    { header: "First Name", key: "first_name" },
    { header: "Last Name", key: "last_name" },
    { header: "Email", key: "email" },
    { header: "Phone Number", key: "phone_number" },
    { header: "Last Visit", key: "check_out" },
    { header: "Status", key: "guest_status" },
  ];

  const fetchAllGuests = async (page = 1, sortKey = null, sortDirection = "asc", search = "") => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:3015/api/v1/guests", {
        params: { page, limit: 10, sortKey, sortDirection, search },
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
    fetchAllGuests(currentPage, sortConfig.key, sortConfig.direction, searchTerm);
  }, [currentPage, sortConfig, searchTerm]);

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

  const renderRow = (guest, index, editAction) => (
    <tr
      key={guest.id}
      className="border-b-[1px] border-b-gray-500 hover:bg-gray-500 hover:text-white hover:cursor-pointer"
      onClick={() => editAction(guest)}
    >
      {columns.map((col) => (
        <td key={col.key} className="px-6 py-4">
          {guest[col.key]}
        </td>
      ))}
      {editAction && (
        <td className="px-6 py-2 text-right">
          <button className="font-medium">
            <IoIosArrowForward />
          </button>
        </td>
      )}
    </tr>
  );

  return (
    <AnimatedPage>
      <div className="flex items-center justify-between pb-4">
        <h1 className="text-2xl font-semibold">Guests</h1>
        <AddClientButton />
      </div>
      <div className="h-full">
        <DataTable
          data={allGuests}
          columns={columns}
          title="All Guests"
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalGuests}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          handleSort={handleSort}
          sortConfig={sortConfig}
          showSearch={true}
          onSearch={handleSearch}
          renderRow={renderRow}
          editAction={handleEditGuest}
        />
      </div>
    </AnimatedPage>
  );
};

export default Guests;
