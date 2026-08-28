"use client";

import { createContext, useContext, useState } from "react";
const AppContext = createContext(null);

export function AppProvider({ children }) {
    const [isSoundOn, setIsSoundOn] = useState(false);
    const [timeType, setTimeType] = useState(null);
    const [difficulty, setDifficulty] = useState(null);

  const toggleSound = () => {
    setIsSoundOn((current) => !current);
  };

  return (
    <AppContext.Provider value={{ isSoundOn, toggleSound, timeType, setTimeType, difficulty, setDifficulty }}>
      {children}
    </AppContext.Provider>
  );
};

export function useAppContext() {
  return useContext(AppContext);
};
