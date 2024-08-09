import Alert from "./Alert";
import { useAlertContext } from "../../context";
import { motion } from "framer-motion";

const GlobalAlert = () => {
  const { alert } = useAlertContext();

  if (!alert.visible) return null;

  return (
    <motion.div className="fixed bottom-0 left-1/2 z-50 w-full max-w-md -translate-x-1/2 transform" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
      <Alert message={alert.message} type={alert.type} />
    </motion.div>
  );
};

export default GlobalAlert;
