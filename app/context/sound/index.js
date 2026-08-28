"use client";

import { createContext, useContext, useState } from "react";
const SoundContext = createContext(null);

export function SoundProvider({ children }) {
  const [isSoundOn, setIsSoundOn] = useState(false);

  const toggleSound = () => {
    setIsSoundOn((current) => !current);
  };

  return (
    <SoundContext.Provider value={{ isSoundOn, toggleSound }}>
      {children}
    </SoundContext.Provider>
  );
};

export function useSound() {
    return useContext(SoundContext);
};

