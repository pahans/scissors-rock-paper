import type { MockedFunction } from "vitest";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { LanguageStrings } from "@/lang";
import type { GameState } from "@/types/definitions";
import { GameChoice, GameStage, Outcome } from "@/types/definitions";
import { calculateResult, getRandomChoice, hasReachedMaxBetCount } from "@/utils/game-logic";

import type { Action } from "./GameContext";
import { gameReducer, initialState } from "./GameContext";

vi.mock("@/utils/game-logic", () => ({
  getRandomChoice: vi.fn(),
  calculateResult: vi.fn(),
  hasReachedMaxBetCount: vi.fn(),
}));

const mockedGetRandomChoice = getRandomChoice as MockedFunction<typeof getRandomChoice>;
const mockedCalculateResult = calculateResult as MockedFunction<typeof calculateResult>;
const mockedHasReachedMaxBetCount = vi.mocked(hasReachedMaxBetCount);

describe("gameReducer", () => {
  beforeEach(() => {
    mockedGetRandomChoice.mockReset();
    mockedCalculateResult.mockReset();
    mockedHasReachedMaxBetCount.mockReset();
  });

  it("should handle PLACE_BET action for one bet", () => {
    const action: Action = { type: "PLACE_BET", payload: GameChoice.Rock };
    const state = gameReducer(initialState, action);

    expect(state.selectedChoices.rock).toBe(500);
    expect(state.balance).toBe(initialState.balance - 500);
  });

  it("should handle PLACE_BET action for two bets", () => {
    const initialStateWithBet: GameState = {
      ...initialState,
      selectedChoices: { rock: 500 },
      balance: initialState.balance - 500,
    };
    const action: Action = { type: "PLACE_BET", payload: GameChoice.Rock };
    const state = gameReducer(initialStateWithBet, action);

    expect(state.selectedChoices.rock).toBe(1000);
    expect(state.balance).toBe(initialState.balance - 1000);
  });

  it("should handle PLACE_BET action with insufficient balance", () => {
    const lowBalanceState: GameState = {
      ...initialState,
      balance: 400,
    };
    const action: Action = { type: "PLACE_BET", payload: GameChoice.Rock };
    const state = gameReducer(lowBalanceState, action);

    expect(state.errorMessage).toBe(LanguageStrings.insufficientBalance);
    expect(state.selectedChoices).toEqual({});
    expect(state.balance).toBe(400);
  });

  it("should show an error when attempting to start the game without any bets", () => {
    const action: Action = { type: "START_GAME" };
    const state = gameReducer(initialState, action);

    expect(state.errorMessage).toBe(LanguageStrings.cannotStartWithoutBets);
  });

  it("should handle START_GAME action with valid bets", () => {
    mockedGetRandomChoice.mockReturnValue(GameChoice.Scissors);
    mockedCalculateResult.mockReturnValue({
      winAmount: 7000,
      errorMessage: null,
      winningChoice: GameChoice.Rock,
      playerBestChoice: GameChoice.Rock,
      outcome: Outcome.Win,
    });

    const initialStateWithBet: GameState = {
      ...initialState,
      selectedChoices: { rock: 500 },
      balance: initialState.balance - 500,
    };
    const action: Action = { type: "START_GAME" };
    const state = gameReducer(initialStateWithBet, action);

    expect(state.computerChoice).toBe(GameChoice.Scissors);
    expect(state.gameStage).toBe(GameStage.Playing);
    expect(state.win).toBe(1);
    expect(state.balance).toBe(initialState.balance + 6500); // 5000 - 500 + 7000
    expect(state.errorMessage).toBeNull();
    expect(state.winningChoice).toBe(GameChoice.Rock);
    expect(state.playerBestChoice).toBe(GameChoice.Rock);
  });

  it("should handle CALCULATE_RESULT action", () => {
    const initialStateWithPlaying: GameState = {
      ...initialState,
      gameStage: GameStage.Playing,
    };
    const action: Action = { type: "CALCULATE_RESULT" };
    const state = gameReducer(initialStateWithPlaying, action);

    expect(state.gameStage).toBe(GameStage.ShowWinner);
  });

  it("should handle RESET_GAME action", () => {
    const initialStateWithPlaying: GameState = {
      ...initialState,
      selectedChoices: { rock: 500 },
      computerChoice: GameChoice.Scissors,
      gameStage: GameStage.ShowWinner,
      balance: initialState.balance + 7000,
      win: 1,
    };
    const action: Action = { type: "RESET_GAME" };
    const state = gameReducer(initialStateWithPlaying, action);

    expect(state.selectedChoices).toEqual({});
    expect(state.computerChoice).toBeNull();
    expect(state.gameStage).toBe(GameStage.Betting);
    expect(state.balance).toBe(initialStateWithPlaying.balance);
    expect(state.win).toBe(initialStateWithPlaying.win);
    expect(state.winningChoice).toBe(null);
    expect(state.playerBestChoice).toBe(null);
  });
});
