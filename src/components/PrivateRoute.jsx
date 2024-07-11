import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context";

const PrivateRoute = ({ children }) => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return user ? children : null;
};

export default PrivateRoute;
