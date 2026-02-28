"use client";
import { createContext, useContext } from "react";

const WorldContext = createContext(null);

export function WorldProvider({ world, children }) {
  return (
    <WorldContext.Provider value={world}>
      {children}
    </WorldContext.Provider>
  );
}

export function useWorld() {
  return useContext(WorldContext);
}
