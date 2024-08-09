import Alert from "./Alert";
import { useAlertContext } from "../../context";

const GlobalAlert = () => {
  const { alert } = useAlertContext();

  if (!alert.visible) return null;

  return (
    <div className="fixed bottom-0 left-1/2 z-50 w-full max-w-md -translate-x-1/2 transform">
      <Alert message={alert.message} type={alert.type} />
    </div>
  );
};

export default GlobalAlert;
