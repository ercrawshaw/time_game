"use client";

import { createContext, useContext, useState } from "react";
const AppContext = createContext(null);

export function AppProvider({ children }) {
    const [isSoundOn, setIsSoundOn] = useState(false);
    const [timeType, setTimeType] = useState(null);
    const [difficulty, setDifficulty] = useState(null);
    const [score, setScore] = useState(0);

  const toggleSound = () => {
    setIsSoundOn((current) => !current);
  };

  const resetScore = () => {
    setScore(0);
  };

  const addPoint = () => {
    setScore((current) => current + 1);
  };

  return (
    <AppContext.Provider value={{ isSoundOn, toggleSound, timeType, setTimeType, difficulty, setDifficulty, score, resetScore, addPoint }}>
      {children}
    </AppContext.Provider>
  );
};

export function useAppContext() {
  return useContext(AppContext);
};
