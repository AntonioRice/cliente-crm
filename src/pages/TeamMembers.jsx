import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useTeamContext } from "../context";
import { AddButton, AnimatedPage, DataTable, TableRow } from "../components";

const TeamMembers = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setSelectedTeamMember } = useTeamContext();
  const [teamMembers, setTeamMembers] = useState([]);
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

  const fetchTeamMembers = async (page = 1, sortKey = null, sortDirection = "asc", searchQuery = "") => {
    try {
      const response = await axios.get(`http://localhost:3015/api/v1/users`, {
        params: { page, limit: 10, sortKey, sortDirection, searchQuery },
      });
      setTeamMembers(response.data.data);
      setTotalPages(response.data.meta.totalPages);
      setCurrentPage(response.data.meta.currentPage);
      setTotalItems(response.data.meta.totalUsers);
    } catch (error) {
      console.error("Error fetching team members data:", error);
    }
  };

  useEffect(() => {
    fetchTeamMembers(currentPage, sortConfig.key, sortConfig.direction, searchTerm);
  }, [currentPage, sortConfig, searchTerm]);

  const handleEditItem = (item) => {
    setSelectedTeamMember(item);
    navigate(`/team-members/details/${item.user_id}`);
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

  const renderRow = (teamMember) => <TableRow key={teamMember.user_id} item={teamMember} columns={columns} editAction={handleEditItem} />;

  // if (loading) return <LoadingComponent />;

  return (
    <AnimatedPage>
      <div className="flex items-center justify-between py-4">
        <h1 className="text-2xl font-semibold">{t("team_members")}</h1>
        <AddButton path="/team-members/register" />
      </div>
      <DataTable
        data={teamMembers}
        columns={columns}
        title="Team Members"
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

export default TeamMembers;
