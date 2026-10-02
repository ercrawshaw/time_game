"use client";

import {
  createContext,
  useCallback,
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

  const resetGame = useCallback(() => {
    setScore(0);
    setTimeUp(false);
  }, []);

  const resetMission = useCallback(() => {
    resetGame();
    setTimeType(null);
    setDifficulty(null);
    setTimeLimit(null);
  }, [resetGame]);

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
        resetMission,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
