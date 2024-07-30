import { useEffect, useState } from "react";
import axios from "axios";
import { DataTable, AnimatedPage, TableRow } from "../components";
import { useNavigate } from "react-router-dom";

const Tenants = () => {
  const navigate = useNavigate();
  const [tenants, setTenants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [searchTerm, setSearchTerm] = useState("");

  const columns = [
    { header: "Tenant ID", key: "tenant_id" },
    { header: "Name", key: "tenant_name" },
    { header: "Email", key: "email" },
    { header: "Phone Number", key: "phone_number" },
    { header: "Created Date", key: "created_date" },
    { header: "Membership", key: "membership" },
    { header: "Status", key: "status" },
  ];

  const fetchTenants = async () => {
    try {
      const response = await axios.get(`http://localhost:3015/api/v1/tenants`);
      setTenants(response.data.data);
      // setTotalPages(response.data.meta.totalPages);
      // setCurrentPage(response.data.meta.currentPage);
      setTotalItems(response.data.total);
    } catch (error) {
      console.error("Error fetching tenant data:", error);
    }
  };

  useEffect(() => {
    fetchTenants(currentPage, sortConfig.key, sortConfig.direction, searchTerm);
  }, [currentPage, sortConfig, searchTerm]);

  const handleEditItem = (item) => {
    navigate(`/tenants/details/${item.tenant_id}`);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    // if (currentPage < totalPages) {
    //   setCurrentPage((prev) => prev + 1);
    // }
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

  const renderRow = (tenant) => <TableRow key={tenant.tenant_id} item={tenant} columns={columns} editAction={handleEditItem} />;

  if (!tenants.length) {
    return <div>No Tenants Found</div>;
  }

  return (
    <AnimatedPage>
      <div className="flex items-center py-4">
        <h1 className="text-2xl font-semibold">Tenants</h1>
      </div>
      <DataTable
        data={tenants}
        columns={columns}
        title="Tenants"
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
        handleSort={handleSort}
        sortConfig={sortConfig}
        showSearch={false}
        onSearch={handleSearch}
        renderRow={renderRow}
      />
    </AnimatedPage>
  );
};

export default Tenants;
