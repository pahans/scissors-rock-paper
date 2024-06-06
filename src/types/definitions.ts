export interface GameState {
  balance: number;
  win: number;
  selectedChoices: { [key in GameChoice]?: number };
  computerChoice: GameChoice | null;
  gameStage: GameStage;
  winningChoice: GameChoice | null;
  errorMessage: string | null;
  winAmount: number;
  outcome: Outcome | null;
  playerBestChoice: GameChoice | null;
}

export enum GameStage {
  Betting = "betting",
  Playing = "playing",
  ShowWinner = "showWinner",
}

export enum GameChoice {
  Rock = "rock",
  Paper = "paper",
  Scissors = "scissors",
}

export enum Outcome {
  Tie = "tie",
  Win = "win",
  Loss = "loss",
}

export type GameChoiceConfig = Record<
  GameChoice,
  {
    label: string;
    beats: string[];
    colorClassName: string;
  }
>;
