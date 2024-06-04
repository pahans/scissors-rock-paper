import * as React from "react";
import { useReducer } from "react";

import { GameContext, gameReducer, initialState } from "./GameContext";

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};
