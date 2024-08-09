import { useContext, createContext, useState, Children } from "react";

const AlertContext = createContext();

export const useAlertContext = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({ message: "", type: "info", visible: false });

  const showAlert = (message, type = "info") => {
    setAlert({ message, type, visible: true });
    setTimeout(() => setAlert({ ...alert, visible: false }), 5000);
  };

  const hideAlert = () => {
    setAlert({ ...alert, visible: false });
  };

  return <AlertContext.Provider value={{ alert, showAlert, hideAlert }}>{children}</AlertContext.Provider>;
};
