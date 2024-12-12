import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useTeamContext } from "../context";
import { AddButtonLarge, AnimatedPage, DataTable, TableRow } from "../components";

const Team = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setSelectedEmployee } = useTeamContext();
  const [Team, setTeam] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [searchTerm, setSearchTerm] = useState("");

  const columns = [
    { header: "Profile Picture", key: "profile_picture" },
    { header: "User Name", key: "user_name" },
    { header: "First Name", key: "first_name" },
    { header: "Last Name", key: "last_name" },
    { header: "Email", key: "email" },
    { header: "Phone Number", key: "phone_number" },
    { header: "Status", key: "status" },
  ];

  const fetchTeam = async (page = 1, sortKey = null, sortDirection = "asc", searchQuery = "") => {
    try {
      const response = await axios.get(`http://localhost:3015/api/v1/users`, {
        params: { page, limit: 10, sortKey, sortDirection, searchQuery },
      });
      setTeam(response.data.data);
      setTotalPages(response.data.meta.totalPages);
      setCurrentPage(response.data.meta.currentPage);
      setTotalItems(response.data.meta.totalUsers);
    } catch (error) {
      console.error("Error fetching team data:", error);
    }
  };

  useEffect(() => {
    fetchTeam(currentPage, sortConfig.key, sortConfig.direction, searchTerm);
  }, [currentPage, sortConfig, searchTerm]);

  const handleEditItem = (item) => {
    setSelectedEmployee(item);
    navigate(`/team/${item.user_id}`);
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

  const renderRow = (employee) => <TableRow key={employee.user_id} item={employee} columns={columns} editAction={handleEditItem} />;

  return (
    <AnimatedPage>
      <div className="grid gap-4 py-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-6">
        <AddButtonLarge title="Add Team Member" path="/team/register" />
      </div>
      <DataTable
        data={Team}
        columns={columns}
        title="Team"
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
        handleSort={handleSort}
        sortConfig={sortConfig}
        showSearch={true}
        onSearch={handleSearch}
        renderRow={renderRow}
      />
    </AnimatedPage>
  );
};

export default Team;
