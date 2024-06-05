import { gameChoicesConfig, winRates } from "@/config/game-config";
import { GameChoice, Outcome } from "@/types/definitions";

export const getRandomChoice = (): GameChoice => {
  const choices = Object.keys(gameChoicesConfig) as GameChoice[];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
};

interface WinningChoiceResult {
  outcome: Outcome;
  winningChoice: GameChoice | null;
}

export const getWinningChoice = (
  playerChoice: GameChoice,
  computerChoice: GameChoice,
): WinningChoiceResult => {
  if (playerChoice === computerChoice) {
    return {
      outcome: "tie",
      winningChoice: null,
    };
  }

  const playerChoiceConfig = gameChoicesConfig[playerChoice];
  if (playerChoiceConfig.beats.includes(computerChoice)) {
    return {
      outcome: "win",
      winningChoice: playerChoice,
    };
  }

  return {
    outcome: "loss",
    winningChoice: computerChoice,
  };
};

interface Result {
  winAmount: number;
  errorMessage: string | null;
  winningChoice: GameChoice | null;
  outcome: Outcome | null;
}

const returnErrorResult = (errorMessage: string): Result => ({
  winAmount: 0,
  errorMessage,
  winningChoice: null,
  outcome: null,
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

  // For now we only support 1 or 2 player choices
  if (playerChoicesCount > 2) {
    return returnErrorResult("Invalid number of player choices");
  }

  let totalWinAmount = 0;
  let finalOutCome: Outcome = "tie";
  let finalWinningChoice: GameChoice | null = null;

  for (const playerChoice of playerChoiceNames) {
    const { outcome, winningChoice } = getWinningChoice(
      playerChoice,
      computerChoice,
    );

    if (outcome === "win") {
      finalOutCome = "win";
      totalWinAmount +=
        (playerChoices[playerChoice] ?? 0) * winRates[playerChoicesCount];
      finalWinningChoice = winningChoice;
    } else if (outcome === "loss" && finalOutCome !== "win") {
      finalOutCome = "loss";
      finalWinningChoice = computerChoice;
    }
  }

  if (finalOutCome == "tie") {
    // if finalOutCome is a tie(this means it no other bets won or loss), return the amount
    totalWinAmount = playerChoices[playerChoiceNames[0]] ?? 0;
    finalWinningChoice = null;
  }

  return {
    errorMessage: null,
    winAmount: totalWinAmount,
    outcome: finalOutCome,
    winningChoice: finalWinningChoice,
  };
};
