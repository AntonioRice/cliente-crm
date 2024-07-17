import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context";
import { Unauthorized } from "../../pages";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login", { replace: true });
    return null;
  }

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Unauthorized />;
  }

  return children;
};

export default ProtectedRoute;
