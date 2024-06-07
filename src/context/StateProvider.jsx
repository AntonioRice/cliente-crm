import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();

export const useStateContext = () => useContext(StateContext);

const initialState = {
  userProfile: false,
  activeSideBar: true,
};

export const StateProvider = ({ children }) => {
  const [activeSideBar, setActiveSideBar] = useState(initialState.activeSideBar);

  return (
    <StateContext.Provider
      value={{
        activeSideBar,
        setActiveSideBar,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
