import { describe, expect, it } from "vitest";

import { gameChoicesConfig } from "@/config/gameConfig";
import { GameChoice } from "@/types/definitions";

import {
  calculateResult,
  getRandomChoice,
  getWinningChoice,
} from "./gameLogic";

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
      const result = getWinningChoice("rock", "rock");
      expect(result).toEqual({ outcome: "tie", winningChoice: null });
    });

    it("returns win outcome for player winning choice", () => {
      const result = getWinningChoice("rock", "scissors");
      expect(result).toEqual({ outcome: "win", winningChoice: "rock" });
    });

    it("returns loss outcome for computer winning choice", () => {
      const result = getWinningChoice("rock", "paper");
      expect(result).toEqual({ outcome: "loss", winningChoice: "paper" });
    });
  });

  describe("calculateResult", () => {
    it("handles a single bet with a win", () => {
      const playerChoices = { rock: 500 };
      const computerChoice: GameChoice = "scissors";
      const result = calculateResult(playerChoices, computerChoice);

      expect(result.winAmount).toBe(7000); // 500 * 14
      expect(result.errorMessage).toBeNull();
      expect(result.outcome).toBe("win");
      expect(result.winningChoice).toBe("rock");
    });

    it("handles a single bet with a tie", () => {
      const playerChoices = { rock: 500 };
      const computerChoice: GameChoice = "rock";
      const result = calculateResult(playerChoices, computerChoice);

      expect(result.winAmount).toBe(500);
      expect(result.errorMessage).toBeNull();
      expect(result.outcome).toBe("tie");
      expect(result.winningChoice).toBeNull();
    });

    it("handles a single bet with a loss", () => {
      const playerChoices = { rock: 500 };
      const computerChoice: GameChoice = "paper";
      const result = calculateResult(playerChoices, computerChoice);

      expect(result.winAmount).toBe(0);
      expect(result.errorMessage).toBeNull();
      expect(result.outcome).toBe("loss");
      expect(result.winningChoice).toBe("paper");
    });

    it("handles multiple bets with one winning and one tie", () => {
      const playerChoices = { rock: 500, paper: 500 };
      const computerChoice: GameChoice = "rock";
      const result = calculateResult(playerChoices, computerChoice);

      expect(result.winAmount).toBe(1500); // 500 * 3
      expect(result.errorMessage).toBeNull();
      expect(result.outcome).toBe("win");
      expect(result.winningChoice).toBe("paper");
    });

    it("returns error for invalid computer choice", () => {
      const playerChoices = { rock: 500 };
      const computerChoice = "invalid" as GameChoice;
      const result = calculateResult(playerChoices, computerChoice);

      expect(result.winAmount).toBe(0);
      expect(result.errorMessage).toBe("Invalid computer choice");
      expect(result.outcome).toBeNull();
      expect(result.winningChoice).toBeNull();
    });

    it("returns error for more than 2 player choices", () => {
      const playerChoices = { rock: 500, paper: 500, scissors: 500 };
      const computerChoice: GameChoice = "scissors";
      const result = calculateResult(playerChoices, computerChoice);

      expect(result.winAmount).toBe(0);
      expect(result.errorMessage).toBe("Invalid number of player choices");
      expect(result.outcome).toBeNull();
      expect(result.winningChoice).toBeNull();
    });
  });
});
