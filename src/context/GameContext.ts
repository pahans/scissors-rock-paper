import { Dispatch, createContext, useContext } from "react";

import { betSize, startingBalance, winRates } from "@/config/game-config";
import { GameChoice, GameState } from "@/types/definitions";
import { calculateResult, getRandomChoice } from "@/utils/game-logic";

export const initialState: GameState = {
  balance: startingBalance,
  win: 0,
  selectedChoices: {},
  computerChoice: null,
  errorMessage: null,
  gameStage: "betting",
  winningChoice: null,
  winAmount: 0,
  outcome: null,
};

type Action =
  | { type: "PLACE_BET"; payload: GameChoice }
  | { type: "START_GAME" }
  | { type: "CALCULATE_RESULT" }
  | { type: "RESET_GAME" };

export const gameReducer = (state: GameState, action: Action): GameState => {
  switch (action.type) {
    case "PLACE_BET": {
      const choice = action.payload;
      // Exit if max bets are reached without existing bet on choice
      if (
        !state.selectedChoices[choice] &&
        Object.keys(state.selectedChoices).length >=
          Object.keys(winRates).length
      ) {
        return state;
      }

      const newSelectedChoices = {
        ...state.selectedChoices,
        [choice]: (state.selectedChoices[choice] || 0) + betSize,
      };
      const totalBet = Object.values(newSelectedChoices).reduce(
        (sum, amount) => sum + (amount || 0),
        0,
      );
      if (state.balance < totalBet) {
        return {
          ...state,
          errorMessage: "Insufficient balance.",
        };
      }
      // Deduct bet from balance and add to selected choices
      return {
        ...state,
        balance: state.balance - betSize,
        selectedChoices: {
          ...state.selectedChoices,
          [choice]: (state.selectedChoices[choice] || 0) + betSize,
        },
      };
    }
    case "START_GAME": {
      if (Object.keys(state.selectedChoices).length === 0) {
        return {
          ...state,
        };
      }

      const computerChoice = getRandomChoice();
      return {
        ...state,
        computerChoice,
        gameStage: "playing",
      };
    }
    case "CALCULATE_RESULT": {
      const { winAmount, errorMessage, winningChoice, outcome } =
        calculateResult(
          state.selectedChoices,
          state.computerChoice as GameChoice,
        );
      console.log({
        winAmount,
        errorMessage,
        winningChoice,
        outcome,
      });
      return {
        ...state,
        win: winAmount,
        outcome,
        winAmount,
        balance: state.balance + winAmount,
        errorMessage,
        gameStage: "showWinner",
        winningChoice,
      };
    }
    case "RESET_GAME": {
      return {
        ...initialState,
        balance: state.balance,
      };
    }
    default:
      return state;
  }
};

export const GameContext = createContext<
  { state: GameState; dispatch: Dispatch<Action> } | undefined
>(undefined);

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};
