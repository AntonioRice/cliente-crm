import React, { createContext, useContext, useState, useEffect } from "react";

const StateContext = createContext();

export const useStateContext = () => useContext(StateContext);

const initialState = {
  userProfile: false,
  activeSideBar: true,
  currentMode: "dark",
};

export const StateProvider = ({ children }) => {
  const [activeSideBar, setActiveSideBar] = useState(initialState.activeSideBar);
  const [currentMode, setCurrentMode] = useState(localStorage.getItem("themeMode") || initialState.currentMode);

  const setMode = (mode) => {
    setCurrentMode(mode);
    localStorage.setItem("themeMode", mode);
  };

  useEffect(() => {
    const savedMode = localStorage.getItem("themeMode");
    if (savedMode) {
      setCurrentMode(savedMode);
    }
  }, []);

  return (
    <StateContext.Provider
      value={{
        activeSideBar,
        setActiveSideBar,
        currentMode,
        setMode,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
