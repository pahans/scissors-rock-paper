import type { Dispatch } from "react";
import { createContext } from "react";

import { betSize, startingBalance } from "@/config/game-config";
import type { GameChoice, GameState } from "@/types/definitions";
import { GameStage, Outcome } from "@/types/definitions";
import { calculateResult, getRandomChoice, hasReachedMaxBetCount } from "@/utils/game-logic";

export const initialState: GameState = {
  balance: startingBalance,
  win: 0,
  selectedChoices: {},
  computerChoice: null,
  errorMessage: null,
  gameStage: GameStage.Betting,
  winningChoice: null,
  winAmount: 0,
  playerBestChoice: null,
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
      // Exit if max choice reached, allow increase bets if choice is already selected
      if (!state.selectedChoices[choice] && hasReachedMaxBetCount(state.selectedChoices)) {
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

      const result = calculateResult(state.selectedChoices, computerChoice);
      return {
        ...state,
        computerChoice,
        gameStage: GameStage.Playing,
        win: result.outcome === Outcome.Win ? state.win + 1 : state.win,
        balance: state.balance + result.winAmount,
        ...result,
      };
    }
    case "CALCULATE_RESULT": {
      return {
        ...state,
        gameStage: GameStage.ShowWinner,
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

export const GameContext = createContext<{ state: GameState; dispatch: Dispatch<Action> } | undefined>(undefined);
