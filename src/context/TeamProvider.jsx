import { useState, useContext, createContext } from "react";

const teamContext = createContext();

export const useTeamContext = () => useContext(teamContext);

export const TeamProvider = ({ children }) => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const clearEmployee = () => {
    setSelectedEmployee(null);
  };

  return (
    <teamContext.Provider
      value={{
        selectedEmployee,
        setSelectedEmployee,
        clearEmployee,
      }}
    >
      {children}
    </teamContext.Provider>
  );
};
