import { useState, useContext, createContext } from "react";

const TeamContext = createContext();

export const useTeamContext = () => useContext(TeamContext);

export const TeamProvider = ({ children }) => {
  const [selectedTeamMember, setSelectedTeamMember] = useState(null);

  const clearTeamMember = () => {
    setSelectedTeamMember(null);
  };

  return (
    <TeamContext.Provider
      value={{
        selectedTeamMember,
        setSelectedTeamMember,
        clearTeamMember,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
};
