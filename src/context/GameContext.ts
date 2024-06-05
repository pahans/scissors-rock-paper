import { Dispatch, createContext } from "react";

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

      if (state.balance < betSize) {
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
        errorMessage: null,
        gameStage: "playing",
      };
    }
    case "CALCULATE_RESULT": {
      const { winAmount, errorMessage, winningChoice, outcome } =
        calculateResult(
          state.selectedChoices,
          state.computerChoice as GameChoice,
        );

      return {
        ...state,
        win: outcome === "win" ? state.win + 1 : state.win,
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
        win: state.win,
      };
    }
    default:
      return state;
  }
};

export const GameContext = createContext<
  { state: GameState; dispatch: Dispatch<Action> } | undefined
>(undefined);
