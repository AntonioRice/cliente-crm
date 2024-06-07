import React, { createContext, useContext, useState, useEffect } from "react";
import i18n from "../i18n";

const StateContext = createContext();

export const useStateContext = () => useContext(StateContext);

const initialState = {
  userProfile: false,
  activeSideBar: true,
  currentMode: "dark",
  currentLanguage: "en",
};

export const StateProvider = ({ children }) => {
  const [activeSideBar, setActiveSideBar] = useState(initialState.activeSideBar);
  const [currentMode, setCurrentMode] = useState(localStorage.getItem("themeMode") || initialState.currentMode);
  const [currentLanguage, setCurrentLanguage] = useState(
    localStorage.getItem("language") || initialState.currentLanguage
  );

  const setMode = (mode) => {
    setCurrentMode(mode);
    localStorage.setItem("themeMode", mode);
  };

  const setLanguage = (language) => {
    setCurrentLanguage(language);
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
  };

  useEffect(() => {
    const savedMode = localStorage.getItem("themeMode");
    const savedLanguage = localStorage.getItem("language");
    if (savedMode) {
      setCurrentMode(savedMode);
    }
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  return (
    <StateContext.Provider
      value={{
        activeSideBar,
        setActiveSideBar,
        currentMode,
        setMode,
        currentLanguage,
        setLanguage,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
