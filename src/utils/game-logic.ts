import { gameChoicesConfig, winRates } from "@/config/game-config";
import type { GameChoice } from "@/types/definitions";
import { Outcome } from "@/types/definitions";

export const getRandomChoice = (): GameChoice => {
  const choices = Object.keys(gameChoicesConfig) as GameChoice[];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
};

interface WinningChoiceResult {
  outcome: Outcome;
  winningChoice: GameChoice | null;
}

export const getWinningChoice = (playerChoice: GameChoice, computerChoice: GameChoice): WinningChoiceResult => {
  if (playerChoice === computerChoice) {
    return { outcome: Outcome.Tie, winningChoice: null };
  }

  const playerChoiceConfig = gameChoicesConfig[playerChoice];
  return playerChoiceConfig.beats.includes(computerChoice)
    ? { outcome: Outcome.Win, winningChoice: playerChoice }
    : { outcome: Outcome.Loss, winningChoice: computerChoice };
};

interface Result {
  winAmount: number;
  errorMessage: string | null;
  winningChoice: GameChoice | null;
  playerBestChoice: GameChoice | null;
  outcome: Outcome | null;
}

const returnErrorResult = (errorMessage: string): Result => ({
  winAmount: 0,
  errorMessage,
  winningChoice: null,
  outcome: null,
  playerBestChoice: null,
});

export const calculateResult = (
  playerChoices: { [key in GameChoice]?: number },
  computerChoice: GameChoice,
): Result => {
  const computerConfig = gameChoicesConfig[computerChoice];
  if (!computerConfig) {
    return returnErrorResult("Invalid computer choice");
  }

  const playerChoiceNames = Object.keys(playerChoices) as GameChoice[];
  const playerChoicesCount = playerChoiceNames.length;

  if (playerChoicesCount > 2) {
    return returnErrorResult("Invalid number of player choices");
  }

  let totalWinAmount = 0;
  let finalOutcome: Outcome = Outcome.Tie;
  let finalWinningChoice: GameChoice | null = null;
  let finalPlayerBestChoice: GameChoice | null = null;

  playerChoiceNames.forEach((playerChoice) => {
    const { outcome, winningChoice } = getWinningChoice(playerChoice, computerChoice);

    if (outcome === Outcome.Win) {
      finalOutcome = Outcome.Win;
      totalWinAmount += (playerChoices[playerChoice] ?? 0) * winRates[playerChoicesCount];
      finalWinningChoice = winningChoice;
      finalPlayerBestChoice = playerChoice;
    } else if (outcome === Outcome.Loss && finalOutcome !== Outcome.Win) {
      finalOutcome = Outcome.Loss;
      finalWinningChoice = computerChoice;
      finalPlayerBestChoice = playerChoice;
    } else if (outcome === Outcome.Tie && finalOutcome === Outcome.Loss) {
      finalPlayerBestChoice = playerChoice;
    }
  });

  if (finalOutcome === Outcome.Tie) {
    totalWinAmount = playerChoices[computerChoice] ?? 0;
    finalPlayerBestChoice = computerChoice;
  }

  return {
    errorMessage: null,
    winAmount: totalWinAmount,
    outcome: finalOutcome,
    winningChoice: finalWinningChoice,
    playerBestChoice: finalPlayerBestChoice,
  };
};

export const hasReachedMaxBetCount = (selectedChoices: {
  [key in GameChoice]?: number;
}): boolean => {
  return Object.keys(selectedChoices).length >= Object.keys(winRates).length;
};
