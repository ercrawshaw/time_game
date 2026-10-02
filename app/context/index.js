"use client";

import {
  createContext,
  useContext,
  useState,
} from "react";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [timeType, setTimeType] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [timeLimit, setTimeLimit] = useState(null);
  const [score, setScore] = useState(0);
  const [timeUp, setTimeUp] = useState(false);

  const toggleSound = () => {
    setIsSoundOn((current) => !current);
  };

  const addPoint = () => {
    setScore((current) => current + 1);
  };

  const resetGame = () => {
    setScore(0);
    setTimeUp(false);
  };

  return (
    <AppContext.Provider
      value={{
        isSoundOn,
        toggleSound,
        timeType,
        setTimeType,
        difficulty,
        setDifficulty,
        timeLimit,
        setTimeLimit,
        score,
        addPoint,
        timeUp,
        setTimeUp,
        resetGame,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
