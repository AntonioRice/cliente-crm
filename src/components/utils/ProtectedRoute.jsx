import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context";
import { Unauthorized } from "../../pages";
import LoadingComponent from "./LoadingComponent";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  if (!user) {
    return <LoadingComponent />;
  }

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Unauthorized />;
  }

  return children;
};

export default ProtectedRoute;
