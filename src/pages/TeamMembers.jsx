import { useEffect, useState } from "react";
import axios from "axios";
import { DataTable } from "../components";

const TeamMembers = () => {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get(`http://localhost:3015/api/v1/users`);
        console.log(response.data.data);
        setTeamMembers(response.data.data);
      } catch (error) {
        console.error("Error fetching team members data:", error);
      }
    };
    fetchTeamMembers();
  }, []);

  if (!teamMembers.length) {
    return <div>No Users Found</div>;
  }

  return <div>User</div>;
};

export default TeamMembers;
