import { describe, expect, it } from "vitest";

import { gameChoicesConfig } from "@/config/game-config";
import { GameChoice, Outcome } from "@/types/definitions";

import { calculateResult, getRandomChoice, getWinningChoice } from "./game-logic";

describe("Game Logic", () => {
  describe("getRandomChoice", () => {
    it("returns a valid choice", () => {
      const randomChoice = getRandomChoice();
      const validChoices = Object.keys(gameChoicesConfig) as GameChoice[];
      expect(validChoices).toContain(randomChoice);
    });
  });

  describe("getWinningChoice", () => {
    it("returns tie outcome for matching choices", () => {
      const result = getWinningChoice(GameChoice.Rock, GameChoice.Rock);
      expect(result).toEqual({ outcome: Outcome.Tie, winningChoice: null });
    });

    it("returns win outcome for player winning choice", () => {
      const result = getWinningChoice(GameChoice.Rock, GameChoice.Scissors);
      expect(result).toEqual({
        outcome: Outcome.Win,
        winningChoice: GameChoice.Rock,
      });
    });

    it("returns loss outcome for computer winning choice", () => {
      const result = getWinningChoice(GameChoice.Rock, GameChoice.Paper);
      expect(result).toEqual({
        outcome: Outcome.Loss,
        winningChoice: GameChoice.Paper,
      });
    });
  });

  describe("calculateResult", () => {
    it("handles a single bet with a win", () => {
      const playerChoices = { [GameChoice.Rock]: 500 };
      const computerChoice = GameChoice.Scissors;
      const result = calculateResult(playerChoices, computerChoice);

      expect(result.winAmount).toBe(7000); // 500 * 14
      expect(result.errorMessage).toBeNull();
      expect(result.outcome).toBe(Outcome.Win);
      expect(result.winningChoice).toBe(GameChoice.Rock);
      expect(result.playerBestChoice).toBe(GameChoice.Rock);
    });

    it("handles a single bet with a tie", () => {
      const playerChoices = { [GameChoice.Rock]: 500 };
      const computerChoice = GameChoice.Rock;
      const result = calculateResult(playerChoices, computerChoice);

      expect(result.winAmount).toBe(500);
      expect(result.errorMessage).toBeNull();
      expect(result.outcome).toBe(Outcome.Tie);
      expect(result.winningChoice).toBeNull();
      expect(result.playerBestChoice).toBe(GameChoice.Rock);
    });

    it("handles a single bet with a loss", () => {
      const playerChoices = { [GameChoice.Rock]: 500 };
      const computerChoice = GameChoice.Paper;
      const result = calculateResult(playerChoices, computerChoice);

      expect(result.winAmount).toBe(0);
      expect(result.errorMessage).toBeNull();
      expect(result.outcome).toBe(Outcome.Loss);
      expect(result.winningChoice).toBe(GameChoice.Paper);
      expect(result.playerBestChoice).toBe(GameChoice.Rock);
    });

    it("handles two bets with one loss and one tie", () => {
      const playerChoices = { [GameChoice.Rock]: 500, [GameChoice.Paper]: 500 };
      const computerChoice = GameChoice.Paper;
      const result = calculateResult(playerChoices, computerChoice);

      expect(result.winAmount).toBe(0); // 500 * 3
      expect(result.errorMessage).toBeNull();
      expect(result.outcome).toBe(Outcome.Loss);
      expect(result.winningChoice).toBe(GameChoice.Paper);
      expect(result.playerBestChoice).toBe(GameChoice.Paper);
    });

    it("handles two bets with one winning and one tie", () => {
      const playerChoices = { [GameChoice.Rock]: 500, [GameChoice.Paper]: 500 };
      const computerChoice = GameChoice.Rock;
      const result = calculateResult(playerChoices, computerChoice);

      expect(result.winAmount).toBe(1500); // 500 * 3
      expect(result.errorMessage).toBeNull();
      expect(result.outcome).toBe(Outcome.Win);
      expect(result.winningChoice).toBe(GameChoice.Paper);
    });

    it("returns error for invalid computer choice", () => {
      const playerChoices = { [GameChoice.Rock]: 500 };
      const computerChoice = "invalid" as GameChoice;
      const result = calculateResult(playerChoices, computerChoice);

      expect(result.winAmount).toBe(0);
      expect(result.errorMessage).toBe("Invalid computer choice");
      expect(result.outcome).toBeNull();
      expect(result.winningChoice).toBeNull();
    });

    it("returns error for more than 2 player choices", () => {
      const playerChoices = {
        [GameChoice.Rock]: 500,
        [GameChoice.Paper]: 500,
        scissors: 500,
      };
      const computerChoice = GameChoice.Scissors;
      const result = calculateResult(playerChoices, computerChoice);

      expect(result.winAmount).toBe(0);
      expect(result.errorMessage).toBe("Invalid number of player choices");
      expect(result.outcome).toBeNull();
      expect(result.winningChoice).toBeNull();
    });
  });
});
