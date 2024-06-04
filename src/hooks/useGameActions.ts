import { useCallback } from "react";

import { CALCULATE_RESULT_DELAY, GameChoice } from "@/config/gameConfig";
import { useGameContext } from "@/context/GameContext";

export const useGameActions = () => {
  const { dispatch } = useGameContext();

  const placeBet = useCallback(
    (choice: GameChoice) => {
      // Update the type of the choice parameter
      dispatch({ type: "PLACE_BET", payload: choice });
    },
    [dispatch],
  );

  const startGame = useCallback(() => {
    dispatch({ type: "START_GAME" });
    setTimeout(() => {
      dispatch({ type: "CALCULATE_RESULT" });
    }, CALCULATE_RESULT_DELAY); // delay before calculating result
  }, [dispatch]);

  const resetGame = useCallback(() => {
    dispatch({ type: "RESET_GAME" });
  }, [dispatch]);

  return { placeBet, startGame, resetGame };
};