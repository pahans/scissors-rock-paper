import { GameChoice, gameChoicesConfig, winRates } from "@/config/gameConfig";

export const getRandomChoice = (): GameChoice => {
  const choices = Object.keys(gameChoicesConfig) as GameChoice[];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
};

type Outcome = "tie" | "win" | "loss";

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

interface CalculateResult {
  winAmount: number;
  errorMessage: string | null;
  winningChoice: GameChoice | null;
  outcome: Outcome | null;
}

export const calculateResult = (
  playerChoices: { [key in GameChoice]?: number },
  computerChoice: GameChoice,
): CalculateResult => {
  const computerConfig = gameChoicesConfig[computerChoice];
  if (!computerConfig) {
    return {
      winAmount: 0,
      errorMessage: "Invalid computer choice",
      winningChoice: null,
      outcome: null,
    };
  }

  const playerChoiceNames = Object.keys(playerChoices) as GameChoice[];
  const playerChoicesCount = playerChoiceNames.length;

  if (playerChoicesCount === 1) {
    const playerChoice = playerChoiceNames[0];
    const { outcome, winningChoice } = getWinningChoice(
      playerChoice,
      computerChoice,
    );

    let winAmount = 0;
    if (outcome === "win") {
      winAmount = playerChoices[playerChoice]! * winRates[playerChoicesCount];
    } else if (outcome === "tie") {
      // Return the bet amount for a tie
      winAmount = playerChoices[playerChoice]!;
    }

    return {
      errorMessage: null,
      outcome,
      winAmount,
      winningChoice,
    };
  }

  // For now we only support 1 or 2 player choices
  if (playerChoicesCount > 2) {
    return {
      winAmount: 0,
      errorMessage: "Invalid number of player choices",
      winningChoice: null,
      outcome: null,
    };
  }

  // Handle playerChoicesCount = 2
  let totalWinAmount = 0;
  let finalOutcome: Outcome = "loss";
  let finalWinningChoice: GameChoice | null = computerChoice;

  for (const playerChoice of playerChoiceNames) {
    const { outcome, winningChoice } = getWinningChoice(
      playerChoice,
      computerChoice,
    );

    if (outcome === "win") {
      totalWinAmount +=
        playerChoices[playerChoice]! * winRates[playerChoicesCount];
      finalOutcome = outcome;
      finalWinningChoice = winningChoice;
      break;
    } else if (outcome === "tie") {
      finalOutcome = "tie";
      finalWinningChoice = null;
    }
  }

  return {
    errorMessage: null,
    winAmount: totalWinAmount,
    outcome: finalOutcome,
    winningChoice: finalWinningChoice,
  };
};
