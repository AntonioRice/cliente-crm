import { useEffect, useState } from "react";
import axios from "axios";
import { DataTable } from "../components";

const Tenants = () => {
  const [tenants, setTenants] = useState([]);

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const response = await axios.get(`http://localhost:3015/api/v1/tenants`);
        console.log(response.data.data);
        setTenants(response.data.data);
      } catch (error) {
        console.error("Error fetching tenant data:", error);
      }
    };
    fetchTenants();
  }, []);

  return <div>{tenants && tenants.length && tenants[0].tenant_name}</div>;
};

export default Tenants;
